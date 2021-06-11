# Introduction to the build process and FAQ guide

## Introduction to Building Infrastructure

This step is mainly to initialize the **original options** passed to the build to the **internal options** of the build, do some parameter format conversion and initialize the asset data of the build asset database, load the latest asset information and sort it Developers can also dynamically inject some build parameters on the interface through the [Build Plugin](custom-build-plugin.md).

## Introduction to the general construction process

The general construction process of Cocos Creator mainly includes the following parts:

1. [Build parameter initialization](#Build-parameter-initialization)
2. [Build data sorting](#Build-data-sorting)
3. [Resource construction write file system](#Resource-construction-write-file-system)
4. [Organize settings data](#Organize-settings-data)
5. [setting uuid compression and file writing](#settings-uuid-compression-and-file-writing)

### Build parameter initialization

This step is mainly to initialize the `initial options` passed to the build to build the `internal options`, do some parameter format conversion and initialize the resource data of the resource database, load the latest resource information and classify.

### Build data organization

The editor will first collect resources **currently participating in the construction of the scene and resources in all Bundles, find dependent resources through the deserialization of the engine, and then recursively find a list of all resources that need to be packaged**. Before deserialization, the script environment of the entire project will be configured, that is, all non-plug-in project scripts will be loaded. Because the script is loaded correctly or not will directly affect the deserialization process. **If the script is written illegally and fails to load, it will directly cause the build to fail. If a dependent resource is found to be lost during the deserialization process, a warning will be issued, but the construction will continue. The warning here does not mean that the problem does not need to be solved. If the resource is lost and cannot be solved, it is difficult to ensure that the built content will not be problematic**.

After collecting the list of all resources participating in the construction, the resources will be classified according to the Bundle configuration, scripts, image compression tasks, and JSON grouping information will then be collected.

### Resource construction writes to the file system

The built resources will be distributed in different locations according to the Bundle configuration. In each Bundle, there will be an `index.js` project script, as well as the corresponding resources and the similar to the `config.json` in the earliest version of the settings. Record the resource UUID information in the Bundle. Each Bundle will be packaged in `assets/[Bundle name]` after being built.

#### Asset Bundle construction

The basic resource directory of each Bundle is as follows:

```bash
- XXXBundle
    - import （Serialize JSON ）
        - 04
            - 04630c...od.json
        ...
    - native （Original resources, such as .png .bin and other files)
            - 04
            - 04630c...od.png
        ...
    - config.json (Bundle resource configuration file)）
    - index.js （Script in Bundle）
```

For more detailed Asset Bundle configuration and construction details, please refer to the [Asset Bundle Introduction](../../asset/bundle.md) documentation.

After finishing the basic build tasks, the build will process other build processes according to each Bundle as the processing unit.

It is divided into the following steps:

- **Script construction**: The script construction in the editor is divided into **plug-in scripts** and **non-plug-in scripts**.

    - The plug-in script will directly copy the source files to the `src` directory of the built folder according to the original directory structure, the plug-in script does not support any script form that needs to be compiled, such as Typescript or Javascript written in ES6. The resource information of the plug-in script will be written into the jsList array in settings.

    - All non-plugin scripts will be packaged into `project.js` (`project.dev.js` in debug mode) and placed in the corresponding `src` directory. Checking the `sourceMap` option will generate the corresponding map file, and determine whether the script is compressed according to the debug option.

- **Texture compression**: According to the organized image compression task, the image resources are compressed and written into the build folder. If the build option is not checked for texture compression, no processing will be performed.

- **Engine construction**: According to the **function tailoring** in the project settings, remove the unused engine modules and pack them into the `cocos-js` directory. Checking the `sourceMap` option will generate the corresponding map file, and determine whether the script is compressed according to the debug option.

    The main steps of engine packaging include:

    - Get **engine module information in project settings**.

    - **Check whether the engine version in the cache** is consistent with the engine currently to be compiled, and if the content is consistent, copy it directly without compiling.

    - To compile, execute the task of packaging the engine according to the engine interface, then copy the compiled js file and save the modification time of the engine.

    When compiling the engine, [output log information](./build-panel.md#%E6%9E%84%E5%BB%BA-log-%E4%BF%A1%E6%81%AF%E6%9F%A5%E7%9C%8B) can be viewed：

    ![build-engine](./build-guide/build-engine.jpg)

    Regarding the reuse rules of engine files, it is necessary to elaborate here:<br>
    The packaged engine file will be placed in the editor's global temporary directory (use `Build.globalTempDir` to print during the build process). The cache file is stored as the name according to the hash value generated by the parameters that will affect the engine compilation.

    ```bash
    global-temp-folder
    |--CocosCreator
        |--x.xx(3.0.0)
            |--builder
                |--engine
                    |--1dc4a547f9...63a43bb8965.watch-files.json
                    |--1dc4a547f9...63a43bb8965
                    |--1dc4a547f9...63a43bb8965.meta
                ...
    ```

    As long as any relevant engine build parameters are changed, the engine will be recompiled. The specific effects on the use of the build engine cache are:

    - debug: whether to open the debug mode
    - includeModules: engine module settings
    - sourceMaps: whether to enable sourceMap
    - platform: build platform
    - Engine modification time
    - Whether to check the separation engine (only WeChat mini game platform)
    - Use engine path

- **JSON build**: serialized JSON is merged and written into the file system (in the `assets/xxxBundle/import` folder) according to the JSON grouping and the bundle that belongs to. If it is in **release mode, the serialized JSON will be uuid performs compression processing**.

- **Common Asset Copy**: Some raw assets (rawAssets) are directly copied from the library to the built folder `assets/xxxBundle/native`.

- **md5 processing**: Add the md5 suffix to all resources in the res folder, and organize the data to be recorded in settings.

- **application.js template file generation**: According to user options, some project settings are injected into the `application.js` folder and generated under the build output directory.

### Organize settings and config data

It is mainly based on the data compiled by previous resources to prepare the configuration information necessary for the game to start.

General analysis on the settings structure:

```js
{
    debug: boolean; // Whether it is debug mode, taken from the build configuration panel
     designResolution: ISettingsDesignResolution; // canvas resolution setting, taken from the data in the project settings
     jsList: string[];
     launchScene: string; // initial scene url
     moduleIds: string[]; // Information of all user script components
     platform: string;
     renderPipeline: string;// renderPipeline information, taken from the project settings
     physics?: IPhysicsConfig;// Physics module settings (only generated when the physics engine module is checked)
     BundleVers: Record<string, string>; // Bundle md5 file stamp
     subpackages: string[]; // subpackage information
     remoteBundles: string[]; // Record the collection of remote bundles
     // server: string;
     hasResourcesBundle: boolean; // Does it contain resources built-in Bundle
     hasStartSceneBundle: boolean; // Whether to include the initial scene built-in Bundle
     customJointTextureLayouts?: ICustomJointTextureLayout[];
     macros?: Record<string, any>; // Engine Macro configuration value, taken from project settings
}
```

`config.json`

```js
{
    importBase: string; // The name of the import directory in the Bundle, usually'import'
    nativeBase: string; // The name of the native directory in native, usually'native'
    name: string; // The name of the Bundle, which can be loaded by the Bundle name
    deps: string[]; // other Bundle names that this Bundle depends on
    scenes: Array<{url: string, uuid: string}>; // The array of scene information contained in the Bundle
    rawAssets: {[index: string]: {[uuid: string]: string[]} };
    // Store the url and type of the resource loaded under resources
    // Example: "bba00d3a-2f17-4511-b47c-0d584b21b763@6c48a": ["test/right/texture", "cc.Texture2D", "bba0...@6c48a"]
    // "bba0...@6c48a": ["test/right/texture", 1, 1]
    packs: Record<string, IUuid[] | number[]>; // JSON grouping information
    versions: {
        import: Array<string | number>;
        native: Array<string | number>;
     }; // Only available after md5Cache is checked, the array part is stored in the format of [uuid_1, md5_1, uuid_2, md5_2, ...], where uuid_1 is a simple number indicating that the stored uuid index in the uuids array.
    uuids: string[]; // uuid array, only in release mode
    types?: string[]; // Resource type array, only in release mode
    encrypted?: boolean; // Used natively to mark whether the script in the Bundle is encrypted
    isZip?: boolean; // Is it in zip mode
    zipVersion?: string;
}
```

The structure here only lists the settings/config structure under the general process. In fact, when packaging on different platforms, configurations will be added as needed.

### uuid compression and file writing in config

In the process of resource packaging, resource uuids involved in resource construction will also be collected continuously, and will eventually be sorted and written into the `config.json` of the corresponding Bundle. Before generation, it will be determined whether to compress the uuid in the file according to whether it is in the debug mode. All the uuids used will be sorted, and the ones that appear **more than twice** will be stored in the `uuids` array, which was used before The position of uuid is replaced with index. All `types` that appear twice will also be stored in the `types` array, and the used place is stored as an index.

#### Build resources

The packaging of resources referred to in this step refers to resource files other than scripts, because scripts are packaged as special files. In the stage of packaging resources, the editor will first summarize **currently participating in the construction of the scene and all resources in the Bundle directory. The packaging of each resource will be deserialized by the engine, and the dependent resources will be found and then recursively packaged** . Before deserialization, the script environment of the entire project will be configured, that is, all non-plug-in project scripts will be loaded. Because the loading of the script will directly affect the deserialization, if the script is not legally loaded, it will directly cause the build to fail. If a dependent resource is found to be lost during the deserialization process, a warning will be issued, but the construction will continue. The warning here does not mean that the problem does not need to be resolved. **If the resource is lost and cannot be resolved, it is difficult to ensure that the content after the build is free of problems**.

After the resource is deserialized during the packaging process, it will be recompressed and serialized to reduce the package body after packaging. The serialized files of the texture resource will all be packaged into a JSON file, and the other serialized files will be subpackaged according to the build configuration parameters.

#### Build script

The construction of scripts in the editor is divided into **plug-in scripts** and **non-plug-in scripts**.

- The plug-in script will directly copy the source files to the `build/src` directory generated after the build according to the original directory structure, so **plug-in scripts do not support any script forms that need to be compiled** such as Typescript or ES6 JavaScript. The resource information of the plug-in script will be written into the jsList array in settings.

- All non-plugin scripts will be packaged into `project.js` (`project.dev.js` in debug mode) and placed in the corresponding src directory.

## Platform adaptation processing

The build provides part of the life cycle hook function, which is convenient for developers to participate in the construction during different processing periods of the construction and affect the construction result. At the same time, the build also provides a way for developers to directly add some build options, and can modify the UI interface, data verification, etc. of the build configuration page. At present, these functions are not yet open to the outside world, here is only a brief introduction, but the platform building plug-in inside the editor has been developed in this way. The build options injected by the build plugin will be stored in `options.packages`, the current command-line build option parameter writing method also needs to follow this rule.

### Platform compilation / generation process

All platform construction processes that require or support separate compilation and generation have been separated. Some developers may wonder why today's mini game platforms have added a new generation button. In fact, this part of the logic has always existed before, but it is directly in the construction process and cannot be controlled separately. The construction of the editor is actually similar to the function of exporting to the corresponding platform game package. Each platform usually has its own compilation process, such as the compilation and upload function of the developer tool that comes with the WeChat mini game platform. Compile, run and debug functions of platform-related tools. **The construction of the editor is to complete the compatibility of the engine's interface with each platform and the basic format of the game package for developers**, but it does not mean all the work. If the developer needs some customized packaging for the platform, just The editor needs to support the splitting of the process first in order to better access.

## FAQ Guide

The entire build process is in a single worker. To view the log information of the build process or view the complete call stack when an error occurs, click **Developer -> Open Build Debug Tool** in the main menu turn on. In fact, a lot of log information will be output when building, but in order not to interfere with the user, only error information and important information will be printed to the editor console. The information in the debugging tool is the most complete. Of course, it is possible to set the output log in **Preferences -> Resource Database -> Log Level**. For details, please refer to [Build related](./build-panel.md) documentation.

It is necessary to explain that before building **please make sure that the scene participating in the build can be previewed normally**. Loss of resources in some scenes or other scripting issues can be exposed during the preview stage. Building under the condition that the preview is normal can save time and troubleshoot better.

### Resource loading 404 errors

In this case, please copy the `uuid` in the reported resource loss information to find the corresponding resource in **Resource Manager**, and check whether the resources that the resource depends on are normal. Resource loading 404 uerrors sually fall into the following situations:

1. **Resources that are not placed in the Bundle are dynamically loaded in the script**.

    - **Reason**: Through the above introduction, we know that only the resources and their dependent resources in the Bundle directory and the resources and their dependent resources participating in the construction scenario will be packaged into the final build folder, and **only the resource URL directly put into the `Bundle` folder will be written to config.json**. So if a resource is used in the script but the resource is not placed in any Bundle directory, a 404 will appear after loading.

    -**Solution**: Move the used resources to the Bundle folder.

2. **There is a problem with the loaded resource import, and the data cannot be generated normally in the library**

    -**Reason**: All the original data is obtained by reading the resource files in the library during construction. If the import fails, the correct corresponding resource information will not be obtained.

    -**Solution**: Find the corresponding resource through the Resource manager, right-click, and select **Reimport Resource** in the menu.

3. **Resource Loss**

    -**Reason**: As mentioned in the previous build process, **resource construction will go through the reverse sequence to find dependencies**, and the most common problem is that the dependent resources are accidentally deleted during the project iteration process And cause the loss of resources. The loss of these resources may not be noticed at ordinary times, but it will be exposed once the build is executed.

    -**Solution**: Use the code editor to find out which resources the uuid is referenced, and modify the corresponding resources.

### Script resource loading error

As mentioned in the previous introduction of [Building Data Sorting](####Building-Data-Sorting), the script environment needs to be configured when building. If the error message is related to the script, please refer to the error content to modify the script. To know which script reported the error, find the uuid of the corresponding script in the error message call stack, and then find the location in the resource manager.

### How to find the big picture after the small picture is automatically combined

The automatic atlas will print out the uuid information of the original small image and the synthesized large image during the construction process, which can be viewed directly in the build debugging tool. Use the large uuid found in the packaged folder `XXXBundle/native` Just check it out. If there are too many combined images, open the build log and search for uuid.

![build-atlas](./build-guide/build-atlas.jpg)

### How to decompress uuid

The resource JSON packaged in release mode and the uuid in `config.json` are compressed, and eed to be decompressed to find the resources in the corresponding original project. There are some built-in tools and methods in the build process on the global variable Build. After directly clicking on the menu **Developer -> Build Debugging Tools**, enter in the console:

```js
Build.Utils.decompressUuid('425o80X19KipOK7J1f5hsN');
// 42e68f34-5f5f-4a8a-938a-ec9d5fe61b0d
```

<!-- ### How to find the position of the resource serialized JSON in the package body after construction

After JSON is packaged, it will be stored in the `assets/XXXBundle/import` folder. If it is a common resource, just use uuid to search in the folder. -->

### Engine compilation failed

If the custom engine fails to compile, please check the modified code, or the custom engine path.

If the engine fails to compile, please create a topic on [our forums](https://discuss.cocos2d-x.org/c/creator/33) to provide feedback, log files and a demo to reproduce the issue.

### Other errors

If other build errors are encountered, please create a topic on [our forums](https://discuss.cocos2d-x.org/c/creator/33) to provide feedback, log files and a demo to reproduce the issue.
