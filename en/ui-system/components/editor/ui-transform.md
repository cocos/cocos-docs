# UITransform Component Reference

The UITransform component defines the rectangle information on the UI, including the content size and anchor position of the rectangle. This component allows developers to modify the size and position of the rectangle freely, generally for rendering, calculation of click events, UI layout, screen adaptation, etc.

Click the __Add Component__ button at the bottom of the __Inspector__ panel and select __UITransform__ from __UI__ to add the UITransform component to the node.

Please refer to the [UITransform API](__APIDOC__/en/classes/ui.uitransform.html).

## UITransform Properties

| Property | Function Explanation
| :-------------- | :----------- |
| **ContentSize** | The content size of UI rectangle.
| **AnchorPoint** | The anchor position of UI rectangle.
| **Priority** | The priority of UI nodes, sorted in the parent node. The order of the Canvas node is not affected by this property.

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
