# Native Plugin Creation Example

If you want to use third-party native libraries in native projects, you can follow the steps in this article.

This article requires some understanding of native project compilation and generation. Developers can learn about it through the [CMake official website](https://cmake.org/). We have also prepared a [Native Plugin Creation and Usage Example](https://github.com/zhefengzhang/cocos-native-plugins) for reference.

## Creating Native Plugins

### Compiling Dependent Libraries or Static Libraries

Use the compilation tools provided by the application platform to compile c or cpp files into .lib or .a files. In the [Native Plugin Creation and Usage Example](https://github.com/zhefengzhang/cocos-native-plugins) repository, the hello_cocos.cpp file in the src folder has been compiled into .lib and .a files and added to the plugin directories of various platforms. The jni directory in the repository provides the configuration and code used when compiling .a files with the `ndk-build` command on the Android platform for developers' reference. Please compile for other platforms yourself.

### Windows Configuration for Plugin Development Project

In this example, we will introduce hello_cocos.lib as a plugin on the Windows platform, integrate it into the engine, and make it available for use in TS/JS. Other platforms will use hello_cocos.a as an example. If you want to use other libraries, please compile them for the corresponding platform in advance.

- Create a project using Cocos Creator 3.6.3 or higher

    Start CocosCreator and execute `Create Empty Project` in the specified directory.

    ![create](doc/images/1_create_empty_project.png)

- Create and save an empty scene

    ![save scene](doc/images/1_2_save_emtpy_scene.png)

- Export the native project through the **Build & Publish** panel and build it to generate the `native/` directory

    Here we create a new build task for Windows.

    ![build windows](doc/images/1_3_create_windows_build.png)

    Execute **Build**, which will also generate the `native/` directory.

    View the contents of the directory through the console (Windows CMD or PowerShell or similar software):

    ```console
    $ tree native/ -L 2
    native/
    └── engine
        ├── common
        └── win64

    ```

- Create a directory for plugin storage in `native/`

    ```console
    mkdir -p native/native-plugin/
    ```

### Adding Native Plugin Support for Windows

- Add Windows platform-related subdirectories:

    ```console
    mkdir -p native/native-plugin/windows/
    ```

- Copy the pre-compiled dependency library `hello_cocos.lib` and header files to the corresponding directory:

    ```console
    $ tree native/native-plugin/

    native/native-plugin/
    ├── include
    │   └── hello_cocos.h
    └── windows
        └── lib
            ├── hello_cocos.lib
            └── hello_cocosd.lib
    ```

- Add files `hello_cocos_glue.cpp`, `CMakeLists.txt` and `hello_cocos_glue-config.cmake`:

    ```console
    mkdir native/native-plugin/src
    touch native/native-plugin/src/hello_cocos_glue.cpp
    touch native/native-plugin/src/CMakeLists.txt
    touch native/native-plugin/hello_cocos_glue-config.cmake
    ```

    Current plugin directory contents:

    ```console
    $ tree native/native-plugin/
    native/native-plugin/
    ├── include
    │   └── hello_cocos.h
    ├── src
    │   ├── CMakeLists.txt
    │   └── hello_cocos_glue.cpp
    └── windows
        ├── hello_cocos_glue-config.cmake
        └── lib
            ├── hello_cocos.lib
            └── hello_cocosd.lib
    ```

- Edit `hello_cocos_glue-config.cmake` to add declarations for `hello_cocos.lib` and imported content:

    ```cmake
    set(_hello_cocos_GLUE_DIR ${CMAKE_CURRENT_LIST_DIR})

    add_library(hello_cocos STATIC IMPORTED GLOBAL)
    set_target_properties(hello_cocos PROPERTIES
        IMPORTED_LOCATION ${_hello_cocos_GLUE_DIR}/lib/hello_cocos.lib
        IMPORTED_LOCATION_DEBUG ${_hello_cocos_GLUE_DIR}/lib/hello_cocosd.lib
    )

    include(${_hello_cocos_GLUE_DIR}/../src/CMakeLists.txt)
    ```

- Edit `native/native-plugin/src/CMakeLists.txt` and add the following content:

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

- Create configuration file `cc_plugin.json` in directory `native/native-plugin/`

    ```json
    {
        "name":"hello-cocos-demo",
        "version":"1.0.0",
        "author":"cocos",
        "engine-version":">=3.6.3",
        "disabled":false,
        "modules":[
            {
                "target":"hello_cocos_glue"
            }
        ],
        "platforms":["windows"]
    }
    ```

    The files required for the native plugin have now been created, but they cannot be compiled yet. The file `hello_cocos_glue.cpp` needs to register the plugin's initialization function.

    Execute **Build** again to trigger the update of the Visual Studio project.

- Open the sln file in directory `build/windows/proj/` with Visual Studio

    - A `plugin_registry` target is automatically generated for initializing all enabled plugins:

        ![Solution Explorer](./doc/images/2_1_vs_project.png)

    - Directly running the target will result in similar error reports:

        ![link error](./doc/images/2_1_link_error.png)

- Edit `hello_cocos_glue.cpp`

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

    After compiling again, there are no more errors, and the project can now be compiled and run correctly.

- Run the target project:

    ![empty window](./doc/images/2_3_empty_window.png)

- To verify whether our native plugin has been loaded, we need to connect to devtools:

    From the `Output` panel, obtain the debugging connection.

    ![debug url](./doc/images/2_3_debug_url.png)

    Open the browser, enter the debugging link address from the image above, and type the following code in the console:

    ```javascript
    new Demo("World").hello("Cocos")
    ```

    ![devtools](./doc/images/2_5_devtool.png)

    Based on the output, it can be confirmed that our interface has been successfully exported through the native plugin.

### Adding Native Plugin Support for Android

- Add Android build task

- Create Android-related native plugin directory

    ```console
    mkdir native/native-plugin/android
    ```

- Copy pre-compiled dependency libraries and header files to the corresponding directory, create `hello_cocos_glue-config.cmake`

    Android directory status:

    ```console
    $ tree native/native-plugin/android/
    native/native-plugin/android/
    ├── hello_cocos_glue-config.cmake
    ├── arm64-v8a
    │   └── lib
    │       └── libhello_cocos.a
    └── armeabi-v7a
        └── lib
            └── libhello_cocos.a

    ```

- Edit `hello_cocos_glue-config.cmake`

    ```cmake
    set(_hello_cocos_GLUE_DIR ${CMAKE_CURRENT_LIST_DIR})

    add_library(hello_cocos STATIC IMPORTED GLOBAL)
    set_target_properties(hello_cocos PROPERTIES
        IMPORTED_LOCATION ${_hello_cocos_GLUE_DIR}/${ANDROID_ABI}/lib/libhello_cocos.a
    )

    include(${_hello_cocos_GLUE_DIR}/../src/CMakeLists.txt)
    ```

- Update `cc_plugin.json`, add `android` to the `platforms` field

    ```json
    {
        "name":"hello-cocos-demo",
        "version":"1.0.0",
        "author":"cocos",
        "engine-version":">=3.6.3",
        "disabled":false,
        "modules":[
            {
                "target":"hello_cocos_glue"
            }
        ],
        "platforms":["windows", "android"]
    }

    ```

- Add new Android build task

    ![Android build](./doc/images/3_1_android_build.png)

After building, you can open the project with Android Studio and use devtool for debugging verification.

### Adding Native Plugin Support for iOS

- Add iOS build task

- Create iOS-related native plugin directory

    ```
    mkdir -p native/native-plugin/ios/lib
    ```

- Copy pre-compiled dependency libraries and header files to the corresponding directory, create `hello_cocos_glue-config.cmake`, edit according to the following example:

    ```cmake
    set(_hello_cocos_GLUE_DIR ${CMAKE_CURRENT_LIST_DIR})


    add_library(hello_cocos STATIC IMPORTED GLOBAL)
    set_target_properties(hello_cocos PROPERTIES
        IMPORTED_LOCATION ${_hello_cocos_GLUE_DIR}/lib/libhello_cocos.a
    )

    include(${_hello_cocos_GLUE_DIR}/../src/CMakeLists.txt)
    ```

### Adding Native Plugin Support for MacOS

- Add MacOS build task

- Create MacOS-related native plugin directory

    ```console
    mkdir -p native/native-plugin/mac/lib
    ```

- Copy pre-compiled dependency libraries and header files to the corresponding directory, create `hello_cocos_glue-config.cmake`

    ```cmake
    set(_hello_cocos_GLUE_DIR ${CMAKE_CURRENT_LIST_DIR})

    add_library(hello_cocos STATIC IMPORTED GLOBAL)
    set_target_properties(hello_cocos PROPERTIES
        IMPORTED_LOCATION ${_hello_cocos_GLUE_DIR}/lib/libhello_cocos.a
    )

    include(${_hello_cocos_GLUE_DIR}/../src/CMakeLists.txt)
    ```

- Update `cc_plugin.json`, add `iOS` and `mac` to the `platforms` field

    ```json
    {
        "name":"hello-cocos-demo",
        "version":"1.0.0",
        "author":"cocos",
        "engine-version":">=3.6.3",
        "disabled":false,
        "modules":[
            {
                "target":"hello_cocos_glue"
            }
        ],
        "platforms":["windows", "android", "iOS", "mac"]
    }

    ```

At this point, a native plugin that supports Android, Windows, MacOS, and iOS has been developed.

The final contents of the native plugin directory are as follows:

```console
$ tree native/native-plugin/
native/native-plugin
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