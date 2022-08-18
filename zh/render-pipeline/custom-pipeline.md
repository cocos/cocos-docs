# 自定义渲染管线（实验性质）

Cocos Creator 3.6中添加了新的 **自定义渲染管线**。

目前为实验性的前瞻版本，接口、命名尚未稳定，不推荐在正式项目中使用。目前仅支持 Web 端。

**自定义渲染管线** 的接口位于 `cocos/core/pipeline/custom/pipeline.ts`

## 概述

通过 **自定义渲染管线**（CustomPipeline），用户可以定制 **渲染通道**（RenderPass），设置输入/输出的 **渲染视图**（RenderView）、以及每个 **渲染通道** 需要绘制的 **渲染内容**（RenderContent）。

**渲染内容** 可以是 **场景**、屏幕 **矩形**，也可以是计算任务的 **分发**（Dispatch），取决于 **渲染通道** 的类型。

**渲染内容** 的绘制顺序，可以通过 **渲染队列**（RenderQueue）进行调整。

**自定义渲染管线** 的【**渲染通道**、**渲染队列**、**渲染内容**】构成一个森林：

<img src="./image/cp-render-graph-1.png" width=640></img>

**自定义渲染管线**的【**渲染通道**、**渲染视图**】构成一个有向无圈图（DAG）：

<img src="./image/cp-render-graph-2.png" width=640></img>

我们可以层叠（Stack）以上两张图，得到 **渲染流程图**（RenderGraph）。**渲染流程图** 描述了 **自定义渲染管线** 的全部流程，引擎会按照用户定制的流程图进行资源分配、流程优化、渲染执行。

## 渲染通道（RenderPass）

**渲染通道** 有三种类型：光栅（Raster）、计算（Compute）、资源（Resource）。

每种类型会有各自不同的 **渲染通道**。

### 光栅类型（Raster）

光栅类型使用了GPU的光栅化能力（在GraphicsEngine执行）。

#### 1. **光栅化通道**（RasterPass）

<img src="./image/cp-raster-pass.png" width=760></img>

- width、height为输出渲染目标的分辨率。

- layoutName为Effect的Stage名字。

- name为调试（debug）时显示的名字。为空时，系统会赋予默认名字。

#### 2. **光栅化子通道**（RasterSubpass）

功能尚未开放。需要GPU分块渲染能力（Tile-based rendering）。

#### 3. **光栅化展示通道**（PresentPass）

将画面渲染至屏幕上。

### 计算类型（Compute）

计算类型使用了GPU的通用计算能力、以及光线追踪能力（可在GraphicsEngine、ComputeEngine执行）。

#### 1. **计算通道**（ComputePass）

<img src="./image/cp-compute-pass.png" width=760></img>

- layoutName为Effect的Stage名字。

- name为调试（debug）时显示的名字。为空时，系统会赋予默认名字。

#### 2. **光线追踪通道**（RaytracePass）

功能尚未开放。需要GPU光线追踪能力。

### 资源类型（Resource）

资源类型使用了 GPU 的资源处理能力（可在GraphicsEngine、ComputeEngine、CopyEngine执行）。

#### 1. **拷贝通道**（CopyPass）

负责将资源来源（source）拷贝至目标（target），需要资源格式兼容。

<img src="./image/cp-copy-pass.png" width=760></img>

- name 为调试（debug）时显示的名字。为空时，系统会赋予默认名字。

#### 2. **移动通道**（MovePass）

负责将资源来源（source）移动至目标（target），需要资源格式全同。

这里的移动是语义上的概念（move semantics）：将来源的变量移动至目标变量，作废来源变量。如果资源因某些原因无法移动（比如资源来源正在被读取），则以拷贝方式实现。

移动语义用于管线优化，达到减小带宽的目的。如果不清楚如何正确使用**移动通道**，可以用**拷贝通道**替代，不会影响画面表现，调试时较为容易。

## 渲染视图（RenderView）

RenderView 有两种类型：**光栅化视图**（RasterView），**计算视图**（ComputeView）。

### 光栅化视图（RasterView）

**光栅化视图** 会被光栅化。有两种子类型：渲染目标（RenderTarget），深度模板（DepthStencil）。

<img src="./image/cp-raster-view.png" width=560></img>

- slotName 为 shader pixel 分量的名字。（比如color、normal等）

- accessType 为绑定类型，可以是 Read、ReadWrite、Write。作为输入（Input）时，为Read；作为输出（Output）时为Write；同时作为输入与输出（Inout），为ReadWrite。【注意】深度模板（DepthStencil）在做深度测试（DepthTest）时，虽然结果不写入视图，但此时作为输出，绑定类型依然为Write。部分平台开启ARM_shader_framebuffer_fetch_depth_stencil扩展时，DepthStencil绑定类型为ReadWrite。DepthStencil的绑定类型不能为Read。

- attachmentType为类型，可以是RenderTarget或者DepthStencil。

- loadOp是光栅化读取选项，可以是读取（Load）、清除（Clear）、舍弃（Discard）。

- storeOp是光栅化存储选项，可以是写入（Store）、舍弃（Discard）。

- clearFlags是清除标志位，如果类型是RenderTarget，标志位必须是Color。如果类型是DepthStencil，为Depth、Stencil、Depth | Stencil三者其一。

