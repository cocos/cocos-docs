# TiledTile Component Reference

The Tiledtile component can operate on a single tile.

## Creation method

### 1. Created in the editor

Creating a Node under the Layer node, then select Node and click the `Add component` at the bottom of **Properties** and select `TiledTile` from `Add Renderer Component` to add the **TiledTile** component to the Node. And then set the properties on the component to operate the tile.

![tiledtile-component](./tiledtile/tiledtile-component.png)

TiledTile API reference [TiledTile API](../../../api/zh/classes/TiledTile.html)

### 2. Created in code

There are two ways to set up a tile in your code. After you set TILEDTILE in any LAYER, the TILE in the location of LAYER will be replaced.

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

For the Layer script interface, please refer to [TiledLayer API](../../../api/zh/classes/TiledLayer.html)

## TiledTile attribute

| Attribute |   Function Explanation
| ------| ----------- |
| X     | Specify the TiledTile horizontal coordinate，use tile as the unit
| Y     | Specify the TiledTile vertical coordinate，use tile as the unit
| Gid   | Specify the Gid value of the TiledTile to toggle the style of the TiledTile
| Layer | Get TiledTile belong to which TiledLayer

### Detailed explanation

TiledTile can control the specified tile. It will apply the node rotation, scale, translate to the tile.
You can change the TiledTile's gid to change the tile's style.

**Attention**: You can only use the gid of an existing tile in the map to switch the style of the tile. You cannot switch the style of the tile by customizing the sprite frame.

## Node properties that can be applied to TiledTile

| Attribute |   Function Explanation
| ------| ----------- |
| Position | `Pans` for the specified TiledTile
| Rotation | `Rotates` for the specified TiledTile
| Scale    | `Scales` for the specified TiledTile
| Color    | Change the `color` action for the specified TiledTile
| Opacity  | Adjust the `opacity` for the specified TiledTile
| Skew     | Adjust the `skew` for the specified TiledTile