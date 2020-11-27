# Event

**Events** are a messaging mechanism used for object interaction within the engine.

## Event monitoring

```ts
// The event listener will be triggered every time, you need to manually cancel the registration
xxx.on(type, func, target);
```

The event parameters are described below:

| Parameter | Description |
| :----- | :--- |
| type   | the event registration string. |
| func   | the callback for performing event monitoring. |
| target | the event receiving object. |

## Event cancellation

```ts
// Cancel all registered events of this type on the object
xxx.off(type);
// Cancel the event of the specified target of the specified callback on the object
xxx.off(type, func, target);
```

## Event distribution

```ts
// Dispatch parameters can be specified when the event is dispatched
xxx.emit(type, ...arg);
```

> **Note**: due to the performance considerations of the underlying event dispatch, only a maximum of **5** event parameters are supported here. Therefore, it is necessary to pay attention to the number of control parameters when passing parameters.

## Event descriptions

### System events

**System events** refer to global events, which are monitored and distributed directly from the browser.

```ts
systemEvent.on(type, func, target);
```

Currently supported system events are: **touch events**, **mouse events**, **gravity events**, and **key press events**. The global event type can be ontained by using `SystemEventType`.

| Event Name | Event Type Description |
| :----------- | :----------- |
| TOUCH_START  | Finger starts touch event. |
| TOUCH_MOVE   | When your finger moves on the screen. |
| TOUCH_END    | The finger ends the touch event. |
| TOUCH_CANCEL | When the finger leaves the screen outside the target node area. |
| MOUSE_DOWN   | Triggered once when the mouse is pressed. |
| MOUSE_MOVE   | When the mouse moves on the target node in the target node area, whether it is pressed or not. |
| MOUSE_UP     | Triggered once when the mouse is released from the pressed state. |
| MOUSE_WHEEL  | Mouse scroll event. |
| MOUSE_ENTER  | When the mouse moves into the target node area, whether it is pressed or not. |
| MOUSE_EXIT   | When the mouse moves out of the target node area, whether it is pressed or not. |
| KEY_DOWN     | Event triggered when a key is pressed. |
| KEY_UP       | Event triggered when the key is released. |
| DEVICEMOTION | Gravity sensing. |

The key value list obtained by the `KEY` event can be used by referring to the API `Macro`.

### UI events

**Event processing** is done in the node. For components, you can register and listen to events by accessing the node this.node. Monitoring events can be registered using the `this.node.on()` function as follows:

```ts
import { _decorator, Component, Node } from "Cocos3D";
const { ccclass } = _decorator;

@ccclass("example")
export class example extends Component {
    onLoad() {
      this.node.on(Node.EventType.TOUCH_CANCEL, this.callback, this);
    }

    callback() {

    }

    onDestroy() {
      // In general, for data recovery control, we will
      // specify func, and cancel the event when the component
      // is destroyed
      this.node.off(Node.EventType.TOUCH_CANCEL);
    }
```

| Event Name | Event Type Description |
| :-------------- | :----------- |
| TRANSFORM_CHANGED | Node change position, rotation or zoom event. |
| POSITION_PART     | Node position change event. Unified monitoring by __TRANSFORM_CHANGED__, and judge the type after distribution. |
| ROTATION_PART     | Node rotation event. Unified monitoring by __TRANSFORM_CHANGED__, and judge the type after distribution. |
| SCALE_PART        | Node zoom event. Unified monitoring by __TRANSFORM_CHANGED__, and judge the type after distribution. |
| SIZE_CHANGED      | Event triggered when the node size changes. |
| ANCHOR_CHANGED    | Event triggered when the node anchor changes. |
| CHILD_ADDED       | Node subclass added. |
| CHILD_REMOVED     | Node subclasses removed. |
