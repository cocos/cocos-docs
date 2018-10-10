

# 发布 Android Instant 游戏

## 需要的环境

- Android Studio 3.0+

- Android Phone 6.0+

- NDK r10c +
  

## Instant Games 发布步骤

1. 打开 CocosCreator

2. 打开 **项目** -> **构建发布**，**发布平台**选择 **Android Instant** ，**模板**选择 **android-instant**

3. 如果不需要进行分包或者想体验下打包流程，可以勾选**跳过录制和分包**，然后直接进行**构建**、**编译** ，连上手机之后，点击**运行**，即可看到 Instant App 的运行效果

   ![](publish-android-instant/builder.png)

4. 如果需要进行分包操作，那么请点击**录制**，这个时候模拟器将会打开，模拟将会自动记录使用到的资源，我们要做的是根据我们的游戏流程进行游戏，让模拟器记录资源使用的信息

   ![](publish-android-instant/record.png)

5. 录制完成后，点击**分包**，将会打开分包界面，在这个界面，我们可以完成分包操作，完成后我们进行**保存**（这里我们不展开说明，请看后面的 **分包器介绍** ）

6. 分包完成后，我们需要在**构建发布**面板里面的**分包配置路径**属性选择我们的刚刚分包的路径，点击**...**选择我们刚刚分包的记录（分包记录保存在  `path_to_your_project/temp/android-instant-games/profiles` 我们可以删除自己不需要的分包记录，只需要删除对应文件夹即可）

   ![](publish-android-instant/refactor_record.png)

7. 同步骤3，点击**构建** 、**编译** 、**运行**，并确保手机跟pc在同一个局域网内，就可以测试游戏在Instant App运行的情况（构建发布面板的Android Instant配置的说明，请看后面的 **Android Instant 构建面板**）

   

## 分包器

分包器，主要用来为游戏进行首包的编辑，选择放入首包的资源

![](publish-android-instant/refactor_desc.png)

### 使用方法

1. 当录制完成后，选择**分包**就会打开分包界面，如上图所示

2. 分包器默认打开的是最新的录制记录，如果需要打开别的记录，可以使用**+打开记录**，打开别的记录。分包器也可以同时打开多个记录，进行对比

3. 拖动 **终止点**，可以选择分入首包的资源，当拖动终止点的时候，可以发现文件列表的文件数量和总大小等数据的变化，选择合适游戏的首包大小，即可粗略的分好首包的资源

4. 分包器可以对所有资源进行调整，在文件列表的页面，展开各个分类的节点，可以看到对应各个文件的大小，取消**操作**的打钩就可以手动**取消**某个资源放入首包当中

   ![](publish-android-instant/refactor_select.png)

5. 如果有些资源没有在首包之中，但是我们又希望将其放入首包中，可以从 **+手动添加**里面添加入首包之中，只需要找到对应资源并在资源后面打上勾，并点击**添加**即可

   ![](publish-android-instant/refactor_manual.png)

6. 如果还有额外的资源需要加入首包，那么，也可以从**资源管理器**面板选择资源，并拖拽进入**分包器**面板即可

7. 分包完成之后，点击**保存**

8. 在**构建发布**面板的**分包配置**选项，选择刚刚编辑的分包记录，点击**构建**，就会使用该分包记录进行首包的分割



## Android Instant 构建面板

### 几个主要的配置

- **服务器地址**：远端资源的下载地址，可以是cdn地址，将`build/android-instant/remote_res`文件夹放入服务器或者CDN中即可，Creator 会去这个地址下载没有在首包当中的资源
- **启动URL**：Android Instant App 会根据这个这个协议启动对应的应用和对应的activity，详情请看 <a href="https://developer.android.com/topic/google-play-instant/getting-started/first-instant-app">Google Instant App 文档</a>
- **分包配置路径**：Creator 会根据这个分包配置生成首包的资源



## Android Studio 支持

- 对 Android 工程的其他修改，我们可以使用 Android Studio 直接打开工程，对 android 工程进行其他代码的集成（工程路径：`path_to_your_project/build/android-instant/frameworks/runtime-src/proj.android-studio`）
- Creator 也推荐使用 Android Studio 进行编译



## Instant Cookie API

我们提供了一些 API 方便开发者直接调用 Google 的一些功能，目前我们开放了 Instant Google Cookie API , 详情请前往谷歌文档查看，同时，我们提供了这些 API 的 demo ：<a href="https://github.com/wuzhiming/AndroidInstantCookieDemo">**AndroidInstantCookieDemo**</a>

- cc.androidInstant.showInstallPrompt()  请前往 Google 查看详细文档：<a href="https://developers.google.com/android/reference/com/google/android/gms/instantapps/InstantApps.html#showInstallPrompt(android.app.Activity,%20android.content.Intent,%20int,%20java.lang.String)t">showInstallPrompt</a>

- cc.androidInstant.isInstantApp()   请前往 Google 查看详细文档：<a href="https://developers.google.com/android/reference/com/google/android/gms/instantapps/PackageManagerCompat#isInstantApp()">isInstantApp</a>

- cc.androidInstant.getInstantAppCookie()   请前往 Google 查看详细文档：<a href="https://developers.google.com/android/reference/com/google/android/gms/instantapps/PackageManagerCompat#getInstantAppCookie()">getInstantAppCookie</a>

- cc.androidInstant.setInstantAppCookie()   请前往 Google 查看详细文档：<a href="https://developers.google.com/android/reference/com/google/android/gms/instantapps/PackageManagerCompat#setInstantAppCookie(byte%5B%5D)">setInstantAppCookie</a>

- cc.androidInstant.getInstantAppCookieMaxSize()   请前往 Google 查看详细文档：<a href="https://developers.google.com/android/reference/com/google/android/gms/instantapps/PackageManagerCompat#getInstantAppCookieMaxSize()">getInstantAppCookieMaxSize</a>

  

## 相关知识链接

1. <a href="https://developer.android.com/topic/google-play-instant/getting-started/first-instant-app">Instant App</a>
2. <a href="https://developers.google.com/android/reference/com/google/android/gms/instantapps/InstantApps">Google InstantApps API</a>
3. <a href="https://github.com/googlesamples/android-instant-apps">Google Instant App Samples</a>
4. <a href="https://github.com/wuzhiming/AndroidInstantCookieDemo">CocosCreator AndroidInstantCookieDemo </a>



