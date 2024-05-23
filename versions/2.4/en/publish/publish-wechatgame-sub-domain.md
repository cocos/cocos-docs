# Access to the Open Data Context of WeChat Mini Games

In order to protect its social relationship chain data, WeChat Mini Games has added the concept of **Open Data Context**, which is a separate game execution environment. The resources, engines, and programs in the Open Data Context are completely isolated from the main game. Developers can access the `wx.getFriendCloudStorage()` and `wx.getGroupCloudStorage()`, the two APIs provided by WeChat, only in the Open Data Context. These APIs will help to implement some features, such as leaderboards. Since the Open Data Context can only be rendered on the offscreen canvas, `sharedCanvas`, we need to draw the `sharedCanvas` onto the main context.

Since the Open Data Context is a closed, independent JavaScript scope, developers need to create two projects:

  - Main context project (normal game project)
  - Open Data Context project Engineering (projects that use the WeChat API to obtain user data for functions such as leaderboards)

In the Open Data Context project, it is packaged independently through the Open Data Context packaging process and placed in the WeChat build package of the main context project, which can be previewed and debugged on the simulator and physical device as a complete WeChat project.

## Integration method

- Create an Open Data Context project to obtain user data through the relevant API, and create a display of UI according to your own needs. The entire Open Data Context project should only contain its content UI. The design resolution of the Canvas component in the scene should be set to the full resolution of the UI, without the corresponding main context resolution.
- Create a node in the main context as an Open Data Context container, add the `SubContextView` component to set the Open Data Context view and update the Open Data Context texture. The aspect ratio of this node should be equal to the aspect ratio of the Open Data Context design resolution (otherwise stretching happens).

  > **Note**: as of **v2.4.1**, the `WXSubContextView` is deprecated, please use `SubContextView`.

The difference from the previous version is:

1. It is completely free to control the size of the Open Data Context, reduce the resolution and improve the performance, and improve the resolution optimization effect, which can be easily done in the Open Data Context.
2. The contents of the Open Data Context will be directly scaled into the container node area of ​​the main context, and no stretch will occur as long as the aspect ratio is consistent.
3. The event response of the Open Data Context is handled by the engine, and the user does not need to care.
4. The texture update of the Open Data Context is handled by the engine, and the user does not need to care.

## SubContextView Tips

This is the core component of the Open Data Context solution. In addition to the regular requirements that can be met, there are a few tricks that allow users to better control the performance of Open Data Contexts.

- **View update**

  In general, the Open Data Context view is fixed, but there are also cases where the Open Data Context is updated in the view node of the main context, such as using the Widget to adapt the parent node, such as the case where the design resolution changes after the scene switch. Or the developer manually adjusted the size of the view. In this case, the developer must call the `updateSubContextViewport` interface to update the view parameters in the Open Data Context so that the event can be correctly mapped to the Open Data Context view.

- **Manually update the texture**

  When the Open Data Context is evoked, as soon as the SubContextView component load succeeds, the Open Data Context texture begins to update to the main context and is displayed, after which the texture is updated every frame. However, the update of the Open Data Context texture may sometimes be costly, and the Open Data Contexts designed by developer is a static interfaces (such as page-turning interfaces), in this case, you do not need to update the texture per frame, you can try to prevent each frame updating logic by disabling components and update it by manually calling the update function when needed:

  ```javascript
  subContextView.enabled = false;
  subContextView.update();
  ```

  This manual control is the best performance solution. If you need to turn on automatic update texture, the main loop of the Open Data Context resumes execution when the **SubContextView** component is enabled.

- **Set the texture update frequency**

  In Creator v2.1.1, the **FPS** property has been added to the **SubContextView** component, and the user can directly control the frame rate of Open Data Context by setting **FPS**.

  ![](./publish-baidugame/subcontext.png)

  The **FPS** property has the following two advantages:

  - The Main Context will calculate an **update interval** ​​based on the set **FPS**. This **update interval** prevents the engine from frequently calling **update** to update the Canvas texture of Open Data Context.

  - By reducing the FPS of Open Data Context, you can also reduce the performance overhead of Open Data Context to some extent.

    > **Note**: the FPS property overrides the `cc.game.setFrameRate()` implementation of the Open Data Context, so it is recommended to set the FPS property of the SubContextView component directly in the Main Context project.

