# Tutorial: JSB 2.0

## The Abstraction Layer of Script Engine

### Architecture

![JSB2.0-Architecture](jsb/JSB2.0-Architecture.png)

### Macro

The abstraction layer is bound to take more CPU execution time than using the JS engine API directly. How to minimize the overhead of the abstraction layer becomes the first goal of the design.

Most of work in JS binding is actually setting JS related operations with CPP callbacks and associating CPP object within the callback function. In fact, it mainly contains the following two situation:

- Register JS functions (including global functions, class constructors, class destructors, class member functions, and class static member functions), binding revenant CPP callbacks
- Register accessors for JS properties, bind CPP callbacks for reading and writing properties respectively

How to achieve the minimum overhead for the abstract layer and expose the unified API?

For example, to register a JS function in CPP, there are different definitions in JavaScriptCore, SpiderMonkey, V8, ChakraCore as follows:

- JavaScriptCore

    ```c++
    JSValueRef JSB_foo_func(
        JSContextRef _cx,
        JSObjectRef _function,
        JSObjectRef _thisObject,
        size_t argc,
        const JSValueRef _argv[],
        JSValueRef* _exception
    );
    ```

- SpiderMonkey

    ```c++
    bool JSB_foo_func(
        JSContext* _cx,
        unsigned argc,
        JS::Value* _vp
    );
    ```

- V8

    ```c++
    void JSB_foo_func(
        const v8::FunctionCallbackInfo<v8::Value>& v8args
    );
    ```

- ChakraCore

    ```c++
    JsValueRef JSB_foo_func(
        JsValueRef _callee,
        bool _isConstructCall,
        JsValueRef* _argv,
        unsigned short argc,
        void* _callbackState
    );
    ```

We evaluated several options and eventually decided to use `macros` to reduce the differences between the definition and parameter types of different JS engine callbacks, regardless of which engine is used, and developers could use an unified callback definition. We refer to the definition of Lua callback function. The definition of all JS to CPP callback functions in the abstract layer is defined as:

```c++
bool foo(se::State& s)
{
    ...
    ...
}
SE_BIND_FUNC(foo) // Binding a JS function as an example
```

After a developer has bound a JS function, remember to wrap the callback function with the macros which start with `SE_BIND_`. Currently, we provide the following macros:

- **SE_BIND_PROP_GET**: Wrap a JS object property read callback function
- **SE_BIND_PROP_SET**: Wrap a JS object property written callback function
- **SE_BIND_FUNC_AS_PROP_GET**: Wrap a member function as a JS property getter callback function. 
- **SE_BIND_FUNC_AS_PROP_SET**: Wrap a member function as a JS property setter callback function
- **SE_BIND_FUNC**: Wrap a JS function that can be used for global functions, class member functions or class static functions
- **SE_BIND_FUNC_FAST**: Wrap a parameter-less C++ function into a JS function in a faster way.
- **SE_DECLARE_FUNC**: Declare a JS function, generally used in the header file
- **SE_BIND_CTOR**: Wrap a JS constructor
- **SE_BIND_SUB_CLS_CTOR**: Wrap the constructor of a JS subclass.
- **SE_BIND_FINALIZE_FUNC**: Wrap the finalize function of a JS object, finalize function is invoked when the object is released by Garbage Collector
- **SE_DECLARE_FINALIZE_FUNC**: Declares the finalize function of a JS object
- **_SE**: The macro for making callback be recognized by different JS engine. Note that the first character is underscored, similar to `_T ('xxx')` in Windows for wrapping Unicode or MultiBytes string

    > **Note**: the first character is an underscore, similar to `_T("xxx")` used in Windows to wrap Unicode or MultiBytes strings.

## API

### CPP Namespace

All types of the abstraction layer are under the `se` namespace, which is an abbreviation of `ScriptEngine`.

### Types

#### se::ScriptEngine

`se::ScriptEngine` is the JS engine administrator, responsible for JS engine initialization, destruction, restart, native module registration, loading scripts, doing garbage collection, JS exception cleanup and whether to enable the debugger. It is a singleton that could be accessed via `se::ScriptEngine::getInstance()`.

#### se::Value

`se::Value` can be understood as a JS variable reference in the CPP layer. There are six types of JS variables: `object`, `number`, `bigint` `string`, `boolean`, `null`, `undefined`, so `se::Value` uses an `union` to include `object`, `number`, `string`, `boolean`, `int64_t` these 5 kinds of `value types`, `non-value types` like `null` and `undefined` can be represented by `_type` directly.

```c++
namespace se {
    class Value {
        enum class Type : char
        {
            Undefined = 0,
            Null,
            Number,
            Boolean,
            String,
            Object,
            BigInt, // mostly used to store a 8 bytes pointer
        };
        ...
        ...
    private:
        union {
            bool _boolean;
            double _number;
            std::string* _string;
            Object* _object;
            int64_t _bigint;
        } _u;
        
        Type _type;
        ...
        ...
    };
}
```

If `se::Value` stores the underlying data types, such as `number`, `string`, `boolean`, which is directly stored by `value copy`. <br>
The storage of `object` is special because it is a `weak reference` to JS objects via `se::Object*`.

#### se::Object

`se::Object` extends from `se::RefCounter` which is a class for reference count management. Currently, only `se::Object` inherits from `se::RefCounter` in the abstraction layer.

As we mentioned in the last section, `se::Object` is a weak reference to the JS object, therefore I will explain why it's a weak reference.

**Reason 1: The requirement of controlling the life cycle of CPP objects by JS objects**

After creating a Sprite in the script layer via `var xhr = new XMLHttpRequest();`, we create a `se::Object` in the constructor callback and leave it in a global map (NativePtrToObjectMap), this map is used to query the `XMLHttpRequest*` to get the corresponding JS object `se::Object*`.

```c++
/// native/cocos/bindings/manual/jsb_xmlhttprequest.cpp
static bool XMLHttpRequest_constructor(se::State& s)
{
    XMLHttpRequest* cobj = JSB_ALLOC(XMLHttpRequest);
    s.thisObject()->setPrivateData(cobj);
    return true;
}
SE_BIND_CTOR(XMLHttpRequest_constructor, __jsb_XMLHttpRequest_class, XMLHttpRequest_finalize)

/// native/cocos/bindings/jswrapper/v8/Object.cpp
void Object::setPrivateObject(PrivateObjectBase *data) {
    // ... 
    if (data != nullptr) {
        _privateData = data->getRaw();
        NativePtrToObjectMap::emplace(_privateData, this);
    } else {
        _privateData = nullptr;
    }
}
```

