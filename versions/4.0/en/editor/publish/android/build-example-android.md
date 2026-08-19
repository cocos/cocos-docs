# Android Publish Example

In this section, we will introduce how to build Cocos Creator project with Android Studio.

Please prepare a Cocos Creator project with at least one scene.

![project.png](images/project.png)

## Set Android Development Environment

To publish an Android native application, you need to install the Android Studio development environment, as well as specific versions of JDK (or OpenSDK), Android SDK, NDK, and more. For more details, please refer to the [Android Native Development Environment Setup](../setup-native-development.md).

## Publish Process

The next step is to create a new build task and publish an Android APK on the **Build** panel in Cocos Creator.

### Create Build Task

1. By clicking the **Project** -> **Build** menu to open **Build** panel.

    ![cc-build-menu.png](images/cc-build-menu.png)

2. At the top of **Build** panel, click on the **New Build Task** button

    ![new-build-task.png](images/new-build-task.png)P

3. To select **Android** as the build target platform, click on the drop-down menu

    ![select-platform.png](images/select-platform.png)

4. Make sure to have at least one scene designated as the Start Scene. If you have only one scene, it will be added by default

    ![start-scene.png](images/start-scene.png)

5. Please refer to  [Publishing to Native Platforms - Render BackEnd](../native-options.md#Render%20BackEnd) to select an appropriate render backend

        ![render-backend.png](images/render-backend.png)

6. Enter the Game Package Name

    ![game-package-name.png](images/game-package-name.png)

    > Please refer to [Bundle Identifier](../native-options.md#Bundle%20Identifier) for guidance your app's bundle identifier

7. Select Target API Level

    ![target-api-level.png](images/target-api-level.png)

    > In case no dropdown content, please check the SDK and NDK configuration in Cocos Creator

Other build options please refer to  [Publishing to Native Platforms](../native-options.md)

### Build and Publish

1. To begin a build process, click on the **Build** button for the selected build task.

    ![build.png](images/build.png)

2. Please wait until the build process finished

    ![building.png](images/building.png)

3. Click on the button below to open the folder containing the exported Android Project

    ![open](images/open.png)

4. Locate the corresponding directory

    ![find-proj](images/find-proj.png)

5. Click on the open menu on android studio

    ![android studio open project menu](images/as-open-menu.png)

6. Navigate to the project path in the `{Your project}/build` directory, which is named 'android' by default, and open it using Android Studio.

    ![android studio open project](images/as-open-proj.png)

7. Generate APK in Android Studio

    After the preparation has been completed by Android Studio, you can start building an Android APK. However, the sync process may take a long time to complete. If this happens, you can stop any ongoing background tasks by following the steps below:

    Click on the background task on the status bar:
    ![background-task.png](./images/background-task.png) <br>

    Close all background tasks by clicking on the close button
    ![interrupt-sync.png](images/interrupt-sync.png)

8. Click on **Build Bundle(s) / APK(s)** in the **Build** menu

    ![build-apk.png](images/build-apk.png)

9. The debug APK could be found in the `{proj/build}` directory

    ![apk.png](images/apk.png)

## Keystore Generation and Usage

For the release of the final version, the debug key cannot be used. You need to create your own key.

### Creating a Key

You can generate a key using Android Studio:

1. In Android Studio, click on the "Build" menu and select "Generate Signed Bundle / APK":
![gen-sign-apk.png](images/gen-sign-apk.png)

2. In the pop-up window, select "APK" and click "Next":
![gen-sign-apk.png](images/gen-sign-apk.png)

3. In the guided window, click on "Create new":
![create-sign.png](images/create-sign.png)

4. Fill in the required information in the pop-up window:
![android-keystore-panel.png](images/android-keystore-panel.png)

> It is recommended to use different keys for different projects. You can store each project's key in the project's root directory.

### Using the Key

After successfully creating the key, a key file will be generated in the selected directory. You can fill in the key information in the Android build panel. This way, both the debug and release versions will use the key you created.

As shown in the following image, uncheck the "Use debug keystore" option and select your custom key file from the "Keystore Path" below. Fill in the relevant information:
![debug-keystore.png](images/debug-keystore.png)

### Considerations

1. It is recommended to create a dedicated key for each project from the first release.
2. Some SDK services require APK key signature verification. Using the default debug key may result in service call failures.

## Advanced

### Java and TypeScript Communication

The engine provides various methods to solve the communication issues between TypeScript and the native layer.

When integrating common SDKs, we often need to perform login operations through the SDK's login interface, and then pass the results to the TypeScript layer for further processing in the game.

The engine provides three methods for communication between TypeScript and Android native layer.

- [JavaScript and Java Communication using JsbBridge](../../../advanced-topics/js-java-bridge.md): This method is very convenient for integrating SDKs and handling actions such as registration, login, and displaying ads. It can quickly solve these types of problems.

- [Tutorial: JSB 2.0](../../../advanced-topics/JSB2.0-learning.md): This method is recommended for frequent C++ API calls or batch exporting of C++ APIs..

- [JavaScript and Android Communication with Reflection](../../../advanced-topics/java-reflection.md): This method is highly effective for non-frequent calls.

### Importing Third-Party Libraries

To publish your application to the app market, you usually need to integrate certain third-party SDKs. These SDKs are typically provided in JAR or AAR format. You can refer to [Using Your Library in Other Projects](https://developer.android.com/studio/projects/android-library?hl=zh-cn#psd-add-library-dependency) to import the local library into your project.

### Extending Build Process

Please refer to [Extending Build Process](../custom-build-plugin.md) to extend the publishing mechanism by the extension system.

## Q&A

- Q： How to debug publishing errors
    - A： You can debug publishing errors by opening the log.txt file using the log button

        ![show-log.png](images/show-log.png)

- Q： Missing LIB_EGL
    - A： Change your NDK to the version mentioned above.

- Q： Asset name mechanism
    - A： Since Android is based on Linux, some file specifications of Linux still apply in Android, such as
        - 1. Android is case-sensitive, make sure the path is case-sensitive, otherwise, it will not load correctly
        - 2. Do not include spaces in the folder or file name
