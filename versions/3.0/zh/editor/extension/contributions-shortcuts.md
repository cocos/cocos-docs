# 快捷键

编辑器内的快捷键由 "快捷键管理器" 统一管理。每一个快捷键都需要绑定一个消息，当快捷键按下的时候，触发绑定的消息。

## 定义快捷键

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

`contributions.messages` 详情请参考 [消息通信](./contributions-messages.md)

`contributions.shortcuts` 参数说明请继续查看下文介绍。

### message

类型 {string} 必填 

快捷键绑定的消息，当这个快捷键被触发的时候，发送这条消息。快捷键按下的消息只能发送给自己。

### when(experimental)

类型 {string} 可选 

**实验性功能，这个功能语法可能会进行调整**

在某些条件下才会触发这个快捷键。

panel.hello-world 则是在 hello-world 面板获得焦点的时候，快捷键才会生效。

### win

类型 {string} 必填 

在 windows 平台上，监听的按键

### mac

类型 {string} 必填 

在 MacOS 上，监听的按键