# 主菜单

## Cocos Creator（Mac）

包括软件信息、设置、窗口控制等功能。

- **关于 Cocos Creator**：显示 Cocos Creator 的版本和版权信息。
- **偏好设置**：打开 [设置](editor-panels/preferences.md) 面板，设置编辑器的个性化选项。
- **隐藏 Cocos Creator (<kbd>Ctrl/Command + H</kbd>)**：隐藏编辑器窗口。
- **隐藏其他应用 (<kbd>Shift + Ctrl/Command + H</kbd>)**：隐藏 Cocos Creator 之外的其他应用窗口。
- **显示全部**：显示所有窗口。
- **最小化（<kbd>Ctrl/Command + M</kbd>）**：最小化 Cocos Creator 编辑器窗口。
- **退出 (<kbd>Ctrl/Command + Q</kbd>)**：退出编辑器。

## 文件

包括场景文件的打开和保存，从其他项目导入场景和资源的功能。

- **打开项目...**：关闭当前打开的项目，并打开 Dashboard 的 **最近打开项目** 分页。
- **在新窗口中打开项目**：不关闭当前打开的项目，打开 Dashboard 的 **最近打开项目** 分页。
- **打开最近的资源**：显示最近打开过的场景。
- **新建场景 (<kbd>Ctrl/Command + N</kbd>)**：关闭当前场景并创建一个新场景，新创建的场景需要手动保存才会添加到项目路径下。
- **保存场景 (<kbd>Ctrl/Command + S</kbd>)**：保存当前正在编辑的场景，如果是使用 **新建场景** 菜单项创建的场景，在第一次保存时会弹出对话框，选择场景文件保存的位置和文件名。场景文件以 `*.fire` 作为扩展名。
- **资源导入**：用于将 Creator 导出的资源导入到当前项目中。
- **资源导出**：导出项目中的资源
- **设置**：打开 [设置](editor-panels/preferences.md) 面板，设置编辑器的个性化选项（Windows）。
- **退出**：退出编辑器（Windows）
- **导入项目**：从其他场景和 UI 编辑工具中导入场景和项目资源，详情请参考 [导入其他编辑器项目](../../asset-workflow/project-import.md)。
  - **导入 Cocos Studio 项目 (*.ccs)**
  - **导入 Cocos Builder 项目 (*.ccbproj)**

## 编辑

包括撤销重做、复制粘贴等常用编辑功能。

- **撤销 (<kbd>Ctrl/Command + Z</kbd>)**：撤销上一次对场景的修改。
- **重做 (<kbd>Shift + Ctrl/Command + Z</kbd>)**：重新执行上一次撤销的对场景的修改。
- **拷贝 (<kbd>Ctrl/Command + C</kbd>)**：复制当前选中的节点或字符到剪贴板。
- **粘贴 (<kbd>Ctrl/Command + V</kbd>)**：粘贴剪贴板中的内容到场景或属性输入框中。
- **选择全部 (<kbd>Ctrl/Command + A</kbd>)**：焦点在场景编辑器内为选中所有节点，焦点在控制台则选中所有的日志信息。

## 节点

通过这个菜单创建节点，并控制节点到预制的转化。

- **关联节点到预制**：同时选中场景中的一个节点和资源管理器中的一个预制（prefab），然后选中此菜单项，即可关联选中的节点和预制。
- **还原成普通节点**：选中场景中一个预制节点，执行此命令会将预制节点转化成普通节点。
- **创建空节点**：在场景中创建一个空节点，如果执行命令前场景中已经选中了节点，新建的节点会成为选中节点的子节点。
- **创建渲染节点**：创建预设好的包含渲染组件的节点，关于渲染组件的使用方法请参考 [图像和渲染](../../render/index.md) 一章。
- **创建 UI 节点**：创建预设好的包含 UI 组件的节点，详情请参考 [UI 系统](../../ui/index.md) 一章。

## 组件

