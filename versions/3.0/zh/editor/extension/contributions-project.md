# 扩展项目设置面板

[项目设置](../../editor/project/index.md) 里存放的是和项目运行相关的配置。这部分配置允许进入版本管理，多人共享配置。

例如构建的模块配置、项目内 layers 的配置。这部分配置如果不同步可能造成不同机器上的运行效果不一致。

如果是编辑器相关的配置，请移步至 [扩展偏好设置](./contributions-preferences.md) 文档。

## 面板简介

项目设置分成左右两部分:

- 左侧是功能模块内部的功能选项卡
- 右侧则是配置的修改界面

项目设置允许一个功能插件注册多个选项卡，所以左侧选项卡上会有一行小字，标示选项卡属于哪一个功能。

## 注册方式

我们首先需要在 `contributions.profile.project` 里定义好配置。然后就可以在 `contributions.project` 里定义项目设置里需要显示的数据。

> **注意**：项目设置里配置的数据，都应该存放在 `project` 位置。

## 注册项目设置数据

定义一份简单的扩展

`package.json`

```JSON
{
    "name": "project-test",
    "contributions": {
        "profile": {
            "project": {
                "foo": {
                    "default": 1,
                }
            }
        },        
        "project": {
            "tab1": {
                "label": "test",
                "content": {
                    "foo": {
                        "ui": "ui-num-input"
                    }
                }
            }
        }        
    }
}
```

这样我们就在项目设置左边新增了一个叫 test 的标签页，
通过主菜单的 **项目->项目设置** 菜单打开**项目设置**,
选中后我们即可在右边的面板修改我们的 foo 配置。

关于如何定义 profile 详细请参看 [Profile](./profile.md)。

```typescript
interface Package
{
    'name': string;
    'contributions': {
        'profile': {
            'project': {
                [key:string]: ProfileItem;
            };
        };
        "project": {
            [key:string]: ProjectGroup;
        }
    }
}

interface ProjectGroup {
    /**
     * 项目设置中左侧标签的文字，支持i18n。
     **/
    label: string;
    /**
     * project字段对应注入到项目设置的配置信息，定义的都是 object 对象。
     * object 的 key 作为项目设置的唯一标识，value 则是描述这个项目设置的基本信息。
     **/ 
    content?: { [key: string]: UIInfo };
    /**
     * 如果配置比较复杂，自动渲染无法满足需求，可以填写 custom 数据。
     * 自定义在项目设置中的渲染面板，该面板会在自动渲染的下方出现（如果定义了 properties）。
     **/ 
    custom?: string;
}

/**
 * 渲染一个配置所需要的信息
 **/ 
interface UIInfo {
    // 使用哪种 ui 元素渲染，例如 "ui-num-input"
    ui: string;
    attributes: {
        // ui 元素上允许传入的 attribute 数据，每一种 ui 允许传入的参数不一样，详细参考 ui-kit 章节
        // 假设 ui 为 "ui-num-input",此处可以填入 "step": 1
        [key:string]: any;
    };
}
```

[点击查看面板的定义](./panel-boot.md)
