# PageViewIndicator Component Reference

The __PageViewIndicator__ component is used to display the current page number of the __PageView__ and the page where the tag is currently located.

![pageviewindicator.png](./pageviewindicator/pageviewindicator.png)

Click the __Add Component__ button at the bottom of the __Inspector__ panel and select __UI/PageViewIndicator__ to add the __PageViewIndicator__ component to the node.

To use `PageView`, please refer to the [PageView API](%__APIDOC__%/en/class/PageViewIndicator) documentation and the [PageView](https://github.com/cocos/cocos-test-projects/tree/v3.7/assets/cases/ui/15.pageview) scene of the test-cases-3d project.

## PageviewIndicator Properties

| Property | Function Description |
| ----------- | ----------- |
| **CellSize**    | The cellsize for each element |
| **Direction**   | The location direction of __PageViewIndicator__, including __HORIZONTAL__ and __VERTICAL__ |
| **Spacing**     | The distance between each element |
| **SpriteFrame** | The spriteFrame for each element |

## Detailed Explanation

__PageViewIndicator__ is not used alone, it needs to be used with `PageView` to create a tag of the number of pages corresponding to the page. When you slide to a page, __PageViewIndicator__ will highlight its corresponding mark.
