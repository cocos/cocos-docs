# Arc

`arc()` method creates an arc / curve (used to create circles or partial circles).
Tip: To create a circle with `arc()`, set the start angle to 0 and the end angle to `2 * Math.PI`.

| Parameter | description
| -------------- | ----------- |
| x | The x coordinate of the center of the circle.
| y | The y coordinate of the center of the circle.
| r | radius of the circle.
| sAngle | starting angle in radians. (The arc's three o'clock position is 0 degrees).
| eAngle | end angle in radians.
| counterclockwise | Optional. Specifies whether draw the arc counterclockwise or clockwise. False = clockwise, true = counterclockwise.

## Example

```javascript
Var ctx = node.getComponent(cc.Graphics);
ctx.arc(100,75,50,0,1.5 * Math.PI);
ctx.stroke();
```

<a href="graphics/arc.png"> <img src = "graphics/arc.png"></a>

<hr>

Return to [Graphics component](index.md)