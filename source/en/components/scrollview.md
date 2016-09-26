# ScrollView component reference

ScrollView is a container with a scroll function. It provides a way to browse more contents within a limited display area. Generally, ScrollView will be used
along with the `Task` component and the `ScrollBar` component can also be added to show the location of the browsing content.

![scrollview-content](./scrollview/scrollview-content.png)

![scrollview-inspector](./scrollview/scrollview-inspector.png)

Click the `add component` button at the bottom of the **Properties** panel and select `ScrollView` from `add UI component` You can then add the ScrollView component to the node.


## ScrollView attribute

| Attribute |   Function Explanation
| -------------- | ----------- |
| Content| A reference node for creating scrollable content from ScrollView. It could be a node containing a very large picture.
| Horizontal | Boolean value, whether horizontal scroll is allowed or not.
| Vertical | Boolean value, whether vertical scroll is allowed or not.
| Inertia | Is there an accelerating velocity when scrolling?
| Brake | Floating point number, the deceleration coefficient after scrolling. The value range is 0-1 where if set to 1, then the scroll will stop immediately; if set to 0, then the scroll will continue until the content border.
|Elastic | Boolean value, whether to bounce back or not.
|Bounce Duration | Floating point number, the time duration for bounce back. The calue range is 0-10.
|Horizontal ScrollBar| A reference node for creating a scroll bar showing the horizontal position of the contents.
|Vertical ScrollBar| A reference node for creating a scroll bar showing vertical position of the contents.
|ScrollView Events| Default list type is null. Each event added by the user is composed of the node reference, component name and a response function. Please check more detailed information in the chapter ‘ScrollView Event’.

## ScrollView Event
![scrollview-event](./scrollview/scrollview-event.png)

| Attribute |   Function Explanation
| -------------- | ----------- |
|Target| Node with the script component.
|Component| Script component name.
|Handler| Assign a callback function which will be triggered when the scrollview events emitted.

The scrollview event callback will have two parameters, the first one is the ScrollView itself and the second one is the event type.

## Detailed explanation

The ScrollView component can only work with the specified content node. It calculates location information during scrolling using both the designated scroll direction and the length of the content node in this direction. The content node can also set to auto resize through the `UI Widget`?

Normally a ScrollView node tree resembles the following:

![scrollview-hierarchy](./scrollview/scrollview-hierarchy.png)

Here, the Viewport is used to define a scroll area that can be displayed. As a result, the Mask component will normally be added to the Viewport. Contents that can scroll can be put in the content node or added to its child node.

## ScrollBar settings

ScrollBar is optional. You can choose to set either a horizontal or vertical ScrollBar or of course set them both.

To build a connection, you can drag a node with the ScrollBar component in the **Node Tree** over to the corresponding field in ScrollView.


---

Continue on to read about [ScrollBar component reference](scrollbar.md).
