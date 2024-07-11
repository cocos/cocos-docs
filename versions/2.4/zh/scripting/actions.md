# 在 Cocos Creator 中使用动作系统

> 动作系统目前已不推荐使用，未来将逐步移除，建议使用 [缓动系统](./tween.md) 做为替代。

## 动作系统简介

Cocos Creator 提供的动作系统源自 Cocos2d-x，API 和使用方法均一脉相承。动作系统可以在一定时间内对节点完成位移，缩放，旋转等各种动作。

需要注意的是，动作系统并不能取代 [动画系统](../animation/index.md)，动作系统提供的是面向程序员的 API 接口，而动画系统则是提供在编辑器中来设计的。同时，它们服务于不同的使用场景，动作系统比较适合来制作简单的形变和位移动画，而动画系统则强大许多，美术可以用编辑器制作支持各种属性，包含运动轨迹和缓动的复杂动画。

## 动作系统 API

动作系统的使用方式也很简单，在 `cc.Node` 中支持如下 API：

```js
// 创建一个移动动作
var action = cc.moveTo(2, 100, 100);
// 执行动作
node.runAction(action);
// 停止一个动作
node.stopAction(action);
// 停止所有动作
node.stopAllActions();
```

开发者还可以给动作设置 tag，并通过 tag 来控制动作。

```js
// 给 action 设置 tag
var ACTION_TAG = 1;
action.setTag(ACTION_TAG);
// 通过 tag 获取 action
node.getActionByTag(ACTION_TAG);
// 通过 tag 停止一个动作
node.stopActionByTag(ACTION_TAG);
```

## 动作类型

在 Cocos Creator 中支持非常丰富的各种动作，这些动作主要分为以下几大类。

（由于动作类型过多，在这里不展开描述每个动作的用法，开发者可以参考 [动作系统 API 列表](./action-list.md) 来查看所有动作。）

### 基础动作

基础动作就是实现各种形变，位移动画的动作，比如 `cc.moveTo` 用来移动节点到某个位置；`cc.rotateBy` 用来旋转节点一定的角度；`cc.scaleTo` 用来缩放节点。

基础动作中分为时间间隔动作和即时动作，前者是在一定时间间隔内完成的渐变动作，前面提到的都是时间间隔动作，它们全部继承自 [`cc.ActionInterval`](%__APIDOC__%/zh/classes/ActionInterval.html)。后者则是立即发生的，比如用来调用回调函数的 `cc.callFunc`；用来隐藏节点的 `cc.hide`，它们全部继承自 [`cc.ActionInstant`](%__APIDOC__%/zh/classes/ActionInstant.html)。

### 容器动作

容器动作可以以不同的方式将动作组织起来，下面是几种容器动作的用途：

1. 顺序动作 `cc.sequence`
    顺序动作可以让一系列子动作按顺序一个个执行。示例：

    ```js
    // 让节点左右来回移动
    var seq = cc.sequence(cc.moveBy(0.5, 200, 0), cc.moveBy(0.5, -200, 0));
    node.runAction(seq);
    ```

2. 同步动作 `cc.spawn`
    同步动作可以同步执行对一系列子动作，子动作的执行结果会叠加起来修改节点的属性。示例：

    ```js
    // 让节点在向上移动的同时缩放
    var spawn = cc.spawn(cc.moveBy(0.5, 0, 50), cc.scaleTo(0.5, 0.8, 1.4));
    node.runAction(spawn);
    ```

3. 重复动作 `cc.repeat`
    重复动作用来多次重复一个动作。示例：

    ```js
    // 让节点左右来回移动，并重复 5 次
    var seq = cc.repeat(
                cc.sequence(
                    cc.moveBy(2, 200, 0),
                    cc.moveBy(2, -200, 0)
                ), 5);
    node.runAction(seq);
    ```

