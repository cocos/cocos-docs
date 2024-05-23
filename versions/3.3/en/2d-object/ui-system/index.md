# UI System

This section introduces the powerful and flexible UI (User Interface) system in Cocos Creator. By assembling different UI components to produce UI interfaces that can be adapted to multiple screen resolutions, dynamically generate and update display content from data, and support multiple layout styles.

## Getting Started with UI

The difference between defining UI and 2D rendering objects in the engine mainly lies in adaptation and interaction. All UI needs to be under a Canvas node to make adaptation behavior, and the Canvas component itself inherits from `RenderRoot2D` component, it can also be used as an entry point for data collection.

The UI is a necessary interactive part of game development. Generally, buttons, text, backgrounds, etc. on the game are made through the UI. When starting to create a UI, first it is necessary to determine the size of the display area (design resolution) of the current design content, which can be set in the **Project -> Project Settings -> Project Data** panel in the menu bar.

![resolution-config](resolution_config.png)

Once the design resolution is set, start creating UI elements, all of which are contained under the Canvas node. The Canvas node can be created by clicking the **+** button in the **Hierarchy** panel on the top left and selecting **UI Component -> Canvas**. The Canvas node has a [Canvas](../../ui-system/components/editor/canvas.md) component, which can be associated with a camera.

> **Notes**:
>
> 1. Multiple Canvas nodes can exist in a scene, but a Canvas node should not be nested under another Canvas node or its children.
> 2. Canvas components are not one-to-one with camera, their previous rendering depends on the layer of the node and the Visibility of the camera, so you should pay extra attention to layer management to get the desired rendering effect when you have multiple Canvas.

Next, create UI nodes under the Canvas node. The editor comes with the following UI nodes:

![create-ui](./create-ui.png)

UI components can be viewed by selecting the node and clicking **Add Component** in the **Inspector** panel.

![add-ui-component](./add-ui-component.png)

The order in which UI components are rendered is a depth ordering scheme, which means that the ordering of the child nodes under the Canvas node already determines the entire [rendering order](../../ui-system/components/engine/priority.md).

In general game development, the necessary UI elements are not only basic 2D renderable components such as Sprite, Label (text), Mask, but also Layout, Widget (alignment), etc., which are used to quickly build the interface. Sprite and Label are used to render images and text, Mask is mainly used to limit the display content, more commonly used in chat boxes and backpacks, etc. Layout is generally used for single arrangement of buttons, neat arrangement of props in backpacks, etc. <br>
The last important feature is the Widget, which is mainly used for display alignment. When finishing designing the UI and publish it to different platforms, the actual device resolution of the platform is bound to be different from our design resolution, therefore some trade-offs need to be made in order to adapt it. It is necessary to add a widget component to it, and always ensure that it is aligned to the top left of our design resolution. Please review the [Alignment Strategy](../../ui-system/components/engine/widget-align.md) and [Alignment](../../ui-system/components/editor/widget.md) documentation.

Once the interface is created, some people may notice that the iPhone 7 displays differently than the iPhone X. This is actually the same problem with the device resolution we mentioned above. When you design in design resolution and finally publish in device resolution, there is a pixel deviation because the resolution of different models of mobile devices may not be the same, so there is another conversion process that needs to be done that is screen adaptation. <br>
Notice in the **Projects -> Project Settings -> Project Data** page in the menu bar, there are two more options **Fit Width / Fit Height**, which can be easily adapted to different devices by following the screen adaptation rules and combining with the Widget component. The specific adaptation rules can be found in the [Multi-Resolution Adaptation Scheme](../../ui-system/components/engine/multi-resolution.md) documentation.

## UI components

UI components mostly do not have rendering capabilities themselves, but hold 2D renderable components for rendering, which themselves have more ability to quickly form user-interactive interfaces, and take on functions such as event response, typography adaptation, etc.

For specific descriptions of each UI component, please refer to the [UI Components](../../ui-system/components/editor/base-component.md) documentation.

## UI Practice Guide

- [Multi-Resolution Adaptation Scheme](../../ui-system/components/engine/multi-resolution.md)
- [Alignment Strategy](../../ui-system/components/engine/widget-align.md)
- [Label Layout](../../ui-system/components/engine/label-layout.md)
- [Auto Layout Container](../../ui-system/components/engine/auto-layout.md)
- [Create a List of Dynamically Generated Content](../../ui-system/components/engine/list-with-data.md)
- [Use a Sliced Sprite to make a UI image](../../ui-system/components/engine/sliced-sprite.md)
