# FBX材质管道

FBX材质管道用于将DCC使用的材质和纹理中导入到cocos引擎中，引擎的导入器会自动导入创建材质以及纹理， 
若不需要可以在导入时，禁用该选项，支持3ds max， maya ，blender ，c4d的基本材质自动导入。
* 引擎当前支持以下材质:

|         | Phong               | PBR               |
|---------|---------------------|-------------------|
| 3ds max | Standard(legacy)    | Physical Material |
| Blender | None                | Principled BSDF   |
| C4D     | Standard            | None              |
| Maya    | Lambert/Blinn/Phong | Standard Surface  |

* **若要使用fbx材质的自动导入功能需要在Cocos Engine启用材质智能导入功能。**
  * 在cocos creator菜单下点击偏好设置。
  * 在Preferences面板中， 选择Laboratory选项， 勾选 Smart Material Conversion。
  * 选择Assets文件夹中的任一fbx文件，在inspector面板中启用或者禁用smart material conversion。
  * 设置过程如下图所示:
* ![img_6.png](enable-smart-conversion.png)
---
## FBX材质导入支持说明
### 1. Autodesk 3ds Max
>支持以下材质类型:
  - Standard（Legacy）
  - Physical Material(建议使用)
  - multi/SubObject
------------------------------------------------
>对于Standard材质，引擎支持以下纹理贴图的自动导入:
  - Diffuse Color
  - Specular Color 
  - Glossiness 
  - Opacity 
  - Bump
------------------------------------------------
>对于Physical Material，引擎支持以下纹理贴图的自动导入:
  - Base Color Map
  - Roughness Map 
  - Metalness Map 
  - Bump
  - Opacity
 ----------------------------------------------
>对于multi/SubObject，multi/SubObject的子材质类型只能是Standard或者Physical material，不可以是multi/SubObject，否则，导入后部分材质会丢失。
---
>纹理导入简化要求:在导出fbx前，除Bump Map可以用Normal Bump节点矫正外，请确保证材质右侧输入的纹理节点均为Bitmap节点。
关于如何将简化纹理简化为只剩Bitmap节点，您可以参考[Convert a Procedural texture into a bitmap image texture in 3ds Max](https://knowledge.autodesk.com/support/3ds-max/learn-explore/caas/sfdcarticles/sfdcarticles/How-to-convert-a-Procedural-texture-into-a-bitmap-image-texture-in-3ds-Max-for-fbx-export.html)

| 简化前                 | 简化后                     |
|---------------------|-------------------------|
| ![img.png](img.png) | ![img_1.png](img_1.png) |

说明:对于max physical material材质， 需要再max viewport中开启High Quality才可能获取相对准却的预览效果。为了获取最佳的配对效果，您可以配对max和引擎的渲染环境。
* 关于max viewport渲染更多设置内容，您可参考[教程](https://www.youtube.com/watch?v=82hhg8Q1nus&list=PL9xXzsdQ6pbZGBnVSKMBO_BCYjzmFTj0R&index=2)
* 关于cocos 渲染环境配置详细内容，您可参考[Cocos官方文档](https://docs.cocos.com/creator/manual/zh/module-map/graphics.html)

 ----------------------------------------------

### 2. Autodesk Maya
> 支持以下材质类型:
- Lambert、Blinn、Phong、Phong-E
- Standard Surface (建议使用)
 ---
> 对于Lambert，Blinn，Phong引擎支持以下纹理自动导入:
- Color
- Normal
- Transparency
- SpecularColor
- Cosine Power
 ---
> 对于Standard Surface引擎支持以下纹理通道的自动导入:
-  Base Color
-  Specular Roughness 
-  Metalness
-  Normal 
-  Alpha
---
>纹理导入: 在导出FBX之前，除Normal Map可以用bump2d节点矫正外，确保有贴图输入通道的输入户节点类型均为File纹理节点。
关于如何将简化纹理简化为只剩File Texture节点，您可以参考[Convert a texture or shading network to a File Texture in maya](https://knowledge.autodesk.com/support/maya/learn-explore/caas/CloudHelp/cloudhelp/2016/ENU/Maya/files/GUID-0F504570-CB7A-49D3-A7A2-83438C353A9C-htm.html)


| 简化前                     | 简化后                     |
|-------------------------|-------------------------|
| ![img_2.png](img_2.png) | ![img_3.png](img_3.png) |

> Maya standard 材质导入引擎效果对比:

| maya viewport              | cocos viewport               |
|----------------------------|------------------------------|
| ![maya](maya-viewport.png) | ![cocos](cocos-viewport.png) |

您可以参考以下工程文件设置maya standard surface确保导入器可以准确的导入贴图设置。
[Maya Car Demo](maya_car.zip)

说明:使用maya viewport预览时半透明材质时，建议开启depth peeling和alpha cut prepass以获取正准确的预览效果。
为了获取最佳的配对效果，您可以配对maya和引擎的渲染环境。
* 关于maya viewport渲染设置更多内容，您可参考[Maya官方文档](https://help.autodesk.com/view/MAYAUL/2022/ENU/index.html?contextId=Viewport20RendererDisplay)
* 关于cocos 渲染环境配置详细内容，您可参考[Cocos官方文档](https://docs.cocos.com/creator/manual/zh/module-map/graphics.html)

> 
---


### 3. Cinema 4D
>支持以下材质类型:
   - Standard material
>导出要求:C4D导出FBX前，若一个模型有多个材质需要保证UV集的面和材质有唯一的对应关系。
- [Example](https://github.com/cocos-creator/3d-tasks/issues/11267)
---
### 4. Blender
   支持以下材质类型:
   ● Principled bsdf
   导入要求:
   在导出FBX之前，除Normal Map可以用NormalMap节点矫正外，确保材质的其它贴图输入通道均为File纹理节点。
关于如何将简化纹理简化为只剩Bitmap节点，您可以参考[Baking Procedural Materials to Image Textures in Blender](https://www.youtube.com/watch?v=AB24ITZHtuE)

| 简化前                     | 简化后                     |
|-------------------------|-------------------------|
| ![img_4.png](img_4.png) | ![img_5.png](img_5.png) |


支持以下纹理:
Base Color， Roughness， Metallic， Normal， Alpha

---
