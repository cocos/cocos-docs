# Extends Main Menu

We can extends the Cocos Creator's main menu by putting `main-menu` field in `package.json`, and then add your menu path and options as key-value pair in it. Here is an example:

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

The snapshot above shows us how to add menu items "Foo" and "Bar" in the path "Example" > "Foobar". When we click the menu item, it will sending the IPC message to our main process which defined in `message` field.

For instance, when we click "Foo" it will send the message `my-package:foo`.

## Menu Path

The keys of `main-menu` is the menu path we want to add to main menu. The menu path uses posix path formation, which use `/` as the separator. When Cocos Creator load package's `main-menu`, it start search menu item by the menu path we provide. When the target menu item is not found, Cocos Creator will help us create a sub-menu automatically, otherwise it will use the exists menu and insert the menu in it.

We might meed warnings and errors during main menu reigstry:

### The menu path already exists

This can be happen when several packages uses the same path. The first loaded package will take the path, and the other ones will raise an error when it register.

### The ancient path of the menu path already exists, and its type is not a sub-menu

This is similar to the last case, except the conflict come from the parent path or parent's parent:

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

Let's see the example, we first register a menu path "Example/Foobar", after that we try to register "Examples/Foobar/Bar". The second menu path indeed require the "Foobar" to be a sub-menu, but the first time registry already use "Foobar" as a menu-item, and this makes the second menu path register failed.    

## i18n

The menu path support i18n format. We can write the path as `i18n:examples/i18n:foobar`, Cocos Creator will help us search the i18n ID and replace the path item.

## Menu Options

We already use `message` option in our example. There are many other options we can use, like: icon, accelerator, type,... More options, check [main-menu Reference](reference/main-menu-reference.md).
