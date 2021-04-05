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

### 在安卓第三方 App 自带的 WebView 上触摸时，引擎报错

找到 `main.js` 中调用 `cc.view.enableAutoFullScreen` 的地方，将传入参数改为 `false`。

### 帧动画每帧的图片大小不一样的话，播放动画时会发生偏移

请参考：[自带位置信息的序列帧动画](../asset-workflow/trim.md#%E8%87%AA%E5%B8%A6%E4%BD%8D%E7%BD%AE%E4%BF%A1%E6%81%AF%E7%9A%84%E5%BA%8F%E5%88%97%E5%B8%A7%E5%8A%A8%E7%94%BB)。

### 图片放大后，边缘白边/黑边问题

这是由于线性过滤时，颜色通道和背景色做了插值，比较简单的办法是使用预乘。预乘需要将 Sprite 组件的混合模式设置成 `SRC: ONE, DST: ONE_MINUS_SRC_ALPHA`，然后对原图做处理。

原图有两种处理方式，一种在图片导出时，在颜色通道下面添加黑色背景，透明通道保持不变。另一种是在代码中对 texture 调用 `texture.update({premultiplyAlpha: true})`，如果调用失败，有可能是旧版 Creator，旧版需要改用 `texture.handleLoadedTexture(true)`。

### 如何用插件脚本创建 prefab ？

```js
Editor.Ipc.sendToPanel('scene', 'scene:create-prefab', node.uuid, 'db://assets/xxx/xxx.prefab');
```

### 1.8.2 的版本可能出现 JSC 崩溃问题

请升级到 1.8.2 之后的版本。

### 微信开放数据加载头像时提示 wx.request 找不到

加载图片时 url 若缺失 .png 之类的后缀，`cc.loader.load` 需要改成传入 `{ url: url, type: "png" }`。

### 如何从服务器远程加载 DragonBones ？

```js
let animNode = new cc.Node();
animNode.parent = cc.find('Canvas');
let dragonDisplay = animNode.addComponent(dragonBones.ArmatureDisplay);

let image = 'http://localhost:7456/res/raw-assets/eee_tex-1529064342.png';
let ske = 'http://localhost:7456/res/raw-assets/eee_ske-1529065642.json';
let atlas = 'http://localhost:7456/res/raw-assets/eee_tex-1529065642.json';
cc.loader.load(image, (error, texture) => {
    cc.loader.load({ url: atlas, type: 'txt' }, (error, atlasJson) => {
        cc.loader.load({ url: ske, type: 'txt' }, (error, dragonBonesJson) => {
            let atlas = new dragonBones.DragonBonesAtlasAsset();
            atlas.atlasJson = atlasJson;
            atlas.texture = texture;

            let asset = new dragonBones.DragonBonesAsset();
            asset.dragonBonesJson = dragonBonesJson;

            dragonDisplay.dragonAtlasAsset = atlas;
            dragonDisplay.dragonAsset = asset;

            dragonDisplay.armatureName = 'box_anim';
            dragonDisplay.playAnimation('box_anim', 0);
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
