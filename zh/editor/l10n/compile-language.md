# 语言编译

![overview](compile/overview.png)

当在 [收集并统计](collect-and-count.md) 视图中选定本地开发语言后，即可对编译过程进行配置。

## 语言

开发者可以在此处选择目标版本的语言。

![add](compile/add-lang.png)

第一行的语言为 **本地开发语言**，记录当前开发过程中所使用的本地语言，通常是开发者最熟悉的语言。在该语言下，**操作** 栏中会出现 **补全** 功能，用于记录 Label 组件的原文，需搭配 [L10nLabel](l10n-label.md) 使用。详情请参考下文。

从第二行开始，则是目标地区所使用的语言，开发者需至少选择一个目标语言，才会出现翻译选项。

## 译文服务商识别的语言

![provider](compile/lang-provider.png)

在下拉菜单中可以选择目标语言，语种类型由译文服务商提供的

## 翻译进度

![progress](compile/progress.png)

展示当前的翻译进度。

## 操作

### 补全

**补全** 供仅在当前语言设置为 **本地开发语言** 时生效。补齐功能的作用是记录当前开发语言中所要翻译的内容的原文。

![complemenet](compile/complement.png)

当在预制体或场景内通过 [L10nLabel](l10n-label.md) 组件添加键值后：

![new key](compile/new-key.png)

可在 **补全** 界面中找到对应的键值，在 原文（Original） 一栏中输入该键值对应的文本，然后点击 **保存** 按钮即可将原文保存：

![unfilled](compile/unfilled.png)

### 变体

变体是同一种含义的多种表达。通过丰富化翻译结果，避免单一表述，提升多样性。

在 **补全** 界面中，点击 **变体** 按钮可以输入新的变体：

![otehr](compile/other.png)

在 **补全** 完成后，记得需要点击上方的 **保存** 按钮进行保存。

### 翻译

当在 **补全** 功能中，添加了键值和原文后，即可以使用译文服务商的翻译服务进行翻译，点击 **翻译按钮** 可弹出翻译界面：

![translate](compile/translate.png)

点击右上方的 **翻译** 按钮，进行翻译：

![translate-overview](compile/translate-overview.png)

翻译完成后可在 **翻译** 分页内查看翻译结果：

![complete](compile/translate-complete.png)

对于已翻译的文本，也可以点击 **变体**，添加不同的翻译：

![variant](compile/translated-variant.png)

### 预览

点击预览可快速预览当前场景持有 [L10nLabel](l10n-label.md) 组件的节点在该语言下的展示情况:

![preview](compile/preview-overview.png)

预览前：

![pev](compile/original-preview.png)

翻译后：

![prev](compile/translate-preview.png)

### 导出

点击 **导出** 按钮可以将原文/已翻译的内容导出为 PO 文件。

> PO 文件是软件开发中一种常见的基于文本对象的文件，通常用于记录界面翻译的结果。

![export](compile/export.png)

以下是一些辅助翻译工具，开发者可根据需求自行选择：

- Manipulating PO Files
- PO 格式编辑器 [https://poedit.net/](https://poedit.net/)
- PO 格式工具箱 [https://github.com/translate/translate](https://github.com/translate/translate)
- 离线 translation memory 工具 [OmegaT - The Free Translation Memory Tool - OmegaT 3](https://omegat.org/)

### 删除

![del](compile/delete.png)

删除当前语言已翻译的进度，确认后结果不会被保存，请谨慎操作。

### 非文本资源

当项目中存在画在图片上的文字、不同语种配音的视频和音频时，也可能有多语言的需求。此时翻译界面会提供 **导入** 按钮，此处以图片为示例，展示如何配置多语言：

![image](compile/import-image.png)

> **注意**：导入时，只可导入项目内的文件。

当 **收集和统计** 完成后，被检测出的资源将会以路径作为键值的形式存在。

![assets](compile/asset.png)

通过点击 **导入** 按钮，导入目标语言所需的图片即可：

![dest image](compile/import-other-lang-jpg.png)

### 导入文件

通过 **导入文件** 按钮可以将外部数据文件进行导入，支持 PO、CSV 以及 XLSX 格式。

对于 CSV 和 XLSX 的格式要求如下图：

![xlsx](compile/xlsx.png)

文件需采用 UTF-8 编码格式。

![csv](compile/import-csv.png)

导入后，如需手动翻译，其流程和上述文档一致。
