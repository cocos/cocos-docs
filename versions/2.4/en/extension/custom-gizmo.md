# Custom Gizmo

Currently, Gizmo uses [svg.js](https://github.com/svgdotjs/svg.js) as the operating tool. For the specific API of `svg.js`, please refer to the [Gizmo](http://documentup.com/wout/svg.js) documentation.

## Creating a custom Gizmo

Let's demonstrate how to create a simple circle that can move and scale with the node:

First, create a new JavaScript script named **CustomComponent** in **Assets**, and add the following content:

```javascript
// Define a simple component and name it CustomComponent
cc.Class({
    extends: cc.Component,

    properties: {
        radius: 100
    },
});
```

Second, in the Creator menu bar, select **Extensions -> Create New Extension Plug-in -> For all projects (in user profile folder)/For current project (in project folder)** to create a new extension package and name it `custom-gizmo`.

Third, click **Project/App** in the upper right corner of Creator, add a file `custom-gizmo.js` under `packages -> custom-gizmo` directory, and add the following content:

```javascript
class CustomGizmo extends Editor.Gizmo {
    init () {
        // Initialize some parameters
    }

    onCreateRoot () {
        // Create a callback for the svg root node, you can create your svg tool here
         // 'this._root' can get the svg root node created by 'Editor.Gizmo'

         // Example:

         // Create an svg tool
         // 'group' function documentation: http://documentup.com/wout/svg.js#groups
        this._tool = this._root.group();

        // Draw a circle
         // 'circle' function documentation: http://documentup.com/wout/svg.js#circle
        let circle = this._tool.circle();

        // Define a drawing function for tool, which can be other names
        this._tool.plot = (radius, position) => {
            this._tool.move(position.x, position.y);
            circle.radius(radius);
        };
    }

    onUpdate () {
        // Update the svg tool in this function

        // Get the components attached to the gizmo
        let target = this.target;

        // Get the node that the gizmo is attached to
        let node = this.node;

        // Get the component radius
        let radius = target.radius;

        // Get the world coordinates of the node
        let worldPosition = node.convertToWorldSpaceAR(cc.v2(0, 0));

        // Convert world coordinates to svg view
        // The coordinate system of svg view is not the same as the node coordinate system,
        // Here we use the built-in function to convert the coordinates
        let viewPosition = this.worldToPixel(worldPosition);

        // Align the coordinates to prevent the svg from jittering due to accuracy issues
        let p = Editor.GizmosUtils.snapPixelWihVec2( viewPosition );

        // Get the radius of the circle in world coordinates
        let worldPosition2 = node.convertToWorldSpaceAR(cc.v2(radius, 0));
        let worldRadius = worldPosition.sub(worldPosition2).mag();
        worldRadius = Editor.GizmosUtils.snapPixel(worldRadius);

        // Move the svg tool to the coordinates
        this._tool.plot(worldRadius, p);
    }

// If you need to customize the timing of Gizmo display, just rewrite the 'visible' function
//    visible () {
//        return this.selecting || this.editing;
//    }

// Gizmo is created in which Layer: foreground, scene, background
// Created in scene Layer by default
//    layer () {
//        return 'scene';
//    }

// If Gizmo needs to participate in the click test, just rewrite the ’rectHitTest‘ function
//    rectHitTest (rect, testRectContains) {
//        return false;
//    }
}

module.exports = CustomGizmo;
```

## Register a custom Gizmo

Define the `gizmos` field in **package.json** in your custom **package**, and register the custom Gizmo, as shown below:

```json
"gizmos": {
    "CustomComponent": "packages://custom-gizmo/custom-gizmo.js"
}
```

- **CustomComponent**: Component name.
- **packages://custom-gizmo/custom-gizmo.js**: CustomGizmo path

This will register CustomGizmo to CustomComponent.

Then, select the node to add the gizmo in **Node Tree** panel, select **Add Component -> User Script Component -> CustomComponent** in the **Properties** panel, notice the gizmo display In the **Scene** panel. If the gizmo isn't seen, please refresh the editor or restart the editor.

Please read the next article [Custom Gizmo Advanced](custom-gizmo-advance.md).

Please refer to the [Gizmo API](api/editor-framework/renderer/gizmo.md).

For additional Gizmo examples, please refer to the [Gizmo Examples](https://github.com/2youyou2/gizmo-example).
