# Customize the Main Menu

There is a main menu bar at the top of the editor, and it is easy to add your own menu in this menu bar within the extension.

## Registering menus

When an extension needs to add a menu, just fill in the `contributions.menu` object. For example, if we add a menu item to the "Extensions" menu, we can modify `package.json` with the following code example:

```json5
{
    // package.json
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

The above configuration information will add a new "Open Hello World" menu in the "Extensions" menu of the editor. Clicking this menu will send an `open-panel` message to the current extension according to the message configuration, which will be triggered if the current extension is configured to listen to this message and the corresponding `openPanel` handler.

For the definition of messages, please refer to the documentation [Customized Messages](./contributions-messages.md).

Let's look at the meaning of the fields in the `menu` object.

### path

type {string} required

The format is: [top existing menu path][/path1][/path2], and the following is reasonable.
- `i18n:menu.extension` - with the extension menu as the parent menu
- `i18n:menu.extension/Hello World` - adds a `Hello World` menu item to the extension menu as a parent menu
- `MyMenu` - Adds a `MyMenu` menu to the top menu bar as a parent menu
- `MyMenu/Hello World` - adds a `MyMenu` to the top menu bar and adds a `Hello World` menu item as a parent

In the top menu bar, the pre-defined menus are
- i18n:menu.project - the "Project" menu
- i18n:menu.node - the "Node" menu
- i18n:menu.panel - "Panel" menu
- i18n:menu.extension - "Extensions" menu
- i18n:menu.develop - "Developers" menu

### label

Type {string} Required

The name of the menu item, supports i18n:key syntax.

### icon

Type {string} Optional

Relative path to the icon of the menu, the material used by the extension is usually placed under a folder named `static`, if it doesn't exist, create a new one.

### message

Type {string} Optional

The message that will be triggered when the menu is clicked, this message needs to be defined in `contributions.messsages` first.
