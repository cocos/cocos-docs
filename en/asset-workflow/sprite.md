# Texture

Textures are used for rendering in games. Generally, textures are created by image processing softwares (e.g. Photoshop, mspaint). Now Cocos Creator supports two formats of images: **JPG** & **PNG**.

## Import Textures

You can import textures by default way, then you can see the textures in **Assets Panel** like this:

![imported texture](sprite/imported_texture.png)

In the **Assets Panel**, the texture's icon is a thumbnail of itself. Once you select a texture in **Assets Panel**, the thumbnail will also be shown at the bottom of **Properties Panel**. Please **DO NOT** modify the properties of texture in **Properties Panel**, unless you know what you are doing.

## Texture & SpriteFrame

In **Assets Panel**, there is a triangle at the left side of texture. You can see the sub-asset of the texture by click the triangle. Cocos Creator will create a SpriteFrame asset for each Texture when it's imported.

![texture spriteframe](sprite/texture_spriteframe.png)

SpriteFrame is asset used by the core component **Sprite**. **Sprite** component can show different images by set/change `spriteFrame`. You can take a look at [Sprite component reference](../components/sprite.md) for more details.

Why SpriteFrame is added? Besides a SpriteFrame from a Texture, we have another asset (Atlas) which contains many SpriteFrames. About atlas you can reference [this document](atlas.md).

The API documents for Texture & SpriteFrame:

- [Texture](http://www.cocos2d-x.org/docs/api-ref/creator/v1.0/classes/Texture2D.html)
- [SpriteFrame](http://www.cocos2d-x.org/docs/api-ref/creator/v1.0/classes/SpriteFrame.html)

## SpriteFrame Usage

You can create a node with **Sprite** component by drag SpriteFrame asset from **Assets Panel** to **Node Tree Panel** or **Scene Panel**.

After that, you can change the SpriteFrame by drag a SpriteFrame/Texture asset to the `Sprite Frame` property of **Sprite** componet.

Also you can drag SpriteFrame asset to an already existed SpriteFrame animation in the **Timeline Panel**. You can reference the usage by [this document](../animation/sprite-animation.md).

### Performance Attentions

If you are using single Texture assets for Sprite. It can't use batch render at the runtime of the game. Now you can't batch change the SpriteFrame reference from single Texture to Atlas in Cocos Creator. So, please combine textures into atlas as early as possible.

<hr>

Continue on to read about [Atlas](atlas.md)