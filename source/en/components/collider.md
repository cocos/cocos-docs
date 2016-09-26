# Collider component reference

Click `add component` button at the bottom of **Properties** panel and then select **Collider** component from `add Collider component`, then you add the Collider component to the node.

## Collider component properties

| property |   Function Explanation
| -------------- | ----------- |
| tag | The collider tag. If there are several collider components in a node, you can use the tag to judge which collider component on the node is collided. 
| editing | Whether to edit this coliider component, only used in the editor.

## Detailed Explanation

One node can have several collider components, and these collider components can be different type.

We have three collider component types now, they are **Polygon**，**Cirecle**，**Box**. These component all inherit from **Collider** component.

### Polygon collider component properties
| property |   Function Explanation
| -------------- | ----------- |
| offset | Position offset from Component to Node.
| points | Component vertices array

### Cirecle collider component properties
| property |   Function Explanation
| -------------- | ----------- |
| offset | Position offset from Component to Node.
| radius | Component radius.

### Box collider component properties
| property |   Function Explanation
| -------------- | ----------- |
| offset | Position offset from Component to Node.
| size | Component size.


More information about **Collider** can be find in [Collider System](../physics/index.md)

