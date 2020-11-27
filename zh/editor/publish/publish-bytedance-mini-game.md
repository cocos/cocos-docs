# 发布到字节跳动小游戏

字节小游戏是基于字节跳动全产品矩阵开发，不需用户进行下载，点开即玩的全新游戏类型。

小游戏的游戏提交，审核和发布流程等，需要遵守字节官方团队的要求和标准流程，具体信息可以参考文末的链接。

## 使用 Cocos Creator 发布字节小游戏

1. 在 [字节官方文档](https://microapp.bytedance.com/docs/zh-CN/mini-game/develop/developer-instrument/developer-instrument-update-and-download) 下载字节开发者工具

2. 登陆 [开发者平台](https://microapp.bytedance.com/)，找到 appid，详情可参考官方详细[接入指南](https://microapp.bytedance.com/docs/zh-CN/mini-game/introduction/plugin-reference/set-up-mini-game)。

    ![](https://sf1-ttcdn-tos.pstatp.com/obj/website-img/f296a9f80eaeb40f4af38e8a4e25e17e_12.png)

3. 在 **构建发布** 面板的 **发布平台** 中选择 **字节小游戏**，填入小游戏 appid，然后点击 **构建**

    ![](./publish-bytedance-mini-game/build.jpg)

4. 打开字节跳动小游戏

    按照这样的流程，项目的 build 目录下就会生成一个字节小游戏的发布包 **bytedance-mini-game** 文件夹(具体构建任务名为准），打开开发者工具，导入对应文件夹即可。

    ![](./publish-bytedance-mini-game/tool.jpg)

## 构建选项介绍

| 选项名 | 可选 | 默认值 | 说明 |
| :-- | :--- | :--- | :--- |
| appid | 必填 | 'testId' | 字节小游戏 appid，填写后将会写入在 `project.config.json` 内 |
| 远程服务器地址 | 选填 | 空 | 远程服务器地址，之后将会从该地址获取资源 |
| 开放数据域代码目录 | 选填 | 空 | 如果存在开放数据域的话，通过这个字段来指定开放数据域文件夹在构建目录中的相对路径，这样在构建过程中就不会覆盖或修改该目录 |
| 设备方向 | 必填 | landscape | 设备方向，填写后将会写入在 `game.json` 内 |

## 小游戏环境的资源管理

在小游戏环境中，资源管理是最特殊的部分，它和浏览器的不同在于下面四点：

1. 小游戏的包内体积不能够超过 4MB，包含所有代码和资源，额外的资源必须通过网络请求下载。
2. 对于从远程服务器下载的文件，小游戏环境没有浏览器的缓存以及过期更新机制。
3. 对于小游戏包内资源，小游戏环境内并不是按需加载的，而是一次性加载所有包内资源，然后再启动页面。
4. 不可以从远程服务器下载脚本文件。

这里引出了两个关键的问题，首页面加载速度和远程资源缓存及版本管理。对于首页面加载速度，我们建议用户只保存脚本文件在小游戏包内，其他资源都从远程服务器下载。而远程资源的下载、缓存和版本管理，其实在 Cocos Creator 中，已经帮用户做好了。

具体来说，开发者需要做的是：

1. 构建时，在 **构建发布配置** 面板中勾选 md5Cache 功能。
2. 设置 **远程服务器地址**，然后点击 **构建**。
3. 构建完成后将字节小游戏发布包目录下的 res 文件夹完整的上传到服务器。
4. 删除本地发布包目录下的 res 文件夹。
5. 对于测试阶段来说，可能用户无法部署到正式服务器上，需要用本地服务器来测试，那么请在开发者工具中点击打开 **详情** 页面，勾选项目设置中的 **不检验安全域名、TLS 版本以及 HTTPS 证书** 选项。

## 参考链接

- [字节小游戏开发介绍指南](https://microapp.bytedance.com/docs/zh-CN/mini-game/introduction/about-mini-game/flow-entrance/brief-introduction-on-flow-entrance)
- [字节开发者平台](https://microapp.bytedance.com/)
- [小游戏 API 文档](https://developer.toutiao.com/docs/game/)
- [字节开发者工具下载](https://microapp.bytedance.com/docs/zh-CN/mini-game/develop/developer-instrument/developer-instrument-update-and-download)
- [字节开发者工具文档](https://microapp.bytedance.com/docs/zh-CN/mini-game/develop/developer-instrument/development-assistance/mini-app-developer-instrument)
