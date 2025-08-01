# Preferences

The **Preferences** panel provides personalized settings for the editor, which can be opened by clicking **Cocos Creator/File -> Preferences** in the editor's main menu bar.

**Preferences** consists of several different tabs, including **General**, **External Program**, **Device Manager**, **Engine Manager**, **AssetDB**, **Console**, **Inspector**, **Preview**, **Build** and **Laboratory**. The **Preferences** panel will automatically save the changes after you modify them.

## General

![general](index/general.png)

The **General** tab is mainly for configuring some basic information related to the editor, including:

**Language**: choose Chinese or English, the editor will automatically switch the language after modifying the language setting, if some texts are not switched, refresh the editor.

- **Number Step**: used to set the step size when adjusting the numeric properties by step button in the **Inspector** panel. The default step size is 0.001. The step buttons in the **Inspector** panel include the following two types:

    - When the mouse is moved to the right of the numeric property input box, a set of up and down arrows will appear, which can continuously increase or decrease the value by a certain step magnitude.

       ![step button](index/step.png)

    - When the mouse is hovered near the name of a numeric property, the cursor will change to ![mouse cursor](index/mouse-cursor.jpg), and then drag the mouse left and right to increase or decrease the value continuously in a certain step.

## External Program

The **External Program** tab is used to set up the development environment required to build for publishing to the native platform, as well as to configure some third-party programs. When the mouse is moved over a specific configuration item, a gray circular question mark icon is displayed on the left side. Clicking on this icon allows setting the configuration item to be applied to the current project or to all projects globally. When set to apply to the current project, the gray icon will turn yellow.

![external-program](./index/external-program.png)

- **WeChat DevTools**: used to configure the Developer tools of WeChat Mini Game, please refer to the [Publishing to WeChat Mini Game](../publish/publish-wechatgame.md) documentation.

- **Android NDK**: used to set up the Android NDK path, please refer to the [Setup Native Development Environment](../publish/setup-native-development.md) documentation.

- **Android SDK**: used to set the Android SDK path, please refer to the [Setup Native Development Environment](../publish/setup-native-development.md) documentation.

- **HarmonyOS NDK**: used to set the HarmonyOS NDK path, please refer to the [Publish for the Huawei HarmonyOS](../publish/publish-huawei-ohos.md) documentation.

- **HarmonyOS SDK**: used to set the HarmonyOS SDK path, please refer to the [Publish for the Huawei HarmonyOS](../publish/publish-huawei-ohos.md) documentation.

- **Default Script Editor**: choose any executable file from an external text editing tool (e.g.: [VS Code](../../scripting/coding-setup.md)) as the way to open the script file when you double-click it in the **Assets** panel. The executable file of the preferred text editor can be selected by clicking the **Search** button after the input box. The folder icon is used to open the path to the text editor that has been set up.

- **Default Browser**: used to select the browser to be used when previewing the editor. A browser path can be specified by clicking the **Search icon** button behind the input box.

## Device Manager

The **Device Manager** tab is used to manage the device resolution when using the simulator or browser preview, and supports adding/modifying/deleting custom device resolutions manually on the right side of the panel. The editor's default device resolution does not support modification/deletion.

![device-manager](./index/device-manager.png)

## Engine Manager

The **Engine Manager** tab is used to configure the engine path when customizing the engine.

![engine-manager](./index/engine-manager.png)

- **Use built-in TypeScript engine**: whether to use the engine path that comes with the Cocos Creator installation path as the TypeScript engine path. This engine is used for scene rendering in the scene editor, declaration of built-in components and other engine modules in the web environment.

