# TiledTile 组件参考

TiledTile 组件可以单独对某一个地图块进行操作。

## 使用方式

1.在 Layer 节点下创建一个 Node，并点击该 Node **属性检查器** 下面的 `添加组件` 按钮，
从 `添加渲染组件` 中选择 `TiledTile`，即可添加 TiledTile 组件到节点上，然后设置组件上的属性进行操作地图块。

相关 TiledTile 脚本接口请参考 [TiledTile API](../../../api/zh/classes/TiledTile.html)

2.在代码中获取 Layer 组件然后通过 setTileGIDAt 传入指定 gid 和 TiledTile 的横向和纵向坐标，来设置地图块。

相关 Layer 脚本接口请参考 [TiledLayer API](../../../api/zh/classes/TiledLayer.html)

![tiledtile-component](./tiledtile/tiledtile-component.png)

## TiledTile 属性

| 属性 |   功能说明
| ------| ----------- |
| x     | 指定 TiledTile 的横向坐标，以地图块为单位
| y     | 指定 TiledTile 的纵向坐标，以地图块为单位
| gid   | 指定 TiledTile 的 gid 值
| layer | 指定 TiledTile 属于哪一个 TiledLayer

## 详细说明
 TiledTile 组件可以单独对某一个地图块进行操作。它会将节点的旋转，缩放，平移等操作应用在该地图块上，并可以通过更换当前地图块的 gid 来更换地图块的显示样式。

 注意:只能通过地图中现有的地图块 gid 来进行切换块的样式，无法痛殴自定义 sprite frame 来切换块样式。
