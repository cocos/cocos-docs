# Basic Node and Component API

We learned how to get access to node and component instances with previous article [Access node and other component](access-node-component.md). Now we will go through useful node and component API. This article works together with [cc.Node](http://www.cocos2d-x.org/docs/api-ref/creator/v1.3/classes/Node.html) and [cc.Component](http://www.cocos2d-x.org/docs/api-ref/creator/v1.3/classes/Component.html) API reference.

## Node active state and hierarchy

Let's assume we are at a component script and use `this.node` to access current node.

### Activate/Deactivate node

The node is active by default, we can set its activation state in the code by setting the node's `active` property.

`this.node.active = false;`

The effect of setting the `active` property is the same as switching the activation and shutdown status of the node in the editor.  When a node is closed, all of its components are disabled. At the same time, all of its child nodes and the components on the child nodes are also disabled. Note that when the child nodes are disabled, they do not change their `active` properties, so they return to their original state when the parent node is reactivated.

In other words, `active` is actually the activation state of the node itself, and whether the node is currently active depends on its parent node. And if it is not in the current scene, it cannot be activated. We can determine whether it is currently active through the read-only attribute `activeInHierarchy` on the node.

`this.node.active = true;`

If the node was previously in an active state, modifying `active` to true immediately triggers the activation action:

- Reactivate the node in the scene, and all child nodes that are active to true under the node
- Enable all components on current node and all child nodes, meaning `update` method in these components will be called in every frame.
- If there's an `onEnable` method in these component, it will be called.

`this.node.active = false;`

If the node was previously activated, modifying `active` to false immediately triggers the close action:

- Hide current node and all child nodes in scene.
- Disable all components on current node and all child nodes, meaning `update` method in these components will not be called.
- If there's an `onDisable` method in these component, it will be called.

### Change node's parent

Assume the parent node is `parentNode`, child node is `this.node`

You can do:

```js
this.node.parent = parentNode;
```

or

```js
this.node.removeFromParent(false);
parentNode.addChild(this.node);
```

These two method have equal effect.

Notice:
- `removeFromParent` usually need to pass a `false`, otherwise it will clear all the events and actions on the node.
 - creating a new node with [Creating and Destroying Nodes](create-destroy.md) section, you'll need to give the newly created node a parent to initialize it properly.

### Access child node

`this.node.children` will return all child nodes of current node.<br>
`this.node.childrenCount` will return the number of child nodes.

**Notice** the above API will only count direct children, not grand children.

## Update node transform (position, rotation, scale, size)

### Position

You can assign value to `x` and `y`:

`this.node.x = 100;`<br>
`this.node.y = 50;`

or use `setPosition` method:

`this.node.setPosition(100, 50);`<br>
`this.node.setPosition(cc.v2(100, 50));`

or set `position` value:

`this.node.position = cc.v2(100, 50);`

All above will give you the same result.

### Rotation

`this.node.rotation = 90;`

or

`this.node.setRotation(90);`

### Scale

`this.node.scaleX = 2;`<br>
`this.node.scaleY = 2;`

or

`this.node.setScale(2);`<br>
`this.node.setScale(2, 2);`

If you pass only one parameter to `setScale`, both `scaleX` and `scaleY` will be changed.

### Size（width and height）

`this.node.setContentSize(100, 100);`<br>
`this.node.setContentSize(cc.size(100, 100));`

or

`this.node.width = 100;`<br>
`this.node.height = 100;`


### Anchor Point

`this.node.anchorX = 1;`<br>
`this.node.anchorY = 0;`

or

`this.node.setAnchorPoint(1, 0);`

All above transform changes will affect renderer component on the node, such as Sprite and Label.


## Color and Opacity

When using basic renderer component like Sprite and Label, make sure you change the color or opacity on the node, since these API are taken out of components.

If we have a Sprite instance `mySprite`, to change its color:

`mySprite.node.color = cc.Color.RED;`

opacity:

`mySprite.node.opacity = 128;`


## Useful common component API

`cc.Component` is the base class for all components, so we can use all the following API (in the component script `this` is the instance of component):

- `this.node`: The node instance current component is attached to.
- `this.enabled`: When set to true, the `update` method will be called each frame, for renderer components this can be used as a display switch.
- `update(dt)`: As a member method of component, will be called each frame when `enabled` property is set to `true`.
- `onLoad()`: Will be called when the component is first loaded and initialized (when the node is inserted into the node tree)
- `start()`: Will be called before the first `update` run, usually used to initialize some logic which need to be called after all components' `onload` methods called.

---

More details about component member method please read [Life Cycle Callbacks](life-cycle-callbacks.md).
