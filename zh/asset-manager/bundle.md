# Asset Bundle 介绍

> 文： Santy-Wang

从 v2.5 开始， Creator 正式支持 Asset Bundle 功能。 Asset Bundle 作为模块化资源的工具，能够允许开发者按照项目需求将贴图，脚本，场景等等资源划分在不同的 Asset Bundle 中，在游戏运行过程中，按照需求去加载不同的 Asset Bundle ，尽可能减少启动时需要加载的资源数量。 Asset Bundle 能够按需求随意放置，比如可放在远程服务器上，本地，或者小游戏平台的子包中。

## 常见问题 QA

Q: Asset Bundle 所带来的优势是什么？

A: Asset Bundle 主要用于对工程中的资源按照开发者的意愿进行模块划分，可以将不同场景不同需求的资源划分在多个包中，从而可以减少首次下载和加载游戏时所需要的时间。

Q: Asset Bundle 与 v2.5 之前的资源分包有什么区别？

A: 
1. 资源分包本质上是游戏平台的基础功能，比如微信小游戏支持子包功能，而 Creator 进行了一次封装，帮助用户进行设置，但本质上此功能由对应平台控制，如果对应平台不支持子包功能，则 Creator 也不支持，而 Asset Bundle 完全由 Creator 设计实现，是帮助开发者对资源进行划分的模块化工具，与平台无关，理论上可在所有平台上支持。

2. 资源分包实际上是将一些图片，网格拆分出去单独放在一个包内，但这个包是不完整，无法复用，无逻辑的，而 Asset Bundle 是通过逻辑划分对资源进行模块化，Asset Bundle 中包括资源，元数据，资源目录，所以 Asset Bundle 是完善的，有逻辑的，可复用的，完全可以从 Asset Bundle 中加载出整个场景或其他任何资源， Asset Bundle 通过拆分，可以极大减少首包中的 json 数量以及 settings.js 的大小。

3. 资源分包是跟平台相关的，意味着需要按照平台要求的方式进行设置，比如微信子包是无法放在远程服务器上的，只能放在腾讯的服务器上，而 Asset Bundle 不受这些限制，Asset Bundle 可以放在本地，放在远程服务器上，甚至就放在微信的子包中。

Q: Asset Bundle 是以什么形式组织的？

A: 在项目中 Asset Bundle 是通过对文件夹进行设置， **文件夹中的资源以及文件夹之外的相关依赖资源** 都会被合并到同个 Asset Bundle 中，而在打包之后，所有的 Asset Bundle 都会放在 `${OUTPUT_PATH}/assets/` 中，每一个文件夹为一个 Asset Bundle ，你可以按照自己的需求不移动或将不同的 Asset Bundle 移动到远程服务器或微信子包中。

Q: Asset Bundle 可以用来做大厅加子游戏的模式么？

A: 当然可以，可以将子游戏的场景放在 Asset Bundle 中，在需要时进行加载。

Q: Asset Bundle 可以减少 settings.js 的大小么？

A: 当然可以，实际上在 v2.5 之后，打包之后的工程完全是基于 Asset Bundle 的， setting.js 不再存储跟资源相关的任何配置信息。所有的配置关系表以 config.json 的形式存储于每个 Asset Bundle 中。每一个 config.json 只存储本 Asset Bundle 中的资源信息。可以简单的理解为所有的 config.json 合起来等于以前的 settings.js 。

Q: Asset Bundle 还能在细分么？比如我想将单个 Asset Bundle 再拆分成两个部分。

A: 首先，这不符合 Creator 的架构设计，在 Creator 的设计中，Asset Bundle 是最小单位，无法再细分，你可以选择在项目中新建一个 Asset Bundle ，再将一部分资源移到另一个 bundle 中从而达到拆分的目的。其次，Creator 在构建时会使用多种优化方式优化包体，而这些优化方式是以 Asset Bundle 为单位的，如果对 Asset Bundle 打包后的内容进行强行拆分，可能导致加载失败。

Q: Asset Bundle 能跨项目复用么？

A: 在某些前提下，可以做到跨项目复用 Asset Bundle 。1. 当引擎版本相同， 2. Asset Bundle 中用到的自定义脚本都包含在其本身之中， 3. Asset Bundle 没有其他外部依赖 bundle  时，确实可以做到跨项目复用。

Q: Asset Bundle 可以做到分离首场景么？

A: 当然可以，你可以在构建面板上只选择首场景，则首场景会被放到内置 Asset Bundle `main` 中，而其他场景你可以拖到其他 Asset Bundle 的文件夹下，在运行时通过 Asset Bundle 动态加载场景出来，从而实现首包只包含首场景。

Q: Asset Bundle 可以嵌套设置么？比如 A 文件夹中有 B 文件夹，A 和 B 都可以设置为 Asset Bundle 么？

A: 请看下面关于 Asset Bundle 嵌套的说明。

## 内置 Asset Bundle

从 v2.5 开始，整个系统基于 Asset Bundle ，即使你没有用到任何 Asset Bundle ，任何一个工程在构建后都会存在 3 个内置的 Asset Bundle ，如图所示：

![builtinBundles](bundle/builtinBundles.png) 。

即是说，从 v2.5 开始，所有资源都会存在 Asset Bundle 中。 所有 resources 目录下的资源以及其依赖资源将放在 resources 的 Asset Bundle 中，所有内置资源以及其依赖资源将放在 internal 的 Asset Bundle 中，所有在构建面板所勾选的场景以及其依赖资源都将放在 main 的 Asset Bundle 中。

