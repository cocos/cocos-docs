# Canvas Component Reference

![](canvas/canvas.png)

The node where the **Canvas** component is located is the **root** of the UI rendering. There can be multiple __Canvas__ in the scene. **All UI elements must be placed under a __Canvas__ node so that it can be rendered**. UI Elements are rendered by the **Canvas** node that they are located under. Each **Canvas** can be presented in a certain order controlled by the `priority` attribute.

In addition to the root node of the UI, **Canvas** also has a screen adaptation function. Please refer to the [Multi-Resolution Adaption](../engine/multi-resolution.md) documentation to read about this. **Canvas** also supports multi-resolution adaptation. The __design resolution__ and __adaptation scheme__ are uniformly set in the __Project Setting__. A **Camera** is provided inside the __Canvas__, and the default z-axis direction is __-1000 ~ 998__, so the z-axis on the UI must be within this range to display properly (without taking the threshold value).

![](canvas/design-resolution.png)

In the previous design, __Canvas__ was last rendered, meaning it could mask the rendering of all 3D content, but this was far from sufficient for project development needs, such as a 2D map with a 3D character. The **RenderMode** property allows developers to sort the rendering order of the 3D Camera and UI Camera. If you want to have canvas and 3D camera content mixed up, only the lowest camera or canvas can have the **SOLID_COLOR** **ClearFlag**, otherwise a camera with **SOLID_COLOR** flag will erase all content rendered before it.

## Canvas Properties

| Properties    | Function Explanation  |
| ------------- | ----------- |
| __ClearFlag__     | Clean up the flag of the screen buffer.<br>__DONT_CLEAR__: No cleanup.<br>__DEPTH_ONLY__: Clear the depth buffer.<br>__SOLID_COLOR__: Clear the color depth buffer. |
| __Color__     | The color used to clear the whole render buffer. |
| __Priority__       | Camera sort priority.<br>Only when the **Canvas** **RenderMode** is **INTERSPERSE**, the canvas can be rendered before any camera with lower priority.<br>When **RenderMode** is **OVERLAY**, the priority only affect the order among all canvas. |
| __RenderMode__    | Render mode of the Canvas.<br>When set to **INTERSPERSE**, the priority take effect among all canvas and cameras in the Scene. When set to **OVERLAY**, the canvas will always be rendered after all cameras in the scene.<br>**Note**: when **INTERSPERSE** mode is enabled and its priority is lower than other camera, the camera's **ClearFlags** should be set to **DONT_ClEAR**, otherwise the content of the beneath canvas will be erased. |
| __TargetTexture__ | Rendering texture of the target. |

## Detailed Explanation

If you encounter errors in UI rendering, such as **flickering**, **unwanted artifacts** or **other graphical oddness** please refer to the [Engine priority](../engine/priority.md) documentation.
