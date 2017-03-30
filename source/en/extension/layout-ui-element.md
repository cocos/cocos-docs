# 界面排版

Cocos Creator 的界面排版是通过在 `style` 中书写 CSS 来完成的。如果对 CSS 不熟悉，
推荐大家可以阅读 [W3 School 的 CSS 教程](http://www.w3school.com.cn/css/) 来加强。

然而普通的 CSS 排版并不适合界面元素，为此，CSS 最新标准中加入了 [CSS Flex](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) 布局。
通过 Flex 布局，我们可以很轻易的对界面元素进行横排和纵排。为了方便开发者使用 CSS Flex，Cocos Creator
也对他进行了一些封装。本章节主要就是介绍 Cocos Creator 中的界面排版方法。

## 横排和纵排

**layout horizontal**

```html
<div class="layout horizontal">
  <div>1</div>
  <div class="flex-1">2 (flex-1)</div>
  <div>3</div>
</div>
```

![layout-horizontal](./assets/layout-horizontal.png)

**layout vertical**

```html
<div class="layout vertical">
  <div>1</div>
  <div class="flex-1">2 (flex-1)</div>
  <div>3</div>
</div>
```

![layout-vertical](./assets/layout-vertical.png)

## 对其元素

我们在横排纵排时，会希望对所有子元素进行对其操作。可以通过 `start`，`center` 和 `end` 来进行
子元素的对其操作。

对于横排元素，他们分别代表上，中，下对其。对于纵排元素，他们分别代表左，中，右对其。

让我们以横排为例，来看一组例子：

```html
<div class="layout horizontal start">
  <div>1</div>
  <div>2</div>
  <div>3</div>
</div>
<div class="layout horizontal center">
  <div>1</div>
  <div>2</div>
  <div>3</div>
</div>
<div class="layout horizontal end">
  <div>1</div>
  <div>2</div>
  <div>3</div>
</div>
```

![layout-align-items](./assets/layout-align-items.png)

有时候，我们需要对排版容器中的某个元素进行对其调整，这个时候就可以通过 `self-` 关键字来操作。在
Cocos Creator 中，我们提供了：`self-start`，`self-center`，`self-end` 和 `self-stretch`

让我们以横排为例，来看看这么做的效果：

```html
<div class="layout horizontal">
  <div class="self-start">self-start</div>
  <div class="self-center">self-center</div>
  <div class="self-end">self-end</div>
  <div class="self-stretch">self-stretch</div>
</div>
```

![layout-self-align](./assets/layout-self-align.png)

## 元素分布

元素分布主要描述元素在排版方向上如何分布。比如所有元素都从排版容器的左边开始排，或者从右边，或者根据
元素大小散步在排版容器中。

我们提供了：`justified`，`around-justified`，`start-justified`，`center-justified` 和 `end-justified`。

还是以横排为例，来看一组例子：

```html
<div class="layout horizontal justified">
  <div>1</div>
  <div>2</div>
  <div>3</div>
</div>
<div class="layout horizontal around-justified">
  <div>1</div>
  <div>2</div>
  <div>3</div>
</div>
  ...
  ...
```

![layout-justified](./assets/layout-justified.png)

## 元素自适应

有些时候我们希望元素撑满布局的剩余控件。我们可以通过在布局容器的子元素中使用 `flex-1`，`flex-2`，…… `flex-12` 来操作。

来看一组例子：

```html
<div class="layout horizontal">
  <div class="flex-1">flex-1</div>
  <div class="flex-2">flex-2</div>
  <div class="flex-3">flex-3</div>
</div>
<div class="layout horizontal">
  <div class="flex-none">flex-none</div>
  <div class="flex-1">flex-1</div>
  <div class="flex-none">flex-none</div>
</div>
  ...
  ...
```

![layout-flex](./assets/layout-flex.png)

还有些时候我们希望元素本身就撑满容器的整个空间。这个时候就可以考虑使用 `fit` 这个 class。方法和效果如下：

```html
<div class="wrapper">
  <div class="fit">fit</div>
</div>
```

![layout-fit](./assets/layout-fit.png)
