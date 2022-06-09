# Extend existing functionality

**Cocos Creator** supports contributions between extensions.

When writing an extension, it is possible to query whether the existing functions in the editor provide the ability of receiving `contributions` externally.

If there are functions that provide the ability of receiving `contributions` externally, use these functions when writing extensions.

## Contributions Data definition

The `contributions` function, uniformly defined in the `contributions` field in `package.json`, is as follows.

```JSON5
{
    "name": "hello-world",
    "contributions": {
        "builder":{ ... },
        "assets":{ ... },
        "profile": { ... },
        "scene": { ... },
        "menu": [ ... ],
        "inspector":{ ... },
        "messages": { ... },
        "shortcuts": { ... },
        "preferences": { ... },
        "project": { ... }
    },
}
```

## Field Descriptions

`contributions` provides the ability to interact with the editor's various functional systems, the main functions involved are as follows:

- `builder` - custom build process, please refer to the documentation [Extending Build Process](../publish/custom-build-plugin.md) for details.

- `assets` - Enhanced Explorer panel, please refer to the documentation for more details [Extending the Assets Panel](../assets/extension.md).

- `profile` - defines the configuration needed for the extension, see the documentation [Configuration System](./profile.md).

- `scene` - Write scripts in the extension that need to interact with the engine and project scripts, see the documentation [Calling the Engine API](./scene-script.md).

- `inspector` - custom **Inspector** panel, see the documentation [Custom Property Inspector Panel](./inspector.md).

- `menu` - defines the menu information that the extension needs to add, see the documentation [Customize the Main Menu](./contributions-menu.md).

- `messages` - defines the list of messages that the extension needs to use, please refer to the documentation [Custom Messages](./contributions-messages.md).

- `shortcuts` - defines the shortcuts required by the extension, see the documentation [Extending Shortcut](./contributions-shortcuts.md).

- `preferences` - customize the preferences, see the documentation [Extending the Preferences Panel](./contributions-preferences.md).

- `project` - Custom project settings, see the documentation [Extending Project Settings Panel](./contributions-project.md).
