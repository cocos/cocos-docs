# Custom Inspector Panel

Developers with custom inspector needs are advised to first refer to the documentation [Decorator](../../scripting/decorator.md), and if that document meets the requirements, it is recommended that the methods in that document be used first.

The **Inspector** panel, the module in Cocos Creator that displays the currently selected state, provides some basic extension capabilities.

In **Inspector** panel, two levels of data are defined:

1. the main type of the selected object
2. the sub-data types contained in the content when rendering the content of the main type

When a **node** or an **asset** is selected in the **Hierarchy**/**Assets Panel**, Cocos Creator broadcasts the message that the object is selected. When the **Inspector** panel receives the message, it checks the type of the selected object, e.g. if the selected object is a node, then the type is `node`.

For both types, two types of renderers are allowed to be registered.
1. the main type renderer
2. When the main type renderer receives data to start rendering, it allows subtype renderers to be attached

The selected object in the example is `node`, and `node` carries multiple `component`s, so the main type is `node` and the subtype is `component`.

After the **Inspector** receives the broadcast message for the selected object, it first determines the type, and then the **Inspector** takes the received data (the uuid of the object) and passes it to the `node` renderer, handing over the rendering privileges completely.

And in the `node` renderer, the rendering privileges for that region are handed over to the `subtype renderer` when rendering to each `component`, according to its own implementation. For the most part, we don't need to be concerned about this. Let's take a look at a few common ways to customize it.

## Customizing Component Rendering

The default component renderer sometimes doesn't meet our needs, so we need to customize a component's rendering method.

First, create a new script component `CustomLabelComponent.ts` in the project and add a string property with the following content:

```typescript

import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('CustomLabelComponent')
export class CustomLabelComponent extends Component {
    @property
    label = '';

    start () {

    }
}

```

Drag the component to the node and you will see an input box on the component.

Create a new extension and register the following `contributions.inspector` information in the extension's `package.json`:

```json
{
    "contributions": {
        "inspector": {
            "section": {
                "node": {
                    "CustomLabelComponent": "./dist/contributions/inspector/comp-label.js"
                }
            }
        }
    }
}
```

### Automatic Rendering

Write a `src/contributions/inspector/comp-label.ts` file with the following contents:

```typescript
'use strict';

import { methods } from "../../main";

type Selector<$> = { $: Record<keyof $, any | null> }

export const template = `
<ui-prop type="dump" class="test"></ui-prop>
`;

export const $ = {
    test: '.test',
};

export function update(this: Selector<typeof $> & typeof methods, dump: any) {
    // Use ui-porp to auto-render, set the type of prop to dump
    // render pass in a dump data to be able to automatically render the corresponding interface
    // Auto-rendered interface can automatically commit data after modification
    this.$.test.render(dump.label.value);
}
export function ready(this: Selector<typeof $> & typeof methods) {}
```

After compiling and refreshing the extension, we can see that the rendering of the `CustomLabelComponent` component has been taken over.

> **Note**: Each `ui-prop` corresponds to one property, to display multiple properties you need to define multiple `ui-props`.

### Manual Rendering

In the above auto-rendering example, we used a special `ui-prop` of type `dump` for rendering data submission, which allows us to quickly take over the rendering of the component, but if we face some extreme cases but it is difficult to handle some details, we can switch to manual rendering mode, the code is as follows:

```typescript
'use strict';

type Selector<$> = { $: Record<keyof $, any | null> }

export const template = `
<!-- Elements to help submit data -->
<ui-prop type="dump" class="test"></ui-prop>
<!-- The actual rendered elements -->
<ui-label class="label"></ui-label>
<ui-input class="test-input"></ui-input>
`;

export const $ = {
    label:'.label',
    test: '.test',
    testInput: '.test-input',
};

type PanelThis = Selector<typeof $> & { dump: any };

export function update(this: PanelThis, dump: any) {
    // Cache 'dump' data, please hang on 'this', otherwise there may be problems when multiple opening
    this.dump = dump;
    // Pass the 'dump' data to the prop element that helped submit the data
    this.$.test.dump = dump.value.label;
    // Update the data on the input element responsible for 'input' and display
    this.$.testInput.value = dump.value.label.value;
    this.$.label.value = dump.value.label.name;
}
export function ready(this: PanelThis) {
    // Listen for commit events on the input, update the dump data when the input commits data, and use prop to send change-dump events
    this.$.testInput.addEventListener('confirm', () => {
        this.dump.value.label.value = this.$.testInput.value;
        this.$.test.dispatch('change-dump');
    });
}
```

Manual rendering mode still requires data to be submitted via a `ui-prop` element of type `dump`. However, the `html` layout in the `template` is a completely free-handed content that can be displayed in very complex ways depending on the requirements.

## Customizing Asset rendering

When a file is selected in the **Assets** panel, the **Inspector** panel will display the important properties of the currently selected file, or we can customize the rendering if the default display does not meet the requirements.

Add the `contributions.section.asset` field to `package.json` and define a custom rendering script for the corresponding asset type as follows:

```json
{
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

`effect` indicates that we want to customize the rendering of the asset inspector panel for the Cocos Effect (*.effect) file type. Common asset file types are as follows.
- `scene` - Scene files
- `typescript` - TypeScript script files
- `prefab` - prefab files
- `fbx` - FBX files
- `material` - material files
- `directory` - folder
- `image` - image files

You can get the type definition of the file by looking at the `importer` field in the `*.meta` corresponding to the file.

Next, create a new `src/contributions/inspector/asset-effect.ts` script file in the extension directory and write the following code:

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

type Selector<$> = { $: Record<keyof $, any | null> } & { dispatch(str: string): void, assetList: Asset[], metaList: Meta[] };

export const $ = {
    'test': '.test',
};

export const template = `
<ui-prop>
    <ui-label slot="label">Test</ui-label>
    <ui-checkbox slot="content" class="test"></ui-checkbox>
</ui-prop>
`;

type PanelThis = Selector<typeof $>;

export function update(this: PanelThis, assetList: Asset[], metaList: Meta[]) {
    this.assetList = assetList;
    this.metaList = metaList;
    this.$.test.value = metaList[0].userData.test || false;
};

export function ready(this: PanelThis) {
    this.$.test.addEventListener('confirm', () => {
        this.metaList.forEach((meta: any) => {
            // Modify the data in the corresponding meta
            meta.userData.test = !!this.$.test.value;
        });
        // The Assets panel is modifying the meta file of the asset, not the dump data, so the event sent is not the same as the component property modification
        this.dispatch('change');
    });
};

export function close(his: PanelThis, ) {
    // TODO something
};
```

After compiling and refreshing the extension, go back to the Cocos Creator editor interface, select one of the `Cocos Effect` files, and you can find an additional **Test checkbox** at the bottom of the **Inspector** panel.

> **Note**: Multiple extensions register data side by side. If a **Component**/**Asset** already has a custom renderer, any custom renderers registered again will be appended to it. If a **Component**/**Asset** does not have a custom renderer built-in and uses the default renderer, then when the extension registers a custom renderer, it takes over the rendered content completely.
