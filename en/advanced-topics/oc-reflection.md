# How to call Objective-C functions using JavaScript on iOS/Mac

> This document is based on v2.x. It may change slightly on Cocos Creator 3.0 and will be updated as soon as possible.

In native iOS or Mac applications packaged with Cocos Creator, we also provide a way for JavaScript to call Objective-C functions directly through the native language's reflection mechanism, with the following sample code:

```js
var ojb = jsb.reflection.callStaticMethod(className, methodName, arg1, arg2, .....);
```

You can use `jsb.reflection.callStaticMethod` to call Native Objective-C method by sending `className`, `methodName` and `parameters`.

> **Note**: please pay attention to Apple Developer Program License Agreement (section 3.3.2) when you use reflection features. The usage of `respondsToSelector:` and `performSelector:` might cause problem in App Store review process, here is a related discussion in [React-Native's issue tracker](https://github.com/facebook/react-native/issues/12778).

## Objective-C Class

- You will need to provide your functionality in an Objective-C class as the example below, the `className` parameter in this case should be `NativeOcClass`.

```
import <Foundation/Foundation.h>
@interface NativeOcClass : NSObject
+(BOOL)callNativeUIWithTitle:(NSString *)title andContent:(NSString *)content;
@end
```

## Objective-C Method

- The reflection from JavaScript to Objective-C support only static method of an Objective-C class.

- **methodName** parameter in previous example is the Objective-C method name in your class, take `NativeOcClass` as an example, we can see a method named

  ```
  +(BOOL)callNativeUIWithTitle:(NSString *)title andContent:(NSString *)content;
  ```

  So the **methodName** should be `callNativeUIWithTitle:addContent:` which is the definition for this method, and don't forget the **:**. We cannot discuss the details here, but if you are interested, you can search for Objective-C programming guide for more details.

- Another example below, the **methodName** should be `callNativeWithReturnString`.

  ```
  +(NSString *)callNativeWithReturnString;
  ```

## Usage

- In JavaScript code, for invoking the native method `callNativeUIWithTitle:andContent:` of `NativeOcClass`, we can use `jsb.reflection.callStaticMethod` API like this:

  ```js
  var ret = jsb.reflection.callStaticMethod("NativeOcClass",
                                           "callNativeUIWithTitle:andContent:",
                                           "cocos2d-js",
                                           "Yes! you call a Native UI from Reflection");
  ```

- This method can show an alert dialog and return a boolean status. Here is its implementation, `title` and `content` parameters will receive the strings you sent from JavaScript:

  ```
  +(BOOL)callNativeUIWithTitle:(NSString *) title andContent:(NSString *)content{
    UIAlertView *alertView = [[UIAlertView alloc] initWithTitle:title message:content delegate:self cancelButtonTitle:@"Cancel" otherButtonTitles:@"OK", nil];
    [alertView show];
    return true;
  }
  ```

## Executing JavaScript in Objective-C

Conversely, we can also execute JavaScript code in C++ / Objective-C by using `evalString`.

Example:

```c++
Application::getInstance()->getScheduler()->performFunctionInCocosThread([=](){
    se::ScriptEngine::getInstance()->evalString(script.c_str());
});
```

> **Note**: unless it is clear that the current thread is the **main thread**, the function needs to be distributed to the main thread for execution.

## Notice

Types supported for parameters and return value are limited in Cocos2d-JS reflection.

- If you need to use **float, int, double** as parameter types in your native method, you need to change to use `NSNumber` instead.
- If you need to use **bool** as parameter type, you need to change to use `BOOL` instead.
- Here is an example, we use `NSNumber` instead of int, float or double.

  ```
  +(float) addTwoNumber:(NSNumber *)num1 and:(NSNumber *)num2 {
    float result = [num1 floatValue] + [num2 floatValue];
    return result;
  }
  ```

- For return value we only support **int, float, bool, string** in the current version.
