# 发布到字节跳动小游戏

字节小游戏是基于字节跳动全产品矩阵开发，不需用户进行下载，点开即玩的全新游戏类型。

小游戏的游戏提交，审核和发布流程等，需要遵守字节官方团队的要求和标准流程，具体信息可以参考文末的链接。

## 使用 Cocos Creator 发布字节小游戏

1. 在 [字节官方文档](https://microapp.bytedance.com/docs/zh-CN/mini-game/develop/developer-instrument/developer-instrument-update-and-download) 下载字节开发者工具

2. 登陆 [开发者平台](https://microapp.bytedance.com/)，找到 appid，详情可参考 [官方接入指南](https://microapp.bytedance.com/docs/zh-CN/mini-game/introduction/plugin-reference/set-up-mini-game)。

    ![appid](./publish-bytedance-mini-game/appid.png)

3. 在 **构建发布** 面板的 **发布平台** 中选择 **字节小游戏**，填入小游戏 appid，然后点击 **构建**

    ![build](./publish-bytedance-mini-game/build.png)

4. 打开字节跳动小游戏

    按照这样的流程，项目的 build 目录下就会生成一个字节小游戏的发布包 **bytedance-mini-game** 文件夹(具体构建任务名为准），打开开发者工具，导入对应文件夹即可。

    ![tool](./publish-bytedance-mini-game/tool.jpg)

## 构建选项介绍

| 选项名 | 可选 | 默认值 | 说明 | 字段名 |
| :-- | :-- | :-- | :-- | :-- |
| 初始场景分包 | - | false | 勾选后，首场景及其相关的依赖资源会被构建到发布包目录 assets 下的内置 Asset Bundle — [start-scene](../../asset/bundle.md#%E5%86%85%E7%BD%AE-asset-bundle) 中，提高初始场景的资源加载速度。 | startSceneAssetBundle |
| appid | 必填 | 'testId' | 字节小游戏 appid，填写后将会写入在 `project.swan.json` 内。 | appid |
| 远程服务器地址 | - | - | 远程服务器地址，开发者需要在构建后手动将发布包目录下的 remote 文件夹上传到所填写的资源服务器地址上。 | remoteServerAddress |
| 设备方向 | 必填 | landscape | 设备方向，填写后将会写入在 `game.json` 内。 | orientation |
| 生成开放数据域工程模板 | - | false | 用于接入开放数据域，详情可以参考 [开放数据域](./build-open-data-context.md) | buildOpenDataContextTemplate |

## 小游戏环境的资源管理

字节跳动小游戏与微信小游戏类似，都存在着包体限制，超过 4MB 的额外资源，必须通过网络请求下载。我们建议用户只保存脚本文件在小游戏包内，其他资源都从远程服务器下载。Cocos Creator 已经帮用户做好了远程资源的下载、缓存和版本管理，详情可参考 [资源管理](../../asset/cache-manager.md#资源下载流程)。

## 分包加载

字节跳动小游戏需要特定的版本才能支持分包功能，字节产品的版本要求如下：

| 产品     | Android    | iOS        |
| :--     | :---       | :---       |
| 抖音     | v13.6.0    | v13.7.0    |
| 头条     | v7.9.9     | v7.9.8     |

字节开发者工具使用的版本请大于等于 **2.0.6**，小于 **3.0.0**。调试基础库则要求在 1.88.0 及以上。

> **注意**：若产品的版本不支持分包加载，则引擎会将分包作为一个普通的 asset bundle 加载。

目前小游戏分包大小有以下限制：
- 整个小游戏的所有分包大小不超过 16 M
- 单个分包/主包的大小不能超过 4 M

具体可参考 [字节小游戏分包加载官方文档](https://microapp.bytedance.com/docs/zh-CN/mini-game/develop/framework/subpackages/introduction)

## 参考链接

- [字节小游戏开发介绍指南](https://microapp.bytedance.com/docs/zh-CN/mini-game/introduction/about-mini-game/flow-entrance/brief-introduction-on-flow-entrance)
- [字节开发者平台](https://microapp.bytedance.com/)
- [小游戏 API 文档](https://developer.toutiao.com/docs/game/)
- [字节开发者工具下载](https://microapp.bytedance.com/docs/zh-CN/mini-game/develop/developer-instrument/developer-instrument-update-and-download)
- [字节开发者工具文档](https://microapp.bytedance.com/docs/zh-CN/mini-game/develop/developer-instrument/development-assistance/mini-app-developer-instrument)
