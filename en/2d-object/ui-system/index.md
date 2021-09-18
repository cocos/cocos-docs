# UI Description

## Getting Started with UI

The difference between defining UI and 2D rendering objects in the engine mainly lies in adaptation and interaction. All UI needs to be under Canvas node to make adaptation behavior, and Canvas component itself inherits from `RenderRoot2D` component, so it can also be used as an entry point for data collection.

The UI is a necessary interactive part of game development. Generally, buttons, text, backgrounds, etc. on the game are made through the UI. When starting to create a UI, first it is necessary to determine the size of the display area (design resolution) of the current design content, which can be set in the **Project -> Project Settings -> General Settings** panel in the menu bar.

![resolution-config](resolution_config.png)

Once the design resolution is set, start creating UI elements, all of which are contained under the Canvas node. The Canvas node can be created by clicking the **+** button in the **Hierarchy** panel on the top left and selecting **UI Component -> Canvas**. The Canvas node has a [Canvas](../../ui-system/components/editor/canvas.md) component, which can be associated with a camera.

**Note**:

- Multiple Canvas nodes can exist in a scene, but a Canvas node should not be nested under another Canvas node or its children.
- Canvas components are not one-to-one with camera, their previous rendering depends on the layer of the node and the Visibility of the camera, so you should pay extra attention to layer management to get the desired rendering effect when you have multiple Canvas.

Next, you can create UI nodes under the Canvas node. The editor comes with the following UI nodes:

![create-ui](./create-ui.png)

UI components can be viewed by selecting the node and clicking **Add Component** in the **Inspector** panel.

![add-ui-component](./add-ui-component.png)

The order in which UI components are rendered is a depth ordering scheme, which means that the ordering of the child nodes under the Canvas node already determines the entire [rendering order](../../ui-system/components/engine/priority.md).

In general game development, the necessary UI elements are not only basic 2D rendering components such as Sprite, Label (text), Mask, but also Layout, Widget (alignment), etc., which are used to quickly build the interface. Sprite and Label are used to render images and text, Mask is mainly used to limit the display content, more commonly used in chat boxes and backpacks, etc. Layout is generally used for single arrangement of buttons, neat arrangement of props in backpacks, etc. <br
The last important feature is the Widget, which is mainly used for display alignment. When we finish designing the UI and publish it to different platforms, the actual device resolution of the platform is bound to be different from our design resolution, so we have to make some trade-offs in order to adapt it. We need to add a widget component to it, and always ensure that it is aligned to the top left of our design resolution, see: [alignment strategy](../../ui-system/components/engine/widget-align.md) and [alignment](../../ui-system/components/editor/widget.md).

Once the interface is created, some people may notice that the iPhone 7 displays differently than the iPhone X. This is actually the same problem with the device resolution we mentioned above. When you design in design resolution and finally publish in device resolution, there is a pixel deviation because the resolution of different models of mobile devices may not be the same, so there is another conversion process that needs to be done that is screen adaptation. <br
As you can see in the **Projects -> Project Settings -> Project Data** page in the menu bar, there are two more options **Fit Width / Fit Height**, which can be easily adapted to different devices by following the screen adaptation rules and combining with the Widget component. The specific adaptation rules can be found in the [Multi-Resolution Adaptation Scheme](../../ui-system/components/engine/multi-resolution.md).

## UI components

UI components mostly do not have rendering capabilities themselves, but hold 2D rendering components for rendering, which themselves have more ability to quickly form user-interactive interfaces, and take on functions such as event response, typography adaptation, etc. UI component references are as follows:

- [Canvas Component Reference](../../ui-system/components/editor/canvas.md)
- [UITransform Component Reference](../../ui-system/components/editor/ui-transform.md)
- [Widget Component Reference](../../ui-system/components/editor/widget.md)
- [Button Component Reference](../../ui-system/components/editor/button.md)
- [Layout Component Reference](../../ui-system/components/editor/layout.md)
- [EditBox Component Reference](../../ui-system/components/editor/editbox.md)
- [ScrollView Component Reference](../../ui-system/components/editor/scrollview.md)
- [ScrollBar Component Reference](../../ui-system/components/editor/scrollbar.md)
- [ProgressBar Component Reference](../../ui-system/components/editor/progress.md)
- [LabelOutline Component Reference](../../ui-system/components/editor/label-outline.md)
- [Toggle Component Reference](../../ui-system/components/editor/toggle.md)
- [UIMeshRenderer Component Reference](../../ui-system/components/editor/ui-model.md)
- [ToggleGroup Component Reference](../../ui-system/components/editor/toggleContainer.md)
- [Slider Component Reference](../../ui-system/components/editor/slider.md)
- [PageView Component Reference](../../ui-system/components/editor/pageview.md)
- [PageViewIndicator Component Reference](../../ui-system/components/editor/pageviewindicator.md)
- [UIOpacity Component Reference](../../ui-system/components/editor/ui-opacity.md)
- [BlockInputEvents Component Reference](../../ui-system/components/editor/block-input-events.md)

## UI rules introduction

- [Multi-Resolution Adaptation Scheme](../../ui-system/components/engine/multi-resolution.md)
- [Alignment Strategy](../../ui-system/components/engine/widget-align.md)
- [Label Layout](../../ui-system/components/engine/label-layout.md)
- [Auto Layout Container](../../ui-system/components/engine/auto-layout.md)
- [Create a List of Dynamically Generated Content](../../ui-system/components/engine/list-with-data.md)
- [Use a Sliced Sprite to make a UI image](../../ui-system/components/engine/sliced-sprite.md)
