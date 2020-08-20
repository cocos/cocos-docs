# 崩溃服务（AppGallery Connect）快速入门

华为 AppGallery Connect（简称 AGC）[崩溃服务](https://developer.huawei.com/consumer/cn/doc/development/AppGallery-connect-Guides/agc-crash-introduction) 是一个轻量级崩溃分析服务，它为开发者提供了 Crash SDK，可以 **零代码** 快速集成。

### 主要功能

- 开发者可以通过崩溃报告了解开发者的应用崩溃情况，崩溃服务提供最近 1 小时的实时报告，开发者可以实时监测应用质量。
- 崩溃服务会将崩溃问题自动分类，开发者可以通过各崩溃问题的指标数据判断优先解决哪些问题。开发者还可以查看某个崩溃问题的数据，分析崩溃发生在哪个应用版本，哪个 Android 系统等。开发者可以具体查看某次崩溃发生时应用、操作系统、设备的相关信息，以及崩溃堆栈。以上这些数据报告和信息将会帮助开发者快速、高效的定位、解决崩溃问题。
- 崩溃服务还可以实时检测重大崩溃问题，开发者开启崩溃提醒后 AppGallery Connect 可以在发生重大崩溃问题时向开发者发送邮件提醒。

## 一键接入崩溃服务

### 开通服务

- 使用 Cocos Creator 打开需要接入崩溃服务的项目工程。

- 由于崩溃服务上报崩溃事件时，使用了华为分析服务的能力，集成崩溃服务前，请先开通 [分析服务](./hms-analytics.md#开通服务)。

- 点击菜单栏的 **面板 -> 服务**，打开 **服务** 面板，选择 **崩溃服务**，进入服务详情页。然后点击右上方的 **启用** 按钮即可开通服务。详情可参考 [服务面板操作指南](./user-guide.md)。

    ![](agc-apm/apm-provisioning.jpeg)

### 配置华为参数文件

大部分的华为相关项目都需要用到 `agconnect-services.json` 配置文件。若有新开通服务等操作，请及时更新该文件。

- 登录 [AppGallery Connect](https://developer.huawei.com/consumer/cn/service/josp/agc/index.html) 网站，点击 **我的项目**。
- 在项目列表中找到对应的项目，在项目下的应用列表中选择对应应用。
- 在 **项目设置** 页面的 **应用**区域，点击 `agconnect-services.json` 下载配置文件。

我们将该文件统一放在工程下的 `/setting` 目录。

- Creator 2.4.3 以上版本可在 **构建** 面板直接配置该文件。
- Creator 2.4.3 以下版本，请将 `agconnect-services.json` 文件拷贝到工程目录下的 `/settings` 目录。

### 验证服务是否接入成功

**崩溃服务** 可以 **零代码** 快速集成，但通常应用程序崩溃出现的概率较小，没必要等待崩溃出现来确定崩溃服务是否正常工作。崩溃服务 SDK 提供了手动制造崩溃的方法，我们通过添加代码调用该方法来判断服务是否介入成功。

```js
    cc.log("Call crash method after 2 seconds.");
    this.scheduleOnce(function(){
        huawei.AGC.Crash.CrashService.testIt();
    },5);
```

- 脚本修改完成并保存后，回到编辑器。崩溃服务调试需要 [打包发布](../publish/publish-native.md) 到 **Android** 平台。

- 登录 [AppGallery Connect](https://developer.huawei.com/consumer/cn/service/josp/agc/index.html) 网站，打开对应项目， 进入 **质量 -> 崩溃服务**，确认应用性能数据可以正常显示（通常会在 15 分钟内显示），即为接入成功。

![](agc-crash/crash-console.jpeg)

## Sample 工程

开发者可以通过 Sample 工程快速体验定位服务。

- 点击性能服务面板中的 **Sample 工程** 按钮，Clone 或下载 HUAWEI Sample 工程，并在 Cocos Creator 中打开。

- [开通分析服务](./hms-analytics.md#开通服务)、[开通崩溃服务](#开通服务) 并 [配置华为参数文件](#配置华为参数文件) 后，可通过 Creator 编辑器菜单栏的 **项目 -> 构建发布** 打开 **构建发布** 面板来构建编译工程。Creator 2.4.3 及以上版本，可参考 [发布到 HUAWEI AppGallery Connect](../publish/publish-huawei-agc.md)。旧版本用户可构建发布到 Android 平台。

- 需要在安装 HMS Core 服务的华为或荣耀品牌手机上测试。点击 Sample 首页的 **Crash** 按钮，进入该功能界面进行测试。

![](agc-crash/crash-provisioning.png)

## 开发指南

崩溃服务无需代码层接入，以下为可选方法。

### 设置崩溃服务开关

`enableCrashCollection(enable: boolean): void`

设置崩溃服务开关。该开关默认打开，表示崩溃服务将会收集和上报崩溃信息。如果开发者不想崩溃服务自动收集和上报崩溃信息，可以将开关设置为关闭。

**参数说明**：

| 参数 | 说明 |  
| :---------- | :------------- |  
|  enable    | 崩溃服务开关。<br>**true**：开<br>**false**：关 | 

**示例**：

```
huawei.AGC.Crash.CrashService.enableCrashCollection(false);
```

### 制造崩溃异常

`testIt(): void`

此方法用于创建一个测试用的崩溃。本方法仅供开发者在测试崩溃实现时调试使用，正式发布的应用中请勿使用。

**示例**：

```
huawei.AGC.Crash.CrashService.testIt();
```

## 服务使用

应用集成崩溃服务后，可以在应用崩溃时自动上报崩溃数据到 AppGallery Connect，开发者可以根据具体的崩溃信息，前往 AppGallery Connect 后台，分析崩溃问题原因。

- [分析崩溃问题](https://developer.huawei.com/consumer/cn/doc/development/AppGallery-connect-Guides/agc-crash-locate)
- [接收崩溃提醒](https://developer.huawei.com/consumer/cn/doc/development/AppGallery-connect-Guides/agc-crash-notice)
- [获取 NDK 崩溃报告](https://developer.huawei.com/consumer/cn/doc/development/AppGallery-connect-Guides/agc-crash-report)
- [获取可阅读的崩溃报告](https://developer.huawei.com/consumer/cn/doc/development/AppGallery-connect-Guides/agc-crash-mapping)
- [自定义崩溃报告](https://developer.huawei.com/consumer/cn/doc/development/AppGallery-connect-Guides/agc-crash-customreport)

## API 文档

详细的功能接口和 API 说明，请参考 [崩溃服务 - API 文档](https://docs.cocos.com/service/api/modules/huawei.agc.crash.html)。


