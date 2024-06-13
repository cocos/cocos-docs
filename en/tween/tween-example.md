# Tween Example

This article will focus on some common uses and interfaces in Cosos Creator Tween System.

## Construct Tween

Tween can be constructed either by the `tween` method or by using `new Tween<T>(target: T)`.

> **Note**: 'tween' is a tool method provided by the engine and is not a member of 'Tween' class, please note the distinction. For this, please refer to the interface description: [Tween Interface](tween-interface.md).

## Chain API

Most action-related interfaces return either `this` or a new `Tween` object, so it's easy to use chain calls to combine:

```ts
tween()
    .target(this.node)
    .to(1.0, { position: new Vec3(0, 10, 0) })
    .by(1.0, { position: new Vec3(0, -10, 0) })
    .delay(1.0)
    .by(1.0, { position: new Vec3(0, -10, 0) })
    .start()
```

## to, by

Here is a demonstration of how to use a `to` type of tween to bind the position information of a node and offset its position by 10 units along the Y-axis.

```ts
let tweenDuration : number = 1.0;                                    // Duration of tween
tween(this.node.position)
    .to( tweenDuration, new Vec3(0, 10, 0), {                        // The interface 'to' represents the absolute value of the node
    onUpdate : (target:Vec3, ratio:number)=>{                        // Implement ITweenOption's onUpdate callback to accept the current tweening progress
        this.node.position = target;                                 // Assign the position of the node to the result calculated by the tween system        
    }
}).start();                                                          // Call the start method to enable tween
```

### Returning Property Target Values through Functions

>  [!TIP]
>
> Supported since v3.8.5

```ts
tween(this.node).to(1, { angle: ()=>90 ).start();
```

The above code is equivalent to:

```ts
tween(this.node).to(1, { angle: 90 ).start();
```

### Custom Interpolation Functions

>  [!TIP]
>
> Supported since v3.8.5

- For a specific property of the current action

```ts
// Simultaneously animate the 'angle' and 'position' properties on node, but only define a custom interpolation function for the 'angle' property
tween(this.node).to(1, {
        angle: { 
            value: 90,
            progress(start: number, end: number, current: number, ratio: number): number {
                return lerp(start, end, ratio);
            },
        },
        position: v3(90, 90, 90),
    }
).start();
```

- For all properties of the current action

To handle custom interpolation functions for both the 'angle' and 'position' properties associated with the 'to' action's node, consider setting the 'opt.progress' parameter.

```ts
tween(this.node).to(1, { angle: 90, position: v3(90, 90, 90) }, {
    progress(start: number, end: number, current: number, ratio: number): number {
        return lerp(start, end, ratio);
    },
}).start();
```

### Custom Easing Functions

>  [!TIP]
>
> Supported since v3.8.5

- For a specific property of the current action

```ts
// 1. Use a built-in easing function
tween(this.node).to(1, {
    angle: { 
        value: 90,
        easing: 'backIn',
    },
    position: v3(90, 90, 90),
}).start();

// Or
// 2. Use a custom easing function
tween(this.node).to(1, {
    angle: { 
        value: 90,
        easing: (k: number): number => { 
            if (k === 1) {
                return 1;
            }
            const s = 1.70158;
            return k * k * ((s + 1) * k - s);
        },
    },
    position: v3(90, 90, 90),
}).start();
```

- For all properties of the current action

To handle custom easing functions for both the 'angle' and 'position' properties associated with the 'to' action's node, consider setting the 'opt.easing' parameter.

```ts
// 1. Use a built-in easing function
tween(this.node).to(1, { angle: 90, position: v3(90, 90, 90) }, {
    easing: 'backIn',
}).start();

// Or
// 2. Use a custom easing function
tween(this.node).to(1, { angle: 90, position: v3(90, 90, 90) }, {
    easing: (k: number): number => { 
        if (k === 1) {
            return 1;
        }
        const s = 1.70158;
        return k * k * ((s + 1) * k - s);
     },
}).start();
```

## Binding Different Objects

There are more scenarios where `Node` is used as a binding target in development, and the code example is as follows.

