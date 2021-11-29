# 天空盒

游戏中的天空盒是一个包裹整个场景的立方体，可以很好地渲染并展示整个场景环境，在基于 PBR 的工作流中天空盒也可以贡献非常重要的 IBL 环境光照。

![skybox](skybox/Skybox.png)

## 开启天空盒

在 **层级管理器** 中选中 **Scene**，然后在 **属性检查器** 的 **skybox** 组件中勾选 **Enabled** 属性即可开启天空盒。

![开启 skybox](skybox/enable-skybox.png)

skybox 组件属性如下：

| 属性 | 说明 |
| :---| :--- |
| **Enabled** | 是否开启天空盒 |
| **UseIBL** | 是否使用环境光照 |
| **UseHDR** | 在HDR和LDR之间切换 |
| **Envmap** | 环境贴图，TextureCube 类型，具体设置方法可参考下文介绍。<br>当该属性为空时，天空盒默认使用和显示的是像素贴图 |

## 设置天空盒的环境贴图

开启天空盒之后还需要设置天空盒的环境贴图。天空盒的环境贴图资源可以是 TextureCube 类型的单张贴图，或者是由六张 texture 类型的贴图组合而成的 CubeMap（立方体贴图）。所以开发者可通过以下两种方式来设置天空盒的环境贴图。

### 通过设置 TextureCube 类型的贴图资源

1. 导入贴图资源，直接将图片资源拖拽到 **资源管理器** 面板即可。

2. 选中导入的贴图资源，在右侧的 **属性检查器** 面板中将 **Type** 属性设置为 **texture cube**，然后点击右上角的绿色打钩按钮保存设置。

    ![设置为 TextureCube](skybox/texturecube.png)

3. 在 **层级管理器** 中选中 **Scene**，然后将设置好的图片资源拖拽到 **属性检查器** 中 **skybox** 组件的 **Envmap** 属性框中：

    ![设置天空盒的环境贴图](skybox/set-envmap.png)

这样子天空盒就设置完成了，开发者可以在 **场景编辑器** 中看到设置后的天空盒的环境贴图。若贴图没有正确显示，需要检查 **SkyIllumination 参数** 的值是否太低，或者 **修改 Camera 的 Clear Flag**。

#### SkyIllumination 参数

在 **层级管理器** 中选中 **Scene**，然后在 **属性检查器** 的 **ambient** 组件中即可看到 SkyIllumination 参数，默认值为 20000。

若 SkyIllumination 参数值设置 **太低** 可能会导致天空盒的环境贴图无法在 **场景编辑器** 中正确显示。一般情况下：

- 当 SkyIllumination 参数值小于 300 时，天空盒的环境贴图便无法正常显示。

- 当 SkyIllumination 参数值为 5000 时，效果相当于月夜的光照强度。

#### 修改 Camera 的 Clear Flag

若 **场景编辑器** 中天空盒的环境贴图已经可以正确显示，但是在项目运行之后仍然没有生效，此时就需要修改 Camera 组件的 **ClearFlag** 为 **SKYBOX**：

![](skybox/skybox-camera.png)

### 制作 CubeMap（立方体贴图）

可手动通过六张普通贴图生成一张立方体贴图，操作步骤如下：

1. 在 **资源管理器** 中将准备好的六张贴图资源全部选中，然后在 **属性检查器** 中将这些贴图资源的 **Type** 属性批量设置为 **texture**，并点击右上角的绿色打钩按钮。

   ![](skybox/cubemap-texture-type.png)

2. 新建 CubeMap 资源。在 **资源管理器** 中选中要存放 CubeMap 的文件夹，点击左上角的 **+** 按钮，然后选择 **Cubemap** 即可。或者也可以右键点击要存放 CubeMap 的文件夹，选择 **新建 -> Cubemap**。

    ![create Cubemap](skybox/create-cubemap.png)

3. 将刚才设置为 texture 类型的 6 张贴图拖拽到 CubeMap 对应的属性框中，完成后点击右上方的绿色打钩按钮，这样就完成了一张 CubeMap。

    ![Set CubeMap](skybox/cubemap-properties.png)

    **注意**：
    - CubeMap 中未设置贴图的属性框将使用默认资源进行填充。
    - CubeMap 中的 6 个属性框 **不要使用同一张贴图**，否则会导致某些平台无法正常显示。

### 设置 CubeMap（立方体贴图）

如果要使用 CubeMap（立方体贴图）作为天空盒的环境贴图，需要将 CubeMap 拖拽到 skybox 组件的 **Envmap** 属性框中。

注意，更换立方体贴图后会自动计算环境光照信息，ambient面板及漫反射卷积图的数据会随之改变。

支持的格式如下：
1. Cube Cross

2. Spherical经纬度图（png或hdr）

3. 手动创建的Cubemap

    ![CubeMap](skybox/cubemap-show.png)

## 使用IBL

可通过Use IBL选项来对场景中的物体开启或禁用天空盒产生的环境照明。

禁用IBL的情况下只能使用半球光方式的漫反射照明，允许此选项可以开启场景物体的镜面反射照明和高级的漫反射照明。

### 高级漫反射照明

当环境贴图更改时，会自动计算对应的漫反射光照（仅支持图片格式的CubeMap，不支持手动制作的CubeMap）

支持两种方式的环境漫反射照明：
1. 半球光：即 **Ambient** 面板中的 **SkyLightingColor** 和 **GroundAlbedoColor** ，该方式渲染性能更高，但是细节度不够，照明方向性差。 **可手动调节，但可能会和环境贴图变得不统一** 。

2. 卷积图：它可以正确表达环境贴图产生的漫反射照明，有较好的照明方向性和细节。更高级的方式，但不允许手动编辑，只能通过自动生成来进行，

**需要开启Use IBL才会出现Apply DiffuseMap选项**。

通过 **Apply DiffuseMap** 选项可在两种照明方式之间选择。
    ![DiffuseMap](skybox/diffusemap-prop.png)

以下是对比图

半球光：
    ![DiffuseMap](skybox/hemisphere-lighting.png)
卷积图：
    ![DiffuseMap](skybox/diffusemap.png)

## 切换HDR和LDR模式

High Dynamic Range（HDR）表示高动态范围，配合光源的光度学强度和相机的曝光参数可以实现更真实的明暗对比层次。相反Low Dynamic Range（LDR）表示低动态范围。勾选UseHDR复选框可以在HDR和LDR之间切换。

- 若选中HDR模式，则所有的光源（包括平行光、点光源、聚光灯等）的 **强度会变成光度学物理单位** ，环境光立方体贴图应使用 **hdr格式的图片** 以提供高动态范围的数据源。

- 若选中LDR模式，则 **光源强度会变成无单位** ，不再与光度学和相机曝光有任何联系，此模式适用于希望无任何色染的体现原贴图颜色的情景，环境光立方体贴图可使用 **png等格式的图片** 。
