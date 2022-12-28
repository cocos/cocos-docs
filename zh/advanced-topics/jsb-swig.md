## 简介

从 Cocos Creator 3.7.0 开始，我们将生成 JS 绑定代码的方式从 [bindings-generator](https://github.com/cocos/cocos-engine/tree/d08a11244d2a31da1aac7af7d2aa8f1b6152e30c/native/tools/bindings-generator) 改为 [Swig](https://www.swig.org)。 Swig 通过解析与 C++ 兼容的接口定义语言 (IDL) 的方式来生成胶水代码，此方式有较多好处 。 关于我们为什么改用 Swig，可以参考[此 issue](https://github.com/cocos/cocos-engine/issues/10792)。

## 为引擎模块生成绑定代码

- 确保你已经安装了 NodeJS，版本号大于或等于 v8.9.4

- 打开终端 ( macOS / Linux) 或者命令提示符 ( Windows ), 进入到 `engine/native/tools/swig-config`目录

- 执行 `node genbindings.js`

- 如果运行成功，可见如下日志输出
  
  ```
  ======================================================================
      Congratulations, JS binding code was generated successfully!
  ======================================================================
  ```

- 如果失败，你需要检查输出日志来确认在 .i 文件中是否存在一些错误。

## 为开发者的项目生成绑定代码

- 确保你已经安装了 NodeJS，版本号大于或等于 v8.9.4

- 打开终端 ( macOS / Linux) 或者命令提示符 ( Windows ), 

- 创建一个用于存放自动绑定胶水代码的目录，例如： `/Users/abc/my-project/native/engine/common/Classes/bindings/auto`

- 写一个 JS 配置文件
  
  - 创建一个 JS 配置文件, 路径例如： `/Users/abc/my-project/tools/swig-config/swig-config.js` ，内容为：
    
    ```js
    'use strict';
    const path = require('path');
    
    // 开发者自己的模块定义配置
    // configList 是必须的
    const configList = [
        [ 'your_module_interface_0.i', 'jsb_your_module_interface_0_auto.cpp' ],
        [ 'your_module_interface_1.i', 'jsb_your_module_interface_1_auto.cpp' ],
        // ......
    ];
    
    const projectRoot = path.resolve(path.join(__dirname, '..', '..'));
    // interfaceDir 是可选的
    const interfacesDir = path.join(projectRoot, 'tools', 'swig-config');
    // bindingsOutDir 是可选的
    const bindingsOutDir = path.join(projectRoot, 'native', 'engine', 'common', 'Classes', 'bindings', 'auto');
    
    module.exports = {
        interfacesDir, // 可选参数, 如果没有指定，configList 中的路径必须为绝对路径或者相对于当前 swig-config.js 的相对路径
        bindingsOutDir, // 可选参数，如果没有指定, configList 中的路径必须为绝对路径或者相对于当前 swig-config.js 的相对路径
        configList // 必填参数
    };
    ```
  
  - 执行如下命令
    
    ```bash
    # 如果当前终端或者命令提示符所在的目录不是在 '/Users/abc/my-project/tools/swig-config'
    $ node < 引擎的根目录 >/native/tools/swig-config/genbindings.js -c /Users/abc/my-project/tools/swig-config/swig-config.js
    ```
    
    ```bash
    # 如果你已经在 '/Users/abc/my-project/tools/swig-config' 目录, 你执行命令的时候可以不需要带上 -c 参数，例如：
    $ cd /Users/abc/my-project/tools/swig-config
    $ node < 引擎的根目录 >/native/tools/swig-config/genbindings.js
    ```

## Swig 接口定义文件

- 在引擎的 `engine/native/tools/swig-config` 目录下有一个 [swig-interface-template.i](swig-interface-template.i) 模版文件。你可以拷贝其到自己的工程目录下并重命名。此模版文件中包含一些注释用于展示如何在 .i 文件中配置你的模块。你也可以参考在 `engine/native/tools/swig-config` 目录下引擎内部的 .i 文件，例如：参考 `scene.i` 或者 `assets.i` 来快速上手。
- 如果你使用 `Visual Studio Code`, 你可以安装  `Hong-She Liang`  开发的 `SWIG Language` 扩展，其可用于 .i 文件的语法高亮。 
- 关于编写 .i 文件的更多详细信息，建议参考下面 [教程](#Tutorial) 章节。

## 教程

请访问 [在 Cocos Creator 中的 Swig 工作流教程](jsb/swig/tutorial/index.md), 其包含如何一步一步地为引擎内的新模块或用户工程模块配置绑定。
