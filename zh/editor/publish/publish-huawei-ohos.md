# 发布 Huawei HarmonyOS 应用

从 v3.2 开始，Cocos Creator 支持将游戏打包为 HarmonyOS 应用（`.hap`）。

## 准备工作

- 进入 [AppGallery Connect 网站](https://developer.huawei.com/consumer/cn/service/josp/agc/index.html) 注册 [华为开发者联盟帐号](https://developer.huawei.com/consumer/cn/doc/start/registration-and-verification-0000001053628148)，并实名认证。

- 登录后 [创建项目](https://developer.huawei.com/consumer/cn/doc/distribution/app/agc-harmonyapp-createproject) 并 [添加 HarmonyOS 应用](https://developer.huawei.com/consumer/cn/doc/distribution/app/agc-harmonyapp-createharmonyapp)，**选择平台** 为 **APP（HarmonyOS 应用）**。

  ![app info](./publish-huawei-ohos/app-info.png)

- 下载并安装 [HUAWEI DevEco Studio](https://developer.harmonyos.com/cn/develop/deveco-studio#download)。安装完成后 [配置开发环境](https://developer.harmonyos.com/cn/docs/documentation/doc-guides/environment_config-0000001052902427)，下载 HarmonyOS SDK，SDK Platforms 中的 SDK 包请勾选 **Java** 和 **Native**。

    ![dev setting](./publish-huawei-ohos/dev-setting.png)

    记住窗口上方所示的 **HarmonyOS SDK Location** 指示的目录，稍后需要在 Cocos Creator 的 **偏好设置** 面板中填写这个 SDK 所在路径。

## 发布流程

### 使用 Cocos Creator 构建

1. 使用 Cocos Creator 打开需要发布的项目工程，点击上方菜单栏中的 **Cocos Creator -> 偏好设置 -> 外部程序**，配置 **鸿蒙 OS SDK** 和 **鸿蒙 OS NDK** 路径：

    ![preferences](./publish-huawei-ohos/preferences.png)

    **鸿蒙 OS node 执行文件所在目录** 这一项为选填项，可在使用 HUAWEI DevEco Studio 打开项目时使用 DevEco Studio 的 Nodejs 即可。

2. 从 **菜单栏 -> 项目** 中打开 **构建发布** 面板。在 **构建发布** 面板的 **发布平台** 中选择 **鸿蒙**，根据需要 配置 [构建选项](./native-options.md#%E6%9E%84%E5%BB%BA%E9%80%89%E9%A1%B9) 然后点击右下方的 **构建** 按钮。

    ![build](./publish-huawei-ohos/build.png)

    > **注意**：**鸿蒙** 展开项中的 **应用 ID 名称** 需要与在 AppGallery Connect 后台添加 HarmonyOS 应用时的包名保持一致。

3. 构建完成后打开项目目录，可以看到在 `native\engine` 目录下生成了 `ohos` 文件夹，该文件夹就包含了构建生成的鸿蒙工程。

    ![package](./publish-huawei-ohos/package-ohos.png)

### 通过 HUAWEI DevEco Studio 编译运行

1. 打开 HUAWEI DevEco Studio，选择 **打开项目** 来打开构建后生成的鸿蒙工程。

    ![open-project](./publish-huawei-ohos/open-project.png)

    打开项目后可在弹出的窗口中选择 **使用 DevEco Studio 的 Nodejs**，就不需要在 Cocos Creator 的 **偏好设置** 面板中配置 **鸿蒙 OS node 执行文件所在目录**。

    ![nodejs](./publish-huawei-ohos/nodejs.png)

2. 准备签名文件，签名文件的获取方式请参考下文 **签名文件** 部分的内容。

3. 配置签名文件。点击 DevEco Studio 菜单栏中的 **File -> Project Structure -> Project**，选择 **Signing Config** 页面，配置工程的发布证书等文件和相关信息。详情请参考 [配置签名信息](https://developer.harmonyos.com/cn/docs/documentation/doc-guides/publish_app-0000001053223745#ZH-CN_TOPIC_0000001154985553__section280162182818)。

    ![sign configs](./publish-huawei-ohos/sign-configs.png)

    > **注意**：如果需要在发布之前使用真机调试 HarmonyOS 应用，还需要在 **File -> Project Structure** 的 **Modules -> entry -> Signing Config** 页面中配置调试签名信息。详情可参考 [调试 HarmonyOS 应用](https://developer.harmonyos.com/cn/docs/documentation/doc-guides/ide_debug_device-0000001053822404#ZH-CN_TOPIC_0000001154985555__section10491183521520)。
    >
    > ![sign configs](./publish-huawei-ohos/sign-configs-debug.png)

    设置完成并保存后，**Project -> Signing Config** 中配置的发布签名信息可以在项目目录下的 `native\engine\ohos\build.gradle` 文件中查看。**Modules -> entry -> Signing Config** 中配置的调试签名信息可以在项目目录下的 `native\engine\ohos\entry\build.gradle` 文件中查看。

4. 配置完成后连接 Harmony OS 系统的华为设备，然后点击菜单栏中的 **Build -> Build APP(s)/Hap(s) -> Build APP(s)** 项，即可执行编译流程。或者直接点击 **DevEco Studio** 上方的运行按钮，即可执行编译运行流程。

    ![run project](./publish-huawei-ohos/run-project.png)

5. 编译完成后可以在项目目录的 `native\engine\ohos\build\outputs\hap` 目录下看到生成了 `.hap` 文件。

    ![output](./publish-huawei-ohos/output.png)

    用于调试的 `.hap` 文件生成路径则是在项目目录的 `native\engine\ohos\entry\build\outputs\hap` 目录下。

    ![output](./publish-huawei-ohos/debug-output.png)

6. 发布到华为应用市场的具体流程请参考官方文档 [发布 HarmonyOS 应用指南](https://developer.huawei.com/consumer/cn/doc/distribution/app/agc-harmonyapp-releaseharmonyapp#h1-1598338018957)。

### 签名文件

HarmonyOS 应用是通过数字证书（`.cer` 文件）和 HarmonyAppProvision 文件（`.p7b` 文件）来保证应用的完整性。首先需要通过 **DevEco Studio** 生成密钥和证书请求文件，再通过证书请求文件在 AppGallery Connect 申请用于发布/调试的数字证书和 Profile 文件。

#### 生成密钥和证书请求文件

在 **DevEco Studio** 中点击上方菜单栏的 **Build -> Generate Key and CSR**，生成密钥（`.p12` 文件），然后再生成证书请求文件（`.csr`）。详情请参考 [生成密钥和证书请求文件](https://developer.harmonyos.com/cn/docs/documentation/doc-guides/publish_app-0000001053223745#ZH-CN_TOPIC_0000001154985553__section7209054153620)。

> **注意**：指定文件路径时，文件名称需要加上对应的后缀名，否则无法提交成功。

#### 生成并下载数字证书（`.cer` 文件）

- 进入 [AppGallery Connect 网站](https://developer.huawei.com/consumer/cn/service/josp/agc/index.html)，选择 **用户与访问 -> 证书管理**。

  > **注意**：当前只有受邀请开发者才能访问 **证书管理** 菜单。若需要申请，请将开发者名称、申请背景、支持设备类型、是否有应用上架诉求及 Developer ID 发送至 `agconnect@huawei.com`，华为运营人员将在 1-3 个工作日内安排对接人员。<br>Developer ID 查询方法为：登录 AGC 网站，点击 **我的项目**，选择任意项目，在 **项目设置 -> 常规** 中即可找到 Developer ID。

  ![provision profile](./publish-huawei-ohos/cer-file.png)

- 点击右上角的 **新增证书** 按钮填写信息。**证书类型** 根据需要选择 **发布证书**/**调试证书**，证书请求文件是上一个步骤在 **DevEco Studio** 中生成的 `.csr` 文件。

- 信息填写完成后点击 **提交**，便会生成一个发布/调试证书（`.cer` 文件），点击证书后面的 **下载** 按钮将其下载到本地。

更多内容可参考 [申请数字证书](https://developer.huawei.com/consumer/cn/doc/distribution/app/agc-harmonyapp-debugharmonyapp#h1-1598336089667)。

#### 生成并下载 HarmonyAppProvision Profile 文件（`.p7b` 文件）

- 进入 [AppGallery Connect 网站](https://developer.huawei.com/consumer/cn/service/josp/agc/index.html)，选择 **我的项目**，选择之前创建的 HarmonyOS 项目和应用。

- 点击左侧的 **HarmonyOS 应用 -> HAP Provision Profile 管理** 项，然后点击页面右上方的 **添加** 按钮来创建 `.p7b` 文件。

  > **注意**：当前只有受邀请开发者才能访问 **HarmonyOS 应用** 菜单。若需要申请，请将开发者名称、申请背景、支持设备类型、是否有应用上架诉求及 Developer ID 发送至 `agconnect@huawei.com`，华为运营人员将在 1-3 个工作日内安排对接人员。

  ![provision profile](./publish-huawei-ohos/provision-profile.png)

- 填写信息时 **类型** 可根据需要选择 **发布**/**调试** 类型，但要与上一步骤中的证书类型保持一致。**选择证书** 选择上一步骤生成的 `.cer` 文件。

  > **注意**：若配置的是调试类型，还需要选择设备，详情请参考 [注册调试设备](https://developer.huawei.com/consumer/cn/doc/distribution/app/agc-harmonyapp-debugharmonyapp#h1-1598336280693)。

- 设置完成后点击 **提交**，将生成的 `.p7b` 文件下载到本地。

更多内容可参考 [申请 Profile 文件](https://developer.huawei.com/consumer/cn/doc/distribution/app/agc-harmonyapp-debugharmonyapp#h1-1598336409517)。
