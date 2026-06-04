# Shader Process in Forward Rendering and Deferred Rendering

In Cocos Creator, both Forward Rendering and Deferred Rendering are supported. Therefore, the shader framework needs to be compatible with these two rendering pipelines without users having to be aware of it.

The built-in PBR shaders follow the following process during rendering.

## Forward Rendering

1. Invoke vs
2. Invoke the fs -> surf -> lighting calculations

## Deferred Rendering

### GBuffer Stage

1. Invoke vs
2. Invoke fs -> surf -> GBuffer

### Lighting Stage

1. Restore StandardSurface information from the GBuffer.
2. Perform lighting calculations.

As we can see, for PBR materials, whether it is Forward or Deferred, users can only control the vs and surf functions.

This unifies the process, allowing users to write shaders that can run in both the Forward and Deferred rendering pipelines without modification.
