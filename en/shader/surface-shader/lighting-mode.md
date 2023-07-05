# Lighting Models

The lighting models are used to describe how the surface of an object affects and interacts with light.

The currently supported lighting models are as follows.

| Light Model Name | Description                                                         |
| ------------ | ------------------------------------------------------------ |
| standard     | PBR lighting, supporting GGX BRDF distribution of isotropic and anisotropic lighting, supporting convoluted ambient lighting. |
| toon         | Simple cartoon lighting, step-like lighting effect.               |

The built-in shader functions related to the lighting models are placed in the internal/chunks/lighting-models/includes/ folder, During the [Surface Shader Assembly](./shader-assembly.md) phase, using `include` to import the corresponding code, the lighting calculation can be completed.
