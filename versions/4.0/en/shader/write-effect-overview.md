# Custom Effect

If the built-in effects cannot meet the requirements, users can custom your own effects.

There are two ways to customize effects:

1. Refer to [Effect asset](./effect-inspector.md) to create a new effect.

2. Based on built-in shaders. Copy the corresponding built-in shaders from the **internal -> effects** directory in the **Assets** panel to the **Assets** directory, and then customize them.

## Preparation

Since the shader uses YAML as the flow control and GLSL as the shader language, it is necessary to have a certain degree of familiarity and understanding of these knowledge before customizing the shader.

For unfamiliar developers, we have also prepared some brief introductions:

- [GLSL Basic](./glsl.md)
- [YAML 101](./yaml-101.md)

This section will take custom a 2D effect and a 3D effect as examples to introduce the custom process in detail. For details, please refer to:

- [3D effect: rimlight](write-effect-3d-rim-light.md)
- [2D effect：Gradient](write-effect-2d-sprite-gradient.md)
