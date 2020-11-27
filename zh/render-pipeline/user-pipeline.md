# 自定义渲染管线

要创建一个自定义的渲染管线，首先要在Asset面板中新建一个RenderPipeline资源。然后再创建一个RenderPipeline脚本，然后在Pipeline资源中选择对应的RenderPipeline脚本，即可编辑对应的属性。RenderFlow、RenderStage使用同样的方式创建和编辑。在创建出来的Pipeline脚本中，你可以像其它用户脚本一样添加属性并使其可以在属性面板中编辑，但注意不能拖放场景中的实体，因为RenderPipeline并不和某个具体的场景绑定。

- ### RenderPipeline中的属性和方法

  - flows：RenderPipeline中包含的RenderFlow。

  - renderTextures：在RenderPipeline启动时可创建的RenderTexture。

    - name：RenderTexture的名字，创建后可通过RenderPipeline的getRenderTexture函数获取。
    - type：RenderTexture的类型。
    - viewType：RenderTexture对应的TextureView类型。
    - usage：RenderTexture的绑定类型，用于确定是color还是depth_stencil。
    - formate：RenderTexture的通道格式。
    - width：RenderTexture的宽度，-1表示窗口宽度。
    - height：RenderTexture高度，-1表示窗口高度。

  - framebuffers：在RenderPipeline启动时可创建的FrameBuffer。

    - name：FrameBuffer的名字，创建后可通过RenderPipeline的getFrameBuffer函数获取。
    - renderPass：RenderPass。RenderPipeline中配置的RenderPass的ID。
    - colorViews：与ColorAttachment绑定的TextureView。指定RenderPipeline中配置的RenderTexture。
    - depthStencilView：与DepthStencilAttachment绑定的TextureView。指定RenderPipeline中配置的RenderTexture。
  - renderPasses：在RenderPipeline启动时可创建的RenderPass。
    - index：RenderPass的ID，可通过RenderPipeline的getRenderPass函数获取。
    - colorAttachments：ColorAttachment描述，绘制FrameBuffer时对ColorAttachment的操作。
    - depthStencilAttachment：DepthStencilAttachment描述，绘制FrameBuffer时对DepthStencilAttachment的操作。

  - getTextureView (name: string)，getRenderTexture (name: string)：用于获取在renderTextures配置的RenderTexture。
  - getFrameBuffer (name: string)：用于获取在framebuffers配置的FrameBuffer。
  - getRenderPass (stage: number)：用于获取在renderPasses配置的RenderPass。
  - initialize (info: IRenderPipelineInfo)：用于通过脚本创建一个RenderPipeline时的初始化函数，RenderPipeline必须初始化后才能使用。
  - activate (root: Root)：用于通过资源加载一个RenderPipeline时的初始化函数，RenderPipeline必须初始化后才能使用。
  - render (view: RenderView)：渲染场景的逻辑。
  - updateUBOs (view: RenderView)：更新全局UniformBuffer。
  - sceneCulling (view: RenderView)：场景剔除，剔除后可渲染物体保存在_renderObjects中。

- RenderFlow中的属性和方法：

  - name：RenderFlow的名字。
  - priority：RenderFlow在RenderPipeline中的执行顺序。
  - type：RenderFlow的类型。
    - SCENE：用于绘制场景，该类型对于每个camera都会执行；
    - POSTPROCESS：后期处理，该类型对每个camera要单独指定；
    - UI：用于绘制UI。
  - stages：RenderFlow包含的RenderStage。

- RenderStage中的属性和方法：

  - name：RenderStage的名字。
  - priority：RenderStage在RenderFlow中的执行顺序。
  - frameBuffer：RenderStage要绘制到的FrameBuffer，应设置为RenderPipeline中配置的FrameBuffer，或设置为window，表示使用默认的FrameBuffer。
  - renderQueues：渲染列队，用于控制物体渲染顺序。
    - isTransparent：标记渲染列队是否为半透明；
    - sortMode：FRONT_TO_BACK，从前向后排序；BACK_TO_FRONT从后向前排序；
    - stages：指定渲染列队渲染材质中的哪些pass，应指定为pass中的phase。
    - sortRenderQueue ()：对渲染列队排序；
    - executeCommandBuffer (view: RenderView)：执行渲染指令。