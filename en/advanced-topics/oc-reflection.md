# Using Java Reflection to Implement JavaScript and iOS/macOS Communication

## Call Objective-C from JavaScript

In Cocos Creator, there is a cross-language communication method based on language reflection, which allows JavaScript to directly call Objective-C functions. The method prototype is as follows:

```js
var result = native.reflection.callStaticMethod(className, methodName, arg1, arg2, .....);
```

In the `native.reflection.callStaticMethod method`, by passing the Objective-C class name, method name, and arguments, you can directly call the Objective-C static method and obtain the return value.

>**Note**: Only static methods of accessible classes can be called

**Note**: In March 2017, Apple App Store issued warnings to some applications that used risky methods. Among them, `respondsToSelector` and `performSelector` are included, which are core APIs used in the reflection mechanism. Please pay attention to Apple's official stance on this issue. Related discussions can be found at: [JSPatch](https://github.com/bang590/JSPatch/issues/746)、[React-Native](https://github.com/facebook/react-native/issues/12778)、[Weex](https://github.com/alibaba/weex/issues/2875)。

To reduce the risk of rejection during app review, it is recommended to [Use JsbBridge to Implement JavaScript and Objective-C Communication](oc-reflection.md)。

### Class Name and Static Methods

The class name in the parameter does not require a path; you only need to pass the class name as it is in Objective-C. For example, if you create a class called `NativeOcClass` in any file in your project directory, you just need to import it into your project.

Once again, it's important to note that it only supports call the static methods of Objective-C classes from JavaScript.

### Method with Parameters

When it comes to method names, pay attention to their exact syntax. You need to provide the complete method name, especially when a method has parameters. The colons `:` in the method name should also be included.

Here's an example of a method with parameters:

```objc
import <Foundation/Foundation.h>
@interface NativeOcClass : NSObject
+(BOOL)callNativeUIWithTitle:(NSString *) title andContent:(NSString *)content;
@end
```

Example of calling a method with parameters:

```js
if(sys.isNative && (sys.os == sys.OS.IOS || sys.os == sys.OS.OSX)){
    var ret = native.reflection.callStaticMethod("NativeOcClass",
                                              "callNativeUIWithTitle:andContent:",
                                              "cocos2d-js",
                                              "Yes! you call a Native UI from Reflection");
}
```

The `sys.isNative` is used to check if it's running on a native platform, and the `sys.os` is used to determine the current operating system. Since the communication mechanisms vary across different platforms, it is recommended to perform the check before call `native.reflection.callStaticMethod`.

>**Note**: The method name should be `callNativeUIWithTitle:andContent:`, don't forget the **:** at the end.

### Method without Parameters

If a method does not have any parameters, then you don't need to include the colons `:`, the `methodName` remains the same as in Objective-C.

Here's an example of a method without parameters:

```objc
+(NSString *)callNativeWithReturnString;
```

Example of calling a method without parameters:

```js
var ret = native.reflection.callStaticMethod("NativeOcClass",
                                          "callNativeWithReturnString");
```

### Return Values

Here's the Objective-C implementation of the method that shows a native dialog. It sets the title and content to the passed parameters and returns a boolean value.

```objc
+(BOOL)callNativeUIWithTitle:(NSString *) title andContent:(NSString *)content{
  UIAlertView *alertView = [[UIAlertView alloc] initWithTitle:title message:content delegate:self cancelButtonTitle:@"Cancel" otherButtonTitles:@"OK", nil];
  [alertView show];
  return true;
}
```

At this point, you can receive the returned value (true) from Objective-C in the variable `ret`.

### Type Conversion

When dealing with float, int, and bool parameters in Objective-C implementation, you should use the following types for conversion:

- **Use NSNumber for float and int**
- **Use BOOL for bool**

For example, in the code snippet below, we pass two float numbers to calculate their sum. We use `NSNumber` as the parameter type instead of int and float.

```objc
+(float) addTwoNumber:(NSNumber *)num1 and:(NSNumber *)num2{
    float result = [num1 floatValue]+[num2 floatValue];
    return result;
}
```

Currently, the parameters and return values support the following types:

- `int`
- `float`
- `bool`
- `string`

Other types are not supported at the moment.

If you're not familiar with how to add Objective-C files to your project, you can refer to the  [Native Platform Development Guide](native-secondary-development.md)。

## Call JavaScript in Objective-C

In a Cocos Creator native project, we can also execute JavaScript code in C++ or Objective-C using the `evalString` method.

Here's an example of how to call JavaScript code:

```c++
CC_CURRENT_ENGINE()->getScheduler()->performFunctionInCocosThread([=](){
    se::ScriptEngine::getInstance()->evalString(script.c_str());
});
```

> **Note**: Unless you are certain that the current thread is the main thread ( Cocos Thread ), you need to use the performFunctionInCocosThread method to dispatch the function to the main thread for execution.

### Global Function

We can add a new global function in the script using the following code:

```js
window.callByNative = function(){
  //to do
}
```

>`window` is the global object in the Cocos Engine script environment. If you want a variable, function, object, or class to be globally accessible, you need to add it as a property of `window`. You can access it using `window.variableName` or `variableName` directly.

Then, you can call it like this:

```c++
CC_CURRENT_ENGINE()->getScheduler()->performFunctionInCocosThread([=](){
    se::ScriptEngine::getInstance()->evalString("window.callByNative()");
});
```

Or:

```c++
CC_CURRENT_ENGINE()->getScheduler()->performFunctionInCocosThread([=](){
    se::ScriptEngine::getInstance()->evalString("callByNative()");
});
```

### Call Static Function of an Class

Suppose there is an object in the TypeScript script with the following static function:

```ts
export class NativeAPI{
  public static callByNative(){
    //to do
  }
}
//Register NativeAPI as a global class, otherwise it cannot be called in Objective-C.
window.NativeAPI = NativeAPI;
```

We can call it like this:

```c++
CC_CURRENT_ENGINE()->getScheduler()->performFunctionInCocosThread([=](){
    se::ScriptEngine::getInstance()->evalString("NativeAPI.callByNative()");
});
```

### Call Singleton Function

If the script code implements a singleton object that can be globally accessed:

```ts
export class NativeAPIMgr{
  private static _inst:NativeAPIMgr;
  
  public static get inst():NativeAPIMgr{
    if(!this._inst){
      this._inst = new NativeAPIMgr();
    }
    return this._inst;
  }

  public static callByNative(){
    //to do
  }
}

//Register NativeAPIMgr as a global class, otherwise it cannot be called in Objective-C.
window.NativeAPIMgr = NativeAPIMgr;
```

We can call it like this.

```c++
CC_CURRENT_ENGINE()->getScheduler()->performFunctionInCocosThread([=](){
    se::ScriptEngine::getInstance()->evalString("NativeAPIMgr.inst.callByNative()");
});
```

### Call with Parameters

The above mentioned ways of calling JS from Java all support parameter passing. However, the parameters only support the three basic types: `string`, `number`, and `boolean`.

Taking the global function as an example:

```js
window.callByNative = function(a:string, b:number, c:bool){
  //to do
}
```

You can call it like this:

```c++
CC_CURRENT_ENGINE()->getScheduler()->performFunctionInCocosThread([=](){
    se::ScriptEngine::getInstance()->evalString("window.callByNative('test',1,true)");
});
```

## Thread Safety

As you can see in the code above, `CC_CURRENT_ENGINE()->getScheduler()->performFunctionInCocosThread` is used. This is to ensure that the code is executed in the correct thread. For more details, please refer to the [Thread Safety](./thread-safety.md) documentation.
