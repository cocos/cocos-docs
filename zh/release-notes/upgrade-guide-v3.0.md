# Cocos Creator 3.0 升级指南

## 版本介绍

Cocos Creator 3.0 集成了原有 2D 和 3D 两套产品的所有功能，带来了诸多重大更新，将做为 Creator 之后的主力版本。同时 3.0 还延续了 Cocos 在 2D 品类上轻量高效的优势，并且为 3D 重度游戏提供高效的开发体验。

为了保障现有的 Cocos Creator 2.4 项目平稳过渡，我们会将 2.4 做为 LTS（长期支持）版本，提供后续**两年**的持续更新！在 **2021** 年，2.4 将继续更新版本，提供缺陷修复和新的小游戏平台支持，保障大家的项目成功上线；在 **2022** 年我们还将为开发者持续提供 2.4 的关键问题修复，保障已上线的游戏平稳运营！因此，

 - **现有的 2.x 项目可以安心继续开发，无需强制升级 3.0**。
 - **新项目则建议使用 3.0 版本开发**，我们会不断优化 3.0 的开发体验和运行效率，支撑好 2D、3D 等不同品类的重度游戏顺利上线。

而原有的 Cocos Creator 3D 做为 Creator 的分支版本，已经面向中国进行了长达一年的迭代，成功上线了**星空大决战**、**最强魔斗士**等重度项目！3.0 发布后，Creator 3D 也将包含在 3.0 中，现有的 1.2 项目都可直接升级，因此 Cocos Creator 3D 后续不会再发布独立版本。

虽然**我们不建议开发中的项目，特别是即将上线的项目强升 3.0**，但如果现有项目有特殊原因需要升级，大家也可以联系 zhengxiong.zhao@cocos.com 获取我们的人工协助！

此次发布的 3.0 Preview 版本，在功能上已经接近正式版，可以用于新项目立项和特性预研，欢迎大家使用！后续的正式版会在春节前后发布，届时将进一步完善性能、修复问题，确保大家的新项目能顺利推进。

