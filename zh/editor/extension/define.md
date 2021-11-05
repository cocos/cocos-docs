# 扩展包的定义

扩展包需要预先定义好所有功能以及一些基础信息，这些信息都需要填写并存放在 package.json 文件里。

```json
{
    "name": "hello-world",
    "version": "1.0.0",
    "author": "Creator",
    "description": "description",

    "main": "./browser.js",

    "panels": {
        "default": {
            ...
        },
        "list": {
            ...
        }
    },

    "contributions": {}
}
```

## name

类型 {string} 必填

扩展的名称，这个名字需要和扩展文件夹一一对应

## version

类型 {string} 必填

扩展的版本号，用于提交扩展的版本校验，以及扩展自身的一些升级，数据迁移作为对比的依据。

## editor

类型 {string} 可选

描述扩展支持的编辑器版本，符合 `semver` 语义化版本控制规范。
## author

类型 {string} 可选

扩展作者的名字，将会显示在 "扩展管理器" 内。

## description

类型 {string} 可选

扩展的描述，简单概括一下扩展的功能。支持 i18n:key 的多语言语法。

## main

类型 {string} 可选

一个 js 文件的相对路径，定义功能入口文件，当扩展启动的时候，就会执行 main 字段指向的 js 文件，并根据流程触发或执行对应的方法。

## panels

类型 {[name: string]: PanelInfo} 可选

扩展内定义的面板信息。可以使用 Editor.Panel.open('hello-world.list'); 打开定义好的面板。详细信息请参看 [扩展面板](./panel.md)

## contributions

类型 {[name: string]: any} 可选

扩展已经存在的功能，能够在定制一些其他功能模块对外开放的功能。详细信息请参看 [扩展已有功能](./contributions.md)
