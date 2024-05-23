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

## Simple Example of 'to', 'by'

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

## Common Examples

### Multiple Actions

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

Multiple tweens can also be organized using the `union`, `squence`, and `parallel` interfaces. By creating some fixed tweens in advance and using `union`, `squence`, `parallel` to combine them, you can reduce the amount of code written.

### Union

 The `union` method combines all current actions into one, with the following code example:

```ts
let tweenDuration : number = 1.0;         
tween(this.node)
    .to(tweenDuration, { position:new Vec3(0, 10, 0) })  // Here the node is the target of the tween
    .to(tweenDuration, { position:new Vec3(0, -10, 0) }) // At this point the number of actions in the Tween is 2
    .union()                                             // The above two tweens will be combined into one, and the number of actions in the Tween will be 1
    .start();                                            // Call the start method to enable tween
```

### Sequence

The `sequence` function will transform the incoming tween into a queue form and add it to the current tween, with the following code example:

```ts
let tweenDuration: number = 1.0;
let t1 = tween(this.node)
    .to(tweenDuration, { position: new Vec3(0, 10, 0) })

let t2 = tween(this.node)
    .to(tweenDuration, { position: new Vec3(0, -10, 0) })

tween(this.node).sequence(t1, t2).start(); // Add t1 and t2 tweens to the new tween queue
```

### Parallel

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

### Repeat

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

### Node-related Tween

The node-related methods only work if `target` is `Node`.

#### Visibility

The `show` and `hide` interfaces control the display and hiding of the bound nodes, in the following example the nodes are hidden and displayed after a 1 second delay.

```ts
tween(this.node)        
    .hide()        
    .delay(1.0)
    .show()
    .start();
```

#### RemoveSelf

This method generates a **delete node action** that removes the incoming node from within the scene tree.

In the following example, the node will be removed from the scene after a delay of 1 second.

```ts
tween(this.node)        
    .delay(1.0)
    .removeSelf()        
    .start()   
```

### Call

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

### Set

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

### Clone

The `clone` method copies the current tween to the target parameter. Note that the source tween and the current tween should be of the same type when copying, i.e. the `T` in `new Tween<T>(target: T)` needs to be of the same type. The code example is as follows.

```ts
let srcTween = tween(this.node).delay(1.0).by(1.0, { position: new Vec3(0, 10, 0) })
// Copy 'srcTween' to a node named Cone
srcTween.clone(find("Cone")).start();
```

## Destruction

### Automatic Destruction

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

> **Note**: Remember to stop the corresponding tweens when switching scenes.
