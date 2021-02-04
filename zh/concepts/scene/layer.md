# 层级

layer 属性是一个无符号32位的整数，最多支持 32 个不同类型的 layer, 引擎将 20 - 30 位作为系统默认，留出 00 - 19 位给用户做自定义设置。相机的 Visibility 属性跟节点的 layer 属性，都是用来控制其可见性的，相机的 Visibility 属性支持多个 layer 状态叠加，采用 ` | `,` & ` 这种位操作符判断该节点的 layer 是否应该被观察到。

## 系统默认的层级属性

![layer gizmo](scene/layer-gizmo.png)

| 属性                  | 说明                     | 值              |
| :---                  | :---                    | :---            |
| **NONE**              | 设置全都不可见            | 0               |
| **IGNORE_RAYCAST**    | 设置忽略射线检测          | 1 << 20         |
| **GIZMOS**            | 设置配置信息可见          | 1 << 21         |
| **EDITOR**            | 设置编辑器可见            | 1 << 22        |
| **UI_3D**             | 设置 `3D UI` 节点可见     | 1 << 23         |
| **SCENE_GIZMO**       | 设置场景配置节点可见       | 1 << 24         |
| **UI_2D**             | 设置 `2D UI` 节点可见     | 1 << 25         |
| **PROFILER**          | 设置分析工具节点可见       | 1 << 28         |
| **DEFAULT**           | 设置默认节点可见          | 1 << 30         |
| **ALL**               | 设置所有节点可见          | 0xffffffff      |

## 用户自定义层级

![layer gizmo](scene/layer-edit.png)
