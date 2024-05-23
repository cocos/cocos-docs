# 使用 Dashboard

启动 Cocos Dashboard 并使用 Cocos 开发者帐号登录以后，就会打开 Dashboard 界面，在这里你可以下载引擎、新建项目、打开已有项目或者获得帮助信息。

## 界面总览

![Dashboard](index/dashboard-editor.png)

上图所示的就是 Cocos Dashboard 界面，可以点击右上角的设置图标按钮来指定通过 Dashboard 下载的 Creator 编辑器的存放位置，以及 Dashboard 界面显示的语言等。

Cocos Dashboard 界面主要包括以下几种选项卡：

- **项目**: 列出最近打开项目，第一次运行 Cocos Dashboard 时，这个列表是空的。可以在这个选项卡中新建项目。
- **编辑器**: 列出已下载的所有 Creator 编辑器版本，也可以点击右下角的 **下载** 按钮继续下载编辑器。
- **动态**: 用于发布 Cocos Creator 的一些官方信息或者活动等，包括 **公告**、**新闻** 和 **更新日志** 三部分内容。
- **教程**: 帮助信息，一个包括各种新手指引信息和文档的静态页面。

下面我们来依次看一下这些分页面。

## 项目

可以通过 **项目** 选项卡快速访问近期打开过的项目，点击具体的项目条目时，即可打开该项目。

![Dashboard](index/project-window.png)

- **1** — 包括 **使用其他编辑器打开项目**、**打开项目所在文件夹**、**从列表中移除**、**选择项目的图标**、**设置项目的描述** 和 **重命名项目** 等功能。
    - **选择项目的图标**：项目图标目前支持 BMP、PNG、GIF、JPG 四种格式（Dashboard 1.0.12 新增）。
    - **重命名项目**：重命名项目将重命名项目文件夹（Dashboard 1.0.12 新增）。
    - **设置项目的描述**：项目备注记录在项目目录下 `package.json` 文件的 `description` 字段中（Dashboard 1.0.19 新增）。
- **2** — 可选择其他编辑器打开项目。
- **3** — 可根据时间正序/反序排列项目（Dashboard 1.0.12 新增）。
- **4** — 可通过项目名称直接搜索项目（Dashboard 1.0.12 新增）。
- **导入** 按钮 — 用于导入其他项目。从 **v1.0.13** 开始，支持直接将项目从操作系统的文件管理器拖拽到列表中。
- **新建** 按钮 — 用于新建项目，点击该按钮后会进入 **新建项目** 页面，详情可参考下方介绍。

### 新建项目

在新建项目页面，点击上方的 **类型** 和 **编辑器版本** 可选择 Creator 的引擎和编辑器版本。

Creator 提供了一些项目模板，包括了各种不同类型的游戏基本架构，以及学习用的范例资源和脚本，来帮助开发者更快进入到创造性的工作当中。随着 Cocos Creator 功能越来越完整，我们也会持续添加更多的项目模板。

![Dashboard](index/add-project.png)

点击选择其中一个项目模板，在页面下方可以看到 **项目名称** 和 **项目存放位置**。
- **项目名称**：项目名称只能包含 **a-z**、**A-Z**、**0-9** 以及 **_** 和 **-**。
- **项目存放位置**：点击项目路径输入框后面的图标即可选择项目的存放路径。

一切都设置好后，点击 **创建并打开** 按钮来完成项目的创建。Dashboard 界面会被关闭，然后新创建的项目会在 Cocos Creator 编辑器主窗口中打开。

## 编辑器

该页面会列出已下载安装的所有 Creator 编辑器版本。

![Dashboard](index/dashboard-editor.png)

需要注意的是，第一次运行 Cocos Dashboard 时，这个列表是空的，可以点击右下角的两个按钮导入本地已有的 Creator 编辑器或者直接下载安装。

- **添加本地版本**：用于添加本地已有的 Creator 编辑器到 **编辑器** 版本列表。从 **v1.0.13** 开始，支持直接将本地已有的 Creator 编辑器从操作系统的文件管理器拖拽到 **编辑器** 版本列表中。
- **下载编辑器**：点击该按钮会跳转到编辑器下载页面，该页面会列出所有已安装和未安装的编辑器版本，可选择所需的编辑器版本进行下载。

  ![Download](index/dashboard-download.png)

## 动态

该页面用于发布 Cocos Creator 的一些官方通知或者活动等，包括 **公告**、**新闻** 和 **更新日志** 三个模块。

![community](index/community.png)

## 教程

可以通过 **教程** 页面访问 Cocos Creator 用户手册、API 手册和其他帮助文档，以及教程和范例项目等。

![learn](index/learn.png)

开发者也可以通过点击左下角各网站的图标访问 Cocos 官方获取更多教程等信息，目前包括微信公众号、[微博](https://weibo.com/cocos2dx)、[Twitter](https://twitter.com/cocos2dx)、[哔哩哔哩](https://space.bilibili.com/491120849)、[YouTube](https://www.youtube.com/channel/UCAsPLdpiAQbFuYqiZvi0P5A) 和 [GitHub](https://github.com/cocos/cocos-engine)。
