# 发布到淘宝小程序创意互动

Cocos Creator 从 v2.4.11 开始支持将游戏发布到 **淘宝小程序创意互动**。

## 准备工作

- 参考 [淘宝小程序创意互动接入指南](https://miniapp.open.taobao.com/doc.htm?docId=119114&docType=1&tag=dev)，在淘宝开放平台完成开发者入驻流程和应用创建。

- 桌面端下载 [淘宝开发者工具](https://developer.taobao.com/?spm=a219a.15212435.0.0.11ef669aIQNlnI) 并安装。

- 下载 [淘宝](https://market.m.taobao.com/app/fdilab/download-page/main/index.html)，并安装到手机设备上。

## 发布流程

使用 Cocos Creator 打开需要发布的项目工程，从 **菜单栏 -> 项目** 中打开 **构建发布** 面板，**发布平台** 选择 **淘宝小程序创意互动**，然后点击 **构建**。

![build_option](./publish-taobao-creative-app/build_option.png)

### 参数项配置

相关参数配置具体的填写规则如下：

- **主包压缩类型**

  设置主包的压缩类型，具体内容可参考文档 [Asset Bundle — 压缩类型](../asset-manager/bundle.md#%E5%8E%8B%E7%BC%A9%E7%B1%BB%E5%9E%8B)。

- **配置主包为远程包**

  该项为可选项，需要与 **资源服务器地址** 选项配合使用。<br>
  勾选后，主包会配置为远程包，并且与其相关依赖资源一起被构建到发布包目录 remote 下的内置 Asset Bundle — [main](../asset-manager/bundle.md#%E5%86%85%E7%BD%AE-asset-bundle) 中。开发者需要将整个 remote 文件夹上传到远程服务器。

- **初始场景分包**

  该项为可选项。<br>
  勾选后，首场景及其相关的依赖资源会被构建到发布包目录 assets 下的内置 Asset Bundle — [start-scene](../asset-manager/bundle.md#%E5%86%85%E7%BD%AE-asset-bundle) 中，提高初始场景的资源加载速度。具体内容可参考文档 [初始场景的资源加载](publish-wechatgame.md#%E5%88%9D%E5%A7%8B%E5%9C%BA%E6%99%AF%E7%9A%84%E5%8A%A0%E8%BD%BD%E9%80%9F%E5%BA%A6)。

- **资源服务器地址**

  该项为选填项，用于填写资源存放在远程服务器上的地址。开发者需要在构建后手动将发布包目录下的 remote 文件夹上传到所填写的资源服务器地址上。

### 运行预览

- 构建完成后点击 **发布路径** 后面的 **打开** 按钮，可以看到在发布包 build 目录下生成了淘宝小程序创意互动工程文件夹 **taobao**，其中已经包含了淘宝小程序创意互动环境的配置文件：`app.json` 和 `mini.project.json`。

  ![build](./publish-taobao-creative-app/build.png)

- 使用 **淘宝开发者工具** 打开构建生成的 **taobao** 文件夹，即可打开淘宝小程序创意互动项目及预览调试游戏内容。开发者工具的具体使用方式请参考 [淘宝开发者工具介绍](https://miniapp.open.taobao.com/doc.htm?docId=121682&docType=1&tag=game-dev)。

  ![preview](./publish-taobao-creative-app/preview.png)

## 淘宝小程序创意互动环境的资源管理

淘宝小程序创意互动与微信小游戏类似，都存在着包体限制，超过 2MB 的额外资源，必须通过网络请求下载。在包体优化方面，建议剔除掉没使用到的引擎模块。

Cocos Creator 已经帮开发者做好了远程资源的下载、缓存和版本管理。具体的实现逻辑和操作步骤都与微信小游戏类似，请参考 [微信小游戏资源管理](./publish-wechatgame.md#%E5%BE%AE%E4%BF%A1%E5%B0%8F%E6%B8%B8%E6%88%8F%E7%9A%84%E8%B5%84%E6%BA%90%E7%AE%A1%E7%90%86)。

## 淘宝小程序创意互动的限制

淘宝小程序创意互动暂时不支持以下功能模块：

- VideoPlayer
- WebView
- 自定义字体
- 暂不支持资源分包（替代方案是资源包放 CDN）
- 暂只支持竖屏的应用

## 参考链接

- [淘宝小游戏接入全链路](https://miniapp.open.taobao.com/doc.htm?docId=121719&docType=1&tag=game-dev)
- [淘宝小游戏注册与入驻](https://miniapp.open.taobao.com/doc.htm?docId=121648&docType=1&tag=game-info)
- [淘宝小程序创意互动介绍](https://miniapp.open.taobao.com/doc.htm?docId=119177&docType=1&tag=dev)
- [淘宝小程序创意互动 API 文档](https://miniapp.open.taobao.com/doc.htm?docId=119062&docType=1&tag=dev)
- [淘宝开发者工具下载](https://developer.taobao.com/?spm=a219a.15212435.0.0.7892669alqxNjY)
- [淘宝开发者工具真机调试](https://miniapp.open.taobao.com/doc.htm?docId=119194&docType=1&tag=game-dev)