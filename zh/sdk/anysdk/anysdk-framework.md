
# AnySDK Framework

Cocos Creator 内置 Cocos 引擎中包含了 AnySDK Framework 资源。即开发者构建发布出的平台工程已经包含了 AnySDK Framework。该章节介绍了如何选择性使用 AnySDK。

## 使用 AnySDK 

### 原生

- 开发者可根据 [ AnySDK 官方文档 ](http://docs.anysdk.com) 直接接入 AnySDK 相关接口

### H5

- 构建时勾选 AnySDK 选项

- 开发者可根据 [ AnySDK H5 接入文档 ](http://docs.anysdk.com/H5Tutorial) 直接接入 AnySDK 相关接口


## 无需使用 AnySDK

开发者若不需要使用 AnySDK，目前只支持手动删除相关文件，删除步骤如下:
- 删除 `frameworks/runtime-src/Classes` 下的 
```
	jsb_anysdk_basic_conversions.cpp
	manualanysdkbindings.cpp
	jsb_anysdk_protocols_auto.cpp 
	SDKManager.cpp
	jsb_anysdk_basic_conversions.h
	manualanysdkbindings.hpp
	jsb_anysdk_protocols_auto.hpp 
	SDKManager.h
```

- 删除 `main.js` 下的
``` js
    // anysdk scripts
    if (cc.sys.isNative && cc.sys.isMobile) {
      jsList = jsList.concat(['jsb_anysdk.js', 'jsb_anysdk_constants.js']);
    }
```
在需要定制的项目路径下添加一个 build-templates 目录，里面按照平台路径划分子目录， 将删除代码的 `main.js`拷贝在子目录下
结构类似：

```
project-folder
 |--assets
 |--build
 |--build-templates
      |--web-mobile
            |--main.js
      |--jsb-binary
            |--main.js
      |--jsb-default
            |--main.js
```

- Eclipse 工程
	* 删除 libs 下的 `libPluginProtocol.jar` 文件
	* 删除 res 下的
	```
		drawable/plugin_btn_close.png
		drawable/plugin_ui_ad.png
		values-en/plugin_string.xml
		values/plugin_string.xml 
		layout/plugin_ads.xml
		layout/plugin_login.xml
	```
	* 删除 jni 下的 Android.mk 中 `LOCAL_WHOLE_STATIC_LIBRARIES := PluginProtocolStatic`
	* 删除 jni 下的 Android.mk 中
	```
		LOCAL_SRC_FILES :=  ../../Classes/SDKManager.cpp \ 
							../../Classes/jsb_anysdk_basic_conversions.cpp \
							../../Classes/manualanysdkbindings.cpp \
							../../Classes/jsb_anysdk_protocols_auto.cpp 
	```

	* 删除 jni 下的 Application.mk 宏定义 `APP_CPPFLAGS :=  -DPACKAGE_AS`
	* 修改 `src/org/cocos2dx/javascript/SDKWrapper.java` 文件中 `private final static boolean PACKAGE_AS = true;`，`true` 修改为 `false`
- Android Studio 工程
	* 删除 libs 下的 `libPluginProtocol.jar` 
	* 删除 res 下的
	```
		mipmap/plugin_btn_close.png
		mipmap/plugin_ui_ad.png
		values-en/plugin_string.xml
		values/plugin_string.xml
		layout/plugin_ads.xml
		layout/plugin_login.xml
	```
	* 删除 jni 下的 Android.mk 中 `LOCAL_WHOLE_STATIC_LIBRARIES := PluginProtocolStatic`
	* 删除 jni 下的 Android.mk 中 
	```
		LOCAL_SRC_FILES :=  ../../Classes/SDKManager.cpp \
							../../Classes/jsb_anysdk_basic_conversions.cpp \
							../../Classes/manualanysdkbindings.cpp \
							../../Classes/jsb_anysdk_protocols_auto.cpp
	```
	* 删除 jni 下的 Application.mk 宏定义`APP_CPPFLAGS :=  -DPACKAGE_AS`
	* 修改 `src/org/cocos2dx/javascript/SDKWrapper.java` 文件中 `private final static boolean PACKAGE_AS = true;`，`true` 修改为 `false`
- Xcode 工程
	* 删除 `libPluginProtocol.a` 库
	* Xcode 删除 `libPluginProtocol.a` 引用
	* Xcode 删除 `Classes` 下的引用
	```
		jsb_anysdk_basic_conversions.cpp
		manualanysdkbindings.cpp
		jsb_anysdk_protocols_auto.cpp 
		SDKManager.cpp
		jsb_anysdk_basic_conversions.h
		manualanysdkbindings.hpp
		jsb_anysdk_protocols_auto.hpp 
	```
	* 删除预编译宏 `PACKAGE_AS`
- Web 工程
	* 找到 index.html 文件删除
		```js
		<script charset="utf-8" id="protocols" type="text/javascript">
			var protocols = document.createElement("script");
			protocols.onload = function () {
				anysdk.agentManager.init();
				anysdk.agentManager.loadAllPlugins(function (code, msg) {
      			});
			};
			protocols.src = "http://statics.h5.anysdk.com/protocols/protocols.js";
			document.body.appendChild(protocols);
		</script>
  	 	```

## 删除 AnySDK 后仍需使用 
- 使用 Cocos Console 调用命令 ` cocos package import -b anysdk -p project-path --anysdk`

## 更新 AnySDK Framework
- 使用 Cocos Console 调用命令 ` cocos package update -p project-path --anysdk` 即可实现更新

## 接入常见问题
- 渠道包出现闪退现象
	* 产生原因: 构建出的 Cocos 工程中 `frameworks/runtime-src/Classes/SDKManager.cpp` 的 `loadAllPlugins` 方法已经调用了 `init` 方法，用户在 JS 层调用 `init` 方法无法生效。
	* 解决方案: 用户无需再 JS 层调用 'init' 方法，需使用构建出的 Cocos 工程中 `frameworks/runtime-src/Classes/SDKManager.cpp` 的 `loadAllPlugins` 方法 `init`方法，传递 appKey、appSecret、privateKey、oauthLoginServer
