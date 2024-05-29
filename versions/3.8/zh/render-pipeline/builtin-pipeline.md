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

<img src="./image/DeferredPipeline.png" width=760 height=350></img>

内置的延迟渲染管线主要包括 **ShadowFlow** 和 **MainFlow** 两个过程：
1. **ShadowFlow** 与前向渲染一致，用于预先进行阴影贴图的绘制。

2. **MainFlow** 包含了 **GBufferStage**、**LightingStage**、**BloomStage** 和 **PostProcessStage** 四个阶段：  
    - **GbufferStage** 会对场景中的非透明物体进行绘制；
    - 然后 **LightingStage** 会对输出到 **GBuffer** 中的非透明物体信息进行基于屏幕空间的光照计算，再绘制半透明物体。如果有非透明物体并且设备支持 ComputeShader，还可以进行 SSPR(Screen Space Planar Reflection) 的资源收集与绘制；
    - 若还开启了 Bloom 效果，**BloomStage** 会对已经经过 **LightingStage** 处理后的图像进行 Bloom 后处理；
    - 最后 **PostProcessStage** 会把 **BloomStage**/**LightingStage** 输出的全屏图像绘制到主屏幕中，再进行 UI 的绘制。

开启 Bloom 有以下两种方式：

1. 点击 Creator 顶部菜单栏中的 **项目 -> 项目设置 -> Macro Configurations**，然后勾选 **ENABLE_BLOOM** 即可开启：

    <img src="./image/BloomEnable.png" width=760 height=510></img>

2. 通过代码开启，示例如下：

```js
@ccclass('BloomSwitch')
export class BloomSwitch extends Component {
    bloomEnabled: boolean = false;

    setupPipeline() {
        (director.root?.pipeline as DeferredPipeline).bloomEnabled = this.bloomEnabled;
    }

    switchEnable (toggle: Toggle) {
        if (toggle.isChecked !== this.bloomEnabled) {
            this.bloomEnabled = toggle.isChecked;
            this.setupPipeline();
        }
    }
}
```

延迟渲染管线依赖 GPU 的 **Multiple Render Targets** 特性用于绘制 **GBuffer**，目前大部分移动平台应该都支持。WebGL1.0 环境下可以使用 **WEBGL_draw_buffers** 扩展支持，不过部分 WebGL1.0 平台可能不支持该扩展，那么就不能使用延迟渲染管线。

另外延迟渲染管线对于 **卡通材质** 无法正常进行绘制，比如引擎内置的 `builtin-toon` 材质。

引擎内置的渲染管线后续也会不断优化性能，并添加新的特性，为开发者提供更加多元和丰富的渲染特性。