Imagine if you force `se::Object` to be a strong reference to a JS object that leaves JS objects out of GC control and the finalize callback will never be fired because `se::Object` is always present in map which will cause memory leak.

**Reason 2: More flexible, supporting strong reference by calling the se::Object::root method manually**

`se::Object` provides `root/unroot` method for developers to invoke, `root` will put JS object into the area not be scanned by the GC. After calling `root`, `se::Object*` is a strong reference to the JS object. JS object will be put back to the area scanned by the GC only when `se::Object` is destructed or `unroot` is called to make root count to zero.

Under normal circumstances, if the C++ object is not a subclass of `cc::Ref`, the C++ object will be used to control the life cycle of the JS object in binding. Binding the engine modules, like Spine, DragonBones, Box2d and other third-party libraries uses this method. When the C++ object is released, it is necessary to find the corresponding `se::Object` in the `NativePtrToObjectMap`, then manually `unroot` and `decRef` it. Take the binding of `spTrackEntry` in Spine as an example:

```c++
spTrackEntry_setDisposeCallback([](spTrackEntry* entry){
        se::Object* seObj = nullptr;

        auto iter = se::NativePtrToObjectMap::find(entry);
        if (iter != se::NativePtrToObjectMap::end())
        {
            // Save se::Object pointer for being used in cleanup method.
            seObj = iter->second;
            // Unmap native and js object since native object was destroyed.
            // Otherwise, it may trigger 'assertion' in se::Object::setPrivateData later
            // Since native obj is already released and the new native object may be assigned with the same address.
            se::NativePtrToObjectMap::erase(iter);
        } else {
            return;
        }

        auto cleanup = [seObj](){

            auto se = se::ScriptEngine::getInstance();
            if (!se->isValid() || se->isInCleanup())
                return;

            se::AutoHandleScope hs;
            se->clearException();

            // The mapping of native object & se::Object was cleared in above code.
            // The private data (native object) may be a different object associated with other se::Object. 
            // Therefore, don't clear the mapping again.
            seObj->clearPrivateData(false);
            seObj->unroot(); // Unroot, making JS objects subject to GC management
            seObj->decRef(); // Release se::Object
        };

        if (!se::ScriptEngine::getInstance()->isGarbageCollecting()) {
            cleanup();
        } 
        else {
            CleanupTask::pushTaskToAutoReleasePool(cleanup);
        }
    });
```

**C++ Object lifecycle management**

Prior to 3.6, the destructor callback `_finalize` would call `delete` or `release` to release the corresponding C++ object, depending on the object type and whether it existed in `se::NonRefNativePtrCreatedByCtorMap`.  Since 3.6, the `_finalize` callback has been deprecated and left empty for the time being for debugging purposes.  `se::Object` establishes a lifecycle association with C++ objects via `se::PrivateObjectBase` objects. The three subclasses of `se::PrivateObjectBase` correspond to different release policies.

- `se::CCSharedPtrPrivateObject<T>`

uses `cc::IntrusivePtr` to store pointers to C++ objects, requiring that the C++ class inherits from `cc::RefCounted`. Where `cc::IntrusivePtr` is a smart pointer type that automatically increments or decrements the reference count of `cc::RefCounted`. When the reference count is 0, destructions are triggered.

- `se::SharedPrivateObject<T>`

Use `std::shared_ptr` to store C++ object pointers, requiring that C++ classes **do not inherit** from `cc::RefCounted`. Due to the nature of `shared_ptr` itself, all strong references are required to be `shared_ptr`. Destructing C++ objects is triggered when all `shared_ptr`s are destroyed. 

- `se::RawRefPrivateObject<T>`

Uses a bare pointer, which defaults to a weak reference to a C++ object. It can be converted to a strong reference by calling `tryAllowDestroyInGC`. As a weak reference, GC does not trigger destructing the object. 

**Associate native objects**.

After 3.6 `se::Object::setPrivateData(void *)` is extended to:
```c++
template <typename T>
inline void setPrivateData(T *data);
``` 
can automatically create `SharedPrivateObject` or `CCSharedPtrPrivateObject` based on type information, but does not support `RawRefPrivateObject`.

We can use `setPrivateObject` to display the type of the specified `PrivateObject`:
```c++
// se::SharedPrivateObject<T>
obj->setPrivateObject(se::shared_private_object(v));

// se::CCSharedPtrPrivateObject<T>
obj->setPrivateObject(se::ccshared_private_object(v));

// se::RawRefPrivateObject<T>
obj->setPrivateObject(se::rawref_private_object(v));
```


__Object Types__

The creation of native binding object has been hidden in the `SE_BIND_CTOR` and `SE_BIND_SUB_CLS_CTOR` macros, if developers need to use the `se::Object` in the binding callback, just get it by invoking `s.thisObject()`. Where `s` is `se::State&` which will be described in the following chapters.

In addition, `se::Object` currently supports the manual creation of the following objects:

- Plain Object: Created by `se::Object::createPlainObject`, similar to `var a = {};` in JS
- Array Object: Created by `se::Object::createArrayObject`, similar to `var a = [];` in JS
- Uint8 Typed Array Object: Created by `se::Object::createTypedArray`, like `var a = new Uint8Array(buffer);` in JS
- Array Buffer Object: Created by `se::Object::createArrayBufferObject` similar to `var a = new ArrayBuffer(len);` in JS

__The Release of The Objects Created Manually__

`se::Object::createXXX` is unlike the create method in Cocos Creator, the abstraction layer is a completely separate module which does not rely on the autorelease mechanism in Cocos Creator. Although `se::Object` also inherits the reference count class `se::RefCounter`, developers need to handle the release for **objects created manually**.

```c++
se::Object* obj = se::Object::createPlainObject();
...
...
obj->decRef(); // Decrease the reference count to avoid memory leak
```

#### se::HandleObject (recommended helper class for managing the objects created manually)

