# 基于反射机制实现 JavaScript 与 Android 系统原生通信

## JavaScript 调用 Java 静态方法

使用 Cocos Creator 打包的安卓原生应用中，我们可以通过反射机制直接在 JavaScript 中调用 Java 的静态方法。它的定义如下：

```js
import { native } from 'cc'; 
var o = native.reflection.callStaticMethod(className, methodName, methodSignature, parameters...)
```

- className：类名
- methodName：方法名
- methodSignature：方法签名
- parameters：参数列表

接下来，我们以 `com.cocos.game` 包下面的 `Test` 类为例，来具体说明。

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

`className` 需要包含包名信息，如果要调用上面的 Test 类中的静态方法，`className` 应该为 "com/cocos/game/Test"。

>**注意：**这里必须是斜线 `/`，而不是在 Java 代码中的 `.`。

### methodName

`methodName` 就是方法本来的名字，例如要调用 `sum` 方法的话，methodName 传入的就是 "sum"。

### methodSignature

由于 Java 支持函数重载功能，方法签名用于告诉反射系统对应的参数类型和返回值类型，以确定唯一的方法。

它的格式为：**(参数类型)返回值类型**。

目前 Cocos Creator 中支持的 Java 类型签名有以下 4 种：

| Java 类型 | 签名 |
| :------ | :----- |
| int     | I   |
| float   | F   |
| boolean | Z   |
| String  | Ljava/lang/String; |

>**注意**：String 类型的签名为 `Ljava/lang/String;`，不要漏掉了最后的 `;`。

下面是一些案例

- `()V` 表示没有参数，没有返回值
- `(I)V` 表示参数为一个 int，没有返回值的方法
- `(I)I` 表示参数为一个 int，返回值为 int 的方法
- `(IF)Z` 表示参数为一个 int 和一个 float，返回值为 boolean 的方法
- `(ILjava/lang/String;F)Ljava/lang/String;` 表示参数类型为一个 int，一个 String 和一个 float，返回值类型为 String 的方法

### parameters

传递的参数与签名匹配即可，支持 number、bool 和 string。

### 使用示例

接下来我们看几个 Test 类中的静态方法的调用示例：

```js
// 调用 hello 方法
native.reflection.callStaticMethod("com/cocos/game/Test", "hello", "(Ljava/lang/String;)V", "this is a message from JavaScript");

// 调用第一个 sum 方法
var result = native.reflection.callStaticMethod("com/cocos/game/Test", "sum", "(II)I", 3, 7);
log(result); // 10

// 调用第二个 sum 方法
var result = native.reflection.callStaticMethod("com/cocos/game/Test", "sum", "(I)I", 3);
log(result); // 5
```

可以在 **控制台** 中看到相应的输出结果。

## Java 调用 JavaScript

除了 JavaScript 调用 Java，引擎也提供了 Java 调用 JavaScript 的机制。

通过引擎提供的 `CocosJavascriptJavaBridge.evalString` 方法可以执行 JavaScript 代码。需要注意的是，由于 JavaScript 相关代码会在 GL 线程中执行，我们需要利用 `CocosHelper.runOnGameThread` 来确保线程是正确的。

接下来，我们给刚才的 Alert 对话框增加一个按钮，并在它的响应函数中执行一段 JavaScript 代码。

```java
alertDialog.setButton("OK", new DialogInterface.OnClickListener() {
    public void onClick(DialogInterface dialog, int which) {
        // 一定要在 GL 线程中执行
        CocosHelper.runOnGameThread(new Runnable() {
            @Override
            public void run() {
                CocosJavascriptJavaBridge.evalString("cc.log(\"Javascript Java bridge!\")");
            }
        });
    }
});
```

### 调用全局函数

我们可以在脚本中通过如下代码新增一个全局函数：

```js
window.callByNative = function(){
  //to do
}
```

然后像下面这样调用:

```java
CocosHelper.runOnGameThread(new Runnable() {
    @Override
    public void run() {
        CocosJavascriptJavaBridge.evalString("window.callByNative()");
    }
});
```

### 调用对象的静态函数

假如在 TypeScript 脚本中有一个对象具有如下静态函数：

```ts
export class NativeCallback{
  public static somethingDone(){
    //to do
  }
}
```

我们可以像这样调用：

```java
CocosHelper.runOnGameThread(new Runnable() {
    @Override
    public void run() {
        CocosJavascriptJavaBridge.evalString("NativeCallback.somethingDone()");
    }
});
```

### 调用单例函数

如果脚本代码中，有实现可以全局访问的单例对象

```ts
export class NativeCallback{
  private static _inst:NativeCallback;
  
  public static get inst():NativeCallback{
    if(!this._inst){
      this._inst = new NativeCallback();
    }
    return this._inst;
  }

  public static somethingDone(){
    //to do
  }

  public static somethingDone2(a:string, b:number){
    //to do
  }
}
```

我们可以像下面这样调用：

```java
CocosHelper.runOnGameThread(new Runnable() {
    @Override
    public void run() {
        CocosJavascriptJavaBridge.evalString("NativeCallback.inst.somethingDone()");
    }
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

```java
CocosHelper.runOnGameThread(new Runnable() {
    @Override
    public void run() {
        CocosJavascriptJavaBridge.evalString("window.callByNative('test',1,true)");
    }
});
```

## 在 C++ 代码中调用 JavaScript

如果要在 C++ 中调用 `evalString`，我们可以参考下面的方式，确保 `evalString` 在 JavaScript 引擎所在的线程被执行：

```c++
Application::getInstance()->getScheduler()->performFunctionInCocosThread([=]() {
    se::ScriptEngine::getInstance()->evalString(script.c_str());
});
```

## 线程安全

可以看到，上面的代码中，使用了 `CocosHelper.runOnGameThread` 和 `Application::getInstance()->getScheduler()->performFunctionInCocosThread`。这是为了代码在执行时处于正确的线程，详情请参考：[线程安全](./thread-safety.md)。
