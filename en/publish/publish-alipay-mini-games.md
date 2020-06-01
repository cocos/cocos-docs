# Publish to Alipay Mini Games

Starting with Cocos Creator **v2.1.4**, creating games for the Alipay Mini Games is officially supported.

## Environment Configuration

- Download [Alipay Mini Program Studio](https://render.alipay.com/p/f/fd-jwq8nu2a/pages/home/index.html) on the PC and install it.

- Download [Alipay](https://mobile.alipay.com/index.htm) and install it on your phone.

- The minimum supported version of Alipay on Android is 10.1.75, on iOS is 10.1.78.

## Release Process

1. Use Cocos Creator to open the project that needs to be released. Select **Alipay Mini Game** in the Platform dropdown of the **Build...** panel and click **Build**.

    ![](./publish-alipay-mini-games/build_option.png)

2. After the build is complete, click the **Open** button behind the **Build Path**. You can see that the alipay mini game's project folder **alipay** directory is generated under the default release path build directory, which has included alipay mini game environment configuration file `game.json`.

    ![](./publish-alipay-mini-games/build.png)

3. Use **Alipay Mini Program Studio** to open **alipay** directory. Next, you can open alipay mini game project to preview and debug game content.

    ![](./publish-alipay-mini-games/preview.png)

## Resource Management for Alipay Mini Game Environment

**Alipay Mini Game** is similar to **WeChat Mini Game**. There are restrictions on the package size. Resources over **4MB** must be downloaded via a network request.

We recommend that developers save only the script files in the package and download all other resources from the remote server. Cocos Creator already helps developers with downloading, caching and version management of remote resources. The specific implementation logic and operation steps are similar to the WeChat Mini game. Please refer to the [Resource Management for WeChat Mini Game](./publish-wechatgame.md#resource-management-for-wechat-mini-game-environment) documentation for details.

**Note**: Currently, Alipay Mini Game only supports loading resources from remote server via **HTTPS** on the physical device, so the resource file must be placed on the **HTTPS** server, otherwise the resource loading failure will occur.

## Alipay Mini Games Known issues

Currently, our adaptation of Alipay Mini Games has not been completely completed, and the following modules are still not supported:

- WebView
- VideoPlayer
- Subpackage Loading
- Custom Font

The above functions are expected to be gradually supported in future updates, and we will continue to communicate closely with Alipay Mini Games engineers to continuously optimize the adaptation effect.

## About Documentation

Since the documents related to Alipay mini games are currently only open to the inside, you can contact them directly if needed:

| Contacts | Email |
| ----- | ----- |
| LiZhi | lz98684@alibaba-inc.com      |
| HuangJiao | huangjiao.hj@alibaba-inc.com |
