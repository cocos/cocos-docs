# v3.5 已构建工程升级指南

从 v3.5 开始，Mac 和 Windows 平台的 `AppDelegate` 已移入引擎内部实现，可以通过重载 `AppDelegate` 的方式来兼容之前版本的用法；`game.cpp` 也进行了调整，已有工程需要重新构建进行升级。

## 工程升级

检查工程目录下 native/engine 目录是否存在。如果存在，需要删除文件夹，删除前需要做好备份（这个目录如果存在，重新构建时不会自动更新）；不存在，则直接构建即可。

### 自定义代码迁移方法

之前在 AppDelegate 添加的代码，可以通过下文定制平台和 AppDelegate 进行升级；自定义的 game.cpp 可以通过接口更替即可升级。

#### 平台与 AppDelegate 的定制方法

以 **Mac** 为例：

1、自定义AppDelegate（参考文件名：MyAppdelegate.h，MyAppdelegate.mm）

```
@interface MyAppDelegate : NSObject<AppDelegate>
    // 定义需要重写的方法
    - (void)applicationWillResignActive:(UIApplication *)application;
@end

@implementation MyAppDelegate
- (void)applicationWillResignActive:(UIApplication *)application {
    // 注意：调用父类的方法
    [super applicationWillResignActive:application]
}
@end
```

2、自定义平台（参考文件名：CustomMacPlatform.h）

```
#include "platform/BasePlatform.h"
#include "MyAppDelegate.h"

class CustomMacPlatform : public MacPlatform {
public:
   // 重写平台初始化方法
   int32_t init() override {
       // 调用父类的方法
       return MacPlatform::init();
   }
   // 这里进入 oc 的消息循环，直到程序退出
   int32_t run(int argc, const char** argv) {
        id delegate = [[MyAppDelegate alloc] init];
        NSApplication.sharedApplication.delegate = delegate;
        return NSApplicationMain(argc, argv);
   }
}
```

3、加载自定义平台（参考文件名：main.mm）

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

#### game.cpp 迁移方法

- 设置js加密秘钥：jsb_set_xxtea_key  -> 设置 `_xxteaKey` 成员变量; 或 调用 `setXXTeaKey`
- 设置调试： jsb_enable_debugger     -> 设置 `_debuggerInfo` 结构, 或 调用 `setDebugIpAndPort`
- 设置异常回调：setExceptionCallback  -> 重写 `handleException` 接口
- 运行自定义脚本：jsb_run_script      -> 调用 `runScript`
- 可以通过使用 `engine` 来添加需要监听的事件, -> `getEngine()->addEventCallback(WINDOW_OSEVENT, eventCb);`
- 自定义的游戏 `CustomGame`，需要注册到引擎 `CC_REGISTER_APPLICATION(CustomGame)` 进行加载；
- `game` 继承于 `cc::BaseGame`, 而 `cc::BaseGame` 继承于 `CocosApplication`，因此可以重写部分实现，增加自定义逻辑；
