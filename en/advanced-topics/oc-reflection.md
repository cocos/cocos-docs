# How to call Objective-C functions using JavaScript on iOS/Mac

In Cocos2d-JS v3.0 RC2, we'd like to introduce you the js to Objective-C reflection feature. Like we can call native functions on Java by JS, you can now invoke Objective-C Static Method in JS too.

```js
var ojb = jsb.reflection.callStaticMethod(className, methodName, arg1, arg2, .....);
```

You can use `jsb.reflection.callStaticMethod` to call Native OC method by sending `className` `methodName` and `parameters`.

**Note**: Please pay attention to Apple Developer Program License Agreement (section 3.3.2) when you use reflection features. The usage of `respondsToSelector:` and `performSelector:` might cause problem in App Store review process, here is a related discussion in [React-Native's issue tracker](https://github.com/facebook/react-native/issues/12778).

## Objective-C Class

- You will need to provide your functionality in an OC class as the example below, the `className` parameter in this case should be `NativeOcClass`.

```
import <Foundation/Foundation.h>
@interface NativeOcClass : NSObject
+(BOOL)callNativeUIWithTitle:(NSString *)title andContent:(NSString *)content;
@end
```

## Objective-C Method

- The reflection from js to OC support only static method of an OC class.

- **methodName** parameter in previous example is the OC method name in your class, take `NativeOcClass` as an example, we can see a method named

  ```
  +(BOOL)callNativeUIWithTitle:(NSString *)title andContent:(NSString *)content;
  ```

  So the **methodName** should be `callNativeUIWithTitle:addContent:` which is the definition for this method, and don't forget the **:**. We cannot discuss the details here, but if you are interested, you can search for Objective-C programming guide for more details.

- Another example below, the **methodName** should be `callNativeWithReturnString`.

  ```
  +(NSString *)callNativeWithReturnString;
  ```

## Usage

- In JS code, for invoking the native method `callNativeUIWithTitle:andContent:` of `NativeOcClass`, we can use `jsb.reflection.callStaticMethod` API like this:

  ```js
  var ret = jsb.reflection.callStaticMethod("NativeOcClass",
                                           "callNativeUIWithTitle:andContent:",
                                           "cocos2d-js",
                                           "Yes! you call a Native UI from Reflection");
  ```

- This method can show an alert dialog and return a boolean status. Here is its implementation, `title` and `content` parameters will receive the strings you sent from js:

  ```
  +(BOOL)callNativeUIWithTitle:(NSString *) title andContent:(NSString *)content{
    UIAlertView *alertView = [[UIAlertView alloc] initWithTitle:title message:content delegate:self cancelButtonTitle:@"Cancel" otherButtonTitles:@"OK", nil];
    [alertView show];
    return true;
  }
  ```

## Executing JS in Objective-C

Conversely, we can also execute JavaScript code in C++ / Objective-C by using `evalString`.

Example:

```c++
Application::getInstance()->getScheduler()->performFunctionInCocosThread([=](){
    se::ScriptEngine::getInstance()->evalString(script.c_str());
});
``` 

**Note**: Unless it is clear that the current thread is the **main thread**, the function needs to be distributed to the main thread for execution.

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
