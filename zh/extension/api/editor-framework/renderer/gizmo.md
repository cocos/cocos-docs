# Editor.Gizmo

## Methods

### Editor.Gizmo.prototype.registerMoveSvg(svg, args, opts)

Register a moveable svg element. When the svg element is moved, the callback created from `onCreateMoveCallbacks` will be called.

- `svg` Svg Element - The svg element which can move.
- `args` Object | Array - The args will parse to callback, you can check which svg element is moved with the args.
- `opts` Object - The options you can set.
  - `cursor` String - The move mouse cursor.
  - `ignoreWhenHoverOther` Boolean - Will ignore the mouse down event on this svg element if hover on other svg element.

    ```javascript
    this.registerMoveSvg(moveRectSvg, 'move-rect');
    this.registerMoveSvg(moveAnchorSvg, 'move-anchor-rect');
    ```

### Editor.Gizmo.prototype.recordChanges()

Record undo changes, generally gizmo will record changes automatically.

### Editor.Gizmo.prototype.commitChanges()

Commit undo changes, generally gizmo will commit changes automatically

### Editor.Gizmo.prototype.adjustValue(targets, keys, minDifference)

Adjust value to avoid value's fractional part to be too long.

- `targets` [Object] - The target which should adjust.
- `keys` String (optional) - If not specified, then will adjust all available properties on target.
- `minDifference` Number (optionnal) - The decimal precision, default is `Editor.Gizmo.prototype.defaultMinDifference()`

```javascript
this.adjustValue(this.node, ['position']);
```

### Editor.Gizmo.prototype.worldToPixel(position)

Convert cocos2d world position to svg position.

### Editor.Gizmo.prototype.pixelToWorld(position)

Convert svg position to cocos2d world position.

### Editor.Gizmo.prototype.sceneToPixel(position)

Convert cocos2d scene position to svg position.

### Editor.Gizmo.prototype.pixelToScene(position)

Convert svg position to cocos2d scene position.

## Inherit Methods

### Editor.Gizmo.prototype.init()

Call when init a gizmo, you can reimplement this function to do your self init.

Default implement:

```javascript
init () {
    // init logic
}
```

### Editor.Gizmo.prototype.layer()

There three layer types now: background, scene, foreground, generally we add gizmo to scene layer.

Default implement:

```javascript
layer () {
    return 'scene';
}
```

### Editor.Gizmo.prototype.visible()

Whether the gizmo is visible, if you want the gizmo always be visible, then return true.

Default implement:

```javascript
visible () {
    return this.selecting || this.editing;
}
```

### Editor.Gizmo.prototype.dirty()

Whether the gizmo is dirty, the gizmo will only update when gizmo is dirty. If you want to update gizmo every frame then `return true`.

Default implement:

```javascript
dirty () {
    return this._viewDirty() || this._nodeDirty() || this._dirty;
}
```

### Editor.Gizmo.prototype.onCreateRoot()

This function will call when create the root svg element for a gizmo.
You can implement this function to custom your gizmo creation.

```javascript
onCreateRoot () {
    // your implement
    var tool = this._root.group();
}
```

### Editor.Gizmo.prototype.onCreateMoveCallbacks()

This callback return from the function will call when the moveable svg element is moved.

The callback should include methods with:

- start(x, y, event, ...args) - Called when mouse press on the svg
  - `x` Number - Press x position
  - `y` Number - Press y position
  - `event` MouseEvent - The mouse event
  - `args` - The arguments parsed from `registerMoveSvg`
- update(dx, dy, event, ...args) - Called when mouse move on the svg
  - `dx` Number - Horizontal move distance from current mouse position to start mouse position
  - `dy` Number - Vertical move distance from current mouse position to start mouse position
  - `event` MouseEvent - The mouse event
  - `args` - The arguments parsed from `registerMoveSvg`
- end(updated, event, ...args) - Called when mouse release on the svg
  - `updated` Boolean - Whether the mouse moved
  - `event` MouseEvent - The mouse event
  - `args` - The arguments parsed from `registerMoveSvg`

```javascript
onCreateMoveCallbacks () {
    return {
        start: (x, y, event, ...args) => {

        },
        update: (dx, dy, event, ...args) => {

        },
        end: (updated, event, ...args) => {

        }
    };
}
```

### Editor.Gizmo.prototype.defaultMinDifference()

Used for `Editor.Gizmo.prototype.adjustValue`.

The default min difference will be:

```javascript
defaultMinDifference() {
    return Editor.Math.numOfDecimalsF(1.0/this._view.scale);
}
```

## Properties

### Editor.Gizmo.prototype.node

Get node of the gizmo.

### Editor.Gizmo.prototype.nodes

Get current nodes of the gizmo.

### Editor.Gizmo.prototype.topNodes

Get current top nodes of the gizmo.

### Editor.Gizmo.prototype.selecting

Whether the gizmo is selecting.

### Editor.Gizmo.prototype.editing

Whether the gizmo is editing.

### Editor.Gizmo.prototype.hovering

Whether the gizmo is hovering.
