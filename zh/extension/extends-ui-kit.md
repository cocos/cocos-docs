# 扩展 UI Kit

如果发现 Cocos Creator 内置的界面元素仍然满足不了你的需求，也不必太担心，你可以通过自定义元素
来对 UI Kit 进行扩展。

UI Kit 的扩展是基于 HTML5 的 [Custom Elements](http://www.html5rocks.com/zh/tutorials/webcomponents/customelements/) 标准。

通过 `Editor.UI.registerElement(tagName, prototype)` 我们可以很轻松的注册自定义元素。这里
有一个简单的范例。

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

当你完成上面的代码，并在 Panel 中正确 require 后，你就可以在编辑器中使用 `<foobar-label>`
这个元素。

更多关于自定义元素定义的选项，请阅读[自定义界面元素定义参考](reference/custom-element-reference.md)。

## 内容分布

有时候我们会在自定义元素内加入内容，为了能够让自定义元素正确处理内容，需要在模板中通过 `<content>` 标签加以说明。
这个过程我们称作“内容分布”。

拿上面的例子来说，假设我们希望 `<foobar-label>` 不只是显示 Foobar，而是根据我们加入的内容进行显示，例如：

```javascript
<foobar-label>Hello World</foobar-label>
```

这个时候就需要使用内容分发功能。我们可以对之前的范例做一个小小的更改：

```javascript
template: `
  <div class="text">
    <content></content>
  </div>
`
```

通过使用 `<content>` 标签告诉样板，我们希望将用户内容放置在这个地方。

## 内容分布选择器

有时候自定义元素的内容不止是文字，而是一些复合元素，我们在做内容分发的时候，希望有些元素在某些标签下，有些元素位于另外的标签中。这个时候就可以考虑使用内容分发选择器。考虑如下样例：

```javascript
  <foobar-label>
    <div class="title">Hello World</div>
    <div class="body">This is Foobar</div>
  </foobar-label>
```

如果我们希望将 `.title` 和 `.body` 元素内容区分对待，我们可以做如下代码：

```javascript
  template: `
    <div class="text title">
      <content select=".title"></content>
    </div>
    <div class="text body">
      <content select=".body"></content>
    </div>
  `
```

通过 `<content>` 标签中加入 `select` 属性，我们可以利用选择器来分布内容。
