# 面板定义参考

> 一份简单的面板定义

```javascript
Editor.Panel.extend({
  style: `
    :host { margin: 5px; }
    h2 { color: #f90; }
  `,

  template: `
    <h2>Hello World!</h2>
  `,

  ready () {
    Editor.log('Hello World!');
  },
});
```

## 选项

### 属性

#### style

使用 CSS 定义你的样式。在 Panel 定义中，CSS 样式被定义在 [Shadow DOM](http://www.html5rocks.com/zh/tutorials/webcomponents/shadowdom/) 中，
所以他遵循 Shadow DOM 的样式定义规范。

使用 `:host` 来表示 Panel 本身的样式。而在 Panel 中的其他样式则遵循 CSS 选择器的书写规则。
由于采用 Shadow DOM，我们定义在面板内的样式和其他面板样式以及全局样式是隔离开的，所以不必担心 CSS
命名污染的问题。

更多的 Shadow DOM 的介绍可以参考：

 - http://www.html5rocks.com/zh/tutorials/webcomponents/shadowdom/
 - http://www.html5rocks.com/zh/tutorials/webcomponents/shadowdom-201/
 - http://www.html5rocks.com/zh/tutorials/webcomponents/shadowdom-301/

#### template

使用 HTML 标记语言定义你的面板的 UI 元素。

#### listeners

通过定义一个 Object 将 DOM 事件绑定到自定义函数上。这个 Object 的 Key 就是 DOM 事件名，Value
则是函数本身。样例如下：

```javascript
Editor.Panel.extend({
  // ...

  listeners: {
    mousedown ( event ) {
      event.stopPropagation();
      Editor.log('on mousedown');
    },

    'panel-resize' ( event ) {
      event.stopPropagation();
      Editor.log('on panel resize');
    }
  }
});
```

#### messages

通过定义一个 Object 将 IPC 消息绑定到自定义函数上。这个 Object 的 Key 就是 IPC 消息名，Value
则是函数本身。样例如下：

```javascript
Editor.Panel.extend({
  // ...

  messages: {
    'foobar:say-hello' ( event ) {
      Editor.log(`Hello ${foobar}`);
    },
  }
});
```

#### behaviors

`behaviors` 为一个数组，behaviors 会将数组中的元素通过 `mixin` 的方式融合到 Panel 本身。这
为 Panel 中实现行为共享提供了比较方便的途径。

使用方法如下：

```javascript
  // foobar.js
  module.exports = {
    sayHello () {
      Editor.log('Hello Foobar');
    }
  }
```

```javascript
const Foobar = Editor.require('packages://foobar/foobar.js')

Editor.Panel.extend({
  behaviors: [ Foobar ],

  ready () {
    this.sayHello();
  },
});
```

#### dependencies

`dependencies` 为一个数组，其内部元素为 url 或 文件路径。 有时候我们会需要用到一些第三方库，通过
指定 dependencies 会在 Panel 初始化前，就先将第三方库读入。

使用方法如下：

```javascript
Editor.Panel.extend({
  dependencies: [
    'packages://foobar/index.js',
  ],
});
```

#### $

`$` 为一个 Object，他可以通过 CSS 选择器的语法，将模板中的元素映射成 `$` 变量方便用户使用。假设
我们有以下代码：

```javascript
Editor.Panel.extend({
  template: `
    <div class="foo"></div>
    <div class="bar"></div>
  `,

  $: {
    foo: '.foo',
    bar: '.bar',
  }

  ready () {
    this.$foo.innerText = 'Foo';
    this.$bar.innerText = 'Bar';
  },
});
```

我们可以看到，通过选择器，我们得到 `$foo` 和 `$bar` 两个元素。方便了我们在初始化过程中对其进行进一步的操作。

### 函数

#### ready ()

当 Panel 被正确读入，模板实例化并且样式也被正确加入后，将会调动 ready 函数。

#### run ( argv )

当 Panel 第一次载入 ready 结束后，或者当 Panel 被 `Editor.Panel.open` 调用激活。 其中，通过
`Editor.Panel.open` 的方式调用是可以传递参数 argv 给 `run` 函数。

#### close ()

当 Panel 被关闭退出前被调用。通过返回值决定 Panel 是否真正被关闭。如果返回为 true 则关闭 Panel。

### DOM 事件

#### panel-show

当 Panel 显示的时候发送

#### panel-hide

当 Panel 隐藏的时候发送

#### panel-resize

当 Panel 大小改变的时候发送

#### panel-cut

当操作系统剪切行为触发时发送

#### panel-copy

当操作系统复制行为触发时发送

#### panel-paste

当操作系统粘贴行为触发时发送
