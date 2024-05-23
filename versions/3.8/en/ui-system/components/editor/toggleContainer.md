# ToggleContainer Component Reference

ToggleContainer is not a visible UI component but it can be used to modify the behavior of a set of Toggle components. Toggles that belong to the same ToggleContainer could only have one of them to be switched on at a time.

![toggle-container](toggle/toggle-container.png)

> __Note__: all the first layer child node containing the Toggle component will auto be added to the container.

Click the __Add Component__ button at the bottom of the __Inspector__ panel and select __UI/ToggleContainer__ to add the ToggleContainer component to the node.

To use `ToggleContainer`, please refer to the [ToggleContainer API](__APIDOC__/en/class/ToggleContainer) documentation and the [Toggle](https://github.com/cocos/cocos-test-projects/tree/v3.8/assets/cases/ui/09.toggle) scene of the test-cases-3d project.

## ToggleContainer Properties

| Property |   Functions Explanation |
| :-------------- | :----------- |
| **AllowSwitchOff** | If it is enabled, then the toggle button can be checked and unchecked repeatedly when it is clicked. If it is disabled, it will make sure there is always only one toggle could be checked and the already checked toggle can't be unchecked |
| **CheckEvents** | List type, default is null. Each event added by the user is composed of the node reference, component name and a response function. Please see the __ToggleContainer Event__ section below for details |

## ToggleContainer Event

For event structure you can refer to the [Button](./button.md) documentation.

The ToggleContainer event callback has two parameters, the first one is the ToggleContainer itself and the second is the `customEventData`.

## Detailed Explanation

The ToggleContainer won't be used alone and it usually be used with `Toggle` to implement the RadioButton.

## Add a callback through the script code

The event callback added by this method is the same as the event callback added by the editor, all added by code. First you need to construct a `EventHandler` object, and then set the corresponding `target`, `component`, `handler` and `customEventData` parameters.

```ts
import { _decorator, Component, Event, Node, ToggleContainerComponent, EventHandler } from 'cc';
const { ccclass, property } = _decorator;

@ccclass("example")
export class example extends Component {
    onLoad(){
        const containerEventHandler = new EventHandler();
        // This Node is the node to which your event processing code component belongs
        containerEventHandler.target = this.node;
        // This is the script class name
        containerEventHandler.component = 'example';
        containerEventHandler.handler = 'callback';
        containerEventHandler.customEventData = 'foobar';

        const container = this.node.getComponent(ToggleContainerComponent);
        container.checkEvents.push(containerEventHandler);
    }

    callback(event: Event, customEventData: string){
        // The event here is a Touch Event object, and you can get the send node of the event by event.target
        // The customEventData parameter here is equal to the "foobar" you set before
    }
}
```
