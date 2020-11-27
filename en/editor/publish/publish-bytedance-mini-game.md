# Publishing to ByteDance Mini Games

> **Note**: some platforms only have Chinese documentation available when visiting the platforms website. It may be necessary to use Google Translate in-order to review the documentation.

**ByteDance Mini Games** are developed based on ByteDance full products, which do not require users to download. This is a brand-new game type that can be played on tap.

The game submission, review and release process of a mini-game needs to comply with the requirements and standard processes of the Byte official specification. For specific information, please refer to the links at the end of this document.

## Publishing to ByteDance with Cocos Creator

1. Download the **ByteDance DevTools** on [ByteDance Official Website](https://microapp.bytedance.com/docs/zh-CN/mini-game/develop/developer-instrument/developer-instrument-update-and-download).

2. Log in to [Developer Platform](https://microapp.bytedance.com/)to find your `mini game appid`. For details, please refer to the official [Access Guide](https://microapp.bytedance.com/docs/zh-CN/mini-game/introduction/plugin-reference/set-up-mini-game) documentation.

    ![](https://sf1-ttcdn-tos.pstatp.com/obj/website-img/f296a9f80eaeb40f4af38e8a4e25e17e_12.png)

3. Select the **ByteDance Mini Game** in the **Platform** in the **Build** panel, fill in the `mini game appid`, and then click **Build**

    ![](./publish-bytedance-mini-game/build.jpg)

4. Preview game

    Following this process, a `bytedance-mini-game` folder will be generated in the project's **build** directory (the name of the folder is based on the **Build Task Name**), then you can open your game with the **ByteDance DevTools**.

    ![](./publish-bytedance-mini-game/tool.jpg)

## Build Options

Options | Optional or not | Default | Explanation
- | - | - | -
**appid** | Required | `testId` | The appid of the ByteDance Mini Games, it will be written to `project.config.json` file.
**Remote server address** | Optional | Empty | The remote server address. Resources will then be obtained from this address.
**Open data context root** | Optional | Empty | If an Open Data Context exists, use this root to specify the relative path of the Open Data Context folder in the build directory so that the directory is not overwritten or modified during the build.
**Orientation** | Required | `landscape` | Device orientation, it will be written to `game.json` file.

## Asset Management for ByteDance Mini Game Environment

In a **ByteDance Mini Game** environment, asset management is the most special part. It differs from the browser in the following four points:

1. The size of the **ByteDance Mini Game** package cannot exceed **4MB**, including all the code and assets. Additional assets must be downloaded via web request.

2. For files downloaded from a remote server, the **ByteDance Mini Game** environment does not have the browser's caching and outdated update mechanism.

3. For the assets in the **ByteDance Mini Game** package, they are not loaded on demand in the mini game environment, but rather all the assets in the package are loaded at once, and then the game page is launched.

4. You cannot download script files from a remote server.

This brings up two key issues, home page loading speed and remote asset caching and version management. For the home page loading speed, we recommend that developers only save the script file in the **ByteDance Mini Game** package, and all other assets are downloaded from the remote server. As for downloading, caching and version management of remote assets, Cocos Creator has done the job for developers.

Specifically, developers need to do the following:

1. When building, enable the **MD5 Cache** in the **Build** config panel.
2. Set the **Remote service address**, and then click **Build**.
3. When the build is complete, upload the **res** folder in the mini game release package to the server.
4. Delete the **res** folder inside the local release package.
5. For the test phase, you may not be able to deploy to the official server, you need to use the local server to test, then open the details page in the WeChat DevTools, check the `Does not verify valid domain names, web-view (business domain names), TLS versions and HTTPS certificates` option in the **Local Settings**.

## Reference documentation

> **Note**: some platforms only have Chinese documentation available when visiting the platforms website. It may be necessary to use Google Translate in-order to review the documentation.

- [ByteDance Mini Game Developer Document Guide](https://microapp.bytedance.com/docs/zh-CN/mini-game/introduction/about-mini-game/flow-entrance/brief-introduction-on-flow-entrance)
- [ByteDance Developer Platform](https://microapp.bytedance.com/)
- [ByteDance Mini Game API Documentation](https://developer.toutiao.com/docs/game/)
- [ByteDance DevTools Download](https://microapp.bytedance.com/docs/zh-CN/mini-game/develop/developer-instrument/developer-instrument-update-and-download)
- [ByteDance DevTools Documentation](https://microapp.bytedance.com/docs/zh-CN/mini-game/develop/developer-instrument/development-assistance/mini-app-developer-instrument)