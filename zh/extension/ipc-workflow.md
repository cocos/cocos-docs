# 进程间通讯（IPC）工作流程

关于扩展包进程间通讯（以下简称 IPC）的基本概念，请先阅读 [IPC 简介](introduction-to-ipc.md)。

我们前面介绍了主进程中的 [入口程序](entry-point.md) 和渲染进程中的 [面板程序](extends-panel.md) 的基本声明方法和交互方式，接下来我们将结合实际需求介绍两种进程间通讯的详细工作流程。

本节提及的所有相关 API 均可查询 [Editor.Ipc 主进程 API](api/editor-framework/main/ipc.md) 和 [Editor.Ipc 渲染进程 API](api/editor-framework/renderer/ipc.md)。

## 发送消息

### 主进程向面板发送消息

在主进程中，主要使用

`Editor.Ipc.sendToPanel('panelID', 'message' [, ...args, callback, timeout])`

接口向特定面板发送消息。对于目前支持的单面板插件来说：

- `panelID` 面板 ID，对于单面板扩展包来说，面板 ID 就是插件的包名，如 `foobar`
- `message` 是 IPC 消息的全名，如 `do-some-work`，我们推荐在定义 IPC 消息名时使用 `-` 来连接单词，而不是使用驼峰或下划线。
- **可选** `args`，从第三个参数开始，可以定义数量不定的多个传参，用于传递更具体的信息到面板进程。
- **可选** `callback`，在传参后面可以添加回调方法，在面板进程中接受到 IPC 消息后可以选择向主进程发送回调，并通过 callback 回调方法进行处理。回调方法的参数第一个是 error（如果没有错误则传入 `null`），之后才是传参。
- **可选** `timeout`，回调超时，只能配合回调方法一起使用，如果规定了超时，在消息发送后的一定时间内没有接到回调方法，就会触发超时错误。如果不指定超时，则默认的超时设置是 5000 毫秒。

### 面板向主进程发送消息

`Editor.Ipc.sendToMain('message', [, ...args, callback, timeout])`

和 `sendToPanel` 相比，除了缺少第一个面板 ID 参数之外，其他参数的意义和用法完全相同。

### 其他消息发送方法

主进程对面板和面板对主进程是最常见的两种消息发送方式，但实际上 IPC 不局限于不同的两类进程之间，我们可以把消息发送方式做以下归类：

- 任意进程对主进程 `Editor.Ipc.sendToMain`
- 任意进程对面板 `Editor.Ipc.sendToPanel`
- 任意进程对编辑器主窗口（也就是对主窗口里的所有渲染进程广播）`Editor.Ipc.sendToMainWin`
- 任意进程对所有窗口（对包括弹出窗口在内的所有窗口渲染进程广播）`Editor.Ipc.sendToWins`
- 任意进程对所有进程广播 `Editor.Ipc.sendToAll`

上述方法在两种进程里写法都是一致的，只要注意消息接收的对象是在渲染进程还是主进程，并选择对应的方法即可。详细的接口用法请参考上文的描述和本文最上面的 IPC 接口文档链接。

**注意: 由于通讯基于 Electron 的底层 IPC 实现，所以切记传输的数据不可以包含原生对象，否则可能导致进程崩溃或者内存暴涨。推荐只传输纯 JSON 对象。**

## 接收消息

要在主进程或渲染进程中接受 IPC 消息，最简单的办法是在声明对象的 `messages` 字段中注册以 IPC 消息为名的消息处理方法。

### 面板渲染进程消息监听

```js
//packages/foobar/panel/index.js
Editor.Panel.extends({
    //...
    messages: {
        'my-message': function (event, ...args) {
            //do some work
        }
    }
});
```

### 主进程消息监听

```js
//packages/foobar/main.js
module.exports = {
    //...
    messages: {
        'my-message': function (event, ...args) {
            //do some work
        }
    }
}
```

注册监听消息时，我们使用的消息名是省略了扩展包名的短命名，上述消息短名 `my-message` 在发送时应该是 `Editor.Ipc.sendToPanel('foobar:my-message')` 和 `Editor.Ipc.sendToMain('foobar:my-messages')`。

可以看到主进程和渲染进程中监听 IPC 消息的函数声明方式是一致的，传入的第一个参数是一个 `event` 对象，我们可以通过这个对象发送回调。

### 其他消息监听方式

除了在 `messages` 字段内注册之外还可以使用 Electron 的 Ipc 消息接口来监听，形式上更灵活：

渲染进程中：

```js
require('electron').ipcRenderer.on('foobar:message', function(event, args) {});
```

主进程中：

```js
require('electron').ipcMain.on('foobar:message', function(event, args) {});
```

关于 Electron 的 IPC 接口可以参考 [Electron API: ipcMain](http://electron.atom.io/docs/api/ipc-main/) [Electron API: ipcRenderer](http://electron.atom.io/docs/api/ipc-renderer/)。

## 向消息来源发送回调

假如我们从主进程发送了一个消息：

```js
//packages/foobar/main.js
Editor.Ipc.sendToPanel('foobar', 'greeting', 'How are you?', function (error, answer) {
    Editor.log(answer);
});
```

在面板监听消息的方法中，我们可以使用 `event.reply` 来发送回调：

```js
//packages/foobar/panel/index.js
Editor.Panel.extends({
    //...
    messages: {
        'greeting': function (event, question) {
            console.log(question); //How are you?
            if (event.reply) {
                //if no error, the first argument should be null
                event.reply(null, 'Fine, thank you!');
            }
        }
    }
});
```

注意 `event.reply` 第一个参数是报错，没有错误时应该传入 `null`，此外建议总是检查 `event.reply` 是否存在，如果发送消息时参数中不包含回调方法，则 `event.reply` 的检查将返回 `undefined`，这种情况下调用 `event.reply` 会产生错误。

### 处理超时

发送消息时的最后一个参数是超时时限，单位是毫秒，如果未指定超时时限，则使用默认的 5000 ms 超时限制。

如果要取消超时限制，最后一次参数应该传入 `-1`，这种情况下应该靠其他逻辑保证回调必将触发。

从消息发送开始，在超过规定的时限后仍然没有接到消息监听方法中返回的回调的话，就会收到系统发送的超时错误回调：

```js
Editor.Ipc.sendToMain('foobar:greeting', function (error, answer) {
  if ( error && error.code === 'ETIMEOUT' ) { //check the error code to confirm a timeout
    Editor.error('Timeout for ipc message foobar:greeting');
    return;
  }
  Editor.log(answer);
});
```
