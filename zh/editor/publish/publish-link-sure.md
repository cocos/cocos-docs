# 发布到连尚小游戏

连尚小游戏是 WiFi 万能钥匙旗下的小游戏应用平台，具有便捷、轻量、免安装的特点。

连尚小游戏以 **.cpk** 格式的游戏包形式运行于小游戏环境中，运行环境与微信小游戏类似。游戏包由云端托管，在 APP 内投放和运行，安全可靠且体验流畅，用户可点开即玩，无需安装。

## 环境配置

- 下载 [连尚小游戏调试器](https://www.wjminiapp.com/docs/minigame/guide/download_apk.html) 并安装到 Android 设备（建议 Android Phone 6.0 或以上版本）。

## 发布流程

使用 Cocos Creator 打开需要发布的项目工程，从 **菜单栏 -> 项目** 中打开 **构建发布** 面板，**发布平台** 选择 **连尚小游戏**。

![build](./publish-link-sure/build.png)

通用构建选项的设置请参考 [通用构建选项](build-options.md)，连尚小游戏特有的构建选项如下：

| 构建选项 | 说明 | 字段名（用于命令行发布） |
| :------ | :--- | :--- |
| 初始场景分包 | 勾选后，首场景及其相关的依赖资源会被构建到发布包目录 `assets` 下的内置 Asset Bundle — [start-scene](../../asset/bundle.md#%E5%86%85%E7%BD%AE-asset-bundle) 中，提高初始场景的资源加载速度。 | `startSceneAssetBundle`|
| 资源服务器地址 | 该项用于填写资源存放在服务器上的地址。<br>若 **不填写** 该项，则发布包目录下的 `remote` 文件夹将会被打包到构建后生成的 cpk 包中。<br>若 **填写**，则不会打包进 cpk。开发者需要在构建后手动将发布包目录下的 `remote` 文件夹上传到所填写的资源服务器地址上，详情请参考 [上传资源到远程服务器](../../asset/cache-manager.md)。<br>服务器地址会在构建时写入到发布包目录下的 `application.js` 中。 | `tinyPackageServer` |

### 构建

**构建发布** 面板的构建选项设置完成后，点击 **构建并生成** 按钮。<br>
完成后点击 **构建任务** 左下角的文件夹图标按钮打开项目发布包，可以看到在默认发布路径 `build` 目录下生成了 `link-sure`（以具体的构建任务名为准）文件夹，该文件夹就是导出的连尚小游戏工程目录和 cpk，cpk 包在 `build/link-sure/dist` 目录下。

![package](./publish-link-sure/package.png)

若需要修改生成的 cpk 包，在修改完成后点击 **构建任务** 右下角的 **生成** 按钮，即可在不重新构建的情况下重新生成 cpk 包。

### 将打包出来的 cpk 运行到手机上

- 开发者需要联系 [连尚小游戏的商务](https://www.wjminiapp.com/docs/minigame/guide/flow.html) 成为小游戏开发者。
- 进入连尚小程序管理平台，点击 **小程序管理 -> 我的小程序 -> 创建小程序**，填写小程序相关信息，提交后等待审核。
- 审核通过后，点击小程序后面的 **版本管理** 按钮。

  ![add-mini-game](publish-link-sure/add-minigame.png)

- 然后点击 **上传开发版本** 来上传构建出来的 cpk 包。开发版本只能保存最新上传的 cpk，后面上传的 cpk 会覆盖之前上传的版本。

  ![upload](publish-link-sure/upload.png)

- 上传完成后点击 **查看二维码**，然后打开手机上已经安装好的连尚小游戏调试器扫码，即可在真机上预览。如果需要调试小游戏可参考官方文档 [连尚小游戏调试](https://www.wjminiapp.com/docs/minigame/guide/debug.html)。

更多内容可参考 [连尚小游戏开发流程介绍](https://www.wjminiapp.com/docs/minigame/guide/flow.html)。

## 连尚小游戏的资源管理

连尚小游戏与微信小游戏类似，都存在着包体限制。连尚小游戏的主包包体限制为 **10MB**，超过的部分必须通过网络请求下载。<br>当包体过大时，可在 **构建发布** 面板配置 **资源服务器地址** 选项，将资源上传到远程服务器，详情请参考 [上传资源到远程服务器](../../asset/cache-manager.md)。

我们建议用户只保存脚本文件在小游戏包内，其他资源都从远程服务器下载。Cocos Creator已经帮用户做好了远程资源的下载、缓存和版本管理，详情请参考 [缓存管理器](../../asset/cache-manager.md)。

## 相关参考链接

- [连尚小游戏指南](https://www.wjminiapp.com/docs/minigame/guide/)
- [连尚小游戏开发流程介绍](https://www.wjminiapp.com/docs/minigame/guide/flow.html)
- [连尚小游戏调试文档](https://www.wjminiapp.com/docs/minigame/guide/debug.html)
- [连尚小游戏 API 文档](https://www.wjminiapp.com/docs/minigame/api/)
- [连尚小游戏调试器下载](https://www.wjminiapp.com/docs/minigame/guide/download_apk.html)
