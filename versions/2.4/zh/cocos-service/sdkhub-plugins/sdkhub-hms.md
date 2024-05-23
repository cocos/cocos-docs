> **注意**：此版本文档已归档不再维护，请移步至 [最新版本](https://service.cocos.com/document/zh/sdkhub-plugins/sdkhub-hms.html)。

# HUAWEI HMS Core 插件使用指南

目前 Cocos SDKHub 提供的华为 HMS Core 插件，包括了 [游戏服务](https://developer.huawei.com/consumer/cn/hms/huawei-game)、[应用内支付服务](https://developer.huawei.com/consumer/cn/hms/huawei-iap/)、[广告服务](https://developer.huawei.com/consumer/cn/hms/huawei-adskit)、[推送服务](https://developer.huawei.com/consumer/cn/hms/huawei-pushkit) 和部分 [账号服务](https://developer.huawei.com/consumer/cn/hms/huawei-accountkit)，开发者需在 JS 层调用 Cocos SDKHub 接口，处理回调。

插件中的 **账号 & 游戏服务**、**支付服务**、**广告服务** 和 **推送服务** 均可独立使用。

Cocos SDKHub 框架和插件基本不涉及当前状态处理和服务端接口，例如当前用户是否登录等情况，需要游戏端进行判断，避免在用户未登录下，调用账号和游戏服务其他接口导致崩溃。华为 HMS Core 插件在支付成功情况下也做了本地验证。但如果用户需要登录或支付服务端验证（可选），请使用回调中的信息，自行到服务端进行验证。

- [校验登录签名接口](https://developer.huawei.com/consumer/cn/doc/development/HMS-References/verify-login-signature)
- [Order 服务购买 Token 校验](https://developer.huawei.com/consumer/cn/doc/development/HMS-Guides/iap-order-service-purchase-token-verification-v4)

## 版本更新汇总

**当前版本：1.2.2_5.0.1**

| HMS Core SDK 名称 | 当前版本号 | 说明 |
| :--- | :--- | :--- |
| com.huawei.hms:hwid | 5.0.1.301 | 帐号服务 |
| com.huawei.hms:game | 5.0.1.302 | 游戏服务 |
| com.huawei.hms:iap | 5.0.2.300 | 应用内支付服务 |
| com.huawei.hms:ads-lite | 13.4.32.303 | 广告服务 |
| com.huawei.hms:ads-identifier | 3.4.30.307 | 广告服务 |
| com.huawei.hms:ads-installreferrer | 3.4.30.307 | 广告服务 |
| com.huawei.hms:push | 5.0.2.300 | 推送服务 |

关于 HMS Core SDK 最新版本以及详细的更新说明，可参考 [HMS - 版本更新汇总](https://developer.huawei.com/consumer/cn/doc/development/HMSCore-Guides/hmssdk-kit-0000001050042513)。

已集成到项目中的 HMS Core SDK，可在 Android Studio 的 `proj.android-studio/app/build.gradle` 文件中查看版本号。当升级插件并重新构建项目后，也请关注该文件中各 SDK 的版本。

### 版本更新说明

- v1.2.2_5.0.1

    - 添加存档功能。

    - 修复部分 bug。

- v1.2.1_5.0.1

    - 更新各组件：game:5.0.1.302、ads-lite:13.4.32.303、iap:5.0.2.300、push:5.0.2.300。

    - 更新版本后，请手动将 `agconnect-services.json` 文件复制到工程 `/setting` 目录下。

- v1.1.7_5.0.1

    - 修复单选推送时的参数问题。

    - 修复游戏排行榜界面显示问题。

- v1.1.5_5.0.1

    - 添加 HMS Core 推送功能：push:5.0.0.301。

    - 更新各组件：base:5.0.0.300、hwid:5.0.1.301、game:5.0.0.300、iap:4.0.4.300、ads-lite:13.4.31.300。

- v1.1.4_5.0.0

    - 首次发布

## 准备工作

- 参考 [AppGallery Connect 配置](https://developer.huawei.com/consumer/cn/doc/development/HMS-Guides/account-preparation#h1-1573697333903) 文档，在 [华为开发者联盟后台](https://developer.huawei.com/consumer/cn/console) 注册开发者账号，创建游戏应用和 **生成/配置签名证书指纹**。在该游戏应用的 **我的项目 -> 项目设置 -> API 管理** 页面中开通 **Account Kit**、**In-App Purchases**、**Game Service**、**Push Kit** 服务。华为文档中的集成 HMS Core SDK 部分，Cocos SDKHub 会在构建时 **自动完成**，无需开发者手动操作。

    ![](sdkhub-hms/hms-config.png) 

- 若需要使用支付服务，请提前准备好注册开发者本人的银行卡，填写相关收款信息。提交后审核可能需要 1~2 个工作日。开通 **In-App Purchases** 服务后到后台 [配置商品信息](https://developer.huawei.com/consumer/cn/doc/development/HMSCore-Guides/config-product-0000001050033076)。支付服务支持 [沙盒测试](https://developer.huawei.com/consumer/cn/doc/HMSCore-Guides-V5/sandbox-testing-0000001050035039-V5)。请注意配置后的商品是否为 **有效** 状态。
    
- 若需要使用游戏服务，需要开发者 [配置成就和事件](https://developer.huawei.com/consumer/cn/doc/HMSCore-Guides-V5/config-agc-0000001050166285-V5#ZH-CN_TOPIC_0000001051142256__section122826183710)，获取对应的 ID。

- 需要在已安装 HMS Core 服务的华为或荣耀品牌手机上测试。

### 配置华为参数文件

大部分的华为相关项目都需要用到 `agconnect-services.json` 配置文件。若有新开通服务等操作，请及时更新该文件。

- 登录 [AppGallery Connect](https://developer.huawei.com/consumer/cn/service/josp/agc/index.html) 后台，在 **项目列表 -> 应用列表** 中找到对应的应用。

- 在 **项目设置** 页面的 **应用** 区域，点击 `agconnect-services.json` 下载配置文件。`agconnect-services.json` 文件在下载或者更新完成后，**必须手动拷贝** 到工程目录的 `settings` 目录下。

  ![](sdkhub-hms/hms-configfile.png)

**注意**：

1. 务必确认完成 [生成/配置签名证书指纹](https://developer.huawei.com/consumer/cn/doc/development/HMSCore-Guides/config-agc-0000001050166285#ZH-CN_TOPIC_0000001054452903__section21591342135811) 步骤，配置 SHA256 证书指纹。

2. 在构建时若勾选了 **调试模式**，开发者需要在 Android Studio 的 `app/build.gradle` 文件中，自行配置 Keystore 签名文件。

    ![](sdkhub-hms/globle-keystore.png)

3. Cocos Creator v2.4.3 及以上版本，若 [发布到 HUAWEI AppGallery Connect](../../publish/publish-huawei-agc.md)，开发者可直接在 **构建发布** 面板中选取下载或更新后的配置文件，不需要手动拷贝。

    ![](sdkhub-hms/hms-agcfile.png)

## Sample 工程

开发者可以通过 Sample 工程快速体验 Cocos SDKHub。若开发者需要在自己的游戏工程中接入 HMS Core SDK，也可参考此流程。请先确保 [准备工作](#准备工作) 部分已经完成，并且已获取到所需参数。

- 点击 Cocos SDKHub 服务面板中的 **Sample 工程** 按钮，Clone 或下载，并在 Cocos Creator 中打开。

- 点击菜单栏的 **面板 -> 服务**，打开 **服务** 面板，选择 **Cocos SDKHub**，进入服务详情页。然后点击右上方的 **启用** 按钮即可开通服务。详情可参考 [服务面板操作指南](../user-guide.md)。

  ![](sdkhub-hms/hms-provisioning.png) 

- 在 Cocos SDKHub 服务面板上添加一个新配置集
    
  ![](sdkhub-hms/hms-config-group1.jpeg)

  进入 **添加配置集** 页面，填写相关参数，填写完成后点击 **确定** 即可

  ![](sdkhub-hms/hms-config-group2.png)

- 添加完成后点击 **配置插件** 按钮，勾选所需的 **HUAWEI HMS Core** 相关服务插件。
 
  ![](sdkhub-hms/hms-config-group3.png)

- 点击 **插件** 行对应的编辑参数按钮。

  ![](sdkhub-hms/hms-config-group4.jpeg)

  进入 **参数配置** 页面，配置所需的参数。

  ![](sdkhub-hms/hms-params.jpg)
    
  - [支付公钥](https://developer.huawei.com/consumer/cn/doc/development/HMS-Guides/appgallery_querypaymentinfo)，勾选支付服务时需要填写。

    ![](sdkhub-hms/hms-paykey.jpg)
    
  - [语言支持](https://developer.huawei.com/consumer/cn/doc/development/HMS-Guides/game-preparation-v4) 
    - 此参数为选填项。如果开发者的应用不需要设置只支持某些特定语言，该参数可以设置为空，应用将默认支持所有 HMS Core SDK 支持的语言。
    - 如果开发者的应用需要设置只支持某些特定语言，填写格式为 **"en", "zh-rCN", "需要支持的其他语言"**。
    - HMS Core SDK 支持的语言列表请参考文档 [HMS SDK 支持的语言](https://developer.huawei.com/consumer/cn/doc/development/HMS-Guides/hmssdk_supported_language)。

- 请在工程中的 `config.js` 文件中，替换支付商品 ID `payProductId`、请求商品信息 ID 列表 `obtainProductIdList`、成就 ID `achievementId`、排行榜 ID `rankingId` 和 事件 ID `eventId`。以上参数均可在 AppGallery Connect 后台 配置生成，可参考 [配置商品信息](https://developer.huawei.com/consumer/cn/doc/development/HMSCore-Guides/config-product-0000001050033076) 和 [配置成就/事件](https://developer.huawei.com/consumer/cn/doc/HMSCore-Guides-V5/config-agc-0000001050166285-V5#ZH-CN_TOPIC_0000001051142256__section122826183710)。

- 配置完成并接入相关 API 接口后，即可通过 Creator 编辑器菜单栏的 **项目 -> 构建发布** 打开 **构建发布** 面板来构建编译工程。Creator 2.4.1 及以上版本，可参考 [发布到 HUAWEI AppGallery Connect](../../publish/publish-huawei-agc.md)。旧版本用户可构建发布到 Android 平台。

    ![](sdkhub-hms/hms-build.png)
    
    ![](sdkhub-hms/hms-sample.jpg)

- 若需要修改工程参数配置或者 JS 代码层，修改完成后，在构建发布面板重新构建即可。

- 若需要删减服务插件配置（例如去掉支付功能），建议删除工程构建后生成的发布包 `build/jsb-link` 或者 `build/jsb-default` 目录，然后重新构建。

- Sample 中提供了一个简单的消耗型商品消耗 `consumeOwnedPurchase` 流程，可供开发者参考。

## 开发指南

开发时请先参考 [Cocos SDKHub - 开发指南](../sdkhub.md/#开发指南)，本章节作为 HMS Core SDK 插件特性的补充说明部分。

华为 HMS Core SDK 提供的方法较多，部分接口需要使用扩展方法调用，并返回扩展回调。需要配合参考 Cocos SDKHub Sample 工程中的代码与华为官方对应的文档进行调用。

Cocos SDKHub 的 Log 关键字为 `HUB_LOG`，仅在 **构建发布** 面板中的 **调试模式** 选项 **打开** 的情况下才会输出。可参考 [Cocos SDKHub - 调试信息输出](../sdkhub.md/#调试信息输出)。

接入 HMS Core SDK 后，在统一回调中需要判断返回的 msg 格式是否为 JSON 对象，JSON 对象中是否有 **retCode** 信息。该值为华为返回的错误码，可以通过该值到华为文档中查询错误信息。

![](sdkhub-hms/hms-errorcode.png)

### 账号与游戏插件

开发时请先参考 [Cocos SDKHub - 账号与游戏插件](../sdkhub.md/#账号与游戏插件)，本章节作为 HMS Core SDK 插件特性的补充说明部分。

当前用户是否登录等情况，需要游戏端进行判断，避免在用户未登录下，调用账号和游戏服务其他接口导致崩溃。

#### 登录

华为的登录回调中，可读取 **userID** 参数作为用户唯一 ID。此时也可以根据获取的登录签名信息，调用 [校验登录签名接口](https://developer.huawei.com/consumer/cn/doc/development/HMS-References/verify-login-signature) 对玩家信息进行服务端验签。

#### 浮标

SDKHub 提供的 HMS Core SDK 插件，已在生命周期内调用 SDK 的浮标接口，**无需** 开发者手动调用 `showToolBar` 和 `hideToolBar` 浮标方法。

#### 成就

成就功能，可参考 [游戏服务 - 成就](https://developer.huawei.com/consumer/cn/doc/development/HMS-Guides/game-achievement) 文档。

**展示成就**

**参数说明**：

| 参数名 | 填写格式 | 说明 |
| :--- | :--- | :--- |
| type | "getShowAchievementListIntent"<br>"getAchievementList" | 直接跳转或执行展示成就列表 |
| forceReload | "1" | "getAchievementList" 情况可选参数：<br>"0"：不联网，表示从本地缓存获取<br>"1"：联网，表示直接从游戏服务器获取。<br>默认为 "1" |

**示例**：

```js
var params = {
    "type": "getAchievementList",
    "forceReload": "0"
};
sdkhub.getUserPlugin().showAchievements(params);
```

**解锁成就**

**参数说明**：

| 参数名 | 填写格式 | 说明 |
| :--- | :--- | :--- |
| type | "visualizeWithResult"<br>"growWithResult"<br>"makeStepsWithResult"<br>"reachWithResult" | 对应文档各子方法 |
| achievementId | "5D9580837D32CB59Cxxx" | 后台配置后生成的成就 ID |
| stepsNum | "50" | 当前成就的步长，growWithResult 和 makeStepsWithResult 情况需要该参数 |

**示例**：

```js
var params = {
    "type": "growWithResult",
    "achievementId": "5D9580837D32CB59CFEC89DAD39470CDF9B672033A2D6F14689BC01335818444",
    "stepsNum": "50"
};
sdkhub.getUserPlugin().unlockAchievement(params);
```

#### 排行榜

排行榜功能，可参考 [游戏服务 - 排行榜](https://developer.huawei.com/consumer/cn/doc/development/HMS-Guides/game-leaderboards-development) 文档。

**显示排行榜**

**参数说明**：

| 参数名 | 填写格式 | 说明 |
| :--- | :--- | :--- |
| type | "getRankingsIntent"<br>"getRankingSummary"<br>"getCurrentPlayerRankingScore"<br>"getPlayerCenteredRankingScores"<br>"getMoreRankingScores"<br>"getRankingTopScores" | 对应文档各子方法：直接展示应用助手的排行榜和自行展示排行榜列表等。 |
| rankingId | "5D9580837D32CB59Cxxx" | 可选，如果需要获取所有排行榜就不要传该参数。 |
| timeDimension | "1" | 可选，"getRankingsIntent" "getCurrentPlayerRankingScore" "getRankingTopScores" 情况下的指定时间维度。<br>"0"：日，表示获取当天的排行榜数据。<br>"1"：周，表示获取本周的排行榜数据。<br>"2"：全部时间。需要与 rankingId 同时传入。 |
| isRealTime | "1" | 可选，"getRankingSummary"、"getRankingTopScores"、getPlayerCenteredRankingScores 情况下指定获取方式。<br>"0"：不联网，表示从本地缓存获取。<br>"1"：联网，表示直接从游戏服务器获取。默认为 "1"。 |
| maxResults | "15" | "getMoreRankingScores"、"getPlayerCenteredRankingScores"、"getRankingTopScores" 必传参数每页的最大数量，支持取值为 1 ~ 21 的整数。 |
| offsetPlayerRank | "1" | "getMoreRankingScores" 必传，"getPlayerCenteredRankingScores" 与 "getRankingTopScores" 可选，从 offsetPlayerRank 指定的位置，根据 pageDirection 指定的数据获取方向获取一页数据，offsetPlayerRank 取值必须为大于等于 0 的整数。<br>例如 offsetPlayerRank 取值为 5，pageDirection 取值为 0，表示从排行榜的第 5 位分数向下获取一页数据。 |
| pageDirection | "0" | "getRankingTopScores"、"getPlayerCenteredRankingScores" 可选，数据获取方向。<br>"0"：下一页<br>"1"：上一页，默认为 "0" |

**示例**：

```js
var params = {
    "type": "getRankingTopScores",
    "rankingId": "2008EE56BB773FA325FFB1349D0D206A8B0EC3E9E2F0D32E786E574ADD10E7A1",
    "offsetPlayerRank": "1",
    "maxResults": "15",
    "pageDirection": "0",
    "timeDimension": "2"
};
sdkhub.getUserPlugin().showLeaderBoard(params);
```

**提交分数**

**参数说明**：

| 参数名 | 填写格式 | 说明 |
| :--- | :--- | :--- |
| type | "getRankingSwitchStatus"<br>"setRankingSwitchStatus"<br>"submitRankingScore" | 对应文档各子方法。 |
| stateValue | "1" | setRankingSwitchStatus 需要传入，排行榜开关状态，默认为 0，需设置为 1 才可提交分数。 |
| rankingId | "5D9580837D32CB59Cxxx" | submitRankingScore 情况需要传入，后台配置后生成的排行榜 ID |
| score | "10000" | submitRankingScore 情况需要传入，要提交到排行榜的分数，Java 侧为 `long` 型。|
| scoreTips | "金币" | submitRankingScore 情况可选，有自定义单位情况下需要传入。 |

---

**以下方法需要通过 [扩展方法调用](../sdkhub.md/#扩展方法调用)**。

#### 初始化

可参考 [游戏启动 - 开发步骤](https://developer.huawei.com/consumer/cn/doc/development/HMSCore-Guides/game-start-0000001050123475#ZH-CN_TOPIC_0000001054251621__section11466122071413) 的 `JosAppsClient.init` 方法，需要用户在游戏登录前调用，用于展示公告业务。

**方法名**：`init`

**参数说明**：无需参数。

**示例**：

```js
sdkhub.getUserPlugin().callFuncWithParam("init");
```

#### 应用升级

可参考 [应用升级](https://developer.huawei.com/consumer/cn/doc/development/HMSCore-Guides-V5/update-app-0000001050176950-V5) 文档，中国大陆的联运游戏需要在应用启动完成后接入。

**方法名**：`checkAppUpdate`

**参数说明**：

| 参数名 | 填写格式 | 说明 |
| :--- | :--- | :--- |
| showUpdateDialog | "0" | 可选，是否调用 HMS 提供的 [应用升级提示框](https://developer.huawei.com/consumer/cn/doc/HMSCore-References-V5/appupdateclient-0000001050123641-V5#ZH-CN_TOPIC_0000001054371620__section1113567144514)，默认为 "1" |
| forceUpdate | "1" | 可选，默认为 "0"。若 showUpdateDialog 为 "1"，则强制更新按钮选择。 |

**示例**：

```js
sdkhub.getUserPlugin().callFuncWithParam("checkAppUpdate");
```

**回调说明**：

| 扩展回调值 `sdkhub.UserResultCode.kUserExtension` | msg 类型 | msg 说明 |
| :--- | :--- | :--- |
| + 132 | JSON | 获取升级信息成功，返回信息可对应 [intent 说明](https://developer.huawei.com/consumer/cn/doc/HMSCore-References-V5/appupdateclient-0000001050123641-V5#ZH-CN_TOPIC_0000001054371620__section15712187193218)。 |
| + 133 | String | 获取升级信息失败，或者无需处理升级信息情况 |

#### 账号服务登录

注意：游戏请调用 [Login](../sdkhub.md#%E7%99%BB%E5%BD%95) 方法，无需接入该方法。

该方法用于第三方应用获取华为帐号用户身份认证信息（ID Token）或用户的临时授权票据（Authorization Code），以便用户可以使用华为帐号安全登录第三方应用。详情可参考 [登录华为帐号](https://developer.huawei.com/consumer/cn/doc/development/HMSCore-Guides/dev-guide-account-0000001050048888#ZH-CN_TOPIC_0000001050048888__section15992612272) 和 [静默登录](https://developer.huawei.com/consumer/cn/doc/development/HMSCore-Guides/login-silentsignin-0000001050050853) 文档。

通过 `sdkhub.UserResultCode.kLoginSucceed` 登录回调获取 ID Token 或 Authorization Code 后，请参考 [登录华为帐号](https://developer.huawei.com/consumer/cn/doc/development/HMSCore-Guides/dev-guide-account-0000001050048888#ZH-CN_TOPIC_0000001050048888__section15992612272) 文档中对应登录方式的服务端验证部分，完成服务端接入。

**方法名**：`accountLogin`

**参数说明**：

| 参数名 | 填写格式 | 说明 |
| :--- | :--- | :--- |
| type | "AuthorizationCode"<br>"IDToken"<br>"Slient" | 对应各账号服务登录方式。 |

**示例**：

```js
var params = "AuthorizationCode";
sdkhub.getUserPlugin().callFuncWithParam("accountLogin", params);
```

#### 登录后获取用户信息

可参考 [getCurrentPlayer](https://developer.huawei.com/consumer/cn/doc/HMSCore-References-V5/playersclient-0000001050121668-V5#ZH-CN_TOPIC_0000001054371606__section1442582231216) 文档，由于登录流程中也会调用该方法，并且走登录方法回调，该方法可选。

**方法名**：`getCurrentPlayer`

**参数说明**：无需参数。

**示例**：

```js
sdkhub.getUserPlugin().callFuncWithParam("getCurrentPlayer");
```

#### 帐号取消授权

可参考 [账号服务开发指南 - 华为帐号取消授权](https://developer.huawei.com/consumer/cn/doc/development/HMS-Guides/account-guide-v4#h1-1573730230709) 文档，为了提升应用隐私安全，应用可以提供入口，供用户取消对应用的授权。

**方法名**：`cancelAuthorization`

**参数说明**：无需参数。

**示例**：

```js
sdkhub.getUserPlugin().callFuncWithParam("cancelAuthorization");
```

**回调说明**：

| 扩展回调值 `sdkhub.UserResultCode.kUserExtension` | msg 类型 | msg 说明 |
| :--- | :--- | :--- |
| + 122 | String | 取消登录授权成功描述 |
| + 123 | String | 取消登录授权失败描述 |

#### 防沉迷

防沉迷功能，可参考 [游戏服务 - 防沉迷](https://developer.huawei.com/consumer/cn/doc/development/HMS-Guides/game-anti-indulgence-v4) 文档，中国大陆发布的游戏需要开发者按照上述通知结合游戏自身完成游戏防沉迷功能的开发。

- 当玩家登录游戏或从后台切到游戏前台时，调用 `submitPlayerEventStart`。游戏定期调用 `getPlayerExtraInfo` 方法查询玩家附加信息。服务器允许的最高频率为 10 分钟查询一次，一般建议 15 分钟查询一次。当玩家退出游戏、从前台切到后台或游戏异常退出（进程终止、手机重启等）时，会调用 `submitPlayerEventEnd` 上报玩家退出游戏事件。

- **注意**：`submitPlayerEventStart` 和 `getPlayerExtraInfo` 如果回调中 `retCode` 返回 7002 或 7006 错误码，需进行如下处理：

  - 7002：需判断是否为网络问题，如果不是网络问题则表示该帐号未在中国大陆注册，请直接放通，无需进行强制处理。
  - 7006：表示该帐号未在中国大陆注册，请直接放通，无需进行强制处理。

**方法名**：

    - `submitPlayerEventStart` 上报玩家进入游戏事件
    - `submitPlayerEventEnd`上报玩家退出游戏事件
    - `getPlayerExtraInfo` 查询玩家附加信息

**参数说明**：无需参数。

**示例**：

```js
sdkhub.getUserPlugin().callFuncWithParam("submitPlayerEventStart");
sdkhub.getUserPlugin().callFuncWithParam("submitPlayerEventEnd");
sdkhub.getUserPlugin().callFuncWithParam("getPlayerExtraInfo");
```

**回调说明**：

| 扩展回调值 `sdkhub.UserResultCode.kUserExtension` | msg 类型 | msg 说明 |
| :--- | :--- | :--- |
| + 106 | JSON | `submitPlayerEventStart` 上报玩家进入游戏事件成功，可获取参数 transactionId |
| + 107 | JSON / String | 上报玩家进入游戏事件失败 |
| + 108 | JSON | 上报玩家退出游戏事件成功，可获取参数 traceId |
| + 109 | JSON / String | 上报玩家退出游戏事件失败 |
| + 110 | JSON | 查询玩家附加信息成功，可获取参数 isRealName、isAdult、playerId、playerDuration |
| + 111 | JSON / String | 查询玩家附加信息失败 |

#### 事件上报

事件上报功能，可参考 [游戏服务 - 事件上报](https://developer.huawei.com/consumer/cn/doc/development/HMS-Guides/game-events) 文档。事件上报为开发者提供了收集玩家在游戏过程中产生的特定数据，上报并存储至华为游戏服务器，随后在 AppGallery Connect 上进行归纳分析的能力。

**上报事件方法**

**方法名**：`submitEvent`

**参数说明**：

| 参数名 | 填写格式 | 说明 |
| :--- | :--- | :--- |
| eventId | "5D9580837D32CB59Cxxx" | 当前事件的 ID，在配置事件时生成，后台获取。 |
| growAmount | "20" | 在已有事件数值的基础上要增量增加的数值。 |

**示例**：

```js
var params = {
    "eventId": "A29DB82609936BE9DBB44CF7AFBBAECD5D2B7F14A05FB2B37EF543E7622F7B7F",
    "growAmount": "20"
};
sdkhub.getUserPlugin().callFuncWithParam("submitEvent", params);
```

**回调说明**：

| 扩展回调值 sdkhub.UserResultCode.kUserExtension | msg 类型 | msg 说明 |
| :--- | :--- | :--- |
| + 112 | String | 调用事件上报回调，无成功或失败情况返回 |

#### 获取玩家事件的数据

**方法名**：`getEvent`

**参数说明**：

| 参数名 | 填写格式 | 说明 |
| :--- | :--- | :--- |
| forceReload | "1" | 可选，默认为 "1"。<br>"0"：不联网，表示从本地缓存获取。<br>"1"：联网，表示直接从游戏服务器获取。 |
| eventIds | "eventId1, eventId2" | 可选，传入事件 ID，获取特定事件数据，通过逗号分隔。不传则返回所有事件数据。 |

**示例**：

```js
var params = {
    "eventId": "A29DB82609936BE9DBB44CF7AFBBAECD5D2B7F14A05FB2B37EF543E7622F7B7F,2008EE56BB773FA325FFB1349D0D206A8B0EC3E9E2F0D32E786E574ADD10E7A1",
    "foreReload": "0"
};
sdkhub.getUserPlugin().callFuncWithParam("getEvent", params);
```

**回调说明**：

| 扩展回调值 `sdkhub.UserResultCode.kUserExtension` | msg 类型 | msg 说明 |
| :--- | :--- | :--- |
| + 114 | JSON | 获取事件数据成功，可获取参数 eventId。 |
| + 115 | JSON / String | 获取事件数据失败描述 |

#### 玩家信息统计

玩家信息统计方法，可参考 [游戏服务 - 玩家信息统计](https://developer.huawei.com/consumer/cn/doc/development/HMS-Guides/game-playerinfo-development) 文档。玩家信息统计是指开发者可以从华为游戏服务器获取当前玩家在游戏中的多种统计信息，帮助开发者更深度了解玩家的游戏习惯，以便根据玩家的游戏进度、支付能力等构建更适合该玩家的游戏体验。

**方法名**：`getGamePlayerStats`

**参数说明**：

| 参数名 | 填写格式 | 说明 |
| :--- | :--- | :--- |
| isRealTime | 0 | Number 型<br>1：是，表示从游戏服务器获取数据。<br>0：否，表示从本地缓存获取数据。本地缓存时间为 5 分钟，如果本地无缓存或缓存超时，则从游戏服务器获取。 |

**示例**：

```js
var params = 0;
sdkhub.getUserPlugin().callFuncWithParam("getGamePlayerStats", params);
```

**回调说明**：

| 扩展回调值 `sdkhub.UserResultCode.kUserExtension` | msg 类型 | msg 说明 |
| :--- | :--- | :--- |
| + 116 | JSON | 获取事件数据成功，可获取参数 averageOnLineMinutes、daysFromLastGame、paymentTimes、onlineTimes、totalPurchasesAmountRange |
| + 117 | JSON / String | 获取事件数据失败描述 |

#### 游戏基本信息

获取游戏基本信息方法，可参考 [游戏服务 - 游戏基本信息](https://developer.huawei.com/consumer/cn/doc/development/HMS-Guides/game-baseinfo-development) 文档。游戏基本信息是指游戏应用的相关信息，例如游戏的应用ID、游戏名称、游戏描述、游戏分类等。当开发者需要在游戏中使用游戏应用的信息时，可以从华为游戏服务器获取游戏基本信息。

**方法名**：`getGameSummary`

**参数说明**：

| 参数名 | 填写格式 | 说明 |
| :--- | :--- | :--- |
| isLocal | 0 | Number 型<br>1：是，表示从游戏服务器获取数据。<br>0：否，表示从本地缓存获取数据。 |

**示例**：

```js
var params = 0;
sdkhub.getUserPlugin().callFuncWithParam("getGameSummary", params);
```

**回调说明**：

| 扩展回调值 `sdkhub.UserResultCode.kUserExtension` | msg 类型 | msg 说明 |
| :--- | :--- | :--- |
| + 118 | JSON | 获取事件数据成功，可获取参数 achievementCount, appId, descInfo, gameName, gameHdImgUri, gameIconUri, rankingCount, firstKind, secondKind |
| + 119 | JSON / String | 获取事件数据失败描述 |

#### 取消游戏服务授权

可参考 [cancelGameService](https://developer.huawei.com/consumer/cn/doc/development/HMSCore-References-V5/gamesclient-0000001050123611-V5#ZH-CN_TOPIC_0000001054691591__section58133387544)，用户在华为应用市场开启游戏服务授权后，应用可以调用本方法向用户提供取消游戏服务授权的功能。

**方法名**：`cancelGameService`

**参数说明**：无需参数。

**示例**：

```js
sdkhub.getUserPlugin().callFuncWithParam("cancelGameService");
```

**回调说明**：

| 扩展回调值 `sdkhub.UserResultCode.kUserExtension` | msg 类型 | msg 说明 |
| :--- | :--- | :--- |
| + 124 | String | 取消游戏服务授权成功描述 |
| + 125 | String | 取消游戏服务授权失败描述 |

#### 设置欢迎提示语和完成成就提示框展示位置

可参考 [setPopupsPosition](https://developer.huawei.com/consumer/cn/doc/development/HMSCore-References-V5/gamesclient-0000001050123611-V5#ZH-CN_TOPIC_0000001054691591__section66001857175314)，设置欢迎提示语和完成成就提示框展示的位置。如果不调用本接口，将默认在页面顶部展示。

**方法名**：`setPopupsPosition`

**参数说明**：

| 参数名 | 填写格式 | 说明 |
| :--- | :--- | :--- |
| position | 0 | 当前只支持在页面顶部展示欢迎提示语和完成成就提示框。<br>此参数传入任意整型值即可。 |

**示例**：

```js
var params = 1;
sdkhub.getUserPlugin().callFuncWithParam("setPopupsPosition", params);
```

**回调说明**：

| 扩展回调值 `sdkhub.UserResultCode.kUserExtension` | msg 类型 | msg 说明 |
| :--- | :--- | :--- |
| + 126 | String | 设置提示框位置成功描述 |
| + 127 | String | 设置提示框位置失败描述 |

#### 获取 APPID

可参考 [获取游戏的应用 ID](https://developer.huawei.com/consumer/cn/doc/development/HMSCore-References-V5/gamesclient-0000001050123611-V5#ZH-CN_TOPIC_0000001054691591__section12552847125319) 文档。

**方法名**：`getAppId`

**参数说明**：无需参数。

**示例**：

```js
sdkhub.getUserPlugin().callFuncWithParam("getAppId");
```

**回调说明**：

| 扩展回调值 `sdkhub.UserResultCode.kUserExtension` | msg 类型 | msg 说明 |
| :--- | :--- | :--- |
| + 128 | String | 获取 APPID 成功，可获取参数 APPID |
| + 129 | String | 获取 APPID 失败描述 |

#### 存档

开发者可以将玩家的游戏进度存储到华为云空间，或从华为云空间中获得之前的游戏进度以便继续游戏。因此，只要用户使用相同的华为帐号登录，则可以在任意设备上按照之前的游戏进度继续游戏，即使用户之前的设备丢失、损毁或换了新设备也能继续之前的游戏进度。可参考 [游戏服务 - 业务介绍](https://developer.huawei.com/consumer/cn/doc/development/HMSCore-Guides/game-archive-0000001050121532) 和 [API 参考 - ArchivesClient](https://developer.huawei.com/consumer/cn/doc/development/HMSCore-References-V5/archivesclient-0000001050123603-V5)。

**方法名**：`archive`

**回调说明**：

| 扩展回调值 `sdkhub.UserResultCode.kUserExtension` | msg 类型 | msg 说明 |
| :--- | :--- | :--- |
| + 120 | String | 成功回调，需通过 `type` 判断调用类型，并获取其他参数。 |
| + 121 | String | 失败回调，需通过 `type` 判断调用类型。 |

此外还有两种特殊 `type` 回调类型可能需要处理：

- `archiveAdd`：当用户点击存档选择页面的 **添加存档** 按钮时会收到该回调。请调用 `addArchive` 方法，保存当前游戏记录。
- `archiveConflict`：发生 [存档冲突](https://developer.huawei.com/consumer/cn/doc/development/HMSCore-Guides/game-archive-0000001050121532#ZH-CN_TOPIC_0000001054212898__section77051130111812) 时请分析返回信息中的 `recentArchive` 和 `serverArchive` 对象，解决冲突后调用 `updateArchive` 方法。

**setScopeList**：

如果要使用存档功能，需要在玩家登录之前调用该方法，[申请 DRIVE_APP_DATA 的 SCOPE](https://developer.huawei.com/consumer/cn/doc/development/HMSCore-Guides/game-archive-0000001050121532#ZH-CN_TOPIC_0000001054212898__section8429103710593)，无需处理回调。

**示例**：

```js
var params = {
    "type": "setScopeList",
}

sdkhub.getUserPlugin().callFuncWithParam("archive", params);
```

**addArchive**：

以 **异步** 方式提交存档记录，只增加存档。即使应用客户端调用本方法时如果设备无网络，HMS Core SDK 也会先将数据缓存在本地，待网络恢复后用户再次登录时提交到华为服务器，开发者无需关注此方法的执行结果。

**参数说明**：

| 参数名 | 填写格式 | 说明 |
| :--- | :--- | :--- |
| activeTime | "10000" | 存档的时长。由开发者在提交存档时自行定义，Java 侧为 `long` 型。 |
| currentProgress | "50" | 存档的进度值。由开发者在提交存档时自行定义，Java 侧为 `long` 型。 |
| descInfo | "Savedata20" | 存档描述信息 |
| archiveDetails | "Savedata20, details..." | 需要写入存档文件的二进制字节数据 |
| thumbnail | "archiveIcon.png" | 存档封面图片，可选，需要放在可读写目录下 |
| thumbnailMimeType | "png"<br>"jpg" | 存档封面图片类型，可选 |
| isSupportCache | "0" | 是否支持网络异常时先缓存到本地，待网络恢复后再提交，默认为 "1"，支持。 |

**示例**：

```js
var params = {
    "type": "addArchive",
    "activeTime": "5000",
    "currentProgress": "50",
    "archiveDetails": "time = 5000, progress = 50",
    "descInfo": "Savedata20",
    "thumbnail": "archiveIcon.png",
    "thumbnailMimeType": "png",
    "isSupportCache" : "1", 
};

sdkhub.getUserPlugin().callFuncWithParam("archive", params);
```

**removeArchive**：

删除存档记录，包括华为游戏服务器和本地缓存中的存档记录。

**参数说明**：

| 参数名 | 填写格式 | 说明 |
| :--- | :--- | :--- |
| archiveId | "AA14I0V4G_gChJWeU_H2RRQalZZT5hvwA" | 要删除的存档的 ID。 |

**示例**：

```js
var params = {
    "type": "removeArchive",
    "archiveId": "AA14I0V4G_gChJWeU_H2RRQalZZT5hvwA",
};

sdkhub.getUserPlugin().callFuncWithParam("archive", params);
```

**getLimitThumbnailSize**：

获取服务器允许的封面图片文件的最大大小。

**示例**：

```js
var params = {
    "type": "getLimitThumbnailSize",
};

sdkhub.getUserPlugin().callFuncWithParam("archive", params);
```

**getLimitDetailsSize**：

获取服务器允许的存档文件的最大大小。

**示例**：

```js
var params = {
    "type": "getLimitDetailsSize",
};

sdkhub.getUserPlugin().callFuncWithParam("archive", params);
```

**getShowArchiveListIntent**：

打开存档选择页面。

**参数说明**：

| 参数名 | 填写格式 | 说明 |
| :--- | :--- | :--- |
| title | "Saved games" | 界面上展示的存档的名称 |
| allowAddBtn | "1" | 可选，是否允许新增存档按钮。默认为 “0”，不允许。 |
| allowDeleteBtn | "1" | 可选，是否允许新增删除存档按钮。默认为 “0”，不允许。 |
| maxArchive | "1" | 可选，展示存档的最大数量，默认为 "-1"，表示展示全部。 |

**示例**：

```js
var params = {
    "type": "getShowArchiveListIntent",
    "title": "Savedata",
    "allowAddBtn": "1",
    "allowDeleteBtn": "1",
    "maxArchive": "5",
};

sdkhub.getUserPlugin().callFuncWithParam("archive", params);
```

**getArchiveSummaryList**：

获取当前玩家的所有存档元数据，支持从本地缓存获取。

**参数说明**：

| 参数名 | 填写格式 | 说明 |
| :--- | :--- | :--- |
| isRealTime | "0" | 可选，是否联网获取数据，默认为 "1"。<br>"1"：表示从游戏服务器获取数据。<br>"0"：表示从本地缓存获取数据。本地缓存时间为 5 分钟，如果本地无缓存或缓存超时，则从游戏服务器获取。|

**示例**：

```js
var params = {
    "type": "getArchiveSummaryList",
    "isRealTime": "0",
};

sdkhub.getUserPlugin().callFuncWithParam("archive", params);
```

**loadArchiveDetails**：

使用存档 ID 打开存档元数据，支持指定 [冲突策略](https://developer.huawei.com/consumer/cn/doc/development/HMSCore-Guides/game-archive-0000001050121532#ZH-CN_TOPIC_0000001054212898__section77051130111812)。

**参数说明**：

| 参数名 | 填写格式 | 说明 |
| :--- | :--- | :--- |
| archiveId | "AA14I0V4G_gChJWeU_H2RRQalZZT5hvwA" | 存档 ID |
| diffStrategy | "STRATEGY_SELF"<br>"STRATEGY_ACTIVE_TIME"<br>"STRATEGY_TOTAL_PROGRESS"<br>"STRATEGY_LAST_UPDATE" | 选择解决冲突的策略。默认为 "STRATEGY_SELF"，不处理冲突。<br>"STRATEGY_ACTIVE_TIME"：游戏时长，在冲突的两个存档中使用游戏时长较长的存档处理冲突。<br>"STRATEGY_TOTAL_PROGRESS"：游戏进度，在冲突的两个存档中使用进度较快的存档来处理冲突。<br>"STRATEGY_LAST_UPDATE"：最近修改版本，在冲突的两个存档中使用最近修改的存档处理冲突。 |

**示例**：

```js
var params = {
    "type": "loadArchiveDetails",
    "archiveId": "AA14I0V4G_gChJWeU_H2RRQalZZT5hvwA",
    "diffStrategy": "STRATEGY_TOTAL_PROGRESS",
};

sdkhub.getUserPlugin().callFuncWithParam("archive", params);
```

**updateArchive**：

更新存档或解决数据冲突。

**参数说明**：

| 参数名 | 填写格式 | 说明 |
| :--- | :--- | :--- |
| selectArchive | "recentArchive"<br>"serverArchive" | 选择使用哪个存档来处理 `type = archiveConflict` 的冲突回调。若传入该参数，则其他参数都不生效。详情请参考文档 [解决冲突](https://developer.huawei.com/consumer/cn/doc/development/HMSCore-Guides/game-archive-0000001050121532#ZH-CN_TOPIC_0000001054212898__section77051130111812)。<br>"recentArchive"：选择本地缓存的存档作为最终存档。<br>"serverArchive"：选择从服务器获取的存档作为最终存档。 |
| archiveId | "AA14I0V4G_gChJWeU_H2RRQalZZT5hvwA" | 存档 ID |
| activeTime | "10000" | 存档的时长。由开发者在提交存档时自行定义，Java 侧为 `long` 型。 |
| currentProgress | "50" | 存档的进度值。由开发者在提交存档时自行定义，Java 侧为 `long` 型。 |
| descInfo | "Savedata20" | 存档描述信息 |
| archiveDetails | "Savedata20, details..." | 需要写入存档文件的二进制字节数据 |
| thumbnail | "archiveIcon.png" | 可选，存档封面图片，需要放在可读写目录下 |
| thumbnailMimeType | "png"<br>"jpg" | 可选，存档封面图片类型 |

**示例**：

```js
var params = {
    "type": "updateArchive",
    // "selectArchive": "recentArchive",
    "archiveId": "AA14I0V4G_gChJWeU_H2RRQalZZT5hvwA",
    "activeTime": "8000",
    "currentProgress": "60",
    "archiveDetails": "time=8000,progress=60",
    "descInfo": "savedata20",
    "thumbnail": "archiveIcon.png",
    "thumbnailMimeType": "png",
};

sdkhub.getUserPlugin().callFuncWithParam("archive", params);
```

#### 自动读取短信验证码

自动读取短信验证码方法，可选，可参考 [账号服务 - 自动读取短信验证码](https://developer.huawei.com/consumer/cn/doc/development/HMS-Guides/account-guide-v4#h1-1573730317319) 文档。本插件在 User 系统初始化时调用了请求开启短信读取服务，用户无需调用代码，**仅需处理回调**。

**回调说明**：

| 扩展回调值 `sdkhub.UserResultCode.kUserExtension` | msg 类型 | msg 说明 |
| :--- | :--- | :--- |
| + 102 | String | 自动读取短信验证码初始化回调 |
| + 103 | String | 自动读取短信验证码超时回调 |
| + 104 | String | 返回读取的短信验证码信息 |

### 支付插件

开发时请先参考 [Cocos SDKHub - 支付插件](../sdkhub.md/#支付插件)，本章节作为 HMS Core SDK 插件特性的补充说明部分。

HMS Core SDK 在 V3.0 后便不再支持支付服务端通知模式。目前支付流程是将支付回执先发给客户端，与苹果的 AppStore 的 In-App Purchase 较为接近。若用户从旧版本升级上来，请注意流程上的改动。

#### 支付商品

`feeForProduct` 支付方法，可参考 [应用内支付服务 - 发起购买](https://developer.huawei.com/consumer/cn/doc/development/HMS-Guides/iap-development-guide-v4#h1-1576554485195) 文档。

用户支付商品成功后，若为 **消耗型商品**，需要通过 [消耗型商品的补单机制](#%E6%B6%88%E8%80%97%E5%9E%8B%E5%95%86%E5%93%81%E7%9A%84%E8%A1%A5%E5%8D%95%E6%9C%BA%E5%88%B6--%E6%8F%90%E4%BE%9B%E9%9D%9E%E6%B6%88%E8%80%97%E5%9E%8B%E5%95%86%E5%93%81%E5%AF%B9%E5%BA%94%E7%9A%84%E6%9C%8D%E5%8A%A1) 进行核销。否则该商品不能再次调用支付商品方法并返回错误。

支付服务支持 [沙盒测试](https://developer.huawei.com/consumer/cn/doc/HMSCore-Guides-V5/sandbox-testing-0000001050035039-V5)。

HMS Core SDK 目前支付流程中，支付后的回执直接返回客户端。Cocos SDKHub 插件也封装了客户端层的 [对返回结果验签](https://developer.huawei.com/consumer/cn/doc/development/HMSCore-Guides-V5/verifying-signature-returned-result-0000001050033088-V5)。若用户还需要再做服务端验证，请参考 [Order 服务购买 Token 校验](https://developer.huawei.com/consumer/cn/doc/development/HMS-Guides/iap-order-service-purchase-token-verification-v4)。

由于 HMS Core SDK 现在要求商品都在后台配置，通过商品 ID 调用支付方法，仅需要传以下参数。

**参数说明**：

| 参数名 | 填写格式 | 说明 |
| :--- | :--- | :--- |
| Product_ID | "CProduct1" | 后台配置商品的商品 ID。 |
| EXT | "50extra" | 可选，对应 文档 `setDeveloperPayload`，支付透传参数。 |
| priceType | "0" | 可选，0/1/2 分别对应消耗型商品，非消耗型商品和订阅型商品，不传则默认为 "0"。 |

---

**以下方法需要通过 [扩展方法调用](../sdkhub.md/#扩展方法调用)。**

#### 判断是否支持应用内支付

判断是否支持应用内支付方法，在使用应用内支付之前，开发者的应用需要向华为 IAP 发送 isEnvReady 请求，以此判断用户当前登录的华为帐号所在的服务地，是否在华为 IAP 支持结算的国家或地区中。可参考 [应用内支付服务 - 判断是否支持应用内支付](https://developer.huawei.com/consumer/cn/doc/development/HMS-Guides/iap-development-guide-v4#h1-1576554507764) 文档。

**方法名**：`isEnvReady`

**参数说明**：无需参数。

**示例**：

```js
sdkhub.getFeePlugin().callFuncWithParam("isEnvReady");
```

**回调说明**：

| 扩展回调值 `sdkhub.FeeResultCode.kFeeExtension` | msg 类型 | msg 说明 |
| :--- | :--- | :--- |
| + 100 | JSON | 支持应用内支付情况描述 |
| + 101 | JSON / String | 不支持应用内支付情况描述 |

#### 展示商品信息 

展示商品信息方法，若开发者使用在华为 AppGallery Connect 网站上配置的商品，则需要在开发者的应用中使用 `obtainProductInfo` 接口来获取此类商品的详细信息。可参考 [应用内支付服务 - 展示商品信息方法](https://developer.huawei.com/consumer/cn/doc/development/HMS-Guides/iap-development-guide-v4#h1-1576554496306) 文档。

**方法名**：`obtainProductInfo`

**参数说明**：

| 参数名 | 填写格式 | 说明 |
| :--- | :--- | :--- |
| productIdList | "item1,item2" | 后台配置商品的商品 ID，若需传入多个以逗号分隔。 |
| priceType | "0" | 可选，0/1/2 分别对应消耗型商品，非消耗型商品和订阅型商品，不传则默认为 0。 |

**示例**：

```js
var params = {
    "productIdList": conf.obtainProductIdList,
    "priceType": 0
};

sdkhub.getFeePlugin().callFuncWithParam("obtainProductInfo", params);
```

**回调说明**：

| 扩展回调值 sdkhub.FeeResultCode.kFeeExtension | msg 类型 | msg 说明 |
| :--- | :--- | :--- |
| + 102 | JSONArray | 返回商品信息成功，可解析 msg 展示商品 |
| + 103 | JSON / String | 返回商品信息失败 |

#### 消耗型商品的补单机制 & 提供非消耗型商品对应的服务

可参考 [应用内支付服务 - 消耗型商品的补单机制](https://developer.huawei.com/consumer/cn/doc/development/HMS-Guides/iap-development-guide-v4#h1-1576554449972) 文档。

- 若用户购买的是 **消耗型商品**，则需要在获得支付商品回调信息，或者 `obtainOwnedPurchases` 返回的未发货回调信息后，调用 `consumeOwnedPurchase`，对已发货商品进行消耗。
- 若用户购买的是 **非消耗型商品**，则需要在获得支付商品回调信息后发货，但无需进行消耗。其他时段需要调用 `obtainOwnedPurchases` 同步下已购买的非消耗品商品是否已在发货状态。
- 若用户购买的是 **订阅型商品**，则返回该用户在此应用下已有的订阅关系，包括以下几种订阅关系：

    - 续期（正常使用，下周期会续费）。
    - 到期（下一周期不再续费，这个周期过后就变成已过期）。
    - 已过期（订阅服务不能再使用，但是仍能从订阅关系历史中查到）。

建议在游戏开始时调用 `obtainOwnedPurchases` 方法，获取用户还有哪些已购 **消耗型商品** 尚未发货并做处理，已购 **非消耗型商品** 是否发货状态与购买信息同步。

`obtainOwnedPurchases` 获取的回调 Array 里的信息，与支付商品成功回调信息格式一致，包含用商品购买信息及其签名数据。可使用公钥进行签名验证并做补发。

`consumeOwnedPurchase` 消耗商品接口也可以通过服务端调用，可参考 [Order 服务确认购买](https://developer.huawei.com/consumer/cn/doc/development/HMS-References/iap-api-confirm-purchase-for-order-service-v4) 文档。

[Sample 工程](#sample-%E5%B7%A5%E7%A8%8B) 中提供了一个简单的消耗型商品消耗流程，可供参考。

**查询用户所有已订购商品信息**

**方法名**：`obtainOwnedPurchases`

**参数说明**：

| 参数名 | 填写格式 | 说明 |
| :--- | :--- | :--- |
| type | 0 |  Number 型，0/1/2 分别对应消耗型商品、非消耗型商品、订阅商品。 |

**示例**：

```js
var params = 0;
sdkhub.getFeePlugin().callFuncWithParam("obtainOwnedPurchases", params);
```

**回调说明**：

| 扩展回调值 sdkhub.FeeResultCode.kFeeExtension | msg 类型 | msg 说明 |
| :--- | :--- | :--- |
| + 106 | JSONArray | 可解析 Array 中的，调用 consumeOwnedPurchase 方法  |
| + 107 | JSON / String | 操作失败描述 |

**对已发货商品进行消耗**

**方法名**：`consumeOwnedPurchase`

**参数说明**：

支付成功回调的 msg 转为 JSON 对象后，获取其中的 `inAppPurchaseData`。可参考 Sample 工程写法。

**示例**：

```js
params = conf.paymentReceipt[0]["inAppPurchaseData"];
sdkhub.getFeePlugin().callFuncWithParam("consumeOwnedPurchase", params);
```

**回调说明**：

| 扩展回调值 `sdkhub.FeeResultCode.kFeeExtension` | msg 类型 | msg 说明 |
| :--- | :--- | :--- |
| + 104 | String | 消耗品确认交易成功描述 |
| + 105 | JSON / String | 消耗品确认交易失败描述 |

#### 查看用户购买历史

查看用户购买历史方法，可参考 [应用内支付服务 - 查看用户购买历史](https://developer.huawei.com/consumer/cn/doc/development/HMS-Guides/iap-development-guide-v4#h1-1576554422714) 文档。对于消耗型商品，可使用该接口获取用户所有已消耗即已发货的商品信息。

**方法名**：`obtainOwnedPurchaseRecord`

**参数说明**：

| 参数名 | 填写格式 | 说明 |
| :--- | :--- | :--- |
| type | 0 |  Number 型，0/1/2 分别对应消耗型商品、非消耗型商品和订阅型商品。 |

**示例**：

```js
var params = 0;
sdkhub.getFeePlugin().callFuncWithParam("obtainOwnedPurchaseRecord", params);
```

**回调说明**：

| 扩展回调值 `sdkhub.FeeResultCode.kFeeExtension` | msg 类型 | msg 说明 |
| :--- | :--- | :--- |
| + 118 | JSONArray | 返回购买历史信息 |
| + 109 | JSON / String | 返回购买历史信息失败 |

#### 提供订阅管理的页面跳转 

提供订阅管理的页面跳转方法，可参考 [订阅专用功能说明 - 提供订阅管理的页面跳转](https://developer.huawei.com/consumer/cn/doc/development/HMS-Guides/iap-subscription-functions-v4#h1-1576566818427) 文档。开发者的应用可以通过该接口跳转到华为 IAP 的管理订阅页面和编辑订阅页面。

**方法名**：`startIapActivity`

**参数说明**：

| 参数名 | 填写格式 | 说明 |
| :--- | :--- | :--- |
| reqType | "TYPE_SUBSCRIBE_EDIT_ACTIVITY" | 若传入"TYPE_SUBSCRIBE_EDIT_ACTIVITY" 显示编辑订阅页面<br>若传入 "TYPE_SUBSCRIBE_MANAGER_ACTIVITY" 显示管理订阅页面。 |

**示例**：

```js
var params = {"reqType": "TYPE_SUBSCRIBE_MANAGER_ACTIVITY"};
sdkhub.getFeePlugin().callFuncWithParam("startIapActivity", params);
```

**回调说明**：

| 扩展回调值 sdkhub.FeeResultCode.kFeeExtension | msg 类型 | msg 说明 |
| :--- | :--- | :--- |
| + 110 | JSON | 打开页面成功描述 |
| + 111 | JSON / String | 打开页面失败描述 |

### 广告插件

开发时请先参考 [Cocos SDKHub - 广告插件](../sdkhub.md/#广告插件)，本章节作为 HMS Core SDK 插件特性的补充说明部分。

目前广告系统接入的是 [流量变现服务](https://developer.huawei.com/consumer/cn/doc/development/HMS-Guides/ads-sdk-introduction) 部分。接入广告形式为 [Banner](https://developer.huawei.com/consumer/cn/doc/development/HMS-Guides/ads-sdk-guide-banner)，[原生广告](https://developer.huawei.com/consumer/cn/doc/development/HMS-Guides/ads-sdk-guide-native)，[激励广告](https://developer.huawei.com/consumer/cn/doc/development/HMS-Guides/ads-sdk-guide-reward) 和 [插屏广告](https://developer.huawei.com/consumer/cn/doc/development/HMS-Guides/ads-sdk-guide-interstitial)。开屏和极速开屏广告若有需要用户可自己直接在工程中接入。

Reward 激励广告和 Interstitial 插屏广告均需要先调用 `preloadAds` 预加载方法，收到成功回调后，再调用 `showAds` 显示广告。Banner 条幅广告和 Native 原生广告，可直接调用 `showAds` 显示广告。

#### 预加载广告

**参数说明**：

| 参数名 | 填写格式 | 说明 |
| :--- | :--- | :--- |
| adType | "Interstitial"<br>"Reward"  | 广告类型 |
| adId | "testb4znbuh3n2" | 广告 ID |

**示例**：

```js
var params = { "adType": "Reward", "adId": "testx9dtjwj8hp" };
sdkhub.getAdsPlugin().preloadAds(params);
```

#### 显示广告

**参数说明**：

| 参数名 | 填写格式 | 说明 |
| :--- | :--- | :--- |
| adType | "Interstitial"<br>"Native"<br>"Reward"<br>"Banner"  | 广告类型 |
| adId | "testx9dtjwj8hp" | 广告 ID，Native 原生广告中，广告 ID 对应不同展示形式的原生广告 |
| pos | "0" | 广告位置，Banner 情况下可选，默认为 "0"。<br>"0"：正下方<br>"1"：正中<br>"2"：正上方 |
| adSize | "BANNER_SIZE_360_144" | 广告尺寸，Banner 情况下可选，默认为 "BANNER_SIZE_360_57"，传入值可参考 [广告尺寸](https://developer.huawei.com/consumer/cn/doc/development/HMS-Guides/ads-sdk-guide-banner#h1-1576047688608) 文档。 |
| nativeLayout | "native_small"<br>"native_full" | Native 情况下可选，对应插件自带的两种 [原生广告模板文件](https://developer.huawei.com/consumer/cn/doc/development/HMSCore-Guides/publisher-service-native-0000001050064968#ZH-CN_TOPIC_0000001057043311__section424619410104)，用户也可直接在对应 `.xml` 文件中修改布局，默认为 "native_full" |
| requestCustomDislikeThisAd | "1" | Native 情况下可选，[不再显示该广告](https://developer.huawei.com/consumer/cn/doc/development/HMSCore-Guides/publisher-service-native-0000001050064968#ZH-CN_TOPIC_0000001057043311__section8833172411816) 开关，用户可以自行隐藏或关闭不感兴趣的广告，默认值为 "0"，该功能大陆地区不可用，若需调试需要在 Log 中查看输出信息。 |
| choicesPosition | "TOP_LEFT"<br>"TOP_RIGHT"<br>"BOTTOM_RIGHT"<br>"BOTTOM_LEFT"<br>"INVISIBLE" | Native 广告且 `requestCustomDislikeThisAd` = "1" 情况下可选，[设置广告选项的展示位置](https://developer.huawei.com/consumer/cn/doc/HMSCore-References/nativeadconfiguration-builder-0000001050064912-V5#ZH-CN_TOPIC_0000001055645257__section8995193618112)，默认为 "TOP_RIGHT" |
| videoConfiguration | "1" | Native 情况下可选，[视频广告参数设置](https://developer.huawei.com/consumer/cn/doc/development/HMSCore-References-V5/videoconfiguration-builder-0000001050064890-V5)。默认为 "0"，设为 "1" 情况下，可设置以下参数 |
| audioFocusType | "GAIN_AUDIO_FOCUS_ALL"<br>"NOT_GAIN_AUDIO_FOCUS_WHEN_MUTE"<br>"NOT_GAIN_AUDIO_FOCUS_ALL" | Native 广告且 `videoConfiguration` = "1" 情况下可选，[设置视频的音频焦点类型](https://developer.huawei.com/consumer/cn/doc/development/HMSCore-References-V5/videoconfiguration-builder-0000001050064890-V5)，默认为 "GAIN_AUDIO_FOCUS_ALL" |
| startMuted | "0" | Native 广告且 `videoConfiguration` = "1" 情况下可选，[设置视频的初始静音状态](https://developer.huawei.com/consumer/cn/doc/development/HMSCore-References-V5/videoconfiguration-builder-0000001050064890-V5#ZH-CN_TOPIC_0000001057125174__section5378113754415)，默认为 "1" |

注意：使用 Native 原生广告，再次调用显示广告方法前，请确保先前的请求已经完成。

**示例**：

```js
var params = { "adType": "Banner", "adId": "testw6vs28auh3", "pos": "0", "adSize": "BANNER_SIZE_360_144" };
sdkhub.getAdsPlugin().showAds(params);
```

#### 隐藏广告

**参数说明**：

| 参数名 | 填写格式 | 说明 |
| :--- | :--- | :--- |
| adType | "Native"<br>"Banner" | 广告类型 |

**示例**：

```js
var params = { "adType": "Native" };
sdkhub.getAdsPlugin().hideAds(params);
```

### 推送插件

开发时请先参考 [Cocos SDKHub - 推送插件](../sdkhub.md/#推送插件)，本章节作为 HMS Core SDK 插件特性的补充说明部分。

调试推送功能时，需要调用 [开始推送](../sdkhub.md/#开始推送) `startPush` 方法，成功回调 msg 信息即为 `Push Token`，再到后台进行推送操作。

HMS Core SDK 不支持 [设置别名](../sdkhub.md/#设置别名) 和 [删除别名](../sdkhub.md/#删除别名) 功能。

HMS Core SDK 的 [设置标签](../sdkhub.md/#设置标签) 和 [删除标签](../sdkhub.md/#删除标签) 接口每次只能设置一条，若开发者按文档传入多个标签，则会有多次回调，该回调一般无需处理。

---

**以下方法需要通过 [扩展方法调用](../sdkhub.md/#扩展方法调用)。**

#### 设置是否显示通知栏消息

可参考 [推送服务 - 设置是否显示通知栏消息](https://developer.huawei.com/consumer/cn/doc/development/HMS-Guides/push-basic-capability#h2-1576658726104)。通知消息是由系统直接在通知中心下拉列表呈现的即时消息。开发者如果想控制应用是否允许显示通知栏消息，可以调用以下接口。如果开发者不调用此接口，系统默认是允许显示通知栏消息。

该功能无法获取当前状态，用户需要在需要的情况下主动调用。

**打开显示通知栏消息**

**方法名**：`turnOnPush`

**参数说明**：无需参数。

**示例**：

```js
sdkhub.getPushPlugin().callFuncWithParam("turnOnPush");
```

**回调说明**：

| 扩展回调值 `sdkhub.PushResultCode.kPushExtension` | msg 类型 | msg 说明 |
| :--- | :--- | :--- |
| + 100 | String | 打开显示通知栏消息方法调用成功描述 |
| + 101 | JSON / String | 打开显示通知栏消息方法调用失败描述 |

**关闭显示通知栏消息**

**方法名**：`turnOffPush`

**参数说明**：无需参数。

**示例**：

```js
sdkhub.getPushPlugin().callFuncWithParam("turnOffPush");
```

**回调说明**：

| 扩展回调值 `sdkhub.PushResultCode.kPushExtension` | msg 类型 | msg 说明 |
| :--- | :--- | :--- |
| + 102 | String | 关闭显示通知栏消息方法调用成功描述 |
| + 103 | JSON / String | 关闭显示通知栏消息方法调用失败描述 |

#### 发送上行消息

发送上行消息功能，可参考 [推送服务 - 发送上行消息](https://developer.huawei.com/consumer/cn/doc/development/HMS-Guides/push-upstreammessagesending) 文档。该方法仅提供客户端接口，若用户需要接入，需要参考文档完成服务端部分。

**方法名**：`sendMessage`

**参数说明**：

仅有 `messageId` 为必传，部分参数可对应文档 [RemoteMessage.Builder](https://developer.huawei.com/consumer/cn/doc/development/HMSCore-References-V5/remotemessage-builder-0000001050413831-V5)，传入指定参数便会调用相关方法。传入其他 Key 和 Value 值，便可用来上行给服务端。

| 参数名 | 填写格式 | 说明 |
| :--- | :--- | :--- |
| messageId | "mid123456"  | 需要保证该参数的唯一性 |
| messageType | "mType1" | 发送上行消息时设置的消息类型，SDK 不感知，直接透传 |
| collapseKey | "0" | 可选，设置消息分类标识，用于控制离线消息的覆盖功能.<br>"-1"：是，对于本应用的离线消息待用户上线后全部发送给用户。<br>"0"：对于本应用的离线消息待用户上线后按照华为推送系统默认策略发送给用户（一般是最新的一条）。<br>"1~100"：是对消息进行分组，例如如果开发者发送了10条消息，其中前5条的collapse_key为1，后5条的collapse_key为2，那么待用户上线后collapse_key为1和2的分别下发最新的一条消息给最终用户。 |
| sendMode | "1" | 可选，设置是否使用终端设备上Push的消息缓存重发能力。如果不设置则不支持消息缓存，比如当网络不可用时消息会直接丢弃。取值只有 "0" 与 "1"，"1" 表示使用消息缓存重发能力。 |
| receiptMode | "0" | 可选，设置上行消息发送到App服务器后的消息回执能力。取值只有 "0" 与 "1"，"1" 表示使用消息回执能力。 |
| ttl | "10000" | 可选，设置消息的最大缓存时间，单位秒，支持设置最大15天 [0, 1296000]。 |
| 其他 key 值 | 其他 Value 值 | 可传任意多组，上行给服务端的信息。 |

**示例**：

```js
 var params = {
    "messageId": "messageId" + Math.ceil(Math.random() * 100000),
    "messageType": "mType1",
    "collapseKey": "0",
    "sendMode": "1",
    "receiptMode": "1",
    "ttl": "10000",
    "key1": "value1",
    "key2": "value2",
    "key3": "value3"
}
sdkhub.getPushPlugin().callFuncWithParam("sendMessage", params);
```

**回调说明**：

| 扩展回调值 `sdkhub.PushResultCode.kPushExtension` | msg 类型 | msg 说明 |
| :--- | :--- | :--- |
| + 104 | String | 消息发送成功，返回 msgId |
| + 105 | String | 消息发送时发生错误，返回失败描述 |
| + 106 | String | 消息已经送达，返回 msgId |

#### 获取 ODID

异步任务获取 ODID，可参考 [推送服务 - getOdid](https://developer.huawei.com/consumer/cn/doc/development/HMSCore-References-V5/opendeviceclient-0000001050831617-V5#ZH-CN_TOPIC_0000001050831617__section1788692510237)。

**方法名**：`getOdid`

**示例**：

```js
sdkhub.getPushPlugin().callFuncWithParam("getOdid");
```

**回调说明**：

| 扩展回调值 `sdkhub.PushResultCode.kPushExtension` | msg 类型 | msg 说明 |
| :--- | :--- | :--- |
| + 108 | String | 返回获取的 ODID |
| + 109 | String | 发生错误，返回失败描述 |

#### 获取 AAID

异步任务获取 AAID，可参考 [推送服务 - getAAID](https://developer.huawei.com/consumer/cn/doc/HMSCore-References-V5/hms-instanceid-0000001050255634-V5#ZH-CN_TOPIC_0000001050255634__section14116320143111)。

**方法名**：`getAAID`

**示例**：

```js
sdkhub.getPushPlugin().callFuncWithParam("getAAID");
```

**回调说明**：

| 扩展回调值 `sdkhub.PushResultCode.kPushExtension` | msg 类型 | msg 说明 |
| :--- | :--- | :--- |
| + 110 | String | 返回获取的 AAID |
| + 111 | String | 发生错误，返回失败描述 |

#### 删除 AAID

删除本地已经生成的 AAID，可参考 [推送服务 - deleteAAID](https://developer.huawei.com/consumer/cn/doc/HMSCore-References-V5/hms-instanceid-0000001050255634-V5#ZH-CN_TOPIC_0000001050255634__section8856440133116)。

**方法名**：`deleteAAID`

**示例**：

```js
sdkhub.getPushPlugin().callFuncWithParam("deleteAAID");
```

**回调说明**：

| 扩展回调值 `sdkhub.PushResultCode.kPushExtension` | msg 类型 | msg 说明 |
| :--- | :--- | :--- |
| + 112 | String | 删除成功，返回成功描述 |
| + 113 | String | 删除失败，返回失败描述 |

#### 获取自动初始化

获取是否启用了自动初始化功能，可参考 [isAutoInitEnabled](https://developer.huawei.com/consumer/cn/doc/HMSCore-References-V5/hmsmessaging-0000001050255650-V5#ZH-CN_TOPIC_0000001050255650__section768215326488)。

**方法名**：`isAutoInitEnabled`

**示例**：

```js
var isAuto = sdkhub.getPushPlugin().callBoolFuncWithParam("isAutoInitEnabled");
console.log("isAutoInitEnabled", isAuto);
```

### 设置自动初始化

设置是否自动初始化。如果设置为 true，SDK 会自动生成 AAID，自动申请令牌 Token，申请的令牌通过 `sdkhub.PushResultCode.kPushExtension + 100` 回调方法返回。可参考 [setAutoInitEnabled](https://developer.huawei.com/consumer/cn/doc/HMSCore-References-V5/hmsmessaging-0000001050255650-V5#ZH-CN_TOPIC_0000001050255650__section19198183125511)。

**方法名**：`setAutoInitEnabled`

**示例**：

```js
var params = 1 - sdkhub.getPushPlugin().callBoolFuncWithParam("isAutoInitEnabled");
sdkhub.getPushPlugin().callFuncWithParam("setAutoInitEnabled", params);
```


