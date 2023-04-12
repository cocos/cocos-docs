# 快速上手：制作第一个游戏

您正在阅读的手册文档包括了系统化的介绍 Cocos Creator 的编辑器界面、功能和工作流程，但如果您想快速上手体验使用 Cocos Creator 开发游戏的大体流程和方法，这一章将满足您的好奇心。完成本章教程之后，您应该能获得足够上手制作游戏的信息，不过我们还是推荐您继续阅读本手册来了解各个功能模块的细节和完整的工作流程。

接下来就让我们开始吧，跟随教程我们将会制作一款名叫 **摘星星** 的小游戏。这款游戏的玩家要操作一个反应 **迟钝** 却蹦跳不停的小怪物来碰触不断出现的星星，难以驾驭的加速度将给玩家带来很大挑战，和您的小伙伴比比谁能拿到更多星星吧！

可以在这里感受一下这款游戏的完成形态：

<http://fbdemos.leanapp.cn/star-catcher/>

## 准备项目和资源

我们已经为您准备好了制作这款游戏需要的全部资源，下载 **初始项目** 后，解压到您希望的位置，之后我们就可以开始了：

**下载初始项目**：[GitHub](https://github.com/cocos-creator/tutorial-first-game/releases/download/v1.9/start_project.zip) | [Gitee](https://gitee.com/mirrors_cocos-creator/tutorial-first-game/tree/master/start_project)

您也可以下载最终完成的项目，跟随教程制作过程中有任何不明白的地方都可以打开完成版的项目作为参考：

**下载完成项目**：[GitHub](https://github.com/cocos-creator/tutorial-first-game/releases/download/v1.9/complete_project.zip) | [Gitee](https://gitee.com/mirrors_cocos-creator/tutorial-first-game/tree/master/complete_project)

## 打开初始项目

如果您还不了解如何获取和启动 Cocos Creator，请阅读 [安装和启动](install.md) 一节。

1. 我们首先启动 Cocos Creator，然后选择 **打开其他项目**
2. 在弹出的文件夹选择对话框中，选中我们刚下载并解压完成的 `start_project`，点击 **打开** 按钮
3. Cocos Creator 编辑器主窗口会打开，我们将看到如下的项目状态

<a href="quick-start/init_start_project.png"><img src="quick-start/init_start_project.png" alt="start project"></a>

## 检查游戏资源

我们的初始项目中已经包含了所有需要的游戏资源，因此您不需要再导入任何其他资源。如果希望了解导入资源的方法，可以阅读 [资源工作流程](../asset-workflow/index.md) 的相关内容。

下面我们先来了解一下项目中都有哪些资源，请关注名为 **资源管理器** 的面板，这里显示的是项目中的所有资源树状结构。

可以看到，项目资源的根目录名叫 **assets**，对应我们解压之后初始项目中的 `assets` 目录，只有这个目录下的资源才会被 Cocos Creator 导入项目并进行管理。

**资源管理器** 可以显示任意层次的目录结构，我们可以看到 ![folder](quick-start/folder.png) 这样的图标就代表一个文件夹，点击文件夹左边的三角图标可以展开文件夹的内容。将文件夹全部展开后，**资源管理器** 中就会呈现如下图的状态。

<a href="quick-start/assets_overview.png"><img src="quick-start/assets_overview.png" alt="assets overview"></a>

每个资源都是一个文件，导入项目后根据扩展名的不同而被识别为不同的资源类型，其图标也会有所区别，下面我们来看看项目中的资源各自的类型和作用：

- ![audioclip](quick-start/audio-clip.png) 声音文件，一般为 mp3 文件，我们将在主角跳跃和得分时播放名为 `jump` 和 `score` 的声音文件。
- ![bmfont](quick-start/bitmap-font.png) 位图字体，由 fnt 文件和同名的 png 图片文件共同组成。位图字体（Bitmap Font）是一种游戏开发中常用的字体资源，详情请阅读 [位图字体资源](../asset-workflow/font.md)
- 各式各样的缩略图标，这些都是图像资源，一般是 png 或 jpg 文件。图片文件导入项目后会经过简单的处理成为 **texture** 类型的资源。之后就可以将这些资源拖拽到场景或组件属性中去使用了。

## 创建游戏场景

在 Cocos Creator 中，游戏场景（Scene）是开发时组织游戏内容的中心，也是呈现给玩家所有游戏内容的载体。游戏场景中一般会包括以下内容：

- 场景图像和文字（Sprite，Label）
- 角色
- 以组件形式附加在场景节点上的游戏逻辑脚本

当玩家运行游戏时，就会载入游戏场景，游戏场景加载后就会自动运行所包含组件的游戏脚本，实现各种各样开发者设置的逻辑功能。所以除了资源以外，游戏场景是一切内容创作的基础，让我们现在就新建一个场景。

1. 在资源管理器中点击选中 **assets** 目录，确保我们的场景会被创建在这个目录下
2. 点击资源管理器左上角的加号按钮，在弹出的菜单中选择 **Scene**

  ![create scene](quick-start/create_scene.png)

3. 我们创建了一个名叫 `New Scene` 的场景文件，右键点击它并选择 **重命名**，将它改名为 `game`。
4. 双击 `game`，就会在 **场景编辑器** 和 **层级编辑器** 中打开这个场景。

### 了解Canvas

打开场景后，**层级管理器** 中会显示当前场景中的所有节点和他们的层级关系。我们刚刚新建的场景中只有一个名叫 `Canvas` 的节点，**Canvas** 可以被称为画布节点或渲染根节点，点击选中 **Canvas**，可以在 **属性检查器** 中看到他的属性。

![canvas](quick-start/canvas.png)

这里的 `Design Resolution` 属性规定了游戏的设计分辨率，`Fit Height` 和 `Fit Width` 规定了在不同尺寸的屏幕上运行时，我们将如何缩放 **Canvas** 以适配不同的分辨率。

由于提供了多分辨率适配的功能，我们一般会将场景中的所有负责图像显示的节点都放在 **Canvas** 下面。这样当 **Canvas** 的 `scale`（缩放）属性改变时，所有作为其子节点的图像也会跟着一起缩放以适应不同屏幕的大小。

更详细的信息请阅读 [Canvas 组件参考](../components/canvas.md)。目前我们只要知道接下来添加的场景图像都会放在 **Canvas** 节点下面就可以了。

## 设置场景图像

### 添加背景

首先在 **资源管理器** 里按照 `assets/textures/background` 的路径找到我们的背景图像资源，点击并拖拽这个资源到 **层级管理器** 中的 **Canvas** 节点上，直到 **Canvas** 节点显示橙色高亮，表示将会添加一个以 `background` 为贴图资源的子节点。

![drag to canvas](quick-start/drag_to_canvas.png)

这时就可以松开鼠标按键，可以看到 **Canvas** 下面添加了一个名叫 `background` 的节点。当我们使用拖拽资源的方式添加节点时，节点会自动以贴图资源的文件名来命名。

我们在对场景进行编辑修改时，可以通过主菜单 `文件 -> 保存场景` 来及时保存我们的修改。也可以使用快捷键 <kbd>Ctrl+S</kbd>（Windows）或 <kbd>Cmd + S</kbd>（Mac）来保存。

### 修改背景尺寸

![background1](quick-start/background1.png)

在 **场景编辑器** 中，可以看到我们刚刚添加的背景图像，下面我们将修改背景图像的尺寸，来让他覆盖整个屏幕。

首先选中 `background` 节点，然后点击主窗口左上角工具栏第四个 **矩形变换工具**：

![rect gizmo](quick-start/rect_gizmo.png)

使用这个工具我们可以方便的修改图像节点的尺寸，将鼠标移动到 **场景编辑器** 中 `background` 的左边，按住并向左拖拽直到 `background` 的左边超出表示设计分辨率的紫色线框。然后再用同样的方法将 `background` 的右边向右拖拽。

![resize_background](quick-start/resize_background.png)

之后需要拖拽上下两边，使背景图的大小能够填满设计分辨率的线框。

<a href="quick-start/background_finish.png"><img src="quick-start/background_finish.png" alt="background"></a>

在使用 **矩形变换工具** 修改背景图尺寸时，可以在 **属性检查器** 中看到 **Node** （节点）中的 `Size` 属性也在随之变化，完成后我们的背景图尺寸大概是 `(1360, 760)`。您也可以直接在 `Size` 属性的输入框中输入数值，和使用 **矩形变换工具** 可以达到同样效果。这样大小的背景图在市面流行的手机上都可以覆盖整个屏幕，不会出现穿帮情况。

### 添加地面

我们的主角需要一个可以在上面跳跃的地面，我们马上来添加一个。用和添加背景图相同的方式，拖拽 **资源管理器** 中 `assets/textures/ground` 资源到 **层级管理器** 的 `Canvas` 上。这次在拖拽时我们还可以选择新添加的节点和 `background` 节点的顺序关系。拖拽资源的状态下移动鼠标指针到 `background` 节点的下方，直到在 `Canvas` 上显示橙色高亮框，并同时在 `background` 下方显示表示插入位置的绿色线条，然后松开鼠标，这样 `ground` 在场景层级中就被放在了 `background` 下方，同时也是 `Canvas` 的一个子节点。

在 **层级管理器** 中，显示在下方的节点的渲染顺序会在上方节点的后面，我们可以看到位于最下的 `ground` 物体在 **场景编辑器** 中显示在了最前。另外子节点也会永远显示在父节点之前，我们可以随时调整节点的层级顺序和关系来控制他们的显示顺序。

按照修改背景的方法，我们也可以使用 **矩形变换工具** 来为地面节点设置一个合适的大小。在激活 **矩形变换工具** 的时候，如果拖拽节点顶点和四边之外的部分，就可以更改节点的位置。下图是我们设置好的地面节点状态：

<a href="quick-start/ground_finish.png"><img src="quick-start/ground_finish.png" alt="ground"></a>

除了 **矩形变换工具** 之外，我们还可以使用 **移动工具** 来改变节点的位置，尝试按住 **移动工具** 显示在节点上的箭头并拖拽，就可以一次改变节点在单个坐标轴上的位置。

![translate gizmo](quick-start/translate_gizmo.png)

我们在设置背景和地面的位置和尺寸时不需要很精确的数值，可以凭感觉拖拽。如果您偏好比较完整的数字，也可以按照截图直接输入 `position` 和 `size` 的数值。

### 添加主角

接下来我们的主角小怪兽要登场了，从 **资源管理器** 拖拽 `assets/texture/PurpleMonster` 到 **层级管理器** 中 `Canvas` 的下面，并确保他的排序在 `ground` 之下，这样我们的主角会显示在最前面。注意小怪兽节点应该是 `Canvas` 的子节点，和 `ground` 节点平行。

为了让主角的光环在场景节点中非常醒目，我们右键点击刚刚添加的 `PurpleMonster` 节点，选择 `重命名` 之后将其改名为 `Player`。

接下来我们要对主角的属性进行一些设置，首先是改变 **锚点(Anchor)** 的位置。默认状态下，任何节点的锚点都会在节点的中心，也就是说该节点中心点所在的位置就是该节点的位置。我们希望控制主角的底部的位置来模拟在地面上跳跃的效果，所以现在我们需要把主角的锚点设置在脚下。在 **属性检查器** 里找到 **Anchor** 属性，把其中的 `y` 值设为 `0`，可以看到 **场景编辑器** 中，表示主角位置的 **移动工具** 的箭头出现在了主角脚下。

接下来 **场景编辑器** 中拖拽 `Player`，把他放在地面上，效果如下图：

![player position](quick-start/player_position.jpg)

这样我们基本的场景美术内容就配置好了。下面一节我们要编写代码让游戏里的内容生动起来。

## 编写主角脚本

Cocos Creator 开发游戏的一个核心理念就是让内容生产和功能开发可以流畅的并行协作，我们在上个部分着重于处理美术内容，而接下来就是通过编写脚本来开发功能的流程，之后我们还会看到写好的程序脚本可以很容易的被内容生产者使用。

如果您从没写过程序也不用担心，我们会在教程中提供所有需要的代码，只要复制粘贴到正确的位置就可以了，之后这部分工作可以找您的程序员小伙伴来解决。下面让我们开始创建驱动主角行动的脚本吧。

### 创建脚本

1. 首先在 **资源管理器** 中右键点击 `assets` 文件夹，选择 `新建 -> 文件夹`

    ![new folder](quick-start/new_folder.png)

2. 右键点击 `New Folder`，选择 `重命名`，将其改名为 `scripts`，之后我们所有的脚本都会存放在这里。

3. 右键点击 `scripts` 文件夹，选择 `新建 -> JavaScript`，创建一个 JavaScript 脚本

4. 将新建脚本的名字改为 `Player`。双击这个脚本，打开代码编辑器。

> **注意**：Cocos Creator 中脚本名称就是组件的名称，这个命名是大小写敏感的！如果组件名称的大小写不正确，将无法正确通过名称使用组件！

### 编写组件属性

打开的脚本里已经有了预先设置好的一些代码块，这些代码就是编写一个组件脚本所需的结构。具有这样结构的脚本就是 Cocos Creator 中的组件（Component），他们能够挂载到场景中的节点上，提供控制节点的各种功能。我们先来设置一些属性，然后看看怎样在场景中调整他们。

在 **代码编辑器** 中找到 `Player` 脚本里 `properties` 部分，将其改为以下内容并按 <kbd>Ctrl + S</kbd>（Windows）或 <kbd>Cmd + S</kbd>（Mac）保存：

```js
// Player.js
    //...
    properties: {
        // 主角跳跃高度
        jumpHeight: 0,
        // 主角跳跃持续时间
        jumpDuration: 0,
        // 最大移动速度
        maxMoveSpeed: 0,
        // 加速度
        accel: 0,
    },
    //...
```

这些新增的属性将规定主角的移动方式，在代码中我们不需要关心这些数值是多少，因为我们之后会直接在 **属性检查器** 中设置这些数值。

现在我们可以把 `Player` 组件添加到主角节点上。在 **层级编辑器** 中选中 `Player` 节点，然后在 **属性检查器** 中点击 **添加组件** 按钮，选择 `添加用户脚本组件 -> Player`，为主角节点添加 `Player` 组件。

![add player component](quick-start/add_player_component.png)

现在我们可以在 **属性检查器** 中（需要选中 `Player` 节点）看到刚添加的 `Player` 组件了，按照下图将主角跳跃和移动的相关属性设置好：

![player properties](quick-start/player_properties.png)

这些数值除了 jumpDuration 的单位是秒之外，其他的数值都是以像素为单位的，根据我们现在对 `Player` 组件的设置：我们的主角将能够跳跃 200 像素的高度，起跳到最高点所需的时间是 0.3 秒，最大水平方向移动速度是 400 像素每秒，水平加速度是 350 像素每秒。

这些数值都是建议，一会等游戏运行起来，您完全可以按照自己的喜好随时在 **属性检查器** 中修改这些数值，不需要改动任何代码，很方便吧！

### 编写跳跃和移动代码

下面我们添加一个方法，来让主角跳跃起来，在 `properties: {...},` 代码块的下面，添加叫做 `setJumpAction` 的方法：

```js
// Player.js
    properties: {
        //...
    },

    setJumpAction: function () {
        // 跳跃上升
        var jumpUp = cc.moveBy(this.jumpDuration, cc.p(0, this.jumpHeight)).easing(cc.easeCubicActionOut());
        // 下落
        var jumpDown = cc.moveBy(this.jumpDuration, cc.p(0, -this.jumpHeight)).easing(cc.easeCubicActionIn());
        // 不断重复
        return cc.repeatForever(cc.sequence(jumpUp, jumpDown));
    },
```

这里用到了一些 Cocos2d-js 引擎中的 Action 来实现主角的跳跃动画，详情可以查询 [Cocos2d-js API](http://www.cocos2d-x.org/reference/html5-js/V3.8/index.html).

接下来在 `onLoad` 方法里调用刚添加的 `setJumpAction` 方法，然后执行 `runAction` 来开始动作：

```js
// Player.js
    onLoad: function () {
        // 初始化跳跃动作
        this.jumpAction = this.setJumpAction();
        this.node.runAction(this.jumpAction);
    },
```

`onLoad` 方法会在场景加载后立刻执行，所以我们会把初始化相关的操作和逻辑都放在这里面。

保存脚本，然后我们就可以开始第一次运行游戏了！

点击 Cocos Creator 编辑器上方正中的 **预览游戏** 按钮：

![preview](quick-start/preview_game.png)

Cocos Creator 会自动打开您的默认浏览器并开始在里面运行游戏，现在应该可以看到我们的主角——紫色小怪兽在场景中间活泼的蹦个不停了。

### 移动控制

只能在原地傻蹦的主角可没前途，让我们为主角添加键盘输入，用 <kbd>A</kbd> 和 <kbd>D</kbd> 来控制他的跳跃方向。在 `setJumpAction` 方法的下面添加 `setInputControl` 方法：

```js
// Player.js
    setJumpAction: function () {
        //...
    },

    setInputControl: function () {
        var self = this;
        // 添加键盘事件监听
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            // 有按键按下时，判断是否是我们指定的方向控制键，并设置向对应方向加速
            onKeyPressed: function(keyCode, event) {
                switch(keyCode) {
                    case cc.KEY.a:
                        self.accLeft = true;
                        self.accRight = false;
                        break;
                    case cc.KEY.d:
                        self.accLeft = false;
                        self.accRight = true;
                        break;
                }
            },
            // 松开按键时，停止向该方向的加速
            onKeyReleased: function(keyCode, event) {
                switch(keyCode) {
                    case cc.KEY.a:
                        self.accLeft = false;
                        break;
                    case cc.KEY.d:
                        self.accRight = false;
                        break;
                }
            }
        }, self.node);
    },
```

然后修改 `onLoad` 方法，在其中加入向左和向右加速的开关，以及主角当前在水平方向的速度，最后再调用我们刚添加的 `setInputControl` 方法，在场景加载后就开始监听键盘输入：

```js
// Player.js
    onLoad: function () {
        // 初始化跳跃动作
        this.jumpAction = this.setJumpAction();
        this.node.runAction(this.jumpAction);

        // 加速度方向开关
        this.accLeft = false;
        this.accRight = false;
        // 主角当前水平方向速度
        this.xSpeed = 0;

        // 初始化键盘输入监听
        this.setInputControl();
    },
```

最后修改 `update` 方法的内容，添加加速度、速度和主角当前位置的设置：

```js
// Player.js
    update: function (dt) {
        // 根据当前加速度方向每帧更新速度
        if (this.accLeft) {
            this.xSpeed -= this.accel * dt;
        } else if (this.accRight) {
            this.xSpeed += this.accel * dt;
        }
        // 限制主角的速度不能超过最大值
        if ( Math.abs(this.xSpeed) > this.maxMoveSpeed ) {
            // if speed reach limit, use max speed with current direction
            this.xSpeed = this.maxMoveSpeed * this.xSpeed / Math.abs(this.xSpeed);
        }

        // 根据当前速度更新主角的位置
        this.node.x += this.xSpeed * dt;
    },
```

`update` 在场景加载后就会每帧调用一次，我们一般把需要经常计算或及时更新的逻辑内容放在这里。在我们的游戏中，根据键盘输入获得加速度方向后，就需要每帧在 `update` 中计算主角的速度和位置。

保存脚本后，下面就可以去泡杯茶，点击 **预览游戏** 来看看我们最新的成果。在浏览器打开预览后，用鼠标点击一下游戏画面（这是浏览器的限制，要点击游戏画面才能接受键盘输入），然后就可以按 <kbd>A</kbd> 和 <kbd>D</kbd> 键来控制主角左右移动了！

感觉移动起来有点迟缓？主角跳的不够高？希望跳跃时间长一些？没问题，这些都可以随时调整。只要为 `Player` 组件设置不同的属性值，就可以按照您的想法调整游戏。这里有一组设置可供参考：

```js
Jump Height: 150
Jump Duration: 0.3
Max Move Speed: 400
Accel: 1000
```

这组属性设置会让主角变得灵活无比，至于如何选择，就看您想做一个什么风格的游戏了。

## 制作星星

主角现在可以跳来跳去了，我们要给玩家一个目标，也就是会不断出现在场景中的星星，玩家需要引导小怪兽碰触星星来收集分数。被主角碰到的星星会消失，然后马上在随机位置重新生成一个。

### 制作Prefab

对于需要重复生成的节点，我们可以将他保存成 **Prefab（预制）** 资源，作为我们动态生成节点时使用的模板。关于 **Prefab** 的更多信息，请阅读 [预制资源（Prefab）](../asset-workflow/prefab.md)。

首先从 **资源管理器** 中拖拽 `assets/textures/star` 资源到场景中，位置随意，我们只是需要借助场景作为我们制作 Prefab 的工作台，制作完成后会我们把这个节点从场景中删除。

我们不需要修改星星的位置或渲染属性，但要让星星能够被主角碰触后消失，我们需要为星星也添加一个专门的组件。按照和添加 `Player` 脚本相同的方法，添加名叫 `Star` 的 JavaScript 脚本到 `assets/scripts/` 中。

![star script](quick-start/star_script.png)

接下来双击这个脚本开始编辑，星星组件只需要一个属性用来规定主角距离星星多近时就可以完成收集，修改 `properties`，加入以下内容：

```js
// Star.js
    properties: {
        // 星星和主角之间的距离小于这个数值时，就会完成收集
        pickRadius: 0
    },
```

保存脚本后，将这个脚本添加到刚创建的 `star` 节点上。然后在 **属性检查器** 中把 `Pick Radius` 属性值设为 `60`：

<a href="quick-start/star_property.png"><img src="quick-start/star_property.png" alt="star property"></a>

Star Prefab 需要的设置就完成了，现在从 **层级管理器** 中将 `star` 节点拖拽到 **资源管理器** 中的 `assets` 文件夹下，就生成了名叫 `star` 的 Prefab 资源。

![star prefab](quick-start/prefab_asset.png)

现在可以从场景中删除 `star` 节点了，我们会在脚本中动态使用星星的 Prefab 资源生成星星。

### 添加游戏控制脚本

星星的生成是游戏主逻辑的一部分，所以我们要添加一个叫做 `Game` 的脚本作为游戏主逻辑脚本，这个脚本之后还会添加计分、游戏失败和重新开始的相关逻辑。

添加 `Game` 脚本到 `assets/scripts` 文件夹下，双击打开脚本。首先添加生成星星需要的属性：

```js
// Game.js
    properties: {
        // 这个属性引用了星星预制资源
        starPrefab: {
            default: null,
            type: cc.Prefab
        },
        // 星星产生后消失时间的随机范围
        maxStarDuration: 0,
        minStarDuration: 0,
        // 地面节点，用于确定星星生成的高度
        ground: {
            default: null,
            type: cc.Node
        },
        // player 节点，用于获取主角弹跳的高度，和控制主角行动开关
        player: {
            default: null,
            type: cc.Node
        }
    },
```

保存脚本后将 `Game` 组件添加到 **层级编辑器** 中的 `Canvas` 节点上（选中 `Canvas` 节点后，拖拽脚本到 **属性检查器** 上，或点击 **属性检查器** 的 **添加组件** 按钮，并从 `用户自定义脚本` 中选择 `Game`，接下来从 **资源管理器** 中拖拽 `star` Prefab 资源到 `Game` 组件的 `Star Prefab` 属性中。这是我们第一次为属性设置引用，只有在属性声明时规定 `type` 为引用类型时（比如我们这里写的 `cc.Prefab` 类型），才能够将资源或节点拖拽到该属性上。

接下来从 **层级编辑器** 中拖拽 `ground` 和 `Player` 节点到组件中相同名字的属性上，完成节点引用。

然后设置 `Min Star Duration` 和 `Max Star Duration` 属性的值为 `3` 和 `5`，之后我们生成星星时，会在这两个之间随机取值，就是星星消失前经过的时间。

### 在随机位置生成星星

接下来我们继续修改 `Game` 脚本，在 `onLoad` 方法后面添加生成星星的逻辑：

```js
// Game.js
    onLoad: function () {
        // 获取地平面的 y 轴坐标
        this.groundY = this.ground.y + this.ground.height/2;
        // 生成一个新的星星
        this.spawnNewStar();
    },

    spawnNewStar: function() {
        // 使用给定的模板在场景中生成一个新节点
        var newStar = cc.instantiate(this.starPrefab);
        // 将新增的节点添加到 Canvas 节点下面
        this.node.addChild(newStar);
        // 为星星设置一个随机位置
        newStar.setPosition(this.getNewStarPosition());
    },

    getNewStarPosition: function () {
        var randX = 0;
        // 根据地平面位置和主角跳跃高度，随机得到一个星星的 y 坐标
        var randY = this.groundY + cc.random0To1() * this.player.getComponent('Player').jumpHeight + 50;
        // 根据屏幕宽度，随机得到一个星星 x 坐标
        var maxX = this.node.width/2;
        randX = cc.randomMinus1To1() * maxX;
        // 返回星星坐标
        return cc.p(randX, randY);
    }
```

保存脚本以后点击 **预览游戏** 按钮，在浏览器中可以看到，游戏开始后动态生成了一颗星星！用同样的方法，您可以在游戏中动态生成任何预先设置好的以 Prefab 为模板的节点。

![spawn star](quick-start/spawn_star.png)

### 添加主角碰触收集星星的行为

现在要添加主角收集星星的行为逻辑了，这里的重点在于，星星要随时可以获得主角节点的位置，才能判断他们之间的距离是否小于可收集距离，如何获得主角节点的引用呢？别忘了我们前面做过的两件事：

1. `Game` 组件中有个名叫 `player` 的属性，保存了主角节点的引用。
2. 每个星星都是在 `Game` 脚本中动态生成的。

所以我们只要在 `Game` 脚本生成 `Star` 节点实例时，将 `Game` 组件的实例传入星星并保存起来就好了，之后我们可以随时通过 `game.player` 来访问到主角节点。让我们打开 `Game` 脚本，在 `spawnNewStar` 方法最后面添加这样一句：

```js
// Game.js
    spawnNewStar: function() {
        // ...
        // 将 Game 组件的实例传入星星组件
        newStar.getComponent('Star').game = this;
    },
```

保存后打开 `Star` 脚本，现在我们可以利用 `Game` 组件中引用的 `player` 节点来判断距离了，在 `onLoad` 方法后面添加名为 `getPlayerDistance` 和 `onPicked` 的方法：

```js
// Star.js
    getPlayerDistance: function () {
        // 根据 player 节点位置判断距离
        var playerPos = this.game.player.getPosition();
        // 根据两点位置计算两点之间距离
        var dist = cc.pDistance(this.node.position, playerPos);
        return dist;
    },

    onPicked: function() {
        // 当星星被收集时，调用 Game 脚本中的接口，生成一个新的星星
        this.game.spawnNewStar();
        // 然后销毁当前星星节点
        this.node.destroy();
    },
```

然后在 `update` 方法中添加每帧判断距离，如果距离小于 `pickRadius` 属性规定的收集距离，就执行收集行为：

```js
// Star.js
    update: function (dt) {
        // 每帧判断和主角之间的距离是否小于收集距离
        if (this.getPlayerDistance() < this.pickRadius) {
            // 调用收集行为
            this.onPicked();
            return;
        }
    },
```

保存脚本，然后再次预览测试，可以看到控制主角靠近星星时，星星就会消失掉，然后在随机位置生成了新的星星！

## 添加得分

小怪兽辛辛苦苦的收集星星，没有奖励怎么行，让我们现在就在收集星星时添加得分奖励的逻辑和显示。

### 添加分数文字（Label）

游戏开始时得分从 0 开始，每收集一个星星分数就会加 1。要显示得分，首先要创建一个 **Label** 节点。在 **层级管理器** 中选中 `Canvas` 节点，右键点击并选择菜单中的 `创建新节点 -> 创建渲染节点 -> Label（文字）`，一个新的 Label 节点会被创建在 `Canvas` 下面，而且顺序在最下面。接下来我们要用如下的步骤配置这个 Label 节点：

1. 将该节点名字改为 `score`
2. 将 `score` 节点的位置（`position` 属性）设为 `(0, 180)`。
3. 选中该节点，编辑 **Label** 组件的 `string` 属性，填入 `Score: 0` 的文字。
4. 将 **Label** 组件的 `Font Size` 属性设为 `50`。
5. 从 **资源管理器** 中拖拽 `assets/mikado_outline_shadow` 位图字体资源（注意图标是 ![bmfont](quick-start/bitmap-font.png)）到 **Label** 组件的 `Font` 属性中，将文字的字体替换成我们项目资源中的位图字体。

完成后效果如下图所示：

<a href="quick-start/score_label.png"><img src="quick-start/score_label.png" alt="score label"></a>

### 在 Game 脚本中添加得分逻辑

我们将会把计分和更新分数显示的逻辑放在 `Game` 脚本里，打开 `Game` 脚本开始编辑，首先在 `properties` 区块的最后添加分数显示 Label 的引用属性：

```js
// Game.js
    properties: {
        // ...
        // score label 的引用
        scoreDisplay: {
            default: null,
            type: cc.Label
        }
    },
```

接下来在 `onLoad` 方法里添加计分用的变量的初始化：

```js
// Game.js
    onLoad: function () {
        // ...
        // 初始化计分
        this.score = 0;
    },
```

然后在 `update` 方法后面添加名叫 `gainScore` 的新方法：

```js
// Game.js
    gainScore: function () {
        this.score += 1;
        // 更新 scoreDisplay Label 的文字
        this.scoreDisplay.string = 'Score: ' + this.score.toString();
    },
```

保存 `Game` 脚本后，回到 **层级管理器**，选中 `Canvas` 节点，然后把前面添加好的 `score` 节点拖拽到 **属性检查器** 里 `Game` 组件的 `Score Display` 属性中。

### 在 Star 脚本中调用 Game 中的得分逻辑

下面打开 `Star` 脚本，在 `onPicked` 方法中加入 `gainScore` 的调用：

```js
// Star.js
    onPicked: function() {
        // 当星星被收集时，调用 Game 脚本中的接口，生成一个新的星星
        this.game.spawnNewStar();
        // 调用 Game 脚本的得分方法
        this.game.gainScore();
        // 然后销毁当前星星节点
        this.node.destroy();
    },
```

保存后预览，可以看到现在收集星星时屏幕正上方显示的分数会增加了！

![preview score](quick-start/preview_score.png)

## 失败判定和重新开始

现在我们的游戏已经初具规模，但得分再多，不可能失败的游戏也不会给人成就感。现在让我们加入星星定时消失的行为，而且让星星消失时就判定为游戏失败。也就是说，玩家需要在每颗星星消失之前完成收集，并不断重复这个过程完成玩法的循环。

### 为星星加入计时消失的逻辑

打开 `Game` 脚本，在 `onLoad` 方法的 `spawnNewStar` 调用之前加入计时需要的变量声明：

```js
// Game.js
    onLoad: function () {
        // ...
        // 初始化计时器
        this.timer = 0;
        this.starDuration = 0;
        // 生成一个新的星星
        this.spawnNewStar();
        // 初始化计分
        this.score = 0;
    },
```

然后在 `spawnNewStar` 方法最后加入重置计时器的逻辑，其中 `this.minStarDuration` 和 `this.maxStarDuration` 是我们一开始声明的 `Game` 组件属性，用来规定星星消失时间的随机范围：

```js
// Game.js
    spawnNewStar: function() {
        // ...
        // 重置计时器，根据消失时间范围随机取一个值
        this.starDuration = this.minStarDuration + cc.random0To1() * (this.maxStarDuration - this.minStarDuration);
        this.timer = 0;
    },
```

在 `update` 方法中加入计时器更新和判断超过时限的逻辑：

```js
// Game.js
    update: function (dt) {
        // 每帧更新计时器，超过限度还没有生成新的星星
        // 就会调用游戏失败逻辑
        if (this.timer > this.starDuration) {
            this.gameOver();
            return;
        }
        this.timer += dt;
    },
```

最后加入 `gameOver` 方法，游戏失败时重新加载场景。

```js
// Game.js
    gameOver: function () {
        this.player.stopAllActions(); //停止 player 节点的跳跃动作
        cc.director.loadScene('game');
    }
```

对 `Game` 脚本的修改就完成了，保存脚本，然后打开 `Star` 脚本，我们需要为即将消失的星星加入简单的视觉提示效果，在 `update` 方法最后加入以下代码：

```js
// Star.js
    update: function() {
        // ...
        // 根据 Game 脚本中的计时器更新星星的透明度
        var opacityRatio = 1 - this.game.timer/this.game.starDuration;
        var minOpacity = 50;
        this.node.opacity = minOpacity + Math.floor(opacityRatio * (255 - minOpacity));
    }
```

保存 `Star` 脚本，我们的游戏玩法逻辑就全部完成了！现在点击 **预览游戏** 按钮，我们在浏览器看到的就是一个有核心玩法、激励机制、失败机制的合格游戏了。

## 加入音效

尽管很多人玩手游的时候会无视声音，我们为了教程展示的工作流程尽量完整，还是要补全加入音效的任务。

### 跳跃音效

首先加入跳跃音效，打开 `Player` 脚本，添加引用声音文件资源的 `jumpAudio` 属性：

```js
// Player.js
    properties: {
        // ...
        // 跳跃音效资源
        jumpAudio: {
            default: null,
            type: cc.AudioClip
        },
    },
```

然后改写 `setJumpAction` 方法，插入播放音效的回调，并通过添加 `playJumpSound` 方法来播放声音：

```js
// Player.js
    setJumpAction: function () {
        // 跳跃上升
        var jumpUp = cc.moveBy(this.jumpDuration, cc.p(0, this.jumpHeight)).easing(cc.easeCubicActionOut());
        // 下落
        var jumpDown = cc.moveBy(this.jumpDuration, cc.p(0, -this.jumpHeight)).easing(cc.easeCubicActionIn());
        // 添加一个回调函数，用于在动作结束时调用我们定义的其他方法
        var callback = cc.callFunc(this.playJumpSound, this);
        // 不断重复，而且每次完成落地动作后调用回调来播放声音
        return cc.repeatForever(cc.sequence(jumpUp, jumpDown, callback));
    },

    playJumpSound: function () {
        // 调用声音引擎播放声音
        cc.audioEngine.playEffect(this.jumpAudio, false);
    },
```

### 得分音效

保存 `Player` 脚本以后打开 `Game` 脚本，来添加得分音效，首先仍然是在 `properties` 中添加一个属性来引用声音文件资源：

```js
// Game.js
    properties: {
        // ...
        // 得分音效资源
        scoreAudio: {
            default: null,
            type: cc.AudioClip
        }
    },
```

然后在 `gainScore` 方法里插入播放声音的代码：

```js
// Game.js
    gainScore: function () {
        this.score += 1;
        // 更新 scoreDisplay Label 的文字
        this.scoreDisplay.string = 'Score: ' + this.score.toString();
        // 播放得分音效
        cc.audioEngine.playEffect(this.scoreAudio, false);
    },
```

保存脚本，回到 **层级编辑器**，选中 `Player` 节点，然后从 **资源管理器** 里拖拽 `assets/audio/jump` 资源到 `Player` 组件的 `Jump Audio` 属性上。

然后选中 `Canvas` 节点，把 `assets/audio/score` 资源拖拽到 `Game` 组件的 `Score Audio` 属性上。

这样就大功告成了！完成形态的场景层级和各个关键组件的属性如下：

![node tree complete](quick-start/hierarchy_complete.png)

![game complete](quick-start/game_complete.png)

![player complete](quick-start/player_complete.png)

现在我们可以尽情享受刚制作完成的游戏了，您能打到多少分呢？别忘了您可以随时修改 `Player` 和 `Game` 组件里的移动控制和星星持续时间等游戏参数，来快速调节游戏的难度。修改组件属性之后需要保存场景，修改后的数值才会被记录下来。

## 总结

恭喜您完成了用 Cocos Creator 制作的第一个游戏！希望这篇快速入门教程能帮助您了解 Cocos Creator 游戏开发流程中的基本概念和工作流程。如果您对编写和学习脚本编程不感兴趣，也可以直接从完成版的项目中把写好的脚本复制过来使用。

接下来您还可以继续完善游戏的各方各面，以下是一些推荐的改进方向：

- 加入简单的开始菜单界面，在游戏运行的一开始显示开始按钮，点击按钮后才会开始游戏
- 为游戏失败加入简单的菜单界面，游戏失败后点击按钮才会重新开始
- 限制主角的移动不能超过视窗边界
- 为主角的跳跃动作加入更细腻的动画表现
- 为星星消失的状态加入计时进度条
- 收集星星时加入更华丽的效果
- 为触屏设备加入输入控制

以上这些方向都得到改善的游戏版本可以下载 **进化版项目**（[GitHub](https://github.com/cocos-creator/tutorial-first-game/releases/download/v1.9/polished_project.zip) | [Gitee](https://gitee.com/mirrors_cocos-creator/tutorial-first-game/tree/master/polished_project)）来参考和学习，这里就不再赘述了。

此外如果希望将完成的游戏发布到服务器上分享给好友玩耍，可以阅读 [预览和构建](basics/preview-build.md) 一节的内容。

今天的教程就到这里了，您可以立刻开始制作您的第二款 Cocos Creator 游戏，或者继续阅读本手册。关于本快速开始教程的任何问题，都可以在 [GitHub 上的本教程仓库](https://github.com/cocos-creator/tutorial-first-game) 提交反馈。