- If using manual creation of objects in complex logic, developers often forget to deal with `decRef` in different conditions

    ```c++
    bool foo()
    {
        se::Object* obj = se::Object::createPlainObject();
        if (var1)
            return false; // Return directly, forget to do 'decRef' operation
        
        if (var2)
            return false; // Return directly, forget to do 'decRef' operation
        ...
        ...
        obj->decRef();
        return true;
    }
    ```

    Plus adding `decRef` to different return condition branches can result in logically complex and difficult to maintain, and it is easy to forget about `decRef` if you make another return branch later.

- If the JS engine did a GC operationJS engine right after `se::Object::createXXX`, which will result in the `se::Object` reference to an illegal pointer, the program may crash.

In order to solve the above problems, the abstraction layer defines a type that assists in the management of **manually created objects**, namely `se::HandleObject`.

`se::HandleObject` is a helper class for easier management of the `release (decRef)`, `root`, and `unroot` operations of manually created `se::Object` objects.

The following two code snippets are equivalent, the use of `se::HandleObject` significantly smaller amount of code, and more secure.

```c++
{
    se::HandleObject obj(se::Object::createPlainObject());
    obj->setProperty(...);
    otherObject->setProperty("foo", se::Value(obj));
}
```

Is equal to:

```C++
{
    se::Object* obj = se::Object::createPlainObject();
    obj->root(); // Root the object immediately to prevent the object being garbage collected.

    obj->setProperty(...);
    otherObject->setProperty("foo", se::Value(obj));
    
    obj->unroot(); // Call unroot while the object is needed anymore.
    obj->decRef(); // Decrease the reference count to avoid memory leak.
}
```

> **NOTES**:
>
> 1. Do not try to use `se::HandleObject` to create a native binding object. In the `JavaScript controls of C++` mode, the release of the bound object will be automatically handled by the abstraction layer. In the `C++ controls JavaScript` mode, the previous chapter has already described it.
> 2. The `se::HandleObject` object can only be allocated on the stack, and a `se::Object` pointer must be passed in.

#### se::Class

`se::Class` is used to expose CPP classes to JS, it creates a constructor function in JS that has a corresponding name.

It has the following methods:

- `static se::Class* create(className, obj, parentProto, ctor)`: **Creating a Class**. If the registration is successful, it is then possible to create an object by calling `var xxx = new SomeClass ();` in the JavaScript layer.
- `bool defineFunction(name, func)`: Define a member function for a class.
- `bool defineProperty(name, getter, setter)`: Define a property accessor for a class.
- `bool defineStaticFunction(name, func)`: Define a static function for a class, the JavaScript function could be accessed by `SomeClass.foo()` rather than calling `var obj = new SomeClass(); obj.foo()`, this means it's a class method instead of an instance method.
- `bool defineStaticProperty(name, getter, setter)`: Define a static property accessor which could be invoked by `SomeClass.propertyA`, it's nothing about instance object.
- `bool defineFinalizeFunction(func)`: Define the finalize callback function after JS object is garbage collected.
- `bool install()`: Install a class JS engine.
- `Object* getProto()`: Get the prototype of JS constructor installed, similar to `Foo.prototype` of `function Foo(){}` in JS.
- `const char* getName() const`: Get the class name which is also the name of JS constructor.

> **NOTE**: you do not need to release memory manually after `se::Class` type is created, it will be automatically encapsulated layer.

You could look through the API documentation or code comments for more specific API instructions.

#### se::AutoHandleScope

The `se::AutoHandleScope` object type is purely a concept introduced to address V8 compatibility issues. In V8, any action that calls `v8::Local<>` on a CPP function that needs to trigger a JS related operation, such as calling a JS function, accessing a JS property, etc, requires a `v8::HandleScope` function be invoked before calling these operations, otherwise it will cause the program to crash.

So the concept of `se::AutoHandleScope` was introduced into the abstraction layer, which is implemented only on V8, and the other JS engines are currently just empty implementations.

Developers need to remember that in any code execution from CPP, you need to declare a `se::AutoHandleScope` before calling JS's logic. For example:

```c++
class SomeClass {
    void update(float dt) {
        se::ScriptEngine::getInstance()->clearException(); // Clear JS exceptions
        se::AutoHandleScope hs; // Declare a handle scope, it's needed for V8
        
        se::Object* obj = ...;
        obj->setProperty(...);
        ...
        ...
        obj->call(...);
    }
};
```

#### se::State

In the previous section, we have mentioned the `se::State` type, which is an environment in the binding callback. We can get the current CPP pointer, `se::Object` object pointer, parameter list and return value reference through `se::State` argument.

```c++
bool foo(se::State& s)
{
    // Get native object pointer bound with the current JS object.
    SomeClass* cobj = (SomeClass*)s.nativeThisObject();
    // Get se::Object pointer that represents the current JS object.
    se::Object* thisObject = s.thisObject();
    // Get argument list of the current function.
    const se::ValueArray& args = s.args();
    // Set return value for current function.
    s.rval().setInt32(100);
    // Return true to indicate the function is executed successfully.
    return true;
}
SE_BIND_FUNC(foo)
```

## Does The Abstraction Layer Depend on Cocos Creator?

**No, it doesn't.**

This abstraction layer was originally designed as a stand-alone module which is completely independent of Cocos Creator engine. Developers can copy the abstraction layer code in `cocos/scripting/jswrapper` directory and paste them to other projects directly.

## Manual Binding

### Define A Callback Function

```c++
static bool Foo_balabala(se::State& s)
{
    const auto& args = s.args();
    int argc = (int)args.size();
    
    if (argc >= 2) // Limit the number of parameters must be greater than or equal to 2, or throw an error to the JS layer and return false.	{
        ...
        ...
        return true;
    }
    
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", argc, 2)    ;
    return false;
}

// If binding a function, we use SE_BIND_FUNC macro. For binding a constructor, destructor, subclass constructor, please use SE_BIND_balabala macros memtioned above.
SE_BIND_FUNC(Foo_balabala)
```

### Set A Property Value for JS object

```c++
se::Object* globalObj = se::ScriptEngine::getInstance()->getGlobalObject(); // We get the global object just for easier demonstration.
globalObj->setProperty("foo", se::Value(100)); // Set a property called `foo` with a value of 100 to the global object.
```

Next, use the `foo` global variable in JS directly.

```js
log("foo value: " + foo); // Print `foo value: 100`.
```

### Set A Property Accessor for JS Object

