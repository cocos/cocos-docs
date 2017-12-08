# Graphics component reference

The Graphics component provides a series of drawing interfaces that reference the canvas's drawing interface.

## Path

| Function |   Function Explanation
| -------------- | ----------- |
| [moveTo (x, y)](../render/graphics/moveTo.md)  | Move path start point to (x,y)
| [lineTo (x, y)](../render/graphics/lineTo.md) | Adds a straight line to the path
| [bezierCurveTo (c1x, c1y, c2x, c2y, x, y)](../render/graphics/bezierCurveTo.md) | Adds a cubic Bézier curve to the path
| [quadraticCurveTo (cx, cy, x, y)](../render/graphics/quadraticCurveTo.md) | Adds a quadratic Bézier curve to the path
| [arc (cx, cy, r, a0, a1, counterclockwise)](../render/graphics/arc.md) | Adds an arc to the path which is centered at (cx, cy) position with radius r starting at startAngle and ending at endAngle going in the given direction by counterclockwise (defaulting to false).
| [ellipse (cx, cy, rx, ry)](../render/graphics/ellipse.md) | Adds an ellipse to the path
| [circle (cx, cy, r)](../render/graphics/circle.md) | Adds an circle to the path
| [rect (x, y, w, h)](../render/graphics/rect.md) | Adds an rectangle to the path
| [close ()](../render/graphics/close.md) | Adds an round corner rectangle to the path
| [stroke ()](../render/graphics/stroke.md) | Draws a filled rectangle
| [fill ()](../render/graphics/fill.md) | Erasing any previously drawn content
| [clear ()](../render/graphics/clear.md) | Causes the point of the pen to move back to the start of the current path. It tries to add a straight line from the current point to the start

## Color, Style

| Function |   Function Explanation
| -------------- | ----------- |
| [lineCap](../render/graphics/lineCap.md) | lineCap determines how the end points of every line are drawn
| [lineJoin](../render/graphics/lineJoin.md) | lineJoin determines how two connecting segments (of lines, arcs or curves) with non-zero lengths in a shape are joined together
| [lineWidth](../render/graphics/lineWidth.md) | Current line width
| [miterLimit](../render/graphics/miterLimit.md) | Sets the miter limit ratio
| [strokeColor](../render/graphics/strokeColor.md) | stroke color
| [fillColor](../render/graphics/fillColor.md) | fill color

More information about **Graphics**, please go [Graphics](../render/graphics/index.md)
