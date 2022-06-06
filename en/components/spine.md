# Spine Component Reference

The Spine component supports the data formats exported by Spine, and renders and plays Spine resources.

![spine](./spine/spine-properties.png)

Click the **Add Component** at the bottom of **Properties** and select **Spine Skeleton** from **Renderer Component** in order to add the **Spine** component to the node.

About the Spine's scripting interface please refer to [Skeleton API](../../../api/en/classes/Skeleton.html)

## Spine Properties

| property |   Function explanation
| --------------------- | ------------------ |
| Skeleton Data         | The skeleton data contains the skeleton information, drag the bone resources exported from Spine into this property.
| Default Skin          | Choose the default skin texture
| Animation             | The name of current playing animation
| Animation Cache Mode  | Render mode, default is `REALTIME` mode. (new in v2.0.9)<br>1. **REALTIME** model, realtime calculate, support all functions of Spine.<br>2. **SHARED_CACHE** mode, caching and sharing animation data, the equivalent of pre baked skeletal animation, have high performance, does not support the action blend and superposition, only supports the start and end events, as for memory, when creating some same bones and the same action of animation, can present advantages of memory, the greater the amount of skeleton, the more obvious advantages, in conclusion `SHARED_CACHE` mode is suitable for the scene animation, special effects, monster, NPC and so on, can greatly increase the frame rate and reduce memory.<br>3. **PRIVATE_CACHE** mode, similar to `SHARED_CACHE`, but does not share animation and texture data, and will occupy extra memory, there is only a performance advantage, and it may cause stutter if using this mode a lot to play animation. When trying to take advantage of caching pattern of high performance, but there is a change of texture, so you can't share the map data, then `PRIVATE_CACHE` is suitable for you.
| Loop                  | Whether loop current animation
| Premultiplied Alpha   | Indicates whether to enable premultiplied alpha, default is True.<br>You should disable this option when image's transparent area appears to have opaque pixels, or enable this option when image's half transparent area appears to be darken.
| Time Scale            | The time scale of animation of this skeleton
| Debug Slots           | Indicates whether show debug slots
| Debug Bones           | Indicates whether show debug bones
| Debug Mesh            | Indicates whether show debug mesh
| Use Tint              | Indicates whether open tint, default is close. (New in v2.0.9)
| Enable Batch          | Whether to enable animation batch, default is disabled. (New in v2.0.9)<br>When enable, drawcall will reduce, which is suitable for a large number of simple animations to play at the same time.<br>When disabled, drawcall will rise, but it can reduce the computational burden of the CPU. Suitable for complex animations.

> **Note**: when using the Spine component, the `Anchor` and `Size` properties on the Node component in the **Properties** panel are invalid.

## Spine ReplaceTexture

Here is an example of how Spine replace the textures. By change the attachment object of the slot and replace the arm in the green box below with the arm in the red box.

![spine-cloth](./spine/cloth0.png)

1. Create a new empty node in **Node Tree** and rename it as `goblingirl`, then add the Spine component in **Properties**. And drag the resources of spine into the Skeleton Data property box of the Spine component, set the skin in the red box to replace in the Default Skin property. You can change the Animation property of the Spine component to set the animation that you want to play.

    ![spine-cloth](./spine/cloth1.png)

2. Create an empty node again and rename it as goblin, then add the Spine component in **Properties** and drag the resources of spine into the Skeleton Data property box of the Spine component, set the skin you want to replace in the green box in the Default Skin property.

    ![spine-cloth](./spine/cloth2.png)

3. Create a new JavaScript script in **Assets** and double-click to open to write. The sample script code is as follows:

    ```js
    cc.Class({
        extends: cc.Component,

        properties: {
            goblin: {
                type: sp.Skeleton,
                default: null,
            },
            goblingirl: {
                type: sp.Skeleton,
                default: null,
            }
        },

        start () {
            let parts = ["left-arm", "left-hand", "left-shoulder"];
            for (let i = 0; i < parts.length; i++) {
                let goblin = this.goblin.findSlot(parts[i]);
                let goblingirl = this.goblingirl.findSlot(parts[i]);
                let attachment = goblingirl.getAttachment();
                goblin.setAttachment(attachment);
            }
        }
    });
    ```

4. Mount the script component onto the Canvas or other node, it means dragging and dropping the script into the **Properties** of the node. Then drag the `goblingirl` node and goblin node in **Node Tree** to the corresponding property box of script component, and save the Scene.

    ![spine-cloth](./spine/spine-js.png)

5. Click the preview button at the top of the editor, we can see that the arm on the green box has been replaced.

    ![spine-cloth](./spine/cloth3.png)

## Vertex Effect

Vertex effect is only valid when the Animation Cache Mode property of Spine component is in REALTIME mode. Next we use an example to show how to set the vertex effect of Spine.

1. Create a new empty node in **Node Tree** and rename, then add the Spine component in **Properties**. And drag the resources of spine into the Skeleton Data property box of the Spine component, set the Spine component properties.

2. Create a new JavaScript script in **Assets** and double-click to open to write. The sample script code is as follows:

    ```js
    cc.Class({
        extends: cc.Component,

        properties: {
            skeleton : {
                type: sp.Skeleton,
                default: null,
            }
        },

        start () {
            this._jitterEffect = new sp.VertexEffectDelegate();
            // 设置好抖动参数。
            this._jitterEffect.initJitter(20, 20);
            // 调用 Spine 组件的 setVertexEffectDelegate 方法设置效果。
            this.skeleton.setVertexEffectDelegate(this._jitterEffect);
        }
    });
    ```

3. Mount the script component onto the Canvas or other node, it means dragging and dropping the script into the **Properties** of the node. Then drag the node in **Node Tree** to the corresponding property box of script component, and save the Scene.

4. You can see the vertex jitter effect of the Spine animation by clicking the preview button above the editor. For the code, please refer to [SpineMesh](https://github.com/cocos/example-projects/tree/master/assets/cases/spine) for details.
