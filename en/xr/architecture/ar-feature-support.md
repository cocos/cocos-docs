# AR Features on Platforms

The current version of the AR extension supports the following AR features:

| AR Feature         | Description                                                         |
| :-------------- | :----------------------------------------------------------- |
| AR Session      | Enables, disables, and configures the AR session on the target platform to control the lifecycle of the AR application. |
| Device Tracking | Tracks the device's position and rotation in physical space.                           |
| AR Camera       | Renders the live video feed from the device's camera and provides environment-based lighting estimation. |
| Plane Tracking  | Detects and tracks flat surfaces in the physical world.                                 |
| Image Tracking  | Detects and tracks specific images in the physical world.                                 |
| Hit Detection   | Supports ray casting for hit detection against tracked entities.             |
| Anchors         | Tracks fixed points in the scene space.                                     |
| Meshing         | Converts the physical world into a mesh representation.                                           |
| Light Estimate  | Provides lighting estimation in the AR environment.                                                   |

Cocos CreatorXR v1.1.0 provides the following AR feature support for each platform:

| AR Feature/Platform    | ARKit | ARCore | AREngine | Spaces |
| :-------------- | :---- | :----- | :------- | :----- |
| AR Session      | ✓     | ✓      | ✓        | ✓      |
| Device Tracking | ✓     | ✓      | ✓        | ✓      |
| AR Camera       | ✓     | ✓      | ✓        | ✓      |
| Plane Tracking  | ✓     | ✓      | ✓        | ✓      |
| Image Tracking  | ✓     | ✓      | ✓        | ✓      |
| Hit Detection   | ✓     | ✓      | ✓        |        |
| Anchors         | ✓     | ✓      | ✓        |        |
| Meshing         | ✓     |        |          |        |
| Light Estimate  |       | ✓      | ✓        |        |
