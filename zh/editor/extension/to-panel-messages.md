# 与面板通信

一般情况下，扩展的交互方式是以 "扩展进程" 为主，"面板" 做数据展示。对应在 “Web” 上就是 "扩展" 功能是服务端，"面板" 功能是客户电脑上的浏览器。这种情况下，一般不会直接发送数据给面板，更多的是对面板做一些状态的同步，使用广播（broadcast）即可。但一些需要浏览器环境的扩展，实际功能可能放在面板上，这时候就需要向面板发送请求。

此功能需求依赖消息系统，因此，在阅读此章节前建议对 [消息系统](./messages.md) 有一定程度的了解。

## 定义扩展和面板

首先定义 `package.json`：

```json
{
    "name": "hello-world",
    "panels": {
        "default": {
            "title": "hw",
            "main": "./panel.js"
        }
    },
    "contributions": {
        "messages": {
            "console": {
                "methods": ["default.console"]
            }
        }
    }
}
```

`messages.console` 里的 `methods` 定义的方法名称是 `default.console`（"面板字段名.执行方法名"）。表示发给 `default` 面板里的 `console` 方法(发送到插件进程的话，是直接填写 `methodName`)。

然后定义面板的 `panel.js` 文件：

```javascript
exports.template = '';
exports.style = '';

exports.methods = {
    console(str) {
        console.log(str);
    },
};

exports.ready = async function() {};

exports.close = function() {};
```

## 发送消息

当我们定义好扩展和扩展面板后，就可以尝试触发这些消息。

按下 `ctrl(cmd) + shift + i` 打开控制台。在控制台打开面板:

 ```javascript
 // default 可以省略，如果面板名字是非 default，则需要填写 'hello-world.xxx'
 Editor.Panel.open('hello-world');
 // 向 hello-world 插件发送一个 console 消息
 Editor.Message.send('hello-world', 'console', 'log');
 ```

`hello world` 插件收到消息后，会转给 `panel.js` 里的 `methods.console` 进行处理。所以会在控制台输出一个字符串 `log`

至此，完成了一次与面板的直接交互。
