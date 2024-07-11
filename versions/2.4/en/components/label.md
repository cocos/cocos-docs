# Label Component Reference

Label component is used to display a piece of text, the text can be **System Font**, **TrueType Font**, **BMFont** or **Atlas Font**. In addition, label also has typesetting function.

![label-property](./label/label-property.png)

Click the **Add Component** button at the bottom of the **Properties** panel and select **Label** from **Renderer Component** to add the Label component to the node.

## Label Properties

| Properties       | Function Explanation |
| :--------------- | :------------------- |
| String           | Text content character string.                                                                                              |
| Horizontal Align | Horizontal alignment pattern of the text. The options are LEFT, CENTER and RIGHT.                                           |
| Vertical Align   | Vertical alignment pattern of the text. The options are TOP, CENTER and BOTTOM.                                             |
| Font Size        | Font size of the text.                                                                                                      |
| Line Height      | Line height of the text.                                                                                                    |
| SpacingX         | The spacing between font characters, only available in BMFont.                                                              |
| Overflow         | Layout pattern of the text. Currently supports CLAMP, SHRINK and RESIZE_HEIGHT. See [Label Layout](#label-layout) below for more detailed information. |
| Enable Wrap Text | Enable or disable the text line feed. (which takes effect when the Overflow is set to CLAMP or SHRINK)                      |
| Font             | Specify the font file needed for text rendering. If the System Font is used, then this property can be set to `null`.       |
| Font Family      | Font family name. (Takes effect when using System Font)                                                                     |
| Enable Bold      | If enabled, bold effect will be added to the text. (Takes effect when using System Font or TTF font)                        |
| Enable Italic    | If enabled, italic effect will be added to the text. (Takes effect when using System Font or TTF font)                      |
| Enable Underline | If enabled, underline effect will be added to the text. (Takes effect when using System Font or TTF font)                   |
| Underline Height | Height of underline.                                                                                                        |
| Cache Mode       | Text cache mode includes **NONE**, **BITMAP** or **CHAR**. Takes effect only for System Font or TTF font, BMFont does not require this optimization. See [Cache Mode](#cache-mode-new-in-v209) below for details. |
| Use System Font  | If enabled, **System Font** will be used.
| Src Blend Factor      | The fetch mode of the source image when blending text images. Refer to: [BlendFactor API](%__APIDOC__%/en/enums/BlendFactor.html), specific instructions can be found in section **Blend Mode Of System Font** below. |
| Dst Blend Factor      | The fetch mode of the target image when the two images are displayed together. Refer to: [BlendFactor API](%__APIDOC__%/en/enums/BlendFactor.html), specific instructions can be found in section **Blend Mode Of System Font** below. |

For additional details, please refer to the [Label API](%__APIDOC__%/en/classes/Label.html).

## Label Layout

| Properties    | Function Explanation |
| :------------ | :------------ |
| CLAMP         | The text size won't zoom in or out as the Bounding Box size changes.<br>When Wrap Text is disabled, parts exceeding the Bounding Box won't be shown according to the normal character layout.<br>When Wrap Text is enabled, it will try to wrap the text exceeding the boundaries to the next line. If the vertical space is not enough, any not completely visible text will also be hidden.                          |
| SHRINK        | The text size will zoom in or out (it won't zoom out automatically, the maximum size that will show is specified by Font Size) as the Bounding Box size changes.<br>When Wrap Text is enabled, if the width is not enough, it will try to wrap the text to the next line before automatically adapting the Bounding Box's size to make the text show completely.<br>If Wrap Text is disabled, then it will compose according to the current text and zoom automatically if it exceeds the boundaries.<br>**Note**: this mode may takes up more CPU resources when the label is refreshed. |
| RESIZE_HEIGHT | The text Bounding Box will adapt to the layout of the text. The developer cannot manually change the height of text in this status, it is automatically calculated by the internal algorithm.                                          |

## Cache Mode

| Properties |   Function Explanation |
| :--------- | :--------------------- |
| NONE       | Defaults, the entire text in label will generate a bitmap. |
| BITMAP     | After selection, the entire text in the Label will still generate a bitmap, but will try to participate in [Dynamic Atlas](../advanced-topics/dynamic-atlas.md). As long as the requirements of Dynamic Atlas are met, the Draw Call will be merged with the other Sprite or Label in the Dynamic Atlas. Because Dynamic Atlas consume more memory, **this mode can only be used for Label with infrequently updated text**.<br>**Note**: similar to NONE, BITMAP will force a bitmap to be generated for each Label component, regardless of whether the text content is equivalent. If there are a lot of Labels with the same text in the scene, it is recommended to use CHAR to reuse the memory space.  |
| CHAR      | The principle of CHAR is similar to BMFont, Label will cache text to the global shared bitmap in "word" units, each character of the same font style and font size will share a cache globally. Can support frequent modification of text, the most friendly to performance and memory. However, there are currently restrictions on this model, which we will optimize in subsequent releases:<br>1. **This mode can only be used for font style and fixed font size (by recording the fontSize, fontFamily, color, and outline of the font as key information for repetitive use of characters, other users who use special custom text formats need to be aware). And will not frequently appear with a huge amount of unused characters of Label.** This is to save the cache, because the global shared bitmap size is **2048 * 2048**, it will only be cleared when the scene is switched. Once the bitmap is full, the newly appearing characters will not be rendered. <br>2. Cannot participate in dynamic mapping (multiple labels with CHAR mode enabled can still merge Draw Call in the case of without interrupting the rendering sequence).<br>3. This mode uses **FreeType** rendering on the **native** platform. |

> **Notes**:
>
> 1. Cache Mode has an optimized effect for all platforms.
> 2. The BITMAP mode replaces the original Batch As Bitmap option, and old projects will automatically migrate to this option if Batch As Bitmap is enabled.
> 3. The **RenderTexture** module in the **Project -> Project Settings -> Module Config** panel cannot be removed when using the cache mode.

## Blend Mode Of System Font

For Label components, **Src Blend Factor** has two main settings, including **SRC_ALPHA** and **ONE**. The implementation of the engine system font is to first draw the text to the Canvas, and then generate a picture for the Label component to use, which involves a text transparency issue.

- When using **SRC_ALPHA** mode, transparency can be passed to the Shader via vertex data and then pixel transparency can be calculated in the Shader, so the transparency of text does not need to be processed when drawing to the Canvas. And when Label node transparency changes need to be made, there is no need to call `updateRenderData` frequently to redraw the Canvas, which can reduce the performance consumption caused by API calls and frequent redraw.

- When using **ONE** mode, the transparency of the text image needs to do pre-multiplication processing, so in Canvas drawing the need for transparency processing, in this mode, Label's node transparency changes require frequent calls to `updateRenderData`, to redraw the text content.

It is important to note that different blend modes can affect the dynamic batching with other nodes. For example:

- When **Src Blend Factor** selects **ONE** mode and **Cache Mode** selects **BITMAP** cache mode, a dynamic atlas is used, which may cause the dynamic batching to fail.
- If **Cache Mode** selects the **CHAR** cache mode, then **Src Blend Factor** defaults to the **SRC_ALPHA** mode, because the same character atlas is shared globally and different modes are not compatible.

In addition, for the **native platform**, under **SRC_ALPHA**, in order to eliminate the problem of black edges in the text, it is necessary to do anti-premultiply when the text image data is returned.<br>
For a large number of text nodes or large sections of text using **SHRINK** mode, doing anti-premultiply will have a lot of performance consumption, developers need to make reasonable choices based on different use scenes and text content, in order to reduce the performance consumption caused by redrawing in different platforms.

1. If **Cache Mode** selects the **CHAR** cache mode, only **SRC_ALPHA** can be used.
2. If you are only publishing the **Web** platform, it is recommended to use the default **SRC_ALPHA** mode. Because the transparency changes in **ONE** mode cause frequent redrawing, the use of **BITMAP** cache mode and **CHAR** cache mode does not work.
3. If you need to publish the **Native** platform and the text uses a layout mode such as **SHRINK** that redraws frequently, and the performance consumption is obvious due to the frequent anti-premultiply of the text during the interface creation, you can choose to use **ONE** mode to avoid the jams caused by the anti-premultiply.

## Detailed Explanation

By dragging the TTF font file and BMFont font file into the `Font` property in the **Properties** panel the Label component can alter the rendering font type. If you want to stop using a font file, you can use the system font again by checking `Use System Font`.

If you want to use LabelAtlas, you should create a LabelAtlas font asset at first. Please refer to [LabelAtlas asset](../asset-workflow/label-atlas.md) for more information.

### UI Rendering Batch Processing Guide

For more info of this feature, please refer to [UI Rendering Batch Processing Guide](../advanced-topics/ui-auto-batch.md) topic.
