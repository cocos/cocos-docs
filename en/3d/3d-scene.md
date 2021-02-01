# 3D Scene

Starting from v2.1.1, Creator supports one-click switching of scenes to 3D editing mode for easy editing of 3D objects, Cameras, Lighting, etc. A separate **Game Preview** panel has also been added to visually preview what the camera seen during scene editing.

## 3D Scene Editor

Click the **3D** button at the top left of the editor:

![](img/3d.png)

Then you can switch the **Scene** to 3D editing mode. Drag with right mouse button to rotate camera, scroll to zoom.

![](img/3d-scene.png)

> **Note**: when working on a 3D project, we usually assign multiple Cameras to UI and scene. In this case, you need to set the Camera's `depth` property correctly, otherwise the occlusion order may be incorrect. Please refer to [Camera Properties](../render/camera.md#camera-properties) for details.

## Scene Rendering Configuration

Some properties are provided in the scene rendering configuration panel of **Scene** to help debug the rendering effect of 3D objects in the scene.

![config](img/rendering-config.png)

- Wire Frame

  Outline the triangles on the surface of the model with lines.

  ![wire frame](img/wire-frame.png)

- Normal
    
  Show vertex normals for 3D models.

  ![normal](img/normal.png)

## Game Preview

You can open panel by click **Main Menu -> Panel -> Game Preview**.

![](img/game-preview.png)

The **Game Preview** panel can be placed in a separate window or dragged directly into the editor's main window. By adjusting the camera in the scene, you can visually preview what the camera sees in the scene in the **Game Preview**.
