# Extensions for the Inspector Panel

The **Inspector** module displays all the available properties of the currently selected node. It can be enhanced with a variety of extensions.

Data are defined in 2 layers in the Inspector:

1. Data type of the current selection
2. Data types of all the child components when the current selection is being rendered

As a node/asset is selected in the **Inspector**/**Assets** panel, Cocos Creator will notify the **Inspector** to check the data type of the selection. For instance, if a node is selected, the selection is identified as `node`.

Depending on the data type identified, it can be registered with 2 types of renderers:
1. Renderer for the parent object
2. Renderers for the child components attached to the parent object, which will be assigned when the parent object starts rendering

In the sample code below, a `node` is selected in scene which is attached with a `component`. The parent object is identified as a `node` and the child component `cc.label`.

As the **Inspector** is notified by the broadcast of the object being selected, the data type of the node will be identified first. Afterwards the **Inspector** will transfer the data received (uuid of the selected node) to the renderer assigned and authorize rendering to be initialized.

As the node selected is being rendered, rendering is authorized for all the components attached to the node and their respective renderers.

## Customizing Component Rendering

To customize a component’s rendering process, it is prerequisite to register the component in the package.json file of the extension package.

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

The code above is translated as: Under contributions, provide the Inspector with a set of data requesting the cc.label components of all nodes in the rendering section.

Next, create a `./dist/contributions/inspector/comp-label.js` file:

```typescript
'use strict';

module.exports = Editor.Panel.define({
    $: {
        button: 'ui-button[slot=content]',
    },
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

`Editor.Panel.define` is new in v3.3 designated to combine relevant data interfaces.

To offer backwards compatibility, the following code should also be added:

```typescript
Editor.Panel.define = Editor.Panel.define || function(panel: any) {return panel;}
```

The sample code above will add a new button to the Label components in the Inspector.

Please note that data registered by extensions are processed parallel to each other. If one component is already registered by one extension or included its customized renderer, all the following customization will be added to the end of existing ones. Otherwise if the component is using its default renderer, the customized renderer will overridden the default renderer.

## Customizing Assets Rendering

The Assets panel can be extended in the same fashion:

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

The code above is translated as: Under contributions, provide the Inspector with a set of data requesting the effect resources of all assets in the rendering section.

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

// backwards compatibility for prior to v3.3
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

The sample code above will add a new button to the effect files in the Inspector.

Please note that data registered by extensions are processed parallel to each other. If one resource is already registered by one extension or included its customized renderer, all the following customization will be added to the end of existing ones. Otherwise if the resource is using its default renderer, the customized renderer will overridden the default renderer.

## More customization

[Attribute Decorators](../../scripting/decorator.md)
