# Inspector Panel

The **Inspector** panel is the work area for viewing and editing the currently selected nodes, node components, and assets. Properties can be displayed and edited in the **Inspector** panel by selecting a node in the **Scene** panel or **Hierarchy** panel, or by selecting a asset in the **Assets** panel.

! [introduce](index/introduce.gif)

## Panel Overview

! [inspeactor](index/inspeactor-panel.png)

The **Inspector** panel can be roughly divided into two parts: **Toolbar** and **Property Settings**.

## Toolbar

The **two arrows** in the top left corner are the edit history, click on them to advance/reverse the selected nodes/assets. <br>
The **lock icon** button in the upper right corner locks the panel, fixing the currently edited object and preventing the panel from changing with new selections.

! [header](index/header.png)

## Property settings

The **Property Settings** area allows you to set node properties, component properties, asset properties, etc.

### Node name and activation switch

Node name, consistent with the node display name in the **Hierarchy** panel.

The Node Activation checkbox indicates the node's activation status. When unchecked, the node is inactive and rendering of the node is suspended, including the node's children being hidden (grayed out).

### Node properties

Click `Node` below the node name to collapse or expand the node's properties. To the right of `Node` are the help file and node settings buttons.
- The Help button jumps to the official documentation about the node
- The Node Settings button allows you to reset the node properties, copy/paste the node values, and reset the `Position`/`Rotation`/`Scale` properties of the node respectively.

    ! [node-menu](index/node-menu.png)

The transformation properties of nodes include **Position**, **Rotation** and **Scale**. Modifying the properties of a node will usually result in immediate changes in the appearance or position of the node in the **Scene** panel. For details, see [Coordinate Systems and Transformations](... /... /concepts/scene/coord.md#%E5%8F%98%E6%8D%A2%E5%B1%9E%E6%80%A7)

If you need to modify node properties in bulk, you can press Shift in **Hierarchy** panel to select multiple nodes and then set them in bulk in **Inspector**. The bulk setting of node properties is similar to that of assets, please refer to the Bulk Setting of Assets Multiple Selection section at the end of the article for details.

### Component property settings

The Component On checkbox indicates the on state of the component. When unchecked, the component is off and will not participate in rendering.

Below the node properties, all the components mounted on the node and the component properties are listed. As with the node properties, clicking on a component's name toggles the collapsed/expanded state of that component's properties. In the case of many components mounted on the node, you can collapse infrequently modified component properties to get a larger working area.

To the right of the component name are buttons for **Help Documentation** and **Component Settings**.
- The Help button jumps to the official documentation page for the component
- The Component Settings button allows you to reset, delete, move up, move down, copy the component, paste the component's value, paste it as a new component, etc. for the component.

The properties and settings of each component are different, please refer to [Component](...) for details. /... /editor/components/index.md).

## Adding components

Clicking on the **Add Component** button will bring up a list of components, including system-supplied components and custom script components. The list of added components has a search box, supports toggling up and down arrows with the keyboard, and **Enter** to make sure it is selected, provided that the **Add component using popup** feature in **Preferences -> Labs** is enabled.

! [add-component](index/add-component.png)

Developer scripts in the **Assets** panel can be dragged and dropped directly into the **Inspector** panel to generate a script component, or added via **Add Component -> Custom Scripts**. The properties of a script component are declared by the script. Different types of properties have different control appearance and editing in the **Inspector**. We will add the properties in [Declare Properties](... /... /scripting/ccclass.md) section for details on how properties are defined.

## Attribute Types

**Properties** are variables declared in component scripts that are public and can be serialized and stored in scene and animation data. The **property inspector** allows you to quickly modify property settings for the purpose of adjusting game data and gameplay without modifying the script.

Properties can usually be divided into two main categories, **value types** and **reference types**, depending on where the variables use memory.

### Value type attributes

**Value types** include simple variable types that take up very little memory, such as numbers, strings, booleans, enumerations, etc.

- `Numeric (Number)`: can be entered directly using the keyboard, or the property value can be incremented or decremented by pressing the up and down arrows next to the input box.
- `Vector (Vec2)`: The control of a vector is a combination of two numeric inputs, and the input box is marked with x and y to identify the sub-property name corresponding to each value.
- `String`: Enter a string directly into the text box using the keyboard.
- `Boolean`: Edit in the form of a checkbox, the selected state means the property value is true, the non-selected state means false.
- `Enum`: edit in the form of a drop-down menu, click the enumeration menu, and then select an item from the pop-up menu list to finish modifying the enumeration value.
- Color: Click on the color property preview box, the **Color Picker** window will pop up, in this window you can use the mouse to directly click on the desired color, or directly enter the specified color in the RGBA color input box below. Clicking anywhere outside the **Color Picker** window will close the window and use the last selected color as the property value. For example, the color picker component.

  ! [ui-color](index/ui-color.png)

### Reference type properties

**Reference types** include object objects, such as nodes, components, or assets. They can be selected and assigned by **dragging the node or asset into the properties bar** or by **popping up the asset panel**.

! [assets-panel](index/assets-panel.png)

## Batch operations

When you need to set **same type** asset properties in batch, you can press Shift in **Asset Explorer** and select multiple assets, **Inspector** will show the number of assets selected and the editable asset properties. Click the **Apply** button at the top right when you are done.

! [multiple-edit](index/multiple-edit1.png)

Batch modification of node properties is the same. However, if an attribute in the **attribute inspector** displays one of the following states, it means that the attribute has inconsistent attribute values across the multiple assets selected, and you can choose whether to continue to batch modify the attribute as needed.

- The check box displays **Grey**
- The input box displays **-**
- The selection box displays **blank**

> **Note**.
> 1. Bulk setting operations are not currently supported for Material assets.
> 2. **Assets of different types** can be selected at the same time, but they do not support setting properties in bulk.

## Edit Prefab node properties

The Prefab node functions in the **Inspector** top toolbar include: unassociate, locate asset, restore from asset, and update to asset. For details, see [Prefab Assets (Prefab)](... /... /asset/prefab.md).

! [prefab-menu](index/prefab-menu.png)

> **Note**: When editing the asset please note that you must remember to save it by clicking the **green tick** button in the upper right corner.
>
> ! [edit-assets](index/edit-assets.png)
 macos/deepLFree.translatedWithDeepL.text