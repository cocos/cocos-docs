# TiledMap 组件参考

TiledMap（地图）用于在游戏中显示 TMX 格式的地图。在节点上添加 TiledMap 组件，然后给该组件设置 tmxAsset 属性，就可以在场景中显示相应的地图了。

![tiledmap-component](./tiledmap/tiledmap-component.png)

点击**属性检查器**下面的`添加组件`按钮，然后从`添加渲染组件`中选择`TiledMap`，即可添加 TiledMap 组件到节点上。

瓦片图的脚本接口请参考[TiledMap API](../api/classes/TiledMap.html)。

## TiledMap 属性

| 属性 |   功能说明
| -------------- | ----------- |
| tmxAsset | 指定 tmx 格式的地图资源。|

## 详细说明

* 添加 TiledMap 组件之后，通过从**资源管理器**中拖拽一个 TiledMap 格式的资源到 tmxAsset 属性上就可以在场景中看到地图的显示了。
* TiledMap 组件会在节点中添加与地图中的 Layer 对应的节点。这些节点都添加了 TiledLayer 组件。**请勿删除这些 Layer 节点中的 TiledLayer 组件**。
* 在之前版本的 TiledMap 组件中，只能在 `mapLoaded` 的回调中使用 TiledMap 组件。而新版本的 TiledMap 组件加载机制进行了调整，不再支持 `mapLoaded` 回调，在 `start` 函数中就可以正常使用 TiledMap 组件了。
