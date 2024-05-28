# Button Component Reference

The __Button__ component responds to a click from the user. When the user clicks a __Button__, its status will change. In addition, users can assign a custom behavior to buttons' __click event__.

![button.png](./button/button.png)

![button-color](./button/button-color.png)

Click the __Add Component__ button at the bottom of the __Inspector__ panel and select __UI/Button__ to add the __Button__ component to the node.

To use `Button`, please refer to the [Button API](%__APIDOC__%/en/class/Button) documentation and the [Button](https://github.com/cocos/cocos-test-projects/tree/v3.6/assets/cases/ui/03.button) scene of the test-cases-3d project.

## Button Properties

| Property   | Function Explanation |
| ------------ | -------------------- |
| __Target__       | Specify the __Button__ background node. When the __Button__ status changes, the `Color` or `Sprite` property of the node will be modified. |
| __Interactable__ | Boolean type, if set to `false` then the __Button__ component enters the forbidden state. |
| __Transition__   | Enumeration type, including __NONE__, __COLOR__, __SPRITE__ and __SCALE__. Each type corresponds to a different Transition setting. Please see the __Button Transition__ section below for details. |
| __ClickEvents__  | List type, default is null. Each event added by the user is composed of the node reference, component name and a response function. Please see the __Button Event__ section below for details. |

## Button Transition

__Button Transition__ is used to choose the action of the button when clicked by the user. Currently the types available are __NONE__, __COLOR__, __SPRITE__ and __SCALE__.

![transition](button/transition.png)

### Color Transition

![color-transition](button/color-transition.png)

| Property | Function Explanation |
| ---------- | -------------------- |
| __Normal__     | Color of Button under Normal status.    |
| __Pressed__    | Color of Button under Pressed status.   |
| __Hover__      | Color of Button under Hover status.     |
| __Disabled__   | Color of Button under Disabled status.  |
| __Duration__   | Time interval needed for Button status switching. |

### Sprite Transition

![sprite-transition](button/sprite-transition.png)

| Property     | Function Explanation |
| -------------- | -------------------- |
| __Normal__     | SpriteFrame of Button under Normal status.   |
| __Pressed__    | SpriteFrame of Button under Pressed status.  |
| __Hover__      | SpriteFrame of Button under Hover status.    |
| __Disabled__   | SpriteFrame of Button under Disabled status. |

### Scale Transition

![scaleTransition](button/scaleTransition.png)

| Property     | Function Explanation            |
| -------------- | -----------    |
| __Duration__   | Time interval needed for Button status switching. |
| __ZoomScale__  | When the user clicks the button, the button will zoom to a scale. The final scale of the button equals to the button's original `scale * zoomScale`, and the zoomScale can be a negative value.|

## Button Click Events

The __Button__ can additionally add a __click event__ to respond to the player's __click action__. There are two ways to achieve this.

### Add a callback using the Properties

![button-event](button/button-event.png)

| Property        | Function Explanation                              |
| --------------  | -----------                                       |
| __Target__          | Node with the script component.                   |
| __Component__       | Script component name.                            |
| __Handler__         | Assign a callback function from the given component which will be triggered when the user clicks the Button. |
| __CustomEventData__ | A user-defined string value passed as the last event argument of the event callback. |

### Add a callback using the script

There are two ways to add a callback through the script.

1. The event callback added by this method is the same as the event callback added by the editor, all added by the script. First you need to construct a `EventHandler` object, and then set the corresponding `target`, `component`, `handler` and `customEventData` parameters.

    ```ts
    import { _decorator, Component, Event, Node, Button, EventHandler } from 'cc';
    const { ccclass, property } = _decorator;

    @ccclass("example")
    export class example extends Component {
        onLoad () {
            const clickEventHandler = new EventHandler();
            // This node is the node to which your event handler code component belongs
            clickEventHandler.target = this.node;
            // This is the script class name
            clickEventHandler.component = 'example';
            clickEventHandler.handler = 'callback';
            clickEventHandler.customEventData = 'foobar';

            const button = this.node.getComponent(Button);
            button.clickEvents.push(clickEventHandler);
        }

        callback (event: Event, customEventData: string) {
            // The event here is a Touch object, and you can get the send node of the event by event.target
            const node = event.target as Node;
            const button = node.getComponent(Button);
            console.log(customEventData); // foobar
        }
    }
    ```

2. By `button.node.on ('click', ...)` to add event callback. This is a very simple way, but the way has some limitations, in the event callback the screen coordinate point of the current click button cannot be obtained.

    ```ts
    // Suppose we add an event handler callback to the onLoad method of a component and handle the event in the callback function:
    import { _decorator, Component, Button } from 'cc';
    const { ccclass, property } = _decorator;

    @ccclass("example")
    export class example ex tends Component {
        @property(Button)
        button: Button | null = null;
        onLoad () {
            this.button.node.on(Button.EventType.CLICK, this.callback, this);
        }

        callback (button: Button) {
            // Note that events registered this way cannot pass customEventData
        }
    }
    ```
