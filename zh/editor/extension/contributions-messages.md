# 消息通信

Cocos Creator 内，所有的交互都是通过 [消息系统](./messages.md)。

而消息也需要在 "contributions" 里定义后才能使用。

## 查看已有功能的公开消息

编辑器在顶部菜单 "开发者" - "消息列表" 里，预置了一个消息管理面板，面板里可以显示每个功能定义的公开消息及其说明。

## 定义一条消息

```json
{
    "name": "hello-world",
    "contributions": {
        "messages": {
            // name 是消息的名称
            "name": {
                "public": false,
                "description": "",
                "doc": "",
                "methods": []
            }
        }
    }
}
```

### public

类型 {string} 可选

是否对外显示这条消息，如果为 true，则会在消息列表界面显示这条消息的基本信息。

### description

类型 {string} 可选

如果 public 为 true，则会在消息列表显示一些简单的描述，支持 i18n:key 语法

### doc

类型 {string} 可选

如果 public 为 true，则会显示这条消息的一些文档，支持 i18n:key 语法。

这个文档使用 markdown 格式撰写并渲染。

### methods

类型 {string[]} 可选

消息触发的方法队列。

这是一个字符串数组，字符串为扩展或者面板上的方法（methods）。
如果是扩展上的方法，则直接定义 "methodName"，如果要触发扩展里定义的面板上的方法，则要填写 "panelName.methodName"。

例如：

```json
{
    "name": "hello-world",
    "panels": {
        "test-panel": {
            ...
        }
    },
    "contributions": {
        "messages": {
            "send-to-package": {
                "methods": [
                    "sendMessage"
                ]
            },
            "send-to-panel": {
                "methods": [
                    "test-panel.sendMessage"
                ]
            }
        }
    }
}
```

## 广播消息

开发一个扩展的时候，完成一个动作后需要向其他功能发送一些通知，这些通知也需要显示在 "消息列表" 面板上的话，可以这样定义消息：

```json
{
    "name": "hello-world",
    "contributions": {
        "messages": {
            "hello-world:ready": {
                "public": true,
                "description": "hello-world 插件准备就绪通知"
            }
        }
    }
}
```

**定义广播消息并不一定需要 methods，消息可以只定义，但不触发任何方法**

在扩展代码里可以在合适的时机，发送这个广播：

```typescript
// 广播消息使用 插件名:消息名
Editor.Message.broadcast('hello-world:ready');
```

这样在其他扩展就能够监听这个广播消息，知道当前扩展的一些状态。也能够在消息列表面板上看到对应的说明。
