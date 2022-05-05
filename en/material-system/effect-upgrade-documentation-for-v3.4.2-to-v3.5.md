# upgrade effect

Solve the **effect** file from v3.4.x, upgrade to v3.5.0, shadowbias does not take effect.

There are **four steps** to upgrade, please follow the following paragraphs in turn.

> **Note**：The code is referenced directly when you see `//Copy Start` and is a complete upgrade step by the time you see `//Copy End`. Paragraph locations are given, the following code is pseudo-code except for the upgrade code.

```c
CCProgram standard-vs %{
    // Header file area
    #include <cc-xxx>
    ...
    #include <cc-xxxx>

    // Vs output area
    out vec3 v_xxx;
    ...
    // Step 1: The vs shader in effect adds v_Shadowbias output
    // Copy Start
    #if CC_RECEIVE_SHADOW
        out mediump vec2 v_shadowBias;
    #endif
    // Copy End
    ...
    out vec3 v_xxxx;

    // Vs execution area
    void main () {
        xxx;
        ...
        // Step 2: Get shadowBias via CCGetShadowBias()
        // Copy Start
        #if CC_RECEIVE_SHADOW
            v_shadowBias = CCGetShadowBias();
        #endif
        // Copy End
        ...
        xxxx;
    }
}%

CCProgram standard-fs %{
    // Header file area
    #include <cc-xxx>
    ...
    #include <cc-xxxx>

    // Vs output area
    in vec3 v_xxx;
    ...
    // Step 3: Add v_Shadowbias to the ps shader in effect
    // Copy Start
    #if CC_RECEIVE_SHADOW
        in mediump vec2 v_shadowBias;
    #endif
    // Copy End
    ...
    in vec3 v_xxxx;

    // Ps execution area
    void surf (out StandardSurface s) {
        xxx;
        ...
        // Step 4: Pass the shadowBias obtained by ps into StandardSurface
        // Copy Start
        #if CC_RECEIVE_SHADOW
            s.shadowBias = v_shadowBias;
        #endif
        // Copy End
        ...
        xxxx;
    }
}%
```
