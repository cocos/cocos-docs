# Main Menu

There is a main menu bar at the top of the editor, which can be used in the extensions.

## Register

When the extension needs to add a menu, just fill in the `contributions.menu` object. For example, we add a menu item in the `Extension`:

```json
{
    "name": "hello-world",
    "contributions": {
        "messages": {
            "open-panel": {
                "methods": ["openPanel"]
            }
        },
        "menu": [
            {
                "path": "i18n:menu.extension",
                "label": "Open Hello World",
                "icon": "./static/icon.png",
                "message": "open-panel"
            }
        ]
    }
}
```

Then the editor will add an **Open Hello World** menu in the **Extension**. After clicking this menu, an openPanel message will be sent to the registered extension. Then trigger the `openPanel` method in the extension.

### path

Type `{string}` Required

Search path of the top menu:

- i18n:menu.project
- i18n:menu.node
- i18n:menu.panel
- i18n:menu.extension
- i18n:menu.develop

You can also fill in multi-level menus, such as `i18n:menu.extension/Hello World`.

### label

Type `{string}` Required

The name of the menu item.
Supports `i18n:key` syntax.

### icon

Type `{string}` Optional

Menu icon, passing in an icon relative path.

### message

Type `{string}` Optional

Message triggered after menu click.
