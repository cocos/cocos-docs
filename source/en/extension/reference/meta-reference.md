# meta 文件参考

meta 文件是 Creator 编辑器在导入资源文件（asset）时创建的，用于记录引擎使用该资源时所需的数据。每个资源文件/文件夹都在成功导入到 assets 中之后，都会生成一个对应的 meta 文件。

本文将为你揭开 meta 文件的神秘面纱。

## meta 文件的内容

先来看一个简单的 meta 文件内容：

```
{
  "ver": "1.0.1",
  "uuid": "9550860d-d844-4789-8dea-7a9c2a7627be",
  "isGroup": false,
  "subMetas": {}
}
```

不同类型的资源，meta 文件的内容是不同的。但是每个 meta 都一定会有的两个属性：

* **uuid**：该资源的唯一标识符，meta 文件创建时随机生成。
* **ver**：meta 文件的版本号，由资源对应的 meta 类定义。主要用于判断资源在不同版本的 Creator 编辑器中是否需要重新导入。

其他的属性都是由资源类型对应的 meta 类定义的。目前，meta 的定义方式是闭源的。暂时还不支持自定义类型的 meta。

## meta 文件的创建与管理

meta 文件是由 Creator 编辑器中的 `AssetDB (asset database)` 模块创建与管理的。对资源文件的增删改操作都会使得 meta 文件被更新或者删除。

这里，需要提醒的一点是：

**请不要随意的删除 meta 文件！请不要随意的删除 meta 文件！请不要随意的删除 meta 文件！**

重要的事情说三遍，原因其实在前面已经提到了：

* meta 文件中的 uuid 是创建时随机生成的。而且这个 uuid 是资源的唯一标识符。
* 资源文件之间的引用都是依赖于 uuid 的。例如，场景中使用了一张图片资源，那么在这个场景的 fire 文件中，会记录这个图片资源的 uuid。
* 一旦删除了 meta 文件，那么这个资源的 uuid 就发生了变化。之前使用这个资源的地方将会遇到无法找到资源的问题。

## meta 文件的编辑

在 Creator 编辑器中，选择资源管理器面板中的任一资源。在属性检查器面板就可以编辑该资源的 meta 文件属性了。如下图：

![modify-meta](meta-reference/modify-meta.png)

1. 选择需要编辑的资源
2. 修改资源的属性
3. 选择保存或者放弃修改

## Creator 插件与 meta 文件

很多 Creator 插件的开发者会有这样的疑问：

1. 我在插件的代码中已经将资源文件拷贝到了项目的 assets 文件夹中，为什么资源管理器中并没有显示出来呢？
2. 在插件代码中如何获取以及修改某个资源的 meta 数据呢？

下面针对这两个问题进行解答：

1. 因为资源及其 meta 文件都是由 AssetDB 模块进行管理的。所以，在插件中，不能通过简单的文件拷贝来导入资源。而需要通过 AssetDB 模块的接口来进行导入。导入资源的接口说明如下：

	```
   // 在 page 层，使用 Editor.assetdb.import 接口
   // Import files outside asset-db to specific url folder.
   // The import result will be sent through ipc message 'asset-db:assets-created'
   // @method import
   // @param {array} rawfiles - Rawfile path list
   // @param {string} destUrl - The url of dest folder
   // @param {boolean} showProgress - Show progress or not
   // @param {function} cb - The callbak function
   // @example
   // Editor.assetdb.import( [
   //      '/file/to/import/01.png',
   //      '/file/to/import/02.png',
   //      '/file/to/import/03.png',
   // ], 'db://assets/foobar' );
   // 
   Editor.assetdb.import ( rawfiles, destUrl, showProgress, cb );

   // 在 core 层，使用 Editor.Ipc.sendToMain 发消息来实现
   // 这个是临时方案，后续 Creator 版本会将 core 层与 page 层行为统一，使用 import 接口即可
   Editor.Ipc.sendToMain('asset-db:import-assets', rawfiles, destUrl, showProgress, cb, -1);
  ```

	需要特别说明的是：
	* rawfiles 为需要导入的文件绝对路径数组。而且不能是 assets 文件夹中的文件。
	* destUrl 必须为已经在 assets 中存在的资源文件夹。

2. 目前只能在 page 层获取 meta 数据。可以参考[AssetDB API Render](../api/asset-db/asset-db-renderer.md)。示例代码：

	```
  Editor.assetdb.queryMetaInfoByUuid( uuid, function ( err,info ) {
    // info 中包含以下属性：
    // assetType: 资源类型
    // defaultType: meta 类定义的 defaultType 接口返回值（一般与 assetType 一致）,
    // assetUrl: 资源的 Url（格式如：db://assets/foobar）,
    // assetPath: 资源文件在文件系统中的绝对路径,
    // metaPath: meta 文件在文件系统中的绝对路径,
    // metaMtime: meta 文件的最后修改时间,
    // assetMtime: 资源文件的最后修改时间,
    // isSubMeta: 是否为 subMeta,
    // json: meta 文件中的内容

    var meta = JSON.parse(info.json);

    // 在这里修改 meta 的属性

    Editor.assetdb.saveMeta(meta.uuid, JSON.stringify(meta), err => {
        // meta 属性已修改，继续处理
    });
  });
	```
