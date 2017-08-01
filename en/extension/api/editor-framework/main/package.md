# Editor.Package

Package module for manipulating packages.

## Methods

### Editor.Package.load (path, callback)

  - `path` string - An absolute path point to a package folder
  - `callback` function - Callback when finish loading

Load a package at path.

### Editor.Package.unload (path, callback)

  - `path` string - An absolute path point to a package folder
  - `callback` function - Callback when finish unloading

Unload a package at path.

### Editor.Package.reload (path, callback)

  - `path` string - An absolute path point to a package folder
  - `callback` function - Callback when finish reloading

Reload a package at path.

### Editor.Package.panelInfo (panelID)

  - `panelID` string - The panel ID

Find and get panel info via panelID, the panel info is the JSON object that defined in `panels.{panel-name}` in your `package.json`.

### Editor.Package.packageInfo (path)

  - `path` string - The package path

Find and get package info via path, the package info is the JSON object of your `package.json` file.

### Editor.Package.packagePath (name)

  - `name` string - The package name

Return the path of the package by name.

### Editor.Package.addPath (path)

  - `path` string|array - Path to add

Add package search path.

### Editor.Package.removePath (path)

  - `path` string - Path to remove

Remove package search path.

### Editor.Package.resetPath ()

Reset path.

### Editor.Package.find (name)

  - `name` string - Package name

Find and return the package path via `name`.  

## Properties

### Editor.Package.lang

Return current language setting.

### Editor.Package.path

Return package search path list.

### Editor.Package.versions

Return the version of sub modules.

## IPC Messages

### Message: 'editor:package-query-info'

### Message: 'editor:package-query-infos'

### Message: 'editor:package-reload'
