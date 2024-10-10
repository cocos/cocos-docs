# 编写渲染管线

项目中为了实现一些特殊效果，或者是精准控制渲染流程以获得最大的性能提升，往往需要对渲染流程进行定制化修改。

Cocos 可定制渲染管线（CRP），使开发者可以在不修改引擎源码的情况下，编写通用跨平台的自定义渲染管线。

这个教程以内置渲染管线（Bultin）为例，展示如何基于 CRP 编写一个自定义渲染管线。

## 创建渲染管线

首先，我们需要创建一个渲染管线的类，继承自`rendering.Pipeline`。

```typescript
import { renderer, rendering } from 'cc';

class BuiltinPipelineBuilder implements rendering.PipelineBuilder {
    windowResize(
        ppl: rendering.BasicPipeline,
        window: renderer.RenderWindow,
        camera: renderer.scene.Camera,
        nativeWidth: number,
        nativeHeight: number,
    ): void {
        // 设置渲染资源
    }
    setup(
        cameras: renderer.scene.Camera[],
        ppl: rendering.BasicPipeline,
    ): void {
        // 设置相机渲染
    }
}
```

其中`windowResize`方法，用于处理窗口大小变化事件，`setup`方法，用于设置相机的渲染。

内置管线的具体实现，在`builtin-pipeline.ts`中。

## 管线注册

用户实现的渲染管线，可以在脚本导入阶段，注册到渲染系统中。

```typescript
import { rendering } from 'cc';

if (rendering) {
    rendering.setCustomPipeline('Builtin', new BuiltinPipelineBuilder());
}
```

## 渲染资源管理

Cocos的可定制渲染管线（CRP）基于`Render Graph`理念，但在资源管理上与以往`Render Graph`有所不同。

对于需要写入的资源，必须在管线中注册。一般在`windowResize`方法中注册渲染资源。

注册时需要提供资源的名字作为唯一标识符，所以不同的资源，不要使用相同名字，以免冲突。

如果有多个相机，可以在资源名字后面加上相机的`Id`，以区分不同相机的资源。

```typescript
class BuiltinPipelineBuilder implements rendering.PipelineBuilder {
    windowResize(
        ppl: rendering.BasicPipeline,
        window: renderer.RenderWindow,
        camera: renderer.scene.Camera,
        nativeWidth: number,
        nativeHeight: number,
    ): void {
        const id = window.renderWindowId;
        const width = nativeWidth;
        const height = nativeHeight;

        ppl.addRenderWindow(
            window.colorName,
            Format.RGBA8, nativeWidth, nativeHeight, window,
            window.depthStencilName);

        ppl.addDepthStencil(
            `SceneDepth${id}`,
            Format.DEPTH_STENCIL, width, height,
            ResourceResidency.MANAGED);
    }
}
```

在一帧里，请不要改变资源的大小、规格，否则会导致渲染错误。

如果重复设置，会以最后一次设置的参数为准。

## 资源驻留与生命周期

在管线中注册的资源，有以下几种资源驻留类型（`ResourceResidency`）：

- `MANAGED` - 管线托管的资源，会在合适的时机自动释放。
- `MEMORYLESS` - 片上资源，不占显存。只能在一个RenderPass中使用，RenderPass结束后自动释放。
- `PERSISTENT` - 管线托管的持久资源，不会被释放，直到管线销毁。一般用于需要跨帧使用的资源。
- `EXTERNAL` - 外部资源，不由管线管理，需要用户自行释放。
- `BACKBUFFER` - 后台缓冲区，不需要用户管理。

对于`MANAGED`类型的资源，管线会在GPU结束使用后释放，所以会延后几帧。

目前引擎针对移动端优化，需要尽量减少`Framebuffer`的创建与销毁，所以不会移动资源的内存位置。未来在桌面端，`MANAGED`会作为过渡（Transient）资源，进行更多内存优化。

## 渲染流程

`setup`方法中，可以设置相机的渲染流程，每帧会被调用一次。

传入的`cameras`参数，是当前渲染的相机列表，已经经过了排序。

传入的`ppl`参数，是当前的渲染管线。

