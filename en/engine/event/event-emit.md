# Listening to and launching events

## Listening to events

Event processing is done in the `Node`. Components can register and monitor events by visiting the node this.node. Listen to events can be registered by the function `this.node.on()`. The methods are as follows:

```ts
// This event monitor is triggered every time and needs to be unregistered manually.
xxx.on(type, func, target?);
```

The `type` is the event registration string. `func` is the callback to listen to when the event is executed. And `target` is the event receive object. If `target` is not set, then `this` in the callback refers to the object that is currently executing the callback.

The event listener function `on` can pass to the third parameter target to bind the caller of the response function. The following two calling methods have the same effect:

```ts
// Using Function Binding
this.node.on(Node.EventType.MOUSE_DOWN, function ( event ) {
  this.enabled = false;
}.bind(this));

// Using the third parameter
this.node.on(Node.EventType.MOUSE_DOWN, (event) => {
  this.enabled = false;
}, this);
```

Besides listening with `on`, we can also use the `once` method. The `once` listener will shut the event being listened to after the listener function responds.

## Canceling listeners

We can shut the corresponding event listener using `off` when we don't care about a certain event anymore.

The `off` method can be used in two ways

```ts
// Cancel all registered events of this type on the object.
xxx.off(type);
// Cancels events on objects with this type of callback designation target.
xxx.off(type, func, target);
```

One thing to note is that the parameter of `off` must be in one-to-one correspondence with the parameter of `on` in order to cancel it.

Example:

```ts
import { _decorator, Component, Node } from 'cc';
const { ccclass } = _decorator;

@ccclass("Example")
export class Example extends Component {
    onEnable () {
        this.node.on('foobar', this._sayHello, this);
    }

    onDisable () {
        this.node.off('foobar', this._sayHello, this);
    }

    _sayHello () {
        console.log('Hello World');
    }
}
```

## Event Dispatching

There are two ways to trigger an event: `emit` and `dispatchEvent`. The difference between the two is that the latter can do event passing. Let's start with a simple example of the `emit` event.

```ts
// At most 5 args could be emit.
xxx.emit(type, ...args);
```

## Explanation for event arguments

When emitting events, start passing the event parameters as the second argument of the emit function.

```ts
import { _decorator, Component, Node } from 'cc';
const { ccclass } = _decorator;

@ccclass("Example")
export class Example extends Component {
    onLoad () {
        this.node.on('foo', (arg1, arg2, arg3) => {
            console.log(arg1, arg2, arg3);  // print 1, 2, 3
        });
    }

    start () {
        let arg1 = 1, arg2 = 2, arg3 = 3;
        // At most 5 args could be emit.
        this.node.emit('foo', arg1, arg2, arg3);
  }
}
```

> __Note__: only up to 5 event parameters can be passed here for the performance of the underlying event distribution. Therefore, care should be taken to control the number of parameters passed when passing a parameter.

## Event delivery

Events launched by the `dispatchEvent` method, mentioned above, would enter the event delivery stage. In __Cocos Creator__'s event delivery system, bubble delivery is used. Bubble delivery will pass the event from the initiating node continually on to its parent node,  until the root node is reached or an interrupt `event.propagationStopped = true` is made in the response function of a node.

In v3.0, we removed the `Event.EventCustom` class. To dispatch custom events, a custom event class that inherits from the `Event` class needs to be implemented first. For example:

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

As shown in the picture above, when we send the event `“foobar”` from node c, if both node a and b listen to the event `“foobar”`, the event will pass to node b and a from c. For example:

```ts
// In the component script of node c
this.node.dispatchEvent( new MyEvent('foobar', true, 'detail info') );
```

To stop the event delivery after node b intercepts the event, call the function `event.propagationStopped = true` to do this. Detailed methods are as follows:

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

## System built-in event

Above are the general rules for listening to events and emitting events. __Cocos Creator__ has built in system events. Please refer to the following documents:

- [Node System Events](event-builtin.md)

- [Global System Events](event-input.md)
