# First Panel

The [First Extension](./first.md) documentation describes how to create one of the simplest extensions. Next, this document will help to learn how to create and communicate with a panel.

## Define the panel inside the description file `package.json`

Before using a panel, it is necessary to define it in `package.json`, add the `"panels"` field, and add a message `"open-panel"` in `contributions.messages`, as well as a `"menu"`.

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
            }
        }
    }
}
```

The meaning of the `panel` field can be found in the [Extension Panel](./panel.md) documentation.

### Add `panels/default.js` panel file

In the previous step the entry was defined in the panel data as `panels/default.js` file, which needs to be newly created as follows:

```javascript
'use strict';

// The content of the panel
exports.template = '<div>Hello</div>';

// The style of the panel
exports.style = 'div { color: yellow; }';

// Shortcut selector
exports.$ = {
    elem: 'div',
};

// Hook function that fires when the panel is launched
exports.ready = function() {
    this.$.elem.innerHTML = 'Hello World';
};

// Hook function that fires after the panel is closed
exports.close = function() {};
```

`template` is the `html` content of the panel, `style` is the custom `style`.

For more parameters, please refer to the [Creating A Custom Panel](./panel-boot.md) documentation.

### Adding the openPanel method to the browser

The next step is to add a new openPanel method to the methods of browser.js.

```javascript
'use strict';

// Methods defined within the extension
exports.methods = {
    log() {
        console.log('Hello World');
    },
    openPanel() {
        Editor.Panel.open('hello-world');
    },
};

// Executed when the extension is started
exports.load = function() {};

// Executed when the extension is closed
exports.unload = function() {};
```

The `Editor.Panel.open` method is called in the `openPanel` method, the passed parameters are **extension name** + **.** + **panel name**, or ignored if it is `default`, e.g:

```javascript
Editor.Panel.open('hello-world');
Editor.Panel.open('hello-world.simple');
```

## Refresh extensions

Once the above changes are done and saved, open Cocos Creator again, find and open **Extensions -> Extension Manager** in the top menu bar, and select the extension location (**Global** or **Project**) in the panel. Find the corresponding extension and click the Refresh button, Creator will reload the extension content to make it effective.

Lastly, the new **Open Hello World** button will appear in the top menu bar under **Panels -> Custom**, click it to open the first panel that was created.
