# Publish in command line

Publish project in command line can help us build auto publish step, we can modify command line parameters to reach different goals.

## Command Reference
 - Mac - `/Applications/CocosCreator.app/Contents/MacOS/CocosCreator --path projectPath --build "platform=android;debug=true"`
 - Windows - `CocosCreator/CocosCreator.exe --path projectPath --build "platform=android;debug=true"`

If you want to auto start compile after build, use `autoCompile` parameter.
 - `--build "autoCompile=true"`

You can also compile project by using `--compile` command, the parameters is the same with `--build`.
 - `--compile "platform=android;debug=true"`

## Publish Parameters 
 - `path`: Project Path
 - `build`: Pulibsh project Parameters. Will use Build Panel parameters as the default publish parameters. If has specify other parameters, then will use the specified parameters to overlay the default parameters.
 - `compile`: Compile project Parameters. Will use Build Panel parameters as the default publish parameters. If has specify other parameters, then will use the specified parameters to overlay the default parameters.

---

`--build` and `--compile` optional parameters:

 - `excludedModules`: The modules need remove from engine. Engine modules can find from [here](https://github.com/cocos-creator/ engine/blob/master/modules.json)
 - `title` - Project title
 - `platform` - Publish platform [web-mobile, web-desktop, android, win32, ios, mac, runtime]
 - `buildPath` - Publish path
 - `startScene` - Start scene uuid
 - `debug` - Whether or not debug mode 
 - `previewWidth` - Web desktop window width
 - `previewHeight` - Web desktop window height
 - `sourceMaps` - Whether or not need add source maps
 - `webOrientation` - Orientation option on web mobile [landscape, portrait, auto]
 
 - `inlineSpriteFrames` - Whether or not inline all SpriteFrames
 - `mergeStartScene` - Whether or not merge all JSON that the Start Scene depends on
 
 - `packageName` - Package Name
 - `useDebugKeystore` - Whether or not use debug keystore
 - `keystorePath` - Keystore path
 - `keystorePassword` - Keystore password
 - `keystoreAlias` - Keystore alias
 - `keystoreAliasPassword` - Keystore alias password
 - `orientation` - Orientation on native mobile [portrait, upsideDown, landscapeLeft, landscapeRight]  
    examples:    
  - orientation={"landscapeLeft": true} 
  - orientation={"landscapeLeft": true, "portrait": true}
 - `template` - Template on native platform [default, link, binary]
 - `androidStudio` - Whether or not use android studio to compile android project
 
 - `includeAnySDK` - Whether or not add AnySDK on web platform
 - `oauthLoginServer` - AnySDK oauth login server
 - `appKey` - AnySDK App Key
 - `appSecret` - AnySDK App Secret
 - `privateKey` - AnySDK Private Key
 
 - `autoCompile` - Whether or not auto compile project after publish project. Default is **false**.

 - `configPath` - Config file path. If define `configPath`, then creator will load this file as a `json` file, and combine with the build parameters.




