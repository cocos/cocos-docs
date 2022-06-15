# Panel and Extension Communication

> **NOTE**: After v3.5, we updated the plugin documentation, so this documentation is deprecated, please move to [Message System](./messages.md) or [Customized Messages](./contributions-messages.md) for more information. If you see this document online, please post an issue on [github](https://github.com/cocos/cocos-docs/issues/new) and let the official staff know how to handle it.

Some useful tools or simple functions can be written directly on the panel, but the panel is not a reliable data storage location. The window may be closed at any time, and the panel will also be closed.

The most common example is that a panel is dragged and docked to the main window. At this time, the panel will be closed first and then reopened in the main window. If the data in the memory used on the panel is not stored and backed up, it will be lost with restart.

At this time, a certain degree of data interaction is required with the extended main body.

Before reading this chapter, please review the [Message System](./messages.md) documentation.

## Define the method of extending the top and panel

**First**, define a `package.json`:

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

**Second**, define the extended main file `browser.js`:

```javascript
exports.methods = {
    saveData(path, data) {
        // Cache it after receiving the data
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

Typescript

```typescript
interface PackagelItem {
    cache: {
        [path: string]: any;
    }
}
export const methods = {
    saveData(this: PackagelItem, path: string, data: any) {
        // 收到数据后缓存起来
        this.cache[path] = data;
    },
    queryData(this: PackagelItem, path: string) {
        const result = this.cache[path];
        delete this.cache[path];
        return result;
    },
};

export function load() {};
export function unloal() {};
```

**Last**, define the main file of the panel:

```javascript
const packageJSON = require('./package.json');
exports.ready = async () => {
    const tab = await Editor.Message.request(packageJSON.name, 'query', 'tab');
    const subTab = await Editor.Message.request(packageJSON.name, 'query', 'subTab');

    // Print the queried data
    console.log(tab, subTab):
    // TODO uses these two data to initialize
};
exports.close() {
    // Upload the data to the extension process after receiving the data
    Editor.Message.send(packageJSON.name, 'upload', 'tab', 1);
    Editor.Message.send(packageJSON.name, 'upload', 'subTab', 0);
};
```

Typescript

```typescript
import { name } from './package.json';
exports.ready = async () => {  
    const tab = await Editor.Message.request(name, 'query', 'tab');
    const subTab = await Editor.Message.request(name, 'query', 'subTab');
    // 打印查询到的数据
    console.log(tab, subTab):
    // TODO 使用这两个数据初始化
};
exports.close() {
    // 收到数据后上传到扩展进程
    Editor.Message.send(name, 'upload', 'tab', 1);
    Editor.Message.send(name, 'upload', 'subTab', 0);
};
```

## Send a message

After defining the extension and the panels in the extension, we can try to trigger these messages.

Press **ctrl(cmd) + shift + i** to open the console. Open the panel in the console:

```javascript
// Default can be omitted, if the panel name is not default, you need to fill in'hello-world.xxx'
Editor.Panel.open('hello-world');
```

After opening the panel, the console will print out a sentence:

```sh
undefined, undefined
```

This is because the data has not yet been submitted. Now, close this panel and open it again. At this time, the console prints out the data:

```sh
1, 0
```

Because when the panel is closed, two messages are sent:

```javascript
Editor.Message.send(packageJSON.name, 'upload', 'tab', 1);
Editor.Message.send(packageJSON.name, 'upload', 'subTab', 0);
```

Through these two messages, the Message system first saves the data to the extension process according to the upload definition in messages `"methods": ["saveData"]`.

When opening the panel again, use the following code to query for the data you just saved, initialize the interface, and print to the console.

```javascript
const tab = await Editor.Message.send(packageJSON.name, 'query', 'tab');
const subTab = await Editor.Message.send(packageJSON.name, 'query', 'subTab');
```

At this point, we have completed an interaction between the panel and the extension process.
