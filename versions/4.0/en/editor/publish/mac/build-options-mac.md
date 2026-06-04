# Build Options - macOS

![build-options-mac](./images/build-options-mac.png)

## Executable Name

This a field used to specify the name of the main executable file of an application, which is stored in the app's Info.plist file. If not provided, the system will generate a default value based on the app name field. The value for this field must adhere to a specific format, containing only numbers, letters, underscores (_) and hyphens (-).

## Bundle Identifier

The package name, usually in reverse order of the product website URL, such as `com.mycompany.myproduct`.

> **Note**: The package name can only contain numbers (0-9), letters (A-Z, a-z), hyphens (-), and dots (.), and the last part of the package name must start with a letter and cannot start with an underscore or a number. For more details, please refer to [Bundle Identifier](https://developer.apple.com/documentation/bundleresources/information_property_list/cfbundleidentifier).

## Target Version

This option is primarily used to specify the target system version when publishing for the Mac platform, with a default value of 10.14. The version number after the build will be recorded in the `TARGET_OSX_VERSION` field of the `build/mac/proj/cfg.cmake` file in the project directory.

## Support Apple Silicon

This option is used to provide better prompts for known engine module support issues on Apple M1 (Silicon) architecture devices.

## Skip the update of Xcode project

By default, each build will execute the CMake command to generate an Xcode project. However, if modifications or configurations are made to the generated Xcode project, such as integrating an SDK with CocoaPods, this could cause issues, as these modifications will be reverted in the next build.

However, if this option is checked, subsequent builds will no longer update or overwrite the configuration of the Xcode project.

It should be noted that other changes related to CMake, such as adding C++ source code, will no longer trigger the regeneration of the Xcode project. 

### Render Backend

The Render Backend currently supports **METAL**. For more details, refer to the official documentation on [Metal](https://developer.apple.com/cn/metal/).
