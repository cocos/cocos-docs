# Guide to Built-in Legacy Shaders

The shader code related to Legacy Shader is located in two folders.
- internal/chunks/legacy/
- internal/effects/legacy/

In the `chunks/legacy/` folder, there are some common functions, such as decode, fog, input, output, shadows, skeletal skinning, and so on.

Both Legacy Shader and Surface Shader will call functions provided in `internal/chunks/builtin/` and `internal/chunks/common/`.

In the `effects/legacy/` folder, there are three built-in Legacy Shaders:

- standard: for standard PBR
- terrain: for terrain
- toon: for cartoon rendering

## Basic Structure

The code of Legacy Shader is usually composed of several parts:
- `CCEffect`: Describes the techniques, passes, shader entries, rendering states, properties, etc.
- `Shared UBOs`: Used to define uniforms that are needed by both vs and fs together for easy access.
- `Shader Body`: Used to implement the shader code

The CCEffect and Shared UBOs in Legacy Shaders are consistent with that in Surface Shaders, For more details, please go to [Guide to Built-in Surface Shader](../surface-shader/builtin-surface-shader.md).

## Shader Functions

For a better understanding of the rendering process, please first check to [Understand the Render Flow of Forward Rendering and Deferred Rendering](./../forward-and-deferred.md)。

### standard(PBR)

In the legacy/standard.effect file, we can see the shader code.

```ts
CCProgram standard-vs %{
    //...
    void main(){
        StandardVertInput In;
        CCVertInput(In);
        //...
        gl_Position = cc_matProj * (cc_matView * matWorld) * In.position;
    }
}%

CCProgram standard-fs %{
    //...
    void surf(out StandardSurface s){
        //s.albedo = ...
        //s.occlusion = ...
        //s.roughness = ...
        //s.metallic = ...
        //s.specularIntensity = ...
        //s.normal = ...
    }
    CC_STANDARD_SURFACE_ENTRY()
}%
```

You can see that in the vertex shader, the main function is directly used as the entry point, while in the fragment shader, there is only a surf function.

This is because after expanding the `CC_STANDARD_SURFACE_ENTRY`, it becomes the main function, and this main function will call the surf function.

### terrain

The terrain uses StandardSurface as the material surface data structure and `CC_STANDARD_SURFACE_ENTRY` as the entry point. This indicates that the rendering process and lighting calculations of the terrain are completely the same as standard.

However, because the terrain uses a multi-textures blend, the textures used by the terrain and the code of the surf function are significantly different from the standard.

### toon

In legacy/toon.effect, we can see.

```ts
CCProgram toon-vs %{
    //...
    void main(){
        StandardVertInput In;
        CCVertInput(In);
        //...
        gl_Position = cc_matProj * (cc_matView * matWorld) * In.position;
    }
}%

CCProgram toon-fs %{
    //...
    void surf(out ToonSurface s){
        //s.baseStep = ...
        //s.baseFeather = ...
        //s.shadeStep = ...
        //s.shadeFeather = ...
        //s.shadowCover = ...
    }

    void frag(){
        ToonSurface s; surf(s);
        vec4 color = CCToonShading(s);
        return CCFragOutput(color);
    }
}%
```

The biggest feature of toon is that it defines an additional outline pass in the CCEffect section, and the code of the outline pass is located in chunks/legacy/main-functions/outline-vs(fs).

The structure of surface material data is **ToonSurface**, which is different from the one used by the standard. In the frag function, you can see that the lighting calculation of the toon uses a special **CCToonShading**.

Moreover, toon defines its own frag entry function and does not use the `CC_STANDARD_SURFACE_ENTRY` macro. This means that toon does not support the deferred rendering pipeline.

### shadow-caster

You can see that the standard, terrain, and toon all have code fragments related to shadows.

```ts
CCProgram shadow-caster-vs %{
    //...
}%

CCProgram shadow-caster-fs %{
    //...
}%
```

This set of vs/fs is used for shadow map generation. During the shadow stage, the engine rendering pipeline will search for objects which have the pass with the phase of 'shadow-add' to draw.
