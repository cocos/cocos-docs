# JSB Manual Binding

> This article is republished from [Tencent Online Education Department Technical Blog](https://oedx.github.io/2019/05/29/cocos-creator-js-binding-manual/)<br>
> Author: xepherjin

## Background

The overall JS/Native communication call structure in the ABCmouse project has always been based on the `callStaticMethod <-> evalString` approach. The `callStaticMethod` method makes it possible to call `Java/Objective-C` static methods directly in JavaScript through the reflection mechanism. With the `evalString` method, we can execute JS code, so that we can communicate with each other.

<img src="./jsb/infrastructure.png" alt=" ">
<div style="text-align:center"><p>New ABCmouse application architecture: communication with evalString based on callStaticMethod</p></div>

Although it is easier to add new business logic after encapsulating the interface in the upper layer based on this approach. However, over-reliance on evalString often brings some pitfalls. As an example on the Android side.

```js
CocosJavascriptJavaBridge.evalString("window.sample.testEval('" + param + "',JSON.stringify(" + jsonObj + "))");
```

For common parameter structures, this works fine, however, based on real-world scenarios, we find that controlling the **quotes** is particularly important. As the code shows, in order to ensure that JS code is executed correctly, we must be clear about the use of `'` and `"` when concatenating strings, which can lead to `evalString` failures if we are not careful. We know from a lot of feedback on the official Cocos forums that this is a very easy place to get into trouble. On the other hand, for our project, the uncertainties caused by over-reliance on `evalString` are often difficult to control, and we can't just try/catch` to solve them. Fortunately, after global business troubleshooting, the majority of the project is currently in the project, so after reviewing the official documentation, we decided to bypass `evalString` and communicate directly based on JSB binding.

Here is an example of downloader access. In our project, the downloader is implemented separately on the Android and iOS sides. In the previous version, the downloader calls and callbacks were based on the `callStaticMethod <-> evalString` approach.

Each call to download needs to be executed like this.

```ts
import {NATIVE} from 'cc/env';

if(NATVE && sys.os == sys.OS.IOS) {
    jsb.reflection.callStaticMethod('ABCFileDownloader', 'downloadFileWithUrl:cookie:savePath:', url, cookies, savePath);
} else if(NATVE && sys.os == sys.OS.ANDROID) {
    jsb.reflection.callStaticMethod("com/tencent/abcmouse/downloader/ABCFileDownloader", "downloadFileWithUrl", "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V", url, cookies, savePath);
}
```

A successful or unsuccessful download requires the execution of a JS by splicing together a statement like the following.

```java
StringBuilder sb = new StringBuilder(JS_STRING_ON_DOWNLOAD_FINISH + "(");
sb.append("'" + success + "',");
sb.append("'" + url + "',");
sb.append("'" + savePath + "',");
sb.append("'" + msg + "',");
sb.append("'" +code + "')");
CocosJavascriptJavaBridge.evalString(sb.toString());
```

Whether it is a call or a callback are cumbersome and error-prone splicing, all the data had to be converted into a string ~ ~ (emmmmm also not beautiful) ~ ~, and also take into account the `evalString` implementation efficiency issues. If only a few business scenarios in the use of still barely acceptable, but when the business is increasingly complex and large, if you have to write this, and there is no detailed documentation to regulate constraints, its post-maintenance costs can be imagined.

When using JSB transformation, we call only a few lines of code and do not need to distinguish between platforms, not to worry about the above-mentioned splicing hidden problems, compared to the logic is much clearer.

```js
jsb.fileDownloader.requestDownload(url, savePath, cookies, options, (success, url, savePath, msg, code) => {
    // do whatever you want
});
```

So the next step is to take the simplest downloader binding process as an example, and I'll take you through the general process of JSB manual binding.<br>
**(Although Cocos Creator is very user-friendly and provides automatic binding configuration files, you can generate target files directly with some configurations, which reduces a lot of work. However, to complete the manual binding process by hand will help to understand the whole process of binding more comprehensively and help to deepen the understanding. (On the other hand, when there are special needs that cannot be met by automatic binding, manual binding is often more flexible)**

## Pre-work

Before we start, we need to know about the ScriptEngine abstraction layer, related APIs and other related knowledge, this part can be skipped if you already know from the Cocos Creator documentation and go straight to the **Practice** part.

### Abstract layer

![JSB2.0-Architecture](jsb/JSB2.0-Architecture.png)

In version 1.7, the abstraction layer was designed as a separate module with no relationship to the engine, and the management of the JS engine was moved from `ScriptingCore` to the `se::ScriptEngine` class, with `ScriptingCore` being retained in the hope that It is hoped that it will act as an adapter by passing some of the engine's events to the wrapper layer. This abstraction layer provides wrappers for a variety of optional JS execution engines such as JavaScriptCore, SpiderMonkey, V8, ChakraCore, etc. Most of the work of JSB is actually setting up C++ callbacks for JS-related operations and associating C++ objects in the callback functions. It actually contains the following two main types.

- Register JS functions (including global functions, class constructors, class destructors, class member functions, class static member functions) and bind a C++ callback
- Register JS object property read and write accessors, and bind separate read and write C++ callbacks

Given that the definition of key methods varies across JS engines, the Cocos team uses **macros** to smooth out this difference in callback function definitions and parameter types, which you can read in detail in the Cocos Creator documentation at the end of this article.<br>
** It's worth mentioning that the ScriptEngine layer was designed by the Cocos team to be a standalone module that doesn't depend on the Cocos engine at all. **We developers can port all the source code of the abstraction layer under **cocos/bindings/jswrapper** and use it directly in other projects.

### SE Types

All types of the C++ abstraction layer are under the `se` namespace, which stands for ScriptEngine.

- **se::ScriptEngine**

    It is the administrator of the JS engine and is in charge of JS engine initialization, destruction, restart, Native module registration, loading scripts, forced garbage collection, JS exception cleanup, and whether to enable the debugger. It is a single instance, and the corresponding instance can be obtained via `se::ScriptEngine::getInstance()`.

- **se::Value**

    JS variables have six types `object`, `number`, `string`, `boolean`, `null`, `undefined`, so `se::Value` uses union to contain `object`, `number`, `string`, `boolean`, and `null`. string`, `boolean`. The non-valued types: `null`, `undefined` can be directly represented by the private variable `_type`.

    If `se::Value` stores the base data type, such as `number`, `string`, `boolean`, it stores a copy of the value directly internally. The storage of `object` is special in that it is a weak reference to a JS object via `se::Object*`.

- **se::Object**

  Inherits from the `se::RefCounter` reference counter manager class, which holds a weak reference to a JS object. If we need to use the corresponding `se::Object` of the current object in the binding callback, we just need to get it with `s.thisObject()`. where s is of type `se::State`.

- **se::Class**

  After a Class type is created, there is no need to manually free memory, it is automatically handled by the wrapper layer. `se::Class` provides some APIs for defining class creation, static/dynamic member functions, property reading and writing, etc., which will be introduced later in the practice. The full contents can be found in the Cocos Creator documentation.

- **se::State**

  It is an environment in the binding callback where we can get the current C++ pointer, `se::Object` object pointer, parameter list, return value reference through `se::State`.

### Macro

As mentioned earlier, the abstraction layer uses macros to smooth out the differences in key function definitions and parameter types across JS engines, so that developers use one function definition regardless of the underlying engine.

For example, all JS to C++ callback functions in the abstraction layer are defined as

```cpp
bool foo(se::State& s)
{
    ...
    ...
}
SE_BIND_FUNC(foo) // Here is an example of the definition of a callback function
```

After we write the callback function, we need to remember to wrap the callback function using the `SE_BIND_XXX` series of macros. The full set of `SE_BIND_XXX` macros is currently shown below.

- `SE_BIND_PROP_GET`: Wraps a JS object property read callback function
- `SE_BIND_PROP_SET`: wraps a JS object property write callback function
- `SE_BIND_FUNC`: wraps a JS function that can be used as a global function, class member function, or class static function
- `SE_DECLARE_FUNC`: declares a JS function, usually used in the `.h` header file
- `SE_BIND_CTOR`: wraps a JS constructor
- `SE_BIND_SUB_CLS_CTOR`: wraps the constructor of a JS subclass that can inherit
- `SE_BIND_FINALIZE_FUNC`: wraps a JS object callback function after it has been reclaimed by GC
- `SE_DECLARE_FINALIZE_FUNC`: declares a callback function for a JS object after it has been reclaimed by GC
- `_SE`: the name of the wrapper callback function, escaped to the definition of the callback function recognized by each JS engine, note that the first character is an underscore, similar to the _T("xxx") used under Windows to wrap Unicode or MultiBytes strings

In our simplified example, only `SE_DECLARE_FUNC`, `SE_BIND_FUNC` will be used.

### Type conversion helper functions

The type conversion helper functions are located in **cocos/bindings/manual/jsb_conversions.h** and contain methods for interconverting `se::Value` to C++ types. The two main ones are as follows:

- `bool sevalue_to_native(const se::Value &from, T *to, se::Object * /*ctx*/)`, from `se::Value` to a C++ type
- `bool nativevalue_to_se(const T &from, se::Value& out, se::Object * /*ctx*/)`, from C++ type to `se::Value`

> The third argument can be passed directly as `nullptr` in most cases, currently only the `function` type has a dependency on `ctx`.

## Practices

Before we get started, we need to clarify the process of JSB binding, which is simply the process of implementing some class libraries in the C++ layer, and then calling the corresponding methods on the JS side after some specific processing. Because JS is the main business language, we are limited in what we can do with Native functionality, such as file, network, and other related operations.

SkeletonRenderer` in the Cocos Creator documentation, for example, if you call the `spine.SkeletonRenderer` constructor with the `new` operator in JSB, you will actually call the `js_spine_SkeletonRenderer _constructor` function. In this C++ function, memory is allocated for the skeleton object, it is added to the auto-recycle pool, and then the JS-level `_ctor` function is called to complete the initialization. The `_ctor` function calls different init functions depending on the type and number of arguments, and these init functions are also C++ function bindings.

```cpp
#define SE_BIND_CTOR(funcName, cls, finalizeCb) \
    void funcName##Registry(const v8::FunctionCallbackInfo<v8::Value>& _v8args) \
    { \
        v8::Isolate* _isolate = _v8args.GetIsolate(); \
        v8::HandleScope _hs(_isolate); \
        bool ret = true; \
        se::ValueArray args; \
        se::internal::jsToSeArgs(_v8args, &args); \
        se::Object* thisObject = se::Object::_createJSObject(cls, _v8args.This()); \
        thisObject->_setFinalizeCallback(_SE(finalizeCb)); \
        se::State state(thisObject, args); \
        ret = funcName(state); \
        if (!ret) { \
            SE_LOGE("[ERROR] Failed to invoke %s, location: %s:%d\n", #funcName, __FILE__, __LINE__); \
        } \
        se::Value _property; \
        bool _found = false; \
        _found = thisObject->getProperty("_ctor", &_property); \
        if (_found) _property.toObject()->call(args, thisObject); \
    }
```

The methodological correspondence of the three layers is as follows.

| Javascript |  JSB  | Cocos Creator |
| :--------- | :-----| :----------- |
| jsb.SkeletonRenderer.initWithSkeleton | js_spine_SkeletonRenderer_initWithSkeleton | spine::SkeletonRenderer::initWithSkeleton |
| jsb.SkeletonRenderer.initWithUUID     | js_spine_SkeletonRenderer_initWithUUID     | spine::SkeletonRenderer::initWithUUID     |

The timing of this call process is as follows.

<img src="./jsb/jsb_process.jpg" alt=" ">
<div style="text-align:center"><p>Call timing diagram (quoted from Cocos Creator documentation)</p></div>

The process is similar to the one above. First, we need to define the interface and the fields, let's draw up the simplest downloader `FileDownloader`, which has the `download(url, path, callback)` interface, and in the `callback` we need to get the `code`, `msg`. And to make it easy to use, we mount it under the `jsb` object, so we can call it simply with the following code:

```js
jsb.fileDownloader.download(url, path, (msg, code) => {
    // do whatever you want
});
```

Once the interface is defined, we can start coding the C++ part. First of all, let's take a look at `FileDownloader.h`, which is a public header file for Android/iOS. Then Android/iOS implement their own specific download implementations (skipped here), and `reqCtx` is used to store the callback correspondence.

```cpp
class FileDownloader {
    public:
        typedef std::function<void(const std::string& msg, const int code)> ResultCallback;
        static FileDownloader* getInstance();
        static void destroyInstance();
        void download(const std::string& url,
                                        const std::string& savePath,
                                        const ResultCallback& callback);
        void onDownloadResult(const std::string msg, const int code);
        ... ...
    protected:
        static FileDownloader* s_sharedFileDownloader;
        std::unordered_map<std::string, ResultCallback> reqCtx;
};
```

Next we proceed to the most critical part of the binding.<br>
Since the downloader is functionally classified as a network module, we can choose to implement our `FileDownloader` bindings in the existing `jsb_cocos_network_auto` in the Cocos source code. Declare the JS function in `jsb_cocos_network_auto.h` as follows

```cpp
SE_DECLARE_FUNC(js_network_FileDownloader_download); // Declare member functions, download calls
SE_DECLARE_FUNC(js_network_FileDownloader_getInstance); // Declare static functions to get a single instance
```

Then register `FileDownloader` and the two newly declared functions to the JS virtual machine in `jsb_cocos_network_auto.cpp`. Start by writing the corresponding two method implementations and leave them blank, and then fill in the blanks when the registration logic is complete.

```cpp
static bool js_network_FileDownloader_download(se::State &s) { // The method name is the same as when it was declared
    // TODO
}

SE_BIND_FUNC(js_network_FileDownloader_download); // Wrapping the method

static bool js_network_FileDownloader_getInstance(se::State& s) { // The method name is the same as when it was declared
    // TODO
}

SE_BIND_FUNC(js_network_FileDownloader_getInstance); // Wrapping the method
```

Now let's start writing the registration logic and add a new registration method to collect all the registration logic for `FileDownloader`.

```cpp
bool js_register_network_FileDownloader(se::Object* obj) {
    auto cls = se::Class::create("FileDownloader", obj, nullptr, nullptr);
    cls->defineFunction("download", _SE(js_network_FileDownloader_download));
    cls->defineStaticFunction("getInstance", _SE(js_network_FileDownloader_getInstance));
    cls->install();
    JSBClassType::registerClass<FileDownloader>(cls);
    se::ScriptEngine::getInstance()->clearException();
    return true;
}
```

Let's see what important things are done in this method.

1. Call the `se::Class::create(className, obj, parentProto, ctor)` method to create a Class named `FileDownloader`. After successful registration, an instance can be created in the JS layer by `let xxx = new FileDownloader() After registration, you can create an instance in the JS layer by `let xxx = new FileDownloader() ;`. 2.
2. Call the `defineFunction(name, func)` method to define a member function `download` and bind its implementation to the wrapped `js_network_FileDownloader_download`.
3. call the `defineStaticFunction(name, func)` method, which defines a static member function `getInstance` and binds its implementation to the wrapped `js_network_FileDownloader_getInstance`.
4. call the `install()` method to register itself to the JS virtual machine.
5. Call the `JSBClassType::registerClass` method to map the generated class to a C++-level class (internally implemented via `std::unordered_map<std::string, se::Class*>`).

With these steps, we have completed the crucial registration part, but of course don't forget to add the `js_register_network_FileDownloader` call to the registration portal of the `network` module: `js_register_network_FileDownloader`.

```cpp 
bool register_all_cocos_network(se::Object* obj)
{
    // Get the ns
    se::Value nsVal;
    if (!obj->getProperty("jsb", &nsVal))
    {
        se::HandleObject jsobj(se::Object::createPlainObject());
        nsVal.setObject(jsobj);
        obj->setProperty("jsb", nsVal);
    }
    se::Object* ns = nsVal.toObject();

    ... ...
    // Set the Class registration generated earlier to a property of jsb so that we can pass
    // let downloader = new jsb.FileDownloader();
    // Get the instance
    js_register_network_FileDownloader(ns);
    return true;
}
```

With this step done, our class has been successfully bound, so now we come back to refine the methods we left blank.

First is `getInstance()`.

```cpp
static bool js_network_FileDownloader_getInstance(se::State& s)
{
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 0) {
        FileDownloader* result = FileDownloader::getInstance(); // C++ 单例
        ok &= nativevalue_to_se(result, s.rval(), nullptr);
        SE_PRECONDITION2(ok, false, "js_network_FileDownloader_getInstance : Error processing arguments");
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 0);
    return false;
}
```

As mentioned earlier, we can get C++ pointer, `se::Object` object pointer, parameter list, return value reference through `se::State`. The logic is sorted out as follows.

1. `args()` gets all the arguments (vector of `se::Value`) brought by JS.
2. the number of arguments, because here `getInstance()` does not need additional arguments, so the argument is 0.
3. `native_ptr_to_seval()` is used to get a `se::Value` at the binding level based on a C++ object pointer and assign the return value to `rval()` to the JS level.

At this point, the binding layer logic of `getInstance()` is all done and we can already get the instance via `let downloader = jsb.FileDownloader.getInstance()`.

Next is `download()`.

```cpp
static bool js_network_FileDownloader_download(se::State &s) {
    FileDownloader *cobj = (FileDownloader *) s.nativeThisObject();
    SE_PRECONDITION2(cobj, false,
                     "js_network_FileDownloader_download : Invalid Native Object");
    const auto &args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 3) {
        std::string url;
        std::string path;
        ok &= sevalue_to_native(args[0], &url, nullptr); // Converted to ::string url
        ok &= sevalue_to_native(args[1], &path, nullptr); // Converted to ::string path
        std::function<void(const std::string& msg,
                           const int code)> callback;
        do {
            if (args[2].isObject() && args[2].toObject()->isFunction())
            {
                se::Value jsThis(s.thisObject());
                // Get JS callbacks
                se::Value jsFunc(args[2]);
                // If the target class is a singleton, it cannot be associated with se::Object::attachObject
                // You must use se::Object::root and do not care about unroot. The unroot operation will trigger the destruct of jsFunc with the destruction of the lambda, and the unroot operation will be performed in the destructor of se::Object.
                // If s.thisObject->attachObject(jsFunc.toObject); is used, the corresponding func and target will never be freed and a memory leak will occur.
                jsFunc.toObject()->root(); 
                auto lambda = [=](const std::string& msg,
                                  const int code) -> void {
                    se::ScriptEngine::getInstance()->clearException();
                    se::AutoHandleScope hs;
                    CC_UNUSED bool ok = true;
                    se::ValueArray args;
                    args.resize(2);
                    ok &= nativevalue_to_se(msg, args[0], nullptr);
                    ok &= nativevalue_to_se(code, args[1], nullptr);
                    se::Value rval;
                    se::Object* thisObj = jsThis.isObject() ? jsThis.toObject() : nullptr;
                    se::Object* funcObj = jsFunc.toObject();
                    // Execute JS method callbacks
                    bool succeed = funcObj->call(args, thisObj, &rval);
                    if (!succeed) {
                        se::ScriptEngine::getInstance()->clearException();
                    }
                };
                callback = lambda;
            }
            else
            {
                callback = nullptr;
            }
        } while(false);
        SE_PRECONDITION2(ok, false, "js_network_FileDownloader_download : Error processing arguments");
        cobj->download(url, path, callback);
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int) argc, 3);
    return false;
}
```

1. Get the url, path parameters and the original jsFunc after C++ conversion by `seval_to_std_string` method.
2. Manually construct the callback function to convert msg and code to `se::Value`. 3.
3. execute the JS method for callback via `funcObj->call`.

Finally, given the risk of memory release, we also need to do the relevant recycling in the `close()` method in `Application.cpp`.

```cpp
network::FileDownloader::destroyInstance();
```

================================================

The above is the whole binding process, after compiling to Android/iOS environment respectively, we will be able to make download calls via `jsb.fileDownloader.download()`.<br>
(PS: Be sure to remember to perform `NATIVE` macro judgment before use, because the non-JSB environment can not be used)

```typescript
import {NATIVE} from 'cc/env';
...
if(NATIVE) {
 // JSB Related Logic
}

```

## Summary

Let's now summarize the detailed process of manual binding transformation. In general, the transformation process for commonly used JSBs is roughly as follows.
- Determine the method interface and JS/Native public fields
- Declare header files and implement Android JNI and OC specific business code respectively
- Write abstraction layer code to register the necessary classes and corresponding methods in the JS virtual machine
- Mount the bound class in a specified object (like a namespace) in JS
