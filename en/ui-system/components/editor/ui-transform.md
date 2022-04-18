# UITransform Component Reference

The UITransform component defines the rectangle information on the UI, including the content size and anchor position of the rectangle. This component allows developers to modify the size and position of the rectangle freely, generally for rendering, calculation of click events, UI layout, screen adaptation, etc.

Click the __Add Component__ button at the bottom of the __Inspector__ panel and select __UITransform__ from __UI__ to add the UITransform component to the node.

Please refer to the [UITransform API](__APIDOC__/en/#/docs/3.5/en/ui/Class/UITransform).

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

The `priority` property of the **UITransform** component was deprecated in v3.1, and users can adjust the rendering order by setting the order of the node tree using `setSiblingIndex()`.

**Description of the deprecated `priority` property and the recommended `setSiblingIndex()` method**:

The `priority` property on the **UITransform** component was deprecated in v3.1 due to a lack of clarity and naming conflicts with other properties in the engine. The `priority` property was originally designed to provide a shortcut for the user to sort the node tree, but has no other use in itself and is not related to the meaning of "priority", and actually still adjusts the rendering order by changing the order of the node tree.

After deprecating the `priority` property, users can replace it with the `setSiblingIndex()` method, which adjusts the order of the node tree by affecting the `siblingIndex` property of the node. The difference is that the `priority` property has a default value and the `siblingIndex` property of a node is actually the position of the node in its parent node, so the value of the node's `siblingIndex` property will change when the node tree changes. This requires that when using the `setSiblingIndex()` method, the relative position of the node in the parent node is known and controlled in order to obtain the desired result.

> **Note**: the `siblingIndex` property should not be used in the same way as the `priority` (deprecated) property, as they have different meanings. To change the `siblingIndex` property, need to understand and know that it represents the position under the parent node and will change when the node tree changes, and can only be modified by the `setSiblingIndex()` method.

Considering the need for quick sorting of nodes, a more convenient and quick interface for users to sort nodes will be provided in future versions.
