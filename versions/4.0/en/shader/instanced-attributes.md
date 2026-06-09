# Instanced Attributes

The GPU Instancing feature allows for GPU instancing of render objects with the same mesh and material. If we want to modify the visual effect for one of the instanced objects without breaking this feature, we need to add instanced attributes.

Let's take adding a color property as an example.

## Add Attribute

GPU Instancing need to add new attributes and they should be placed within the `USE_INSTANCING` macro to avoid compilation errors.

```glsl
#if USE_INSTANCING // when instancing is enabled
  #pragma format(RGBA8) // normalized unsigned byte
  in vec4 a_instanced_color;
#endif
```

## Passing to FS

The instanced attributes are vertex attributes and can only be accessed in the vertex shader, and the `a_instanced_color` is only used to modify the object's color in the fragment shader. Therefore, we need to declare an `out` variable in the vertex shader that will be used to pass attributes to the fragment shader. Here's an example of the code.

```glsl
CCProgram vs %{
  #if USE_INSTANCING
    out vec4 instancedColor;
  #endif

  vec4 vert(){
      ...
      #if USE_INSTANCING
        instancedColor = a_instanced_color;
      #endif
      ...
  }
}%
```

## Access in FS

To achieve the desired functionality, declare the corresponding `in` variable in the fragment shader to retrieve the value passed from the vertex shader.

```glsl
CCProgram fs %{
  #if USE_INSTANCING
    in vec4 instancedColor;
  #endif

  vec4 frag(){
      ...
      vec4 o = mainColor;
      #if USE_INSTANCING
        o *= instancedColor;
      #endif
      ...
  }
}%
```

## Set Instanced Attribute in Script

Instanced Attributes belong to specific instances of render objects and cannot be set through the material panel. Instead, they can be set using the `setInstancedAttribute` method on the `MeshRenderer` component. Here's an example of the code.

```ts
const comp = node.getComponent(MeshRenderer);
comp.setInstancedAttribute('a_instanced_color', [100, 150, 200, 255]);
```

## Notes

Here are a few points to keep in mind.
1. `#pragma format(RGBA8)`  is use to specify the specific data format of the property. The parameter can be any enumeration name from the engine's `GFXFormat`[^1]. If not specified, it defaults to the RGBA32F type.

2. All instanced attributes are input through the vertex attributes. If you want to use them in the fragment shader, you need to pass them to the fragment shader from vertex shader using the varying variables(`in`,`out`).

3. Ensure that your code can execute correctly in all branches, regardless of whether the `USE_INSTANCING` is enabled.

4. The values of instanced attributes are initialized to 0 when engine starts.

5. If the material has been changed on **MeshRenderer**, all values of instanced attributes will be reset and need to be set again.

[^1]: Integer attributes are not supported on WebGL-1.0-only platforms. If your project needs to be published on these platforms, always use the floating-point type.