与其他 Asset Bundle 一样，你可以将内置的 Asset Bundle 放到远程服务器，本地或小游戏平台的子包中。仅需要改动下启动代码中的 resourcesRoot , internalRoot , mainRoot 为真实的路径即可。

![launch](bundle/launch.png) 

## Asset Bundle 的类型

当文件夹设置为 Asset Bundle 之后，会将文件夹内以及文件夹外部依赖的资源都合并到 Asset Bundle 中，也就是说可能存在某个资源本身不在 Asset Bundle 文件夹下，但同时被两个 Asset Bundle 所依赖，从而属于两个 Asset Bundle ，如图所示：

![shared](bundle/shared.png) 

此时资源 c 既属于 Asset Bundle A ，也属于 Asset Bundle B 。那资源 c 究竟会存在哪一个 bundle 中呢。此时就需要通过调整 Asset Bundle 的类型来确定资源 c 究竟放在哪一个 bundle 中。

Asset Bundle 的两种类型：

1. Shared bundle ，顾名思义就是共享 bundle 。当多个 bundle 引用了同一个资源时，该资源会被优先放入 Shared Bundle 中，而其他 bundle 将只会存储一条记录信息。比如上面的例子，如果 Asset Bundle A 设置为 Shared Bundle ，则资源 c 将会放在 Asset Bundle A 中，而 Asset Bundle B 中只会存在一个记录信息。你可以通过 Asset Bundle A 直接加载到资源 c , 当然你也可以通过 Asset Bundle B 来加载资源 c ，但你需要先加载了 Asset Bundle A 才能加载成功，否则会提示你依赖了其他 Asset Bundle 。此类型的 Asset Bundle 多用于包含独立的，与外部无关的资源，比如 Texture、SpriteFrame、Audio 等。比如你可以将所有需要的贴图放在一起，配置为一个 shared bundle ，进入游戏之后提前加载这个 Shared Bundle ，则后续所有 bundle 都能正常加载。

**注意** ：Shared bundle 和 Shared bundle 之间不能有资源复用，否则在构建时会提示报错。

2. Normal Bundle ，当 Normal Bundle 与 Shared Bundle 复用同个资源时，资源会优先放到 Shared Bundle 中，而这个 Shared Bundle 会作为 Normal Bundle 的依赖，你想通过 Normal Bundle 去加载共享资源时，必须先去加载真正包含这个资源的 Shared Bundle ；而当 Normal Bundle 与 Normal Bundle 复用同个资源时，资源会复制到每一个 Normal Bundle 中。此时任何一个 Normal Bundle 都可以正常加载该资源，比如上面的例子，如果 Asset Bundle A 与 Asset Bundle B 都设置为 Normal Bundle ，则资源 c 会复制出两份存在两个 bundle 中，你可以通过任何一个 bundle 加载到资源 c ，而不需要依赖其他 bundle 。此类型多用于包含与外部相关的资源，比如 Scene，Prefab 等。

**注意** ：如果 Normal Bundle 之间引用了同个资源，该资源会复制多份出来，造成包体增加的问题。所以你必须规划自己的 bundle 内容，将一些公用的资源尽量放在 Shared Bundle 中，这样全局将只会存在一份资源。而一些不复用的资源就没有必要放在 Shared Bundle 下，避免 Shared Bundle 过大，影响加载时间。

## Asset Bundle 的构造

构建发布时，会对 Asset Bundle 文件夹下所有的 **代码** 和 **资源** 进行以下的相关处理：

  - **代码**：Asset Bundle 文件夹下的所有代码会根据发布平台合并成一个命名为 `index.js` 或 `game.js` 的入口脚本文件，并且会将这些代码从主包中剔除。
  - **资源**：会把 Asset Bundle 文件夹下的所有资源以及外部所依赖的资源都放在 `import` 或 `native` 目录下。
  - **资源配置**：会将所有资源的配置信息包括路径，类型，版本信息合并为一个命名为 `config.json` 的文件。

构建之后的目录如图所示：

![export](bundle/exported.png) 

## Asset Bundle 嵌套问题

当两个文件夹都设置为 Asset Bundle ，而两个文件夹是互相包含时，那此时两个 Asset Bundle 会处于嵌套状态，即其中一个 Asset Bundle 是另一个 Asset Bundle 的超集。 Creator 并不会对这种情况做任何特殊的处理，只会简单的将其视为两个 Asset Bundle ，最后打包出去的内容遵从于两个 Asset Bundle 的类型设定。 Creator 不建议将两个 Asset Bundle 进行嵌套，因为这可能会导致多份资源存在，增加包体

## Asset Bundle 中的脚本

因为 Asset Bundle 是支持脚本分包的，如果你的 Asset Bundle 下有脚本文件，则所有脚本会被合并为一个 js 文件，并从主包中剔除。在加载 Asset Bundle 时，会尝试去加载这个脚本文件。

**注意** ：有些平台不允许加载远程的脚本文件，例如微信，在这些平台上，如果你想将代码放到 Asset Bundle 中，请确保你的 Asset Bundle 不要放在远程服务器上。

## 加载 Asset Bundle

在通过 API 加载 Asset Bundle 时，引擎并没有去将该 bundle 中的所有资源加载出来，而只是去加载 Asset Bundle 的资源清单，即 `config.json` 文件以及 Asset Bundle 中的脚本文件。加载完成之后会返回一个使用资源清单构造出来的 `cc.AssetManager.Bundle` 类的实例。你可以用这个实例去加载 Bundle 中的各类资源。

---

继续前往 [终结器](finalizer.md) 说明文档。