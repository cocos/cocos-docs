# Global System Events

In this section, the `global system events` of __Cocos Creator__ will be introduced.

`Global system events` are irrelevant with the node hierarchy, so they are dispatched globally by `systemEvent`, currently supported:

- Mouse
- Touch
- Keyboard
- DeviceMotion

The global mouse and touch events are very similar to the node events, except that the area of action is different. The following is a description of these events.

## The difference between node events and global mouse and touch events

> __Note__: before beginning this section, read up on [Auto fit for multi-resolution](../../ui-system/components/engine/multi-resolution.md#Design-resolution-and-screen-resolution) and understand the screen area and UI display area.

When listening for global mouse/touch events, the acquired contacts are calculated based on the bottom left corner of the screen area (device display resolution). The contacts fetched by the UI node listener are not the same as the contacts fetched by the global event, which are converted to the points calculated in the lower left corner of the adapted UI viewable area. Global touch points are better suited for manipulating the behavior of 3D nodes by tapping directly on the screen, without having to add UI nodes to the scene to listen for mouse/touch events.

## How to define the input events

Use `systemEvent.on(type, callback, target)` to register Keyboard and DeviceMotion event listeners.

Event types included:

1. `SystemEventType.KEY_DOWN`
2. `SystemEventType.KEY_UP`
3. `SystemEventType.DEVICEMOTION`

### Keyboard events

- Type: `SystemEventType.KEY_DOWN` and `SystemEventType.KEY_UP`
- Call Back:
    - Custom Event: callback(event);
- Call Back Parameter:
    - KeyCode: [API Reference](__APIDOC__/en/classes/event.eventkeyboard-1.html)
    - Event: [API Reference](__APIDOC__/en/classes/event.event-1.html)

```ts
import { _decorator, Component, Node, systemEvent, SystemEventType, EventKeyboard, macro } from 'cc';
const { ccclass } = _decorator;

@ccclass("Example")
export class Example extends Component {
    onLoad () {
        systemEvent.on(SystemEventType.KEY_DOWN, this.onKeyDown, this);
        systemEvent.on(SystemEventType.KEY_UP, this.onKeyUp, this);
    }

    onDestroy () {
        systemEvent.off(SystemEventType.KEY_DOWN, this.onKeyDown, this);
        systemEvent.off(SystemEventType.KEY_UP, this.onKeyUp, this);
    }

    onKeyDown (event: EventKeyboard) {
        switch(event.keyCode) {
            case macro.KEY.a:
                console.log('Press a key');
                break;
        }
    }

    onKeyUp (event: EventKeyboard) {
        switch(event.keyCode) {
            case macro.KEY.a:
                console.log('Release a key');
                break;
        }
    }
}
```

### Device motion

- Type: `SystemEventType.DEVICEMOTION`
- Call back:
  - Custom event: `callback(event);`;
- Call back parameter:
  - Event: [API Reference](__APIDOC__/en/classes/event.event-1.html)

```ts
import { _decorator, Component, Node, systemEvent, SystemEventType, log } from 'cc';
const { ccclass } = _decorator;

@ccclass("Example")
export class Example extends Component {
    onLoad () {
        systemEvent.setAccelerometerEnabled(true);
        systemEvent.on(SystemEventType.DEVICEMOTION, this.onDeviceMotionEvent, this);
    }

    onDestroy () {
        systemEvent.off(SystemEventType.DEVICEMOTION, this.onDeviceMotionEvent, this);
    }

    onDeviceMotionEvent (event: EventAcceleration) {
        log(event.acc.x + "   " + event.acc.y);
    }
}
```

Please review the [test-cases-3d](https://github.com/cocos/cocos-test-projects/tree/v3.0/assets/cases/event) (This includes the keyboard, accelerometer, single point touch, multi-touch examples).
