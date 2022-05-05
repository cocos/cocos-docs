# Upgrade Guide: Effect from v3.4.x to v3.5.0

## Introduction

Solve the **effect** file from v3.4.x, upgrade to v3.5.0, shadowbias does not take effect.

There are **four steps** to upgrade, please follow the following paragraphs in turn.

## Before and after version comparison

### Effect file in v3.4.x version

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
    out vec3 v_xxxx;

    // Vs execution area
    void main () {
        xxx;
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
    in vec3 v_xxxx;

    // Ps execution area
    void surf (out StandardSurface s) {
        xxx;
        ...
        xxxx;
    }
}%
```

### v3.5.0 effect file after upgrade

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
    // Step 1: The vs shader in effect adds v_Shadowbias output
    #if CC_RECEIVE_SHADOW
        out mediump vec2 v_shadowBias;
    #endif
    ...
    out vec3 v_xxxx;

    // Vs execution area
    void main () {
        xxx;
        ...
        // Step 2: Get shadowBias via CCGetShadowBias()
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
    // Step 3: Add v_Shadowbias to the ps shader in effect
    #if CC_RECEIVE_SHADOW
        in mediump vec2 v_shadowBias;
    #endif
    ...
    in vec3 v_xxxx;

    // Ps execution area
    void surf (out StandardSurface s) {
        xxx;
        ...
        // Step 4: Pass the shadowBias obtained by ps into StandardSurface
        #if CC_RECEIVE_SHADOW
            s.shadowBias = v_shadowBias;
        #endif
        ...
        xxxx;
    }
}%
```
