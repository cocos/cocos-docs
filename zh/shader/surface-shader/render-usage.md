# 渲染用途

默认情况下，Surface Shader 都是以输出到屏幕上，显示场景为主。

但有时候，我们也有一些特殊需要，比如:
- 渲染为阴影贴图（ShadowMap）
- 渲染为环境反射图（Reflection Probe)

不同的渲染用途，有不同的渲染流程和细节，因此需要特殊处理。

Surface Shader 框架中，预定义了常见的不同用途的流程，在 **资源管理器 -> internal -> chunk -> shading-entries -> main-functions** 目录下可以找到。

以下是内置的渲染流程：

![render-to](../img/render-to-xxx.png)

| 常用的渲染用途       | 文件位置             | 备注|
| -------------------- | -------------------- | --- |
| 渲染到场景（默认）   | render-to-scene      ||
| 渲染到阴影贴图       | render-to-shadowmap  ||
| 渲染到环境贴图       | render-to-reflectmap | 可选 |
| 渲染卡通描边         | misc/silhouette-edge ||
| 渲染天空             | misc/sky             ||
| 后期处理或通用计算 Pass | misc/quad            | 引擎预留 |

只需要在 Surface Shader 的 [组装](./shader-assembly.md) 环节引用对应的头文件，就可以完成渲染流程。

比如，在内置 Surface Shader (builtin-standard.effect) 中，我们可以看到：

```glsl
CCPogram standard-vs %{
    ...
    #include <shading-entries/main-functions/render-to-scene/vs>
}%

CCProgram shadow-caster-vs %{
    ...
    #include <shading-entries/main-functions/render-to-shadowmap/vs>
}%

CCPogram standard-fs %{
    ...
    #include <shading-entries/main-functions/render-to-scene/fs>
}%

CCProgram shadow-caster-fs %{
    ...
    #include <shading-entries/main-functions/render-to-shadowmap/fs>
}%

CCProgram refelect-map-fs %{
    ...
    #include <shading-entries/main-functions/render-to-shadowmap/fs>
}%
```
