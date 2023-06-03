# UBO Layout

Cocos Shader specifies that all non-sampler type uniforms should be declared in the form of UBO (Uniform Buffer Object/Uniform Block).

Taking the `builtin-standard.effect` as an example, it's uniform block declaration is as follows.

```glsl
uniform Constants {
    vec4 tilingOffset;
    vec4 albedo;
    vec4 albedoScaleAndCutoff;
    vec4 pbrParams;
    vec4 miscParams;
    vec4 emissive;
    vec4 emissiveScaleParam;
  };
```

And all UBOs should follow to the following rules.
1. Should no `vec3` members
2. For array type members, the size of each element should not be smaller than `vec4`
3. The declaration oder of members should not produce any padding.

During compilation, the Cocos Shader compiler checks these rules to provide timely reminders in case of implicit padding errors.

This may sound overly strict, but there are practical considerations behind it.

First, UBOs are the only fundamental unit for efficient data reuse within the rendering pipeline, and separate declarations are no longer an good option.

Second, UBOs in WebGL 2.0 only support the std140 layout, which follows a set of strict padding rules.[^1]

- All vec3 members ar padded to `vec4`

  ```glsl
  uniform ControversialType {
    vec3 v3_1; // offset 0, length 16 [IMPLICIT PADDING!]
  }; // total of 16 bytes
  ```

- Arrays and structures with lengths smaller than `vec4` are padded to `vec4`.

  ```glsl
  uniform ProblematicArrays {
    float f4_1[4]; // offset 0, stride 16, length 64 [IMPLICIT PADDING!]
  }; // total of 64 bytes
  ```

- The actual offsets of all members within the UBO are aligned to the number of bytes they occupy.[^2]

  ```glsl
  uniform IncorrectUBOOrder {
    float f1_1; // offset 0, length 4 (aligned to 4 bytes)
    vec2 v2; // offset 8, length 8 (aligned to 8 bytes) [IMPLICIT PADDING!]
    float f1_2; // offset 16, length 4 (aligned to 4 bytes)
  }; // total of 32 bytes

  uniform CorrectUBOOrder {
    float f1_1; // offset 0, length 4 (aligned to 4 bytes)
    float f1_2; // offset 4, length 4 (aligned to 4 bytes)
    vec2 v2; // offset 8, length 8 (aligned to 8 bytes)
  }; // total of 16 bytes
  ```

This results in a significant waste of space, and the graphics driver on certain devices may not fully comply with this standard[^3]. Therefore, Cocos Shader currently chooses a set of strict rules to help eliminate some very subtle runtime issues.

> **Note**: Through the [Property Target](pass-parameter-list.md#Properties) mechanism, you can independently edit the specific components off any uniform. The types of uniforms do not need to directly correspond to the display in the Inspector panel or the code for assigning runtime parameters.

[^1]: [OpenGL 4.5, Section 7.6.2.2, page 137](http://www.opengl.org/registry/doc/glspec45.core.pdf#page=159)

[^2]: Please note that in the example code, the total length of UBO IncorrectUBOOrder is 32 bytes. However, in reality, the actual data is still platform-dependent even today. This discrepancy appears to be due to an oversight in the GLSL standard. For more detailed discussions on this topic, you can refer to [this link](https://bugs.chromium.org/p/chromium/issues/detail?id=988988)。

[^3]: **Interface Block - OpenGL Wiki**：<https://www.khronos.org/opengl/wiki/Interface_Block_(GLSL)#Memory_layout>
