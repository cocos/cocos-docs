# Preferences

The **Preferences** panel provides personalized settings for the editor, which can be opened by clicking **Cocos Creator -> Preferences** in the editor's main menu bar.

**Preferences** consists of several different tabs, including **General**, **External Program**, **Device Manager**, **Engine Manager**, **AssetDB**, **Console**, **Inspector**, **Preview**, **Build** and **Laboratory**. The **Preferences** panel will automatically save the changes after you modify them.

## General

![general](index/general.png)

The **General** tab is mainly for configuring some basic information related to the editor, including:

**Language**: choose Chinese or English, the editor will automatically switch the language after modifying the language setting, if some texts are not switched, refresh the editor.

- **Preview IP**: users can manually select one of them as the default address and QR code address when previewing if there are multiple IP addresses on the local machine. All the local IPs will be listed here, and the editor will pick one IP automatically by default.

- **Preview Server Port Number**: modify the port number used by the editor when previewing the game. Restart the editor to take effect after the modification is finished.

- **Number Step**: used to set the step size when adjusting the numeric properties by step button in the **Inspector** panel. The default step size is 0.001. The step buttons in the **Inspector** panel include the following two types:

    - When the mouse is moved to the right of the numeric property input box, a set of up and down arrows will appear, which can continuously increase or decrease the value by a certain step magnitude.

       ![step button](index/step.png)

    - When the mouse is hovered near the name of a numeric property, the cursor will change to ![mouse cursor](index/mouse-cursor.jpg), and then drag the mouse left and right to increase or decrease the value continuously in a certain step.

- **Theme Color**: set the editor display color, currently including **creator** and **dark**.

## External Program

The **External Program** tab is used to set up the development environment required to build for publishing to the native platform, as well as to configure some third-party programs. When the mouse is moved over a specific configuration item, a gray circular question mark icon is displayed on the left side. Clicking on this icon allows setting the configuration item to be applied to the current project or to all projects globally. When set to apply to the current project, the gray icon will turn yellow.

![external-program](./index/external-program.png)

- **WeChat DevTools**: used to configure the Developer tools of WeChat Mini Game, please refer to the [Publishing to WeChat Mini Game](../publish/publish-wechatgame.md) documentation.

- **Android NDK**: used to set up the Android NDK path, please refer to the [Setup Native Development Environment](../publish/setup-native-development.md) documentation.

- **Android SDK**: used to set the Android SDK path, please refer to the [Setup Native Development Environment](../publish/setup-native-development.md) documentation.

- **Default Script Editor**: choose any executable file from an external text editing tool (e.g.: VS Code) as the way to open the script file when you double-click it in the **Assets** panel. The executable file of the preferred text editor can be selected by clicking the **Search** button after the input box. The folder icon is used to open the path to the text editor that has been set up.

- **Default Browser**: used to select the browser to be used when previewing the editor. A browser path can be specified by clicking the **Search icon** button behind the input box.

## Device Manager

The **Device Manager** tab is used to manage the device resolution when using the simulator or browser preview, and supports adding/modifying/deleting custom device resolutions manually on the right side of the panel. The editor's default device resolution does not support modification/deletion.

![device-manager](./index/device-manager.png)

## Engine Manager

The **Engine Manager** tab is used to configure the engine path when customizing the engine.

![engine-manager](./index/engine-manager.png)

- **Use built-in TypeScript engine**: whether to use the engine path that comes with the Cocos Creator installation path as the TypeScript engine path. This engine is used for scene rendering in the scene editor, declaration of built-in components and other engine modules in the web environment.

