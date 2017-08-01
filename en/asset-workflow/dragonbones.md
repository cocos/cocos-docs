# DragonBones

DragonBones skeleton animation resources are exported by DragonBones editor data format.

## Import DragonBones skeleton animation resources

DragonBones skeleton animation resources are:

- .json skeletal data
- .json Atlas data
- .png Atlas texture

![DragonBones](dragonbones/import.png)

## Create skeletal animation resources
Using DragonBones skeletal animation resources in a scene requires two steps:

**1. Create a node and add the DragonBones component, which can be implemented in three ways:**

    The first way: from the **Explorer** drag the skeleton animation resources to **level manager**:


![DragonBones](dragonbones/create_1.png)


    The second way: from the **Explorer** drag the skeleton animation resources to **scene**:

![DragonBones](dragonbones/create_2.png)

    The third way: Drag the skeletal animation resource from the **Explorer** to the Dragon Asset attribute of the DragonBones component that has been created:

![DragonBones](dragonbones/create_3.png)

**2. Set Atlas for DragonBones Components**

Drag the Atlas data from the **Explorer** to the Dragon Atlas Asset property of the DragonBones component:

![DragonBones](dragonbones/set_atlas.png)

## Stored in the project

In order to improve the efficiency of resource management, it is recommended to import the resource file stored in a separate directory, do not mix with other resources.