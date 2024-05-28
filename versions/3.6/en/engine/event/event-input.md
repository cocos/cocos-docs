# Input Event System

As mentioned in the previous document, `EventTarget` supports a complete set of event listening and emitting mechanisms. In Cocos Creator v3.4.0, `input` object is supported, which implements the event registering interface of `EventTarget`, and can register global system input events through this object. The original `systemEvent` object has been deprecated since v3.4.0 and will be gradually removed in the future, we recommend using the `input` object as a replacement.

The differences between `systemEvent` and `input` are as follows:

- **Differences in type definitions**

    - The declaration of touch event callback in `systemEvent` is `(touch: Touch, event: EventTouch) => void`

    - The declaration of touch event callback in `input` is `(event: EventTouch) => void`

- **Differences in priority**

    - The event listener of `systemEvent` will be intercepted by the event listener of the node.

    - `input` objects have higher priority than nodes and will not be intercepted.

    > __Note__: we lowered the priority of `input` in **v3.4.1**, so there is no difference in priority between the two objects since v3.4.1.

---

In this section, the handling of global input events in Cocos Creator will be introduced.

**Global input events** are irrelevant with the node hierarchy, so they are dispatched globally by `input`, currently supported:

- Mouse
- Touch
- Keyboard
- DeviceMotion

## How to define the input events

Use `input.on(type, callback, target)` to register global input event listeners. Event types included:

| Input Event | `type` |
| :----- | :---------- |
| Mouse Event | `Input.EventType.MOUSE_DOWN`<br>`Input.EventType.MOUSE_MOVE`<br>`Input.EventType.MOUSE_UP`<br>`Input.EventType.MOUSE_WHEEL` |
| Touch Event | `Input.EventType.TOUCH_START`<br>`Input.EventType.TOUCH_MOVE`<br>`Input.EventType.TOUCH_END`<br>`Input.EventType.TOUCH_CANCEL` |
| Keyboard Event | `Input.EventType.KEY_DOWN` (keyboard pressed)<br>`Input.EventType.KEY_PRESSING` (keyboard continuously pressed)<br>`Input.EventType.KEY_UP` (keyboard release) |
| DeviceMotion Event | `Input.EventType.DEVICEMOTION` |

### Pointer Events

Pointer events include mouse and touch events.

- Event listener types

    - Mouse event listening

        - `Input.EventType.MOUSE_DOWN`

        - `Input.EventType.MOUSE_MOVE`

        - `Input.EventType.MOUSE_UP`

        - `Input.EventType.MOUSE_WHEEL`

    - Touch event listening

        - `Input.EventType.TOUCH_START`

        - `Input.EventType.TOUCH_MOVE`

        - `Input.EventType.TOUCH_CANCEL`

        - `Input.EventType.TOUCH_END`

- Callback function after event triggering

    - Custom callback function: `callback(event);`

- Callback parameter

    - [EventMouse](%__APIDOC__%/en/class/EventMouse) or [EventTouch](__APIDOC__/en/class/EventTouch)

Examples of the use of pointer events are as follows:

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
        console.log(event.getLocation());  // location on screen space
        console.log(event.getUILocation());  // location on UI space
    }
}
```

### Keyboard events

- Event listener types

    - `Input.EventType.KEY_DOWN`

    - `Input.EventType.KEY_PRESSING`

    - `Input.EventType.KEY_UP`

- Callback function after event triggering

    - Custom Function: `callback(event);`

- Callback parameter

    - [EventKeyboard](%__APIDOC__%/en/class/EventKeyboard)

Examples of the use of keyboard events are as follows:

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

### Device Motion

- Event listener type

    - `Input.EventType.DEVICEMOTION`

- Callback function after event triggering

    - Custom callback function: `callback(event);`

- Callback parameter

    - [EventAcceleration](%__APIDOC__%/en/class/EventAcceleration)

Examples of the use of DeviceMotion events are as follows:

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

The specific usage can be found in the example [event](https://github.com/cocos/cocos-test-projects/tree/v3.6/assets/cases/event), which contains the implementation of keyboard, accelerometer, single-touch, multi-touch and other functions.

## Touch detection for 3D objects

The touch detection for 3D objects and 2D UI nodes is different:

- 2D UI nodes only need the size information provided by the `UITransform` component and the position information of the node to do the touch detection. For details, please refer to [Node Event System](event-node.md).

- The touch detection for 3D objects needs to be implemented by ray cast. The specific method is to generate a ray from the rendering camera of the 3D object to the screen coordinates of the touch point to determine whether the ray hits the object that was detected. The specific code implementation is as follows: 

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
