# About Assets

This section will introduce the overall workflow of the assets in __Cocos Creator__ in detail, and explain the use of various types of assets and items that may require attention.

## Assets Manager

The **Assets** panel is an important tool for accessing and managing assets, developers are recommended to familiarize themselves with the use of the **Assets** panel for managing assets. Read the [Assets Manager](../editor/assets/index.md) documentation for a detailed introduction.

## Assets Workflow

- **Assets Workflow** - the general Assets workflow including importing assets, synchronizing assets, locating assets, etc. can be found in the [Assets Workflow](asset-workflow.md) documentation.

## Common Assets type workflow

Next we will introduce the main **Asset** types and related workflows in __Cocos Creator__:

- [Scene Assets](scene.md)
- [Image Assets](image.md)
    - [Texture Map Assets](texture.md)
    - [Sprite Frame Assets](sprite-frame.md)
    - [Cube Map Assets](../concepts/scene/skybox.md#cubemap)
    - [Auto Crop of Image Assets](../ui-system/components/engine/trim.md)
    - [Atlas Assets](atlas.md)
    - [Render Texture](render-texture.md)
- [Prefabricated Assets](prefab.md)
- [Script Assets](script.md)
- [Font Assets](font.md)
- [Sound Assets](audio.md)
- [Material Assets](material.md)
- [Model Assets](./model/mesh.md)
    - [Export model assets from third-party tools](./model/dcc-export-mesh.md)
    - [glTF](./model/glTF.md)
- [Animation Assets](anim.md)
- [Spine Skeletal Animation Assets](spine.md)
- [DragonBones Skeletal Animation Assets](dragonbones.md)
- [TiledMap Assets](tiledmap.md)

## Asset Management Of Runtime

- [Asset Manager](asset-manager.md)
    - [AssetManager Upgrade Guide](asset-manager-upgrade-guide.md)
    - [Asset Bundle Upgrade Guide](subpackage-upgrade-guide.md)
    - [Dynamic load asset](dynamic-load-resources.md) 
    - [Asset Bundle](bundle.md)
    - [Release Of Resources](release-manager.md)
    - [Download and Parse](downloader-parser.md)
    - [Loading and Preloading](preload-load.md)
    - [Cache Manager](cache-manager.md)
    - [Optional Parameters](options.md)
    - [Pipeline and Task](pipeline-task.md)
    - [Resource Management Considerations -- meta files](asset/meta.md)
