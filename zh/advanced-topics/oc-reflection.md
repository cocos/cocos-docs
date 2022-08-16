# 如何在 iOS 平台上使用 Javascript 直接调用 Objective-C 方法

> **注意**：在 v3.6 之后，jsb 模块将会逐步废弃，接口将会迁移到 cc 命名空间下的 native 模块。

使用 Cocos Creator 打包的 iOS 或者 Mac 原生应用中，我们也提供了 JavaScript 通过原生语言的反射机制直接调用 Objective-C 函数的方法，示例代码如下：

```js
var result = native.reflection.callStaticMethod(className, methodName, arg1, arg2, .....);
```

在 `native.reflection.callStaticMethod` 方法中，我们通过传入 Objective-C 的类名、方法名、参数就可以直接调用 Objective-C 的静态方法，并且可以获得 Objective-C 方法的返回值。注意仅仅支持调用可访问类的静态方法。

**警告**：苹果 App Store 在 2017 年 3 月对部分应用发出了警告，原因是使用了一些有风险的方法，其中 `respondsToSelector:` 和 `performSelector:` 是反射机制使用的核心 API，在使用时请谨慎关注苹果官方对此的态度发展，相关讨论：[JSPatch](https://github.com/bang590/JSPatch/issues/746)、[React-Native](https://github.com/facebook/react-native/issues/12778)、[Weex](https://github.com/alibaba/weex/issues/2875)。

## 类

参数中的类名，只需要传入 Objective-C 中的类名即可，与 Java 不同，类名并不需要路径。比如你在工程底下新建一个类 `NativeOcClass`，只要你将它引入工程，那么它的类名就是 `NativeOcClass`，你并不需要传入它的路径。

```objc
import <Foundation/Foundation.h>
@interface NativeOcClass : NSObject
+(BOOL)callNativeUIWithTitle:(NSString *) title andContent:(NSString *)content;
@end
```

## 方法

- JavaScript 到 Objective-C 的反射仅支持 Objective-C 中类的静态方法。
- 方法名比较需要注意。我们需要传入完整的方法名，特别是当某个方法带有参数的时候，需要将它的 **:** 也带上。根据下面的例子，此时的方法名是 `callNativeUIWithTitle:andContent:`，不要漏掉了中间的 **:**。

  ```objc
  +(BOOL)callNativeUIWithTitle:(NSString *)title andContent:(NSString *)content;
  ```

- 如果是没有参数的函数，那么就不需要 **:**。如下面代码中的方法名是 `callNativeWithReturnString`，由于没有参数，就不需要 **:**，跟 Objective-C 的 method 写法一致。

  ```objc
  +(NSString *)callNativeWithReturnString;
  ```

## 使用示例

下面的示例代码将调用上面 `NativeOcClass` 的方法，在 JavaScript 层我们只需要这样调用：

```js
var ret = native.reflection.callStaticMethod("NativeOcClass",
                                          "callNativeUIWithTitle:andContent:",
                                          "cocos2d-js",
                                          "Yes! you call a Native UI from Reflection");
```

这里是这个方法在 Objective-C 的实现，可以看到是弹出了一个原生对话框。并把 `title` 和 `content` 设置成你传入的参数，并返回一个 boolean 类型的返回值。

```objc
+(BOOL)callNativeUIWithTitle:(NSString *) title andContent:(NSString *)content{
  UIAlertView *alertView = [[UIAlertView alloc] initWithTitle:title message:content delegate:self cancelButtonTitle:@"Cancel" otherButtonTitles:@"OK", nil];
  [alertView show];
  return true;
}
```

此时，你就可以在 `ret` 中接收到从 Objective-C 传回的返回值（true）了。

## Objective-C 执行 JavaScript 代码

反过来，我们也可以通过 `evalString` 在 C++ 或者 Objective-C 中执行 JavaScript 代码。

比如：

```c++
Application::getInstance()->getScheduler()->performFunctionInCocosThread([=](){
    se::ScriptEngine::getInstance()->evalString(script.c_str());
});
```

> **注意**：除非明确当前线程是 **主线程**，否则都需要将函数分发到主线程执行。

## 注意

在 Objective-C 的实现中，如果方法的参数需要使用 float、int 和 bool 的，请使用如下类型进行转换：

- **float、int 请使用 NSNumber 类型**
- **bool 请使用 BOOL 类型**
- 例如下面代码，传入两个浮点数，然后计算它们的合并返回，我们使用 NSNumber 作为参数类型，而不是 int 和 float。

  ```objc
  +(float) addTwoNumber:(NSNumber *)num1 and:(NSNumber *)num2{
      float result = [num1 floatValue]+[num2 floatValue];
      return result;
  }
  ```

- 目前参数和返回值支持 `int`、`float`、`bool` 和 `string`，其余的类型暂时不支持。
