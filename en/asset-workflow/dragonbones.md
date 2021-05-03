# DragonBones

DragonBones skeleton animation resources are data formats that exported by [DragonBones](http://dragonbones.com/) editor (Support for DragonBones v5.6.2 and below).

## Import DragonBones skeleton animation resources

DragonBones skeleton animation resources are:

- `.json`/`.dbbin` skeletal data
- `.json` Atlas data
- `.png` Atlas texture

  ![DragonBones](dragonbones/import.png)

## Create skeletal animation resources

Using DragonBones skeleton animation resources in a scene requires two steps:

1. Create a node and add the DragonBones component, which can be implemented in three ways:

    - The first way: from the **Assets** drag the skeleton animation resources to **Node Tree**:

      ![DragonBones](dragonbones/create_1.png)

    - from the **Assets** drag the skeleton animation resources to **Scene**:

      ![DragonBones](dragonbones/create_2.png)

    - Drag the skeletal animation resource from the **Assets** to the Dragon Asset attribute of the DragonBones component that has been created:

      ![DragonBones](dragonbones/create_3.png)

2. Set Atlas for DragonBones Components

    Drag the Atlas data from the **Assets** to the Dragon Atlas Asset property of the DragonBones component:

      ![DragonBones](dragonbones/set_atlas.png)

## Stored in the project

In order to improve the efficiency of resource management, it is recommended to import the resource file stored in a separate directory, do not mix with other resources.
