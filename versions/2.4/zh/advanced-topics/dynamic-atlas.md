# 动态合图

> 文：youyou、薰依、jare

降低 DrawCall 是提升游戏渲染效率一个非常直接有效的办法，而两个 DrawCall 是否可以合并为一个 DrawCall 的其中一个重要因素就是这两个 DrawCall 是否使用了同一张贴图。

Cocos Creator 提供了在项目构建时的静态合图方法 —— **自动合图**（Auto Atlas）。但是当项目日益壮大的时候贴图会变得非常多，很难将贴图打包到一张大贴图中，这时静态合图就比较难以满足降低 DrawCall 的需求。所以 Cocos Creator 在 v2.0 中加入了 **动态合图**（Dynamic Atlas）的功能，它能在项目运行时动态的将贴图合并到一张大贴图中。当渲染一张贴图的时候，动态合图系统会自动检测这张贴图是否已经被合并到了图集（图片集合）中，如果没有，并且此贴图又符合动态合图的条件，就会将此贴图合并到图集中。

动态合图是按照 **渲染顺序** 来选取要将哪些贴图合并到一张大图中的，这样就能确保相邻的 DrawCall 能合并为一个 DrawCall（又称“合批”）。

## 启用、禁用动态合图

Cocos Creator 在初始化过程中，会根据不同的平台设置不同的 [CLEANUP_IMAGE_CACHE](%__APIDOC__%/zh/classes/macro.html#cleanupimagecache) 参数，当禁用 `CLEANUP_IMAGE_CACHE` 时，动态合图就会默认开启。

启用动态合图会占用额外的内存，不同平台占用的内存大小不一样。目前在小游戏和原生平台上默认会禁用动态合图，但如果你的项目内存空间仍有富余的话建议开启。

**若希望强制开启动态合图**，请在代码中加入：

```js
cc.macro.CLEANUP_IMAGE_CACHE = false;
cc.dynamicAtlasManager.enabled = true;
```

> **注意**：这些代码请写在项目脚本中的最外层，不要写在 `onLoad` / `start` 等类函数中，才能确保在项目加载过程中即时生效。否则如果在部分贴图缓存已经释放的情况下才启用动态图集，可能会导致报错。

**若希望强制禁用动态合图**，可以直接剔除“Dynamic Atlas”模块以减小引擎包体，或者通过代码控制：

```js
cc.dynamicAtlasManager.enabled = false;
```

## 贴图限制

动态合图系统限制了能够进行合图的贴图大小，默认只有贴图宽高都小于 **512** 的贴图才可以进入到动态合图系统。用户可以根据需求修改这个限制：

```js
cc.dynamicAtlasManager.maxFrameSize = 512;
```

详情可参考 API 文档 [DynamicAtlasManager](%__APIDOC__%/zh/classes/DynamicAtlasManager.html)。

## 支持定制的渲染组件

目前动态合图系统只支持 Sprite、Label 等部分内建渲染组件的合图。如果希望加入其它类型渲染组件的支持，可以自己定制渲染组件。需要将相应的 SpriteFrame 添加到动态合图系统中：

```js
cc.dynamicAtlasManager.insertSpriteFrame(spriteFrame);
```

当 SpriteFrame 被添加到动态合图后，SpriteFrame 的贴图被替换为 `动态合图系统中的大图`，SpriteFrame 中的 uv 也会按照大图中的坐标进行重新计算。

**注意**：在场景加载前，动态合图系统会进行重置，SpriteFrame 贴图的引用和 uv 都会恢复到初始值。

## 调试

如果希望看到动态合图的效果，那么可以开启调试来看到最终生成的大图，这些大图会添加到一个 ScrollView 展示出来。

```javascript
// 开启调试
cc.dynamicAtlasManager.showDebug(true);
// 关闭调试
cc.dynamicAtlasManager.showDebug(false);
```
