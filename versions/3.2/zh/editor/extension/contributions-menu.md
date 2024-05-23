# 主菜单

编辑器顶部有一栏主菜单，在扩展内可以方便的拓展这一个菜单栏。

## 注册菜单

当扩展插件需要添加菜单的时候，只需要填写 `contributions.menu` 对象。例如我们在 "扩展" 菜单里增加一个菜单项：

```json
{
    "name": "hello-world",
    "contributions": {
        "messages": {
            "open-panel": {
                "methods": ["openPanel"]
            }
        },
        "menu": [
            {
                "path": "i18n:menu.extension",
                "label": "Open Hello World",
                "icon": "./static/icon.png",
                "message": "open-panel"
            }
        ]
    }
}
```

这样编辑器将在 "扩展" 菜单里新增一个 "Open Hello World" 菜单。点击这个菜单后，将会发送一条消息 openPanel 消息给注册菜单的扩展。然后触发扩展里的 openPanel 方法。

### path

类型 {string} 必填

顶部菜单的搜索路径，预设的有：

- i18n:menu.project
- i18n:menu.node
- i18n:menu.panel
- i18n:menu.extension
- i18n:menu.develop

也可以填写多级菜单，例如 `i18n:menu.extension/Hello World`

### label

类型 {string} 必填

菜单项目的名称，支持 i18n:key 语法。

### icon

类型 {string} 可选

菜单的图标，传入一个图标相对路径

### message

类型 {string} 可选

菜单点击后触发的消息
