# 压缩纹理

Cocos Creator 可以直接在编辑器中设置纹理需要的压缩方式，然后在项目发布时自动对纹理进行压缩。针对 Web 平台，支持同时导出多种图片格式，引擎将根据不同的浏览器自动下载合适的格式。

## 配置压缩纹理

Cocos Creator 支持导入多种格式的图片（具体见下表），但是在实际游戏运行中，我们不建议使用原始图片作为资源来加载。比如在手机平台上可能只需要原图 80% 或者更少的画质，又或者是没有使用到透明通道的 `.png` 可以将其转换成 `.jpg`，这样可以减少很大一部分图片的存储空间。

在 Cocos Creator v2.4 之前，配置压缩纹理只支持 **Android**、**iOS**、**Web** 和 **微信小游戏** 平台，而从 v2.4 开始，支持所有的小游戏平台。

| 图片格式 | Android | iOS | Mini Game | Web |
| :----------- | :------------ | :-------- | :------- | :------- |
| PNG | 支持 | 支持 | 支持 | 支持 |
| JPG | 支持 | 支持 | 支持 | 支持 |
| WEBP | Android 4.0 以上原生支持<br>其他版本可以使用 [解析库](https://github.com/alexey-pelykh/webp-android-backport) | 可以使用 [解析库](https://github.com/carsonmcdonald/WebP-iOS-example) | 不支持 | [部分支持](https://caniuse.com/#feat=webp) |
| PVR | 不支持 | 支持 | 支持 iOS 设备 | 支持 iOS 设备 |
| ETC1 | 支持 | 不支持 | 支持 Android 设备 | 支持 Android 设备 |
| ETC2 | 只支持生成资源，引擎部分需要参考 PR [#1685](https://github.com/cocos/engine-native/pull/1685) 自己实现。 | 只支持生成资源，引擎部分需要参考 PR [#1685](https://github.com/cocos/engine-native/pull/1685) 自己实现。 | - | - |
| ASTC | 部分支持  | 部分支持 | 不支持（iOS 版微信小游戏 v8.0.3 以上支持） | 部分支持 |

默认情况下 Cocos Creator 在构建的时候输出的是原始图片，如果在构建时需要对某一张图片进行压缩，可以在 **资源管理器** 中选中这张图片，然后在 **属性管理器** 中对图片的纹理格式进行编辑。

![compress-texture](compress-texture/compress-texture.png)

## 压缩纹理详解

Cocos Creator 在构建图片的时候，会查找当前图片是否在某平台配置了压缩纹理：

- 如果没有，则继续查找是否做了默认（Default）的配置（如上图），如果没有，则最后按原图输出。
- 如果查找到了压缩纹理的配置，那么会按照找到的配置对图片进行纹理压缩。在一个平台中可以指定多种纹理格式，每种纹理格式在构建时都会根据原图压缩生成一张指定格式的图片。

在运行时，这些生成的图片不会被全部加载，引擎会根据实际设备的支持情况，来选择加载合适格式的图片。[cc.macro.SUPPORT_TEXTURE_FORMATS](%__APIDOC__%/zh/classes/macro.html#supporttextureformats) 列举了目前支持的所有图片格式，引擎加载图片时会从生成的图片中找到在这个列表中 **优先级靠前**（即排列靠前）的格式来加载。

用户可以通过修改 `cc.macro.SUPPORT_TEXTURE_FORMATS` 来自定义平台的图片资源支持情况以及加载顺序的优先级。

> **注意**：模拟器可能不支持压缩纹理，请以真机为准。

## 示例

![1](compress-texture/1.png)
![2](compress-texture/2.png)

在上面的示例图中，默认平台配置了 png 格式的压缩纹理，Web 平台配置了 pvr、png 格式的压缩纹理，而其他平台没有添加任何配置。那么在构建 Web 平台的时候这张图片就会被压缩成 pvr 和 png 两种格式，在构建其他平台的时候则只会生成 png 格式的图片。

而在 Web 平台上，只有 iOS 设备才支持加载 pvr 格式。所以只有在 iOS 设备的浏览器上才会加载 pvr 格式的图片，其他设备上的浏览器则加载 png 格式的图片。

## Separate Alpha

ETC1 和 PVR 格式都会用一个固定的空间来存储每个像素的颜色值。当需要存储 RGBA 4 个通道时，图片的显示质量可能会变得非常低。所以提供了一个 Separate Alpha 选项，该选项会将贴图的 Alpha 通道提取出来合并到贴图下方，然后整张贴图按照 RGB 3 个通道的格式来压缩。这样子每个通道的存储空间都得到了提升，贴图的质量也就提升了。

![](compress-texture/separate_alpha.png)