```c++
// The read callback of "foo" property of the global object
static bool Global_get_foo(se::State& s)
{
    NativeObj* cobj = (NativeObj*)s.nativeThisObject();
    int32_t ret = cobj->getValue();
    s.rval().setInt32(ret);
    return true;
}
SE_BIND_PROP_GET(Global_get_foo)

// The write callback of "foo" property of the global object
static bool Global_set_foo(se::State& s)
{
    const auto& args = s.args();
    int argc = (int)args.size();
    if (argc >= 1)
    {
        NativeObj* cobj = (NativeObj*)s.nativeThisObject();
        int32_t arg1 = args[0].toInt32();
        cobj->setValue(arg1);
        // Do not need to call "s.rval().set(se::Value::Undefined)" for functions without return value.
        return true;
    }
    
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", argc, 1)    ;
    return false;
}
SE_BIND_PROP_SET(Global_set_foo)

void some_func()
{
    se::Object* globalObj = se::ScriptEngine::getInstance()->getGlobalObject(); // We get the global object just for easier demonstration.
    globalObj->defineProperty("foo", _SE(Global_get_foo), _SE(Global_set_foo)); // Use _SE macro to package specific function name.
}
```

### Define A Function for JS Object

```c++
static bool Foo_function(se::State& s)
{
    ...
    ...
}
SE_BIND_FUNC(Foo_function)

void some_func()
{
    se::Object* globalObj = se::ScriptEngine::getInstance()->getGlobalObject(); // We get the global object just for easier demonstration.
    globalObj->defineFunction("foo", _SE(Foo_function)); // Use _SE macro to package specific function name.
}
```

### Register A CPP Class to JS Virtual Machine

```c++
static se::Object* __jsb_ns_SomeClass_proto = nullptr;
static se::Class* __jsb_ns_SomeClass_class = nullptr;

namespace ns {
    class SomeClass
    {
    public:
        SomeClass()
        : xxx(0)
        {}

        void foo() {
            printf("SomeClass::foo\n");
            
            Director::getInstance()->getScheduler()->schedule([this](float dt){
                static int counter = 0;
                ++counter;
                if (_cb != nullptr)
                    _cb(counter);
            }, this, 1.0f, CC_REPEAT_FOREVER, 0.0f, false, "iamkey");
        }

        static void static_func() {
            printf("SomeClass::static_func\n");
        }

        void setCallback(const std::function<void(int)>& cb) {
            _cb = cb;
            if (_cb != nullptr)
            {
                printf("setCallback(cb)\n");
            }
            else
            {
                printf("setCallback(nullptr)\n");
            }
        }

        int xxx;
    private:
        std::function<void(int)> _cb;
    };
} // namespace ns {

static bool js_SomeClass_finalize(se::State& s)
{
    ns::SomeClass* cobj = (ns::SomeClass*)s.nativeThisObject();
    delete cobj;
    return true;
}
SE_BIND_FINALIZE_FUNC(js_SomeClass_finalize)

static bool js_SomeClass_constructor(se::State& s)
{
    ns::SomeClass* cobj = new ns::SomeClass();
    s.thisObject()->setPrivateData(cobj);
    return true;
}
SE_BIND_CTOR(js_SomeClass_constructor, __jsb_ns_SomeClass_class, js_SomeClass_finalize)

static bool js_SomeClass_foo(se::State& s)
{
    ns::SomeClass* cobj = (ns::SomeClass*)s.nativeThisObject();
    cobj->foo();
    return true;
}
SE_BIND_FUNC(js_SomeClass_foo)

static bool js_SomeClass_get_xxx(se::State& s)
{
    ns::SomeClass* cobj = (ns::SomeClass*)s.nativeThisObject();
    s.rval().setInt32(cobj->xxx);
    return true;
}
SE_BIND_PROP_GET(js_SomeClass_get_xxx)

static bool js_SomeClass_set_xxx(se::State& s)
{
    const auto& args = s.args();
    int argc = (int)args.size();
    if (argc > 0)
    {
        ns::SomeClass* cobj = (ns::SomeClass*)s.nativeThisObject();
        cobj->xxx = args[0].toInt32();
        return true;
    }

    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", argc, 1);
    return false;
}
SE_BIND_PROP_SET(js_SomeClass_set_xxx)

static bool js_SomeClass_static_func(se::State& s)
{
    ns::SomeClass::static_func();
    return true;
}
SE_BIND_FUNC(js_SomeClass_static_func)

bool js_register_ns_SomeClass(se::Object* global)
{
    // Make sure the namespace exists
    se::Value nsVal;
    if (!global->getProperty("ns", &nsVal))
    {
        // If it doesn't exist, create one. Similar as "var ns = {};" in JS.
        se::HandleObject jsobj(se::Object::createPlainObject());
        nsVal.setObject(jsobj);

        // Set the object to the global object with the property name `ns`.
        global->setProperty("ns", nsVal);
    }
    se::Object* ns = nsVal.toObject();

    // Create a se::Class object, developers do not need to consider the release of the se::Class object, which is automatically handled by the ScriptEngine.
    auto cls = se::Class::create("SomeClass", ns, nullptr, _SE(js_SomeClass_constructor)); // If the registered class doesn't need a  constructor, the last argument can be passed in with nullptr, it will make "new SomeClass();" illegal.

    // Define member functions, member properties.
    cls->defineFunction("foo", _SE(js_SomeClass_foo));
    cls->defineProperty("xxx", _SE(js_SomeClass_get_xxx), _SE(js_SomeClass_set_xxx));

    // Define finalize callback function
    cls->defineFinalizeFunction(_SE(js_SomeClass_finalize));

    // Install the class to JS virtual machine
    cls->install();

    // JSBClassType::registerClass is a helper function in the Cocos Creator native binding code, which is not a part of the ScriptEngine.
    JSBClassType::registerClass<ns::SomeClass>(cls);

    // Save the result to global variable for easily use in other places, for example class inheritance.
    __jsb_ns_SomeClass_proto = cls->getProto();
    __jsb_ns_SomeClass_class = cls;

    // Set a property "yyy" with the string value "helloyyy" for each object instantiated by this class.
    __jsb_ns_SomeClass_proto->setProperty("yyy", se::Value("helloyyy"));

    // Register static member variables and static member functions
    se::Value ctorVal;
    if (ns->getProperty("SomeClass", &ctorVal) && ctorVal.isObject())
    {
        ctorVal.toObject()->setProperty("static_val", se::Value(200));
        ctorVal.toObject()->defineFunction("static_func", _SE(js_SomeClass_static_func));
    }

    // Clear JS exceptions
    se::ScriptEngine::getInstance()->clearException();
    return true;
}
```

