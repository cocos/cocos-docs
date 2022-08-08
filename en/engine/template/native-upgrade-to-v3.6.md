# v3.5 Built Project Upgrade Guide to v3.6

This article details the considerations for upgrading Cocos Creator native builds from 3.5.0 ~ 3.5.x to 3.6. The changes are only for the native directory under the project.

## Build

Open the old version of the project with the new version of the engine, and then build the target platform after the upgrade is completed. To avoid upgrade failure, please backup the project first, and then follow the steps below to upgrade.

## Android

### File modification

- Delete file: jni/main.cpp
- android/CMakeLists.txt: delete `${CMAKE_CURRENT_LIST_DIR}/jni/main.cpp`

### Compile changes

To reduce the package size, the default value of `CMAKE_C_FLAGS_RELEASE` and `CMAKE_CXX_FLAGS_RELEASE` compiler parameter `visibility` has been changed from `default` to `hidden`. For this change, if the interface is not found in the release version of `jni`, please check if the interface has the declaration `JNIEXPORT` added. For example.

- Old Code

    ```c++
    void Java_com_google_android_games_paddleboat_GameControllerManager_onMouseConnected
    ```

- Modified

    ````c++
    JNIEXPORT void JNICALL Java_com_google_android_games_paddleboat_GameControllerManager_onMouseConnected
    ````

## Code modification

- Projects with custom jsb interfaces: code related to `NonRefNativePtrCreatedByCtorMap` must be removed

## Scripting Considerations

Since the implementation of Native engines differs slightly from that of non-Native engines, developers must be aware of these differences, which are organized as follows.

- `Readonly`: On Native platforms, properties are fetched as newly created objects in order to reduce memory usage.

    The description of `Readonly` can be found in [Development Notes - ReaOnly](../../scripting/readonly.md#readonly)
