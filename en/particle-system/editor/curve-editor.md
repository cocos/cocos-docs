# Curve Editor

The curve editor can set the curve of a certain property in the particle system with time. The abscissa represents the unitized life cycle of a particle. For example, the life cycle of a particle is 5s, then 0.5 represents 2.5s. The ordinate represents the attribute value, and the ordinate interval can be adjusted through the upper edit bar. The default interval is **[0, 1]** or **[-1, 1]**.

The interface of the curve editor is as follows:

![curve_editor](img/curve_editor.png)

The curve editor can perform the following operations:

- The ordinate interval can be adjusted through the upper edit bar.
- Directly in the blank space, right-click on **Add Key Frame** to add a new key frame point and connect the curve.
- Right-click the key frame and select **Delete Key Frame** in the menu to delete it.
- Right-click a point on the curve or the blank space to add a keyframe.
- Drag the key frame to change its coordinates.
- You can change the slope of this point by turning the line segment next to the key frame.
- There is a built-in curve template on the right side of the editor. Click a template to apply it directly to the current curve.
