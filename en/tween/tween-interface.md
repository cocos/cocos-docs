# Tween Interface

## Properties and Interface

### Interface

| Interface         | Description                                     |
| :---------------- | :------------------------------------------ |
| **tag**           | Add a tag of type `number` to the current tween |
| **to**            | Adds an interval action that performs **absolute value** calculations on properties |
| **by**            | Adds an interval action that performs **relative value** calculations on properties |
| **set**           | Add a transient action that **directly sets the target property** |
| **delay**         | Add a **delay time** to a transient action |
| **call**          | Add a **callback** transient
| **target**        | Add a **directly set tween target** transient
| **union**         | **package the contextual tween action into one** |
| **then**          | **insert a tween into the tween queue** |
| **repeat**        | **execute several times** (previously repeated several times, please adapt in time) |
| **repeatForever** | **repeatForever** | **repeatForever** |
| **sequence**      | **add a sequential execution of the tween** |
| **parallel**      | **add a simultaneous tween** |
| **start**         | **start tween** |
| **stop**          | **stop tween** |
| **clone**         | **clone tween** |
| **show**          | **enable rendering on node chains, tween target needs to be Node** |
| **hide**          | **disable rendering on the node chain, the tween target needs to be Node** |

### Static Interface

These methods are static methods of `Tween` and are called in the following example:

```ts
Tween.stopAll()
Tween.stopAllByTag(0);
Tween.stopAllByTarget(this.node);
```

| Interface | Description |
| :--- | :--- |
| **stopAll**         | Stop all tweening <br> This interface removes all registered tweens from the underlying <br> **Note**: This method affects all objects |
| **stopAllByTag**    | Stop all tweens for the specified tag <br> This interface will remove all tweens specified by the **tag** method <br> You can specify whether to remove only tweens with a tag on that object by specifying a second parameter `target?: object` |
| **stopAllByTarget** | Stop the tweens of all specified objects |

## Utility Function

|Interface| Description |
|:-- |:--|
| **tween<T>** | This is a utility function to help instantiate the `Tween` class <br> **Note**: This method is not a member of the `Tween` class, and developers can also instantiate the tween by calling `new Tween<T>(target:T)` on their own. |

### Example

Here is an example of a `to` tween aniamtion to demonstrate the use of `tween()`:

```ts
let tweenDuration : number = 1.0;                                   // Duration of the tween
tween(this.node.position).to( tweenDuration, new Vec3(0, 10, 0),    // Here takes the target of the node's position
    {                                                               // Interface implementation of 'ITweenOption'.
    onUpdate : (target:Vec3, ratio:number)=>{                       // onUpdate accepts the current tween progress
        this.node.position = target;                                // Assign the position of the node to the result calculated by the tween system
    }
}).start();                                                         // Start the tween by calling 'start' function
```

More examples can be found in [Tween Example](tween-example.md)

## Some Restrictions

In order to reduce the frequency of updating `Node.Transform` information, `Node` maintains an internal `dirty` state, which is only set to `dirty` if an interface that may change `Node.Transform` information is called.

However, the current interface has certain limitations, e.g. the `position` obtained via `this.node.position` is a generic `Vec3`.

When the code `this.node.position.x = 1` is executed, only the `getter` of `position` is executed, not the `setter` of `position`. Since `dirty` is not updated, the `transform` information of the node used in rendering is not updated.

Currently, we also do not support such calls, and instead encourage the use of `setPosition` or `setter` for `position`, as follows:

```typescript
let _pos = new Vec3(0, 1, 0);
this.node.position = _pos;      // Use the setter of 'Transform.position'
this.node.setPosition(_pos);    // Or use the 'setPosition' function
```
