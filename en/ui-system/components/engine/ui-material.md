# UI Custom Material

UI custom material is the best practice to expand UI performance and enhance UI's own capabilities.
Cool UI effects such as dissolving and external glow can be achieved through custom materials

**Sprite** component supports **UI Custom Material**. The user interface is as follows:

![UIMaterial](ui-material/UIMaterial.png)

Using a UI built-in material works the same as custom materials. However, there are few items to take into consideration:

1. When the number of custom materials is set to `0` or empty, the default material will be used. Please refer to the [Sprite](../editor/sprite.md) documentation.
2. UI does not support multiple materials, the number of custom materials is at most one.
3. When the ui custom material is used, the **Grayscale** function on the panel will be invalid. Users can choose to implement this function in the material.
4. For custom materials, the **cc-sprite-texture** header file must be introduced in the shader to obtain the uploaded texture. The **cc_spriteTexture** in it corresponds to the `SpriteFrame` image resource set on the UI rendering component property panel. For example, a simple fragment shader that uses the panel setting `SpriteFrame` to sample textures should look like the following:

    ```
    CCProgram sprite-fs %{
        precision highp float;
        #include <cc-sprite-texture>
        in vec4 v_color;

        uniform ARGS{
            float time;
        };

        in vec2 uv0;
        uniform sampler2D u_normalMap;

        vec4 frag () {
            vec4 color = vec4(1, 1, 1, 1);
            color *= v_color;
            float value = 1.0;
            vec4 o = texture(u_normalMap, uv0);
            value *= o.r;
            if (value < time) {
                discard;
            }

            color *= texture(cc_spriteTexture, uv0);
            if (value < time + 0.05) {
                color = vec4(0.9, 0.6, 0.3, color.a);
            }

            return color;
        }
    }%
    ```

    ![dissolve](ui-material/dissolve.png)

5. To perform uniform assignment operations to custom materials, they can operate by obtaining the material on the Sprite. We provide different interfaces to deal with different operating conditions, as shown in the following code: **(Please pay attention to the difference Notes on the interface!)**

    ```ts
        let spriteCom = this.node.getComponent(Sprite);
        // What is obtained through the sharedMaterial method is a shared material resource, and operations on material will affect all rendering objects that use this material
        let material = spriteCom.sharedMaterial;

        // The material trial used by the current rendering component obtained through the material method, the operation for material Instance will only affect the current component
        let materialInstance = spriteCom.material;

    ```
