# 动态合图

> 文：youyou、薰依

## 介绍

降低 DrawCall 是提升游戏渲染效率一个非常直接有效的办法，而两个 DrawCall 是否可以合并为一个 DrawCall 的一个非常重要的因素就是这两个 DrawCall 是否使用了同一张贴图。

Cocos Creator 提供了在项目构建时的静态合图方法 —— **自动合图（Auto Atlas）**。但是当项目日益壮大的时候贴图会变得非常多，很难将贴图打包到一张大贴图中，这时静态合图就比较难以满足降低 DrawCall 的需求。所以 Cocos Creator 在 v2.0 中加入了 **动态合图** 的功能，它能在项目运行时动态的将贴图合并到一张大贴图中。当渲染一张贴图的时候，动态合图系统会自动检测这张贴图是否已经被加入到了动态合图系统，如果没有，并且此贴图又符合动态合图的条件，就会将此贴图合并到动态合图系统生成的大贴图中。

**动态合图** 是按照 **渲染顺序** 来选取要将哪些贴图合并到一张大图中的，这样就能确保相邻的 DrawCall 能合并为一个 DrawCall。

## 使用详情

目前动态合图系统只支持精灵（Sprite）渲染组件的合图。如果希望加入其它类型渲染组件的支持，可以自己定制渲染组件。需要将相应的 SpriteFrame 添加到动态合图系统中：

```js
cc.dynamicAtlasManager.insertSpriteFrame(spriteFrame);
```

当 SpriteFrame 被添加到动态合图后，SpriteFrame 的贴图被替换为 `动态合图系统中的大图`，SpriteFrame 中的 uv 也会按照大图中的坐标进行重新计算。

**注意**：在场景加载前，动态合图系统会进行重置，SpriteFrame 贴图的引用和 uv 都会恢复到初始值。

## 贴图限制

动态合图系统限制了能够进行合图的贴图大小，只有贴图宽高都小于 **512** 的贴图才可以进入到动态合图系统。用户可以根据需求修改这个限制：

```js
cc.dynamicAtlasManager.maxFrameSize = 512;
```

## 调试

如果希望看到动态合图的效果，那么可以开启调试来看到最终生成的大图，这些大图会添加到一个 ScrollView 展示出来。

```javascript
// 开启调试
cc.dynamicAtlasManager.showDebug(true);
// 关闭调试
cc.dynamicAtlasManager.showDebug(false);
```