# Upgrade Guide: Effect from v3.4.x to v3.5.0

## Macro tags and functional macros

The effect syntax for Macro Tags and Functional Macros have been upgraded to avoid the occupation of standard glsl define, old effects in project will be upgrade automatically, but if you are using external effects without meta or writing a new one, you have to pay attention.

- New syntax for Macro Tag: `#pragma define-meta`
- New syntax for Funtional Macro: `#pragma define`

You can refer to [Effect Syntax - macro-tags](../shader/macros.md#macro-tags) for detailed information.

## Model level shadow bias

In v3.5, we supported individual shadow bias configuration for models, this allows detailed control of shadow effect on simple or complex surfaces. If you have any customized effect, you may need to upgrade them for shadow bias configuration to take effect.

> **Note**: If shadow map of lights are disabled, or if `CC_TRANSFER_SHADOW(pos)` is not invoked in your vertex shader, then you won't need to upgrade it.

### Upgrade instructions

There are **four elements** to add to your effect file, they are listed below:

1. Output varying define in the vertex shader

    ```
    #if CC_RECEIVE_SHADOW
        out mediump vec2 v_shadowBias;
    #endif
    ```

2. Calculation of shadow bias in the vertex shader

    ```
    #if CC_RECEIVE_SHADOW
        v_shadowBias = CCGetShadowBias();
    #endif
    ```

3. Input varying define in the fragment shader

    ```
    #if CC_RECEIVE_SHADOW
        in mediump vec2 v_shadowBias;
    #endif
    ```

4. Shadow bias assignment in the fragment shader

    ```
    #if CC_RECEIVE_SHADOW
        s.shadowBias = v_shadowBias;
    #endif
    ```

### Example (code snippets)

```c
// Vertex shader
CCProgram xxx-vs %{
    // Header file area
    #include <cc-xxx>
    ...
    #include <cc-xxxx>

    // Vs output area
    out vec3 v_xxx;
    ...

    #if CC_RECEIVE_SHADOW
        out mediump vec2 v_shadowBias;
    #endif

    ...
    out vec3 v_xxxx;

    // Vs execution area
    void main () {
        xxx;
        ...

        #if CC_RECEIVE_SHADOW
            v_shadowBias = CCGetShadowBias();
        #endif

        ...
        xxxx;
    }
}%

// Pixel shader
CCProgram xxx-fs %{
    // Header file area
    #include <cc-xxx>
    ...
    #include <cc-xxxx>

    // Vs output area
    in vec3 v_xxx;
    ...

    #if CC_RECEIVE_SHADOW
        in mediump vec2 v_shadowBias;
    #endif

    ...
    in vec3 v_xxxx;

    // Ps execution area
    void surf (out StandardSurface s) {
        xxx;
        ...

        #if CC_RECEIVE_SHADOW
            s.shadowBias = v_shadowBias;
        #endif

        ...
        xxxx;
    }
}%
```
