# Cocos Native Plugin Quick Tutorial

If you want to use third-party native libraries in a native project, you can follow the steps in this article.

This article requires some understanding of native project compilation and generation, which developers can learn about through [CMake official website](https://cmake.org/). We have also prepared a sample project [GitHub](https://github.com/PatriceJiang/ccplugin_tutorial) for reference.

## Create a native plugin

### Basic Setup

- Create a cocos project with Cocos Creator 3.6+

    Start the CocosCreator application, and run `Create an empty project` in the chosen folder.

    ![create ](doc/images/1_create_empty_project.PNG)

- Create and save an empty scene

    ![save scene](doc/images/1_2_save_emtpy_scene.PNG)

- A native build is needed to be created first to generate the `native/` directory.

    Create a build task for any native platform, for example Windows

    ![build windows](doc/images/1_3_create_windows_build.PNG)

    Run **Build**, `native/` folder should be created after that.

    ```console
    $ tree native/ -L 2
    native/
    └── engine
        ├── common
        └── win64

    ```

- Create a folder for the plugin

    ```console
    mkdir -p native/plugins/hello_cocos
    ```

### Add support for Windows

- Prepare the folder for Windows

    ```console
    mkdir -p native/plugins/hello_cocos/windows/
    ```

- Copy precompiled `hello_cocos` library and header files into the plugin directory

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

- Add files `hello_cocos_glue.cpp`, `CMakeLists.txt` and `hello_cocos_glue-config.cmake`

    ```console
    mkdir native/plugins/hello_cocos/src
    touch native/plugins/hello_cocos/src/hello_cocos_glue.cpp
    touch native/plugins/hello_cocos/src/CMakeLists.txt
    touch native/plugins/hello_cocos/windows/hello_cocos_glue-config.cmake
    ```

    Now the plugin directory should look like this:

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

- Edit `hello_cocos_glue-config.cmake` with following content

    ```cmake
    set(_hello_cocos_GLUE_DIR ${CMAKE_CURRENT_LIST_DIR})

    add_library(hello_cocos STATIC IMPORTED GLOBAL)
    set_target_properties(hello_cocos PROPERTIES
        IMPORTED_LOCATION ${_hello_cocos_GLUE_DIR}/lib/hello_cocos.lib
        IMPORTED_LOCATION_DEBUG ${_hello_cocos_GLUE_DIR}/lib/hello_cocosd.lib
    )

    include(${_hello_cocos_GLUE_DIR}/../src/CMakeLists.txt)
    ```

    Declare an existing library `hello_cocos` add import it.

- Edit `native/plugins/hello_cocos/src/CMakeLists.txt` with following content

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

- Create `cc_plugin.json` in `native/plugins/hello_cocos/`

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

Now the plugin is created and enabled in this project. But it won't compile, since there is no code in `hello_cocos_glue.cpp`

Let's **Build** again in the build panel to refresh the Visual Studio project.

- Open the Visual Studio project under `build/windows/proj/`

Two additional targets are generated

![Solution Explorer](./doc/images/2_1_vs_project.PNG)

If you run the target directly, you will fail with the following link error:

![link error](./doc/images/2_1_link_error.PNG)

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

Start the project in debug mode, a new window should launch.

![empty window](./doc/images/2_3_empty_window.PNG)

Until now, we are not sure if the plugin is enabled or not.

In the output window, we can the debug URL of the devtools

![debug url](./doc/images/2_3_debug_url.PNG)

Open the URL with chrome and type following code in Console

```javascript
new Demo("World").hello("Cocos")
```

![devtools](./doc/images/2_5_devtool.PNG)

The class `hello_cocos` and its methods are exported successfully!

### Add support for Android

- Add a build task for Android

- Create a folder for android

    ```console
    mkdir native/plugins/hello_cocos/android
    ```

- Copy precompiled libraries and headers and create `hello_cocos_glue-config.cmake`

    The folder should look like this:

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

- Edit `hello_cocos_glue-config.cmake`

    ```cmake
    set(_hello_cocos_GLUE_DIR ${CMAKE_CURRENT_LIST_DIR})


    add_library(hello_cocos STATIC IMPORTED GLOBAL)
    set_target_properties(hello_cocos PROPERTIES
        IMPORTED_LOCATION ${_hello_cocos_GLUE_DIR}/${ANDROID_ABI}/lib/libhello_cocos.a
    )

    include(${_hello_cocos_GLUE_DIR}/../src/CMakeLists.txt)
    ```

- Update `cc_plugin.json`

    Add `android` to `platforms` field

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

- **Create an android build task**

    ![Android build](./doc/images/3_1_android_build.PNG)

Run **Build** and debug with Android Studio.

### Add support for iOS

- Add a build task for iOS

    Prepare a folder for iOS

    ```
    mkdir -p native/plugins/hello_cocos/ios/lib
    ```

    Copy precompiled libraries and edit `native/plugins/hello_cocos/ios/hello_cocos_glue-config.cmake`

    ```cmake
    set(_hello_cocos_GLUE_DIR ${CMAKE_CURRENT_LIST_DIR})


    add_library(hello_cocos STATIC IMPORTED GLOBAL)
    set_target_properties(hello_cocos PROPERTIES
        IMPORTED_LOCATION ${_hello_cocos_GLUE_DIR}/lib/libhello_cocos.a
    )

    include(${_hello_cocos_GLUE_DIR}/../src/CMakeLists.txt)
    ```

### Add support for Mac

- Add a build task for MacOS

- Prepare a folder for MacOS

    ```console
    mkdir -p native/plugins/hello_cocos/mac/lib
    ```

- Copy precompiled libraries and edit `native/plugins/hello_cocos/ios/hello_cocos_glue-config.cmake`

    ```cmake
    set(_hello_cocos_GLUE_DIR ${CMAKE_CURRENT_LIST_DIR})


    add_library(hello_cocos STATIC IMPORTED GLOBAL)
    set_target_properties(hello_cocos PROPERTIES
        IMPORTED_LOCATION ${_hello_cocos_GLUE_DIR}/lib/libhello_cocos.a
    )

    include(${_hello_cocos_GLUE_DIR}/../src/CMakeLists.txt)
    ```

- Update `cc_plugin.json` again**, Add `iOS` & `mac` to `platforms` field

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

Now a plugin supporting Android, Windows, MacOS & iOS is done.

The final content of the plugins is:

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

It's ready to ship.

## Distribute with Editor Extension

Follow the steps in [Editor Extension](../..//editor/extension/readme.md) to create an Editor Extension, you need to copy the directory `native/plugins/hello_cocos` into the extension package when [Packaging the Extension](../../editor/extension/store/upload-store.md#packaging-the-extension), then submit.

About upgrade: The editor extension system does not support update detection at the moment. Plugin users need to check in Cocos Store or Dashboard and manually upgrade to the latest version.
Of course, developers can still implement their version management based on the existing extension system.
