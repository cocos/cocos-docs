# 发布到支付宝小游戏

Cocos Creator 从 **v2.1.4** 版本开始正式支持将游戏发布到支付宝小游戏。

## 环境配置

- 桌面端下载 [支付宝小程序开发者工具](https://render.alipay.com/p/f/fd-jwq8nu2a/pages/home/index.html) 并安装。

- 下载 [支付宝](https://mobile.alipay.com/index.htm)，并安装到手机设备上。

- 支付宝客户端在 Android 上支持的最低版本为 10.1.75，在 iOS 为 10.1.78。

## 发布流程

一、使用 Cocos Creator 打开需要发布的项目工程，在 **构建发布** 面板的 **发布平台** 中选择 **Alipay Mini Game**。然后点击 **构建**。

![](./publish-alipay-mini-games/build_option.png)

二、构建完成后点击 **发布路径** 后的 **打开** 按钮，可以看到在发布包 **build** 目录下生成了支付宝小游戏工程文件夹 **alipay**，其中已经包含了支付宝小游戏环境的配置文件 `game.json`。

![](./publish-alipay-mini-games/build.png)

三、使用 **支付宝开发者工具** 打开构建生成的 **alipay** 文件夹，即可打开支付宝小游戏项目以及预览调试游戏内容。

![](./publish-alipay-mini-games/preview.png)

## 支付宝小游戏环境的资源管理

支付宝小游戏与微信小游戏类似，都存在着包体限制，超过 **4MB** 的额外资源，必须通过网络请求下载。

具体可参考 [微信小游戏资源管理](./publish-wechatgame.md#%E5%B0%8F%E6%B8%B8%E6%88%8F%E7%8E%AF%E5%A2%83%E7%9A%84%E8%B5%84%E6%BA%90%E7%AE%A1%E7%90%86)。

**注意**：目前支付宝小游戏在真机上只支持通过 **HTTPS** 从远程服务器加载资源，所以必须将资源文件放在 **HTTPS** 服务器上，否则会出现资源加载失败的情况。

## 支付宝小游戏已知问题：

我们对支付宝小游戏的适配工作还未完全结束，目前仍不支持以下模块：

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
