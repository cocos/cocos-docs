# Editor

## Properties

### Editor.argv

An [yargs.argv](https://github.com/yargs/yargs) value.

### Editor.dev

Indicates if the application is running with `--dev` option.

### Editor.frameworkPath

The Editor-Framework module path. Usually it is `{your-app}/editor-framework/`

### Editor.isClosing _readonly_

Indicates if the Editor-Framework App is closing.

### Editor.lang

Indicates the language used in `--lang` option.

### Editor.logfile

Specify the log file path. By default it is saving in:

 - Windows: `~/.{app-name}/logs/{app-home}.log`
 - Mac: `~/Library/Logs/{app-name}.log`

### Editor.versions

A table contains all version info for app and sub-modules. By default it contains App and Editor-Framework version info.

## Methods

### Editor.init(opts)

 - `opts` object - Options
   - `i18n` array - Specify i18n phrases for your application
   - `layout` string - Specify the layout file used as default layout for your application
   - `main-menu` function - A function returns the main menu template
   - `profile` object - Register profile name to path table used in `Editor.Profile` module
   - `package-search-path` array - Paths to search packages
   - `panel-window` string - Specify a html file that used as panel window entry page
   - `selection` object - Register selection type that used in `Editor.Selection` module
   - `theme` string - The name of the theme we would like to search for in `theme://` protocol
   - `theme-search-path` array - Paths to search in `theme://` protocol

Init and config the Editor module. For more details about `Editor.init` options, read [Editor Configuration](../manual/customization/editor-configuration.md)

### Editor.run(url, opts)

 - `url` string - The url to load for default main window
 - `opts` object - The opts to used when constructing the default main window

Run the Editor by restoring last window or openning the a new one.

### Editor.reset()

Reset the configuration of Editor

### Editor.loadPackagesAt(path, callback)

 - `path` string
 - `callback` function

Load all packages under `path`. Once it done the `callback` will be invoked.

### Editor.loadAllPackages(callback)

 - `callback` function

Load all packages under the `package-search-path` which specified in `Editor.init`. Once it done the `callback` will be invoked.

### Editor.require(url)

 - `url` string

Require the module by `Editor.url`. This is good for module exists in package, since the absolute path of package may be variant in different machine. Example:

```javascript
// this is equal to require(Editor.url('packages://foobar/foo'))
const Foo = Editor.require('packages://foobar/foo');
```

### Editor.url(url)

 - `url` string

Returns the file path (if it is registered in custom protocol) or url (if it is a known public protocol).

### Editor.watchPackages(callback)

 - `callback` function

Start watching all packages. Once it done the `callback` will be invoked.
