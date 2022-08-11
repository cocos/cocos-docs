# Cocos Native plugins

Native Plugins are part of the editor plugins. By calling JSB interfaces (e.g. export with `sebind`) through native plugins, developers can extend the ability of JS scripts to call C++ interfaces, which can be very beneficial for solving script performance bottles and reusing existing codebases. As the engine is upgraded in the future, the native plugins will open up more features.

## Cooperation with existing *Editor Extensions*

Native plugins can exist independently of editor extensions, and users can use native plug-ins by copying them to the specified directory.

At the same time, native plugins complement the existing editor extension system, extending the game's runtime capabilities. Developers use the ability of editor extensions to manage native plugins, such as download/switch/version upgrade, etc.


## Example of the plugin's directory structure

```
├── cc_plugin.json
├── android
│ ├── arm64-v8a
│ ├── armeabi-v7a
│ ├── x86
│ └─ x86_64
├─ ios
│ ├── include
│ └── lib
├─ mac
│ ├── include
│ └── lib
└─ windows
    ├─ include
    └── lib
```

The file `cc_plugin.json` provides the information necessary to load the plugin, and is the identifier of the native plugin. Each supported native platform corresponds to a directory that contains at least one `<PackageName>-Config.cmake` file. The build system will use CMake's [`find_package`](https://cmake.org/cmake/help/latest/command/find_package.html#id7) mechanism to locate or link to the required library files. 


If there are cross-platform source files or CMake configurations in the plugin, these files can be merged into the top-level directory. For example: [example project](https://github.com/PatriceJiang/ccplugin_tutorial/tree/main/NewProject/native/plugins/hello_cocos)


## Description file `cc_plugin.json` format
```ts
{
    "name": string;             // required: plugin name
    "version": string;          // required: plugin version
    "engine-version":string;    // mandatory: the range of the corresponding engine version
    "author": string;           // required: the author of the plugin
    "description": string;      // required: description of the plugin
    "platforms":string[];       // optional: list of supported platforms, all native platforms are supported by default if not filled. Including windows, android, mac, ios
    "disabled":true;            // optional: Disable plugins on all platforms
    "disable-by-platforms":string[];    // optional: Disable plugins for the specified platform
    "modules": {        // mandatory: the libraries included in the plugin, 
        "target":string;                // mandatory: the name of the corresponding `find_package`, consistent with the first parameter of `CC_PLUGIN_ENTRY`
        "depends": string|string[];     // optional: depends on other module names 
        "platforms":string[];           // optional: re-qualify the supported native platforms
    }[
    ]
}
```
> `engine-version` can specify a version range and exclude specific versions, for example:
> ```
> "engine-version": ">=3.3 <= 3.6.0 !3.5.2 || 4.x"
> ```
### Example file

Example of description file `cc_plugin.json`

```json
{
    "name": "hello-cocos-demo",
    "version": "0.1.0",
    "author": "demo group",
    "engine-version":">=3.6.0",
    "description": "demo project",
    "modules":[
        {
            "target": "hello_cocos_glue"
        }
    ],
    "platforms":[ "windows", "android", "mac", "iOS" ]
}
```


## Installing Native Plugins

Developers can download and enable editor extensions from the Store that contain native plugins, and complete the installation of the plugins into the `extensions` directory. You can also get the plugin archive from the forums and manually extract it to the `native/` directory or its subdirectories. 

If you want to disable the plugin, or disable it only in a special platform, you can change the relevant fields in `cc_plugin.json`. 


> Native plugins require CMake 3.12+, Android projects need to [specify cmake version](https://developer.android.com/studio/projects/install-ndk#vanilla_cmake) to 3.18.1.

## Creating native plugins

Cocos native projects are managed using CMake. Simply put, a native plugin is a search directory for `find_package` on specific platform.

As long as the directory matches the cmake find_package search rules, the plugin will load correctly, regardless of whether it is source code or precompiled libraries. Therefore, the development process of a native plugin is the process of providing the cmake configuration and related resources, and writing `cc_plugin.json`.

See [create native plugin tutorial](./tutorial.md) to learn more about native plugins.