### How to Bind A CPP Callback Function

```c++
static bool js_SomeClass_setCallback(se::State& s)
{
    const auto& args = s.args();
    int argc = (int)args.size();
    if (argc >= 1)
    {
        ns::SomeClass* cobj = (ns::SomeClass*)s.nativeThisObject();

        se::Value jsFunc = args[0];
        se::Value jsTarget = argc > 1 ? args[1] : se::Value::Undefined;

        if (jsFunc.isNullOrUndefined())
        {
            cobj->setCallback(nullptr);
        }
        else
        {
            assert(jsFunc.isObject() && jsFunc.toObject()->isFunction());

            se::Object *jsTargetObj = jsTarget.isObject() ? jsTarget.toObject() : nullptr;

            // If the current SomeClass is a class that can be created by "new", we use "se::Object::attachObject" to associate jsFunc with jsTarget to the current object.
            s.thisObject()->attachObject(jsFunc.toObject());
            if(jsTargetObj) s.thisObject()->attachObject(jsTargetObj);

            // If the current SomeClass class is a singleton, or a class that always has only one instance, we can not associate it with "se::Object::attachObject".
            // Instead, you must use "se::Object::root", developers do not need to unroot since unroot operation will be triggered in the destruction of lambda which makes the "se::Value" jsFunc be destroyed, then "se::Object" destructor will do the unroot operation automatically.
            // The binding function "js_audio_AudioEngine_setFinishCallback" implements it in this way because "AudioEngine" is always a singleton.
            // Using "s.thisObject->attachObject(jsFunc.toObject);" for binding addCustomEventListener will cause jsFunc and jsTarget variables can't be released, which will result in memory leak.

            // jsFunc.toObject()->root();
            // jsTarget.toObject()->root();

            cobj->setCallback([jsFunc, jsTargetObj](int counter) {

                // Add the following two lines of code in CPP callback function before passing data to the JS.
                se::ScriptEngine::getInstance()->clearException();
                se::AutoHandleScope hs;


                se::ValueArray args;
                args.push_back(se::Value(counter));

                jsFunc.toObject()->call(args, jsTargetObj);
            });
        }

        return true;
    }

    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", argc, 1);
    return false;
}
SE_BIND_FUNC(js_SomeClass_setCallback)
```

After SomeClass is registered, use it in JS like the following:

```js
 var myObj = new ns.SomeClass();
 myObj.foo();
 ns.SomeClass.static_func();
 log("ns.SomeClass.static_val: " + ns.SomeClass.static_val);
 log("Old myObj.xxx:" + myObj.xxx);
 myObj.xxx = 1234;
 log("New myObj.xxx:" + myObj.xxx);
 log("myObj.yyy: " + myObj.yyy);

 var delegateObj = {
     onCallback: function(counter) {
         log("Delegate obj, onCallback: " + counter + ", this.myVar: " + this.myVar);
         this.setVar();
     },

     setVar: function() {
         this.myVar++;
     },

     myVar: 100
 };

 myObj.setCallback(delegateObj.onCallback, delegateObj);

 setTimeout(function(){
    myObj.setCallback(null);
 }, 6000); // Clear callback after 6 seconds.
```

There will be some logs outputted in console:

```
SomeClass::foo
SomeClass::static_func
ns.SomeClass.static_val: 200
Old myObj.xxx:0
New myObj.xxx:1234
myObj.yyy: helloyyy
setCallback(cb)
Delegate obj, onCallback: 1, this.myVar: 100
Delegate obj, onCallback: 2, this.myVar: 101
Delegate obj, onCallback: 3, this.myVar: 102
Delegate obj, onCallback: 4, this.myVar: 103
Delegate obj, onCallback: 5, this.myVar: 104
Delegate obj, onCallback: 6, this.myVar: 105
setCallback(nullptr)
```

### How to Use The Helper Functions in Cocos Creator Binding for Easier Native<->JS Type Conversions

The helper functions for native<->JS type conversions are located in `cocos/bindings/manual/jsb_conversions.h`, it includes:

#### Convert se::Value to C++ Type

Support base types `int*t`/`uint*_t`/`float`/`double`/`const char*`/`bool`, `std::string`, bound types, their container types `std::vector`, `std::array`, `std::map`, `std:: unordered_map`, etc. 

```c++
template<typename T>
bool sevalue_to_native(const se::Value &from, T *to, se::Object *ctx);

template<typename T>
bool sevalue_to_native(const se::Value &from, T *to);
```

#### Convert C++ Type to se::Value

```c++
template<typename T>
bool nativevalue_to_se(const T &from, se::Value &to, se::Object *ctx);

template<typename T>
bool nativevalue_to_se(const T &from, se::Value &to);

```

**The following conversion functions before 3.6 have been deprecated and need to be replaced with the above two groups of functions**


