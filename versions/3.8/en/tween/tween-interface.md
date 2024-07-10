# Tween Interface

## Properties and Interface

### Interface

The interfaces supported from `v3.8.5` onwards include: `reverse`, `id`, `union(fromId?: number)`, `timeScale`, `pause`, `resume`, `pauseAllByTarget`, `resumeAllByTarget`, `update`, `start(time)`, `duration`.

| Interface         | Description                                                  |
| :---------------- | :----------------------------------------------------------- |
| **tag**           | Add a numeric tag (`number`) to the current tween            |
| **to**            | Add an interval action that computes the **absolute value** of properties |
| **by**            | Add an interval action that computes the **relative value** of properties |
| **set**           | Add an instantaneous action that **directly sets target properties** |
| **delay**         | Add an instantaneous action that **delays time**             |
| **call**          | Add an instantaneous action that **calls a callback**        |
| **target**        | Add an instantaneous action that **directly sets the tween target** |
| **union**         | Package all previous actions into one, or package actions from a specific id |
| **then**          | **Insert a new tween into the tween queue**                  |
| **repeat**        | **Execute several times** (previously repeated, please adapt accordingly) |
| **repeatForever** | **Repeat indefinitely**                                      |
| **update**        | Add a custom action                                          |
| **id**            | Set an id for the previous action, commonly used with reverse and union |
| **reverse**       | Reverse **all** or **specific** actions in **another** tween and add them to the **current** tween; or reverse **specific** actions in the **current** tween |
| **timeScale**     | Set the time scaling factor for the current tween: 1 is normal speed (default), 0.5 is half speed, 2 is double speed, etc. |
| **sequence**      | **Add a sequential tween**                                   |
| **parallel**      | **Add a simultaneous tween**                                 |
| **start**         | **Start the tween** or start the tween from **a specific time point (in seconds)** |
| **stop**          | **Stop the tween**                                           |
| **pause**         | **Pause the tween**                                          |
| **resume**        | **Resume the tween**                                         |
| **clone**         | **Clone the tween**, optionally resetting the target object  |
| **show**          | **Enable rendering on the node, the tween target must be Node** |
| **hide**          | **Disable rendering on the node, the tween target must be Node** |
| **removeSelf**    | **Remove the node from the scene tree, the tween target must be Node** |
| **destroySelf**   | **Remove the node from the scene tree and call the node destruction function, the tween target must be Node** |
| **duration**      | Get the total duration of the current tween. This is a getter, called as `const d = tweenInstance.duration;` |

### Static Interface

Static methods in the `Tween` class are as follows:

```ts
Tween.stopAll()
Tween.stopAllByTag(0);
Tween.stopAllByTarget(this.node);
```

| Interface             | Description                                                  |
| :-------------------- | :----------------------------------------------------------- |
| **stopAll**           | Stop all tween instances <br> This interface will remove all registered tweens at the underlying level <br> **Note**: This method will affect all objects |
| **stopAllByTag**      | Stop all tween instances with a specific tag <br> This interface will remove all tweens specified by the **tag** method <br> You can specify a second parameter `target?: object` to only remove tweens with a specific tag on that object |
| **stopAllByTarget**   | Stop all tween instances associated with a target object     |
| **pauseAllByTarget**  | Pause all tween instances associated with a target object    |
| **resumeAllByTarget** | Resume all tween instances associated with a target object   |

## Utility Function

|Interface| Description |
|:-- |:--|
| **tween<T>** | Utility function to help instantiate the `Tween` class. <br> **Note**: This function is not a member of the `Tween` class. Users may call `new Tween<T>(target:T)` to instantiate a new tween instance. |

### Example

The following is an example of using `to` method to create a tween instance:

```ts
let tweenDuration : number = 1.0;                                   // Duration of the tween
tween(this.node.position).to( tweenDuration, new Vec3(0, 10, 0),    // Here takes the target of the node's position
    {                                                               // Interface implementation of 'ITweenOption'.
    onUpdate : (target:Vec3, ratio:number)=>{                       // onUpdate accepts the current tween progress
        this.node.position = target;                                // Assign the position of the node to the result calculated by the tween system
    }
}).start();                                                         // Start the tween by calling 'start' function
```

Alternatively,

```ts
let tweenDuration : number = 1.0;     // Duration of the tween
tween(this.node).to(                  // Directly use node as the tween target
    tweenDuration,
    { position: new Vec3(0, 10, 0) }  // Create an object with the position property
).start();                            // Call the start method to begin the tween
```

Note: If the node is used as the tween target, there is no need to use `setPosition` or the `position` setter within `onUpdate` to update the node's position. The tween system will automatically call the `position` setter internally.

For more examples, please see [Tween Example](tween-example.md).

## Caveats

To avoid frequent updates to the transform data of nodes, `Node` class is constructed with an internal `dirty` state which only permits updating when modifications to the node’s transform data is called.

Due to pre-existing limitations, such as the position data returned by `this.node.position` being a public vector, certain coding conventions may not behave as expected.

For instance, when attempting to execute `this.node.position.x = 1`, the code only calls the `getter` for the position data and not the `setter` for the `dirty` state data to be updated, thus no transform data of the node will remain unchanged.

We advise against coding in such a manner and encourage users to call the `setter` for the position data via method `setPosition` instead, such as:

```typescript
let _pos = new Vec3(0, 1, 0);
this.node.position = _pos;      // Use the setter of 'Transform.position'
this.node.setPosition(_pos);    // Or use the 'setPosition' function
```
