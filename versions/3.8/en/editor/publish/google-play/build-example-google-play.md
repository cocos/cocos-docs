# Google Play Build Example

This article demonstrates the process of publishing a Cocos Creator project as a Google Play application.

Please prepare a Cocos Creator project with at least one scene.

![project.png](../../../../zh/editor/publish/google-play/images/project.png)

## Setting Up the Publishing Environment

To publish a Google Play native application, you need to install the Android Studio development environment, along with specific versions of JDK (or OpenSDK), Android SDK, and NDK. For details, please refer to [Configure Android Native Development Environment](../../../../en/editor/publish/android/build-setup-evn-android.md).

## Publishing Process

Next, in Cocos Creator, find the **Project** menu, click the **Build** button to open the **Build** panel.

### Creating a Build Task

1. Select **Project** -> **Build** menu to open the build panel

    ![cc-build-menu.png](../../../../zh/editor/publish/google-play/images/cc-build-menu.png)

2. Click the **New Build Task** option in the panel:

    ![new-build-task.png](../../../../zh/editor/publish/google-play/images/new-build-task.png)

3. Select Google Play as the build platform:

    ![select-platform.png](../../../../zh/editor/publish/google-play/images/select-platform.png)

4. Select at least one scene as the initial loading scene. When there is only one scene, it will be added by default:

    ![start-scene.png](../../../../zh/editor/publish/google-play/images/start-scene.png)

5. Enable ADPF (Optional) 

    ![enable-adpf.png](../../../../zh/editor/publish/google-play/images/enable-adpf.png)

6. Refer to [Android Platform Build Options - Render Backend](../../../../en/editor/publish/native-options.md#%E6%B8%B2%E6%9F%93%E5%90%8E%E7%AB%AF) to select the render backend

    ![render-backend.png](../../../../zh/editor/publish/google-play/images/render-backend.png)

7. Enter the package name

    ![game-package-name.png](../../../../zh/editor/publish/google-play/images/game-package-name.png)

    > For naming conventions, please refer to [Application ID Name](../../../../en/editor/publish/native-options.md#%E5%BA%94%E7%94%A8-id-%E5%90%8D%E7%A7%B0)

8. Change Application Icon (Optional)

![custom-icon.png](../../../../zh/editor/publish/google-play/images/custom-icon.png)

9. Select Target API Level

    ![target-api-level.png](../../../../zh/editor/publish/google-play/images/target-api-level.png)

    > If there's no dropdown box, please check if the **SDK and NDK Configuration** above is correct.

10. Enable Google Play Instant (Optional)

    ![enable-google-play-instant.png](../../../../zh/editor/publish/google-play/images/enable-google-play-instant.png)
    
11. Enable Google Play Billing Feature

    ![enable-google-play-billing.png](../../../../zh/editor/publish/google-play/images/enable-google-play-billing.png)

    > Without checking this option, you cannot use the Google Play Billing interface

For other options, please refer to [Android Platform Build Options](../../../../en/editor/publish/native-options.md#android-%E5%B9%B3%E5%8F%B0%E6%9E%84%E5%BB%BA%E9%80%89%E9%A1%B9) for configuration.

### Build and Publish

1. Build: Click the **Build** button below to create a new build task and start building

    ![build.png](../../../../zh/editor/publish/google-play/images/build.png)

2. Wait for the build to complete

    ![building.png](../../../../zh/editor/publish/google-play/images/building.png)

#### Generate AAB Package via Creator
1. Click **Generate** 

    ![make](../../../../zh/editor/publish/google-play/images/make.png)

2. Wait for the generation to complete

    ![making.png](../../../../zh/editor/publish/google-play/images/making.png)

3. Click the button below to open the generated project:

    ![open](../../../../zh/editor/publish/google-play/images/open.png)

4. Find the publish directory
    
    ![find-publish-dir](../../../../zh/editor/publish/google-play/images/find-publish-dir.png)

5. Find the generated AAB package
    
    ![find-release-aab](../../../../zh/editor/publish/google-play/images/find-release-aab.png)

#### Generate AAB Package via Android Studio
1. 找到工程对应的目录

    ![find-proj](../../../../zh/editor/publish/google-play/images/find-proj.png)

2. Open Android Studio menu:

    ![android studio open project menu](../../../../zh/editor/publish/google-play/images/as-open-menu.png)

3. Open the built project at `{project path}/build/google-play/proj`:

    ![android studio open project](../../../../zh/editor/publish/google-play/images/as-open-proj.png)

4. Build APK using Android Studio

    After opening Android Studio, it will take some time for preparation. Once Android Studio has finished preparing the project, you can package the APK. The preparation process might take a while. If there's no response for a long time, please check your network or switch to another mirror. If you need to interrupt the current background task, you can refer to the following closing method:

    > When Android Studio has background tasks, you can click the background task bar at the bottom of the window:
    >
    > ![background-task.png](../../../../zh/editor/publish/google-play/images/background-task.png)
    >
    > Click the × on the right in the popup window to end the background task:
    >
    > ![interrupt-sync.png](../../../../zh/editor/publish/google-play/images/interrupt-sync.png)

5. Open the **Build** menu and select **Build Bundle(s) / APK(s)**:

    ![build-apk.png](../../../../zh/editor/publish/google-play/images/build-apk.png)

6. After successful publication, you can find the Debug version of the APK in the proj/build directory:

    ![apk.png](../../../../zh/editor/publish/google-play/images/apk.png)

## Others
Other aspects are basically the same as Android. You can refer to [Android Build Example](../../../../en/editor/publish/android/build-example-android.md)

## Google Play Game Services
[Google Play Game Services Documentation](./google-play-game-services.md)