# Communicate with the Panel

> **NOTE**: After v3.5, we updated the extension documentation, so this documentation is deprecated, please move to [Message System](./messages.md) or [Customized Messages](./contributions-messages.md) for more information. If you see this document online, please post an issue on [github](https://github.com/cocos/cocos-docs/issues/new) and let the official staff know how to handle it.

In general, the interaction model is dominated by **extension process** and **panel** for data presentation. Similarly to the traditional Web, the **plug-in** function is the server side, and the __panel__ function is the browser on the client's computer.

In this case, there is usually no direct data sent to the panel, the majority is some state synchronization, just using **broadcast** to broadcast.

But for simple extensions, or extensions to the browser environment, the actual functionality may be on the panel, and a request needs to be sent to the panel.

Some level of understanding of the [Message System](./messages.md) is required before reading this section.

## Define methods on extensions and panels

First we define the file: `package.json`

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

The method name defined by methods in `messages.console` is `default.console`. Represents a console method issued to the `default` panel.
(to send to the plug-in process, fill in `methdName` directly)

Then define the `panel.js` file of the panel:

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

Typescript

```typescript
export const template = '';
export const style = '';

export const methods = {
    console(str: string) {
        console.log(`console: ${str}`);
    },
};

export async function ready() {};

export function close() {};
```

## Send a message

Once we have defined the extension and the panels within the extension, we can try to trigger these messages.

Press **CTRL (CMD) + Shift + I** to open the console. Open the panel in the console:

 ```javascript
 // default can be omitted, if the panel name is non-default, then you need to fill in 'hello-world.xxx'
 Editor.Panel.open('hello-world');
 // Send a console message to the hello-world plugin
 Editor.Message.send('hello-world', 'console', 'log');
 ```

When the **Hello World** plug-in receives a message, it passes it to the `methods.console` in `panel.js` for processing.

The result is printing a string to the **log** on the console.

At this point, we have completed one interaction with the panel.
