# Label Component Reference

The __Label__ component is used to display texts, the text can use __System Font__, __TrueType Font__, or __Bitmap Font__. In addition, __Label__ also has some basic layout functionalities like alignment, line wrap, auto fit etc.

![label-property](./label/label-property.png)

Select a node in the __Hierarchy__ panel, then click the __Add Component__ button at the bottom of the __Inspector__ panel and select __Label__ from __UI -> Render__ to add the __Label__ component to the node.

To use `Label`, please refer to the [Label API](__APIDOC__/en/#/docs/3.3/en/ui/Class/Label) documentation and the [label](https://github.com/cocos-creator/test-cases-3d/tree/v3.3/assets/cases/ui/02.label) scene of the test-cases-3d project.

## Label Properties

| Property | Function Explanation |
| :-------------- | :----------- |
| **CustomMaterial** | Custom Material, please refer to [UI Custom Material](../engine/ui-material.md). |
| **Color** | Label color. |
| **String** | Text content string. |
| **HorizontalAlign** | Horizontal alignment of the text, including `LEFT`, `CENTER` and `RIGHT`. |
| **VerticalAlign** | Vertical alignment of the text, including `TOP`, `CENTER` and `BOTTOM`. |
| **FontSize** | Font size of the text. |
| **FontFamily** | Font family name (Takes effect when using __System Font__). |
| **LineHeight** | Line height of the text. |
| **Overflow** | Layout of the text. Currently supports `CLAMP`, `SHRINK` and `RESIZE_HEIGHT`. For details, see [Label Layout](#label-layout) below or [Label Layout](../engine/label-layout.md) document. |
| **EnableWrapText** | Enable or disable the text line wrap (which takes effect when the `Overflow` is set to `CLAMP` or `SHRINK`). |
| **Font** | Specify the [font assets](../../../asset/font.md) required for text rendering. To use LabelAtlas, please refer to the [LabelAtlas Asset](../../../asset/label-atlas.md) documentation for configuration.<br>This property can be empty if the System Font is used. |
| **UseSystemFont** | If enabled, the given __FontFamily__ will be used for rendering. |
| **CacheMode** | Text cache mode, including `NONE`, `BITMAP` and `CHAR`. Takes effect only for __System Font__ or __TTF Font__, BMFont does not require this optimization. See [Cache Mode](#cache-mode) below for details. |
| **IsBold** | If enabled, bold effect will be added to the text. (Takes effect when using __System Font__ or some __TTF Font__). |
| **IsItalic** | If enabled, italic effect will be added to the text. (Takes effect when using __System Font__ or some __TTF Font__). |
| **IsUnderline** | If enabled, underline effect will be added to the text. (Takes effect when using __System Font__ or __TTF Font__). |

## Label Layout

| Options | Function Explanation |
| :-------------- | :----------- |
| **CLAMP** | The text size won't zoom in/out as the __UITransform__ `contentSize` changes.<br>When Wrap Text is disabled, texts exceeding the width will be clipped according to the normal character layout.<br>When Wrap Text is enabled, it will try to wrap the text exceeding the boundaries to the next line. If the vertical space is not enough, any text out of bounds will also be hidden. |
| **SHRINK** | The text size could be scaled down as the __UITransform__ `contentSize` changes (it won't be scale up automatically, the maximum size that will show is specified by `FontSize`).<br>When __EnableWrapText__ is enabled, if the width is not enough, it will try to wrap the text to the next line first.<br>Then no matter whether the text is wrapped, if the text still exceed the `contentSize` of __UITransform__, it will be scaled down automatically to fit the boundaries.<br>__Note__: this mode may consumes more CPU resources when the label is refreshed. |
| **RESIZE_HEIGHT** | The __UITransform__ `contentSize` will be adapted to make sure the text is completely shown in its boundary. The developer cannot manually change the height of text in __UITransform__, it is automatically calculated by the internal algorithm. |

## Cache Mode

| Options | Function Explanation |
| :-------------- | :----------- |
| **NONE** | Defaults, the entire text in label will generate a bitmap. |
| **BITMAP** | Currently it behaves in the same way as __NONE__. The entire text in the Label will still generate a bitmap. As long as the requirements of Dynamic Atlas are met, the Draw Call will be merged with the other Sprite or Label in the Dynamic Atlas. Because Dynamic Atlas consume more memory, __this mode can only be used for Label with infrequently updated text__. __Note__: Similar to NONE, BITMAP will force a bitmap to be generated for each Label component, regardless of whether the text content is equivalent. If there are a lot of Labels with the same text in the scene, it is recommended to use CHAR to reuse the memory space. |
| **CHAR** | The principle of this mode is similar to BMFont, Label will cache text to a global shared bitmap in characters, each character of the same font style and font size will share the same cache globally. This mode is the most friendly to performance and memory if the characters is limited in a small set. However, there are currently restrictions on this mode, which we will optimize in subsequent releases:<br>1. __This mode can only be used for font style and fixed font size (by recording the fontSize, fontFamily, color, and outline of the font as key information for repetitive use of characters, other users who use special custom text formats need to be aware). And will not frequently appear with a huge amount of unused characters of Label.__ This is to save the cache, because the global shared bitmap size is __1024 * 1024__, it will only be cleared when the scene is switched. Once the bitmap is full, the newly appearing characters will not be rendered. <br>2. Overflow does not support SHRINK.<br>3. Cannot participate in dynamic atlas (multiple labels with CHAR mode enabled can still merge draw call in the case of without interrupting the rendering sequence). |

> __Note__: __Cache Mode__ has an optimized effect for all platforms.

## Use font assets

By dragging the __TTF__ font asset and __BMFont__ font asset into the `Font` property in the __Inspector__ panel, the __Label__ component can alter the rendering font type. If you want to stop using a font file, use the system font again by checking __UseSystemFont__.