```typescript
class BuiltinPipelineBuilder implements rendering.PipelineBuilder {
    setup(
        cameras: renderer.scene.Camera[],
        ppl: rendering.BasicPipeline,
    ): void {
        for (const camera of cameras) {
            if (!camera.scene || !camera.window) {
                continue;
            }

            this._pipelineEvent.emit(PipelineEventType.RENDER_CAMERA_BEGIN, camera);

            this._buildSimplePipeline(camera, ppl);

            this._pipelineEvent.emit(PipelineEventType.RENDER_CAMERA_END, camera);
        }
    }
}
```

以上就是编写一个渲染管线的基本流程。

## 构建相机的渲染管线

对于不同的相机，可以构建不同的渲染渲染管线，以实现不同的渲染效果。

以下展示了内置管线的简单渲染管线，主要用于编辑器`Gizmos`的渲染。

```typescript
class BuiltinPipelineBuilder implements rendering.PipelineBuilder {
    private _buildSimplePipeline(
        ppl: rendering.BasicPipeline,
        camera: renderer.scene.Camera,
    ): void {
        const width = Math.max(Math.floor(camera.window.width), 1);
        const height = Math.max(Math.floor(camera.window.height), 1);
        const colorName = this._cameraConfigs.colorName;
        const depthStencilName = this._cameraConfigs.depthStencilName;

        const viewport = camera.viewport;  // Reduce C++/TS interop
        this._viewport.left = Math.round(viewport.x * width);
        this._viewport.top = Math.round(viewport.y * height);
        // Here we must use camera.viewport.width instead of camera.viewport.z, which
        // is undefined on native platform. The same as camera.viewport.height.
        this._viewport.width = Math.max(Math.round(viewport.width * width), 1);
        this._viewport.height = Math.max(Math.round(viewport.height * height), 1);

        const clearColor = camera.clearColor;  // Reduce C++/TS interop
        this._clearColor.x = clearColor.x;
        this._clearColor.y = clearColor.y;
        this._clearColor.z = clearColor.z;
        this._clearColor.w = clearColor.w;

        const pass = ppl.addRenderPass(width, height, 'default');

        // bind output render target
        if (forwardNeedClearColor(camera)) {
            pass.addRenderTarget(colorName, LoadOp.CLEAR, StoreOp.STORE, this._clearColor);
        } else {
            pass.addRenderTarget(colorName, LoadOp.LOAD, StoreOp.STORE);
        }

        // bind depth stencil buffer
        if (camera.clearFlag & ClearFlagBit.DEPTH_STENCIL) {
            pass.addDepthStencil(
                depthStencilName,
                LoadOp.CLEAR,
                StoreOp.DISCARD,
                camera.clearDepth,
                camera.clearStencil,
                camera.clearFlag & ClearFlagBit.DEPTH_STENCIL,
            );
        } else {
            pass.addDepthStencil(depthStencilName, LoadOp.LOAD, StoreOp.DISCARD);
        }

        pass.setViewport(this._viewport);

        // The opaque queue is used for Reflection probe preview
        pass.addQueue(QueueHint.OPAQUE)
            .addScene(camera, SceneFlags.OPAQUE);

        // The blend queue is used for UI and Gizmos
        let flags = SceneFlags.BLEND | SceneFlags.UI;
        if (this._cameraConfigs.enableProfiler) {
            flags |= SceneFlags.PROFILER;
            pass.showStatistics = true;
        }
        pass.addQueue(QueueHint.BLEND)
            .addScene(camera, flags);
    }
}
```

## 动态渲染管线

在`setup`方法中，可以根据相机、平台、硬件参数等，动态构建渲染管线。

首先可以在`windowResize`，`setup`函数的最开始，收集当前的环境信息。

内置管线的`setupPipelineConfigs`负责收集平台相关信息。`setupCameraConfigs`函数，用于收集相机相关信息。

