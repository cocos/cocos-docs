# Introduction to the Build process and FAQ

## Introduction to the Build Infrastructure

The build process mainly includes the following two parts:

- **General build processing**
- **Construction processing for each platform**

Due to the adjustment of the build mechanism in v3.0, the build process of different platforms is injected into the **Build** panel in the form of **build plugins**, each participating in the build process. The build options specific to each platform are displayed in the **Build** panel in the form of expanded options. Developers can inject custom build options into the panel through [Build Plugin](custom-build-plugin.md).

![build-engine](./build-guide/web.png)

## General Build process flow

The general Build process of Cocos Creator mainly includes the following contents:

1. Initialization of build options
2. Build data organization
3. Write the built resources to the file system
4. Organize `settings.json`/`config.json` data
5. UUID compression and file writing in `config.json`

### Initialization of Build options

This step is mainly to initialize the **initial options** passed to the build during the build to **build internal options**, complete the format conversion of some of the build options, initialize the resource data of the build resource database, and load the latest resource information And classified.

### Build data organization

When building, the editor will first summarize the current scenes involved in the build and all resources in the [Bundle](../../asset/bundle.md) and then search for dependent resources through engine deserialization, and recursively find a list of all the resources that need to be packaged. After the resource list is summarized, the resources will be classified according to the Bundle configuration, and scripts, image compression tasks, and json grouping information will be collected.

The engine will configure the scripting environment of the entire project before deserialization, that is, load all non-plug-in scripts. Whether the script is successfully loaded will directly affect the deserialization, so if the script fails to load because the script is not correctly written, it will directly cause the build to fail.

If the engine finds that the dependent resources are missing during the deserialization process, it will issue a warning, but will continue to build. The warning does not mean that the problem does not need to be solved. If the resource is lost and it is not solved, it is difficult to guarantee that the content after the build is correct.

### Write the built resources to the file system

