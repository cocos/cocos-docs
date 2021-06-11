# How to call Objective-C functions using JavaScript on iOS/Mac

With native iOS or Mac applications packaged with Cocos Creator, JavaScript calling Objective-C functions directly through the native language's reflection mechanism can be achieved with the following sample code:

```js
var ojb = jsb.reflection.callStaticMethod(className, methodName, arg1, arg2, .....);
```

Use `jsb.reflection.callStaticMethod` to call Native Objective-C method by sending `className`, `methodName` and `parameters`.

> **Note**: pay attention to Apple Developer Program License Agreement (section 3.3.2) when using reflection features. The usage of `respondsToSelector:` and `performSelector:` might cause problem in App Store review process, review this related discussion in [React-Native's issue tracker](https://github.com/facebook/react-native/issues/12778).

## Objective-C Classes

- It is necessary to provide functionality in an Objective-C class as per the example below. The `className` parameter in this case should be `NativeOcClass`.

  ```objc
  import <Foundation/Foundation.h>
  @interface NativeOcClass : NSObject
  +(BOOL)callNativeUIWithTitle:(NSString *)title andContent:(NSString *)content;
  @end
  ```

## Objective-C Methods

- Reflection from JavaScript to Objective-C supports only static methods of an Objective-C class.

- **methodName** parameter in the previous example are the Objective-C method names in your class, take `NativeOcClass` as an example, notice the method:

  ```objc
  +(BOOL)callNativeUIWithTitle:(NSString *)title andContent:(NSString *)content;
  ```

  The **methodName** should be `callNativeUIWithTitle:addContent:` which is the definition for this method, and don't forget the **:**. Search for an Objective-C programming guide for more details.

- Another example below, the **methodName** should be `callNativeWithReturnString`.

  ```objc
  +(NSString *)callNativeWithReturnString;
  ```

## Usage

- In JavaScript code, for invoking the native method `callNativeUIWithTitle:andContent:` of `NativeOcClass`, use the `jsb.reflection.callStaticMethod` API. Example:

  ```js
  var ret = jsb.reflection.callStaticMethod("NativeOcClass",
                                           "callNativeUIWithTitle:andContent:",
                                           "cocos2d-js",
                                           "Yes! you call a Native UI from Reflection");
  ```

- This method can show an alert dialog and return a boolean status. Here is its implementation, `title` and `content` parameters will receive the strings sent from JavaScript:

  ```objc
  +(BOOL)callNativeUIWithTitle:(NSString *) title andContent:(NSString *)content{
    UIAlertView *alertView = [[UIAlertView alloc] initWithTitle:title message:content delegate:self cancelButtonTitle:@"Cancel" otherButtonTitles:@"OK", nil];
    [alertView show];
    return true;
  }
  ```

## Executing JavaScript in Objective-C

Conversely, JavaScript code can be executed in C++/Objective-C by using `evalString`.

Example:

```c++
Application::getInstance()->getScheduler()->performFunctionInCocosThread([=](){
    se::ScriptEngine::getInstance()->evalString(script.c_str());
});
```

> **Note**: unless it is clear that the current thread is the **main thread**, the function needs to be distributed to the main thread for execution.

## Type Support

Types supported for parameters and return value are limited in Cocos2d-JS reflection.

- To use **float, int, double** as parameter types in your native method, change to use `NSNumber` instead.
- To use **bool** as parameter type, change to use `BOOL` instead.
- Here is an example using `NSNumber` instead of `int`, `float` or `double`.

  ```objc
  +(float) addTwoNumber:(NSNumber *)num1 and:(NSNumber *)num2 {
    float result = [num1 floatValue] + [num2 floatValue];
    return result;
  }
  ```

- For return values only **int, float, bool, string** are supported in the current version.
