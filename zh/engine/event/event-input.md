# 输入事件系统

`EventTarget` 支持了一套完整的 [事件监听和发射机制](event-emit.md) 。在 Cocos Creator 3.4.0 中，我们支持了 `input` 对象，该对象实现了 `EventTarget` 的事件监听接口，可以通过 `input` 对象监听全局的系统输入事件。而原先的 `systemEvent` 对象则从 v3.4.0 开始废弃了，未来将逐步移除，建议使用 `input` 对象作为替代。

`systemEvent` 和 `input` 二者的差异包括：

- **在类型定义上的差异**

    - `systemEvent` 的触摸事件回调的类型定义是 `(touch: Touch, event: EventTouch) => void`

    - `input` 的触摸事件回调的类型定义是 `(event: EventTouch) => void`

- **在优先级上的差异**

    - `systemEvent` 的事件监听器会被节点的事件监听器拦截

    - `input` 对象优先级比节点高，不会被拦截

    > **注意**：我们在 **v3.4.1** 中降低了 `input` 优先级，因此二者从 v3.4.1 开始在优先级上已经不存在差异了。

---

本篇文档我们将介绍在 Cocos Creator 中对全局输入事件的处理。

全局输入事件是指与节点树不相关的各种输入事件，由 `input` 来统一派发，目前支持了以下几种事件：

- 鼠标事件
- 触摸事件
- 键盘事件
- 设备重力传感事件

## 定义输入事件

上文提到的输入事件，都可以通过接口 `input.on(type, callback, target)` 注册。可选的 `type` 类型包括：

| 输入事件 | `type` 类型 |
| :----- | :---------- |
| 鼠标事件 | `Input.EventType.MOUSE_DOWN`<br>`Input.EventType.MOUSE_MOVE`<br>`Input.EventType.MOUSE_UP`<br>`Input.EventType.MOUSE_WHEEL` |
| 触摸事件 | `Input.EventType.TOUCH_START`<br>`Input.EventType.TOUCH_MOVE`<br>`Input.EventType.TOUCH_END`<br>`Input.EventType.TOUCH_CANCEL` |
| 键盘事件 | `Input.EventType.KEY_DOWN`（键盘按下）<br>`Input.EventType.KEY_PRESSING`（键盘持续按下）<br>`Input.EventType.KEY_UP`（键盘释放） |
| 设备重力传感事件 | `Input.EventType.DEVICEMOTION` |

### 指针事件

指针事件包括 **鼠标事件** 和 **触摸事件**。

- 事件监听器类型

    - 鼠标事件监听

        - `Input.EventType.MOUSE_DOWN`

        - `Input.EventType.MOUSE_MOVE`

        - `Input.EventType.MOUSE_UP`

        - `Input.EventType.MOUSE_WHEEL`

    - 触摸事件监听

        - `Input.EventType.TOUCH_START`

        - `Input.EventType.TOUCH_MOVE`

        - `Input.EventType.TOUCH_CANCEL`

        - `Input.EventType.TOUCH_END`

- 事件触发后的回调函数

    - 自定义回调函数：`callback(event);`

- 回调参数

    - [EventMouse](__APIDOC__/zh/class/EventMouse) 或 [EventTouch](__APIDOC__/zh/class/EventTouch)

指针事件的使用范例如下：

```ts
import { _decorator, Component, input, Input, EventTouch } from 'cc';
const { ccclass } = _decorator;

@ccclass("Example")
export class Example extends Component {
    onLoad () {
        input.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
    }

    onDestroy () {
        input.off(Input.EventType.TOUCH_START, this.onTouchStart, this);
    }

    onTouchStart(event: EventTouch) {
        console.log(event.getLocation());  // Location on screen space
        console.log(event.getUILocation());  // Location on UI space
    }
}
```

### 键盘事件

- 事件监听器类型

    - `Input.EventType.KEY_DOWN`

    - `Input.EventType.KEY_PRESSING`

    - `Input.EventType.KEY_UP`

- 事件触发后的回调函数

    - 自定义回调函数：`callback(event);`

- 回调参数

    - [EventKeyboard](__APIDOC__/zh/class/EventKeyboard)

使用键盘事件的代码示例如下：

```ts
import { _decorator, Component, input, Input, EventKeyboard, KeyCode } from 'cc';
const { ccclass } = _decorator;

@ccclass("Example")
export class Example extends Component {
    onLoad () {
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.on(Input.EventType.KEY_UP, this.onKeyUp, this);
    }

    onDestroy () {
        input.off(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.off(Input.EventType.KEY_UP, this.onKeyUp, this);
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

- 事件监听器类型

    - `Input.EventType.DEVICEMOTION`

- 事件触发后的回调函数

    - 自定义回调函数：`callback(event);`

- 回调参数

    - [EventAcceleration](__APIDOC__/zh/class/EventAcceleration)

使用设备重力传感事件的代码示例如下：

```ts
import { _decorator, Component, input, Input, log } from 'cc';
const { ccclass } = _decorator;

@ccclass("Example")
export class Example extends Component {
    onLoad () {
        input.setAccelerometerEnabled(true); 
        input.on(Input.EventType.DEVICEMOTION, this.onDeviceMotionEvent, this);
    }

    onDestroy () {
        input.off(Input.EventType.DEVICEMOTION, this.onDeviceMotionEvent, this);
    }

    onDeviceMotionEvent (event: EventAcceleration) {
        log(event.acc.x + "   " + event.acc.y);
    }
}
```

具体使用方法可参考范例 **event**（[GitHub](https://github.com/cocos-creator/test-cases-3d/tree/v3.5/assets/cases/event) | [Gitee](https://gitee.com/mirrors_cocos-creator/test-cases-3d/tree/v3.5/assets/cases/event)），其中包含了键盘、重力感应、单点触摸、多点触摸等功能的实现。

## 3D 物体的触摸检测

3D 物体与 2D UI 节点的触摸检测不同：

- 2D UI 节点只需要通过 `UITransform` 组件提供的尺寸信息和节点的位置信息，就可以实现触摸检测，详情请参考 [节点事件系统](event-node.md)。

- 3D 物体的触摸检测需要通过射线检测来实现。具体做法是通过渲染 3D 物体的 Camera 到触点的屏幕坐标，生成一条射线，判断射线是否穿过想要检测的对象。具体代码实现如下：

    ```ts
    import { _decorator, Component, Node, Camera, geometry, input, Input, EventTouch, PhysicsSystem } from 'cc';
    const { ccclass, property } = _decorator;

    @ccclass("Example")
    export class Example extends Component {

        // Specify the camera rendering the target node.
        @property(Camera)
        readonly cameraCom!: Camera;

        @property(Node)
        public targetNode!: Node

        private _ray: geometry.Ray = new geometry.Ray();

        onEnable () {
            input.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
        }

        onDisable () {
            input.off(Input.EventType.TOUCH_START, this.onTouchStart, this);
        }

        onTouchStart(event: EventTouch) {
            const touch = event.touch!;
            this.cameraCom.screenPointToRay(touch.getLocationX(), touch.getLocationY(), this._ray);
            if (PhysicsSystem.instance.raycast(this._ray)) {
                const raycastResults = PhysicsSystem.instance.raycastResults;
                for (let i = 0; i < raycastResults.length; i++) {
                    const item = raycastResults[i];
                    if (item.collider.node == this.targetNode) {
                        console.log('raycast hit the target node !');
                        break;
                    }
                }
            } else {
                console.log('raycast does not hit the target node !');
            }
        }
    }
    ```
