# package.json 字段参考

### name (String)

你的扩展包名字。扩展包名字是全局唯一的，他关系到你今后在官网服务器上登录时的名字。

### version (String)

版本号，我们推荐使用 [semver](http://semver.org/) 格式管理你的包版本。

### description (String)

一句话描述你的扩展包是用来做什么的。

### author (String)

注明扩展包的作者，可以是你的名字，团队的名字或者公司的名字。

### main (String)

入口函数文件。通常我们会在包中存放一个 main.js 文件作为入口函数文件。你也可以在入口函数文件放在扩展包中的其他位置例如：`main/index.js`，只要在 `main` 字段中正确书写你的文件的相对路径即可。

### main-menu (Object)

主菜单注册，主菜单注册的键值（Key）是一段菜单路径，注册信息为一个对象，关于注册信息可详细阅读[主菜单字段参考](main-menu-reference.md)。

其中菜单路径为一份 posix 格式的路径，菜单会根据路径中的名字，依次注册到主菜单中。例如：“My Package/Preview/Foo Bar” 将会在主菜单中寻找 My Package > Preview 这个菜单路径，如果寻找过程中没有发现对应的菜单项，将会自动添加。最终 Cocos Creator 会将 “Foo Bar” 添加到对应的路径中，如图：

![menu-path](../assets/menu-path.png)

### panel (Object)

面板注册，面板注册的键值（Key）是一个以 `panel` 开头的字符串，字符串后面可跟上后缀名用于多面板的注册。
注册完的面板，将会生成以 `${包名}${面板后缀名}` 为组合的面板 ID，如果没有后缀名（通常我们如果注册一个面板就不会带后缀），
则面板 ID 直接等于插件包的名字。

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
  "panel-02": {
    "main": "panel-02/index.js",
    "type": "dockable",
    "title": "Simple Panel 02",
    "width": 400,
    "height": 300
  },
}
```

这样注册完的面板，将会生成两份面板 ID 分别为：`simple-package` 和 `simple-package-02`.

关于面板注册信息可详细阅读[面板字段参考](panel-json-reference.md)。
