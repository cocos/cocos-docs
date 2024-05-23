# 物理材质

物理材质是一种资源，它记录了物体的物理属性，这些信息用来计算碰撞物体受到的摩擦力和弹力等。

## 创建物理材质

### 在编辑器内创建

在 **属性检查器** 内右键任意空白处或点击 **+** 号间都可以创建物理材质：

![创建物理材质](img/material-create-pmtl.png)

### 通过代码创建

也可通过代码实例化物理材质：

```ts
import { PhysicsMaterial } from 'cc';

let newPMtl = new PhysicsMaterial();
newPMtl.friction = 0.1;
newPMtl.rollingFriction = 0.1;
newPMtl.spinningFriction = 0.1;
newPMtl.restitution = 0.5;
```

## 属性

物理材质属性如下图所示：

![物理材质](img/physics-mat-panel.png)

| 属性 | 属性说明 |
| :-- | :-- |
| Friction | 摩擦系数 |
| RollingFriction | 滚动摩擦系数 |
| SpinningFriction | 自旋摩擦系数 |
| Restitution | 回弹系数 |

当与其它表面接触时，这些系数用于计算相应的摩擦力和弹力。

## 应用

目前物理材质以碰撞体为单位进行设置，每个 **Collider** 都具有一个 **Material** 的属性（不设置时， **Collider** 将会引用物理系统中的默认物理材质）。

应用到 **Collider** 同样也分编辑器操作和代码操作两种方式。

编辑器内操作，只需要将资源拖入到 **cc.PhysicMaterial** 属性框中即可，如下图所示：

![应用物理材质](img/apply-pmtl.jpg)

在代码中操作：

```ts
import { Collider } from 'cc';

let collider = this.node.getComponent(Collider);
if (collider) {
    collider.material = newPMtl;
    collider.material.rollingFriction = 0.1;
}
```

## 共享材质

在物理系统中，物理材质拥有共享材质和独享材质两种状态。

- 共享材质：不同的碰撞体，共用同一个材质，对该材质的修改会影响到所有持有该材质的碰撞体。在默认情况下，碰撞体的物理材质都通过引擎的默认物理材质初始化。通过 `sharedMaterial` 可以访问，代码示例如下：

    ```ts
    import { Collider } from 'cc';
    let collider = this.node.getComponent(Collider);
    if (collider) {        
        let sharedMaterial = collider.sharedMaterial; 
        // 或
        collider.sharedMaterial.friction = 0.5

        collider.sharedMaterial = newPMtl;
    }
    ```

- 独享材质：只供该碰撞体使用，修改该材质不会影响其他碰撞体。

  若一个碰撞体的物理材质处于共享状态，则在调用 `material` 的 `getter` 时，会生成新的物理材质。

  下列代码演示了当物理材质处于共享状态时，调用 `getter` 后，该碰撞体的材质变为独享状态。

    ```ts
    import { Collider } from 'cc';
    let collider = this.node.getComponent(Collider);
    if (collider) {
        const material = collider.material; 
    }
    ```