# Common Node and Component Interface

After obtaining a __Node__ or __Component__ instance through the method introduced in the [Access Node and Component](access-node-component.md) documentation, there are common interfaces that can be used to achieve the various effects needed through the node and component instance and it's operation. 

Please review the [Node](__APIDOC__/en/#/docs/3.3/en/scene-graph/Class/Node) and the [Component](__APIDOC__/en/#/docs/3.3/en/component/Class/Component) API documentation.

## Node Status and Level Operations

Suppose you are inside a running component script, to access a node inside the current script use `this.node`.

### Activating and Deactivating a Node

A node is activated by default. It's activation state can be changed  in code by setting the node's `active` property. Example:

```ts
this.node.active = false;
```

Setting the `active` property and switching the active and closed states of the node in the editor have the same effect. When a node is down, all its components will be disabled. At the same time, all its child nodes and components on the child nodes will also be disabled. It should be noted that when child nodes are disabled, their `active` properties are not changed, so they will return to their original state when the parent node is reactivated.

In other words, `active` actually represents the active state of the node **itself**, and whether this node **current** can be activated depends on its parent node. And if it is not in the current scene, it cannot be activated. We can use the read-only property `activeInHierarchy` on the node to determine whether it is currently activated. Example:

```ts
this.node.active = true;
```

If the node is in the **can be activated** state, modifying `active` to `true` will immediately trigger the following activation operations:

- Reactivate the node and all child nodes under the node whose active is true in the scene
- All components on this node and all child nodes will be enabled, and the update method in them will be executed every frame afterwards
- If there are `onEnable` methods on these components, these methods will be executed

  ```ts
  this.node.active = false;
  ```

If the node is already activated, changing `active` to `false` will immediately trigger the following shutdown operations:

- Hide the node and all child nodes under the node in the scene
- All components on this node and all child nodes will be disabled, that is, the code in `update` in these components will no longer be executed
- If there are `onDisable` methods on these components, these methods will be executed

### Change the Parent Node of a Node

Suppose the parent node is `parentNode` and the child node is `this.node`. 

This is valid:

```ts
// method 1
this.node.parent = parentNode;
```

This is also valid:

```ts
// method 2
this.node.removeFromParent();
parentNode.addChild(this.node);
```

These two methods are equivalent.

> **Notes**:
> 1. The `removeFromParent` usually needs to pass a `false`, otherwise it will empty the bound events and actions, etc. on the node by default.
> 2. After creating a new node through the method introduced in the [Create and Destroy Node](create-destroy.md) documentation, it is a **must** to set a parent node for the node to correctly initialize the node.

### Child Nodes of the Parent Node

`this.node.children` will return an array of all child nodes of the node.

`this.node.childrenCount` will return the number of children of the node.

> **Note**: the above two APIs will only return the direct child nodes of the node, not the child nodes of the child node.

## Changing Node Transformations (position, rotation, scaling)

### Changing Node Location

There are two ways:

1. Use the `setPosition` method:

    ```ts
    this.node.setPosition(100, 50, 100);
    // Or
    this.node.setPosition(new Vec3(100,50,100));
    ```

2. Setting the `position` variable:

    ```ts
    this.node.position = new Vec3(100,50,100);
    ```

The above two usages are equivalent.

### Changing Node Rotation

Example: 

```ts
this.node.setRotation(quaternion);
```

Or set local rotation by __Euler angle__:

```ts
this.node.setRotationFromEuler(90,90,90);
```

### Changing Node Scale

Example:

```ts
this.node.setScale(2,2,2);
```

## Common Component Interface

`Component` is the base class of all components, and any component includes the following common interfaces (assuming that we use this to refer to this component in the script of the component):

- `this.node`: The node instance to which this component belongs.
- `this.enabled`: Whether to execute the `update` method of the component every frame, and also to control whether the rendering component is displayed.
- `update(deltaTime: number)`: As a member method of the component, when the component's `enabled` property is `true`, the code in it will be executed every frame.
- `onLoad()`: Executed when the node where the component is located is initialized (when the node is added to the node tree).
- `start()`: It will be executed before the first `update` of the component, usually used for logic that needs to be executed after the `onLoad` of all components is initialized.