```ts
let  quat : Quat = new Quat();
Quat.fromEuler(quat, 0, 90, 0);
tween(this.node)
    .to(tweenDuration, { 
        position: new Vec3(0, 10, 0),                   // Bind position
        scale: new Vec3(1.2, 3, 1),                     // Bind scale
        rotation:quat }                                 // Bind rotation
    )                                   
    .start();                                           // Call the start method to enable tween
```

In fact the tween can be bound to any object, the code example is as follows:

```ts
class BindTarget{
    color : Color
}

let sprite : Sprite = this.node.getComponent(Sprite) ;
let bindTarget : BindTarget = new BindTarget();
bindTarget.color = Color.BLACK;
tween(bindTarget)
    .by( 1.0, { color: Color.RED }, {
        onUpdate(tar:BindTarget){
            sprite.color = tar.color;  // Set the sprite to the color inside the 'BindTarget'
        }
})
.start()
```

## Multiple Actions

In general, a tween can consist of one or more **actions**, and `Tween` maintains a data structure consisting of multiple **actions** to manage all actions within the current tween.

The following code demonstrates moving the object's position 10 units along the Y-axis and then 10 units along the -Y-axis.

```ts
let tweenDuration : number = 1.0;         
tween(this.node.position)
.to( tweenDuration, new Vec3(0, 10, 0), {  
    onUpdate : (target:Vec3, ratio:number)=>{ 
        this.node.position = target; 
    }
})
.to( tweenDuration, new Vec3(0, -10, 0), {  
    onUpdate : (target:Vec3, ratio:number)=>{ 
        this.node.position = target;
    }
}) // At this point the number of actions in the tween is 2
```

Multiple tweens can also be organized using the `union`, `sequence`, and `parallel` interfaces. By creating some fixed tweens in advance and using `union`, `sequence`, `parallel` to combine them, you can reduce the amount of code written.

## Union

 The `union` method combines all current actions into one, with the following code example:

```ts
let tweenDuration : number = 1.0;         
tween(this.node)
    .to(tweenDuration, { position:new Vec3(0, 10, 0) })  // Here the node is the target of the tween
    .to(tweenDuration, { position:new Vec3(0, -10, 0) }) // At this point the number of actions in the Tween is 2
    .union()                                             // The above two tweens will be combined into one, and the number of actions in the Tween will be 1
    .start();                                            // Call the start method to enable tween
```

> [!TIP]
>
> Supported from v3.8.5: `union(fromId)`

The `union(fromId)` method merges actions from a specified identifier to the current action into a single sequence action. It is often used in conjunction with `id`, `repeat`, and `repeatForever`. The sample code is as follows:

```ts
const node = new Node();

tween(node)
    .to(1, { scale: new Vec3(10, 10, 10) })
    .by(1, { position: new Vec3(200, 0, 0) }).id(123) // Mark the by action as 123
    .delay(1)                                         // Delay for one second
    .reverse(123)                                     // Reverse the action marked as 123, i.e., the previous 'by' action
    .union(123)                                       // Merge actions starting from the action marked as 123
    .repeat(3)                                        // Repeat the merged actions 3 times
    .start();
```


## Sequence

The `sequence` function will transform the incoming tween into a queue form and add it to the current tween, with the following code example:

```ts
let tweenDuration: number = 1.0;
let t1 = tween(this.node)
    .to(tweenDuration, { position: new Vec3(0, 10, 0) })

let t2 = tween(this.node)
    .to(tweenDuration, { position: new Vec3(0, -10, 0) })

tween(this.node).sequence(t1, t2).start(); // Add t1 and t2 tweens to the new tween queue
```