- **Controlling engine main loop in Open Data Context**

  In Creator **v2.4.3**, we have improved the control of the engine main loop in the Open Data Context, which is not run by default. The engine main loop will only run if the SubContextView component is enabled, and will stop if the SubContextView component is disabled.

  When the SubContextView component is not enabled, the engine main loop does not run, so the business logic written in the component life cycle of the project is not executed. Therefore, some of the business logic that needs to be executed before the SubContextView component is enabled should be written outside the component or in the plugin script.

  One exception to note here is that since the Open Data Context will load the start scene by default, the `onLoad` callback is executed for components that are activated by default in the start scene. For example:

  ```js
  console.log("do some stuff before enabling SubContextView component");

  cc.Class({
      extends: cc.Component,

      onLoad () {
          console.log("execute if it's enabled in the start scene");
      },

      start () {
          console.log("won't execute before enabling SubContextView component");
      },
  });
  ```

  In addition, in an Open Data Context project, if you need to listen for messages from the main context, you need to determine whether the messages come from the main context engine first:

  ```js
  wx.onMessage(res => {
      if (!(res && res.fromEngine)) {
          console.log('do something...');
      }
  });
  ```

## Module selection

Since the code and resources of the WeChat Open Data Context cannot be shared with the main context, it is very sensitive to the package. The developer needs to set the [project module culling option](../getting-started/basics/editor-panels/project-settings.md) for the Open Data Context project. It should be noted that starting with v2.0.0, developers can't check the WebGL Renderer in Open Data Context projects. The Canvas Renderer must be checked because the Open Data Context only supports Canvas rendering. At the same time, the rendering components supported under Canvas rendering are also limited (the UI components are not limited) and currently only support:

- Sprite
- Label
- Graphics
- Mask

## Release Steps

1. Open the main context project, open the **Build** panel in **Menu Bar -> Project**, select the **WeChat Mini Game** in the **Platform**, and fill in the **Open Data Context Root**. This directory is the path to the publishing package that is generated after the Open Data Context is built. Then click on **Build**.

    ![](./publish-wechatgame/maintest-build.png)

    This step will help the user automatically configure the __Open Data Context Root__ into the main context project `build -> wechatgame -> game.json` to identify the directory where the Open Data Context file is located under the main context release package.

    ![](./publish-wechatgame/game-json.png)

2. Open the Open Data Context project, open the **Build** panel, select the **WeChat Mini Game Open Data Context**.

3. The **Build Path** set the same path in the **Open Data Context Root** filled in the main context, that is, assigned to the release package directory of the main context project. Then click on **Build**.

    > **Note**: the **Title** in the **Build** panel must match the name of the **Open Data Context Root** set in the main context project.

    ![](./publish-wechatgame/open-data-project-build.png)

    Or you can not modify the **Build Path** to manually copy the release package to the release package directory of the main context project after the Open Data Context project is built. As shown below:

    ![](./publish-wechatgame/package.png)

4. Click **Run** in the main context project to launch the WeChat Mini Game Developer tool, and then publish and debug according to the normal process of the previous WeChat Mini Game.

    ![](./publish-wechatgame/preview.png)

> **Note**: because WeChat Mini Games will support WebGL rendering mode for Open Data Context in later versions, so Creator adapted WebGL mode for Open Data Context in v2.0.9. However, it currently cause the project to appear **[GameOpenDataContext] Open Data Context only supports using 2D rendering mode** error message when running in the WeChat DevTools. This error message is due to the use of `document.createElement("canvas").getContext("webgl")` to detect if WeChat mini games supports WebGL, it will not affect the normal use of the project, you can ignore it.

### Reference link

- [Cocos Creator Open Data Context Sample Project of Mini Games](https://github.com/cocos/cocos-example-open-data-context)

- [WeChat official document: Relationship Chain Data Usage Guide](https://developers.weixin.qq.com/minigame/en/dev/guide/open-ability/open-data.html)
