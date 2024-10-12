# 原生插件创建范例

如果想在原生项目中使用第三方原生库，则可以按照本文的步骤进行。

本文需要对原生工程的编译生成有一定了解，开发者可以通过 [CMake 官网](https://cmake.org/) 了解。 我们也准备了范例工程 [GitHub](https://github.com/PatriceJiang/ccplugin_tutorial) 以供参考。

## 创建原生插件

### 插件开发工程 Windows 配置

示例中，我们将引入 hello_cocos.lib 作为 windows 平台上的插件，引入引擎并使其支持在 TS/JS 中使用。其他平台将使用 hello_cocos.a 为例，如果要使用其他库，请提前编译到对应平台。

- 使用 Cocos Creator 3.6+ 创建一个工程

    启动 CocosCreator，在指定目录执行 `创建空工程`。

    ![create](doc/images/1_create_empty_project.png)

- 创建并保存一个空的场景

    ![save scene](doc/images/1_2_save_emtpy_scene.png)

- 通过 **构建发布** 面板导出原生工程并构建，生成 `native/` 目录

    这里在 Windows 上新建构建任务。

    ![build windows](doc/images/1_3_create_windows_build.png)

    执行 **构建**，同时生成 `native/` 目录。

    通过控制台（Windows CMD 或 PowerShell 等类似软件）查看目录的内容：

    ```console
    $ tree native/ -L 2
    native/
    └── engine
        ├── common
        └── win64

    ```

- 在 `native/` 中创建插件存放的目录

    ```console
    mkdir -p native/plugins/hello_cocos
    ```

### 添加原生插件对 Windows 的支持

- 添加 Windows 平台相关的子目录：

    ```console
    mkdir -p native/plugins/hello_cocos/windows/
    ```

- 把预先编译好的依赖库 `hello_cocos.lib` 和头文件拷贝到对应的目录：

    ```console
    $ tree native/plugins/
    native/plugins/
    └── hello_cocos
        ├── include
        │   └── hello_cocos.h
        └── windows
            └── lib
                ├── hello_cocos.lib
                └── hello_cocosd.lib

    ```

- 添加文件 `hello_cocos_glue.cpp`，`CMakeLists.txt` 和 `hello_cocos_glue-config.cmake`：

    ```console
    mkdir native/plugins/hello_cocos/src
    touch native/plugins/hello_cocos/src/hello_cocos_glue.cpp
    touch native/plugins/hello_cocos/src/CMakeLists.txt
    touch native/plugins/hello_cocos/windows/hello_cocos_glue-config.cmake
    ```

    当前插件目录的内容：

    ```console
    $ tree native/plugins/hello_cocos/
    native/plugins/hello_cocos/
    ├── include
    │   └── hello_cocos.h
    ├── src
    │   ├── CMakeLists.txt
    │   └── hello_cocos_glue.cpp
    └── windows
        ├── hello_cocos_glue-config.cmake
        └── lib
            ├── hello_cocos.lib
            └── hello_cocosd.lib
    ```

- 编辑 `hello_cocos_glue-config.cmake` 中添加声明 `hello_cocos.lib` 和导入的内容：

    ```cmake
    set(_hello_cocos_GLUE_DIR ${CMAKE_CURRENT_LIST_DIR})

    add_library(hello_cocos STATIC IMPORTED GLOBAL)
    set_target_properties(hello_cocos PROPERTIES
        IMPORTED_LOCATION ${_hello_cocos_GLUE_DIR}/lib/hello_cocos.lib
        IMPORTED_LOCATION_DEBUG ${_hello_cocos_GLUE_DIR}/lib/hello_cocosd.lib
    )

    include(${_hello_cocos_GLUE_DIR}/../src/CMakeLists.txt)
    ```

- 编辑 `native/plugins/hello_cocos/src/CMakeLists.txt`，并添加如下内容：

    ```cmake
    set(_hello_cocos_GLUE_SRC_DIR ${CMAKE_CURRENT_LIST_DIR})

    add_library(hello_cocos_glue ${_hello_cocos_GLUE_SRC_DIR}/hello_cocos_glue.cpp)

    target_link_libraries(hello_cocos_glue
        hello_cocos
        ${ENGINE_NAME} # cocos_engine
    )

    target_include_directories(hello_cocos_glue PRIVATE
        ${_hello_cocos_GLUE_SRC_DIR}/../include
    )
    ```

- 在目录 `native/plugins/hello_cocos/` 中创建配置文件 `cc_plugin.json`

    ```json
    {
        "name":"hello-cocos-demo",
        "version":"0.1.0",
        "author":"cocosdemo",
        "engine-version":">=3.6.0",
        "modules":[
            {
                "target":"hello_cocos_glue"
            }
        ],
        "platforms":["windows"]
    }
    ```

    现在原生插件所需的文件已经创建，但还不能编译。文件 `hello_cocos_glue.cpp` 需要注册插件的初始化函数。

    再次执行 **构建** 触发 Visual Studio 工程的更新。

- 使用 Visual Studio 打开目录 `build/windows/proj/` 中的 sln 文件

    - 自动生成一个 `plugin_registry` 目标，用于初始化所有启用的插件：

        ![Solution Explorer](./doc/images/2_1_vs_project.png)

    - 直接运行目标会导致类似的报错：

        ![link error](./doc/images/2_1_link_error.png)

- 编辑 `hello_cocos_glue.cpp`

    ```c++
    #include "hello_cocos.h"
    #include "bindings/sebind/sebind.h"
    #include "plugins/bus/EventBus.h"
    #include "plugins/Plugins.h"

    // export c++ methods to JS
    static bool register_demo(se::Object *ns) {

    sebind::class_<Demo> klass("Demo");

    klass.constructor<const char *>()
        .function("hello", &Demo::hello);
    klass.install(ns);
    return true;
    }

    void add_demo_class() {
    using namespace cc::plugin;
    static Listener listener(BusType::SCRIPT_ENGINE);
    listener.receive([](ScriptEngineEvent event) {
        if (event == ScriptEngineEvent::POST_INIT) {
        se::ScriptEngine::getInstance()->addRegisterCallback(register_demo);
        }
    });
    }

    /**
    * Regist a new cc plugin entry function
    * first  param: should match the name in cc_plugin.json
    * second param: callback when engine initialized
    */ 
    CC_PLUGIN_ENTRY(hello_cocos_glue, add_demo_class);
    ```

    再次编译后不在报错，此时可正确的编译和运行工程。

- 运行目标工程：

    ![empty window](./doc/images/2_3_empty_window.png)

- 为了验证我们的原生插件是否已经加载，我们需要连接 devtools：

    从 `Output` 面板，获取调试连接。

    ![debug url](./doc/images/2_3_debug_url.png)

    打开浏览器，输入上图中的调试链接地址，在控制台（Console）中键入下面的代码：

    ```javascript
    new Demo("World").hello("Cocos")
    ```

    ![devtools](./doc/images/2_5_devtool.png)

    根据输出可以确认，我们的接口已经成功通过原生插件导出。

### 添加原生插件对 Android 的支持

- 添加 Android 的构建任务

- 创建 Android 相关的原生插件目录

    ```console
    mkdir native/plugins/hello_cocos/android
    ```

- 将预先编译好的依赖库和头文件拷贝到对应的目录，创建 `hello_cocos_glue-config.cmake`

    Android 目录的状态：

    ```console
    $ tree native/plugins/hello_cocos/android/
    native/plugins/hello_cocos/android/
    ├── hello_cocos_glue-config.cmake
    ├── arm64-v8a
    │   └── lib
    │       └── libhello_cocos.a
    └── armeabi-v7a
        └── lib
            └── libhello_cocos.a

    ```

- 编辑 `hello_cocos_glue-config.cmake`

    ```cmake
    set(_hello_cocos_GLUE_DIR ${CMAKE_CURRENT_LIST_DIR})

    add_library(hello_cocos STATIC IMPORTED GLOBAL)
    set_target_properties(hello_cocos PROPERTIES
        IMPORTED_LOCATION ${_hello_cocos_GLUE_DIR}/${ANDROID_ABI}/lib/libhello_cocos.a
    )

    include(${_hello_cocos_GLUE_DIR}/../src/CMakeLists.txt)
    ```

- 更新 `cc_plugin.json`，添加 `android` 到 `platforms` 字段

    ```json
    {
        "name":"hello-cocos-demo",
        "version":"0.1.0",
        "author":"cocosdemo",
        "engine-version":">=3.6.0",
        "modules":[
            {
                "target":"hello_cocos_glue"
            }
        ],
        "platforms":["windows", "android"]
    }

    ```

- 新增 Android 的构建任务

    ![Android build](./doc/images/3_1_android_build.png)

构建后可使用 Android Studio 打开工程，并使用 devtool 调试验证。

### 添加原生插件对 iOS 的支持

- 添加 iOS 的构建任务

- 创建 iOS 相关的原生插件目录

    ```
    mkdir -p native/plugins/hello_cocos/ios/lib
    ```

- 将预先编译好的依赖库和头文件拷贝到对应的目录，创建 `hello_cocos_glue-config.cmake`，如根据下列示例编辑：

    ```cmake
    set(_hello_cocos_GLUE_DIR ${CMAKE_CURRENT_LIST_DIR})


    add_library(hello_cocos STATIC IMPORTED GLOBAL)
    set_target_properties(hello_cocos PROPERTIES
        IMPORTED_LOCATION ${_hello_cocos_GLUE_DIR}/lib/libhello_cocos.a
    )

    include(${_hello_cocos_GLUE_DIR}/../src/CMakeLists.txt)
    ```

### 添加原生插件对 MacOS 的支持

- 添加 MacOS 的构建任务

- 创建 MacOS 相关的原生插件目录

    ```console
    mkdir -p native/plugins/hello_cocos/mac/lib
    ```

- 将预先编译好的依赖库和头文件拷贝到对应的目录，创建`hello_cocos_glue-config.cmake`

    ```cmake
    set(_hello_cocos_GLUE_DIR ${CMAKE_CURRENT_LIST_DIR})

    add_library(hello_cocos STATIC IMPORTED GLOBAL)
    set_target_properties(hello_cocos PROPERTIES
        IMPORTED_LOCATION ${_hello_cocos_GLUE_DIR}/lib/libhello_cocos.a
    )

    include(${_hello_cocos_GLUE_DIR}/../src/CMakeLists.txt)
    ```

- 更新 `cc_plugin.json`，添加 `iOS` 和 `mac` 到 `platforms` 字段

    ```json
    {
        "name":"hello-cocos-demo",
        "version":"0.1.0",
        "author":"cocosdemo",
        "engine-version":">=3.6.0",
        "modules":[
            {
                "target":"hello_cocos_glue"
            }
        ],
        "platforms":["windows", "android", "iOS", "mac"]
    }

    ```

至此，一个支持 Android、Windows、MacOS 以及 iOS 的原生插件就开发完成了。

原生插件目录的最终内容如下：

```console
$ tree native/plugins/hello_cocos/
native/plugins/hello_cocos
├── cc_plugin.json
├── include
│   └── hello_cocos.h
├── src
│   ├── CMakeLists.txt
│   └── hello_cocos_glue.cpp
├── android
│   ├── hello_cocos_glue-config.cmake
│   ├── arm64-v8a
│   │   └── lib
│   │       └── libhello_cocos.a
│   └── armeabi-v7a
│       └── lib
│           └── libhello_cocos.a
├── ios
│   ├── hello_cocos_glue-config.cmake
│   └── lib
│       └── libhello_cocos.a
├── mac
│   ├── hello_cocos_glue-config.cmake
│   └── lib
│       └── libhello_cocos.a
└── windows
    ├── hello_cocos_glue-config.cmake
    └── lib
        ├── hello_cocos.lib
        └── hello_cocosd.lib
```

下一步即可通过 **构建发布** 面板进行发布。

## 使用编辑器扩展机制发布

根据 [扩展编辑器](../../editor/extension/readme.md) 创建编辑器扩展，在 [打包扩展](../../editor/extension/store/upload-store.md#packaging-the-extension) 前把目录 `native/plugins/hello_cocos` 一并打包到扩展中，再发布。开发者在下载扩展后，原生插件就会启用。

关于升级：目前编辑器扩展系统不支持升级检测，用户需要到 Cocos 商城手动更新。
