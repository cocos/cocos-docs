# TiledTile 组件参考

TiledTile 组件可以单独对某一个地图块进行操作。

## 创建方式

### 1、编辑器中创建

在 Layer 节点下创建一个 Node，并点击该 Node **属性检查器** 下方的 `添加组件` 按钮，从 `添加渲染组件` 中选择 `TiledTile`，即可添加 TiledTile 组件到节点上，然后设置组件上的属性来操作地图块。

![tiledtile-component](./tiledtile/tiledtile-component.png)

相关 TiledTile 脚本接口请参考 [TiledTile API](../../../api/zh/classes/TiledTile.html)

### 2、代码中创建

在代码中设置地图块有两种方式，当你在某个 LAYER 中设置了 TILEDTILE 之后，该 LAYER 所在位置的 TILE 就会被取代

#### 通过对一个节点添加 TiledTile 组件进行创建

```js
// 创建一个新节点
var node = new cc.Node();
// 然后把该节点的父节点设置为任意的 layer 节点
node.parent = this.layer.node;  
// 最后添加 TiledTile 组件到该节点上，并返回 TiledTile 对象，就可以对 TiledTile 对象进行一系列操作
var tiledTile = node.addComponent(cc.TiledTile);  
```

#### 通过 getTiledTileAt 获取 TiledTile

```js
// 获取 layer 上横向坐标为 0，纵向坐标为 0 的 TiledTile 对象，就可以对 TiledTile 对象进行一系列操作
var tiledTile = this.layer.getTiledTileAt(0, 0);
```

Layer 脚本接口相关请参考 [TiledLayer API](../../../api/zh/classes/TiledLayer.html)

## TiledTile 属性

| 属性 |   功能说明
| ------| ----------- |
| X     | 指定 TiledTile 的横向坐标，以地图块为单位
| Y     | 指定 TiledTile 的纵向坐标，以地图块为单位
| Gid   | 指定 TiledTile 的 gid 值，来切换 TiledTile 的样式
| Layer | 获取 TiledTile 属于哪一个 TiledLayer（只读）

**注意**: 只能使用地图中现有地图块的 gid 来切换块的样式，无法通过自定义 sprite frame 来切换块的样式。

## 可作用到 TiledTile 上的节点属性

| 属性 |   功能说明
| ------| ----------- |
| Position | 可对指定的 TiledTile 进行 `平移` 操作
| Rotation | 可对指定的 TiledTile 进行 `旋转 `操作
| Scale    | 可对指定的 TiledTile 进行 `缩放` 操作
| Color    | 可对指定的 TiledTile 进行更改 `颜色` 操作
| Opacity  | 可对指定的 TiledTile 调整 `不透明度`
| Skew     | 可对指定的 TiledTile 调整 `倾斜角度`
