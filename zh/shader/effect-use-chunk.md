# 编写着色器片段

## 创建新的着色器片段

在 Asset 目录点击右键，选择 创建->着色器片段（ Chunk ） 

![](img/create-chunk.png)

创建后，引擎会根据片段模板生成：

```glsl
// you can write GLSL code directly in here

#include <cc-global>

#define iResolution cc_screenSize
#define iTime cc_time.x
#define iTimeDelta cc_time.y
#define iFrame cc_time.z

// shadertoy template
void mainImage (out vec4 fragColor, in vec2 fragCoord) {
  // Normalized pixel coordinates (from 0 to 1)
  vec2 uv = fragCoord / iResolution.xy;
  // Time varying pixel color
  vec3 col = 0.5 + 0.5 * cos(iTime + uv.xyx + vec3(0, 2, 4));
  // Output to screen
  fragColor = vec4(col, 1.0);
}
```

书写和包含着色器片段请参考：[着色器片段（Chunk）](effect-chunk-index.md)

<!-- 

## 包含着色器片段

## 书写着色器片段

-->


