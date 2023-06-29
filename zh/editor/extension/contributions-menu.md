# 自定义主菜单

编辑器顶部有一栏主菜单，在扩展内可以方便的在这个菜单栏添加自己的菜单。

## 注册菜单

当扩展扩展需要添加菜单的时候，只需要填写 `contributions.menu` 对象。例如我们在 "扩展" 菜单里增加一个菜单项，可以修改 `package.json`，代码示例如下：

```json5
{
    // package.json
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

上面的配置信息将会在编辑器的 "扩展" 菜单里新增一个 "Open Hello World" 菜单，点击这个菜单后将会按照 message 配置发送一条 `open-panel` 消息给当前扩展，若当前扩展配置了这个消息的监听以及对应的 `openPanel` 处理函数，将会被触发。

关于消息的定义请参考文档 [自定义消息](./contributions-messages.md)。

下面我们来看看 `menu` 对象中各字段的意义：

### path

类型 {string} 必填

填写格式为：[顶部已有菜单路径][/路径1][/路径2]，以下写法都是合理的：
- `i18n:menu.extension` - 以扩展菜单作为父菜单
- `i18n:menu.extension/Hello World` - 在扩展菜单中添加一个 `Hello World` 菜单项作为父菜单
- `MyMenu` - 在顶部菜单栏添加一个 `MyMenu` 菜单作为父菜单
- `MyMenu/Hello World` - 在顶部菜单栏添加一个 `MyMenu`，并再添加一个 `Hello World` 菜单项作为父菜单

顶部菜单栏中，预设的菜单有：
- i18n:menu.project - “项目” 菜单
- i18n:menu.node - “节点” 菜单
- i18n:menu.panel - “面板” 菜单
- i18n:menu.extension - “扩展” 菜单
- i18n:menu.develop - “开发者” 菜单

### label

类型 {string} 必填

菜单项目的名称，支持 i18n:key 语法。

### icon

类型 {string} 可选

菜单的图标相对路径，扩展使用的素材一般放在名为 `static` 的文件夹下面，若不存在则新建一个。

### message

类型 {string} 可选

菜单点击后触发的消息，此消息需要在 `contributions.messsages` 中先定义。
