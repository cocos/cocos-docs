# Dirty Region optimization

## The optimization of dirty region algorithm for Canvas rendering

In canvas rendering mode of web platform, the rendering of the game requires a large number of drawImage to achieve thus rendering performance is very low. For a lot of 2D games, if most of the scene elements are static, only part of the screen display frequently updates. We can use dirty region algorithm to only update the rendering of the active region of the scene.

The dirty region algorithm can render only the changed area on the screen in canvas mode, thus greatly reducing the number of engine drawCalls and improving rendering performance.

Take the UI demo for example, in the case of using dirty region mode, the entire rendering drawcall data lowered from 366 down to 28.

<img src = "dirty-region/dirtyRegion-disabled.jpg" width = "300" height = "480" alt = "image name" align = center />
<img src = "dirty-region/dirtyRegion-enabled.jpg" width = "300" height = "480" alt = "image name" align = center />

The prerequisite for rendering a dirty region is to allow the renderer to get itself in the rendering area of ​​the screen, that is, the bounding box AABB, which is affected by the local bounding box (localBB or localBoundingBox) and the transform coordinate (world tranform) influences. By default, `localBB` is obtained through `contentSize`, and the user can also implement the `getLocalBB` interface in the `canvasRenderCommand` and return to `localBB`.

## Switch on Dirty region and debug

In Creator, the dirty region is turned on by default for canvas rendering. The API for enable and disable dirty region is

```js
// enable dirty region
cc.renderer.enableDirtyRegion(true);
// disable dirty region
cc.renderer.enableDirtyRegion(false);
// check dirty region enable state
var isEnabled = cc.renderer.isDirtyRegionEnabled();
```

When there are a lot of objects on the screen are moving, the use of dirty region will cause performance to drop, so the engine provides a threshold mechanism. When the moving objects on screen is getting off limit, the rendering will automatically switch off dirty region mode and use original rendering logic instead. By default, threshold is 10.

```js
// set dirty region threshold
cc.renderer.setDirtyRegionCountThreshold (threshold);
```

### Dirty region debugging

```js
// debug dirty region or not
cc.renderer._debugDirtyRegion = true;
cc.renderer._debugDirtyRegion = false;
```

## Renderer component compatibility for dirty region

Compatibility of dirty region with renderer components at the moment:

* Fully compatible components: Sprite, Label, Mask
* Partially compatible components: Particle, TileMap, Spine
* Incompatible components: Graphics

In addition, if a custom rendering component does not have `contentSize` and does not implement the `getLocalBB` interface, it is also incompatible with dirty region.

## Known dirty region compatibility issue with browsers

Dirty region mode is not compatible with UC and IE browser. We have disabled dirty region mode on these two browsers.