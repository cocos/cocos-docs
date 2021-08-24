# 全局系统事件

本篇教程，我们将介绍 Cocos Creator 的全局系统事件。

全局系统事件是指与节点树不相关的各种全局事件，由 `systemEvent` 来统一派发，目前支持了以下几种事件：

- 鼠标事件
- 触摸事件
- 键盘事件
- 设备重力传感事件

其中，鼠标事件与触摸事件同节点系统事件类似，只是在于作用的区域不同。接下来会围绕这几个事件做个说明。

## 节点事件和全局鼠标/触摸事件的区别

在开始这部分内容之前，希望大家先提前阅读一下 [多分辨率适配方案](../../ui-system/components/engine/multi-resolution.md#设计分辨率和屏幕分辨率)，了解屏幕区域和 UI 显示区域。当监听全局鼠标/触摸事件的时候，所获取到的触点是基于屏幕区域（设备显示分辨率）左下角计算的。而 UI 节点监听获取到的触点，是将全局事件获取到的触点，转换到适配后的 UI 可视区域左下角计算出的点，这两个点是不一样的。全局触点比较适用于直接点击屏幕去操控 3D 节点的行为，而不需要为场景添加 UI 节点去做鼠标/触摸事件的监听。

## 如何定义输入事件

键盘、设备重力传感器此类全局事件是通过函数 `systemEvent.on(type, callback, target)` 注册的。

可选的 `type` 类型有:

1. SystemEvent.EventType.KEY_DOWN（键盘按下）
2. SystemEvent.EventType.KEY_UP（键盘释放）
3. SystemEvent.EventType.DEVICEMOTION（设备重力传感）

### 键盘事件

- 事件监听器类型：`SystemEvent.EventType.KEY_DOWN` 和 `SystemEvent.EventType.KEY_UP`
- 事件触发后的回调函数：
    - 自定义回调函数：callback(event);
- 回调参数：
    - KeyCode：[API 传送门](__APIDOC__/zh/#/docs/3.3/zh/event/Class/EventKeyboard)
    - Event：[API 传送门](__APIDOC__/zh/#/docs/3.3/zh/event/Class/Event)

```ts
import { _decorator, Component, Node, systemEvent, SystemEvent, EventKeyboard, KeyCode } from 'cc';
const { ccclass } = _decorator;

@ccclass("Example")
export class Example extends Component {
    onLoad () {
        systemEvent.on(SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        systemEvent.on(SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    }

    onDestroy () {
        systemEvent.off(SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        systemEvent.off(SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    }

    onKeyDown (event: EventKeyboard) {
        switch(event.keyCode) {
            case KeyCode.KEY_A:
                console.log('Press a key');
                break;
        }
    }

    onKeyUp (event: EventKeyboard) {
        switch(event.keyCode) {
            case KeyCode.KEY_A:
                console.log('Release a key');
                break;
        }
    }
}
```

### 设备重力传感事件

- 事件监听器类型：`SystemEvent.EventType.DEVICEMOTION`
- 事件触发后的回调函数：
    - 自定义回调函数：`callback(event);`
- 回调参数：
    - Event：[API 传送门](__APIDOC__/zh/#/docs/3.3/zh/event/Class/Event)

```ts
import { _decorator, Component, Node, systemEvent, SystemEvent, log } from 'cc';
const { ccclass } = _decorator;

@ccclass("Example")
export class Example extends Component {
    onLoad () {
        systemEvent.setAccelerometerEnabled(true);
        systemEvent.on(SystemEvent.EventType.DEVICEMOTION, this.onDeviceMotionEvent, this);
    }

    onDestroy () {
        systemEvent.off(SystemEvent.EventType.DEVICEMOTION, this.onDeviceMotionEvent, this);
    }

    onDeviceMotionEvent (event: EventAcceleration) {
        log(event.acc.x + "   " + event.acc.y);
    }
}
```

具体使用方法可参考范例 **event**（[GitHub](https://github.com/cocos-creator/test-cases-3d/tree/v3.0/assets/cases/event) | [Gitee](https://gitee.com/mirrors_cocos-creator/test-cases-3d/tree/v3.0/assets/cases/event)），包含了键盘、重力感应、单点触摸、多点触摸等功能的实现。
