# Building And Publishing AR Project

After completing the project development, you can build and publish the AR application by clicking on **Menu -> Project -> Build**.

## ARCore、AREngine

To publish an AR application for Android and Huawei platforms, create a new build task and select the `Android` platform.

<img src="./ar-proj-pub/select-android-platform.png" alt="select-android-platform" style="zoom:50%;" />

Enter the application ID and check **Enable AR**. Connect your mobile device and click **Build -> Make -> Run** to publish the AR application.

<img src="./ar-proj-pub/build-android-platform.png" alt="build-android-platform" style="zoom:50%;" />

> **Note**：The rendering backend for AR applications on the Android platform does not support VULKAN.

## ARKit

For iOS publishing, please refer to the [Build Options - iOS](../../editor/publish/ios/build-options-ios.md). Make sure to configure your developer account in Xcode.

To publish an AR application for the iOS platform, create a new build task and select the `iOS` platform.

<img src="./ar-proj-pub/select-ios-platform.png" alt="select-ios-platform" style="zoom:50%;" />

For the Application Bundle name, it is recommended to use the same name as the developer account configured in Xcode. Select iPhone OS Application as the target platform and check **Enable AR**.

Click **Build** to generate the Xcode project.

<img src="./ar-proj-pub/build-ios-platform.png" alt="build-ios-platform" style="zoom:50%;" />

> **Note**: Currently, Cocos Creator only supports building the iOS project. Compilation and running need to be done in Xcode.

After the build is complete, locate the generated `xcodeproj` file and open it with Xcode. Configure the signing and developer team, connect the device, and click Run to run the application.

<img src="./ar-proj-pub/open-ios-build-folder.png" alt="open-ios-build-folder" style="zoom:50%;" />

<img src="./ar-proj-pub/select-xcodeproj.png" alt="select-xcodeproj" style="zoom:50%;" />

![compile-with-xcode](ar-proj-pub/compile-with-xcode.png)

## Spaces

To publish an AR application for Qualcomm Spaces devices, create a new build task and select the `XR Spaces` platform.

![select-spaces-platform](ar-proj-pub/select-spaces-platform.png)

Enter the application ID, connect the Spaces device (or mobile device for standalone devices), and click **Build -> Make -> Run** to publish the AR application.
