# 自定义构建模版

Cocos Creator 支持对每个项目分别定制发布模板，只需要在项目路径下添加一个 `build-templates` 目录，里面按照`平台`路径划分子目录，然后里面的所有文件在构建结束后都会自动按照对应的目录结构复制到构建出的工程里。目前除了原生平台外，其他所有平台都支持该功能，具体的平台名称可以参照下面的表格。

结构类似：

```
project-folder
 |--assets
 |--build
 |--build-templates
      |--web-mobile
            |--index.html
```

这样如果当前构建的平台是 `web-mobile` 的话，那么 `build-templates/web-mobile/index.html` 就会在构建后被拷贝到对应构建任务文件夹下。

除此之外，还有另外两种构建模板的支持

## 1. ejs 类型

由于构建出来包的内容是不能保证每个版本完全一样，按照之前的使用方式，每次编辑器内部的构建模板有更新，开发者也需要更新项目内的构建模板。因而现在加入新的模板使用方式。可以点击菜单里的 `项目 -> 创建构建模板` 选择对应平台后将会生成对应平台支持的模板文件。例如：

```
project-folder
 |--assets
 |--build
 |--build-templates
      |--web-mobile
            |--index.ejs
```

构建会对这些模板做参数注入，构建经常改动的东西都会放在该模板引用的子模板内，使用时只需要修改添加需要的内容即可，这样项目内的构建模板可以不用频繁更新。

> 需要 **注意** 的是，拷贝用户模板是发生在渲染对应支持模板之后的，也就是假如该目录下同时存在 index.ejs 与 index.html, 最终打包出来的是 index.html 文件而不是 index.ejs 渲染出来的文件。

## 2. json 类型的融合处理

许多小游戏平台都会有类似 game.json 之类的配置文件，当这些 json 文件在构建模板的对应目录下时，构建不会直接拷贝覆盖，而是会对其做数据融合，具体的规则就是在原本构建出来的对应 json 文件盖上构建模板内的 json 文件数据内容。

## 自定义构建模板平台支持表

具体各个小游戏平台有做对应数据融合的 json 文件列表如下:

| 平台 | 平台实际名称 | 自定义构建模板 |
| --- | --- | --- |
| 微信小游戏 | wechatgame | game.ejs, game.json, project.config.json |
| Web Mobile | web-mobile | index.ejs |
| Web 桌面端 | web-desktop | index.ejs |
| 小米快游戏 | xiaomi-quick-game | manifest.json |
| Cocos Play | cocos-play |  game.config.json |
| 百度小游戏 | baidu-mini-game | game.json, project.swan.json |
| OPPO 小游戏 | oppo-mini-game | manifest.json |
| vivo 小游戏 | vivo-mini-game | project.config.json |
| 华为快游戏 | huawei-mini-game | X（暂不支持） |
| 支付宝小游戏 | alipay-mini-game | game.json |
| 原生平台 | native | X（暂不推荐使用） |
