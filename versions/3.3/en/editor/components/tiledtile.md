# TiledTile Component References

The TiledTile component can operate on a particular map block individually.

![tiledtile-component](./tiledtile/tiledtile-component.png)

## Creation Method

### Create via Editor

Create an empty node under the Layer node **automatically generated** during the creation of the [TiledMap component](tiledmap.md). Then select the empty node and click **Add component -> TiledMap -> TiledTile** under the **Inspector** panel to add the TiledTile component to the node. Then you can manipulate the map block by setting the properties on the TiledTile component.

![add_tiledtile](./tiledtile/add_tiledtile.png)

For related TiledTile script interface, please refer to the [TiledTile API](%__APIDOC__%/en/#/docs/3.3/en/tiledmap/Class/TiledTile).

### Create by Code

There are two ways to set up a map block in code. When setting the TiledTile in a Layer node, the TiledTile at the original location of that Layer node will be replaced.

#### Create by adding a TiledTile Ccmponent to a node

```ts
// Create a new node
const node = new Node();
// then set the node's parent to any layer node
node.parent = this.layer.node;
// Finally add the TiledTile component to the node and return the TiledTile object, which allows you to perform a series of operations on the TiledTile object
const tiledTile = node.addComponent(TiledTile);
```

#### Get TiledTile by getTiledTileAt

```ts
// Get the TiledTile object on the layer with horizontal coordinates of 0 and vertical coordinates of 0. You can then perform a series of operations on the TiledTile object
const tiledTile = this.layer.getTiledTileAt(0, 0);
```

For the Layer script interface, please refer to the [TiledLayer API](%__APIDOC__%/en/#/docs/3.3/en/tiledmap/Class/TiledLayer).

## TiledTile Properties

| Property | Description
| :-----| :---------- |
| **X** | Specifies the horizontal coordinates of the TiledTile, in map blocks
| **Y** | Specifies the vertical coordinates of the TiledTile, in map blocks
| **Gid** | Specifies the gid value of the TiledTile to toggle the style of the TiledTile

TiledTile can control the specified map block and apply the displacement, rotation and scaling of nodes to the map block. The user can change the map block style by changing the gid property of the TiledTile.

> **Note**: the gid can only be used with an existing map block in the map to toggle the style of the map block, it is not possible to toggle the style of the map block by customizing the Sprite Frame.

## Node properties that can be applied to TiledTile

| Property | Description
| :-----| :---------- |
| **Position** | Change the **Position** of the specified TiledTile
| **Rotation** | **Rotate** the specified TiledTile
| **Scale** | **Scale** the specified TiledTile
| **Color** | Change the **Color** of the specified TiledTile
| **Opacity** | Adjust the **Opacity** of the specified TiledTile
| **Skew** | Adjust the **Skew** of the specified TiledTile
