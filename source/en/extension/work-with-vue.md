# 在面板中使用 Vue

如果你已经掌握了 [编写面板界面](writing-your-panel.md) 这章中的界面编写方法，你或许会觉得这样
编写界面有些繁琐。是否能够使用一些前端界面框架来提升界面编写效率呢？答案是肯定的。Cocos Creator
支持任何界面框架如 [Vue](http://vuejs.org/)，[React](https://facebook.github.io/react/)，
[Polymer](http://polymer-project.org/) 等等。

在测试过程中，我们发现 [Vue](http://vuejs.org/) 非常符合 Cocos Creator 的整体设计思路，所以
我们重点介绍一下如何在 Cocos Creator 中使用 [Vue](http://vuejs.org/) 编写面板界面。

## 部署 Vue

事实上你不用做任何准备工作，Cocos Creator 的面板窗口在打开时就会默认加载 Vue。

## 初始化 Vue 面板

我们可以在 `ready()` 函数中初始化 Vue 面板。初始化方式如下：

```javascript
ready () {
  new window.Vue({
    el: this.shadowRoot,
  });
}
```

通过传入 `panel-frame` 的 shadow root 元素，我们可以让 Vue 在该元素节点下生成一份 vm。让我们来
看一个更详细的使用例子：

```javascript
Editor.Panel.extend({
  style: `
    :host {
      margin: 10px;
    }
  `,

  template: `
    <h2>A Simple Vue Panel</h2>

    <input v-model="message">
    <p>Input Value = <span>{{message}}</span></p>
  `,

  ready () {
    new window.Vue({
      el: this.shadowRoot,
      data: {
        message: 'Hello World',
      },
    });
  },
});
```

## 数据绑定

我们可以在面板的 `template` 关键字中，定义 Vue 的数据绑定规则。然后通过在 Vue 定义的 `data` 关键字
中写入绑定数据来完成整个操作。

具体例子如下：

```javascript
Editor.Panel.extend({
  template: `
    <ui-button>{{txtOK}}</ui-button>
    <ui-button v-if="showCancel">{{txtCancel}}</ui-button>
    <ui-input v-for="item in items" value="{{item.message}}"></ui-input>
  `,

  ready () {
    new window.Vue({
      el: this.shadowRoot,
      data: {
        txtOK: 'OK',
        txtCancel: 'Cancel',
        showCancel: false,
        items: [
          { message: 'Foo' },
          { message: 'Bar' },
        ]
      },
    });
  },
});
```

## 事件绑定

除了使用数据绑定，我们还可以通过 Vue 的 `@` 方式来将事件和方法绑定在一起。值得注意的是，绑定的
方法必须定义在 Vue 定义中的 `methods` 关键字中。

具体例子如下：

```javascript
Editor.Panel.extend({
  template: `
    <ui-button @confirm="onConfirm">Click Me</ui-button>
  `,

  ready () {
    new window.Vue({
      el: this.shadowRoot,
      methods: {
        onConfirm ( event ) {
          event.stopPropagation();
          console.log('On Confirm!');
        },
      },
    });
  },
});
```
