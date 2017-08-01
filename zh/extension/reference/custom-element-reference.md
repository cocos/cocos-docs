# 自定义界面元素定义参考

> 一份简单的元素定义

```javascript
Editor.UI.registerElement('foobar-label', {
  template: `
    <div class="text">Foobar</div>
  `,

  style: `
    .text {
      color: black;
      padding: 2px 5px;
      border-radius: 3px;
      background: #09f;
    }
  `
});
```

自定义元素是基于 HTML5 的 [Element](https://developer.mozilla.org/en-US/docs/Web/API/Element) 和
[Custom Elements](http://www.html5rocks.com/zh/tutorials/webcomponents/customelements/) 标准。

## 选项

### 属性

#### style

使用 CSS 定义你的样式。同 [面板定义参考](panel-reference.md)。

#### template

使用 HTML 标记语言定义你的面板的 UI 元素。

#### listeners

通过定义一个 Object 将 DOM 事件绑定到自定义函数上。这个 Object 的 Key 就是 DOM 事件名，Value
则是函数本身。同 [面板定义参考](panel-reference.md)。

#### behaviors

`behaviors` 为一个数组，behaviors 会将数组中的元素通过 `mixin` 的方式融合到自定义元素本身。
目前内置的 behaviors 有：

 - Editor.UI.Focusable
 - Editor.UI.Disabled
 - Editor.UI.Readonly
 - Editor.UI.Droppable
 - Editor.UI.ButtonState
 - Editor.UI.InputState

#### $

`$` 为一个 Object，他可以通过 CSS 选择器的语法，将模板中的元素映射成 `$` 变量方便用户使用。
同 [面板定义参考](panel-reference.md)。

### 函数

#### ready ()

当自定义元素被正确创建后，将会调动 ready 函数。

#### factoryImpl (arg1, arg2, ...)

他相当于构建函数，可以让你的自定义元素在构建的时候传递参数。例如：

```javascript
let FoobarLabel = Editor.UI.registerElement('foobar-label', {
  template: `
    <div class="text"></div>
  `,

  $: {
    text: '.text'
  },

  factoryImpl ( text ) {
    this.$text.innerText = text;
  },
});

// 当定义完 factoryImpl，你可以就可以通过如下方法实例化创建
let el = new FoobarLabel('Hello World');
document.body.appendChild(el);
```

### attributeChangedCallback ( name, oldVal, newVal )

当 element 的 html attribute 发生更改时（如调用了 `setAttribute()` 函数）触发。
