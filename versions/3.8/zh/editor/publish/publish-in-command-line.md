# 命令行发布项目

命令行发布项目可以帮助开发者构建自己的自动化构建流程，通过修改命令行的参数来达到不同的构建需求。

## 命令行发布参考

**例如**：构建 web-desktop 平台、Debug 模式

- Mac

  ```bash
  /Applications/CocosCreator/Creator/3.0.0/CocosCreator.app/Contents/MacOS/CocosCreator --project projectPath
  --build "platform=web-desktop;debug=true"
  ```

- Windows

  ```bash
  ...\CocosCreator.exe --project projectPath --build "platform=web-desktop;debug=true"
  ```

目前命令行构建除了必填项外，如果不传递一律使用默认值来构建，具体参数默认值请参考下方描述以及平台的参数介绍。

## 进程退出码

- **32** 构建失败 —— 构建参数不合法
- **34** 构建失败 —— 构建过程出错失败，详情请参考构建日志
- **36** 构建成功

## 构建参数

- `--project`：必填，指定项目路径
- `--engine`：选填，指定自定义引擎路径
- `--build`：指定构建项目使用的参数

  在 `--build` 后如果没有指定参数，则会使用 Cocos Creator 中 **构建发布** 面板当前的平台、模板等设置来作为默认参数。如果指定了其他参数设置，则会使用指定的参数来覆盖默认参数。可选择的参数有：

    - `configPath` - 参数文件路径。如果定义了这个字段，那么构建时将会按照 `json` 文件格式来加载这个数据，并作为构建参数。这个参数可以自己修改也可以直接从构建面板导出，当配置和 configPath 内的配置冲突时，configPath 指定的配置将会被覆盖。
    - `stage` - 指定构建模式，默认为 'build'，可选 'make' | 'build' | 'bundle' 等
    - `logDest` - 指定日志输出路径
    - `includedModules` - 定制引擎打包功能模块，只打包需要的功能模块。具体有哪些功能模块可以参考引擎仓库根目录下 **cc.config.json**（[GitHub](https://github.com/cocos/cocos-engine/blob/3d/cc.config.json) | [Gitee](https://gitee.com/mirrors_cocos-creator/engine/blob/3d/cc.config.json)）文件中的 `features` 字段。
    - `outputName` - 构建后生成的发布包文件夹名称。
    - `name` - 游戏名称
    - `platform` - 必填，构建的平台，具体名称参考面板上对应扩展名称即可
    - `buildPath` - 指定构建发布包生成的目录，默认为项目目录下的 `build` 目录。可使用绝对路径或者相对于项目的路径（例如 `project://release`）。从 v3.4.2 开始支持类似 `../` 这样的相对路径。
    - `startScene` - 主场景的 UUID 值（参与构建的场景将使用上一次的编辑器中的构建设置），未指定时将使用参与构建场景的第一个
    - `scenes` - 参与构建的场景信息，未指定时默认为全部场景，具体格式为：`{}`
    - `debug` - 是否为 debug 模式，默认关闭
    - `replaceSplashScreen` - 是否替换插屏，默认关闭
    - `md5Cache` - 是否开启 md5 缓存，默认关闭
    - `mainBundleCompressionType` - 主包压缩类型，具体选项值可参考文档 [Asset Bundle — 压缩类型](../../asset/bundle.md#压缩类型)。
    - `mainBundleIsRemote` - 配置主包为远程包
    - `packages` - 各个扩展支持的构建配置参数，需要存放的是对于数据对象的序列化字符串，具体可以参考下文。

Cocos Creator 3.0 各个平台的构建会作为独立的扩展嵌入到 **构建发布** 面板中，因而各个平台的构建参数位置也不同。各个平台的构建参数会配置在 `packages` 字段中，例如：为微信小游戏指定构建参数，配置大体如下：

```
{
    taskName: 'wechatgame',
    packages: {
        wechatgame: {
            appid: '*****',
        }
    }
}
```

之后在构建扩展支持对外开放，其他扩展的配置参数也会通过同样的方式嵌入到 **构建发布** 面板中。具体各个平台的参数字段 **请参照各个平台文档中的参数介绍**，最好是通过 **构建发布** 面板的 **导出** 功能来获取配置参数，更加方便快捷。目前依旧兼容旧版本的参数进行构建，但之后将会移除该兼容处理，请尽快升级配置参数。

## 命令行执行独立发布 Bundle

1. 打开 Bundle 构建面板，配置好选项后，导出配置(自 3.8.2 起)

    ![export-config](./../../asset/bundle/export-config.png)
    导出的配置大致如下：

    ```json
    {
        "buildTaskIds": [
            "1699344873959"
        ],
        "dest": "project://build/build-bundle",
        "id": "buildBundle",
        "bundleConfigs": [
            {
                "root": "db://assets/resources",
                "output": true
            }
        ],
        "taskName": "build bundle db://assets/resources"
    }

    ```

2. 在命令行中执行以下命令：

- Mac

  ```bash
  /Applications/CocosCreator/Creator/3.0.0/CocosCreator.app/Contents/MacOS/CocosCreator --project projectPath
  --build "stage=bundle;configPath=./bundle-build-config.json;"
  ```

- Windows

  ```bash
  ...\CocosCreator.exe --project projectPath --build "stage=bundle;configPath=./bundle-build-config.json;"
  ```

命令行发布 Bundle 与普通的命令行构建类似，不过 `stage` 参数需要指定为 `bundle`，同时将在 bundle 构建面板上导出的配置指定为 `configPath` 参数。

3. 在命令行中执行“只构建脚本”
- Mac && Windows
   ```bash
   --build "buildScriptsOnly=true" 
   ```

## 在 Jenkins 上部署

Cocos Creator 命令行运行的时候也是需要 GUI 环境的。如果你的 Jenkins 无法使用 Cocos Creator 命令行运行，一个解决办法是：确保 Jenkins 运行在 agent 模式下，这样才能访问到 WindowServer。详情请参考 <https://stackoverflow.com/questions/13966595/build-unity-project-with-jenkins-failed>。

如果你的 Jenkins 在 Windows 下无法编译，请在 Windows 的 **控制面板 -> 管理工具 -> 服务** 中为 Jenkins 的服务指定一个本地用户，然后重启电脑就可以了。不必单独设置一个 master-slave 模式。
