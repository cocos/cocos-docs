# 自定义渲染管线

Cocos Creator 3.8中正式开放了新的 **自定义渲染管线**。


**自定义渲染管线** 的接口位于 `cocos/core/pipeline/custom/pipeline.ts`

## 介绍

对于游戏引擎来说，渲染是最重要的功能之一。而引擎的渲染效果，由 **渲染管线**（RenderPipeline）决定，取决于不同的艺术风格、运行平台、硬件设备、渲染技术等等。

如何在引擎中实现各种各样的画面表现，是一个非常复杂的问题。

这需要引擎提供足够的灵活性，让用户可以自由定制渲染管线，以实现各种各样的效果。

Cocos**自定义渲染管线**能够在不同的平台、不同的硬件设备上，编写最优的渲染管线，以达到最佳的画面表现。

也能够在不同的平台、不同的硬件设备上，编写最通用的渲染管线，以达到最佳的性能表现以及跨平台性。

## 启用自定义管线

勾选 **自定义渲染管线**。

<img src="./image/cp-feature-enable.png" width=760></img>

通过填写 **自定义管线** 的名字，选择注册好的 **自定义渲染管线**。
- 目前支持 **前向渲染管线**（名字为 Custom 或 Forward）和 **后向渲染管线**（名字为 Deferred）两种。

<img src="./image/cp-pipeline-selection.png" width=760></img>

### 编写自定义渲染管线

新建 Typescript 文件，编写一个类，例如 `MyPipeline` ，让该类实现 `rendering.PipelineBuilder` 接口，通过 `rendering.setCustomPipeline` 方法把该 pipeline 注册到系统中。

## 概念

自定义渲染管线以数据流(Dataflow)的形式概括了渲染的整个流程，用**渲染图**(RenderGraph)描述。

**渲染图**由不同的渲染节点组成，比如**渲染通道**(RenderPass)，**计算通道**(ComputePass)等。每个渲染通道有数据输入与输出，比如**渲染目标**(RenderTarget)、**深度模板**(DepthStencil)、**贴图**(Texture)等。这些输入与输出会在计算节点间构成链接关系，形成数据流。

在**渲染通道**、**计算通道**节点下，可以有**渲染队列**(RenderQueue)子节点，用于控制渲染的顺序。**渲染队列**节点下，可以有**渲染内容**(RenderContent)子节点，用于控制渲染的内容。

**渲染内容** 可以是 **场景**、屏幕 **矩形**，也可以是计算任务的 **分发**（Dispatch），不同的通道支持不同的渲染内容。

**自定义渲染管线** 的【**渲染通道**、**渲染队列**、**渲染内容**】构成一个森林：

<img src="./image/cp-render-graph-1.png" width=640></img>

**自定义渲染管线**的【**渲染通道**、**渲染资源**】构成一个有向无圈图（DAG）：

<img src="./image/cp-render-graph-2.png" width=640></img>

我们可以层叠（Stack）以上两张图，得到 **渲染流程图**（RenderGraph）。**渲染流程图** 描述了 **自定义渲染管线** 的全部流程，引擎会按照用户定制的流程图进行资源分配、流程优化、渲染执行。

## 渲染管线类型

引擎的渲染管线根据硬件能力，分为了两种
- 基础渲染管线
- 标准渲染管线

## 基础渲染管线(BasicPipeline)

基础渲染管线提供跨平台的基础渲染功能，适用一切平台。

接口主要分为两类

* 注册资源。在管线中注册的资源，可以在渲染通道中使用，资源读写状态由管线托管。

```typescript
interface BasicPipeline {
    addRenderWindow (name: string, format: Format, width: number, height: number,
        renderWindow: RenderWindow): number;
    addRenderTarget (name: string, format: Format, width: number, height: number,
        residency?: ResourceResidency): number;
    addDepthStencil (name: string, format: Format, width: number, height: number,
        residency?: ResourceResidency): number;
}
```
* 添加渲染通道

```typescript
interface BasicPipeline {
    addRenderPass (width: number, height: number, passName?: string): BasicRenderPassBuilder;
}
```

