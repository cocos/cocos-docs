# 渲染纹理资源（RenderTexture）

渲染纹理是一张在 GPU 上的纹理。通常我们会把它设置到相机的 **目标纹理** 上，使相机照射的内容通过离屏的 `frambuffer` 绘制到该纹理上。一般可用于制作汽车后视镜，动态阴影等功能。

## 创建 RenderTexture

在 **资源管理器** 中点击左上方的 **+** 按钮，选择 **渲染纹理**，即可创建渲染纹理资源：

![add-render-texture](render-texture/add-render-texture.png)

然后在 **属性检查器** 中便可以设置渲染纹理资源的相关属性：

![render-texture-property](render-texture/render-texture-property.png)

| 属性 | 说明 |
| :--- | :--- |
| **Width** | 设置渲染纹理的宽 |
| **Height** | 设置渲染纹理的高 |

## 使用 RenderTexture

使用 RenderTexture 有以下两种方法：

- **方法一**：把 3D 相机照射的内容绘制到 UI 的精灵帧上

    ```typescript
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
            // 需要手动调用该函数，使 RenderTexture 能在各平台正确显示
            this.sprite.updateMaterial();
        }
    }
    ```

- **方法二**：把 3D 相机照射的内容绘制到 3D 模型上

    ```typescript
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
            // 设置 'SAMPLE_FROM_RT' 宏为 'true' 的目的是为了使 RenderTexture 在各个平台能正确显示
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

## 设置 RenderTexture 为材质贴图

将 RenderTexture 设置为材质贴图包括以下两个步骤：

1. 在 effect 中处理 uv。判断 `SAMPLE_FROM_RT`，并调用 `CC_HANDLE_RT_SAMPLE_FLIP` 函数：

    ```
    #if USE_TEXTURE
        v_uv = a_texCoord * tilingOffset.xy + tilingOffset.zw;
        #if SAMPLE_FROM_RT
            CC_HANDLE_RT_SAMPLE_FLIP(v_uv);
        #endif
    #endif
    ```

2. 在 **层级管理器** 中选中对应的材质，然后在 **属性检查器** 中勾选 `SAMPLE FROM RT`

    ![SAMPLE_FROM_RT](render-texture/SampleFormRT.png)

更多使用方法可参考范例 **RenderTexture**（[GitHub](https://github.com/cocos-creator/test-cases-3d/tree/v3.1/assets/cases/rendertexture) | [Gitee](https://gitee.com/mirrors_cocos-creator/test-cases-3d/tree/v3.1/assets/cases/rendertexture)）。
