# Graphic system

This chapter will show the usage of Cocos Creator's graphic drawing component interface.

## Graphics API

### Path

Method | Function Description
| -------------- | ----------- |
| [moveTo (x, y)](../graphics/moveTo.md) | Move the path to a specified point in the canvas without creating a line
| [lineTo (x, y)](../graphics/lineTo.md) | Add a new point, and then create a line from the point to the last specified point in the canvas
| [bezierCurveTo (c1x, c1y, c2x, c2y, x, y)](../graphics/bezierCurveTo.md) | Create cubic cubic Bezier curve
| [quadraticCurveTo (cx, cy, x, y)](../graphics/quadraticCurveTo.md) | Create a second Bezier curve

| [arc (cx, cy, r, a0, a1, counterclockwise)](../graphics/arc.md) | Create arc / curve (for creating circle or part of a circle)
| [ellipse (cx, cy, rx, ry)](../graphics/ellipse.md) | create an ellipse
| [circle (cx, cy, r)](../graphics/circle.md) | create a circle
| [rect (x, y, w, h)](../graphics/rect.md) | create a rectangle
| [close ()](../graphics/close.md) | Create a path from the current point back to the starting point
| [stroke ()](../graphics/stroke.md) | Draw a defined path
| [fill ()](../graphics/fill.md) | Fill the current drawing (path)
| [clear ()](../graphics/clear.md) | Clear all paths

### Color, Style

Property | Description
| -------------- | ----------- |
| [lineCap](../graphics/lineCap.md) | Set or return the end of the line end style
| [lineJoin](../graphics/lineJoin.md) | the corner type created when setting or returning two lines intersecting
| [lineWidth](../graphics/lineWidth.md) | Sets or returns the current line width
| [miterLimit](../graphics/miterLimit.md) | Set or return the maximum miter length
| [strokeColor](../graphics/strokeColor.md) | Sets or returns the color of the stroke
| [fillColor](../graphics/fillColor.md) | Set or return the color of the fill painting

## Third Party Library

The Graphics component's API is designed according to the [Canvas] (http://www.w3school.com.cn/tags/html_ref_canvas.asp) drawing interface, and there are a lot of graphics libraries based on the Canvas drawing interface, such as [paper.js](http://paperjs.org/), [raphael.js](http://dmitrybaranovskiy.github.io/raphael/).
Using the standard canvas drawing interfaces and thrid party libraries, we can extend a lot of more advanced functions on the Graphics components.

Here are some third-party advanced drawing libraries and related demo based on Graphics component extensions.

### ccc.raphael

- Github: https: //github.com/2youyou2/ccc.raphael
- Demo: https: //github.com/2youyou2/raphael-example
- Feature (continually updated)
 - Line deformation
    <a href="ccc.raphael/animate-line.gif"> <img src = "ccc.raphael / animate-line.gif" style = "height: 180px; margin: 5px"> </a>
 - Dashed line
    <a href="ccc.raphael/dash-line.gif"> <img src = "ccc.raphael / dash-line.gif" style = "height: 180px; margin: 5px"> </a>
 - Simplify the path
    <a href="ccc.raphael/simplify.gif"> <img src = "ccc.raphael / simplify.gif" style = "height: 180px; margin: 5px"> </a>
 - Import svg
    <a href="ccc.raphael/tiger.png"> <img src = "ccc.raphael / tiger.png" style = "height: 180px; margin: 5px"> </a>