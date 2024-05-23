# Definition of extension

The extension package needs to be pre-defined with some basic information that needs to be filled in and stored in the `package.json` file.

```json
{
    "name": "hello-world",
    "version": "1.0.0",
    "author": "Creator",
    "description": "description",

    "main": "./browser.js",

    "panels": {
        "default": {
            ...
        },
        "list": {
            ...
        }
    },

    "contributions": {}
}
```

## name

Type: `{string}` Required

The name of the extension, this name needs to correspond to the extension folder one-to-one.

## version

Type `{string}` Required

The version number of the extension is used to submit the version verification of the extension, as well as some upgrades of the extension itself, and the data migration is used as the basis for comparison.

## author

Type `{string}` Optional

The name of the extension author will be displayed in the **Extension Manager**.

## description

Type `{string}` Optional

The description of the extension, briefly summarize the function of the extension. Support `i18n:key` grammar.

## main

Type `{string}` Optional

The relative path of a js file defines the function entry file. When the extension starts, the JavaScript file pointed to by the main field will be executed, and the corresponding method will be triggered or executed according to the process.

## panels

Type `{[name: string]: PanelInfo}` Optional

Panel information defined in the extension. Use `Editor.Panel.open('hello-world.list');` to open the defined panel. For more information, please refer to the [Panel](./panel.md) documentation.

## contributions

Type `{[name: string]: any}` Optional

Extend existing functions, and customize some other function modules that are open to the outside world. For more information, please refer to the [Contributions](./contributions.md) documentation.
