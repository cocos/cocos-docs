# 自定义项目设置面板

## 面板介绍

**项目设置** 里存放的是和项目运行相关的配置，这部分配置存放在项目目录下的 `settings` 文件夹中，需要纳入版本管理，多人共享配置，否则可能导致不同机器上运行不一致的问题。

可在顶部菜单栏中找到 **项目** -> **项目设置** 菜单，如下图所示：

![project-settings-menu](./image/project-settings-menu.png)

点击后可打开设置设置面板，如下图所示：

![project-settings-panel](./image/project-settings-panel.png)

项目设置面板左侧是功能模块选项卡，右侧则对应功能的配置修改界面。

我们可以通过自定义此面板的显示数据，为项目新增自定义配置，借助项目设置面板实现项目配置的可视化管理。

如果想对所有项目都生效，则需要自定义编辑器相关的配置，请参考文档 [自定义偏好设置](./contributions-preferences.md)。

**自定义项目设置** 功能允许一个我们注册多个选项卡，所以左侧选项卡上会有一行小字，标示选项卡属于哪一个功能。

## 数据配置与显示

自定义项目设置需要依赖数据配置，需要先在 `contributions.profile.project` 里定义好相关数据字段。

> **注意**：项目设置里的配置数据，都应该存放在 `profile.project` 字段中。

当定义好数据字段后，还需要在 `contributions.project` 字段里定义需要显示的数据以及用什么 UI 组件来显示。如下所示：

```json5
// package.json
{
    "name": "project-test",
    "contributions": {
        "profile": {
            "project": {
                "foo": {
                    "default": 1
                },
                "foo1": {
                    "default": 0.4
                },
                "foo2": {
                    "default": false
                },
                "foo3": {
                    "default": 0
                },
                "foo4": {
                    "default": "label"
                }
            }
        },        
        "project": {
            "tab1": {
                "label": "test",
                "content": {
                    "foo": {
                        "ui": "ui-num-input"
                    },
                    "foo1": {
                        "ui": "ui-slider",
                        "attributes": {
                            "min": 0,
                            "max": 1,
                            "step": 0.1
                        }
                    },
                    "foo2": {
                        "ui": "ui-checkbox"
                    },
                    "foo3": {
                        "ui": "ui-select",
                        "items": [
                            {
                                "value": 0,
                                "label": "ITEM 0"
                            },
                            {
                                "value": 1,
                                "label": "ITEM 1"
                            },
                            {
                                "value": 2,
                                "label": "ITEM 2"
                            }
                        ]
                    }
                }
            },
            "tab2": {
                "label": "test2",
                "content": {
                    "foo4": {
                        "ui": "ui-input"
                    }
                }
            }
        }        
    }
}
```

上面的示例中，在 `contributions.profile.project` 字段定义了 4 个数据项： `foo`、`foo1`、`foo2`、`foo3`。

关于如何定义 `profile` 相关配置，请参看 [配置系统](./profile.md)。

在 `contributions.project` 字段中定义了 2 个标签页：`test`、`tes2`。

在 `test` 标签页中，对 4 个数据项分别做了配置，具体的配置属性请看后面的 [UI 组件配置](##ui-%E7%BB%84%E4%BB%B6%E9%85%8D%E7%BD%AE)。

在扩展管理器列表中刷新扩展后，通过 **项目 -> 项目设置** 菜单再次打开 **项目设置面板**, 可看到如下界面：

![project-settings-panel-custom](./image/project-settings-panel-custom.png)

## UI 组件配置

本示例展示了 4 种常见 UI 组件在自定义项目设置面板时的用法，理论上所有带 `value` 属性的 UI 组件都可以用于自定义项目设置面板，具体用法请参考文档 [UI 组件](./ui.md)。
