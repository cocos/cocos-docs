# 面板数据存储

面板是可视化编辑最常见的功能，可以随时被开关。但也从侧面反应了它不是可靠的数据存储位置，特别是当面板停靠在主窗口时，面板会先执行关闭，然后再次开启。因此，面板上使用的数据如果不进行存储，最终会导致丢失。这时候就需要与扩展主体进行一定程度的数据交互，将数据存储在主体或者本地。

此功能需求依赖消息系统，因此，在阅读此章节前建议对 [消息系统](./messages.md) 有一定程度的了解。

## 定义扩展和面板

首先我们定义一份 package.json：

```json
{
    "name": "hello-world",
    "main": "./browser.js",
    "panels": {
        "default": {
            "title": "hw",
            "main": "./panel.js"
        }
    },
    "contributions": {
        "messages": {
            "upload": {
                "methods": ["saveData"]
            },
            "query": {
                "methods": ["queryData"]
            }
        }
    }
}
```

然后定义扩展的 main 文件 `browser.js`：

```javascript
exports.methods = {
    saveData(path, data) {
        // 收到数据后缓存起来
        this.cache[path] = data;
    },
    queryData(path) {
        const result = this.cache[path];
        delete this.cache[path];
        return result;
    },
};

exports.load = function() {};
exports.unload = function() {};
```

然后定义面板的 main 文件：

```javascript
const packageJSON = require('./package.json');
exports.ready = async () => {
    const tab = await Editor.Message.request(packageJSON.name, 'query', 'tab');
    const subTab = await Editor.Message.request(packageJSON.name, 'query', 'subTab');
    // 打印查询到的数据
    console.log(tab, subTab):
    // TODO 使用这两个数据初始化
};
exports.close() {
    // 收到数据后上传到扩展进程
    Editor.Message.send(packageJSON.name, 'upload', 'tab', 1);
    Editor.Message.send(packageJSON.name, 'upload', 'subTab', 0);
};
```

## 发送消息

当定义好扩展和扩展里的面板后，就可以尝试触发这些消息。

按下 **ctrl(cmd) + shift + i** 打开控制台。在控制台打开面板，通过下方代码：

```javascript
// default 可以省略，如果面板名字是非 default，则需要填写 'hello-world.xxx'
Editor.Panel.open('hello-world');
```

打开面板后，控制台会打印出一句：

```sh
undefined, undefined
```

这是因为数据还没有提交。关闭这个面板，然后再次打开，这时候控制台打印出了数据：

```sh
1, 0
```

这是因为面板在关闭的时候，发送了两条消息：

```javascript
Editor.Message.send(packageJSON.name, 'upload', 'tab', 1);
Editor.Message.send(packageJSON.name, 'upload', 'subTab', 0);
```

通过这两条消息，消息系统首先根据 messages 里注册的 upload，执行 `saveData` 回调，将数据保存到扩展进程里。当再次打开面板时，通过以下代码查询到刚刚保存的数据，并初始化界面、打印到控制台：

```javascript
const tab = await Editor.Message.request(packageJSON.name, 'query', 'tab');
const subTab = await Editor.Message.request(packageJSON.name, 'query', 'subTab');
```

至此，我们完成了一次面板与扩展进程的交互。
