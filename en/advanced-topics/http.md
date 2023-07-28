# HTTP Request

In some cases, it may be necessary to make requests to a server to fetch data. In Cocos Creator, you can use the fetch method, which is part of JavaScript.

The prototype is defined as follows.

```ts
declare function fetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response>;
```

## Setting Up a Test Sever

First, set up a simple HTTP server using a backend language you are familiar with. Non-backend developers can skip this section. In this example, we'll use Golang to set up the server. Here is an example code:

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

The above code will set up a network server listening on port 8080.

## Making an HTTP Request

In Cocos Creator, you can use the `fetch` method to make requests to the server. In this example, we'll use the `GET` method to request data from the server and expect the server to respond with text data. Here's an example code:

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

After running the scene, the following log will be printed:

```bash
> http request received.
```

You can also use `response.json()` to retrieve the response in JSON format.

You can refer to the [MDN Web Docs](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch) for more detailed information.
