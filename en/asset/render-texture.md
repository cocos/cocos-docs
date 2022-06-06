# RenderTexture

A __rendered texture__ is a texture on the __GPU__. Usually, we set it to the camera's __target texture__, so that the content illuminated by the camera is drawn to the texture through the frambuffer off the screen.

## Using RenderTexture

```typescript
// Method 1: Draw the content illuminated by the 3D camera
// onto the UI sprite frame
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

        const renderTex = this._renderTex = new RenderTexture();
        renderTex.reset({
            width: 256,
            height: 256,
            colorFormat: RenderTexture.PixelFormat.RGBA8888,
            depthStencilFormat: RenderTexture.DepthStencilFormat.DEPTH_24_STENCIL_8
        });
        this.camera.targetTexture = renderTex;
        sp.texture = renderTex;
        this.sprite.spriteFrame = sp;
    }
}

// Method 2: Draw the content illuminated by the 3D camera onto the 3D model
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

For more __Render Texture__ examples, please see these [test cases](https://github.com/cocos/cocos-test-projects/tree/v3.0/assets/cases/rendertexture).
