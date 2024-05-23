# 发布到 HUAWEI AppGallery Connect

Cocos Creator 支持将游戏发布到 **HUAWEI AppGallery Connect**，帮助开发者接入到华为的应用市场。

## 准备工作

- 进入 [AppGallery Connect 后台](https://developer.huawei.com/consumer/cn/service/josp/agc/index.html) 并登录，需要先完成 [开发者注册](https://developer.huawei.com/consumer/cn/doc/20300)，然后再 [创建应用](https://developer.huawei.com/consumer/cn/doc/distribution/app/agc-create_app)。创建应用时，**软件包类型** 选择 **APK**。

  ![](./publish-huawei-agc/app-info.png)

- 通过 Cocos Service 面板接入所需的 HUAWEI AppGallery Connect 相关服务。目前 SDK 仅支持 **Android** 平台，具体的操作步骤可参考文档 [HUAWEI HMS Core](https://service.cocos.com/document/zh/sdkhub-plugins/sdkhub-hms.html)。

## 发布流程

使用 Cocos Creator 打开需要发布的项目工程，从 **菜单栏 -> 项目** 中打开 **构建发布** 面板，**发布平台** 项选择 **HUAWEI AppGallery Connect**。

![agc-build](./publish-huawei-agc/agc-builder.png)

通用构建选项的设置请参考 [构建选项](build-options.md)，需要注意的是请确保 **包名** 与华为后台设置的包名一致。

- **agconnect-services 配置**：用于配置华为参数文件 `agconnect-services.json`，具体的配置方法请参考 [配置华为参数文件](https://service.cocos.com/document/zh/sdkhub-plugins/sdkhub-hms.html#%E9%85%8D%E7%BD%AE%E5%8D%8E%E4%B8%BA%E5%8F%82%E6%95%B0%E6%96%87%E4%BB%B6)。

- **Cocos SDKHub 配置集**：在 Cocos Service 服务面板开通 Cocos SDKHub 服务之后，**构建发布** 面板中就会出现该选项，用于帮助游戏快速集成渠道。

    ![sdkhub](./publish-huawei-agc/sdkhub.png)

### 构建编译

**构建发布** 面板的相关参数项设置完成后，点击 **构建**。<br>
构建完成后点击 **构建任务** 左下角的文件夹图标按钮打开构建发布包，可以看到在默认发布路径 build 目录下生成了 `huawei-agc` 目录，其中已经自动集成了 HUAWEI AppGallery Connect 相关服务。

然后点击 **生成**，或者使用 [Android Studio](native-options.md#%E7%94%9F%E6%88%90%E5%92%8C%E8%BF%90%E8%A1%8C) 打开项目进行编译，编译完成后在发布包目录下会生成 HUAWEI AppGallery Connect 的 APK。

![apk](./publish-huawei-agc/apk.png)

### 上传 APK 到 AppGallery Connect

有以下两种方式可以将 APK 上传到 AppGallery Connect。

#### 1. 通过构建发布面板上传

Creator 支持直接将构建编译生成的 APK 上传到 AppGallery Connect 后台。<br>
点击 **构建任务** 右下角的 **上传** 按钮，即可打开 **上传** 面板，然后填写相关信息。

![agc-upload-panel](./publish-huawei-agc/agc-upload-panel.png)

- APP ID：填写应用的 APP ID。登录 AppGallery Connect 后台，选择 **我的应用 -> 应用信息**，即可获取应用的 APP ID。

- 版本号：根据需要填写。

- APK 路径：选择之前构建编译生成的 APK。

- 登录方式：包括 **OAuth** 和 **API 客户端** 两种。

    - **OAuth**

        OAuth 登录方式只需要在点击 **确认上传** 的时候，根据提示登录 HUAWEI 账号（账号需要有足够的 [权限](https://developer.huawei.com/consumer/cn/doc/development/AppGallery-connect-Guides/agcapi-getstarted-0000001111845114#section797720532313)），然后勾选对应权限的允许框，窗口会自动关闭并自动上传 APK。

        ![upload-oauth](./publish-huawei-agc/upload-oauth.png)

    - **API 客户端**

        - 若首次使用 **API 客户端** 登录方式，需要登录 AppGallery Connect 后台获取相关配置信息。

          ![upload-api](./publish-huawei-agc/upload-api.png)

        - 选择 **用户与访问 -> Connect API -> 创建**，创建一个 API 客户端，并根据需要选择 [权限](https://developer.huawei.com/consumer/cn/doc/distribution/app/agc-help-rolepermission-0000001155345429)，然后点击 **确认**。

          ![create-api-key](./publish-huawei-agc/create-api-key.png)

        - 将 API 客户端的 **客户端 ID** 和 **密钥** 填入 Creator **上传** 面板中的对应输入框。

        - 配置完成后点击 **确认上传** 即可。

    两种登录方式的详细说明可参考文档 [AppGallery Connect 使用入门](https://developer.huawei.com/consumer/cn/doc/development/AppGallery-connect-Guides/agcapi-getstarted)。

#### 2. 通过 AppGallery Connect 后台上传

在 AppGallery Connect 后台进入 **我的应用**，选择应用，切换到 **分发** 栏。然后点击左侧的 **版本信息 -> 准备提交**，找到软件版本，点击 **软件包管理**，然后点击 **上传**。

### 提交审核

1. 在 AppGallery Connect 后台进入 **我的应用**，选择应用，切换到 **分发** 栏。然后点击左侧的 **版本信息 -> 准备提交**，找到软件版本，点击 **软件包管理**，选中刚刚上传的 APK，然后点击 **选取**。

    ![apk-list](./publish-huawei-agc/apk-list.png)

2. 其他的配置信息填写可参考文档 [发布应用](https://developer.huawei.com/consumer/cn/doc/distribution/app/agc-release_app)。填写完成确认各个信息没有问题后，便可以直接点击页面右上方的 **提交审核** 按钮。华为应用市场将在 **3~5** 个工作日内完成审核。

## 相关参考链接

- [AppGallery Connect 后台](https://developer.huawei.com/consumer/cn/service/josp/agc/index.html)
- [AppGallery Connect 操作指南](https://developer.huawei.com/consumer/cn/doc/distribution/app/agc-create_app)
