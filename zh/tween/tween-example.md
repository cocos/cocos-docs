# 缓动示例

本文将主要介绍 Cosos Creator 缓动中常见的一些用法和接口。

## 构造缓动

通过 `tween` 方法或使用 `new Tween<T>(target: T)` 都可以构造缓动。

> **注意**：‘tween’ 是引擎提供的工具方法，并非 ‘Tween’ 的成员，请注意区分。关于这点可以参考接口说明： [缓动接口](tween-interface.md)。

## 链式 API

大部分和动作相关的接口都会返回 `this` 或者一个新的 `Tween` 对象，因此可以方便的使用链式调用来进行组合：

```ts
tween()
    .target(this.node)
    .to(1.0, { position: new Vec3(0, 10, 0) })
    .by(1.0, { position: new Vec3(0, -10, 0) })
    .delay(1.0)
    .by(1.0, { position: new Vec3(0, -10, 0) })
    .start()
```

## to，by 简单示例

这里演示了如何使用一个 `to` 类型的缓动绑定节点的位置信息并将其位置沿 Y 轴偏移 10 个单位：

```ts
let tweenDuration : number = 1.0;                                    // 缓动的时长
tween(this.node.position)
    .to( tweenDuration, new Vec3(0, 10, 0), {                        // to 接口表示节点的绝对值
    onUpdate : (target:Vec3, ratio:number)=>{                        // 实现 ITweenOption 的 onUpdate 回调，接受当前缓动的进度
        this.node.position = target;                                 // 将缓动系统计算出的结果赋予 node 的位置        
    }
}).start();                                                          // 调用 start 方法，开启缓动
```

## 绑定不同对象

开发中使用 `Node` 作为绑定目标的情景会更多一些，代码示例如下：

```ts
let  quat : Quat = new Quat();
Quat.fromEuler(quat, 0, 90, 0);
tween(this.node)
    .to(tweenDuration, { 
        position: new Vec3(0, 10, 0),                   // 位置缓动
        scale: new Vec3(1.2, 3, 1),                     // 缩放缓动
        rotation:quat }                                 // 旋转缓动
    )                                   
    .start();                                           // 调用 start 方法，开启缓动
```

实际上缓动可以绑定任意对象，代码示例如下：

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
            sprite.color = tar.color;  // 设置精灵的为 BindTarget 内的颜色
        }
})
.start()
```

## 常见示例

### 多个动作

通常来说，一个缓动可由一个或多个 **动作** 组成，`Tween` 维护了一个由多个 **动作** 组成的数据结构用于管理当前缓动内的所有动作。

下面代码演示了将物体的位置沿 Y 轴移动 10 个单位后，沿 -Y 轴移动 10 个单位。

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
}) // 此时 Tween 内的动作数量为 2
```

多个缓动也可使用 `union`、`squence`、`parallel` 接口来组织。通过提前创建好一些固定的缓动，并使用 `union`、`squence`、`parallel` 来组合他们从而减少代码的编写。

### 整合多个缓动

 `union` 方法会将当前所有的动作合并为一整个，代码示例如下：

```ts
let tweenDuration : number = 1.0;         
tween(this.node)
    .to(tweenDuration, { position:new Vec3(0, 10, 0) })  // 这里以 node 为缓动的目标
    .to(tweenDuration, { position:new Vec3(0, -10, 0) }) // 此时 Tween 内的动作数量为 2
    .union()                                             // 这里会将上述的两个缓动整合成一个，此时 Tween 内的动作数量为 1
    .start();                                            // 调用 start 方法，开启缓动
```

### 缓动队列

`sequence` 会将传入的缓动转化为队列形式并加入到当前的缓动内，代码示例如下：

```ts
let tweenDuration: number = 1.0;
let t1 = tween(this.node)
    .to(tweenDuration, { position: new Vec3(0, 10, 0) })

let t2 = tween(this.node)
    .to(tweenDuration, { position: new Vec3(0, -10, 0) })

tween(this.node).sequence(t1, t2).start(); // 将 t1 和 t2 两个缓动加入到新的缓动队列内
```

### 同时执行多个缓动

`parallel` 会将传入的缓动转化为并行形式并加入到当前的缓动内，代码示例如下：

```ts
let tweenDuration: number = 1.0;
let t1 = tween(this.node)
    .to(tweenDuration, { position: new Vec3(0, 10, 0) })

let t2 = tween(this.node)
    .to(tweenDuration, { position: new Vec3(0, -10, 0) })

tween(this.node).parallel(t1, t2).start(); // 将 t1 和 t2 转化为并行的缓动并加入当前的缓动
```

## 插入缓动

`then` 接口允许传入新的缓动，并将该缓动整合后添加到当前缓动的动作内，代码示例如下：

```ts
let tweenAfter = tween(this.node)
    .to(1.0, { position: new Vec3(0, -10, 0) })

tween(this.node)
    .by(1.0, { position: new Vec3(0, 10, 0) })
    .then(tweenAfter)
    .start();
```

## 延迟执行

`delay` 会在 **当前** 的动作 **后** 添加一个延时。

注意在下列代码示例中，`delay` 位置不同会造成完全不同的结果：

