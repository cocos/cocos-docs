## ITweenOption 接口说明

ITweenOption 为缓动提供可选属性，该类无法直接实例化，主要用于 `to` 和 `by` 这两个接口内，为这两个接口提供不同的缓动函数和接收缓动的回调。

通过 `easing` 接口可以调整缓动函数，目前引擎内支持的缓动函数可参考 [内置缓动函数](tween-interface.md/内置缓动函数)。

修改缓动函数示例：

```ts
let tweenDuration: number = 1.0;         // 缓动的时长
tween(this.node)
.to(tweenDuration, { position: new Vec3(0, 10, 0) }, {  //这里以node的位置信息坐标缓动的目标 
    easing: "backIn",       //缓动函数，可以使用已有的，也可以传入自定义的函数。      
}).start(); // 调用 start 方法，开启缓动
```

完整示例可查看 [ITweenOption 完整示例](tween-example.md)

### 内置缓动函数

`ITweenOption.easing` 的可选项如下：

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

其效果图为：
![tweener](img/tweener.png)

图片源自 [http://hosted.zeh.com.br/tweener/docs/en-us/](http://hosted.zeh.com.br/tweener/docs/en-us/)
