# Main Menu

The main menu bar at the top of Cocos Creator contains 9 menu options, **Cocos Creator**, **File**, **Edit**, **Node**, **Project**, **Panel**, **Extension**, **Developer** and **Help**, which integrate most of Cocos Creator's functionalities.

![menu](./img/menu.png)

## About Cocos Creator

This option contains mainly software information, settings, window controls and other functions:

![cocos](./img/cocos.png)

| Option | Description |
| :--- | :--- |
| About Cocos Creator | Shows Cocos Creator-related version number and copyright information. |
| Layout | Sets the editor interface layout, only the default layout is supported for now. |
| Preferences | Opens [Preferences](../preferences/index.md) panel to customize the editor.
| Shortcuts | Opens the Shortcuts panel to view the default shortcuts used by each panel or function module of the editor, support customization. |
| Close Window (<kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>W</kbd>) | Closes current window. |
| Exit | Closes the current editor and automatically opens Dashboard. |

## File

This option is mainly used to create, open, and save a project or scene, as well as import Cocos Creator 2.x projects.

![file](./img/file.png)

| Option | Description |
| :--- | :-- |
| New Project | Opens Dashboard's [Project](../../getting-started/dashboard/index.md#project) tab of Dashboard to create a new project. If you are using Dashboard v1.0.19, you will open Dashboard's [New Project](../../getting-started/dashboard/index.md#new-project) tab. |
| Open Project | Open Dashboard's [Project](../../getting-started/dashboard/index.md#project) tab. |
| New Scene (<kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>N</kbd>) | Closes the current scene and create a new scene, the newly created scene needs to be saved manually before it will be added to the project directory. |
| Save Scene (<kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>S</kbd>) | Save the scene you are currently editing. If the scene is created using **File -> New Scene**, a dialog box will pop up when you save it for the first time, you need to choose the location to save the scene file and fill in the file name, then click **Save** to save it. Scene files have `.scene` as extension. |
| Save As (<kbd>Ctrl</kbd>/<kbd>Cmd</kbd> +<kbd>Shift</kbd>+ <kbd>S</kbd>) | Generates a copy of the current scene file and save it in the project. |
| Import Cocos Creator 2.x Project | V2.x asset import tool, supporting the perfect import of old project assets, as well as the assisted migration of code. Please refer to [v3.0 Upgrade Guide](../../release-notes/upgrade-guide-v3.0.md) for details. |

## Edit

This option mainly includes common editing functions such as undo, redo, copy and paste.

![edit](./img/edit.png)

| Option | Description | Default Shortcut |
| :--- | :-- | :--|
| Undo | Undoes the last change to the scene. | <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>Z</kbd>
| Redo | Redoes the undo action from the previous step. | <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>Z</kbd>
| Cut | Cuts the currently selected node or character to the clipboard. | <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>X</kbd>
| Copy | Copies the currently selected node or character to the clipboard. | <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>C</kbd>
| Paste | Paste the contents of the clipboard into the appropriate location. | <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>V</kbd>
| Select All | Selects all nodes in the same hierarchy if the focus is within the **Hierarchy** panel, or all assets in the same hierarchy if the focus is in the **Assets** panel. | <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>A</kbd>

> **Note**: **Copy**, **Cut** and **Paste** of nodes should be done using shortcut keys.

## Nodes

This option contains functions to adjust the view, disconnect prefabricated nodes and create nodes.

![node](./img/node.png)

| Option | Description |
| :--- | :-- |
| Align With View (<kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>F</kbd>) | Moves the currently selected node to the center of the view of the **Scene** panel. |
| Align View With Node | Sets the view in the **Scene** panel to be centered on the currently selected node.
| Disconnect Node With Prefab Asset | For converting the selected prefab node to a normal node, please refer to [Prefab](../../asset/prefab.md) for details. |
| Disconnect Node With Prefab Asset Recursively | Recursively convert prefab nodes containing nested nodes in the scene to normal nodes, see [Prefab](../../asset/prefab.md) for details.
| Empty Node | Creates an empty node in the scene. If the node is already selected in the scene before the command is executed, the newly created node will become a child of the selected node. |
| 3D Objects | Creator provides some relatively basic static model controls for use, currently including **Cube**, **Cylinder**, **Sphere**, **Capsule**, **Cone**, **Torus**, **Flat** and **Quad**. To create other types of models, refer to the [MeshRenderer component](../../engine/renderable/model-component.md) documentation. |
| 2D Objects | Create Creator's pre-defined 2D nodes in the scene containing the base renderable components, which currently include **Graphics**, **Label**, **Mask**, **ParticleSystem2D**, **Sprite**, **SpriteSplash** (monochrome) and **TiledMap** (map), for details please refer to the [Introduction to 2D Renderable Components](../../ui-system/components/editor/render-component.md) documentation. |
| UI Components | Create Creator's pre-defined nodes containing basic UI components in the scene, which currently include Common UI controls such as **Button**, **Widget**, **Layout**, **ScrollView**, **EditBox** nodes, etc. For more UI components, please refer to the [UI Basic Components](../../ui-system/components/editor/base-component.md) documentation. |
| Lighting | Create Creator preset nodes in the scene containing base light components, currently including **Parallel Light**, **Spherical Light** and **Spot Light**, please refer to the [Lighting](../../concepts/scene/light.md) documentation. |
| Effects | Create a Creator preset in the scene containing [Particle System](../../particle-system/overview.md) component in the scene. More effects components can be added in the **Property Inspector** panel by clicking **Add Component -> Special Effects**. |
| Camera | Creates a node in the scene with the Camera component pre-defined by Creator. For details on how to use it, please refer to the [Camera component](../components/camera-component.md) documentation. |
| Terrain | Creates a node containing the terrain component pre-defined by Creator in the scene. Please refer to the [Terrain System](../terrain/index.md) documentation for more details on how to use it. |

## Project

This option is mainly used to perform preview run build projects, project configuration and custom builds, etc.

![project](./img/project.png)

| Option | Description |
| :--- | :--- |
| Project Settings | Opens [Project Settings](../project/index.md) panel to set the relevant configuration options for a specific project. |
| Lightmapping | Opens the [Lightmapping](../../concepts/scene/light/lightmap.md) panel to configure the baking properties for generating light maps. |
| Play on Device (<kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>P</kbd>) | Click on this option to preview the project in the selected browser/simulator window, for details please refer to the [Project Preview & Debugging](../preview/index.md) documentation. |
| Refresh Device (<kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>P</kbd>) | Refreshes the opened browser preview window. |
| Create Preview Template | This option is used to customize the desired preview effect, please refer to the [Web Preview Customization Workflow](../preview/browser.md) documentation for details. |
| Build (<kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>B</kbd>) | Opens the [Build](../publish/index.md) panel to package the game to the target platform. |
| Create Build Template | This option is used to customize the Build panel of the project, please refer to the [Custom Project Build Process](../publish/custom-project-build-template.md) documentation for details. |
| Generate Build Extension | This option is used to extend the build process, please refer to the [Extending Build Process](../publish/custom-build-plugin.md) documentation for details. |

## Panel

This option is mainly used to open various panels in the editor.

![panel](./img/panel.png)

| Option | Description | Default Shortcut |
| :--- | :-- |:-- |
| Console | Opens [Console](../console/index.md). For viewing the output log messages.  |<kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>0</kbd>
| Scene | Opens the [Scene](../scene/index.md) panel. For selecting and placing various game elements such as scene images, characters, effects, UI, etc. |<kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>1</kbd>
| Assets | Opens **Assets**/**Assets Preview** panel. For accessing/managing/viewing project assets, please refer to the [Assets](../assets/index.md) documentation for details. | The shortcut for the **Assets** panel is <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>2</kbd>
| Inspector | Opens the [Inspector](../inspector/index.md) panel. For viewing and editing the working area of the currently selected node, node components and assets. |<kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>3</kbd>
| Hierarchy | Opens the [Hierarchy](../hierarchy/index.md) panel, which shows the hierarchical relationship between all nodes in the scene in the form of a tree-like list. |<kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>4</kbd>
| Preview | Opens the **Camera Preview** panel, which shows the same screen as the one shown in the bottom right corner of the **Scene** panel when the corresponding Camera node is selected in the scene. When adjusting the scene, the screen in the Camera Preview panel will also be synchronized in real time. |<kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>5</kbd>
| Animation | Opens the [Animation](../../animation/index.md) panel or [Joint Texture Layout](../../animation/joint-texture-layout.md) panel. For editing and viewing frame animation or skeleton animation, etc. |The shortcut for the **Animation** panel is <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>6</kbd>
| Node Library | Open the Node Prefab Library panel. This panel is a very simple and straightforward visual control repository, where developers can drag and drop the controls listed here into the **Scene** or the **Hierarchy** panel to quickly create pre-configured controls. |<kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>7</kbd>
| Service | Opens the [Service](https://service.cocos.com/document/en) panel, which provides a number of quality official and third-party services that allow developers to access more extensions beyond the engine and make game development easier. |<kbd>Ctrl</kbd>/<kbd>Cmd </kbd> + <kbd>8</kbd>

## Extension

This option mainly includes Extension Manager, Store and Create Extension, please refer to the [Extending the Editor](../extension/readme.md) chapter.

![extension](./img/extension.png)

| Option | Description |
| :--- | :--- |
| Extension Manager | Opens the **Extension Manager** panel, which includes editor built-in extensions, extensions installed in project directory and global directory, please refer to the [Extending the Editor](../extension/readme.md) chapter for details. |
| Store | The [Cocos Store](https://store.cocos.com/app/) is built into Cocos Creator and allows users to browse, download and automatically install official or third-party extensions and assets. You can also submit your own extensions, art materials, music and sound effects to the extension store for sharing or selling. For more information, please refer to the [Submitting Resources to Store](../extension/store/upload-store.md) documentation.
| Create Extension | This option is used to generate an [extension package](../extension/first.md) in the project/global directory to extend the editor with features. |

## Developer

This option contains mainly development-related menu functions such as scripts, engine and DevTools.

![developer](./img/developer.png)

| Option | Description |
| :--- | :--- |
| Compile Engine (<kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>F7</kbd>) | Compile custom engine, please refer to the [Engine Customization Workflow](../../advanced-topics/engine-customization.md) documentation. |
| Rebuild Native Engine | Compile the custom native engine simulator, please refer to [Customizing the Native Engine Simulator](../../advanced-topics/engine-customization.md#modifying-native-engine-simulator). |
| Message DevTools | Opens the Message DevTool for debugging IPC interactions at runtime inside the editor. |
| Tester | The editor's built-in extended testing tool, not yet fully functional |
|Toggle Graphics Tool | Toggles the Graphics tool panel for debugging scene rendering. |
| Message Manager | Opens the [Message Manager](../extension/contributions-messages.md) panel to display public messages and their descriptions for each feature defined by the editor. |
| Export.d.ts | Exports editor-related APIs. |
| Reload (<kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>R</kbd>) | Reload the editor interface. |
| UI Components | Opens the UI Components panel, which lists how to use the pre-defined UI components provided within the editor, please refer to [UI Components](../extension/ui.md). |
| Cache | The **clear code cache** in this option is used to clear the cache generated when compiling scripts. |
| VS Code Workflow | The working environment-related features of the VS Code editor, currently supporting **Add Chrome Debug Setting** and **Add Compile Task**. Please refer to the [Coding Environment Setup](../../scripting/coding-setup.md) documentation for details. |
| Toggle DevTools (<kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>I</kbd>) | Opens DevTools window for editor interface extension development. It is also possible to customize the log output to **Console**, please refer to [Custom output messages](../console/index.md#custom-output-messages). |
| Open Assets DevTools | Opens the Assets DevTool panel for viewing log messages during modifications to the asset-db process. |
| Open Scene DevTools | Opens the Scene DevTool panel to view log messages during modifications to the scene. |
| Open Build DevTools | Opens the Build DevTool to view all log messages generated during the build process including the call stack. |

## Help

![help](./img/help.png)

| Option | Description |
| :--- | :--- |
| User Manual | Open [User Manual](../../index.md) in default browser. |
| API Reference | Open [API Reference Documentation](__APIDOC__/en/#/) in default browser. |
| Forum | Open [Cocos Creator Forum](https://discuss.cocos2d-x.org/c/33) in default browser. |
| Release Notes | Open the [release notes](https://www.cocos.com/creator) for each version of Cocos Creator in default browser. |
| Engine Repository | Open [TypeScript Engine Repository](https://github.com/cocos/cocos-engine) in default browser. |
