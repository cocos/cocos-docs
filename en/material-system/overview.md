# Material System Overview

## Material System Upgrade Guide

Cocos Creator has supported the material system since v2.x. In v3.0, the design and built-in Shader API of the material system continues to be improved. When upgrading from v2.x to v3.0 and later versions, some of the content may still need to be adjusted manually by the developer, please refer to the upgrade guide below:

- [v3.0 Material Upgrade Guide](./effect-2.x-to-3.0.md)
- [v3.1 Material Upgrade Guide](./Material-upgrade-documentation-for-v3.0-to-v3.1.md)

## Material System Class Diagram

The material system plays an essential role in any game engine infrastructure, it controls the way everything is drawn on screen and much more.

The general structure of the system is as follows:

[![Assets](material.png "Click to view diagram source")](material.dot)

## EffectAsset

`EffectAsset` is a shading procedure description file, written by both engine and game developers. It contains the mathematical calculations and algorithms for calculating the color of each pixel rendered.<br>
When the [builtin effects](#builtins) are not the best fit for your need, writing your own effect can give you all the capabilities to customize the rendering process.

Detailed syntax instructions can be found in the [Effect Syntax](effect-syntax.md) documentation.

Here is the flow that the engine reads EffectAsset resource: when the editor imports EffectAsset, the engine will do a pre-processing on your written content, then replace GL string as constant in the pipeline, extract shader information, convert shader version and so on.

Using `builtin-unlit.effect` as an example, the structure of the compiled output EffectAsset is roughly as follows:

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

There is a lot to unpack here, but for the most part the details won't be of any concern to game developers, and the key insight you need to remember is:
- All the necessary info for runtime shading procedure setup on any target platform (and even editor support) is here in advance to guarantee portability and performance.
- Redundant info will be trimmed at build-time to ensure minimum space consumption.

## Material

`Material` defines how a surface should be rendered, by including references to textures it uses, tiling information, color tints and more.

The available options for a `Material` depend on which `EffectAsset` it is using. Essential parameters for setting up a `Material` object are:
- **effectAsset** or **effectName**: Effect reference, specifying which `EffectAsset` will be used (must specify).
- **technique**: Inside the `EffectAsset`, specifying which technique will be used, default to 0.
- **defines**: The list of macros, specify what value the shader macros have (for shader variants), default all to 0 (disabled), or in-shader specified default value.
- **states**: If any, specifying which pipeline state to override (default to nothing, keep everything the same as how they are specified in effect)

```ts
const mat = new Material();
mat.initialize({
  effectName: 'pipeline/skybox',
  defines: { USE_RGBE_CUBEMAP: true }
});
```

With this information, the `Material` can be properly initialized, indicated by the generation of an array of Pass objects for rendering, which can be used for rendering specific models.

Knowing which `EffectAsset` is currently using, we can specify all the shader properties:

```ts
mat.setProperty('cubeMap', someCubeMap);
console.log(mat.getProperty('cubeMap') === someCubeMap); // true
```

These properties are assigned inside the material, which is just an asset by itself, and hasn't connected to any model.

To apply the material on a specific model, it needs to be attached to a `RenderableComponent`. Any component that accepts a material parameter (MeshRenderer, SkinnedMeshRenderer, etc.) is inherited from it.

```ts
const comp = someNode.getComponent(MeshRenderer);
comp.material = mat;
comp.setMaterial(mat, 0); // same as last line
```

According to the number of sub-models, `RenderableComponent` may reference multiple `Material`:

```ts
comp.setMaterial(someOtherMaterial, 1); // assign to second sub-model
```

The same `Material` can be attached to multiple `RenderableComponent` too:

```ts
const comp2 = someNode2.getComponent(MeshRenderer);
comp2.material = mat; // the same material above
```

When one of the material-sharing models needs to customize some property, you need to get a copied instance of the material asset, aka. `MaterialInstance`, from the `RenderableComponent`, by calling:

```ts
const mat2 = comp2.material; // copy constructor, now 'mat2' is an 'MaterialInstance', and every change made to `mat2` only affect the 'comp2' instance
```

The biggest difference between `Material` asset and `MaterialInstance` is: `MaterialInstance` is definitively attached to one `RenderableComponent` at the beginning of its life cycle, while `Material` has no such limit.

For `MaterialInstance`s it is possible to modify shader macros or pipeline states:

```ts
mat2.recompileShaders({ USE_EMISSIVE: true });
mat2.overridePipelineStates({ rasterizerState: { cullMode: GFXCullMode.NONE } });
```

Updating shader properties every frame is a common practice, under situations like this, where performance matters, use lower level APIs:

```ts
// Save these when starting
const pass = mat2.passes[0];
const hColor = pass.getHandle('albedo');
const color = new Color('#dadada');

// inside update function
color.a = Math.sin(director.getTotalFrames() * 0.01) * 127 + 127;
pass.setUniform(hColor, color);
```

And for any other changes (different effect, technique, etc.) you have to create a new material from scratch and assign it to the target `RenderableComponent`.

## Built-in materials

Although the material system itself doesn't make any assumptions on the content, there are some built-in effects written on top of the system, provided for common usage: **unlit**, **physically-based** (standard), **skybox**, **particle**, **sprite**, etc.

For a quick reference, here is how each shading term in `builtin-standard` will be assembled from input data:

![Standard](standard-material-graph.png)

Here are the complete list of properties and macros for it:

| Property | Info |
| :------- | :--- |
| tilingOffset | tiling and offset of the model UV, `xy` channel for tiling, `zw` channel for offset |
| albedo/mainColor | albedo color, the main base color of the model |
| albedoMap/mainTexture | albedo texture, if present, will be multiplied by the `albedo` property |
| albedoScale | albedo scaling factor<br>weighting the whole albedo factor before the final output |
| alphaThreshold | test threshold for discarding pixels, any pixel with target channel value lower than this threshold will be discarded |
| normalMap | normal map texture, enhancing surface details |
| normalStrenth | strenth of the normal map, the bigger the bumpier |
| pbrMap<br>**R** (AO)<br>**G** (Roughness)<br>**B** (Metallic) | PBR parameter all-in-one texture: occlusion, roughness and metallic<br>sample result will be multiplied by the matching constants |
| metallicRoughnessMap<br>**G** (Roughness)<br>**B** (Metallic) | metallic and roughness texture<br>sample result will be multiplied by the matching constants |
| occlusionMap | independent occlusion texture<br>sample result will be multiplied by the matching constants |
| occlusion | occlusion constant |
| roughness | roughness constant |
| metallic | metallic constant |
| emissive | emissive color<br> |
| emissiveMap | emissive color texture, if present, will be multiplied by the `emissive` property,<br>so remember to set `emissive` property more close to white<br>(default black) for this to take effect |
| emissiveScale | emissive scaling factor<br>weighting the whole emissive factor before the final output |

Accordingly, these are the available macros:

| Macro | Info |
| :---- | :--- |
| USE_BATCHING | Whether to enable dynamic VB-merging-style batching |
| USE_INSTANCING | Whether to enable dynamic instancing* |
| HAS_SECOND_UV | Whether there is a second set of UV |
| ALBEDO_UV | Specifies the uv set to use when sampling albedo texture, default to the first set |
| EMISSIVE_UV | Specifies the uv set to use when sampling emissive texture, default to the first set |
| ALPHA_TEST_CHANNEL | Specifies the source channel for alpha test, default to A channel |
| USE_VERTEX_COLOR | If enabled, vertex color will be multiplied to albedo factor |
| USE_ALPHA_TEST | Whether to enable alpha test |
| USE_ALBEDO_MAP | Whether to enable albedo texture |
| USE_NORMAL_MAP | Whether to enable normal map |
| USE_PBR_MAP | Whether to enable PBR parameter 3-in-1 texture<br>As per the glTF spec, the RGB channels must correspond to occlusion, roughness and metallicity respectively |
| USE_METALLIC_ROUGHNESS_MAP | Whether to enable metallic-roughness texture<br>As per the glTF spec, the GB channels must correspond to roughness and metallicity respectively |
| USE_OCCLUSION_MAP | Whether to enable occlusion texture<br>Only the **red** channel will be used, as per glTF spec |
| USE_EMISSIVE_MAP | Whether to enable emissive texture |

> *Note: Instancing should only be enabled when there will be many instances of the same model in the scene. Careful usages can lead to better performance, but over populate the materials with this flag will have performace penalties.
