# 消息系统

Cocos Creator 中有许多独立运行进程，且这些进程间是相互隔离的。在编辑器内需要与其他功能进行交互的时候，需要通过 "消息机制" 进行交互。

编辑器里的"消息系统"是 IPC（进程间通信）的功能扩展封装。这个系统承担起了整个编辑器内通讯交互的重担。

更多关于多进程构架和跨进程通信的介绍请参考文档 [基础结构](./package.md).

## 消息类型

Cocos Creator 系统内的消息有两种类型：

1. 普通消息：主动发送某条消息到某个功能（扩展）
2. 广播消息：某个功能（扩展）完成了一个操作后向所有人发送通知，告知操作已经完成

### 普通消息

可以理解成一种对外的接口，例如引擎的 **场景编辑器** 模块已经定义好了一个用于查询节点的 `query-node` 消息，如下所示：

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

关于如何自定义消息以及消息各字段的含义，请参考文档 [自定义消息](./contributions-messages.md)。

当我们在自己编写的扩展中想要查询场景节点时，就可以使用这个消息来完成，如下所示:

```typescript
const info = await Editor.Message.request('scene', 'query-node', uuid);
```

这种消息类似一种远程调用 (RPC), 拿到的 `info` 对象就是实际查询的节点上的部分数据。

> **注意**：由于是远程调用，`request` 是不会立即返回的，因此需要使用 `await` 将异步转为同步。

#### 普通消息的命名规范

请使用 **小写** 单词，并且不能包含特殊字符，单词间以 **-** 连接。如 `open-panel`、`text-changed`。

### 广播消息

广播消息是某一个功能内的操作完成后，对外进行的一种通知。

#### 接收广播消息

比如，**场景编辑器** 在启动一个场景后，需要通知所有人 "场景" 已经启动完毕，**场景编辑器** 发送广播消息使用的是如下代码：

```typescript
Editor.Message.broadcast('scene:ready', sceneUUID);
```

若一个扩展想要接收 `scene:ready` 消息，则需要在 `package.json` 里先定义，如下所示：

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

每当场景准备就绪后，广播的 `scene:ready` 消息就会触发 "hello-world" 扩展里的 `initData` 方法。

#### 发送广播消息

若一个扩展想要发送广播消息，也需要在 `package.json` 里先定义。

比如，"hello-world" 在准备好数据后，会向外广播一条消息，以方便其他扩展与之配合。如下所示：

```json
{
    "name": "hello-world",
    "contributions": {
        "messages": {
            "scene:ready": {
                "methods": ["initData"]
            },
            "hello-world:ready": {
                "public": true,
                "description": "hello-world ready notification."
            }
        }
    }
}
```

在适当的时机，"hello-world" 扩展内调用如下代码即可广播给所有人：

```typescript
Editor.Message.broadcast('hello-world:ready');
```

> **注意**：广播消息可以没有 `methods`，表示不监听。如上面的定义所示，表示 “hello-world” 不需要监听自己的初始化完成的消息。

#### 广播消息的命名规范

格式为 `packageName:actionName`，以下命名都是合法的：
- scene:ready
- scene:query-node
- hello-world:ready
- hello-world:data-loaded

加上 `packageName` 可以防止命名出现冲突，在 `package.json` 中定义消息的时候也能够更加直观的看到监听的是哪一个扩展的哪个广播消息（动作）。

## 查看消息列表

编辑器内的功能以及扩展对外开放的消息列表，可以通过 **开发者 -> 消息管理** 面板查看。详细定义规则请参考文档 [自定义消息](./contributions-messages.md)。

## 在代码中发送消息

`send` 方法只发送消息，并不会等待返回。如果不需要返回数据，且不关心是否执行完成，请使用这个方法。

```typescript
Editor.Message.send(pkgName, message, ...args);
```

`request` 方法返回一个 promise 对象，这个 promise 会接收消息处理后返回的数据。

```typescript
await Editor.Message.request(pkgName, message, ...args);
```

`broadcast` 方法只发送，并且发送给所有监听对应消息的功能扩展。

```typescript
Editor.Message.broadcast(`${pkgName}:${actionName}`, ...args);
```
