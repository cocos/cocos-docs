# Publish to Native Platforms

Click **Project -> Build** in the main menu of the editor to open the **Build** panel.

**Cocos Creator** supports four native platforms, which include **Android**, **iOS**, **Mac** and **Windows**. The options to release games on iOS, Mac and Windows will only appear on those operating systems. This means it isn't possible to publish, for example, a game to iOS from a Windows computer.

![native platform](publish-native/native-platform.png)

## Environment Configuration

To publish to the native platforms you need to install and configure some necessary development environments. Please refer to the [Setup Native Development Environment](setup-native-development.md) for details.

## Build Options

For the general build options for all platforms, see [General Build Options](build-options.md) for details.

### General build options for native platforms

Due to the adjustments made to the build mechanism, the processing of different platforms are injected into the **Build** panel as **plugins**.

When you select the native platform you want to build in the **Platform** option of the **Build** panel, you will see that there is a **native** expand option in addition to the specific native platform expand option (e.g., **android**, **ios**). The build options in **native** are the same for all native platforms.

![native options](publish-native/native-options.png)

#### Resource Server Address

When the package is too large (in size), the resource can be uploaded to a resource server and downloaded via a network request. This option is used to fill in the address of the remote server where the resource is stored. The developer needs to manually upload the `remote` folder in the release package directory to the filled-in resource server address after the build. For more details, please refer to the [Uploading resources to a remote server](../../asset/cache-manager.md) documentation.

#### Polyfills

**Polyfills** is a new feature option supported by the script system. If this option is checked at build time, the resulting release package will have the corresponding **polyfills** in it, which means it will increase the size of the package. Developers can choose **polyfills** on demand, but only `Async Functions` are currently available, and more will be opened later.

#### Make after build immediately

If this option is checked, the **Make** step will be executed automatically after the build is completed, without manual operation.

#### Encrypt JS

This option is used to encrypt the published script. After build, the `JSC` file is generated in the `assets/` directory, which is encrypted. And the `JS` file will be backed up in the `script-backup` directory for debugging, and will not enter the APP when packaged.

**JS Encryption Key**: This secret key will be used to encrypt `JS` files. The project will generate the key randomly when created.

**Zip Compress**: If this option is checked, you can reduce the size of your scripts.

![encrypt js](publish-native/encrypt-js.png)

#### Native Engine

