# Lua 引擎支持

作者：Dualface

## 目标

让 Lua 开发者可以使用 Cocos Creator 来搭建场景和 UI，并在 Lua 游戏中正常显示和操作。

## 主要特征

当前支持的功能如下所示：

- Sprite - 精灵：图像显示
- Canvas - 画布：主要用于自动布局
- Widget - 部件：可以配合 Canvas 设置自动布局和各种对齐方式
- Button - 按钮：响应玩家操作
- EditBox - 编辑框：用于玩家输入文字
- ParticleSystem - 粒子系统：显示粒子效果
- TileMap - 地图：显示使用 Tiled 编辑的地图
- Animation - 动画：仅支持帧动画
- Label (System Font) - 文字标签：仅支持系统字体
- Component with Lifetime events - 组件及其生命周期管理

### 一些控件暂时无法支持：

- ProgressBar
- Layout
- ScrollView


## 使用说明

从 Cocos Creator v1.3 版本开始，Lua 工程支持将以插件形式加入到 Creator 中，首先您需要下载 Creator-for-Lua 插件并执行安装程序：

- [Creator For Lua v1.1.3 Windows 版下载](http://cocos2d-x.org/filedown/Creator-Lua-Support-1.1.3-win)
- [Creator For Lua v1.1.3 Mac 版下载](http://cocos2d-x.org/filedown/Creator-Lua-Support-1.1.3-mac)

### 第一次构建项目

1. 新建一个 Lua 工程

    使用命令 `cocos new -l lua GAME-NAME` 新建一个 Lua 工程。

2. 在 Creator 中搭建好您的场景，然后从主菜单里选择 `工程 -> Lua Support -> Setup Target Project`，打开 Lua 项目设置界面

    ![lua project](build-to-lua/lua-project.jpg)

3. 点击 Project Path 旁边的 `…` 按钮选择你的 Lua 工程目录
4. 点击 `Copy Support Library` 按钮（这个步骤只需要对每一个新 Lua 工程做一次）
5. 点击 `Build` 按钮


### 自动构建

默认情况下，并没有启用自动构建功能。所以修改场景后要更新 Lua 代码，需要重新点击 `Build` 按钮，或者选择菜单 `工程 -> Lua Support -> Build Now`。

更省事儿的做法是在对话框中选中 `Auto Build` 选项。这样每次保存场景，就会自动更新 Lua 代码啦。

### 运行游戏

完成初次构建后，或者每次重新构建完成后，在你的 Lua 工程路径下使用 `cocos run` 命令，即可看到场景效果：

![play scene](build-to-lua/play-scene.gif)