The constructed resources will be configured according to the [Asset Bundle](../../asset/bundle.md#%E9%85%8D%E7%BD%AE%E6%96%B9%E6%B3%95) and distributed in different locations. After the build is completed, the Asset Bundle will be packaged into the `assets/[Bundle name]` under the corresponding platform release package directory. The directory structure is as follows:

![build-engine](./build-guide/bundle.png)

For more information about Asset Bundle configuration, construction, file description, etc., please refer to the [Asset Bundle](../../asset/bundle.md) documentation.

After finishing the basic build tasks, the build will continue with the other build processes according to the unprocessed units of each Bundle.

It is divided into the following steps:

- **Script construction**: The script construction in the editor is divided into **plug-in scripts** and **non-plug-in scripts**.

    - The plug-in script will directly copy the source files according to the original directory structure to the `src` directory under the release package directory generated after the build, so the plug-in script does not support any script form that needs to be compiled, such as TypeScript or JavaScript (ES6). The resource information of the plug-in script will be written into the jsList array in settings.

    - All non-plugin scripts will be packaged into `project.js` (`project.dev.js` in debug mode) and placed in the corresponding `src` directory. Checking the `sourceMap` option will generate the corresponding map file, and determine whether the script is compressed according to the debug option.

- **Automatic Atlas Processing**: Will query the Auto Atlas resource information within the project, package the SpriteFrame small images under the atlas into a large image, generate serialized files, etc. according to the configuration of the automatic atlas resource. This step will modify the json grouping information, asset resource grouping information, and add texture compression tasks. If the Auto Atlas is not checked in the build option, no processing will be performed.

- **Texture compression**: According to the organized image compression task, the image resources are compressed and written into the build folder. If the build option is not checked for texture compression, no processing will be performed.

- **Engine construction**: According to the **function tailoring** in the project settings, remove the unused engine modules and pack them into the cocos-js directory. Checking the `sourceMap` option will generate the corresponding map file, and determine whether the script is compressed according to the debug option.

    The main steps of engine packaging include:

    - Get **engine module information in project settings**.

    - **Check** whether the engine version in the cache is consistent with the engine currently to be compiled, and if the content is consistent, copy it directly without compiling.

    - If compiling is needed, execute the task of packaging the engine according to the engine interface, then copy the compiled js file and save the modification time of the engine;

      When compiling the engine, [output log information](./build-panel.md#%E6%9E%84%E5%BB%BA-log-%E4%BF%A1%E6%81%AF%E6%9F%A5%E7%9C%8B) can be viewed:

      ![build-engine](./build-guide/build-engine.jpg)

      Regarding the reuse rules of engine files, it is necessary to elaborate:<br>
      The packaged engine file will be placed in the editor's global temporary directory (use `Build.globalTempDir` to print during the build process). The cache file is stored as the name according to the hash value generated by the parameters that will affect the engine compilation.

      ```bash
      global-temp-folder
      |--CocosCreator
          |--x.xx(3.0.0)
              |--builder
                  |--engine
                      |--1dc4a547f9...63a43bb8965.watch-files.json
                      |--1dc4a547f9...63a43bb8965
                      |--1dc4a547f9...63a43bb8965.meta
                  ...
      ```

      As long as any relevant engine build parameters are changed, the engine will be recompiled. The specific effects on the use of the build engine cache are:

        - debug: whether to open the debug mode
        - includeModules: engine module settings
        - sourceMaps: whether to enable sourceMap
        - platform: build platform
        - Engine modification time
        - Whether to check the separation engine (only WeChat mini game platform)
        - Use engine path

- **JSON build**: When serializing JSON, it will be merged and written into the file system (in the folder `assets/xxxBundle/import`) according to the JSON grouping and the bundle to which it belongs. If it is in **release mode, it will also serialize JSON The UUID inside is compressed**.

- **Common Asset Copy**: Some raw assets (rawAssets) are directly copied from the library to the built folder `assets/xxxBundle/native`.

- **md5 processing**: Add the `.md5` suffix to all resources in the `res` folder, and organize the data to be recorded in settings.

- **application.js template file generation**: Inject some project settings into the `application.js` file according to user options and generate it to the release package directory generated after the build.

### Organize settings/config data

It is mainly based on the data compiled by previous resources to prepare the configuration information necessary for the game to start.

About the general analysis of `settings.json` structure:

```js
{
    debug: boolean; // 是否为调试模式，取自构建发布面板
    designResolution: ISettingsDesignResolution; // Canvas 分辨率设置，取自项目设置中的数据
    jsList: string[];
    launchScene: string; // 初始场景 url
    moduleIds: string[]; // 所有用户脚本组件的信息
    platform: string;
    renderPipeline: string;// renderPipeline 信息，取自项目设置
    physics?: IPhysicsConfig;// 物理模块设置（仅在勾选了物理引擎模块时生成）
    BundleVers: Record<string, string>; // Bundle 的 md5 文件戳
    subpackages: string[]; // 分包信息
    remoteBundles: string[]; // 记录远程包 Bundle 的集合
    // server: string;
    hasResourcesBundle: boolean; // 是否含有 resources 内置 Bundle
    hasStartSceneBundle: boolean; // 是否含有初始场景内置 Bundle
    customJointTextureLayouts?: ICustomJointTextureLayout[];
    macros?: Record<string, any>; // 引擎 Macro 配置值，取自项目设置
}
```

关于 `config.json` 的通用解析如下：

```js
{
    importBase: string; // Bundle 中 import 目录的名称，通常是 'import'
    nativeBase: string; // native 中 native 目录的名称，通常是 'native'
    name: string; // Bundle 的名称，可以通过 Bundle 名称加载 Bundle
    deps: string[]; // 该 Bundle 依赖的其他 Bundle 名称
    scenes: Array<{url: string, uuid: string}>; // Bundle 内包含的场景信息数组
    rawAssets: { [index: string]: { [uuid: string]: string[] } };
    // 存储 resources 下加载的资源 url 与类型
    // 示例: "bba00d3a-2f17-4511-b47c-0d584b21b763@6c48a": ["test/right/texture", "cc.Texture2D", "bba0...@6c48a"]
    // "bba0...@6c48a": ["test/right/texture", 1, 1]
    packs: Record<string, IUuid[] | number[]>; // json 分组信息
    versions: { 
        import: Array<string | number>;
        native: Array<string | number>;
     }; // 勾选 md5Cache 后才有，数组部分以 [uuid_1, md5_1, uuid_2, md5_2, ...] 的格式存储，其中 uuid_1 如果是个简单数字说明存储的是 uuids 数组内的 uuid 索引
    uuids: string[]; // uuid 数组，仅 release 模式下
    types?: string[]; // 资源类型数组，仅 release 模式下
    encrypted?: boolean; // 原生上使用，标记该 Bundle 中的脚本是否加密
    isZip?: boolean; // 是否为 zip 模式
    zipVersion?: string;
}
```

这里的结构仅列举了通用流程下 `settings.json`/`config.json` 的结构，实际上在不同的平台打包时，是根据需要来添加配置的。

### config.json 中的 uuid 压缩与文件写入

资源打包过程中会不断地收集参与资源构建的资源 uuid，最终整理到构建后生成的 Bundle 的 `config.json` 中，在生成 `config.json` 之前会根据是否为调试模式来决定是否对文件中的 uuid 做压缩处理。

构建时会对所有使用到的 uuid 进行整理，出现 **两次及以上** 的会存储到 `uuids` 数组中，并将之前使用到的 uuid 的位置替换为索引。<br>
所有出现 **两次及以上** 的 `types` 也会存储到 `types` 数组中，并将之前使用到的位置替换为索引。

#### 构建资源

该步骤对资源的构建是打包除了脚本以外的资源文件，因为脚本是作为特殊文件另外打包处理的。在打包资源阶段，编辑器会先汇总 **当前参与构建的场景以及所有 Bundle 目录下的资源，每个资源的打包都会经过引擎的反序列化，查找出依赖资源再递归进行资源的打包**。在反序列化之前会先配置整个项目的脚本环境，也就是加载所有的非插件项目脚本。因为脚本的加载正确与否会直接影响到反序列化的进行，因而如果脚本编写的不合法加载失败会直接导致构建失败。如果在反序列化过程中发现有依赖的资源丢失会发出警告，但会继续进行构建。这里的警告并不意味着问题不需要解决，**如果资源丢失不解决，是难于保证构建后的内容不出问题的**。

资源在打包过程中执行反序列化后会重新压缩序列化，以减小打包之后的包体。texture 资源的序列化文件会全部打包成一个 json 文件，其他序列化文件则根据构建配置参数来决定是否分包。

#### 构建脚本

编辑器内对脚本的构建分为 **插件脚本** 和 **非插件脚本** 两类，详情请参考上部分内容中对 **脚本构建** 的说明。

## 各平台构建处理

构建提供了部分生命周期的钩子函数，方便开发者在构建的不同处理时期参与构建，影响构建结果。同时构建也提供了开发者直接添加部分自定义构建选项的方法，可以修改构建选项配置页的 UI 界面、数据检验等等，详情请参考 [构建插件](custom-build-plugin.md)。构建插件注入的构建选项将会存放在 `options.packages` 内部，因而目前通过命令行构建的选项参数编写方式也需要遵循此规则。

### 各平台的编译/生成流程

自 Cocos Creator 3.0 起，所有需要/支持单独编译、生成的平台的构建流程都已经拆分出来，可能会有部分开发者疑惑现今的小游戏平台为何新增了 **生成** 按钮，事实上之前这部分逻辑也一直存在，只不过合并在 **构建** 中，无法进行单独控制。

编辑器的 **构建** 类似于一个 **导出对应平台游戏包** 的功能，主要是完成引擎对各个平台的接口、以及游戏包基本格式兼容，并不代表完成全部工作。各个平台通常还会有自己的编译流程，例如微信小游戏平台自带的开发者工具的编译上传功能，以及各个原生平台相关 IDE 的编译运行调试功能。如果开发者需要针对特定平台进行定制化打包处理，就需要编辑器先支持流程上的拆分才能更好地接入。

## 常见问题指南

构建的整个进程是在一个单独的 worker 内的，所以如果想要查看构建过程的日志信息或者查看出现报错时完整的调用栈，可以点击主菜单的 **开发者 -> 打开构建调试工具** 查看。构建时其实会输出很多的日志信息，但是为了不干扰用户，默认只有错误信息和重要信息会被打印到编辑器的控制台，调试工具中的日志信息才是最完整的。当然，也可以在 **偏好设置 -> 资源数据库 -> 日志等级** 中设置输出日志等级，详情可以参考 [构建相关文档](./build-panel.md)。

> **注意**：在构建之前 **请先确保参与构建的场景是可以正常预览的**。一些场景的资源丢失或者其他脚本问题，是在预览阶段便能暴露出来的。在保证预览正常的情况下构建能更好地节约时间以及排查问题。

### 资源加载 404

这种情况下，请复制报错资源丢失的日志中的 `uuid` 到 **资源管理器** 中查找对应的资源，查看该资源依赖的资源是否都正常。资源加载 404 通常有以下几种情况：

1. **在脚本内动态加载了没有放在 Bundle 中的资源**。

    - **原因**：通过上面的介绍，我们知道只有在 Bundle 目录下的资源及其依赖资源，以及参与构建场景的资源及其依赖资源才会被打包到最终的构建文件夹中，并且 **只有直接放进 `Bundle` 文件夹中的资源 url 才会写入到 config.json**。所以如果在脚本中使用了某个资源但这个资源没有放在任何 Bundle 目录下，加载的时候便会出现 404 了。

    - **解决方案**：将使用到的资源移动在 Bundle 文件夹下。

2. **加载的资源导入有问题，未能正常生成数据到 library 中**

    - **原因**：构建时所有的原始数据都是通过读取 library 中的资源文件获得的，如果导入失败将无法获取到正确对应的资源信息。

    - **解决方案**：通过 **资源管理器** 找到对应资源，点击右键，选择菜单中的 **重新导入资源**。

3. **资源丢失**

    - **原因**：在前面的构建流程中介绍过，**资源的构建会经过反序列查找依赖资源**，而最经常出现问题的就是所依赖的资源在项目迭代过程中被不小心删除而导致资源丢失。这些资源的丢失可能平时并没有注意到，但一旦执行构建便会暴露出来。

    - **解决方案**：通过代码编辑器查找该 uuid 被哪些资源所引用，修改对应资源。

### 脚本资源加载报错

在前面介绍的 **构建数据整理** 部分内容时有提到过，构建时需要配置脚本环境。如果报错信息与脚本相关，请参考报错内容对脚本进行修改。如果不清楚是哪个脚本的报错，可以在报错信息调用栈中找到对应脚本的 uuid，然后在 **资源管理器** 中查找定位。

### 如何查找到小图自动合图后的大图

自动图集在构建过程中会打印出原始小图与合成的大图的 uuid 信息，在构建调试工具中便可以查找到，然后用查找到的大图的 uuid 在打包后生成的 `XXXBundle/native` 目录中查看即可。如果合图太多，可以打开构建 log 用搜索 uuid 的方式查找。

![build-atlas](./build-guide/build-atlas.jpg)

### 如何解压缩 uuid

在 release 模式下打包出来的资源 json 以及 `config.json` 中的 `uuid` 都是压缩后的，需要将其解压才能找到对应原项目中的资源。构建进程中内置了一些工具方法在全局变量 Build 上，直接点击主菜单中的 **开发者 -> 构建调试工具**，在控制台里输入以下命令：

```js
Build.Utils.decompressUuid('425o80X19KipOK7J1f5hsN');
// 42e68f34-5f5f-4a8a-938a-ec9d5fe61b0d
```

<!-- ### 如何查找到资源序列化 json 在构建后包体内的位置

json 打包后都会存放在 `assets/XXXBundle/import` 文件夹内，如果是普通资源直接用 uuid 去文件夹内搜索即可。 -->

### 引擎编译失败

如果是自定义引擎编译失败，请检查你修改的代码，或者自定义引擎路径。<br>
如果是引擎编译失败，请附上 Creator 版本、构建选项配置、构建任务中的构建日志文件以及可复现问题的 demo 到 [论坛](https://forum.cocos.org/c/58) 反馈。

### 其他报错

如果遇到其他无法自行解决的构建报错信息，请附上 Creator 版本、构建选项配置、构建任务中的构建日志文件以及可复现问题的 demo 到 [论坛](https://forum.cocos.org/c/58) 反馈。
