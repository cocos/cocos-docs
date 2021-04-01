# 扩展编辑器

Cocos Creator 提供了一系列方法来让用户定制和扩展编辑器的功能。这些扩展以包（package）的形式进行加载。用户通过将自己或第三方开发的扩展包安装到正确的路径进行扩展的加载，根据扩展功能的不同，有时可能会要求用户手动刷新窗口或者重新启动编辑器来完成扩展包的初始化。

Cocos Creator 的扩展包沿用了 Node.js 社区的包设计方式，通过 `package.json` 描述文件来定义扩展包的内容和注册信息。

## 基本工作流程

- [你的第一个扩展包](your-first-extension.md)
- [安装与分享](install-and-share.md)
- [IPC（进程间通讯）简介](introduction-to-ipc.md)
- [入口程序](entry-point.md)
- [扩展包工作流程模式](extension-workflow.md)
- [扩展主菜单](extends-main-menu.md)
- [扩展编辑器面板](extends-panel.md)
- [进程间通讯工作流程](ipc-workflow.md)
- [定义一份简单的面板窗口](define-simple-panel.md)
- [多语言化](i18n.md)
- [工作路径和常用 URL](working-directory.md)
- [提交插件到商店](submit-to-store.md)

## 管理项目中的场景和资源

- [调用引擎 API 和项目脚本](scene-script.md)
- [管理项目资源](asset-management.md)

## 编写和扩展面板 UI

- [编写面板界面](writing-your-panel.md)
- [掌握 UI Kit](using-ui-kit.md)
- [扩展 UI Kit](extends-ui-kit.md)
- [界面排版](layout-ui-element.md)
- [在面板中使用 Vue](work-with-vue.md)

## 扩展属性面板

- [扩展 Inspector](extends-inspector.md)
- [扩展 Property](extends-property.md)

## 扩展 Gizmos

- [自定义 Gizmo](custom-gizmo.md)
- [自定义 Gizmo 进阶](custom-gizmo-advance.md)

## 其他

- [测试你的扩展包](test-your-package.md)

## API

- AssetDB
	- [AssetDB API Main](api/asset-db/asset-db-main.md)
	- [AssetDB API Renderer](api/asset-db/asset-db-renderer.md)
- [Editor](api/editor-framework/index.md)

## 参考

- [package.json 字段参考](reference/package-json-reference.md)
- [主菜单字段参考](reference/main-menu-reference.md)
- [面板字段参考](reference/panel-json-reference.md)
- [面板定义参考](reference/panel-reference.md)
- [自定义界面元素定义参考](reference/custom-element-reference.md)
- [常用 ipc 消息参考](reference/ipc-reference.md)
- [meta 文件参考](reference/meta-reference.md)
- UI Kit
  - 控件
    - [ui-button](reference/ui-button.md)
    - [ui-checkbox](reference/ui-checkbox.md)
    - [ui-color](reference/ui-color.md)
    - [ui-input](reference/ui-input.md)
    - [ui-num-input](reference/ui-num-input.md)
    - [ui-select](reference/ui-select.md)
    - [ui-slider](reference/ui-slider.md)
    - [ui-text-area](reference/ui-text-area.md)
  - 特殊控件
    - [ui-asset](reference/ui-asset.md)
    - [ui-node](reference/ui-node.md)
  - 控件容器
    - [ui-box-container](reference/ui-box-container.md)
    - [ui-prop](reference/ui-prop.md)
    - [ui-section](reference/ui-section.md)
  - 视图元素
    - [ui-hint](reference/ui-hint.md)
    - [ui-loader](reference/ui-loader.md)
    - [ui-markdown](reference/ui-markdown.md)
    - [ui-progress](reference/ui-progress.md)
