# 内置渲染管线

Cocos Creator 3.1 的内置渲染管线包括 **builtin-forward**（前向渲染管线）和 **builtin-deferred**（延迟渲染管线）。渲染管线可通过编辑器主菜单中的 **项目 -> 项目设置 -> 项目数据 -> 渲染管线** 进行设置，设置完成之后 **重启编辑器** 即可生效。

![setting](./image/setting.png)

## 前向渲染管线

引擎默认使用 **前向渲染管线**，前向渲染管线的执行流程如下图所示：

<img src="./image/forward-pipeline.png" width=760 height=296></img>

前向渲染主要包括 **ShadowFlow** 和 **ForwardFlow** 两个阶段：
- **ShadowFlow** 中包含一个 **ShadowStage** 会预先对场景中需要投射阴影的物体进行阴影贴图的绘制。
- **ForwardFlow** 包含一个 **ForwardStage**，会对场景中所有物体按照 **非透明 -> 光照 -> 透明 -> UI** 的顺序依次进行绘制。在计算光照时，每个物体都会与所有光照进行计算确定是否照射到该物体，照射到该物体的光照将会执行绘制并进行光照计算，目前场景中只支持一个平行光，可接受的最大光照数量为 16。

## 延迟渲染管线

目前引擎提供了试验版本的内置 **延迟渲染管线**，对于光照数量比较多的项目可以使用 **延迟渲染管线** 来缓解光照计算的压力。延迟管线的执行流程如下图所示：

<img src="./image/deferred-pipeline.png" width=760 height=296></img>

内置的延迟渲染管线主要包括 **ShadowFlow**、**GBufferFlow** 和 **LightingFlow** 三个阶段：
1. **ShadowFlow** 与前向渲染一致，用于预先进行阴影贴图的绘制。
2. **GBufferFlow** 包含一个 **GBufferStage**，会对场景中的非透明物体进行绘制。
3. **LightingFlow** 包含一个 **LightingStage** 和一个 **PostProcessStage**，其中 **LightingStage** 会先对输出到 **GBuffer** 中的非透明物体信息进行基于屏幕空间的光照计算，再绘制半透明物体。然后 **PostProcessStage** 再把 **LightingStage** 得到的全屏图像绘制到主屏幕中，最后再进行 UI 的绘制。

延迟渲染管线依赖 GPU 的 **Multiple Render Targets** 特性用于绘制 **GBuffer**，目前大部分移动平台应该都支持。WebGL1.0 环境下可以使用 **WEBGL_draw_buffers** 扩展支持，不过部分 WebGL1.0 平台可能不支持该扩展，那么就不能使用延迟管线。

另外延迟渲染管线对于 **无光照的材质** 无法正常进行绘制，比如引擎内置的 `builtin-unlit` 材质。对于自定义的 Standard 材质，需要参照引擎内置的 **builtin-standard.effect**（[GitHub](https://github.com/cocos/cocos-engine/blob/v3.1-release/editor/assets/effects/builtin-standard.effect) | [Gitee](https://gitee.com/mirrors_cocos-creator/engine/blob/v3.1-release/editor/assets/effects/builtin-standard.effect)）为延迟渲染管线增加对应的 deferred pass 声明，如下图所示：

<img src="./image/effect.png" width=760 height=647></img>

对于需要通过动态设置材质 Uniform 来实现材质效果变化需求的，在延迟渲染管线下需要指定对应的 Pass 索引进行更新才能够生效，而不是默认更新索引 0 的 Pass，比如内置的 `builtin-standard` 材质，对应的 `PassIndex` 为 1。

引擎内置的渲染管线后续也会不断优化性能，并添加新的特性，比如后处理阶段、HDR、反射等等，为开发者提供更加多元和丰富的渲染特性。
