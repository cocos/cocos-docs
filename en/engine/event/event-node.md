# Node Event System

As mentioned in the previous document, the `input` object supports the global [input event system](event-input.md), and the `Node` also implements the event listening interface of the `EventTarget`. On this basis, the basic node-related system events are provided. This document will introduce how to use these events.

__Cocos Creator__ supports four types of system events: __mouse__, __touch__, __keyboard__, __device motion__. They are called [Global Input Events](event-input.md). The usage of touch and mouse events dispatched by `Node` is discussed in this document. The usage is as follows:

```ts
node.on(Node.EventType.MOUSE_DOWN, (event) => {
  console.log('Mouse down');
}, this);
```

> __Note__: We no longer recommend directly using the event name string to register event listeners. Like the example above, please do not use `node.on('mouse-down', callback, target)` to register event listeners.

The touch event listener on the node depends on the `UITransform` component, which is only applicable to 2D UI nodes. To implement the touch detection of 3D objects, refer to the [Touch Detection of 3D Objects](event-input.md#Touch%20detection%20for%203D%20objects) documentation.

## Mouse event type and event object

__Mouse events__ will only be triggered on desktop platforms, the event types the system provides are as follows:

| Enumerated Object Definition | Timing of Event Triggering            |
|:-------------------------------|:---------------------------------------------------------------------------------------------|
| __Node.EventType.MOUSE_DOWN__  | When a button on the mouse is pressed in the target node region                              |
| __Node.EventType.MOUSE_ENTER__ | When the cursor enters the target node region, whether or not the button is pressed          |
| __Node.EventType.MOUSE_MOVE__  | When the cursor is moved in the target node region, whether or not the button is pressed     |
| __Node.EventType.MOUSE_LEAVE__ | When the cursor is moved out of the target node region, whether or not the button is pressed |
| __Node.EventType.MOUSE_UP__    | When a button on the mouse is released                                                       |
| __Node.EventType.MOUSE_WHEEL__ | When the mouse wheel is scrolled                                                             |

The important APIs of mouse events (`Event.EventMouse`) are described in the [Mouse Events API](event-api.md#Mouse-Event-API) (`Event` standard events API excluded).

## Touch event types and event objects

__Touch events__ can be triggered on both mobile platforms and desktop platforms. Developers can better debug on the desktop platform, by simply listening for touch events and responding to both mobile touch events and desktop mouse events at the same time. The types of touch events provided by the system are as follows:

| Enumerated Object Definition  | Timing of Event Triggering                                                               |
|:--------------------------------|:-----------------------------------------------------------------------------------------|
| __Node.EventType.TOUCH_START__  | When one or more touch points are placed in the target node region                       |
| __Node.EventType.TOUCH_MOVE__   | When one or more touch points are moved along the screen                                 |
| __Node.EventType.TOUCH_END__    | When one or more touch points are removed from the screen in the target node region      |
| __Node.EventType.TOUCH_CANCEL__ | When one or more touch points are removed from the screen outside the target node region |

The important APIs of a touch event (`Event.EventTouch`) are described in the [Mouse Events API](event-api.md#Touch-Event-API) (`Event` standard event API excluded):

> __Note__: touch events support multi-touch, each touch spot will send one event to the event listener.

## Node Event Dispatching

The `dispatchEvent` interface is supported on `Node`. Events dispatched by this interface, would enter the event delivery stage. The event dispatching system of Cocos Creator is based on the implementation of [event bubbling and capture on Web standard](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events#event_bubbling_and_capture). After the event is dispatched, it will go through the following three stages:
- __capturing phase__: The event is passed from the scene root node to the child nodes step by step, until it reaches the target node or the event propagation is stopped in the event callback
- __target phase__: The event is triggered on the target node
- __bubbling phase__: The event is bubbled from the target node to the parent node level by level, until the root node is reached or the event propagation is stopped in the event callback

When we call `node.dispatchEvent()`, it means that `node` is the target node mentioned above. In the process of event delivery, we can stop the event propagation by calling `event.propagationStopped = true`.

In v3.0, the `Event.EventCustom` class was removed. To dispatch custom events, a custom event class that inherits from the `Event` class needs to be implemented first. For example:

```ts
// Import "Event" from 'cc' module
import { Event } from 'cc';

class MyEvent extends Event {
    constructor(name: string, bubbles?: boolean, detail?: any){
        super(name, bubbles);
        this.detail = detail;
    }
    public detail: any = null;  // Custom property
}
```

![bubble-event](bubble-event.png)

Take the above picture as an example, this picture shows the propagation sequence of events in the **target** and **bubbling** phases. When we dispatch the event `“foobar”` from node c, if both node a and b listen to the event `“foobar”`, the event will pass to node b and a from c. For example:

```ts
// In the component script of node c
this.node.dispatchEvent( new MyEvent('foobar', true, 'detail info') );
```

To stop the event propagation after node b intercepts the event, call `event.propagationStopped = true` to do this. Detailed methods are as follows:

```ts
// In the component script of node b
this.node.on('foobar', (event: MyEvent) => {
  event.propagationStopped = true;
});
```

> __Note__: to dispatch a custom event, do not use `Event` directly because it's an abstract class.

## Event object

In the call-back of the event listener, the developer will receive an event object event of the `Event` type. `propagationStopped` is the standard API of Event, other important API include:

| API Name                        | Type     | Meaning                                                                                                                                          |
|:---------------------------------|:----------|:--------------------------------------------------------------------------------------------------------------------------------------------------|
| __type__                        | String   | The event type (event name).                                                                                                                     |
| __target__                      | Node     | The original target that received the event.                                                                                                     |
| __currentTarget__               | Node     | The current object that received the event. The current target of the event during the bubbling phase may be different from the original target. |
| __getType__                     | Function | Get the event type.                                                                                                                              |
| __propagationStopped__          | Boolean  | Whether or not stop the bubbling phase. The parent node of the current target no longer receives the corresponding event.                        |
| __propagationImmediateStopped__ | Boolean  | Whether or not stop passing the current event immediately. The current target no longer receives the event either.                               |

Please refer to the `Event` and API files of its child category for a complete API list.

## Touch event propagation

As mentioned above, touch events registered on the `Node` are dispatched internally by the engine through the `dispatchEvent` interface. Below we will introduce the propagation sequence of touch events in the **target** and **bubbling** phases.

### Touch event bubbling

Touch events support the event bubbling on the node tree, take the pictures below as an example:

![propagation](propagation.png)

In the scene shown in the picture, suppose node A has a child node B which has a child node C. The developer sets the touch event listeners for all these three nodes (each node has a touch event listener in examples below by default).

When the mouse or finger was applied in the node C region, the event will be triggered at node C first and the node C listener will receive the event (this is the target phase). Then the node C will pass this event to its parent node, so the node B listener will receive this event. Similarly the node B will also pass the event to its parent node A. This is a basic event bubbling phase. 

> __Note__: it needs to be emphasized that there is no hit test in parent nodes in the bubbling phase, which means that nodes A and B can receive touch events even though the touch location is out of their node region.

The bubbling phase of touch events is no different than the general events. Calling `event.propagationStopped = true` can force to stop the bubbling phase.

### Ownership of touch points among brother nodes

Suppose the node B and C in the picture above are brother nodes, while C partly covers over B. Now if C receives a touch event, it is announced that the touch point belongs to C, which means that the brother node B won't receive the touch event any more, even though the touch location is also inside its node region. The touch point belongs to the top one among brother nodes.

At the same time, if C has a parent node, it will also pass the touch event to its parent node through the event bubble mechanism.

### Point of Contact Attribution for Different Canvas

Contact interception between different Canvas is determined by priority. In the scene in the figure below, Canvas 1-5 in the node tree corresponds to priority 1-5 of the image display. It can be seen that even though Canvas nodes 3, 4, and 5 are arranged in scrambled order, the order of response of the contacts is still __Canvas5 -> Canvas4 -> Canvas3 -> Canvas2 -> Canvas1__, according to the priority relationship on the Canvas. The sorting between Canvas is done in the order of the node tree only if the priority is the same.

![multi-canvas](multi-canvas.png)

### Register touch or mouse events in the capturing phase

Sometimes, it is necessary to dispatch touch or mouse events to parent node event listeners before dispatching to any child nodes beneath it in hierarchy, like the design of __ScrollView__ component.

Event bubbling cannot meet all demands. When this happens, register the parent node event listeners in the capturing phase. To achieve this goal, passing in `true` as the `useCapture` parameter (a fourth parameter) when registering touch or mouse event on the node. For example:

```ts
this.node.on(Node.EventType.TOUCH_START, this.onTouchStartCallback, this, true);
```

When the node fires the `touch-start` event, the `touch-start` event will be first dispatched to all the parent node event listeners registered in the capturing phase, then dispatched to the node itself, and finally comes the event bubbling phase.

Only touch or mouse events can be registered in the capturing phase, while the other events can't be.

### Event Interception

Normal events are dispensed as described above. However, if the node has components such as __Button__, __Toggle__ or __BlockInputEvents__ on it, it will stop event bubbling. Look at the picture below. There are two buttons, priority 1 for Canvas0 and priority 2 for Canvas1. If you click on the intersection of the two buttons, which is the blue area in the picture, it appears that button priority 2 received the contact event successfully, while button priority 1 did not. That's because according to the event reception rules above, button priority 2 receives contact events first and intercepts them (`event.propagationStopped = true`) to prevent event penetration. If the node is a non-button node, events can also be intercepted by adding the __BlockInputEvents__ component to prevent penetration.

![events-block](events-block.png)

## Example for touch events

Using the example below, summarizing touch events is easy. There are four nodes A, B, C and D in the picture above, where A and B are brother nodes. The specific hierarchical relationship should be like this:

![example](example.png)

1. If one touch is applied in the overlapping area between A and B, now B won't receive the touch event, so that propagating order of the touch event should be __A -> C -> D__.
2. If the touch location is in node B (the visible green area), the order should be __B -> C -> D__.
3. If the touch location is in node C, the order should be __C -> D__.
4. As a precondition to the second case, register touch events on C D node in the capturing phase, then the order should be __D -> C -> B__.

## Other events of Node

All node built-in events can get event names from `Node.EventType`.

### 3D Node Events

| Enumerated Object Definition              | Timing of Event Triggering             |
| :-------------             |   :----------        |
| __TRANSFORM_CHANGED__ | When a transform property is modified, an enum value `TransformBit` is assigned that defines the modified transform based on the enum value.                      |

Definition of Transformation Enumeration Values:

| Enumeration Value Meaning | Transformations                               |
|:---------------------------|:-----------------------------------------------|
| __TransformBit.NONE__     | The properties remain unchanged.              |
| __TransformBit.POSITION__ | The node position changes.                    |
| __TransformBit.ROTATION__ | The node rotation changes.                    |
| __TransformBit.SCALE__    | The node scale changes.                       |
| __TransformBit.RS__       | The node rotation and scale change.           |
| __TransformBit.TRS__      | The node position, rotation and scale change. |

### 2D Node Events

| Enumeration Value Meaning | Timing of Event Triggering                                                                                              |
|:---------------------------|:-------------------------------------------------------------------------------------------------------------------------|
| __SIZE_CHANGED__          | When the width/height property is modified. The width/height property is located on the `UITransform` component.        |
| __ANCHOR_CHANGED__        | When the X/Y properties of the anchor is modified. The width/height property is located on the `UITransform` component. |
| __COLOR_CHANGED__ | When the color property is modified. The width/height property is located on the `UITransform` component. |
| **CHILD_ADDED**   | When adding child node                                        |
| **CHILD_REMOVED** | When removing child node                                        |
| **PARENT_CHANGED** | When the parent node changes                                       |
| **SIBLING_ORDER_CHANGED**   | When the sibling order changes                        |
| **SCENE_CHANGED_FOR_PERSISTS** | When the scene changes where the persist node is                  |
| **NODE_DESTROYED**   | When destroying node                                       |
| **LAYER_CHANGED** | When `layer` property changes                                  |
| **ACTIVE_IN_HIERARCHY_CHANGED** | When `activeInHierarchy` property changes        |

## Multi-touch event

The engine has a multi-touch event blocking switch. Multi-touch events are enabled by default. For projects that do not require multi-touch, you can disable allowing multi-touch with the following code:

```ts
macro.ENABLE_MULTI_TOUCH = false;
```

Alternatively, it can be configured via __Project Setting/Macro Config__.

## Pause or resume node system events

Pause node system events

```ts
// Pause all node system events registered on the current node. Node system events include Touch and Mouse Events.
// If a parameter true is passed, the API will pause node system events on this node and all its children.
// Example
this.node.pauseSystemEvents();
```

Resume node system events

```ts
// Resume all node system events registered on the current node. Node system events include Touch and Mouse Events.
// If a parameter true is passed, the API will resume node system events on this node and all its children.
// Example
this.node.resumeSystemEvents();
```












