# 命令行发布项目

通过命令行发布项目可以帮助大家构建自己的自动化构建流程，大家可以修改命令行的参数来达到不同的构建需求。

## 命令行发布参考
 - Mac - `/Applications/CocosCreator.app/Contents/MacOS/CocosCreator --path projectPath --build 'platform=android;debug=true'`
 - Windows - `CocosCreator/CocosCreator.exe --path projectPath --build`

## 构建参数 
 - path 指定项目路径
 - build 指定构建项目使用的参数。   
   这里会使用 Creator 中构建面板当前的参数来作为默认构建参数，如果指定了其他参数，则会使用指定的参数来覆盖默认参数。

   可选择的参数有：

   - excludedModules: engine 中需要排除的模块，模块可以从 [这里](https://github.com/cocos-creator/engine/blob/master/modules.json) 查找到
   - title: 项目名
   - platform: 构建的平台
   - dest: 构建目录
   - startScene: 主场景的 uuid 值
   - debug: 是否为 debug 模式
   - previewWidth: 预览窗口宽度
   - previewHeight: 预览窗口高度
   - sourceMaps: 是否需要加入 source maps
   - webOrientation: web mobile 平台下的旋转选项, [landscape, portrait, auto]
   
   - packageName: 包名
   - useDebugKeystore: 是否使用 debug keystore
   - keystorePath: keystore 路径
   - keystorePassword: keystore 密码
   - keystoreAlias: keystore 别名
   - keystoreAliasPassword: keystore 别名密码
   - orientation: native mobile 平台下的旋转选项, [portrait, upsideDown, landscapeLeft, landscapeRight]   
     因为这是一个 object, 所以定义会特殊一些。   
     orientation={"landscapeLeft": true} 或   
     orientation={"landscapeLeft": true, "portrait": true}
   - template: native 平台下的模板选项, [default, link, binary]
   - androidStudio: 是否使用 android studio 来编译 android 项目
   
   - includeAnySDK: web 平台下是否加入 any sdk 代码,
   
   - autoCompile: 是否在构建完成后自动进行编译项目




