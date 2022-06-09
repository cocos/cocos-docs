# Setup Native Development Environment

Apart from publish game to Web, Cocos Creator uses the JSB technology based on cocos2d-x engine for the cross-platform release of native games. Before using Cocos Creator to bundle and publish games to native platforms, you need to configure related cocos2d-x development environment first.

## Android platform dependencies

To publish to the Android platform, you need to install all of the following development environments.

If you do not have a plan to publish to the Android platform, or if your operating system already has a full Android development environment, you can skip this section.

### Download the Java SDK (JDK)

Compile the Android project requires a complete Java SDK tool on your local computer, download it at the following address:

[Java SE Development Kit 8 Downloads](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)

Download and pay attention to select the machine and the operating system and architecture, download the installation can be completed after the installation process.

After the installation is complete, please confirm that the `java` command is valid on the command line. Input the following code into Mac terminal or Windows command line tool for check:

```
java -version
```

If "JAVA SE" displays, there is no problem. If "JRE" displays, then you need to install [JAVA SE running environment](http://www.oracle.com/technetwork/java/javase/downloads/index.html).

On Windows platform, please confirm if "JAVA_HOME" is included in your environmental variables. By right clicking My Computer, choosing property and opening the advanced tab, you can check and modify environmental variables. For effective running on Windows platform, you might need to restart the computer.

### Download and install Android Studio

Starting with v1.5, we support the latest version of Android Studio and companion building tools. We recommend Android Studio as an Android platform build tool and you should download the required SDK and NDK packages in Android Studio. First install [Android Studio](http://www.android-studio.org/).

### Download the SDK and NDK required to publish the Android platform

After installing Android Studio, refer to the official documentation and open the SDK Manager:

[SDK Manager Instructions](https://developer.android.com/studio/intro/update.html#sdk-manager)

1. In the `SDK Platforms` tab page, check the API level you want to install, and choose the minimum compatible API Level 10 (2.3.3) and the mainstream API Level such as 17 (4.2) and 22 (5.1).
2. In the `SDK Tools` tab page, first check the lower right corner of the `Show package details`, show the version of the tool selection.
3. In the `Android SDK Build-Tools', select at least build tools version 25.
4. Check the `Android SDK Platform-Tools`, `Android SDK Tools` and `Android Support Library`
5. Check the `NDK`, Please use versions later than NDK "r10c", and "r10e" version is recommended.<br>
**Note**: NDK-r18 has removed the GNU compiler. Please do not update the NDK to r18 for versions below Creator v2.1, otherwise it will cause the compile error.
6. Take note of the path of `Android SDK Location` on top of the SDK Manager window. Later we need to fill in the location of the SDK in Cocos Creator.
7. Click `OK` and follow the prompts to complete the installation.

![Sdk manager](setup-native-development/sdk-manager.jpg)

### Android SDK 10 dependencies

Starting with v1.2.2, the default Android project template will specify the `android-10` sdk platform version as the default target. For more information, see [Pull Request Use API Level 10](https://github.com/cocos/engine-native/pull/316).

If you encounter build error like 'not found android-10', you can download `Android SDK API Level 10` according to the description below.

If you need to change the target API Level, you can modify the built project file `cocos/platform/android/java/project.properties`:

```java
target = android-10
```

Change `android-10` to the other API Level you need.

## Install C++ compiling environment

The compiling tool Cocos Console in Cocos Framework needs the following running environment:

- Python 2.7.5+, [download page](https://www.python.org/downloads/). Pay attention! Don't download Python 3.x version.
- In Windows, the installation of Visual Studio 2015 or 2017 Community Edition is needed, [download page](https://www.visualstudio.com/downloads/download-visual-studio-vs)
- In Mac, the installation of Xcode and command line tool is needed, [download page](https://developer.apple.com/xcode/download/)

## Configure path in original release environments

Next, let's go back to Cocos Creator to configure the environmental path of the constructing release original platform. Choose `CocosCreator -> preference` in the main menu, and open the preference window:

![preference](../getting-started/basics/editor-panels/preferences/native-develop.jpg)

We need to configure the following three paths here:

- **Android SDK Root**: choose the `Android SDK Location` path we just noted in Android Studio SDK Manager window (the directory of Android SDK should include documents like "build-tools", "platforms", etc.). You can skip this if you don't need to compile the Android platform.
- **NDK Root**: choose the `ndk-bundle` folder in `Android SDK Location` path. You can skip this if you don't need to compile on Android platform.
- **ANT Path**: you should choose the downloaded and unzipped Apache Ant folder, the path should be set under the bin directory in the ant installation directory. The chosen path should include an executable file named `ant`. You can skip this if you don't need to compile on Android platform.

Close the window after configuration is completed.

> **Note**: the configure will work when build native project. If the configure not works(some Mac may occur this situation), please try to set these settings to **System Environment** manually: COCOS_CONSOLE_ROOT, ANT_ROOT, NDK_ROOT, ANDROID_SDK_ROOT.

## Notes

We have received lots of feedback about original packing in the public beta, and some possible reasons are supplemented here:

1. Check Xcode and Visual Studio

   Xcode support is required for building Mac version and iOS version. Building Windows version requires the installation of Visual Studio. When installing Visual Studio, the C++ compiling component is not ticked off by default. If it wasn't installed, you need to install it and choose compiling components concerning C++.

2. Package name issue

    Check the package name in the constructing release panel. Package names that include blank space, `-`, etc. are all illegal.

3. Android built successfully, but prompt `dlopen failed: cannot locate symbol "xxxx" referenced by "libcocos2djs.so"...` in runtime.

    Please check if the architecture and version of NDK and Android SDK correspond to the phone's Android system. In addition you can try to use the NDK and Android SDK version used in this article to test.

In the end, if building still fails, you can try to create a standard Cocos2d-x project and compile it. If the Cocos2d-x project is compilable and Cocos Creator couldn't, please send the bug to us by [forum](http://discuss.cocos2d-x.org/c/creator).
