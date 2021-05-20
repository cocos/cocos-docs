# 材质资源

## 材质创建

材质创建方式如下：

![material-create](material/material-create.png)

或

![material-create-menu](material/material-create-menu.png)

材质控制着每个模型最终的着色。材质由 [EffectAsset](./effect.md) 构成，Effect 的着色流程由材质操控。材质本身也可以看作是 EffectAsset 资源的容器，材质可以任意切换当前使用的 EffectAsset 资源。下图就是在 **层级管理器** 中创建的材质默认使用的 EffectAsset 资源。

![default-effect](material/default-effect.png)

开发者可以直接点击 **Effect** 属性的下拉框来切换当前材质的 EffectAsset。

![effects](material/effects.png)

## 材质常见定义

材质资源可以看成是 EffectAsset 在场景中的资源实例，它本身的可配置参数包括：
- **effect**： EffectAsset 资源引用，指定使用哪个 EffectAsset 所描述的流程进行渲染。（必备）
- **technique**：指定使用 EffectAsset 中的第几个 technique，默认为第 0 个。
- **pass**：显示 technique 所定义的所有 pass。
- **defines**：宏定义列表，指定开启哪些宏定义，默认全部关闭。
- **states**：管线状态重载列表，指定对渲染管线状态（深度模板透明混合等）有哪些重载，默认与 EffectAsset 声明一致。

代码示例：

```ts
const mat = new Material();
mat.initialize({
  effectName: 'pipeline/skybox',
  defines: {
    USE_RGBE_CUBEMAP: true
  }
});
```

上述代码中的 `effectName` 表示所使用的 EffectAsset 名称，与上方的 **effect** 对应。有了这些信息后，Material 就可以被正确初始化，正确初始化的标志是生成渲染使用的 Pass 对象数组，可用于具体模型的渲染。

根据所使用 EffectAsset 的信息，可以进一步设置每个 Pass 的 uniform 等参数。

```ts
mat.setProperty('cubeMap', someCubeMap);
console.log(mat.getProperty('cubeMap') === someCubeMap); // true
```

这些属性都是在材质资源对象本身内部生效，并不涉及场景。

要将 Material 应用到特定的模型上，需要将其挂载到一个 `RenderableComponent` 上，所有需要设定材质的组件（MeshRenderer、SkinnedMeshRenderer 等）都继承自它。

```ts
const comp = someNode.getComponent(MeshRenderer);
comp.material = mat;
comp.setMaterial(mat, 0); // 与上一行作用相同
```

根据子模型的数量，RenderableComponent 也可以引用多个 Material 资源：

```ts
comp.setMaterial(mat, 1); // 赋给第二个 submodel
```

同一个 Material 也可挂载到任意多个 RenderableComponent 上，一般在编辑器中通过拖拽的方式即可自动赋值。

```ts
const comp2 = someNode2.getComponent(MeshRenderer);
comp2.material = mat; // the same material above
```

而当场景中某个模型的 Material 需要自定义一些属性时，会在从 RenderableComponent 获取 Material 时 **自动做拷贝实例化**，创建对应的 MaterialInstance，从而实现独立的定制。

```ts
const comp2 = someNode2.getComponent(MeshRenderer);
const mat2 = comp2.material; // 拷贝实例化，mat2 是一个 MaterialInstance，接下来对 mat2 的修改只会影响 comp2 的模型
```

Material 与 MaterialInstance 的最大区别在于，MaterialInstance 从一开始就永久地挂载在唯一的 RenderableComponent 上，且只会对这个模型生效，而 Material 则无此限制，所有使用到该材质的对象，都具有相同特性。所以，可以理解为：
- Material 是 **引用**，修改 Material，所有的 RenderableComponent 都会改变。
- MaterialInstance 是 **实例**，修改 MaterialInstance，只有单独的 RenderableComponent 会改变。

对于一个已初始化的材质，如果希望修改最初的基本信息，可以直接再次调用 initialize 函数，重新创建渲染资源。

```ts
mat.initialize({
  effectName: 'builtin-standard',
  technique: 1
});
```

特别地，如果只是希望修改 defines 或 states，引擎提供了更高效的直接设置接口，只需提供相对当前值的重载即可：

```ts
// 针对 defines
mat2.recompileShaders({
  USE_EMISSIVE: true
});
// 针对 states
mat2.overridePipelineStates({
  rasterizerState: {
    cullMode: GFXCullMode.NONE
  }
});
```

**注意**：这些接口只能调用 MaterialInstance 实例，而不能调用 Material 资源。

