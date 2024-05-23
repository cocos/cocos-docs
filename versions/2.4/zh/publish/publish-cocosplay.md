# 发布到 Cocos Play

> 从 v2.2.2 开始，即刻玩更名为 Cocos Play。

## 环境配置

- 下载 [游戏自测工具](https://gamebox.gitbook.io/project/you-xi-jie-ru-wen-dang/ji-shu-dui-jie/zi-ce-gong-ju) 并安装到 Android 设备（建议 Android Phone 6.0 或以上版本）。

## 发布流程

使用 Cocos Creator 打开需要发布的项目工程，从 **菜单栏 -> 项目** 中打开 **构建发布** 面板，**发布平台** 选择 **Cocos Play**。

![](publish-cocosplay/build.png)

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

- **自定义游戏包路径**

  该项为选填项（v2.1.3 新增），可以自定义构建生成的 cpk 包所存放的目录。如果不设置的话，cpk 包默认生成在发布包 `build/cocos-play` 目录下。

- **资源服务器地址**

  该项为选填项，用于填写资源存放在服务器上的地址。

  - 若 **不填写** 该项，则发布包目录下的 `build/cocos-play/remote` 文件夹将会被打包到构建出来的 cpk 包中。

  - 若 **填写** 该项，则 remote 文件夹不会被打包到 cpk 包中。开发者需要在构建后手动将 remote 文件夹上传到所填写的资源服务器地址上。

  具体的资源管理细节，请参考文档下方的资源管理部分。

- **允许分离引擎**

  Cocos Play 从 v2.3.3 开始支持分离引擎，使用时勾选 **允许分离引擎**，然后正常构建发布即可，无需其它人工操作。具体可参考 [微信小游戏引擎插件使用说明](./wechat-engine-plugin.md)。

### 构建

**构建发布** 面板的相关参数设置完成后，点击 **构建**。构建完成后点击 **发布路径** 后面的 **打开** 按钮来打开构建发布包，可以看到在默认发布路径 build 目录下生成了 **cocos-play** 目录，该目录就是导出的 Cocos Play 工程目录和 cpk。cpk 包在 **/build/cocos-play** 目录下，如果有设置了 **自定义游戏包路径**，则 cpk 包在所设置的目录下。

![](publish-cocosplay/package.png)

### 接入测试

打开之前已经安装完成的游戏自测工具，自测工具可以启动游戏并提供游戏登录、支付等功能。通过读取游戏配置参数，确定启动的游戏类型，以及游戏启动方式。开发者必须使用自测工具测试接入没有问题之后，才可以打包提交到平台审核。自测时没有要求包的大小，但如果是要提交审核的话，包的大小不能超过 10M。具体可参考 [自测工具](https://gamebox.gitbook.io/project/you-xi-jie-ru-wen-dang/ji-shu-dui-jie/zi-ce-gong-ju)。

然后点击自测工具左上方的 **配置游戏** 按钮进入游戏配置页面。根据需求配置参数并保存。

![](publish-cocosplay/configuration.png)

#### 参数配置

| 属性             | 功能说明             |
| --------------  |  -----------        |
| gameId          | 游戏 ID，可由后台获取           |
| gameKey         | 游戏 Key，可由后台获取          |
| gameSecret      | 游戏密钥，可由后台获取         |
| gameType        | 游戏类型，可根据用户需求选择 **对战** 或者 **非对战**  |
| gameMode        | 游戏模式，选择 **Runtime**      |
| loadType        | 游戏加载类型，即游戏启动方式。包括 **File** 和 **Url** 两种。具体使用方式可查看下方 **启动游戏** 部分的介绍    |
| path            | 游戏加载地址，配合 loadType 使用。具体使用方式可查看下方 **启动游戏** 部分的介绍   |

### 启动游戏

游戏自测工具可以通过以下两种方法启动游戏。

**方法一**：以文件方式从指定位置加载游戏包（游戏加载类型为 **File**）

- 将构建生成的小游戏 cpk 文件（位于小游戏工程 cocos-play 目录下）拷贝到手机目录下。如果是拷贝到内部存储中，则需要在内部存储目录中新建一个文件夹（命名为 `cocosplay`），然后将 cpk 文件拷贝到 `cocosplay` 文件夹中。
- 游戏自测工具参数配置页面中的 **loadType** 选择 **File**。
- **path** 填写刚才拷贝 cpk 文件放置的新建文件夹，如：`cocosplay/game.cpk`。
- 配置完成后点击 **保存**，然后点击 **启动游戏**，即可打开游戏。

**方法二**：以网页方式从指定网址打开游戏（游戏加载类型为 **Url**）

- 将 cpk 文件上传到服务器。
- 游戏自测工具参数配置页面中的 **loadType** 选择 **Url**。
- 填写 **path**，如：<http://192.168.0.1:8080/game.cpk>。
- 配置完成后点击 **保存**，然后点击 **启动游戏**，即可打开游戏。

## Cocos Play 环境的资源管理

Cocos Play 与微信小游戏类似，都存在着包体限制，不过 Cocos Play 的主包包体限制是 **10MB**，超过的部分必须通过网络请求下载。

Cocos Creator 已经帮开发者做好了远程资源的下载、缓存和版本管理。具体的实现逻辑和操作步骤都与微信小游戏类似，请参考 [微信小游戏资源的管理](./publish-wechatgame.md#%E5%BE%AE%E4%BF%A1%E5%B0%8F%E6%B8%B8%E6%88%8F%E7%9A%84%E8%B5%84%E6%BA%90%E7%AE%A1%E7%90%86)。

## 相关参考链接

- [Cocos Play 中心](https://gamebox.cocos.com/)
- [Cocos Play 文档中心](https://gamebox.gitbook.io/project/)
- [Cocos Play API 文档](https://gamebox.gitbook.io/project/you-xi-jie-ru-wen-dang/ji-shu-dui-jie/ji-chu-neng-li)
- [Cocos Play 自测工具](https://gamebox.gitbook.io/project/you-xi-jie-ru-wen-dang/ji-shu-dui-jie/zi-ce-gong-ju)
- [Cocos Play 自测工具下载](https://gamebox.gitbook.io/project/you-xi-jie-ru-wen-dang/zi-ce-gong-ju)
