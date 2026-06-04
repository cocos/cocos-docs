# 反射探针

自 v3.7 开始，Cocos Creator 支持反射探针。

反射探针是将选择范围内的反射光，使用烘焙或实时的方式应用到当前场景上，以提高场景光照可信度的组件。

在 **层级管理器** 或顶部菜单上选择 **光源** -> **反射探针** 即可在场景内创建反射探针。

![add-component](reflection-probe/add-reflect-probe.png)

## 属性

![property](reflection-probe/property.png)

| 属性 | 说明 |
| :-- | :-- |
| **Size** | 反射探针的范围，在场景内可以通过操作 Gizmo 来调整反射探针的大小 |
| **Probe Type** | 反射探针的类型 <br> 可选项：<br> **CUBE**：支持烘焙的反射探针 <br> **PLANNAR**：支持实时反射的反射探针 <br> ![probe-type](reflection-probe/probe-type.png)|
| **Resolution** | 反射探针烘焙后的立方体贴图每个面的分辨率 <br> 可选项： **Low_256x256**/**Medium_512x512**/**Hight_768x768** <br> 该选项仅在 **Probe Type** 为 **CUBE** 时生效 <br> ![resolution](reflection-probe/resolution.png)|
| **Background Color** | 背景颜色，仅在 **Probe Type** 为 **PLANNAR** 时生效 |
| **Clear Flag** | 相机的缓冲清除标志位，指定帧缓冲的哪部分要每帧清除。包含：<br> SOLID_COLOR：清空颜色、深度与模板缓冲；<br> SKYBOX：启用天空盒，只清空深度  <br> ![clear-flag](reflection-probe/clear-flag.png)|
| **Visibility** | 可见性掩码，声明在当前反射探针中可见的节点层级集合 <br> 通过下拉菜单选择 <br> ![visibility](reflection-probe/visibility.png)|
| **Source Camera** | 指定实时反射的相机 <br> 该属性仅在 **Probe Type** 为 **PLANNAR** 时生效 |
| **Bake** | 烘焙按钮，点击后即可以对反射探针进行烘焙 |

### 探针类型

![probe-type](reflection-probe/probe-type.png)

Cocos Creator 的反射探针有两种类型，分别为：

- **CUBE**：将区域内的反射信息烘焙到一张 CUBE Map 上。

    ![cube](reflection-probe/cube.png)

    在反射探针选择为 **CUBE** 时，开发者可以通过下方的 **RESOLUTION** 下拉菜单选择最终烘焙贴图的大小。

- **PLANNAR**：实时反射探针。

    常用模拟水面、镜子、大理石或者湿润的地面等。

    ![plannar](reflection-probe/plannar.png)

    当反射探针的类型修改为 **PLANNAR** 时，开发者需要配置 **Source Camera** 属性以决定使用哪个相机作为反射探针的相机。

通过 **场景编辑器** 内的 Gizmo，可以调整 **Size** 属性，以此来修改反射探针的范围。

![edit](reflection-probe/edit-area-box.gif)

## 美术工作流

反射探针支持的两种美术工作流可参考 [反射探针美术工作流](./reflection-art-workflow.md) 和 [基于图像的光照示例](example.md)。
