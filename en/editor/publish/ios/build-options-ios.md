# Build Options - iOS

![ios-build-options](./images/ios-build-options.png)

## Bundle Identifier

The package name, usually in reverse order of the product website URL, such as `com.mycompany.myproduct`.

> **Note**: The package name can only contain numbers (0-9), letters (A-Z, a-z), hyphens (-), and dots (.), and the last part of the package name must start with a letter and cannot start with an underscore or a number. For more details, please refer to [Bundle Identifier](https://developer.apple.com/documentation/bundleresources/information_property_list/cfbundleidentifier).

## Skip the update of Xcode project

By default, when building the project, the Xcode project is updated using the Xcode project template in `native/ios/`. Some configuration modifications in the project will be reset to the template.

If this option is selected, the Xcode project configuration will not be updated during the build.

This option is useful when using CocoaPods or when you want to persist modifications to the Xcode project. Without selecting this option, the modifications made by `pod install` will be overwritten with each build. With this option selected, you don't have to worry about the modifications being overwritten.

>**Note:** If this option is selected, subsequent changes to the configuration will not update the Xcode project.

## Orientation

The screen orientation currently includes three options: **Portrait**, **Landscape Left**, and **Landscape Right**.

- **Portrait:** The screen is in an upright position with the Home button at the bottom.
- **Landscape Left:** The screen is in a landscape position with the Home button on the left side of the screen.
- **Landscape Right:** The screen is in a landscape position with the Home button on the right side of the screen.

## OS Target

This defines the default launch system, types can be used are as follows:

- iPhone OS: Run on real iOS devices, e.g. an iPhone, and iPad.
- iOS Simulator: Run on the iOS simulator.

These is just the default value and can be modified at any time in Xcode.

## Render Backend

The Render Backend currently supports **METAL**. For more details, refer to the official documentation on [Metal](https://developer.apple.com/cn/metal/).

## Developer Team

This option is used to configure the Apple Developer account used for signing the app when building and compiling the iOS project. If you manually configure this information in Xcode during compilation, the configuration in Xcode takes precedence. When performing a rebuild, the value of this option will override the value configured in Xcode.

## Target iOS Version

This option is used to specify the iOS software version when publishing to the iOS platform, with a default value of 12.0. The version number after the build will be recorded in the `TARGET_IOS_VERSION` field in the `build/ios/proj/cfg.cmake` file.
