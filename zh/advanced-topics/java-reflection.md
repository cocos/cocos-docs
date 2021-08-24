# 如何在 Android 平台上使用 JavaScript 直接调用 Java 方法

使用 Creator 打包的安卓原生应用中，我们可以通过反射机制直接在 JavaScript 中调用 Java 的静态方法。它的使用方法很简单：

```js
var o = jsb.reflection.callStaticMethod(className, methodName, methodSignature, parameters...)
```

在 `callStaticMethod` 方法中，我们通过传入 Java 的类名、方法名和方法签名，参数就可以直接调用 Java 的静态方法，并且可以获得 Java 方法的返回值。下面介绍的类名和方法签名可能会有一点奇怪，但是 Java 的规范就是如此的。

## 类名

参数中的类名必须是包含 Java 包路径的完整类名，例如我们在 `com.cocos.game` 这个包下面写了一个 `Test` 类：

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

那么这个 Test 类的完整类名应该是 `com/cocos/game/Test`，注意这里必须是斜线 `/`，而不是在 Java 代码中我们习惯的点 `.`。

## 方法名

方法名很简单，就是方法本来的名字，例如 sum 方法的名字就是 `sum`。

## 方法签名

方法签名稍微有一点复杂，最简单的方法签名是 `()V`，它表示一个没有参数没有返回值的方法。其他一些例子：

- `(I)V` 表示参数为一个 int，没有返回值的方法
- `(I)I` 表示参数为一个 int，返回值为int的方法
- `(IF)Z` 表示参数为一个 int 和一个 float，返回值为 boolean 的方法

括号内的符号表示参数类型，括号后面的符号表示返回值类型。因为 Java 是允许函数重载的，可以有多个方法名相同但是参数返回值不同的方法，方法签名正是用来帮助区分这些相同名字的方法的。

目前 Cocos Creator 中支持的 Java 类型签名有以下 4 种：

| Java 类型 | 签名 |
| :------ | :----- |
| int     | I   |
| float   | F   |
| boolean | Z   |
| String  | Ljava / lang / String; |

## 参数

参数可以是 0 个或任意多个，直接使用 JavaScript 中的 number、bool 和 string 就可以。

## 使用示例

我们将会调用上面的 Test 类中的静态方法：

```js
// 调用 hello 方法
jsb.reflection.callStaticMethod("com/cocos/game/Test", "hello", "(Ljava/lang/String;)V", "this is a message from JavaScript");

// 调用第一个 sum 方法
var result = jsb.reflection.callStaticMethod("com/cocos/game/Test", "sum", "(II)I", 3, 7);
cc.log(result); //10

// 调用第二个 sum 方法
var result = jsb.reflection.callStaticMethod("com/cocos/game/Test", "sum", "(I)I", 3);
cc.log(result); //5
```

这样在 **控制台** 中就会有正确的输出。

## 注意

另外有一点需要注意的就是，在 Android 应用中，Cocos 引擎的渲染和 JavaScript 的逻辑是在 GL 线程中进行的，而 Android 本身的 UI 更新是在 App 的 UI 线程进行的，所以如果我们在 JavaScript 中调用的 Java 方法有任何刷新 UI 的操作，都需要在 UI 线程进行。

例如，在下面的例子中我们会调用一个 Java 方法，用于弹出一个 Android 的 Alert 对话框。

```c++
// 给我们熟悉的 AppActivity 类稍微加点东西
public class AppActivity extends CocosActivity {
    
    private static AppActivity app = null;
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        app = this;
    }
    
    public static void showAlertDialog(final String title,final String message) {
        
        // 这里一定要使用 runOnUiThread
        app.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                AlertDialog alertDialog = new AlertDialog.Builder(app).create();
                alertDialog.setTitle(title);
                alertDialog.setMessage(message);
                alertDialog.setIcon(R.drawable.icon);
                alertDialog.show();
            }
        });
    }
}
```

然后在 JavaScript 中调用：

```js
jsb.reflection.callStaticMethod("com/cocos/game/AppActivity", "showAlertDialog", "(Ljava/lang/String;Ljava/lang/String;)V", "title", "hahahahha");
```

这样调用之后你就可以看到一个 Android 原生的 Alert 对话框了。

## Java 调用 JavaScript

现在我们可以从 JavaScript 调用 Java 了，那么能不能反过来？当然可以！

引擎中包含 `CocosJavascriptJavaBridge` 类，这个类有一个 `evalString` 方法可以执行 JavaScript 代码，位于引擎目录的 `resources\3d\engine-native\cocos\platform\android\java\src\com\cocos\lib\CocosJavascriptJavaBridge.java` 文件中。我们将会给刚才的 Alert 对话框增加一个按钮，并在它的响应中执行 JavaScript。和上面的情况相反，这次执行 JavaScript 代码必须在 GL 线程中进行。

一般来说，目前引擎并未承诺多线程下的安全性，所以在开发过程中需要避免 JavaScript 代码在其他线程被调用，以避免各种内存错误。

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

如果要在 C++ 中调用 `evalString`，我们可以参考下面的方式，确保 `evalString` 在 JavaScript 引擎所在的线程被执行：

```c++
Application::getInstance()->getScheduler()->performFunctionInCocosThread([=]() {
    se::ScriptEngine::getInstance()->evalString(script.c_str());
});
```

这样在点击 OK 按钮后，便可以在控制台看到正确的输出。`evalString` 可以执行任何 JavaScript 代码，并且它可以访问到在 JavaScript 代码中的对象。
