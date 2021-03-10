# Layer

The `Layer` property of the Node is an unsigned 32-bit integer, supporting up to 32 different types of `Layer`, which can be set in **Project -> Project Settings -> [Layers](../../editor/project/index.md#layers)** in the menu bar above the editor. The developer can customize the Layer **0 ~ 19**, and the remaining 12 Layers are the engine's built-in ones.

The `Visibility` property of the Camera and the `Layer` property of the Node are both used to control the visibility of nodes. However, a node can only be seen by the camera if the `Layer` property set in the node is included in the `Visibility` of the camera. The `Visibility` property of the camera uses bitwise operators (such as `|` and `&`) to determine whether a node's `Layer` should be visible, and supports selecting multiple Layers at the same time. See the [Camera — Set the Visibility property](../../editor/components/camera-component.md) documentation for details.

## The engine's built-in Layers

![layer gizmo](scene/layer-gizmo.png)

| Property              | Description                             | Property Value           |
| :---                  | :---                                    | :---            |
| **NONE**              | Set all invisible                       | 0               |
| **IGNORE_RAYCAST**    | Setting to ignore ray detection         | 1 << 20         |
| **GIZMOS**            | Set gizmo information visible           | 1 << 21         |
| **EDITOR**            | Set editor visible                      | 1 << 22         |
| **UI_3D**             | Set the `3D UI` node to be visible      | 1 << 23         |
| **SCENE_GIZMO**       | Set scene gizmo visible                 | 1 << 24         |
| **UI_2D**             | Set `2D UI` nodes visible               | 1 << 25         |
| **PROFILER**          | Set the profiler node to be visible     | 1 << 28         |
| **DEFAULT**           | Set the default node to be visible      | 1 << 30         |
| **ALL**               | Set all nodes to be visible             | 0xffffffff      |

## User-defined Layers

![layer gizmo](scene/layer-edit.png)