- **Custom TypeScript engine path**: in addition to using your own engine, an engine can also be cloned from the **engine repository** on ([GitHub](https://github.com/cocos-creator/engine/) | [Gitee](https://gitee.com/mirrors_cocos-creator/engine/)) or forked to any local location for customization, uncheck **Use built-in TypeScript engine** and specify **Custom TypeScript engine path** as the customized engine path, then it's ready to use.

- **Use built-in native engine**: whether to use the `cocos2d-x` path that comes with the Cocos Creator installation path as the native engine path. This engine is used to build and compile projects for all native platforms (iOS, Android, Mac, Windows) when building.

- **Custom native engine path**: after unchecking the previous item **Use built-in native engine**, the native engine path can be specified manually. 

> **Note**: that the native engine used here must be from **engine-native** ([GitHub](https://github.com/cocos-creator/engine-native) | [Gitee](https://gitee.com/mirrors_cocos-creator/engine-native)) or the fork of that repository.

For details on customizing the engine, please review the [Engine customization workflow](../../advanced-topics/engine-customization.md) documentation.

## Asset Database

The **Asset database** tab is used to set the [Assets](../assets/index.md) panel with information about the asset database, including **Log Levels** and **Ignore (regular)**.

![asset-db](./index/asset-db.png)

- **Log Level**: Used to set the type of information output to the **console** from the asset database in the **Assets** panel. This currently includes **Error Only**, **Error and Warning Only**, **Error, Warning, and Log**, and **Output All Information**.
- **Ignore (Regular)**: Use a regular expression and fill in the path to a specific asset file, then that asset will be ignored.

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
- **Wait for debugger to connect**: this option will take effect when **Open the simulator debugger** is checked, and it is used to pause the simulator startup process until the debugger is connected, which is used for debugging the loading process.
- **Initial Preview Scene**: specify which scene in the project will be opened when previewing, all the scenes in the project will be listed. If set to **Currently Opened Scene**, the scene that is currently being edited in the **Scene** panel will be run. Alternatively it can be set to a fixed scene (e.g.: the project always needs to start the game from the login scene).

## Build

The **Build** tab is used to set up the execution of the [Build](../publish/build-panel.md), including **Log Level** and **Cache Serialized JSON of Assets**.

![build](./index/build.png)

- **Log Level**: used to set the type of information that is output to the **console** when a build is published to a platform. Currently there are four types: **Errors Only**, **Errors and Warnings Only**, **Errors, Warnings and Logs** and **All Messages**.
- **Cache Serialized JSON of Assets**: in order to speed up the build and reduce the repeated deserialization of unmodified assets, the serialized JSON of assets will be cached during the asset build process, which will be placed in the `temp/asset-db/assets/uuid/build` directory of the project and divided into `debug.json` and `release.json` according to **debug** and **release** mode.

    ![build](./index/json.png)

When a cached asset exists the build will take it directly, and this part of the cached asset will be re-updated after each asset import. This option is checked by default, but if some special requirements are encountered and want to build without storing this serialized build cache asset, just uncheck it.

## Laboratory

The **Laboratory** tab will occasionally provide some new technical solutions or experimental features that can be selected via a switch option to be used or not, and in most cases are turned on by default. Currently these include **Enable terrain feature**, **Add components using pop-ups** and **Enable baking feature**.

![laboratory](./index/laboratory.png)

- **Enable terrain feature**: for enabling terrain feature, please refer to the [terrain system](../terrain/index.md) documentation.

  > **Note**: as of v3.0.1, this option is removed and has been turned on by default.

- **Add components using pop-ups**: please refer to the following description for details.

- **Enable baking feature**: used to enable the baking feature, please refer to the [Lightmapping](./../../concepts/scene/light/lightmap.md) documentation.

### Adding components using pop-ups

Previously, many users have commented that it is not possible to search for components when adding components, and that it is very difficult to find script components written manually in projects with many custom script components.

However, the search is one more step compared to the mouse-up menu, and due to some internal infrastructure, we can't provide the mouse-up search feature for now. For now, we offer the ability to add components using the search pop-up, but this option can be turn off and users can go back to the original way of using it.

![add-component](./index/add-component.png)

For ease of use, we also add some additional design aids.

- The focus will be in the search box when opening the popup. This allows searching directly for the relevant keyword without having to expand it with a mouse click.
- When searching for a component, use the <kbd>**↑**</kbd> and <kbd>**↓**</kbd> keyboard shortcuts to quickly toggle through the component options, and press the **Enter** shortcut to add the component.

### Caution

In future releases, these features in **Laboratory** may be merged, but there is also a chance that compatibility-breaking changes may occur, or may even be removed. If needing to use these features in a development environment, please be sure to test them rigorously and keep an eye out for update announcements for new releases.

We welcome users to turn on the trial of these features and provide valuable feedback in our [Forum](https://discuss.cocos2d-x.org/c/33) to make these features more suitable for their own usage scenarios and provide more powerful help for projects.

## Extending the Preferences Panel

Creator supports adding custom functional pages on the right side of **Preferences**, please refer to the [Extended Preferences](../../editor/extension/contributions-preferences.md) documentation for details.
