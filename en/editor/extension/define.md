# Definition of Extension

The extension package needs to have all the features and some basic information predefined in the `package.json` file, as follows.

```JSON5
{
    "package_version": 2,
    "version": "1.0.0",
    "name": "first-panel",
    "tilte": "i18n:first-panel.title",
    "description": "i18n:first-panel.description",
    "author": "Cocos Creator",
    "editor": ">=3.4.2",
    "main": "./dist/main.js",
    "dependencies": { ... },
    "devDependencies": { ... },
    "panels": { ... },
    "contributions": {
    },
    "scripts": {
        "build": "tsc -b",
        "watch": "tsc -w"
    }
}
```

## package_version

Type {number} Required

The version number of the extension, which is used to submit the version verification of the extension, as well as some upgrades of the extension itself, and data migration as a basis for comparison.

## version

Type {string} Required

The version number of the extension, mainly used for display, if you want to make logical judgments, `package_version` is recommended.

## name

Type {string} Required

The name of the extension, this name should correspond to the extension folder.

## title

Type {string} Optional

The title of the extension, when `title` is configured, `title` will be used when the extension needs to be displayed, supports [multi-language (i18n)](./i18n.md) configuration.

## description

Type {string} Optional

The description of the extension, a brief overview of the extension's functionality. Supports [multilanguage (i18n)](./i18n.md) for multilingual syntax.

## author

type {string} optional

The name of the author of the extension, which will be shown in the "Extension Manager".

## editor

type {string} Optional

Description of the editor version supported by the extension, conforming to the [`semver` semantic version control specification](https://semver.org/).

## main

type {string} Optional

A relative path to a js file that defines the function entry file. When the extension starts, the js file pointed to by the `main` field will be executed and the corresponding method will be triggered or executed according to the flow.

## panels

Type {[name: string]: PanelInfo} Optional

The panel information defined within the extension. You can use `Editor.Panel.open('hello-world.list');` to open the defined panel. For details, please refer to [Panel System](./panel.md).

## contributions

type {[name: string]: any} optional

`contributions` provides the ability to interact with the editor's feature system, see the documentation [Enhancements to existing features](./contributions.md).

## scripts

type {[name: string]: any} required

Extends the executable command line.
