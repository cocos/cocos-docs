# PageViewIndicator component reference

The PageViewIndicator component is used to display the current page number of the PageView and the page where the tag is currently located.

![pageviewindicator.png](./pageviewindicator/pageviewindicator.png)

Click the **Add component** button at the bottom of the **Properties** panel and select **PageViewIndicator** from **UI Component**. You can then add the PageViewIndicator component to the node.

Please refer to the script interface of the pageViewIndicator [PageViewIndicator API](../../../api/en/classes/PageViewIndicator.html)

## PageViewIndicator properties

| Property    |   Function description |
| ----------- | ----------- |
| Sprite Frame | The spriteFrame for each element |
| Direction    | The location direction of PageViewIndicator, currently has HORIZONTAL, VERTICAL |
| Cell Size    | The cellSize for each element |
| Spacing      | The distance between each element |

## Detailed explanation

PageViewIndicator is not used alone, it needs to be used with `PageView` to create a tag of the number of pages corresponding to the page. When you slide to a page, PageViewIndicator will highlight its corresponding mark.
