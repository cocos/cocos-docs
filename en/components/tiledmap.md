# TiledMap Component Reference

TiledMap is used for render a map with TMX format.

![tiledmap-component](./tiledmap/tiledmap-component.png)

Click the **Add Component** button at the bottom of the **Properties** panel and select **TiledMap** from **Renderer Component** to add the **TiledMap** component to the node.

![](./tiledmap/add_tiledmap.png)

API reference: [TiledMap API](../../../api/en/classes/TiledMap.html).

## TiledMap Properties

| Properties |   Details
| -------------- | ----------- |
| Tmx Asset | Specify the asset of the TMX format map. |

## Details

- When a TiledMap component is added, you can render a map by drag a TiledMap asset from **Assets** panel to the property **Tmx Asset** of the TiledMap component.
- After you add the **Tmx Asset** property to the TiledMap component, the TiledMap component will add children node corresponding to the layers in the map. A TiledLayer component will be added for the children node. **Please DO NOT remove the TiledLayer component.**

  ![](./tiledmap/tiledlayer.png)
- The Tiledmap component does not support `mapLoaded` callback, you can use TiledMap component in callback `start`.

---

Continue on to read about [Workflow of script development](../scripting/index.md).
