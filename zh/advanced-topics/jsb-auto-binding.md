# 使用 JSB 自动绑定

> 本文转载自 [腾讯在线教育部技术博客](https://oedx.github.io/2019/07/03/cocos-creator-js-binding-auto/)<br>
> 作者：张鑫（kevinxzhang）
>
> 本文档基于 v2.x 编写，在 Cocos Creator 3.0 上可能略有变动，我们会尽快更新。

尽管 Creator 提供了 `jsb.reflection.callStaticMethod` 方式支持从 JS 端直接调用 Native 端（Android/iOS/Mac）的接口，但是经过大量实践发现此接口在大量频繁调用情况下性能很低下，尤其是在 Android 端，比如调用 Native 端实现的打印 log 的接口，而且会容易引起一些 native crash，例如 `local reference table overflow` 等问题。纵观 Cocos 原生代码的实现，基本所有的接口方法的实现都是基于 JSB 的方式来实现，所以此文主要讲解下 JSB 的自动绑定逻辑，帮助大家能快速实现 `callStaticMethod` 到 JSB 的改造过程。

## 背景

对于用过 Cocos Creator（为了方便后文直接简称 CC）的人来说，`jsb.reflection.callStaticMethod` 这个方法肯定不陌生，其提供了我们从 JS 端调用 Native 端的能力，例如我们要调用 Native 实现的 log 打印和持久化的接口，就可以很方便的在 JavaScript 中按照如下的操作调用即可：

```javascript
if (sys.isNative && sys.os == sys.OS.IOS) {
    msg = this.buffer_string + '\n[cclog][' + clock + '][' + tag + ']' + msg;
    jsb.reflection.callStaticMethod("ABCLogServuce", "log:module:level:", msg, 'cclog', level);
    return;
} else if (sys.isNative && sys.os == sys.OS.ANDROID) {
    msg = this.buffer_string + '\n[cclog][' + clock + '][' + tag + ']' + msg;
    jsb.reflection.callStaticMethod("com/example/test/CommonUtils", "log", "(ILjava/lang/String;Ljava/lang/String;)V", level, 'cclog', msg);
    return;
}
```

尽管使用很简单，一行代码就能实现跨平台调用，稍微看下其实现就可以知道，在 C++ 层 Android 端是通过 jni 的方式实现的，IOS 端是通过运行时的方式动态调用，但是为了兼顾通用性和支持所有的方法，Android 端没有对 jni 相关对象做缓存机制，就会导致短时间大量调用时出现很严重的性能问题，之前我们遇到的比较多的情况就是在下载器中打印 log，某些应用场景短时间内触发大量的下载操作，就会出现 `local reference table overflow` 的 crash，甚至在低端机上导致界面卡顿无法加载出来的问题。

修复此问题就需要针对 log 调用进行 JSB 的改造，同时还要加上 jni 的相关缓存机制，优化性能。jSB 绑定说白了就是 C++ 和脚本层之间进行对象的转换，并转发脚本层函数调用到 C++ 层的过程。

JSB 绑定通常有 **手动绑定** 和 **自动绑定** 两种方式。手动绑定方式可以参考 [使用 JSB 手动绑定](jsb-manual-binding.md)。
- 手动绑定方式优点是灵活，可定制型强；缺点就是全部代码要自己书写，尤其是在 js 类型跟 c++ 类型转换上，稍有不慎容易导致内存泄漏，某些指针或者对象没有释放。
- 自动绑定方式则会帮你省了很多麻烦，直接通过一个脚本一键生成相关的代码，后续如果有新增或者改动，也只需要重新执行一次脚本即可。所以自动绑定对于不需要进行强定制，需要快速完成JSB的情况来说就再适合不过了。下面就一步步说明下如何实现自动绑定 JSB。

## 环境配置和自动绑定展示

### 环境配置

自动绑定，说简单点，其实就只要执行一个 python 脚本即可自动生成对应的 `.cpp`、`.h`、`.js` 文件。所以首先要保证电脑有 python 运行环境，这里以 Mac 上安装为例来讲解。

1. 安装 python，强烈建议先安装 [HomeBrew](https://brew.sh/)，然后直接命令行运行：

    ```shell
    /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
    brew install python
    ```

2. 通过 pip 安装 python 的一些依赖库：

    ```shell
    sudo easy_install pip
    sudo pip install PyYAML
    sudo pip install Cheetah
    ```

3. 安装 NDK，涉及到 c++ 肯定这个是必不可少的，建议安装 [14b](https://dl.google.com/android/repository/android-ndk-r14b-darwin-x86_64.zip) 版本，然后在 `~/.bash_profile` 中设置 `PYTHON_ROOT` 和 `NDK_ROOT` 这两个环境变量，因为在后面执行的 python 文件里面就会直接用到这两个环境变量：

    ```shell
    export NDK_ROOT="/Users/mycount/Library/Android/sdk/ndk-r14b"
    export PYTHON_BIN="/usr/bin/python"
    ```

Window 下直接参考上面需要安装的模块直接安装就好了，最后也要记得配置环境变量。

### 自动绑定展示

这里演示的是 cocos 引擎下面也即 **cocos/bindings/auto** 目录下的文件（如下图所示）是怎么自动生成的：

![](jsb/auto-file.png)

其实从这些文件名的开头也能看出，这些文件命名都是有某些特定规律的，那么这些文件是怎么生成的呢？首先打开终端，先 cd 到 **tools/tojs** 目录下，然后直接运行 `./genbindings.py`：

![](jsb/generate-file.png)

大概运行一分钟左右后，会出现如下的提示，说明已经顺利生成完了：

![](jsb/generate-file-complete.png)

当然一般大家第一次运行后很可能会失败，出现如下面类似的报错：

![](jsb/error-1.png)

![](jsb/error-2.png)

一般都是因为配置的 NDK 版本太高导致，最开始我是用 NDK16b 就出现了问题，换成 NDK14b 后就 OK 了。

经过上面的步骤后，**cocos/bindings/auto** 下的文件就全部自动生成出来了，是不是非常方便。

下面再以 js 层通过 jsb 调用 Native 层的 log 方法打印日志为例，详细的告知下如何实现通过自动绑定工具，依据自己写的 c++ 代码，生成对应的自动绑定文件。

## 编写 c++ 层的实现

C++ 作为连接 js 层和 Native 层的桥梁，既然要实现 jsb 调用，那第一步肯定是要先把 C++ 层的头文件和实现准备好，这里我们在 build⁩/jsb-default/frameworks⁩/cocos2d-x⁩/cocos⁩ 创建一个 test 文件夹用于存放相关文件：

![](jsb/store-file.png)

这里先准备 `ABCJSBBridge.h`，里面主要是申明了一个 `abcLog` 的函数，此函数就是供 JS 层调用打 log 的，另外由于打 log 方法肯定在 js 层很多地方都会使用，所以这里采用了一个单例模式，提供了 `getInstance()` 来获取当前类的实例。

```cpp
#include <string>
#include "base/CCConsole.h"

#ifndef PROJ_ANDROID_STUDIO_ABCJSBBRIDGE_H
#define PROJ_ANDROID_STUDIO_ABCJSBBRIDGE_H
#define DLLOG(format, ...)      cc::log(format, ##__VA_ARGS__)
#endif //PROJ_ANDROID_STUDIO_ABCJSBBRIDGE_H

namespace abc
{
    class IABCJSBBridgeImpl;
    class JSBBridge
    {
    public:
        void abcLog(const int level, const std::string& tag, const std::string& msg);
        /**
        * Returns a shared instance of the director.
        * @js _getInstance
        */
        static JSBBridge* getInstance();

        /** @private */
        JSBBridge();
        /** @private */
        ~JSBBridge();
        bool init();

    private:
        std::unique_ptr<IABCJSBBridgeImpl> _impl;
    };
}
```

下面是对应的实现 `ABCJSBBridge.cpp`：

```cpp
#include "ABCJSBBridge.h"

// include platform specific implement class
#if (CC_TARGET_PLATFORM == CC_PLATFORM_MAC || CC_TARGET_PLATFORM == CC_PLATFORM_IOS)

#include "ABCJSBBridge-apple.h"
#define JSBBridgeImpl  JSBBridgeApple

#elif (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)

#include "ABCJSBBridge-android.h"
#define JSBBridgeImpl  JSBBridgeAndroid

#endif

namespace abc
{
    // singleton stuff
    static JSBBridge *s_SharedJSBBridge = nullptr;

    JSBBridge::JSBBridge()
    {
        DLLOG("Construct JSBBridge %p", this);
        init();
    }

    JSBBridge::~JSBBridge()
    {
        DLLOG("Destruct JSBBridge %p", this);
        s_SharedJSBBridge = nullptr;
    }

    JSBBridge* JSBBridge::getInstance()
    {
        if (!s_SharedJSBBridge)
        {
            DLLOG("getInstance JSBBridge ");
            s_SharedJSBBridge = new (std::nothrow) JSBBridge();
            CCASSERT(s_SharedJSBBridge, "FATAL: Not enough memory for create JSBBridge");
        }

        return s_SharedJSBBridge;
    }

    bool JSBBridge::init(void)
    {
        DLLOG("init JSBBridge ");
        _impl.reset(new JSBBridgeImpl());
    }

    void JSBBridge::abcLog(const int level, const std::string& tag, const std::string& msg)
    {
        _impl->abcLog(level, tag, msg);
    }
}
```

`CCIABCJSBBridgeIml.h`：

```cpp
#include <string>
#include "base/CCConsole.h"

#ifndef PROJ_ANDROID_STUDIO_CCIABCJSBBRIDGEIML_H
#define PROJ_ANDROID_STUDIO_CCIABCJSBBRIDGEIML_H

#endif //PROJ_ANDROID_STUDIO_CCIABCJSBBRIDGEIML_H

#define DLLOG(format, ...)      cc::log(format, ##__VA_ARGS__)

namespace abc
{
    class IABCJSBBridgeImpl
    {
    public:
        virtual ~IABCJSBBridgeImpl(){}
        virtual void abcLog(const int level, const std::string& tag, const std::string& msg) = 0;
    };
}
```

这里为了方便区分 Android 平台和 iOS 平台的实现，仿照 Cocos 源码其他地方的写法，分别提供了 `ABCJSBBridge-android.h` 和 `ABCJSBBridge-apple.h` 以及对应的实现类，两个平台分别继承 `IABCJSBBridgeImpl` 然后实现内部的虚函数即可。

## JSB 配置脚本编写

为了保持跟官方的一致，我们在 **tools/tojs** 目录下创建 `genbindings_test.py`，里面的内容基本跟 `genbindings.py` 差不多，主要区别有如下几点：
1. 去掉了 `cmd_args` 那段，里面主要是记录了 cocos 自带的一些需要生成 jsb 的文件，因为考虑到项目可能会对 Cocos 源码进行修改，如果这时候把这部分保留的话，当运行脚本后会把我们自带的修改就给覆盖掉了。
2. 取消了定制的 `output_dir` 也就是最终生成的 js，c++ 等绑定文件的路径，而是保持跟 Cocos 一样，也即在 **cocos/bindings/auto**，主要为了方便下一步配置 mk 文件。

    ![](jsb/cancel-output_dir.png)

这里先说下 `genbindings_test.py` 里面配置的一些参数：

1. `NDK_ROOT 环境变量`：指示 NDK 的根目录
2. `PYTHON_BIN 环境变量`：指示 Python 命令的路径
3. `cocosdir`：Cocos 引擎根目录，在用户工程下一般是 ****
4. `jsbdir`：JSB 目录，在用户工程下一般是 **cocos/scripting/js-bindings**
5. `cxx_generator_root`：自动绑定工具路径，在用户工程下一般是 **tools/bindings-generator**
6. `output_dir`：生成的绑定文件存储路径
7. `cmd_args` 和 `custom_cmd_args`：所有配置文件，及其对应的模块名称和输出文件名称

这里自动绑定工具使用 `libclang` 的 python API 对 C++ 头文件进行语法分析。绑定的过程大致如下：
- 创建绑定代码输出文件。
- 递归扫描需要绑定的头文件。
- 通过 `libclang` 的 `clang.cindex` python 模块找到所有需要绑定的类，公共 API 等。
- 按照模版生成类绑定函数，API 绑定函数，绑定注册函数并输出到文件中。

关于 `custom_cmd_args` 参数的配置这里说明下：

```xml
'cocos2dx_test.ini': ('cocos2dx_test', 'jsb_cocos2dx_test_auto'),
配置文件：（模块名称，输出的绑定文件名）
```

这里的配置文件 `cocos2dx_test.ini` 又是用来干嘛的呢？其实就跟 **tools/tojs/** 下的其他 `.ini` 文件类似，主要让自动绑定工具知道哪些 API 要被绑定和以什么样的方式绑定，写法上直接参考 Cocos 已有的 ini 文件，这里展示下 `cocos2dx_test.ini` 的内容：

```shell
[cocos2dx_test]
# the prefix to be added to the generated functions. You might or might not use this in your own
# templates
prefix = cocos2dx_test

# create a target namespace (in javascript, this would create some code like the equiv. to `ns = ns || {}`)
# all classes will be embedded in that namespace
target_namespace = abc

android_headers = -I%(androidndkdir)s/platforms/android-14/arch-arm/usr/include -I%(androidndkdir)s/sources/cxx-stl/gnu-libstdc++/4.8/libs/armeabi-v7a/include -I%(androidndkdir)s/sources/cxx-stl/gnu-libstdc++/4.8/include -I%(androidndkdir)s/sources/cxx-stl/gnu-libstdc++/4.9/libs/armeabi-v7a/include -I%(androidndkdir)s/sources/cxx-stl/gnu-libstdc++/4.9/include
android_flags = -D_SIZE_T_DEFINED_ 

clang_headers = -I%(clangllvmdir)s/%(clang_include)s 
clang_flags = -nostdinc -x c++ -std=c++11 -U __SSE__

cocos_headers = -I%(cocosdir)s -I%(cocosdir)s/cocos -I%(cocosdir)s/cocos/platform/android -I%(cocosdir)s/external

cocos_flags = -DANDROID

cxxgenerator_headers = 

# extra arguments for clang
extra_arguments = %(android_headers)s %(clang_headers)s %(cxxgenerator_headers)s %(cocos_headers)s %(android_flags)s %(clang_flags)s %(cocos_flags)s %(extra_flags)s 

# what headers to parse
headers = %(cocosdir)s/cocos/test/ABCJSBBridge.h

# cpp_headers = network/js_network_manual.h

# what classes to produce code for. You can use regular expressions here. When testing the regular
# expression, it will be enclosed in "^$", like this: "^Menu*$".
classes = JSBBridge

# what should we skip? in the format ClassName::[function function]
# ClassName is a regular expression, but will be used like this: "^ClassName$" functions are also
# regular expressions, they will not be surrounded by "^$". If you want to skip a whole class, just
# add a single "*" as functions. See bellow for several examples. A special class name is "*", which
# will apply to all class names. This is a convenience wildcard to be able to skip similar named
# functions from all classes.
skip = JSBBridge::[init]

rename_functions = 

rename_classes =

# for all class names, should we remove something when registering in the target VM?
remove_prefix = 

# classes for which there will be no "parent" lookup
classes_have_no_parents = JSBBridge

# base classes which will be skipped when their sub-classes found them.
base_classes_to_skip = Clonable

# classes that create no constructor
# Set is special and we will use a hand-written constructor
abstract_classes = JSBBridge
```

其实从里面的注释也讲的非常详细，这里说几个主要的属性及含义：

![](jsb/ini-file-properties.png)

以上的配置完成后，就可以按照如下命令运行自动生成绑定文件：

![](jsb/generate-binding-file.png)

然后就会看到在 **cocos/scripting/js-bindings** 下面多出了三个绑定文件：

![](jsb/binding-file.png)

打开生成的 `jsb_cocos2dx_test_autp.cpp`：

```cpp
#include "scripting/js-bindings/auto/jsb_cocos2dx_test_auto.h"
#include "scripting/js-bindings/manual/jsb_conversions.h"
#include "scripting/js-bindings/manual/jsb_global.h"
#include "test/ABCJSBBridge.h"

se::Object* __jsb_abc_JSBBridge_proto = nullptr;
se::Class* __jsb_abc_JSBBridge_class = nullptr;

static bool js_cocos2dx_test_JSBBridge_abcLog(se::State& s)
{
    abc::JSBBridge* cobj = (abc::JSBBridge*)s.nativeThisObject();
    SE_PRECONDITION2(cobj, false, "js_cocos2dx_test_JSBBridge_abcLog : Invalid Native Object");
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 3) {
        int arg0 = 0;
        std::string arg1;
        std::string arg2;
        ok &= seval_to_int32(args[0], (int32_t*)&arg0);
        ok &= seval_to_std_string(args[1], &arg1);
        ok &= seval_to_std_string(args[2], &arg2);
        SE_PRECONDITION2(ok, false, "js_cocos2dx_test_JSBBridge_abcLog : Error processing arguments");
        cobj->abcLog(arg0, arg1, arg2);
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 3);
    return false;
}
SE_BIND_FUNC(js_cocos2dx_test_JSBBridge_abcLog)

static bool js_cocos2dx_test_JSBBridge_getInstance(se::State& s)
{
    const auto& args = s.args();
    size_t argc = args.size();
    CC_UNUSED bool ok = true;
    if (argc == 0) {
        abc::JSBBridge* result = abc::JSBBridge::getInstance();
        ok &= native_ptr_to_seval<abc::JSBBridge>((abc::JSBBridge*)result, &s.rval());
        SE_PRECONDITION2(ok, false, "js_cocos2dx_test_JSBBridge_getInstance : Error processing arguments");
        return true;
    }
    SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 0);
    return false;
}
SE_BIND_FUNC(js_cocos2dx_test_JSBBridge_getInstance)

bool js_register_cocos2dx_test_JSBBridge(se::Object* obj)
{
    auto cls = se::Class::create("JSBBridge", obj, nullptr, nullptr);

    cls->defineFunction("abcLog", _SE(js_cocos2dx_test_JSBBridge_abcLog));
    cls->defineStaticFunction("getInstance", _SE(js_cocos2dx_test_JSBBridge_getInstance));
    cls->install();
    JSBClassType::registerClass<abc::JSBBridge>(cls);

    __jsb_abc_JSBBridge_proto = cls->getProto();
    __jsb_abc_JSBBridge_class = cls;

    se::ScriptEngine::getInstance()->clearException();
    return true;
}

bool register_all_cocos2dx_test(se::Object* obj)
{
    // Get the ns
    se::Value nsVal;
    if (!obj->getProperty("abc", &nsVal))
    {
        se::HandleObject jsobj(se::Object::createPlainObject());
        nsVal.setObject(jsobj);
        obj->setProperty("abc", nsVal);
    }
    se::Object* ns = nsVal.toObject();

    js_register_cocos2dx_test_JSBBridge(ns);
    return true;
}
```

看到这里是不是感觉很熟悉，跟 Cocos 已有的那些 cpp 完全一样，甚至包括里面的注册函数和类的定义都给全部自动生成了。

## Cocos 编译配置

尽管经过上面一步后我们已经生成出来了绑定文件，但是 js 层还是没法直接使用，因为还需要把生成的绑定文件，配置到 mk 文件中，从而跟其他 c++ 文件一起编译才行，这部分主要就是将最后的 mk 编译配置。

1. 打开 `cocos/Android.mk` 文件，在其中加上最开始实现的 cpp 文件：

    ![](jsb/100.png)

2. 打开 `cocos/bindings/proj.android/Android.mk`，在其中加上上一步生成的 cpp 文件：

    ![](jsb/110.png)

3. 打开 `build/jsb-default/frameworks/runtime-src/Classes/jsb_module_register.cpp`，添加引擎启动时调用绑定文件的注册函数，从而将其添加到 js 环境中：

    ![](jsb/111.png)

4. 打开 `cocos/bindings/script/jsb_boot.js`，在其中增加 js 对象的初始化：

    ![](jsb/112.png)

上面说到的 `jsb_module_register.cpp` 和 `jsb_boot.js` 其实都是在 Cocos 引擎初始化的时候就会去调用的，关于启动流程感兴趣的可以去看看这篇 [文章](https://gowa.club/Cocos-Creator/Cocos%20Creator%E7%94%9F%E6%88%90%E9%A1%B9%E7%9B%AE%E7%9A%84%E5%90%AF%E5%8A%A8%E5%B7%A5%E4%BD%9C%E6%B5%81%E7%A8%8B.html)。

经过上面这些配置后，最终就可以在 js 层直接像下面这样来进行调用，而不是用 `callStaticMethod` 方式：

![](jsb/called-injs.png)

## 自动绑定的限制条件

自动绑定依赖于 Bindings Generator 工具，Cocos 官方还在 GitHub 上单独把这部分拎出来了：<https://github.com/cocos-creator/bindings-generator>。Bindings Generator 工具它可以将 C++ 类的公共方法和公共属性绑定到脚本层。自动绑定工具尽管非常强大，但是还是会有一些限制：
1. 只能够针对类生成绑定，不可以绑定结构体，独立函数等。
2. 不能够生成 `Delegate` 类型的 API，因为脚本中的对象是无法继承 C++ 中的 `Delegate` 类并重写其中的 `Delegate` 函数的。
3. 子类中重写了父类的 API 的同时，又重载了这个 API。
4. 部分 API 实现内容并没有完全体现在其 API 定义中。
5. 在运行时由 C++ 主动调用的 API。

## 总结

总的来说，自动绑定 JSB 只需要要求开发者编写相关的实现 C++ 实现类，一个配置文件，然后执行一条命令就能完整整个的绑定过程。如果没有什么特殊定制，相对于手动绑定来说，效率上还是提高了不少。实际工作做可以依据具体情况先用自动绑定功能，然后再去手动修改生成的绑定文件，达到事倍功半的效果。

> 本文所有内容遵循 [Creative Commons Attribution 4.0 International License](https://creativecommons.org/licenses/by/4.0/) 协议发布。
