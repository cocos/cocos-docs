# WebGL 1.0 Fallback Compatibility

Due to only GLSL 100 is supported in WebGL 1.0, shaders written in higher GLSL versions won't work well with it. Cocos Shader provides fallback code that converts GLSL 300 ES to GLSL 100 during compilation. Therefore, developers don't need to worry about this layer of transformation. 

It's important to note that the current automatic fallback compatibility strategy only supports basic format conversions. If you use features only supported by GLSL 300 ES-specific functions (such as `texelFetch`, `textureGrad`) or some specific extensions, it is recommended to use the `__VERSION__` macro to check the GLSL version and write different code snippets for different GLSL versions.

Here's an example of the code.

```glsl
#if __VERSION__ < 300
#ifdef GL_EXT_shader_texture_lod
  vec4 color = textureCubeLodEXT(envmap, R, roughness);
#else
  vec4 color = textureCube(envmap, R);
#endif
#else
  vec4 color = textureLod(envmap, R, roughness);
#endif
```

> **Note**: During compilation, the Cocos Shader compiler will analyze all constant macros and generate multiple versions of shaders.
