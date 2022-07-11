# Tween Interface

## Properties and Interface

### Interface

| Interface         | Description                                     |
| :---------------- | :------------------------------------------ |
| **tag**           | Add a number tag to the current tween |
| **to**            | Create motion by interpolating the property’s value to an **absolute value** |
| **by**            | Create motion by interpolate the property’s value to a value **relative** to the current one |
| **set**           | Create an instant motion by setting the property to a value |
| **delay**         | Create an instant motion of pausing for a period of time |
| **call**          | Create an instant motion by calling a function |
| **target**        | Define the target node or component to which the tween is applied |
| **union**         | Combine multiple motions as one tween |
| **then**          | Insert a new motion to the current tween queue |
| **repeat**        | Define the number of times for the motion to be executed (In previous versions, this is used to define the number of times the motion is repeated.) |
| **repeatForever** | Set the motion to repeat for infinite times |
| **sequence**      | Define a collection of motions to be executed in sequence |
| **parallel**      | Define a collection of motions to be executed simultaneously |
| **start**         | Start the tween |
| **stop**          | Stop the tween |
| **clone**         | Clone the tween |
| **show**          | Enable the tween target to be rendered. Tween target is mandatory to be Node. |
| **hide**          | Disable the tween target to be rendered. Tween target is mandatory to be Node. |

### Static Interface

Static methods in the `Tween` class are as follows:

```ts
Tween.stopAll()
Tween.stopAllByTag(0);
Tween.stopAllByTarget(this.node);
```

| Interface | Description |
| :--- | :--- |
| **stopAll**         | Stop all tween motions. <br>This method will remove all registered tweens at root level. <br> **Note**: this method will affect all tween targets. |
| **stopAllByTag**    | Stop all tween motions by their number tags. <br>This method will remove all registered tweens by the designated tag at the root level. Users may use the method parameter `target?: object` to check if the tween is attached with the tag. |
| **stopAllByTarget** | Stop all tween motions by their targets |

## Utility Function

|Interface| Description |
|:-- |:--|
| **tween<T>** | Utility function to help instantiate the `Tween` class. <br> **Note**: This function is not a member of the `Tween` class. Users may call `new Tween<T>(target:T)` to instantiate a new tween instance. |

### Example

The following is an example of using `to` method to create tween motions:

```ts
let tweenDuration : number = 1.0;                                   // Duration of the tween
tween(this.node.position).to( tweenDuration, new Vec3(0, 10, 0),    // Here takes the target of the node's position
    {                                                               // Interface implementation of 'ITweenOption'.
    onUpdate : (target:Vec3, ratio:number)=>{                       // onUpdate accepts the current tween progress
        this.node.position = target;                                // Assign the position of the node to the result calculated by the tween system
    }
}).start();                                                         // Start the tween by calling 'start' function
```

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