通过这个菜单在当前选中的节点上添加各类组件。

- **碰撞组件**：详情请参考 [碰撞组件](../../physics/collision/edit-collider-component.md) 一节。
- **其他组件**：包括动画、音源、拖尾等组件。
- **物理组件**：添加物理相关组件。
- **渲染组件**：详情请参考 [图像和渲染](../../render/index.md) 一章。
- **用户脚本组件**：这里可以添加用户在项目中创建的脚本组件。
- **UI 组件**：详情请参考 [UI 系统](../../ui/index.md) 一章。

## 项目

运行、构建项目，以及项目专用个性化配置。

- **运行预览（<kbd>Ctrl/Command + P</kbd>）**：在浏览器或模拟器中运行项目。
- **刷新已运行的预览（<kbd>Shift + Ctrl/Command + P</kbd>）**：刷新已经打开的预览窗口。
- **构建发布...（<kbd>Shift + Ctrl/Command + B</kbd>）**：打开 [构建发布](../../publish/index.md) 面板。
- **项目设置...**：打开 [项目设置](editor-panels/project-settings.md) 面板。

## 面板

- **资源管理器 (<kbd>Ctrl/Command + 2</kbd>）**：打开 [资源管理器](editor-panels/assets.md) 面板。
- **控制台 (<kbd>Ctrl/Command + 0</kbd>）**：打开 [控制台](editor-panels/console.md) 面板。
- **层级管理器 (<kbd>Ctrl/Command + 4</kbd>）**：打开 [层级管理器](editor-panels/node-tree.md) 面板。
- **属性检查器 (<kbd>Ctrl/Command + 3</kbd>）**：打开 [属性检查器](editor-panels/properties.md) 面板。
- **控件库 (<kbd>Ctrl/Command + 5</kbd>）**：打开 [控件库](editor-panels/node-library.md) 面板。
- **场景编辑器 (<kbd>Ctrl/Command + 1</kbd>）**：打开 [场景编辑器](editor-panels/scene.md) 面板。
- **动画编辑器 (<kbd>Ctrl/Command + 6</kbd>）**：打开 [动画编辑器](../../animation/animation.md) 面板。

## 布局

从预设编辑器布局中选择一个。

- **默认布局**
- **竖屏布局**
- **经典布局**

若要手动调整布局可参考 [编辑器布局](./layout.md)。

## 扩展

和扩展插件相关的菜单项，详情请阅读 [编辑器扩展](../../extension/index.md) 一章。

- **创建新扩展插件...**
  - **全局扩展（安装在用户目录下）**
  - **项目专用扩展（安装在项目路径下）**
- **扩展商店...**：打开扩展商店，下载官方和社区提供的扩展插件。

## 开发者

脚本和编辑器扩展开发相关的菜单功能。

- **VS Code 工作流**：[VS Code](http://code.visualstudio.com/) 代码编辑器的工作环境相关功能，详情请阅读 [代码编辑环境配置](../coding-setup.md) 一节。
  - **更新 VS Code 智能提示数据**
  - **安装 VS Code 扩展插件**
  - **添加 TypeScript 项目配置**
  - **添加 Chrome Debug 配置**
  - **添加编译任务**
- **重新加载界面**：重新加载编辑器界面。
- **手动编译脚本**：触发脚本编译流程。
- **检视页面元素**：在开发者工具中检视编辑器界面元素。
- **开发者工具**：打开开发者工具窗口，用于编辑器界面扩展的开发。

## 帮助

- **搜索**：（Mac 专属）搜索特定菜单项。
- **使用手册**：在浏览器打开用户手册文档。
- **API 文档**：在浏览器打开 API 参考文档。
- **论坛**：在浏览器打开 Cocos Creator 论坛。
- **订阅产品动态**：订阅 Cocos Creator 新闻邮件以获取 Cocos Creator 产品的最新进展、产品下载链接、学习资源和活动信息。
- **用户帐号信息**
- **登出**：登出帐号。
