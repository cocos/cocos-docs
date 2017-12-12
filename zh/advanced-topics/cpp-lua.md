# C++/Lua 引擎支持

Cocos Creator 可以很高效的编辑场景和 UI，同时内置支持 JavaScript，这对 JavaScript 开发者十分友好。可是对于 C++/Lua 开发者，无法直接利用 Creator 高效的界面编辑功能，可能有一些遗憾。

为了去除这种遗憾，我们提供了 __creator_to_cocos2dx__ 插件，它允许开发者导出 Creator 编辑的场景到 Cocos2d-x 的 C++/Lua 工程中。插件逻辑上分为两部分，第一部分是 Creator 的插件，负责把 Creator 制作的场景导出为 _.ccreator_ 文件；第二部分是 reader，负责在 C++/Lua 工程中解析导出的 _.ccreator_ 文件。

详细的使用文档请点击 [creator_to_cocos2dx 插件](../../../../cocos2d-x/manual/zh/editors_and_tools/creator_to_cocos2dx.html)