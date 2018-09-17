# 动态合图

> 文： youyou

## 介绍

降低 DrawwCall 是提升游戏渲染效率一个非常直接的办法，而两个DrawCall 是否可以合并为一个 DrawCall 的一个非常重要的因素即是这两个 DrawCall 是否使用了同一张贴图。

Cocos Creator 已经提供了在项目构建时的静态合图方法：自动合图 （AutoAtlas），但是当项目日益变大的时候，贴图会变得非常多，很难将肯能的贴图打包到一张大贴图中，这时静态合图可能比较难满足降低 DrawCall 的需求。

所以 Cocos Creator 在 2.0 中加入了动态合图的功能，他能在运行时动态将贴图合并到一张大贴图中。当渲染到一张贴图的时候，动态合图系统会检测这张贴图是否已经被加入到了自动合图系统，如果没有并且此贴图符合自动合图的限制，则将此贴图合并到系统生成的大图中。

因为自动合图是按照渲染顺序来确定是否将贴图合并到一张大图中的，这样就能确保相邻的 DrawCll 也能合并为一个 DrawCall。

## 技术细节

目前自动合图系统只支持了 精灵（Sprite）渲染组件的合图，如果希望加入其它类型渲染组件的支持，可以自己定制渲染组件将相应的 sprite frame 添加到自动合图系统中。

```javascript
cc.dynamicAtlasManager.insertSpriteFrame(spriteFrame);
```

当 sprite frame 被添加到自动合图后，sprite frame 的贴图被修改为`自动合图系统中的大图`，sprite frame 中的 uv 也会按照大图中的坐标进行重新计算。

注意：
在场景加载前，自动合图系统会进行重置，sprite frame 贴图的引用和 uv 都会恢复到之前的值。

## 贴图限制

自动合图系统限制了能够进行合图的贴图大小，只有贴图宽高都小于 **512** 的贴图可以进入到自动合图系统。
你可以根据需求修改这个限制。

```javascript
cc.dynamicAtlasManager.maxFrameSize = 512;
```

## 调试

如果希望看到自动合图的效果，那么可以开启调试来看到最终生成的大图，这些大图会添加到一个 ScrollView 展示出来。

```javascript
// 开启调试
cc.dynamicAtlasManager.showDebug(true);
// 关闭调试
cc.dynamicAtlasManager.showDebug(false);
```