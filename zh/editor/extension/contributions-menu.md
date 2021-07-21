# 主菜单

编辑器顶部有一栏主菜单，在扩展内可以方便的拓展这一个菜单栏。

![main-menu](./image/main-menu.png)

## 注册菜单

当扩展插件需要添加菜单的时候，只需要填写 `contributions.menu` 对象。例如：在 "扩展" 菜单里新增菜单项：

```json
{
    "name": "hello-world",
    "contributions": {
        "messages": {
            "open-panel": {
                "methods": ["openPanel"]
            },
        },
        "menu": [
            {
                "path": "Tools",
                "label": "Open Panel",
                "icon": "./static/icon.png",
                "message": "open-panel"
            }
        ]
    }
}
```

这样将在菜单栏上多出一个 Tools 菜单分类，Tools 菜单里新增 `Open Panel`。点击这个菜单后，将会发送一条 `open-panel` 消息给注册菜单的扩展。然后触发扩展里的 openPanel 方法。

如果需要将按钮安置在默认菜单栏下，可以采用多语言方案，详情请参考：[多语言系统](./i18n.md)。此处以放置在“扩展”下为例：

```json
"path": "i18n:menu.extension"
```

### 参数字段

| 字段名 | 类型  | 是否选填 | 描述 |
| :--- | :---  | :--- | :--- |
| path | string  | 否 | 顶部菜单的搜索路径。支持 `字符串` 以及 [多语言](./i18n.md#在-json-或者其他文本定义内使用) 写法，例如 `i18n:menu.extension/Hello World`。  |
| label | string  | 否 | 菜单项目的名称，支持 [多语言](./i18n.md#在-json-或者其他文本定义内使用) 语法。 |
| icon | string  | 是 | 菜单的图标，传入一个图标相对路径。 |
| message | string  | 是 | 菜单点击后触发的消息。 |
