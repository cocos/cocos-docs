# Publish to __WeChat Mini Games__

Starting with __v1.8__, Cocos Creator officially supports the release of games to the **WeChat Mini Games**.

![](./publish-wechatgame/preview.jpeg)

## __WeChat Mini Game__

__WeChat Mini Game__ is a game product platform used inside the __WeChat Mini Program__. It not only provides powerful game capabilities, but also provides a large number of native interfaces, such as *payment*, *social*, *file system*, *photo*, *NFC*, and many more. It is equivalent to combining the advantages of the web for easy dissemination and rich native features.

The running environment of the __WeChat Mini Game__ is an extension of the mini program environment. The basic idea is to provide the necessary web interface to the user, and pursue the same development experience as the web. The __WeChat Mini Game__ provides a wrapper around the WebGL interface based on the mini program environment, which greatly improves the rendering capabilities and performance. However, since these interfaces are encapsulated by the __WeChat__ team they are not equivalent to the browser environment. Regarding the game aspect, the current __WeChat Mini Game__ environment provides the rendering interface of __Canvas__ and __WebGL__. The two rendering modes of the __Cocos Creator__ engine can be run, but for performance reasons, we use __WebGL__ to render the game content by default. Developers are strongly recommended to do the same. Also, developers should not modify the default configuration!

As an engine, in order to simplify the developer's workload as much as possible, the main tasks we have done for our users include:

- The engine framework adapts to the WeChat Mini Game API, pure game logic level, users do not need any additional modifications.
- __Cocos Creator__ editor provides a fast packaging process, released directly as a __WeChat Mini Game__, and automatically evokes the developer tools of the mini game.
- Automatic loading of remote resources, cache resources and cache resource versioning.

In addition, the game submission, review and release process of the __WeChat Mini Game__ is no different from the __WeChat Mini Program__. They all need to comply with the requirements and standard processes of the __WeChat__ team. For details, please refer to the link at the end of the article.

## Using Cocos Creator to publish WeChat Mini Games

