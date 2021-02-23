# 层级

节点的 Layer 属性是一个无符号 32 位的整数，最多支持 32 个不同类型的 Layer，可在编辑器上方菜单栏的 **项目 -> 项目设置 -> [Layers](../../editor/project/index.md#layers)** 中设置。其中开发者可自定义第 0 ~ 19 个 Layer，剩下后面的 12 个 Layers 则是引擎内置的。

相机的 Visibility 属性跟节点的 Layer 属性，都是用来控制其可见性的。但只有当节点设置的 Layer 属性包含在相机的 Visibility 中时，节点才可以被相机看见。相机的 Visibility 属性采用 `|` 和 `&` 这种位操作符来判断节点的 Layer 是否应该被观察到，且支持同时选择多个 Layer。具体内容可参考 [Camera — Visibility 属性](../../editor/components/camera-component.md#%E7%9B%B8%E6%9C%BA%E5%88%86%E7%BB%84%E6%B8%B2%E6%9F%93)。

## 引擎内置的层级

![layer gizmo](scene/layer-gizmo.png)

| 属性                  | 说明                     | 值              |
| :---                  | :---                    | :---            |
| **NONE**              | 设置全都不可见            | 0               |
| **IGNORE_RAYCAST**    | 设置忽略射线检测          | 1 << 20         |
| **GIZMOS**            | 设置配置信息可见          | 1 << 21         |
| **EDITOR**            | 设置编辑器可见            | 1 << 22        |
| **UI_3D**             | 设置 3D **UI** 节点可见     | 1 << 23         |
| **SCENE_GIZMO**       | 设置场景配置节点可见       | 1 << 24         |
| **UI_2D**             | 设置 2D **UI** 节点可见     | 1 << 25         |
| **PROFILER**          | 设置分析工具节点可见       | 1 << 28         |
| **DEFAULT**           | 设置默认节点可见          | 1 << 30         |
| **ALL**               | 设置所有节点可见          | 0xffffffff      |

## 用户自定义层级

![layer gizmo](scene/layer-edit.png)
