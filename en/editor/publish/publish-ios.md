# Publish to iOS

Please check [Native Platform Build Guidelines](./native-options.md), before reading this article.

## iOS Build Options

![ios_options](publish-native/ios_options.png)

### Render BackEnd

Three options of metal, gles3 are supported. By default, metal is checked.

### Bundle Identifier(Package Name)

Usually in descending order by product site URL, e.g. `com.mycompany.myproduct`.

> **Note**: only numbers, letters and underscores can be included in the **Package Name**. In addition, the last part of the **Package Name** must begin with a letter, not with an underscore or a number.

### Orientation

The orientation of the device includes three types **Portrait**, **Landscape Left**, and **Landscape Right**.

## Compile / run project

### Use the compile and run buttons on the build panel

Project will be automatically compiled after the build. If you need to recompile the project after build, you can click the compile button alone. You can open the build debugging tool to view the log output when the project is compiling or running.

When running, you only need to connect your phone to your computer and click Run.

### Compile/Run with Xcode

Use Xcode to open the file `ios\proj\.xcodeproj` in the build directory, set the signature in the Xcode panel `General -> Signing`, select the connected device at the top left of Xcode and click the compile button to compile and run.

To learn how to debug on the native platform, please refer to [Native Platform JavaScript Debugging](debug-jsb.md).
