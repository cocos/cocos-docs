# 开发注意事项

## ReadOnly

由于 `Readonly` 是只读属性，不建议对其进行写操作。因此直接通过 `Readonly` 属性调用接口修改值的方式，不保证在各平台都会生效。

例如，节点的世界坐标系内的位置，是 `Readonly` 的：

```typscript
/**
* @en Position in world coordinate system
* @zh 世界坐标系下的坐标
*/
get worldPosition(): Readonly<math.Vec3>;
set worldPosition(val: Readonly<math.Vec3>);
```

在原生平台，此处 `add` 的结果不保存到 `worldPosition` 上：

```typescript
this.node.worldPosition.add(xxx); // 结果不会被保存！
```

为避免这种情况，可通过中间变量来传递，代码示例如下：

```typescript
let ret = this.node.worldPosition.add(diff.multiplyScalar(this.speedFactor));
this.node.setWorldPosition(ret);
```

常见属性包括但不限于以下所列的属性：`position`、`rotation`、`scale`、`worldPosition`、`worldRotation`、`worldScale`、`eulerAngles` 以及 `worldMatrix`，都建议采用上述方法使用。
