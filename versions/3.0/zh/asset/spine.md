# 骨骼动画资源（Spine）

Creator 中的骨骼动画资源是由 [Spine 编辑器](http://zh.esotericsoftware.com/) 导出的，目前支持 [JSON](http://zh.esotericsoftware.com/spine-export/#JSON) 和 [二进制](http://zh.esotericsoftware.com/spine-export/#%E4%BA%8C%E8%BF%9B%E5%88%B6) 两种数据格式。

各 Creator 版本对应支持的 Spine 版本如下所示：

| Creator 版本  | Spine 版本 |
| :----------  | :-------- |
| v3.0 及以上   | v3.8（原生平台不支持特定版本 v3.8.75）|
| v2.3 及以上   | v3.8 |
| v2.2         | v3.7 |
| v2.0.8～v2.1 | v3.6 |
| v2.0.7 及以下 | v2.5 |

## 导入骨骼动画资源

骨骼动画所需资源有：

- `.json/.skel` 骨骼数据
- `.png` 图集纹理
- `.txt/.atlas` 图集数据

  ![spine](spine/import.png)

## 创建骨骼动画

从 **资源管理器** 中将骨骼动画资源拖动到 **属性检查器** Spine 组件的 SkeletonData 属性中：

![spine](spine/set_skeleton.png)

## 从服务器远程加载 Spine

### 加载文本格式的 Spine 资源

```ts
let comp = this.getComponent('sp.Skeleton') as sp.Skeleton;

let image = "http://localhost/download/spineres/1/1.png";
let ske = "http://localhost/download/spineres/1/1.json";
let atlas = "http://localhost/download/spineres/1/1.atlas";
assetManager.loadAny([{ url: atlas, ext: '.txt' }, { url: ske, ext: '.txt' }], (error, assets) => {
    assetManager.loadRemote(image, (error, img: ImageAsset) => {
        let texture = new Texture2D();
        texture.image = img;
        asset.skeletonJson = assets[1];
        asset.atlasText = assets[0];
        asset.textures = [texture];
        asset.textureNames = ['1.png'];
        skeleton.skeletonData = asset;
    });
});
```

### 加载二进制格式的 Spine 资源

```ts
let comp = this.getComponent('sp.Skeleton') as sp.Skeleton;

let image = "http://localhost/download/spineres/1/1.png";
let ske = "http://localhost/download/spineres/1/1.skel";
let atlas = "http://localhost/download/spineres/1/1.atlas";
assetManager.loadAny([{ url: atlas, ext: '.txt' }, { url: ske, ext: '.bin' }], (error, assets) => {
    assetManager.loadRemote(image, (error, texture: Texture2D) => {
        let asset = new sp.SkeletonData();
        asset._nativeAsset = assets[1];
        asset.atlasText = assets[0];
        asset.textures = [texture];
        asset.textureNames = ['1.png'];
        asset._uuid = ske; // 可以传入任意字符串，但不能为空
        asset._nativeURL = ske; // 传入一个二进制路径用作 initSkeleton 时的 filePath 参数使用
        comp.skeletonData = asset;
        let ani = comp.setAnimation(0, 'walk', true);
    });
});
```
