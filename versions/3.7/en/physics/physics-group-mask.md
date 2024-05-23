# Group and Mask

Group and masks are necessary for physical collision detection between objects. A group can be simply treated as the group a collision object is in, and a mask can be simply treated as the grouping objects that the collision object needs to collide with.

## Collision Detection Principle

In Cocos Creator, collision detection is done in binary by bit, by "matching" the group value to the mask value to determine whether the condition is satisfied or not. The calculation of whether collision detection is allowed between objects is as follows:

```ts
(GroupA & MaskB) && (GroupB & MaskA)
```

As you can see from this formula, group A needs to be in the mask list of group B and group B needs to be in the mask list of group A in order for collision detection to occur between the two objects. How to combine the binary operation with the formula for allowing collision detection is the following part to understand. But before that, you need to configure [Collision Matrix](physics-configs.md#collision-matrix) in **Project Settings -> Physics -> Collision Matrix**.

![set-collider-config](img/set-collider-config.png)

According to the configuration above, Cocos Creator will parse the data into the following values (shown here only for the part of the explanation).

- **DEFAULT**: **Index** value is `0`, the actual value of grouping is `1<<0=1`, the binary value is `0000 0001`; the actual value of mask value is `1<<0=1`, the binary value is `0000 0001`.
- **SELF_PLANE**: **Index** value is `1`, the actual value of grouping is `1<<1=2`, the binary value is `0000 0010`; the actual value of mask value is `(1<<3)+(1<<4)=24`, the binary value is `0001 1000`.
- **ENEMY_BULLET**: **Index** value is `4`, the actual value of the grouping is `1<<4=16`, the binary value is `0001 0000`; the actual value of the mask value is `1<<1=2`, the binary value is `0000 0010`.

Based on the data it is possible to do a calculation of whether there is a collision between the groups:

- Does the group **SELF_PLANE** collide with the group **DEFAULT**?

  ![cant-collider](img/cant-collider.png)

  The final value based on the above calculation is `0`, so there is no collision between the two groups.

- Whether the group **SELF_PLANE** collides with the group **ENEMY_BULLET**?

  ![can-collider](img/can-collider.png)

  The final value based on the above calculation is greater than `0`, so there will be a collision between the two groups.

> **Note**: `<<` The left shift operator, which is a type of bitwise operator, shifts to the left by pushing in 0 from the right and shedding the leftmost bit.s

## Dynamically Set Group and Masks

### Define Groups

Usually, in game development, you need to set collision-ready groups before the collision occurs and handle the related logic when the collision occurs. In Cocos Creator, all collision data is obtained as numeric values, which is not conducive to judgment during development. Therefore, it is possible to clearly know the meaning of each string of numbers by defining grouping objects or enumerations.

In can use the left shift operator (<<) to set the group or mask, and the corresponding value of either grouping object or grouping enumeration should be the same as the value defined in the collision matrix, otherwise there may be data inconsistency, which leads to judgment failure.

Way 1: Defined in an **object**

```ts
export const PHY_GROUP = {
    DEFAULT: 1 << 0,
    SELF_PLANE: 1 << 1,
    ENEMY_PLANE = 1 << 2,
    SELF_BULLET = 1 << 3,
    ENEMY_BULLET = 1 << 4,
    BULLET_PROP = 1 << 5,
};
```

Way 2: Defined in a **enum**

```ts
enum PHY_GROUP {
    DEFAULT = 1 << 0,
    SELF_PLANE = 1 << 1,
    ENEMY_PLANE = 1 << 2,
    SELF_BULLET = 1 << 3,
    ENEMY_BULLET = 1 << 4,
    BULLET_PROP = 1 << 5,
};

// If the enum needs to be displayed in the Inspector panel, you need to import the Enum function from the cc module and register the defined enum into the editor
Enum(PHY_GROUP);
```

> **Note**: For historical reasons, the **Enum** function has special treatment for **-1**, so do not define properties with values of **-1** if you are not familiar with them.

### Set/Get Group

```ts
// This case uses the enumeration defined in the "Define Groups" section above
const rigid = this.getComponent(RigidBody);
// Equivalent to rigid.setGroup(1 << 1) or rigid.setGroup(1)
rigid.setGroup(PHY_GROUP.SELF_PLANE);

const group = rigid.getGroup();
```

### Add/Remove Groups

```ts
// If the current group is not defined in the collision matrix, it can also be added dynamically
const group = 1 << 7;
const rigid = this.getComponent(RigidBody);
rigid.addGroup(group);
rigid.removeGroup(group);
```

### Set/Get Mask

```ts
const rigid = this.getComponent(RigidBody);
const mask = (1 << 0) + (1 << 1); // Equivalent to 1 << 0 | 1 << 1
rigid.setMask(mask);
rigid.getMask();
```

> **Note**: Here you need to pay attention to the priority of the operator. For example, 3 + 1 << 2 and 3 + (1 << 2) do not compute equal values, and the operator + has a higher priority than <<.

#### Using Masks

Masks can be defined based on grouping, e.g.

- Define a mask that detects only **DEFAULT** `const maskForGroup1 = PHY_GROUP.DEFAULT;`
- Define a mask that detects **DEFAULT** and **SELF_PLANE** `const maskForGroup01 = PHY_GROUP.DEFAULT | PHY_GROUP.SELF_PLANE;`
- Define a mask that is not detected by all groups `const maskForNone = 0;`
- Define a mask that is detected by all groups `const maskForAll = 0xffffffff;`

### View Group or Mask in Binary

See the binary string representation by `(value >>> 0).toString(2)`.

![View binary](img/mask-all.jpg)
