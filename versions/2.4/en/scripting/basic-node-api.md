# Basic Node and Component API

We learned how to get access to node and component instances with previous article [Access node and other component](access-node-component.md). Now we will go through useful node and component API. This article works together with [cc.Node](../../../api/en/classes/Node.html) and [cc.Component](../../../api/en/classes/Component.html) API reference.

## Node active state and hierarchy

Let's assume we are at a component script and use `this.node` to access current node.

### Activate/Deactivate node

The node is active by default, we can set its activation state in the code by setting the node's `active` property.

```js
this.node.active = false;
```

The effect of setting the `active` property is the same as switching the activation and deactivation status of the node in the editor. When a node is deactivated, all of its components are disabled. At the same time, all of its child nodes and the components on the child nodes are also disabled. Note that this does not change the value of the `active` property on the child nodes, so they will return to their original state once the parent is reactivated.

In other words, `active` is actually the activation state of the node **itself**, and whether the node is **currently** active depends on its parent node. And if it is not in the current scene, it cannot be activated. We can determine whether it is currently active through the read-only property `activeInHierarchy` on the node.

```js
this.node.active = true;
```

If the node was previously in the state that **can be activated**, modifying `active` to true immediately triggers the activation action:

- Reactivate the node in the scene, and all its child nodes that have the active property set to true.
- Enable all components on current node and all child nodes, meaning `update` method in these components will be called in every frame.
- If there's an `onEnable` method in these component, it will be called.

```js
this.node.active = false;
```

If the node was previously activated, modifying `active` to false immediately triggers the deactivation action:

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

> **Notes**:
>
> 1. `removeFromParent` usually need to pass a `false`, otherwise it will clear all the events and actions on the node.
> 2. Creating a new node with [Creating and Destroying Nodes](create-destroy.md) section, you'll need to give the newly created node a parent to initialize it properly.

### Access child node

- `this.node.children` will return all child nodes of current node.
- `this.node.childrenCount` will return the number of child nodes.

**Notice** the above API will only count direct children, not grand children.

## Update node transform (position, rotation, scale, size)

### Position

You can assign value to `x` and `y`:

```js
this.node.x = 100;
this.node.y = 50;
```

or use `setPosition` method:

```js
this.node.setPosition(100, 50);
this.node.setPosition(cc.v2(100, 50));
```

or set `position` value:

```js
this.node.position = cc.v2(100, 50);
```

All above will give you the same result.

### Rotation

```js
this.node.rotation = 90;
```

or

```js
this.node.setRotation(90);
```

### Scale

```js
this.node.scaleX = 2;
this.node.scaleY = 2;
```

or

```js
this.node.setScale(2);
this.node.setScale(2, 2);
```

If you pass only one parameter to `setScale`, both `scaleX` and `scaleY` will be changed.

### Size (width and height)

```js
this.node.setContentSize(100, 100);
this.node.setContentSize(cc.size(100, 100));
```

or

```js
this.node.width = 100;
this.node.height = 100;
```

### Anchor Point

```js
this.node.anchorX = 1;
this.node.anchorY = 0;
```

or

```js
this.node.setAnchorPoint(1, 0);
```

All above transform changes will affect renderer component on the node, such as Sprite and Label.

## Color and Opacity

When using basic renderer component like Sprite and Label, make sure you change the color or opacity on the node, since these API are taken out of components.

If we have a Sprite instance `mySprite`, to change its color:

```js
mySprite.node.color = cc.Color.RED;
```

opacity:

```js
mySprite.node.opacity = 128;
```

## Useful common component API

`cc.Component` is the base class for all components, so we can use all the following API (in the component script `this` is the instance of component):

- `this.node`: The node instance current component is attached to.
- `this.enabled`: When set to true, the `update` method will be called each frame, for renderer components this can be used as a display switch.
- `update(dt)`: As a member method of component, will be called each frame when `enabled` property is set to `true`.
- `onLoad()`: Will be called when the component is first loaded and initialized (when the node is inserted into the node tree)
- `start()`: Will be called before the first `update` run, usually used to initialize some logic which need to be called after all components' `onload` methods called.
