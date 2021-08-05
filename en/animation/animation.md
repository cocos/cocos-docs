# Animation Panel

Creator supports creating, editing and previewing animation clips directly in the **Animation** panel. In addition to animating the basic properties of nodes, it also supports animating the properties of materials and some components, and it can enrich animation clips by calling the event functions of the [animation event](animation-event.md).

To edit an **animation clip** using the **Animation** panel, You need to add an **animation component** to a node and attach the clip to the animation component. For details, please refer to the [Creating Animation Components and Animation Clips](animation-create.md) documentation.

![animation play](animation/animation-play.gif)

## Animation editing mode

The animation data in an animation clip can only be edited in **animation editing mode**. In animation editing mode, nodes cannot be added/deleted/renamed, etc., and property changes that are not recorded within animation keyframes will also be restored after exiting animation editing mode.

When in animation editing mode, nodes that are not involved in animation data editing are grayed out in the **Hierarchy** panel. When a node is selected in the **Animation** panel, the **Hierarchy** panel will highlight the corresponding node and vice versa.

![select node](./animation/select_node.gif)

**Opening the edit mode includes the following two ways**:
 
- Select a node with an Animation component in the **Hierarchy** panel that contains more than one clip file, then click the **Enter Animation Edit Mode** button in **Animation** panel.
- Shortcut <kbd>Ctrl/Cmd + E</kbd>

**Saving the edited animation data includes the following three ways**.

- Click the the ![save](./animation/save.png) Save button in the top right corner of the **Animation** panel
- Click the **Save** button in the top left corner of the **Scene** panel
- Shortcut <kbd>Ctrl/Cmd + S</kbd>

**Exit edit mode includes the following three ways**:

- Click the ![exit](./animation/exit.png) Exit button in the top right corner of the **Animation** panel
- Click the **Close** button in the top left corner of the **Scene** panel
- Shortcut <kbd>Ctrl/Cmd + E</kbd>
