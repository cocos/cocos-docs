# Surface Shader 可替换的内置函数

Surface Shader 统一了着色流程，同时向用户提供了大量的自定义函数，大家可以根据自己的需求，利用宏机制，重写相关函数。

## 1、原理

Surface Shader 提供的自定义函数，在内部都有一个默认版本，并且在适合的时候被调用。可以参考 [Surface Shader 执行流程](./shader-code-flow.md)了解详情。

这些函数通常以 `Surfaces+Shader类型名+Modify+属性` 方式全名，比如：
- SurfacesVertexModifyLocalPos
- SurfacesVertexModifyLocalNormal
- SurfacesVertexModifyLocalTangent

所有函数可以在 [`internal/chunks/surfaces/default-functions/`](https://github.com/cocos/cocos-engine/tree/v3.7.0/editor/assets/chunks/surfaces/default-functions) 中查看。

**如果你想替换某函数的实现，可以通过预定义该函数对应的宏来完成**。

比如，可以预先定义 `CC_SURFACES_VERTEX_MODIFY_WORLD_POS` 宏，让 Surface Shader 使用你定义的函数来计算世界坐标，示例代码如下：

```glsl
#define CC_SURFACES_VERTEX_MODIFY_WORLD_POS
vec3 SurfacesVertexModifyWorldPos(in SurfacesStandardVertexIntermediate In)
{
  vec3 worldPos = In.worldPos;
  worldPos.x += sin(cc_time.x * worldPos.z);
  worldPos.y += cos(cc_time.x * worldPos.z);
  return worldPos;
}
```

如果对 Surface Shader 中的函数替换机制不熟悉，可以先参考 [使用宏定义实现函数替换](./function-replace.md)。

> 用这种方式的好处是可以方便地扩展多种不同的材质数据结构、光照模型和渲染用途，并且不用对内置的 Surface Shader 流程进行修改。

## 2、VS 对应的常用函数列表

可用宏替换的 VS 内置函数定义在：internal/chunks/surfaces/default-functions/common-vs.chunk 文件中。

在 VS 中的内置函数参数均为 `SurfacesStandardVertexIntermediate` 结构体，存放的是 VS 输入输出的数据。用户无需关心具体的顶点输入输出流程处理，只需要聚焦到某个数据的修改即可。

| 预先定义宏                                  | 对应的函数定义                           | 对应的材质模型 | 功能说明                                                     |
| ------------------------------------------- | ---------------------------------------- | -------------- | ------------------------------------------------------------ |
| CC_SURFACES_VERTEX_MODIFY_LOCAL_POS         | vec3 SurfacesVertexModifyLocalPos        | Common         | 返回修改后的模型空间坐标                                     |
| CC_SURFACES_VERTEX_MODIFY_LOCAL_NORMAL      | vec3 SurfacesVertexModifyLocalNormal     | Common         | 返回修改后的模型空间法线                                     |
| CC_SURFACES_VERTEX_MODIFY_LOCAL_TANGENT     | vec4 SurfacesVertexModifyLocalTangent    | Common         | 返回修改后的模型空间切线和镜像法线标记                       |
| CC_SURFACES_VERTEX_MODIFY_LOCAL_SHARED_DATA | void SurfacesVertexModifyLocalSharedData | Common         | 如果某些贴图和计算需要在多个材质节点中使用，可在此函数中进行，在世界变换前调用，直接修改 SurfaceStandardVertexIntermediate 结构体内的三个Local参数 |
| CC_SURFACES_VERTEX_MODIFY_WORLD_POS         | vec3 SurfacesVertexModifyWorldPos        | Common         | 返回修改后的世界空间坐标（世界空间动画）                     |
| CC_SURFACES_VERTEX_MODIFY_CLIP_POS          | vec4 SurfacesVertexModifyClipPos         | Common         | 返回修改后的剪裁（NDC）空间坐标（通常用于修改深度）          |
| CC_SURFACES_VERTEX_MODIFY_UV                | void SurfacesVertexModifyUV              | Common         | 修改结构体内的 UV0 和 UV1 （使用 tiling 等）                 |
| CC_SURFACES_VERTEX_MODIFY_WORLD_NORMAL      | vec3 SurfacesVertexModifyWorldNormal     | Common         | 返回修改后的世界空间法线（世界空间动画）                     |
| CC_SURFACES_VERTEX_MODIFY_ SHARED_DATA      | void SurfacesVertexModify SharedData     | Common         | 如果某些贴图和计算需要在多个材质节点中使用，可在此函数中进行，直接修改 SurfaceStandardVertexIntermediate 结构体内的参数，减少性能耗费 |

## 3、FS 对应的常用函数列表

FS 由 PBR 和 Toon 两个部分组成，分别在下面两个文件中：
- internal/chunks/surfaces/default-functions/standard-fs.chunk
- internal/chunks/surfaces/default-functions/toon-vs.chunk

FS 中的函数，大部分为无参函数，用户需要结合 [FS 输入值](./fs-input.md) 来做处理。对于一些特殊用途的函数，也提供了对应的参数。具体属于哪种情况请参考函数定义。

| 预先定义宏                                              | 对应的函数定义                                       | 对应的材质模型 | 功能说明                                                     |
| ------------------------------------------------------- | ---------------------------------------------------- | -------------- | ------------------------------------------------------------ |
| CC_SURFACES_FRAGMENT_MODIFY_ BASECOLOR_AND_TRANSPARENCY | vec4 SurfacesFragmentModify BaseColorAndTransparency | Common         | 返回修改后的基础色（rgb 通道）和透明值（a 通道）             |
| CC_SURFACES_FRAGMENT_ALPHA_CLIP_ONLY                    | vec4 SurfacesFragmentModify AlphaClipOnly            | Common         | 不需要获取颜色仅处理透贴的Pass中使用。如渲染到阴影图等，不重载此函数可能导致阴影没有透贴效果 |
| CC_SURFACES_FRAGMENT_MODIFY_ WORLD_NORMAL               | vec3 SurfacesFragmentModify WorldNormal              | Common         | 返回修改后的像素法线（通常是法线贴图）                       |
| CC_SURFACES_FRAGMENT_MODIFY_ SHARED_DATA                | void SurfacesFragmentModify SharedData               | Common         | 若某些贴图和计算需要在多个材质节点中使用，可在此函数中进行，直接修改 Surface 结构体内的参数，减少性能耗费，类似legacy shader中的surf()函数。**需要在定义函数前 include 必要的头文件** |
| CC_SURFACES_FRAGMENT_MODIFY_ WORLD_TANGENT_AND_BINORMAL | void SurfacesFragmentModify WorldTangentAndBinormal  | Standard PBR   | 修改 Surface 结构体内的世界切空间向量                        |
| CC_SURFACES_FRAGMENT_MODIFY_ EMISSIVE                   | vec3 SurfacesFragmentModify Emissive                 | Standard PBR   | 返回修改后的自发光颜色                                       |
| CC_SURFACES_FRAGMENT_MODIFY_ PBRPARAMS                  | vec4 SurfacesFragmentModify PBRParams                | Standard PBR   | 返回修改后的 PBR 参数（ao, roughness, metallic, specularIntensity） |
| CC_SURFACES_FRAGMENT_MODIFY_ ANISOTROPY_PARAMS          | vec4 SurfacesFragmentModify AnisotropyParams         | Standard PBR   | 返回修改后的各向异性参数（rotation, shape, unused, unused）  |
| CC_SURFACES_FRAGMENT_MODIFY_ BASECOLOR_AND_TOONSHADE    | void SurfacesFragmentModify BaseColorAndToonShade    | Toon           | 修改卡通渲染基础色                                           |
| CC_SURFACES_FRAGMENT_MODIFY_ TOON_STEP_AND_FEATHER      | vec4 SurfacesFragmentModify ToonStepAndFeather       | Toon           | 返回修改后的参数                                             |
| CC_SURFACES_FRAGMENT_MODIFY_ TOON_SHADOW_COVER          | vec4 SurfacesFragmentModify ToonShadowCover          | Toon           | 返回修改后的参数                                             |
| CC_SURFACES_FRAGMENT_MODIFY_ TOON_SPECULAR              | vec4 SurfacesFragmentModify ToonSpecular             | Toon           | 返回修改后的参数                                             |
| CC_SURFACES_LIGHTING_MODIFY_FINAL_RESULT                | void SurfacesLightingModifyFinalResult               | Common         | 自定义光照模型，可以在之前计算的光照结果上再次修改，比如添加轮廓光等。**需要在定义函数前 include 必要的头文件** |