1. Download WeChat Developer Tools on [WeChat Public Platform](https://developers.weixin.qq.com/miniprogram/en/dev/devtools/download.html)
2. Set the WeChat Developer Tools path in **Settings -> [Native Develop](../getting-started/basics/editor-panels/preferences.md#native-develop)**

    ![](./publish-wechatgame/preference.JPG)
3. Log in to the WeChat public platform and find the appid

    ![](./publish-wechatgame/appid.jpeg)
4. Select the **WeChat Mini Game** in the **Platform** of the **Build** panel, fill in the mini game appid, and then click **Build**
    ![](./publish-wechatgame/build.jpeg)
5. Click **Play** to open the WeChat Developer Tools

    ![](./publish-wechatgame/tool.jpeg)
6. Preview deployment

    According to this process, a release package of __WeChat Mini Games__ will be generated under the project's build directory, which already contains the configuration files of the __WeChat_Mini Game__ environment: __game.json__ and __project.config.json__

    ![](./publish-wechatgame/package.jpeg)

## Resource Management for WeChat Mini Game Environment

In a __WeChat Mini Game__ environment, resource management is the most special part. It differs from the browser in the following four points:

1. The size of the __WeChat Mini Game's__ package cannot exceed __4MB__, including all the code and resources. Additional resources must be downloaded through the network.
2. For files downloaded from a remote server, the __WeChat Mini Game__ environment does not have a browser cache and an expired update mechanism.
3. For the resources in the __WeChat Mini Game__ package, the game environment is not loaded on demand, but all the resources in the package are loaded at one time, and then the page is started.
4. It is not possible to download script files from a remote server.

This brings up two key issues, first page loading speed and remote resource caching and version management. For the first page loading speed, we recommend that users only save the script file in the __WeChat Mini Game__ package, and other resources are downloaded from the remote server. The download, cache and version management of remote resources, in __Cocos Creator__, has already helped users. Let me explain the logic of this part.

In the __WeChat Mini Game__ environment, we provide a __wxDownloader__ object, after setting the **REMOTE_SERVER_ROOT** property, the logic of the engine downloading the resource becomes:

1. Check if the resource is in local cache storage
2. Check if the resource is in the mini game pack if there is no cache
3. Download from a remote server if they do not exist in mini game pack
4. After downloading to temporary directory, use it directly
5. Save it to the game application cache slowly in backstage for re-access.
6. Local cache storage has space limitation, if total space of cache exceeds the limit, there will be no more caching without disturbing game process 

At the same time, when the md5Cache function of the engine is enabled, the url of the file will change as the content of the file changes. When the game releases a new version, the resources of the old version will naturally become invalid in the cache, and only new requests can be requested from the server. Resources also achieve the effect of version control.

Specifically, developers need to do:

1. When building, check the md5Cache function in the **Build** panel.
2. Set **Remote Service Address** in the build release panel. And then click **Build**
3. When the build is complete, upload the res folder in the mini-game distribution package to the server.
4. Delete the res folder inside the distribution package.
5. For the test phase, you may not be able to deploy to the official server, you need to use the local server to test, then open the details page in the WeChat Developer tool, check the __Do not verify the security domain name, TLS version and the HTTPS certificate__ option in the project settings .

    ![](./publish-wechatgame/detail.jpeg)

**Note**: 

- If the cache resource exceeds the WeChat environment limit, you need to manually clear the resource. And you can use `remoteDownloader.cleanAllCaches()` and `remoteDownloader.cleanOldCaches()` to clear the cache in WeChat Mini Games. The former clears all the cache resources in the cache directory, please use it carefully. While the latter clears cache resources that are currently unused in the cache directory in the application.

- When you upgrade the engine of your mini game, the assets already cached in the storage of phone or WeChat DevTools will not be cleared automatically. And these cached assets don't match the version of engine. It may cause some issues about rendering or others. The solution is check the option `MD5 Cache` when you build your game. It ensures that the newest asset will be loaded. Or you can clear these outdated assets by yourself. In mobile phone, you can call `remoteDownloader.cleanAllCaches()` to clear all caches. In WeChat DevTools, you can click this button to do same thing：

    ![](./publish-wechatgame/clear-cache.png)

## WeChat Mini Game Subpackage Loading

WeChat Mini Game how to achieve subpackage loading, please refer to [Subpackage Loading](../scripting/subpackage.md).

## Platform SDK Access

In addition to pure game content, the __WeChat Mini Game__ environment also provides a very powerful native SDK interface, the most important of which is user, social, payment, etc. These interfaces are only found in the __WeChat Mini Game__ environment, equivalent to other Third-party SDK interface for the platform. The porting of such SDK interfaces still needs to be handled by developers at this stage. Here are some of the powerful SDK capabilities provided by the __WeChat Mini Games__ environment:

1. User interface: login, authorization, user information, etc.
2. WeChat payment
3. Forward and get forwarding information
4. File upload and download
5. Media: pictures, recordings, cameras, etc.
6. Other: location, device information, scan code, NFC, etc.

## Access to the Open Data Context of WeChat Mini Games

In order to protect its social relationship chain data, __WeChat Mini Games__ has added the concept of **Open Data Context**, which is a separate game execution environment. The resources, engines, and programs in the Open Data Context are completely isolated from the main game. Developers can only access the `wx.getFriendCloudStorage()` and `wx.getGroupCloudStorage()` APIs provided by __WeChat__ in the Open Data Context to implement some rankings, for example.

__Cocos Creator__ supports packaging to Open Data Context starting with __v1.9.1__. For details, please refer to [Access to the Open Data Context of WeChat Mini Games](../publish/publish-wechatgame-sub-domain.md).

## WeChat Mini Games Known issues

In addition, our adaptation of WeChat Mini Games has not been completely completed, and the following modules are still not supported:

- VideoPlayer (Supported in **v2.1.3**)
- WebView

If you need it, you can currently use it by calling the WeChat's API directly.

## Reading

- [WeChat Mini Game development documentation](https://developers.weixin.qq.com/minigame/en/dev/guide/)
- [WeChat Public Platform](https://mp.weixin.qq.com/?lang=en_US)
- [Mini Program API Documentation](https://developers.weixin.qq.com/minigame/en/dev/api/)
- [WeChat Developer Tools Download](https://mp.weixin.qq.com/debug/wxagame/en/dev/devtools/download.html)
- [WeChat Cache Space Overflow Case](https://github.com/cocos-creator/WeChatMiniGameTest)
