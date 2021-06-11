# Shortcuts

The shortcut keys in the editor are managed uniformly by the **Shortcut Key Manager**. Each shortcut key needs to be bound to a message. When the shortcut key is pressed, the bound message is triggered.

## Define

```json
{
    "name": "hello-world",
    "panels": {
        "default": {
            "main": "./panel.js"
        }
    },
    "contributions": {
        "messages": {
            "undo": {
                "title": "i18n:hello.messages.undo.title",
                "methods": ["say-undo"]
            }
        },
        "shortcuts": [
            {
                "message": "undo",
                "when": "panel.hello-world",
                "win": "ctrl+z",
                "mac": "cmd+z",
            }
        ]
    }
}
```

For details, please refer to the [Message](./contributions-messages.md) documentation.

`contributions.shortcuts` Parameter Description:

### message

Type `{string}` Required

The message bound to the shortcut key is sent when the shortcut key is triggered.

### when(experimental)

Type `{string}` Optional

> **Note**: this is an experimental feature, this functional syntax may be adjusted in the future.

This shortcut will only be triggered under certain conditions.

`panel.hello-world` will only take effect when the `hello-world` panel gets the focus.

### win

Type `{string}` Required

On the windows platform, the monitored button.

### mac

Type `{string}` Required

On MacOS, monitor keystrokes.
