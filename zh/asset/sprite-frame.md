# 精灵帧资源（SpriteFrame）

Cocos Creator 3.0 的 SpriteFrame 是 UI 渲染基础图形的容器。其本身管理图像的裁剪和九宫格信息，默认持有一个与其同级的 Texture2D 资源引用。

## 导入精灵帧资源

使用默认的资源导入方式就可以将图像资源导入到项目中，将图像资源的类型选择为 **sprite-frame** 之后我们就可以在 **资源管理器** 中看到如下图所示的图像资源。

![imported texture](sprite-frame/imported_texture.png)

图像资源在 **资源管理器** 中会以自身图片的缩略图作为图标。在 **资源管理器** 中选中图像子资源后，**属性检查器** 下方会显示该图片的缩略图。

## 使用 SpriteFrame

### 容器内包含对象是贴图的使用方式

在编辑器中，拖拽 SpriteFrame 资源到 **Sprite** 组件的 `Sprite Frame` 属性栏中，来切换 Sprite 显示的图像。<br>
在运行时，以上图中的 content 图片为例，整个资源分为三部分：
- `content`（图像源资源 ImageAsset）
- `content` 的子资源 `spriteFrame`（精灵帧资源 SpriteFrame）
- `content` 的子资源 `texture`（贴图资源 Texture2D）。

在游戏包内（也就是已经放在 resources 目录下）的资源可以通过：

方法一（加载 SpriteFrame）：

```typescript
const url = 'test_assets/test_atlas/content/spriteFrame';
loader.loadRes(url, SpriteFrame, (err: any, spriteFrame) => {
  const sprite = this.getComponent(Sprite);
  sprite.spriteFrame = spriteFrame;
});
```

在服务器上的资源只能加载到图像源 ImageAsset，具体方法请参考 [资源加载](./load-assets.md)。

我们提供了 `createWithImage` 方法来帮助用户快捷的将 ImageAsset 或者原始图像资源 ImageSource 包装为 SpriteFrame：

方法二（加载 ImageAsset）：

```typescript
const self = this;
const url = 'test_assets/test_atlas/content';
loader.loadRes(url, ImageAsset,(err: any, imageAsset) => {
  const sprite = this.getComponent(Sprite);
  sprite.spriteFrame = SpriteFrame.createWithImage(imageAsset);
});
```

或者用户也可以手动填充信息，如下：

```typescript
const self = this;
const url = 'test_assets/test_atlas/content';
loader.loadRes(url, ImageAsset,(err: any, imageAsset) => {
  const sprite = this.getComponent(Sprite);
  const spriteFrame = new SpriteFrame();
  const tex = new Texture2D();
  tex.image = imageAsset;
  spriteFrame.texture = tex;
  sprite.spriteFrame = spriteFrame;
});
```

方法三（canvas 绘制内容 UI 上显示）（加载 ImageSource）：

```typescript
const sprite = this.getComponent(Sprite);
sprite.spriteFrame = SpriteFrame.createWithImage(canvas);
```

或者用户也可以手动填充信息，如下：

```typescript
const sprite = this.getComponent(Sprite);
const img = new ImageAsset(canvas);
const tex = new Texture2D();
tex.image = img;
const sp = new SpriteFrame();
sp.texture = tex;
sprite.spriteFrame = sp;
```

### 容器内包含对象是 RenderTexture 的使用方式

RenderTexture 是一个渲染纹理，它可以将摄像机上的内容直接渲染到一张纹理上而不是屏幕上。SpriteFrame 通过管理 RenderTexture 可以轻松的将 3D 相机内容显示在 UI 上。使用方法如下：

```typescript
const cameraComp = this.getComponent(Camera);
const renderTexture = new RenderTexture();
const size = view.getVisibleSize();
renderTexture.reset({
   width: size.width,
   height: size.height,
   colorFormat: RenderTexture.PixelFormat.RGBA8888,
   depthStencilFormat: RenderTexture.DepthStencilFormat.DEPTH_24_STENCIL_8
});

cameraComp.targetTexture = renderTexture;
const spriteFrame = new SpriteFrame();
spriteFrame.texture = renderTexture;
const sprite = this.getComponent(Sprite);
sprite.spriteFrame = spriteFrame;
```

<!-- API 接口文档如下：
* [SpriteFrame 资源类型](https://docs.cocos.com/creator/2.1/api/zh/classes/SpriteFrame.html) -->
