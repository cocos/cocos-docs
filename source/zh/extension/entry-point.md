# 入口程序

每一个插件都可以指定一份入口程序，入口程序是在主进程中被执行的。通常我们会在入口程序中：

 - 初始化扩展包
 - 执行后台操作程序
 - 调用 Cocos Creator 主进程中的方法
 - 管理扩展面板的开启和关闭

这里有一份入口程序的样例：

```javascript
'use strict';

module.exports = {
  load () {
    console.log('package loaded');
  },

  unload () {
    console.log('package unloaded');
  },
};
```

## 生命周期回调

### load

当扩展包正确载入后，将会执行用户入口程序中的 load 函数。我们可以在这里做一些关于扩展包本身的初始化操作。

### unload

当扩展包卸载进行到最后阶段，将会执行用户入口程序中的 unload 函数。我们可以在这里做一些扩展包卸载前的清理操作。

## IPC 消息注册

在入口程序中添加 `messages` 字段，可以让扩展包在加载的时候进行主进程的 IPC 消息注册。样例如下：

```javascript
'use strict';

module.exports = {
  messages {
    'foo-bar' ( event ) { console.log('hello foobar'); },
    'scene:saved' ( event ) { console.log('scene saved!'); },
  },
};
```

通过上面的例子，我们可以看到注册的 IPC 消息接受两种格式：

### 短命名消息

短命名消息是指消息名不带 `:` 的消息。这些消息将被视为该扩展包内的消息，在注册阶段，实际注册是，会被写成 `${你的扩展包名}:${消息名}`。以上面的代码为例，假设我们的扩展包名字为 “simple-demo”，那么 “foo-bar” 这个消息实际注册时，将会扩展成 “simple-demo:foo-bar”。

实际应用中，我们就可以通过 `Editor.sendToPackage` 函数发送 IPC 消息到主进程的指定扩展包的注册函数中。

```javascript
Editor.sendToPackage('simple-demo', 'foo-bar');
```

当然，我们还有更多的消息发送策略，我们会在后续的章节中进行详细介绍。

### 全名消息

全名消息就是指消息名中带有 `:` 的消息命名方式。通常我们书写全名消息是为了监听其他扩展包，或者其他模块的 IPC 消息。通过全名消息很清晰地知道这份消息是从哪个扩展包中发出的，也更好的避免了消息冲突的问题。

如上面的例子，我们可以清楚的了解到，“scene:saved” 这个消息是从 scene 这个内置扩展中发送的。
