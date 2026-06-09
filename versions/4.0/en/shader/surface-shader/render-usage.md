# Render Usage

By default, Surface Shaders mainly output to the screen and display scenes.

However, sometimes we have some special needs, such as:
- Render to shadow maps
- Render to reflect maps

Different render usages have different processes and details, so they need special handling.

The Surface Shader framework has predefined the commonly used flows for different usages. They can be found in the  **Assets/internal/chunks/shading-entries/main-functions/** folder.

Here are built-in render usages.

| Common Render Usages       | Location             | Description |
| -------------------- | -------------------- | --- |
| Render to Scene(default)   | render-to-scene      ||
| Render to ShadowMap       | render-to-shadowmap  ||
| Render to ReflectionMap       | render-to-reflectmap | Optional |
| Render Cartoon Outlines         | misc/silhouette-edge ||
| Render Skybox             | misc/sky             ||
| Post-processing or General Compute Pass | misc/quad            | Reserved |

You only need to include the corresponding header files during the [Surface Shader Assembly](./shader-assembly.md) phase to complete the rendering process.

For example, in `internal/effects/builtin-standard.effect`, we can see the application cases as follows.

```glsl
CCProgram standard-vs %{
    ...
    #include <shading-entries/main-functions/render-to-scene/vs>
}%

CCProgram shadow-caster-vs %{
    ...
    #include <shading-entries/main-functions/render-to-shadowmap/vs>
}%

CCProgram standard-fs %{
    ...
    #include <shading-entries/main-functions/render-to-scene/fs>
}%

CCProgram shadow-caster-fs %{
    ...
    #include <shading-entries/main-functions/render-to-shadowmap/fs>
}%

CCProgram reflect-map-fs %{
    ...
    #include <shading-entries/main-functions/render-to-shadowmap/fs>
}%
```
