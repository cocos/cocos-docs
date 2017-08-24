如何在 iOS 平台上使用 Javascript 直接调用 Objective-C 方法
===

使用 Creator 打包的 iOS / Mac 原生应用中，我们也提供了在 iOS 和 Mac 上 JavaScript 通过原生语言的反射机制直接调用 Objective-C 函数的方法，示例代码如下：

```
var result = jsb.reflection.callStaticMethod(className, methodNmae, arg1, arg2, .....);
```

在 `jsb.reflection.callStaticMethod` 方法中，我们通过传入 OC 的类名，方法名，参数就可以直接调用 OC 的静态方法，并且可以获得 OC 方法的返回值。注意仅仅支持调用可访问类的静态方法。

**警告**：苹果 App Store 在 2017 年 3 月对部分应用发出了警告，原因是使用了一些有风险的方法，其中 `respondsToSelector:` 和 `performSelector:` 是反射机制使用的核心 API，在使用时请谨慎关注苹果官方对此的态度发展，相关讨论：[JSPatch](https://github.com/bang590/JSPatch/issues/746)、[React-Native](https://github.com/facebook/react-native/issues/12778)、[Weex](https://github.com/alibaba/weex/issues/2875)

## 类

- 参数中的类名，只需要传入 OC 中的类名即可，与 Java 不同，类名并不需要路径。比如你在工程底下新建一个类 `NativeOcClass`，只要你将他引入工程，那么他的类名就是 `NativeOcClass`，你并不需要传入它的路径。

```
import <Foundation/Foundation.h>
@interface NativeOcClass : NSObject
+(BOOL)callNativeUIWithTitle:(NSString *) title andContent:(NSString *)content;
@end
```
    
## 方法

- JS 到 OC 的反射仅支持 OC 中类的静态方法。
- 方法名比较要需要注意，我们需要传入完整的方法名，特别是当某个方法带有参数的时候，你需要将他的**:**也带上。根据上面的例子。此时的方法名字是 **callNativeUIWithTitle:andContent:**，不要漏掉了他们之间的 **:** 。
- 如果是没有参数的函数，那么他就不需要 **:**，如下代码，他的方法名是 `callNativeWithReturnString`，由于没有参数，他不需要 **:**，跟 OC 的 method 写法一致。

```
+(NSString *)callNativeWithReturnString;
```

## 使用示例

- 下面的示例代码将调用上面 `NativeOcClass` 的方法，在 JS 层我们只需要这样调用：
 
```
var ret = jsb.reflection.callStaticMethod("NativeOcClass", 
                                           "callNativeUIWithTitle:andContent:",
                                           "cocos2d-js", 
                                           "Yes! you call a Native UI from Reflection");
```

- 这里是这个方法在 OC 的实现，可以看到是弹出一个原生对话框。并把 `title` 和 `content` 设置成你传入的参数，并返回一个 boolean 类型的返回值。

```
+(BOOL)callNativeUIWithTitle:(NSString *) title andContent:(NSString *)content{
    UIAlertView *alertView = [[UIAlertView alloc] initWithTitle:title message:content delegate:self cancelButtonTitle:@"Cancel" otherButtonTitles:@"OK", nil];
    [alertView show];
    return true;
}
```

- 此时，你就可以在 `ret` 中接收到从 OC 传回的返回值（true）了。

## 注意

在 OC 的实现中，如果方法的参数需要使用 float、int、bool 的，请使用如下类型进行转换：

- **float，int 请使用NSNumber类型**
- **bool 请使用 BOOL 类型**
- 例如下面代码，我们传入 2 个浮点数，然后计算他们的合并返回，我们使用 NSNumber 而不是 int、float去作为参数类型。

```
+(float) addTwoNumber:(NSNumber *)num1 and:(NSNumber *)num2{
    float result = [num1 floatValue]+[num2 floatValue];
    return result;
}
```

- 目前参数和返回值支持 **int, float, bool, string**，其余的类型暂时不支持。