# How to Call Java methods using JavaScript on Android

With the Cocos Creator Android build, developers can call Java static methods directly in JavaScript. Doing so is very simple:

```js
var result = jsb.reflection.callStaticMethod(className, methodName, methodSignature, parameters...)
```

In `callStaticMethod` method, pass the Java class name, method name, method signature with parameters, and get the return value from Java. The Java class name and method signature may be a little strange without having experience with JNI, but that is the Java specification.

## Class name

The class name must contain Java package path. For example, if a class, `Test`, exists in the package `com.cocos.game`:

```java
// package "com.cocos.game";

public class Test {
    
    public static void hello(String msg) {
        System.out.println(msg);
    }
    
    public static int sum(int a, int b) {
        return a + b;
    }
    
    public static int sum(int a) {
        return a + 2;
    }
}
```

The correct class name of `Test` is `com/cocos/game/Test`. Please note that using a slash `/` is required, **NOT** using a dot `.`.

## Method name

The method name is very simple. For example, the method names of the above two sum methods are both `sum`.

## Method signature

The method signature is a little complex. The simplest signature is `()V`, it represents a method which has no parameters and no return value. Examples:

- `(I)V` represents a method which has a int parameter and no return value.
- `(I)I` represents a method which has a int parameter and a int return value.
- `(IF)Z` represents a method which has a int parameter and a float parameter, and returns boolean.

The symbols in brackets represent the type of parameters, and the symbol after bracket represent the type of return value. Because methods are allowed to be overloaded in Java, there can be multiple methods which have the same method name, but different parameters and return value. The method signature is used to help identifying these methods.

Currently, Cocos Creator supports four Java types:

| Java type | signature |
| :-------- | :-------- |
| **int**       | I         |
| **float**     | F         |
| **boolean**   | Z         |
| **String**    | Ljava/lang/String; |

## Parameters

The number of parameters can be 0 or more than one. And when we use `callStaticMethod`, we can use number, boolean and string of JavaScript directly.

## Usage

Here is an example of invoking the static methods of `Test` class:

```js
//call hello method
jsb.reflection.callStaticMethod("com/cocos/game/Test", "hello", "(Ljava/lang/String;)V", "this is a message from JavaScript");

//call the first sum method
var result = jsb.reflection.callStaticMethod("com/cocos/game/Test", "sum", "(II)I", 3, 7);
cc.log(result); //10

//call the second sum method
var result = jsb.reflection.callStaticMethod("com/cocos/game/Test", "sum", "(I)I", 3);
cc.log(result); //5
```

Take a look on the Console, there should be correct output.

## Attention

A very important thing that must be paid attention to is **thread safety**! With a Cocos Creator Android app, the engine and JavaScript VM works in the `gl` thread, and Android update its UI in the `ui` thread. If a Java method is called which will update the app UI, it must run in `ui` thread.

For example, calling a Java method which shows an Android AlertDialog:

```c++
//make some modification in AppActivity class
public class AppActivity extends CocosActivity {
    
    private static AppActivity app = null;
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        app = this;
    }
    
    public static void showAlertDialog(final String title,final String message) {
        
        //we must use runOnUiThread here
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

Next, call `showAlertDialog` in JavaScript:

```js
jsb.reflection.callStaticMethod("com/cocos/game/AppActivity", "showAlertDialog", "(Ljava/lang/String;Ljava/lang/String;)V", "title", "hahahahha");
```

An Android native AlertDialog should show now.

## One more thing

Now that it is possible to successfully called Java methods in JavaScript, is it possible to call JavaScript in Java? Of course!

The engine contains class `CocosJavascriptJavaBridge`, which has an `evalString` method that can execute JavaScript, and is located in the `resources\3d\cocos2d-x-lite\cocos\platform\android\java\src\com\cocos\lib\CocosJavascriptJavaBridge.java` file in the engine directory. Please note that this time JavaScript code should be run in the `gl` thread.

Consider an example of adding an OK button for the AlertDialog, and using `evalString` in its `OnClickListener`:

```java
alertDialog.setButton("OK", new DialogInterface.OnClickListener() {
    public void onClick(DialogInterface dialog, int which) {

        // We must use runOnGLThread here
        CocosHelper.runOnGameThread(new Runnable() {
            @Override
            public void run() {
                CocosJavascriptJavaBridge.evalString("cc.log(\"JavaScript Java bridge!\")");
            }
        });
    }
});
```

> **Note**: the engine does not promise security in multi-threaded currently, avoid JavaScript code being called in other threads during development to avoid various memory errors.

To call `evalString` in C++, please refer to the following method to ensure that `evalString` is executed in the thread where the JavaScript engine is:

```c++
Application::getInstance()->getScheduler()->performFunctionInCocosThread([=](){
    se::ScriptEngine::getInstance()->evalString(script.c_str());
});
```

After clicking OK button, notice the output. `evalString` can run any JavaScript code, and can access JavaScript variables.
