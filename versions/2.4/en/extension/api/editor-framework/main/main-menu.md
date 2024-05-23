# Editor.MainMenu

The main menu module for manipulating main menu items.

## Methods

### Editor.MainMenu.apply ()

Apply main menu changes.

### Editor.MainMenu.add ( path, template )

  - `path` string - Menu path
  - `template` array|object - Menu template

Build a `template` into menu item and add it to `path`

### Editor.MainMenu.init ()

Init main menu.

### Editor.MainMenu.remove ( path )

  - `path` string - Menu path

Remove menu item at `path`.

### Editor.MainMenu.set ( path, options )

  - `path` string - Menu path
  - `options` object
    - `icon` NativeImage - A [NativeImage](http://electron.atom.io/docs/api/native-image/)
    - `enabled` boolean
    - `visible` boolean
    - `checked` boolean - NOTE: You must set your menu-item type to 'checkbox' to make it work

Set options of a menu item at `path`.

### Editor.MainMenu.update ( path, template )

  - `path` string - Menu path
  - `template` array|object - Menu template

Build a `template` into menu item and update it to `path`

## Properties

### Editor.MainMenu.menu

Get main menu instance for debug purpose

## IPC Messages

### Message: 'main-menu:add'

### Message: 'main-menu:apply'

### Message: 'main-menu:init'

### Message: 'main-menu:remove'

### Message: 'main-menu:set'

### Message: 'main-menu:update'
