# package.json referernce

### name (String)

The package name. Make sure your package name is uniqued, it relate to many things in package programming.

### version (String)

The version number, we highly recommend you use [semver](http://semver.org/) standards for your version.

### description (String)

Describe your package in one sentence.

### author (String)

Author name.

### main (String)

Package entry point. Usually we set this to "main.js". But you are free to set any path relate to your package, such as `main/index.js`.

### main-menu (Object)

Main menu registry. The key is the menu path of your menu item. The value is the menu options. More details check [main-menu reference](main-menu-reference.md).

The menu path is a posix format path. For instance: "My Package/Preview/Foo Bar" will search the menu in "My Package" > "Preview" and add the menu item "Foo Bar" under it:

![menu-path](../assets/menu-path.png)

### panel (Object)

For panel registration. The Key for panel registration is a string beginning with an `panel`, which can be followed by a suffix for multiple panel registration.<br>
The registered panel will generate a panel ID named with `${package name}${panel suffix name}`. Usually if we register only one panel, we don't need a suffix name and the panel ID is the name of the plugin package by default. However, if multiple panels are registered, the suffix name is needed to differentiate them.

Example of multiple panel registration:

```json
// package.json
{
  "name": "simple-package",
  "panel": {
    "main": "panel/index.js",
    "type": "dockable",
    "title": "Simple Panel",
    "width": 400,
    "height": 300
  },
  "panel.02": {
    "main": "panel.02/index.js",
    "type": "dockable",
    "title": "Simple Panel 02",
    "width": 400,
    "height": 300
  },
}
```

This will generate two panel IDs for the registered panel: `simple-package` and `simple-package.02`.

For details about panel registration, please refer to the [Panel field reference [cn]](panel-json-reference.md).

### reload (Object)

You can customize the file monitoring rules of the extension package auto-overload via the `reload` field, the default rules when not declared are as follows:

```json
"reload": {
  "test": [ "test/**/*", "tests/**/*" ],
  "renderer": [ "renderer/**/*", "panel/**/*" ],
  "ignore": [],
  "main": []
}
```

### runtime-resource (Object)

The plugin mounts **runtime** resources into the **Assets** panel by configuring the `runtime-resource` field in the `package.json` file.

```json
"runtime-resource": {
  "path": "path/to/runtime-resource",
  "name": "runtime-res-name"
}
```

Finally, the folder in the **Assets** that is mounted by the plugin is named `[packageName]-[runtime-resource.name]`, and the resource folder imported by the plugin is read-only.

It should be noted that by configuring the `runtime-resource` field to mount the folder in the extension package to the project resources, which has the feature of automatic synchronization, that is, the changes made to the `runtime-resource` in the extension package will be automatically synchronized to the project resources and trigger the compilation process, so the path pointed by the `path` field in the `runtime-resource` should be added to the `reload.ignore` in the `package.json`, otherwise it will cause the plugin to load repeatedly.

```json
"runtime-resource": {
  "path": "my-components",
  "name": "components"
},
"reload": {
  "ignore": ["my-components/**/*"]
}
```

### scene-script (String)

The `scene-script` field is used to declare a script in an extension package where you can use the engine API and access the nodes and components in the current scene.

```json
"scene-script": "scene-walker.js"
```

The value of this field is the path of a script file, relative to the extensions directory. For detailed usage and workflow, please refer to the documentation [Call the engine API and project script](../scene-script.md).
