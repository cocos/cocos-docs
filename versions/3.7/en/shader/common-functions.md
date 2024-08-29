# Common Functions

You can find these functions in the **Assets/internal/chunks/common/** directory.

These functions do not depend on any internal data and can be used directly as utility functions.

## How to use

```ts
#include <common/color/aces>
#include <common/data/packing>
```

## Directory Usage Description

| Directory | Usage                               | Main Files
| -------- | ---------------------------------------- | ----
| color    | Color-related functions (color space,tone-mapping, etc) | aces, gamma
| data     | Data-related functions(compression, decompression, etc)  | packing, unpack
| debug    | Functions related to Debug View                     |
| effect   | Scene effect related functions(water,fog,etc)  | fog
| lighting | Lighting-related functions(bxdf,reflection,attenuation,baking,etc) | brdf, bxdf, light-map
| math     | Math lib(coordinates transformations,numerical determination, calculations, etc)   | coordinates, transform
| mesh     | Mesh-related functions(mesh,material conversion,animations,etc)     | material, vat-animation
| shadow   | Shadow-related functions(PCF,PCSS,etc) | native-pcf
| texture  | Texture-related functions(sampling,mipmap calculations,etc)  | cubemap, texture-lod

> The Surface Shader already automatically includes the commonly used public function header files internally, so there is no need to include them again.