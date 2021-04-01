
# AnySDK Framework

Cocos Creator built-in Cocos engine includes AnySDK Framework libraries. The platform project that built by developer already includes AnySDK Framework. The chapter introduces how to use AnySDK selectivity.

## Use AnySDK

### Native

- According to [AnySDK Official Documentation](http://docs.anysdk.com) integrates AnySDK`s relevant interface directly

### H5

- Check the AnySDK option when you built web-mobile project

- According to [AnySDK H5 Integrated Documentation](http://docs.anysdk.com/H5Tutorial) integrates AnySDK H5`s relevant interface directly

## No need to use AnySDK

If developers do not need to use AnySDK, currently only support to delete the relevant files manually.
Steps:

- Delete the following from the `frameworks/runtime-src/Classes` directory:

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

- Delete the following from the `main.js` file:

	``` js
	// anysdk scripts
	if (cc.sys.isNative && cc.sys.isMobile) {
		jsList = jsList.concat(['jsb_anysdk.js', 'jsb_anysdk_constants.js']);
	}
	```

Need to add a folder `build-templates` in the project path, the sub-folder in `build-templates` should named with platform. Copy `main.js` that deleted code to sub-folder

Folder Structure:

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

### Eclipse project

- Delete `libs` directory‘s `libPluginProtocol.jar` file

- Delete the following from the `res` directory:

	```
	drawable/plugin_btn_close.png
	drawable/plugin_ui_ad.png
	values-en/plugin_string.xml
	values/plugin_string.xml 
	layout/plugin_ads.xml
	layout/plugin_login.xml
	```

- Delete `LOCAL_WHOLE_STATIC_LIBRARIES := PluginProtocolStatic` from the `Android.mk` file in the `jni` directory.

- Delete the following from the `Android.mk` file in the `jni` folder:

	```
	LOCAL_SRC_FILES :=  ../../Classes/SDKManager.cpp \ 
						../../Classes/jsb_anysdk_basic_conversions.cpp \
						../../Classes/manualanysdkbindings.cpp \
						../../Classes/jsb_anysdk_protocols_auto.cpp 
	```

- Delete the macro definition `APP_CPPFLAGS :=  -DPACKAGE_AS` from the `Application.mk` file under the `jni` directory.

- Modify `src/org/cocos2dx/javascript/SDKWrapper.java` file's `private final static boolean PACKAGE_AS = true;`, `true` changes to `false`

### Android Studio project

- Delete `libs` directory's `libPluginProtocol.jar` file

- Delete the following from the `res` directory:

	```
	mipmap/plugin_btn_close.png
	mipmap/plugin_ui_ad.png
	values-en/plugin_string.xml
	values/plugin_string.xml
	layout/plugin_ads.xml
	layout/plugin_login.xml
	```

- Delete the following from the `Android.mk` file in the `jni` folder:

    `LOCAL_WHOLE_STATIC_LIBRARIES := PluginProtocolStatic`

- Delete the following from the `Android.mk` file in the `jni` folder:

	```
	LOCAL_SRC_FILES :=  ../../Classes/SDKManager.cpp \
						../../Classes/jsb_anysdk_basic_conversions.cpp \
						../../Classes/manualanysdkbindings.cpp \
						../../Classes/jsb_anysdk_protocols_auto.cpp
	```

- Delete the macro definition `APP_CPPFLAGS :=  -DPACKAGE_AS` from the `Application.mk` file under the `jni` directory.

- Modify `src/org/cocos2dx/javascript/SDKWrapper.java` file's `private final static boolean PACKAGE_AS = true;`, `true` changes to `false`

### Xcode project

- Delete `libPluginProtocol.a` library

- Xcode delete `libPluginProtocol.a` reference

- Xcode delete `Classes` file reference:

	```
	jsb_anysdk_basic_conversions.cpp
	manualanysdkbindings.cpp
	jsb_anysdk_protocols_auto.cpp 
	SDKManager.cpp
	jsb_anysdk_basic_conversions.h
	manualanysdkbindings.hpp
	jsb_anysdk_protocols_auto.hpp 
	```

- Delete preprocessor `PACKAGE_AS`

### Web project

- Manual: delete `index.html` file

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

- Auto: no check `AnySDK` option when built-in

## After the delete AnySDK still need to use

Use Cocos Console command to call `cocos package import -b anysdk -p project-path --anysdk`.

## Update AnySDK Framework

Use Cocos Console command to call `cocos package update -p project-path --anysdk`, updates can be realized.

## FAQ

- Q: Crash in channel package

- Reason: `frameworks/runtime-src/Classes/SDKManager.cpp` file's `loadAllPlugins` function has been invoked `init` function in built-in Creator project,it has been unable to be taken effect that developers invoked in JS code

- Solution: No need to invoke initialize interface, but the developer need to modify the `loadAllPlugins` function of `frameworks/runtime-src/Classes/SDKManager.cpp` file and add appKey, appSecret, privateKey, oauthLoginServer parameters.