- 延迟 1 秒后，开始进行运动，并连续运动两次。

    ```ts
    let tweenDuration: number = 1.0;
    tween(this.node)
        .delay(1.0)
        .to(tweenDuration, { position: new Vec3(0, 10, 0) })
        .to(tweenDuration, { position: new Vec3(0, -10, 0) })
        .start()  
    ```

- 在第一次运动后，会延迟 1 秒再做第二次运动。

    ```ts
    let tweenDuration: number = 1.0;
    tween(this.node)
        .to(tweenDuration, { position: new Vec3(0, 10, 0) })
        .delay(1.0)
        .to(tweenDuration, { position: new Vec3(0, -10, 0) })
        .start()
    ```

### 重复执行

接口 `repeat` 可以为缓动添加一个重复次数，若 `embedTween` 参数为空，则会使用当前缓动的最后一个动作作为参数。

这意味着，如果当前缓动由多个缓动组成，则只会重复 **最后一个**，请注意下面的示例：

```ts
let tweenDuration: number = 1.0;
tween(this.node)
    .to(tweenDuration, { position: new Vec3(0, 10, 0) })
    .by(tweenDuration, { position: new Vec3(0, -10, 0) })
    .repeat(3) // 注意这里会重复 by 这个缓动 3 次
    .start()  
```

若第二个参数 `embedTween` 不为空，则会重复嵌入的缓动，代码示例如下：

```ts
let tweenDuration: number = 1.0;
let embedTween = tween(this.node)
    .by(tweenDuration, { position: new Vec3(0, -10, 0) })

tween(this.node)
    .to(tweenDuration, { position: new Vec3(0, 10, 0) })
    .repeat(3, embedTween)  // 这里会重复 embedTween
    .start()  
```

`repeatForever` 接口和 `repeat` 类似，但是会变为永久重复。

### 节点相关的缓动

节点相关的方法只适用于 `target` 是 `Node` 的情况。

#### 显示和隐藏节点

`show` 和 `hide` 接口可以控制绑定节点的显示和隐藏，下面示例中，节点会被隐藏并在延迟 1 秒后显示。

```ts
tween(this.node)        
    .hide()        
    .delay(1.0)
    .show()
    .start();
```

#### 删除节点

该方法会产生一个 **删除节点的动作**，该动作会将传入的节点从场景树内删除。

在下面的示例中，节点会在延迟 1 秒后从场景内删除。

```ts
tween(this.node)        
    .delay(1.0)
    .removeSelf()        
    .start()   
```

### 添加回调动作

`call` 接口允许给缓动添加一个回调动作，该接口在处理某些异步逻辑时非常有用，示例如下：

```ts
tween(this.node)
    .to(1.0, { position: new Vec3(0, 10, 0)})       
    // to 动作完成后会调用该方法     
    .call( ()=>{
        console.log("call");
    })
    .start()
```

### 设置目标属性

通过 `set` 可以设置目标的属性。下面的示例会在延迟 1 秒后将节点设置在 [0, 100, 0] 的位置。

```ts
tween(this.node)
    .delay(1.0)
    .set({ position: new Vec3(0, 100, 0) })
    .start();
```

也可以同时设置多个不同的属性，代码示例如下：

```ts
tween(this.node)  
    // 同时设置节点的位置，缩放和旋转    
    .set({ position: new Vec3(0, 100, 0), scale: new Vec3(2, 2, 2), rotation: Quat.IDENTITY } )
    .start();
```

### 复制缓动

`clone` 方法可将当前的缓动复制到目标参数上，注意在复制时源缓动和目前缓动的绑定对象要类型一致，即 `new Tween<T>(target: T)` 中的 `T` 需要类型一致。代码示例如下：

```ts
let srcTween = tween(this.node).delay(1.0).by(1.0, { position: new Vec3(0, 10, 0) })
// 将 ‘srcTween’ 复制到名为 Cone 的节点上
srcTween.clone(find("Cone")).start();
```

## 销毁

### 自动销毁

当缓动目标为 `Node` 时，将会监听其销毁事件进行缓动的自动销毁，调用 `target` 方法也会自动更新监听。

### 手动销毁

大部分缓动在最后一个动作完毕后，都会对自身进行销毁，但是对于未能正确销毁的缓动， 如 `repeatForever` 在切换场景后，会一直驻留在内存中。需要手动调用销毁接口进行销毁。

如果要停止并销毁缓动，有下列的方法：

- 成员 `stop` 接口，销毁该缓动，代码示例如下：

    ```ts
    let t = tween(this.node.position)        
    .to( 1.0, new Vec3(0, 10, 0), {
        onUpdate : (target:Vec3, ratio:number)=>{
            this.node.position = target;
        }
    })              
    t.stop();        
    ```

- 使用静态接口 `stopAll`、`stopAllByTag` 和 `stopAllByTarget` 销毁所有或特定缓动，代码示例如下：

    ```ts
    Tween.stopAll() // 销毁所有缓动

    Tween.stopAllByTag(0); // 销毁所有以 0 为标签的缓动
    
    Tween.stopAllByTarget(this.node); // 销毁该节点上的所有缓动
    ```

> **注意**：切换场景时记得停止相应的缓动。
