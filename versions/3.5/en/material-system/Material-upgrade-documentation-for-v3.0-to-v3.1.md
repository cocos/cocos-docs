# Cocos Creator 3.1 Material Upgrade Guide

> This article will detail the considerations for upgrading Cocos Creator 3.0 materials to v3.1.

## 1. Shader upgrades and changes

### 1.1 Built-in header file changes

The standard shader header `shading-standard` from v3.0 has become `standard-surface-entry` from v3.1, making the effect compatible with both the forward render pipeline and the deferred render pipeline.

The `cc-fog` header file from v3.0 is now `cc-fog-vs/fs` from v3.1, split into vertex shader and fragment shader versions.

### 1.2 Vertex shaders

- `gl_Position`

    The main function name of `VS` in v3.1 has been changed from `vert` to `main`, and a new macro `gl_Position` has been added to assign a value to the return value.

    ```c
    CCProgram standard-vs %{
        precision highp float;  

        // Include your headfile

        #include <cc-fog-vs> // Note the change in the header file name here
    
        // Fill in your data here

        void main () {
        
            // Fill in your data here

            gl_Position = fill in your data result;
        }
    }%
    ```

### 1.3 Fragment shaders

- `CC_STANDARD_SURFACE_ENTRY()`

    Load the standard shader header file `standard-surface-entry` and use the v3.1 standard shader output function `CC_STANDARD_SURFACE_ENTRY()` to replace the original v3.0 shader output function `frag()`.

    ```c
    CCProgram standard-fs %{
  
        // Include your headfile
   
        #include <cc-fog-fs> // Note the change in the header file name here
        #include <standard-surface-entry> // Note the change in the name of the standard shader header file here

        // Fill in your data here

        void surf (out StandardSurface s) {
 
            // Fill in your data here

        }
        CC_STANDARD_SURFACE_ENTRY() // Standard shader output function
    }%
    ```

## 2. Deferred Render Pipeline

### 2.1 Deferred Render Pipeline

The biggest difference between v3.1 and v3.0 is that v3.1 supports the [deferred render pipeline](../render-pipeline/builtin-pipeline.md). The engine comes with a standard `standard-surface-entry` header file that supports both the forward render pipeline and the deferred render pipeline, which is used as follows:

```c
CCEffect %{
    techniques:

    // Fill in your data here

        - &deferred
        vert: // your Vertex shader
        frag: // your Fragment shader
        phase: deferred
        propertyIndex: 0
        blendState:
            targets: // turn off blending
            - blend: false
            - blend: false
            - blend: false
            - blend: false
            properties: // your properties name

    // Fill in your data here
            
}%

// fill in your data here

CCProgram standard-fs %{
    precision highp float;
    #include <cc-global>
    #include <shared-ubos>
    #include <cc-fog-fs> // Note the change in the header file name here.
    #include <standard-surface-entry> // Note the change in the name of the standard shader header file here

    // Fill in your data here
    void surf (out StandardSurface s) {

        // Fill in your data here

    }
    CC_STANDARD_SURFACE_ENTRY() // Standard shader output function
}%

// fill in your data here

```

### 2.2 Render pipeline determination

The header file `standard-surface-entry` determines which render pipeline is selected, and the lighting calculation is in the file `shading-standard-additive`.

If it is a deferred render pipeline, the `deferred-lighting` effect file is called first, followed by the light calculation file `shading-standard-additive`.

```c
#define CC_STANDARD_SURFACE_ENTRY()                                 
#if CC_FORWARD_ADD                                                 
  #include <shading-standard-additive>

  // Fill in your data here

#elif CC_PIPELINE_TYPE == CC_PIPELINE_TYPE_FORWARD  // Determine if it is the forward render pipeline
 
  // Fill in your data here
   
#elif CC_PIPELINE_TYPE == CC_PIPELINE_TYPE_DEFERRED  // Determine if it is the deferred render pipeline
       
 // Fill in your data here

#endif
```

## 3. Parameter transfer upgrade

The macro for passing shadow parameters from vertex shaders to fragment shaders was originally `CCPassShadowParams` in v3.0, but was changed to `CC_TRANSFER_SHADOW` in v3.1.

The v3.1 vertex shader transfers `FOG` parameters to the fragment shader, using the `CC_TRANSFER_FOG` macro directly.

Version comparison:

- v3.0

    ```c
    v_fog_factor = CC_TRANSFER_FOG(pos);
    CCPassShadowParams(pos);  
    ```

- v3.1

    ```c
    CC_TRANSFER_FOG(pos);
    CC_TRANSFER_SHADOW(pos);
    ```
