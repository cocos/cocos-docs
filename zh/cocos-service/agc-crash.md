# 崩溃服务（AppGallery Connect）快速入门

华为 AppGallery Connect（简称 AGC）[崩溃服务](https://developer.huawei.com/consumer/cn/doc/development/AppGallery-connect-Guides/agc-crash-introduction) 是一个轻量级崩溃分析服务，它为开发者提供了 Crash SDK，可以 **零代码** 快速集成。

### 主要功能

- 开发者可以通过崩溃报告了解开发者的应用崩溃情况，崩溃服务提供最近 1 小时的实时报告，开发者可以实时监测应用质量。

- 崩溃服务会将崩溃问题自动分类，开发者可以通过各崩溃问题的指标数据判断优先解决哪些问题。开发者还可以查看某个崩溃问题的数据，分析崩溃发生在哪个应用版本，哪个 Android 系统等。开发者可以具体查看某次崩溃发生时应用、操作系统、设备的相关信息，以及崩溃堆栈。以上这些数据报告和信息将会帮助开发者快速、高效的定位、解决崩溃问题。

- 崩溃服务还可以实时检测重大崩溃问题，开发者开启崩溃提醒后 AppGallery Connect 可以在发生重大崩溃问题时向开发者发送邮件提醒。

## 一键接入崩溃服务

### 开通服务

- 使用 Cocos Creator 打开需要接入崩溃服务的项目工程。

- 由于崩溃服务上报崩溃事件时，使用了华为分析服务的能力，集成崩溃服务前，请先开通 [分析服务（HMS Core）](./hms-analytics.md)。

- 点击菜单栏的 **面板 -> 服务**，打开 **服务** 面板，选择 **崩溃服务**，进入服务详情页。然后点击右上方的 **启用** 按钮即可开通服务。详情可参考 [服务面板操作指南](./user-guide.md)。

  ![](agc-crash/crash-panel.png)

### 配置华为参数文件

大部分的华为相关项目都需要用到 `agconnect-services.json` 配置文件。若有新开通服务等操作，请及时更新该文件。

- 登录 [AppGallery Connect](https://developer.huawei.com/consumer/cn/service/josp/agc/index.html) 后台，在 **项目列表 -> 应用列表** 中找到对应的应用。
- 在 **项目设置** 页面的 **应用** 区域，点击 `agconnect-services.json` 下载配置文件。`agconnect-services.json` 文件在下载或者更新完成后，**必须手动拷贝** 到工程目录的 `settings` 目录下。

  ![](agc-crash/crash-configfile.png)

### 验证服务是否接入成功

**崩溃服务** 可以 **零代码** 快速集成，但通常应用程序崩溃出现的概率较小，没必要等待崩溃出现来确定崩溃服务是否正常工作。崩溃服务 SDK 提供了手动制造崩溃的方法，可以通过调用该方法来判断服务是否介入成功。

- 在脚本中添加代码。

  ```js
  console.log("Call crash method after 5 seconds.");
  this.scheduleOnce(function(){
      huawei.AGC.Crash.CrashService.testIt();
  },5);
  ```

- [**打包发布**](../publish/publish-native.md) 到 **Android** 平台。请确保 **构建发布** 面板中的包名与华为后台设置的包名一致。

- 登录 [AppGallery Connect](https://developer.huawei.com/consumer/cn/service/josp/agc/index.html) 后台，打开对应项目， 进入 **质量 -> 崩溃服务**，确认应用性能数据可以正常显示（通常会在 15 分钟内显示），即为接入成功。

  ![](agc-crash/crash-console.jpg)

## Sample 工程

开发者可以通过 Sample 工程快速体验崩溃服务。

- 点击崩溃服务面板中的 **Sample 工程** 按钮，Clone 或下载 HUAWEI Sample 工程，并在 Cocos Creator 中打开。

- 参照上文开通崩溃服务并配置华为参数文件后，可通过 Creator 编辑器菜单栏的 **项目 -> 构建发布** 打开 **构建发布** 面板来构建编译工程。Creator v2.4.1 及以上版本，可 [发布到 HUAWEI AppGallery Connect](../publish/publish-huawei-agc.md)。Creator v2.4.1 以下的版本可 [打包发布](../publish/publish-native.md) 到 **Android** 平台。

- 需要在安装 HMS Core 服务的华为或荣耀品牌手机上测试。

- Sample 工程运行到手机后，点击首页的 **Crash** 按钮，即可进入功能界面进行测试。

  ![](agc-crash/crash-sample.png)

## 开发指南

崩溃服务无需代码层接入，以下为可选方法。

### 设置崩溃服务开关

`enableCrashCollection(enable: boolean): void`

设置崩溃服务开关。该开关默认打开，表示崩溃服务将会收集和上报崩溃信息。如果开发者不想崩溃服务自动收集和上报崩溃信息，可以将开关设置为关闭。

**参数说明**：

| 参数 | 说明 |  
| :---------- | :------------- |  
|  enable    | 若调用该方法并设置为 **false**，则关闭崩溃服务收集上报功能。若要继续使用崩溃服务收集上报功能，则需要设置为 **true**。 | 

**示例**：

```js
huawei.AGC.Crash.CrashService.enableCrashCollection(false);
```

### 制造崩溃异常

`testIt(): void`

此方法用于创建一个测试用的崩溃。本方法仅供开发者在测试崩溃实现时调试使用，**正式发布的应用中请勿使用**。

**示例**：

```js
huawei.AGC.Crash.CrashService.testIt();
```

## 服务使用

应用集成崩溃服务后，可以在应用崩溃时自动上报崩溃数据到 AppGallery Connect，开发者可以根据具体的崩溃信息，前往 AppGallery Connect 后台，分析崩溃问题原因。可参考以下 AGC 崩溃服务文档链接。

- [分析崩溃问题](https://developer.huawei.com/consumer/cn/doc/development/AppGallery-connect-Guides/agc-crash-locate)
- [接收崩溃提醒](https://developer.huawei.com/consumer/cn/doc/development/AppGallery-connect-Guides/agc-crash-notice)
- [获取 NDK 崩溃报告](https://developer.huawei.com/consumer/cn/doc/development/AppGallery-connect-Guides/agc-crash-report)
- [获取可阅读的崩溃报告](https://developer.huawei.com/consumer/cn/doc/development/AppGallery-connect-Guides/agc-crash-mapping)
- [自定义崩溃报告](https://developer.huawei.com/consumer/cn/doc/development/AppGallery-connect-Guides/agc-crash-customreport)
- [崩溃服务 FAQ](https://developer.huawei.com/consumer/cn/doc/development/AppGallery-connect-Guides/agc-crash-faq)

## API 文档

详细的功能接口和 API 说明，请参考 [崩溃服务 - API 文档](https://docs.cocos.com/service/api/modules/huawei.agc.crash.html)。


