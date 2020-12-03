# Publish to Android

Please check [Native Platform Build Guidelines](./native-options.md), before reading this article.

## Android build options

### Render BackEnd

Three options of vukan, gles3, and gles2 are supported. By default, gles3 is checked. When multiple options are selected, the actual rendering backend will be selected according to the device support.

### Bundle Identifier(Package Name)

Usually in descending order by product site URL, e.g. `com.mycompany.myproduct`.

> **Note**: only numbers, letters and underscores can be included in the **Package Name**. In addition, the last part of the **Package Name** must begin with a letter, not with an underscore or a number.

### Target API Level

Set the **Target API Level** required to compile the Android platform. Click the `Set Android SDK` button next to it to quickly jump to the **Android SDK** configuration page. You can refer to the [Setup Native Development Environment](setup-native-development.md) documentation for details.

### APP ABI

Set the CPU types that Android needs to support, including **armeabi-v7a**、**arm64-v8a** and **x86**. You can choose one or more options.

> **Note**: When you select an ABI to build and then build another ABI without `Clean`, both ABI's `so` will be packaged into the APK, which is the default behavior of Android Studio. If you import a project with Android Studio, after selecting an ABI to build, run **Build -> Clean Project**, then build another ABI, only the latter ABI will be packaged into the APK.
> **Note**: After the project is imported with Android Studio, it is an independent existence and does not depend on the **Build** panel. If you need to modify the ABI, you can directly modify the `PROP_APP_ABI` property in `gradle.properties` as shown below:

  ![modify abi](publish-native/modify_abi.png)

### Keystore

Android requires that all APKs be digitally signed with a certificate before they can be installed. A default keystore is provided, check the **Use Debug Keystore** to use the `default keystore`. If you need to customize the keystore, you can remove the **Use Debug Keystore** checkbox. Please refer to the official [Android Documentation](https://developer.android.com/studio/publish/app-signing) for details.

### Orientation

The orientation of the device includes three types **Portrait**, **Landscape Left**, and **Landscape Right**.

### Generate App Bundle (Google Play)

Check this option to package the game in App Bundle format for uploading to the **Google Play** store. Please refer to the official [Android Documentation](https://developer.android.com/guide/app-bundle/) for details.

## Compile / run project

### Use the compile and run buttons on the build panel

Project will be automatically compiled after the build. If you need to recompile the project after build, you can click the compile button alone. You can open the build debugging tool to view the log output when the project is compiling or running.

When running, you only need to connect your phone to your computer and click Run.

### Compile/Run with Android Studio

Use Android Studio to open the proj folder in the corresponding directory and refer to the corresponding tool documentation. If the version is upgraded, download the missing tool according to the prompt, and then compile and run.

To learn how to debug on the native platform, please refer to [Native Platform JavaScript Debugging](debug-jsb.md).
