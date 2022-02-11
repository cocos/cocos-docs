# 缓动示例

本文将主要介绍 Cosos Creator 缓动中常见的一些用法和接口。

## 最简单的示例

通过 `tween` 方法或使用 `new Tween<T>(target: T)` 都可以构造缓动。

>`tween` 是引擎提供的工具方法，并非 `Tween` 的成员，请注意区分。关于这点可以参考接口说明： [Tween 接口说明](tween-interface.md)。

这里演示了如何使用一个 `to` 类型的缓动，将 `node` 的位置沿 Y 轴偏移 10 个单位：

```ts
let tweenDuration : number = 1.0;         // 缓动的时长
tween(this.node.position).to( tweenDuration, new Vec3(0, 10, 0), {  //这里以node的位置信息坐标缓动的目标 
    onUpdate : (target:Vec3, ratio:number)=>{  //回调，onUpdate 接受当前缓动的进度
        this.node.position = target;  // 将缓动系统计算出的结果赋予 node 的位置
    }
}).start(); // 调用 start 方法，开启缓动
```

## ITweenOption 完整示例

`ITweenOption` 是负责对 `to` 和 `by` 类型的缓动设置缓动函数和监听缓动回调的接口，其接口皆为**可选**，可按需使用。完整示例如下：

```ts
let tweenDuration : number = 1.0;         // 缓动的时长
tween(this.node.position).to( tweenDuration, new Vec3(0, 10, 0), {  //这里以node的位置信息坐标缓动的目标 
    easing: "backIn",       //缓动函数，可以使用已有的，也可以传入自定义的函数。
    onStart: (target?:object)=>{ //回调，当缓动动作启动时触发。

    },
    onUpdate : (target:Vec3, ratio:number)=>{  // onUpdate 接受当前缓动的进度
        this.node.position = target;  // 将缓动系统计算出的结果赋予 node 的位置
    },
    onComplete: (target?: object)=>{ //回调，当缓动动作更新时触发。

    },            
    progress:(start: number, end: number, current: number, ratio: number) :number=>{ // 插值函数
        return yourProgressHere;
    }            
}).start(); // 调用 start 方法，开启缓动
```

若要查看完整的 `easing` 函数，可参考： [内置缓动函数](tween-interface.md)

## 常见示例

### 多个动作

通常来说，一个缓动可由一个或多个动作组成。

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
}) // 此时 Tween 内的动作数量为2 
```

### union

 `union` 方法会将当前所有的动作合并为一整个。

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
.unions() //这里会将上述的两个缓动整合成一个，此时 Tween 内的动作数量为 1
.start(); 
```

### sequence

`sequence` 会将参入的缓动转化为队列形式并加入到当前的缓动内：

```ts
let tweenDuration : number = 1.0;
let t1 = tween(this.node.position)
.to( tweenDuration, new Vec3(0, 10, 0), {
    onUpdate : (target:Vec3, ratio:number)=>{
        this.node.position = target;
    }
})

let t2 = tween(this.node.position)
.to( tweenDuration, new Vec3(0, -10, 0), {  
    onUpdate : (target:Vec3, ratio:number)=>{
        this.node.position = target;
    }
})        

tween(this.node.position).sequence(t1, t2).start(); //将 t1 和 t2 两个缓动转变为队列缓动并加入到当前的缓动内
```

### parallel

`parallel` 会将参入的缓动转化为并行形式并加入到当前的缓动内：

```ts
let tweenDuration : number = 1.0;
let t1 = tween(this.node.position)
.to( tweenDuration, new Vec3(0, 10, 0), {
    onUpdate : (target:Vec3, ratio:number)=>{
        this.node.position = target;
    }
})

let t2 = tween(this.node.position)
.to( tweenDuration, new Vec3(0, -10, 0), {  
    onUpdate : (target:Vec3, ratio:number)=>{
        this.node.position = target;
    }
})        

tween(this.node.position).parallel(t1, t2).start(); //将 t1 和 t2 转化为并行的缓动并加入当前的缓动
```

## delay

`delay` 会在 **当前** 的动作 **后** 添加一个延时。

注意在下列代码示例中，`delay` 位置不同会造成完全不同的结果：

- 示例一：延迟 1 秒后，开始进行运动，并连续运动两次。