You can achieve the same effect using the [then](#then) interface as well:

```ts
let tweenDuration: number = 1.0;
let t1 = tween(this.node)
    .to(tweenDuration, { position: new Vec3(0, 10, 0) });

let t2 = tween(this.node)
    .to(tweenDuration, { position: new Vec3(0, -10, 0) });

tween(this.node).then(t1).then(t2).start(); // First add tween t1 to the queue, then add tween t2 to the queue
```

## Parallel

The `parallel` function will convert the incoming tween into parallel form and add it to the current tween, with the following code example:

```ts
let tweenDuration: number = 1.0;
let t1 = tween(this.node)
    .to(tweenDuration, { position: new Vec3(0, 10, 0) })

let t2 = tween(this.node)
    .to(tweenDuration, { position: new Vec3(0, -10, 0) })

tween(this.node).parallel(t1, t2).start(); // Convert t1 and t2 to parallel tweens and add the current tween
```

## Then

The `then` interface allows a new tween to be passed in and that tween integrated and added to the current tween's action, with the following code example.

```ts
let tweenAfter = tween(this.node)
    .to(1.0, { position: new Vec3(0, -10, 0) })

tween(this.node)
    .by(1.0, { position: new Vec3(0, 10, 0) })
    .then(tweenAfter)
    .start();
```

## Delay

The `delay` interface adds a delay to the **current** action **after** it.

Note that in the following code example, different `delay` positions can cause completely different results.

- After a delay of 1 second, start the movement and perform it twice in a row：

    ```ts
    let tweenDuration: number = 1.0;
    tween(this.node)
        .delay(1.0)
        .to(tweenDuration, { position: new Vec3(0, 10, 0) })
        .to(tweenDuration, { position: new Vec3(0, -10, 0) })
        .start()  
    ```

- After the first movement, there is a 1 second delay before the second movement is performed.

    ```ts
    let tweenDuration: number = 1.0;
    tween(this.node)
        .to(tweenDuration, { position: new Vec3(0, 10, 0) })
        .delay(1.0)
        .to(tweenDuration, { position: new Vec3(0, -10, 0) })
        .start()
    ```

## Repeat

The `repeat` interface can add a repeat count to the tween, if the `embedTween` parameter is empty, the last action of the current tween will be used as parameter.

This means that if the current tween consists of more than one tween, only the **last** one will be repeated, note the following example:

```ts
let tweenDuration: number = 1.0;
tween(this.node)
    .to(tweenDuration, { position: new Vec3(0, 10, 0) })
    .by(tweenDuration, { position: new Vec3(0, -10, 0) })
    .repeat(3) // Note that the 'by' tween is repeated 3 times here
    .start()  
```

If the second parameter `embedTween` is not empty, the embedded tween will be repeated, with the following code example:

```ts
let tweenDuration: number = 1.0;
let embedTween = tween(this.node)
    .by(tweenDuration, { position: new Vec3(0, -10, 0) })

tween(this.node)
    .to(tweenDuration, { position: new Vec3(0, 10, 0) })
    .repeat(3, embedTween)  // Repeat the 'embedTween'
    .start()  
```

The usage of `repeatForever` interface is similar to `repeat`, but it becomes permanently repeated.


## Action Identifier

> [!TIP]
>
> Supported since v3.8.5

The `id` interface is used to assign a numerical identifier to the preceding action. Ensure that **identifiers are unique**, as the tween system will directly use the first action found during internal searches.

It is frequently used in conjunction with `union(fromId)`, `reverse(id)`, and `reverse(tween, id)`. Here's an example code snippet:

```ts
tween(this.node)
    .by(1, { position: new Vec3(100, 0, 0) }).id(123) // Assign identifier 123 to the by action
    .delay(1) // Delay for one second
    .reverse(123) // Reverse the action identified by 123, and add the reversed action to the current action queue
    .start();
```

## Reversing Actions

> [!TIP]
>
> Supported since v3.8.5

The `reverse` interface has three overloaded implementations:

```ts
// Returns a "newly created" tween instance that reverses all actions in the current tween.
reverse (): Tween<T>;

/**
 * Reverses a specific action identified within the current tween.
 * @param id Identifier of the action to reverse within the current tween.
 * @return Returns the instance itself for chaining.
 */
reverse (id: number): Tween<T>;

/**
 * Reverses a specific action identified within another tween.
 * @param otherTween Another tween instance to search for the action by identifier.
 * @param id Identifier of the action to reverse.
 * @return Returns the instance itself for chaining.
 */
reverse<U extends object = any> (otherTween: Tween<U>, id?: number): Tween<T>;
```

### `reverse()` Example

Reverse all actions in the current tween and return a **newly created** tween instance:

```ts
const t1 = tween(this.node)
    .by(1, { position: new Vec3(100, 0, 0) }) // Node's x coordinate +100 relative to current position
    .by(1, { scale: new Vec3(2, 2, 2) });     // Node's overall scale +2

const t2 = t1.reverse(); // Reverse entire tween t1 and store it as a new tween instance t2
// Equivalent to:
// const t2 = tween(this.node)
//     .by(1, { scale: new Vec3(-2, -2, -2) })
//     .by(1, { position: new Vec3(-100, 0, 0) });

tween(this.node)
    .to(1, { position: new Vec3(200, 0, 0) }) 
    .then(t2)
    .start();
```

### `reverse(id)` Example

Reverse a specific action identified within the current tween:

```ts
tween(this.node)
    .to(1, { scale: new Vec3(10, 10, 10) })
    .by(1, { position: new Vec3(200, 0, 0) }).id(123) // Assign identifier 123 to the by action
    .delay(1)
    .reverse(123) // Reverse the action identified by 123 within the current tween
    .start();
```

### `reverse(otherTween, id?)` Example

- Without passing an `id`, reverse the entire tween `otherTween` and integrate all actions into a single Sequence action, then add this action to the current tween's action queue. Achieves the same effect as the example in [reverse() Example](#reverse-example):

```ts
const t = tween(this.node)
    .by(1, { position: new Vec3(100, 0, 0) }) // Node's x coordinate +100 relative to current position
    .by(1, { scale: new Vec3(2, 2, 2) });     // Node's overall scale +2 

tween(this.node)
    .to(1, { position: new Vec3(200, 0, 0) }) 
    .reverse(t) // Reverse the entire tween t and add it as an action
    .start();
```

- When passing an `id`, reverse a specific action identified within `otherTween` and add this action to the current tween's action queue:

```ts
const t = tween(node)
    .parallel(
        tween(node).sequence(
            tween(node).by(1, { position: new Vec3(100, 0, 0) }).id(123), // Assign identifier 123 to the by action
            tween(node).to(1, { position: new Vec3(1000, 0, 0) }),
        ),
        tween(node).delay(1),
    );

tween(node)
    .to(1, { position: new Vec3(200, 0, 0) })
    .reverse(t, 123) // Reverse the action identified by 123 within tween t
    .start();
```

## Node-related Tween

The node-related methods only work if `target` is `Node`.

### Visibility

The `show` and `hide` interfaces control the display and hiding of the bound nodes, in the following example the nodes are hidden and displayed after a 1 second delay.

```ts
tween(this.node)        
    .hide()        
    .delay(1.0)
    .show()
    .start();
```

### RemoveSelf

This method generates a **delete node action** that removes the incoming node from within the scene tree.

In the following example, the node will be removed from the scene after a delay of 1 second.

```ts
tween(this.node)        
    .delay(1.0)
    .removeSelf()        
    .start()   
```

## Call

The `call` interface allows a callback action to be added to the tween, which is useful when dealing with certain asynchronous logic, as in the following example:

```ts
tween(this.node)
    .to(1.0, { position: new Vec3(0, 10, 0)})       
    // This method will be called when the 'to' action is completed   
    .call( ()=>{
        console.log("call");
    })
    .start()
```

## Set

The properties of the target can be set via `set`. The following example will set the node at [0, 100, 0] after a delay of 1 second.

```ts
tween(this.node)
    .delay(1.0)
    .set({ position: new Vec3(0, 100, 0) })
    .start();
```

It is also possible to set several different properties at the same time, with the following code example:

```ts
tween(this.node)  
    // Set the position, scale and rotation of the node at the same time    
    .set({ position: new Vec3(0, 100, 0), scale: new Vec3(2, 2, 2), rotation: Quat.IDENTITY } )
    .start();
```

## Clone

The `clone` method copies the current tween to the target parameter. Note that the source tween and the current tween should be of the same type when copying, i.e. the `T` in `new Tween<T>(target: T)` needs to be of the same type. The code example is as follows.

```ts
const srcTween = tween(this.node).delay(1.0).by(1.0, { position: new Vec3(0, 10, 0) })
// Copy 'srcTween' to a node named Cone
srcTween.clone(find("Cone")).start();
```

> [!TIP]
>
> Starting from v3.8.5, it is supported to clone tweens without passing the `target` parameter, meaning the cloned tween directly uses the original target.

Example:

```ts
const srcTween = tween(this.node).delay(1.0).by(1.0, { position: new Vec3(0, 10, 0) });
const clonedTween = srcTween.clone(); // clonedTween's target is also the this.node object
```

## Specifying Different Target Objects for Sub-tweens in `sequence`, `parallel`, `then` Interfaces

> [!TIP]
>
> Supported from v3.8.5

If you want to handle actions like `position`, `contentSize`, and `color` simultaneously in a tween chain, with their targets being different—node, UITransform component on the node, and Sprite component on the node respectively, you can achieve this using the following code:

```ts
tween(node)
    .parallel(
        tween(node).to(1, { position: new Vec3(100, 100, 0) }),
        tween(node.getComponent(UITransform) as UITransform).to(1, { contentSize: size(100, 100) }),
        tween(node.getComponent(Sprite) as Sprite).to(1, { color: color(100, 100, 100, 100) }),
    )
    .start();
```

The `sequence` and `then` interfaces work in a similar manner.

## Stopping Tweens

### stop

Instance method used to stop a specified tween.

```ts
const t = tween(node)
    .by(1, { position: v3(90, 90, 90) })
    .start(); // Start the tween

// ......

t.stop(); // Stop the tween
```

### stopAll

**Static method** to stop all tweens.

```ts
Tween.stopAll();
```

### stopAllByTag

**Static method** to stop all tweens with a specified tag.

- Without target parameter

```ts
const MY_TWEEN_TAG = 123;
const node1 = new Node();
const node2 = new Node();

const t1 = tween(node1)
    .tag(MY_TWEEN_TAG)
    .by(1, { position: new Vec3(100, 0, 0) })
    .start();

const t2 = tween(node2)
    .tag(MY_TWEEN_TAG)
    .by(1, { scale: new Vec3(2, 2, 2) })
    .start();

Tween.stopAllByTag(MY_TWEEN_TAG); // Both t1 and t2 have the tag MY_TWEEN_TAG, so both will be stopped
```

- With target parameter

```ts
const MY_TWEEN_TAG = 123;
const node1 = new Node();
const node2 = new Node();

const t1 = tween(node1)
    .tag(MY_TWEEN_TAG)
    .by(1, { position: new Vec3(100, 0, 0) })
    .start();

const t2 = tween(node2)
    .tag(MY_TWEEN_TAG)
    .by(1, { scale: new Vec3(2, 2, 2) })
    .start();

Tween.stopAllByTag(MY_TWEEN_TAG, node1); // Both t1 and t2 have the tag MY_TWEEN_TAG, but only t1 will be stopped since its target is node1, t2 will continue running as its target is node2
```

### stopAllByTarget

**Static method** to stop all tween instances associated with a specified target object.

```ts
const node1 = new Node();
const node2 = new Node();

const t1 = tween(node1)
    .by(1, { position: new Vec3(100, 0, 0) })
    .start();

const t2 = tween(node2)
    .by(1, { scale: new Vec3(2, 2, 2) })
    .start();

const t3 = tween(node1)
    .by(1, { angle: 90 })
    .start();

Tween.stopAllByTarget(node1); // t1 and t3 are associated with node1, so they will be stopped, t2 will continue running
```

## Pausing/Resuming Tweens

> [!TIP]
>
> Supported from v3.8.5

Manual pause and resume:

```ts
const t = tween(this.node)
    .by(1, { position: new Vec3(90, 0, 0) }).id(123)
    .reverse(123)
    .union()
    .repeatForever()
    .start();  // Start the tween

// ......
t.pause(); // Pause the tween t

// ......
t.resume(); // Resume the tween t
```

> [!IMPORTANT]
>
> From v3.8.5, if the tween target is of type Node, the tween will automatically pause and resume based on the Node's active state.

## Scaling Tween Time

> [!TIP]
>
> Supported from v3.8.5

```ts
tween(this.node)
    .to(1, { position: new Vec3(100, 100, 100) })
    .timeScale(0.5)
    .start();
```

In the above example, `timeScale` is set to 0.5. The `to` action's duration is 1, so the actual total duration of the tween execution will be `duration / timeScale = 1 / 0.5 = 2 seconds`.

## Getting the Total Duration of a Tween

> [!TIP]
>
> Supported from v3.8.5

```ts
const t = tween(this.node)
    .to(1, { position: new Vec3(100, 100, 100) })
    .to(1, { scale: new Vec3(2, 2, 2) })
    .start();

console.log(t.duration); // Outputs 2
```

## Custom Actions

> [!TIP]
>
> Supported from v3.8.5

The `update` interface is used to add a custom action.

Its interface declaration is as follows:

```ts
/**
 * @en Add a custom action.
 * @param duration @en The tween time in seconds.
 * @param cb @en The callback of the current action.
 * @param args @en The arguments passed to the callback function.
 * @return @en The instance itself for easier chaining.
 */
update<Args extends any[]> (duration: number, cb: TTweenUpdateCallback<T, Args>, ...args: Args): Tween<T> { ... }
```

Example code:

```ts
let done = false;

tween(this.node)
    .delay(1)
    .by(1, { position: v3(90, 90, 90) })
    .update(1, (target: Node, ratio: number, a: number, b: boolean, c: string, d: { 'world': () => number }): void =>{
        // ......
        // target, a, b, c, d are all parameters passed to the update callback, n parameters can be specified
        // target is this.node
        // a is 123
        // b is true
        // c is 'hello'
        // d is { 'world': (): number => 456 }
    }, 123, true, 'hello', { 'world': (): number => 456 })
    .repeat(2)
    .call(() => { done = true; })
    .start();
```

## Starting Tween from a Specific Time

> [!TIP]
>
> Supported from v3.8.5

The `start` interface can receive a `startTime` parameter, in seconds, to start the tween from a specific time. All tweens before this time will be executed immediately.

```ts
const t = tween(this.node)
    .to(1, { position: new Vec3(100, 100, 100) })
    .call(() => {})
    .to(1, { scale: new Vec3(2, 2, 2) })
    .start(1); // Start from the 1st second
```

In the above example, two `to` actions are created with a total duration of 2 seconds. Since the tween starts from the 1st second, the position of `this.node` will be immediately set to (100, 100, 100), and the callback of `call` will be invoked immediately. Then, over the next 1 second, the scale animation will enlarge to 2.

## Destruction

### Automatic Destruction

> [!TIP]
>
> Supported from v3.8.5

When the target of tween is `Node`, it will listen to its destruction event for automatic destruction of tween, and the call to `target` method will also update the listener automatically.

### Manual Destruction

Most tweens destroy themselves after the last action, but tweens that are not destroyed properly, such as `repeatForever`, will remain in memory after switching scenes. You need to call the destroy interface manually to destroy it.

To stop and destroy the tween, the following methods are available.

- member `stop` function to destroy the tween, with the following code example.

    ```ts
    let t = tween(this.node.position)        
    .to( 1.0, new Vec3(0, 10, 0), {
        onUpdate : (target:Vec3, ratio:number)=>{
            this.node.position = target;
        }
    })              
    t.stop();        
    ```

- Use the static functions `stopAll`, `stopAllByTag` and `stopAllByTarget` to destroy all or specific tweens, with the following code example.

    ```ts
    Tween.stopAll() // Destroy all tweens
    
    Tween.stopAllByTag(0); // Destroy all tweens with 0 as the tag
    
    Tween.stopAllByTarget(this.node); // Destroy all tweens on this node
    ```

> **Note**: In versions prior to v3.8.5, remember to stop the corresponding tweens when switching scenes. From v3.8.5, the engine will handle this automatically.
