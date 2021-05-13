# UITransform Component Reference

The UITransform component defines the rectangle information on the UI, including the content size and anchor position of the rectangle. This component allows developers to modify the size and position of the rectangle freely, generally for rendering, calculation of click events, UI layout, screen adaptation, etc.

Click the __Add Component__ button at the bottom of the __Inspector__ panel and select __UITransform__ from __UI__ to add the UITransform component to the node.

Please refer to the [UITransform API](__APIDOC__/en/classes/ui.uitransform.html).

## UITransform Properties

| Property | Function Explanation
| :-------------- | :----------- |
| **ContentSize** | The content size of UI rectangle.
| **AnchorPoint** | The anchor position of UI rectangle.

### change the size and anchor point in script. Example:

```ts
import { _decorator, Component, Node, UITransform } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Example')
export class Example extends Component {

    start () {
        const uiTransform = this.getComponent(UITransform);
        // method one
        uiTransform.setContentSize(200, 120);
        uiTransform.setAnchorPoint(0, 0.5);

        // method two
        uiTransform.width = 200;
        uiTransform.height = 120;
        uiTransform.anchorX = 0;
        uiTransform.anchorY = 0.5;
    }
}
```

### Deprecation of the priority property

The priority property of the UITransform component was deprecated in version 3.1, and users can adjust the rendering order by setting the order of the node tree using `setSiblingIndex()`.

A note on the removal of the priority property and the recommended SiblingIndex property.
The priority property on the UITransform component has been removed due to unclear ideation and naming conflicts with other properties in the engine, which was originally designed to provide a shortcut for the user to sort the node tree and has no other use in itself, and is not related to the priority expressed by priority.

After removing this property, users can still use the setSiblingIndex method to set the node tree order, but the difference is that there is a default value for priority and the siblingIndex of the node is actually the position of the node in the parent node, so after the node tree changes, the This requires the user to know the relative position of the node in the parent node and control it when using the setSiblingIndex method in order to get the expected result. The point of the modification here is that the user should not directly equate the siblingIndex property with the priority (old) property to understand the use of siblingIndex, as their meaning is different.

Considering the need for quick sorting of nodes, we will provide a more convenient and quick interface for users to sort nodes in future versions.
