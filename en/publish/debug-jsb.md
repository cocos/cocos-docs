# Debug JavaScript on Native Platform

After the game is released to the native platform, because the operating environment is different, may appear in the browser preview can not reproduce the Bug, then we must directly in the original platform for debugging. However, traditional debugging methods can only be debugged to the C + + section and cannot debug JavaScript code. Cocos Creator introduced JSB 2.0 from v1.7, which makes it easy to remotely debug JavaScript in the native platform. If the Creator version is v1.6 below, please refer to [Native Platform Debugging](../publish/debug-native.md).

## Debug Simulator

In general, most of the problems of the original platform can be reproduced in the simulator, we can first test in the simulator, there are problems directly in the simulator debugging. There are two ways to debug the simulator.

### Method One

First choose to use the **simulator (debug)** as the preview platform on the top of the editor toolbar, and then click the **Run Preview** button in the editor to run the game in the simulator.

![](debug-jsb/simulator-run.png)

After running the simulator, open the address directly with the Chrome browser: `chrome-devtools://devtools/bundled/inspector.html?v8only=true&ws=127.0.0.1:5086/ 00010002-0003-4004-8005-000600070008` can be debugged:

![](debug-jsb/v8-win32-debug.png)

### Method Two

Starting with **v2.0.7**, the [Open Simulator Debugger Panel](../getting-started/basics/editor-panels/preferences.md#preview-run) feature has been added to the **Preview Run** of **Settings** panel. The debugging steps are as follows:

  - Check the **Open Simulator Debugger Panel** in the **Setting -> Preview Run** panel, then click **Save**.
  - Running the simulator, then you can automatically open simulator debugger panel for debugging when start simulator.

## Debug on target device

If the game only run on the real machine, or the simulator can not reproduce the problem, it must be the real machine to the packaged game to debug. Debugging steps are as follows:

- Make sure that the Android/iOS device is on the same LAN as Windows or Mac.
- Select the Android/iOS platform and Debug mode in the **Build** panel of Creator to build a compile-and-run project (The iOS platform recommends compiling with the Xcode connection true machine).
- Open address with Chrome browser: `chrome-devtools://devtools/bundled/inspector.html?v8only=true&ws={ip}:6086/ 00010002-0003-4004-8005-000600070008`, where `{IP}` is the local IP of the Android/iOS device, then you can debug it.

![](debug-jsb/v8-android-debug.png)

## Other Platform Debugging

If you need to debug in release mode, or the need to publish to the Windows or Mac platform debugging, or you need to debug a custom native engine, refer to the more detailed [JSB 2.0 Use Guide: Remote Debugging and Profile](../advanced-topics/jsb/JSB2.0-learning.md#remote-debugging-and-profile).
