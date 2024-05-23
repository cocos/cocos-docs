# 发布到支付宝小游戏

## 环境配置

- 桌面端下载 [支付宝小程序开发者工具](https://render.alipay.com/p/f/fd-jwq8nu2a/pages/home/index.html) 并安装。

- 下载 [支付宝](https://mobile.alipay.com/index.htm)，并安装到手机设备上。

- 支付宝客户端在 Android 上支持的最低版本为 10.1.75，在 iOS 为 10.1.78。

## 发布流程

使用 Cocos Creator 打开需要发布的项目工程，在 **构建发布** 面板的 **发布平台** 中选择 **支付宝小游戏**，然后点击 **构建**。

![build option](./publish-alipay-mini-game/build_option.png)

通用构建选项的设置请参考 [构建选项](build-options.md)。支付宝小游戏相关的构建选项填写规则如下：

| 构建选项 | 说明 | 字段名（用于命令行发布） |
| :-- | :-- | :-- |
| 初始场景分包 | 勾选后，首场景及其相关的依赖资源会被构建到发布包目录 `assets` 下的内置 Asset Bundle — [start-scene](../../asset/bundle.md#%E5%86%85%E7%BD%AE-asset-bundle) 中，提高初始场景的资源加载速度。 | `startSceneAssetBundle` |
| 设备方向 | 可选值包括 `landscape` 和 `portrait`。| `deviceOrientation` |
| 资源服务器地址 | 用于填写资源存放在远程服务器上的地址。开发者需要在构建后手动将发布包目录下的 remote 文件夹上传到所填写的资源服务器地址上。详情可参考 [上传资源到远程服务器](../../asset/cache-manager.md) | `remoteUrl` |
| polyfills | 构建支持一些新特性的 polyfills，主要是在打包脚本时会做相应的处理。目前仅支持 **异步函数**，后续将会开放更多功能。| `polyfills` |

构建完成后点击 **构建任务** 左下角的文件夹图标按钮，可以看到在项目的 `build` 目录下生成了支付宝小游戏工程文件夹 `alipay-mini-game`，其中已经包含了支付宝小游戏环境的配置文件 `game.json`。

![build](./publish-alipay-mini-game/build.png)

使用 **支付宝开发者工具** 打开构建生成的 `alipay-mini-game` 文件夹，即可打开支付宝小游戏项目以及预览调试游戏内容。

![preview](./publish-alipay-mini-game/preview.png)

## 支付宝小游戏环境的资源管理

支付宝小游戏与微信小游戏类似，都存在着包体限制，超过 **4MB** 的额外资源，必须通过网络请求下载。<br>当包体过大时，可在 **构建发布** 面板配置 **资源服务器地址** 选项，将资源上传到远程服务器，详情请参考 [上传资源到远程服务器](../../asset/cache-manager.md)。

我们建议用户只保存脚本文件在小游戏包内，其他资源都从远程服务器下载。Cocos Creator 已经帮用户做好了远程资源的下载、缓存和版本管理，详情请参考 [缓存管理器](../../asset/cache-manager.md)。

## 支付宝小游戏的限制

我们对支付宝小游戏的适配工作还未完全结束，目前已知在低端机上文本渲染效果可能不太理想。并且仍不支持以下模块：

- WebView
- VideoPlayer
- 分包加载
- 自定义字体

以上功能预计在以后的更新中会逐步支持，我们也将持续与支付宝小游戏的工程师们紧密沟通，不断优化适配效果。

## 文档相关

由于支付宝小游戏相关的文档目前只对内开放，开发者如果有需要的话可直接联系：

| 联系人  | Email |
| ---- | ---- |
| 李智 | lz98684@alibaba-inc.com      |
| 黄娇 | huangjiao.hj@alibaba-inc.com |
