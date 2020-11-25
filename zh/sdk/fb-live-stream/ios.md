# Facebook Live Stream iOS 集成说明文档
fbDocs 里面有 Facebook 提供的文档，但是写的不够完整，或者没写完，可以先做一遍浏览，再根据本文档进行集成
详细的集成示例请参照 `demo/ios` 里面的示例进行查看，其中 **LiveStreamApp.zip** 里面放置的是 Facebook 提供的 Demo
**FacebookLive.h FacebookLive.mm** 是 cocos 提供的集成示例代码，可以根据此代码稍作修改应用于您的工程中。
## 集成步骤
### 1. 添加必要的framework
 - 由于目前 livestream 暂时不支持使用 cocoapods 集成，所以只能使用手动集成
 - 把 Bolts FBSDKCoreKit FBSDKLiveStreamKit 这三个 framework 添加到工程中，勾选 `Copy items if needed`
 - 在需要集成的 target 中找到对应的 `info.plist`，并添加如下几个字段，并且 把**FacebookAppID** , **FacebookDisplayName** , **CFBundleURLTypes** 替换为自己的APP_ID
 ````
     <key>FacebookAppID</key>
     <string>181909579101196</string>
     <key>FacebookDisplayName</key>
     <string>fb_live_stream</string>
     <key>NSCameraUsageDescription</key>
     <string>The camera will show the player during the live stream.</string>
     <key>NSMicrophoneUsageDescription</key>
     <string>The microphone will record the player's voice during the live stream.</string>
     <key>LSApplicationQueriesSchemes</key>
     <array>
       <string>fbapi</string>
       <string>fb-broadcastextension</string>
     </array>
     <key>CFBundleURLTypes</key>
     <array>
       <dict>
         <key>CFBundleTypeRole</key>
         <string>Editor</string>
         <key>CFBundleURLName</key>
         <string/>
         <key>CFBundleURLSchemes</key>
         <array>
           <string>fb181909579101196</string>
         </array>
       </dict>
     </array>
 ````
 - **NSCameraUsageDescription** 为调用 **照相** 弹出给用户看的描述提示，可自行更改为适合自己的提示
 - **NSMicrophoneUsageDescription** 为调用 **录音功能** 弹出给用户看的描述提示，可自行更改为适合自己的提示
 - Facebook APP ID 可以在<a href="https://developers.facebook.com/">Facebook 开发者平台</a> 创建一个新应用得到(老应用也可以)

## 2. 在 AppController.mm 传入启动参数
 - import <FBSDKCoreKit/FBSDKCoreKit.h> 这个头文件，然后再启动方法里面添加，FBSDKApplicationDelegate 的方法
 ````
 - (BOOL)application:(UIApplication *)application 
   didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
   [[FBSDKApplicationDelegate sharedInstance] application:application
   didFinishLaunchingWithOptions:launchOptions];
   // Add any custom logic here.
   return YES;
 }
 ````
## 3. 注册 Live Stream 的回调
 - 接入`FBSDKLiveStreamingObserver` 接口，并实现其需要实现的方法`onLiveStreamingEnded` `onLiveStreamingError` `onLiveStreamingStarted` `onLiveStreamingStatus`
 - 根据对应回调，实现上述几个方法，传回给游戏层，进行直播状态的更新

# Facebook Live Stream API 的调用简介
主要是创建一个 `FBSDKLiveStreamingConfig` 实例来完成对 Live Stream 的配置，通过 `[FBSDKLiveStreamingManager getInstance]` 这个单例来控制直播的功能，
## 开始直播 startLiveStreamWithLiveStreamingConfig
- 传入 new 出来的 FBSDKLiveStreamingConfig 实例，即可开启直播
````
FBSDKLiveStreamingManager *liveStreamManager = [FBSDKLiveStreamingManager getInstance];
[liveStreamManager startLiveStreamWithLiveStreamingConfig:_liveStreamingConfig];
````
## 暂停直播 pauseLiveStreaming
````
FBSDKLiveStreamingManager *liveStreamManager = [FBSDKLiveStreamingManager getInstance];
[liveStreamManager pauseLiveStreaming];
````

## 继续直播 continueLiveStreaming
````
FBSDKLiveStreamingManager *liveStreamManager = [FBSDKLiveStreamingManager getInstance];
[liveStreamManager continueLiveStreaming];
````

## 停止直播 stopLiveStreaming
````
FBSDKLiveStreamingManager *liveStreamManager = [FBSDKLiveStreamingManager getInstance];
[liveStreamManager stopLiveStreaming];
````


## 关于发布版本

- 支持最低的 iOS 版本：>= 11.0
- 由于直播 SDK 并不支持 armv7 架构，在 Archive 过程中，需要删除 armv7 的架构支持（这会导致 iPhone5 及 iPhone5 以下的机子无法运行游戏）
- **iOS 8.0 之后，删除 armv7 架构，就可以编译通过，但是需要判断 iOS 11+ 才能使用该SDK** 