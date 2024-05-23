# Publishing from the Command Line

Publish a project from the command line can help us build auto publish step, we can modify command line parameters to reach different goals.

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

> **Note**: the Web platform does not need to use `--compile` command, and the `--compile` command is used by the native platform.

## Publish Parameters

- `--path`: Project Path
- `--build`: Publish project Parameters
- `--compile`: Compile native project Parameters
- `--force`: Skip version upgrade detection, no upgrade prompt box will pop up

  If no parameters are specified after `--build` or `--compile`, then the parameters used in the **Build** panel, such as platforms, templates, and so on, will be used as default parameters. If additional parameter settings are specified, the default parameters will be overwritten with the specified parameters. The available parameters are:

  - `excludedModules`: The modules need remove from engine. Engine modules can find from [here](https://github.com/holycanvas/engine/blob/76460006e5046475cb714c48f801af8ea6a4fac9/modules.json)
  - `title` - Project title
  - `platform` - Publish platform [web-mobile, web-desktop, android, win32, ios, mac, wechatgame, wechatgame-subcontext, baidugame, baidugame-subcontext, xiaomi, alipay, qgame, quickgame, huawei, cocosplay, fb-instant-games, android-instant]
  - `buildPath` - Publish path
  - `startScene` - Start scene uuid
  - `debug` - Whether or not debug mode
  - `previewWidth` - Web desktop window width
  - `previewHeight` - Web desktop window height
  - `sourceMaps` - Whether or not need add source maps
  - `webOrientation` - Orientation option on web mobile [landscape, portrait, auto]
  - `inlineSpriteFrames` - Whether or not inline all SpriteFrames
  - `optimizeHotUpdate` - Whether or not merge all the SpriteFrames in the same atlas
  - `packageName` - Package Name
  - `useDebugKeystore` - Whether or not use debug keystore
  - `keystorePath` - Keystore path
  - `keystorePassword` - Keystore password
  - `keystoreAlias` - Keystore alias
  - `keystoreAliasPassword` - Keystore alias password
  - `orientation` - Orientation on native platform or each mini-game platform[portrait, upsideDown, landscapeLeft, landscapeRight]
    examples:
    - orientation={'landscapeLeft': true}
    - orientation={'landscapeLeft': true, 'portrait': true}
  - `template` - Template on native platform [default, link]
  - `apiLevel` - Android api level
  - `appABIs` - Which cpu types android need to support. You can choose more than one type from [armeabi-v7a, arm64-v8a, x86]<br>
  Because it's an array type, the option can define like this:
    - appABIs=['armeabi-v7a','x86']
  - `embedWebDebugger` - Whether or not inject vConsole debug plugin on web platform. <br>
 (Before Creator v1.9 was `includeEruda`, using the Eruda debug plugin)
  - `md5Cache` - Whether or not enable md5 cache
  - `encryptJs` - Whether or not encrypt js files when publish native platform
  - `xxteaKey` - The key used for encrypt js files
  - `zipCompressJs` - Whether or not compress the files after encrypting js files
  - `autoCompile` - Whether or not auto compile project after publish project. Default is **false**.
  - `configPath` - Config file path. If define `configPath`, then Creator will load this file as a `json` file, and combine with the build parameters.

Currently, not many parameters support command-line publishing. If no parameters are passed, the last configured configuration will be used. It is recommended that after manually packaging on a computer, upload the set build configuration files (in the settings directory) to the code repository, and then pull the configuration on the packager.

## Publishing using Jenkins

Cocos Creator also need GUI environment when running from command line. If the Jenkins server can not run Cocos Creator from the command line, a solution is running Jenkins in agent mode, so it can visit the WindowServer. Details: <https://stackoverflow.com/questions/13966595/build-unity-project-with-jenkins-failed>

If your Jenkins can not compile under Windows, specify a local user for the Jenkins service in the Windows **Control Panel -> Administrative Tools -> Services**, and then restart the computer. You don't need to set up a master-slave mode separately.
