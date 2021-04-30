# Communicate with the Panel

In general, the interaction model is dominated by __extension process__ and __panel__ for data presentation. Similarly to the traditional Web, the __plug-in__ function is the server side, and the __panel__ function is the browser on the client's computer.

In this case, there is usually no direct data sent to the panel, the majority is some state synchronization, just using __broadcast__ to broadcast.

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

## Send a message

Once we have defined the extension and the panels within the extension, we can try to trigger these messages.

Press __CTRL (CMD) + Shift + I__ to open the console. Open the panel in the console:

 ```javascript
 Editor.Panel.open('hello-world');
 Editor.Message.send('hello-world', 'console', 'log');
 ```

When the __Hello World__ plug-in receives a message, it passes it to the `methods.console` in `panel.js` for processing.

The result is printing a string to the __log__ on the console.
