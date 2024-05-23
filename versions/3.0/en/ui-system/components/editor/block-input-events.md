# BlockInputEvents Component Reference

The __BlockInputEvents__ component will intercept all input events (mouse and touch events) in the bounding box of the node to which it belongs, preventing input from penetrating to the lower-level nodes, generally used in the background of the upper-level UI.

When we make a pop-up UI dialog, the background of the dialog does not intercept events by default. That is, although the background is blocking the game scene, when clicked or touched on the background, the blocked game element underneath will still respond to the click event. At this point we can avoid this by simply adding the __BlockInputEvents__ component to the node where the background is located.

This component does not have any API interface and is effective when added directly to a scene.