```typescript
function setupPipelineConfigs(
    ppl: rendering.BasicPipeline,
    configs: PipelineConfigs,
): void {
    const device = ppl.device;
    // Platform
    configs.isWeb = !sys.isNative;
    configs.isWebGL1 = device.gfxAPI === gfx.API.WEBGL;
    configs.isWebGPU = device.gfxAPI === gfx.API.WEBGPU;
    configs.isMobile = sys.isMobile;

    // Rendering
    configs.isHDR = ppl.pipelineSceneData.isHDR;
    configs.useFloatOutput = ppl.getMacroBool('CC_USE_FLOAT_OUTPUT');
    configs.toneMappingType = ppl.pipelineSceneData.postSettings.toneMappingType;

    // ...
}

function setupCameraConfigs(
    camera: renderer.scene.Camera,
    pipelineConfigs: PipelineConfigs,
    cameraConfigs: CameraConfigs,
): void {
    cameraConfigs.colorName = camera.window.colorName;
    cameraConfigs.depthStencilName = camera.window.depthStencilName;

    cameraConfigs.useFullPipeline = (camera.visibility & (Layers.Enum.DEFAULT)) !== 0;

    setupPostProcessConfigs(pipelineConfigs, cameraConfigs.settings, cameraConfigs);
    // ...
}

class BuiltinPipelineBuilder implements rendering.PipelineBuilder {
    windowResize(
        ppl: rendering.BasicPipeline,
        window: renderer.RenderWindow,
        camera: renderer.scene.Camera,
        nativeWidth: number,
        nativeHeight: number,
    ): void {
        setupPipelineConfigs(ppl, this._configs);
        setupCameraConfigs(camera, this._configs, this._cameraConfigs);

        // 设置渲染资源
        // ...
    }
    setup(cameras: renderer.scene.Camera[], ppl: rendering.BasicPipeline): void {
        for (const camera of cameras) {
            if (!camera.scene || !camera.window) {
                continue;
            }
            // 获取相机信息
            setupCameraConfigs(camera, this._configs, this._cameraConfigs);

            this._pipelineEvent.emit(PipelineEventType.RENDER_CAMERA_BEGIN, camera);

            // 根据相机信息，构建渲染管线
            if (this._cameraConfigs.useFullPipeline) {
                this._buildForwardPipeline(ppl, camera, camera.scene);
            } else {
                this._buildSimplePipeline(ppl, camera);
            }

            this._pipelineEvent.emit(PipelineEventType.RENDER_CAMERA_END, camera);
        }
    }
}
```

然后可以根据这些信息，动态构建渲染管线。

介于平台的多样性以及性能要求，算法的选取与判定会较为复杂。这是新管线主要的适用场景，尽可能简化渲染管线的构建，提高开发效率。

