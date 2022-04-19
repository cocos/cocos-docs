# 立方体贴图

TextureCube 为立方体纹理，常用于设置场景的 [天空盒](../concepts/scene/skybox.md)。立方体贴图可以通过设置全景图 ImageAsset 为 TextureCube 类型获得，也可以在 Creator 中制作生成。

## 设置为立方体贴图

在将 ImageAsset [导入](asset-workflow.md) 到 Creator 后，即可在 **属性检查器** 面板将其设置为 **texture cube** 类型，设置完成后请点击右上角的绿色打钩按钮，以保存修改。

![set-texture-cube](texture/set-texture-cube.png)

设置完成后在 **资源管理器** 面板可以看到原先的图像资源下方生成了一个 **textureCube** 子资源，以及组成 TextureCube 的六张 texture：

![texture-cube](texture/texture-cube.png)

## 制作立方体贴图

在 Creator 中通过制作 CubeMap 获得的 TextureCube 如下图：

![CubeMap](../concepts/scene/skybox/cubemap-properties.png)

关于 TextureCube 具体的使用，以及制作 CubeMap 的方式，请参考 [天空盒 — 设置 CubeMap](../concepts/scene/skybox.md)。

## 立方贴图的 mipmap 范围

TextureCube 可以在运行时动态选择 mipmap 的范围。设置完 mipmap 范围后，只有在范围之内的 mipmap 可以被使用。这允许我们通过跳过低层级来达到节约带宽的目的，同时也可以避免使用过高层级而降低效果。

可以通过以下方法设置 TextureCube 的 mipmap 层级范围：

```Javascript
texture.setMipRange(minLevel, maxLevel);
```

其中 `minLevel` 指定了最小限制，`maxLevel` 指定了最大限制。

> **注意**：
> 1. 该限制无法超出已有的 mipmap 层级。
> 2. 该方法对 WebGL 和 GLES2 后端无效。
