# 自定义快捷键

编辑器内的快捷键由 "快捷键管理器" 统一管理。每一个快捷键可以绑定一个消息，当快捷键按下的时候，会触发绑定的消息。

## 定义快捷键

定义快捷键需要在 `package.json` 的 `contributions.shortcuts` 字段中进行，如下所示：

```json5
// package.json
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
                "when": "panelName === 'hello-world'",
                "win": "ctrl+z",
                "mac": "cmd+z",
            }
        ]
    }
}
```

本示例中，我们定义了一个 **撤销** 操作的快捷键，在 Windows 系统下是 `CTRL + Z`，在 macOS 系统下是 `CMD + Z`。

当对应快捷键被按下时，会发送 `undo` 消息。

> **注意**：此消息需要在 `contributions.messages` 里面先定义好，详请请参考文档 [自定义消息](./contributions-messages.md)。

## 参数说明

下面我们来看看 `contributions.shortcuts` 各参数的具体说明。

### message

类型 {string} 必填

快捷键绑定的消息，当这个快捷键被触发时，会发送此消息。快捷键按下的消息只能发送给当前扩展。

### when

类型 {string} 可选

在某些条件下才会触发这个快捷键。

`"when": "panelName === 'hello-world'"` 表示当获得焦点的面板名称为 `hello-world` 时，按下快捷键才会发送 `message` 消息。

### win

类型 {string} 必填

在 Windows 平台上，监听的按键。

### mac

类型 {string} 必填

在 macOS 上，监听的按键。
