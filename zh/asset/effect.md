# EffectAsset 资源

材质资源（EffectAsset）是由用户书写的着色流程描述文件，详细结构及书写指南可以参考 [Effect 语法](../material-system/effect-syntax.md)。<br>
此处主要介绍引擎读取 EffectAsset 资源的流程：<br>
在编辑器导入 EffectAsset 时，会对用户书写的内容做一次预处理，替换 GL 字符串为管线内常量，提取 shader 信息，转换 shader 版本等。

以 `builtin-unlit.effect` 为例，编译输出的 EffectAsset 结构大致如下：

```json
{
  "name": "builtin-unlit",
  "techniques": [{
    "name": "opaque",
    "passes": [{
      "program": "builtin-unlit|unlit-vs:vert|unlit-fs:frag",
      "properties": {
        "mainTexture": {
          "value": "grey",
          "type": 28
        },
        "tilingOffset": {
          "value": [1, 1, 0, 0],
          "type": 16
        },
        "mainColor": {
          "value": [1, 1, 1, 1],
          "editor": { "type": "color" },
          "type": 16
        },
        "colorScale": {
          "value": [1, 1, 1],
          "type": 15,
          "handleInfo": ["colorScaleAndCutoff", 0, 15]
        },
        "alphaThreshold": {
          "value": [0.5],
          "editor": { "parent": "USE_ALPHA_TEST" },
          "type": 13,
          "handleInfo": ["colorScaleAndCutoff", 3, 13]
        },
        "color": {
          "editor": { "visible": false },
          "type": 16, "handleInfo": ["mainColor", 0, 16]
        },
        "colorScaleAndCutoff": {
          "type": 16,
          "editor": { "visible": false, "deprecated": true },
          "value": [1, 1, 1, 0.5]
        }
      },

      "migrations": {
        "properties": {
          "mainColor": { "formerlySerializedAs": "color" }
        }
      }
    }]
  }],

  "shaders": [{
      "name": "builtin-unlit|unlit-vs:vert|unlit-fs:frag",
      "hash": 2093221684,
      "glsl4": {
        "vert": "// glsl 460 vert source, omitted here for brevity",
        "frag": "// glsl 460 frag source, omitted here for brevity",
      },
      "glsl3": {
        "vert": "// glsl 300 es vert source, omitted here for brevity",
        "frag": "// glsl 300 es frag source, omitted here for brevity",
      },
      "glsl1": {
        "vert": "// glsl 100 vert source, omitted here for brevity",
        "frag": "// glsl 100 frag source, omitted here for brevity",
      },
      "attributes": [
        { "tags": ["USE_BATCHING"], "name": "a_dyn_batch_id", "type": 13, "count": 1, "defines": ["USE_BATCHING"], "location": 1 },
        { "name": "a_position", "type": 15, "count": 1, "defines": [], "location": 0 },
        { "name": "a_weights", "type": 16, "count": 1, "defines": ["USE_SKINNING"], "location": 2 },
        { "name": "a_joints", "type": 16, "count": 1, "defines": ["USE_SKINNING"], "location": 3 },
        { "tags": ["USE_VERTEX_COLOR"], "name": "a_color", "type": 16, "count": 1, "defines": ["USE_VERTEX_COLOR"], "location": 4 },
        { "tags": ["USE_TEXTURE"], "name": "a_texCoord", "type": 14, "count": 1, "defines": ["USE_TEXTURE"], "location": 5 }
      ],
      "varyings": [
        { "name": "v_color", "type": 16, "count": 1, "defines": ["USE_VERTEX_COLOR"], "location": 0 },
        { "name": "v_uv", "type": 14, "count": 1, "defines": ["USE_TEXTURE"], "location": 1 }
      ],
      "builtins": {
        "globals": {
          "blocks": [
            { "name": "CCGlobal", "defines": [] }
          ],
          "samplers": []
        },
        "locals": {
          "blocks": [
            { "name": "CCLocalBatched", "defines": ["USE_BATCHING"] },
            { "name": "CCLocal", "defines": [] },
            { "name": "CCSkinningTexture", "defines": ["USE_SKINNING", "ANIMATION_BAKED"] },
            { "name": "CCSkinningAnimation", "defines": ["USE_SKINNING", "ANIMATION_BAKED"] },
            { "name": "CCSkinningFlexible", "defines": ["USE_SKINNING"] }
          ],
          "samplers": [
            { "name": "cc_jointsTexture", "defines": ["USE_SKINNING", "ANIMATION_BAKED"] }
          ]
        }
      },
      "defines": [
        { "name": "USE_BATCHING", "type": "boolean", "defines": [] },
        { "name": "USE_SKINNING", "type": "boolean", "defines": [] },
        { "name": "ANIMATION_BAKED", "type": "boolean", "defines": ["USE_SKINNING"] },
        { "name": "CC_SUPPORT_FLOAT_TEXTURE", "type": "boolean", "defines": ["USE_SKINNING", "ANIMATION_BAKED"] },
        { "name": "USE_VERTEX_COLOR", "type": "boolean", "defines": [] },
        { "name": "USE_TEXTURE", "type": "boolean", "defines": [] },
        { "name": "FLIP_UV", "type": "boolean", "defines": ["USE_TEXTURE"] },
        { "name": "CC_USE_HDR", "type": "boolean", "defines": [] },
        { "name": "USE_ALPHA_TEST", "type": "boolean", "defines": [] },
        { "name": "ALPHA_TEST_CHANNEL", "type": "string", "defines": ["USE_ALPHA_TEST"], "options": ["a", "r", "g", "b"] }
      ],
      "blocks": [
        {
          "name": "TexCoords",
          "defines": ["USE_TEXTURE"],
          "binding": 0,
          "members": [
            { "name": "tilingOffset", "type": 16, "count": 1 }
          ]
        },
        {
          "name": "Constant",
          "defines": [],
          "binding": 1,
          "members": [
            { "name": "mainColor", "type": 16, "count": 1 },
            { "name": "colorScaleAndCutoff", "type": 16, "count": 1 }
          ]
        }
      ],
      "samplers": [
        { "name": "mainTexture", "type": 28, "count": 1, "defines": ["USE_TEXTURE"], "binding": 30 }
      ]
    }
  ]
}
```

这里的信息量不小，但大多数时候这些细节都不需要普通开发者关心，重要的是：
- 对任意目标平台，所有着色必要的基础信息全部都在这里提前准备好，以保证跨平台和最高的运行效率。
- 同时在最后构建时会针对当前平台剔除所有冗余的信息，以保证最好的空间利用率。

## EffectAsset 创建

EffectAsset 的创建方式跟 Material 的创建方式类似。

![effect-create](material/effect-create.png)

创建出来的 EffectAsset 默认是无光照的 Unlit Effect。

![effect-show](material/effect-show.png)
