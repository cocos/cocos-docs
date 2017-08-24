# 标准网络接口

在 Cocos Creator 中，我们支持 Web 平台上最广泛使用的标准网络接口：

- **XMLHttpRequest**：用于短连接
- **WebSocket**：用于长连接

当然，在 Web 平台，浏览器原生就支持这两个接口，之所以说 Cocos Creator 支持，是因为在发布原生版本时，用户使用这两个网络接口的代码也是可以运行的。也就是遵循 Cocos 一直秉承的 “一套代码，多平台运行” 原则。

## 使用方法

1. XMLHttpRequest
    简单示例：

    ```
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
            var response = xhr.responseText;
            console.log(response);
        }
    };
    xhr.open("GET", url, true);
    xhr.send();
    ```

    开发者可以直接使用 `new XMLHttpRequest()` 来创建一个连接对象，也可以通过 `cc.loader.getXMLHttpRequest()` 来创建，两者效果一致。

    `XMLHttpRequest` 的标准文档请参考 [MDN 中文文档](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest)。

2. WebSocket

    简单示例：

    ```
    ws = new WebSocket("ws://echo.websocket.org");
    ws.onopen = function (event) {
        console.log("Send Text WS was opened.");
    };
    ws.onmessage = function (event) {
        console.log("response text msg: " + event.data);
    };
    ws.onerror = function (event) {
        console.log("Send Text fired an error");
    };
    ws.onclose = function (event) {
        console.log("WebSocket instance closed.");
    };

    setTimeout(function () {
        if (ws.readyState === WebSocket.OPEN) {
            ws.send("Hello WebSocket, I'm a text message.");
        }
        else {
            console.log("WebSocket instance wasn't ready...");
        }
    }, 3);
    ```

    `WebSocket` 的标准文档请参考 [MDN 中文文档](https://developer.mozilla.org/zh-CN/docs/Web/API/WebSocket)。

## SocketIO

除此之外，SocketIO 提供一种基于 WebSocket API 的封装，可以用于 Node.js 服务端。如果需要使用这个库，开发者可以自己引用 SocketIO。

在脚本中引用 SocketIO：

1. 下载 SocketIO：[下载地址](http://socket.io/download/)
2. 将下载后的文件放入拖入资源管理器中你希望保存的路径
3. 修改 SocketIO 脚本文件以避免在原生环境中被执行

    由于 Web 版本 SocketIO 不能够在 JSB 中被正确解析，因此 Cocos 在原生环境中自带了 SocketIO 实现。所以我们需要一点 hack 的手段让 Web 版本 SocketIO 的脚本在原生环境中不生效，方法就是在 SocketIO 脚本文件中做如下修改：

    ```
    if (!cc.sys.isNative) {
        // SocketIO 原始代码
    }
    ```

4. 将 SocketIO 脚本文件设为 [插件脚本](./plugin-scripts.html)，这样在组件中直接使用 window.io 就能访问到 SocketIO
5. 在组件中使用 SocketIO，可以参考 [SocketIO 官方网站](http://socket.io/)查询 API 和文档等
