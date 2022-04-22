# 增强已有的功能

Cocos Creator 支持各个扩展间互相提供数据（`contributions`）。

我们在编写一个扩展的时候，可以查询编辑器内已有功能是否提供了对外接收 `contributions` 的功能。如果对应功能提供该功能，则能够在编写扩展的时候使用这些功能。

## contributions 数据定义

`contributions` 功能，统一在 `package.json` 里的 `contributions` 字段中定义，如下所示：

```json
{
    "name": "hello-world",
    "contributions": {
        "builder":{ ... },
        "assets":{ ... },
        "profile": { ... },
        "scene": { ... },
        "menu": [ ... ],
        "inspector":{ ... },
        "messages": { ... },
        "shortcuts": { ... },
        "preferences": { ... },
        "project": { ... }
    },
}
```

## 字段说明

`contributions` 提供了与编辑器各功能系统交互的能力，主要涉及到的功能如下：

- `builder` - 自定义构建流程，详细信息请参考文档 [自定义构建流程](../publish/custom-build-plugin.md)

- `assets` - 增强资源管理器面板，详细信息请参考文档 [增强资源管理器面板](../assets/extension.md)。

- `profile` - 定义扩展需要用到的配置，详细信息请参看文档 [配置系统](./profile.md)。

- `scene` - 在扩展中编写需要和引擎、项目脚本交互的脚本，详细信息请参看文档 [调用引擎 API 和项目脚本](./scene-script.md)

- `inspector` - 自定义 **属性检查器** 面板，详细信息请参看文档 [自定义属性检查器面板](./inspector.md)。

- `menu` - 定义扩展需要新增的菜单信息，详细信息请参看文档 [自定义主菜单](./contributions-menu.md)。

- `messages` - 定义扩展需要用到的消息列表，详细信息请参看文档 [自定义消息](./contributions-messages.md)。

- `shortcuts` - 定义扩展需要用到的快捷键，详细信息请参看文档 [自定义快捷键](./contributions-shortcuts.md)。

- `preferences` - 自定义偏好设置，详细信息请参看文档 [自定义偏好设置面板](./contributions-preferences.md)。

- `project` - 自定义项目设置，详细信息请参看文档 [自定义项目设置面板](./contributions-project.md)。


