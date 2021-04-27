# 光照贴图

<<<<<<< HEAD
> 注意：Creator 3.0.0 版本的光照贴图功能，暂不支持 Apple M1（Silicon）架构的设备，该问题计划于 3.1 版本修复。

在光源固定的场景，使用光照贴图，可以减少实时光源的运算，从而提高场景运行效率。

光照贴图需要预先通过 **烘焙** 生成。

## 生成光照贴图

1. 在 **层级管理器** 中，选择 **光源组件**。在该组件的 **属性检查器** 中，勾选 **StaticSettings -> Bakeable** 选项（目前只支持一个主方向光源）。

    ![enable lightbake](./img/lightmap_bakeable.png)

	| 参数 | 说明 |
	| :--- | :--- |
	| EditorOnly | 是否只在编辑器中生效 |
	| Bakeable | 是否烘焙静态光照 |
	| CastShadow | 是否投射静态阴影 |

2. 设置 [MeshRenderer 组件](./../../engine/renderable/model-component.md) 的 **LightmapSettings** 光照图属性。
	
	![model lighting map settings](./img/lightmap_model_settings.png)
	
	| 参数 | 说明 |
	| :--- | :--- |
	| Bakeable | 是否烘焙静态光照 |
	| CastShadow | 是否投射静态阴影 |
	| RecieveShadow | 是否接受静态阴影 |
	| LightMapSize | 光照图尺寸 |

3. 点击编辑器上方菜单栏的 **项目 -> 光照贴图**，设置好对应参数后，可点击 **生成光照贴图** 按钮，并选择对应存储文件夹（需要设置在 `/assets` 目录下），即可 **烘焙** 生成光照贴图。

    ![create lightmap asset](./img/lightmap_generate.png)

4. 生成后可在 **光照贴图** 面板中的 **Baked** 页面查看。

    ![bake result](./img/lightmap_result.png)

	- **烘焙结果**：显示烘焙后的光照贴图。
	- **清空光照贴图**：点击按钮可删除生成的光照贴图。
	- **信息输出面板**：显示每张光照贴图的信息（文件名、大小等）。


    > **美术人员须知**：模型在开启 lightmap 前，需要包含两套 uv，第二套 uv 用来 access lightmap，同时材质也需要勾选 lightmap 选项才能应用模型烘焙后的阴影信息。

## 参数说明

烘焙生成光照贴图过程中，将根据面板设置的各参数，计算并生成结果。

![bake result](./img/lightmap_param.png)
=======
> **注意**：光照贴图功能目前暂不支持 Apple M1（Silicon）架构的设备，预计在 v3.1 支持。

光照贴图是由 **烘焙系统** 通过计算场景中所有光源对模型的影响而生成的。在光源固定的场景中，使用光照贴图代替实时的光照计算，可以减少资源消耗，从而提高场景运行效率。

## 光照贴图面板

点击编辑器菜单栏的 **项目 -> 光照贴图**，打开光照贴图面板。面板由 **Scene** 和 **Baked** 两个页面组成

![bake result](./img/lightmap_param.png)

- **Scene**：主要用于配置生成光照贴图相关的参数。
- **Baked**：主要用于展示生成的光照贴图及其相关信息。

具体内容请查看下方 **生成光照贴图** 部分的内容。

### 属性说明

**Scene** 页面各参数的说明如下：
>>>>>>> 2004e340c21932b01836f0038ba5934e90fe4ad1

| 参数 | 说明 |
| :--- | :--- |
| MSAA | 多重采样，可选值包括：1、2、4、8 |
<<<<<<< HEAD
| Resolution | 烘焙贴图尺寸，可选值包括：128、256、512、1024、2048 |
=======
| Resolution | 生成的光照贴图的分辨率，可选值包括：128、256、512、1024、2048 |
>>>>>>> 2004e340c21932b01836f0038ba5934e90fe4ad1
| Gamma | Gamma 矫正值 |
| GIScale | 全局光照缩放系数 |
| GISamples | 全局光照采样系数 |
| AOLevel | AO（Ambient Occlusion，环境光遮蔽）级别 |
| AOStrength | AO 强度 |
| AORadius | AO 半径 |
| AOColor | AO 颜色 |
<<<<<<< HEAD
=======

## 生成光照贴图

1. 在 **层级管理器** 中选中光源节点（带有光源组件的节点），然后在 **属性检查器** 中设置光源组件的 **StaticSettings**，勾选 `Bakeable` 属性（目前不支持同时使用多个 [主方向光](./dir-light.md)）。

    ![enable lightbake](./img/lightmap_bakeable.png)

    - **EditorOnly**：是否只在编辑器中生效

    - **Bakeable**：是否烘焙静态光照

    - **CastShadow**：是否投射静态阴影

2. 在 **层级管理器** 中选中要生成光照贴图的模型节点（带有 [MeshRenderer 组件](./../../../engine/renderable/model-component.md)），然后在 **属性检查器** 中设置 **LightmapSettings**，勾选 `Bakeable` 属性。
	
    ![model lighting map settings](./img/lightmap_model_settings.png)
	
    - **Bakeable**：是否烘焙静态光照
  
    - **CastShadow**：是否投射静态阴影
  
    - **RecieveShadow**：是否接受静态阴影
  
    - **LightMapSize**：模型光照贴图尺寸

    > **注意**：要生成光照贴图的模型有以下两点要求：
    > 
    > 1. 美术人员在制作模型资源时，除了模型本身的 UV，还需要另外包含一套 UV，用于光照贴图。
    >
    > 2. 模型的 Materials 需要开启 **USE LIGHTMAP** 渲染选项，例如：
    > 
    >    ![materials use lightmap](./img/lightmap_materials_use.png)

3. 打开 **光照贴图** 面板，并设置好对应参数。然后点击 **生成光照贴图** 按钮，会弹出一个文件存储对话框，需要指定一个文件夹（必须在 `assets` 目录下）用于存放生成的光照贴图数据信息。
   
    ![bake param](./img/lightmap_param.png)
   
    即可看到在 **光照贴图** 面板下方输出了烘焙进度的日志信息。

	![](./img/lightmap_generate_log.png)

4. 烘焙结束后可在 **光照贴图** 面板的 **Baked** 页面查看生成的光照贴图，以及文件名、尺寸等相关信息。生成的光照贴图引擎会自动处理使用，无需开发者手动操作。

    ![bake result](./img/lightmap_result.png)

    1. **烘焙结果**，显示烘焙后生成的光照贴图。
    2. **清空光照贴图**，用于删除生成的光照贴图及相关信息。
    3. **信息输出面板**，显示生成的光照贴图的文件名、大小等相关信息。
>>>>>>> 2004e340c21932b01836f0038ba5934e90fe4ad1
