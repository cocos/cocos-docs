# TiledMap

Tiled map resources are data formats that exported by [TiledMap](https://www.mapeditor.org/) (Creator v2.1 and below support for TiledMap v1.0.0, Creator v2.2.0 and above support for TiledMap v1.2.0).

## Import Assets

Assets required by TiledMap:

- `.tmx`: The TiledMap data file.
- `.png`: The texture used by TiledMap.
- `.tsx`: The data of tileset **(optional)**

    ![tiledmap](tiledmap/import.png)

## Create a Node with TiledMap

- 1st Way: Drag a TiledMap asset from **Assets** to **Node Tree**:

    ![tiledmap](tiledmap/create_1.png)

- 2nd Way: Drag a TiledMap asset from **Assets** to **Scene**:

    ![tiledmap](tiledmap/create_2.png)

- 3rd Way: Drag a TiledMap asset from **Assets** to the `Tmx Asset` property of a TiledMap Component:

    ![tiledmap](tiledmap/create_3.png)

## Store in Project

In order to improve the efficiency of management, we suggest that put the TiledMap assets together in a separate folder.
