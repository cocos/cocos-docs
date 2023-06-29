# 线程安全

## 线程安全

在 Cocos Creator 发布的原生应用中，至少有两个线程：**GL 线程** 和 **原生系统的 UI 线程**。
- **GL 线程**：执行 Cocos 引擎的渲染相关代码和 JavaScript 脚本代码
- **UI 线程**：平台的原生 UI 创建、响应和更新

所以，我们需要注意以下两个问题：
1. 当 UI 线程中的代码要调用 GL 线程中的代码时，需要处理线程安全问题
2. 当 GL 线程要调用 UI 线程中的代码时，需要处理线程安全问题

接下来，我们看看不同情况下处理线程安全的方法。

## 在 UI 线程中执行

当我们在 Android 平台编写的 Java 方法有 UI 相关的操作，在被 GL 线程中的代码调用时，都需要利用 `app.runOnUiThread` 方法使代码在 UI 线程中执行，从而确保线程安全。

我们以弹出一个 Android 的 Alert 对话框为例。

```java
public class AppActivity extends CocosActivity {
    
    private static AppActivity app = null;
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        app = this;
    }
    
    public static void showAlertDialog(final String title,final String message) {
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

## 在 GL 线程中执行

在 UI 线程中的代码要调用 GL 线程中的代码时，需要使用 `CocosHelper.runOnGameThread` 来确保线程安全。

我们以按钮事件响应为例：

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

## Objective-C / C++

如果写的 Objective-C 或者 C++ 代码想要确保线程安全，可以通过 `CC_CURRENT_ENGINE()->getScheduler()->performFunctionInCocosThread` 方法让代码在 GL 线程中执行。

```c++
CC_CURRENT_ENGINE()->getScheduler()->performFunctionInCocosThread([=](){
    //TO DO
});
```

> **注意:** 这是 C++ 方法，如果想要在 Objective-C 代码中调用，需要 Objective-C 代码文件后缀为 *.mm。
