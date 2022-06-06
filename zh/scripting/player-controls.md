# 全局系统事件

本篇教程，我们将介绍 Cocos Creator 的全局系统事件。

全局系统事件是指与节点树不相关的各种全局事件，由 `cc.systemEvent` 来统一派发，目前支持以下几种事件：

- 键盘事件
- 设备重力传感事件

除此之外，鼠标事件与触摸事件请参考 [节点系统事件](./internal-events.md)

> **注意**：目前不建议直接使用 `cc.eventManager` 来注册任何事件，`cc.eventManager` 的用法也不保证持续性，有可能随时被修改。

## 如何定义输入事件

键盘、设备重力传感器此类全局事件是通过函数 `cc.systemEvent.on(type, callback, target)` 注册的。

可选的 `type` 类型有:

1. cc.SystemEvent.EventType.KEY_DOWN (键盘按下)
2. cc.SystemEvent.EventType.KEY_UP (键盘释放)
3. cc.SystemEvent.EventType.DEVICEMOTION (设备重力传感)

### 键盘事件

- 事件监听器类型：`cc.SystemEvent.EventType.KEY_DOWN` 和 `cc.SystemEvent.EventType.KEY_UP`
- 事件触发后的回调函数：
  - 自定义回调函数：`callback(event);`
- 回调参数：
  - KeyCode：[API 传送门](../../../api/zh/enums/KEY.html)
  - Event：[API 传送门](../../../api/zh/classes/Event.html)

```js
cc.Class({
    extends: cc.Component,
    onLoad: function () {
        // add key down and key up event
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    },

    onDestroy () {
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

### 设备重力传感事件

- 事件监听器类型：`cc.SystemEvent.EventType.DEVICEMOTION`
- 事件触发后的回调函数：
  - 自定义回调函数：`callback(event);`
- 回调参数：
  - Event：[API 传送门](../../../api/zh/classes/Event.html)

```js
cc.Class({
    extends: cc.Component,
    onLoad () {
        // open Accelerometer
        cc.systemEvent.setAccelerometerEnabled(true);
        cc.systemEvent.on(cc.SystemEvent.EventType.DEVICEMOTION, this.onDeviceMotionEvent, this);
    },
    
    onDestroy () {
        cc.systemEvent.off(cc.SystemEvent.EventType.DEVICEMOTION, this.onDeviceMotionEvent, this);
    },
    
    onDeviceMotionEvent (event) {
        cc.log(event.acc.x + "   " + event.acc.y);
    },
});
```

也可以参考 **官方范例**（[GitHub](https://github.com/cocos/example-projects) | [Gitee](https://gitee.com/mirrors_cocos-creator/example-cases)）`assets/cases/03_gameplay/01_player_control` 目录下的完整范例（包含了键盘、重力感应、单点触摸、多点触摸等范例）。
