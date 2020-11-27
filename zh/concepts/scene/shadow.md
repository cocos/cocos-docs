# 阴影

在 3D 世界中，光与影一直都是极其重要的组成部分，它们能够丰富整个环境，质量好的阴影可以达到以假乱真的效果，并且使得整个世界具有立体感。

Creator 3.0 目前支持 **Planar** 和 **ShadowMap** 两种阴影类型。

![shadow](shadow/shadowExample.png)

## 开启阴影

物体开启阴影效果的步骤如下：

1. 在 **层级管理器** 中选中 **Scene**，然后在 **属性检查器** 的 **shadows** 组件中勾选 **Enabled** 属性。

    ![](shadow/enable-shadow.png)

2. 在 **层级管理器** 中选中需要显示阴影的 3D 节点，然后在 **属性检查器** 的 **MeshRenderer** 组件中将 **ShadowCastingMode** 属性设置为 **ON**。
    
    ![](shadow/set-meshrenderer.png)

    若阴影类型是 **ShadowMap**，还需要将 MeshRenderer 组件上的 **ReceiveShadow** 属性设置为 **ON**。

**注意**：如果阴影无法正常显示，需要调整一下方向光的照射方向。

## shadows 类型

阴影类型可在 shadows 组件的 **Type** 属性中设置。

### Planar shadow

Planar 阴影类型一般用于较为简单的场景。

![](shadow/plannar-properties.png)

| 属性  | 说明  |
| :--- | :--- |
| **Enabled**     | 是否开启阴影效果      |
| **Type**        | 阴影类型             |
| **ShadowColor** | 设置阴影颜色         |
| **Normal**      | 垂直于阴影的法线，用于调整阴影的倾斜度  |
| **Distance**    | 阴影在法线的方向上与坐标原点的距离     |

调节方向光照射的方向可以调节阴影的投射位置。

**注意**：Planar 类型的阴影只有投射在平面上才能正常显示，不会投射在物体上，也就是说 MeshRenderer 组件中的 **ReceiveShadow** 属性是无效的。

## ShadowMap

ShadowMap 是以光源为视点来渲染场景的。从光源位置出发，场景中看不到的地方就是阴影产生的地方。

![shadow Map 面板细节](shadow/shadowmap-properties.png)

| 属性  | 说明  |
| :--- | :--- |
| **Enabled**         | 是否开启阴影效果     |
| **Type**            | 阴影类型    | 
| **ShadowColor**     | 设置阴影颜色     |
| **Pcf**             | 设置阴影边缘反走样等级，目前包括 **HARD**、 **FILTER_X5**、**FILTER_X9**、**FILTER_X25** 四种    |
| **Near**            | 设置主光源相机的近裁剪面     |
| **Far**             | 设置主光源相机的远裁剪面     |
| **OrthoSize**       | 设置主光源相机的正交视口大小     |
| **ShadowMapSize**   | 设置阴影纹理大小     |
| **Aspect**          | 设置主光源相机的正交视口长宽比     |

ShadowMap 在开启了物体 **MeshRenderer** 组件上的 **ReceiveShadow** 后，就会接收并显示其它物体产生的阴影效果。

ShadowMap 一般用于要求光影效果比较真实，且较为复杂的场景。但不足之处在于如果不移动光源，那么之前生成的 Shadow Map 就可以重复使用，而一旦移动了光源，那么就需要重新计算新的 ShadowMap。
