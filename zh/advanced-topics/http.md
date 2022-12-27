# HTTP 请求

在某些情况下，可能需要向网络后端请求一些数据，在 Cocos Creator 里面可以通过 `fecth` 方法，`fecth` 方法是 JavaScript 的一部分：

```ts
declare function fetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response>;
```

## 搭建服务

首先通过自身熟悉的后端语言搭建一个简易的 http 服务，非后端开发人员可忽略本段。本示例中采用 golang 搭建，代码示例如下：

```go
package main

import (
"fmt"
"log"
"net/http"
)

func handler(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintf(w, "http request received")
}

func main() {
    http.HandleFunc("/", handler)
    log.Fatal(http.ListenAndServe(":8080", nil))
}
```

上述代码会搭建一个监听在 8080 端口的网络服务器。

## 创建 Http 请求

在 Cocos Creator 里面通过 `fetch` 方法向服务器请求数据，此处以 `GET` 方法为例，并以文本格式返回服务器的数据，代码示例如下：

```ts
import { _decorator, Component } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('HttpTest')
export class HttpTest extends Component {
    start() {

        fetch("http://127.0.0.1:8080").then((response: Response) => {
            return response.text()
        }).then((value) => {
            console.log(value);
        })
    }
}
```

运行场景后会打印如下日志：

```bash
> http request received.
```

也可通过 `respoonse.json()` 来获取 JSON 格式的返回。

您可以通过 [MDN Web Doc 社区](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch) 来查看更多详细的信息。
