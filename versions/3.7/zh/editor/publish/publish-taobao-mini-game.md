# 发布到淘宝小游戏

## 环境配置

- 桌面端下载 [淘宝开发者工具](https://developer.taobao.com/?spm=a219a.15212435.0.0.6a14669aEQ2g6k) 并安装。

- 下载 [淘宝](https://market.m.taobao.com/app/fdilab/download-page/main/index.html)，并安装到手机设备上。

- 淘宝客户端在 Android 上支持的最低版本为 10.22.30，在 iOS 为 10.22.30。

## 发布流程

使用 Cocos Creator 打开需要发布的项目工程，在 **构建发布** 面板的 **发布平台** 中选择 **淘宝小游戏**，然后点击 **构建**。

![build option](./publish-taobao-mini-game/build_option.png)

### 参数项配置

相关参数配置具体的填写规则如下：

- **主包压缩类型**

  设置主包的压缩类型，具体内容可参考文档 [Asset Bundle — 压缩类型](../../asset/bundle.md#%E5%8E%8B%E7%BC%A9%E7%B1%BB%E5%9E%8B)。

- **配置主包为远程包**

  该项为可选项，需要与 **资源服务器地址** 选项配合使用。<br>
  勾选后，主包会配置为远程包，并且与其相关依赖资源一起被构建到发布包目录 remote 下的内置 Asset Bundle — [main](../../asset/bundle.md#%E5%86%85%E7%BD%AE-asset-bundle) 中。开发者需要将整个 remote 文件夹上传到远程服务器。

- **初始场景分包**

  该项为可选项。<br>
  勾选后，首场景及其相关的依赖资源会被构建到发布包目录 assets 下的内置 Asset Bundle — [start-scene](../../asset/bundle.md#%E5%86%85%E7%BD%AE-asset-bundle) 中，提高初始场景的资源加载速度。具体内容可参考文档 [初始场景的资源加载](publish-wechatgame.md#%E5%88%9D%E5%A7%8B%E5%9C%BA%E6%99%AF%E7%9A%84%E5%8A%A0%E8%BD%BD%E9%80%9F%E5%BA%A6)。

- **资源服务器地址**

  该项为选填项，用于填写资源存放在远程服务器上的地址。开发者需要在构建后手动将发布包目录下的 remote 文件夹上传到所填写的资源服务器地址上。

- **分离引擎**
  该项为可选项。<br>
  勾选后，可以减小游戏的首包大小。使用方法可以参考文档 [使用说明](wechatgame-plugin.md#%E4%BD%BF%E7%94%A8%E8%AF%B4%E6%98%8E)，其中构建平台选择淘宝小游戏。

### 运行预览

- 构建完成后点击 **构建任务** 左下角的文件夹图标按钮，可以看到在项目的 `build` 目录下生成了淘宝小游戏工程文件夹 `taobao-mini-game`，其中已经包含了淘宝小游戏环境的配置文件 `game.json`。

![build](./publish-taobao-mini-game/build.png)

- 使用 **淘宝开发者工具** 打开构建生成的 `taobao-mini-game` 文件夹，即可打开淘宝小游戏项目以及预览调试游戏内容。

![preview](./publish-taobao-mini-game/preview.png)

## 淘宝小游戏环境的资源管理

淘宝小游戏与微信小游戏类似，都存在着包体限制，超过 **4MB** 的额外资源，必须通过网络请求下载。

当包体过大时，可在 **构建发布** 面板配置 **资源服务器地址** 选项，将低加载优先级的资源上传到远程服务器，详情请参考 [上传资源到远程服务器](../../asset/cache-manager.md)。

游戏启动之后引擎会自动下载远程服务器地址中的资源，资源下载后引擎的缓存管理器会记录资源的保存路径，用于在缓存空间不足时自动删除部分缓存的游戏资源。请参考 [缓存管理器](../../asset/cache-manager.md)。

## 淘宝小游戏的限制

不支持以下模块：

- WebView
- VideoPlayer
- 自定义字体

## 相关文档 

- [淘宝文档中心](https://open.taobao.com/v2/doc#/abilityToOpen?docType=1&docId=121213&treeId=804)
