# BlockInputEvents component reference

The BlockInputEvents component will block all input events (mouse and touch) within the bounding box of the node, preventing the input from penetrating into the underlying node, typically for the background of the top UI.

When we make a pop-up UI dialog, the background of the dialog will not intercept the input event by default. In other words, although its background blocks the game scene, when you click or touch the background, the underlying invisible game elements will still be unexpectedly respond to click events. In this case, we can avoid this by adding this component to the node on the background.

This component does not have any API interface and can be added directly to the scene to take effect.
