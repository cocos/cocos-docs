# Cocos 数据统计（Cocos Analytics）

Cocos 数据统计用于记录玩家的游戏行为，并且在后台提供了数据分析支持。目前支持 Android／iOS／H5 平台。

本文档基于 **v2.0.7** 编写，若用户使用的版本在 v2.0.7 之前，请参考 [旧版本文档](https://github.com/cocos-creator/creator-docs/blob/3e87b0f25c73e74acdc316c141971c592fc8f982/zh/sdk/cocos-analytics.md)。

## 操作流程

1、在 [Cocos 账户中心](https://auth.cocos.com/#/) 点击侧边栏的 **游戏**  标签，根据需要选择个人/公司游戏，然后点击 **创建游戏**。在创建游戏面板根据要求填写必须的参数，然后点击 **提交**，游戏就创建完成了。

![](cocos-analytics/game.png)

2、游戏创建完成后，需要 **开通 Cocos Analytics 服务**。点击游戏或者点击上方的 **服务** 标签，跳转到服务面板。找到 Cocos Analytics，点击 **开通服务**，可以看到页面中的 Cocos Analytics 服务显示 **已开通**。

![](cocos-analytics/analytics_service.png)

3、打开 Creator，点击 **菜单栏的 -> 面板 -> 服务** 项，打开 **服务** 面板。设置 Cocos AppID，详情可参考 [Cocos 服务面板设置](cocos-services.md)。然后选择 **Cocos Analytics** 项，进入 Cocos Analytics 服务设置面板。

4、点击右上角的启用按钮以启用统计服务。（如果之前没有在 Cocos 账户中心开通统计服务，即第 2 个步骤，那么在启用统计服务的时候会弹出是否开通服务的提示框，根据提示进行操作即可。）

![](cocos-analytics/enable_analytics.png)

5、启用完成之后，在服务面板可以看到新增了 **参数配置** 项，填入参数。获取参数方式如下：

![](cocos-analytics/analytics_properties.png)

  - **AppID** 和 **AppSecret**：点击 Cocos Analytics 服务面板中的 **前往控制台**，跳转到 [Cocos 数据统计后台](https://analytics.cocos.com/)。然后点击左上方的 **Cocos Analytics** 跳转到首页面，选择相对应的游戏，点击设置按钮，便可以获取 **AppID** 和 **AppSecret** 参数。如下图所示：

    ![](cocos-analytics/get_properties.png)

  - **channel** 和 **version**：分别为渠道 ID 和版本号。这两个参数用户可以任意设置，只要在获取统计结果时能够区分即可。

6、参数配置完成之后点击 **保存**。然后打开 **构建发布** 面板根据用户需要选择 **Android／iOS／H5** 平台进行构建编译。构建出来的发布包已经自动集成了 Cocos Analytics 服务。

游戏加载后，统计 SDK 会在项目构建后的 main.js 文件中初始化，并且传入上面设置的参数。如果有批量发布的需要，也可以手动在 main.js 中修改这些参数。初始化后便可以直接调用统计的 SDK，发送各种统计数据给服务器。

## 各平台接入集成

根据游戏需求，参考以下文档来进行接入集成。  

- [Android 平台接入集成](https://analytics.cocos.com/docs/manual_android.html)
- [iOS 平台接入集成](https://analytics.cocos.com/docs/manual_ios.html)
- [H5 平台接入集成](https://analytics.cocos.com/docs/manual_h5.html)

详细的产品和 API 说明，请参考 [Cocos Analytics 产品文档](https://analytics.cocos.com/docs)

## 相关参考链接

- [Cocos 账户中心](https://auth.cocos.com/#/)
- [Cocos 数据统计后台](https://analytics.cocos.com/)
- [Cocos Analytics 产品文档](https://analytics.cocos.com/docs)
- [Android 平台接入集成](https://analytics.cocos.com/docs/manual_android.html)
- [iOS 平台接入集成](https://analytics.cocos.com/docs/manual_ios.html)
- [H5 平台接入集成](https://analytics.cocos.com/docs/manual_h5.html)
