# Access to the open data domain of WeChat games

In order to protect its social relationship chain data, **WeChat Games** has added the concept of **Open Data Domain**, which is a separate game execution environment. The resources, engines, and programs in the open data domain are completely isolated from the main game. Developers can access the two `wx.getFriendCloudStorage()` and `wx.getGroupCloudStorage()` APIs provided by WeChat only in the open data domain. For example, the function of the leaderboard. Since the open data field can only be rendered on the offscreen canvas sharedCanvas, we need to draw the sharedCanvas onto the main domain.

Since the open data domain is a closed, independent JavaScript scope, developers need to create two projects:

- Main domain project (normal game project)
- Open Data Domain Project Engineering (projects that use the WeChat API to obtain user data for functions such as leaderboards)

In the open data domain project, it is packaged independently through the open data domain packaging process and placed in the WeChat build package of the main domain project, which can be previewed and debugged on the simulator and real machine as a complete WeChat project.

Cocos Creator supports packaging to open data domains since v1.9.1, and an important update in v2.0.1. The two versions are used differently, as described below.

#新版Open Data Domain Release

Applicable to v2.0.1 and higher, v1.9.1 to v2.0.0 version please refer to [old version open data domain release] (./publish-wechatgame-sub-domain.md# old version open data domain release).

## Integration method

- Create an open data domain project to obtain user data through the relevant API, and create a display of ui according to your own needs. The entire open data domain project should only contain its content UI, and the design resolution of the Canvas component in the scene should be set to the full resolution of the UI, without the corresponding primary domain resolution.
- Create a node in the primary domain as an open data domain container, add the WXSubContextView component to set the open data domain window and update the open data domain map. The aspect ratio of this node should be equal to the aspect ratio of the open data domain design resolution (otherwise Stretching will occur).

The difference from the previous version is:

1. It is completely free to control the size of the open data domain, reduce the resolution and improve the performance, and improve the resolution optimization effect, which can be easily done in the sub-domain.
2. The contents of the open data field will be directly scaled into the container node area of ​​the primary domain, and no stretch will occur as long as the aspect ratio is consistent.
3. The event response of the open data domain is handled by the engine, and the user does not need to care.
4. The texture update of the open data domain is handled by the engine, and the user does not need to care.

## WXSubContextView Tips

This is the core component of the new open data domain solution. In addition to the regular requirements that can be met, there are a few tricks that allow users to better control the performance of open data domains.

Window update

    In general, the open data field window is fixed, but there are also cases where the open data field is updated in the window node of the primary domain, such as using the Widget to adapt the parent node, such as the case where the design resolution changes after the scene switch. Or the developer manually adjusted the size of the window. In this case, the developer must call the `updateSubContextViewport` interface to update the window parameters in the subdomain so that the event can be correctly mapped to the subdomain window.

2. Manually update the map

    When the open data field is evoked, as soon as the WXSubContextView component load succeeds, the open data domain map begins to update to the main domain and is displayed, after which the texture is updated every frame. However, the update of the open data domain texture may sometimes be relatively high. The open data domain designed by the developer is a static interface (such as a page flip interface). In this case, the texture is not required to be updated every frame. You can try to disable it by disabling the component. Update the logic per frame and update it as needed by manually calling the update function:

    ```
    subContextView.enabled = false;
    subContextView.update();
    ```

    This manual control is the best performance solution.

## Module selection

Since the code and resources of the WeChat open data domain cannot be shared with the primary domain, it is very sensitive to the package. The developer needs to set the [project module culling option] for the open data domain project (../getting-started/basics/editor -panels/project-settings.md). It should be noted that starting with v2.0.0, developers can't check the WebGL Renderer in open data domain projects. The Canvas Renderer must be checked because the open data domain only supports Canvas rendering. At the same time, the rendering components supported under Canvas rendering are also limited (the UI components are not limited) and currently only support:

- Sprite
- Label
- Graphics
- Mask

## Release Steps

1. Open the main domain project, open the build release panel in `Menu Bar` - `Project`, select the `Wechat Game` platform, and fill in the [Open Data Field Code Directory]. This directory is the path where the open data domain is built, and this path needs to be placed in the main domain build directory. Then click on **Build**.

![](./publish-wechatgame/maintest-build.png)

This step will automatically configure the user to the main domain project `build -> wechatgame -> game.json` to identify the directory where the open data domain file is located under the main domain distribution package.

![](./publish-wechatgame/game-json.png)

Second, open the open data domain project, open the build release panel, select the `Wechat Game Open Data Context` platform.

Third, the **release path ** set the same path in the [open data domain code directory] filled in the main domain, that is, assigned to the release package directory of the main domain project. Then click on **Build**.

**Note**: **Game Name** must match the [Open Data Field Code Directory] name set in the main domain project.

![](./publish-wechatgame/open-data-project-build.png)

Or you can modify the **release path** to manually copy the release package to the release package directory of the primary domain project after the open data domain project is built. As shown below:

![](./publish-wechatgame/package.png)

4. Click [Run] in the main domain project to launch the WeChat Developer tool, and then publish and debug according to the normal process of the previous WeChat game.

![](./publish-wechatgame/preview.png)

**Note: If you publish the open data domain domain and then publish the primary domain, the release code of the open data domain will be overwritten, and we will optimize the experience in subsequent versions**

## Reference link

The [Open Data Domain Sample Project] (https://github.com/cocos-creator/demo-wechat-subdomain/archive/master.zip) provided by Cocos Creator contains examples of the use of WeChat open data fields.

[WeChat official document: Guide to the use of relational chain data] (https://developers.weixin.qq.com/minigame/dev/tutorial/open-ability/open-data.html)

---------------------

#旧版本开放数据域发布

The following method is applicable to v2.0.0. For earlier versions, please refer to [Accessing Open Data Domain of WeChat Game] (http://docs.cocos.com/creator/1.10/manual/en/publish/publish-wechatgame. Html#%E6%8E%A5%E5%85%A5%E5%BE%AE%E4%BF%A1%E5%B0%8F%E6%B8%B8%E6%88%8F%E7%9A%84 %E5%BC%80%E6%94%BE%E6%95%B0%E6%8D%AE%E5%9F%9F)

## Integration method

- Create an open data domain project to obtain user data through the relevant API, and create a display of ui according to your own needs. The subdomain must use a full screen window, maintaining the same design resolution and adaptation mode as the primary domain.
- The main domain creates the Texture2D by acquiring the global object sharedCanvas (Canvas of the open data domain), and then creates the SpriteFrame through the Texture2D, thereby assigning the SpriteFrame to the Sprite to be displayed to the main domain, if the open data field is operational Function (for example, operations such as sliding, dragging, etc.), then the primary domain needs to get the sharedCanvas in real time in the update to refresh the sprite.

## Module selection

Since the code and resources of the WeChat open data domain cannot be shared with the primary domain, it is very sensitive to the package. The developer needs to set the [project module culling option] for the open data domain project (../getting-started/basics/editor -panels/project-settings.md). It should be noted that starting with v2.0.0, developers can't check the WebGL Renderer in open data domain projects. The Canvas Renderer must be checked because the open data domain only supports Canvas rendering. At the same time, the rendering components supported under Canvas rendering are also limited (the UI components are not limited) and currently only support:

- Sprite
- Label
- Graphics
- Mask

**Primary domain code example: **

```js
    cc.Class({
        Extends: cc.Component,
        Properties: {
            Display: cc.Sprite
        },
        Start () {
            This.tex = new cc.Texture2D();
        },
        / / Refresh the texture of the open data domain
        _updateSubDomainCanvas () {
            If (!this.tex) {
                Return;
            }
            Var openDataContext = wx.getOpenDataContext();
            Var sharedCanvas = openDataContext.canvas;
            this.tex.initWithElement(sharedCanvas);
            this.tex.handleLoadedTexture();
            this.display.spriteFrame = new cc.SpriteFrame(this.tex);
        },
        Update () {
            this._updateSubDomainCanvas();
        }
    });
```

## Release Steps

1. Open the main domain project, open the build release panel in `Menu Bar` - `Project`, select the `Wechat Game` platform, and fill in the [Open Data Field Code Directory]. This directory is the path where the open data domain is built, and this path needs to be placed in the main domain build directory. Then click on **Build**.

![](./publish-wechatgame/maintest-build.png)

This step will automatically configure the user to the main domain project `build -> wechatgame -> game.json` to identify the directory where the open data domain file is located under the main domain distribution package.

![](./publish-wechatgame/game-json.png)

Second, open the open data domain project, open the build release panel, select the `Wechat Game Open Data Context` platform.

Third, the **release path ** set the same path in the [open data domain code directory] filled in the main domain, that is, assigned to the release package directory of the main domain project. Then click on **Build**.

**Note**: **Game Name** must match the [Open Data Field Code Directory] name set in the main domain project.

![](./publish-wechatgame/open-data-project-build.png)

Or you can modify the **release path** to manually copy the release package to the release package directory of the primary domain project after the open data domain project is built. As shown below:

![](./publish-wechatgame/package.png)

4. Click **Run** in the main domain project to launch the **WeChat Developer** tool, and then publish and debug according to the normal process of the previous **WeChat** game.

![](./publish-wechatgame/preview.png)

## Reference link

[Open Data Domain Sample Project](https://github.com/cocos-creator/demo-wechat-subdomain/archive/1.x.zip) provided by __Cocos Creator__ contains examples of the use of __WeChat__ open data fields.

[WeChat official document: Guide to the use of relational chain data](https://developers.weixin.qq.com/minigame/dev/tutorial/open-ability/open-data.html)
