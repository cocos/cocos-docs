# Thread Safety

In a native application built with Cocos Creator, there are at least two threads: the **GL Thread** and **Native UI Thread**。
- **GL Thread**: Executes rendering-related code of the Cocos Engine and JavaScript code.
- **UI Thread**: Handles the creation, response, and update of the platform's native UI.

Therefore, we need to be aware of the following two issues:
1. When code in the **UI thread** needs to call code in the **GL thread**, we need to handle thread safety.
2. When code in the **GL thread** needs to call code in the **UI thread**, we need to handle thread safety.

Now let's take a look at how to handle thread safety in different situations.

## Executing on the UI Thread

When we write Java methods on the Android platform that involve UI-related operations, and they are called in the GL thread, we need to use the `app.runOnUiThread` method to execute the code on the UI thread, ensuring thread safety.

Let's take an example of displaying an Alert dialog on Android.

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

In this example, the showAlert method creates and displays an Alert dialog. By using app.runOnUiThread, we ensure that the code runs on the UI thread, preventing any thread safety issues.

## Executing on the GL Thread

When code running on the UI thread needs to call code in the GL thread, we need to use `CocosHelper.runOnGameThread` to ensure thread safety.

Let's take an example of a button event response:

```java
alertDialog.setButton("OK", new DialogInterface.OnClickListener() {
    public void onClick(DialogInterface dialog, int which) {
        // Must run on GL Thread
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

If you are writing Objective-C or C++ code and want to ensure thread safety, you can use the `CC_CURRENT_ENGINE()->getScheduler()->performFunctionInCocosThread` method to execute the code on the GL thread.

Here's an example:

```c++
CC_CURRENT_ENGINE()->getScheduler()->performFunctionInCocosThread([=](){
    //TO DO
});
```

Please note that the above code is in C++. If you want to call it from Objective-C code, you need to use the `*.mm` file extension for your Objective-C code file.
