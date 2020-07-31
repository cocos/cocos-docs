# 华为 AGC - APM 性能管理

华为 AppGallery Connect（简称 AGC）性能管理（APM，App Performance Management）服务，提供分钟级应用性能监控能力，开发者可以在 AGC 查看和分析 APM 收集到的应用性能数据，从而全面了解所开发应用的性能特点，快速精准修复应用存在的性能问题，持续提升应用的用户体验。

## 主要功能

| 功能 | 说明 |
| --- | --- |
| 自动采集应用启动、应用屏幕、HTTP/HTTPS 网络请求等方面的性能数据 | APM SDK 能够自动采集应用启动、应用屏幕、HTTP/HTTPS 网络请求等关键性能数据。<br><br>1. 应用启动性能数据：记录应用启动（冷启动和热启动）时间。<br><br>2. 应用屏幕性能数据：记录应用屏幕渲染缓慢帧和冻结帧数量。<br><br>3. HTTP/HTTPS网络性能数据：SDK记录响应时长，成功率，响应大小等指标数据。 |
| 支持查看和分析应用性能数据，精准发现应用性能在哪些方面有改进空间 | APM 通过多个维度（版本号、国家/地区、手机类型、一级区域、系统版本、运营商、网络）向您展示应用的性能指标，帮助您快速了解应用在哪些方面可优化改进。 |
| 支持创建自定义跟踪记录，监控应用在特定场景下的性能 |  借助APM SDK，您可以：<br><br>1. 创建自定义跟踪记录来监控应用在特定场景，如用户登录或者屏幕加载场景下的性能。<br><br>2. 为自定义跟踪记录添加指标（如登录次数）和属性（如登录是否成功）。|

## 开通服务

