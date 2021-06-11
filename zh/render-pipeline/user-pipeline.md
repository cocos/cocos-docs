# 自定义渲染管线

要创建一个自定义的渲染管线，首先要在 **资源管理器** 面板中新建一个 RenderPipeline 资源，再创建一个 RenderPipeline 脚本，然后在 Pipeline 资源中选择对应的 RenderPipeline 脚本，即可编辑对应的属性。

RenderFlow 和 RenderStage 使用同样的方式进行创建和编辑。在创建出来的 Pipeline 脚本中，可以像其它用户脚本一样添加属性并使其可以在 **属性检查器** 面板中编辑，但需要注意的是不能拖放场景中的实体，因为 RenderPipeline 并不和某个具体的场景绑定。

## RenderPipeline 中的属性和方法

- `flows`：RenderPipeline 中包含的 RenderFlow。

- `renderTextures`：在 RenderPipeline 启动时可创建的 RenderTexture。

    - `name`：RenderTexture 的名字，创建后可通过 RenderPipeline 的 `getRenderTexture` 函数获取。
    - `type`：RenderTexture 的类型。
    - `viewType`：RenderTexture 对应的 TextureView 类型。
    - `usage`：RenderTexture 的绑定类型，用于确定是 `color` 还是 `depth_stencil`。
    - `formate`：RenderTexture 的通道格式。
    - `width`：RenderTexture 的宽度，-1 表示窗口宽度。
    - `height`：RenderTexture 高度，-1 表示窗口高度。

- `framebuffers`：在 RenderPipeline 启动时可创建的 FrameBuffer。

    - `name`：FrameBuffer 的名字，创建后可通过 RenderPipeline 的 `getFrameBuffer` 函数获取。
    - `renderPass`：RenderPass。RenderPipeline 中配置的 RenderPass 的 ID。
    - `colorViews`：与 ColorAttachment 绑定的 TextureView。指定 RenderPipeline 中配置的 RenderTexture。
    - `depthStencilView`：与 DepthStencilAttachment 绑定的 TextureView。指定 RenderPipeline 中配置的 RenderTexture。
- `renderPasses`：在 RenderPipeline 启动时可创建的 RenderPass。
    - `index`：RenderPass 的 ID，可通过 RenderPipeline 的 `getRenderPass` 函数获取。
    - `colorAttachments`：ColorAttachment 描述，绘制 FrameBuffer 时对 ColorAttachment 的操作。
    - `depthStencilAttachment`：DepthStencilAttachment 描述，绘制 FrameBuffer 时对 DepthStencilAttachment 的操作。

- `getTextureView` (name: string)，`getRenderTexture` (name: string)：用于获取在 renderTextures 配置的 RenderTexture。
- `getFrameBuffer` (name: string)：用于获取在 framebuffers 配置的 FrameBuffer。
- `getRenderPass` (stage: number)：用于获取在 renderPasses 配置的 RenderPass。
- `initialize` (info: IRenderPipelineInfo)：用于通过脚本创建一个 RenderPipeline 时的初始化函数，RenderPipeline 必须初始化后才能使用。
- `activate` (root: Root)：用于通过资源加载一个 RenderPipeline 时的初始化函数，RenderPipeline 必须初始化后才能使用。
- `render` (view: RenderView)：渲染场景的逻辑。
- `updateUBOs` (view: RenderView)：更新全局 UniformBuffer。
- `sceneCulling` (view: RenderView)：场景剔除，剔除后可渲染物体保存在 `_renderObjects` 中。

## RenderFlow 中的属性和方法

- `name`：RenderFlow 的名字。
- `priority`：RenderFlow 在 RenderPipeline 中的执行顺序。
- `type`：RenderFlow 的类型。包括以下三种：
    - `SCENE`：用于绘制场景，该类型对于每个 camera 都会执行；
    - `POSTPROCESS`：后期处理，该类型对每个 camera 都要单独指定；
    - `UI`：用于绘制 UI。
- `stages`：RenderFlow 包含的 RenderStage。

## RenderStage 中的属性和方法

- `name`：RenderStage 的名字。
- `priority`：RenderStage 在 RenderFlow 中的执行顺序。
- `frameBuffer`：RenderStage 要绘制到的 FrameBuffer，应设置为 RenderPipeline 中配置的 FrameBuffer，或设置为 `window`，表示使用默认的 FrameBuffer。
- `renderQueues`：渲染列队，用于控制物体渲染顺序。
    - `isTransparent`：标记渲染列队是否为半透明；
    - `sortMode`：包括以下两种：<br>`FRONT_TO_BACK`：从前向后排序；<br>`BACK_TO_FRONT`：从后向前排序。
    - `stages`：指定渲染列队渲染材质中的哪些 pass，应指定为 pass 中的 phase。
    - `sortRenderQueue()`：对渲染列队排序；
    - `executeCommandBuffer` (view: RenderView)：执行渲染指令。
