# 导入其他编辑器项目

## 简介

通过 Cocos Creator 主菜单中 `文件->导入项目` 的子菜单，可以导入其他编辑器中的项目。目前支持导入的编辑器项目有：

* Cocos Studio 项目（*.ccs 文件）
* Cocos Builder 项目（*.ccbproj 文件）

相应的菜单项如图：

![import-menu](./project-import/import-menu.png)

## 操作步骤说明

导入其他编辑器项目的操作步骤如下：

1. 点击相应的菜单，打开文件选择对话框。
2. 选择对应扩展名的文件，即可开始导入。如图：
	![select-file.png](./project-import/select-file.png)
3. 导入过程中 Cocos Creator 的控制台窗口会持续输出 log 以显示当前的导入进度。如下图：
	![import-process.png](./project-import/import-process.png)
	
	输出的 log 说明：
	* 首先输出导入的工程文件全路径。
	* 中间持续输出正在导入的文件。
	* 当导入完成时，会输出 `Import XXX project finished.` 的 log。（其中 XXX 为项目所用编辑器名称）
	* 最后输出资源导入后所在的 url。

**备注：**
导入项目所需时间长短取决于项目大小。在导入过程中请勿在 Cocos Creator 中执行其他操作，耐心等待导入完成。

## Cocos Studio 项目导入说明

### 实现方案

* Cocos Studio 工程中的 csd 文件分为三类：
	* Scene ---- 导入为场景文件（.fire）
	* Layer ---- 导入为 prefab
	* Node ---- 导入为 prefab
* csd 文件中记录的节点帧动画数据，导入为 anim 文件。
* 导入后的目录结构：
	* Cocos Studio 工程导入后存放在 assets 目录下一个独立的文件夹中（文件夹以 Cocos Studio 工程名命名）。
	* Cocos Studio 工程中使用的资源文件以相同的目录结构导入到 Cocos Creator 工程中。
	* csd 文件中的帧动画数据存放在一个子目录中，子目录命名为 [csd文件名]_action
* 目前 Cocos Studio 中部分控件在 Cocos Creator 中暂不支持。这些控件在导入过程中，为相应的节点添加 StudioComponent 组件，并将控件数据保存在 StudioComponent 组件中。不支持的控件类型有：
	* 复选框
	* 艺术数字
	* 滑动条
	* 列表容器
	* 翻页容器
* StudioComponent 组件数据如下图：
	![studio-component.png](./project-import/studio-component.png)

	其中 1 为组件的类型，对应于 Studio 中的控件；2 为控件数据，不同的类型显示相应的数据。

### 目前无法支持的情况

* 不支持骨骼动画数据的导入
* 不支持 csi 文件的导入（对应的图片以碎图的形式导入，而不是合图）
* 不支持节点的 SkewX 与 SkewY 属性以及相应的动画
* Particle 不支持 Blend Function 属性，同时 Sprite 和 Particle 的动画编辑中也不支持 Blend Function 属性的动画

### 特别说明

Cocos Studio 项目导入功能是基于 Cocos Studio 3.10 版本进行开发与测试的。如果要导入旧版本的项目，建议先使用 Cocos Studio 3.10 版本打开项目。这样可以将项目升级到对应版本，然后进行导入操作。

## Cocos Builder 项目导入说明

### 实现方案

* 所有的 ccb 文件都导入为 prefab。
* ccb 文件中的帧动画数据，导入为 anim 文件。
* 导入后的目录结构参考 Cocos Studio 项目导入的实现。

### 目前无法支持的情况

* CCControlButton 可以设置不同状态下文本的颜色，Cocos Creator 不支持
* 不支持渐变色的 Layer 节点
* 不支持节点的 skew 属性以及动画
