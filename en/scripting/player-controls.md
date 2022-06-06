# Global System Events

In this section, we will introduce the global system events of Cocos Creator.

Global system events are irrelevant with the node hierarchy, so they are dispatched globally by `cc.systemEvent`, currently supported:

- Keyboard
- DeviceMotion

If you are searching for any information about touch or mouse events, please refer to [Node System Events documentation](./internal-events.md).

> **Note**: we strongly discourage any usage of `cc.eventManager` in Cocos Creator, all its functionality can be achieved via
`cc.systemEvent` and `cc.Node`'s event API. We no longer guarantee the API of `cc.eventManager`, it could be refactored any time in the future.

## How to define the input events

You can use `cc.systemEvent.on(type, callback, target)` to register Keyboard and DeviceMotion event listeners.

Event types included:

1. cc.SystemEvent.EventType.KEY_DOWN
2. cc.SystemEvent.EventType.KEY_UP
3. cc.SystemEvent.EventType.DEVICEMOTION

### Keyboard Events

- Type: `cc.SystemEvent.EventType.KEY_DOWN` and `cc.SystemEvent.EventType.KEY_UP`
- Call Back: Custom Event: `callback(event);`
- Call Back Parameter:
  - KeyCode: [API Reference](../../../api/en/enums/KEY.html)
  - Event: [API Reference](../../../api/en/classes/Event.html)

```js
cc.Class({
    extends: cc.Component,
    onLoad: function () {
        // add key down and key up event
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    },

    destroy () {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    },

    onKeyDown: function (event) {
        switch(event.keyCode) {
            case cc.macro.KEY.a:
                console.log('Press a key');
                break;
        }
    },

    onKeyUp: function (event) {
        switch(event.keyCode) {
            case cc.macro.KEY.a:
                console.log('release a key');
                break;
        }
    }
});
```

### DEVICE MOTION

- Type: `cc.SystemEvent.EventType.DEVICEMOTION`
- Call Back: Custom Event: callback(event);
- Call Back Parameter:
  - Event: [API reference](../../../api/en/classes/Event.html)

```js
cc.Class({
    extends: cc.Component,
    onLoad () {
        // open Accelerometer
        cc.systemEvent.setAccelerometerEnabled(true);
        cc.systemEvent.on(cc.SystemEvent.EventType.DEVICEMOTION, this.onDeviceMotionEvent, this);
    },

    destroy () {
        cc.systemEvent.off(cc.SystemEvent.EventType.DEVICEMOTION, this.onDeviceMotionEvent, this);
    },

    onDeviceMotionEvent (event) {
        cc.log(event.acc.x + "   " + event.acc.y);
    },
});
```

Please refer to the `cases03_gameplay/01_player_control` directory of [example-cases](https://github.com/cocos/example-projects) for a complete list of examples (including keyboard, accelerometer, single touch, multi-touch, etc. examples).
