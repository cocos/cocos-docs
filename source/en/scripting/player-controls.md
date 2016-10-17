# Player Controls

We will introduce the player input events of Cocos Creator.

目前支持了以下几种事件：

- Keyboard
- Mouse
- Touch
- DeviceMotion 

## How to define the input events

Keyboard and DeviceMotion please use `cc.systemEvent.on(type, callback, target)` to register,
If you use Mouse and Touch Event refer to [internal-events](./internal-events.md)。

Event types include:
1. cc.SystemEvent.EventType.KEY_DOWN
2. cc.SystemEvent.EventType.KEY_UP
3. cc.SystemEvent.EventType.DEVICEMOTION

IMPORTANT: From v1.3, we strongly discourage any usage of cc.eventManager, all its functionality can be achieved via
cc.systemEvent and cc.Node's event API. We no longer guarantee the API of cc.eventManager, it could be refactored 
any time in the future.

### Keyboard Events

- Type：`cc.SystemEvent.EventType.KEY_DOWN` 和 `cc.SystemEvent.EventType.KEY_UP`
- Call Back: Custom Event：callback(event);
- Call Back Parameter：
    - KeyCode: [API 传送门](http://cocos.com/docs/creator/api/enums/KEY.html)
    - Event：[API 传送门](http://cocos.com/docs/creator/api/classes/Event.html)

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
            case cc.KEY.a:
                console.log('Press a key');
                break;
        }
    },
    
    onKeyUp: function (event) {
        switch(event.keyCode) {
            case cc.KEY.a:
                console.log('release a key');
                break;
        }
    }
});
```

### DEVICE MOTION

- Type：`cc.SystemEvent.EventType.DEVICEMOTION`
- Call Back: Custom Event：callback(event);
- Call Back Parameter：
    - Event：[API 传送门](http://cocos.com/docs/creator/api/classes/Event.html)

```js
cc.Class({
    extends: cc.Component,
    onLoad () {
        // open Accelerometer
        cc.inputManager.setAccelerometerEnabled(true);
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

You can go to [example-cases](https://github.com/cocos-creator/example-cases) `cases03_gameplay/01_player_control`(This includes the keyboard, accelerometer, single point touch, multitouch examples
).
