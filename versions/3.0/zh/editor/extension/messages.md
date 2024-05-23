# 消息系统

Cocos Creator 3.0 中有许多独立运行进程，这些进程间是相互隔离的。所以在编辑器内需要与其他功能进行交互的时候，需要通过"消息"进行交互。

编辑器里的"消息系统"是 IPC（进程间通信）的功能扩展封装。这个系统承担起了整个编辑器内通讯交互的重担。

## 消息类型

消息交互分成了两种情况：

1. 普通消息：主动发送某条消息到某个功能（扩展）
2. 广播消息：某个功能（扩展）完成了一个操作后向所有人发送通知，告知操作已经完成

### 普通消息

可以理解成一种对外的 api，例如 **场景编辑器** 定义好了一个"消息"API `query-node`（查询节点）

```json
{
    "name": "scene",
    "contributions": {
        "messages": {
            "query-node": {
                "methods": ["queryNode"]
            }
        }
    }
}
```

在编写扩展的时候，就可以使用这个 API 发送消息:

```javascript
const info = await Editor.Message.request('scene', 'query-node', uuid);
```

这时候就会返回一个 promise 对象，在 await 后，拿到的 info 对象就是实际查询的节点上的部分数据。这种消息类似一种远程调用 API。

### 广播消息

广播消息是某一个功能内的操作完成后，对外进行的一种通知。还是以 **场景编辑器** 为例。

**场景编辑器** 在启动一个 scene 后，通知所有人"场景"已经启动完毕：

```javascript
Editor.Message.broadcast('scene:ready', sceneUUID);
```

在扩展里需要这样定义：

```json
{
    "name": "hello-world",
    "contributions": {
        "messages": {
            "scene:ready": {
                "methods": ["initData"]
            }
        }
    }
}
```

之后，每当场景准备就绪后，广播 `scene: ready`，就会触发 "hello-world" 扩展里的 `initData` 方法。

## 消息的命名规范

### 普通消息

请使用 **小写** 单词，并且不能包含特殊字符，单词间以 **-** 连接。

### 广播消息

不能包含除了 **:** 以外的特殊字符。格式为 `packageName: actionName`。

加上 packageName 是为了防止命名出现冲突。在自己的扩展里，监听的时候需要直接标明监听的是哪一个扩展的哪个广播（动作），这样在 `package.json` 中能够更加直观的了解扩展对消息的处理流程。

## 编辑器以及扩展开放的消息列表

编辑器内的功能以及扩展对外开放的消息列表，可以通过 **开发者 -> 消息列表** 面板查看。详细定义规则请参考 [contributions.messages](./contributions-messages.md)

## 发送消息

- `Editor.Message.send(pkgName, message, ...args);`

  `send` 方法只发送消息，并不会等待返回。如果不需要返回数据，且不关心是否执行完成，请使用这个方法。

- `await Editor.Message.request(pkgName, message, ...args);`

  `request` 方法返回一个 promise 对象，这个 promise 会接收消息处理后返回的数据。

- `Editor.Message.broadcast(`${pkgName}:${actionName}`, ...args);`

  `broadcast` 方法只发送，并且发送给所有监听对应消息的功能扩展。
