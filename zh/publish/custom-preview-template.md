# 定制预览模版

Cocos Creator 从 v2.2 开始新增了自定义预览模版功能。开发者可以定制所需要的预览效果，目前仅支持定制浏览器预览。

## 自定义预览模版

- 在项目文件夹下创建 preview-templates 文件。

    结构类似：

      ```js
      project-folder
      |--assets
      |--build
      |--preview-templates
            |--index.html
      ```

- preview-templates 文件创建完成后，开发者即可直接进行自定义，也可以参考编辑器内置的 preview-templates 文件结构进行自定义。自定义完成后需要 **重启编辑器**，然后在编辑器上方选择 **浏览器**，点击 **预览** 按钮即可查看效果。

## preview-templates 详情

preview-templates 相当于一个普通网页模版，该入口文件为 index.html。目前 index 支持常用的三种类型分别是 **.html**、**.jade**、**.ejs**。

编辑器内置 preview-templates 存放地址如下：

**Mac**：`./CocosCreator.app/Contents/Resources/static/preview-templates`

**Windows**：`./CcocosCreator/resources/static/preview-templates`
