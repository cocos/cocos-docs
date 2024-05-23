# Dynamic Atlas

Reducing the number of DrawCalls is a very direct and effective way to improve game rendering efficiency. One of the most important factors for two DrawCalls to be merged into one is whether both DrawCalls use the same texture.

Cocos Creator provides **Dynamic Atlas**, which dynamically merges the textures into one large texture at project runtime. When a map is rendered, the Dynamic Atlas system automatically detects if the map has been merged into an atlas (collection of images). If not, the system merges the texture into the atlas if it meets the conditions for dynamic atlas.

Dynamic atlas selects which textures are merged into a larger image in **rendering order**, which ensures that adjacent DrawCalls are merged into a single DrawCall (aka "batching").

## Enable and Disable Dynamic Atlas

During initialization, Cocos Creator sets different [CLEANUP_IMAGE_CACHE](__APIDOC__/en/#/docs/3.3/en/core/ObjectLiteral/macro?id=cleanup_image_cache) parameter for different platforms, and when `CLEANUP_IMAGE_CACHE` is disabled, dynamic atlas will be enabled by default. <br>
Enabling dynamic atlas will take up extra memory, and the size of the memory used varies by platform. It is currently disabled by default on mini games and native platforms, but it is recommended to turn it on if your project still has room in memory.

**If you want to force dynamic atlas to be enabled**, please add the following code to your code:

```ts
macro.CLEANUP_IMAGE_CACHE = false;
dynamicAtlasManager.enabled = true;
```

> **Note**: write the code above in the outermost part of the project script, not in the `onLoad`/`start` class functions, to ensure that they take effect instantly during the project loading process. Otherwise, it may cause an error if the dynamic atlas is enabled only when part of the texture cache has been released.

**To forcibly disable dynamic atlas**, control it directly by code:

```ts
dynamicAtlasManager.enabled = false;
```

## Texture Restrictions

The dynamic atlas system limits the size of the texture that can be merged. By default, only textures with a width and height less than **512** can be entered into the dynamic atlas system. This limit can be modified by the developer as required with the following code.

```ts
dynamicAtlasManager.maxFrameSize = 512;
```

For details, look up `DynamicAtlasManager` in the [API documentation](__APIDOC__/en/#/).
