# Custom Gizmo advanced

[Previous article](custom-gizmo.md) talked about how to customize a Gizmo that moves and zooms with nodes. This document introduces how to implement an editable Gizmo.

First, define the `offset` in the `CustomComponent` script of **Assets**:

```js
properties: {
    //...
    offset: cc.Vec2
},
```

Second, change `custom-gizmo.js` to the following content and save:

```javascript
let ToolType = {
    None: 0,
    Side: 1,
    Center: 2
};

class CustomGizmo extends Editor.Gizmo {
    init () {
        // Initialize some parameters
    }

    onCreateMoveCallbacks () {
        // Create gizmo operation callback

         // Declare some local variables
         let startOffset; // The offset of the circle recorded when the mouse is pressed
         let startRadius; // The radius of the circle recorded when the mouse is pressed
         let pressx, pressy; // record the mouse position when the mouse is pressed

        return {
            /**
             * Triggered when the mouse is pressed on the gizmo
             * @param x the x coordinate of the pressed point
             * @param y The y coordinate of the pressed point
             * @param event mousedown dom event
             */
            start: (x, y, event) => {
                startRadius = this.target.radius;
                startOffset = this.target.offset;
                pressx = x;
                pressy = y;
            },

            /**
             * Triggered when the mouse is pressed and moved on the gizmo
             * @param dx x displacement of mouse movement
             * @param dy y displacement of mouse movement
             * @param event mousedown dom event
            */
            update: (dx, dy, event, type) => {
                // Get the node that the gizmo is attached to
                let node = this.node;

                // Get the components attached to the gizmo
                let target = this.target;

                if (type === ToolType.Center) {
                    // Calculate the new offset
                    let mat4 = cc.vmath.mat4.create();
                    node.getWorldMatrix(mat4);
                    let t = cc.vmath.mat4.invert(mat4, mat4);
                    t.m12 = t.m13 = 0;

                    let d = cc.v2(dx, dy);
                    cc.vmath.vec2.transformMat4(d, d, t);
                    d.addSelf(startOffset);
                    target.offset = d;
                    this.adjustValue(target, 'offset');
                }
                else {
                    // Convert the coordinate point to the node
                    let position = node.convertToNodeSpaceAR(cc.v2(pressx + dx, pressy + dy));
                    // Calculate radius
                    target.radius = position.sub(startOffset).mag();
                    // Prevent too many decimal places of radius
                    this.adjustValue(target, 'radius');
                }
            },

            /**
             * Triggered when the gizmo lifts the mouse
             * @param event mousedown dom event
             */
            end: (updated, event) => {
            }
        };
    }

    onCreateRoot () {
        // Create a callback for the svg root node, you can create your svg tool here
        // 'this._root' can get the svg root node created by 'Editor.Gizmo'

        // Example:

        // Create an svg tool
        // group function documentation: http://documentup.com/wout/svg.js#groups
        this._tool = this._root.group();

        // Create a center drag area to manipulate the offset attribute
        let dragArea = this._tool.circle()
            // Set the fill style
            .fill( { color: 'rgba(0,128,255,0.2)' } )
            // Set the click area, here is the click according to the fill mode
            .style( 'pointer-events', 'fill' )
            // Set the mouse style
            .style( 'cursor', 'move' )
            ;

        // Register the svg element that listens to mouse movement events
        // 'ToolType.Center' is a custom parameter, which will be passed to the mobile callback
        // in the form of parameters in the mobile callback, so that it is convenient to
        // distinguish which svg element generated the current callback.
        // '{cursor: 'move'}' specify the type of mouse when moving
        this.registerMoveSvg( dragArea, ToolType.Center, {cursor: 'move'} );

        // Create an edge drag area to manipulate the radius property
        let circle = this._tool.circle()
            // Set the stroke style
            .stroke( { color: '#7fc97a', width: 2 } )
            // Set the click area, here is to click according to the stroke mode
            .style( 'pointer-events', 'stroke' )
            // Set the mouse style
            .style( 'cursor', 'pointer' )

        this.registerMoveSvg( circle, ToolType.Side, {cursor: 'pointer'} );

        // Define a drawing function for the tool, which is convenient for updating the 
        // drawing of svg in onUpdate.
        this._tool.plot = (radius, position) => {
            this._tool.move(position.x, position.y);
            dragArea.radius(radius);
            circle.radius(radius);
        };
    }

    onUpdate () {
        // Update svg tool

        // Get the components attached to the gizmo
        let target = this.target;

        // Get the node that the gizmo is attached to
        let node = this.node;

        // Get the world coordinates of the node
        let position = node.convertToWorldSpaceAR(target.offset);

        // Convert world coordinates to svg view
        // The coordinate system of svg view is not the same as the node coordinate 
        // system, here we use the built-in function to convert the coordinates
        position = this.worldToPixel(position);

        // Align the coordinates to prevent the svg from jittering due to accuracy issues
        position = Editor.GizmosUtils.snapPixelWihVec2( position );

        // Get the radius of the circle in world coordinates
        let p1 = node.convertToWorldSpaceAR(cc.v2(target.radius, 0));
        let p2 = node.convertToWorldSpaceAR(cc.v2(0, 0));
        let radius = p1.sub(p2).mag();

        // Align the coordinates to prevent the svg from jittering due to accuracy issues
        radius = Editor.GizmosUtils.snapPixel(radius);

        // Move the svg tool to the coordinates
        this._tool.plot(radius, position);
    }
}

module.exports = CustomGizmo;
```

Please refer to the [Gizmo Api](api/editor-framework/renderer/gizmo.md).

For additional Gizmo examples, please refer to the [Gizmo Examples](https://github.com/2youyou2/gizmo-example).
