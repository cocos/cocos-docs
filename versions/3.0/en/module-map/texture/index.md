# Textures

A texture is a displayable image, or a piece of intermediate data used for computation, which is mapped to the surface of a rendered object via UV coordinates to give it a richer and more realistic effect. The following are some of the applications of textures in Cocos Creator:

- Used for 2D UI rendering, see the [SpriteFrame](../../asset/sprite-frame.md) documentation for details.

- Used for 3D model rendering. A texture asset needs to be specified in the material, to render and map it to the mesh surface.Textures also support switching to **cube map** or **normal map** when [importing image assets](../../asset/image.md).

- Used for the particle system to make particles more expressive. As with 3D models, the use of textures in particle system also depends on materials.

- Used for terrain rendering, see the [Terrain system](../../editor/terrain/index.md) documentation for details.

## More Reference

- [RenderTexture](../../asset/render-texture.md)
- [Texture Compression](../../asset/compress-texture.md)
