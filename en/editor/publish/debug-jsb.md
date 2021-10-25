# Debugging JavaScript on Native Platforms

After a game is released on the native platform, because the runtime environment is different, there may be some bugs that cannot be reproduced in the browser preview. This means we must debug it directly on the native platform. **Cocos Creator** makes it easy to debug JavaScript remotely in the native platforms.

## Debugging on Android / iOS

If a game can only run on a physical device, then the packaged game must be debugged on a physical device. Debugging steps are as follows:

- Make sure that the Android / iOS device is on the same LAN as Windows or Mac.

- Select the **Android/iOS** platform and **Debug** mode in the **Build** panel to build, compile and run a project (The iOS platform recommends connecting to the physical device via Xcode to compile and run).

- Open address with Chrome browser: `devtools://devtools/bundled/js_app.html?v8only=true&ws=Local IP of the device:6086/00010002-0003-4004-8005-000600070008`.

  ![v8-android-debug](debug-jsb/v8-android-debug.png)

## Debugging on Windows / Mac

The steps for debugging a game on the Windows / Mac platform are similar to the Android / iOS, just compile the project and run it in the IDE.

- Compile and run the packaged project with the IDE (Visual Studio for Windows and Xcode for Mac).

- Open Chrome while the game is running and enter the address: `devtools://devtools/bundled/js_app.html?v8only=true&ws=127.0.0.1:6086/00010002-0003-4004-8005-000600070008` to debug it.

 ![v8-win32-debug](debug-jsb/v8-win32-debug.png)

## Other Platform Debugging

If you need to debug in Release mode, or if you need to debug a custom native engine, please refer to the [JSB 2.0 Use Guide: Remote Debugging and Profile](../../advanced-topics/JSB2.0-learning.md) documentation.
