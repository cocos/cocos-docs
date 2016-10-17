# Overview
Cocos Creator built-in Cocos engine includes AnySDK Framework libraries since version 1.2. The chapter introduces how to integrate AnySDK .You can view it [Official Wiki](http://docs.anysdk.com/) to learn More information about AnySDK. 

# Create a game

AnySDK for Cocos Creator plugin has not been released, you need to download AnySDK client from [AnySDK Website]( http://www.anysdk.com/downloads) to create a game and package. 
1. Login AnySDK client.
2. Create new game.
3. Obtain appkey appsecret privatekey.

You can view it [AnySDK Client Manual](http://docs.anysdk.com/PackageTool) to learn More information about AnySDK client.
![Create a game](integrate-anysdk/create-game.png)

# Server
If the developer needs to integrate User and IAP system, the game server must deal with verification and payment attestation related logic, refer to the following two documents for access.
* [Oauth Login](http://docs.anysdk.com/OauthLogin)  
* [Payment Notice](http://docs.anysdk.com/PaymentNotice)


# Client
## Built project
Click menu ` **project** -> **Built **`，Cocos Creator built-in Cocos engine includes AnySDK Framework libraries.

![Built](integrate-anysdk/build-publish.png)

## Invoke initialize interface

 The `loadAllPlugins` function of `frameworks/runtime-src/Classes/SDKManager.cpp` file invoked `pAgent->init(appKey,appSecret,privateKey,oauthLoginServer);` function in built-in Cocos project of Cocos Creator version 1.2.
you can annotation this code (It annotations `init` function in Cocos Creator 1.3 acquiescently) and invoke this code in JS code.The following code:
```javascript
var appKey = "APP_KEY";
var appSecret = "APP_SERCRET";
var privateKey = "PRIVATE_KEY";
var oauthLoginServer = "http://oauth.anysdk.com/api/OauthLoginDemo/Login.php";
var agent = anysdk.agentManager;
agent.init(appKey,appSecret,privateKey,oauthLoginServer);
```
appKey, appSecret and privateKey are the only three parameters generated after the packing tool client finishes creating the game.The oauthLoginServer parameter is the API address provided by the game serviceo login verification

PS：If the parameters of `init` function is different from packaged game ,APK will be crashed.

## Invoke Interface
According to the requirements of the game,refer to the following document to invoke the interface of each system.  
* [User System](http://docs.anysdk.com/UsersystemJS)  
* [IAP System](http://docs.anysdk.com/IapsystemJS)  
* [Analytics System][1]
* [Share System][2]
* [Ads System][3]
* [Push System][4] 
* [Crash System][5]
* [AdTracking System](http://docs.anysdk.com/AdTrackingSystemJS)

[1]: http://docs.anysdk.com/AnalyticsSystem(JS)
[2]: http://docs.anysdk.com/ShareSystem(JS)
[3]: http://docs.anysdk.com/AdsSystem(JS)
[4]: http://docs.anysdk.com/PushSystem(JS)
[5]: http://docs.anysdk.com/CrashSystem(JS)

# Package
* Android: Compile project and generate APK, APK is used to be packaged APK.
* iOS: Xcode project is used to be packaged project.
* H5: No need to package，only need to config channel parameters.

	1. Add channel and SDK in AnySDK client.
	2. Config SDK parameters what you need to obtain from SDK background.
	3. Choose game APK to package.
![Configuration parameters](integrate-anysdk/sdk-params.png)

# Remarks
Currently H5 platform is only supported to integrate channel SDK, and you must use AnySDK enterprise edition.
If demand can contact AnySDK business supervisor.
```
yanshu.chen Business Supervisor
Chukong Xiamen | AnySDK 
QQ：173732820
Mob：13950013330 （Wechat）
E-mail：chenys@anysdk.com、yanshu.chen@chukong-inc.com
Web-site：www.anysdk.com
Add：Room 1302,Building 7,Guanyinshan Business Center,Xiamen
```