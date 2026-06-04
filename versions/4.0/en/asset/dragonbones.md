# Skeletal Animation Assets (DragonBones)

DragonBones skeletal animation assets are data formats exported by [DragonBones](http://dragonbones.com/) (supports DragonBones v5.6.3 and below).

## Import DragonBones Skeleton Animation Assets

DragonBones skeletal animation assets include

- `.json`/`.dbbin` skeleton data
- `.json` atlas data
- `.png` atlas textures

  ![DragonBones](dragonbones/import.png)

## Create Skeletal Animation Assets

Using DragonBones skeletal animation assets in a scene requires two steps:

1. Create nodes and add DragonBones components

    Drag the skeletal animation asset from the **Assets** panel to the Dragon Asset property of the created DragonBones component:

    ![DragonBones](dragonbones/set_asset.png)

2. Set the atlas data for the DragonBones component

    Drag the atlas data from the **Assets** panel to the Dragon Atlas Asset property of the DragonBones component:

    ![DragonBones](dragonbones/set_atlas.png)

## Storage in the Project

For efficient asset management, it is recommended to store the imported asset files in a separate directory so that they won't mix with other assets.
