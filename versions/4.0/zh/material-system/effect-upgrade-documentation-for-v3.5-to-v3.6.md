# 升级指南：Effect 从 v3.5.x 升级到 v3.6.0

## Chunks 迁移

3.6.0将之前版本 chunks 文件夹中的零散文件分门别类的存放到子文件夹中，书写 chunk 的 #include 时请参考下面的表格：

### 1、公共函数库

| 原文件               | 新路径                           |
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

### 2、Uniform 定义

| 原文件           | 新路径                            |
| ---------------- | --------------------------------- |
| cc-global        | builtin/uniforms/cc-global        |
| cc-local         | builtin/uniforms/cc-local         |
| cc-forward-light | builtin/uniforms/cc-forward-light |
| cc-environment   | builtin/uniforms/cc-environment   |
| cc-diffusemap    | builtin/uniforms/cc-diffusemap    |
| cc-shadow        | builtin/uniforms/cc-shadow        |
| cc-world-bound   | builtin/uniforms/cc-world-bound   |

### 3、通用 Shader 主函数（仅限 legacy shader）

| 原文件     | 新路径                           |
| ---------- | -------------------------------- |
| outline-vs | legacy/main-functions/outline-vs |
| outline-fs | legacy/main-functions/outline-fs |
| general-vs | legacy/main-functions/general-vs |

### 4、引擎功能模块及其他（仅限 legacy shader）

| 原文件                    | 新路径                           |
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

### 5、仅供内部使用

| 原文件            | 新路径                           |
| ----------------- | -------------------------------- |
| alpha-test        | builtin/internal/alpha-test      |
| cc-sprite-common  | builtin/internal/sprite-common   |
| cc-sprite-texture | builtin/internal/sprite-texture  |
| embedded-alpha    | builtin/internal/embedded-alpha  |
| particle-common   | builtin/internal/particle-common |

