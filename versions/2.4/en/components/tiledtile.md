# TiledTile Component Reference

The TiledTile component can operate on a specified tile.

![tiledtile-component](tiledtile/tiledtile-component.png)

## How to create

### 1. Create in the editor

Create an empty node under the Layer node that was automatically generated during the creation of the [TiledMap Component](tiledmap.md). Then select the empty node and click the **Add Component -> Renderer Component-> TiledTile** below the **properties** panel to add the **TiledTile** component to the node. Then manipulate the tile by setting the properties of the TiledTile component.

![](tiledtile/add_tiledtile.png)

TiledTile API reference [TiledTile API](%__APIDOC__%/en/classes/TiledTile.html)

### 2. Create in code

There are two ways to set up a tile in your code. After you set TiledTile in any Layer node, the TiledTile in the location of Layer node will be replaced.

#### Create by adding a TiledTile component to a node

```js
// Create a new node
var node = new cc.Node();
// Then set the node's parent node to any layer node
node.parent = this.layer.node;  
// Finally add the TiledTile component to the node and return the TiledTile object. Then you can manipulate the TiledTile object
var tiledTile = node.addComponent(cc.TiledTile);  
```

#### Get TiledTile through getTiledTileAt

```js
// Gets a TiledTile object with a horizontal coordinate of 0 and a vertical coordinate of 0 on the layer. And then you can manipulate the TiledTile object
var tiledTile = this.layer.getTiledTileAt(0, 0);
```

For the Layer script interface, please refer to [TiledLayer API](%__APIDOC__%/en/classes/TiledLayer.html)

## TiledTile Properties

| property |   Function Explanation
| ------| ----------- |
| X     | Specify the TiledTile horizontal coordinate, use tile as the unit
| Y     | Specify the TiledTile vertical coordinate, use tile as the unit
| Gid   | Specify the Gid value of the TiledTile to toggle the style of the TiledTile
| Layer | Get TiledTile belong to which TiledLayer. (This property was removed since v2.0.1)

### Detailed Explanation

TiledTile can control the specified tile. It will apply the node rotation, scale, translate to the tile. You can change the TiledTile's gid to change the tile's style.

**Node**: You can only use the gid of an existing tile in the tile to switch the style of the tile. You cannot switch the style of the tile by customizing the Sprite Frame.

## Node properties that can be applied to TiledTile

| property |   Function Explanation
| ------| ----------- |
| Position | `Pans` for the specified TiledTile
| Rotation | `Rotates` for the specified TiledTile
| Scale    | `Scales` for the specified TiledTile
| Color    | Change the `color` action for the specified TiledTile
| Opacity  | Adjust the `opacity` for the specified TiledTile
| Skew     | Adjust the `skew` for the specified TiledTile