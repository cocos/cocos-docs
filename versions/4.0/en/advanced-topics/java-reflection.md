# JavaScript and Android Communication with Reflection

## Calling Java Static Methods from JavaScript

In an Android native application created with Cocos Creator, we can directly call Java static methods from JavaScript using the Java reflection mechanism. The method is defined as follows.

```js
import { native } from 'cc'; 
var o = native.reflection.callStaticMethod(className, methodName, methodSignature, parameters...)
```

- className: the name of the Java class.
- methodName: the name of the static method.
- methodSignature: the signature of the method, to indicate a unique method.
- parameters: the list of parameters.

Now, let's take the `Test` class under the `com.cocos.game` package as an example.

```java
// package "com.cocos.game";

public class Test {
    
    public static void hello (String msg) {
        System.out.println (msg);
    }
    
    public static int sum (int a, int b) {
        return a + b;
    }
    
    public static int sum (int a) {
        return a + 2;
    }
}
```

### className

The `className` should include the package path. If we want to call a static method in the `Test` class mentioned above, the `className` should be "com/cocos/game/Test".

> **Note**: Here we use a `/` instead of a `.` in Java package name.

### methodName

The `methodName` is simply the name of the method. For example, if we want to call the `sum` method, the `methodName` parameter should be "sum".

### methodSignature

Since Java supports method overloading, the method signature is used to specify the parameter types and return type, ensuring a unique method is invoked.

The format of the method signature is: **(parameter types)return type**.

Cocos Creator currently supports the following 4 Java type signatures:

| Java Type | Signature |
| :------ | :----- |
| int     | I   |
| float   | F   |
| boolean | Z   |
| String  | Ljava/lang/String; |

> **Note**: the signature of `String` type is `Ljava/lang/String;`, don't miss the `;` in the end.

Here are some examples:

- `()V` represents a method with no parameters and no return value.
- `(I)V` represents a method with one parameter of type int and no return value.
- `(I)I` represents a method with one parameter of type int and a return value of type int.
- `(IF)Z` represents a method with two parameters, one of type int and one of type float, and a return value of type boolean.
- `(ILjava/lang/String;F)Ljava/lang/String;` represents a method with three parameters, one of type int, one of type String, and one of type float, and a return value of type String.

### parameters

The parameters passed should match the method signature. It supports number, boolean, and string types.

### Examples

Here are some examples of calling static methods in the Test class:

```js
if(sys.os == sys.OS.ANDROID && sys.isNative){
    // call hello
    native.reflection.callStaticMethod("com/cocos/game/Test", "hello", "(Ljava/lang/String;)V", "this is a message from JavaScript");

    // call the first sum 
    var result = native.reflection.callStaticMethod("com/cocos/game/Test", "sum", "(II)I", 3, 7);
    log(result); // 10

    // call the second sum
    var result = native.reflection.callStaticMethod("com/cocos/game/Test", "sum", "(I)I", 3);
    log(result); // 5
}
```

The `sys.isNative` is used to check if it's running on a native platform, and the `sys.os` is used to determine the current operating system. Since the communication mechanisms vary across different platforms, it is recommended to perform the check before call `native.reflection.callStaticMethod`.

After running the code, you can see the corresponding output.

## Calling JavaScript from Java

In addition to JavaScript calling Java, the engine also provides a mechanism for Java to call JavaScript.

By using the `CocosJavascriptJavaBridge.evalString` method provided by the engine, you can execute JavaScript code. It's important to note that since JavaScript code in Cocos Engine is executed on the GL thread, we need to use `CocosHelper.runOnGameThread` to ensure that the thread is correct.

Next, we will add a button to the Alert dialog and execute a piece of JavaScript code in its response function.

```java
alertDialog.setButton("OK", new DialogInterface.OnClickListener() {
    public void onClick(DialogInterface dialog, int which) {
        // Must execute in GL thread
        CocosHelper.runOnGameThread(new Runnable() {
            @Override
            public void run() {
                CocosJavascriptJavaBridge.evalString("cc.log(\"Javascript Java bridge!\")");
            }
        });
    }
});
```

Next, let's take a look at how to call JavaScript code in different situations.

### Calling Global Function

We can add a new global function in the script using the following code:

```js
window.callByNative = function(){
  //to do
}
```

>`window` is the global object in the Cocos Engine script environment. If you want a variable, function, object, or class to be globally accessible, you need to add it as a property of `window`. You can access it using `window.variableName` or `variableName` directly.

Then, you can call it like this:

```java
CocosHelper.runOnGameThread(new Runnable() {
    @Override
    public void run() {
        CocosJavascriptJavaBridge.evalString("window.callByNative()");
    }
});
```

Or:

```js
CocosHelper.runOnGameThread(new Runnable() {
    @Override
    public void run() {
        CocosJavascriptJavaBridge.evalString("callByNative()");
    }
});
```

### Calling Static Function of an Class

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

Then you can call it like this:

```java
CocosHelper.runOnGameThread(new Runnable() {
    @Override
    public void run() {
        CocosJavascriptJavaBridge.evalString("NativeAPI.callByNative()");
    }
});
```

### Calling Singleton Function

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

You can call it like this:

```java
CocosHelper.runOnGameThread(new Runnable() {
    @Override
    public void run() {
        CocosJavascriptJavaBridge.evalString("NativeAPIMgr.inst.callByNative()");
    }
});
```

### Calling with Parameters

The above mentioned ways of calling JS from Java all support parameter passing. However, the parameters only support the three basic types: `string`, `number`, and `boolean`.

Taking the global function as an example:

```js
window.callByNative = function(a:string, b:number, c:bool){
  //to do
}
```

You can call it like this:

```java
CocosHelper.runOnGameThread(new Runnable() {
    @Override
    public void run() {
        CocosJavascriptJavaBridge.evalString("window.callByNative('test',1,true)");
    }
});
```

## Calling JavaScript from C++

If you want to call `evalString` in C++, you can refer to the following approach to ensure that `evalString` is executed in the GL thread of the engine:

```c++
CC_CURRENT_ENGINE()->getScheduler()->performFunctionInCocosThread([=]() {
    se::ScriptEngine::getInstance()->evalString(script.c_str());
});
```

## Thread Safety

As you can see in the code above, `CocosHelper.runOnGameThread` and `CC_CURRENT_ENGINE()->getScheduler()->performFunctionInCocosThread` are used. This is to ensure that the code is executed in the correct thread. For more details, please refer to the [Thread Safety](./thread-safety.md) documentation.
