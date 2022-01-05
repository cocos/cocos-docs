# 压缩纹理

Cocos Creator 可以直接在编辑器中设置纹理需要的压缩方式，然后在项目发布时自动对纹理进行压缩。支持同一平台同时导出多种图片格式，引擎将根据不同的设备支持情况自动下载合适的格式。

## 配置压缩纹理

Cocos Creator 支持导入多种格式的图片（具体见下表），但是在实际游戏运行中，我们不建议使用原始图片作为资源来加载。比如在手机平台上可能只需要原图 80% 或者更少的画质，又或者是没有使用到透明通道的 `.png` 可以将其转换成 `.jpg`，这样可以减少很大一部分图片的存储空间。

| 图片格式 | Android | iOS | Mini Game | Web  |
| :------ | :------ | :------ | :----- | :------ |
| PNG | 支持 | 支持   | 支持 | 支持 |
| JPG | 支持 | 支持 | 支持 | 支持 |
| WEBP | Android 4.0 以上原生支持，其他版本可以使用 [解析库](https://github.com/alexey-pelykh/webp-android-backport) | 可以使用 [解析库](https://github.com/carsonmcdonald/WebP-iOS-example) | 支持 | [部分支持](https://caniuse.com/#feat=webp) |
| PVR | 不支持 | 支持 | 支持 iOS 设备 | 支持 iOS 设备 |
| ETC1 | 支持 | 不支持 | 支持 Android 设备 | 支持 Android 设备 |
| ETC2 | 部分支持，取决于手机硬件 | 不支持 | 不支持 | 支持部分 Android 设备 |
| ASTC | 部分支持  | 部分支持 | 不支持 | 部分支持 |
<!-- | 图片格式 | Android | iOS | Mini Game | Web  | Mac & Windows |
| :------ | :------ | :------ | :----- | :------ | :------ |
| PNG | 支持 | 支持   | 支持 | 支持 | 支持 |
| JPG | 支持 | 支持 | 支持 | 支持 | 支持 |
| WEBP | Android 4.0 以上原生支持，其他版本可以使用 [解析库](https://github.com/alexey-pelykh/webp-android-backport) | 可以使用 [解析库](https://github.com/carsonmcdonald/WebP-iOS-example) | 支持 | [部分支持](https://caniuse.com/#feat=webp) | 不支持 |
| PVR | 不支持 | 支持 | 支持 iOS 设备 | 支持 iOS 设备 | Mac 支持 |
| ETC1 | 支持 | 不支持 | 支持 Android 设备 | 支持 Android 设备 | 不支持 |
| ETC2 | 部分支持，取决于手机硬件 | 不支持 | 不支持 | 支持部分 Android 设备 | 不支持 |
| ASTC | 部分支持  | 部分支持 | 不支持 | 部分支持  | Mac 支持 | -->

默认情况下 Creator 在构建的时候输出的是原始图片，如果在构建时需要对某一张图片或者自动图集进行压缩，可以在 **资源管理器** 中选中这张图片或图集，然后在 **属性检查器** 中勾选 `useCompressTexture`，再选择图片的纹理压缩格式预设即可。

![compress-texture](compress-texture/compress-texture.png)

编辑器将会默认提供一个默认预设，如果需要添加更多预设可以点击旁边的 **编辑预设** 按钮打开 **项目设置 -> 压缩纹理** 来添加编辑预设，这里的压缩格式仅作为展示使用不可编辑。关于添加纹理压缩预设，请参考 [项目设置 - 压缩纹理](../editor/project/index.md)。

![meta](compress-texture/meta.png)

图片资源上的压缩纹理选项将会存储在资源 meta 文件内，其中 `presetId` 是选择的压缩纹理预设的 ID。

## 压缩纹理详解

如果想要使用压缩纹理，在构建项目的时候需要打开压缩纹理选项使项目使用压缩纹理功能：

![compress-texture-build](compress-texture/compress-build.png)

Cocos Creator 3.0 在构建图片的时候，会查找当前图片是否进行了压缩纹理的配置，如果没有，则最后按原图输出。

如果查找到了压缩纹理的配置，那么会按照找到的配置对图片进行纹理压缩。项目设置里压缩纹理配置是按照平台大类划分的，具体到实际平台的支持程度会有一些差异。构建将会根据 **实际构建平台** 以及当前 **图片纹理的透明通道** 情况来对配置的纹理格式做一定的剔除和优先级选择，关于这块规则可以参考下文的示例来理解。

这些生成的图片不会都被加载到引擎中，引擎会根据 `macro.SUPPORT_TEXTURE_FORMATS` 中的配置来选择加载合适格式的图片。`macro.SUPPORT_TEXTURE_FORMATS` 列举了引擎支持的所有图片格式，支持的格式可能在不同的平台和设备类型上有所差别。目前所有平台和设备支持的格式有 `.webp`、`.jpg`、 `.jpeg`、 `.bmp` 和 `.png`。在 iOS 平台上还支持 `PVR` 格式。

## 使用示例

![1](compress-texture/compress-1.png)

**示例 (一)**：如上图所示，对于 MiniGame 平台的压缩纹理预设，假如 **构建的是华为快游戏这类仅在安卓设备上运行的，构建将不会打包出 PVR 的纹理格式**。更多的平台剔除细则可以参考文末的 [构建平台的压缩纹理支持情况](##构建平台的压缩纹理支持情况)

![2](compress-texture/compress-2.png)

**示例 (二)**：在上面的示例图中，ETC1 和 PVR 类型都 **同时配置了 RGB 和 RGBA 两种类型的纹理格式，这种情况下构建将会根据当前图片的是否带有透明通道来优先选择其中一种格式**。示例图中的图片是带透明通道的，则此时构建将只会打包出带有 REGA 类型的压缩纹理格式。当然这种剔除只有同时存在时才会，假如配置里只有 RGB 的图片格式，即便当前图片是带透明通道的也会正常打包出来。

## 构建平台的压缩纹理支持细节

除全平台支持的 `JPG` 和 `PNG` 外，其他纹理压缩格式的支持情况如下：

| 平台名称          | 支持的压缩格式 |
| :---------------- | :------------------- |
| Web Desktop       | ASTC / ETC2 / ETC1 / PVR / WEBP |
| Web Mobile        | ASTC / ETC2 / ETC1 / PVR / WEBP |
| WeChat Mini Game  | ETC1 / PVR           |
| AliPay Mini Game  | ETC1 / PVR           |
| Baidu Mini Game   | ETC1 / PVR           |
| OPPO Mini Game    | ETC1                 |
| vivo Mini Game    | ETC1                 |
| Huawei Quick Game | ETC1                 |
| Cocos Play        | ETC1                 |
| Xiaomi Quick Game | ETC1                 |
| iOS               | ASTC / PVR / WEBP / ETC1 / ETC2  |
| Android           | ASTC / ETC2 / ETC1 / WEBP |
<!-- | Mac               | ASTC / PVR           | -->
