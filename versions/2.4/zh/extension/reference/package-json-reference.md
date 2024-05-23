# package.json 字段参考

## name (String)

你的扩展包名字。扩展包名字是全局唯一的，它关系到你今后在官网服务器上登录时的名字。

## version (String)

版本号，我们推荐使用 [semver](http://semver.org/) 格式管理你的包版本。

## description (String)

一句话描述你的扩展包是用来做什么的。

## author (String)

注明扩展包的作者，可以是你的名字，团队的名字或者公司的名字。

## main (String)

入口函数文件。通常我们会在包中存放一个 main.js 文件作为入口函数文件。你也可以在入口函数文件放在扩展包中的其他位置例如：`main/index.js`，只要在 `main` 字段中正确书写你的文件的相对路径即可。

## main-menu (Object)

主菜单注册，主菜单注册的键值（Key）是一段菜单路径，注册信息为一个对象，关于注册信息可详细阅读[主菜单字段参考](main-menu-reference.md)。

其中菜单路径为一份 posix 格式的路径，菜单会根据路径中的名字，依次注册到主菜单中。例如：“My Package/Preview/Foo Bar” 将会在主菜单中寻找 My Package > Preview 这个菜单路径，如果寻找过程中没有发现对应的菜单项，将会自动添加。最终 Cocos Creator 会将 “Foo Bar” 添加到对应的路径中，如图：

![menu-path](../assets/menu-path.png)

## panel (Object)

用于面板注册。面板注册的键值（Key）是一个以 `panel` 开头的字符串，字符串后面可跟上后缀名用于多面板的注册。<br>
注册完成的面板，将会生成以 `${包名}${面板后缀名}` 为组合的面板 ID。通常情况下如果我们只注册一个面板，就不需要带后缀名，面板 ID 默认就是插件包的名字。但如果是注册多个面板，就需要带后缀名，以便区分。

关于多面板注册，这里我们提供了一个简单的例子，在 `package.json` 中：

```json
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

这样注册完的面板，将会生成两份面板 ID：`simple-package` 和 `simple-package.02`。

关于面板注册信息可详细阅读 [面板字段参考](panel-json-reference.md)。

## reload (Object)

可以通过 `reload` 字段定制扩展包自动重载的文件监控规则，未做声明时的默认规则如下：

```json
"reload": {
  "test": ["test/**/*", "tests/**/*"],
  "renderer": ["renderer/**/*", "panel/**/*"],
  "ignore": [],
  "main": []
}
```

## runtime-resource (Object)

插件通过在 `package.json` 文件中配置 `runtime-resource` 字段 mount runtime 资源到资源管理器中。配置的格式如下：

```json
"runtime-resource": {
  "path": "path/to/runtime-resource",
  "name": "runtime-res-name"
}
```

最终在资源管理器中由插件 mount 的文件夹名称为 `[packageName]-[runtime-resource.name]`，且插件导入的资源文件夹为只读状态。

需要注意的是，通过配置 `runtime-resource` 字段将扩展包中的文件夹 mount 到项目资源后，本身就具备自动同步的功能，也就是对扩展包中的 `runtime-resource` 进行的修改会自动同步到项目资源中并触发编译等流程，所以应该将 `runtime-resource` 里 `path` 字段指向的路径添加到 `package.json` 中的 `reload.ignore` 中，否则会引起插件的重复加载：

```json
"runtime-resource": {
  "path": "my-components",
  "name": "components"
},
"reload": {
  "ignore": ["my-components/**/*"]
}
```

## scene-script (String)

`scene-script` 字段用于声明一个扩展包内的脚本，在该脚本中可以使用引擎 API，并访问当前场景中的节点和组件。

声明形式如下：

```json
"scene-script": "scene-walker.js"
```

该字段的值是一个脚本文件的路径，相对于扩展包目录。详细的用法和工作流程请阅读 [调用引擎 API 和项目脚本](../scene-script.md)。