```c++
bool seval_to_int32(const se::Value &v, int32_t *ret);
bool seval_to_uint32(const se::Value &v, uint32_t *ret);
bool seval_to_int8(const se::Value &v, int8_t *ret);
bool seval_to_uint8(const se::Value &v, uint8_t *ret);
bool seval_to_int16(const se::Value &v, int16_t *ret);
bool seval_to_uint16(const se::Value &v, uint16_t *ret);
bool seval_to_boolean(const se::Value &v, bool *ret);
bool seval_to_float(const se::Value &v, float *ret);
bool seval_to_double(const se::Value &v, double *ret);
bool seval_to_size(const se::Value &v, size_t *ret);
bool seval_to_std_string(const se::Value &v, std::string *ret);
bool seval_to_Vec2(const se::Value &v, cc::Vec2 *pt);
bool seval_to_Vec3(const se::Value &v, cc::Vec3 *pt);
bool seval_to_Vec4(const se::Value &v, cc::Vec4 *pt);
bool seval_to_Mat4(const se::Value &v, cc::Mat4 *mat);
bool seval_to_Size(const se::Value &v, cc::Size *size);
bool seval_to_ccvalue(const se::Value &v, cc::Value *ret);
bool seval_to_ccvaluemap(const se::Value &v, cc::ValueMap *ret);
bool seval_to_ccvaluemapintkey(const se::Value &v, cc::ValueMapIntKey *ret);
bool seval_to_ccvaluevector(const se::Value &v, cc::ValueVector *ret);
bool sevals_variadic_to_ccvaluevector(const se::ValueArray &args, cc::ValueVector *ret);
bool seval_to_std_vector_string(const se::Value &v, std::vector<std::string> *ret);
bool seval_to_std_vector_int(const se::Value &v, std::vector<int> *ret);
bool seval_to_std_vector_uint16(const se::Value &v, std::vector<uint16_t> *ret);
bool seval_to_std_vector_float(const se::Value &v, std::vector<float> *ret);
bool seval_to_std_vector_Vec2(const se::Value &v, std::vector<cc::Vec2> *ret);
bool seval_to_Uint8Array(const se::Value &v, uint8_t *ret);
bool seval_to_uintptr_t(const se::Value &v, uintptr_t *ret);
bool seval_to_std_map_string_string(const se::Value &v, std::map<std::string, std::string> *ret);
bool seval_to_Data(const se::Value &v, cc::Data *ret);
bool seval_to_DownloaderHints(const se::Value &v, cc::network::DownloaderHints *ret);
template<typename T>
bool seval_to_native_ptr(const se::Value& v, T* ret);
template <typename T>
typename std::enable_if<std::is_class<T>::value && !std::is_same<T, std::string>::value, T>::type
seval_to_type(const se::Value &v, bool &ok);
template <typename T>
typename std::enable_if<std::is_integral<T>::value, T>::type
seval_to_type(const se::Value &v, bool &ok);
template <typename T>
typename std::enable_if<std::is_enum<T>::value, T>::type
seval_to_type(const se::Value &v, bool &ok);
template <typename T>
typename std::enable_if<std::is_floating_point<T>::value, T>::type
seval_to_type(const se::Value &v, bool &ok);

template <typename T>
typename std::enable_if<std::is_same<T, std::string>::value, T>::type
seval_to_type(const se::Value &v, bool &ok);
template <typename T>
typename std::enable_if<std::is_pointer<T>::value && std::is_class<typename std::remove_pointer<T>::type>::value, bool>::type
seval_to_std_vector(const se::Value &v, std::vector<T> *ret);

template <typename T>
typename std::enable_if<!std::is_pointer<T>::value, bool>::type
seval_to_std_vector(const se::Value &v, std::vector<T> *ret);
template<typename T>
bool seval_to_Map_string_key(const se::Value& v, cc::Map<std::string, T>* ret)
```

Replace with `sevalue_to_native`

```c++
bool int8_to_seval(int8_t v, se::Value *ret);
bool uint8_to_seval(uint8_t v, se::Value *ret);
bool int32_to_seval(int32_t v, se::Value *ret);
bool uint32_to_seval(uint32_t v, se::Value *ret);
bool int16_to_seval(uint16_t v, se::Value *ret);
bool uint16_to_seval(uint16_t v, se::Value *ret);
bool boolean_to_seval(bool v, se::Value *ret);
bool float_to_seval(float v, se::Value *ret);
bool double_to_seval(double v, se::Value *ret);
bool long_to_seval(long v, se::Value *ret);
bool ulong_to_seval(unsigned long v, se::Value *ret);
bool longlong_to_seval(long long v, se::Value *ret);
bool uintptr_t_to_seval(uintptr_t v, se::Value *ret);
bool size_to_seval(size_t v, se::Value *ret);
bool std_string_to_seval(const std::string &v, se::Value *ret); 
bool Vec2_to_seval(const cc::Vec2 &v, se::Value *ret);
bool Vec3_to_seval(const cc::Vec3 &v, se::Value *ret);
bool Vec4_to_seval(const cc::Vec4 &v, se::Value *ret);
bool Mat4_to_seval(const cc::Mat4 &v, se::Value *ret);
bool Size_to_seval(const cc::Size &v, se::Value *ret);
bool Rect_to_seval(const cc::Rect &v, se::Value *ret);
bool ccvalue_to_seval(const cc::Value &v, se::Value *ret);
bool ccvaluemap_to_seval(const cc::ValueMap &v, se::Value *ret);
bool ccvaluemapintkey_to_seval(const cc::ValueMapIntKey &v, se::Value *ret);
bool ccvaluevector_to_seval(const cc::ValueVector &v, se::Value *ret);
bool std_vector_string_to_seval(const std::vector<std::string> &v, se::Value *ret);
bool std_vector_int_to_seval(const std::vector<int> &v, se::Value *ret);
bool std_vector_uint16_to_seval(const std::vector<uint16_t> &v, se::Value *ret);
bool std_vector_float_to_seval(const std::vector<float> &v, se::Value *ret);
bool std_map_string_string_to_seval(const std::map<std::string, std::string> &v, se::Value *ret); 
bool ManifestAsset_to_seval(const cc::extension::ManifestAsset &v, se::Value *ret); 
bool Data_to_seval(const cc::Data &v, se::Value *ret);
bool DownloadTask_to_seval(const cc::network::DownloadTask &v, se::Value *ret);
template <typename T>
typename std::enable_if<!std::is_base_of<cc::Ref, T>::value, bool>::type
native_ptr_to_seval(T *v_c, se::Value *ret, bool *isReturnCachedValue = nullptr);
template <typename T>
typename std::enable_if<!std::is_base_of<cc::Ref, T>::value && !std::is_pointer<T>::value, bool>::type
native_ptr_to_seval(T &v_ref, se::Value *ret, bool *isReturnCachedValue = nullptr);
template <typename T>
bool native_ptr_to_rooted_seval(
    typename std::enable_if<!std::is_base_of<cc::Ref, T>::value, T>::type *v,
    se::Value *ret, bool *isReturnCachedValue = nullptr);
template <typename T>
typename std::enable_if<!std::is_base_of<cc::Ref, T>::value, bool>::type
native_ptr_to_seval(T *vp, se::Class *cls, se::Value *ret, bool *isReturnCachedValue = nullptr);
template <typename T>
typename std::enable_if<!std::is_base_of<cc::Ref, T>::value, bool>::type
native_ptr_to_seval(T &v_ref, se::Class *cls, se::Value *ret, bool *isReturnCachedValue = nullptr);
template <typename T>
bool native_ptr_to_rooted_seval(
    typename std::enable_if<!std::is_base_of<cc::Ref, T>::value, T>::type *v,
    se::Class *cls, se::Value *ret, bool *isReturnCachedValue = nullptr);
template <typename T>
typename std::enable_if<std::is_base_of<cc::Ref, T>::value, bool>::type
native_ptr_to_seval(T *vp, se::Value *ret, bool *isReturnCachedValue = nullptr);
template <typename T>
typename std::enable_if<std::is_base_of<cc::Ref, T>::value, bool>::type
native_ptr_to_seval(T *vp, se::Class *cls, se::Value *ret, bool *isReturnCachedValue = nullptr);
template <typename T>
bool std_vector_to_seval(const std::vector<T> &v, se::Value *ret);
template <typename T>
bool seval_to_reference(const se::Value &v, T **ret);
```

