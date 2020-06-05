# Asset Manager

> 文：Santy-Wang

在开发游戏过程中，会需要使用大量的图片，音频等资源来丰富整个游戏的内容。而大量的资源，会带来管理上的困难，所以 Creator 提供了 `Asset Manager` 模块来帮助开发者管理其资源的使用，提升开发效率。

`Asset Manager` 是 Creator 在 v2.4 新推出的资源管理器，用以替代之前的 `cc.loader`。新的 `Asset Manager` 模块实现了所有资源的相关功能，包括加载，查询，销毁，缓存，以及 Asset Bundle，并且提供了极大的扩展性，你可以利用 Asset Manager 扩展你需要的功能。


相关参考：

- [Asset Manager 概览](asset-manager.md)
- [Asset Bundle](bundle.md)
- [资源释放](release-manager.md)
- [下载器与解析器](downloader-parser.md)
- [加载与预加载](preload-load.md)
- [缓存管理器](cache-manager.md)
- [可选参数](options.md)
- [管线与任务](pipeline-task.md)


**注意**：`cc.loader` 中的常用 API 依旧会保持一段时间内的兼容，但我们强烈建议新项目统一使用 Asset Manager。