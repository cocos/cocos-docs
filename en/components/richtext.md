# RichText component reference

> Proofreader: RazgrizHsu

RichText component could be used for displaying a string with multiple styles. You could customize the text style of each text segment with a few simple BBCode.

The currently supported tags are: `color`, `size`, `outline`, `b`, `i`, `u`, `br`, `img` and `on`, these tags could also be nested with each other.

For more information about BBCode, please refer to the **BBCode format** section below.

![richtext](./richtext/richtext.png)

Click the **Add Component** button at the bottom of the **Properties** panel and select **RichText** from **Renderer Component** to add the RichText component to the node.

The API reference of RichText is here: [RichText API](../../../api/en/classes/RichText.html).

## RichText properties

| Property           | Function Explanation                                                                  |
| :-------------     | :----------                                                                           |
| String             | Text of the RichText, you could use BBcode in the string                              |
| Horizontal Align   | Horizontal alignment                                                                  |
| Font Size          | Font size, in points                                                                  |
| Font               | Custom TTF font of RichText, all the label segment will use the same custom ttf font. |
| Font Family        | Custom system font of RichText.                                                       |
| Use System Font    | Whether to use the system default font.                                               |
| Max Width          | The maximize width of RichText, pass 0 means not limit the maximize width.            |
| Line Height        | Line height, in points                                                                |
| Image Atlas        | The image atlas for the img tag. For each src value in the img tag, there should be a valid spriteFrame in the image atlas. |
| Handle Touch Event | Once checked, the RichText will block all input events (mouse and touch) within the bounding box of the node, preventing the input from penetrating into the underlying node. |

The API reference of RichText is here: [RichText API](../../../api/en/classes/RichText.html).

## BBCode format

### Basics

Currently the supported tag list is: `size`, `color`, `b`, `i`, `u`, `img` and `on`. There are used for customizing the font size, font color, bold, italic, underline, image and click event.

Every tag should has a start tag and an end tag. The tag name and property assignment should be all lower case. It will check the start tag name, but the end tag name restrict is loose, it only requires a `</>` tag, the end tags name doesn't matter.

Here is an example of the `size` and `color` tag:

`<color=green>你好</color>，<size=50>Creator</>`

### Supported tags

> **Note**: all tag names should be lower case and the property assignment should use `=` sign.

| Name | Description | Example | Note |
| :------ | :------- | :----- | :------ |
| color  | Specify the font rendering color, the color value could be a built-in value or a hex value. eg, use #ff0000 for red. | `<color=#ff0000>Red Text</color>` | For built-in color, please refer to [cc.Color](../../../api/en/classes/Color.html) |
| size   | Specify the font rendering size, the size should be a integer.| `<size=30>enlarge me</size>` | The size assignment should use `=` sign. |
| outline | Specify the font outline, you could customize the outline color and width by using the `color` and `width` property. | `<outline color=red width=4>A label with outline</outline>` | If you don't specify the color or width of outline, the default color value is `#ffffff` and the default width is `1`. |
| b      | Render text as bold font | `<b>This text will be rendered as bold</b>`| The tag name must be lowercase and tag name `bold` is not supported. |
| i      | Render text as italic font | `<i>This text will be rendered as italic</i>`| The tag name must be lowercase and tag name `italic` is not supported. |
| u      | Add a underline to the text |`<u>This text will have a underline</u>`| The tag name must be lowercase and tag name `underline` is not supported. |
| on     | Specify a event callback to a text node, when you click the node, the callback will be triggered. | `<on click="handler"> click me! </on>` | Every valid tag could also add another click event attribute. eg. `<size=10 click="handler2">click me</size>` |
| param  | When the click event is triggered, the value can be obtained in the second parameter of the callback function. | `<on click="handler" param="test"> click me! </on>` | Depends on the click event. |
| br     | Insert a empty line | `<br/>` | `<br></br>` and `<br>` are both invalid tags. |
| img    | Add image emoji support to your RichText. The emoji name should be a valid spriteframe name in the ImageAtlas. | `<img src='emoji1' click='handler' />` | Only `<img src='foo' click='bar' />` is a valid img tag. If you specify a large emoji image, it will scale the sprite height to the line height of the RichText together with the sprite width. |

