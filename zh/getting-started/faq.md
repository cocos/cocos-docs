# 常见问题（FAQ）

### 在 Mac 平台安装 Creator 后，打开工程，窗口无法显示出来。

把 CocosCreator.app 从 dmg 中拖到应用程序里，再打开。

### 如何配置构建后生成的目录结构以及自动修改构建后的文件内容？

可以分别执行 `Editor.Builder.on(“build-finished”, callback)` 和 `Editor.Builder.on(“before-change-files”, callback)` 来监听并对文件做出修改。<br>
详见 [定制项目构建流程](../publish/custom-project-build-template.md)。

### 构建后，组件关联的对象找不到，或者警告找不到类型？

指定模块可能被剔除了，请检查一下 `菜单栏 -> 项目 -> 项目设置` 中的模块设置。

### 如何从 CDN 加载资源？

在 `main.js` 里修改 `libraryPath` 和 `rawAssetsBase` 参数为任意路径。

### 浏览器里如何截屏？

截屏方法：监听 `cc.Director.EVENT_AFTER_DRAW` 事件，在回调中调用 `cc._canvas.toDataURL()` ，就可以获得 base64 格式的截屏。

具体内容可参考 [官方范例](https://github.com/cocos-creator/example-cases/tree/master/assets/cases/07_capture_texture) 中 **07_capture_texture** 关于三种不同平台如何截屏并保存的测试例。

### 在安卓第三方 App 自带的 WebView 上触摸时，引擎报错。

找到 `main.js` 中调用 `cc.view.enableAutoFullScreen` 的地方，将传入参数改为 `false`。

### 帧动画每帧的图片大小不一样的话，播放动画时会发生偏移。

请参考：[自带位置信息的序列帧动画](../asset-workflow/trim.md#%E8%87%AA%E5%B8%A6%E4%BD%8D%E7%BD%AE%E4%BF%A1%E6%81%AF%E7%9A%84%E5%BA%8F%E5%88%97%E5%B8%A7%E5%8A%A8%E7%94%BB)。

### 图片放大后，边缘白边/黑边问题。

这是由于线性过滤时，颜色通道和背景色做了插值，比较简单的办法是使用预乘。预乘需要将 Sprite 组件的混合模式设置成 `SRC: ONE, DST: ONE_MINUS_SRC_ALPHA`，然后对原图做处理。

原图有两种处理方式，一种在图片导出时，在颜色通道下面添加黑色背景，透明通道保持不变。另一种是在代码中对 texture 调用 `texture.update({premultiplyAlpha: true})`，如果调用失败，有可能是旧版 Creator，旧版需要改用 `texture.handleLoadedTexture(true)`。

### 如何用插件控制 Prefab？

**创建 Prefab**：

```js
Editor.Ipc.sendToPanel('scene', 'scene:create-prefab', node.uuid, 'db://assets/xxx/xxx.prefab');
```

**进入 Prefab 编辑模式**：

```js
Editor.Ipc.sendToAll('scene:enter-prefab-edit-mode', assetUuid);
```

**保存 Prefab**：

```js
Editor.Ipc.sendToPanel('scene', 'scene:apply-prefab', node.uuid);
```

### 1.8.2 的版本可能出现 JSC 崩溃问题。

请升级到 1.8.2 之后的版本。

### 微信开放数据加载头像时提示 wx.request 找不到。

加载图片时 url 若缺失 .png 之类的后缀，`cc.loader.load` 需要改成传入 `{ url: url, type: "png" }`。

具体内容可参考 [官方范例](https://github.com/cocos-creator/example-cases/tree/master/assets/cases/dragonbones) 中的 **dragonBones/DragonMesh** 测试例。

### 如何从服务器远程加载 DragonBones ？

#### 加载文本格式的 DragonBones 资源

```js
var animNode = new cc.Node();
animNode.parent = cc.find('Canvas');
var dragonDisplay = animNode.addComponent(dragonBones.ArmatureDisplay);

var image = 'http://localhost:7456/res/raw-assets/eee_tex-1529064342.png';
var ske = 'http://localhost:7456/res/raw-assets/eee_ske-1529065642.json';
var atlas = 'http://localhost:7456/res/raw-assets/eee_tex-1529065642.json';
cc.loader.load(image, (error, texture) => {
    cc.loader.load({ url: atlas, type: 'txt' }, (error, atlasJson) => {
        cc.loader.load({ url: ske, type: 'txt' }, (error, dragonBonesJson) => {
            var atlas = new dragonBones.DragonBonesAtlasAsset();
            atlas.atlasJson = atlasJson;
            atlas.texture = texture;

            var asset = new dragonBones.DragonBonesAsset();
            asset.dragonBonesJson = dragonBonesJson;

            dragonDisplay.dragonAtlasAsset = atlas;
            dragonDisplay.dragonAsset = asset;

            dragonDisplay.armatureName = 'box_anim';
            dragonDisplay.playAnimation('box_anim', 0);
        });
    });
});
```

#### 加载二进制格式的 DragonBones 资源

```js
var animNode = new cc.Node();
animNode.parent = cc.find('Canvas');
var dragonDisplay = animNode.addComponent(dragonBones.ArmatureDisplay);

var image = 'http://localhost:7456/res/raw-assets/eee_tex-1529064342.png';
var ske = 'http://localhost:7456/res/raw-assets/eee_ske-1529065642.dbbin';
var atlas = 'http://localhost:7456/res/raw-assets/eee_tex-1529065642.json';
cc.loader.load(image, (error, texture) => {
    cc.loader.load({ url: atlas, type: 'txt' }, (error, atlasJson) => {
        cc.loader.load({ url: ske, type: 'bin' }, (error, dragonBonesBin) => {
            var atlas = new dragonBones.DragonBonesAtlasAsset();
            atlas.atlasJson = atlasJson;
            atlas.texture = texture;

            var asset = new dragonBones.DragonBonesAsset();
            asset._nativeAsset = dragonBonesBin;

            dragonDisplay.dragonAtlasAsset = atlas;
            dragonDisplay.dragonAsset = asset;

            dragonDisplay.armatureName = 'box_anim';
            dragonDisplay.playAnimation('box_anim', 0);
        });
    });
});
```

### 如何从服务器远程加载 Spine

#### 加载文本格式的 Spine 资源

```js
var spineNode = new cc.Node();
var skeleton = spineNode.addComponent(sp.Skeleton);
this.node.addChild(spineNode);

var image = "http://localhost/download/spineres/1/1.png";
var ske = "http://localhost/download/spineres/1/1.json";
var atlas = "http://localhost/download/spineres/1/1.atlas";
cc.loader.load(image, (error, texture) => {
    cc.loader.load({ url: atlas, type: 'txt' }, (error, atlasJson) => {
        cc.loader.load({ url: ske, type: 'txt' }, (error, spineJson) => {
            var asset = new sp.SkeletonData();
            asset.skeletonJson = spineJson;
            asset.atlasText = atlasJson;
            asset.textures = [texture];
            asset.textureNames = ['1.png'];
            skeleton.skeletonData = asset;
        });
    });
});
```

#### 加载二进制格式的 Spine 资源

```js
var spineNode = new cc.Node();
var skeleton = spineNode.addComponent(sp.Skeleton);
this.node.addChild(spineNode);

var image = "http://localhost/download/spineres/1/1.png";
var ske = "http://localhost/download/spineres/1/1.skel";
var atlas = "http://localhost/download/spineres/1/1.atlas";
cc.loader.load(image, (error, texture) => {
    cc.loader.load({ url: atlas, type: 'txt' }, (error, atlasJson) => {
        cc.loader.load({ url: ske, type: 'bin' }, (error, spineBin) => {
            var asset = new sp.SkeletonData();
            asset._nativeAsset = spineBin;
            asset.atlasText = atlasJson;
            asset.textures = [texture];
            asset.textureNames = ['1.png'];
            skeleton.skeletonData = asset;
        });
    });
});
```

### 如何自定义或者直接禁用编辑器自带的 uglify？

自定义引擎完成后，打开 `engine/gulp/util/utils.js` 脚本，在最下面有一个 `uglify` 函数，可以根据需求自行修改其中的参数。如果想要完全跳过 `uglify` 操作，可以直接将 `uglify` 部分中的内容替换成：

```js
const Es = require('event-stream');
return Es.through();
```

### 如何在插件中创建 AssetDB 资源

在主进程中，使用 `Editor.assetdb.create(url, data, callback)`。第一个参数是 `db://assets/xxx.png`，第二个参数是 .png 文件读取出来的 buffer。

### 如何在插件中重新刷新 AssetDB 中的资源

`Editor.assetdb.refresh()` 提供了一个手动刷新资源库的方法。

### Creator 打包 APK 提交到 Google Play 失败，提示 API 等级最低 26？

Google Play 声明 2018 年 8 月开始，新提交的应用必须使用 api level 26 及以上版本编译。Android 构建时三个版本号的设置如下：

- compileSdkVersion 编译版本：编译 Java 代码时使用的 SDK 版本，和支持的最低版本无关。可以设置为 26/27/28。
- minSdkVersion：支持的最小版本，决定编译出的应用最小支持的 Android 版本。建议设置为 16（对应 Android 4.1）。
- targetSdkVersion：和运行时的行为有关，建议设置与 compileSdkVersion 一致，也可以设置为 22，避免 [运行时权限的问题](https://developer.android.com/training/permissions/requesting?hl=zh-cn)。

![](introduction/compile_version.png)

### 物理刚体的速度为什么会被限制

在引擎物理模块的底层实现脚本 box2d.js 中定义参数 b2_maxTranslation 限制刚体的最大速度变化率。可以直接找到引擎目录中的 box2d.js 修改该参数，之后参考 [引擎编译文档](https://docs.cocos.com/creator/manual/zh/advanced-topics/engine-customization.html#12-%E5%AE%89%E8%A3%85%E7%BC%96%E8%AF%91%E4%BE%9D%E8%B5%9619) 编译引擎即可。

### 场景加载报错：typeError: children[i]._onBatchCreated is not a function

这是因为记录场景的 json 文件中某个 _children 中的值变成了 null ，导致场景数据加载出现异常，把 null 改成其它能够正常读取的数值即可。

### VideoPlayer 播放视频显示黑屏

这个问题属于Html只支持H.264编码格式的MP4。
参考文章：
https://blog.csdn.net/keji_123/article/details/77717849
建议使用音视频格式转换工具输出 AVC(H264) 编码格式的 MP4 视频。

### 定制引擎报 JavaScript heap out of memory 内存不足解决方法

原因是：v8在编译的时候,对CPU和内存的需求比较大,当文件数量很多的时候,可能会出现内存不足的情况
目前有一个有效方案是最后build的时候这样输入：
gulp build --max-old-space-size=8192

### 项目打开之后只看见 CocosCreator 图标却看不见编辑器窗体

删除项目中 local 文件夹的 local.json ，之后重启项目即可。

### CocosCreator 默认的调试信息看不清

这个问题解决方案如下：
在引擎的 CCProfiler.js 脚本的 cc.profiler 对象中加入如下脚本

```
/**
* !#en Set the color of debug information text.
* !#zh 设置调试信息文本的颜色
* @method setFpsLabelColor
* @param {Boolean} setAll - Whether to set up left and right text uniformly.
* @example
* cc.profiler.setFpsLabelColor(true, { r: 255, g: 0, b: 0, a: 255 });
* cc.profiler.setFpsLabelColor(false, { r: 255, g: 0, b: 0, a: 255 }, { r: 0, g: 0, b: 0, a: 255 });
*/
setFpsLabelColor(setAll, fisColor, secColor) {
     if (!_rootNode && !_rootNode.isValid) return;

     if (typeof fisColor === "object" || typeof secColor === "object") {
        let leftNode = _rootNode.getChildByName("LEFT-PANEL");
        let rightNode = _rootNode.getChildByName("RIGHT-PANEL");
        if (leftNode && rightNode) {
           if (setAll) {
             leftNode.color = rightNode.color = new cc.Color(fisColor);
           }
           else {
             leftNode.color = new cc.Color(fisColor);
             rightNode.color = new cc.Color(secColor);
           }
        }
     }
}
```

之后 [编译引擎]((https://docs.cocos.com/creator/manual/zh/advanced-topics/engine-customization.html#12-%E5%AE%89%E8%A3%85%E7%BC%96%E8%AF%91%E4%BE%9D%E8%B5%9619) 即可项目中修改你的调试信息文本了。

### Widget组件改变的坐标值当前帧不刷新

```
widget.updateAlignment();
```
调一下这句代码，再打印。

### 多点触控监听，假设 AB 两点，按住 B 点，重复多次点击 A 点之后，抬起 B 点时不响应 ‘touchend’ 事件

当遇到此类问题时，可以直接修改引擎的全局枚举 cc.macro.TOUCH_TIMEOUT，引擎中的描述如下：
```
/**
    * !#en 
    * The timeout to determine whether a touch is no longer active and should be removed.
    * The reason to add this timeout is due to an issue in X5 browser core, 
    * when X5 is presented in wechat on Android, if a touch is glissed from the bottom up, and leave the page area,
    * no touch cancel event is triggered, and the touch will be considered active forever. 
    * After multiple times of this action, our maximum touches number will be reached and all new touches will be ignored.
    * So this new mechanism can remove the touch that should be inactive if it's not updated during the last 5000 milliseconds.
    * Though it might remove a real touch if it's just not moving for the last 5 seconds which is not easy with the sensibility of mobile touch screen.
    * You can modify this value to have a better behavior if you find it's not enough.
    * !#zh
    * 用于甄别一个触点对象是否已经失效并且可以被移除的延时时长
    * 添加这个时长的原因是 X5 内核在微信浏览器中出现的一个 bug。
    * 在这个环境下，如果用户将一个触点从底向上移出页面区域，将不会触发任何 touch cancel 或 touch end 事件，而这个触点会被永远当作停留在页面上的有效触点。
    * 重复这样操作几次之后，屏幕上的触点数量将达到我们的事件系统所支持的最高触点数量，之后所有的触摸事件都将被忽略。
    * 所以这个新的机制可以在触点在一定时间内没有任何更新的情况下视为失效触点并从事件系统中移除。
    * 当然，这也可能移除一个真实的触点，如果用户的触点真的在一定时间段内完全没有移动（这在当前手机屏幕的灵敏度下会很难）。
    * 你可以修改这个值来获得你需要的效果，默认值是 5000 毫秒。
    * @property {Number} TOUCH_TIMEOUT
    */
TOUCH_TIMEOUT: 5000,
```
你可以通过定制引擎或者在项目中添加插件脚本并对 cc.macro.TOUCH_TIMEOUT 赋值来解决这个问题。

### 2.1.1 动态修改material 贴图
材质贴图接收的是cc.Texture2D对象，所以我们可以自己添加在属性面板一个cc.Texture2D对象。
例如：
```
goldTexture: {
    default: null,
    type: cc.Texture2D
}
```
调用 spriteFrame.getTexture() 能够获取精灵的 texture 属性。
有了贴图，我们直接调用材质系统的api修改贴图：

```
this.material.setProperty("diffuseTexture", this.goldTexture);
```
setProperty这个接口是可以修改材质上几乎所有属性的。

测试demo：
https://github.com/Jno1995/DynamicLoadingMateria

### editor 输入框无法限制输入E或e字符

原因是 e 在数学中同样是具有数值的，所以判断他为 number 没有问题。
所以这不是引擎的问题。
这应该是 html5 开发过程中都会遇到的问题。
在 html5 中，我们可以修改 input 标签为如下:
```
<input type="text" name="" oninput="this.value=this.value.replace(/[^0-9.]+/,'');" />
```

Cocos Creator 中我们需要自己修改引擎代码，步骤如下：
找到引擎目录中的 WebEditBoxImpl.js ，定位到 onInput 函数定义，加入如下代码即可：
```
if (impl._delegate.inputMode === InputMode.NUMBERIC || impl._delegate.inputMode === INpitMode.PHONE_NUMBER) {
    this.value = this.value.replace(/[^0-9]/,'');
}
else if (impl._delegate.inputMode === InputMode.DECIMAL) {
    this.value = this.value.replace(/[^0-9]/,'');
}

之后 [编译引擎]((https://docs.cocos.com/creator/manual/zh/advanced-topics/engine-customization.html#12-%E5%AE%89%E8%A3%85%E7%BC%96%E8%AF%91%E4%BE%9D%E8%B5%9619) 重启项目即可。

### 取消定时器失败，定时器仍然运行

这个问题原因是this.unschedule(callback, target)是需要两个参数来指定需要暂停的定时器对象。
callBack 必须是与this.schedule中的回调一样，匿名函数不行。
target则是schedule的环境对象，这两个如有差异都不能正常停止schedule。
实现可以参考：
CCScheduler.js -> unschedule

### 打开 windows 版本 CocosCreator 编辑器失败，或者项目在 web 预览正常但是模拟器上无法正常预览

https://www.weidown.com/xiazai/733.html
下载这个DLL修复工具使用试试

### 远程加载图集的方法

参考 demo : https://github.com/Jno1995/load-remote-plist
