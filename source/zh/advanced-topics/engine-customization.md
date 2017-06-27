# 引擎定制工作流程

Cocos Creator 的引擎部分包括 JavaScript 和 C++ 两个部分。全部都在 github 上开源。地址在：

- Creator-JS 引擎：https://github.com/cocos-creator/engine
- Cocos2d-x 引擎：https://github.com/cocos-creator/cocos2d-x-lite

我们建议您通过 github 的 fork 工作流程来维护自己定制的仓库，具体操作方式请阅读 [github help: Fork A Repo](https://help.github.com/articles/fork-a-repo)。关于更多 github 相关工作流程请参考 [github help](https://help.github.com)。

## 定制 JavaScript 引擎

如果您仅需要定制 Web 版游戏的引擎功能，或只需要修改纯 JavaScript 层逻辑（如 UI 系统，动画系统），那么您只要按照下面的流程修改 JS 引擎就可以了。

### 获取 JS 引擎

首先您需要从 github 上 clone Creator-JS 引擎的原始（地址见上文）或 fork 后的版本。根据不同的 Creator 版本，还需要 checkout 不同的分支，例如 Creator 1.1.2 对应的是引擎的 v1.1 分支。下载后存放到任意本地路径，在命令行中进入此路径。

### 安装编译依赖

```bash
# 安装 gulp 构建工具
npm install -g gulp
# 在命令行中进入引擎路径
npm install
```

### 进行修改然后编译

接下来您可以定制引擎修改了，修改之后请在命令行中执行：

```bash
gulp build
```

来编译将引擎源码编译到 `bin` 目录下。

### 在 Cocos Creator 中使用定制版引擎

通过 **偏好设置** 面板的 [原生开发环境](../getting-started/basics/editor-panels/preferences.md#--8) 分页设置。设置使用您本地定制后的 JS 引擎路径。


## 定制 Cocos2d-x 引擎


如果您需要定制渲染和原生接口相关的引擎功能，在修改 JS 引擎的基础上，还需要同步修改 Cocos2d-x 的 C++ 引擎。注意 Cocos Creator 使用的 Cocos2d-x 引擎是专门定制的，需要从上文中指定的 github 仓库下载。

和 JS 引擎类似，C++ 引擎在使用前也请确认当前所在分支，对于 Cocos Creator v1.2.0 版本请使用 `v1.2` 分支。

### 初始化

下载或克隆好引擎仓库后，在命令行进入引擎路径然后执行：

```bash
# 安装编译依赖
npm install
# 下载依赖包，需要提前配置好 python
python download-deps.py
# 同步子 repo，需要提前配置好 git
git submodule update --init
```

### 在 Cocos Creator 中使用定制版引擎

通过 **偏好设置** 面板的 [原生开发环境](../getting-started/basics/editor-panels/preferences.md#--8) 分页设置。设置使用您本地定制后的 Cocos2d-x 引擎路径。

### 修改引擎

接下来您可以对 Cocos2d-x 引擎进行定制了，由于只有在 **构建发布** 过程中才会编译代码，所以修改引擎后可以直接打开 **构建发布** 面板，选择 `default` 项目模板进行构建和编译。

### 编译预编译库和模拟器

如果想在 **构建发布** 面板中使用 `binary` 预编译库模板加速编译过程，就需要在 Cocos2d-x 引擎路径下执行：

```bash
# 通过 cocos console 生成预编译库
gulp gen-libs
```

要在模拟器中预览您的引擎修改，需要执行以下命令来重新编译模拟器

```bash
# 通过 cocos console 生成模拟器
gulp gen-simulator
gulp update-simulator-config
```


## JSB 绑定流程

如果您需要在 JavaScript 引擎和 C++ 引擎同步修改内容，应该完成 JSB 绑定。请参考以下指导文章：

- [Cocos 中的脚本绑定](https://zhuanlan.zhihu.com/p/20525026)
- [Cocos 中的自动绑定](https://zhuanlan.zhihu.com/p/20525109)