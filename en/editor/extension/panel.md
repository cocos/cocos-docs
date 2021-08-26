# Extension Panel

When implementing a function, it is likely to require UI interaction on the interface. **Cocos Creator** also provides this ability for extensions.

## Declare the panel in the extension

The panels field can be defined in `package.json`. Example:

```json
{
    "name": "hello-world",
    "panels": {
        "default": {
            "title": "world panel",
            "type": "dockable",
            "main": "./panels/default.js",
            "icon": "./static/default.png"
        },
        "list": {
            "title": "world list",
            "type": "simple",
            "main": "./panels/list.js",
            "icon": "./static/list.png",

            "flags": {},
            "size": {}
        }
    }
}
```

This field is an object, defined as the following:

```typescript
// panels definition
interface PanelMap {
    [name: string]: PanelInfo;
}

// The definition of each panel
interface PanelInfo {
    // Panel title, supports i18n:key format
    title: string;
    // Panel entry, a relative path
    main: string;
    // Panel icon, a relative path
    icon?: string;
    // Panel type, default dockable
    type?:'dockable' |'simple';

    flags?: PanelFlags;
    size?: PanelSize;
}

// Some tags in the panel
interface PanelFlags {
    // Whether to allow zoom, default true
    resizable?: boolean;
    // Need to save, default false
    save?: boolean;
}

// Some size limitations of panel
interface PanelSize {
    width?: number;
    height?: number;
    'min-width'?: number;
    'min-height'?: number;
}
```

## Panel

The panel entry file was defined above when we registered it. Example:

```javascript
// Listen for panel events
exports.listeners = {
    // The hook triggered when the panel is displayed
    show() {},
    // The hook triggered when the panel is hidden
    hide() {},
};

// The contents of the panel
exports.template = '<div>Hello</div>';
// Styles on the panel
exports.style = 'div { color: yellow; }';
// Quick selector
exports.$ = {
    elem: 'div',
};

// The hook function that is triggered when the panel starts
exports.ready = function() {
    this.$.elem.innerHTML = 'Hello World';
};

// A function that fires when the panel is ready to close, and returns false terminates the panel
exports.beforeClose = function() {};

// The hook function after the panel is closed
exports.close = function() {};
```

In addition, we have defined a list panel, and we also need to write a `list.js` file in the above format.
