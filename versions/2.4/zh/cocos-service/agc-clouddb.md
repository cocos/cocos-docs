> **注意**：此版本文档已归档不再维护，请移步至 [最新版本](https://service.cocos.com/document/zh/agc-clouddb.html)。

# 云数据库（AppGallery Connect）快速入门

传统的移动应用开发，开发者需要从头开始构建每一个服务，开发工作量大，门槛高。开发者在写应用逻辑之外，还需要解决数据管理、端云数据同步和服务器部署维护等难题。

华为 AppGallery Connect（简称 AGC）[云数据库](https://developer.huawei.com/consumer/cn/doc/development/AppGallery-connect-Guides/agc-clouddb-introduction)（Cloud DB）是一款端云协同的数据库产品，提供端云数据的协同管理、统一的数据模型和丰富的数据管理 API 接口等能力。在保证数据的可用性、可靠性、一致性，以及安全等特性基础上，能够实现数据在客户端和云端之间的无缝同步，并为应用提供离线支持，以帮助开发者快速构建端云、多端协同的应用。同时，Cloud DB 作为 AGC 解决方案的一部分，为 AGC 平台构建了 MBaaS（Mobile Backend as a Service，移动后端即服务）能力，从而让应用开发者聚焦于应用本身的业务，极大地提升了生产效率。

### 申请测试资格

目前云数据库服务处于 Beta 测试阶段，若需要使用该服务，请先 [下载申请表格](https://communityfile-drcn.op.hicloud.com/FileServer/getFile/cmtyManage/011/111/111/0000000000011111111.20201029204556.90836227403434525043560975024077:50511102062728:2800:96352C544064A8F08BA8C6A312F6046E5188814BE7C53FC10FE88D68218DADEE.xlsx?needInitFileName=true) 并填写，然后发送至邮箱 `agconnect@huawei.com` 提交申请。

邮件标题请使用 **[云数据库]-[公司名称]-[开发者帐号 ID]-[应用 ID]** 格式，**开发者帐号 ID** 及 **应用 ID** 可参考 [查询应用信息](https://developer.huawei.com/consumer/cn/doc/appgallery_queryappinfo)。收到开发者的申请后，华为运营人员会在 **1-3** 个工作日内答复。

### 如何收费

目前云数据库服务处于 Beta 测试阶段，开发者可以 **免费** 使用。华为会在正式收费前一个月邮件通知并公告相关策略及费率。开通云数据库服务时，系统默认提供如下配额的免费云数据库服务。

| 服务类别 | 配额 |  
| :--- | :--- |  
|  云侧存储容量  | 2GB | 
|  最大并发连接数  | 150 | 
|  云侧数据库每秒最大操作数  | 10 | 

使用云数据库时，若免费的资源配额无法满足开发者当前应用的使用需求，请先 [下载申请表格](https://communityfile-drcn.op.hicloud.com/FileServer/getFile/cmtyManage/011/111/111/0000000000011111111.20201029204556.90836227403434525043560975024077:50511102062728:2800:96352C544064A8F08BA8C6A312F6046E5188814BE7C53FC10FE88D68218DADEE.xlsx?needInitFileName=true) 并填写内容，然后发送到邮箱提交申请。**邮箱**、**邮件标题格式** 和申请云数据库服务测试资格一致。

### 版本更新说明

- 当前版本：0.5.5_1.2.3.301

    - 修复因 JSON 解析库使用方法导致的数据库插入失败问题。

- v0.5.4_1.2.3.301

    - 修复生成器未适配新版 FORMAT-VERSION 的索引导致的崩溃问题。
    - 修复 Query 查询器类型转换问题导致的崩溃。

- v0.5.3_1.2.3.301

    - 升级 SDK 版本到 1.2.3.301。
    - 修复查询器只能查询 String 类型的 bug。
    - 新增 `openCloudZone2` 异步接口、`remove` 移除监听器接口。
    - 在查询结果集的对象中添加 `getObjectTypeName` 和 `getPackageName` 方法。
    - 移除 `setUpgradeProcessMode` 和 `deleteAll` 方法。
    - 回调中若使用 `data.zoneId` 参数，请修改为 `data.zone.zoneId`。
    - 修改 `subscribe` 方法，构造查询条件变更为仅支持等值订阅，也就是只支持使用 `equalTo` 方法构造查询条件。

- v0.5.0_1.2.1.301

    - 集成华为 AGC 云数据库服务。

## 一键接入云数据库服务

### 开通服务

- 确保云数据库服务测试资格申请已通过。

- 使用 Cocos Creator 打开需要接入云数据库服务的项目工程。

- 云数据库依赖于认证服务，所以在集成云数据库服务前，请先开通 [认证服务（AGC）](./agc-auth.md#%E5%BC%80%E9%80%9A%E6%9C%8D%E5%8A%A1)。

- 点击菜单栏的 **面板 -> 服务**，打开 **服务** 面板，选择 **云数据库**，进入服务详情页。然后点击右上方的 **启用** 按钮即可开通服务。详情可参考 [服务面板操作指南](./user-guide.md)。

  ![](agc-clouddb/cdb-panel.png)

- 参考 [管理对象类型](https://developer.huawei.com/consumer/cn/doc/development/AppGallery-connect-Guides/agc-clouddb-agcconsole-objecttypes) 文档，导出 **JSON** 格式的对象类型文件，将其导入云数据库服务面板下方 **云数据库配置文件** 选项中，然后从 AGC 云数据库后台获取版本号，填入 **云数据库对象版本** 选项中。

  ![](agc-clouddb/cdb-jsonconfig.png)

### 配置华为参数文件

大部分的华为相关项目都需要用到 `agconnect-services.json` 配置文件。若有新开通服务等操作，请及时更新该文件。

- 登录 [AppGallery Connect](https://developer.huawei.com/consumer/cn/service/josp/agc/index.html) 后台，在 **项目列表 -> 应用列表** 中找到对应的应用。

- 在 **项目设置** 页面的 **应用** 区域，点击 `agconnect-services.json` 下载配置文件。`agconnect-services.json` 文件在下载或者更新完成后，**必须手动拷贝** 到工程目录的 `settings` 目录下。

  ![](agc-clouddb/cdb-configfile.png)

- Cocos Creator v2.4.3 及以上版本，若 [发布到 HUAWEI AppGallery Connect](../publish/publish-huawei-agc.md)，开发者可直接在 **构建发布** 面板中选取下载或更新后的配置文件，不需要手动拷贝。

  ![](agc-clouddb/cdb-agcfile.png)

### 验证服务是否接入成功

- 完成 **云数据库** 服务接入步骤后，我们便可以通过在脚本中添加简单的代码，来验证接入是否成功。

  ```js
  // "Types" 可替换为配置的对象类型名
  let db = huawei.agc.db;
  let config = db.AGCCloudDBZoneConfig.createConfig("Types", db.SyncProperty.CLOUDDBZONE_CLOUD_CACHE);
  let query = db.AGCCloudDBZoneQuery.where("Types", "queryTest");
  let zone = db.dbService.openCloudDBZone(config, true);
  let result = zone.querySync(query, huawei.agc.db.QueryPolicy.POLICY_QUERY_FROM_CLOUD_PRIOR);
  console.log('Cloud DB', 'query : ' + JSON.stringify(result));
  ```

- 下载测试用的 <a href="agc-clouddb/cdb-agccloudedb.json.zip" target="_blank">数据库文件</a>，解压后将其导入 AGC 后台。

  ![](agc-clouddb/cdb-importdb.png)

- [发布到 Android 平台](../publish/publish-native.md)。请确保 **构建发布** 面板中的包名与华为后台设置的包名一致。

- 工程运行到手机后，若能在 Logcat 中看到数据输出，即为接入成功。

  ![](agc-clouddb/cdb-console.png)

## Sample 工程

开发者可以通过 Sample 工程快速体验云数据库服务。

- 点击云数据库服务面板中的 **Sample 工程** 按钮，Clone 或下载 HUAWEI Sample 工程，并在 Cocos Creator 中打开。

- 将工程中的 `attach/agcclouddb.json` 文件导入到 AGC 云数据库后台，否则会导致 Sample 工程中的云数据库模块无法正常运行。

- 导入完成后，可通过 Creator 编辑器菜单栏的 **项目 -> 构建发布** 打开 **构建发布** 面板来构建编译工程。Creator v2.4.1 及以上版本，可 [发布到 HUAWEI AppGallery Connect](../publish/publish-huawei-agc.md)。Creator v2.4.1 以下的版本可 [发布到 Android 平台](../publish/publish-native.md)。

- Sample 工程运行到手机后，点击首页的 **DB** 按钮，即可进入功能界面进行测试。

  ![](agc-clouddb/cdb-sample.jpg)

## 开发指南

云数据库支持多种数据类型，目前 Cocos Service 提供的云数据库服务支持 `Boolean`、`Integer`、 `Long`、`Float`、`Double` 和 `String` 类型。

本文档对应 [华为云数据库服务 — 使用入门](https://developer.huawei.com/consumer/cn/doc/development/AppGallery-connect-Guides/agc-clouddb-get-started)。

### 初始化

开发者使用云数据库时，需要先执行初始化操作。

#### 设置监听（可选）

若需要对错误返回进行处理，可设置 `error` 监听。

**示例**：

```js
huawei.agc.db.dbService.on("error", data => console.log("Cloud DB", `error : [${data.zone.zoneId}][${data.typeName}] ${data.errCode}:${data.errMsg}`), this);
```

| 参数 | 说明 |  
| :--- | :--- |
| zoneId | Cloud DB zone 名称，表示一个唯一的数据存储区域 |
| typeName | 对象类型名称 |
| errCode | 错误 Code，可参考 [错误码](https://developer.huawei.com/consumer/cn/doc/development/AppGallery-connect-References/clouddb-agconnectclouddbexception#getCode) 文档。 |
| errMsg | 错误信息 |

若需要使用 [侦听实时更新](https://developer.huawei.com/consumer/cn/doc/development/AppGallery-connect-Guides/agc-clouddb-update-listen) 功能，可设置 `subscribe` 监听。

**示例**：

```js
huawei.agc.db.dbService.on("subscribe", data => console.log("Cloud DB", `subscribe : [${data.zone.zoneId}][${data.typeName}][${data.queryId}][${data.subscribeId}] ${data.result}`), this);
```

| 参数 | 说明 |  
| :--- | :--- |  
| zoneId | Cloud DB zone 名称，表示一个唯一的数据存储区域 |
| typeName | 对象类型名称 |
| queryId | 自定义查询 ID，用于查询接口。构造查询条件时，当前仅支持等值订阅，也就是只支持使用 [equalTo()](https://service.cocos.com/document/api/classes/huawei.agc.db.agcclouddbzonequery.html#equalto) 方法，且查询条件中最少包含一个字段，最多包含 5 个字段，多个查询条件之间采用 **与** 运算。 |
| subscribeId | 订阅器的 ID |
| result | 返回信息 |

#### 打开 Cloud DB zone

通过 `openCloudDBZone` 或 `openCloudDBZone2` 方法，打开已配置的 Cloud DB zone。

`openCloudDBZone(config: AGCCloudDBZoneConfig, isAllowToCreate: boolean): AGCCloudDBZone`

`openCloudDBZone2(config: AGCCloudDBZoneConfig, isAllowToCreate: boolean): void`

| 参数名 | 说明 |
| :--- | :--- |
| config | AGCCloudDBZoneConfig 对象，用于创建或者打开 Cloud DB zone 的配置文件 |
| isAllowToCreate | 是否允许创建 Cloud DB zone 对象 |

**示例**：

```js
let config = huawei.agc.db.AGCCloudDBZoneConfig.createConfig("test", huawei.agc.db.SyncProperty.CLOUDDBZONE_CLOUD_CACHE);
this._zone = huawei.agc.db.dbService.openCloudDBZone(config, true);
```

```js
huawei.agc.db.dbService.on("db", data => this._zone = data.zone, this);

let config = huawei.agc.db.AGCCloudDBZoneConfig.createConfig("test", huawei.agc.db.SyncProperty.CLOUDDBZONE_CLOUD_CACHE);
huawei.agc.db.dbService.openCloudDBZone2(config, true);
```

### 写入数据

开发者可以通过 `insertSync` 方法，**同步** 增加或修改数据。

`insertSync(objs : any[], typeName: string): number`

| 参数名 | 说明 |
| :--- | :--- |
| objs | 一个 Object 的列表，表示待写入的数据 |
| typeName | 对象类型名称 |

**示例**：

```js
let objs = [{id: "1", name: "name1"}, {id: "2", name: "name2"}];
let count = this._zone.insertSync(objs, "test");
console.log('Cloud DB', 'insert count : ' + count);
```

### 查看数据

开发者可以通过 `querySync` 方法，**同步** 查询数据。

`querySync(query: AGCCloudDBZoneQuery, policy: QueryPolicy): any[]`

| 参数名 | 说明 |
| :--- | :--- |
| objs | 一个 CloudDBZoneQuery 对象，表示查询条件 |
| policy | 查询的策略，指定查询的数据来源 |

**示例**：

```js
let query = huawei.agc.db.AGCCloudDBZoneQuery.where("test", "queryTest");
let result = this._zone.querySync(query, huawei.agc.db.QueryPolicy.POLICY_QUERY_FROM_CLOUD_PRIOR);
console.log('Cloud DB', 'query : ' + JSON.stringify(result));
```

也可以添加查询条件，支持方法可参考 [API 文档 - AGCCloudDBZoneQuery](https://service.cocos.com/document/api/classes/huawei.agc.db.agcclouddbzonequery.html)。

**示例**：

```js
let query = huawei.agc.db.AGCCloudDBZoneQuery.where("test", "deleteTest").lessThan('id', "5");
```

### 删除数据

开发者可以通过 `deleteSync` 方法，**同步** 删除数据，支持添加查询条件。

`deleteSync(queryIdOrObjs: AGCCloudDBZoneQuery | any[], policy = QueryPolicy.POLICY_QUERY_FROM_CLOUD_PRIOR): number`

| 参数名 | 说明 |
| :--- | :--- |
| queryIdOrObjs | 一个 CloudDBZoneQuery 对象，表示查询条件，或者是一组要删除的对象 |
| policy | 查询的策略，指定查询的数据来源。仅在使用 AGCCloudDBZoneQuery 情况时使用 |

**示例**：

```js
let query = huawei.agc.db.AGCCloudDBZoneQuery.where("test", "deleteTest").lessThan('id', "5");
let count = this._zone.deleteSync(query, huawei.agc.db.QueryPolicy.POLICY_QUERY_FROM_CLOUD_PRIOR);
console.log('Cloud DB', 'delete count : ' + count);
```

## 相关参考链接

- [工作原理](https://developer.huawei.com/consumer/cn/doc/development/AppGallery-connect-Guides/agc-clouddb-introduction#h1-1603358685046)
- [技术指标](https://developer.huawei.com/consumer/cn/doc/development/AppGallery-connect-Guides/agc-clouddb-introduction#h1-1603358685046)
- [FAQ](https://developer.huawei.com/consumer/cn/doc/development/AppGallery-connect-Guides/clouddb-faq)

## API 文档

详细的功能接口和 API 说明，请参考 [云数据库 - API 文档](https://service.cocos.com/document/api/modules/huawei.agc.db.html)。

