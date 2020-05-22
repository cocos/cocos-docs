# 接口文档

为方便 Cocos Creator 开发者调试和接入腾讯云游戏多媒体引擎产品 API，本文为通过 Cocos Service 服务面板，接入腾讯云 GME 的接口文档。

* 此文档对应 GME SDK 的版本为 **2.5.2**。
* 函数原型为 [**GME Cocos SDK 接口文档**](https://cloud.tencent.com/document/product/607/15218) 中定义的接口，Cocos Service 接入时设置了一个全局变量 `tencentGME.tencentGMEInst`，可参考示例代码接入。

## GME 的重要接口

|   重要接口     |   接口含义|  
|   ------------- |  -------------|  
|   [init](#初始化-SDK)    		|   初始化 GME 	|  
|   [poll](#触发事件回调)     		|   触发事件回调	|  
|   [enterRoom](#加入房间)	 	|   加入房间  		|  
|   [enableMic](#开启关闭麦克风)	 	|   开启/关闭麦克风 	|  
|   [enableSpeaker](#开启关闭扬声器) |   开启/关闭扬声器 	|  

## 说明

- GME 使用前请对工程进行配置，否则 SDK 不生效。

- GME 的接口调用成功后返回值为 GME SDK 定义的枚举值 AV_OK，数值为 0。

- GME 的接口调用要在同一个线程下，任意 JS 线程均可，JSB 层封装和回调的消息均在 JS 线程完成。

- GME 加入房间需要鉴权，请参考文档关于 [鉴权初始化](#鉴权初始化) 内容。

- GME 需要周期性的调用 [poll](#触发事件回调) 接口触发事件回调。

- GME 回调信息，请参考 [回调消息](#回调消息) 列表。

- 设备的操作要在进房成功之后。

- 错误码详情可参考腾讯云官方文档 [错误码](https://cloud.tencent.com/document/product/607/15173)。

## 实时语音流程图

![](https://main.qcloudimg.com/raw/bf2993148e4783caf331e6ffd5cec661.png)

## 初始化相关接口

未初始化前，SDK 处于未初始化阶段，需要通过接口 `init` 初始化 SDK，才可以使用实时语音及离线语音。

使用问题可参考腾讯云官方文档 [一般性问题](https://cloud.tencent.com/document/product/607/30408)。

|  接口     |   接口含义   |  
|   ------------- |  :-------------:|  
|  [init](#初始化-sdk) 	|  初始化 SDK  |   
|  [poll](#触发事件回调) |  触发事件回调 |  
|  [pause](#系统暂停)   	|  系统暂停    |  
|  [resume](#系统恢复) 	|  系统恢复    |  
|  [uninit](#反初始化-sdk) |  反初始化 SDK |  

### 初始化 SDK

参数获取请查看腾讯云官方文档 [接入指引](https://cloud.tencent.com/document/product/607/10782)。

此接口需要来自腾讯云控制台的 AppID 和 Key 作为参数，再加上 openId。这里的 openId 是唯一标识一个用户，规则由 App 开发者自行制定，App 内不重复即可（目前只支持 INT64）。

**初始化 SDK 之后才可以进房。**

#### 函数原型

```
TencentGME.fn.init = function(appId: string, key: string, openId: string) {...}
```

|  参数     |   类型         |  含义|  
|   ------------- |  :-------------:|  -------------|  
|   appId    	|  string   	|  来自腾讯云控制台的 AppID			|  
|   key    	|  string   	|  来自腾讯云 [控制台](https://console.cloud.tencent.com/gamegme) 的密钥 	|  
|   openId    	|  string   	|  openId 只支持 Int64 类型（转为 string 传入），必须大于 10000，用于标识用户 	|  

#### 示例代码

```
var appId = '1400089356';
var key = '1cfbfxxxxx03a53e';
var openId = '123456';
tencentGME.tencentGMEInst.init(appId, key, openId);
```

### 触发事件回调

通过在 `update` 里面周期的调用 `poll` 可以触发事件回调。

#### 函数原型

```
TencentGME.fn.poll = function() {...}
```

#### 示例代码

```
tencentGME.tencentGMEInst.poll();
```

### 系统暂停

当系统发生 `pause` 事件时，需要同时通知引擎进行 `pause`。

#### 函数原型

```
TencentGME.fn.pause = function() {...}
```

#### 示例代码

```
tencentGME.tencentGMEInst.pause();
```

### 系统恢复

当系统发生 `resume` 事件时，需要同时通知引擎进行 `resume`。`resume` 接口只恢复实时语音。

#### 函数原型

```
TencentGME.fn.resume = function() {...}
```

#### 示例代码

```
tencentGME.tencentGMEInst.resume();
```

### 反初始化 SDK

反初始化 SDK，进入未初始化状态。切换账号需要反初始化。

#### 函数原型

```
TencentGME.fn.uninit = function() {...}
```

#### 示例代码

```
tencentGME.tencentGMEInst.uninit();
```

## 实时语音房间相关接口

[初始化](#初始化-sdk) 完毕，SDK 调用 `enterRoom` 进入房间后，才可以进行实时语音通话。

使用问题可参考腾讯云官方文档 [实时语音相关问题](https://cloud.tencent.com/document/product/607/30411)。

|  接口     |   接口含义   |  
|  ------------- |  :-------------:|  
|  [enterRoom](#加入房间)   		|  加入房间 |  
|  [isRoomEntered](#判断是否已经进入房间)   	|  判断是否已经进入房间 |  
|  [exitRoom](#退出房间) 		|  退出房间 |  
|  [changeRoomType](#修改用户房间音频类型) 	|  修改用户房间音频类型 |  
|  [getRoomType](#获取用户房间音频类型) 		|  获取用户房间音频类型|  

### 加入房间

如果普通语音进房，业务方面无涉及范围语音需求，则使用普通进房接口。详细信息请查看腾讯云官方文档 [范围语音](https://cloud.tencent.com/document/product/607/17972)。

若需要使用离线语音功能，通过生成的 [鉴权信息](#鉴权初始化) 进房，会收到消息为 `ITMG_MAIN_EVENT_TYPE_ENTER_ROOM` 的回调。加入房间默认不开启麦克风及扬声器。返回值为 `AV_OK` 的时候代表成功。

#### 函数原型

```
TencentGME.fn.enterRoom = function(roomId: string, type: number) {...}
```

|  参数     |   类型         |  含义|  
|   ------------- |  :-------------:|  -------------|  
|   roomID			|   string    		|  房间号，最大支持 127 字符	|  
|   roomType 			|  ITMG_ROOM_TYPE	|  房间音频类型		|  

房间音频类型请参考腾讯云官方文档 [音质选择](https://cloud.tencent.com/document/product/607/18522)。

#### 示例代码

```
var roomId = '123';
tencentGME.tencentGMEInst.enterRoom(roomId, 1);
```

### 判断是否已经进入房间

通过调用此接口可以判断是否已经进入房间，返回值为 `boolean` 类型。

#### 函数原型

```
TencentGME.fn.isRoomEntered = function() {...}
```

#### 示例代码

```
var isRoomEntered = tencentGME.tencentGMEInst.isRoomEntered();
```

### 退出房间

通过调用此接口可以退出所在房间。这是一个异步接口，返回值为 `AV_OK` 的时候代表退出房间成功。

**如果应用中有退房后立即进房的场景，在接口调用流程上，开发者无需要等待 `ExitRoom` 的回调 `RoomExitComplete` 通知，只需直接调用接口。**

#### 函数原型

```
TencentGME.fn.exitRoom = function() {...}
```

#### 示例代码

```
tencentGME.tencentGMEInst.exitRoom();
```

### 修改用户房间音频类型

此接口用于修改用户房间音频类型，结果参见回调事件，事件类型为 `ITMG_MAIN_EVENT_TYPE_CHANGE_ROOM_TYPE`。

#### 函数原型

```
TencentGME.fn.changeRoomType = function(roomType: number) {...}
```

|  参数     |   类型         |  含义|  
|   ------------- |  :-------------:|  -------------|  
|   roomType    |  ITMG_ROOM_TYPE    |  希望房间切换成的类型，房间音频类型参考 [enterRoom](#加入房间) 接口|  

#### 示例代码

```
tencentGME.tencentGMEInst.changeRoomType(4);
```

### 获取用户房间音频类型

此接口用于获取用户房间音频类型，返回值为房间音频类型，返回值为 **0** 时代表获取用户房间音频类型发生错误，房间音频类型参考 `enterRoom` 接口。

#### 函数原型

```
TencentGME.fn.getRoomType = function() {...}
```

#### 示例代码

```
var roomType = tencentGME.tencentGMEInst.getRoomType();
```

## 实时语音音频接口

[初始化 SDK](#初始化-sdk) 之后进房，在房间中，才可以调用实时音频语音相关接口。

当用户在界面单击开启/关闭麦克风/扬声器的按钮时：

- 对于大部分的 **游戏类 App**，推荐调用 `enableMic` 及 `enableSpeaker` 接口，相当于同时调用`enableAudioCaptureDevice/EnableAudioSend` 和 `enableAudioPlayDevice/enableAudioRecv` 接口。

- 其他类型的 **移动端 App**，例如社交类型 App，开启或者关闭采集设备，会伴随整个设备（采集及播放）重启，如果此时 App 正在播放背景音乐，那么背景音乐的播放也会被中断。利用控制上下行的方式来实现开关麦克风效果，不会中断播放设备。具体调用方式为：在进房的时候调用 `enableAudioCaptureDevice(true) && enableAudioPlayDevice(true)` 一次，单击开关麦克风时只调用 `enableAudioSend/enableAudioRecv` 来控制音频流是否发送/接收。

- 如果想单独释放采集或者播放设备，请参考下方的 `enableAudioCaptureDevice` 和 `enableAudioPlayDevice` 接口介绍。

- 调用 `pause` 暂停音频，调用 `resume` 恢复音频。

|  接口     |   接口含义   |  
|   ------------- |  :-------------:|  
|  [enableMic](#开启关闭麦克风)    						|  开启/关闭麦克风 |  
|  [getMicState](#获取麦克风状态)    						|  获取麦克风状态 |  
|  [enableAudioCaptureDevice](#开启关闭采集设备)    		|  开启/关闭采集设备		|  
|  [isAudioCaptureDeviceEnabled](#获取采集设备状态)    	|  获取采集设备状态	|  
|  [enableAudioSend](#开启关闭音频上行)    				|  开启/关闭音频上行	|  
|  [isAudioSendEnabled](#获取音频上行状态)    				|  获取音频上行状态	|  
|  [getMicLevel](#获取麦克风实时音量)    						|  获取麦克风实时音量	|  
|  [getSendStreamLevel](#获取音频上行实时音量)					|  获取音频上行实时音量 |  
|  [setMicVolume](#设置麦克风音量)    					|  设置麦克风音量		|  
|  [getMicVolume](#获取麦克风音量)    					|  获取麦克风音量		|  
|  [enableSpeaker](#开启关闭扬声器)    					|  开启/关闭扬声器 |  
|  [getSpeakerState](#获取扬声器状态)    					|  获取扬声器状态 |  
|  [enableAudioPlayDevice](#开启关闭播放设备)    			|  开启/关闭播放设备		|  
|  [isAudioPlayDeviceEnabled](#获取播放设备状态)    		|  获取播放设备状态	|  
|  [enableAudioRecv](#开启关闭音频下行	)    					|  开启/关闭音频下行	|  
|  [isAudioRecvEnabled](#获取音频下行状态)    				|  获取音频下行状态	|  
|  [getSpeakerLevel](#获取扬声器实时音量)    					|  获取扬声器实时音量	|  
|  [getRecvStreamLevel](#获取房间内其他成员下行实时音量)					|  获取房间内其他成员下行实时音量 |  
|  [setSpeakerVolume](#设置扬声器音量)    				|  设置扬声器音量		|  
|  [getSpeakerVolume](#获取扬声器音量)    				|  获取扬声器音量		|  
|  [enableLoopBack](#开启关闭耳返)    					|  开启/关闭耳返			|  

### 开启/关闭麦克风

此接口用来开启/关闭麦克风。加入房间时默认不开启麦克风及扬声器。

调用 `enableMic` 接口，相当于同时调用 `enableAudioCaptureDevice` 和 `enableAudioSend` 两个接口。

####  函数原型  

```
TencentGME.fn.enableMic = function(bEnabled: boolean) {...}
```

|  参数     |   类型         |  含义|  
|   ------------- |  :-------------:|  -------------|  
|   bEnabled    |  boolean     |  如果需要开启麦克风，则传入的参数为 true，如果关闭麦克风，则参数为 false		|  

#### 示例代码

```
tencentGME.tencentGMEInst.enableMic(true);
```

### 获取麦克风状态

此接口用于获取麦克风的状态，返回值为 **0** 时表示麦克风处于 **关闭** 状态。返回值为 **1** 时表示麦克风为 **开启** 状态。

#### 函数原型

```
TencentGME.fn.getMicState = function() {...}
```

#### 示例代码

```
var micState = tencentGME.tencentGMEInst.getMicState();
```

### 开启/关闭采集设备

此接口用来开启/关闭采集设备。加入房间默认不开启设备。

- 只能在进房后调用此接口，退房会自动关闭设备。

- 在移动端，开启采集设备通常会伴随权限申请，音量类型调整等操作。

#### 函数原型

```
TencentGME.fn.enableAudioCaptureDevice = function(bEnabled: boolean) {...}
```

|  参数     |   类型         |  含义|  
|   ------------- |  :-------------:|  -------------|  
|   bEnabled    |  boolean     |  如果需要开启采集设备，则传入的参数为 true，如果关闭采集设备，则参数为 false|  

#### 示例代码

```
tencentGME.tencentGMEInst.enableAudioCaptureDevice(true);
```

### 获取采集设备状态

此接口用于获取采集设备的状态。

#### 函数原型

```
TencentGME.fn.isAudioCaptureDeviceEnabled = function() {...}
```

#### 示例代码

```
var isAudioCaptureDeviceEnabled = tencentGME.tencentGMEInst.isAudioCaptureDeviceEnabled();
```

### 开启/关闭音频上行

此接口用于开启或关闭音频上行。如果采集设备已经开启，那么会发送采集到的音频数据。如果采集设备没有开启，那么仍旧无声。采集设备的开启/关闭，请参考接口 `EnableAudioCaptureDevice`。

#### 函数原型

```
TencentGME.fn.enableAudioSend = function(bEnabled: boolean) {...}
```

|  参数     |   类型         |  含义|  
|   ------------- |  :-------------:|  -------------|  
|   bEnabled    |  boolean     |  如果需要开启音频上行，则传入的参数为 true，如果关闭音频上行，则参数为 false|  

#### 示例代码

```
tencentGME.tencentGMEInst.enableAudioSend(true);
```

### 获取音频上行状态

此接口用于获取音频上行的状态。

#### 函数原型

```
TencentGME.fn.isAudioSendEnabled = function() {...}
```

#### 示例代码

```
var isAudioSendEnabled = tencentGME.tencentGMEInst.isAudioSendEnabled();
```

### 获取麦克风实时音量

此接口用于获取麦克风实时音量，返回值为 `number` 类型。

#### 函数原型

```
TencentGME.fn.getMicLevel = function() {...}
```

#### 示例代码

```
var volume = tencentGME.tencentGMEInst.getMicLevel();
```

### 获取音频上行实时音量

此接口用于获取音频上行实时音量，返回值为 `number` 类型，取值范围为 **0 ~ 100**。

#### 函数原型

```
TencentGME.fn.getSendStreamLevel = function() {...}
```

#### 示例代码

```
var volume = tencentGME.tencentGMEInst.getSendStreamLevel();
```

### 设置麦克风音量

此接口用于设置麦克风的音量。参数 `volume` 用于设置麦克风的音量，当数值为 **0** 的时候表示静音，当数值为 **100** 的时候表示音量不增不减，默认数值为 **100**。

#### 函数原型

```
TencentGME.fn.setMicVolume = function(volume: number) {...}
```

|  参数     |   类型         |  含义|  
|   ------------- |  :-------------:|  -------------|  
|   vol    |  number      |  设置音量，范围 0 到 200|  

#### 示例代码

```
tencentGME.tencentGMEInst.setMicVolume(100);
```

### 获取麦克风音量

此接口用于获取麦克风的音量。返回值为一个 `number` 类型数值，返回值为 **1～100** 表示正常音量，返回值为 **101** 则表示没调用过接口 `setMicVolume`。

#### 函数原型

```
TencentGME.fn.getMicVolume = function() {...}
```

#### 示例代码

```
var volume = tencentGME.tencentGMEInst.getMicVolume();
```

### 开启/关闭扬声器

此接口用于开启/关闭扬声器。

#### 函数原型

```
TencentGME.fn.enableSpeaker = function(bEnabled: boolean) {...}
```

|  参数     |   类型         |  含义|  
|   ------------- |  :-------------:|  -------------|  
|   bEnabled   		|  boolean       	|  如果需要关闭扬声器，则传入的参数为 false，如果开启扬声器，则参数为 true	|  


#### 示例代码

```
tencentGME.tencentGMEInst.enableSpeaker(true);
```

### 获取扬声器状态

此接口用于获取扬声器状态。

- 返回值为 **0** 时表示扬声器处于 **关闭** 状态。
- 返回值 **1** 时表示扬声器为 **开启** 状态。
- 返回值为 **2** 时表示扬声器处于 **正在操作** 状态。

#### 函数原型

```
TencentGME.fn.getSpeakerState = function() {...}
```

#### 示例代码

```
var speakerState = tencentGME.tencentGMEInst.getSpeakerState();
```

### 开启/关闭播放设备

此接口用于开启/关闭播放设备。

#### 函数原型

```
TencentGME.fn.enableAudioPlayDevice = function(bEnabled: boolean) {...}
```

|  参数     |   类型         |  含义|  
|   ------------- |  :-------------:|  -------------|  
|   bEnabled    |  boolean        |  如果需要关闭播放设备，则传入的参数为 false，如果开启播放设备，则参数为 true|  


#### 示例代码

```
tencentGME.tencentGMEInst.enableAudioPlayDevice(true);
```

### 获取播放设备状态

此接口用于获取播放设备状态。

#### 函数原型

```
TencentGME.fn.isAudioPlayDeviceEnabled = function() {...}
```

#### 示例代码

```
var isAudioPlayDeviceEnabled = tencentGME.tencentGMEInst.isAudioPlayDeviceEnabled();
```

### 开启/关闭音频下行

此接口用于开启/关闭音频下行。如果播放设备已经开启，那么会播放房间里其他人的音频数据。如果播放设备没有开启，那么仍旧无声。播放设备的开启/关闭请参考接口 `EnableAudioPlayDevice` 。

#### 函数原型

```
TencentGME.fn.enableAudioRecv = function(bEnabled: boolean) {...}

```

|  参数     |   类型         |  含义|  
|   ------------- |  :-------------:|  -------------|  
|   bEnabled    |  boolean     |  如果需要开启音频下行，则传入的参数为 true，如果关闭音频下行，则参数为 false|  

#### 示例代码  

```
tencentGME.tencentGMEInst.enableAudioRecv(true);
```

### 获取音频下行状态

此接口用于获取音频下行状态。

#### 函数原型

```
TencentGME.fn.isAudioRecvEnabled = function() {...}
```

#### 示例代码

```
var isAudioRecvEnabled = tencentGME.tencentGMEInst.isAudioRecvEnabled();
```

### 获取扬声器实时音量

此接口用于获取扬声器实时音量。返回值为 `number` 类型数值，表示扬声器实时音量。

#### 函数原型

```
TencentGME.fn.getSpeakerLevel = function() {...}
```

#### 示例代码

```
var volume = tencentGME.tencentGMEInst.getSpeakerLevel();
```

### 获取房间内其他成员下行实时音量

此接口用于获取房间内其他成员下行实时音量，返回值为 `number` 类型，取值范围为 **0 ~ 100**。

#### 函数原型

```
TencentGME.fn.getRecvStreamLevel = function(openId: string) {...}
```

|  参数     |   类型         |  含义|  
|   ------------- |  :-------------:|  -------------|  
|   openId    |  string       |  房间内其他成员的 openId |  

#### 示例代码

```
var volume = tencentGME.tencentGMEInst.getRecvStreamLevel();
```

### 设置扬声器音量

此接口用于设置扬声器音量。

参数 `volume` 用于设置扬声器的音量，当数值为 **0** 的时候表示静音，当数值为 **100** 的时候表示音量不增不减，默认数值为 **100**。

#### 函数原型

```
TencentGME.fn.setSpeakerVolume = function(volume: number) {...}
```

|  参数     |   类型         |  含义|  
|   ------------- |  :-------------:|  -------------|  
|   volume    |  number        |  设置音量，范围 0 到 200|  

#### 示例代码

```
tencentGME.tencentGMEInst.setSpeakerVolume(100);
```

### 获取扬声器音量

此接口用于获取扬声器音量。返回值为 `number` 类型数值，返回值为 **1～100** 表示正常音量，返回值为 **101**  代表没调用过接口 `setSpeakerVolume`。

`Level` 是实时音量，`Volume` 是扬声器的音量，最终声音音量相当于 `Level * Volume%`。举个例子：实时音量是数值是 100 的话，此时 `Volume` 的数值是 60 ，那么最终发出来的声音数值也是 60。

#### 函数原型

```
TencentGME.fn.getSpeakerVolume = function() {...}
```

#### 示例代码

```
var volume = tencentGME.tencentGMEInst.getSpeakerVolume();
```

### 开启/关闭耳返

此接口用于开启/关闭耳返。

#### 函数原型

```
TencentGME.fn.enableLoopBack = function(bEnabled: boolean) {...}
```

|  参数     |   类型         |  含义|  
|   ------------- |  :-------------:|  -------------|  
|   bEnabled    |  boolean         |  是否启动耳返|  

#### 示例代码

```
tencentGME.tencentGMEInst.enableLoopBack(true);
```

## 离线语音语音转文字流程图

![](https://main.qcloudimg.com/raw/4c875d05cd2b4eaefba676d2e4fc031d.png)

## 离线语音

未初始化前，SDK 处于未初始化阶段，需要通过接口 `init` 初始化 SDK，才可以使用实时语音及离线语音。

使用问题可参考腾讯云官方文档 [离线语音相关问题](https://cloud.tencent.com/document/product/607/30412)。

### 初始化相关接口

|  接口     |   接口含义   |  
|   ------------- |  :-------------:|  
|  [init](#初始化-sdk) 	|  初始化 SDK  |   
|  [poll](#触发事件回调) |  触发事件回调 |  
|  [pause](#系统暂停)   	|  系统暂停    |  
|  [resume](#系统恢复) 	|  系统恢复    |  
|  [uninit](#反初始化-sdk) |  反初始化 SDK |  

### 离线语音相关接口

|  接口     |   接口含义   |  
|   ------------- |  :-------------:|  
|  [applyPTTAuthbuffer](#鉴权初始化)    |  鉴权初始化	|  
|  [pttSetMaxMessageLength](#限制最大语音信息时长)    |  限制最大语音信息时长	|  
|  [pttStartRecording](#启动流式录音)		|  启动流式录音		|  
|  [pttStartRecordingWithStreamingRecognition](#启动流式语音识别)		|  启动流式语音识别		|  
|  [pttPauseRecording](#暂停录音) |  暂停录音 |  
|  [pttResumeRecording](#恢复录音) |  恢复录音 |  
|  [pttStopRecording](#停止录音)     	|  停止录音		|  
|  [pttCancelRecording](#取消录音) 	|  取消录音		|  
|  [pttGetMicLevel](#获取离线语音麦克风实时音量)  |  获取离线语音麦克风实时音量 |  
|  [pttSetMicVolume](#设置离线语音录制音量)  |  设置离线语音录制音量 |  
|  [pttGetMicVolume](#获取离线语音录制音量)  |  获取离线语音录制音量 |  
|  [pttGetSpeakerLevel](#获取离线语音扬声器实时音量)  |  获取离线语音扬声器实时音量  |  
|  [pttSetSpeakerVolume](#设置离线语音播放音量)  |  设置离线语音播放音量 |  
|  [pttGetSpeakerVolume](#获取离线语音播放音量) |  获取离线语音播放音量 |  
|  [pttUploadRecordedFile](#上传语音文件) 	|  上传语音文件		|  
|  [pttDownloadRecordedFile](#下载语音文件)	|  下载语音文件		|  
|  [pttPlayRecordedFile](#开始播放语音) 	|  开始播放语音		|  
|  [pttStopPlayFile](#停止播放语音)		|  停止播放语音		|  
|  [pttGetFileSize](#获取语音文件大小) 		|  获取语音文件大小		|  
|  [pttGetVoiceFileDuration](#获取语音文件时长)	|  获取语音文件时长		|  
|  [pttSpeechToText](#将指定的语音文件翻译成文字) 		|  将指定的语音文件翻译成文字		|  

### 鉴权初始化

在 [初始化 SDK](#初始化-sdk) 之后调用鉴权初始化。

#### 函数原型

```
TencentGME.fn.applyPTTAuthbuffer = function() {...}
```

#### 示例代码

```
tencentGME.tencentGMEInst.applyPTTAuthbuffer();
```

### 限制最大语音信息时长

限制最大语音消息的长度，最大支持 **60** 秒。

#### 函数原型

```
TencentGME.fn.pttSetMaxMessageLength = function(msTime: number) {...}
```

|  参数     |   类型         |  含义|  
|   ------------- |  :-------------:|  -------------|  
|   msTime    |  number                    |  语音时长，单位 ms|  

#### 示例代码 

```
tencentGME.tencentGMEInst.pttSetMaxMessageLength();
```

### 启动流式录音

此接口用于启动流式录音。需要将录音文件上传后才可以进行语音转文字等操作。

#### 函数原型  

```
TencentGME.fn.pttStartRecording = function(fileDir: string) {...}
```

|  参数     |   类型         |  含义|  
|   ------------- |  :-------------:|  -------------|  
|   fileDir    |  string                      |  存放的语音路径|  

#### 示例代码

```
var fileDir = '*****';
tencentGME.tencentGMEInst.pttStartRecording(fileDir);
```

### 启动流式语音识别

此接口用于启动流式语音识别，同时在回调中会有实时的语音转文字返回，可以指定语言进行识别，也可以将语音中识别到的信息翻译成指定的语言返回。

#### 函数原型

```
TencentGME.fn.pttStartRecordingWithStreamingRecognition = function(fileDir: string, [speechLanguage: string, translateLanguage: string]) {...}
```

|  参数     |   类型         |  含义|  
|   ------------- |  :-------------:|  -------------|  
|   fileDir    	|  string	|  存放的语音路径	|  
|   speechLanguage (可选)    |  string                     |  识别成指定文字的语言参数，参数请参考 [语音转文字的语言参数参考列表](https://cloud.tencent.com/document/product/607/30282)|  
|   translateLanguage (可选)    |  string                     |  翻译成指定文字的语言参数，参数请参考 [语音转文字的语言参数参考列表](https://cloud.tencent.com/document/product/607/30282)（此参数暂不可用，请填写与 speechLanguage 相同的参数)|  

#### 示例代码 

```
var fileDir = '*****';
tencentGME.tencentGMEInst.pttStartRecordingWithStreamingRecognition(fileDir);
```

### 暂停录音

此接口用于暂停录音。如需恢复录音请调用接口 `ResumeRecording` 。

#### 函数原型 

```
TencentGME.fn.pttPauseRecording = function() {...}
```

#### 示例代码

```
tencentGME.tencentGMEInst.pttPauseRecording();
```

### 恢复录音

此接口用于恢复录音。

#### 函数原型 

```
TencentGME.fn.pttResumeRecording = function() {...}
```

#### 示例代码

```
tencentGME.tencentGMEInst.pttResumeRecording();
```

### 停止录音

此接口用于停止录音。此接口为异步接口，停止录音后会有录音完成回调，成功之后录音文件才可用。

#### 函数原型

```
TencentGME.fn.pttStopRecording = function() {...}
```

#### 示例代码

```
tencentGME.tencentGMEInst.pttStopRecording();
```

### 取消录音

调用此接口取消录音。取消之后没有回调。

#### 函数原型

```
TencentGME.fn.pttCancelRecording = function() {...}
```

#### 示例代码

```
tencentGME.tencentGMEInst.pttCancelRecording();
```

### 获取离线语音麦克风实时音量

此接口用于获取麦克风实时音量，返回值为 `number` 类型，取值范围为 **0 ~ 100**。

#### 函数原型

```
TencentGME.fn.pttGetMicLevel = function() {...}
```

#### 示例代码

```
var volume = tencentGME.tencentGMEInst.pttGetMicLevel();
```

### 设置离线语音录制音量

此接口用于设置离线语音录制的音量，取值范围为 **0 ~ 100**。

####  函数原型

```
TencentGME.fn.pttSetMicVolume = function(volume: number) {...}
```

|  参数     |   类型         |  含义|  
|   ------------- |  :-------------:|  -------------|  
|   volume    |  number        |  设置音量，范围 0 到 200|  

#### 示例代码

```
tencentGME.tencentGMEInst.pttSetMicVolume(100);
```

### 获取离线语音录制音量

此接口用于获取离线语音录制的音量。返回值为 `number` 类型，取值范围为 **0 ~ 100**。

#### 函数原型

```
TencentGME.fn.pttGetMicVolume = function() {...}
```

#### 示例代码

```
var volume = tencentGME.tencentGMEInst.pttGetMicVolume();
```

### 获取离线语音扬声器实时音量

此接口用于获取扬声器实时音量。返回值为 `number` 类型，取值范围为 **0 ~ 100**。

#### 函数原型

```
TencentGME.fn.pttGetSpeakerLevel = function() {...}
```

#### 示例代码

```
var volume = tencentGME.tencentGMEInst.pttGetSpeakerLevel();
```

### 设置离线语音播放音量

此接口用于设置离线语音播放音量，取值范围为 **0 ~ 100**。

#### 函数原型

```
TencentGME.fn.pttSetSpeakerVolume = function(volume: number) {...}
```

|  参数     |   类型         |  含义|  
|   ------------- |  :-------------:|  -------------|  
|   volume    |  number        |  设置音量，范围 0 到 200|  

#### 示例代码

```
tencentGME.tencentGMEInst.pttSetSpeakerVolume(100);
```

### 获取离线语音播放音量

此接口用于获取离线语音播放音量。返回值为 number 类型，取值范围为 **0 ~ 100**。

#### 函数原型

```
TencentGME.fn.pttGetSpeakerVolume = function() {...}
```

#### 示例代码

```
var volume = tencentGME.tencentGMEInst.pttGetSpeakerVolume();
```

### 上传语音文件

此接口用于上传语音文件。

#### 函数原型

```
TencentGME.fn.pttUploadRecordedFile = function(filePath: string) {...}
```

|  参数     |   类型         |  含义|  
|   ------------- |  :-------------:|  -------------|  
|   filePath    |  string                       |  上传的语音路径|  

#### 示例代码

```
var filePath = '*****';
tencentGME.tencentGMEInst.pttUploadRecordedFile(filePath);
```

### 下载语音文件

此接口用于下载语音文件。

#### 函数原型

```
TencentGME.fn.pttDownloadRecordedFile = function(fileId: string, filePath: string) {...}
```

|  参数     |   类型         |  含义|  
|   ------------- |  :-------------:|  -------------|  
|   fileId  		|  string   	|  文件的 url 路径，上传文件回调中获取	|  
|   filePath 	|  string  	|  文件的本地保存路径	|  

#### 示例代码

```
var filePath = '*****';
var fileId = '***';
tencentGME.tencentGMEInst.pttDownloadRecordedFile(fileId, filePath);
```

### 开始播放语音

此接口用于开始播放语音。

#### 函数原型

```
TencentGME.fn.pttPlayRecordedFile = function(filePath: string) {...}
```

|  参数     |   类型         |  含义|  
|   ------------- |  :-------------:|  -------------|  
|   filePath    |  string                       |  文件的路径|  

#### 返回错误码

| 错误码值 | 原因       | 建议方案                       |
| -------- | ---------- | ------------------------------ |
| 20485    | 播放未开始 | 确保文件存在，文件路径的合法性 |

#### 示例代码

```
var filePath = '*****';
tencentGME.tencentGMEInst.pttPlayRecordedFile(filePath);
```

### 停止播放语音

此接口用于停止播放语音。停止播放语音也会有播放完成的回调。

#### 函数原型

```
TencentGME.fn.pttStopPlayFile = function() {...}
```

#### 示例代码

```
var volume = tencentGME.tencentGMEInst.pttStopPlayFile();
```

### 获取语音文件大小

通过此接口，获取语音文件大小。

#### 函数原型

```
TencentGME.fn.pttGetFileSize = function(filePath: string) {...}
```

|  参数     |   类型         |  含义|  
|   ------------- |  :-------------:|  -------------|  
|   filePath    |  string                      |  语音文件的路径|  

#### 示例代码

```
var filePath = '*****';
tencentGME.tencentGMEInst.pttGetFileSize(filePath);
```

### 获取语音文件时长

此接口用于获取语音文件时长，单位毫秒。

#### 函数原型

```
TencentGME.fn.pttGetVoiceFileDuration = function(filePath: string) {...}
```

|  参数     |   类型         |  含义|  
|   ------------- |  :-------------:|  -------------|  
|   filePath    |  string                      |  语音文件的路径|  

#### 示例代码

```
var filePath = '*****';
tencentGME.tencentGMEInst.pttGetVoiceFileDuration(filePath);
```

### 将指定的语音文件翻译成文字

此接口可以指定语言进行识别，也可以将语音中识别到的信息翻译成指定的语言返回。

#### 函数原型

```
TencentGME.fn.pttStartRecordingWithStreamingRecognition = function(fileID: string, [speechLanguage: string, translateLanguage: string]) {...}
```

|  参数     |   类型         |  含义|  
|   ------------- |  :-------------:|  -------------|  
|   fileID    |  string                     |  语音文件 url|  
|   speechLanguage (可选)    |  string                     |  识别出指定文字的语言参数，参数请参考 [语音转文字的语言参数参考列表](https://cloud.tencent.com/document/product/607/30282)|  
|   translatelanguage (可选)    |  string                  |  翻译成指定文字的语言参数，参数请参考 [语音转文字的语言参数参考列表](https://cloud.tencent.com/document/product/607/30282)（此参数暂时无效，填入参数应与 speechLanguage 一致）|  

#### 示例代码

```
var fileID = '*****';
tencentGME.tencentGMEInst.pttStartRecordingWithStreamingRecognition(fileID);
```

## 高级 API

### 获取诊断信息

获取音视频通话的实时通话质量的相关信息。该接口主要用来查看实时通话质量、排查问题等，业务侧可以忽略。

####  函数原型

```
TencentGME.fn.getQualityTips = function() {...}
```

#### 示例代码

```
var qualityTips = tencentGME.tencentGMEInst.getQualityTips();
```

### 获取版本号

#### 函数原型

```
TencentGME.fn.getSDKVersion = function() {...}
```

#### 示例代码 

```
var version = tencentGME.tencentGMEInst.getSDKVersion();
```

### 设置打印日志等级

用于设置打印日志等级。建议保持默认等级。

#### 函数原型

```
TencentGME.fn.setLogLevel = function(logLevelWrite: number, logLevelPrint: number) {...}
```

#### 参数含义

|  参数|  类型|  含义|  
|  ---|  ---|  ---|  
|  levelWrite|  ITMG_LOG_LEVEL|  设置写入日志的等级，`TMG_LOG_LEVEL_NONE` 表示不写入|  
|  levelPrnumber|  ITMG_LOG_LEVEL|  设置打印日志的等级，`TMG_LOG_LEVEL_NONE` 表示不打印|  

#### 示例代码

```
tencentGME.tencentGMEInst.setLogLevel(4, 4);
```

### 设置打印日志路径

用于设置打印日志路径。
默认路径为：

|  平台     |  路径        |  
|   ------------- |  :-------------:|  
|  Windows 	|  %appdata%\Tencent\GME\ProcessName|  
|  iOS    		|  Application/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx/Documents|  
|  Android	|  /sdcard/Android/data/xxx.xxx.xxx/files|  
|  Mac    		|  /Users/username/Library/Containers/xxx.xxx.xxx/Data/Documents|  

#### 函数原型

```
TencentGME.fn.setLogLevel = function(logPath: string) {...}
```

|  参数     |   类型         |  含义|  
|   ------------- |  :-------------:|  -------------|  
|   logDir    		|  string    		|  路径|  

#### 示例代码

```
var logPath = '****';
tencentGME.tencentGMEInst.setLogLevel(logPath);
```

### 加入音频数据黑名单

将某个 ID 加入音频数据黑名单。返回值为 **0** 表示调用成功。

#### 函数原型

```
TencentGME.fn.addAudioBlackList = function(openId: string) {...}
```

|  参数     |   类型         |  含义|  
|   ------------- |  :-------------:|  -------------|  
|   openId    |  string       |  需添加黑名单的 ID |  

#### 示例代码 

```
var openId = '****';
tencentGME.tencentGMEInst.addAudioBlackList(openId);
```

### 移除音频数据黑名单

将某个 ID 从音频数据黑名单中移除。返回值为 **0** 时表示调用成功。

#### 函数原型

```
TencentGME.fn.removeAudioBlackList = function(openId: string) {...}
```

|  参数     |   类型         |  含义|  
|   ------------- |  :-------------:|  -------------|  
|   openId    |  string       |  需移除黑名单的 ID|  

#### 示例代码

```
var openId = '****';
tencentGME.tencentGMEInst.removeAudioBlackList(openId);
```

## 回调消息

### 消息列表

|  消息     |   消息代表的含义   
|   ------------- |  :-------------:|  
|  ITMG_MAIN_EVENT_TYPE_ENTER_ROOM    		|  进入音频房间消息		|  
|  ITMG_MAIN_EVENT_TYPE_EXIT_ROOM    		|  退出音频房间消息		|  
|  ITMG_MAIN_EVENT_TYPE_ROOM_DISCONNECT		|  房间因为网络等原因断开消息	|  
|  ITMG_MAIN_EVENT_TYPE_CHANGE_ROOM_TYPE		|  房间类型变化事件		|  
|  ITMG_MAIN_EVENT_TYPE_MIC_NEW_DEVICE    	|  新增麦克风设备消息		|  
|  ITMG_MAIN_EVENT_TYPE_MIC_LOST_DEVICE    	|  丢失麦克风设备消息		|  
|  ITMG_MAIN_EVENT_TYPE_SPEAKER_NEW_DEVICE	|  新增扬声器设备消息		|  
|  ITMG_MAIN_EVENT_TYPE_SPEAKER_LOST_DEVICE	|  丢失扬声器设备消息		|  
|  ITMG_MAIN_EVENT_TYPE_ACCOMPANY_FINISH		|  伴奏结束消息			|  
|  ITMG_MAIN_EVNET_TYPE_USER_UPDATE		|  房间成员更新消息		|  
|  ITMG_MAIN_EVNET_TYPE_PTT_RECORD_COMPLETE	|  PTT 录音完成			|  
|  ITMG_MAIN_EVNET_TYPE_PTT_UPLOAD_COMPLETE	|  上传 PTT 完成			|  
|  ITMG_MAIN_EVNET_TYPE_PTT_DOWNLOAD_COMPLETE	|  下载 PTT 完成			|  
|  ITMG_MAIN_EVNET_TYPE_PTT_PLAY_COMPLETE		|  播放 PTT 完成			|  
|  ITMG_MAIN_EVNET_TYPE_PTT_SPEECH2TEXT_COMPLETE	|  语音转文字完成			|  

### Data 列表

|  消息     |   Data         |  例子|  
|   :------- |  :--------:|  :------- |  
|   ITMG_MAIN_EVENT_TYPE<br>_ENTER_ROOM    		|  result; error_info			|  {"error_info":"","result":0}|  
|   ITMG_MAIN_EVENT_TYPE<br>_EXIT_ROOM    		|  result; error_info  			|  {"error_info":"","result":0}|  
|   ITMG_MAIN_EVENT_TYPE<br>_ROOM_DISCONNECT    	|  result; error_info  			|  {"error_info":"waiting timeout,<br> please check your network",<br>"result":0}|  
|   ITMG_MAIN_EVENT_TYPE<br>_CHANGE_ROOM_TYPE    	|  result; error_info; <br>sub_event_type; <br>new_room_type	|  {"error_info":"","new_room_type":0,<br>"result":0}|  
|   ITMG_MAIN_EVENT_TYPE<br>_SPEAKER_NEW_DEVICE	|  result; error_info  			|  {"deviceID":"{0.0.0.00000000}.<br>{a4f1e8be-49fa-43e2-b8cf<br>-dd00542b47ae}",<br>"deviceName":"扬声器<br> (Realtek High Definition Audio)",<br>"error_info":"",<br>"isNewDevice":true,<br>"isUsedDevice":false,<br>"result":0}|  
|   ITMG_MAIN_EVENT_TYPE<br>_SPEAKER_LOST_DEVICE    	|  result; error_info  			|  {"deviceID":"{0.0.0.00000000}<br>.{a4f1e8be-49fa-43e2<br>-b8cf-dd00542b47ae}",<br>"deviceName":"扬声器 <br>(Realtek High Definition Audio)",<br>"error_info":"","isNewDevice":false,<br>"isUsedDevice":false,<br>"result":0}|  
|   ITMG_MAIN_EVENT_TYPE<br>_MIC_NEW_DEVICE    	|  result; error_info  			|  {"deviceID":"{0.0.1.00000000}.<br>{5fdf1a5b-f42d-4ab2<br>-890a-7e454093f229}",<br>"deviceName":"麦克风 <br>(Realtek High Definition Audio)",<br>"error_info":"","isNewDevice":true,<br>"isUsedDevice":true,<br>"result":0}|  
|   ITMG_MAIN_EVENT_TYPE<br>_MIC_LOST_DEVICE    	|  result; error_info 			|  {"deviceID":"{0.0.1.00000000}.<br>{5fdf1a5b-f42d-4ab2<br>-890a-7e454093f229}",<br>"deviceName":"麦克风 <br>(Realtek High Definition Audio)",<br>"error_info":"","isNewDevice":false,<br>"isUsedDevice":true,<br>"result":0}|  
|   ITMG_MAIN_EVNET_TYPE<br>_USER_UPDATE    		|  user_list;  event_id			|  {"event_id":1,"user_list":["0"]}|  
|   ITMG_MAIN_EVNET_TYPE<br>_PTT_RECORD_COMPLETE 	|  result; file_path  			|  {"file_path":"","result":0}|  
|   ITMG_MAIN_EVNET_TYPE<br>_PTT_UPLOAD_COMPLETE 	|  result; file_path;<br>file_id  		|  {"file_id":"","file_path":"","result":0}|  
|   ITMG_MAIN_EVNET_TYPE<br>_PTT_DOWNLOAD<br>_COMPLETE	|  result; file_path; <br>file_id  		|  {"file_id":"","file_path":"","result":0}|  
|   ITMG_MAIN_EVNET_TYPE<br>_PTT_PLAY_COMPLETE 	|  result; file_path  			|  {"file_path":"","result":0}|  
|   ITMG_MAIN_EVNET_TYPE<br>_PTT_SPEECH2TEXT<br>_COMPLETE	|  result; text; <br>file_id		|  {"file_id":"","text":"","result":0}|  
|   ITMG_MAIN_EVNET_TYPE<br>_PTT<br>_STREAMINGRECOGNITION<br>_COMPLETE	|  result; file_path; <br>text;file_id		|  {"file_id":"","file_path":","text":"","result":0}|  

