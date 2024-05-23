# Editor.MainMenu

The main menu module for manipulating main menu items.

## Methods

### Editor.MainMenu.apply ()

Apply main menu changes.

### Editor.MainMenu.add (path, template)

  - `path` string - Menu path
  - `template` array|object - Menu template

Send `main-menu:add` to main process.

### Editor.MainMenu.init ()

Send `main-menu:init` to main process.

### Editor.MainMenu.remove (path)

  - `path` string - Menu path

Send `main-menu:remove` to main process.

### Editor.MainMenu.set (path, options)

  - `path` string - Menu path
  - `options` object
    - `icon` NativeImage - A [NativeImage](http://electron.atom.io/docs/api/native-image/)
    - `enabled` boolean
    - `visible` boolean
    - `checked` boolean - NOTE: You must set your menu-item type to 'checkbox' to make it work

Send `main-menu:set` to main process.

### Editor.MainMenu.update (path, template)

  - `path` string - Menu path
  - `template` array|object - Menu template

Send `main-menu:update` to main process.
