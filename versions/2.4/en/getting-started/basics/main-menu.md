# Main menu

## Cocos Creator (Mac)

* **About Cocos Creator**: Display information about Cocos Creator.
* **Preferences**: Open the [Setting](editor-panels/preferences.md) panel and set the editor's personalization options.
* **Hide Cocos Creator (Shortcut: <kbd>H</kbd>)**: Hide Cocos Creator window.
* **Hide Others (Shortcut: <kbd>Shift + H</kbd>)**: Hide all other windows except Cocos Creator.
* **Show All**: Show all hidden windows.
* **Quit (Shortcut: <kbd>Ctrl/Command + Q</kbd>)**: Exit Cocos Creator Editor.

## File

* **Open Project...**: Close the Cocos Creator and open Dashboard.
* **New Scene (Shortcut: <kbd>Ctrl/Command + N</kbd>)**: Create a new scene in the current project.<br>
A game consists of one or more scenes. You'll need to create new scenes when you intend to make independent modules such as new stages, main menus, loading screens, setting screens, etc.
* **Save Scene (Shortcut: <kbd>Ctrl/Command + S</kbd>)**: Save the current editing scene.<br>
A save file dialog will pop up if the current scene has never been saved before, in which you can determine where to save your scene file (`*.fire`). If the scene has been saved before, Cocos Creator will update the save file directly.
  > It is suggested to place all scene files in a particular directory for management, for example **assets/scenes**.
* **Build Settings**: Set the project build parameters.<br>
Building is a critical step in the deployment process. Cocos Creator will pack and optimize your game files during the building process, in order for it to be deployed on various platforms quickly, safely and correctly. Through the Build Settings, you can fine tune the parameters for certain needs, as well as preview your game before deployment.
You will find more information about Build Settings in the [Tool Windows](#tool-windows) section.

## Edit

* **Undo (Shortcut: <kbd>Z</kbd>)**: Undo the last operation.
* **Redo (Shortcut: <kbd>Shift + Z</kbd>)**: Redo the most recently undone operation.
* **Cut (Shortcut: <kbd>X</kbd>)**: Cut the selected Entity into the clipboard.
* **Copy (Shortcut: <kbd>C</kbd>)**: Copy the selected Entity into the clipboard.
* **Paste (Shortcut: <kbd>V</kbd>)**: Paste the Entity from the clipboard into the current scene.
* **Select All (Shortcut: <kbd>A</kbd>)**: The focus is selected in the scene editor for all nodes, and the focus is on the console with all log information selected.

<!-- * **Play (Shortcut: <kbd>Ctrl/Command + P</kbd> )**
Play the current scene in a browser.
* **Reload Connected Device (Shortcut: <kbd>Shift + Ctrl/Command + P</kbd>)**
Reload the browser tab that is playing the current scene.
-->

## Node Presets

Create nodes through this menu, and Control node to prefab conversion.

* **Connect Node To Prefab**: At the same time select a node in the scene and a prefab in the **Assets**, and then select this menu item to associate the selected node and prefab.
* **Convert to Ordinary Node**: Select a prefab node in the scene. Executing this command will convert the prefab node into a normal node.
* **Create Empty Node**: Create an empty node in the scene. If the node is selected in the scene before the command is executed, the new node becomes the child of the selected node.
* **Create Renderer Nodes**: Create a preset node that contains the render component. For details on how to use the render component, please refer to [Renderer and Graphics](../../render/index.md).
* **Create UI Nodes**: Create a preset node that contains UI components, please refer to [UI system](../../ui/index.md).

## Component

Use this menu to add various components on the currently selected node.

* **Collider Component**: Please refer to [Collider Component](../../physics/collision/edit-collider-component.md).
* **Other Component**: Including animation, audio source, trailing and other components.
* **Physics Component**: Add physical related components.
* **Renderer Component**: Please refer to [Renderer and Graphics](../../render/index.md).
* **Custom Component**: Here you can add the script component that the user created in the project.
* **UI Component**: Please refer to [UI system](../../ui/index.md).

## Project

Run, build projects, and project-specific personalization configurations.

* **Play On Device (<kbd>Ctrl/Command + P</kbd>)**: Run the project in a browser or simulator.
* **Refresh Connected Device (<kbd>Shift + Ctrl/Command + P</kbd>)**: Refreshes the preview window that is already open.
* **Build... (<kbd>Shift + Ctrl/Command + B</kbd>)**: Open [Build](../../publish/index.md) panel.
* **Project Setting...**: Open [Project Setting](editor-panels/project-settings.md).

## Panel

* **Assets (Shortcut: <kbd>Ctrl/Command + 2</kbd>)**: Open or focus the [Assets](editor-panels/assets.md) panel.
* **Console (Shortcut: <kbd>Ctrl/Command + 0</kbd>)**: Open or focus the [Console](editor-panels/console.md) panel.
* **Node Tree (Shortcut: <kbd>Ctrl/Command + 4</kbd>)**: Open or focus the [Node Tree](editor-panels/node-tree.md) panel.
* **Properties (Shortcut: <kbd>Ctrl/Command + 3</kbd>)**: Open or focus the [Properties](editor-panels/properties.md) panel.
* **Node Library (Shortcut: <kbd>Ctrl/Command + 5</kbd>)**: Open or focus the [Node Library](editor-panels/node-library.md) panel.
* **Scene (Shortcut: <kbd>Ctrl/Command + 1</kbd>)**: Open or focus the [Scene](editor-panels/scene.md) panel.
* **TimeLine (<kbd>Ctrl/Command + 6</kbd>)**: Open or focus the [Timeline](../../animation/animation.md) panel.

## Layout

Select one from the preset editor layout.

* **Default**
* **Portrait**
* **Classical**

If you want to manually adjust the editor layout, please refer to the [Editor Layout](./layout.md).

## Extension

For menu items related to extensions, read the [Editor Extension](../../extension/index.md) chapter.

* **Create a new extension...**
  * **For all Projects (in user profile folder)**
  * **For current project (in project folder)**
* **Extension Store...**: Open the extension store and download the official and community-provided extensions.

## Developer

Scripts and editors extend development-related menu functionality.

* **VS Code Workflow**: [VS Code](http://code.visualstudio.com/) Code Editor work environment related functions, please read [Coding Environment Setup](../coding-setup.md) section for details.
  * **Update VS Code API Source**
  * **Install VS Code Extension**
  * **Add TypeScript Config**
  * **Add Chrome Debug Setting**
  * **Add Compile Task**
* **Reload (Shortcut: <kbd>Ctrl/Command + R</kbd>)**: Reload the Cocos Creator Editor.
* **Compile User Scripts (Shortcut: <kbd>F7</kbd>)**: Recompile all scripts in the current scene.
* **Inspect Element (Shortcut: <kbd>Ctrl/Command + Shift + C</kbd>)**: View editor interface elements in Chrome Developer Tools
* **Developer Tools (Shortcut: <kbd>Alt + Ctrl/Command + I</kbd>)**: Open the **Developer Tools** window. Various useful and powerful features are provided in **Developer Tools** for analyzing, debugging and tracing, which are essential for game script developers.

## Help

* **User Manual**: Open the User Manual Document in the browser.
* **API Reference**: Open API Reference Documentation in the browser.
* **Forum**: Visit the forum of Cocos Creator to share ideas with other users and developers.
* **Subscribe To Newsletter**: Subscribe to the Cocos Creator newsletter for the latest news and updates.
* **User account information**
* **Log Out**: Log out account.
