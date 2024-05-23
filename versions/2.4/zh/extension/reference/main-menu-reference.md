# 主菜单字段参考

## message (String)

IPC 消息字段。当点击菜单后，将会发送该字段中的消息到主进程中。

## command (String)

command 和 message 功能相似，但是它不是向主进程中发送 IPC 消息，而是直接在主进程中寻找并运行你给出的全局函数。例如：

```json
{
  "Examples/Say Hello": {
    "command": "Editor.log",
    "params": ["Hello World!"]
  }
}
```

值得注意的是，message 和 command 字段不能共存，因为它们都关系到点击行为。

## params (Array)

消息参数，你可以通过定义数组，并填写数组元素使得发送的消息带有参数。

## accelerator (String)

快捷键注册字段。你可以在这里定义你的菜单快捷键，具体的定义规则，请参考 [Accelerator](https://github.com/atom/electron/blob/master/docs/api/accelerator.md)。

## icon (String)

图标文件的相对路径，通过指定 icon 文件，你可以为你的菜单选项加上一份图标。

## visible (Boolean)

控制菜单是否隐藏。

## enabled (Boolean)

控制菜单是否可点击。
