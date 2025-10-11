# Native Plugins

> **Note**:
>
> * Please use the native plugin feature in CocosCreator 3.6.3 and above.
> * The native plugin feature is not yet adapted for HarmonyOS related platforms.

Native plugins are part of the editor plugin system. Developers can use native plugins to call script binding interfaces (such as sebind) to extend the capability of JS scripts calling C++ interfaces, which is very beneficial for solving script performance bottlenecks and reusing existing codebases.

## Relationship with Existing Plugin System

Native plugins can exist independently of editor plugins. Users can use native plugins by copying them to specified directories.

At the same time, native plugins also serve as a supplement to the existing editor plugin system, extending the capabilities of the game runtime. They leverage the capabilities of editor plugins to manage native plugins, such as: download/on-off switching/version upgrade and other functions.

### Plugin Structure

Each plugin has a plugin description file `cc_plugin.json` in its root directory, which is a standard JSON file.

When building native projects, the build system will recursively search for all `cc_plugin.json` files from the project's `extensions` and `native` directories to locate native plugins. Once `cc_plugins.json` is found in a directory, it will not search subdirectories further.

## Installing Dependencies

In a few environments where the editor is not installed, [NodeJS](https://nodejs.org/en/download/) version 8.0 or above needs to be installed to support plugin configuration parsing. Developers can set the NodeJS environment variable `PATH`, or specify it by setting `NODE_EXECUTABLE` in `CMakeLists.txt`.

You can also set the environment variable `NODE_EXECUTABLE` to the full path of node. Starting from version 3.6.2, if CMake still cannot locate nodejs, you can directly set `NODE_EXECUTABLE` in `native/engine/common/localCfg.cmake`.

## Basic Directory Structure Example

```
├── cc_plugin.json
├── android
│   ├── arm64-v8a
│   ├── armeabi-v7a
│   ├── x86
│   └── x86_64
│__ google-play
│   ├── arm64-v8a
│   ├── armeabi-v7a
│   ├── x86
│   └── x86_64
├── ios
│   ├── include
│   └── lib
├── mac
│   ├── include
│   └── lib
│── windows
│    ├── include
│    └── lib
```

The file `cc_plugin.json` provides the necessary information for loading plugins and serves as the identifier for native plugins. Each supported native platform corresponds to a directory, which contains at least one `<PackageName>-Config.cmake` file. The build system uses CMake's [`find_package`](https://cmake.org/cmake/help/latest/command/find_package.html#id7) mechanism to locate or link to the required library files.

If there are cross-platform source files or CMake configurations in the plugin, these files can be merged into the top-level directory. For details, please refer to the [example project](https://github.com/PatriceJiang/ccplugin_tutorial/tree/main/NewProject/native/plugins/hello_cocos).

## Description File `cc_plugin.json` Format

```ts
{
    "name": string;             // Required: Plugin name
    "version": string;          // Required: Plugin version
    "engine-version":string;    // Required: Corresponding engine version range
    "author": string;           // Required: Plugin author
    "description": string;      // Required: Plugin description
    "platforms":string[];       // Optional: Supported platform list, defaults to all native platforms if not specified. Includes windows, android, google-play, mac, ios
    "disabled":true;         // Optional: Disable plugin
    "disable-by-platforms":string[];    // Optional: Disable plugin on specified platforms
    "modules": [{                        // Required: Libraries included in the plugin
        "target":string;                // Required: Corresponding `find_package` name, must be consistent with the first parameter of `CC_PLUGIN_ENTRY`
        "depends": string|string[];     // Optional: Dependencies on other module names
        "platforms":string[];           // Optional: Re-specify supported native platforms
    }]
    
}
```

`engine-version` can specify version ranges and exclude specific versions. Code example as follows:
 
```ts
"engine-version": ">=3.3 <= 3.6.0 !3.5.2|| 4.x"
```

### File Example

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
    "platforms":["windows", "android", "mac", "ios", "google-play"]
}
```
## Creating Native Plugins

Cocos native projects use CMake for management. Native plugins are managed through the search paths/directories of find_package, so as long as the directory conforms to CMake find_package search rules, the plugin can be loaded correctly. Therefore, the development process of native plugins involves providing CMake configurations and related resources, as well as writing cc_plugin.json. For related examples, please refer to [Native Plugin Creation and Usage Example](./tutorial.md).

## Installing and Disabling Native Plugins

Download the created plugin package from [Native Plugin Creation and Usage Example](https://github.com/zhefengzhang/cocos-native-plugins), and choose to extract it to the `extensions` or `native` directory according to project needs.

If you want to disable the plugin, or disable it only on specific platforms, you can modify the `disabled` and `disable-by-platforms` fields in cc_plugin.json.

> **Note**: Native plugins require CMake 3.12+. Android needs to [specify CMake version](https://developer.android.com/studio/projects/install-ndk#vanilla_cmake) as 3.18.1. Other platforms use the built-in CMake in the editor, so the version number does not need to be specified.