```ts
let tweenDuration : number = 1.0;
    tween(this.node.position)
    .delay(1.0)
    .to( tweenDuration, new Vec3(0, 10, 0), {
        onUpdate : (target:Vec3, ratio:number)=>{
            this.node.position = target;
        }
    })
    .to( tweenDuration, new Vec3(0, -10, 0), { 
        onUpdate : (target:Vec3, ratio:number)=>{ 
            this.node.position = target; 
        }
    })
    .start()        
```

- 示例二：在第一次运动后，会延迟 1 秒再做第二次运动。

```ts
let tweenDuration : number = 1.0;
    tween(this.node.position)        
    .to( tweenDuration, new Vec3(0, 10, 0), {
        onUpdate : (target:Vec3, ratio:number)=>{
            this.node.position = target;
        }
    })
    .delay(1.0)
    .to( tweenDuration, new Vec3(0, -10, 0), {  
        onUpdate : (target:Vec3, ratio:number)=>{  
            this.node.position = target; 
        }
    })
    .start()   
```

### repeat 和 repeatForever

接口 `repeat` 可以为缓动添加一个重复次数，若 `embedTween` 为空，则会使用当前缓动的最后一个动作作为参数。

这意味着，如果当前缓动由多个缓动组成，则只会重复 **最后一个**，请注意下面的示例：

```ts
let tweenDuration : number = 1.0;
tween(this.node.position)        
.to( tweenDuration, new Vec3(0, 10, 0), {
    onUpdate : (target:Vec3, ratio:number)=>{
        this.node.position = target;
    }
})        
.by( tweenDuration, new Vec3(0, -10, 0), {  
    onUpdate : (target:Vec3, ratio:number)=>{  
        let result : Vec3 = new Vec3()
        Vec3.add(result, this.node.position, target);
        this.node.position = result; 
    }
})
.repeat(3) // 注意这里会重复 by 这个缓动 3 次
.start()   
```

若第二个参数 `embedTween` 不为空，则会重复嵌入的缓动：

```ts
let tweenDuration : number = 1.0;

let embedTween = tween(this.node.position).by( tweenDuration, new Vec3(0, -10, 0), {  
    onUpdate : (target:Vec3, ratio:number)=>{  
        let result : Vec3 = new Vec3()
        Vec3.add(result, this.node.position, target);
        this.node.position = result; 
    }
})

let tweenOirgin = tween(this.node.position)        
.to( tweenDuration, new Vec3(0, 10, 0), {
    onUpdate : (target:Vec3, ratio:number)=>{
        this.node.position = target;
    }
})                
.repeat(3, embedTween) // 这里会重复 embedTween
.start()   
```

上述示例中 `tweenOirgin` 在选择嵌入 `embedTween`后, 实际上重复执行的是  `embedTween` 的行为。

`repeatForever` 接口和 `repeat` 类似，但是会变为永久重复，以前一个动作为参数(`embedTween`为空)， 或者永久重复嵌入的 `embedTween`。

### removeSelf

该方法会产生一个删除节点的动作，该动作会将传入的节点从场景树内删除。

下列代码演示了在延迟 1 秒后，将当前节点删除：

```ts
tween(this.node)        
    .delay(1.0)
    .removeSelf()        
    .start()   
```

该方法仅可对目标为节点的缓动使用。

> 需要注意的是，`removeSelf` 不是销毁缓动的方法。该方法是生成一个 **删除** 节点的动作。

## 销毁

大部分缓动在最后一个动作完毕后，都会对自身进行销毁，但是对于未能正确销毁的缓动， 如 `repeatForever` 在切换场景后，会一直驻留在内存中。需要手动调用销毁接口进行销毁。

如果要停止并销毁缓动，有下列的方法：

- 成员 `stop` 接口，销毁该缓动

```ts
let t = tween(this.node.position)        
.to( 1.0, new Vec3(0, 10, 0), {
    onUpdate : (target:Vec3, ratio:number)=>{
        this.node.position = target;
    }
})              
t.stop();        
```

- 使用静态接口 `stopAll`、`stopAllByTag` 和 `stopAllByTarget` 销毁所有或特定缓动

```ts
Tween.stopAll() // 销毁所有缓动

Tween.stopAllByTag(0); // 销毁所有以 0 为标签的缓动
 
Tween.stopAllByTarget(this.node); // 销毁该节点上的所有缓动
```

> **注意**：切换场景时记得停止相应的缓动。

### 自动销毁

当缓动目标为 `Node` 时，将会监听其销毁事件进行缓动的自动销毁，调用 `target` 方法也会自动更新监听。
