# 原生插件

> 注意：对 3.6.2 的原生插件支持有问题，请升级到 3.6.3 或更高版本。


原生插件是编辑器插件的一部分。开发者通过原生插件调用脚本绑定接口（如 sebind）可以扩展 JS 脚本调用 C++ 的接口的能力，对解决脚本的性能瓶颈和复用现有代码库都非常有利。

## 和现有插件系统的关系

原生插件能独立于编辑器插件存在，用户通过拷贝到指定目录就可以使用原生插件。

同时，原生插件也作为现有编辑器插件系统的补充，扩展游戏运行时的能力。利用编辑插件的能力实现对原生插件管理， 如：下载/开关/版本升级等功能。

### 插件的结构

每个插件的根目录下都有一个插件的描述文件 `cc_plugin.json`，这是一个标准的 JSON 文件。

在构建原生工程的时候，构建系统会从工程的 `extensions` 和 `native` 目录中去递归查找这所有的 `cc_plugin.json` 文件，以定位原生插件。一旦在目录中找到 `cc_plugins.json`，就不会再查找子目录中的内容。

## 安装依赖

在少数未安装编辑器的环境下，需要安装 [NodeJS](https://nodejs.org/en/download/) 8.0 以上的版本，以支持插件配置解析。开发者可以将 NodeJS 并设置环境变量 `PATH`，也可以在 `CMakeLists.txt` 中通过设置 `NODE_EXECUTABLE` 指定。

也可以设置环境变量 `NODE_EXECUTABLE` 为 node 的完整路径。3.6.2 开始，如果 CMake 仍然定位不到 nodejs，可以在 `native/engine/common/localCfg.cmake` 中直接设置 `NODE_EXECUTABLE`。

## 目录结构示例

```
├── cc_plugin.json
├── android
│   ├── arm64-v8a
│   ├── armeabi-v7a
│   ├── x86
│   └── x86_64
├── ios
│   ├── include
│   └── lib
├── mac
│   ├── include
│   └── lib
└── windows
    ├── include
    └── lib
```

文件 `cc_plugin.json` 是提供了加载插件所必须的信息，是原生插件的标识。每一个支持的原生平台对应一个目录，目录中至少包含一个 `<PackageName>-Config.cmake` 文件。构建系统会子使用 CMake 的 [`find_package`](https://cmake.org/cmake/help/latest/command/find_package.html#id7) 机制定位或链接到所需的库文件。

如果插件中存在可跨平台的源文件或 CMake 配置, 可以将这些文件合并到顶层目录。详情请参考 [示例工程](https://github.com/PatriceJiang/ccplugin_tutorial/tree/main/NewProject/native/plugins/hello_cocos)。

## 描述文件 `cc_plugin.json` 格式

```ts
{
    "name": string;             // 必填：插件名称
    "version": string;          // 必填：插件版本
    "engine-version":string;    // 必填：对应引擎版本的区间
    "author": string;           // 必填：插件从作者
    "description": string;      // 必填：插件描述
    "platforms":string[];       // 可选：支持的平台列表，不填默认支持所有原生平台。包括 windows, android, mac, ios
    "disabled":true;         // 可选：禁用插件
    "disable-by-platforms":string[];    //可选：指定平台禁用插件
    "modules": [{                        // 必填：插件包含的库, 
        "target":string;                // 必填：对应 `find_package` 名称，需和 `CC_PLUGIN_ENTRY` 的首参数保持一致
        "depends": string|string[];     // 可选：依赖其他 module 名称 
        "platforms":string[];           // 可选：重新限定支持的原生平台
    }]
    
}
```

`engine-version` 可以指定版区间和排除指定版本，代码示例如下：
 
```ts
"engine-version": ">=3.3 <= 3.6.0 !3.5.2|| 4.x"
```

### 文件示例

```json
{
    "name":"hello-cocos-demo",
    "version":"0.1.0",
    "author":"demo group",
    "engine-version":">=3.6.0",
    "description": "demo project",
    "modules":[
        {
            "target":"hello_cocos_glue"
        }
    ],
    "platforms":["windows", "android", "mac", "iOS"]
}
```

## 安装原生插件

开发者可以从 Store 下载并启用包含原生插件的编辑器扩展，同时完成插件的安装到 `extensions` 目录。也可以从论坛获取插件压缩包，手动解压到 `native/` 目录或其子目录。

如果想关闭插件，或者仅在特地平台关闭，可以修改 cc_plugin.json 中的 `disabled` 和 `disable-by-platforms` 字段。

> **注意**：原生插件要求 CMake 为 3.12+，Android 需要 [指定 CMake 版本](https://developer.android.com/studio/projects/install-ndk#vanilla_cmake) 为 3.18.1. 其他平台使用编辑器内建的 CMake，可不必指定版本号。

## 创建原生插件

Cocos 原生工程使用 CMake 管理，原生插件会通过 find_package 的搜索路径/目录来进行管理，因此只要目录符合 CMake find_package 的搜索规则，插件就能正确加载。所以，原生插件的开发过程，就是提供 CMake 配置和相关的资源，以及编写 cc_plugin.json 的过程。相关示例请参考 [原生插件构建工程示例](./tutorial.md)。