Replace with `nativelue_to_se`

Auxiliary conversion functions are not part of the abstraction layer (`Script Engine Wrapper`), they belong to the Cocos Creator binding layer and are encapsulated to facilitate more convenient conversion in the binding code.
Each conversion function returns the type `bool` indicating whether the conversion was successful or not. Developers need to check the return value after calling these interfaces.

The specific usage is directly known according to interface names. The first parameter in the interface is input, and the second parameter is the output parameter. The usage is as follows:

```c++
se::Value v;
bool ok = nativevalue_to_se(100, v); // The second parameter is the output parameter, passing in the address of the output parameter
```

```c++
int32_t v;
bool ok = sevalue_to_native(args[0], &v); // The second parameter is the output parameter, passing in the address of the output parameter
```

More on manual binding can be found in the [Using JSB Manual Binding](jsb-manual-binding.md) documentation.

## Automatic Binding

### Configure Module `.ini` Files

For more specific, please refer to the engine directory `tools/tojs/cocos.ini` file.

### Understand The Meaning of Each Field in The `.ini` file

```ini
# Module name
[cocos] 

# The prefix for callback functions and the binding file name.
prefix = engine

# The namespace of the binding class attaches to.
target_namespace = jsb

# Automatic binding tools is based on the Android NDK. The android_headers field configures the search path of Android header file.
android_headers = 

# Configure building parameters for Android.
android_flags = -target armv7-none-linux-androideabi -D_LIBCPP_DISABLE_VISIBILITY_ANNOTATIONS -DANDROID -D__ANDROID_API__=14 -gcc-toolchain %(gcc_toolchain_dir)s --sysroot=%(androidndkdir)s/platforms/android-14/arch-arm  -idirafter %(androidndkdir)s/sources/android/support/include -idirafter %(androidndkdir)s/sysroot/usr/include -idirafter %(androidndkdir)s/sysroot/usr/include/arm-linux-androideabi -idirafter %(clangllvmdir)s/lib64/clang/5.0/include -I%(androidndkdir)s/sources/cxx-stl/llvm-libc++/include

# Configure the search path for clang header file.
clang_headers = 

# Configure building parameters for clang
clang_flags = -nostdinc -x c++ -std=c++17 -fsigned-char -mfloat-abi=soft -U__SSE__

# Configure the search path for engine header file
cocos_headers = -I%(cocosdir)s/cocos -I%(cocosdir)s/cocos/platform/android -I%(cocosdir)s/external/sources

# Configure building parameters for engine
cocos_flags = -DANDROID -DCC_PLATFORM=3 -DCC_PLATFORM_MAC_IOS=1 -DCC_PLATFORM_MAC_OSX=4 -DCC_PLATFORM_WINDOWS=2 -DCC_PLATFORM_ANDROID=3

# Configure extra building parameters
extra_arguments = %(android_headers)s %(clang_headers)s %(cxxgenerator_headers)s %(cocos_headers)s %(android_flags)s %(clang_flags)s %(cocos_flags)s %(extra_flags)s
 
# Which header files needed to be parsed
headers = %(cocosdir)s/cocos/platform/FileUtils.h %(cocosdir)s/cocos/platform/CanvasRenderingContext2D.h %(cocosdir)s/cocos/platform/Device.h %(cocosdir)s/cocos/platform/SAXParser.h

# Rename the header file in the generated binding code
replace_headers = 

# Which classes need to be bound, you can use regular expressions, separated by space.
classes = FileUtils$ SAXParser CanvasRenderingContext2D CanvasGradient Device DownloaderHints

# Which classes need to be extended at the JS level, separated by spaces.
classes_need_extend = 

# Which classes need to bind properties, separated by commas
field = 

# Which classes need to be skipped, separated by commas
skip = FileUtils::[getFileData setFilenameLookupDictionary destroyInstance getFullPathCache getContents listFilesRecursively],
        SAXParser::[(?!(init))],
        Device::[getDeviceMotionValue],
        CanvasRenderingContext2D::[setCanvasBufferUpdatedCallback set_.+ fillText strokeText fillRect measureText],
        Data::[takeBuffer getBytes fastSet copy],
        Value::[asValueVector asValueMap asIntKeyMap]

# Which classes need to define getters and setters, separated by commas
getter_setter = CanvasRenderingContext2D::[width//setWidth height//setHeight fillStyle//setFillStyle font//setFont globalCompositeOperation//setGlobalCompositeOperation lineCap//setLineCap lineJoin//setLineJoin lineWidth//setLineWidth strokeStyle//setStrokeStyle textAlign//setTextAlign textBaseline//setTextBaseline]

# Which functions need to be renamed, separated by commas
rename_functions = FileUtils::[loadFilenameLookupDictionaryFromFile=loadFilenameLookup]

# Which classes need to be renamed, separated by commas
rename_classes = SAXParser::PlistParser


# Which classes do not have parents in JS
classes_have_no_parents = SAXParser

# Which C++ base classes need to be skipped
base_classes_to_skip = Ref Clonable

# Which classes are abstract classes which do not have a constructor in JS
abstract_classes = SAXParser Device
```

## Remote Debugging and Profile

By default, remote debugging and Profile are enabled in debug mode. If you need to enable them in release mode, you need to manually modify the macro switches in the file `native/engine/common/CMakeLists.txt` generated after building the native platform.

```cmake
# ...
if(NOT RES_DIR)
    message(FATAL_ERROR "RES_DIR is not set!")
endif()

include(${RES_DIR}/proj/cfg.cmake)

if(NOT COCOS_X_PATH)
    message(FATAL_ERROR "COCOS_X_PATH is not set!")
endif()
# ...

```

