# Render Pipeline (Experimental)

RenderPipeline is used to control the rendering process of a scene, including lighting management, object culling, render object sorting, render target switching, etc. Since each stage can be handled differently and optimally for different projects, it is difficult to achieve optimal results with a uniform approach to the rendering process for different types of projects. The customizable render pipeline is used to provide more flexible control over each stage in the rendered scene, allowing for deeper optimization solutions for different projects.

Among the customizable render pipelines, one can choose to use the engine's built-in render pipeline, which uses the **forward render pipeline**. Please refer to the [Built-in Render Pipeline](builtin-pipeline.md) documentation for details.

<!--
Developers can also create a new render pipeline asset to extend the render pipeline themselves. In the render pipeline asset you can manage each stage of the rendering process and then set each parameter in the editor.

The customizable render pipeline currently includes the following features:

[Custom Pipeline](user-pipeline.md)

[Post-Processing](post-process.md)
-->
