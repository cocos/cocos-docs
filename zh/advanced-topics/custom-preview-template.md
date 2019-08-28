# 网页预览定制工作流程

Cocos Creator 从 v2.2 开始新增了自定义网页预览功能。

## 自定义网页预览

- 在项目文件夹下创建 `preview-templates` 文件。

  结构类似：
    
  ```js
  project-folder
    |--assets
    |--build
    |--preview-templates
  ```

- 开始自定义网页预览，可以参考编辑器内置的 `preview-templates` 文件。自定义完成后需要 **重启编辑器**，然后在编辑器上方选择 **浏览器**，点击 **预览** 按钮即可查看效果。

  编辑器内置 `preview-templates` 存放位置如下：

  **Mac**：`CocosCreator.app/Contents/Resources/static/preview-templates`

  **Windows**：`CocosCreator/resources/static/preview-templates`

## preview-templates 详情

preview-templates 内部相当于一个普通网页模版，该文件夹包含以下内容：

```js
preview-templates
  // 必须的入口文件
  |--index.html
  // 其他文件可根据想要实现的预览效果进行添加
```

开发者可以根据需求编写 index 入口文件。目前 index 支持的三种文件类型分别是 **.html**、**.jade** 和 **.ejs**。

Creator 提供了一个 **html** 类型的自定义网页预览范例，开发者可以在 **Dashboard -> 新建项目** 面板中创建该范例工程以便参考。

![自定义网页预览范例](./custom-preview-template/create.png)

如果对三种文件类型不了解的，可参考以下基础文档：

| 文件类型 |   地址
| -------------- | ----------- |
| html | <https://developer.mozilla.org/zh-CN/docs/Web/HTML> |
| jade | <http://jade-lang.com/>                             |
| ejs  | <https://ejs.bootcss.com/>                          |
