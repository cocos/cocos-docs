# 快速开始

## 内容简介

- 本文档主要介绍如何在一个 Cocos Creator 空白项目中，通过 **服务** 面板，一键接入 Cocos Analytics 统计服务，并通过 Cocos Analytics 初始化成功信息，验证接入效果。
- 本文档面向 Cocos Creator 初学者，有一定基础的开发者可直接跳转到 [基础使用](basic-user-guide.md) 部分。

## 一键接入 Cocos Analytics 服务

- 使用 Cocos Creator 打开需要接入 Cocos Analytics 统计服务的项目工程。
- 点击菜单栏的 **面板 -> 服务**，打开 **服务** 面板。设定 Cocos AppID 后，选择 Cocos Analytics 项，进入 Cocos Analytics 服务设置面板。然后点击右上方的 **启用** 按钮以开通统计服务。详情可参考 [Cocos Service 操作指南](../user-guide.md)。

  ![](image/analytics-panel.png)

- 开通服务后在 Cocos Analytics 服务设置面板中可以看到新增了 **参数配置** 项，包括 **AppID** 和 **store** 两个参数，以及 **重新加载预览插件** 按钮：

  - AppID 会自动填入当前绑定的游戏 AppID。
  - store 为游戏分发渠道 ID，长度为 200。该项可以任意设置，只要确保在 [Cocos Analytics 账户中心](http://analytics.cocos.com/) 获取统计结果时能够区分即可。
  - 重新加载预览插件：Cocos Analytics 预览插件，开发者可以在浏览器预览中使用该 SDK。暂时不支持模拟器。

  参数配置完成后点击 **重新加载预览插件** 按钮，导入预览插件，即可完成接入工作。

## 验证 Cocos Analytics 服务接入

接入 Cocos Analytics 服务后，我们便可以在场景中添加简单的代码，通过脚本调试验证接入是否成功。

- 在 **资源管理器** 中选中 `assets` 文件夹，然后点击右键，选择 **新建 -> Scene** ，添加场景文件。
- 在 **资源管理器** 中选中 `assets` 文件夹，然后点击右键，选择 **新建 -> JavaScript** ，添加脚本文件。
- 在 **资源管理器** 中双击刚才新建的场景 `New Scene`，然后在 **层级管理器** 中选中 `Canvas` 节点。
- 将 **资源管理器** 中新建的脚本文件 `NewScript` 拖拽到 **属性检查器** 面板中。

  ![](../image/creator-new-file.jpg)

- Cocos Analytics 的 SDK 已通过 **全局变量** 的方式自动集成到项目工程中，并在启动时自动调用初始化方法，无需额外处理。

- 修改脚本文件，例如在 `start` 方法中打开 Debug 输出后，调用 Cocos Analytics 的开始登录方法 `loginStart`：

    ```js
    // NewScript.js

    cc.Class({
        extends: cc.Component,

        properties: {

        },

        start: function () {
            cocosAnalytics.enableDebug(true); //开启(关闭)本地日志的输出
            cocosAnalytics.CAAccount.loginStart({ // 开始登录方法
            channel: '99888',   // 获客渠道，指获取该客户的广告渠道信息   
            });
        },

    });
    ```

- 脚本修改完成并保存后，回到编辑器。在编辑器上方选择 **浏览器**，然后点击 ![](../image/preview-button.jpg) [预览](../../getting-started/basics/preview-build.md) 按钮进行调试。若能在日志中看到初始化和登录方法的日志，则可验证 Cocos Analytics 接入成功。

  ![](image/analytics-debugging.jpg)

---

继续前往 [基础使用](basic-user-guide.md)
