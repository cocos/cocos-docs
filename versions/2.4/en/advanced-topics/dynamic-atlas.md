# Dynamic Atlas

> Authors: Xunyi, youyou

Reducing DrawCall is a very straightforward and effective way to improve game rendering efficiency, and a very important factor in whether the two DrawCall can be combined into a DrawCall is whether the two DrawCall use the same texture.

Cocos Creator provides a static atlas packing when building a project -- **Auto Atlas**. But when the project grows bigger, the texture will become so much that it's hard to package the textures into a large texture. At this time, the static atlas packing is more difficult to meet the needs of reducing DrawCall. So Cocos Creator added the **Dynamic Atlas** feature to v2.0. It dynamically merges textures into a large texture while the project is running. When rendering to a texture, the Dynamic Atlas Manager will automatically detects if the texture has been merged into the atlas (Collection of images). If not, and the texture conforms to the Dynamic Atlas condition, then the texture will be merged into the atlas.

Dynamic Atlas is according to the rendering order to determine whether the texture is merged into a large texture. This ensures that adjacent DrawCall can be combined into a single DrawCall (Also known as Batching).

## Enable, disable Dynamic Atlas

During the initialization process of Cocos Creator, different [CLEANUP_IMAGE_CACHE](../../../api/en/classes/macro.html#cleanupimagecache) value will be set according to different platforms. When `CLEANUP_IMAGE_CACHE` is disabled, Dynamic Atlas will be enabled by default.<br>
Enabling dynamic atlas takes up additional memory, while the actual used memory space depends on the running platform. Dynamic atlas is currently disabled by default on mini-games or native platforms, but is recommended to activate it if your project still has enough memory space.

**If you need to force the Dynamic Atlas to be enabled**, execute the following code:

```js
cc.macro.CLEANUP_IMAGE_CACHE = false;
cc.dynamicAtlasManager.enabled = true;
```

> Note that the code should be placed in the outermost scope, not in any class functions such as `onLoad` / `start`, to ensure that it takes effect immediately during project loading. Otherwise, if you enable Dynamic Atlas once any texture cache has been released, an error may result.

**If you need to force the Dynamic Atlas to be disabled**, you can either uncheck the “Dynamic Atlas” module to reduce the engine package, or execute the following code:

```js
cc.dynamicAtlasManager.enabled = false;
```

## Texture restrictions

The Dynamic Atlas Manager limits the size of the texture that can be packed. By default, only textures with a width and height less then **512** can enter the manager. Users can modify this restriction based on needs:

```js
cc.dynamicAtlasManager.maxFrameSize = 512;
```

You can refer to the API docs [DynamicAtlasManager](../../../api/en/classes/DynamicAtlasManager.html) for details.

## Support custom rendering components

Currently, the Dynamic Atlas Manager only supports some builtin rendering components such as Sprite or Label. If you want to add support for other component types, you can customize a rendering component yourself:

```js
cc.dynamicAtlasManager.insertSpriteFrame(spriteFrame);
```

When a Sprite Frame is added to a dynamic atlas, the texture of the Sprite Frame will be modify to **a larger image in the Dynamic Atlas Manager**. The uv in the Sprite Frame is also recalculated according to the coordinates in the large image.

> **Note**: before the scene is loaded, the Dynamic Atlas Manager will be reset, and the reference of the Sprite Frame texture and uv will be restored to their initial values.

## Debugging

If you want to see the effect of dynamic atlas packing, you can turn on debugging to see the resulting large texture, which will be added to a ScrollView to display.

```javascript
// Open debugging
cc.dynamicAtlasManager.showDebug(true);
// Close debugging
cc.dynamicAtlasManager.showDebug(false);
```
