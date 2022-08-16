# Upgrade Guide: Effect from v3.5.x to v3.6.0

## Chunks migration

v3.6.0 stores the chunk files from the chunks folder of the previous version into subfolders, please refer to the following table when writing #include for chunk.

### 1. Public function libraries

| Origin Path          | New Path                         |
| -------------------- | -------------------------------- |
| common               | common/common-define             |
| texture-lod          | common/texture/texture-lod       |
| packing              | common/data/packing              |
| unpack               | common/data/unpack               |
| aces                 | common/color/aces                |
| gamma                | common/color/gamma               |
| octahedron-transform | common/math/octahedron-transform |
| transform            | common/math/transform            |
| rect-area-light      | common/lighting/rect-area-light  |

### 2. Uniform define

| Origin Path      | New Path                          |
| ---------------- | --------------------------------- |
| cc-global        | builtin/uniforms/cc-global        |
| cc-local         | builtin/uniforms/cc-local         |
| cc-forward-light | builtin/uniforms/cc-forward-light |
| cc-environment   | builtin/uniforms/cc-environment   |
| cc-diffusemap    | builtin/uniforms/cc-diffusemap    |
| cc-shadow        | builtin/uniforms/cc-shadow        |
| cc-world-bound   | builtin/uniforms/cc-world-bound   |

### 3. Common shader main-functions for legacy shader

| Origin Path | New Path                         |
| ----------- | -------------------------------- |
| outline-vs  | legacy/main-functions/outline-vs |
| outline-fs  | legacy/main-functions/outline-fs |
| general-vs  | legacy/main-functions/general-vs |

### 4. Engine functionality and miscellaneous for legacy shader

| Origin Path               | New Path                         |
| ------------------------- | -------------------------------- |
| cc-fog-base               | legacy/fog-base                  |
| cc-shadow-map-base        | legacy/shadow-map-base           |
| morph                     | legacy/morph                     |
| cc-skinning               | legacy/skinning                  |
| cc-local-batch            | legacy/local-batch               |
| lighting                  | legacy/lighting                  |
| lightingmap-fs            | legacy/lightingmap-fs            |
| cc-shadow-map-vs          | legacy/shadow-map-vs             |
| cc-shadow-map-fs          | legacy/shadow-map-fs             |
| cc-fog-vs                 | legacy/fog-vs                    |
| cc-fog-fs                 | legacy/fog-fs                    |
| lightingmap-vs            | legacy/lightingmap-vs            |
| decode                    | legacy/decode                    |
| decode-base               | legacy/decode-base               |
| decode-standard           | legacy/decode-standard           |
| input                     | legacy/input                     |
| input-standard            | legacy/input-standard            |
| output                    | legacy/output                    |
| output-standard           | legacy/output-standard           |
| shading-standard          | legacy/shading-standard          |
| shading-standard-base     | legacy/shading-standard-base     |
| shading-standard-additive | legacy/shading-standard-additive |
| shading-cluster-additive  | legacy/shading-cluster-additive  |
| shading-toon              | legacy/shading-toon              |
| standard-surface-entry    | legacy/standard-surface-entry    |

### 5. For internal use only

| Origin Path       | New Path                         |
| ----------------- | -------------------------------- |
| alpha-test        | builtin/internal/alpha-test      |
| cc-sprite-common  | builtin/internal/sprite-common   |
| cc-sprite-texture | builtin/internal/sprite-texture  |
| embedded-alpha    | builtin/internal/embedded-alpha  |
| particle-common   | builtin/internal/particle-common |

