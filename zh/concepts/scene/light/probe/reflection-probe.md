# 反射探针

自 v3.7 开始，Cocos Creator 支持反射探针。

反射探针是将场景内的间接反射光烘焙在存储介质上，用以提高场景内光照品质的组件。

在 **层级管理器** 或顶部菜单上选择 **光源** -> **反射探针** 即可在场景内创建反射探针。

![add-component](reflection-probe/add-reflect-probe.png)

## 属性

![property](reflection-probe/property.png)

| 属性 | 说明 |
| :-- | :-- |
| **Size** | 反射探针的范围，在场景内可以通过操作 Gizmo 来调整反射探针的大小 |
| **Probe Type** | 反射探针的类型 <br> 可选项：**CUBE**/**PLANNAR** <br> ![probe-type](reflection-probe/probe-type.png)|
| **Resolution** | 反射探针烘焙贴图的分辨率 <br> 可选项： **Low_256x256**/**Medium_512x512**/**Hight_768x768** <br> 该选项仅在 **Probe Type** 为 **CUBE** 时生效 <br> ![resolution](reflection-probe/resolution.png)|
| **Background Color** | 背景颜色，仅在 **Probe Type** 为 **PLANNAR** 时生效 |
| **Clear Flag** | 清理标记，可选项为： **SKYBOX**/**SOLID_COLOR** <br> ![clear-flag](reflection-probe/clear-flag.png)|
| **Visibility** | 可见性，用于决定哪些层级可以被烘焙到贴图上，通过下拉菜单选择 <br> ![visibility](reflection-probe/visibility.png)|
| **Source Camera** | 用于烘焙反射的相机 <br> 该属性仅在 **Probe Type** 为 **PLANNAR** 时生效 |
| **Bake** | 烘焙按钮，点击后即可以对反射探针进行烘焙 |

### 类型

![probe-type](reflection-probe/probe-type.png)

Cocos Creator 的反射探针有两种类型，分别为：

- **CUBE**:

    ![cube](reflection-probe/cube.png)

    在反射探针选择为 **CUBE** 时，开发者可以通过下方的 **RESOLUTION** 下拉菜单选择最终烘焙是贴图的大小。

- **PLANNAR**:

    ![plannar](reflection-probe/plannar.png)

    当反射探针的类型修改为 **PLANNAR** 时，可以通过 **Clear Flag** 来修改 **Source Camera** 在烘焙时的清理标记，同时开发者需要配置 **Source Camera** 属性以决定使用哪个相机进行烘焙。

通过 **场景编辑器** 内的 Gizmo，可以调整 **Size** 属性，以此来修改反射探针的范围。

### 分辨率

![resolution](reflection-probe/resolution.png)

### 清除标记

![clear-flag](reflection-probe/clear-flag.png)

### 可见性

![visibility](reflection-probe/visibility.png)

## 美术工作流

- 在场景内创建 **反射探针** 节点

- 将需要烘焙反射的节点的 **Mobility** 属性修改为 **Static**

    ![static](reflection-probe/static.png)

- 在需要烘焙反射的节点的 **属性检查器** 上下拉找到 **Reflection Probe Settings**，并调整其对应的属性：

    ![setting](reflection-probe/mesh-renderer-reflect-probe.png)

    - **Reflection Probe**: 选择反射探针的类型
    - **Bake To Reflection Probe**: 勾选是否将该网格渲染器的反射信息烘焙至反射探针相关的贴图

    详情请参考 [MeshRenderer 组件参考](../../../../engine/renderable/model-component.md)

- 烘焙

    - 点击 **属性检查器** 上的 **Bake** 按钮，烘焙当前已选择的反射探针：

        ![bake](reflection-probe/bake.png)

    - 主菜单上选择 **项目** -> **光照烘焙** -> **反射探针**，打开 [反射探针面板](reflection-probe-panel.md)，通过点击面板上的烘焙按钮进行烘焙。

- 检查烘焙结果

    烘焙完成后，**资源管理器** 内会创建以 **reflectionProbe_** 开头为命名的贴图。开发者可查看这些贴图是否满足预期。

更多示例请参考 [探针示例](light-probe-sample.md)。