This option is used to show whether the built-in engine or a custom engine is currently being used. Click the **Edit** button behind it to go to the **Preferences -> [Engine Manager](../preferences/index.md#engine-manager)** panel for settings.

### Build Options for the Android Platform

The build options for the Android platform are as follows:

![Android build options](publish-native/android-options.png)

#### Render BackEnd

Currently, [VULKAN](https://www.vulkan.org/), [GLES3](https://www.khronos.org/registry/OpenGL-Refpages/es3/) and [GLES2](https://www.khronos.org/registry/OpenGL-Refpages/es2.0/) are supported, and **GLES3** is checked by default. If more than one is checked at the same time, the rendering backend will be selected based on the actual support of the device at runtime.

#### Game Package Name

The Game Package Name is usually arranged in the reverse order of the product's website URL, such as: `com.mycompany.myproduct`.

> **Note**: only numbers, letters and underscores can be included in the package name. Besides, the last section of package name should start with a letter, but not an underscore or a number.

#### Target API Level

Set up the Target API Level required for compiling the Android platform. Click the **Set Android SDK** button next to it to quickly jump to the configuration page. Refer to the [Setup Native Development Environment](setup-native-development.md) documentation for specific configuration rules.

#### APP ABI

Set up the CPU types that Android needs to support, including **armeabi-v7a**, **arm64-v8a**, **x86** and **x86_64**. You can choose one or more options.

> **Notes**:
> 1. When you select an ABI to build and then build another ABI without `Clean`, both ABI's `so` will be packaged into the APK, which is the default behavior of Android Studio. If you import a project with Android Studio, after selecting an ABI to build, run **Build -> Clean Project**, then build another ABI, only the latter ABI will be packaged into the APK.
> 2. After the project is imported with Android Studio, it is an independent existence and does not depend on the **Build** panel. If you need to modify the ABI, you can directly modify the `PROP_APP_ABI` property in `gradle.properties` file as shown below:
>
>     ![modify abi](publish-native/modify_abi.png)

#### Use Debug Keystore

Android requires that all APKs be digitally signed with a certificate before they can be installed. A default keystore is provided, check the **Use Debug Keystore** to use the `default keystore`. If you need to customize the keystore, you can remove the **Use Debug Keystore** checkbox. Please refer to the official [Android Documentation](https://developer.android.com/studio/publish/app-signing) for details.

Android requires that all APKs must be digitally signed with a certificate before they can be installed. Cocos Creator provides a default keystore by checking **Use Debug Keystore** to use it. If you need to customize the keystore, you can remove the **Use Debug Keystore** checkbox, refer to the [Official Documentation](https://developer.android.com/studio/publish/app-signing) for details.

#### Screen Orientation

The screen orientation currently includes **Portrait**, **Landscape Left** and **Landscape Right**.

- **Portrait**: the screen is placed vertically with the **Home** button on the bottom.
- **Landscape Left**: the screen is placed horizontally, with the **Home** button on the left side of the screen.
- **Landscape Right**: the screen is placed horizontally, with the **Home** button on the right side of the screen.

#### Google Play Instant

If this option is enabled, the game can be packaged and published to Google Play Instant.

Google Play Instant relies on Google Play, and it is not a new distribution channel, but closer to a game micro-end solution. It can realize the game to be played without installing, which is useful for game's trial play, sharing and conversion.

> **The following notes are required when using**:
> 1. The Android Studio should be v4.0 and above.
> 2. The Android Phone should be v6.0 and above. Devices with Android SDK version between 6.0 and 7.0 need to install Google Service Framework, while those with SDK version 8.0 or higher do not need it and can install it directly.
> 3. If you compile for the first time, you need to open the built project with Android Studio to download **Google Play Instant Development SDK (Windows)** or **Instant Apps Development SDK（Mac）** support package. If the download fails, it is recommended to set up an HTTP proxy for Android Studio.
>
>     ![Google Play Instant](publish-native/sdk-android-instant.png)

#### App Bundle (Google Play)

If this option is enabled, the game can be packaged into App Bundle format for uploading to Google Play store. Please refer to [Official Documentation](https://developer.android.com/guide/app-bundle/) for details.

### Build Options for the Windows Platform

The build options for the **Windows** platform currently have only one **Render BackEnd**, which includes **VULKAN**, **GLES3** and **GLES3**, with **GLES3** checked by default. If more than one is checked at the same time, the rendering backend will be selected based on the actual support of the device at runtime.

![Windows build options](publish-native/windows-options.png)

### Build Options for the iOS Platform

The build options for the iOS platform include **Bundle Identifier**, **Orientation** and **Render BackEnd**. The setting of **Orientation** is the same as the Android platform.

![iOS build options](publish-native/ios-options.png)

#### Bundle Identifier

The package name, usually arranged in the reverse order of the product's website URL, such as: `com.mycompany.myproduct`.

> **Note**: only numbers, letters and underscores can be included in the package name. Besides, the last section of package name should start with a letter, but not an underscore or a number.

#### Render BackEnd

Currently, only **METAL** is supported for the Render BackEnd.

### Build Options for the Mac Platform

The build options for the Mac platform include **Bundle Identifier**, **Render BackEnd** and **Support M1**, and the setup method for the first two options is the same as the iOS platform.

![Mac build options](publish-native/mac-options.png)

v3.1 adds a new **Support M1** option to better flag support issues for some known engine modules on Apple M1 (Silicon) architecture devices.

## Build a Native Project

After the build options are set, you can begin the build. Click the **Build** button in the bottom right corner of the **Build** panel to start the build process.

When compiling scripts and zipping resources, a blue progress bar will display on the **Build Task** window. When the build completes, the progress bar reaches 100% and turns green.

![build progress](publish-native/build-progress-windows.png)

After the build, we get a standard Cocos2d-x project, with the same structure as a new project created using Cocos Console. Taking the Windows platform as an example, the directory structure of the exported native project package `windows` is shown below:

![native directory](publish-native/native-directory.png)

- `assets`: places project resources.
- `proj`: places the currently built native platform project, which can be used by the IDE of the corresponding platform to perform compilation tasks.
- `cocos.compile.config.json`: place the compile option json for current build.

For more information, please refer to [Build Directory -- Native](../../release-notes/upgrade-guide-v3.0.md#native).

Next, you can continue to Make and run desktop previews through the Cocos Creator editor, or manually open the built native project in the IDE of the corresponding platform for further previewing, debugging, and publishing.

## Make and Run

Cocos Creator supports **Make** and **Run Preview** steps via the editor or the corresponding IDE for each platform (e.g. Xcode, Android Studio, Visual Studio).

### By the Editor

Click the **Make** button on the **Build Task** window to enter the compile process. When the compilation is successful, it will prompt:

`make package YourProjectBuildPath success!`

> **Note**: after the first compilation of the Android platform or version upgrade, it is recommended to open the project via Android Studio, download the missing tools according to the prompts, and then perform the Make and Run.

Once the **Make** process is complete, continue to click the **Run** button next to it. Some compilation work may continue, so please wait patiently or check the progress through the log file. The results of the **Run** for each platform are as follows:

- Mac/Windows platform: run the preview directly on the desktop.
- Android platform: must connect to physical device via USB and the preview can be run after the USB debugging is enabled on the physical device.
- IOS platform: will call the simulator to run the preview. But it is recommended to connect to the physical device via Xcode to execute **Make** and **Run**, as described below.

### By the IDE

Click the folder icon button in the bottom left corner of the **build task** window, the release path will be opened in the file manager of the operating system. The `proj` folder under the release package directory contains the native platform project of the current build.

Next, open these generated native projects using the IDE corresponding to the native platform (e.g. Xcode, Android Studio, Visual Studio) and you can make further operations like compilation, preview and release.

- **Android**

  ![android xcode](publish-native/android-studio.png)

- **Windows**

  ![windows xcode](publish-native/windows-vs.png)

- **Mac** 和 **iOS**

  ![xcode](publish-native/ios-xcode.png)

For the usage instructions for native platform's IDE, please search related information on your own, which will not be discussed in detail here.

To learn how to debug on a native platform, please refer to [Debugging JavaScript on Native Platforms](debug-jsb.md).

## Precautions

1. Projects that run debug mode builds on MIUI 10 systems may pop up a "Detected problems with API compatibility" prompt box, which is a problem introduced by the MIUI 10 system itself, you can use release mode build to solve the problem.

2. When building for iOS, if WebView and related features are not needed, please ensure that the WebView module is removed from the **Project -> Project Settings -> Feature Cropping** to help the approval process go as smoothly as possible on iOS App Store. If WebView is needed (or the added third-party SDK comes with WebView), and therefore the game rejected by App Store, try to appeal through email.

3. The result of compiling the Android through the editor and Android Studio has the following differences.

    - After executing the **Make** step via the editor, the `build` directory will be created under the release path, and the `.apk` will be generated in the `app\build\outputs\apk` directory of the `build` directory.

    - After compiling with Android Studio, the `.apk` is generated in the `proj\app\build\outputs\apk` directory.

4. In Cocos Creator 3.0, Android and Android Instant use the same build template, and the built native projects are in the `build\android\proj` directory. Please note for this directory:

    - For code and third-party library used separately by the Android, place them in the `app\src` and `app\libs` directories, respectively (If you don't have these two directories, you can create them yourself).

    - For code and third-party library used separately by the Android Instant, place them in the `instantapp\src` and `instantapp\libs` directories, respectively.

    - For code and third-party library used in common by the Android and Android Instant, place them in the `src` and `libs` directories, respectively.

    When compiling Android in **Build** panel, `assembleRelease/Debug` is executed by default. When compiling Android Instant, `instantapp:assembleRelease/Debug` is executed by default.
