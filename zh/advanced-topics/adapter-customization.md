# Adapter 定制工作流程
Cocos Creator 为了实现跨平台，在 JavaScript 层需要对不同平台做一些适配工作。   
这些工作包括：

- 给不同平台适配 BOM 和 DOM 等运行环境
- 一些引擎层面的适配  

目前适配层包括三个部分：

- jsb-adapter 适配原生平台
- weapp-adapter 适配微信小游戏平台
- qqplay-adapter 适配 qq 玩一玩平台

## 1、获取 Adapter

点击 Creator 编辑器右上方的 **打开程序安装路径**  
在该目录下的 **resources/builtin** 内就可以找到我们的 **jsb-adapter**, **weapp-adapter** 和 **qqplay-adapter** 。

## 2、定制 jsb-adapter

在 **jsb-adapter** 目录下，这里边主要包括两个目录结构：

- builtin 适配原生平台的 runtime
- engine 适配引擎层面的一些 api

builtin 部分除了适配 BOM 和 DOM 运行环境，还包括了一些相关的 jsb 接口，如 openGL, audioEngine 等。

### 2.1、定制并编译 builtin

engine 部分的定制只要对代码进行修改就行了，这里主要讲一下 builtin 部分的定制。  
如果您需要定制 builtin 部分的代码，那么需要先安装相关依赖，请在命令行中执行：

```bash
# jsb-adapter/builtin 目录下
npm install
```

接下来您就可以对 builtin 部分的代码进行相关定制修改了，修改之后请在命令行中执行：

```bash
# jsb-adapter/builtin 目录下
gulp
```

执行完命令后，会在 **jsb-adapter/builtin/dist** 目录下生成新的 **jsb-builtin.js** 文件。

## 3、定制 weapp-adapter 和 qqplay-adapter

**小游戏** 和 **玩一玩** 的适配层代码，分别位于 **resources/builtin** 目录下的 **weapp-adapter** 和 **qqplay-adapter** 。  
这部分代码的定制，不需要任何编译操作。  
引擎层面的适配工作，请在相应的 engine 目录下完成。  

了解更多小游戏 Adapter 相关内容，可阅读 [小游戏文档](https://developers.weixin.qq.com/minigame/dev/tutorial/base/adapter.html) 。