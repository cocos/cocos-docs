# Development Notes

## ReadOnly

Since `Readonly` is a read-only property, it is not recommended to write to it. Therefore, calling the interface directly through the `Readonly` property to modify the value is not guaranteed to work across platforms.

For example, the position of a node in the world coordinate system is `Readonly` for.

```typescript
/**
* @en Position in world coordinate system
* @zh 世界坐标系下的坐标
*/
get worldPosition(): Readonly<math.Vec3>;
set worldPosition(val: Readonly<math.Vec3>);
```

In the native platform, the result of `add` here is not saved to `worldPosition`:

```typescript
this.node.worldPosition.add(xxx); // The results will not be saved!
```

To avoid this, it can be passed through an intermediate variable with the following code example:

```typescript
let ret = this.node.worldPosition.add(diff.multiplyScalar(this.speedFactor));
this.node.setWorldPosition(ret);
```

Common properties include, but are not limited to, those listed below: `position`, `rotation`, `scale`, `worldPosition`, `worldRotation`, `worldScale`, `eulerAngles`, and `worldMatrix`, all of which are recommended to be used in the above way.
