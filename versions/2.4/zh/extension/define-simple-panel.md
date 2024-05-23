# 定义简单面板

有时候我们希望扩展的面板并不用停靠在主窗口中，而是希望它是一个独立窗口，利用标准的 HTML 页面载入方式展现。这个时候我们可以考虑使用 `simple` 类型的面板窗口。

## 定义方法

在插件的 package.json 文件中定义 `panel` 字段如下:

```json
{
  "name": "simple-package",
  "panel": {
    "main": "panel/index.html",
    "type": "simple",
    "title": "Simple Panel",
    "width": 400,
    "height": 300
  }
}
```

通过定义 `panel` 字段，并申明面板 `type` 为 `simple` 我们即可获得该份面板窗口。通过定义 `main`
字段我们可以为我们的面板窗口置顶一份入口 html。

和 [扩展编辑器面板](extends-panel.md) 中介绍的面板定义的区别在于，`type` 使用 `simple`，而 `main`
索引的是 html 文件而不是 javascript 文件。

接下来我们可以定义一份简单的 html 入口，就和我们写任何网页一样:

```html
<html>
  <head>
    <title>Simple Panel Window</title>
    <meta charset="utf-8">
    <style>
      body {
        margin: 10px;
      }

      h1 {
        color: #f90
      }
    </style>
  </head>

  <body>
    <h1>A simple panel window</h1>
    <button id="btn">Send Message</button>

    <script>
      let btn = document.getElementById('btn');
      btn.addEventListener('click', () => {
        Editor.log('on button clicked!');
      });
    </script>
  </body>
</html>
```

在完成了上述操作后，我们就可以通过 `Editor.Panel.open('simple-package')` 激活我们的窗口。

使用简单窗口更接近于纯粹的网页编程，也更适合那些将已有 Web APP 移植或整合到 Cocos Creator 中的情况。
