# Facebook Live Stream Android 集成说明文档
fbDocs 里面有 Facebook 提供的文档，但是写的不够完整，或者没写完，可以先做一遍浏览，再根据本文档进行集成
详细的集成示例请参照 `demo/android` 里面的示例进行查看，其中 **AndroidLivestreamSample.zip** 里面放置的是 Facebook 提供的 Demo
**FacebookLive.ava** 是 cocos 提供的集成示例代码，可以根据此代码稍作修改应用于您的工程中。
## 集成步骤
### 1. 添加facebook-livestream.aar
 - 由于目前livestream 暂时不支持使用 maven 集成，所以只能使用手动集成
 - 添加**facebook-livestream.aar** 到 `app/libs` 目录下
 - 在 `app/build.gradle` 添加aar的引用
 ````
 implementation fileTree(include: ['*.jar', '*.aar'], dir: 'libs')
 ````
 - 在 android studio 根目录下找到 `build.gradle` 然后添加 flatDir 目录如下所示
 ````
 allprojects {
     repositories {
         google()
         jcenter()
         flatDir {
                 dirs 'libs'
         }
     }
 }
 ````
## 2. 添加 strings.xml
 - 添加facebook_app_id和fb_login_protocol_scheme两个字段
 - facebook_app_id 在 <a href="https://developers.facebook.com/">Facebook 开发者平台</a> 创建一个新应用得到(老应用也可以)
 ````
   <string name="facebook_app_id" translatable="false">181909579101196</string>
   <string name="fb_login_protocol_scheme" translatable="false">fb181909579101196</string>
 ````
    
## 3. 添加AndroidManifest.xml
 - 需要加入 `facebook app id` 在 application 节点里面添加 Facebook 的 ApplicationId
 ````
 <meta-data android:name="com.facebook.sdk.ApplicationId" android:value="@string/facebook_app_id"/>
 ````
 - 同样的在 `application` 节点中加入一个 `receiver` 的注册，如下所示
 ````
 <receiver android:name="com.facebook.livestreaming.LiveStreamBroadcastReceiver" android:exported="true">
       <intent-filter>
         <action android:name="com.facebook.livestreaming.status"/>
         <action android:name="com.facebook.livestreaming.error"/>
       </intent-filter>
 </receiver>
 ````
 
# Facebook Live Stream API 的调用简介
主要是创建一个 `LiveStreamConfig` 实例来完成对 Live Stream 的配置，通过 `LiveStreamManager.getInstance()` 这个单例来控制直播的功能
## 开始直播 startLiveStreaming
- 获得 activity 的baseContext 和 new 出来的 LiveStreamConfig 示例，即可开启直播
````
 LiveStreamManager.getInstance().startLiveStreaming(activity.getBaseContext(), mLiveStreamConfig);
````
## 暂停直播 pauseLiveStreaming
````
LiveStreamManager.getInstance().pauseLiveStreaming(activity.getBaseContext());
````

## 继续直播 resumeLiveStreaming
````
LiveStreamManager.getInstance().resumeLiveStreaming(activity.getBaseContext());
````

## 停止直播 stopLiveStreaming
````
LiveStreamManager.getInstance().stopLiveStreaming(activity.getBaseContext());
````
