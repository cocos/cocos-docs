# TiledMap Assets

The **TiledMap** asset is a data format exported by [Tiled Editor](https://www.mapeditor.org/).

| Creator Version | Tiled Version |
| :---------- | :-------- |
| v3.0 and above | v1.4   |
| v2.2 and above | v1.2.0 |
| v2.1 and below | v1.0.0 |

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

For efficient asset management, it is recommended to store the imported `.tmx`, `.tsx` and `.png` files in a separate directory and not mixed with other assets. Note that it is important to manage the `tmx` file and the `tsx` file in the same directory, otherwise the assets may not be loaded correctly.
