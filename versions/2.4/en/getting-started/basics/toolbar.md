# Tool bar

![toolbar](index/toolbar.png)

**Tool bar** is at the top of the main editor window including five sets of control buttons or pieces of information that provide editing functions for specific panels and allow the user to conveniently implement workflows.

### Transform Tools

![transform tool](toolbar/transform_tool.png)

This provides the editing node transform attribute (position, rotation, scale, size) function for the **scene editor**. Please refer to [use transform tool to place node](editor-panels/scene.md#%E4%BD%BF%E7%94%A8%E5%8F%98%E6%8D%A2%E5%B7%A5%E5%85%B7%E5%B8%83%E7%BD%AE%E8%8A%82%E7%82%B9) for detailed information.

### Gizmo Display Mode

This control is for setting display mode of the **Transform Tool** in **scene editor** with the two sets of buttons below.

![gizmo position](toolbar/gizmo_position.png)

Position mode:

* Anchor: transform tool will be displayed at the position where the node **Anchor** is.
* Central Point: transform tool will be displayed at the position where the central point of the node is (influenced by the bounding box size).

![gizmo rotation](toolbar/gizmo_rotation.png)

Rotation mode:

* Local: transform tool's rotation (handle direction) will stay the same as the **Rotation** attribute of the node.
* World: transform tool's rotation stays the same and the handles of the x and y axes stay the same as the direction of the world coordinate.

### Preview Game

![preview](toolbar/preview.png)

This includes three buttons:

* Select the preview platform: Click on the drop-down menu to select the preview platform as the simulator or the browser.
* Run preview: run the scene being currently edited in the browser.
* Refresh device: reload the current scene on all the devices that are connected to this machine to preview the game (including local browser and other mobile devices connected to the native machine).

### Preview Address

![preview url](toolbar/preview_url.png)

Here is shown the LAN address of the desktop computer running Cocos Creator. The mobile devices connected to the same local area network can access this address to preview and debug the game.

### Open Project Folder

![open project](toolbar/open_project.png)

* **Open Project**: Open the project folder.
* **Open App**: Open the installation path of the program.
