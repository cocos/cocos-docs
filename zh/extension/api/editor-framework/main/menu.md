# Editor.Menu

## Class: Editor.Menu

### new Editor.Menu (template[, webContents])

  - `template` array|object - Menu template for initialize. The template take the options of [Electron's Menu Item](http://electron.atom.io/docs/api/menu-item/)
    - `path` string - add a menu item by path.
    - `message` string - Ipc message name.
    - `command` string - A global function in main process (e.g. Editor.log).
    - `params` array - The parameters passed through ipc.
    - `panel` string - The panelID, if specified, the message will send to panel.
    - `dev` string - Only show when Menu.showDev is true.
  - `webContents` object - A [WebContents](http://electron.atom.io/docs/api/web-contents/) object.

## Instance Methods

### menu.add (path, template)

  - `path` string - The menu path
  - `template` array|object

Build a template into menu item and add it to path

Example:

```js
let editorMenu = new Editor.Menu();
editorMenu.add( 'foo/bar', {
  label: foobar,
  message: 'foobar:say',
  params: ['foobar: hello!']
});

// you can also create menu without label
// it will add menu to foo/bar where bar is the menu-item
let editorMenu = new Editor.Menu();
editorMenu.add( 'foo/bar/foobar', {
  message: 'foobar:say',
  params: ['foobar: hello!']
});
```

### menu.clear ()

Clear all menu item in it.

### menu.dispose ()

De-reference the native menu.

### menu.insert (path, pos, template)

  - `path` string - The menu path
  - `pos` number
  - `template` array|object

Build a template into menu item and insert it to path at specific position

### menu.remove (path)

Remove menu item at path.

### menu.reset (template)

  - `template` array|object

Reset the menu from the template.

### menu.set (path, options)

  - `path` - The menu path
  - `options`
    - `icon` NativeImage - A [NativeImage](http://electron.atom.io/docs/api/native-image/)
    - `enabled` boolean
    - `visible` boolean
    - `checked` boolean -  NOTE: You must set your menu-item type to 'checkbox' to make it work

### menu.update (path, template)

  - `path` string - The menu path
  - `template` array|object

Update menu item at path.

## Static Properties

### Editor.Menu.showDev

Indicate if show dev menu

## Static Methods

### Editor.Menu.convert (template[, webContents])

  - `template` array|object - Menu template for initialize. The template take the options of [Electron's Menu Item](http://electron.atom.io/docs/api/menu-item/)
  - `webContents` object - A [WebContents](http://electron.atom.io/docs/api/web-contents/) object.

Convert the menu template to process additional keyword we added for Electron.
If webContents provided, the `template.message` will send to the target webContents.

### Editor.Menu.getMenu (name)

  - `name` string - Name of the register menu

### Editor.Menu.register (name, fn[, force])

  - `name` string - Name of the register menu
  - `fn` function - A function returns the menu template
  - `force` boolean - Force to register a menu even it was registered before

### Editor.Menu.unregister (name)

  - `name` string - Name of the register menu

### Editor.Menu.walk (template, fn)

  - `template` array|object - Menu template for initialize. The template take the options of [Electron's Menu Item](http://electron.atom.io/docs/api/menu-item/)
  - `fn` function - Function applied to each menu item

Example:

```js  
Editor.Menu.walk(menuTmpl, item => {
  if ( item.params ) {
    item.params.unshift('Hello');
  }

  if (item.message === 'foobar:say-hello') {
    item.enabled = false;
  }
});
```

## IPC Messages

### Message: 'menu:popup'

### Message: 'menu:register'