- clearColor为清除颜色，如果类型是RenderTarget，为RGBA（Float4）。如果类型为DepthStencil，为RG，此时R存储Depth（Float）。G存储Stencil（Uint8）。

### 计算视图（ComputeView）

**计算视图**不会被光栅化。常用于采样（Sample）、乱序读写（Unordered Access）。

<img src="./image/cp-compute-view.png" width=520></img>

- name为Shader描述符（Descriptor）的名字。

- accessType为读写类型。可以是Read、ReadWrite、Write。

- clearFlags为资源的清除类型，一般为None或者Color。

- clearColor为资源的清除颜色，为Float4或者Int4。取决于clearValueType。

- clearValueType为资源清除颜色的类型，为Float或者Int。

如果资源标注了清除颜色，那么在执行**计算通道**（ComputePass）前，会以clearColor清除资源内容。光栅类型的通道（Raster）不清除**计算视图**内容。

## 渲染视图设置

**光栅化通道**：

<img src="./image/cp-add-raster-view.png" width=760></img>

**计算通道**：

<img src="./image/cp-add-compute-view.png" width=760></img>

## 渲染队列（RenderQueue）

**渲染队列**是**渲染通道**（Render Pass）的子节点，有严格的（渲染）先后顺序。只有一个**渲染队列**的内容完全绘制后，才会绘制下一个**渲染队列**的内容。

**渲染队列**有两种类型：**光栅化队列**、**计算队列**。分别在**光栅化通道**、**计算通道**添加。

### 光栅化队列（RasterQueue）

**光栅化队列**执行光栅化任务，一般为绘制**场景**、绘制全屏四边形等。**光栅化队列**内部为乱序绘制。

<img src="./image/cp-add-raster-queue.png" width=760></img>

<img src="./image/cp-raster-queue.png" width=760></img>

- hint为队列提示，有None、Opaque、Cutout、Transparent四种选项。hint不会影响执行，只用于性能检测。比如在移动平台上，我们往往希望先绘制Opaque队列（关闭AlphaTest），再绘制Cutout队列（开启AlphaTest）。如果在Opaque队列的绘制内容中，不小心混入了开启AlphaTest的物件，会降低图形性能。因此我们会通过队列提示，检查用户的提交是否符合预期。

- name为调试（debug）时显示的名字。为空时，系统会赋予默认名字。

### 计算队列（ComputeQueue）

**计算队列**只包含**分发**（Dispatch），顺序执行。

<img src="./image/cp-add-compute-queue.png" width=520></img>

<img src="./image/cp-compute-queue.png" width=760></img>

**计算通道**没有队列提示。

## 渲染内容（RenderContent）

**渲染内容**通过**渲染队列**排序、由多种元素组成。

### 场景（Scene）

需要绘制的2D、3D**场景**。适用于**光栅化队列**。

<img src="./image/cp-scene.png" width=760></img>

可通过camera添加，也可以直接添加。可以附加一定的光照信息。

- sceneFlags一定程度控制**场景**的渲染。比如渲染哪些对象（Opaque、Cutout、Transparent）、是否只渲染阴影投射对象（ShadowCaster）、是否只渲染UI、光照方式（None、Default、Volumetirc、Clustered、PlanarShadow）、是否渲染GeometryRenderer、是否渲染Profiler等。

### 矩形（Quad）

全屏/局部的**矩形**。常用于后期特效渲染。适用于**光栅化队列**。

<img src="./image/cp-quad.png" width=760></img>

### 分发（Dispatch）

用于**计算队列**。

<img src="./image/cp-dispatch.png" width=760></img>

### 动态设置

我们可以动态设置Queue、Pass的一些属性。

比如viewport、clearRenderTarget等。

## 渲染数据设置（开发中）

在编写渲染算法时，我们往往需要设置一些数据供Shader使用。

**渲染流程图**（RenderGraph）在**渲染通道**（RenderPass）、**渲染队列**（RenderQueue）提供了设置数据的接口。

<img src="./image/cp-setter.png" width=760></img>

用户可以设置常量（Constant）、缓冲（Buffer）、贴图（Texture）等数据。

这些数据可以是只读的、或者始终处于可读写状态。

对于有读/写状态变化的资源，我们建议用**渲染视图**（RenderView）进行跟踪。

每个**渲染通道**、**渲染队列**有各自独立的存储。

每个节点有不同的数据更新/上传频率。用户填写的常量、Shader描述符（Descriptor）的更新频率需要与节点的更新频率一致。

- **渲染通道**：每**渲染通道**上传一次（PerPass）。

- **渲染队列**：每**渲染阶段**上传一次（PerPhase）。

<img src="./image/cp-data-structure.png" width=760></img>

## 功能开启

勾选**自定义渲染管线**。

<img src="./image/cp-feature-enable.png" width=760></img>

通过填写**自定义管线**的名字，选择注册好的**自定义渲染管线**。
- 目前仅支持'Forward', 'Deferred'两种。

<img src="./image/cp-pipeline-selection.png" width=760></img>

## 编写自定义渲染管线（开发中）

实现PipelineBuilder接口，注册到系统中。

<img src="./image/cp-pipeline-edit.png" width=520></img>
