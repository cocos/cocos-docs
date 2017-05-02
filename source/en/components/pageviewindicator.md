# PageviewIndicator component reference

The PageViewIndicator Component, Used to display the current page number of the PageView and the page where the tag is currently located.

![pageviewindicator.png](./pageviewindicator/pageviewindicator.png)

Click the 'Add component' pageviewIndicator at the bottom of the **Properties** panel and select 'PageviewIndicator' from 'add UI component'. You can then add the PageviewIndicator component to the node.

Please refer to the script interface of the pageviewIndicator [PageviewIndicator API](../api/classes/PageviewIndicator.html)

## PageviewIndicator property

| Property    |   Function description |
| ----------- | ----------- |
| spriteFrame | The spriteFrame for each element |
| direction   | The location direction of PageViewIndicator, currently has HORIZONTAL, VERTICAL |
| cellSize    | The cellSize for each element |
| spacing     | The distance between each element |


## Detailed explanation

PageviewIndicator is not used alone, it needs to be used with `PageView` to create a tag of the number of pages corresponding to the page. When you slide to a page, PageviewIndicator will highlight its corresponding mark