```typescript
private _buildForwardPipeline(
    ppl: rendering.BasicPipeline,
    camera: renderer.scene.Camera,
    scene: renderer.RenderScene,
): void {
    // Init
    const settings = this._cameraConfigs.settings;
    const nativeWidth = Math.max(Math.floor(camera.window.width), 1);
    const nativeHeight = Math.max(Math.floor(camera.window.height), 1);
    const width = this._cameraConfigs.enableShadingScale
        ? Math.max(Math.floor(nativeWidth * this._cameraConfigs.shadingScale), 1)
        : nativeWidth;
    const height = this._cameraConfigs.enableShadingScale
        ? Math.max(Math.floor(nativeHeight * this._cameraConfigs.shadingScale), 1)
        : nativeHeight;
    const id = camera.window.renderWindowId;
    const colorName = this._cameraConfigs.colorName;
    const sceneDepth = this._cameraConfigs.enableShadingScale
        ? `ScaledSceneDepth${id}`
        : `SceneDepth${id}`;
    const radianceName = this._cameraConfigs.enableShadingScale
        ? `ScaledRadiance${id}`
        : `Radiance${id}`;
    const ldrColorName = this._cameraConfigs.enableShadingScale
        ? `ScaledLdrColor${id}`
        : `LdrColor${id}`;
    const mainLight = scene.mainLight;

    // Forward Lighting (Light Culling)
    this.forwardLighting.cullLights(scene, camera.frustum);

    // Main Directional light CSM Shadow Map
    if (this._cameraConfigs.enableMainLightShadowMap) {
        assert(!!mainLight);
        this._addCascadedShadowMapPass(ppl, id, mainLight, camera);
    }

    // Spot light shadow maps (Mobile or MSAA)
    if (this._cameraConfigs.singleForwardRadiancePass) {
        // Currently, only support 1 spot light with shadow map on mobile platform.
        // TODO(zhouzhenglong): Relex this limitation.
        this.forwardLighting.addSpotlightShadowPasses(ppl, camera, this._configs.mobileMaxSpotLightShadowMaps);
    }

    this._tryAddReflectionProbePasses(ppl, id, mainLight, camera.scene);

    // Forward Lighting
    let lastPass: rendering.BasicRenderPassBuilder;
    if (this._cameraConfigs.enablePostProcess) { // Post Process
        // Radiance and DoF
        if (this._cameraConfigs.enableDOF) {
            assert(!!settings.depthOfField.material);
            const dofRadianceName = `DofRadiance${id}`;
            // Disable MSAA, depth stencil cannot be resolved cross-platformly
            this._addForwardRadiancePasses(ppl, id, camera, width, height, mainLight,
                dofRadianceName, sceneDepth, true, StoreOp.STORE);
            this._addDepthOfFieldPasses(ppl, settings, settings.depthOfField.material,
                id, camera, width, height,
                dofRadianceName, sceneDepth, radianceName, ldrColorName);
        } else {
            this._addForwardRadiancePasses(
                ppl, id, camera, width, height, mainLight,
                radianceName, sceneDepth);
        }
        // Bloom
        if (this._cameraConfigs.enableBloom) {
            assert(!!settings.bloom.material);
            this._addKawaseDualFilterBloomPasses(
                ppl, settings, settings.bloom.material,
                id, width, height, radianceName);
        }
        // Tone Mapping and FXAA
        if (this._cameraConfigs.enableFXAA) {
            assert(!!settings.fxaa.material);
            const copyAndTonemapPassNeeded = this._cameraConfigs.enableHDR
                || this._cameraConfigs.enableColorGrading;
            const ldrColorBufferName = copyAndTonemapPassNeeded ? ldrColorName : radianceName;
            // FXAA is applied after tone mapping
            if (copyAndTonemapPassNeeded) {
                this._addCopyAndTonemapPass(ppl, settings, width, height, radianceName, ldrColorBufferName);
            }
            // Apply FXAA
            if (this._cameraConfigs.enableShadingScale) {
                const aaColorName = `AaColor${id}`;
                // Apply FXAA on scaled image
                this._addFxaaPass(ppl, settings.fxaa.material,
                    width, height, ldrColorBufferName, aaColorName);
                // Copy FXAA result to screen
                if (this._cameraConfigs.enableFSR && settings.fsr.material) {
                    // Apply FSR
                    lastPass = this._addFsrPass(ppl, settings, settings.fsr.material,
                        id, width, height, aaColorName,
                        nativeWidth, nativeHeight, colorName);
                } else {
                    // Scale FXAA result to screen
                    lastPass = this._addCopyPass(ppl,
                        nativeWidth, nativeHeight, aaColorName, colorName);
                }
            } else {
                // Image not scaled, output FXAA result to screen directly
                lastPass = this._addFxaaPass(ppl, settings.fxaa.material,
                    nativeWidth, nativeHeight, ldrColorBufferName, colorName);
            }
        } else {
            // No FXAA (Size might be scaled)
            lastPass = this._addTonemapResizeOrSuperResolutionPasses(ppl, settings, id,
                width, height, radianceName, ldrColorName,
                nativeWidth, nativeHeight, colorName);
        }
    } else if (this._cameraConfigs.enableHDR || this._cameraConfigs.enableShadingScale) { // HDR or Scaled LDR
        this._addForwardRadiancePasses(ppl, id, camera,
            width, height, mainLight, radianceName, sceneDepth);
        lastPass = this._addTonemapResizeOrSuperResolutionPasses(ppl, settings, id,
            width, height, radianceName, ldrColorName,
            nativeWidth, nativeHeight, colorName);
    } else { // LDR (Size is not scaled)
        lastPass = this._addForwardRadiancePasses(ppl, id, camera,
            nativeWidth, nativeHeight, mainLight,
            colorName, this._cameraConfigs.depthStencilName);
    }

    // UI size is not scaled, does not have AA
    this._addUIQueue(camera, lastPass);
}
```

## 管线配置

