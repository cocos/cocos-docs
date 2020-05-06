# Publish to Baidu Mini Games

The runtime environment of the **Baidu Mini Game** is an extension of the **Baidu Smart Mini Program**. This provides a WebGL interface encapsulation based on the mini program environment. This greatly improves the rendering capabilities and performance. However, since these interfaces are encapsulated by the Baidu team, they are not equivalent to the browser environment.

On the engine side, in order to make the developers' workload as easy as possible, our main tasks for developers include the following:

- The engine framework is adapted to the **Baidu Mini Game** API, pure game logic level, users don't need any additional modifications.
- **Cocos Creator** editor provides a fast packaging process, directly released as a **Baidu Mini Game**.
- Automatic loading of remote resources, cache resources and cache resource versioning.

For specific **Baidu Mini Game** application, station development, game submission, review and release process can refer to [Baidu Mini Game Developer Documentation](https://smartprogram.baidu.com/docs/game/).

## Using Cocos Creator to release Baidu Mini Games

### Prerequisites

- Download and install **Baidu Developer Tools** in [Baidu Developer Tools Documentation](https://smartprogram.baidu.com/docs/game/tutorials/howto/dev/).
- Download and install the **Baidu app** in the app store of your phone.
- Log in to [Smart Mini Progame Platform](https://smartprogram.baidu.com/developer/index.html) and find **App ID**.

    ![](./publish-baidugame/appid.png)

### Release process

1. Select the **Baidu Mini Game** in the Platform of the **Build** panel, fill in the mini game **appid**, and then click **Build**.

    ![](./publish-baidugame/build.png)

2. After the build is completed, a Baidu mini game project folder of **baidugame** will be generated under the project's build directory, which already contains the configuration files of Baidu Mini Game's environment: `game.json` and `project.swan.json`.

    ![](./publish-baidugame/package.png)

3. Use the **Baidu Developer Tools** to open the **baidugame** folder to preview and debug the game. About how ​​to use Baidu Developer Tools, please refer to [Baidu Developer Tools Documentation](https://smartprogram.baidu.com/docs/game/tutorials/howto/dev/) for details.

    ![](./publish-baidugame/preview.png)

    **Note**: When previewing and debugging, if a prompt appears stating: `The current version of the developer tool can't publish mini program, please update to the latest developer tools`. This means the **appid** filled in the **Build** panel is the **appid** of the **Baidu Mini Program**, not the **appid** of the **Baidu Mini Game**, please re-apply for the **appid** of the **Baidu Mini Game**.

## Resource Management for Baidu Mini Game Environment

**Baidu Mini Game** is similar to **WeChat Mini Game**. There are restrictions on the package size. Resources more than **4MB** must be downloaded via a network request.

It is recommended to only save script files in the mini-game packages, while other resources are uploaded to the remote server, and downloaded from the remote server as needed. The download, cache, and version management of remote resources, Cocos Creator has already done it for you. The specific implementation logic is similar to the WeChat Mini Game. Please refer to [Resource Management for WeChat Mini Game Environment](./publish-wechatgame.md#resource-management-for-wechat-mini-game-environment) documentation for details.

When the **md5Cache** feature of the engine is enabled, the URL of the file will change as the content of the file changes. When the game releases a new version, the resources of the old version will naturally become invalid in the cache, and only the new resources can be requested from the server, which achieves the effect of version control.

Specifically, developers need to do the following:

1. When building, check the md5Cache feature in the **Build** panel.
2. Set **Remote server address** in the **Build** panel and then click **Build**.
3. After the build is complete, upload the `res` folder under the **Baidu Mini Game** release package directory to the server.
4. Delete the `res` folder under the local release package directory.

**Note**:

- When Baidu loads the resources on the remote server on the physical device, it only supports access via https, so the resource file must be placed on https, otherwise the loading of the resource will fail.

- If the cache resource exceeds the environment limit of Baidu, you need to manually clear the resource. You can use the `remoteDownloader.cleanAllCaches()` and `remoteDownloader.cleanOldCaches()` interfaces to clear the cache in Baidu mini game. The former will clear all cache resources in the cache directory, please use it with caution. The latter will clear the cache resources that are not used in the current application in the cache directory.

## Baidu Mini Game Subpackage Loading

The subpackage loading method of **Baidu Mini Game** is similar to WeChat, with the following package restrictions:

- The size of all subpackage of the entire Mini Game can not exceed **8MB**.
- The size of single subpackage / main package can not exceed **4MB**.

Please refer to the [SubPackage Loading](../scripting/subpackage.md) for details.

## Platform SDK Access

In addition to pure game content, the Baidu Mini Game environment also provides a very powerful native SDK interface, these interfaces are only exist in the Baidu Mini Game environment, equivalent to the third-party SDK interface of other platforms. The porting of such SDK interfaces still needs to be handled by developers at this stage. Here are some of the powerful SDK capabilities offered by Baidu Mini Game:

1. User interface: login, authorization, user information, etc.
2. Baidu cashier payment
3. Forwarding information
4. File upload and download
5. Other: images, locations, ads, device information, etc.

### Access to the Open Data Context of Baidu Mini Games

Similar to WeChat Mini Game, in order to protect its social relationship chain data, Baidu Mini Game also implements an **Open Data Context**, which can get friends information that is both playable and two-way attention. This is a separate game execution environment. The resources, engines, and programs in the **Open Data Context** are completely isolated from the main game. Developers can only access the `swan.getUserInfo()`, `swan.getUserCloudStorage()`, and `swan.getFriendCloudStorage()` APIs provided by Baidu Mini Games in the Open Data Context, which are used to obtain the corresponding user data.

For details about the Baidu Mini Game Open Data Context process, please refer to [Access Baidu Mini Game Open Data Context](./publish-baidugame-sub-domain.md).

## Baidu Mini Games known issues

Currently, the adaptation work of Baidu Mini Game is not completely finished, and the following components are not supported for the time being:

- VideoPlayer
- WebView

If needed, you can directly call Baidu's [API](https://smartprogram.baidu.com/docs/game/api/openApi/authorize/) as needed.

## Reference link

- [Baidu Mini Game Registration Guide](https://smartprogram.baidu.com/docs/game/)
- [Baidu Developer Tools documentation](https://smartprogram.baidu.com/docs/game/tutorials/howto/dev/)
- [Baidu Mini Game API documentation](https://smartprogram.baidu.com/docs/game/api/openApi/authorize/)
