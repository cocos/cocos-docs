# Scene Camera Configuration

The operation and rendering of the built-in camera used to render the scene editor.

- 2D Editor Camera: Configure the camera properties in 2D edit mode.
- 3D Editor Camera: Configure the camera properties in 3D edit mode.

  ![camera config](./camera-config/camera-config.png)

## Properties 

- Navigation Speed: The navigating and zooming speed of the camera
  - Affects **scroll wheel zoom** mode in 2D edit mode.
  - Affects **scroll wheel zoom** and **flythrough** mode in 3D edit mode.

- Near Clip: The near clipping plane of the camera frustum in the scene. Objects outside the view frustum will be culled.

- Far Clip: The far clipping plane of the camera frustum in the scene. Objects outside the view frustum will be culled.
