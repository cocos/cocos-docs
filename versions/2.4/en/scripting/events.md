# Listen to and launch events

## Listen to events

Event processing is done in the `cc.Node`. Components can register and monitor events by visiting the node `this.node`. Listen to events can be registered by the function `this.node.on()`. The methods are as follows:

```javascript
cc.Class({
  extends: cc.Component,

  properties: {
  },

  onLoad: function () {
    this.node.on('mousedown', function ( event ) {
      console.log('Hello!');
    });
  },
});
```

What's worth mentioning is that the event listener function `on` can pass to the third parameter target to bind the caller of the response function. The following two calling methods have the same effect:

```javascript
// bind using the function
this.node.on('mousedown', function ( event ) {
  this.enabled = false;
}.bind(this));

// use the third parameter
this.node.on('mousedown', function (event) {
  this.enabled = false;
}, this);
```

Besides listening with `on`, we can also use the `once` method. The `once` listener will shut the event being listened to after the listener function responds.

## Shut listener

We can shut the corresponding event listener using `off` when we don't care about a certain event anymore. One thing to note is that the parameter of `off` must be in one-to-one correspondence with the parameter of `on` in order to shut it.

Below are what we recommend you to put in:

```javascript
cc.Class({
  extends: cc.Component,

  _sayHello: function () {
    console.log('Hello World');
  },

  onEnable: function () {
    this.node.on('foobar', this._sayHello, this);
  },

  onDisable: function () {
    this.node.off('foobar', this._sayHello, this);
  },
});
```

## Launch event

We can launch an event using two ways: `emit` and `dispatchEvent`. The difference between these two is that the latter can do the event delivery. Let's get to know the `emit` event through a simple example:

```js
cc.Class({
  extends: cc.Component,

  onLoad () {
    // args are optional param.
    this.node.on('say-hello', function (msg) {
      console.log(msg);
    });
  },

  start () {
    // At most 5 args could be emit.
    this.node.emit('say-hello', 'Hello, this is Cocos Creator');
  },
});
```

## Explanation for event arguments

We've made some optimizations for passing event arguments since v2.0. When emitting event, you could pass five extra parameters from the second one to the sixth one in the `emit` function call, they will be transferred as final arguments to invoke the callback function registered in `on` function.

```js
cc.Class({
  extends: cc.Component,

  onLoad () {
    this.node.on('foo', function (arg1, arg2, arg3) {
      console.log(arg1, arg2, arg3);  // print 1, 2, 3
    });
  },

  start () {
    let arg1 = 1, arg2 = 2, arg3 = 3;
    // At most 5 args could be emit.
    this.node.emit('foo', arg1, arg2, arg3);
  },
});
```

What need to be emphasized is that you can only pass 5 event arguments at most for the consideration of event dispatching performance. So you need to pay attention to the number of event arguments you pass.

## Event delivery

Events launched by the `dispatchEvent` method mentioned above would enter the event delivery stage. In Cocos Creator's event delivery system, we use bubble delivery. Bubble delivery will pass the event from the initiating node continually on to its parent node until it gets to the root node or is interruptedly processed by `event.stopPropagation()` in the response function of some node.

![bubble-event](assets/bubble-event.png)

As shown in the picture above, when we send the event “foobar” from node c, if both node a and b listen to the event“foobar”, the event will pass to node b and a from c. For example:

```javascript
// In the component script of node c
this.node.dispatchEvent( new cc.Event.EventCustom('foobar', true) );
```

If we want to stop the event delivery after node b intercepts the event, we can call the function `event.stopPropagation()` to do this. Detailed methods are as follows:

```javascript
// In the component script of node b
this.node.on('foobar', function (event) {
  event.stopPropagation();
});
```

Be noted, when you want to dispatch a custom event, please do not use `cc.Event` because it's an abstract class, instead, you should use `cc.Event.EventCustom` to dispatch a custom event.

## Event object

In the call-back of the event listener, the developer will receive an event object `event` of the `cc.Event` type. `stopPropagation` is the standard API of `cc.Event`, other important API include:

| API name | type | meaning |
| :------ |:---|:---|
| `type` | `String` | type of the event (event name) |
| `target` | `cc.Node` | primary object received by the event |
| `currentTarget` | `cc.Node` | current object receiving the event; current object of the event in the bubble stage may be different from the primary object |
| `getType` | `Function` | get the type of the event |
| `stopPropagation` | `Function` | stop the bubble stage, the event will no longer pass on to the parent node while the rest of the listeners of the current node will still receive the event |
| `stopPropagationImmediate` | `Function` | stop delivering the event. The event will not pass on to the parent node and the rest of the listeners of the current node |
| `getCurrentTarget` | `Function` | get the target node that is currently receiving the event |
| `detail` | `Function` | custom event information (belongs to `cc.Event.EventCustom`) |
| `setUserData` | `Function` | set custom event information (belongs to `cc.Event.EventCustom`) |
| `getUserData` | `Function` | get custom event information (belongs to `cc.Event.EventCustom`) |

You can refer to the `cc.Event` and API files of its child category for a complete API list.

## System built-in event

Above are the general rules for listening to events and emitting events. Cocos Creator has built in system events. You can refer to the following documents:

- [Node System Events](./internal-events.md)
- [Global System Events](./player-controls.md)
