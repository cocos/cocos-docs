# Publish to Windows

Please check [Native Platform Build Guidelines](./native-options.md), before reading this article.

## Windows Build Options

### Render BackEnd

Three options of vukan, gles3, and gles2 are supported. By default, gles3 is checked. When multiple options are selected, the actual rendering backend will be selected according to the device support.

## Compile / run project

### Use the compile and run buttons on the build panel

Project will be automatically compiled after the build. If you need to recompile the project after build, you can click the compile button alone. You can open the build debugging tool to view the log output when the project is compiling or running.

When running, you only need to connect your phone to your computer and click Run.

### Compile/Run with Android Studio

Use **Visual Studio** (**Visual Studio 2017 is recommended**) to open the `native\frameworks\runtime-src\proj.win32\.sln` file in the `build` directory, or just double-click it to compile and run the project. When installing **Visual Studio**, please note that you need to check the box to install the SDK for **Windows 8.1 version**.

> **Note**: when running a project built in debug mode on the **MIUI 10** system, the `Detected problems with API compatibility` prompt may pop up, which is a problem introduced by the **MIUI 10** system itself, just use the **release mode** to build.

To learn how to debug on the native platform, please refer to [Native Platform JavaScript Debugging](debug-jsb.md).
