# 命令行发布项目

通过命令行发布项目可以帮助大家构建自己的自动化构建流程，大家可以修改命令行的参数来达到不同的构建需求。

## 命令行发布参考

**例如**：构建 Android 平台、Debug 模式

- Mac

```bash
/Applications/CocosCreator.app/Contents/MacOS/CocosCreator --path projectPath
  --build "platform=android;debug=true"
```

- Windows

```bash
CocosCreator/CocosCreator.exe --path projectPath --build "platform=android;debug=true"
```

如果希望在构建完原生项目后自动开始编译的话，可以使用 `autoCompile` 参数：

- `--build "autoCompile=true"`

## 构建参数

 - `--path` - 指定项目路径
 - `--build` - 指定构建项目使用的参数

在 `--build` 后如果没有指定参数，则会使用 Creator 中构建面板当前的平台、模板等设置来作为默认参数。如果指定了其他参数设置，则会使用指定的参数来覆盖默认参数。可选择的参数有：

- `excludedModules` - engine 中需要排除的模块，模块可以从 [这里](https://github.com/cocos-creator/engine/blob/master/modules.json) 查找到
- `title` - 项目名
- `platform` - 构建的平台 [web-mobile、web-desktop、android、win32、ios、mac、qqplay、wechatgame、fb-instant-games]
- `buildPath` - 构建目录
- `startScene` - 主场景的 uuid 值（参与构建的场景将使用上一次的编辑器中的构建设置）
- `debug` - 是否为 debug 模式
- `previewWidth` - web desktop 窗口宽度
- `previewHeight` - web desktop 窗口高度
- `sourceMaps` - 是否需要加入 source maps
- `webOrientation` - web mobile 平台（不含微信小游戏）下的旋转选项 [landscape、portrait、auto]
- `renderMode` - 设置渲染类型
  - 0 - 由引擎自动选择.
  - 1 - 强制使用 Canvas 渲染模式
  - 2 - 强制使用 Webgl 渲染模式，但是在移动浏览器中这个选项会被忽略
 
- `inlineSpriteFrames` - 是否内联所有 SpriteFrame
- `mergeStartScene` - 是否合并初始场景依赖的所有 JSON
- `optimizeHotUpdate` - 是否将图集中的全部 SpriteFrame 合并到同一个包中

- `packageName` - 包名
- `vsVersion` - 设置使用的 Visual Studio 版本，只在 windows 上有用，可选的选项有 [Auto、VS2015、VS2017]
- `useDebugKeystore` - 是否使用 debug keystore
- `keystorePath` - keystore 路径
- `keystorePassword` - keystore 密码
- `keystoreAlias` - keystore 别名
- `keystoreAliasPassword` - keystore 别名密码
- `orientation` - native 平台（不含微信小游戏）下的旋转选项 [portrait, upsideDown, landscapeLeft, landscapeRight]
  因为这是一个 object, 所以定义会特殊一些：
  - orientation={'landscapeLeft': true} 或
  - orientation={'landscapeLeft': true, 'portrait': true}
- `template` - native 平台下的模板选项 [default、link、binary]

- `apiLevel` - 设置编译 android 使用的 api 版本
- `appABIs` - 设置 android 需要支持的 cpu 类型，可以选择一个或多个选项 [armeabi、armeabi-v7a、arm64-v8a、x86]<br>
   因为这是一个数组类型，数据类型需要像这样定义，注意选项需要用引号括起来：
  - appABIs=['armeabi', 'armeabi-v7a']

- `androidStudio` - 是否使用 android studio 来编译 android 项目

- `includeAnySDK` - web 平台下是否加入 AnySDK 代码
- `oauthLoginServer` - AnySDK 验证登陆服务器
- `appKey` - AnySDK App Key
- `appSecret` - AnySDK App Secret
- `privateKey` - AnySDK Private Key

- `embedWebDebugger` - 是否在 web 平台下插入 vConsole 调试插件<br>
（Creator v1.9 版本之前是 `includeEruda`，使用的是 Eruda 调试插件）
- `md5Cache` - 是否开启 md5 缓存
- `encryptJs` - 是否在发布 native 平台时加密 js 文件
- `xxteaKey` - 加密 js 文件时使用的密钥
- `zipCompressJs` - 加密 js 文件后是否进一步压缩 js 文件

- `wechatgame` - 微信小游戏发布选项
  - `appid`- 发布微信小游戏时需要的 id
  - `orientation` - 微信小游戏屏幕方向 [landscape、portrait]

- `autoCompile` - 是否在构建完成后自动进行编译项目，默认为 **否**。

- `configPath` - 参数文件路径。如果定义了这个字段，那么构建时将会按照 `json` 文件格式来加载这个数据，并作为构建参数

## 在 Jenkins 上部署

CocosCreator 命令行运行的时候也是需要 GUI 环境的。
如果你的 Jenkins 无法使用 CocosCreator 命令行运行，一个解决办法是：确保 Jenkins 运行在 agent 模式下，这样才能访问到 WindowServer。

详见 ：
<https://stackoverflow.com/questions/13966595/build-unity-project-with-jenkins-failed>