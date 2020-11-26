# 渲染纹理资源（RenderTexture）

渲染纹理是一张在 GPU 上的纹理。通常我们会把它设置到相机的 **目标纹理** 上，使相机照射的内容通过离屏的 `frambuffer` 绘制到该纹理上。一般可用于制作汽车后视镜，动态阴影等功能。

## 使用 RenderTexture

```typescript
// 方法一：把 3D 相机照射的内容绘制到 UI 的精灵帧上
export class CaptureToWeb extends Component {
    @property(Sprite)
    sprite: Sprite = null;
    @property(Camera)
    camera: Camera = null;

    protected _renderTex: RenderTexture = null;

    start () {
        const spriteframe = this.sprite.spriteFrame;
        const sp = new SpriteFrame();
        sp.reset({
            originalSize: spriteframe.getOriginalSize(),
            rect: spriteframe.getRect(),
            offset: spriteframe.getOffset(),
            isRotate: spriteframe.isRotated(),
            borderTop: spriteframe.insetTop,
            borderLeft: spriteframe.insetLeft,
            borderBottom: spriteframe.insetBottom,
            borderRight: spriteframe.insetRight,
        });

        const rendetTex = this._renderTex = new RenderTexture();
        rendetTex.reset({
            width: 256,
            height: 256,
            colorFormat: RenderTexture.PixelFormat.RGBA8888,
            depthStencilFormat: RenderTexture.DepthStencilFormat.DEPTH_24_STENCIL_8
        });
        this.camera.targetTexture = rendetTex;
        sp.texture = rendetTex;
        this.sprite.spriteFrame = sp;
    }
}

// 方法二：把 3D 相机照射的内容绘制到 3D 模型上
export class RenderCameraToModel extends Component {
    @property(MeshRenderer)
    model: MeshRenderer = null;

    start () {
        // Your initialization goes here.
        const renderTex = new RenderTexture();
        renderTex.reset({
            width: 256,
            height: 256,
            colorFormat: RenderTexture.PixelFormat.RGBA8888,
            depthStencilFormat: RenderTexture.DepthStencilFormat.DEPTH_24_STENCIL_8,
        });
        const cameraComp = this.getComponent(Camera);
        cameraComp.targetTexture = renderTex;
        const pass = this.model.material.passes[0];
        const binding = pass.getBinding('mainTexture');
        pass.bindTextureView(binding, renderTex.getGFXTextureView());
    }
}
```

更多方法请参考：[test-case-3d](https://github.com/cocos-creator/test-cases-3d/tree/master/assets/cases/rendertexture)
