# 3D Physics Material

The 3D Physics Material refers to the material of the Collider surface, which is used to adjust the friction and elasticity of the Collider.

![](image/material-prop.png)

## Create 3D Physics Material

Just click the **+** button at the top left of the **Assets**, and then select the **Physics Material**.

![](image/create-material.png)

Another way is to select the folder in the **Assets** where you want to store the physics materials, then right-click and select **Create -> Physics Material**.

## Physics Material Properties

| Properties  | Function explanation           |
| ----------- | ----------                     |
| Friction    | The friction of the Collider   |
| Restitution | The elasticity of the Collider |

## Usage of the Physics Material

After creating the physics material, set the properties of the physics material in the **Properties** panel. Then select the node where the Collider component is located in the **Node Tree**, and drag the physics material to the Material property box of the Collider component.

![](image/set-material.png)
