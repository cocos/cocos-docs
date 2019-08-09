# 定制预览模版

Cocos Creator 从 v2.2 开始新增了自定义预览模版功能。开发者可以定制所需要的预览效果，目前仅支持定制浏览器预览。

## 自定义预览模版

- 在项目文件夹下创建 preview-templates 文件。

    结构类似：
    
      project-folder
      |--assets
      |--build
      |--preview-templates

- preview-templates 文件创建完成后，开发者即可直接进行自定义，也可以参考编辑器内置的 preview-templates 文件结构进行自定义。自定义完成后需要 **重启编辑器**，然后在编辑器上方选择 **浏览器**，点击 **预览** 按钮即可查看效果。

      编辑器内置完整版 preview-templates 存放位置如下：

        **Mac**：`./CocosCreator.app/Contents/Resources/static/preview-templates`

        **Windows**：`./CcocosCreator/resources/static/preview-templates`

## preview-templates 详情

preview-templates 内部相当于一个普通网页模版，该文件夹包含了以下结构：

    preview-templates
       |--index.html 必须存在的入口文件
       |--其他文件可根据实现预览的效果进行添加
 

开发者可以根据自己的需求，对 index 入口文件，进行编写。目前 index 支持主流的三种常用网页模版类型分别是 **.html**、**.jade**、**.ejs**

同时也提供了一个简单的自定义预览 **html** 模版的学习范例，开发者可以通过创建新建项目面板中自定义预览模版的范例进行学习。

![自定义模版范例](./custom-preview-template/create.png)


**注意：** 三种类型只能选择一种进行编写，不能同时存在

如果对三种类型不了解的，可自行进入以下基础文档地址进行学习：

**html**: https://developer.mozilla.org/zh-CN/docs/Web/HTML

**jade**: http://jade-lang.com/

**ejs**: https://ejs.bootcss.com/

