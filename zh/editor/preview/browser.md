# 网页预览定制工作流程

## 自定义预览模板

预览支持自定义模板方便用户自定义需要的预览效果，自定义的预览模板可以放置在项目目录的 `preview-template` 文件夹中。或者点击编辑器主菜单中的 **项目 -> 生成预览模板** 就可以在项目目录下创建一个最新的预览模板。编辑器中的预览也是使用模板来注入最新的项目数据，预览时将会查找该目录下的 index 文件，如果存在就是要该文件作为预览的模板。

`preview-template` 文件夹的结构类似：

```js
project-folder
 |--assets
 |--build
 |--preview-template
     // 必须的入口文件
     |--index.ejs
     // 其他文件可根据想要实现的预览效果进行添加
```

开始自定义网页预览，需要注意的是，预览模板中存在一些预览菜单项以及预览调试工具等内容，所以在增删一些模板语法的内容时要稍加注意，如果随意修改可能会导致预览模板不可用。建议使用 ejs 注入的内容都保留，然后在此基础上添加需要的内容即可。另外，假如 `index.html` 与 `index.ejs` 共存时，**`index.html` 将会替代 `index.ejs`** 成为预览的页面内容。

## 使用示例

以下示例可以在 [GitHub](https://github.com/cocos-creator/test-cases-3d/tree/v3.5/preview-template) | [Gitee](https://gitee.com/mirrors_cocos-creator/test-cases-3d/tree/v3.5/preview-template) 查找到。

1. 点击编辑器主菜单中的 **项目 -> 生成预览模板**，**控制台** 便会输出“预览模板生成成功”的提示，并显示预览模板的生成路径。

2. 添加需要使用的脚本如 `test.js`，其中 `<%- include(cocosTemplate, {}) %>` 中包含的是默认的启动游戏逻辑，添加的脚本可以根据需要在游戏逻辑启动前/后来决定存放的位置。下面的 `test.js` 是在游戏启动后加载。

    - 打开 `index.ejs` 修改如下：

      ```html
      <html>
          ...
          <body>
              ...
              <%- include(cocosTemplate, {}) %> // 游戏启动处理逻辑
              <script src="/test.js"></script> // 新增脚本
          </body>
      </html>
      ```

    - `test.js` 放置在页面内标识的相对路径（只能在 `preview-template` 文件夹中）

      ```
      |--preview-template
              |--index.ejs
              |--test.js
      ```