**渲染通道** 代表了一次光栅化过程，将物件渲染至**渲染目标**以及**深度模板缓冲**。

可以通过`BasicRenderPassBuilder`构建。

```typescript
interface BasicRenderPassBuilder extends Setter {
    addRenderTarget (name: string, loadOp?: LoadOp, storeOp?: StoreOp, color?: Color): void;
    addDepthStencil (name: string, loadOp?: LoadOp, storeOp?: StoreOp,
        depth?: number, stencil?: number, clearFlags?: ClearFlagBit): void;
    addTexture (name: string, slotName: string, sampler?: Sampler | null, plane?: number): void;
    addQueue (hint?: QueueHint, phaseName?: string): RenderQueueBuilder;
}
```
## 标准渲染管线(Pipeline)

标准渲染具备更丰富的管线功能，目前支持GLES3、Vulkan、Metal三个后端。

标准渲染管线在基础渲染管线的基础上，提供了**计算通道**(ComputePass)，**渲染子通道**(RenderSubpass)等功能。
并且可以使用`StorageBuffer`、`StorageTexture`等资源。

```typescript
export interface Pipeline extends BasicPipeline {
    addStorageBuffer (name: string, format: Format, size: number,
        residency?: ResourceResidency): number;
    addStorageTexture (name: string, format: Format, width: number, height: number,
        residency?: ResourceResidency): number;
    addRenderPass (width: number, height: number, passName: string): RenderPassBuilder;
    addComputePass (passName: string): ComputePassBuilder;
    addUploadPass (uploadPairs: UploadPair[]): void;
    addMovePass (movePairs: MovePair[]): void;
}
export interface RenderPassBuilder extends BasicRenderPassBuilder {
    addStorageBuffer (name: string, accessType: AccessType, slotName: string): void;
    addStorageImage (name: string, accessType: AccessType, slotName: string): void;
    addRenderSubpass (subpassName: string): RenderSubpassBuilder;
}
export interface ComputePassBuilder extends Setter {
    addTexture (name: string, slotName: string, sampler?: Sampler | null, plane?: number): void;
    addStorageBuffer (name: string, accessType: AccessType, slotName: string): void;
    addStorageImage (name: string, accessType: AccessType, slotName: string): void;
    addQueue (phaseName?: string): ComputeQueueBuilder;
}
```
根据不同的平台，用户可以针对性构建不同的渲染管线。

比如在移动平台上，用户可以通过**渲染子通道**(RenderSubpass)利用芯片上的高速缓存，减少内存读写来降低发热。

在桌面平台上，用户则可以使用**计算通道**(ComputePass)编写复杂的图形算法。充分利用平台特性。

### 渲染子通道 RenderSubpass （实验性质）

渲染子通道表示渲染的一个阶段，该阶段读取和写入渲染通道中的一部分附件(Attachment)。

渲染命令(Render commands)被记录到渲染通道实例的特定子通道中。

```typescript
export interface RenderSubpassBuilder extends Setter {
    addRenderTarget (
        name: string,
        accessType: AccessType,
        slotName?: string,
        loadOp?: LoadOp,
        storeOp?: StoreOp,
        color?: Color): void;
    addDepthStencil (
        name: string,
        accessType: AccessType,
        depthSlotName?: string,
        stencilSlotName?: string,
        loadOp?: LoadOp,
        storeOp?: StoreOp,
        depth?: number,
        stencil?: number,
        clearFlags?: ClearFlagBit): void;
    addTexture (name: string, slotName: string, sampler?: Sampler | null, plane?: number): void;
    addStorageBuffer (name: string, accessType: AccessType, slotName: string): void;
    addStorageImage (name: string, accessType: AccessType, slotName: string): void;
    addQueue (hint?: QueueHint, phaseName?: string): RenderQueueBuilder;
}
```

