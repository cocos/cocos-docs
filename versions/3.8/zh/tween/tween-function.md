# 缓动函数

引擎实现了一系列不同类型的缓动函数，通过这些缓动函数，可以实现不同的实时动画效果。这些缓动函数主要用于 `Tween.to` 和 `Tween.by` 这两个接口中。

## 内置缓动函数

目前引擎提供的缓动函数如下所示：

```ts
export type TweenEasing =
'linear'    | 'smooth'     | 'fade'         | 'constant'     |
'quadIn'    | 'quadOut'    | 'quadInOut'    | 'quadOutIn'    |
'cubicIn'   | 'cubicOut'   | 'cubicInOut'   | 'cubicOutIn'   |
'quartIn'   | 'quartOut'   | 'quartInOut'   | 'quartOutIn'   | 
'quintIn'   | 'quintOut'   | 'quintInOut'   | 'quintOutIn'   |
'sineIn'    | 'sineOut'    | 'sineInOut'    | 'sineOutIn'    |
'expoIn'    | 'expoOut'    | 'expoInOut'    | 'expoOutIn'    |
'circIn'    | 'circOut'    | 'circInOut'    | 'circOutIn'    |
'elasticIn' | 'elasticOut' | 'elasticInOut' | 'elasticOutIn' |
'backIn'    | 'backOut'    | 'backInOut'    | 'backOutIn'    |
'bounceIn'  | 'bounceOut'  | 'bounceInOut'  | 'bounceOutIn';
```

其缓动效果可参考下图：

![tweener](img/tweener.png)

图片源自 [http://hosted.zeh.com.br/tweener/docs/en-us/](http://hosted.zeh.com.br/tweener/docs/en-us/)

通过 `ITweenOption` 接口，可以修改缓动函数。其代码示例如下：

```ts
let tweenDuration: number = 1.0;                            // 缓动的时长
tween(this.node)
    .to(tweenDuration, { position: new Vec3(0, 10, 0) }, {  // 这里以node的位置信息坐标缓动的目标 
        easing: "backIn",                                   // 缓动函数，可以使用已有的，也可以传入自定义的函数。      
    })
    .start();                                               // 调用 start 方法，开启缓动
```

## ITweenOption 接口说明

`ITweenOption` 为缓动的可选属性接口定义。其接口皆为 **可选**，可按需使用。完整示例如下：

```ts
let tweenDuration: number = 1.0;                            // 缓动的时长
tween(this.node)
    .to(tweenDuration, { position: new Vec3(0, 10, 0) }, {  // 这里以node的位置信息坐标缓动的目标 
        easing: "backIn",                                   // 缓动函数，可以使用已有的，也可以传入自定义的函数。      
        onStart: (target?: object) => {                     // 回调，当缓动动作启动时触发。

        },
        onUpdate: (target: Vec3, ratio: number) => {        // onUpdate 接受当前缓动的进度
            this.node.position = target;                    // 将缓动系统计算出的结果赋予 node 的位置
        },
        onComplete: (target?: object) => {                  // 回调，当缓动动作更新时触发。

        },
        progress: (start: number, end: number, current: number, ratio: number): number => {
            // 返回自定义插值进度
            return 0.0;
        }
    })
    .start();                                               // 调用 start 方法，开启缓动
```

通过 `progress` 接口，也可以自定义缓动的进度，代码示例如下：

```ts
tween(this.node)
    .to(1.0, {
        position: new Vec3(0, 100, 0),
    }, {
        progress: (start: number, end: number, current: number, ratio: number): number => {
            return math.lerp(start, end, ratio);
        }
    })
    .start()
```

完整 API 描述请参考： [ITweenOption](__APIDOC__/zh/interface/ITweenOption)