内置管线的配置，由`BuiltinPipelineSettings`组件提供，会保存一个json对象至camera.pipelineSettings。

```typescript
export class BuiltinPipelineSettings extends Component {
    @property
    private readonly _settings: PipelineSettings = makePipelineSettings();

    onEnable(): void {
        fillRequiredPipelineSettings(this._settings);
        const cameraComponent = this.getComponent(Camera)!;
        const camera = cameraComponent.camera;
        camera.pipelineSettings = this._settings;

        if (EDITOR) {
            this._tryEnableEditorPreview();
        }
    }
    onDisable(): void {
        const cameraComponent = this.getComponent(Camera)!;
        const camera = cameraComponent.camera;
        camera.pipelineSettings = null;

        if (EDITOR) {
            this._disableEditorPreview();
        }
    }
}
```

可以根据这个json对象，设置相机的渲染效果。

```typescript
function setupPostProcessConfigs(
    pipelineConfigs: PipelineConfigs,
    settings: PipelineSettings,
    cameraConfigs: CameraConfigs,
) {
    cameraConfigs.enableDOF = pipelineConfigs.supportDepthSample
        && settings.depthOfField.enabled
        && !!settings.depthOfField.material;

    cameraConfigs.enableBloom = settings.bloom.enabled
        && !!settings.bloom.material;

    cameraConfigs.enableColorGrading = settings.colorGrading.enabled
        && !!settings.colorGrading.material
        && !!settings.colorGrading.colorGradingMap;

    cameraConfigs.enableFXAA = settings.fxaa.enabled
        && !!settings.fxaa.material;

    cameraConfigs.enablePostProcess = (cameraConfigs.enableDOF
        || cameraConfigs.enableBloom
        || cameraConfigs.enableColorGrading
        || cameraConfigs.enableFXAA);
}
```

## 添加后处理效果

这里以泛光（Bloom）为例，展示如何添加后处理效果。

