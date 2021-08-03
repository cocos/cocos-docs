# 跨平台发布游戏

Cocos Creator 目前支持发布游戏到 Web、iOS、Android、Windows、Mac，以及各类小游戏平台，真正实现一次开发，全平台运行。

## 准备工作

在项目正常开发，预览效果达到要求的情况下，可以将游戏发布到多个平台。在发布之前需要做的准备工作包括：

- [熟悉构建发布面板](build-panel.md)
- [了解通用构建选项](build-options.md)

## 发布平台

目前 Cocos Creator 支持发布的 Web、原生和小游戏平台包括：

- [发布到 Web 平台](publish-web.md)
- [发布到原生平台](native-options.md)
    - [安装配置原生环境](setup-native-development.md)
    - [原生平台 JavaScript 调试](debug-jsb.md)
- [发布到小游戏平台](publish-mini-game.md)
    - [发布到 HUAWEI AppGallery Connect](publish-huawei-agc.md)
    - [发布到支付宝小游戏](publish-alipay-mini-game.md)
    - [发布到字节跳动小游戏](publish-bytedance-mini-game.md)
    - [发布到趣头条小游戏](publish-qtt.md)
    - [发布到 Cocos Play](publish-cocos-play.md)
    - [发布到华为快游戏](publish-huawei-quick-game.md)
    - [发布到 OPPO 小游戏](publish-oppo-mini-game.md)
    - [发布到 vivo 小游戏](publish-vivo-mini-game.md)
    - [发布到小米快游戏](publish-xiaomi-quick-game.md)
    - [发布到连尚小游戏](publish-link-sure.md)
    - [发布到百度小游戏](publish-baidu-mini-game.md)
    - [发布到微信小游戏](publish-wechatgame.md)
        - [启用微信小游戏引擎插件](wechatgame-plugin.md)
        - [接入微信 PC 小游戏](publish-pc-wechatgame.md)
    - [开放数据域](build-open-data-context.md)

开发者还可以通过命令行发布项目，详情请参考 [命令行发布项目](publish-in-command-line.md)。

## 进阶

如果对构建流程有了一定程度上的熟悉和了解，就可以自定义构建模板、扩展构建流程等。详情可参考以下文档：

- [构建流程简介与常见错误处理](build-guide.md)
- [定制项目的构建模版](custom-project-build-template.md)
- [扩展构建流程](custom-build-plugin.md)
