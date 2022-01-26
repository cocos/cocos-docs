# 内置着色器片段

 引擎内部提供了大量的内置着色器片段以供不同的着色器使用。

 若要对内部着色器进行修改或查看， 可查看 **资源管理器->internal->chunks**：

## 内置着色器片段说明

 |名称| 说明|
|:--|:--|
|aces.chunk||
|alpha-test.chunk| 半透明测试的帮助方法 |
|anti-aliasing.chunk| 抗锯齿 |
|cc-diffusemap.chunk| 漫反射贴图|
|cc-environment.chunk| 环境光贴图|
|cc-fog-base.chunk| 雾效相关的着色器片段 |
|cc-fog-fs.chunk| 雾效片元着色器|
|cc-fog-vs.chunk| 雾效顶点着色器|
|cc-forward-light.chunk| 前向渲染的光源定义相关|
|cc-global.chunk| 内置全局变量包括 `cc_matView`、`cc_cameraPos`等等|
|cc-local-batch.chunk||
|cc-local.chunk||
|cc-shadow-map-base.chunk||
|cc-shadow-map-fs.chunk||
|cc-shadow-map-vs.chunk||
|cc-shadow.chunk||
|cc-skinning.chunk||
|cc-sprite-common.chunk||
|cc-sprite-fs-gpu.chunk||
|cc-sprite-texture.chunk||
|cc-sprite-vs-gpu.chunk||
|cc-world-bound.chunk||
|common.chunk||
|decode-base.chunk||
|decode-standard.chunk||
|decode.chunk||
|deprecated.chunk||
|embedded-alpha.chunk||
|embedded-alpha.met||
|fxaa.chunk| FXAA抗锯齿算法|
|gamma.chunk||
|general-vs.chunk||
|input-standard.chunk||
|input.chunk||
|lighting.chunk||
|lightingmap-fs.chunk||
|lightingmap-vs.chunk||
|morph.chunk||
|outline-fs.chunk||
|outline-vs.chunk||
|output-standard.chunk||
|output.chunk||
|packing.chunk||
|particle-common.chunk||
|particle-trail.chunk||
|particle-vs-gpu.chunk||
|particle-vs-legacy.chunk||
|rect-area-light.chunk||
|shading-cluster-additive.chunk||
|shading-standard-additive.chunk||
|shading-standard-base.chunk||
|shading-standard.chunk||
|shading-toon.chunk||
|skinning-dqs.chunk||
|skinning-lbs.chunk||
|standard-surface-entry.chunk||
|texture-lod.chunk||
|transform.chunk||
|unpack.chunk||