```typescript
class BuiltinPipelineBuilder implements rendering.PipelineBuilder {
    windowResize(
        ppl: rendering.BasicPipeline,
        window: renderer.RenderWindow,
        camera: renderer.scene.Camera,
        nativeWidth: number,
        nativeHeight: number,
    ): void {
        //...

        // Bloom (Kawase Dual Filter)
        if (this._cameraConfigs.enableBloom) {
            let bloomWidth = width;
            let bloomHeight = height;
            for (let i = 0; i !== settings.bloom.iterations + 1; ++i) {
                bloomWidth = Math.max(Math.floor(bloomWidth / 2), 1);
                bloomHeight = Math.max(Math.floor(bloomHeight / 2), 1);
                ppl.addRenderTarget(`BloomTex${id}_${i}`, this._cameraConfigs.radianceFormat, bloomWidth, bloomHeight);
            }
        }

        //...
    }

    private _addKawaseDualFilterBloomPasses(
        ppl: rendering.BasicPipeline,
        settings: PipelineSettings,
        bloomMaterial: Material,
        id: number,
        width: number,
        height: number,
        radianceName: string,
    ): void {
        // Based on Kawase Dual Filter Blur. Saves bandwidth on mobile devices.
        // eslint-disable-next-line max-len
        // https://community.arm.com/cfs-file/__key/communityserver-blogs-components-weblogfiles/00-00-00-20-66/siggraph2015_2D00_mmg_2D00_marius_2D00_slides.pdf

        // Size: [prefilter(1/2), downsample(1/4), downsample(1/8), downsample(1/16), ...]
        const iterations = settings.bloom.iterations;
        const sizeCount = iterations + 1;
        this._bloomWidths.length = sizeCount;
        this._bloomHeights.length = sizeCount;
        this._bloomWidths[0] = Math.max(Math.floor(width / 2), 1);
        this._bloomHeights[0] = Math.max(Math.floor(height / 2), 1);
        for (let i = 1; i !== sizeCount; ++i) {
            this._bloomWidths[i] = Math.max(Math.floor(this._bloomWidths[i - 1] / 2), 1);
            this._bloomHeights[i] = Math.max(Math.floor(this._bloomHeights[i - 1] / 2), 1);
        }

        // Bloom texture names
        this._bloomTexNames.length = sizeCount;
        for (let i = 0; i !== sizeCount; ++i) {
            this._bloomTexNames[i] = `BloomTex${id}_${i}`;
        }

        // Setup bloom parameters
        this._bloomParams.x = this._configs.useFloatOutput ? 1 : 0;
        this._bloomParams.x = 0; // unused
        this._bloomParams.z = settings.bloom.threshold;
        this._bloomParams.w = settings.bloom.enableAlphaMask ? 1 : 0;

        // Prefilter pass
        const prefilterPass = ppl.addRenderPass(this._bloomWidths[0], this._bloomHeights[0], 'cc-bloom-prefilter');
        prefilterPass.addRenderTarget(
            this._bloomTexNames[0],
            LoadOp.CLEAR,
            StoreOp.STORE,
            this._clearColorTransparentBlack,
        );
        prefilterPass.addTexture(radianceName, 'inputTexture');
        prefilterPass.setVec4('g_platform', this._configs.platform);
        prefilterPass.setVec4('bloomParams', this._bloomParams);
        prefilterPass
            .addQueue(QueueHint.OPAQUE)
            .addFullscreenQuad(bloomMaterial, 0);

        // Downsample passes
        for (let i = 1; i !== sizeCount; ++i) {
            const downPass = ppl.addRenderPass(this._bloomWidths[i], this._bloomHeights[i], 'cc-bloom-downsample');
            downPass.addRenderTarget(this._bloomTexNames[i], LoadOp.CLEAR, StoreOp.STORE, this._clearColorTransparentBlack);
            downPass.addTexture(this._bloomTexNames[i - 1], 'bloomTexture');
            this._bloomTexSize.x = this._bloomWidths[i - 1];
            this._bloomTexSize.y = this._bloomHeights[i - 1];
            downPass.setVec4('g_platform', this._configs.platform);
            downPass.setVec4('bloomTexSize', this._bloomTexSize);
            downPass
                .addQueue(QueueHint.OPAQUE)
                .addFullscreenQuad(bloomMaterial, 1);
        }

        // Upsample passes
        for (let i = iterations; i-- > 0;) {
            const upPass = ppl.addRenderPass(this._bloomWidths[i], this._bloomHeights[i], 'cc-bloom-upsample');
            upPass.addRenderTarget(this._bloomTexNames[i], LoadOp.CLEAR, StoreOp.STORE, this._clearColorTransparentBlack);
            upPass.addTexture(this._bloomTexNames[i + 1], 'bloomTexture');
            this._bloomTexSize.x = this._bloomWidths[i + 1];
            this._bloomTexSize.y = this._bloomHeights[i + 1];
            upPass.setVec4('g_platform', this._configs.platform);
            upPass.setVec4('bloomTexSize', this._bloomTexSize);
            upPass
                .addQueue(QueueHint.OPAQUE)
                .addFullscreenQuad(bloomMaterial, 2);
        }

        // Combine pass
        const combinePass = ppl.addRenderPass(width, height, 'cc-bloom-combine');
        combinePass.addRenderTarget(radianceName, LoadOp.LOAD, StoreOp.STORE);
        combinePass.addTexture(this._bloomTexNames[0], 'bloomTexture');
        combinePass.setVec4('g_platform', this._configs.platform);
        combinePass.setVec4('bloomParams', this._bloomParams);
        combinePass
            .addQueue(QueueHint.BLEND)
            .addFullscreenQuad(bloomMaterial, 3);
    }
}
```

以Prefilter Pass为例：

首先我们添加了一个渲染通道，标注了它的大小，和用到的effect pass name。
```typescript
const prefilterPass = ppl.addRenderPass(this._bloomWidths[0], this._bloomHeights[0], 'cc-bloom-prefilter');
```

effect pass name 是在effect文件中定义的。只有匹配pass name的effect，才能在这个渲染通道中使用。


```
// bloom1.effect
CCEffect %{
  techniques:
  - passes:
    - vert: bloom-vs
      frag: prefilter-fs
      pass: cc-bloom-prefilter // pass name
      rasterizerState:
        cullMode: none
      depthStencilState:
        depthTest: false
        depthWrite: false
}%

CCProgram bloom-vs %{
  ...
}%

CCProgram prefilter-fs %{
  ...
}%

```

