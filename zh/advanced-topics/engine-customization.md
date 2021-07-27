# 引擎定制工作流程

Cocos Creator 3.0 的引擎部分包括 TypeScript、engine-native 和 adapter 三个部分（暂不支持 adapter 引擎定制）。引擎全部都在 GitHub 上开源。地址在：

- TypeScript 引擎：[GitHub](https://github.com/cocos-creator/engine/) | [Gitee](https://gitee.com/mirrors_cocos-creator/engine/)
- engine-native 引擎：[GitHub](https://github.com/cocos-creator/engine-native/) | [Gitee](https://gitee.com/mirrors_cocos-creator/engine-native/)
- Adapter：[GitHub](https://github.com/cocos-creator-packages/adapters) | [Gitee](https://gitee.com/mirrors_cocos-creator/adapters)

建议通过 GitHub 的 fork 工作流程来维护自己定制的代码，以便在将来引擎升级时，可以方便地将定制的部分更新上去，具体操作方式请阅读 [Fork a repo](https://help.github.com/articles/fork-a-repo)。如果你愿意帮助 Cocos 越做越好，欢迎在 GitHub 提交你的修改，请参考 [如何向 Cocos 提交代码](../../submit-pr/submit-pr.md)。关于更多 GitHub 相关工作流程请参考 [GitHub Help](https://help.github.com)。

另外，根据不同的 Creator 版本，还需要切换不同的引擎分支。通常建议使用和所用 Creator 相同版本的分支。

## 1 定制 TypeScript 引擎

如果您只需要定制 Web 版游戏的引擎功能，或只需要修改纯 TypeScript 层逻辑（如 UI 系统，动画系统），那么您只要按照下面的流程修改 TypeScript 引擎就可以了。

### 1.1 获取 TypeScript 引擎

如果只需基于当前的版本做一些调整，那么在 Cocos Creator 3.0 内置的引擎基础上修改就可以了。点击 Creator 编辑器右上方的 **编辑器** 按钮，然后将内置的 **engine** 目录拷贝到本地其他路径。

![](engine-customization/open-engine.png)

如果想获得官方正在开发中的最新版本，首先需要从 GitHub 上 fork 或者克隆 TypeScript 引擎的原始版本（地址见上文）。TypeScript 引擎在使用前请根据 Creator 版本切换相对应的分支。下载完成后存放到任意本地路径。

![](engine-customization/download-repo-js.png)

### 1.2 修改 TypeScript 引擎路径

通过 **Cocos Creator -> 偏好设置** 的 **Engine 管理器** 选项卡来设置需要定制的 TypeScript 引擎路径。

![](engine-customization/custom-ts-engine.png)

> **注意**：修改引擎路径后需要重启编辑器。

### 1.3 安装编译依赖

```bash
# 在命令行中进入引擎路径
cd E:/engine
# 安装 gulp 构建工具
npm install -g gulp
# 安装依赖的模块
npm install
# 编译一些数据，包括 debug infos 和 .d.ts
gulp build
```

> **注意**：生成 debug infos 需要 gulp 构建工具。

### 1.4 进行修改然后编译

接下来可以定制引擎修改了，修改完成之后在 Cocos Creator 编辑器的菜单栏中点击 **开发者 -> 编译引擎** 进行编译。

![](engine-customization/build.png)

该命令会在引擎目录下生成一个 `bin` 文件夹，并将引擎源码编译到 `bin` 目录下。

![](engine-customization/bin.png)

## 2 定制 engine-native 引擎

如果需要定制和原生平台相关的引擎功能，在修改 TypeScript 引擎的基础上，可能还需要同步修改 engine-native 引擎。

### 2.1 获取 engine-native 引擎

如果只需要基于当前的版本做一些调整，那么在 Cocos Creator 3.0 内置的 engine-native 引擎基础上修改就可以了。操作步骤和获取 TypeScript 引擎一致，点击 Creator 编辑器右上方的 **编辑器** 按钮，然后将内置的 `cocos2d-x-lite` 目录拷贝到本地其他路径。

如果想获得官方正在开发中的最新版本，需要从上文中指定的 GitHub 仓库下载或者克隆。和 TypeScript 引擎类似，engine-native 引擎在使用前也请确认当前所在分支。

### 2.2 初始化

下载或者克隆好 engine-native 引擎仓库后，在命令行进入引擎路径然后执行以下命令。

> **注意**：如果是从编辑器拷贝出来的内置 `cocos2d-x-lite` 目录，可以跳过该步骤。

```bash
# 在命令行进入 engine-native 引擎路径
cd E:/cocos2d-x-lite
# 安装 gulp 构建工具
npm install -g gulp
# 安装依赖的模块
npm install
# 初始化仓库
gulp init
```

### 2.3 在 Cocos Creator 3.0 中配置定制版原生引擎

通过 **Cocos Creator -> 偏好设置** 的 **Engine 管理器** 选项卡来设置需要定制的 engine-native 引擎路径。

![](engine-customization/custom-native-engine.png)

### 2.4 修改引擎

接下来可以对 engine-native 引擎进行定制修改了，由于只有在 **构建发布** 过程中才会编译代码，所以修改引擎后可以直接打开 **构建发布** 面板，选择 **link** 模板进行构建和编译。
