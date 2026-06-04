# Writing a Customizable Render Pipeline

In projects where special effects need to be achieved or precise control over the rendering process is required to maximize performance, it is often necessary to customize the render pipeline.

Cocos' Customizable Render Pipeline (CRP) allows developers to write cross-platform custom render pipelines without modifying the engine's source code.

This tutorial uses the built-in render pipeline (Builtin) as an example to show how to write a custom render pipeline based on CRP.

## Source Code Location

It is recommended to create your own pipeline based on the built-in one for a quick start and iteration. You can obtain the source code of the built-in render pipeline in the following two ways:

1. Refer to the [Cocos CRP Example Project on Github](https://github.com/cocos/cocos-example-custom-pipeline), and find the branch corresponding to the engine version you are using.
2. Copy the three pipeline-related scripts under the internal/default_renderpipeline/ directory in the editor to the assets directory, and then make modifications.

   - builtin-pipeline.ts: Pipeline implementation
   - builtin-pipeline-types.ts: Related data types required by the pipeline
   - builtin-pipeline-settings.ts: Pipeline settings component

## Overriding the Built-in Pipeline

Due to the complexity of writing a render pipeline from scratch, it is advisable to modify the existing built-in pipeline.

Users can copy the code of the built-in pipeline into their project and then make modifications according to their specific needs.

The files that need to be copied are:
`builtin-pipeline.ts`, `builtin-pipeline-types.ts`, and `builtin-pipeline-settings.ts`.

After copying, it is necessary to rename the class names and the pipeline name.

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

## Creating a Render Pipeline

First, we need to create a class for the render pipeline that inherits from `rendering.Pipeline`.

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
        // setup render resources.
    }
    setup(
        cameras: renderer.scene.Camera[],
        ppl: rendering.BasicPipeline,
    ): void {
        // setup camera rendering.
    }
}
```

Custom pipelines need to implement two core methods: `windowResize` and `setup`.

### `windowResize` Method

The `windowResize` method is called when the pipeline is initialized and when the window size changes. In `windowResize`, we need to register the resources will be used when rendering. Only resources registered within the `windowResize` method can be utilized within the pipeline rendering.

> Note: Registering resources merely adds resource descriptions to the system; if they are not used during rendering, system resources will not be allocated, and memory usage will not increase.

### `setup` Method

The `setup` method is called every frame when the camera is rendering, used to set up the rendering process for this camera. This method is for constructing the RenderGraph node graph; once constructed, it is handed over to the render pipeline for rendering.

> Note: Only resources registered in `windowResize` can be used.

The specific implementation of the built-in pipeline is in `builtin-pipeline.ts`.

## Pipeline Registration and Usage

The render pipeline implemented by the user can be registered with the rendering system during the script import phase.

```typescript
import { rendering } from 'cc';