- **Custom TypeScript engine path**: in addition to using your own engine, an engine can also be cloned from the [engine repository](https://github.com/cocos/cocos-engine/) or forked to any local location for customization, uncheck **Use built-in TypeScript engine** and specify **Custom TypeScript engine path** as the customized engine path, then it's ready to use.

- **Use built-in native engine**: whether to use the `engine-naive` path that comes with the Cocos Creator installation path as the native engine path. This engine is used to build and compile projects for all native platforms (iOS, Android, Mac, Windows) when building.

- **Custom native engine path**: after unselecting the previous item **Use built-in native engine**, the native engine path can be specified manually.

> **Note**: the native engine used here must be from [engine-native](https://github.com/cocos/cocos-engine) or the fork of that repository.

For details on customizing the engine, please review the [Engine customization workflow](../../advanced-topics/engine-customization.md) documentation.

## Asset Database

The **Asset database** tab is used to set the [Assets](../assets/index.md) panel with information about the asset database, including **Log Levels**, **Ignore (regular)** and **Default Meta**.

![asset-db](./index/asset-db.png)

- **Log Level**: used to set the type of information output to the **console** from the asset database in the **Assets** panel. This currently includes **Error Only**, **Error and Warning Only**, **Error, Warning, and Log**, and **Output All Information**.
- **Ignore Files (Glob)**: Use Glob patterns to match files that should be ignored. The `!` prefix in Glob patterns means to exclude matching resources from search results, and the editor will not import these resources. Editor restart is required after modification.
  - Example: `!**/*.txt` ignores all `.txt` files.
  - Example: `!test` ignores all files in the relative path assets/test folder.
  - Example: `!**/Node.*` ignores all files named Node.
- **Update resources automatically**: automatically refresh resources when returning to the editor from outside. See below for details.
- **Automatically overwrite metadata on import**: when importing assets to replace existing assets, if the imported assets come with Meta, use this option to set whether to overwrite the Meta of the existing assets.
- **Default Meta**: used to set the default configuration when importing assets within a project. Please refer to the description below for details.

### Update resources automatically

If this option is enabled, all resources will be automatically checked when returning to Creator, regardless of whether resources have been manipulated outside of Creator. Then when the number of files in the project is too high, or the random read and write speed of the hard disk is too low, it will cause the resource system response lag. For example, if a resource is selected in **Assets** panel, the **Inspector** panel will take a while to show the resource-related properties.

At this point, please disable the automatic refresh feature of Creator. After disabling this feature, if resources are manipulated, then manually click the **Refresh** button at the top right of the **Assets** panel to refresh the resources.

> **Note**: it is not recommended to turn this option off if not experiencing resource system response problems.

### Default Meta

This option is used to set the default configuration when importing assets into the project. For example, if want the imported image to be `sprite-frame` by default, then click on the **Edit** button to the right of this option and fill in the following in the `json` file that opens:

```json5
{
    // 'image' indicates that the type of the asset is an image.
    "image": {
        "type": "sprite-frame"
    }
}
```

After editing and saving, return to the editor and click the **Apply** button to take effect.

The asset type is `key`, and the key value `value` needs to be an **object**, which is the default configuration used when the asset is imported.<br>
For example, in the above sample code, the `key` is `image`, the `value` is the content configured in `image`, and the configuration information of the asset database will be refreshed after clicking the **Apply** button, and the content in `image` will be configured into the `userData` field of the asset `meta` file one by one. For example, if `image.type` is set to `sprite-frame`, the default `userData.type` will be set to `sprite-frame` when importing image assets. So the default import configuration of various assets can be set dynamically according to project needs.

If want to get the asset type, just right-click on the asset in **Assets** panel, select **Reveal in Explorer**, then find the meta file corresponding to the asset in the opened folder and open it, the asset type will be marked in the `importer` field.

For example, the meta file for a material asset is as follows, and the `material` in the `importer` field is the asset type.

```json
{
  "ver": "1.0.9",
  "importer": "material",
  "imported": true,
  "uuid": "482a5162-dad9-446c-b548-8486c7598ee1",
  "files": [
    ".json"
  ],
  "subMetas": {},
  "userData": {}
}
```

## Console

The **Console** tab is used to set the [Console](../console/index.md) panel output log, including **Display date** and **Font size**.

![console](./index/console.png)

- **Display date**: whether to display the date in front of the log output from the **Console** panel.
- **Font size**: used to set the text size of the log output from the **Console** panel.

## Inspector

The **Auto-save when leaving edit** option in the **Inspector** tab is used to set the [Inspector](../inspector/index.md) panel to automatically save changes after the property edit is complete.

![inspector](./index/inspector.png)

## Preview

The **Preview** tab is mainly used for the various options that can be set when using the [Preview](../preview/index.md) button on the top of the editor, but is only available for the current project.

![preview](./index/preview.png)

- **Auto refresh preview when saving scene**: if this option is checked, the opened preview page will be automatically refreshed when saving the scene in the editor. Currently the preview using the simulator is not supported for now.
- **Auto clear cache when using simulator**: if this option is checked, the cache will be automatically cleared when using the simulator preview.
- **Open simulator debugger**: if this option is checked, the debugger will be opened automatically when previewing the project with the simulator.
- **Simulator wait for debugger to connect**: this option will take effect when **Open the simulator debugger** is checked, and it is used to pause the simulator startup process until the debugger is connected, which is used for debugging the loading process.
- **Preview server port number**: Port for the preview server, Cocos Creator will create a http/https server to preview game when you click the preview button.
- **Enable HTTPS**：Whether to enable HTTPS for debugging
- **HTTPS port**: Server port of HTTPS
- **Private key**: Path of the private key
- **Public cert**: Path of the public cert
- **CSR file for certificate singing**: The path of CSR file.

## Animation

**Animation** Paging is used to set up the [animation system](../../animation/index.md) some parameters and configurations during editing.

![animation](./index/animation.png)

- **Enable animation instant cache function**: when enabled, the animation in the editor will be automatically cached according to the **Caching interval time**
- **Cache interval time**: the time between caches, in milliseconds.
- **Maximum number of cached files**: the maximum number of animations that can be cached

> **Note**: Currently the cached animation files are not automatically restored, if you want to restore the cached files, please refer to [Animation System](../../animation/index.md).

## Build

The **Build** tab is used to set up the execution of the [Build](../publish/build-panel.md), including **Log file opening method** and **Cache Serialized JSON of Assets**.

![build](./index/build.png)

- **Log file opening method**: This option is used to set whether to open the build log file directly or to open the directory where the log file is located, when clicking the **Open Log** button at the bottom left of the [platform build task](../publish/build-panel.md). The default is to open the log file directly.

- **Cache Serialized JSON of Assets**: in order to speed up the build and reduce the repeated deserialization of unmodified assets, the serialized JSON of assets will be cached during the asset build process, which will be placed in the `temp/asset-db/assets/uuid/build` directory of the project and divided into `debug.json` and `release.json` according to **debug** and **release** mode.

  ![build](./index/json.png)

  When a cached asset exists the build will take it directly, and this part of the cached asset will be re-updated after each asset import. This option is checked by default, but if some special requirements are encountered and want to build without storing this serialized build cache asset, just uncheck it.

- **Cache Build Engine**: Cache the compiled engine, this cache will take effect in the global directory. Developers can print this cache address by using the `Editor.App.temp` command in **Developer -> Switch Developer Tools**:

    ![build-temp](./index/build-temp.png)

    With this feature, it is possible to speed up the build. This feature can also be viewed in the log at:

    ![cached-log](./index/build-log-cached-engine.png)

- **Cache Compressed Texture**: Cache the compressed texture assets, if the texture parameters are modified, the cache will be invalidated, the cache directory is: `temp/builder/CompressTexture`.
- **Cache Auto Atlas**：The cache of the auto-atlas can be cleared at build time, for details please refer to the [Build Tasks](../publish/build-panel.md#Build%20Tasks)
- **Keep UUID in the Node Component**：By default, component UUIDs are not serialized into Prefabs/Assets, but are automatically generated by the engine at runtime. When enabled, the component's UUID is serialized into the corresponding Prefab/Assets at build time and remains the same at runtime and editor time.

## Laboratory

The **Laboratory** tab will occasionally provide some new technical solutions or experimental features that can be selected via a switch option to be used or not, and in most cases are turned on by default. Currently these include **Scene Real-time Cache** and **Enable baking feature**.

![laboratory](./index/laboratory.png)

- **Enable Deferred Rendering Pipeline**: enables or disables the deferred rendering pipeline. By default, deferred rendering pipelines are disabled. For details, see [Deferred Render Pipeline](../../render-pipeline/builtin-pipeline.md#%E5%BB%B6%E8%BF%9F%E6%B8%B2%E6%9F%93%E7%AE%A1%E7%BA%BF).

- **Automatically update script's import path after relocation**: when enabled, the import part of the script will be automatically modified and relocated to the new location when you move the script in the editor.

- **Optimized scheduling strategy**: This policy will try to merge resources when importing them multiple times repeatedly to reduce the number of scheduling times.

- **Scene real-time cache**: this item is enabled by default, it is mainly used to cache scene files to `temp/scene/[SCENE_UUID]/[TIME].json` file in project directory every once in a while during scene editing (the current time interval is 5s). In case of unexpected situation, such as scene crash, process crash, etc., when you open the editor again, a popup window will prompt you whether to apply the latest scene file in the cache.

  > **Note**: In daily use, as long as the scene is opened normally, all scene files cached before the current scene is opened will be cleared. If you have a special need to view the cache files of a specific scene, please close the corresponding scene in the editor first.

- **Keep scene main loop running**: whether or not to allow the scene to be rendered in the same way as in the preview with a constant rendering loop.
- **Enable native engine loading scene editor**: when enabled, the rendering module inside the editor will use the native engine.
- **Debug native engine for scene editor**: whether or not the native engine scene can be enabled. When this option is enabled, it will prevent the native engine from starting and a dialog box will pop up, click to confirm before it will continue to start. It is mainly used for debugging the logic inside the scene after the native engine has been activated.

- **Animation Embedded Player**: This feature supports the user to synchronize with other particles and animations while editing the animation
- **Animation Auxiliary Curve**: If or not the animation auxiliary curve function is enabled, please check [Auxiliary Curve Edit View](../../animation/animation-auxiliary-curve.md) for details.

- **Enable Pose-Express Function**: If or not enable the animation gesture map function, please check [Programmatic Animation](../../animation/animation-auxiliary-curve.md) for more details.
- **Enable baking feature**: Use to enable the baking function, please refer to [Light Mapping](../../concepts/scene/light/lightmap.md)

### Caution

In future releases, these features in **Laboratory** may be merged, but there is also a chance that compatibility-breaking changes may occur, or may even be removed. If needing to use these features in a development environment, please be sure to test them rigorously and keep an eye out for update announcements for new releases.

We welcome users to turn on the trial of these features and provide valuable feedback in our [Forum](https://discuss.cocos2d-x.org/c/33) to make these features more suitable for their own usage scenarios and provide more powerful help for projects.

## Extending the Preferences Panel

Creator supports adding custom functional pages on the right side of **Preferences**, please refer to the [Extended Preferences](../../editor/extension/contributions-preferences.md) documentation for details.