每帧动态更新 uniform 值是非常常见的需求，在类似这种需要更高效接口的情况下，可以手动调用对应 pass 的接口：

```ts
// 初始化时保存以下变量
const pass = mat2.passes[0];
const hColor = pass.getHandle('albedo');
const color = new Color('#dadada');

// 每帧更新时：
color.a = Math.sin(director.getTotalFrames() * 0.01) * 127 + 127;
pass.setUniform(hColor, color);
```

## Builtins

编辑器内置了几种常见类型的材质，包括无光照的 unlit、基于物理光照的 standard、skybox、粒子、sprite 等。

作为参考，下图是 `builtin-standard` 材质各着色参数的组装流程：

![Standard](./material/standard-material-graph.png)

以下是对应参数和宏定义的完整列表：

| 参数                                                        | 说明                                                                                           |
|:------------------------------------------------------------|:---------------------------------------------------------------------------------------------|
| tilingOffset                                                | 模型 UV 的平铺和偏移量，xy 对应平铺，zw 对应偏移                                                 |
| albedo/mainColor                                            | 漫反射颜色，指定模型的主要基色                                                                  |
| albedoMap/mainTexture                                       | 漫反射贴图，如果有指定，这项会和漫反射颜色相乘                                                   |
| albedoScale                                                 | 模型的漫反射强度，用于控制漫反射颜色对于最终颜色的影响权重                                      |
| alphaThreshold                                              | 启用 alpha test 后的测试阈值。输出的 alpha 值低于此值的像素会被 discard 掉                      |
| normalMap                                                   | 法线贴图，用于增加表面细节                                                                      |
| normalStrenth                                               | 法线贴图强度，控制凹凸质感的强弱                                                                |
| pbrMap<br>**R**（AO）<br>**G**（Roughness）<br>**B**（Metallic）  | PBR 材质参数贴图：环境遮挡、粗糙度和金属度<br>采样结果会和常数项相乘                             |
| metallicRoughnessMap<br>**G**（Roughness）<br>**B**（Metallic） | 独立的粗糙度和金属度贴图<br>采样结果会和常数项相乘                                             |
| occlusionMap                                                | 独立的环境遮挡贴图<br>采样结果会和常数项相乘                                                   |
| occlusion                                                   | 环境遮挡常数                                                                                   |
| roughness                                                   | 粗糙度常数                                                                                     |
| metallic                                                    | 金属度常数                                                                                     |
| emissive                                                    | 自发光颜色，独立于光照计算，由模型本身直接发散出的颜色                                           |
| emissiveMap                                                 | 自发光贴图<br>如果有指定，这项会和自发光颜色相乘，因此需要把自发光颜色（默认是黑色）调高才会有效果 |
| emissiveScale                                               | 自发光强度<br>用于控制自发光颜色对于最终颜色的影响权重                                         |

相对应的，还有控制这些参数的宏定义：

| 宏定义                     | 说明                                                                                |
|:----------------------------|:-----------------------------------------------------------------------------------|
| USE_BATCHING               | 是否启用动态 VB 合并式合批                                                          |
| USE_INSTANCING             | 是否启用动态 instancing                                                             |
| HAS_SECOND_UV              | 是否存在第二套 UV                                                                   |
| ALBEDO_UV                  | 指定采样漫反射贴图使用的 uv，默认为第一套                                            |
| EMISSIVE_UV                | 指定采样自发光贴图使用的 uv，默认为第一套                                            |
| ALPHA_TEST_CHANNEL         | 指定透明测试的测试通道，默认为 A 通道                                                |
| USE_VERTEX_COLOR           | 如果启用，顶点色会与漫反射项相乘                                                     |
| USE_ALPHA_TEST             | 是否开启透明测试（镂空效果）                                                          |
| USE_ALBEDO_MAP             | 是否使用漫反射贴图                                                                  |
| USE_NORMAL_MAP             | 是否使用法线贴图                                                                    |
| USE_PBR_MAP                | 是否使用 PBR 参数三合一贴图（**按 glTF 标准，RGB 通道必须分别对应遮挡、粗糙和金属度**） |
| USE_METALLIC_ROUGHNESS_MAP | 是否使用金属粗糙二合一贴图（**按 glTF 标准，GB 通道必须分别对应粗糙和金属度**）        |
| USE_OCCLUSION_MAP          | 是否使用遮挡贴图（**按 glTF 标准，只会使用 R 通道**）                                  |
| USE_EMISSIVE_MAP           | 是否使用自发光贴图                                                                  |
