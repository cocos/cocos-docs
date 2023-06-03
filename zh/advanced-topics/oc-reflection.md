# 基于反射机制实现 JavaScript 与 iOS/macOS 系统原生通信

## JavaScript 调用 Objective-C 代码

在 Cocos Creator 中提供了依靠语言反射机制的跨语言通信方式，使 JavaScript 可以直接调用 Objective-C 函数的方法。 方法原型示例如下：

```js
var result = native.reflection.callStaticMethod(className, methodName, arg1, arg2, .....);
```

在 `native.reflection.callStaticMethod` 方法中，我们通过传入 Objective-C 的类名、方法名、参数就可以直接调用 Objective-C 的静态方法，并且可以获得 Objective-C 方法的返回值。

>**注意**：仅支持调用可访问类的静态方法。

**警告**：苹果 App Store 在 2017 年 3 月对部分应用发出了警告，原因是使用了一些有风险的方法，其中 `respondsToSelector:` 和 `performSelector:` 是反射机制使用的核心 API，在使用时请谨慎关注苹果官方对此的态度发展，相关讨论：[JSPatch](https://github.com/bang590/JSPatch/issues/746)、[React-Native](https://github.com/facebook/react-native/issues/12778)、[Weex](https://github.com/alibaba/weex/issues/2875)。

为了降低提审不通过的风险，建议 [使用 JsbBridge 实现 JavaScript 与 Objective-C 通信](oc-reflection.md)。

### 类名与静态方法

参数中的类名不需要路径，只需要传入 Objective-C 中的类名即可。比如你在工程目录下的任意文件中新建一个类 `NativeOcClass`，只要你将它引入工程即可。

再次强调一下，JavaScript 到 Objective-C 的反射仅支持 Objective-C 中类的静态方法。

### 带参方法

方法名比较需要注意。我们需要传入完整的方法名，特别是当某个方法带有参数的时候，需要将它的 **:** 也带上。

有参方法定义示例：

```objc
import <Foundation/Foundation.h>
@interface NativeOcClass : NSObject
+(BOOL)callNativeUIWithTitle:(NSString *) title andContent:(NSString *)content;
@end
```

有参方法调用示例：

```js
var ret = native.reflection.callStaticMethod("NativeOcClass",
                                          "callNativeUIWithTitle:andContent:",
                                          "cocos2d-js",
                                          "Yes! you call a Native UI from Reflection");
```

>**注意**：此时的方法名是 `callNativeUIWithTitle:andContent:`，不要漏掉了冒号 **:** 。

### 无参方法

如果是没有参数的函数，那么就不需要 **:**。如下面代码中的方法名是 `callNativeWithReturnString`，由于没有参数，就不需要 **:**，跟 Objective-C 的 method 写法一致。

无参方法定义示例：

```objc
+(NSString *)callNativeWithReturnString;
```

无参方法调用示例：

```js
var ret = native.reflection.callStaticMethod("NativeOcClass",
                                          "callNativeWithReturnString");
```

### 返回值

这里是这个方法在 Objective-C 的实现，可以看到是弹出了一个原生对话框。并把 `title` 和 `content` 设置成你传入的参数，并返回一个 boolean 类型的返回值。

```objc
+(BOOL)callNativeUIWithTitle:(NSString *) title andContent:(NSString *)content{
  UIAlertView *alertView = [[UIAlertView alloc] initWithTitle:title message:content delegate:self cancelButtonTitle:@"Cancel" otherButtonTitles:@"OK", nil];
  [alertView show];
  return true;
}
```

此时，你就可以在 `ret` 中接收到从 Objective-C 传回的返回值（true）了。

### 参数类型转换

在 Objective-C 的实现中，如果方法的参数需要使用 float、int 和 bool 的，请使用如下类型进行转换：

- **float、int 请使用 NSNumber 类型**
- **bool 请使用 BOOL 类型**

例如下面代码，传入两个浮点数，然后计算它们的合并返回，我们使用 NSNumber 作为参数类型，而不是 int 和 float。

  ```objc
  +(float) addTwoNumber:(NSNumber *)num1 and:(NSNumber *)num2{
      float result = [num1 floatValue]+[num2 floatValue];
      return result;
  }
  ```

目前参数和返回值支持以下类型：

- `int`
- `float`
- `bool`
- `string`

其余的类型暂时不支持。

如果对如何在项目中新增 `Objective-C` 文件不熟悉，可参考 [原生平台二次开发指南](native-secondary-development.md)。

## Objective-C 执行 JavaScript 代码

在 Cocos Creator 项目中，我们也可以通过 `evalString` 方法，在 C++ 或者 Objective-C 中执行 JavaScript 代码。

调用示例如下：

```c++
CC_CURRENT_ENGINE()->getScheduler()->performFunctionInCocosThread([=](){
    se::ScriptEngine::getInstance()->evalString(script.c_str());
});
```

> **注意**：除非确定当前线程是 **主线程**，否则都需要使用 `performFunctionInCocosThread` 方法将函数分发到主线程中去执行。

### 调用全局函数

我们可以在脚本中通过如下代码新增一个全局函数：

```js
window.callByNative = function(){
  //to do
}
```

> `window` 是 Cocos 引擎脚本环境中的全局对象，如果要让一个变量、函数、对象或者类全局可见，需要将它作为 `window` 的属性。 可以使用 `window.变量名` 或者  `变量名` 进行访问。

然后像下面这样调用:

```c++
CC_CURRENT_ENGINE()->getScheduler()->performFunctionInCocosThread([=](){
    se::ScriptEngine::getInstance()->evalString("window.callByNative()");
});
```

或者：

```c++
CC_CURRENT_ENGINE()->getScheduler()->performFunctionInCocosThread([=](){
    se::ScriptEngine::getInstance()->evalString("callByNative()");
});
```

### 调用对象的静态函数

假如在 TypeScript 脚本中有一个对象具有如下静态函数：

```ts
export class NativeAPI{
  public static somethingDone(){
    //to do
  }
}
//将 NativeAPI 注册为全局类，否则无法在 OC 中被调用
window.NativeAPI = NativeAPI;
```

我们可以像这样调用：

```c++
CC_CURRENT_ENGINE()->getScheduler()->performFunctionInCocosThread([=](){
    se::ScriptEngine::getInstance()->evalString("NativeAPI.somethingDone()");
});
```

### 调用单例函数

如果脚本代码中，有实现可以全局访问的单例对象

```ts
export class NativeAPIMgr{
  private static _inst:NativeAPIMgr;
  
  public static get inst():NativeAPIMgr{
    if(!this._inst){
      this._inst = new NativeAPIMgr();
    }
    return this._inst;
  }

  public static somethingDone(){
    //to do
  }
}

//将 NativeAPIMgr 注册为全局类，否则无法在 OC 中被调用
window.NativeAPIMgr = NativeAPIMgr;
```

我们可以像下面这样调用：

```c++
CC_CURRENT_ENGINE()->getScheduler()->performFunctionInCocosThread([=](){
    se::ScriptEngine::getInstance()->evalString("NativeAPIMgr.inst.somethingDone()");
});
```

### 参数传递

以上几种OC调用JS的方式，均支持参数传递，但参数只支持 string, number 和 bool 三种基础类型。

我们以全局函数为例：

```js
window.callByNative = function(a:string, b:number, c:bool){
  //to do
}
```

可像这样调用：

```c++
CC_CURRENT_ENGINE()->getScheduler()->performFunctionInCocosThread([=](){
    se::ScriptEngine::getInstance()->evalString("window.callByNative('test',1,true)");
});
```

## 线程安全

可以看到，上面的代码中，使用了 `CC_CURRENT_ENGINE()->getScheduler()->performFunctionInCocosThread`。这是为了代码在执行时处于正确的线程，详情请参考：[线程安全](./thread-safety.md)。
