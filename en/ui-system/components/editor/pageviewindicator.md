# PageviewIndicator Component Reference

The __PageViewIndicator__ component is used to display the current page number of the __PageView__ and the page where the tag is currently located.

![pageviewindicator.png](./pageviewindicator/pageviewindicator.png)

Click the __Add Component__ button at the bottom of the __Inspector__ panel and select __UI/PageViewIndicator__ to add the __PageViewIndicator__ component to the node.

To use `PageView`, please refer to the [PageView API](https://docs.cocos.com/creator3d/api/en/classes/ui.pageviewindicator.html) documentation and the [pageView](https://github.com/cocos-creator/test-cases-3d/tree/master/assets/cases/ui/15.pageview) scene of the test-cases-3d project.

## PageviewIndicator Properties

| Properties | Function Description |
| ----------- | ----------- |
| *CellSize*    | The cellsize for each element |
| *Direction*   | The location direction of __PageViewIndicator__, including __HORIZONTAL__ and __VERTICAL__ |
| *Spacing*     | The distance between each element |
| *SpriteFrame* | The spriteFrame for each element |

## Detailed Explanation

__PageviewIndicator__ is not used alone, it needs to be used with `PageView` to create a tag of the number of pages corresponding to the page. When you slide to a page, __PageviewIndicator__ will highlight its corresponding mark.
