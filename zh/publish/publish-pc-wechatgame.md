# 接入微信 PC 小游戏

微信 PC 小游戏即支持在微信 PC 版打开微信小游戏。PC 小游戏将具备移动端的大部分能力，包括但不限于虚拟支付、开放数据域、触摸事件等（广告目前暂不支持）。同时 PC 小游戏还支持键盘、鼠标事件及自定义窗口等功能。

Cocos Creator 从 v2.3.1 开始支持将游戏发布到微信 PC 小游戏，并完成了鼠标、键盘相关接口的适配工作。下面我们来看看，如何通过 Cocos Creator 将游戏发布到微信 PC 小游戏平台。

## 使用 Cocos Creator 接入微信 PC 小游戏

### 准备工作

1. 下载并安装最新版本的 [微信 PC 版](https://developers.weixin.qq.com/community/minigame/article/doc/0002ce5cc94270784ef9a591c50013)，使用微信开发者工具绑定的微信号登录微信 PC 版。

2. 开发者需要具备开发权限，目前微信团队已经为所有在小游戏后台绑定了开发权限的微信号开通了相关权限。新绑定的微信号，需要第二天才可以调试。

### 发布流程

1. 参考 [发布到微信小游戏](./publish-wechatgame.md) 的流程，将项目工程发布到微信小游戏。

2. 在 **微信开发者工具** 中，点击菜单栏中的 **设置 -> 通用设置** 按钮，然后勾选 **启动 PC 端自动预览**。

    ![](./publish-pc-wechatgame/wechat-devtool-preference.png)

3. 点击 **微信开发者工具** 工具栏中的 **预览** 按钮，选择 **自动预览** 选项卡并点击 **编译并预览**，即可在微信 PC 版预览并调试小游戏。

## 常见问题

Q：如何通过引擎接口区分微信的 **移动端** 与 **PC 端**？<br>
A：可以通过 `cc.sys.isMobile` 判断，PC 端返回 `false`，移动端返回 `true`。<br>
**注意**：微信开发者工具中的模拟器，模拟的是移动端环境，所以这里返回的是 `true`。

Q：微信 PC 小游戏支持 Mac 系统吗？<br>
A：暂时不可以。截至 2020-03-09，微信 PC 小游戏正处于开放测试阶段，暂时只支持 Windows 系统。后续我们也将积极配合微信 PC 小游戏的工程师们，第一时间适配 Mac 系统。

## 相关链接

- [微信 PC 小游戏接入指南](https://developers.weixin.qq.com/minigame/dev/guide/open-ability/pc-game.html)  
- [微信 PC 版下载](https://developers.weixin.qq.com/community/minigame/article/doc/0002ce5cc94270784ef9a591c50013)
