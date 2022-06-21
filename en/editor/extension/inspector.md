# Extended Inspector panel

The **Inspector** panel provides some basic extension capabilities as the module in Creator that displays the currently selected state.

In **Inspector** panel, two levels of data are defined:

1. the main type of the selected object
2. the sub-data types contained in the content when rendering the content of the main type

When a node/asset is selected in the **Hierarchy Panel**/**Assets Panel**, Creator sends a broadcast message that the object is selected to the **Inspector**. When the **Inspector** panel receives the message, it checks the type of the selected object, e.g. if the selected object is a node, then the type is `node`.

For both types, two types of renderers are allowed to be registered.
1. The main type renderer
2. When the main type renderer receives data to start rendering, it allows subtype renderers to be attached

In the example, `node` is selected, and `node` carries multiple `component`, so the primary type is `node` and the subtype is `component`.

After the **Inspector Panel** receives the broadcast message for the selected object, it first determines the type, and then the **Inspector Panel** takes the received data (the uuid of the object) and passes it to the `node` renderer, handing over the rendering privileges completely.

And in the `node` renderer, the rendering privileges for that region are handed over to the `subtype renderer` when rendering to each `component`, according to its own implementation. For the most part, we don't need to be concerned about this. Let's take a look at a few common ways to customize it.

## Custom Component Rendering

The component renderer provided by default sometimes does not meet our needs, so we can register a piece of data in the extension's package.json like this:

```json
{
    "name": "extension",
    "editor": ">=3.3.0",

    "contributions": {
        "inspector": {
            "section": {
                "node": {
                    "cc.Label": "./dist/contributions/inspector/comp-label.js"
                }
            }
        }
    }
}
```

In the contributions data, provide a copy of the data to the **Inspector Panel** requesting the rendering of the cc.Label component in the node-type object in the section area.

Then let's write a . /dist/contributions/inspector/comp-label.js file as follows:

```typescript
'use strict';

module.exports = Editor.Panel.define({
    $: {
        button: 'ui-button[slot=content]',
    }.
    template: `
<ui-prop>
    <ui-label value="Button" slot="label"></ui-label>
    <ui-button slot="content">Console</ui-button>
</ui-prop>
    `,
    update(dump: any) {
        // TODO something
    },
    ready() {
        this.$.button.addEventListener('confirm', () => {
            console.log('Custom Inspector: Label Button...');
        });
    },
    close() {
        // TODO something
    },
});
```

Editor.Panel.define is a new interface added in v3.3, mainly for merging some data.

If you need to be compatible with the previous version, you can add a line:

```typescript
Editor.Panel.define = Editor.Panel.define || function(panel: any) {return panel;}
```

This allows us to add a button to the end of the Label component inside the inspector.

It is important to note here that data registered by multiple plugins are co-existing. If a Component already has other plugins registered or has a custom renderer built in, then any custom renderer registered again will be appended to it. If a Component does not have a built-in custom renderer and is using the default rendering, then when the plug-in registers the renderer, it will take over the rendering content completely.

## Custom Asset rendering

If the official inspector panel does not meet the needs, we can also extend the custom panel with.

```json
{
    "name": "extension",
    "editor": ">=3.3.0",
    "contributions": {
        "inspector": {
            "section": {
                "asset": {
                    "effect": "./dist/contributions/inspector/asset-effect.js"
                }
            }
        }
    }
}
```

As with Component registration, in the contributions data, provide a copy of the data to the **Inspector Panel** requesting the rendering of the "effect" resource in the "asset" type in the "section" area.

```typescript
'use strict';

interface Asset {
    displayName: string;
    file: string;
    imported: boolean;
    importer: string;
    invalid: boolean;
    isDirectory: boolean;
    library: {
        [extname: string]: string;
    };
    name: string;
    url: string;
    uuid: string;
    visible: boolean;
    subAssets: {
        [id: string]: Asset;
    };
}

interface Meta {
    files: string[];
    imported: boolean;
    importer: string;
    subMetas: {
        [id: string]: Meta;
    };
    userData: {
        [key: string]: any;
    };
    uuid: string;
    ver: string;
}

// Compatible with versions prior to v3.3
Editor.Panel.define = Editor.Panel.define || function(panel: any) {return panel;}

module.exports = Editor.Panel.define({
    $: {
        button: 'ui-button[slot=content]',
    },
    template = `
<ui-prop>
    <ui-label value="Button" slot="label"></ui-label>
    <ui-button slot="content">Console</ui-button>
</ui-prop>
    `,
    update(assetList: Asset[], metaList: Meta[]) {
        // TODO something
    },
    ready() {
        // @ts-ignore
        this.$.button.addEventListener('confirm', () => {
            console.log('Custom Inspector: Label Button...');
        });
    },
    close() {
        // TODO something
    },
});
```

This allows us to add a button at the end of the effect inspector.

Also note here that data registered by multiple plugins is co-existing. If an Asset already has other plugins registered or has a custom renderer built in, then any custom renderers registered again will be appended to it. If an Asset does not have a built-in custom renderer and uses the default rendering, then when the plug-in registers the renderer, it will completely take over the rendered content.

## More ways to customize Inspector

[Decorator](../../scripting/decorator.md)
