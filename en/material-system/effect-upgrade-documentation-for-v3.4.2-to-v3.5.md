# Upgrade Guide: Effect from v3.4.x to v3.5.0

## Introduction

Solve the **effect** file from v3.4.x, upgrade to v3.5.0, shadowbias does not take effect.

> **Note**: If no shadows are used, or if **CC_TRANSFER_SHADOW(pos)** is not calculated, **ignore** the material upgrade.

There are **four steps** to upgrade, please follow the following paragraphs in turn.

## Before and after version comparison

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

    1. vs out varying define
    // v3.4.x

    // v3.5.0
    #if CC_RECEIVE_SHADOW
        out mediump vec2 v_shadowBias;
    #endif

    ...
    out vec3 v_xxxx;

    // Vs execution area
    void main () {
        xxx;
        ...

        2. get vs shadow bias
        // v3.4.x

        // v3.5.0
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

    3. fs in varying define
    // v3.4.x

    // v3.5.0
    #if CC_RECEIVE_SHADOW
        in mediump vec2 v_shadowBias;
    #endif

    ...
    in vec3 v_xxxx;

    // Ps execution area
    void surf (out StandardSurface s) {
        xxx;
        ...

        4. fs shadow bias assignment
        // v3.4.x

        // v3.5.0
        #if CC_RECEIVE_SHADOW
            s.shadowBias = v_shadowBias;
        #endif

        ...
        xxxx;
    }
}%
```
