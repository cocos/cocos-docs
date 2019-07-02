# Publish to Baidu Mini Games

__Cocos Creator v2.0.9+__ officially supports the release of games to __Baidu Mini Games__.

__Baidu Mini Game__ is an extension of the __Baidu Mini Program__ platform, which is provided in the __Baidu App__. This platform not only provides powerful game capabilities, but also provides a large number of native interfaces, such as payment, file system, location, sharing, and smart applets. It is equivalent to combining the advantages of **WEB** for easy propagation and rich **Native** features.

The operating environment of __Baidu's Mini Game__ is similar to that of __WeChat__. The basic idea is to provide the necessary WEB interface to the user, and pursue the same development experience as WEB. __Baidu's Mini Game__ provides a WebGL interface encapsulation based on the smart applet environment, which greatly improves rendering capabilities and performance. However, since these interfaces are encapsulated by the __Baidu__ team through the native implementation of self-research, they are not equivalent to the browser environment.

As an engine, in order to simplify the developer's workload as much as possible, the main tasks we have done for our users include:

- The engine framework is adapted to the __Baidu Mini Game__ API, pure game logic level, the user does not need any additional modifications
- __Cocos Creator__ editor provides a fast packaging process, directly released as a mini game for the __Baidu__ platform.
- Automatic loading of remote resources, cache resources and cache resource versioning

For specific __Baidu Mini Game__ application, station development, game submission, review and release process can refer to [Baidu game registration guidance document](https://smartprogram.baidu.com/docs/game/).

## Using __Cocos Creator__ to release Baidu games

### Prerequisites

- Download and install __Baidu Developer Tools__ in [Baidu Developer Tools Documentation](https://smartprogram.baidu.com/docs/game/tutorials/howto/dev/)
- Download and install the __Baidu app__ in the app store of your phone
- Log in to [Smart Applet Platform](https://smartprogram.baidu.com/developer/index.html) and find **appid**

    ![](./publish-baidugame/appid.png)

### Release process

1. In the **Build Publishing** panel, select **Publishing Platform** for **Baidu Games**, fill in **appid**, then click **Build**.

    ![](./publish-baidugame/build.png)

2. After the build is completed, a __Baidu game__ project folder of **baidugame** will be generated in the directory of the release package, which already contains the configuration files of )__Baidu Mini Game__ environment: `game.json` and `project.swan.json`

    ![](./publish-baidugame/package.png)

3. Use the **Baidu Developer Tools** to open the build **baidugame** folder to open the __Baidu game__ project and preview the game content. **How ​​to use Baidu Developer Tools** please refer to [Baidu Developer Tools Documentation](https://smartprogram.baidu.com/docs/game/tutorials/howto/dev/).

    ![](./publish-baidugame/preview.png)

  > __Note:__ Please do not upgrade **Baidu Developer Tools** to **2.0.10** version.
  > __Note:__ When preview debugging, if there is a prompt that **The current version of the developer tool can't publish mini program**, please update the latest developer tools. This means the *appid* filled in the __Build panel__ is the **appid** of the __Baidu Mini Program__, not the **appid** of the __Baidu Mini Game__, please re-apply for the **appid** of the __Baidu Mini Game__.

## Baidu Mini Game environment resource management

__Baidu Mini Games__ are similar to WeChat Mini Games. There are restrictions on the package. Anything more than 4MB of extra resources must be downloaded through the network.

We recommend that users only save script files in mini game packages, and other resources are downloaded from remote servers. __Cocos Creator__ has helped users download, cache and version their remote resources. The specific implementation logic is similar to the WeChat Mini Games. For details, please refer to [WeChat Mini Game Resource Management](./publish-wechatgame.md#小游戏环境的资源管理).

At the same time, when the **md5Cache** function of the engine is enabled, the url of the file will change as the content of the file changes. When the game releases a new version, the resources of the old version will naturally become invalid in the cache, and only new requests can be requested from the server. Resources also achieve the effect of version control.

Developers need to do the following:

1. When building, check the md5Cache feature in the **Build Publishing** panel.
2. Set **Remote Server Address** and click **Build**.
3. After the build is complete, upload the res folder under the __Baidu Mini Game__ release package directory to the server.
4. Delete the `res` folder under the local distribution package directory.

  > __Note:__ When __Baidu__ loads the resources on the remote server on the real machine, it only supports access via https, so the resource file must be placed on the https server, otherwise the loading of the resource will fail.
  > __Note:__ If the cache resource exceeds the __Baidu__ environment limit, the user needs to manually clear the resource. You can use the `swanDownloader.cleanAllAssets()` and `swanDownloader.cleanOldAssets()` interfaces to clear the cache in __Baidu__. The former will clear all cache resources in the cache directory, please use it with caution; the latter will clear the cache resources that are not used in the current application in the cache directory.

## Baidu Mini Game sub-package loading

The sub-package loading method of __Baidu Mini Games__ is similar to the WeChat game. The package restrictions are as follows:

 - The total size of all packages does not exceed **8MB**
 - Single sub-package/main package size does not exceed **4MB**

The specific packet loading mechanism can refer to [sub-package loading](../scripting/subpackage.md).

## Platform SDK Access

In addition to pure game content, __Baidu's Mini Game__ environment also provides a very powerful native SDK interface, these interfaces are only exist in the __Baidu Mini Game__ environment, equivalent to the third-party SDK interface of other platforms. The porting of such SDK interfaces still needs to be handled by developers at this stage. Here are some of the powerful SDK capabilities offered by __Baidu's Mini Games__:

1. User interface: login, authorization, user information, etc.
2. Baidu cashier payment
3. Forwarding information
4. File upload and download
5. Other: images, locations, ads, device information, etc.

## Access the Baidu Mini Games Open Data Context

Similar to WeChat games, in order to protect its social relationship chain data, __Baidu Mini Games__ also implements an **Open Data Context**, which can get friends information that is both playable and two-way attention. This is a separate game execution environment. The resources, engines, and programs in the **Open Data Context** are completely isolated from the main game. Developers can only access the `swan.getUserInfo()`, `swan.getUserCloudStorage()`, and `swan.getFriendCloudStorage()` __Baidu Mini Games__ API's in the __Open Data Context__, which are used to obtain the corresponding user data.

For details about the __Baidu Mini Game Open Data Context__ process, please refer to [Access Baidu Mini Game Open Data Context](../publish/publish-baidugame-sub-domain.md).

## Baidu Mini Games known issues

The following components are not supported:

- VideoPlayer
- WebView

Users can use __Baidu's__ API directly to use it if they need it.

## Reference link

- [Baidu Game registration guide document](https://smartprogram.baidu.com/docs/game/)
- [Baidu Developer Tools Documentation](https://smartprogram.baidu.com/docs/game/tutorials/howto/dev/)
- [Baidu Game API documentation](https://smartprogram.baidu.com/docs/game/api/openApi/authorize/)