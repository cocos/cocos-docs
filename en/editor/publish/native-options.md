# Publish to native

**Cocos Creator** supports four native platforms, which include **Android**, **iOS**, **Mac** and **Windows**.
The options to release games on iOS, Mac and Windows will only appear on those operating systems. This means it isn't possible to publish, for example, a game to iOS from a Windows computer. Currently, all native platforms are packaged together, you can configure the parameters of each native platform in the **Build** panel, and all native platform release packages can be generated in one build.

## Environment Configuration

Please refer to the [Setup Native Development Environment](setup-native-development.md) documentation for details.

## Build Options

For some general build options of platforms, please refer to the [General Build Options](build-options.md) documentation for details.

![native platform](publish-native/native_platform.jpg)

### MD5 Cache

**MD5 Cache** is used as a generic option, mainly to add MD5 information to all asset file names after the build, solving **the CDN asset cache problem** during **hot update**.

When enabled, if any asset fails to load, it is because after renaming the new file, it cannot be found. This is usually because some third party assets used in C++ was not loaded by `loader`. At this point, you can convert the URL before loading with the following method, to fix the loading problem:

```cpp
auto cx = ScriptingCore::getInstance()->getGlobalContext();
JS::RootedValue returnParam(cx);
ScriptingCore::getInstance()->evalString("loader.md5Pipe.transformURL('url')", &returnParam);

string url;
jsval_to_string(cx, returnParam, &url);
```

### Native Build Options

Due to the adjustments made to the build mechanism, the processing of the different platforms is provided in the form of **plugins**. When you select **Native** in the **Platform** section of the **Build** panel, you will see that there is a **native** option in addition to the build options of a specific platform, and the configuration of native related options will affect all native platforms.

![](publish-native/native_options.jpg)

#### Template

There are two types of available engine templates in the dropdown menu of **Template**, from which we can choose one:

- **Default** - build the project with the **Cocos2d-x** source-code version engine.

- **Link** - unlike the **Default** template, the **Link** template does not copy the **Cocos2d-x** source-code to the `build` directory. Instead, the shared **Cocos2d-x** source-code is used. This can effectively reduce the footprint of the `build` directory, and modifications to the **Cocos2d-x** source-code can also be shared.

Let's review the concept of the source-code engine:

> The **Cocos2d-x** engine includes the source-code engine. Remember:
>
> - The first time the source-code engine builds and compiles a project, it takes a long time to compile C++ code, depending on the configuration of the computer, which may take 5~20 minutes. After the same project has been compiled once, the time required for the next recompile is greatly shortened.
> - The projects built by the source-code engine, compiled and run using native development environment (such as Android Studio, Xcode, etc. IDE), and also can be debugged and error captured.

The **Cocos Creator** installation directory under `resources/3d/cocos2d-x-lite` already contains the **Cocos2d-x** source-code engine.

#### Polyfills

**Polyfills** is a new feature option supported by the script system. If this option is checked at build time, the resulting release package will have the corresponding **polyfills** in it, and will also increase the size of the package. Developers can choose **polyfills** on demand, but only `Async Functions` are currently available, and more will be opened later.

## Directory structure of the exported native project package

```bash
- [native]
    - assets // Project assets folder
        - main.js
        - project.json
        - src
        ...
    - proj // Native project entrance
        - ...
    - build // Compile directory
    - publish
    - compile.config.json
```

After building the project file, you can use the relevant development tool of the platform to open `proj` folder. For details, please refer to the specific documents of the designation platform.