渲染子通道支持输入附件(Input Attachment)，可以通过`slotName`、`depthSlotName`、`stencilSlotName`指定，这个名字需要与effect中的注册的输入附件名字一致。
```glsl
// .effect
#pragma subpass
#pragma subpassColor in albedoMap
#pragma subpassColor in normalMap
#pragma subpassColor in emissiveMap
#pragma subpassDepth in depthBuffer
#pragma isubpassStencil in stencilBuffer // isubpass的i表示输入附件类型为int

void main () {
    vec4 albedo = subpassLoad(albedoMap);
    vec4 normal = subpassLoad(normalMap);
    vec4 emissive = subpassLoad(emissiveMap);
    float depth = subpassLoad(depthBuffer).x;
    int stencil = subpassLoad(stencilBuffer).x;
    ...
}
```

### 计算通道 ComputePass

计算通道是对一次计算任务的抽象，可以调用Compute Shader，执行计算任务。

```typescript
export interface ComputePassBuilder extends Setter {
    addTexture (name: string, slotName: string, sampler?: Sampler | null, plane?: number): void;
    addStorageBuffer (name: string, accessType: AccessType, slotName: string): void;
    addStorageImage (name: string, accessType: AccessType, slotName: string): void;
    addQueue (phaseName?: string): ComputeQueueBuilder;
}

export interface ComputeQueueBuilder extends Setter {
    addDispatch (
        threadGroupCountX: number,
        threadGroupCountY: number,
        threadGroupCountZ: number,
        material?: Material,
        passID?: number): void;
}
```

更多内容见[计算着色器](../shader/compute-shader.md)。

## 渲染队列（RenderQueue）

**渲染队列** 是 **渲染通道/子通道**的子节点，有严格的渲染先后顺序。只有一个 **渲染队列** 的内容完全绘制后，才会绘制下一个 **渲染队列** 的内容。

可以通过`RenderQueueBuilder`添加绘制内容，**渲染队列** 内对象的渲染顺序是未定义的，可能是任何顺序。

```typescript
export interface RenderQueueBuilder extends Setter {
    addScene (camera: Camera, sceneFlags: SceneFlags): void;
    addFullscreenQuad (material: Material, passID: number, sceneFlags?: SceneFlags): void;
}
```
可以通过`SceneFlags`标记场景渲染特性，比如渲染不透明物件、渲染投影物件等。

```typescript
export enum SceneFlags {
    NONE = 0,
    OPAQUE = 0x1,
    MASK = 0x2,
    BLEND = 0x4,
    SHADOW_CASTER = 0x8,
    UI = 0x10,
}
```

## 渲染数据设置

我们可以通过`Setter`设置Shader里用到的数据和只读资源，名字是Shader里的变量名。

```typescript
export interface Setter extends RenderNode {
    setMat4 (name: string, mat: Mat4): void;
    setQuaternion (name: string, quat: Quat): void;
    setColor (name: string, color: Color): void;
    setVec4 (name: string, vec: Vec4): void;
    setVec2 (name: string, vec: Vec2): void;
    setFloat (name: string, v: number): void;
    setArrayBuffer (name: string, arrayBuffer: ArrayBuffer): void;
    setBuffer (name: string, buffer: Buffer): void;
    setTexture (name: string, texture: Texture): void;
    setSampler (name: string, sampler: Sampler): void;
}
```

这里用到的数据和资源是管线相关的。材质相关的，需要设置到材质上，不应重复设置。

资源必须是只读的。如果需要读写数据，需要注册到管线中，由管线进行管理。

### 数据更新频率

Effect中，不同的变量有不同的更新频率。由低到高大致分为：
- `pass`
- `phase`
- `batch`
- `instance`

effect中需要在变量声明前加上`#pragma rate`指定更新频率。
- `batch`为缺省值
- `instance`暂不支持自定义

例子:

```glsl
// copy-pass.effect

precision highp float;
in vec2 v_uv;

#pragma rate outputResultMap pass
uniform sampler2D outputResultMap;

layout(location = 0) out vec4 fragColor;

void main () {
    fragColor = texture(outputResultMap, v_uv);
}

```

RenderGraph中的每个节点描述符集的更新频率，由节点的类型决定。

| 节点类型 | 更新频率 |
| --- | --- |
| 渲染通道 | pass |
| 渲染子通道 | pass |
| 计算通道 | pass |
| 渲染队列 | phase |
| 计算队列 | phase |
