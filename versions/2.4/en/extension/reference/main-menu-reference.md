# main-menu Reference

### message (String)

IPC message to send. This happens when you click the menu item.

### command (String)

command is similar to message, but instead of sending IPC message, it will directly invoke the global method in your main process:

```json
{
  "Examples/Say Hello": {
    "command": "Editor.log",
    "params": ["Hello World!"]
  }
}
```

The above registry will eventually invoke `Editor.log('Hello World')` when you click the menu.

### params (Array)

The message or command parameters

### accelerator (String)

Your shortcuts for menu item. More details read [Accelerator](https://github.com/atom/electron/blob/master/docs/api/accelerator.md).

### icon (String)

The relative path of the icon for your menu item.

### visible (Boolean)

Controls if hiding your menu item.

### enabled (Boolean)

Controls if enable your menu item.
