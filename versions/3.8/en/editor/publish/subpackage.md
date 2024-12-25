# Mini Game Subpackage

Some mini game platforms support subpackaging to divide resources, scripts and scenes. Including WeChat Mini Game, Baidu Mini Game, Xiaomi Quick Game, Douyin Mini Game, Huawei Quick Game, OPPO Mini Game and vivo Mini Game.

Cocos Creator supports [Asset Bundle](../../asset/bundle.md) starting in v2.4, which allows developers to divide contents that need to be subpackaged into multiple Asset Bundles, and these Asset Bundles will be built into subpackages of the mini game. Only the necessary main packages will be downloaded when you startup the game, and these subpackages will not be loaded, but will be manually loaded by the developer during the game. This effectively reduces the time for the game startup.

## Configuration

The Asset Bundle is configured in **folders**. When we select a folder in the **Assets** panel, the **Inspector** panel will show a **Is Bundle** option, if set, the folder-related configuration options will appear:

![subpackage configuration](subpackage/subpackage-config.png)

In addition to the general [Asset Bundle Configuration](../../asset/bundle.md#configuration), the main settings to focus on for the mini game subpackage are:
- Set the **Target Platform** to the mini game platform that you want to subpackage, and set the **Compression Type** to the **Mini Game Subpackage**.
- The mini game subpackage can only be placed locally and cannot be configured as remote packages, so the **Is Remote Bundle** option cannot be checked.

Once configured, click the **Check** button on the top right and the folder will be configured as a Asset Bundle.

## Build

When building, the **Main Bundle Compression Type** in the **Build** panel should be set to **Mini Game Subpackage**. For detailed instructions, please refer to the [Asset Bundle - Compression Type](../../asset/bundle.md#compression-type) documentation.

After the project is built, this Asset Bundle folder is packaged into the `subpackages` folder in the release package directory of the mini game platform. Each folder contained in this folder is an Asset Bundle.

**For example**, if the `assets/scene` folder in the Hello World project is configured as an Asset Bundle on the WeChat Mini Game, then after the project is built, a `scene` folder is generated in the `subpackages` folder in the release package directory, and the `scene` folder is an Asset Bundle.

![subpackage](subpackage/subpackage.png)

## WeChat Mini Games

When building for the WeChat Mini Game, the configuration of the Asset Bundle will be automatically generated into the `game.json` configuration file of the WeChat Mini Games release package directory according to the rules.

![profile](subpackage/profile.png)

> **Note**: WeChat Mini Games require a specific version to support the Subpackage feature. WeChat 6.6.7 client, 2.1.0 and above base library support, please update to the latest client version. Developer tools please use version **1.02.1806120** and above. After updating the developer tools, don't forget to modify the version of **Details -> Local Settings -> Debug Base library** to 2.1.0 and above in the WeChat DevTools:
>
> ![devtools setting](./subpackage/devtools-setting.png)

### Subpackage Load Packet Size Limit

Currently, the size of the WeChat Mini Game subpackage has following restrictions:

- The size of all subpackage of the entire Mini Game can not exceed **30M**.
- The size of a single subpackage is not limited.
- The main package size can not exceed **4M**.

Please refer to the [WeChat Mini Game Subpackage Loading](https://developers.weixin.qq.com/minigame/en/dev/guide/base-ability/subPackage/useSubPackage.html) documentation for details.

## ByteDance Mini Game

When building for the ByteDance Mini Game, the configuration of the Asset Bundle will be automatically generated into the `game.json` configuration file of the ByteDance Mini Games release package directory according to the rules.

![profile](subpackage/profile.png)

For the specific property meanings in game.json, you can refer to the documentation:[ByteDane Mini Game Configurition](https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/develop/framework/mini-game-configuration/).

### Subpackage Limit

Currently, the size of the WeChat Mini Game subpackage has following restrictions:

- The size of all subpackage of the entire Mini Game can not exceed 20MB​
- The main package size can not exceed 4MB
- The size of a single subpackage can not exceed 20MB

> The ByteDance Mini Game Open Data Context is similar to the subpackage, which can not exceed a size of 4MB.

For more details, pelease refer to:[ByteDance Mini Game Subpackage](https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/develop/framework/subpackages/introduction).

## vivo Mini Games

When building for the vivo Mini Game, the configuration of the Asset Bundle will be automatically generated into the `manifest.json` configuration file in the `vivo-mini-game/src` directory of the vivo Mini Game release package according to the rules.

![profile](./subpackage/vivo-profile.png)

> **Notes**:
> 1. Starting with **1051** version, **Quick App & vivo Mini Game Debugger** supports the subpackage loading of vivo Mini Game. Versions lower than 1051 do not support subpackage loading, but they are also compatible. If a subpackage is configured in the editor's **Properties** panel, it will not affect the normal operation of the game. Please refer to the [vivo Mini Game Subpackage Loading -- Runtime Compatibility [cn]](https://minigame.vivo.com.cn/documents/#/lesson/base/subpackage?id=%e8%bf%90%e8%a1%8c%e6%97%b6%e5%85%bc%e5%ae%b9) documentation for details.
> 2. Unlike other mini game platforms, the Asset Bundle folder for the vivo Mini Game will be generated in the `src` directory of release package `vivo-mini-game` directory after the project is built.
>
>     ![vivo-subpackages](./subpackage/vivo-subpackages.png)

### Subpackage Load Packet Size Limit

Currently, the size of the vivo Mini Game subpackage is limited to 20M (4M for main package and 16M for subpackages).

Please refer to the [vivo Mini Game Subpackage Loading [cn]](https://minigame.vivo.com.cn/documents/#/lesson/base/subpackage) documentation for details.
