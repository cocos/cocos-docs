# Event Listening and Emitting

Cocos Creator provides the `EventTarget` class to suport the listening and emitting of custom event. Before using it, it needs to be imported from the `'cc'` module and an `EventTarget` object needs to be instantiated.
```ts
import { EventTarget } from 'cc';
const eventTarget = new EventTarget();
```

> __Note__: although the `Node` object also implements some `EventTarget` interfaces, it is no longer recommended to continue using the `Node` object to listen to and emit custom events. Because this is not efficient enough, and we also hope that `Node` object only cares about events related to `Node`.

## Event Listening

Listen to events can be registered by the interface `this.node.on()`. The methods are as follows:

```ts
// This event monitor is triggered every time and needs to be unregistered manually.
eventTarget.on(type, func, target?);
```

The `type` is the event registration string. `func` is the callback to listen to when the event is executed. And `target` is the event receive object. If `target` is not set, then `this` in the callback refers to the object that is currently executing the callback.

The event listener interface `on` can pass to the third parameter target to bind the caller of the response function. Calling the following two methods would have the same effect:

```ts
// Using Function Binding
eventTarget.on(Node.EventType.MOUSE_DOWN, function ( event ) {
  this.enabled = false;
}.bind(this));

// Using the third parameter
eventTarget.on(Node.EventType.MOUSE_DOWN, (event) => {
  this.enabled = false;
}, this);
```

Besides listening with `on`, the `once` interface can also be used. The `once` listener will shut the event being listened to after the listener function responds.

## Canceling listeners

We can shut the corresponding event listener using `off` when we don't care about a certain event anymore.

The `off` method can be used in two ways

```ts
// Cancel all registered events of this type on the object.
eventTarget.off(type);
// Cancels events on objects with this type of callback designation target.
eventTarget.off(type, func, target);
```

One thing to note is that the parameter of `off` must be in one-to-one correspondence with the parameter of `on` in order to cancel it.

Example:

```ts
import { _decorator, Component, EventTarget } from 'cc';
const { ccclass } = _decorator;
const eventTarget = new EventTarget();

@ccclass("Example")
export class Example extends Component {
    onEnable () {
        eventTarget.on('foobar', this._sayHello, this);
    }

    onDisable () {
        eventTarget.off('foobar', this._sayHello, this);
    }

    _sayHello () {
        console.log('Hello World');
    }
}
```

## Event Emitting

Events are emitted through the `eventTarget.emit()` interface, as follows:

```ts
// At most 5 args could be emit.
eventTarget.emit(type, ...args);
```

## Explanation for event arguments

When emitting events, start passing the event parameters as the second argument of the emit function.

```ts
import { _decorator, Component, EventTarget } from 'cc';
const { ccclass } = _decorator;
const eventTarget = new EventTarget();

@ccclass("Example")
export class Example extends Component {
    onLoad () {
        eventTarget.on('foo', (arg1, arg2, arg3) => {
            console.log(arg1, arg2, arg3);  // print 1, 2, 3
        });
    }

    start () {
        let arg1 = 1, arg2 = 2, arg3 = 3;
        // At most 5 args could be emit.
        eventTarget.emit('foo', arg1, arg2, arg3);
    }
}
```

> __Note__: only up to 5 event parameters can be passed here for the performance of the underlying event distribution. Therefore, care should be taken to control the number of parameters passed when passing a parameter.

## System built-in event

Above are the general rules for listening to events and emitting events. __Cocos Creator__ has built in system events. Please refer to the following documents:

- [Input Event System](event-input.md)

- [Node Event System](event-node.md)
