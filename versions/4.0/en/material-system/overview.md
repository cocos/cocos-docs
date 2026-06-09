# Material System Overview

![mat-inspector](img/mat-show.png)

In the real world, all objects interact with light, and depending on the appearance of the surface of the object, the effect of the light is also different.

Cocos Creator uses **material** to describe the appearance of objects, such as whether a small ball is a glass ball or a plastic ball, and a box is a wooden box or a metal box. The light and shade, light points, light reflections, light scattering and other effects they present under lighting conditions are all achieved by [Effect](../shader/index.md). The material is the data set of the shader (including texture maps, lighting algorithms, etc.), which is convenient for visual adjustment.

The material system mainly includes the following:

- [Material assets](../asset/material.md)
- [Procedural use of materials](material-script.md)
- [Builtin materials](builtin-material.md)
- [Material System Class Diagram](material-structure.md)
- [Cocos Creator 3.1 Material Upgrade Guide](Material-upgrade-documentation-for-v3.0-to-v3.1.md)
- [Upgrade Guide: Effect from v3.4.x to v3.5.0](effect-upgrade-documentation-for-v3.4.2-to-v3.5.md)
- [Upgrade Guide: Effect from v3.5.x to v3.6.0](effect-upgrade-documentation-for-v3.5-to-v3.6.md)

## Examples

Creator provides **material** examples related to materials [GitHub](https://github.com/cocos/cocos-test-projects/tree/v3.8/assets/cases/material), users can refer to it as needed.
