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

1. Loading custom platforms(Reference file name: main.mm)

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
