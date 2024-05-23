# 2D 渲染对象自定义材质

2D 渲染对象的自定义材质是拓展 2D 渲染对象表现和提升 2D 渲染对象自身能力的最佳实践，可以通过自定义材质实现溶解、外发光等酷炫的渲染效果。

v3.0 的 2D 渲染组件大部分都支持使用自定义材质，其使用界面如下图（以 Sprite 组件为例）：

![UIMaterial](ui-material/UIMaterial.png)

其使用方法与其他内置材质并无不同，将要使用的材质拖拽到 **CustomMaterial** 属性框中即可。

## 注意事项

1. 当未指定自定义材质时，会使用内置材质进行渲染，面板功能及使用方法可参考 [Sprite 组件参考](../editor/sprite.md) 文档。
2. 2D 渲染对象并不支持多材质，自定义材质的数量最多为一个。
3. 请使用 **builtin-spine** 或 **builtin-sprite** 等 2D 专用 Shader 来自定义材质，请勿选择其他 3D 组件使用的 shader。
4. 当使用了 2D 渲染对象自定义材质之后，面板上的 **Grayscale** 属性功能将会失效，用户可选择自行在材质中实现此功能。
5. 若代码中设置了 BlendFactor，在使用了自定义材质后，会以自定义材质中 BlendFactor 的设置为准。
6. 使用了自定义材质之后，组件的深度检测信息会以材质为准。如果想要实现和 3D 物体的遮挡，请使用自定义材质并开启深度检测。可参考范例 **2d-rendering-in-3d**（[GitHub](https://github.com/cocos/cocos-test-projects/tree/v3.7/assets/cases/2D) | [Gitee](https://gitee.com/mirrors_cocos-creator/test-cases-3d/tree/v3.7/assets/cases/2d-rendering-in-3d)）。
7. 如果用户希望修改自定义材质的属性，可通过获取 2D 渲染组件上的 **customMaterial** 来进行操作，如下代码所示：（以 Sprite 为例）：

    ```ts
    let spriteComp = this.node.getComponent(Sprite);
    let material = spriteComp.customMaterial;
    //material.setProperty(propName,val)
    ```
  
## 自定义 2D Shader

如果内置的Shader不满足需求，可参考 [2D 精灵着色器：Gradient](../../../shader/write-effect-2d-sprite-gradient.md) 自定义 Shader。
