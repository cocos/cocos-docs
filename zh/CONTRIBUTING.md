## 中文文档书写规范

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
- [中文技术文档的写作规范](https://github.com/ruanyf/document-style-guide)
