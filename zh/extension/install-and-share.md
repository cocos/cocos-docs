# 安装与分享

当你启动 Cocos Creator 并且打开了一个指定项目后，Cocos Creator 会开始搜索并加载扩展包。Cocos Creator 有两个扩展包搜索路径，“全局扩展包路径”和“项目扩展包路径”。

## 从扩展商店获取扩展插件

点击主菜单的 `扩展/扩展商店`，即可打开扩展商店。

在扩展商店里可以搜索或浏览不同类别的插件，Cocos Creator 的编辑器扩展插件会归类到 `Creator 扩展` 里。

## 全局扩展包路径

当你打算将你的扩展应用到所有的 Cocos Creator 项目中，你可以选择将扩展包安装到全局扩展包路径中。根据你的目标平台，全局扩展包路径将会放在：

- **Windows** `%USERPROFILE%\.CocosCreator\packages`
- **Mac** `$HOME/.CocosCreator/packages`

## 项目扩展包路径

有时候我们只希望某些扩展功能被应用于指定项目中，这个时候我们可以将扩展包安装到项目的扩展包存放路径上。项目的扩展包路径为 `$你的项目地址/packages`。

## 卸载扩展包

直接从上述文件夹中删除扩展包即可。

## 扩展包包名和目录名

扩展包的包名 ( `package.json` 声明中的 `name` 字段的内容) 最好和扩展包所在路径的路径名一致，比如前面第一个扩展包 `hello-world`，如果放在项目扩展包路径中，其路径结构应该是：

```
MyProject
 |--assets
 |--packages
     |--hello-world
        |--package.json
        |--main.js
```

这样我们在编写扩展包逻辑时可以更方便的获取到扩展包所在路径下的文件 url，减少出错的可能。

## 开发扩展包时的实时改动监控

在开发扩展包的过程中，编辑器进程会对扩展包里的脚本内容进行监控，当有脚本内容发生变化时，会自动对扩展包进行重新载入。文件监控的规则可以在 `package.json` 中定制，详情请阅读 [package.json 字段：reload](reference/package-json-reference.md#reload-object-)。
