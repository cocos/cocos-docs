# Render Pipeline Overview (Experimental)

RenderPipeline is used to control the rendering process of a scene, including lighting management, object culling, render object sorting, render target switching, etc. Since each stage can be handled differently and optimally for different projects, it is difficult to achieve optimal results with a uniform approach to the rendering process for different types of projects. The customizable rendering pipeline is used to provide more flexible control over each stage in the rendered scene, allowing for deeper optimization solutions for different projects.

In the customizable rendering pipeline, you can choose to use the engine's built-in rendering pipeline. The built-in pipeline includes a **forward rendering pipeline** and a **deferred rendering pipeline**, and the engine uses the forward rendering pipeline by default. Please refer to the [Builtin Rendering Pipeline](builtin-pipeline.md) documentation for details.

You can also create a new rendering pipeline resource to extend the rendering pipeline yourself. In the render pipeline resource you can manage each stage of the rendering process and then set each parameter in the editor. For details, please refer to the following documentations:

- [Custom Rendering Pipeline [cn]](user-pipeline.md)

- [Post Process [cn]](post-process.md)
