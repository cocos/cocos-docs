# 监听和发射事件

Cocos Creator 引擎提供了 `EventTarget` 类，用以实现自定义事件的监听和发射，在使用之前，需要先从 `'cc'` 模块导入，同时需要实例化一个 `EventTarget` 对象。

```ts
import { EventTarget } from 'cc';
const eventTarget = new EventTarget();
```

> **注意**：虽然 `Node` 对象也实现了一些 `EventTarget` 的接口，但是我们不再推荐继续通过 `Node` 对象来做自定义事件的监听和发射，因为这样子做不够高效，同时我们也希望 `Node` 对象只监听与 `Node` 相关的事件。


## 监听事件

监听事件可以通过 `eventTarget.on()` 接口来实现，方法如下：

```ts
// 该事件监听每次都会触发，需要手动取消注册
eventTarget.on(type, func, target?);
```

其中 `type` 为事件注册字符串，`func` 为执行事件监听的回调，`target` 为事件接收对象。如果 `target` 没有设置，则回调里的 `this` 指向的就是当前执行回调的对象。

值得一提的是，事件监听接口 `on` 的第三个参数 `target`，主要是绑定响应函数的调用者。以下两种调用方式，效果上是相同的

```ts
// 使用函数绑定
eventTarget.on('foo', function ( event ) {
  this.enabled = false;
}.bind(this));

// 使用第三个参数
eventTarget.on('foo', (event) => {
  this.enabled = false;
}, this);
```

除了使用 `on` 监听，我们还可以使用 `once` 接口。`once` 监听在监听函数响应后就会关闭监听事件。

## 取消监听事件

当我们不再关心某个事件时，我们可以使用 `off` 接口关闭对应的监听事件。

`off` 接口的使用方式有以下两种：

```ts
// 取消对象身上所有注册的该类型的事件
eventTarget.off(type);
// 取消对象身上该类型指定回调指定目标的事件
eventTarget.off(type, func, target);
```

需要注意的是，`off` 方法的参数必须和 `on` 方法的参数一一对应，才能完成关闭。

我们推荐的实现方式如下：

```ts
import { _decorator, Component, EventTarget } from 'cc';
const { ccclass } = _decorator;
const eventTarget = new EventTarget();

@ccclass("Example")
export class Example extends Component {
    onEnable () {
        eventTarget.on('foobar', this._sayHello, this);
    }

    onDisable () {
        eventTarget.off('foobar', this._sayHello, this);
    }

    _sayHello () {
        console.log('Hello World');
    }
}
```

## 事件发射

发射事件可以通过 `eventTarget.emit()` 接口来实现，方法如下：

```ts
// 事件发射的时候可以指定事件参数，参数最多只支持 5 个事件参数
eventTarget.emit(type, ...args);
```

## 事件参数说明

在发射事件时，我们可以在 `emit` 函数的第二个参数开始传递我们的事件参数。同时，在 `on` 注册的回调里，可以获取到对应的事件参数。

```ts
import { _decorator, Component, EventTarget } from 'cc';
const { ccclass } = _decorator;
const eventTarget = new EventTarget();

@ccclass("Example")
export class Example extends Component {
    onLoad () {
        eventTarget.on('foo', (arg1, arg2, arg3) => {
            console.log(arg1, arg2, arg3);  // print 1, 2, 3
        });
    }

    start () {
        let arg1 = 1, arg2 = 2, arg3 = 3;
        // At most 5 args could be emit.
        eventTarget.emit('foo', arg1, arg2, arg3);
    }
}
```

需要说明的是，出于底层事件派发的性能考虑，这里最多只支持传递 5 个事件参数。所以在传参时需要注意控制参数的传递个数。

## 系统内置事件

以上是通用的事件监听和发射规则，在 Cocos Creator 中，我们默认支持了一些系统内置事件，可以参考我们后续的文档来查看如何使用：

输入事件：可参考 [输入事件系统](event-input.md)

节点事件：可参考 [节点事件系统](event-node.md)
