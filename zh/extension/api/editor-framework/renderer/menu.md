# Editor.Menu

## Methods

### Editor.Menu.popup (template[, x, y])

  - `template` array|object - Menu template for initialize. The template take the options of [Electron's Menu Item](http://electron.atom.io/docs/api/menu-item/)
  - `x` number - The position x
  - `y` number - The position y

Send `menu:popup` to main process.

### Editor.Menu.register (name, tmpl[, force])

  - `name` string - The name of the register menu
  - `tmpl` object - Menu template
  - `force` boolean - Force to register a menu even it was registered before.

Send `menu:register` to main process.

### Editor.Menu.walk (template, fn)

  - `template` array|object - Menu template.
  - `fn` functoin - Function applied to each menu item

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
