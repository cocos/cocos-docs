### V3.5的新特性
Mac平台，windows平台的AppDelegate已移入引擎内部实现，可以通过重载AppDelegate的方式来兼容以前的用法；

#### 平台定制，AppDelegate定制方法：
以**Mac**为例：
1、MyAppdelegate.h
```
@interface MyAppDelegate : NSObject<AppDelegate>
    // 重载一些方法，也可以不继承AppDelegate，但是不建议这样做
@end

```

2、自定义平台，文件CustomPlatform.h
```
#include "platform/BasePlatform.h"

class CustomPlatform : public MacPlatform {
public:
   // 重载平台初始化方法
   int32_t init() override {
       // 需要主动调用下
       return MacPlatform::init();
   }
   // 这里会死循环处理
   int32_t run(int argc, const char** argv) {
        id delegate = [[MyAppDelegate alloc] init];
        NSApplication.sharedApplication.delegate = delegate;
        return NSApplicationMain(argc, argv);
   }
}
```

3、main.mm：
```
#include "CustomPlatform.h"

int main(int argc, const char * argv[]) {
    CustomPlatform platform; 
    if (platform.init()) {
        return -1;
    }
    return platform.run(argc, (const char**)argv); 
}
```

#### game.cpp迁移方法
- 设置js加密秘钥：jsb_set_xxtea_key  -> 设置 _xxteaKey = ""; 或 调用setXXTeaKey
- 设置调试： jsb_enable_debugger     -> 设置_debuggerInfo结构, 或者 setDebugIpAndPort
- 设置异常回调：setExceptionCallback  -> 重载 handleException接口 
- 运行自定义脚本：jsb_run_script      -> runScript
- 可以通过使用engine来添加需要监听的事件, -> getEngine()->addEventCallback(WINDOW_OSEVENT, eventCb);
- 自定义的游戏CustomGame，需要注册至引擎CC_REGISTER_APPLICATION(CustomGame)


game继承cc::BaseGame是继承CocosApplication，可以重写部分实现改变部分逻辑；



