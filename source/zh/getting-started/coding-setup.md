# 配置代码编辑环境

在快速上手教程中，我们介绍了在 **资源管理器** 中双击脚本文件打开代码编辑器快速编辑代码的方法。但编辑器内置的代码编辑器功能并不完善，只适合快速浏览和做少量编辑的需要。对程序员来说，我们需要更成熟完善的代码编辑环境。

## Visual Studio Code

[Visual Studio Code](https://code.visualstudio.com/) （以下简称 VS Code）是微软新 推出的轻量化跨平台IDE，支持 Windows、Mac、Linux 平台，安装和配置非常简单。通过下面介绍的设置方法，使用 VS Code 管理和编辑项目脚本代码，可以轻松实现语法高亮、智能代码提示等功能，还可以直接使用 VS Code 调试网页和原生版本的游戏。

### 安装 VS Code

前往 VS Code 的[官方网站](https://code.visualstudio.com/)，点击首页的下载链接即可下载。

Mac 用户解压下载包后双击 `Visual Studio Code` 即可运行。

Windows 用户下载后运行 `VSCodeSetup.exe` 按提示完成安装即可运行。

### 安装 Cocos Creator API 适配插件

在 Cocos Creator 中打开你的项目，然后选择主菜单里的 `开发者/安装 VS Code 扩展插件`。

该操作会将 Cocos Creator API 适配插件安装到 VS Code 全局的插件文件夹中，一般在用户 Home 文件夹中的 `.vscode/extensions` 目录下。这个操作只需要执行一次，如果 API 适配插件更新了，则需要再次运行来更新插件。

安装成功后在 **控制台** 会显示绿色的提示：`VS Code extension installed to ...`。这个插件的主要功能是为 VS Code 编辑状态下注入符合 Cocos Creator 组件脚本使用习惯的语法提示。

### 在项目中生成智能提示数据

如果希望在代码编写过程中自动提示 Cocos Creator 引擎 API，需要通过菜单生成 API 智能提示数据并自动放进项目路径下。

选择主菜单的 `开发者/更新 VS Code 智能提示数据`。该操作会将根据引擎 API 生成的 ` creator.d.ts` 数据文件复制到项目根目录下（注意是在 `assets` 目录外面），操作成功时会在 **控制台** 显示绿色提示：`API data generated and copied to ...`。

对于每个不同的项目都需要运行一次这个命令，如果 Cocos Creator 版本更新了，也需要打开您的项目重新运行一次这个命令，来同步最新引擎的 API 数据。

**注意** 从 VS Code 0.10.11 版开始，需要在项目根目录中添加 `jsconfig.json` 设置文件才能正确的使用包括智能提示在内的 JavaScript 语言功能，在执行上面的命令时，预设的 `jsconfig.json` 文件会和 `creator.d.ts` 一起拷贝到您的项目根目录中。

### 使用 VS Code 打开和编辑项目

现在可以运行我们之前下载安装好的 VS Code 了，启动后选择主菜单的 `File/Open...`，在弹出的对话框中选择您的项目根目录，也就是 `assets`, `project.json` 所在的路径。

现在新建一个脚本，或者打开原有的脚本编辑时，就可以享受智能语法提示的功能了。

![vs code](coding-setup/vscode.png)

注意 `creator.d.ts` 文件必须放在 VS Code 打开的项目路径下，才能使用智能提示功能。

### 设置文件显示和搜索过滤

在 VS Code 的主菜单中选择 `Code/Preferences/User Settings`，这个操作会打开用户配置文件，在配置文件中加入以下内容：
```json
    "search.exclude": {
        "**/node_modules": true,
        "**/bower_components": true,
        "build/": true,
        "temp/": true,
        "library/": true,
        "**/*.anim": true
    },
    "files.exclude": {
        "**/.git": true,
        "**/.DS_Store": true,
        "**/*.meta": true,
        "library/": true,
        "local/": true,
        "temp/": true
    }
```

上面的字段将为 VS Code 设置搜索时排除的目录，和在文件列表中隐藏的文件类型。由于 `build`, `temp`, `library` 都是编辑器运行时自动生成的路径，而且会包含我们写入的脚本内容，所以应该在搜索中排除。而 `assets` 目录下的每个文件都会生成一个 `.meta` 文件，一般来说我们不需要关心他的内容，只要让编辑器帮我们管理这些文件就可以了。

### 使用 VS Code 调试网页版游戏

VS Code 有着优秀的 debug 能力，我们可以直接在源码工程中调试网页版游戏程序。

首先需要安装：

- [Chrome（谷歌浏览器）](https://www.google.com/chrome/)
- VS Code 插件：Debugger for Chrome

安装 VS Code 插件时，请点击 VS Code 左侧导航栏的 `扩展` 按钮打开扩展面板，并在搜索框中输入 `Debugger for Chrome` 并点击安装继续。安装之后可能需要重启 VS Code 才能生效。

接下来在 Cocos Creator 编辑器主菜单里执行 `VS Code 工作流->添加 Chrome Debug 配置`，这个菜单命令会在你的项目文件夹下添加一个 `.vscode/launch.json` 文件作为调试器的配置，之后你就可以在 VS Code 里点击左侧栏的 `调试` 按钮打开调试面板，并在最上方的调试配置中选择 `Creator Debug: Launch Chrome`，然后点击绿色的开始按钮开始调试。

调试的时候依赖 Cocos Creator 编辑器内置的 Web 服务器，所以需要在编辑器启动状态下才能进行调试。如果编辑器预览游戏时使用的端口不是默认端口，则需要手动修改 `launch.json` 里的 `url` 字段，将正确的端口添加上去。

调试过程中可以在源码文件上直接下断点，进行监控，是比使用 Chrome 内置的 DevTools 调试更方便和友好的工作流程。

### 使用 VS Code 调试原生工程

调试原生工程的工作流程请查阅 [原生平台调试](../publish/debug-native.md)。


### 学习 VS Code 的使用方法

前往 VS Code 官网的[文档页面](https://code.visualstudio.com/Docs)，了解从编辑功能操作、个性化定制、语法高亮设置到插件扩展等各方面的使用方法。
