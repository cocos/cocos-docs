# TiledMap 组件参考

TiledMap（地图）用于在游戏中显示 TMX 格式的地图。

![tiledmap-component](tiledmap/tiledmap-component.png)

点击 **属性检查器** 下方的 **添加组件** 按钮，然后从 **渲染组件** 中选择 **TiledMap**，即可添加 TiledMap 组件到节点上。

![](./tiledmap/add_tiledmap.png)

TiledMap 的脚本接口请参考 [TiledMap API](../../../api/zh/classes/TiledMap.html)。

## TiledMap 属性

| 属性 |   功能说明
| -------------- | ----------- |
| Tmx Asset | 指定 .tmx 格式的地图资源 |

## 详细说明

- 添加 TiledMap 组件之后，从 **资源管理器** 中拖拽一个 **.tmx** 格式的地图资源到 Tmx Asset 属性上就可以在场景中看到地图的显示了。
- 在 TiledMap 组件中添加了 Tmx Asset 属性后，会在节点中自动添加与地图中的 Layer 对应的节点。这些节点都添加了 TiledLayer 组件。**请勿删除这些 Layer 节点中的 TiledLayer 组件**。

  ![](./tiledmap/tiledlayer.png)
- TiledMap 组件不支持 `mapLoaded` 回调，在 `start` 函数中可正常使用 TiledMap 组件。