#### Optional attribute of img tag (New in v2.3)

For better typography we have provided additional optional attributes for the img tag. You can use `width`, `height` to specify the size of the SpriteFrame. This will allow the image to be larger or smaller than the line height (but it will not change the line height).

When you change the height or width of the SpriteFrame, you may need to use the `align` attribute to adjust the alignment of the image in the line.

| Attribute | Description | Example | Note   |
| :-------- | :---------- | :------ | :----- |
| height    | Specify the SpriteFrame height size, the size should be a integer.| `<img src='foo' height=50 />` | If you only assign height the SpriteFrame will auto keep aspect-ratio
| width     | Specify the SpriteFrame width size, the size should be a integer.| `<img src='foo' width=50 />` | You can use both Height and Width `<img src='foo' width=20 height=30 />`
| align     | Specify the SpriteFrame alignment in line, the value should be `bottom`, `top` or `center`.| `<img src='foo' align=center />` | Default SpriteFrame alignment will be bottom

To support custom image layout, we also provide the `offset` attribute for fine-tune the position of the specified SpriteFrame in the RichText component. When setting the `offset` attribute, keep in mind that the value must be an integer, and it will cause the image to overlap the text if it is not set properly.

| `offset` attribute | Example | Description | Note   |
| :-------- | :------ | :---------- | :----- |
| Y         | `<img src='foo' offset=5 />`    | Specify the SpriteFrame to offset y + 5           | If offset only set one Integer value it's will be offset Y
| Y         | `<img src='foo' offset=-5 />`   | Specify the SpriteFrame to offset y - 5           | You can use minus to decrease Y position
| X, Y      | `<img src='foo' offset=6,-5 />` | Specify the SpriteFrame to offset x + 6 and y - 5 | The offset values should only contains `0-9`, `-` and `,` characters

### Nested Tags

Tags could be nested, the rules is the same as normal HTML tags. For example, the following settings will render a label with font size 30 and color value green.

`<size=30><color=green>I'm green</color></size>`

is equal to:

`<color=green><size=30>I'm green</size></color>`

There are two ways to set the color of RichText:

1. Selected the node and set the overall color of RichText in **Node -> Color** of the **Properties**.
2. Use BBCode to set colors on the inside of RichText separately.

> **Note**: the two cannot be mixed. If mixed, the color set in the **second** way will prevail at runtime.

## Cache Mode (New in v2.3)

Since the RichText component is assembled from multiple Label nodes, the number of drawcalls for complex rich text will also be high. Therefore, the engine provides the CacheMode setting of the Label component for the RichText component to avoid the increase of drawcall. For a detailed description of each cache type, refer to [Cache Mode of the Label component](./label.md)

| Attributes |   Description
| :------------- | :---------- |
| NONE | By default, for each Label node created by RichText, set its CacheMode to NONE, that is, generate a bitmap of the entire text of each Label and render it separately.
|BITMAP| After selection, for each Label node created by RichText, set its CacheMode to BITMAP type, that is, generate a bitmap of the entire text of each Label, and add the bitmap to the dynamic atlas, and then according to the dynamic atlas to assemble and render.
| CHAR | After selection, each Label node created by RichText has its CacheMode set to CHAR type, that is, the text of each Label is cached in a globally shared bitmap in "words". Each of the same font style and size is Characters will share a cache globally.

> **Note**: the **RenderTexture** module in the **Project -> Project Settings -> Module Config** panel cannot be removed when using the cache mode.

## Detailed explanation

The RichText component is implemented in the Javascript layer and uses the Label node as the rendering part. All the layout logic goes also in Javascript layer. This means if you create a very complex RichText which will end up with many label node created under the hook. And all these label node are using system font for rendering.

So, you should avoid modifying the RichText content frequently in your game's main loop, which can lead to lower performance. Also, try to use the normal Label component instead of the RichText component if you can, and BMFont is the most efficient.