然后我们添加了一个渲染目标，用于存储这个渲染通道的结果。
我们还添加了场景颜色作为输入，绑定到了effect中的`inputTexture`。

```typescript
prefilterPass.addRenderTarget(
    this._bloomTexNames[0],
    LoadOp.CLEAR,
    StoreOp.STORE,
    this._clearColorTransparentBlack,
);
prefilterPass.addTexture(radianceName, 'inputTexture');
```

effect中，我们定义了`inputTexture`，用于接收输入的场景颜色，并且标注了它的频率为`pass`。

对于UBO、Texture、Buffer，可以通过`#pragma rate`指令标注频率，控制资源所在的`DescriptorSet`。

如果频率为`pass`，Texture、Buffer可以作为输出，状态会被RenderGraph跟踪。不标注的话，为默认频率，多用于材质参数。

```
CCProgram prefilter-fs %{
  precision highp float;
  #include <common/color/gamma>

  in vec2 v_uv;

  #pragma rate BloomUBO pass
  uniform BloomUBO {
    mediump vec4 bloomParams;// x: useHDRIlluminance z: threshold, w: enableAlphaMask
  };

  #pragma rate inputTexture pass
  uniform sampler2D inputTexture;     // hdr input

  layout(location = 0) out vec4 fragColor;

  float luminance(vec3 color) {
    return dot(color, vec3(0.3, 0.5, 0.2));
  }

  void main() {
    vec4 color = texture(inputTexture, v_uv);

    float contribute = step(bloomParams.z, luminance(color.rgb));
    contribute *= mix(1.0, step(253.0 / 255.0, color.a), bloomParams.w);

    fragColor = vec4(color.xyz * contribute, 1.0);
  }
}%
```

如果UBO设置的频率为`pass`，我们可以通过直接在渲染通道中设置Uniform的值，来传递参数。

```typescript
prefilterPass.setVec4('g_platform', this._configs.platform);
prefilterPass.setVec4('bloomParams', this._bloomParams);
```

最后我们通过`addQueue`，将这个渲染通道添加到队列中。由于effect没有开启Blend，我们将`QueueHint`设置为`OPAQUE`。`QueueHint`目前仅用于查错，不影响实际渲染。

最后通过`addFullscreenQuad`绘制全屏四边形，这里使用了`bloomMaterial`的第0个pass，也就是prefilter。

```typescript
prefilterPass
    .addQueue(QueueHint.OPAQUE)
    .addFullscreenQuad(bloomMaterial, 0);
```

对于`Downsample`、`Upsample`、`Combine`等Pass，也是类似的流程。

## 资源状态跟踪

从上述例子我们可以看出，我们设置渲染通道时，只需要关注资源的名字，不需要关心资源的状态。

`RenderGraph`会根据资源的名字，自动跟踪资源的状态，保证资源的正确使用。

在渲染通道之间，我们会根据资源绑定的ShaderStage、读写状态、资源类型等，自动插入`Barrier`，进行同步、缓存的刷新、以及资源布局的转换。

这样，我们就可以专注于渲染效果的实现，而不用关心资源的状态管理。

## 改写内置管线

由于管线的编写较为复杂，可以在内置管线的基础上进行改写。

用户可以复制内置管线的代码到项目中，然后根据自己的需求，进行修改。

需要拷贝的文件有：
`builtin-pipeline.ts`，`builtin-pipeline-types.ts`，以及`builtin-pipeline-settings.ts`。

拷贝完后，需要对类的名字、以及注册名进行改写。

`builtin-pipeline.ts`：

```typescript
class MyPipelineBuilder implements rendering.PipelineBuilder {
    // ...
}
if (rendering) {
    rendering.setCustomPipeline('MyPipeline', new MyPipelineBuilder());
}
```

`builtin-pipeline-settings.ts`:

```typescript
@ccclass('MyPipelineSettings')
@menu('Rendering/MyPipelineSettings')
@requireComponent(Camera)
@disallowMultiple
@executeInEditMode
export class MyPipelineSettings extends Component {
    // ...

}
```
