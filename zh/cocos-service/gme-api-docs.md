> **注意**：此版本文档已归档不再维护，请移步至 [最新版本](https://service.cocos.com/document/zh/gme-api-docs.html)。

# 游戏多媒体引擎（腾讯云）接口文档

为方便 Cocos Creator 开发者调试和接入游戏多媒体引擎（腾讯云）产品 API，本文为通过 Cocos Service 服务面板，接入游戏多媒体引擎的接口文档。

- 此文档对应游戏多媒体引擎 SDK 的版本为 **2.7**。
- 函数原型为 [游戏多媒体引擎 Cocos SDK 接口文档](https://cloud.tencent.com/document/product/607/15218) 中定义的接口，Cocos Service 接入时设置了一个全局变量 `tencentGME.tencentGMEInst`，可参考示例代码接入。

## 游戏多媒体引擎的重要接口

| 重要接口     | 接口含义 |  
| :---------  | :---------- |  
| [init](#init)                   |   初始化       |  
| [poll](#poll)                   |   触发事件回调      |  
| [enterRoom](#enterroom)         |   加入房间         |  
| [enableMic](#enablemic)         |   开启/关闭麦克风   |  
| [enableSpeaker](#enablespeaker) |   开启/关闭扬声器   |  

## 说明

- 游戏多媒体引擎使用前请对工程进行配置，否则 SDK 不生效。

- 游戏多媒体引擎的接口调用成功后返回值为游戏多媒体引擎 SDK 定义的枚举值 `AV_OK`，数值为 `0`。

- 游戏多媒体引擎的接口调用要在同一个线程下，任意 JS 线程均可，JSB 层封装和回调的消息均在 JS 线程完成。

- 游戏多媒体引擎加入房间需要鉴权，请参考文档关于 [鉴权初始化](#applypttauthbuffer) 内容。

- 游戏多媒体引擎需要周期性的调用 [poll](#poll) 接口触发事件回调。

- 游戏多媒体引擎回调信息，请参考 [回调消息](#%E5%9B%9E%E8%B0%83%E6%B6%88%E6%81%AF) 列表。

- 设备的操作要在进房成功之后。

- 错误码详情可参考腾讯云官方文档 [错误码](https://cloud.tencent.com/document/product/607/15173)。

## 实时语音流程图

![](https://main.qcloudimg.com/raw/bf2993148e4783caf331e6ffd5cec661.png)

## 初始化相关接口

未初始化前，SDK 处于未初始化阶段，需要通过接口 `init` 进行初始化，才可以使用实时语音及离线语音。

使用问题可参考腾讯云官方文档 [一般性问题](https://cloud.tencent.com/document/product/607/30408)。

|  接口               |   接口含义    |  
|  :---------------- |  :---------- |  
|  [init](#init)     |  初始化 SDK   |   
|  [poll](#poll)     |  触发事件回调  |  
|  [pause](#pause)   |  系统暂停     |  
|  [resume](#resume) |  系统恢复     |  
|  [uninit](#uninit) |  反初始化 SDK |  

### init

此接口用于初始化 SDK。参数获取请查看腾讯云官方文档 [接入指引](https://cloud.tencent.com/document/product/607/10782)。

此接口需要来自腾讯云控制台的 **AppID**、**Key** 和 **openId** 作为参数。这里的 **openId** 是唯一标识一个用户，规则由 App 开发者自行制定，App 内不重复即可（目前只支持 **INT64**）。

**初始化 SDK 之后才可以进房。**

#### 函数原型

```js
TencentGME.fn.init = function(appId: string, key: string, openId: string) {...}
```

| 参数    |   类型     |  含义 |  
| :----- |  :-------- |  :------------ |  
| appId  |  string   	|  来自腾讯云控制台的 AppID			|  
| key    |  string   	|  来自腾讯云 [控制台](https://console.cloud.tencent.com/gamegme) 的密钥 	|  
| openId |  string   	|  openId 只支持 **INT64** 类型（转为 string 传入），必须大于 **10000**，用于标识用户 	|  

#### 示例代码

```js
var appId = '1400089356';
var key = '1cfbfxxxxx03a53e';
var openId = '123456';
tencentGME.tencentGMEInst.init(appId, key, openId);
```

### poll

此接口用于触发事件回调。通过在 `update` 里面周期的调用 `poll` 可以触发事件回调。

#### 函数原型

```js
TencentGME.fn.poll = function() {...}
```

#### 示例代码

```js
tencentGME.tencentGMEInst.poll();
```

### pause

此接口用于系统暂停。当系统发生 `pause` 事件时，需要同时通知引擎进行 `pause`。

#### 函数原型

```js
TencentGME.fn.pause = function() {...}
```

#### 示例代码

```js
tencentGME.tencentGMEInst.pause();
```

### resume

此接口用于系统恢复。当系统发生 `resume` 事件时，需要同时通知引擎进行 `resume`。`resume` 接口只恢复实时语音。

#### 函数原型

```js
TencentGME.fn.resume = function() {...}
```

#### 示例代码

```js
tencentGME.tencentGMEInst.resume();
```

### uninit

此接口用于反初始化 SDK，进入未初始化状态。切换账号需要反初始化。

#### 函数原型

```js
TencentGME.fn.uninit = function() {...}
```

#### 示例代码

```js
tencentGME.tencentGMEInst.uninit();
```

## 实时语音房间相关接口

[初始化](#init) 完毕，SDK 调用 `enterRoom` 进入房间后，才可以进行实时语音通话。

使用问题可参考腾讯云官方文档 [实时语音相关问题](https://cloud.tencent.com/document/product/607/30411)。

|  接口     |   接口含义   |  
|  :------------- |  :------------- |  
|  [enterRoom](#enterroom)           |  加入房间 |  
|  [isRoomEntered](#isroomentered)   |  判断是否已经进入房间 |  
|  [exitRoom](#exitroom)             |  退出房间 |  
|  [changeRoomType](#changeroomtype) |  修改用户房间音频类型 |  
|  [getRoomType](#getroomtype)       |  获取用户房间音频类型 |  

### enterRoom 

此接口用于加入房间。如果普通语音进房，业务方面无涉及范围语音需求，则使用普通进房接口。详细信息请查看腾讯云官方文档 [范围语音](https://cloud.tencent.com/document/product/607/17972)。

若需要使用离线语音功能，通过生成的 [鉴权信息](#applypttauthbuffer) 进房，会收到消息为 `ITMG_MAIN_EVENT_TYPE_ENTER_ROOM` 的回调。加入房间默认不开启麦克风及扬声器。返回值为 `AV_OK` 的时候代表成功。

#### 函数原型

```js
TencentGME.fn.enterRoom = function(roomId: string, type: number) {...}
```

|  参数      |   类型          |  含义 |  
|  :------- |  :------------- |  :------------- |  
|  roomID   |   string        |  房间号，最大支持 **127** 字符	|  
|  roomType |  ITMG_ROOM_TYPE |  房间音频类型		|  

房间音频类型请参考腾讯云官方文档 [音质选择](https://cloud.tencent.com/document/product/607/18522)。

#### 示例代码

```js
var roomId = '123';
tencentGME.tencentGMEInst.enterRoom(roomId, 1);
```

### isRoomEntered

通过调用此接口可以判断是否已经进入房间，返回值为 `boolean` 类型。

#### 函数原型

```js
TencentGME.fn.isRoomEntered = function() {...}
```

#### 示例代码

```js
var isRoomEntered = tencentGME.tencentGMEInst.isRoomEntered();
```

### exitRoom

通过调用此接口可以退出所在房间。这是一个异步接口，返回值为 `AV_OK` 的时候代表退出房间成功。

**如果应用中有退房后立即进房的场景，在接口调用流程上，开发者不需要等待 `exitRoom` 的回调 `RoomExitComplete` 通知，直接调用接口即可。**

#### 函数原型

```js
TencentGME.fn.exitRoom = function() {...}
```

#### 示例代码

```js
tencentGME.tencentGMEInst.exitRoom();
```

### changeRoomType

此接口用于修改用户房间音频类型，结果参见回调事件，事件类型为 `ITMG_MAIN_EVENT_TYPE_CHANGE_ROOM_TYPE`。

#### 函数原型

```js
TencentGME.fn.changeRoomType = function(roomType: number) {...}
```

|  参数     |   类型          |  含义 |  
| :------- |  :------------- | :------------- |  
| roomType |  ITMG_ROOM_TYPE |  希望房间切换成的类型，房间音频类型参考 [enterRoom](#enterroom) 接口。 |  

#### 示例代码

```js
tencentGME.tencentGMEInst.changeRoomType(4);
```

### getRoomType

此接口用于获取用户房间音频类型，返回值为房间音频类型。当返回值为 **0** 时，代表获取用户房间音频类型发生错误，房间音频类型参考 [enterRoom](#enterroom) 接口。

#### 函数原型

```js
TencentGME.fn.getRoomType = function() {...}
```

#### 示例代码

```js
var roomType = tencentGME.tencentGMEInst.getRoomType();
```

## 实时语音音频接口

[初始化 SDK](#init) 之后进房，在房间中，才可以调用实时音频语音相关接口。

当用户在界面单击开启/关闭麦克风/扬声器的按钮时：

- 对于大部分的 **游戏类 App**，推荐调用 `enableMic` 及 `enableSpeaker` 接口，相当于同时调用`enableAudioCaptureDevice/EnableAudioSend` 和 `enableAudioPlayDevice/enableAudioRecv` 接口。

- 其他类型的 **移动端 App**，例如社交类型 App，开启或者关闭采集设备，会伴随整个设备（采集及播放）重启，如果此时 App 正在播放背景音乐，那么背景音乐的播放也会被中断。利用控制上下行的方式来实现开关麦克风效果，不会中断播放设备。

  具体调用方式为：在进房的时候调用 `enableAudioCaptureDevice(true) && enableAudioPlayDevice(true)` 一次，单击开关麦克风时只调用 `enableAudioSend/enableAudioRecv` 来控制音频流是否发送/接收。

- 如果想 **单独释放采集/播放设备**，请参考下方的 `enableAudioCaptureDevice` 和 `enableAudioPlayDevice` 接口介绍。

- 调用 `pause` 暂停音频，调用 `resume` 恢复音频。

|  接口           | 接口含义   |  
|  :------------ | :-------- |  
|  [enableMic](#enablemic)                                     |  开启/关闭麦克风 |  
|  [getMicState](#getmicstate)                                 |  获取麦克风状态 |  
|  [enableAudioCaptureDevice](#enableaudiocapturedevice)       |  开启/关闭采集设备		|  
|  [isAudioCaptureDeviceEnabled](#isaudiocapturedeviceenabled) |  获取采集设备状态	|  
|  [enableAudioSend](#enableaudiosend)                         |  开启/关闭音频上行	|  
|  [isAudioSendEnabled](#isaudiosendenabled)                   |  获取音频上行状态	|  
|  [getMicLevel](#getmiclevel)                                 |  获取麦克风实时音量	|  
|  [getSendStreamLevel](#getsendstreamlevel)                   |  获取音频上行实时音量 |  
|  [setMicVolume](#setmicvolume)                               |  设置麦克风音量		|  
|  [getMicVolume](#getmicvolume)                               |  获取麦克风音量		|  
|  [enableSpeaker](#enablespeaker)                             |  开启/关闭扬声器 |  
|  [getSpeakerState](#getspeakerstate)                         |  获取扬声器状态 |  
|  [enableAudioPlayDevice](#enableaudioplaydevice)             |  开启/关闭播放设备		|  
|  [isAudioPlayDeviceEnabled](#isaudioplaydeviceenabled)       |  获取播放设备状态	|  
|  [enableAudioRecv](#enableaudiorecv	)                        |  开启/关闭音频下行	|  
|  [isAudioRecvEnabled](#isaudiorecvenabled)                   |  获取音频下行状态	|  
|  [getSpeakerLevel](#getspeakerlevel)                         |  获取扬声器实时音量	|  
|  [getRecvStreamLevel](#getrecvstreamlevel)                   |  获取房间内其他成员下行实时音量 |  
|  [setSpeakerVolume](#setspeakervolume)                       |  设置扬声器音量		| 
|  [getSpeakerVolume](#getspeakervolume)                       |  获取扬声器音量		|  
|  [enableLoopBack](#enableloopback)                           |  开启/关闭耳返			|  

### enableMic

此接口用来开启/关闭麦克风。加入房间时默认不开启麦克风及扬声器。

调用 `enableMic` 接口，相当于同时调用 `enableAudioCaptureDevice` 和 `enableAudioSend` 两个接口。

#### 函数原型  

```js
TencentGME.fn.enableMic = function(bEnabled: boolean) {...}
```

|  参数     |   类型         |  含义 |  
|  :---------- |  :------- |  :------------- |  
|  bEnabled    |  boolean  |  若要开启麦克风，则传入的参数为 **true**。<br>若要关闭麦克风，则传入的参数为 **false**。|  

#### 示例代码

```js
tencentGME.tencentGMEInst.enableMic(true);
```

### getMicState

此接口用于获取麦克风的状态。

- 返回值为 **0** 时表示麦克风处于 **关闭** 状态。

- 返回值为 **1** 时表示麦克风为 **开启** 状态。

#### 函数原型

```js
TencentGME.fn.getMicState = function() {...}
```

#### 示例代码

```js
var micState = tencentGME.tencentGMEInst.getMicState();
```

### enableAudioCaptureDevice

此接口用来开启/关闭采集设备。加入房间默认不开启设备。
- 只能在进房后调用此接口，退房会自动关闭设备。
- 在移动端，开启采集设备通常会伴随权限申请，音量类型调整等操作。

#### 函数原型

```js
TencentGME.fn.enableAudioCaptureDevice = function(bEnabled: boolean) {...}
```

|  参数      |  类型    |  含义 |  
|  :------- | :------- | :-------- |  
|  bEnabled | boolean  | 开启采集设备，则传入参数为 **true**。<br>关闭采集设备，则传入参数为 **false**。 |  

#### 示例代码

```js
tencentGME.tencentGMEInst.enableAudioCaptureDevice(true);
```

### isAudioCaptureDeviceEnabled

此接口用于获取采集设备的状态。

#### 函数原型

```js
TencentGME.fn.isAudioCaptureDeviceEnabled = function() {...}
```

#### 示例代码

```js
var isAudioCaptureDeviceEnabled = tencentGME.tencentGMEInst.isAudioCaptureDeviceEnabled();
```

### enableAudioSend

此接口用于开启或关闭音频上行。
- 如果采集设备已经开启，那么会发送采集到的音频数据。
- 如果采集设备没有开启，那么仍旧无声。

采集设备的开启/关闭，请参考接口 `EnableAudioCaptureDevice`。

#### 函数原型

```js
TencentGME.fn.enableAudioSend = function(bEnabled: boolean) {...}
```

|  参数     |   类型         |  含义 |  
|  :---------- |  :---------- |  :------------- |  
|  bEnabled    |  boolean     |  若要开启音频上行，则传入的参数为 **true**。<br>若要关闭音频上行，则参传入的参数为 **false**。 |  

#### 示例代码

```js
tencentGME.tencentGMEInst.enableAudioSend(true);
```

### isAudioSendEnabled

此接口用于获取音频上行的状态。

#### 函数原型

```js
TencentGME.fn.isAudioSendEnabled = function() {...}
```

#### 示例代码

```js
var isAudioSendEnabled = tencentGME.tencentGMEInst.isAudioSendEnabled();
```

### getMicLevel

此接口用于获取麦克风实时音量，返回值为 `number` 类型。

#### 函数原型

```js
TencentGME.fn.getMicLevel = function() {...}
```

#### 示例代码

```js
var volume = tencentGME.tencentGMEInst.getMicLevel();
```

### getSendStreamLevel

此接口用于获取音频上行实时音量。返回值为 `number` 类型，取值范围为 **0 ~ 100**。

#### 函数原型

```js
TencentGME.fn.getSendStreamLevel = function() {...}
```

#### 示例代码

```js
var volume = tencentGME.tencentGMEInst.getSendStreamLevel();
```

### setMicVolume

此接口用于设置麦克风的音量。参数 `volume` 用于设置麦克风的音量，默认数值为 **100**。
- 当数值为 **0** 时，表示静音。
- 当数值为 **100** 时，则表示音量不增不减。

#### 函数原型

```js
TencentGME.fn.setMicVolume = function(volume: number) {...}
```

| 参数 |  类型   |  含义 |  
| :-- | :----- |  :----- |  
| vol | number |  设置音量，范围为 **0 ～ 200** |  

#### 示例代码

```js
tencentGME.tencentGMEInst.setMicVolume(100);
```

### getMicVolume

此接口用于获取麦克风的音量，返回值为一个 `number` 类型数值。
- 返回值为 **1～100** 时，表示正常音量。
- 若返回值为 **101**，则表示没调用过接口 `setMicVolume`。

#### 函数原型

```js
TencentGME.fn.getMicVolume = function() {...}
```

#### 示例代码

```js
var volume = tencentGME.tencentGMEInst.getMicVolume();
```

### enableSpeaker

此接口用于开启/关闭扬声器。

#### 函数原型

```js
TencentGME.fn.enableSpeaker = function(bEnabled: boolean) {...}
```

| 参数      |  类型     |  含义 |  
| :------- | :------- |  :------------- |  
| bEnabled |  boolean |  若要关闭扬声器，则传入的参数为 **false**。<br>若要开启扬声器，则参数为 **true**。	|  

#### 示例代码

```js
tencentGME.tencentGMEInst.enableSpeaker(true);
```

### getSpeakerState

此接口用于获取扬声器状态。
- 返回值为 **0** 时，表示扬声器处于 **关闭** 状态。
- 返回值 **1** 时，表示扬声器为 **开启** 状态。
- 返回值为 **2** 时，表示扬声器处于 **正在操作** 状态。

#### 函数原型

```js
TencentGME.fn.getSpeakerState = function() {...}
```

#### 示例代码

```js
var speakerState = tencentGME.tencentGMEInst.getSpeakerState();
```

### enableAudioPlayDevice

此接口用于开启/关闭播放设备。

#### 函数原型

```js
TencentGME.fn.enableAudioPlayDevice = function(bEnabled: boolean) {...}
```

| 参数      |   类型    |  含义 |  
| :------- |  :------- |  :------------- |  
| bEnabled |  boolean  |  若要关闭播放设备，则传入的参数为 **false**。<br>若要开启播放设备，则传入的参数为 **true** |  

#### 示例代码

```js
tencentGME.tencentGMEInst.enableAudioPlayDevice(true);
```

### isAudioPlayDeviceEnabled

此接口用于获取播放设备状态。

#### 函数原型

```js
TencentGME.fn.isAudioPlayDeviceEnabled = function() {...}
```

#### 示例代码

```js
var isAudioPlayDeviceEnabled = tencentGME.tencentGMEInst.isAudioPlayDeviceEnabled();
```

### enableAudioRecv

此接口用于开启/关闭音频下行。
- 如果播放设备已经开启，那么会播放房间里其他人的音频数据。
- 如果播放设备没有开启，那么仍旧无声。

播放设备的开启/关闭请参考接口 `EnableAudioPlayDevice`。

#### 函数原型

```js
TencentGME.fn.enableAudioRecv = function(bEnabled: boolean) {...}
```

| 参数      |  类型     |  含义 |  
| :------- | :-------- |  :------------- |  
| bEnabled | boolean   |  若要开启音频下行，则传入的参数为 **true**。<br>若要关闭音频下行，则传入的参数为 **false**。 |  

#### 示例代码  

```js
tencentGME.tencentGMEInst.enableAudioRecv(true);
```

### isAudioRecvEnabled

此接口用于获取音频下行状态。

#### 函数原型

```js
TencentGME.fn.isAudioRecvEnabled = function() {...}
```

#### 示例代码

```js
var isAudioRecvEnabled = tencentGME.tencentGMEInst.isAudioRecvEnabled();
```

### getSpeakerLevel

此接口用于获取扬声器实时音量。返回值为 `number` 类型数值，表示扬声器实时音量。

#### 函数原型

```js
TencentGME.fn.getSpeakerLevel = function() {...}
```

#### 示例代码

```js
var volume = tencentGME.tencentGMEInst.getSpeakerLevel();
```

### getRecvStreamLevel

此接口用于获取房间内其他成员下行实时音量，返回值为 `number` 类型，取值范围为 **0 ~ 100**。

#### 函数原型

```js
TencentGME.fn.getRecvStreamLevel = function(openId: string) {...}
```

| 参数    |   类型      |  含义 |  
| :----- |  :--------- |  :------------- |  
| openId |  string     |  房间内其他成员的 openId |  

#### 示例代码

```js
var volume = tencentGME.tencentGMEInst.getRecvStreamLevel();
```

### setSpeakerVolume

此接口用于设置扬声器音量，参数 `volume` 用于设置扬声器的音量。
- 当数值为 **0** 时，表示静音。
- 当数值为 **100** 时，表示音量不增不减，默认数值为 **100**。

#### 函数原型

```js
TencentGME.fn.setSpeakerVolume = function(volume: number) {...}
```

| 参数    |  类型    |  含义 |  
| :----- | :------- |  :------------- |  
| volume | number   |  设置音量，范围为 **0 ～ 200** |  

#### 示例代码

```js
tencentGME.tencentGMEInst.setSpeakerVolume(100);
```

### getSpeakerVolume

此接口用于获取扬声器音量。返回值为 `number` 类型数值。
- 返回值为 **1～100** 时，表示正常音量。
- 若返回值为 **101**，则代表没调用过接口 `setSpeakerVolume`。

| 音量类型    | 参数   | 音量大小（举例） |  
| :--------- | :---- | :---- |  
| 实时音量    | `Level`           |  100           | 
| 扬声器的音量 | `Volume`          | 60             |
| 最终声音音量 | `Level * Volume%` | 100 * 60% = 60 |

#### 函数原型

```js
TencentGME.fn.getSpeakerVolume = function() {...}
```

#### 示例代码

```js
var volume = tencentGME.tencentGMEInst.getSpeakerVolume();
```

### enableLoopBack

此接口用于开启/关闭耳返。

#### 函数原型

```js
TencentGME.fn.enableLoopBack = function(bEnabled: boolean) {...}
```

| 参数      | 类型     | 含义 |  
| :------- | :------- | :--------- |  
| bEnabled | boolean  | 是否启动耳返 |  

#### 示例代码

```js
tencentGME.tencentGMEInst.enableLoopBack(true);
```

## 离线语音语音转文字流程图

![](https://main.qcloudimg.com/raw/4c875d05cd2b4eaefba676d2e4fc031d.png)

## 离线语音

未初始化前，SDK 处于未初始化阶段，需要通过接口 `init` 初始化 SDK，才可以使用实时语音及离线语音。

使用问题可参考腾讯云官方文档 [离线语音相关问题](https://cloud.tencent.com/document/product/607/30412)。

### 初始化相关接口

|  接口     |   接口含义   |  
|  :------ |  :--------  |  
|  [init](#init)      |  初始化 SDK   |   
|  [poll](#poll)      |  触发事件回调  |  
|  [pause](#pause)    |  系统暂停     |  
|  [resume](#resume) 	|  系统恢复     |  
|  [uninit](#uninit)  |  反初始化 SDK |  

### 离线语音相关接口

|  接口     |   接口含义   |  
|  :------ |  :--------- |  
|  [applyPTTAuthbuffer](#applypttauthbuffer)           |  鉴权初始化	|  
|  [pttSetMaxMessageLength](#pttsetmaxmessagelength)   |  限制最大语音信息时长	|  
|  [pttStartRecording](#pttstartrecording)             |  启动流式录音		|  
|  [pttStartRecordingWithStreamingRecognition](#pttstartrecordingwithstreamingrecognition) |  启动流式语音识别 |
|  [pttPauseRecording](#pttpauserecording)             |  暂停录音 |  
|  [pttResumeRecording](#pttresumerecording)           |  恢复录音 |  
|  [pttStopRecording](#pttstoprecording)               |  停止录音 |  
|  [pttCancelRecording](#pttcancelrecording)           |  取消录音 |  
|  [pttGetMicLevel](#pttgetmiclevel)                   |  获取离线语音麦克风实时音量 |  
|  [pttSetMicVolume](#pttsetmicvolume)                 |  设置离线语音录制音量 |  
|  [pttGetMicVolume](#pttgetmicvolume)                 |  获取离线语音录制音量 |  
|  [pttGetSpeakerLevel](#pttgetspeakerlevel)           |  获取离线语音扬声器实时音量  |  
|  [pttSetSpeakerVolume](#pttsetspeakervolume)         |  设置离线语音播放音量 |  
|  [pttGetSpeakerVolume](#pttgetspeakervolume)         |  获取离线语音播放音量 |  
|  [pttUploadRecordedFile](#pttuploadrecordedfile)     |  上传语音文件		|  
|  [pttDownloadRecordedFile](#pttdownloadrecordedfile) |  下载语音文件		|  
|  [pttPlayRecordedFile](#pttplayrecordedfile)         |  开始播放语音		|  
|  [pttStopPlayFile](#pttstopplayfile)                 |  停止播放语音		|  
|  [pttGetFileSize](#pttgetfilesize)                   |  获取语音文件大小		|  
|  [pttGetVoiceFileDuration](#pttgetvoicefileduration) |  获取语音文件时长		|  
|  [pttSpeechToText](#pttspeechtotext)                 |  将指定的语音文件翻译成文字		|  

### applyPTTAuthbuffer

此接口用于鉴权初始化。在 [初始化 SDK](#init) 之后调用鉴权初始化。

#### 函数原型

```js
TencentGME.fn.applyPTTAuthbuffer = function() {...}
```

#### 示例代码

```js
tencentGME.tencentGMEInst.applyPTTAuthbuffer();
```

### pttSetMaxMessageLength

此接口用于限制最大语音消息的长度，最大支持 **60** 秒。

#### 函数原型

```js
TencentGME.fn.pttSetMaxMessageLength = function(msTime: number) {...}
```

|  参数    | 类型      |  含义 |  
| :------ | :------- |  :------------- |  
| msTime  | number   |  语音时长，单位 **ms** |  

#### 示例代码 

```js
tencentGME.tencentGMEInst.pttSetMaxMessageLength();
```

### pttStartRecording

此接口用于启动流式录音。需要将录音文件上传后才可以进行语音转文字等操作。

#### 函数原型  

```js
TencentGME.fn.pttStartRecording = function(fileDir: string) {...}
```

|  参数    |   类型   |  含义 |  
| :------ |  :----- |  :------------- |  
| fileDir |  string |  存放语音的路径 |  

#### 示例代码

```js
var fileDir = '*****';
tencentGME.tencentGMEInst.pttStartRecording(fileDir);
```

### pttStartRecordingWithStreamingRecognition

此接口用于启动流式语音识别。同时在回调中会有实时的语音转文字返回，可以指定语言进行识别，也可以将语音中识别到的信息翻译成指定的语言返回。

#### 函数原型

```js
TencentGME.fn.pttStartRecordingWithStreamingRecognition = function(fileDir: string, [speechLanguage: string, translateLanguage: string]) {...}
```

| 参数     | 类型        | 含义 |  
| :------ | :---------- | :-- |  
| fileDir               	|  string	|  存放的语音路径	|  
| speechLanguage (可选)    |  string |  识别成指定文字的语言参数，详情请参考 [语音转文字的语言参数参考列表](https://cloud.tencent.com/document/product/607/30282)|  
| translateLanguage (可选) |  string |  翻译成指定文字的语言参数，详情请参考 [语音转文字的语言参数参考列表](https://cloud.tencent.com/document/product/607/30282)<br>**注意**：此参数 **暂不可用**，请填写与 `speechLanguage` 相同的参数 |  

#### 示例代码 

```js
var fileDir = '*****';
tencentGME.tencentGMEInst.pttStartRecordingWithStreamingRecognition(fileDir);
```

### pttPauseRecording

此接口用于暂停录音。如需恢复录音请调用接口 `ResumeRecording`。

#### 函数原型 

```js
TencentGME.fn.pttPauseRecording = function() {...}
```

#### 示例代码

```js
tencentGME.tencentGMEInst.pttPauseRecording();
```

### pttResumeRecording

此接口用于恢复录音。

#### 函数原型 

```js
TencentGME.fn.pttResumeRecording = function() {...}
```

#### 示例代码

```js
tencentGME.tencentGMEInst.pttResumeRecording();
```

### pttStopRecording

此接口用于停止录音。此接口为异步接口，停止录音后会有录音完成回调，回调成功之后录音文件才可用。

#### 函数原型

```js
TencentGME.fn.pttStopRecording = function() {...}
```

#### 示例代码

```js
tencentGME.tencentGMEInst.pttStopRecording();
```

### pttCancelRecording

此接口用于取消录音，取消之后没有回调。

#### 函数原型

```js
TencentGME.fn.pttCancelRecording = function() {...}
```

#### 示例代码

```js
tencentGME.tencentGMEInst.pttCancelRecording();
```

### pttGetMicLevel

此接口用于获取离线语音麦克风的实时音量，返回值为 `number` 类型，取值范围为 **0 ~ 100**。

#### 函数原型

```js
TencentGME.fn.pttGetMicLevel = function() {...}
```

#### 示例代码

```js
var volume = tencentGME.tencentGMEInst.pttGetMicLevel();
```

### pttSetMicVolume

此接口用于设置离线语音录制的音量，取值范围为 **0 ~ 100**。

#### 函数原型

```js
TencentGME.fn.pttSetMicVolume = function(volume: number) {...}
```

| 参数    |  类型     |  含义 |  
| :----- | :------- |  :------------- |  
| volume | number   |  设置音量，范围为 **0 ～ 200**|  

#### 示例代码

```js
tencentGME.tencentGMEInst.pttSetMicVolume(100);
```

### pttGetMicVolume

此接口用于获取离线语音录制的音量。返回值为 `number` 类型，取值范围为 **0 ~ 100**。

#### 函数原型

```js
TencentGME.fn.pttGetMicVolume = function() {...}
```

#### 示例代码

```js
var volume = tencentGME.tencentGMEInst.pttGetMicVolume();
```

### pttGetSpeakerLevel

此接口用于获取离线语音扬声器实时音量。返回值为 `number` 类型，取值范围为 **0 ~ 100**。

#### 函数原型

```js
TencentGME.fn.pttGetSpeakerLevel = function() {...}
```

#### 示例代码

```js
var volume = tencentGME.tencentGMEInst.pttGetSpeakerLevel();
```

### pttSetSpeakerVolume

此接口用于设置离线语音播放音量，取值范围为 **0 ~ 100**。

#### 函数原型

```js
TencentGME.fn.pttSetSpeakerVolume = function(volume: number) {...}
```

| 参数    | 类型      |  含义 |  
| :----- | :------- |  :------------- |  
| volume | number   |  设置音量，范围为 **0 ～ 200** |  

#### 示例代码

```js
tencentGME.tencentGMEInst.pttSetSpeakerVolume(100);
```

### pttGetSpeakerVolume

此接口用于获取离线语音播放音量。返回值为 `number` 类型，取值范围为 **0 ~ 100**。

#### 函数原型

```js
TencentGME.fn.pttGetSpeakerVolume = function() {...}
```

#### 示例代码

```js
var volume = tencentGME.tencentGMEInst.pttGetSpeakerVolume();
```

### pttUploadRecordedFile

此接口用于上传语音文件。

#### 函数原型

```js
TencentGME.fn.pttUploadRecordedFile = function(filePath: string) {...}
```

| 参数      |   类型   |  含义 |  
| :------- |  :------ |  :----------- |  
| filePath |  string  |  上传的语音路径 |  

#### 示例代码

```js
var filePath = '*****';
tencentGME.tencentGMEInst.pttUploadRecordedFile(filePath);
```

### pttDownloadRecordedFile

此接口用于下载语音文件。

#### 函数原型

```js
TencentGME.fn.pttDownloadRecordedFile = function(fileId: string, filePath: string) {...}
```

| 参数      |   类型   |  含义 |  
| :------- |  :----- |  :------------- |  
| fileId   |  string |  文件的 `url` 路径，上传文件回调中获取	|  
| filePath |  string |  文件的本地保存路径	|  

#### 示例代码

```js
var filePath = '*****';
var fileId = '***';
tencentGME.tencentGMEInst.pttDownloadRecordedFile(fileId, filePath);
```

### pttPlayRecordedFile

此接口用于开始播放语音。

#### 函数原型

```js
TencentGME.fn.pttPlayRecordedFile = function(filePath: string, [voiceType: number]) {...}
```

| 参数      |  类型   |  含义 |  
| :------- |  :----- |  :------- |  
| filePath |  string |  文件的路径 |  
| voicetype | number |  可选参数，变声类型，请参考 [变声特效](https://cloud.tencent.com/document/product/607/34378#.E5.8F.98.E5.A3.B0.E7.89.B9.E6.95.88) |  


#### 返回错误码

| 错误码值 | 原因       | 建议方案                  |
| :------ | :-------- | :----------------------- |
| 20485   | 播放未开始 | 确保文件存在，文件路径的合法性 |

#### 示例代码

```js
var filePath = '*****';
tencentGME.tencentGMEInst.pttPlayRecordedFile(filePath);
```

### pttStopPlayFile

此接口用于停止播放语音。停止播放语音也会有播放完成的回调。

#### 函数原型

```js
TencentGME.fn.pttStopPlayFile = function() {...}
```

#### 示例代码

```js
var volume = tencentGME.tencentGMEInst.pttStopPlayFile();
```

### pttGetFileSize

此接口用于获取语音文件大小。

#### 函数原型

```js
TencentGME.fn.pttGetFileSize = function(filePath: string) {...}
```

| 参数      |   类型    |  含义 |  
| :------- |  :------- |  :----------- |  
| filePath |  string   |  语音文件的路径 |  

#### 示例代码

```js
var filePath = '*****';
tencentGME.tencentGMEInst.pttGetFileSize(filePath);
```

### pttGetVoiceFileDuration

此接口用于获取语音文件时长，单位为 **毫秒**。

#### 函数原型

```js
TencentGME.fn.pttGetVoiceFileDuration = function(filePath: string) {...}
```

| 参数      |   类型   |  含义 |  
| :------- |  :----- | :---------- |  
| filePath |  string | 语音文件的路径 |  

#### 示例代码

```js
var filePath = '*****';
tencentGME.tencentGMEInst.pttGetVoiceFileDuration(filePath);
```

### pttSpeechToText

此接口用于将指定的语音文件翻译成文字。可以指定语言进行识别，也可以将语音中识别到的信息翻译成指定的语言返回。

#### 函数原型

```js
TencentGME.fn.pttStartRecordingWithStreamingRecognition = function(fileID: string, [speechLanguage: string, translateLanguage: string]) {...}
```

| 参数     |   类型         |  含义 |  
| :------ |  :------------ |  :------------- |  
| fileID                   |  string |  语音文件 url |  
| speechLanguage (可选)     |  string |  识别出指定文字的语言参数，具体请参考 [语音转文字的语言参数参考列表](https://cloud.tencent.com/document/product/607/30282) |  
| translatelanguage (可选)  |  string |  翻译成指定文字的语言参数，参数请参考 [语音转文字的语言参数参考列表](https://cloud.tencent.com/document/product/607/30282)<br>**注意**：此参数 **暂时无效**，填入参数应与 `speechLanguage` 一致。`speechLanguage` 与 `translatelanguage` 这两个参数需要同时传入 |  

#### 示例代码

```js
var fileID = '*****';
tencentGME.tencentGMEInst.pttStartRecordingWithStreamingRecognition(fileID);
```

## 高级 API

### getQualityTips

获取音视频通话的实时通话质量的相关信息。该接口主要用来查看实时通话质量、排查问题等，业务侧可以忽略。

#### 函数原型

```js
TencentGME.fn.getQualityTips = function() {...}
```

#### 示例代码

```js
var qualityTips = tencentGME.tencentGMEInst.getQualityTips();
```

### getSDKVersion

此接口用于获取版本号。

#### 函数原型

```js
TencentGME.fn.getSDKVersion = function() {...}
```

#### 示例代码 

```js
var version = tencentGME.tencentGMEInst.getSDKVersion();
```

### setLogLevel

此接口用于设置打印日志等级。建议保持默认等级。

#### 函数原型

```js
TencentGME.fn.setLogLevel = function(logLevelWrite: number, logLevelPrint: number) {...}
```

#### 参数含义

| 参数 | 类型 | 含义 |  
| :-- | :--- | :-- |  
| levelWrite    |  ITMG_LOG_LEVEL |  设置写入日志的等级，`TMG_LOG_LEVEL_NONE` 表示不写入 |  
| levelPrnumber |  ITMG_LOG_LEVEL |  设置打印日志的等级，`TMG_LOG_LEVEL_NONE` 表示不打印 |  

#### 示例代码

```js
tencentGME.tencentGMEInst.setLogLevel(4, 4);
```

### setLogLevel

此接口用于设置打印日志路径。各平台的默认路径为：

|  平台     |  路径       |  
|  :------ |  :--------- |  
|  Windows |  `%appdata%\Tencent\GME\ProcessName` |  
|  iOS     |  `Application/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx/Documents` |  
|  Android |  `/sdcard/Android/data/xxx.xxx.xxx/files` |  
|  Mac     |  `/Users/username/Library/Containers/xxx.xxx.xxx/Data/Documents` |  

#### 函数原型

```js
TencentGME.fn.setLogLevel = function(logPath: string) {...}
```

| 参数    |  类型   |  含义 |  
| :----- |  :----- |  :-- |  
| logDir |  string |  路径 |  

#### 示例代码

```js
var logPath = '****';
tencentGME.tencentGMEInst.setLogLevel(logPath);
```

### addAudioBlackList

此接口用于将某个 ID 加入音频数据黑名单。返回值为 **0** 时表示调用成功。

#### 函数原型

```js
TencentGME.fn.addAudioBlackList = function(openId: string) {...}
```

| 参数    |   类型   |  含义 |  
| :----- |  :------ | :------------- |  
| openId |  string  |  需添加到黑名单的 ID |  

#### 示例代码 

```js
var openId = '****';
tencentGME.tencentGMEInst.addAudioBlackList(openId);
```

### removeAudioBlackList

此接口用于将某个 ID 从音频数据黑名单中移除。返回值为 **0** 时表示调用成功。

#### 函数原型

```js
TencentGME.fn.removeAudioBlackList = function(openId: string) {...}
```

| 参数    |   类型   |  含义 |  
| :----- |  :----- |  :------------- |  
| openId |  string |  需从黑名单中移除的 ID |  

#### 示例代码

```js
var openId = '****';
tencentGME.tencentGMEInst.removeAudioBlackList(openId);
```

## 回调消息

### 消息列表

|  消息     |   消息代表的含义   |
|  :------ |  :-------------- |  
|  `ITMG_MAIN_EVENT_TYPE_ENTER_ROOM`          |  进入音频房间消息     |  
|  `ITMG_MAIN_EVENT_TYPE_EXIT_ROOM`           |  退出音频房间消息     |  
|  `ITMG_MAIN_EVENT_TYPE_ROOM_DISCONNECT`     |  房间因为网络等原因断开消息 |  
|  `ITMG_MAIN_EVENT_TYPE_CHANGE_ROOM_TYPE`    |  房间类型变化事件     |  
|  `ITMG_MAIN_EVENT_TYPE_MIC_NEW_DEVICE`      |  新增麦克风设备消息   |  
|  `ITMG_MAIN_EVENT_TYPE_MIC_LOST_DEVICE`     |  丢失麦克风设备消息   |  
|  `ITMG_MAIN_EVENT_TYPE_SPEAKER_NEW_DEVICE`  |  新增扬声器设备消息   |  
|  `ITMG_MAIN_EVENT_TYPE_SPEAKER_LOST_DEVICE` |  丢失扬声器设备消息   |  
|  `ITMG_MAIN_EVENT_TYPE_ACCOMPANY_FINISH`    |  伴奏结束消息        |  
|  `ITMG_MAIN_EVNET_TYPE_USER_UPDATE`         |  房间成员更新消息     |  
|  `ITMG_MAIN_EVNET_TYPE_PTT_RECORD_COMPLETE` |  PTT 录音完成       |  
|  `ITMG_MAIN_EVNET_TYPE_PTT_UPLOAD_COMPLETE` |  上传 PTT 完成      |  
|  `ITMG_MAIN_EVNET_TYPE_PTT_DOWNLOAD_COMPLETE`    |  下载 PTT 完成 |  
|  `ITMG_MAIN_EVNET_TYPE_PTT_PLAY_COMPLETE`        |  播放 PTT 完成 |  
|  `ITMG_MAIN_EVNET_TYPE_PTT_SPEECH2TEXT_COMPLETE` |  语音转文字完成 |  
|  `ITMG_MAIN_EVNET_TYPE_PTT_STREAMINGRECOGNITION_COMPLETE` | 流式语音识别完成 |
|  `ITMG_MAIN_EVNET_TYPE_PTT_STREAMINGRECOGNITION_IS_RUNNING` | 流式语音识别运行中，相当于边识别语音边返回识别到的文字 |

### Data 列表

| 消息     |   Data    |  例子 |  
| :------ |  :------- |  :--- |  
| ITMG_MAIN_EVENT_TYPE<br>_ENTER_ROOM    		            |  result; error_info			  |  {"error_info":"","result":0}|  
| ITMG_MAIN_EVENT_TYPE<br>_EXIT_ROOM    		            |  result; error_info  			|  {"error_info":"","result":0}|  
| ITMG_MAIN_EVENT_TYPE<br>_ROOM_DISCONNECT    	        |  result; error_info  			|  {"error_info":"waiting timeout,<br> please check your network",<br>"result":0}|  
| ITMG_MAIN_EVENT_TYPE<br>_CHANGE_ROOM_TYPE    	        |  result; error_info; <br>sub_event_type; <br>new_room_type	|  {"error_info":"","new_room_type":0,<br>"result":0}|  
| ITMG_MAIN_EVENT_TYPE<br>_SPEAKER_NEW_DEVICE	          |  result; error_info  			|  {"deviceID":"{0.0.0.00000000}.<br>{a4f1e8be-49fa-43e2-b8cf<br>-dd00542b47ae}",<br>"deviceName":"扬声器<br> (Realtek High Definition Audio)",<br>"error_info":"",<br>"isNewDevice":true,<br>"isUsedDevice":false,<br>"result":0}|  
| ITMG_MAIN_EVENT_TYPE<br>_SPEAKER_LOST_DEVICE    	    |  result; error_info  			|  {"deviceID":"{0.0.0.00000000}<br>.{a4f1e8be-49fa-43e2<br>-b8cf-dd00542b47ae}",<br>"deviceName":"扬声器 <br>(Realtek High Definition Audio)",<br>"error_info":"","isNewDevice":false,<br>"isUsedDevice":false,<br>"result":0}|  
| ITMG_MAIN_EVENT_TYPE<br>_MIC_NEW_DEVICE    	          |  result; error_info  			|  {"deviceID":"{0.0.1.00000000}.<br>{5fdf1a5b-f42d-4ab2<br>-890a-7e454093f229}",<br>"deviceName":"麦克风 <br>(Realtek High Definition Audio)",<br>"error_info":"","isNewDevice":true,<br>"isUsedDevice":true,<br>"result":0}|  
| ITMG_MAIN_EVENT_TYPE<br>_MIC_LOST_DEVICE    	        |  result; error_info 			|  {"deviceID":"{0.0.1.00000000}.<br>{5fdf1a5b-f42d-4ab2<br>-890a-7e454093f229}",<br>"deviceName":"麦克风 <br>(Realtek High Definition Audio)",<br>"error_info":"","isNewDevice":false,<br>"isUsedDevice":true,<br>"result":0}|  
| ITMG_MAIN_EVNET_TYPE<br>_USER_UPDATE    		          |  user_list;  event_id			|  {"event_id":1,"user_list":["0"]}|  
| ITMG_MAIN_EVNET_TYPE<br>_PTT_RECORD_COMPLETE 	        |  result; file_path  			|  {"file_path":"","result":0}|  
| ITMG_MAIN_EVNET_TYPE<br>_PTT_UPLOAD_COMPLETE 	        |  result; file_path;<br>file_id  		|  {"file_id":"","file_path":"","result":0}|  
| ITMG_MAIN_EVNET_TYPE<br>_PTT_DOWNLOAD<br>_COMPLETE	  |  result; file_path; <br>file_id  		|  {"file_id":"","file_path":"","result":0}|  
| ITMG_MAIN_EVNET_TYPE<br>_PTT_PLAY_COMPLETE 	          |  result; file_path  			|  {"file_path":"","result":0}|  
| ITMG_MAIN_EVNET_TYPE<br>_PTT_SPEECH2TEXT<br>_COMPLETE	|  result; text; <br>file_id		|  {"file_id":"","text":"","result":0}|  
| ITMG_MAIN_EVNET_TYPE<br>_PTT<br>_STREAMINGRECOGNITION<br>_COMPLETE |  result; file_path; <br>text;file_id		|  {"file_id":"","file_path":","text":"","result":0}|  
| ITMG_MAIN_EVNET_TYPE<br>_PTT<br>_STREAMINGRECOGNITION<br>_IS_RUNNING |  result; file_path; <br>text;file_id		|  {"file_id":"","file_path":","text":"","result":0}|  
