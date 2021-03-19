# TiledMap Assets

The **TiledMap** asset is a data format exported by [Tiled Map Editor](https://www.mapeditor.org/) (TiledMap v1.2.0 is supported by Cocos Creator 3.0).

## Importing Map Assets

The assets required for using a map are:

- `.tmx` map data
- `.png` atlas textures
- `.tsx` tileset data configuration file (required for some tmx files)

    ![tiledmap](tiledmap/import.png)

## Create TiledMap Assets

Drag the map asset from the **Assets** panel into the `Tmx file` property of the created **TiledMap** component.

![tiledmap](tiledmap/set_asset.png)

## Storage in the Project

For efficient asset management, it is recommended to store the imported `.tmx`, `.tsx` and `.png` files in a separate directory, not mixed with other assets.
