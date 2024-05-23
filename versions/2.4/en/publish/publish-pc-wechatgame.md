# Access to the WeChat PC Mini Games

WeChat PC mini game is support to open WeChat Mini Game in the WeChat PC Client. The WeChat PC mini game will have most of the capabilities of Mobile, including but not limited to virtual payment, open data context, touch events, etc. (Ads are not currently supported). It also provides keyboard events, mouse events, window customization and other features.

Starting with Cocos Creator v2.3.1, creating games for the WeChat PC Mini Games is officially supported. And completes the adaptation of mouse and keyboard related interfaces.

## Use Cocos Creator to access to WeChat PC mini games with one click.

### Preparatory work

1. Download and install the latest version of [WeChat PC Client](https://developers.weixin.qq.com/community/minigame/article/doc/0002ce5cc94270784ef9a591c50013) and login to it with the WeChat account bound to the WeChat DevTools.

2. Development permissions, WeChat team has now opened the relevant permissions for all WeChat IDs that bound the development permissions in the mini game background. Newly bound WeChat ID, can be debugged the next day.

### Release Steps

1. Refer to the process of [Publish to WeChat Mini Games](./publish-wechatgame.md) and publish the game project to the WeChat Mini Game.

2. In the **WeChat DevTools**, click the **Settings -> General Settings** button in the menu bar, and then check the **Launch PC for auto preview**.

    ![](./publish-pc-wechatgame/wechat-devtool-preference.png)

3. Click the **Preview** button in the **WeChat DevTools**, select the **Automatic Remote Debug** tab and click **Compile and Remote Debug** to preview and debug the mini game on the WeChat PC Client.

## FAQ

Q: How to distinguish the **Mobile** and **PC** of WeChat through the engine interface?<br>
A: You can determine by `cc.sys.isMobile` that the PC side returns `false` and the mobile side returns `true`.

> **Note**: the simulator on the WeChat DevTools simulates the environment on the mobile, so this returns `true`.

Q: Does the WeChat PC mini game support Mac?<br>
A: Not yet supported. By 2020-03-09, WeChat PC mini game is in the open beta phase, and it only supports Windows currently. Later on, we will actively cooperate with the engineers of WeChat PC mini game to adapt the Mac system at the first time.

## Related Reference Links

- [WeChat PC mini game access guide](https://developers.weixin.qq.com/minigame/dev/guide/open-ability/pc-game.html)  
- [WeChat PC Client Download](https://developers.weixin.qq.com/community/minigame/article/doc/0002ce5cc94270784ef9a591c50013)
