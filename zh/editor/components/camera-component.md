# 相机

游戏中的相机是用来捕捉场景画面的主要工具。我们通过调节相机相关参数来控制可视范围的大小，在 Cocos Creator 编辑器中相机呈如下表示：

![camera](camera/camera.png)

相机的可视范围是通过 6 个平面组成一个 **视锥体（Frustum）** 构成，**近裁剪面（Near Plane）** 和 **远裁剪面（Far Plane）** 用于控制近处和远处的可视距离与范围，同时它们也构成了视口的大小。

![camera view](camera/camera-view.gif)

相机组件接口请参考 [Camera API](../../../api/zh/classes/component_camera.camera.html)。

## 相机组件

相机组件是我们用来呈现场景画面的重要功能组件。

![camera component](camera-component.png)

| 属性名称 | 说明 |
|:-------:|:---:|
| priority | 相机的渲染优先级，值越小越优先渲染 |
| visibility | 可见性掩码，声明在当前相机中可见的节点层级集合 |
| clearFlags | 相机的缓冲清除标志位，指定帧缓冲的哪部分要每帧清除。包含：<br>DONT_CLEAR：不清空；<br>DEPTH_ONLY：只清空深度；<br> SOLID_COLOR：清空颜色、深度与模板缓冲；<br> SKYBOX：启用天空盒，只清空深度 |
| clearColor | 指定清空颜色 |
| clearDepth | 指定深度缓冲清空值 |
| clearStencil | 指定模板缓冲清空值 |
| projection | 相机投影模式。分为 **透视投影（PERSPECTIVE）** 和 **正交投影（ORTHO）** |
| fovAxis | 指定视角的固定轴向，在此轴上不会跟随屏幕长宽比例变化 |
| fov | 相机的视角大小 |
| orthoHeight | 正交模式下的视角 |
| near | 相机的近裁剪距离，应在可接受范围内尽量取最大 |
| far | 相机的远裁剪距离，应在可接受范围内尽量取最小 |
| aperture | 相机光圈，影响相机的曝光参数 |
| shutter | 相机快门，影响相机的曝光参数 |
| iso | 相机感光度，影响相机的曝光参数 |
| rect | 此相机最终渲染到屏幕上的视口位置和大小 |
| targetTexture | 指定此相机的渲染输出目标贴图，默认为空，直接渲染到屏幕 |

## 相机分组渲染

分组渲染功能是通过相机组件([Camera](../../editor/components/camera-component.md)) 的 Visibility 属性配合节点的 Layer 属性共同决定。用户可通过代码设置 Visibility 的值来完成分组渲染。所有节点默认都属于 DEFAULT 层，在所有相机都可见。

### 相机的 Visibility 属性设置

引擎提供了了独占的 layer，范围 20位 ~ 30位，同时也向用户提供了 0 ~ 19 位自定义的 layer 值。如下图：

![layer gizmo](layer-gizmo.png)

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

当用户勾选了多个 layer 作为该相机可见依据时，Visibility 属性通过 ` | ` 操作计算得出。

下图为相机使用到的 layer。

![camera visibility gizmo](camera-visibility-gizmo.png)

此时相机的 Visibility 属性值为 ` 1 << 23 | 1 << 30 = 1820327937 `。

### 相机的可见性计算

相机自身可以设置一个或多个可见的 Visibility 属性，同时 node 上也有自身的 layer 值，camera 上的 Visibility 是一个 2^32^ 整数，每一种可见的 layer 占一位，采用位操作运算，最高支持 32 个不同的 layer 标签（每一种 layer 值占一位，即用 2^layer^ 表示）。在相机 culling 时，根据每个节点的 layer 值，跟相机进行 ` & ` 操作，如果相机的 Visibility 属性包含这个 layer，那么当前节点就应该被相机所见。反之则看不见。
