# World-space sprites (SpriteRenderer)

Use `SpriteRenderer` to place a [SpriteFrame](../../asset/sprite-frame.md) in a 3D scene. For example, a character drawn as a sprite can walk behind a wall and disappear from view. The component draws the frame in the node's local XY plane. A scene camera renders it. For an image that follows a Canvas layout, use the [UI Sprite component](../../ui-system/components/editor/sprite.md).

## Display a sprite in a scene

1. Create an empty node in a 3D scene and place it in front of the camera. Make sure the camera's **Visibility** includes the node's **Layer**.
2. In the node's Inspector, choose **Add Component → 2D → SpriteRenderer**.
3. Drag the image's **spriteFrame** sub-asset from Assets to the component's **Sprite Frame** property. Use a rectangular frame (**Mesh Type** set to **Rect**).
4. Check that the first material slot uses the built-in `default-sprite-renderer-material`, or assign a material that uses the `builtin-sprite-renderer` effect. Keep the default **Simple** mode to display the sprite.

The node can sit directly in the 3D scene hierarchy without a Canvas or UITransform. The built-in material enables depth testing, so an opaque object that writes depth can occlude the sprite. To set the draw order among transparent objects, add a [Sorting component](../rendering/sorting.md) to the node.

## Set the size and draw mode

Select the **spriteFrame** sub-asset in Assets. Under **Mesh Options**, set **Pixels To Unit** and **Pivot X/Y**. Pixels To Unit (PPU) is the number of pixels per local unit. The default is 100. The pivot is a normalized point on the frame. Its default value, `(0.5, 0.5)`, places the image center at the node origin. World-space sprites that use the same frame share these settings.

Choose a **Draw Mode** on the node. Sizes in the table are in local units before node scaling.

| Mode | How the frame fills the target size |
| --- | --- |
| **Simple** | The natural size is the width and height of the frame's trimmed rectangle divided by PPU. A 200 × 100 pixel frame at 100 PPU occupies 2 × 1 units. |
| **Sliced** | Set the target **Size** on the component and the four slice borders on the frame. The engine converts the borders to local units using PPU. When enlarged, the corners keep their natural size and the center stretches. If both borders cannot fit along one axis, they shrink proportionally along that axis. |
| **Tiled** | Uses the same **Size** and frame borders. The corners stay in place, each edge repeats along its length, and the center repeats in both directions. With all four borders set to zero, the entire frame repeats. |

Until you set **Size**, Sliced and Tiled follow the natural size of the current frame. An explicit Size persists when you switch frames. Set either dimension to zero to stop drawing. Restore a positive size to display the sprite again.

In Tiled mode, **Tile Mode** controls how the tiles fill the remaining space.

- **Continuous** (default) keeps each tile at its natural size and clips the last tile to fit.
- **Adaptive** uses complete tiles and resizes them evenly to fill the space. Each axis is calculated separately. A further tile is added when the remaining fraction of a tile reaches **Adaptive Mode Threshold**. The threshold ranges from 0 to 1 and defaults to 0.5. For example, a borderless tile with a natural width of 1 repeats twice across a width of 2.4 and three times across a width of 2.6.

## Use the component in a script

This function draws a loaded rectangular frame as a sliced panel 3 units wide and 1 unit high. Pass a sprite material as described above.

```ts
import { Material, Node, SpriteFrame, SpriteRenderer, Vec2 } from 'cc';

export function setPanel(node: Node, frame: SpriteFrame, material: Material) {
    const renderer = node.getComponent(SpriteRenderer) ?? node.addComponent(SpriteRenderer);
    renderer.setSharedMaterial(material, 0);
    renderer.spriteFrame = frame;
    renderer.drawMode = SpriteRenderer.DrawMode.SLICED;
    renderer.size = new Vec2(3, 1);
    return renderer;
}
```

- **Color** multiplies the material color, including alpha. **Flip X / Flip Y** mirror the sprite around its local pivot. Components can share a material and still have independent tint and flip settings. Custom effects must support the corresponding `spriteColor` and `spriteFlip` parameters.
- The `size` and `color` getters return copies. Assign the new value to the property, for example `renderer.size = new Vec2(4, 1)`.

## Atlases and limitations

- Rectangular frames from static atlases are supported, including frames rotated during packing. A UI Sprite can use the same frame. When the UI packs it into a dynamic atlas, the world-space sprite continues sampling the source texture from before packing. You can keep the UI's **Packable** setting. UI dynamic atlasing does not automatically batch world-space sprites.
- A Tiled sprite supports up to 16,383 quads, including borders. The component skips drawing if the limit is exceeded. If a large tiled area disappears, reduce the target size or increase the natural tile size.
- **RenderTexture** has a known orientation issue. On Web and Windows Native, the built-in effect can display a camera's render texture upside down. Ordinary Texture2D assets are unaffected.
