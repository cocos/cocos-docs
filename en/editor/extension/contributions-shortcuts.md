# Extending Shortcut

Shortcut keys within the editor are managed by the "Shortcut Key Manager". Each shortcut key can be bound to a message, and when the shortcut key is pressed, the bound message will be triggered.

## Defining Shortcut

Defining the shortcuts needs to be done in the `contributions.shortcuts` field of `package.json`, as follows:

```json5
// package.json
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
                "when": "panelName === 'hello-world'",
                "win": "ctrl+z",
                "mac": "cmd+z",
            }
        ]
    }
}
```

In this example, we define a shortcut key for the **undo** operation, which is `CTRL + Z` on Windows and `CMD + Z` on macOS.

When the corresponding shortcut key is pressed, the `undo` message is sent.

> **Note**: This message needs to be defined in `contributions.messages`, please refer to the documentation [Customized Messages](./contributions-messages.md).

## Parameter descriptions

Let's take a look at the details of each parameter of `contributions.shortcuts`.

### message

Type {string} Required

Shortcut-bound message that will be sent when this shortcut is triggered. Shortcut pressed messages can only be sent to the current extension.

### when

Type {string} Optional

The shortcut will be triggered only under certain conditions.

`"when": "PanelName === 'hello-world'"` means that the `message` message will be sent when the shortcut key is pressed when the panel name that gets focus is `hello-world`.

### win

type {string} required

On Windows platform, the keystroke to listen to.

### mac

Type {string} Required

On macOS, the keystroke to listen to.
