# 物理材质

在 Cocos Creator 中物理材质是一种资源，它记录了物体的表面信息，这些信息用来计算碰撞物体受到的摩擦力和弹力等。

## 属性

物理材质属性如下图所示：

![物理材质](img/physic-material.jpg)

属性 | 解释
---|---
friction | 摩擦系数
restitution | 回弹系数

当与其它表面接触时，这些系数用于计算相应的摩擦力和弹力。

## 创建

物理材质可以通过两种方式创建：

1. 编辑器内创建
2. 代码实例化

用编辑器创建的方式如下图所示：

![创建物理材质](img/create-pmtl.jpg)

代码中实例化：

```ts
let newPmtl = new PhysicMaterial();
newPmtl.friction = 0.1;
newPmtl.restitution = 0.1;
```

## 应用

目前物理材质以碰撞体为单位进行设置，每个 __Collider__ 都具有一个 __material__ 的属性（不设置时，__Collider__ 将会引用物理系统中的默认物理材质）。
应用到 __Collider__ 同样也分编辑器操作和代码操作两种方式。

编辑器内操作，只需要将资源拖入到`cc.PhysicMaterial`属性框中即可，如下图所示：

![应用物理材质](img/apply-pmtl.jpg)

代码中操作：

```ts
const collider = this.node.getComponent(Collider);
collider.material = newPmtl;
```

因为[材质共享](physics-collider.md##物理材质)的设计，实际在代码中可以直接这样操作（因为在获取 `material` 时会创建一个实例）

```ts
collider.material.friction = 0.1;
collider.material.restitution = 0.1;
```
