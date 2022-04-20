# 扩展管理器面板说明

**扩展管理器** 用于管理编辑器内的扩展。点击 Cocos Creator 顶部菜单栏中的 **扩展 -> 扩展管理器** 即可打开：

![extension-manager-menu](./image/extension-manager-menu.png)

![extension-manager](./image/extension-manager.png)

扩展管理器顶部相关功能说明如下：

**1**：扩展类型，有 **内置扩展**（Internal）、**项目扩展**（Project）、**全局扩展**（Global）和 **开发**（Develop）4 种扩展类型，详情请参考下文 [**扩展类型**](#扩展类型) 部分的内容。

**2**：扫描按钮，扫描扩展目录（`extensions`）下的扩展，卸载不存在的扩展，安装未被导入的扩展。**内置扩展**（Internal）和 **开发**（Develop）分页下此按钮不可用。

**3**：导入按钮，将扩展导入到当前所在的扩展类型分页。**内置扩展**（Internal）分页下此按钮不可用。

**4**：搜索栏，输入扩展的名称即可在当前所在扩展类型列表中搜索扩展。

## 扩展列表

**扩展管理器** 面板根据当前选择的扩展类型，以及搜索栏筛选等操作来显示相应的扩展。

![simple-extension](./image/extension-list.png)

在扩展列表中，扩展左侧显示扩展相关信息，右侧按钮的说明如下：

- ![folder](first/folder.png)：在操作系统的文件管理器中打开扩展包

- ![refresh](first/refresh.png)：刷新按钮，用于重新加载当前扩展

- ![delete](first/delete.png)：卸载扩展，点击后将从扩展列表中移除当前扩展，并删除扩展包

- ![enable](first/enable.png)：启用/禁用扩展，按钮显示绿色表示开启，显示灰色表示关闭。

## 扩展类型

Cocos Creator 目前将扩展分类为 **内置扩展**（Internal）、**项目扩展**（Project）、**全局扩展**（Global），以及 **开发**（Develop），点击即可切换并显示当前类型的扩展列表。

### 内置扩展（Internal）

内置扩展分页中的扩展都是编辑器内置的扩展。内置扩展无法被关闭、卸载、刷新，并且外部扩展也无法导入成为内置扩展，因此上方的扫描和导入按钮为置灰不可用状态。

![simple-extension](./image/extension-internal.png)

### 项目扩展（Project）

项目扩展分页中的扩展仅对当前项目生效。项目扩展所在目录为 `${项目目录}/extensions`。

![simple-extension](./image/extension-project.png)

| 功能             | 说明         |
| :--------------- | :---------- |
| 扩展列表         | 展示安装在项目扩展目录的扩展                   |
| 导入按钮         | 导入扩展的 ZIP 包，解压 ZIP 到项目扩展的目录下 |

### 全局扩展（Global）

全局扩展分页中的扩展对所有启用该扩展的项目生效。全局扩展所在目录为：

- **Windows**：`%USERPROFILE%\.CocosCreator\extensions`
- **MacOS**：`$HOME/.CocosCreator/extensions`

![simple-extension](./image/extension-global.png)

| 功能        | 说明         |
| :--------- | :----------- |
| 扩展列表    | 展示安装在全局扩展目录下的扩展                 |
| 导入按钮    | 导入扩展的 ZIP 包，解压 ZIP 到全局扩展的目录下  |

### 开发（Develop）

在 **Develop** 分页中导入的扩展可以认为是 **临时导入** 的扩展，一般在开发和测试扩展时使用。

| 功能     | 说明      |
| :------ | :-------- |
| 扩展列表 | 展示临时安装的扩展                             |
| 扫描按钮 | 该按钮处于禁用状态                             |
| 导入按钮 | 点击该按钮可 **临时导入** 指定的扩展到 **开发** 扩展列表中，但不会将相应的扩展包拷贝到当前项目。需要注意的是，临时导入的扩展在下次打开项目时需要重新导入。|

> **注意**：若点击 **开发** 扩展列表中的卸载按钮，仅在扩展列表中移除引用，并不会删除扩展文件夹。
