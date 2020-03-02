# 接入微信 PC 小游戏

微信 PC 小游戏即支持在 PC 微信客户端打开微信小游戏。PC 小游戏将兼容移动端的大部分能力，包括但不限于虚拟支付、开放数据域、触摸事件等（广告目前暂不支持），大部分小游戏无须针对 PC 小游戏做额外开发工作。同时平台将提供专门针对 PC 的开发能力，如键盘事件、鼠标事件及窗口自定义等。

Cocos Creator 从 v2.3.1 开始支持了微信 PC 小游戏，并完成了鼠标、键盘相关接口的适配工作。下面我们来看看，如何通过 Cocos Creator 将游戏发布到微信 PC 小游戏平台。

## 使用 Cocos Creator 接入微信 PC 小游戏

### 准备工作
1. 从 [PC 微信小游戏开放测试帖](https://developers.weixin.qq.com/community/minigame/article/doc/0002ce5cc94270784ef9a591c50013) 下载最新的测试版微信客户端

2. 开发者需要具备开发权限，目前微信团队已经为所有在小游戏后台绑定了开发权限的微信号开通了相关权限。新绑定的微信号，需要第二天才可以调试

### 发布调试流程
1. 参考 [发布微信小游戏](./publish-wechatgame.md) 的流程，将 Cocos Creator 的游戏工程发布到微信小游戏平台

2. 使用下载的最新测试版微信客户端登录微信账号，并始终保持客户端处于运行状态

3. 在微信开发者工具里，通过 **设置 -> 通用设置** 选择 **启动 PC 端自动预览**

    ![](./wechat-pc-end/wechat-devtool-preference.png)

4. 在微信开发者工具的工具栏里，点击 **预览** 图标，选择 **自动预览** 选项卡，点击 **编译并预览** 即可预览微信 PC 小游戏

## 常见问题
1. 怎么通过引擎接口区分 **微信移动端** 与 **微信 PC 端** ？  
可以通过 `cc.sys.platform === cc.sys.WECHAT_GAME && cc.sys.isMobile` 来进行判断，PC 端是 `false`，移动端是 `true`。  
**注意**：微信开发者工具里的模拟器，模拟的是移动端环境，所以这里返回的是 `true`。

2. 微信 PC 小游戏可以发布到 mac 平台吗？  
暂时不可以，时间截至 2020-03-02，微信 PC 小游戏目前正处于开放测试阶段，暂时只支持了 windows 平台。之后如果有更新，引擎团队会跟进并配合完成相关适配工作。

## 相关链接
[微信 PC 小游戏接入指南](https://developers.weixin.qq.com/minigame/dev/guide/open-ability/pc-game.html)  
[测试版微信客户端下载](https://developers.weixin.qq.com/community/minigame/article/doc/0002ce5cc94270784ef9a591c50013)