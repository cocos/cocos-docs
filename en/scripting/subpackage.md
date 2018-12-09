# 代码分包加载

随着游戏玩法越来越丰富，游戏的代码量也越来越大，开发者对于扩大包大小的需求越来越强烈，同时微信小游戏也支持了分包加载的功能，所以 Cocos Creator 推出了代码分包加载这样一个功能。

分包加载，即把游戏内容按一定规则拆分在几个包里，在首次启动的时候只下载必要的包，这个必要的包称为 **主包**，开发者可以在主包内触发下载其他子包，这样可以有效降低首次启动的消耗时间。

## 配置方法

Cocos Creator 的分包是以文件夹为单位来配置的，当我们选中一个文件夹时，在 **属性检查器** 中会出现文件夹的相关配置选项：

![subpackage](./subpackage/subpackage.png)

勾选 **配置为子包** 后，点击右上方的 `应用`，这个文件夹下的代码就会被当做是子包的内容了。子包名会在加载子包时作为加载的名字传入，默认会使用这个文件夹的名字。

## 构建

代码分包的作用只会在项目构建后才会体现，预览的时候还是按照整包来进行加载的。项目构建后会在发布包目录下的 `src/assets` 生成对应的分包文件。

**例如**：将 example 工程中的 `cases/01_graphics` 文件夹配置为子包，那么项目构建后将会在发布包目录下的 `src/assets/cases` 生成 `01_graphics.js` 文件，该文件名不随着子包名的更换而更换。`01_graphics.js` 文件包含了 `01_graphics` 文件夹下的所有代码，并且会将这些代码从主包中剔除掉。

![package](./subpackage/package.png)

在微信小游戏平台的构建中，分包的配置也会按照规则自动生成到微信小游戏发布包的 `game.json` 配置文件中。

![profile](./subpackage/profile.png)

**注意**：微信小游戏需要特定的版本才能支持分包功能。
> 微信 6.6.7 客户端，2.1.0 及以上基础库开始支持，请更新至最新客户端版本，开发者工具请使用 1.02.1806120 及以上版本

更新了开发者工具后不要忘记修改开发者工具中的 `详情 -> 项目设置 -> 调试基础库` 为 2.1.0 及以上：

![subpackage2](./subpackage/subpackage2.png)

具体请参考 [微信分包加载](https://developers.weixin.qq.com/minigame/dev/tutorial/base/subpackages.html) 文档。

## 加载分包

引擎提供了一个统一的 api `cc.loader.downloader.loadSubpackage` 来加载分包代码，适用于所有平台。`loadSubpackage` 需要传入一个分包的名字，这个名字即是之前你在项目中配置的分包名字，默认为分包文件夹的名字。

当分包加载完成后，会触发回调，如果加载失败的话，会返回一个错误信息。

```javascript
cc.loader.downloader.loadSubpackage('01_graphics', function (err) {
    if (err) {
        return console.error(err);
    }
    console.log('load subpackage successfully.');
});
```