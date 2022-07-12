# 扩展包的定义

扩展包需要在 `package.json` 文件里预先定义好所有功能以及一些基础信息，如下所示：

```JSON5
{
    "package_version": 2,
    "version": "1.0.0",
    "name": "first-panel",
    "tilte": "i18n:first-panel.title",
    "description": "i18n:first-panel.description",
    "author": "Cocos Creator",
    "editor": ">=3.4.2",
    "main": "./dist/main.js",
    "dependencies": { ... },
    "devDependencies": { ... },
    "panels": { ... },
    "contributions": {
    },
    "scripts": {
        "build": "tsc -b",
        "watch": "tsc -w"
    }
}
```

## package_version

类型 {number} 必填

扩展的版本号，用于提交扩展的版本校验，以及扩展自身的一些升级，数据迁移作为对比的依据。

## version

类型 {string} 必填

扩展的版本号，主要用于显示，如需进行逻辑判断，推荐使用 `package_version`。

## name

类型 {string} 必填

扩展的名称，这个名字需要和扩展文件夹一一对应。

## title

类型 {string} 可选

扩展的显示标题，当配置了 `title` 时，在需要展示扩展名的地方会优先采用 `title`，支持 [多语言（i18n）](./i18n.md) 配置。

## description

类型 {string} 可选

扩展的描述，简单概括一下扩展的功能。支持 [多语言（i18n）](./i18n.md) 的多语言语法。

## author

类型 {string} 可选

扩展作者的名字，将会显示在 "扩展管理器" 内。

## editor

类型 {string} 可选

描述扩展支持的编辑器版本，符合 [`semver` 语义化版本控制规范](https://semver.org/)。

## main

类型 {string} 可选

一个 js 文件的相对路径，定义功能入口文件，当扩展启动的时候，就会执行 `main` 字段指向的 js 文件，并根据流程触发或执行对应的方法。

## panels

类型 {[name: string]: PanelInfo} 可选

扩展内定义的面板信息。可以使用 `Editor.Panel.open('hello-world.list');` 打开定义好的面板。详细信息请参看 [面板系统](./panel.md)。

## contributions

类型 {[name: string]: any} 可选

`contributions` 提供了与编辑器各功能系统交互的能力，更多信息请参看文档 [增强已有功能](./contributions.md)。

## scripts

类型 {[name: string]: any} 必填

扩展可执行的命令行。
