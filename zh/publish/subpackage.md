# 小游戏分包

部分小游戏平台支持分包功能用来对资源和脚本进行划分，Creator 也将分包功能整合到 Asset Bundle 的工作流中，你可以在 Asset Bundle 的压缩类型选项中将压缩类型设置为 **小游戏分包**，则 Asset Bundle 将被构建到小游戏分包中。详细内容请参考 [Asset Bundle](../asset-manager/bundle.md#压缩类型)

如果发布平台支持分包功能，比如在微信小游戏的构建中，分包的配置也会按照规则自动生成到微信小游戏发布包目录下的 **game.json** 配置文件中。

![profile](subpackage/profile.png)

**注意**：微信小游戏需要特定的版本才能支持分包功能。微信 6.6.7 客户端，2.1.0 及以上基础库开始支持，请更新至最新客户端版本，开发者工具请使用 1.02.1806120 及以上版本。更新了开发者工具后不要忘记修改开发者工具中的 **详情 -> 项目设置 -> 调试基础库** 为 2.1.0 及以上：

![subpackage2](./subpackage/subpackage2.png)

### 分包加载包大小的限制

目前微信小游戏分包大小有以下限制：

- 整个微信小游戏所有分包大小不超过 **8M**
- 单个分包/主包大小不能超过 **4M**

具体请参考 [微信小游戏分包加载官方文档](https://developers.weixin.qq.com/minigame/dev/guide/base-ability/sub-packages.html)。

### vivo 小游戏

在 vivo 小游戏的构建中，分包的配置也会按照规则自动生成到 vivo 小游戏发布包 qgame/src 目录下的 **manifest.json** 配置文件中。

![profile](./subpackage/vivo_profile.png)

**注意**：

- Creator **v2.1.3** 开始支持 vivo 小游戏分包加载。
- **快应用 & vivo 小游戏调试器** 从 **1051** 版本开始支持 vivo 小游戏分包加载。低于 1051 的版本虽然不支持分包加载，但是也做了兼容处理，如果勾选了分包也不会影响游戏正常运行。具体可参考 [vivo 分包加载-运行时兼容](https://minigame.vivo.com.cn/documents/#/lesson/base/subpackage?id=%e8%bf%90%e8%a1%8c%e6%97%b6%e5%85%bc%e5%ae%b9)。

  ![](./subpackage/vivo_subpackage.png)

### 分包加载包大小的限制

目前 vivo 小游戏分包大小有以下限制：

- 整个小游戏的所有分包及主包大小不超过 **8M**（打包完成后的整个压缩包包含整包不超过 **12M**，详情可参考 [vivo 分包加载-编译时兼容](https://minigame.vivo.com.cn/documents/#/lesson/base/subpackage?id=%e7%bc%96%e8%af%91%e6%97%b6%e5%85%bc%e5%ae%b9)）
- 单个分包/主包大小不能超过 **4M**

具体请参考 [vivo 小游戏分包加载官方文档](https://minigame.vivo.com.cn/documents/#/lesson/base/subpackage)。