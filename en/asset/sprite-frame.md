# Sprite Frame Assets

**Sprite Frame** is a container for UI rendering and basic graphics, which manages the clipping and tiling data. It by default holds a reference to a Texture2D asset of the same level as it.

## Importing Sprite Frame Assets

Use the default [asset import](asset-workflow.md) method to import image assets into the project, then set the type of image as **sprite-frame** in the **Inspector**, and save it by clicking the green checkmark button in the upper right corner.

![set sprite-frame](sprite-frame/set-spriteframe.png)

Creator will automatically create a **spriteFrame** asset under the imported image assets as shown below.

![spriteframe](sprite-frame/spriteframe.png)

An image asset will have a thumbnail of its own image as icon in **Assets**. When an image sub-asset is selected in **Assets**, a thumbnail of the image is displayed below the **Inspector**.

## Property

The `spriteFrame` has the following properties:

| Property | Description |
| :--- | :--- |
| Packable | Whether to participate in Dynamic Atlas and automatic atlas building processes. Please refer to the **Packable** section below for details. |
| Rotated  | Read-only property, cannot be changed. Used to see if the sub-asset in the Texture Packer asset is rotated. |
| Offset X, Y | Read-only property, cannot be changed. Used to view the offset of the rectangle in Texture Packer asset. |
| Trim Type | Set the trim type, including:<br>1. Auto -- Automatic trim. For details, please refer to the [Auto Trim for SpriteFrame](../ui-system/components/engine/trim.md) documentation.<br>2. Custom -- Custom trim<br>3. None -- No trim, use original texture. |
| Trim Threshold | Set the transparency threshold, trim off the pixels whose transparency is below the set value.<br>The default value is 1, and the range of values is 0~1.<br>Only takes effect when **Trim Type** is set to **Auto**.  |
| Trim X, Y, Width, Height | Sets the trim rect, only takes effect when **Trim Type** is set to **Custom**. |
| Border Top, Bottom, Left, Right | Set the texture margins of the 9-sliced, which can be edited visually by clicking on the **Edit** button below.  |

### Packable

If the engine has [Dynamic-Atlas](../advanced-topics/dynamic-atlas.md) enabled, Dynamic-Atlas will automatically merge the appropriate textures into one large texture at the start of the scene to reduce Drawcall. If the UV coordinates of the texture are used in the custom `effect`, the UV calculation in the `effect` will be wrong and the **Packable** property of the texture needs to be set to **false** to prevent the texture from being packed into the Dynamic-Atlas.

## Using a Sprite Frame

### The object contained in the container is using textures

In the editor, drag the SpriteFrame assets into the **SpriteFrame** property of the [Sprite Component](../ui-system/components/editor/sprite.md) to switch the image displayed by Sprite.

![use spriteframe](sprite-frame/use-spriteframe.png)

At runtime, taking the imported image named **content** above as an example, the entire asset is divided into three parts:

- **content**：Image source assets ImageAsset
- Sub-asset **spriteFrame** of **content**, the sprite frame asset SpriteFrame
- Sub-asset **texture** of **content**, the mapping asset Texture2D

When assets are stored in the `resources` directory, we can load directly to the spriteFrame asset with the following code example.

```typescript
const url = 'test_assets/test_atlas/content/spriteFrame';
resources.load(url, SpriteFrame, (err: any, spriteFrame) => {
  const sprite = this.getComponent(Sprite);
  sprite.spriteFrame = spriteFrame;
});
```

In some cases only the source ImageAsset can be loaded, so we provide the [createWithImage](__APIDOC__/en/class/SpriteFrame?id=createWithImage) method to help users create a SpriteFrame asset from the loaded ImageAsset. Depending on the source of the ImageAsset, there are two ways to create it:

1. Assets on the server can only be loaded to the source ImageAsset. For specific methods, please refer to the [dynamic load asset](./dynamic-load-resources.md) documentation. The code example for creating a SpriteFrame asset is as follows:

    ```typescript
    const self = this;
    const url = 'test_assets/test_atlas/content';
    resources.load(url, ImageAsset, (err: any, imageAsset) => {
      const sprite = this.getComponent(Sprite);
      sprite.spriteFrame = SpriteFrame.createWithImage(imageAsset);
    });
    ```

    Users can also fill in the information manually. Example:

    ```typescript
    const self = this;
    const url = 'test_assets/test_atlas/content';
    resources.load(url, ImageAsset, (err: any, imageAsset) => {
      const sprite = this.getComponent(Sprite);
      const spriteFrame = new SpriteFrame();
      const tex = new Texture2D();
      tex.image = imageAsset;
      spriteFrame.texture = tex;
      sprite.spriteFrame = spriteFrame;
    });
    ```

2. Create from an ImageAsset drawn by Canvas. Example:

    ```typescript
    const sprite = this.getComponent(Sprite);
    sprite.spriteFrame = SpriteFrame.createWithImage(canvas);
    ```

    Users can also fill in the information manually. Example:

     ```typescript
    const sprite = this.getComponent(Sprite);
    const img = new ImageAsset(canvas);
    const tex = new Texture2D();
    tex.image = img;
    const sp = new SpriteFrame();
    sp.texture = tex;
    sprite.spriteFrame = sp;
    ```

### The container contains objects that are used by RenderTexture

RenderTexture is a rendering texture that renders content from the camera directly to a texture instead of the screen. SpriteFrame can easily display 3D camera content on the UI by managing RenderTexture. For specific usage and code example, please refer to [Render Texture](render-texture.md).

For API information, please refer to the [SpriteFrame](__APIDOC__/en/class/SpriteFrame) documentation.
