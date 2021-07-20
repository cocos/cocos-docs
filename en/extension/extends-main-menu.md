# Extends Main Menu

Cocos Creator's main menu can be extended by putting `main-menu` field in the `package.json`, and then add the menu path and options as key-value pair in it. Example:

```json
{
  "main-menu": {
    "Examples/FooBar/Foo": {
      "message": "my-package:foo"
    },
    "Examples/FooBar/Bar": {
      "message": "my-package:bar"
    }
  }
}
```

The snapshot above shows us how to add the menu items "Foo" and "Bar" in the path of **Example -> Foobar**. When the menu item is clicked , it will send the IPC message to the main process which is defined in `message` field.

For instance, when "Foo" is clicked, it will send the message `my-package:foo`.

## Menu Path

The key `main-menu` is the menu path that needs to be added to the main menu. The menu path uses the POSIX path formation, which is using `/` as the separator. When Cocos Creator loads the `main-menu` package, it starts searching the menu item by the menu path provided. When the target menu item is not found, Cocos Creator will help by creating a sub-menu automatically, otherwise it will use the existing menu and insert the menu in it.

## Warnings and errors during main menu reigstry

### The menu path already exists

This can be happen when several packages uses the same path. The first loaded package will take the path, and the other ones will raise an error when it registers.

### The ancient path of the menu path already exists, and its type is not a sub-menu

This is similar to the last case, except the conflict comes from the parent path or the parent's parent. Example:

```json
{
  "main-menu": {
    "Examples/FooBar": {
      "message": "my-package:foo"
    },
    "Examples/FooBar/Bar": {
      "message": "my-package:bar"
    }
  }
}
```

In the example, "Example/Foobar" is registered first. Next, "Examples/Foobar/Bar" is registered. The second menu path does indeed require that "Foobar" be a sub-menu, however the first menu registred already uses "Foobar" as a menu-item. This makes the second menu path fail to register.

## i18n

The menu path supports the i18n format. The path can be written as `i18n:examples/i18n:foobar` and Cocos Creator will help to search the i18n ID and replace the path item.

## Menu Options

The `message` option was already used in the above example. There are many other options as well, such as: icon, accelerator, type, etc.. For additional options, please review the [main-menu Reference](reference/main-menu-reference.md) documentation.
