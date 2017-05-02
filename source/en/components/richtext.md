# RichText component reference

RichText component could be used for displaying a string with multiple styles.
You could customize the text style of  each text segment with a few simple BBCode.

The currently supported tags are: color, size, outline, b, i, u, br, img and on, these tags could also be nested.

For more information about BBCode, please refer to the `BBCode format` section.

![richtext](./richtext/richtext.png)

Click the **Add Component** button at the bottom of the **Properties** panel and select `richtext` from `Add Rendering Component` to add the richtext component to the node.

The API reference of RichText is here: [RichText API](../api/classes/RichText.html)。

## RichText property

| Property         | Function Explanation                                                                                                        |
| --------------   | -----------                                                                                                                 |
| String           | Text of the RichText, you could use BBcode in the string                                                                    |
| Horizontal Align | Horizontal alignment                                                                                                        |
| Font Size        | Font size, in points                                                                                                        |
| Font             | Custom TTF font of RichText, all the label segment will use the same custom ttf font.                                       |
| Line Height      | Line height, in points                                                                                                      |
| Max Width        | The maximize width of RichText, pass 0 means not limit the maximize width.                                                  |
| Image Atlas      | The image atlas for the img tag. For each src value in the img tag, there should be a valid spriteFrame in the image atlas. |

## BBCode format
### Basics
Currently the supported tag list is: size, color, b, i, u, img and on. There are used for customizing the font size, font color, bold, italic, underline, image and click event.
Every tag should has a begin tag and an end tag. The tag name and property assignment should be all lower case.

It will check the start tag name, but the end tag name restrict is loose, it only requires a </> tag, the end tags name doesn't matter.

Here is an example of the `size` and `color` tag:

`<color=green>你好</color>，<size=50>Creator</>`

### Supported tags
Note: all tag names should be lower case and the property assignment should use `=` sign.

|Name|Description|Example|Note
| -------|------- | -----|------ |
|color|Specify the font rendering color, the color value could be a built-in value or a hex value. eg, use #ff0000 for red. | `<color=#ff0000>Red Text</color>` | For built-in color, please refer to [cc.Color](../api/classes/Color.html)
|size|Specify the font rendering size, the size should be a integer.| `<size=30>enlarge me</size>` |
|outline|Specify the font outline, you could customize the outline color and width by using the `color` and `width` attribute. | `<outline color=red width=4>A label with outline</outline>` | If you don't specify the color and width attribute, the default color value is #ffffff and the default width is 1.
|b|Render text as bold font| `<b>This text will be rendered as bold</b>`| The tag name must be lowercase and tag name `bold` is not supported.
|i|Render text as italic font| `<i>This text will be rendered as italic</i>`| The tag name must be lowercase and tag name `italic` is not supported.
|u|Add a underline to the text|`<u>This text will have a underline</u>`| The tag name must be lowercase and tag name `underline` is not supported.
|on|Specify a event callback to a text node，when you click the node，the callback will be triggered.| `<on click="handler"> click me! </on>` | Every valid tag could also add another click event attribute. eg. `<size=10 click="handler2">click me</size>`
|br|Insert a empty line| `<br/>`| Note：`<br></br>` and `<br>` are both invalid tags.
|img|Add image emoji support to your RichText. The emoji name should be a valid spriteframe name in the ImageAtlas property. |`<img src='emoji1' click='handler' />` | Note: Only `<img src='foo' click='bar' />` is a valid img tag. If you specify a large emoji image, it will scale the sprite height to the line height of the RichText together with the sprite width.


Tags could be nested, the rules is the same as normal HTML tags. For example, the following settings will render
a label with font size 30 and color value green.

`<size=30><color=green>I'm green></color></size>`

is equal to:

`<color=green><size=30>I'm green</size></color>`

## Detailed explanation
The RichText component is implemented in the Javascript layer and uses the Label node as the rendering part.
All the layout logic goes also in Javascript layer.

This means if you create a very complex RichText which will end up with many label node created under the hook.
And all these label node are using system font for rendering.

So, you should avoid mutating the RichText content in your game loop.

And in most cases, please stick to normal Label component, it's more efficient.

---
