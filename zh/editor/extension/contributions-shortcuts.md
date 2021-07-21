# 快捷键

编辑器内的快捷键由 **快捷键管理器** 统一管理。每一个快捷键都需要绑定一个消息，当快捷键按下的时候，触发绑定的消息。有关消息系统请查看[消息系统](./messages.md)。

## 定义快捷键

在 Cocos Creator 3.0 中，所有的快捷键都需要定义在 `contributions` 内的 `shortcuts` 字段里。

```json
{
    "name": "hello-world",
    "panels": {
        "default": {
            "main": "./panel.js"
        }
    },
    "contributions": {
        "messages": {
            "undo": {
                "title": "i18n:hello.messages.undo.title",
                "methods": ["say-undo"]
            }
        },
        "shortcuts": [
            {
                "message": "undo",
                "when": "panel.hello-world",
                "win": "ctrl+z",
                "mac": "cmd+z",
            }
        ]
    }
}
```

上述内容定义了，当 `hello-world` 面板处于聚焦状态下，要是在 windows 下接收到了快捷键 `ctrl+z`（mac 下 `cmd+z`）则会派发 `undo` 消息。消息接受到了之后，则会执行扩展内的 `say-undo` 方法。

### 参数字段

| 字段名 | 类型  | 是否选填 | 描述 |
| :--- | :---  | :--- | :--- |
| message | string  | 否 | 快捷键绑定的消息，当这个快捷键被触发的时候，发送这条消息。快捷键按下的消息只能发送给自己。 |
| when(experimental) | string  | 否 | **实验性功能，这个功能语法可能会进行调整**。在某些条件下才会触发这个快捷键。panel.hello-world 则是在 hello-world 面板获得焦点的时候，快捷键才会生效。 |
| win | string  | 否 | 在 windows 平台上，监听的按键。字符之间不允许空格。 |
| mac | string  | 否 | 在 MacOS 上，监听的按键。字符之间不允许空格。 |
