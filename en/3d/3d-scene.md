# 3D Scene

Starting from v2.1.1, Creator supports one-click switching of scenes to 3D editing mode for easy editing of 3D objects, Cameras, Lighting, etc. A separate **Game Preview** panel has also been added to visually preview what the camera seen during scene editing.

## 3D Scene Editor

Click the **3D** button at the top left of the editor:

![](img/3d.png)

Then you can switch the **Scene** to 3D editing mode. Drag with right mouse button to rotate camera, scroll to zoom.

![](img/3d-scene.png)

**Note**: When working on a 3D project, we usually assign multiple Cameras to UI and scene. In this case, you need to set the Camera's `depth` property correctly, otherwise the occlusion order may be incorrect. Please refer to [Camera Properties](../render/camera.md#camera-properties) for details.

## Game Preview

You can open panel by click **Main Menu -> Panel -> Game Preview**.

![](img/game-preview.png)

The **Game Preview** panel can be placed in a separate window or dragged directly into the editor's main window. By adjusting the camera in the scene, you can visually preview what the camera sees in the scene in the **Game Preview**.
