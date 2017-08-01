# Cocos Creator User Manual

## Environment Setting

需要首先准备以下环境：

- [Node.js](https://nodejs.org/en/)
- [npm](https://www.npmjs.com/) 一般会和 Node.js 一起安装

下载本仓库后，首先执行

`npm install` 来安装文档工具依赖。

## 文档开发工作流程

### 源文件

- 在 [/source](source/) 目录下添加和编辑文档手册的 markdown 源文件
- 源文件分为 [zh](source/zh) 和 [en](source/en) 两种语言，开发者只需要编辑中文版
- 源文件可以按照类别放在不同的子文件夹中，比如 `get-started`, `scripting`等等，子文件夹将会反映在最终生成页面的路径上
- markdown 文件中到其他 markdown 的链接全部使用相对链接，扩展名也要写上`[link](path/to/link.md)`，这样在 github 预览时链接才会正确
- 生成 html 站点时，所有到 `md` 文件的链接都会被转化成到`html`文件的链接
- 比较小的图片直接用 markdown 格式贴 `![image](path/to/image.png)`，比较大的图片用这种格式 `<a href="index/ui_cover.png"><img src="index/ui_cover.png" alt="ui cover"></a>`

### 生成和预览文档

一般有两种文档编辑环境，本地用文本编辑器编辑，以及在线直接编辑。

本地编辑的情况下，在 Cocos Creator 根目录运行

```bash
npm run make-zh-doc # 生成中文文档
npm run make-en-doc # 生成英文文档
```

即可构建和打开生成的 html 文件，无需架设 http 服务器。

文档会生成到 [\output](output/) 目录下的 `zh` 和 `en` 目录，对应中英文两种语言。

### 导航菜单编辑

左侧导航菜单的内容由 [meta.json](source/zh/meta.json) 生成。

每一个菜单项包括 `name` 和 `link` 两个必要属性，name 就是菜单上显示的文本，link 就是该项目的链接。

注意链接要写相对路径，也就是文档首页到各个子页面的路径。

菜单内容完全按照 json 里的数据录入顺序生成，每个对象条目可以嵌套更多对象表示子类别内容，需要使用`submenu`字段标记子类别：

```json
	{
		"name": "Cocos Creator 入门",
		"link": "getting-started/index.html",
		"submenu": [
			{
				"name": "关于 Cocos Creator",
				"link": "getting-started/introduction.html"
			},
			{
				"name": "安装和启动",
				"link": "getting-started/install.html",
				"new": true
			}
		]
	}
```

如果新增内容需要引起读者的注意，也可以加入 `"new": true` 字段。

## 文档书写规范

格式规范的目的是为了提供统一的书写准则，并使成品文档有更好的阅读体验。

### 专有英文名词、组件名使用正确的首字母大写

正确：

> 使用 GitHub 登录

> Sprite 组件

错误：

> 使用 github 登录

> sprite 组件

### 中英文之间需要增加空格

正确：

> 本站点使用 Jekyll 搭建，应用 HPSTR 主题。文章保存在 `_posts` 目录下。

错误：

> 本站点使用Jekyll搭建，应用HPSTR主题。文章保存在`_posts`目录下。

完整的正确用法：

> 请尽量避免直接使用系统自带的 Ruby，推荐使用 rbenv 来管理本地 Ruby 运行环境，同时使用 ruby-build 来安装 Ruby，现使用的 Ruby 版本为 2.1.1。

### 中文与数字之间需要增加空格

正确：

> 今天出去买菜花了 5000 元

错误：

> 今天出去买菜花了 5000元

> 今天出去买菜花了5000元

### 数字与单位之间需要增加空格

正确：

> 我家的带宽有 1 Gbps，硬盘一共有 10 TB。

错误：

> 我家的带宽有 1Gbps，硬盘一共有 10TB。

### 面板名称或其他重要界面元素，用加粗显示，并且旁边加空格

正确：

> 打开 **属性检查器** 来查看属性

> 点击 **创建按钮** 创建新节点

### 编辑器文档中，属性名按照属性检查器里显示的格式书写，两边加 backtick 和空格

正确：

> `Scale` 属性决定了节点的缩放

> `Sprite Frame` 属性是资源引用类型

### 脚本文档中，属性和方法名按照 API 里显示的格式书写，两边加 backtick 和空格

正确：

> 通过 `this.node.scale` 来设置节点的缩放

> `this.getComponent(cc.Sprite).spriteFrame` 可以动态改变节点渲染的图像


### 中文排版时，一律使用全角（fullwidth）中文标点

正确：

> 嗨！你知道吗？今天前台的小妹跟我说“喵”了哎！

错误：

> 嗨！你知道吗？今天前台的小妹跟我说"喵"了哎！

> 嗨！你知道吗?今天前台的小妹跟我说"喵"了哎!

### 中英排版时，一律使用全角（fullwidth）中文标点

正确：

> 核磁共振成像（NMRI）是什么原理都不知道？JFGI！

错误：

> 核磁共振成像(NMRI)是什么原理都不知道？JFGI！

> 核磁共振成像(NMRI)是什么原理都不知道?JFGI!

### 中英排版时，遇到完整的英文整句，整句内容使用半角（halfwidth）英文标点

正确：

> 乔帮主那句话怎么说的？“Stay hungry, stay foolish.”

错误：

> 乔帮主那句话怎么说的？“Stay hungry，stay foolish。”


### 中文链接增加空格

建议用法：

> 访问我们网站的最新动态，请 [点击这里](#) 进行订阅。

对比用法:

> 访问我们网站的最新动态，请[点击这里](#)进行订阅。


### 参考链接

- [中文文档格式规范](https://github.com/anjuke/coding-style/blob/master/text/chinese.md)
- [文案排版指北](https://github.com/sparanoid/chinese-copywriting-guidelines)
