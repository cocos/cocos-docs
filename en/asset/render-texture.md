# Render Texture

A __render texture__ is a texture on the __GPU__. Usually, we set it to the camera's __target texture__, so that the content illuminated by the camera is drawn to the texture via the `frambuffer` off the screen. Typically can be used to create car mirrors, implement dynamic shadows, etc.

## Creating a RenderTexture

Click the __+__ button in the top left of the __Assets__ panel and select __RenderTexture__ to create a Render Texture:

![add-render-texture](render-texture/add-render-texture.png)

The properties associated with the render texture asset can then be set in the __Inspector__ panel.

![render-texture-property](render-texture/render-texture-property.png)

| Property | Description |
| :--- | :--- |
| __Width__  | Set the width of the render texture.  |
| __Height__ | Set the height of the render texture. |
| __Anisotropy__ | Anisotropy value. |
| __Min Filter__ | Narrowing filtering algorithm.     |
| __Mag Filter__ | Amplification filtering algorithm. |
| __Mip Filter__ | Multi-level texture filtering algorithm. |
| __Wrap Mode S__ | S(U) direction texture addressing mode. |
| __Wrap Mode T__ | T(V) direction texture addressing mode. |

## Use RenderTexture in editor

In the camera component, assigning RenderTexture to the camera's __TargetTexture__ property will draw the result of the camera's illumination onto the RenderTexture.

![camera](render-texture/camera.png)

### Use RenderTexture in 2D / UI

RenderTexture can be used like a normal texture. Take __Sprite Component__ as an example, drag and drop from __Assets__ panel onto the __SpriteFrame__ property on Sprite's __Inspector__ panel.

![sprite rt](render-texture/sprite-rt.png)

## Use RenderTexture in material

To use RenderTexture in material includes the following two steps:

1. Handle uv in __effect__ asset. Determine `SAMPLE_FROM_RT`, and call the `CC_HANDLE_RT_SAMPLE_FLIP` function:

   ```
    #if USE_TEXTURE
        v_uv = a_texCoord * tilingOffset.xy + tilingOffset.zw;
        #if SAMPLE_FROM_RT
            CC_HANDLE_RT_SAMPLE_FLIP(v_uv);
        #endif
    #endif
    ```

2. Select the corresponding material in the __Assets__ panel, then check `SAMPLE FROM RT` in the __Inspector__ panel:

    ![SAMPLE_FROM_RT](render-texture/SampleFormRT.png)

## RenderTexture program guide

There are two ways to use RenderTexture programmatically:

- __Method 1__: Draw the contents illuminated by the 3D camera to the sprite frame of the UI.

    ```typescript
    import { _decorator, Component, RenderTexture, SpriteFrame, Sprite, Camera } from 'cc';
    const { ccclass, property } = _decorator;

    @ccclass('CaptureToWeb')
    export class CaptureToWeb extends Component {
        @property(Sprite)
        sprite: Sprite = null;
        @property(Camera)
        camera: Camera = null;

        protected _renderTex: RenderTexture = null;

        start() {
            const sp = new SpriteFrame();
            const renderTex = this._renderTex = new RenderTexture();
            renderTex.reset({
                width: 256,
                height: 256,
            });
            this.camera.targetTexture = renderTex;
            sp.texture = renderTex;
            this.sprite.spriteFrame = sp;
        }
    }
    ```

- __Method 2__: Draw the contents illuminated by the 3D camera to the 3D model.

   ```typescript
    import { _decorator, Component, MeshRenderer, RenderTexture, Camera, Material } from 'cc';
    const { ccclass, property, requireComponent } = _decorator;

    @ccclass("RenderCameraToModel")
    @requireComponent(Camera)
    export class RenderCameraToModel extends Component {
        @property(MeshRenderer)
        model: MeshRenderer = null;

        start() {            
            const renderTex = new RenderTexture();
            renderTex.reset({
                width: 256,
                height: 256,
            });
            const cameraComp = this.getComponent(Camera);
            cameraComp.targetTexture = renderTex;
            const pass = this.model.material.passes[0];
            // Set the 'SAMPLE_FROM_RT' macro to 'true' so that RenderTexture can be displayed correctly on each platform
            const defines = { SAMPLE_FROM_RT: true, ...pass.defines };
            const renderMat = new Material();
            renderMat.initialize({
                effectAsset: this.model.material.effectAsset,
                defines,
            });
            this.model.setMaterial(renderMat, 0);
            renderMat.setProperty('mainTexture', renderTex, 0);
        }
    }
    ```

    Make sure that the shader has a `mainTexture` property and is enabled in the material if you want to display the drawing results correctly. For example, if using the `builtin-standard` shader, make sure the __USE ALBEDO MAP__ option is checked:

    ![use albedo](render-texture/use-albedo.png)

For more information about the usage, please refer to the example [RenderTexture](https://github.com/cocos-creator/test-cases-3d/tree/v3.4/assets/cases/rendertexture).
