# Publish in command line

Publish project in command line can help us build auto publish step, we can modify command line parameters to reach different goals.

## Command Reference

**For example**: Build Android platform with debug mode enabled

- Mac

```bash
/Applications/CocosCreator.app/Contents/MacOS/CocosCreator --path projectPath
  --build "platform=android;debug=true"
```

- Windows

```bash
CocosCreator/CocosCreator.exe --path projectPath --build "platform=android;debug=true"
```

If you want to auto start compile after build, use `autoCompile` parameter:

- `--build "autoCompile=true"`

You can also to compile the native project of the native platform separately by using `--compile` command, the parameters is the same with `--build`.

- `--compile "platform=android;debug=true"`

**Note**: The Web platform does not need to use `--compile` command, and the `--compile` command is used by the native platform.

## Publish Parameters

 - `--path`: Project Path
 - `--build`: Publish project parameters
 - `--compile`: Compile native project Parameters

If no parameters are specified after `--build` or `--compile`, then the parameters used in the **Build** panel, such as platforms, templates, and so on, will be used as default parameters. If additional parameter settings are specified, the default parameters will be overwritten with the specified parameters. The available parameters are:

- `excludedModules`: The modules need remove from engine. Engine modules can find from [here](https://github.com/cocos/cocos-engine/blob/master/modules.json)
- `title` - Project title
- `platform` - Publish platform [web-mobile, web-desktop, android, win32, ios, mac, qqplay, wechatgame, fb-instant-games]
- `buildPath` - Publish path
- `startScene` - Start scene uuid
- `debug` - Whether or not debug mode
- `previewWidth` - Web desktop window width
- `previewHeight` - Web desktop window height
- `sourceMaps` - Whether or not need add source maps
- `webOrientation` - Orientation option on web mobile [landscape, portrait, auto]
- `renderMode` - Render mode
  - 0 - Automatically chosen by engine.
  - 1 - Forced to use canvas renderer.
  - 2 - Forced to use WebGL renderer, but this will be ignored on mobile browsers.
- `inlineSpriteFrames` - Whether or not inline all SpriteFrames
- `mergeStartScene` - Whether or not merge all JSON that the Start Scene depends on
- `optimizeHotUpdate` - Whether or not merge all the SpriteFrames in the same atlas
- `packageName` - Package Name
- `vsVersion` - Visual Studio version，only used on windows. [Auto, VS2015, VS2017]
- `useDebugKeystore` - Whether or not use debug keystore
- `keystorePath` - Keystore path
- `keystorePassword` - Keystore password
- `keystoreAlias` - Keystore alias
- `keystoreAliasPassword` - Keystore alias password
- `orientation` - Orientation on native platform or each mini-game platform[portrait, upsideDown, landscapeLeft, landscapeRight]
    examples:
  - orientation={'landscapeLeft': true}
  - orientation={'landscapeLeft': true, 'portrait': true}
- `template` - Template on native platform [default, link, binary]
- `apiLevel` - Android api level
- `appABIs` - Which cpu types android need to support. You can choose more than one type from [armeabi, armeabi-v7a, arm64-v8a, x86]<br>
  Because it's an array type, the option can define like this:
  - appABIs=['armeabi', 'armeabi-v7a']
- `androidStudio` - Whether or not use android studio to compile android project
- `includeAnySDK` - Whether or not add AnySDK on web platform
- `oauthLoginServer` - AnySDK oauth login server
- `appKey` - AnySDK App Key
- `appSecret` - AnySDK App Secret
- `privateKey` - AnySDK Private Key
- `embedWebDebugger` - Whether or not inject vConsole debug plugin on web platform. <br>
 (Before Creator v1.9 was `includeEruda`, using the Eruda debug plugin)
- `md5Cache` - Whether or not enable md5 cache
- `encryptJs` - Whether or not encrypt js files when publish native platform
- `xxteaKey` - The key used for encrypt js files
- `zipCompressJs` - Whether or not compress the files after encrypting js files
- `wechatgame` - The wechatgame options
  - `appid`- The wechat game appid
  - `orientation` - The screen orientation [landscape, portrait]
- `autoCompile` - Whether or not auto compile project after publish project. Default is **false**.
- `configPath` - Config file path. If define `configPath`, then creator will load this file as a `json` file, and combine with the build parameters.

## Publish on Jenkins

CocosCreator also need GUI environment when running in command line. If your Jenkins can not run CocosCreator in command line, a solution is running Jenkins on the agent mode, so it can visit the WindowServer.

Details: <https://stackoverflow.com/questions/13966595/build-unity-project-with-jenkins-failed>
