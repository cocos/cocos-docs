# 引擎分离功能

Cocos Creator 从 v2.0.5 开始新增了引擎分离功能，该功能是与 CocosCreatorEngine 插件搭配使用，启用后会根据 `game.json` 中配置的版本号去下载在 CocosCreatorEngine 插件线上已发布的相对应的完整引擎包，来减小每个小游戏的首包大小。

## v2.0.5 ~ 2.2.0 的使用方法

1. 下载安装一个专用的 [微信引擎分离功能插件](https://github.com/knoxHuang/plugin-wechat-engine-separation)，该插件面向 Cocos Creator v2.0.5 ~ 2.2.0，用于帮助开发者在构建过程中自动生成微信小游戏引擎分离所需的文件结构与配置。

    **插件安装方法**：

    - 应用于全局（所有项目）：将解压后的插件文件夹拷贝到 `用户/.CocosCreator/packages`（Mac 系统）或者 `C:\Users\用户\.CocosCreator\packages`（Windows 系统） 下即可。
    - 应用于单个项目：将解压后的插件文件夹拷贝到与项目工程中与 assets 文件夹同级的 packages 文件夹下（如果没有可以自行创建一个）。

    **注意**：Cocos Creator v2.2.1 之后将会内置该功能到编辑器中，不需要再安装该插件。

2. 插件安装完成后，重启 Cocos Creator，在 **构建发布** 面板的 **发布平台** 中选择 **微信小游戏** 进行构建发布（该功能仅支持 **非调试** 模式）。即可在构建发布完成后自动进行适配，无需其他操作。之后如需禁用引擎分离功能，直接删除此插件即可。

## v2.2.1 之后的使用方法

使用 Cocos Creator 打开项目工程，在 **构建发布** 面板的 **发布平台** 中选择 **微信小游戏**，勾选 **分离引擎**。然后直接构建发布即可（该功能仅支持 **非调试** 模式）

![](./publish-wechatgame/build.png)

## FAQ

问：微信小游戏开放数据域支持该功能吗？
答：目前不支持。

问：启用引擎插件后，是否仍然会把引擎代码算入首包包体中？
答：仍然会计算在内，但是玩家加载游戏时会优先读取本地相同版本的引擎插件，从而减少下载量。

问：引擎插件功能是否支持自定义引擎？
答：不支持，构建时如果版本不匹配或者启用了自定义引擎，将会提示报错信息。

问：Cocos Creator v2.2.0 引擎插件不支持 iOS 9 ？
答：由于 Cocos Creator v2.2.0 对 iOS 9 有一些兼容问题，所以相同版本的引擎插件也会有相同问题，不过后续会在 v2.2.1 中进行完善修复。

## 参考链接

- [微信引擎分离功能插件](https://github.com/knoxHuang/plugin-wechat-engine-separation)
- [微信小游戏引擎插件接入文档](https://developers.weixin.qq.com/minigame/dev/guide/base-ability/game-engine-plugin.html)
