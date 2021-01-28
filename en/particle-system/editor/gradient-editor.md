## Gradient Editor
The gradient editor can set the color of a certain property in the particle system that changes with time. The interface of the gradient editor is as follows:

![gradient_editor](img/gradient_editor.png)

The gradient editor can perform the following operations:

- Mode has two possible choices: Blend mode will be interpolated according to the two adjacent keyframes at the current time to get the color of the current frame. Fixed mode will directly use the color of the previous keyframe at the current time.
- Click an empty space above the ribbon to insert an alpha key frame, click an empty space below the ribbon to insert an rgb key frame.
- Drag the key frame to move left and right to adjust the key frame position, and drag the key frame to move up and down to delete the key frame.
- The corresponding rgb or alpha value can be edited in the Color / Alpha edit box.
- **Location** can edit the position of the selected key frame.