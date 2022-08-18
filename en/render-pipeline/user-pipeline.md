# Custom Render Pipelines(Deprecated)

To create a custom render pipeline, first create a new RenderPipeline asset in the **Assets** panel, then create a RenderPipeline script, and then select the corresponding RenderPipeline script in the Pipeline asset to edit the corresponding properties.

RenderFlow and RenderStage are created and edited in the same way. In the created Pipeline script, add properties and make them editable in the **Inspector** panel just like any other user script, but note that it is not an option to drag and drop entities in the scene, as the RenderPipeline is not bound to a specific scene.

## Properties and methods in RenderPipeline

- `flows`: The RenderFlow contained in the RenderPipeline.

- `renderTextures`: the RenderTextures that can be created when the RenderPipeline is started.

    - `name`: the name of the RenderTexture, which can be obtained by the `getRenderTexture` function of the RenderPipeline after creation.
    - `type`: the type of the RenderTexture.
    - `viewType`: the corresponding TextureView type of the RenderTexture.
    - `usage`: the binding type of the RenderTexture, used to determine whether it is `color` or `depth_stencil`.
    - `formate`: the channel format of the RenderTexture.
    - `width`: width of the RenderTexture, -1 means the width of the window.
    - `height`: height of the RenderTexture, -1 means the height of the window.

- `framebuffers`: the FrameBuffer that can be created when RenderPipeline starts.

    - `name`: the name of the FrameBuffer, it can be retrieved by the `getFrameBuffer` function of RenderPipeline after creation.
    - `renderPass`: the ID of the RenderPass configured in the RenderPipeline.
    - `colorViews`: TextureView bound to the ColorAttachment, specifying the RenderTexture configured in the RenderPipeline.
    - `depthStencilView`: TextureView bound to DepthStencilAttachment. specifies the RenderTexture configured in the RenderPipeline.
- `renderPasses`: the RenderPasses that can be created when the RenderPipeline is started.
    - `index`: ID of the RenderPass, which can be obtained by the `getRenderPass` function of the RenderPipeline.
    - `colorAttachments`: the description of the ColorAttachment, the operation of the ColorAttachment when drawing the FrameBuffer.
    - `depthStencilAttachment`: the description of the DepthStencilAttachment, the operation of the DepthStencilAttachment when drawing the FrameBuffer.

- `getTextureView` (name: string), `getRenderTexture` (name: string): get the RenderTexture configured in renderTextures.
- `getFrameBuffer` (name: string): get the FrameBuffer configured in `framebuffers`.
- `getRenderPass` (stage: number): get the RenderPass configured in renderPasses.
- `initialize` (info: IRenderPipelineInfo): initialize function for creating a RenderPipeline by script, the RenderPipeline must be initialized before it can be used.
- `activate` (root: Root): initialization function used when loading a RenderPipeline through an asset.
- `render` (view: RenderView): logic for rendering the scene.
- `updateUBOs` (view: RenderView): update the global UniformBuffer.
- `sceneCulling` (view: RenderView): scene culling, renderable objects are saved in `_renderObjects` after culling.

## Properties and methods in RenderFlow

- `name`: the name of the RenderFlow.
- `priority`: the order of execution of the RenderFlow in the RenderPipeline.
- `type`: the type of the RenderFlow.
    - `SCENE`: used to draw the scene, this type will be executed for each camera.
    - `POSTPROCESS`: post-processing, this type is specified separately for each camera.
    - `UI`: used to draw the UI.
- `stages`: RenderStage included in RenderFlow.

## Properties and methods in RenderStage

- `name`: the name of the RenderStage.
- `priority`: the order of execution of the RenderStage in the RenderFlow.
- `frameBuffer`: the FrameBuffer that the RenderStage will draw to, should be set to the FrameBuffer configured in the RenderPipeline, or set to `window` to indicate that the default FrameBuffer is used.
- `renderQueues`: render queue, used to control the rendering order of objects.
    - `isTransparent`: marks whether the render queue is semi-transparent.
    - `sortMode`: <br>`FRONT_TO_BACK`: sort from front to back; <br>`BACK_TO_FRONT`: sort from back to front.
    - `stages`: specifies which passes in the render queue render material, should be specified as the `phase` in the `pass`.
    - `sortRenderQueue()`: sort the render queue.
    - `executeCommandBuffer` (view: RenderView): execute the render command.
