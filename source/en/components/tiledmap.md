# TiledMap Component Reference

TiledMap is used for render a map with TMX format. Add TiledMap component for a node and set a TiledMapAsset for property `tmxAsset`, then the map will be shown.

![tiledmap-component](./tiledmap/tiledmap-component.png)

Click the button `Add Component` in the **Properties** Panel, then select `TiledMap` in `Add Renderer Component`. The TiledMap component will be added to the node.

API reference: [TiledMap API](../api/classes/TiledMap.html)。

## TiledMap Attribute

| Attribute |   Details
| -------------- | ----------- |
| tmxAsset | Specify the asset of the TMX format map. |

## Details

* When a TiledMap component is added, you can render a map by drag a TiledMapAsset from **Assets** panel to the property `tmxAsset` of the component.
* The TiledMap component will add children corresponding to the layers in the map. A TiledLayer component will be added for the children. **Please DO NOT remove the TiledLayer component.**
* In the versions before v1.1, you can only use TiledMap in/after callback `mapLoaded` is invoked. After the version v1.1 (include v1.1), `mapLoaded` is deprecated. You can use TiledMap in callback `start`.

---

Continue on to read about [ Workflow of script development](../scripting/index.md)。