4. 永远重复动作 `cc.repeatForever`
    顾名思义，这个动作容器可以让目标动作一直重复，直到手动停止。

    ```js
    // 让节点左右来回移动并一直重复
    var seq = cc.repeatForever(
                cc.sequence(
                    cc.moveBy(2, 200, 0),
                    cc.moveBy(2, -200, 0)
                ));
    ```
5. 速度动作 `cc.speed`
    速度动作可以改变目标动作的执行速率，让动作更快或者更慢完成。

    ```js
    // 让目标动作速度加快一倍，相当于原本 2 秒的动作在 1 秒内完成
    var action = cc.speed(
                    cc.spawn(
                        cc.moveBy(2, 0, 50),
                        cc.scaleTo(2, 0.8, 1.4)
                    ), 2);
    node.runAction(action);
    ```

从上面的示例中可以看出，不同容器类型是可以复合的，除此之外，我们给容器类型动作提供了更为方便的链式 API，动作对象支持以下三个 API：`repeat`、`repeatForever`、`speed`，这些 API 都会返回动作对象本身，支持继续链式调用。我们来看一个更复杂的动作示例：

```js
// 一个复杂的跳跃动画
this.jumpAction = cc.sequence(
    cc.spawn(
        cc.scaleTo(0.1, 0.8, 1.2),
        cc.moveTo(0.1, 0, 10)
    ),
    cc.spawn(
        cc.scaleTo(0.2, 1, 1),
        cc.moveTo(0.2, 0, 0)
    ),
    cc.delayTime(0.5),
    cc.spawn(
        cc.scaleTo(0.1, 1.2, 0.8),
        cc.moveTo(0.1, 0, -10)
    ),
    cc.spawn(
        cc.scaleTo(0.2, 1, 1),
        cc.moveTo(0.2, 0, 0)
    )
// 以 1/2 的速度慢放动画，并重复 5 次
).speed(2).repeat(5);
```

### 动作回调

动作回调可以用以下的方式声明：

```js
var finished = cc.callFunc(this.myMethod, this, opt);
```

`cc.callFunc` 第一个参数是处理回调的方法，即可以使用 CCClass 的成员方法，也可以声明一个匿名函数：

```js
var finished = cc.callFunc(function () {
    // doSomething
}, this, opt);
```

第二个参数指定了处理回调方法的 context（也就是绑定 this），第三个参数是向处理回调方法的传参。您可以这样使用传参：

```js
var finished = cc.callFunc(function(target, score) {
    this.score += score;
}, this, 100); //动作完成后会给玩家加 100 分
```

在声明了回调动作 `finished` 后，您可以配合 `cc.sequence` 来执行一整串动作并触发回调：

```js
var myAction = cc.sequence(cc.moveBy(1, cc.v2(0, 100)), cc.fadeOut(1), finished);
```

在同一个 sequence 里也可以多次插入回调：

```js
var myAction = cc.sequence(cc.moveTo(1, cc.v2(0, 0)), finished1, cc.fadeOut(1), finished2); // finished1、finished2 都是使用 cc.callFunc 定义的回调动作
```

注意：在 `cc.callFunc` 中不应该停止自身动作，由于动作是不能被立即删除，如果在动作回调中暂停自身动作会引发一系列遍历问题，导致更严重的 bug。

### 缓动动作

缓动动作不可以单独存在，它永远是为了修饰基础动作而存在的，它可以用来修改基础动作的时间曲线，让动作有快入、缓入、快出或其它更复杂的特效。需要注意的是，只有时间间隔动作才支持缓动：

```js
var action = cc.scaleTo(0.5, 2, 2);
action.easing(cc.easeIn(3.0));
```

基础的缓动动作类是 [`cc.ActionEase`](%__APIDOC__%/zh/classes/ActionEase.html)。各种缓动动作的时间曲线可以参考下图：

![](./actions/tweener.png)

_图片源自 http://hosted.zeh.com.br/tweener/docs/en-us/_

## 具体动作 API 参考

接下来请参考 [动作系统 API 列表](./action-list.md) 来了解有哪些动作系统接口可以使用。