点击菜单栏的 **面板 -> 服务**，打开 **服务** 面板，进入 **性能管理** 服务详情页，然后点击右上方的 **启用** 按钮即可。参考 [一键开通服务](./user-guide.md#3、一键开通服务)。

![](agc-apm/apm-provisioning.jpeg)

如果华为后台的 **APM 性能管理** 服务尚未开通，需登录 [AppGallery Connect](https://developer.huawei.com/consumer/cn/service/josp/agc/index.html) 网站，点击 **我的项目**。

进入 **质量 -> 性能管理**，如果 **性能管理 APM** 服务未开通，请点击 **立即开通** 按钮，开通服务。

![](agc-apm/apm-open.png)

## 配置华为参数文件

大部分的华为相关项目都需要用到 `agconnect-services.json` 配置文件。若有新开通服务等操作，请及时更新该文件。

我们将该文件统一放在工程下的 `/setting` 目录，Creator 2.4.2 以上版本可在 **构建** 面板直接配置该文件。

Creator 2.4.2 以下版本，请参照以下步骤：

1. 登录 [AppGallery Connect](https://developer.huawei.com/consumer/cn/service/josp/agc/index.html) 网站，点击 **我的项目**。
2. 在项目列表中找到您的项目，在项目下的应用列表中选择您的应用。
3. 在 **项目设置** 页面的 **应用**区域，点击 `agconnect-services.json` 下载配置文件。
4. 将 `agconnect-services.json` 文件拷贝到工程目录下的 `/settings` 目录。

## 验证服务是否接入成功

- 完成 **APM 性能管理** 服务接入步骤后，可以 [**打包发布**](../publish/publish-native.md) 到 **Android** 平台上运行，请确保发布的包名与华为后台设置的包名一致。

- 登录 [AppGallery Connect](https://developer.huawei.com/consumer/cn/service/josp/agc/index.html) 网站，打开对应项目， 进入 **质量 -> 性能管理**，确认应用性能数据可以正常显示（通常会在 15 分钟内显示）。即可验证服务接入成功。

![](agc-apm/apm-console.jpeg)

## Sample 工程

您可以通过 Sample 工程快速体验 APM 服务 。

## API 文档

### 设置 APM 服务开关

对应 [华为 AGC 文档 - 在应用客户端停用](https://developer.huawei.com/consumer/cn/doc/development/AppGallery-connect-Guides/agc-apms-stopapms#h1-1584589061111)。开关的默认值为打开 (true)，表示启用 APM 应用性能数据采集。如果需要停用APM应用性能数据采集，可将开关值设为关闭 (false)。

应用客户端停用级别 **高于** AGC 远程配置停用。如用户在应用客户端停用性能监控，即使通过 AGC 远程配置打开性能监控开关，APM 也不会进行性能数据采集。

#### 函数定义

| 返回类型 | 函数及说明  |
| --- | --- |
| void | enableCollection (enable)<br>设置APM服务开关，对应华为文档 [enableCollection](https://developer.huawei.com/consumer/cn/doc/development/AppGallery-connect-References/apms#enableCollection) 接口 |

|  参数     |   类型         |  含义 |  
|  :---------- |  :------- |  :------------- |  
|  enable    |  boolean  |  APM服务开关。<br>**true**：打开，APM会采集性能监控数据。<br>**false**：关闭，APM不会采集性能监控数据。| 

#### 示例代码

```
huawei.AGC.apms.enableCollection(true);
```

### 添加自定义跟踪记录（可选）

对应 [华为 AGC 文档 - 添加自定义跟踪记录](https://developer.huawei.com/consumer/cn/doc/development/AppGallery-connect-Guides/agc-apms-addtrace)。自定义跟踪记录可用于监控您的应用在特定场景下的性能，如应用登录场景、应用页面长时间无响应场景等。

#### 函数定义

| 返回类型 | 函数及说明  |
| --- | --- |
| void | startCustomTrace (name)<br>启动自定义跟踪记录，对应华为文档 [start](https://developer.huawei.com/consumer/cn/doc/development/AppGallery-connect-References/customtrace#start) 接口 |
| void | stopCustomTrace (name)<br>停止自定义跟踪记录，对应华为文档 [stop](https://developer.huawei.com/consumer/cn/doc/development/AppGallery-connect-References/customtrace#stop) 接口 |
| void | putCustomTraceProperty (name, propertyName, propertyValue) <br>添加自定义属性，对应华为文档 [putProperty](https://developer.huawei.com/consumer/cn/doc/development/AppGallery-connect-References/customtrace#putProperty) 接口，每个实例最多只能设置5个自定义属性。 |
| void | removeCustomTraceProperty (name, propertyName)<br>移除自定义属性，对应华为文档 [removeProperty](https://developer.huawei.com/consumer/cn/doc/development/AppGallery-connect-References/customtrace#removeProperty) 接口 |
| string | getCustomTraceProperty (name, propertyName)<br>获取自定义属性值，对应华为文档 [getProperty](https://developer.huawei.com/consumer/cn/doc/development/AppGallery-connect-References/customtrace#getProperty) 接口 |
| void | incrementCustomTraceMeasure (name, measureName, measureValue)<br>增加自定义跟踪记录指标的指标值，对应华为文档 [incrementMeasure](https://developer.huawei.com/consumer/cn/doc/development/AppGallery-connect-References/customtrace#incrementMeasure) 接口，如果指标不存在，将创建一个新指标。如果自定义跟踪记录未启动或已停止，接口不生效 |
| string | getCustomTraceMeasure (name: string, measureName: string)<br>获取自定义跟踪记录指标值，对应华为文档 [getMeasure](https://developer.huawei.com/consumer/cn/doc/development/AppGallery-connect-References/customtrace#getMeasure) 接口 |
| void | putCustomTraceMeasure (name, measureName, measureValue)<br>添加自定义跟踪记录指标，对应华为文档 [putMeasure](https://developer.huawei.com/consumer/cn/doc/development/AppGallery-connect-References/customtrace#putMeasure) 接口 |
| string(JSON) | getCustomTraceProperties: (name)<br>获取自定义跟踪记录的所有属性键值对，对应华为文档 [getTraceProperties](https://developer.huawei.com/consumer/cn/doc/development/AppGallery-connect-References/customtrace#getTraceProperties) 接口 |

#### 参数说明

|  参数     |   类型         |  含义 |  
|  :---------- |  :------- |  :------------- |  
|  name    |  string  |  自定义跟踪记录名称，只能包含中文、字母（不区分大小写）、数字和下划线，且长度不能超过100字符，所有函数需要根据该名称获取对象调用。若当前名称的对象不存在则会新建一个对象。 | 
|  propertyName    |  string  |  自定义属性名称，只能由中文、字母（不区分大小写）、数字和下划线组成，且长度不超过40字符。| 
|  propertyValue    |  string  |  自定义属性值，只能由中文、字母（不区分大小写）、数字和下划线组成，且长度不超过100字符。| 
|  measureName    |  string  |  自定义跟踪记录指标名称。| 
|  measureValue    |  string  |  自定义跟踪记录指标值，需传入 long 型数值。| 

#### 示例代码

```
var traceID = "testTrace";
var pName = "product";
var pValue = "food";
var mName = "MeasureName";
var mValue = "12000";

huawei.AGC.apms.startCustomTrace(traceID);

huawei.AGC.apms.putCustomTracePropert(traceID, pName, pValue);

var propertValue = huawei.AGC.apms.getCustomTraceProperty(traceID, pName);
console.log("pValue = ", propertValue);

huawei.AGC.apms.removeCustomTraceProperty(traceID, pName);

huawei.AGC.apms.putCustomTraceMeasure (traceID, mName, mValue);

huawei.AGC.apms.incrementCustomTraceMeasure (traceID, mName, mValue);

var measureValue = huawei.AGC.apms.getCustomTraceMeasure(traceID, mName);
console.log("mValue = ", measureValue);

var tProp = huawei.AGC.apms.getCustomTraceProperties(traceID);
console.log("tProp = ", JSON.stringify(tProp));

huawei.AGC.apms.stopCustomTrace(traceID);

```

### 添加针对特定网络请求的监控指标（可选）

对应 [华为 AGC 文档 - 添加针对特定网络请求的监控指标](https://developer.huawei.com/consumer/cn/doc/development/AppGallery-connect-Guides/agc-apms-addnetworkmeasure)。自定义跟踪记录可用于监控您的应用在特定场景下的性能，如应用登录场景、应用页面长时间无响应场景等。

| 返回类型 | 函数及说明  |
| --- | --- |
| string | initNetworkMeasure (url, httpMethod)<br>针对每个网络请求，创建网络请求指标实例，用于采集网络性能数据，**返回值即为下面所需的 id 参数**。对应华为文档 [createNetworkMeasure](https://developer.huawei.com/consumer/cn/doc/development/AppGallery-connect-References/apms#createNetworkMeasure) 接口。 |
| void | startNetworkMeasure (id)<br>设置请求开始时间，对应华为文档 [start](https://developer.huawei.com/consumer/cn/doc/development/AppGallery-connect-References/networkmeasure#start) 接口。 |
| void | stopNetworkMeasure (id)<br>设置请求结束时间，并上报网络请求指标及自定义属性数据，对应华为文档 [stop](https://developer.huawei.com/consumer/cn/doc/development/AppGallery-connect-References/networkmeasure#stop) 接口。 |
| void | setNetworkMeasureStatusCode (id, statusCode)<br>设置请求的响应码，对应华为文档 [setStatusCode](https://developer.huawei.com/consumer/cn/doc/development/AppGallery-connect-References/networkmeasure#setStatusCode) 接口。 |
| void | setNetworkMeasureBytesSent (id, length)<br>设置请求体大小，对应华为文档 [setBytesSent](https://developer.huawei.com/consumer/cn/doc/development/AppGallery-connect-References/networkmeasure#setBytesSent) 接口。 |
| void | setNetworkMeasureBytesReceived (id, length)<br>设置响应体大小，对应华为文档 [setBytesReceived](https://developer.huawei.com/consumer/cn/doc/development/AppGallery-connect-References/networkmeasure#setBytesReceived) 接口。 |
| void | setNetworkMeasureContentType (id, contentType)<br>设置响应体contentType类型，对应华为文档 [setContentType](https://developer.huawei.com/consumer/cn/doc/development/AppGallery-connect-References/networkmeasure#setContentType) 接口。 |
| void | putNetworkMeasureProperty (id, propertyName, propertyValue)<br>设置网络请求的自定义属性名称和属性值，对应华为文档 [putProperty](https://developer.huawei.com/consumer/cn/doc/development/AppGallery-connect-References/networkmeasure#putProperty) 接口。 |
| void | removeNetworkMeasureProperty (id, propertyName)<br>从 NetworkMeasure 实例中移除已存在属性对应华为文档 [removeProperty](https://developer.huawei.com/consumer/cn/doc/development/AppGallery-connect-References/networkmeasure#removeProperty) 接口。 |
| string(JSON) | getNetworkMeasureProperty (id, propertyName)<br>从 NetworkMeasure 实例中获取所有属性，对应华为文档 [getProperties](https://developer.huawei.com/consumer/cn/doc/development/AppGallery-connect-References/networkmeasure#getProperties) 接口。 |
| string | getNetworkMeasureProperties (id)<br>获取自定义属性值，对应华为文档 [getProperty](https://developer.huawei.com/consumer/cn/doc/development/AppGallery-connect-References/networkmeasure#getProperty) 接口。 |

#### 参数说明

|  参数     |   类型         |  含义 |  
|  :---------- |  :------- |  :------------- |  
|  url  |  string  |  网络请求 URL 地址。| 
|  httpMethod  |  string  |  请求方法，仅支持 GET、PUT、POST、DELETE、HEAD、PATCH、OPTIONS、TRACE 或 CONNECT 方法。。| 
|  id  |  string  |  initNetworkMeasure 方法返回的对象 id，同时可能有多个 id 对象存在。其他方法均需要传入此 id。 | 
|  statusCode    |  string  |  请求的响应码。| 
|  bytesSent    |  string  |  请求体大小，需传入 long 型数值。| 
|  bytesReceived    |  string  |  响应体大小，需传入 long 型数值。| 
|  contentType    |  string  |  响应体 contentType 类型。| 
|  propertyName    |  string  |  自定义属性名称，只能由中文、字母（不区分大小写）、数字和下划线组成，且长度不能超过40字符。| 
|  propertyValue    |  string  |  自定义属性值，只能由中文、字母（不区分大小写）、数字和下划线组成，且长度不能超过100字符。| 


