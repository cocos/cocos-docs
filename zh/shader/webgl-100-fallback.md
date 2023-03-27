# WebGL 1.0 向下兼容支持

由于 WebGL 1.0 仅支持 GLSL 100 标准语法，因此在 Cocos Shader 编译时会提供 GLSL 300 ES 转 GLSL 100 的向下兼容代码（fallback shader），开发者基本不需关心这层变化。

需要注意的是目前的自动向下兼容策略仅支持一些基本的格式转换，如果使用了 GLSL 300 ES 独有的函数（例如 `texelFetch`、`textureGrad`）或一些特有的扩展（`extensions`），推荐根据 `__VERSION__` 宏定义判断 GLSL 版本，自行实现更稳定精确的向下兼容，代码示例如下：

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

Cocos Shader 在编译时会解析所有已经是常量的宏控制流，生成不同版本的 GLSL Shader 代码。
