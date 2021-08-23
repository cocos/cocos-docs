# First Data Interaction

We covered how to create extensions and how to define panels in extensions in the previous two documents **First Extension** and **First Panel**, next we will try to communicate between them with this document.

## Define the message inside the description file package.json

First we need to add a message `"increasing"` to the browser in `contributions.messages`. Then add a `"hello-world:increasing"` message for the default panel to handle.

```json
{
    "name": "hello-world",
    "version": "1.0.0",
    "main": "./browser.js",
    "description": "a simple extension",
    "panels": {
        "default": {
            "title": "simple panel",
            "main": "./panels/default.js"
        }
    },
    "contributions": {
        "menu": [
            {
                "path": "Develop",
                "label": "test",
                "message": "log"
            }, {
                "path": "i18n:menu.panel/Custom",
                "label": "Open Hello World",
                "message": "open-panel"
            }
        ],
        "messages": {
            "log": {
                "methods": ["log"]
            },
            "open-panel": {
                "methods": ["openPanel"]
            },
            "increasing": {
                "methods": ["increasing"]
            },
            "query-num": {
                "methods": ["queryNum"]
            },
            "hello-world:increasing": {
                "methods": ["default.increasing"]
            }
        }
    }
}
```

`hello-world:increasing` means listening for an increasing message on hello-world. `default.increasing` means that the default panel's `increasing` method will handle it.

The meaning of the panel field can be found in [Creating A Custom Panel](./panel-boot.md).

### Add increasing in browser.js

Then you need to add a new `increasing` method to `methods` in `browser.js`, which is responsible for recording a `num` and incrementing it and broadcasting it each time it is triggered.

```javascript
'use strict';

let num = 0;
// Method defined within the extension
exports.methods = {
    log() {
        console.log('Hello World');
    },
    openPanel() {
        Editor.Panel.open('hello-world');
    },
    queryNum() {
        return num;
    },
    increasing() {
        num++;
        Editor.Message.broadcast('hello-world:increasing', num);
    },
};

// Executed when the extension is started
exports.load = function() {};

// Executed when the extension is closed
exports.unload = function() {};
```

### Adding increasing button and broadcast handling to the panel

Next, add an **increasing** button to the interface, as well as an area to display num and receive broadcast messages for num changes.

```javascript
'use strict';

// The content of the panel
exports.template = `
<div>Hello</div>
<div><ui-button>increasing</ui-button></div>
<div><span>Num: </span><span class="num">-</span></div>
`;

// The style of the panel
exports.style = 'div { color: yellow; }';

// Shortcut selector
exports.$ = {
    elem: 'div',
    button: 'ui-button',
    num: '.num',
};

exports.methods = {
    increasing(num) {
        this.$.num.innerHTML = num;
    },
};

// Hook function that fires when the panel is launched
exports.ready = async function() {
    this.$.elem.innerHTML = 'Hello World';

    this.$.button.addEventListener('confirm', () => {
        Editor.Message.send('hello-world', 'increasing');
    });

    this.$.num.innerHTML = await Editor.Message.request('hello-world', 'query-num');
};

// Hook function that fires after the panel is closed
exports.close = function() {};
```

## Refresh extensions

Once the above changes are done and saved, open Cocos Creator again, find and open **Extensions -> Extension Manager** in the top menu bar, and select the extension location (**Global** or **Project**) in the panel. Then find the corresponding extension and click the Refresh button, Creator will reload the extension content to make it effective.

Then the new **Open Hello World** option will appear in the **Panel -> Custom** on the top menu bar, click it to open it.
