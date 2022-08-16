# v3.5 Built project upgrade Guide

Since v3.5, the 'appdelegate' of MAC and windows platforms has been moved into the internal implementation of the engine, and can be compatible with the usage of previous versions by overloading 'appdelegate' `game.cpp` has also been adjusted, and existing projects need to be rebuilt and upgraded.

## Engineering Upgrade

Check whether the native/engine directory exists in the project directory. If it exists, you need to delete the folder and make a backup before deleting it (if this directory exists, it will not be updated automatically when you rebuild); if it does not exist, you can build it directly.

### Custom code migration methods

The code previously added in AppDelegate can be upgraded by customizing the platform and AppDelegate below; the custom game.cpp can be upgraded by replacing the interface.

#### Platform and AppDelegate customization methods

Take **Mac** as an example:

1. Custom AppDelegate(Reference file name: MyAppdelegate.h, MyAppdelegate.mm)

```
@interface MyAppDelegate : NSObject<AppDelegate>
    // Define the methods that need to be rewritten
    - (void)applicationWillResignActive:(UIApplication *)application;
@end

@implementation MyAppDelegate
- (void)applicationWillResignActive:(UIApplication *)application {
    // Note: Calling methods of the parent class
    [super applicationWillResignActive:application]
}
@end
```

2. Customized platforms(Reference file name: CustomMacPlatform.h)

```
#include "platform/BasePlatform.h"
#include "MyAppDelegate.h"

class CustomMacPlatform : public MacPlatform {
public:
   // Rewrite the initialization method of the platform
   int32_t init() override {
       // Calling the methods of the parent class
       return MacPlatform::init();
   }
   // Here you enter the message loop of oc until the program exits
   int32_t run(int argc, const char** argv) {
        id delegate = [[MyAppDelegate alloc] init];
        NSApplication.sharedApplication.delegate = delegate;
        return NSApplicationMain(argc, argv);
   }
}
```

3. Loading custom platforms(Reference file name: main.mm)

```
#include "CustomMacPlatform.h"

int main(int argc, const char * argv[]) {
    CustomMacPlatform platform; 
    if (platform.init()) {
        return -1;
    }
    return platform.run(argc, (const char**)argv); 
}
```

#### game.cpp Migration mode

- Set js encryption secret key: jsb_set_xxtea_key  -> Set `_xxteaKey` member variable; ; or call `setXXTeaKey`
- Setup debugging: jsb_enable_debugger     -> Change the value of `_debuggerInfo`, or call `setDebugIpAndPort`
- Setting exception callbacks: setExceptionCallback  -> Override the `handleException` interface
- Run custom scripts: jsb_run_script      -> call `runScript`
- You can add events to be listened to by using `engine`, -> `getEngine()->addEventCallback(WINDOW_OSEVENT, eventCb);`
- Customized games `CustomGame`, Need to register to engine  `CC_REGISTER_APPLICATION(CustomGame)` for loading
- `game` Inherited from `cc::BaseGame`, and `cc::BaseGame` inherits from `CocosApplication`,so that partial implementations can be rewritten to add custom logic.

### The modification of Native Files

- Replace the header file path: #include "cocos/platform/Application.h" —> #include "application/ApplicationManager.h"
- Change of usage: cc::Application::getInstance()->getScheduler() -> CC_CURRENT_ENGINE()->getScheduler()
- If the code uses custom jsb: `native_ptr_to_seval` changed to `nativevalue_to_se`

### Android

#### JAVA

- Delete `onCreate` in the following files: game/AppActivity.java, game/InstantActivity.java

    ```java
    // Workaround in https://stackoverflow.com/questions/16283079/re-launch-of-activity-on-home-button-but-only-the-first-time/16447508
    if (!isTaskRoot()) {
        // Android launched another instance of the root activity into an existing task
        //  so just quietly finish and go away, dropping the user back into the activity
        //  at the top of the stack (ie: the last state of this task)
        // Don't need to finish it again since it's finished in super.onCreate .
        return;
    }
    ```

- app/AndroidManifest.xml
    - delete code in the `application` tag: `android:taskAffinity=""`
    - add code in the `application` tag: `android:exported="true"`

- app/build.gradle
    - modify code:

    ```html
    "${RES_PATH}/assets" -> "${RES_PATH}/data"
    ```

#### CMakeLists.txt

- android/CMakeLists.txt
    - LIB_NAME changed to CC_LIB_NAME
    - PROJ_SOURCES changed to CC_PROJ_SOURCES
    - add code: set(CC_PROJECT_DIR ${CMAKE_CURRENT_LIST_DIR})
    - add code: set(CC_COMMON_SOURCES)
    - add code: set(CC_ALL_SOURCES)
    - delete code:

        ```cmake
        ${CMAKE_CURRENT_LIST_DIR}/../common/Classes/Game.h
        ${CMAKE_CURRENT_LIST_DIR}/../common/Classes/Game.cpp

        add_library(${LIB_NAME} SHARED ${PROJ_SOURCES})
        target_link_libraries(${LIB_NAME}
            "-Wl,--whole-archive" cocos2d_jni "-Wl,--no-whole-archive"
            cocos2d
        )
        target_include_directories(${LIB_NAME} PRIVATE
            ${CMAKE_CURRENT_LIST_DIR}/../common/Classes
        )
        ```

    - add code:

        ```cmake
        cc_android_before_target(${CC_LIB_NAME})
        add_library(${CC_LIB_NAME} SHARED ${CC_ALL_SOURCES})
        # Add user dependent library AAA here. target_link_libraries(${CC_LIB_NAME} AAA)
        # Add user defined file xxx/include here. target_include_directories(${CC_LIB_NAME} PRIVATE ${CMAKE_CURRENT_LIST_DIR}/../common/Classes/xxx/include)
        cc_android_after_target(${CC_LIB_NAME})
        ```

- common/CMakeLists.txt
    - cocos2d-x-lite/ changed to engine/native/
    - Add code at the end of the file

        ```cmake
        list(APPEND CC_COMMON_SOURCES
            ${CMAKE_CURRENT_LIST_DIR}/Classes/Game.h
            ${CMAKE_CURRENT_LIST_DIR}/Classes/Game.cpp
        )
        ```
