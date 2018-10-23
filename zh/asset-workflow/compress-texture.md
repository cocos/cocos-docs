# 压缩纹理

Cocos Creator 支持导入多种格式的图片（具体见下表），但是在实际游戏运行中，我们可能不会希望使用原始图片作为资源来加载。比如在手机平台上可能只需要原图 80% 或更少的画质，又或者是没有透明通道的图片可以转成 JPG 格式，这样可以减少很大一部分图片的存储空间。

图片格式 | android | ios | 微信小游戏 | web
------------ | ------------- | --------- | -------- | --------
png | 支持 | 支持 | 支持 | 支持
jpg | 支持 | 支持 | 支持 | 支持
webp | Android4.0 以上原生支持，其他版本可以使用[解析库](https://github.com/alexey-pelykh/webp-android-backport) | 可以使用[解析库](https://github.com/carsonmcdonald/WebP-iOS-example) | 不支持 | [部分支持](https://caniuse.com/#feat=webp)
pvr | ios 设备上支持


默认情况下 Cocos Creator 在构建的时候是输出原始图片的，如果在构建时希望对某一张图片进行压缩，可以在资源管理器中选中这张图片，然后在属性管理器中对纹理格式进行编辑。

![compress-texture](compress-texture/compress-texture.png)

Cocos Creator 会在构建图片的时候查找当前图片是否进行了压缩纹理的配置，如果没有则继续查找是否做了默认（Default）的配置，如果没有则最后按原图输出，

如果查找到了压缩纹理的配置，那么会按找到的配置进行纹理压缩，在一个平台中你可以指定多种纹理格式，每种纹理格式在构建时都会根据原图压缩生成一张指定格式的图片。

这些生成的图片不会都被加载到引擎，引擎会根据 [cc.macro.SUPPORT_TEXTURE_FORMATS](http://docs.cocos.com/creator/api/zh/classes/macro.html#supporttextureformats) 中的配置来选择合适的格式进行加载。`cc.macro.SUPPORT_TEXTURE_FORMATS` 列举了当前平台支持的所有图片格式，引擎加载图片时会从生成的图片中找到在这个列表中`优先级靠前`（即排列靠前）的格式来加载。

你可以修改 `cc.macro.SUPPORT_TEXTURE_FORMATS` 来自定义平台的图片资源支持情况以及加载顺序的优先级。


## 示例

![1](compress-texture/1.png)
![2](compress-texture/2.png)

在上面的示例中，这张图片在默认平台中添加了 png 格式的配置，在 web 平台中添加了 pvr，png 格式的配置，其他平台都没有添加配置。

那么在构建 web 平台的时候这张图片会被压缩成 pvr，png 两种格式，在构建其他平台的时候则只会生成 png 格式的图片。

因为默认设置的 `cc.macro.SUPPORT_TEXTURE_FORMATS` 中只有 ios 平台上才添加了 pvr 的支持，所以只有在 ios 上的浏览器上才会加载 pvr 格式的图片，其他平台上的浏览器则会加载 png 格式的图片。
