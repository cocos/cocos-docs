# HUAWEI HMS Core Plug-in User Guide

Currently, the Huawei HMS Core plug-in provided by Cocos SDKHub includes [Game Service](https://developer.huawei.com/consumer/en/hms/huawei-game), [In-App Purchases](https://developer.huawei.com/consumer/en/hms/huawei-iap), [Ads Kit](https://developer.huawei.com/consumer/en/hms/huawei-adskit), and some [Account Kit](https://developer.huawei.com/consumer/en/hms/huawei-accountkit) function, the user needs to call the Cocos SDKHub interface at the JS layer to handle the callback.

**Account & Game Service**, **In-App Purchases** and **Ads Kit** in the plug-in can be used independently.

The Cocos SDKHub framework and plug-ins basically do not involve current state processing and server-side interfaces, such as whether the current user is logged in, etc., the game side needs to judge to avoid calling accounts and other game service interfaces when the user is not logged in. In the case of payment, the HUAWEI HMS Core plug-in does local verification, but when the user needs to log in or pay server verification (optional), please use the information in the callback to verify by yourself on the server.

- [Verifying the Sign-in Signature](https://developer.huawei.com/consumer/en/doc/development/HMS-References/verify-login-signature)
- [Verifying the Purchase Token for the Order Service](https://developer.huawei.com/consumer/en/doc/development/HMS-Guides/iap-order-service-purchase-token-verification-v4)

## Preparation Work

- Refer to [AppGallery Connect Configuration](https://developer.huawei.com/consumer/en/doc/development/HMS-Guides/account-preparation#h1-1-configuring-appgallery-connect) document to complete developer registration, app creation, generation and configuring the Signing Certificate Fingerprint and enabling required services.
- Integrate the work of HMS Core SDK, Cocos SDKHub will **automatically complete** when building, no need to pay attention.
- If you need to use the IAP function, please prepare the bank card of the registered developer in advance, and fill in the relevant payment information. It may take 1-2 business days for review after submission.
- Need to test on Huawei or Honor brand phones with HMS Core service installed.

## Enable Cocos SDKHub

- Use Cocos Creator to open the project that needs to be connected to Cocos SDKHub.

- Click **Panel -> Service** in the menu bar to open the **Service** panel. After setting Cocos AppID, select Cocos SDKHub to enter the Cocos SDKHub service panel. Then click the **Enable** button on the upper right to activate the Cocos SDKHub service. For details, please refer to the [Cocos Service Operation Guide](../../cocos-service/index.md) documentation.

  ![](sdkhub-hms/hms-provisioning.png)

- Add a new config set on the Cocos SDKHub service panel
    
  ![](sdkhub-hms/hms-config-group1.png)

  Enter the **Add Config Set** page, fill in the relevant parameters, and then click **OK**.

  ![](sdkhub-hms/hms-config-group2.png)

- After adding, click the **Config Plugin** button and check **HUAWEI HMS Core** related service plugins.
 
  ![](sdkhub-hms/hms-config-group3.png)

- Click the **Edit Parameters** button under the **Params** list.

  ![](sdkhub-hms/hms-config-group4.png)

  Enter the **Parameter Config** panel to configure the required parameters.

  ![](sdkhub-hms/hms-params.png)

  - **HMS Config file**: `agconnect-services.json` configuration file, which can be obtained in the developer background after creating the project.

    ![](sdkhub-hms/hms-configfile.png)
    
  - [Payment public key](https://developer.huawei.com/consumer/en/doc/development/HMS-Guides/appgallery_querypaymentinfo), which is required when checking IAP service.

    ![](sdkhub-hms/hms-paykey.png)
    
  - [Support Languages](https://developer.huawei.com/consumer/en/doc/development/HMS-Guides/game-preparation-v4)

    - This parameter is optional. If your application does not need to be set to only support certain specific languages, this parameter can be set to empty, and the application will support all languages ​​supported by HMS Core SDK by default.
      - If your application needs to be set to only support certain specific languages, fill in the format as **"en", "zh-rCN", "other languages ​​to be supported"**.
      - For the list of languages ​​supported by HMS Core SDK, please refer to the [Language Supported by HMS SDK](https://developer.huawei.com/consumer/en/doc/development/HMS-Guides/hmssdk_supported_language).

- After the configuration is completed and the relevant interface is connected, you can use the **Project -> Build...** in the menu bar of the Creator editor to open the **Build** panel to build the project. For Creator 2.4.1 and above, please refer to the [Publish to HUAWEI AppGallery Connect](../../publish/publish-huawei-agc.md) document. Users of older versions can build and publish to the Android platform.

- If you need to modify the project parameter configuration or JS code layer, after the modification is completed, just rebuild it in the build panel.

- If you need to delete the service plug-in configuration (for example, remove the IAP function), it is recommended to delete the release package `build/jsb-link` or `build/jsb-default` directory generated after the project is built, and then rebuild.

## Get Simple Project

Click the **Sample** button in the Cocos SDKHub service panel, clone or download, and open the project in Cocos Creator. You can refer to document [Cocos SDKHub Simple project](../sdkhub.md#sample-project) for the usage of the **Sample** project.

## API interface description of each system

### UserPlugin User & Game System

There are many methods in the Huawei system, and some interfaces need to be called by extension methods and return extension callbacks. It may be necessary to refer to the code in the Sample and Huawei's official documents to call.

#### login

Login method, please refer to the [Game Service - Game Signing In](https://developer.huawei.com/consumer/en/doc/development/HMS-Guides/game-login-v4) document.

After successfully logging in to HUAWEI HMS Core SDK, the plug-in will call the [getCurrentPlayer](https://developer.huawei.com/consumer/en/doc/development/HMSCore-Guides-V5/game-login-0000001050121526-V5#EN-US_TOPIC_0000001051062343__section774619121231) method of HUAWEI HMS Core SDK to obtain the current player information, and return it to the user through a callback. The user can also actively call the `getUserInfo` method to obtain the login information. The **userID** parameter can be read as the user's unique ID. At this time, you can also call [Verifying the Sign-in Signature](https://developer.huawei.com/consumer/en/doc/development/HMS-References/verify-login-signature)  to verify the obtained sign-in signature of a player.

#### logout

How ​​to logout, please refer to the [Account Kit - Signing Out from HUAWEI ID](https://developer.huawei.com/consumer/en/doc/development/HMS-Guides/account-guide-v4#h1-3-signing-out-from-huawei-id) document. The HMS SDK will clean up the login information of the Huawei account, and the game client needs to judge the login status by itself.

#### getUserInfo

Get user information method, the HMS plug-in will return the callback information in the login method.

#### showToolBar / hideToolBar

Float method, please refer to the [Game Service - Floating Window](https://developer.huawei.com/consumer/en/doc/development/HMS-Guides/game-buoy-v4#h1-1589542791824) document. Since the plug-in has already called these two methods in the life cycle of `onResume` and `onPause`, **users no longer need to make active calls**.

#### showAchievement

How ​​to display achievements, please refer to the [Game Services - Achievements](https://developer.huawei.com/consumer/en/doc/development/HMS-Guides/game-achievement) document.

**Parameter Description**:

| Parameter name | Fill in requirements | Description |
| :--- | :--- | :--- |
| type | "getShowAchievementListIntent"<br>"getAchievementList" | Jump directly or execute the display achievement list |
| forceReload | "1" | "getAchievementList" Optional parameters: <br>"0": not connected to the network, means to obtain from the local cache<br>"1": to network, means to obtain directly from the game server.<br>The default is "1" |

#### unlockAchievement

How ​​to unlock achievements, please refer to the [Game Services - Achievements](https://developer.huawei.com/consumer/en/doc/development/HMS-Guides/game-achievement) document.

**Parameter Description**:

| Parameter name | Fill in requirements | Description |
| :--- | :--- | :--- |
| type | "visualizeWithResult"<br>"growWithResult"<br>"makeStepsWithResult"<br>"reachWithResult" | Corresponding document methods |
| achievementId | "5D9580837D32CB59Cxxx" | Achievement ID generated after background configuration |
| stepsNum | "50" | The step length of the current achievement, this parameter is required for growWithResult and makeStepsWithResult |

#### showLeaderBoard

How ​​to display leaderboards, please refer to the [Game Service - Leaderboards](https://developer.huawei.com/consumer/en/doc/development/HMS-Guides/game-leaderboards-development) document.

**Parameter Description**:

| Parameter name | Fill in requirements | Description |
| :--- | :--- | :--- |
| type | "getRankingsIntent"<br>"getRankingSummary"<br>"getCurrentPlayerRankingScore"<br>"getPlayerCenteredRankingScores"<br>"getMoreRankingScores"<br>"getRankingTopScores" | The corresponding sub-methods of the document: directly display the ranking of the application assistant And display the leaderboard list by yourself. |
| rankingId | "5D9580837D32CB59Cxxx" | Optional, do not pass this parameter if you need to get all the rankings.|
| timeDimension | "1" | Optional, the specified time dimension in the case of "getRankingsIntent" "getCurrentPlayerRankingScore" "getRankingTopScores".<br>"0": day, which means to get the leaderboard data of the day.<br>"1": Week, which means to get the ranking data of this week.<br>"2": All time. It needs to be passed in at the same time as rankingId. |
| isRealTime | "1" | Optional, specify the acquisition method in the case of "getRankingSummary", "getRankingTopScores", and getPlayerCenteredRankingScores.<br>"0": Not connected to the Internet, which means it is obtained from the local cache.<br>"1": Internet connection, which means to obtain directly from the game server.<br>The default is "1". |
| maxResults | "15" | "getMoreRankingScores", "getPlayerCenteredRankingScores", "getRankingTopScores" The maximum number of required parameters per page, and supports integers from 1 to 21. |
| offsetPlayerRank | "1" | "getMoreRankingScores" must be passed, "getPlayerCenteredRankingScores" and "getRankingTopScores" are optional. One page of data is obtained from the position specified by offsetPlayerRank according to the data acquisition direction specified by pageDirection. The value of offsetPlayerRank must be greater than or equal to 0 Integer. <br>For example, the value of offsetPlayerRank is 5, and the value of pageDirection is 0, which means that one page of data is obtained from the score of the fifth place in the ranking. |
| pageDirection | "0" | "getRankingTopScores", "getPlayerCenteredRankingScores" Optional, data acquisition direction.<br>"0": next page.<br>"1": previous page.<br>The default is "0". |

#### submitScore

How ​​to submit scores, please refer to the [Game Service - Leaderboards](https://developer.huawei.com/consumer/en/doc/development/HMS-Guides/game-leaderboards-development) document.

**Parameter Description**:

| Parameter name | Fill in requirements | Description |
| :--- | :--- | :--- |
| type | "getRankingSwitchStatus"<br>"setRankingSwitchStatus"<br>"submitRankingScore" | Corresponding to each sub-method of the document. |
| stateValue | "1" | setRankingSwitchStatus needs to be passed in, the leaderboard switch status, the default is 0, and it needs to be set to 1 to submit scores. |
| rankingId | "5D9580837D32CB59Cxxx" | submitRankingScore needs to be passed in, the ranking ID generated after background configuration |
| score | "10000" | submitRankingScore The situation needs to be passed in. The score to be submitted to the leaderboard, long type. |
| scoreTips | "Gold Coins" | submitRankingScore is optional, and needs to be passed in if there is a custom unit. |

#### callFuncWithParam

Need to call the interface description through the extension method:

#### `cancelAuthorization`

Huawei account revoking authorization, please refer to the [Account Kit - Revoking HUAWEI ID Authorization](https://developer.huawei.com/consumer/en/doc/development/HMS-Guides/account-guide-v4#h1-5-canceling-huawei-id-authorization) document, in order to improve the privacy and security of the application, the application can provide an entry for the user to cancel the authorization of the application.

**Callback Description**:

| Extension callback value sdkhub.UserResultCode.kUserExtension | msg type | msg description |
| :--- | :--- | :--- |
| + 122 | String | Description of successful cancellation of login authorization |
| + 123 | String | Description of failed login authorization cancellation |

#### `submitPlayerEventStart`/`submitPlayerEventEnd`/`getPlayerExtraInfo`

For game addiction prevention methods, please refer to the [Game Service - Game addiction prevention](https://developer.huawei.com/consumer/en/doc/development/HMS-Guides/game-anti-indulgence-v4) document. Games released in Mainland China require developers to complete the development of the anti-addiction function of the game in accordance with the above notice and the game itself.

- When the player logs in to the game or switches from the background to the foreground of the game, call `submitPlayerEventStart`. The game periodically calls the `getPlayerExtraInfo` method to query additional player information. The highest frequency allowed by the server is a query every 10 minutes, and it is generally recommended to query every 15 minutes. When the player exits the game, switches from the foreground to the background, or the game exits abnormally (process termination, phone restart, etc.), the application calls `submitPlayerEventEnd` to report the player's exit event.

- Precautions: In `submitPlayerEventStart` and `getPlayerExtraInfo`, if retCode returns 7002 or 7006 error code in the callback, the following processing is required:

  - 7002: It is necessary to judge whether it is a network problem. If it is not a network problem, it means that the account is not registered in mainland China. Please let it go directly without compulsory processing.

  - 7006: It means that the account is not registered in mainland China, please let it go directly without compulsory processing.

**Callback Description**:

| Extension callback value `sdkhub.UserResultCode.kUserExtension` | msg type | msg description |
| :--- | :--- | :--- |
| + 106 | JSON | Report the player's successful entry into the game event, and obtain the parameter transactionId |
| + 107 | JSON / String | Report failure of player entering game event |
| + 108 | JSON | Report the player exiting the game event successfully, you can get the parameter traceId |
| + 109 | JSON / String | Failed to report the player exiting the game event |
| + 110 | JSON | Query player additional information is successful, you can get parameters isRealName, isAdult, playerId, playerDuration |
| + 111 | JSON / String | Failed to query additional player information |

#### `submitEvent`

Event reporting method, please refer to the [Game Service - Game Events](https://developer.huawei.com/consumer/en/doc/development/HMS-Guides/game-events) document. Incident reporting provides developers with the ability to collect specific data generated by players during the game, report and store it to Huawei game servers, and then perform inductive analysis on AppGallery Connect.

**Parameter Description**:

| Parameter name | Fill in requirements | Description |
| :--- | :--- | :--- |
| eventId | "5D9580837D32CB59Cxxx" | The ID of the current event, generated when the event is configured, and obtained in the background. |
| growAmount | "20" | The value to increase incrementally on the basis of the existing event value. |

**Callback Description**:

| Extension callback value `sdkhub.UserResultCode.kUserExtension` | msg type | msg description |
| :--- | :--- | :--- |
| + 112 | String | Call event report callback, return without success or failure |

#### `getEvent`

To obtain player event data, please refer to the [Game Service - Game Events](https://developer.huawei.com/consumer/en/doc/development/HMS-Guides/game-events) document.

**Parameter Description**:

| Parameter name | Fill in requirements | Description |
| :--- | :--- | :--- |
| forceReload | "1" | Optional, default is "1".<br>"0": Not connected to the Internet, which means to obtain from the local cache.<br>"1": Internet connection, which means to obtain directly from the game server. |
| eventIds | "eventId1,eventId2" | Pass in event ID to obtain specific event data, separated by commas. |

**Callback Description**:

| Extension callback value `sdkhub.UserResultCode.kUserExtension` | msg type | msg description |
| :--- | :--- | :--- |
| + 114 | JSON | If the event data is successfully obtained, the parameter eventId can be obtained. |
| + 115 | JSON / String | Description of failure to obtain event data |

#### `getGamePlayerStats`

For player information statistics method, please refer to the [Game Service - Player Statistics](https://developer.huawei.com/consumer/en/doc/development/HMS-Guides/game-playerinfo-development) document. Player information statistics means that developers can obtain various statistical information of current players in the game from Huawei game servers, helping developers to have a deeper understanding of the player’s game habits, so as to build a more suitable game experience based on the player's game progress, payment ability and so on.

**Parameter Description**:

| Parameter name | Fill in requirements | Description |
| :--- | :--- | :--- |
| isRealTime | 0 | Number Type<br>1: Yes, it means to get data from the game server. <br>0: No, it means to get data from local cache. The local cache time is 5 minutes. If there is no local cache or the cache expires, it will be obtained from the game server. |

**Callback Description**:

| Extension callback value `sdkhub.UserResultCode.kUserExtension` | msg type | msg description |
| :--- | :--- | :--- |
| + 116 | JSON | Get the event data successfully, you can get the parameters averageOnLineMinutes, daysFromLastGame, paymentTimes, onlineTimes, totalPurchasesAmountRange |
| + 117 | JSON / String | Description of failure to obtain event data |

#### `getGameSummary`

How ​​to get basic game information, please refer to the [Game Service - Basic Game Information](https://developer.huawei.com/consumer/en/doc/development/HMS-Guides/game-baseinfo-development) document. The basic game information refers to the related information of the game application, such as the game application ID, game name, game description, game category, etc. When developers need to use game application information in a game, they can obtain basic game information from Huawei game servers.

**Parameter Description**:

| Parameter name | Fill in requirements | Description |
| :--- | :--- | :--- |
| isLocal | 0 | Number type<br>1: Yes, it means to get data from the game server.<br>0: No, it means to get data from local cache. |

**Callback Description**:

| Extension callback value `sdkhub.UserResultCode.kUserExtension` | msg type | msg description |
| :--- | :--- | :--- |
| + 118 | JSON | Get the event data successfully, you can get the parameters achievementCount, appId, descInfo, gameName, gameHdImgUri, gameIconUri, rankingCount, firstKind, secondKind |
| + 119 | JSON / String | Description of failure to obtain event data |

#### ReadSmsManager

Automatically read SMS method, optional, please refer to the [Account Kit - Automatically Retrieving SMS Verification Code](https://developer.huawei.com/consumer/en/doc/development/HMS-Guides/account-guide-v4#h1-6-automatically-retrieving-sms-verification-code) documentation. This plug-in calls the request to start the SMS reading service when the User system is initialized, the user does not need to call the code, only needs to handle the callback.

**Callback Description**:

| Extension callback value `sdkhub.UserResultCode.kUserExtension` | msg type | msg description |
| :--- | :--- | :--- |
| + 102 | String | Automatically read SMS verification code initialization callback |
| + 103 | String | Automatically read SMS verification code timeout callback |
| + 104 | String | Return the read SMS verification code information |

### FeePlugin payment system

Considering the past experience of Apple’s IAP review and other issues, we set the payment keyword as `fee`.

#### feeForProduct

`feeForProduct` payment method, please refer to the [In-App Purchases - Initiating a Purchase](https://developer.huawei.com/consumer/en/doc/development/HMS-Guides/iap-development-guide-v4#h1-1576554870650) document. Since Huawei now requires that the products are configured in the background, only the following parameters need to be passed.

**Parameter Description**:

| Parameter name | Fill in requirements | Description |
| :--- | :--- | :--- |
| Product_ID | "CProduct1" | The product ID of the background configuration product. |
| priceType | "0" | Optional, 0/1/2 respectively correspond to consumable products, non-consumable products and subscription products, if not passed, the default is "0". |
| EXT | "50extra" | Optional, corresponding to `setDeveloperPayload`, payment transparent transmission parameters. |

#### callFuncWithParam

Need to call the interface description through the extension method:

#### `isEnvReady`

Determine whether the in-app payment method is supported, before using in-app payment, your app needs to send an isEnvReady request to HUAWEI IAP to determine whether the service location where the user’s currently logged-in Huawei account is located in HUAWEI IAP supports settlement Countries or regions. You can refer to [In-App Purchases - Checking the Support for HUAWEI IAP](https://developer.huawei.com/consumer/en/doc/development/HMS-Guides/iap-development-guide-v4#h1-1576554855637) Document.

**Callback Description**:

| Extension callback value `sdkhub.FeeResultCode.kFeeExtension` | msg type | msg description |
| :--- | :--- | :--- |
| + 100 | JSON | Support in-app payment description |
| + 101 | JSON / String | Does not support in-app payment description |

#### `obtainProductInfo`

Method of displaying product information, if you use the product configured on the HUAWEI AppGallery Connect website, you need to use the `obtainProductInfo` interface in your application to obtain the detailed information of such product. You can refer to the [In-App Purchases - Presenting Product Information](https://developer.huawei.com/consumer/en/doc/development/HMS-Guides/iap-development-guide-v4#h1-1576554863216) document.

**Parameter Description**:

| Parameter name | Fill in requirements | Description |
| :--- | :--- | :--- |
| productIdList | "item1,item2" | The product ID of the background configuration product, if you need to pass in more than one, separated by commas. |
| priceType | "0" | Optional, 0/1/2 respectively correspond to consumable products, non-consumable products and subscription products. If not passed, the default is 0. |

**Callback Description**:

| Extension callback value `sdkhub.FeeResultCode.kFeeExtension` | msg type | msg description |
| :--- | :--- | :--- |
| + 102 | JSONArray | Return product information successfully, parseable msg Display product |
| + 103 | JSON / String | Failed to return product information |

#### `obtainOwnedPurchases`

To obtain purchase information of consumable products that users have purchased but not shipped, please refer to the [In-App Purchases - Redelivering a Consumable Product](https://developer.huawei.com/consumer/en/doc/development/HMS-Guides/iap-development-guide-v4#h1-1576554889527) document. Obtain the purchase information of consumable products that the user has purchased but not shipped. If there are any products that the user has purchased but have not shipped, the callback will include the purchase information and signature data of the product. The public key can be used for signature verification and reissue.

It is recommended to call it at the beginning of the game to get the user's other purchases that have not been shipped and handle it.

**Parameter Description**:

| Parameter name | Fill in requirements | Description |
| :--- | :--- | :--- |
| type | 0 | Number type, 0/1/2 correspond to consumable products, non-consumable products and subscription products respectively. |

**Callback Description**:

| Extension callback value sdkhub.FeeResultCode.kFeeExtension | msg type | msg description |
| :--- | :--- | :--- |
| + 106 | JSONArray | Parsable Array, call consumeOwnedPurchase method |
| + 107 | JSON / String | Operation failure description |

#### `consumeOwnedPurchase`

Consumption of shipped products, please refer to the [In-App Purchases - Redelivering a Consumable Product](https://developer.huawei.com/consumer/en/doc/development/HMS-Guides/iap-development-guide-v4#h1-1576554889527) document. After confirming that the product has been shipped, use this interface to consume all the shipped products to notify the Huawei server to update the shipping status of the product. For consumable products, after the application successfully executes the consumption, the Huawei server will reset the corresponding product to the purchaseable state, and the user can purchase the product again.

This interface can also be called through the server, please refer to the [Purchase Confirmation for the Order Service](https://developer.huawei.com/consumer/en/doc/development/HMS-References/iap-api-confirm-purchase-for-order-service-v4) document.

**Callback Description**:

| Extension callback value `sdkhub.FeeResultCode.kFeeExtension` | msg type | msg description |
| :--- | :--- | :--- |
| + 104 | String | Description of consumable confirmation transaction success |
| + 105 | JSON / String | Description of consumables confirmation transaction failure |

#### `obtainOwnedPurchaseRecord`

View user purchase history, please refer to the [In-App Purchases - Viewing the Purchase History](https://developer.huawei.com/consumer/en/doc/development/HMS-Guides/iap-development-guide-v4#h1-1576554905268) document. For consumable goods, this interface can be used to obtain the user's all consumed or shipped product information.

**Parameter Description**:

| Parameter name | Fill in requirements | Description |
| :--- | :--- | :--- |
| type | 0 | Number type, 0/1/2 correspond to consumable products, non-consumable products and subscription products respectively. |

**Callback Description**:

| Extension callback value `sdkhub.FeeResultCode.kFeeExtension` | msg type | msg description |
| :--- | :--- | :--- |
| + 118 | JSONArray | Return to purchase history information |
| + 109 | JSON / String | Failed to return purchase history information |

#### `startIapActivity`

Provide subscription management page redirection, please refer to the [Subscription - Redirecting to the Subscription Management or Editing Page](https://developer.huawei.com/consumer/en/doc/development/HMS-Guides/iap-subscription-functions-v4#h1-1590474395823) document. Developer applications can jump to the management subscription page and edit subscription page of HUAWEI IAP through this interface.

**Parameter Description**:

| Parameter name | Fill in requirements | Description |
| :--- | :--- | :--- |
| reqType | "TYPE_SUBSCRIBE_EDIT_ACTIVITY" | If "TYPE_SUBSCRIBE_EDIT_ACTIVITY" is passed in, the edit subscription page will be displayed.<br>If "TYPE_SUBSCRIBE_MANAGER_ACTIVITY" is passed in, the management subscription page will be displayed. |

**Callback Description**:

| Extension callback value `sdkhub.FeeResultCode.kFeeExtension` | msg type | msg description |
| :--- | :--- | :--- |
| + 110 | JSON | Description of successful page opening |
| + 111 | JSON / String | Description of failed page opening |

### AdsPlugin Advertising System

Currently, the advertising system is connected to the [HUAWEI Ads Publisher Service](https://developer.huawei.com/consumer/en/doc/development/HMS-Guides/ads-sdk-introduction) part. The form of access advertising is [Banner Ads](https://developer.huawei.com/consumer/en/doc/development/HMS-Guides/ads-sdk-guide-banner), [Rewarded Ads](https://developer.huawei.com/consumer/en/doc/development/HMS-Guides/ads-sdk-guide-reward) and [Interstitial Ads](https://developer.huawei.com/consumer/en/doc/development/HMS-Guides/ads-sdk-guide-interstitial). If necessary, users can directly access the open-screen advertisement in the project.

Both rewarded ads and interstitial ads need to call `preloadAds` first, and then call `showAds` after receiving a successful callback. Banner ads can directly call `showAds`.

#### preloadAds

Pre-loaded advertising method.

**Parameter Description**:

| Parameter name | Fill in requirements | Description |
| :--- | :--- | :--- |
| adType | "Interstitial"<br>"Reward" | Ad Type |
| adId | "testb4znbuh3n2" | Ad ID |

#### showAds

Display Advertising Method.

**Parameter Description**:

| Parameter name | Fill in requirements | Description |
| :--- | :--- | :--- |
| adType | "Interstitial"<br>"Reward"<br>"Banner" | Ad Type |
| adId | "testx9dtjwj8hp" | Ad ID |
| pos | "0" | Ad position, optional in the case of Banner, default is "0".<br>"0": directly below.<br>"1": center.<br>"2": directly above. |
| adSize | "BANNER_SIZE_360_144" | Ad size, optional in the case of Banner, the default is "BANNER_SIZE_360_57", the input value can refer to [Ad Sizes](https://developer.huawei.com/consumer/en/doc/development/HMS-Guides/ads-sdk-guide-banner#h1-1576067654264) document. |