Change to:

```cmake
if(NOT RES_DIR)
    message(FATAL_ERROR "RES_DIR is not set!")
endif()

include(${RES_DIR}/proj/cfg.cmake)
set(USE_V8_DEBUGGER_FORCE ON) ## 覆盖 USE_V8_DEBUGGER_FORCE 的值

if(NOT COCOS_X_PATH)
    message(FATAL_ERROR "COCOS_X_PATH is not set!")
endif()
# ...
```

And edit file `native/engine/common/Classes/Game.cpp`

```c++
#if CC_DEBUG
  _debuggerInfo.enabled = true;
#else
  _debuggerInfo.enabled = false;
#endif
  // Override the value above
  _debuggerInfo.enabled = true;
```

### Remote Debugging V8 in Chrome

#### Windows/Mac

- Compile, run the game (or run directly in the simulator of Creator)

- Open with Chrome: <devtools://devtools/bundled/js_app.html?v8only=true&ws=127.0.0.1:5086/00010002-0003-4004-8005-000600070008>. (If you are using an older version of Chrome, you need to change the `devtools` at the beginning of the address to `chrome-devtools`)

>If the port is occupied, the port will auto-increment by +1. If you cannot connect, please check the port number printed in the console when the App starts.

- Breakpoint debugging:

  ![v8-win32-debug](jsb/v8-win32-debug.jpg)

- Catch JS Heap:

  ![v8-win32-memory](jsb/v8-win32-memory.jpg)

- Profile:

  ![v8-win32-profile](jsb/v8-win32-profile.jpg)

#### Android/iOS

- Make sure your Android/iOS device is on the same network as your PC or Mac

- Compile and run your game

- Open with Chrome: <devtools://devtools/bundled/js_app.html?v8only=true&ws=xxx.xxx.xxx.xxx:43086/00010002-0003-4004-8005-000600070008>, `xxx.xxx.xxx.xxx` is the IP address of Android/iOS device. (If you are using an older version of Chrome, you need to change the `devtools` at the beginning of the address to `chrome-devtools`)
- The remote debugging interface is the same as debugging Windows.

>If the port is occupied, the port will auto-increment by +1. If you cannot connect, please check the port number printed in the console when the App starts.

## Q & A

### What's The Difference between se::ScriptEngine and ScriptingCore? Why to keep ScriptingCore?

In Creator v1.7, the abstraction layer was designed as a stand-alone module that had no relation to the engine. The management of the JS engine was moved from the `ScriptingCore` to `se::ScriptEngine` class. `ScriptingCore` was retained in hopes of passing engine events to the abstraction layer, which acts like a adapter.

ScriptingCore only needs to be used once in AppDelegate.cpp, and all subsequent operations only require `se::ScriptEngine`.

```c++
bool AppDelegate::applicationDidFinishLaunching()
{
    ...
    ...
    director->setAnimationInterval(1.0 / 60);

    // These two lines set the ScriptingCore adapter to the engine for passing engine events, such as Node's onEnter, onExit, Action's update
    ScriptingCore* sc = ScriptingCore::getInstance();
    ScriptEngineManager::getInstance()->setScriptEngine(sc);
    
    se::ScriptEngine* se = se::ScriptEngine::getInstance();
    ...
    ...
}
```

### What's The Difference between `se::Object::root/unroot` and `se::Object::incRef/decRef`?

`root`/`unroot` is used to control whether JS objects are controlled by GC, `root` means JS object should not be controlled by GC, `unroot` means it should be controlled by GC. For a `se::Object`, `root` and `unroot` can be called multiple times, `se::Object`'s internal `_rootCount` variables is used to indicate the count of `root` operation. When `unroot` is called and `_rootCount` reach **0**, the JS object associated with `se::Object` is handed over to the GC. Another situation is that if `se::Object` destructor is triggered and `_rootCount` is still greater than 0, it will force the JS object to be controlled by the GC.

`incRef`/`decRef` is used to control the life cycle of `se::Object` CPP object. As mentioned in the previous section, it is recommended that you use `se::HandleObject` to control the manual creation of unbound objects's  life cycle. So, in general, developers do not need to touch `incRef`/`decRef`.

### The Association and Disassociation of Object's Life Cycle

Use `se::Object::attachObject` to associate object's life cycle.<br>
Use `se::Object::dettachObject` to disassociate object's life cycle.

`objA->attachObject(objB);` is similar as `objA.__ nativeRefs[index] = objB` in JS. Only when `objA` is garbage collected, `objB` will be possible garbage collected.<br>
`objA->dettachObject(objB);` is similar as `delete objA.__nativeRefs[index];` in JS. After invoking dettachObject, objB's life cycle will not be controlled by objA.

### Please DO NOT Assign A Subclass of cc::RefCounted on The Stack

Subclasses of `cc::RefCounted` must be allocated on the heap, via `new`, and then released by `release`. In JS object's finalize callback function, we should use `release` to release. If it is allocated on the stack, the reference count is likely to be 0, and then calling `release` in finalize callback will result `delete` is invoked, which causing the program to crash. So in order to prevent this behavior from happening, developers can identify destructors as `protected` or `private` in the binding classes that inherit from `cc::RefCounted`, ensuring that this problem can be found during compilation.

Example:

```c++
class CC_EX_DLL EventAssetsManagerEx : public EventCustom
{
public:
    ...
    ...
private:
    virtual ~EventAssetsManagerEx() {}
    ...
    ...
};

EventAssetsManagerEx event(...); // Compilation ERROR
dispatcher->dispatchEvent(&event);

// Must modify to:

EventAssetsManagerEx* event = new EventAssetsManagerEx(...);
dispatcher->dispatchEvent(event);
event->release();
```

### How to Observe JS Exception?

In AppDelegate.cpp, using `se::ScriptEngine::getInstance()->setExceptionCallback(...)` to set the callback of JS exception.

```c++
bool AppDelegate::applicationDidFinishLaunching()
{
    ...
    ...
    se::ScriptEngine* se = se::ScriptEngine::getInstance();

    se->setExceptionCallback([](const char* location, const char* message, const char* stack){
        // Send exception information to server like Tencent Bugly.
        // ...
        // ...
    });

    jsb_register_all_modules();
    ...
    ...
    return true;
}
```
