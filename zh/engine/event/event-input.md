# 全局系统事件

本篇教程，我们将介绍 Cocos Creator 的全局系统事件。

全局系统事件是指与节点树不相关的各种全局事件，由 `cc.systemEvent` 来统一派发，目前支持了以下几种事件：

- 键盘事件
- 设备重力传感事件

除此之外，鼠标事件与触摸事件同节点系统事件类似，只是将其中的注册对象由 `Node` 改为 `cc.systemEvent`，请参考 [节点系统事件](event-builtin.md)。

## 如何定义输入事件

键盘、设备重力传感器此类全局事件是通过函数 `cc.systemEvent.on(type, callback, target)` 注册的。

可选的 `type` 类型有:

1. cc.SystemEventType.KEY_DOWN （键盘按下）
2. cc.SystemEventType.KEY_UP （键盘释放）
3. cc.SystemEventType.DEVICEMOTION （设备重力传感）

### 键盘事件

- 事件监听器类型：`cc.SystemEventType.KEY_DOWN` 和 `cc.SystemEventType.KEY_UP`
- 事件触发后的回调函数：
    - 自定义回调函数：callback(event);
- 回调参数：
    - KeyCode： [API 传送门](https://docs.cocos.com/creator3d/api/zh/classes/event.eventkeyboard-1.html)
    - Event：[API 传送门](https://docs.cocos.com/creator3d/api/zh/classes/event.event-1.html)

```ts
import { _decorator, Component, Node, systemEvent, SystemEventType, EventMouse, macro } from "cc";
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

    onKeyDown (event: EventMouse) {
        switch(event.keyCode) {
            case macro.KEY.a:
                console.log('Press a key');
                break;
        }
    }

    onKeyUp (event: EventMouse) {
        switch(event.keyCode) {
            case macro.KEY.a:
                console.log('Release a key');
                break;
        }
    }
}
```

### 设备重力传感事件

- 事件监听器类型：`cc.SystemEventType.DEVICEMOTION`
- 事件触发后的回调函数：
    - 自定义回调函数：`callback(event);`;
- 回调参数：
    - Event：[API 传送门](https://docs.cocos.com/creator3d/api/zh/classes/event.event-1.html)

```ts
import { _decorator, Component, Node, systemEvent, SystemEventType, EventMouse, macro, log } from "cc";
const { ccclass } = _decorator;

@ccclass("Example")
export class Example extends Component {
    onLoad(){
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

完整范例可参考 [test-cases-3d](https://github.com/cocos-creator/test-cases-3d/tree/master/assets/cases/event) 目录（这里包含了键盘、重力感应、单点触摸、多点触摸的范例）。
