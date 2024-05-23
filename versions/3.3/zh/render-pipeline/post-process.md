# 后期处理

要新建一个后期处理需要新建一个 RenderFlow 脚本，然后将其 type 设为 POSTPROCESS。制作流程与其它 RenderFlow 相同，但 RenderPipeline 不会自动执行后期处理，需要在 Camera 中设置 flows 属性来指定执行哪些后期处理。