3.0 使用了面向未来的全新引擎架构，将为引擎带来高性能、面向数据及负载均衡的渲染器，并且无缝支持 Vulkan & Metal 多后端渲染，未来还会支持移动端 VR/AR 及部分主机平台。关于 3.0 的详细介绍，请移步 [官网更新说明](https://cocos.com/creator)。

## 如何迁移（Preview 版本暂不支持）

虽然**我们不建议开发中的项目，特别是即将上线的项目强升 3.0**，但是我们仍将在 3.0 正式版推出 2.x 资源导入工具。此工具将支持旧项目资源完美导入，以及代码的辅助导入。代码辅助导入会把 js 转换成 ts，添加组件类型声明、属性声明及函数声明，组件在场景中的引用都会得到保留，并且函数内部的代码会以注释的形式导入进来，可以减轻开发者的升级难度。

用户只需要点击主菜单中的**文件->导入->CocosCreator 2D 项目**，即可出现导入插件的窗口。

![image](https://user-images.githubusercontent.com/1503156/100599538-20b8c880-333b-11eb-9831-bf176730b777.png)
![image](https://user-images.githubusercontent.com/1503156/100599556-26161300-333b-11eb-8b85-31e144300f73.png)
![image](https://user-images.githubusercontent.com/1503156/100599545-23b3b900-333b-11eb-844a-876ad09fe7c6.png)

然后在点击左图下按钮并选择 CocosCreator 2D 项目的根目录，插件会自动遍历项目中所有的资源呈现给用户，用户可以用自行勾选需要导入的资源，选择后可以点击右图中的导入按钮即可完成导入。

如果现有项目有特殊原因需要升级，并且遇到了技术上或者工作量上的困难，也可以联系 zhengxiong.zhao@cocos.com 获取我们的人工协助！

## 旧版本开发者快速上手

### 引擎 API 升级

#### 组件类名更改（针对 v1.2 用户）

为了符合 Creator v2.x 的 API 规范，Creator 3.0 将组件类名包含 Component 后缀这样的命名方式舍弃了，并做了数据的自动升级和代码的兼容。

不过建议开发者还是要在代码中搜索所有类似命名方式的使用，并尽快更改为无 Component 后缀的类名。可以使用下面正则表达式进行全局搜索（打开大小写敏感和正则匹配）：

```
([A-Z]\w+)Component
```

#### 废弃节点上 UI 相关接口（针对 v2.x 用户）

被废弃的接口如下：
- 属性：`width`、`height`、`anchorX`、`anchorY`
- 方法：`getAnchorPoint`、`setAnchorPoint`、`getContentSize`、`setContentSize`

请先获取节点上的 `UITransform` 组件，再使用对应的接口，例如：
```typescript
node.getComponent(UITransform).setContentSize(size);
```

#### loader

loader API 与 v2.4 一致，可以参考 [v2.4 资源管理模块升级指南](https://docs.cocos.com/creator/manual/zh/release-notes/asset-manager-upgrade-guide.html)

#### 其它废弃的接口

（暂缺）

### 编辑器升级

#### 构建面板

Creator 3.0 中所有平台的构建都内置为插件，因此构建面板也与 Creator v2.4 的不同，各平台独有的构建选项会单独放在一个可折叠的 section 控件内。

![image](https://user-images.githubusercontent.com/1503156/100602713-3d56ff80-333f-11eb-8280-d58e262ccc2b.png)

点击构建按钮后会跳转到 **构建任务** 面板，所有构建后的平台都会显示在这个面板中。可以在这个面板中修改构建后工程的构建选项再重新构建、可以查看构建日志、打开工程目录等。如果需要编译其他平台的话，点击面板左上方的 **新建构建任务** 按钮即可。

![image](https://user-images.githubusercontent.com/1503156/100602806-5cee2800-333f-11eb-8dfe-4ba7e8e9283a.png)

另外，构建时支持构建成文件分离的多模块结果，便于多模块并发加载、动态加载模块，以及微信引擎插件支持选择不同物理引擎后端。构建完成后生成的 settings.js 也改为 settings.json，并放置在 res 下，允许作为资源上传服务器。

#### 资源缩略图面板

选中资源管理器中的资源，即可在资源缩略图面板中显示资源缩略图方便查看：

![image](https://user-images.githubusercontent.com/1503156/100602913-78f1c980-333f-11eb-9f9a-18e214548ce7.png)

#### 动画编辑器升级

- 支持节点树面板中节点的搜索与显示过滤
- 支持使用系统剪贴板复制粘贴节点上的所有动画数据（节点、轨道以及关键帧）
- 支持多选节点后批量添加属性轨道
- 优化关键帧选取和取消选取的操作体验（Ctrl + 鼠标点击选中关键帧可取消选中）
- 支持多选关键帧后继续点击编辑曲线或者选中未选中关键帧
- 支持在动画编辑状态下继续编辑节点属性，包括粒子和模型材质属性等

![image](https://user-images.githubusercontent.com/1503156/100603114-a2aaf080-333f-11eb-8bd3-0997721adcb6.png)

#### 项目设置面板更新

分成 Engine 模块、项目设置、压缩纹理配置三大部分。
物理碰撞组独立使用 PhysicsSystem.PhysicsGroup 类型，不再与 Node.Layers 共享分组配置：

![image](https://user-images.githubusercontent.com/1503156/100603220-be15fb80-333f-11eb-9ddd-a6b97455c468.png)

压缩纹理配置修改为在项目设置中配置预设，然后在资源管理器中选中图片资源，再选择预设的方式。旧项目升级后，编辑器会自动扫描项目内的所有压缩纹理配置情况，整理出几个预设。由于是自动扫描的，生成的名称可能不是想要的，可以自行在此处修改。

![image](https://user-images.githubusercontent.com/1503156/100603295-d259f880-333f-11eb-8ff9-c985df953d83.png)

#### 编辑器插件系统升级

（暂缺）

### TypeScript 参考教程

- [TypeScript 官方网站](https://www.typescriptlang.org/)
- [TypeScript - Classes](https://www.typescriptlang.org/docs/handbook/classes.html)
- [TypeScript - Decorators](https://www.typescriptlang.org/docs/handbook/decorators.html)
- [X 分钟速成 TypeScript](https://learnxinyminutes.com/docs/zh-cn/typescript-cn/)
