# Publish to Youku Mini Games

> Starting from v2.4.4, Alipay Mini Game has supported Youku.

## Environment Configuration

- Download [Alipay Mini Program Studio](https://opendocs.alipay.com/mini/ide/download) on the PC and install it.

  > **Note**: currently, the mini game entry in Alipay Mini Program Studio is only open to the internal, developers can apply through the contact information at the end of the document.

- Download [Alipay](https://mobile.alipay.com/index.htm) and install it on your phone. The minimum supported version of Alipay on Android is 10.1.75, on iOS is 10.1.78.

## Release Process

Use Cocos Creator to open the project that needs to be released. Open the **Build** panel from the **Menu bar -> Project**, select **Youku Mini Game** in the Platform dropdown and then click **Build**.

![](./publish-alipay-mini-games/build_option.png)

### Configuration Options

The specific filling rules for the relevant options configuration are as follows:

- **Main Bundle Compression Type**

  Set the compression type of the main package, please refer to the [built-in Asset Bundle — `main`](../asset-manager/bundle.md#the-built-in-asset-bundle) documentation for details.

- **Main Bundle Is Remote**

  This option is optional and needs to be used with the **Resource Server Address** option.<br>
  If set, the main package is configured as a remote package, and along with its related dependent resources are built into a built-in Asset Bundle — [main](../asset-manager/bundle.md#the-built-in-asset-bundle) under the **remote** folder of the release package directory. You need to upload the entire **remote** folder to the remote server.

- **Start Scene Asset Bundle**

  This option is optional.<br>
  If set, the start scene and its related dependent resources are built into the built-in Asset Bundle — [start-scene](../asset-manager/bundle.md#the-built-in-asset-bundle) to speed up the resource loading of the start scene. Please refer to the [Start Scene Loading](publish-wechatgame.md#speed-up-the-loading-of-the-start-scene) for details.

- **Resource Server Address**

  This option is optional and used to fill in the address of the remote server where the resources are stored. You need to manually upload the **remote** folder from the release package directory to the filled resource server after build.

### Run the Preview

- After the build is complete, click the **Open** button behind the **Build Path**. You can see that the mini game's project folder **youku** directory is generated under the default release path build directory, which has included mini game environment configuration file `game.json`.

  ![](./publish-alipay-mini-games/build.png)

- Use **Alipay Mini Program Studio** to open **youku** directory. Next, you can open Youku Mini Game project to preview and debug game content.

  > **Note**: the mini game entry in Alipay Mini Program Studio needs to apply for developer permission to open, please apply through the contact information at the end of the document.

## Resource Management for Youku Mini Game Environment

**Youku Mini Game** is similar to the **WeChat Mini Game**. There are restrictions on the package size. Resources over **4MB** must be downloaded via a network request.

Cocos Creator already helps developers with downloading, caching and version management of remote resources. The specific implementation logic and operation steps are similar to the WeChat Mini game. Please refer to the [Resource Management for WeChat Mini Game](./publish-wechatgame.md#resource-management-for-the-wechat-mini-games) documentation for details.

> **Note**: currently, Youku Mini Game only supports loading resources from remote server via **HTTPS** on the physical device, so the resource file must be placed on the **HTTPS** server, otherwise the resource loading failure will occur.

## Limitations of the Youku Mini Games

The following modules are still not supported:

- WebView
- VideoPlayer
- Custom Font

## About Documentation

Since the Youku Mini Game entry and related documentation are currently only open to the internal, you can contact them directly if needed:

| Contacts | Email |
| :----- | :----- |
| Ning Yu | yoaer.ty@antgroup.com      |
| Jiao Huang | huangjiao.hj@alibaba-inc.com |
