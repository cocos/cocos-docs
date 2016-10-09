# 玩家输入事件

本篇教程，我们将介绍 Cocos Creator 的玩家输入事件。

目前支持了以下几种事件：

- 键盘事件
- 鼠标事件
- 触摸事件
- 设备重力传感事件

注意：目前已经不建议直接使用 cc.eventManager 来注册任何事件，cc.eventManager 的用法也不保证持续性，有可能随时被修改

## 如何定义输入事件

除了键盘、设备重力传感器事件是通过函数 `cc.systemEvent.on(type, callback, target)` 注册以外
其他的例如：鼠标事件与触摸事件请参考[系统内置事件](./internal-events.md)。

可选的 `type` 类型有:
1. cc.SystemEvent.EventType.KEY_DOWN (键盘按下)
2. cc.SystemEvent.EventType.KEY_UP (键盘释放)
3. cc.SystemEvent.EventType.DEVICEMOTION (设备重力传感)

### 键盘事件

- 事件监听器类型：`cc.SystemEvent.EventType.KEY_DOWN` 和 `cc.SystemEvent.EventType.KEY_UP`
- 事件触发后的回调函数：
    - 自定义回调函数：callback(event);
- 回调参数：
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

### 设备重力传感事件

- 事件监听器类型：`cc.SystemEvent.EventType.DEVICEMOTION`
- 事件触发后的回调函数：
    - 自定义回调函数：callback(event);;
- 回调参数：
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

大家可以也去看 [官方范例](https://github.com/cocos-creator/example-cases) `cases03_gameplay/01_player_control` 目录下的完整范例（这里包含了，键盘，重力感应，单点触摸，多点触摸的范例）。