if (rendering) {
    rendering.setCustomPipeline('Builtin', new BuiltinPipelineBuilder());
}
```

The `Builtin` is the name of the built-in pipeline, which you can change to any string you desire. After changing it, switch the pipeline name to your own pipeline name in **Project Settings -> Graphics Settings -> Render Pipeline(New)** to use it.

## Render Resource Management

Cocos' Customizable Render Pipeline (CRP) is based on the `Render Graph` concept, but it differs from traditional `Render Graph` in terms of resource management.

For resources that need to be written to, they must be registered within the pipeline. This is typically done in the `windowResize` method.

When registering, you need to provide a unique identifier for the resource's name, so do not use the same name for different resources to avoid conflicts.

If there are multiple cameras, you can append the camera's `Id` to the resource name to distinguish between resources of different cameras.

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

Within a single frame, please do not change the size or specifications of the resources, as this may lead to rendering errors.

If settings are repeated, the parameters from the last setting will be taken.

## Resource Residency and Lifecycle

Resources registered within the pipeline have several types of residency (`ResourceResidency`):

- `MANAGED` - Resources managed by the pipeline, which will be automatically released at the appropriate time.
- `MEMORYLESS` - On-chip resources that do not occupy video memory. They can only be used in one RenderPass and are automatically released after the RenderPass ends.
- `PERSISTENT` - Persistent resources managed by the pipeline, which will not be released until the pipeline is destroyed. Generally used for resources needed across frames.
- `EXTERNAL` - External resources that are not managed by the pipeline and require manual release by the user.
- `BACKBUFFER` - The backbuffer, which does not require user management.

For resources of type `MANAGED`, the pipeline will release them after the GPU has finished using them, so they may be delayed by a few frames.

Currently, the engine is optimized for mobile devices, requiring a reduction in the creation and destruction of `Framebuffers`, so the memory positions of resources will not be moved. In the future, on the desktop, `MANAGED` will serve as a transitional (`Transient`) resource, allowing for more memory optimization.

## Rendering Process

In the `setup` method, you can set the rendering process for the camera, which is called once per frame.

The `cameras` parameter passed in is a list of cameras currently being rendered, which has already been sorted.

The `ppl` parameter passed in is the current render pipeline.

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

Above is the basic process for writing a render pipeline.

## Building a Render Pipeline for Cameras

Different cameras can have different render pipelines constructed for them to achieve various rendering effects.

The following demonstrates a simple render pipeline from the built-in pipeline, mainly used for rendering editor `Gizmos`.

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

## Dynamically Construct Render Pipeline

In the `setup` method, you can dynamically construct the render pipeline based on the camera, platform, hardware parameters, and more.

Firstly, you can collect the current environmental information at the beginning of the `windowResize` and `setup` methods.

The `setupPipelineConfigs` in the built-in pipeline is responsible for collecting platform-related information. The `setupCameraConfigs` function is used to collect camera-related information.

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

        // register render resources
        // ...
    }
    setup(cameras: renderer.scene.Camera[], ppl: rendering.BasicPipeline): void {
        for (const camera of cameras) {
            if (!camera.scene || !camera.window) {
                continue;
            }
            // get camera information
            setupCameraConfigs(camera, this._configs, this._cameraConfigs);

            this._pipelineEvent.emit(PipelineEventType.RENDER_CAMERA_BEGIN, camera);

            // build render pipeline according to the camera information.
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

Then, based on this information, you can dynamically construct the render pipeline.

Given the diversity of platforms and performance requirements, the selection and determination of algorithms can be quite complex. This is the main scenario where the new pipeline shines, aiming to simplify the construction of the render pipeline and improve development efficiency.

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

## BuiltinPipelineSettings

The configuration of the built-in pipeline, provided by the `BuiltinPipelineSettings` component, will save a JSON object to `camera.pipelineSettings`.

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

Based on this JSON object, you can set the rendering effects for the camera.

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

## Adding Post-Processing Effects

Here, we will use the bloom effect as an example to demonstrate how to add post-processing effects.

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

Taking the `Prefilter Pass` as an example:

First, we add a render pass, specifying its size and the name of the effect pass used.

```typescript
const prefilterPass = ppl.addRenderPass(this._bloomWidths[0], this._bloomHeights[0], 'cc-bloom-prefilter');
```

The effect pass name is defined within the effect file. Only effects that match the pass name can be used in this render pass.

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

Then, we added a render target to store the results of this render pass.

We also added the scene color as an input, binding it to the `inputTexture` in the effect.

```typescript
prefilterPass.addRenderTarget(
    this._bloomTexNames[0],
    LoadOp.CLEAR,
    StoreOp.STORE,
    this._clearColorTransparentBlack,
);
prefilterPass.addTexture(radianceName, 'inputTexture');
```

In the effect, we define `inputTexture` to receive the input scene color and mark its frequency as `pass`.

For UBOs, Textures, and Buffers, you can use the `#pragma rate` directive to mark the frequency and control the `DescriptorSet` where the resources reside.

If the frequency is marked as `pass`, Textures and Buffers can be used as outputs, and their states will be tracked by the RenderGraph. If not marked, it is the default frequency, commonly used for material parameters.

```txt
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

If the frequency set for UBO is `pass`, we can pass parameters by directly setting the value of Uniform in the render pipeline.

```typescript
prefilterPass.setVec4('g_platform', this._configs.platform);
prefilterPass.setVec4('bloomParams', this._bloomParams);
```

Finally, we add this rendering pass to the queue through `addQueue`. Since the effect does not have Blend enabled, we set `QueueHint` to `OPAQUE`. The `QueueHint` is currently only used for debugging and does not affect the actual rendering.

Lastly, we draw a fullscreen quad through `addFullscreenQuad`, using the first pass of the `bloomMaterial`, which is the prefilter.

```typescript
prefilterPass
    .addQueue(QueueHint.OPAQUE)
    .addFullscreenQuad(bloomMaterial, 0);
```

For passes such as `Downsample`, `Upsample`, and `Combine`, the process is similar.

## Resource State Tracking

From the example above, we can see that when setting up rendering passes, we only need to focus on the names of the resources and not their states.

The `RenderGraph` will automatically track the state of resources based on their names, ensuring their correct usage.

Between rendering passes, we will automatically insert `Barriers` based on the resource's bound ShaderStage, read/write status, and resource type, to synchronize, refresh caches, and convert resource layouts.

In this way, we can focus on implementing rendering effects without worrying about resource state management.
