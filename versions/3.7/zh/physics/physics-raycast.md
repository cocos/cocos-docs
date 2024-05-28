# 射线和线段检测

本文将说明如何通过射线和线段对物理世界内的碰撞体进行检测。

## 射线检测

射线检测是对一条射线和另一个形状进行 **相交性判断**，如下图所示。

![图解](img/raycast.jpg)

### 构造射线

射线 **ray** 由 **起点** 和 **方向** 组成，构造一条射线有以下几种比较常见的方法：

1. 通过 **起点** + **方向**，**ray** 的构造函数或静态接口 `create`：

    ```ts
    import { geometry } from 'cc';

    // 构造一条从（0，-1，0）出发，指向 Y 轴的射线
    // 前三个参数是起点，后三个参数是方向
    const outRay = new geometry.Ray(0, -1, 0, 0, 1, 0);

    // 或者通过静态方法 create
    const outRay2 = geometry.Ray.create(0, -1, 0, 0, 1, 0);
    ```

2. 通过 **起点** + **射线上的另一点**，**ray** 的静态接口 `fromPoints`:

    ```ts
    import { geometry, math } from "cc";
    // 构造一条从原点出发，指向 Z 轴的射线
    const outRay = new geometry.Ray();
    geometry.Ray.fromPoints(outRay, math.Vec3.ZERO, math.Vec3.UNIT_Z);
    ```

3. 用相机构造一条从相机原点到屏幕某点发射出的射线：

    ```ts
    import { geometry, Camera } from "cc";
    // 以脚本挂载在 Camera 下为例
    const camera = this.node.getComponent(Camera);
    // 获得一条途径屏幕坐标（0，0）发射出的一条射线
    const outRay = new geometry.Ray();
    camera?.screenPointToRay(0, 0, outRay);
    ```

    > **注意**：
    > 1. 首先需要获取一个相机组件或者相机实例的引用。
    > 2. 相机组件和相机实例两者暴露的接口参数顺序不一样。

### 接口介绍

Cocos Creator 提供了一套基于物理引擎的射线检测功能。

目前接口由 [**PhysicsSystem**](%__APIDOC__%/zh/class/physics.PhysicsSystem) 提供，有以下两类：

- `raycast` : 检测所有的碰撞体，并记录所有被检测到的结果，通过 `PhysicsSystem.instance.raycastResults` 获取。接口返回布尔值，返回 `true` 表示射线是否和碰撞体相交。
- `raycastClosest` ：检测所有的碰撞体，并记录与射线距离最短的检测结果，通过 `PhysicsSystem.instance.raycastClosestResult` 获取。同样返回布尔值，表示是否和碰撞体相交。

> **注意**：
> 1. 检测的对象是物理碰撞器，在场景面板上与之对应的是碰撞器组件，例如 **BoxCollider**。
> 2. 检测结果返回对象是只读并且复用的，每次调用检测接口后会更新相应结果。

基于相机位置和屏幕坐标进行射线检测最近物体的常用示例：

```ts
let ray = new geometry.Ray();
this.camera.screenPointToRay(eventMouse.getLocationX(), eventMouse.getLocationY(), ray);
// 以下参数可选
const mask = 0xffffffff;
const maxDistance = 10000000;
const queryTrigger = true;

if (PhysicsSystem.instance.raycastClosest(ray, mask, maxDistance, queryTrigger)) {
    const raycastClosestResult = PhysicsSystem.instance.raycastClosestResult;
    const hitPoint = raycastClosestResult.hitPoint
    const hitNormal = raycastClosestResult.hitNormal;
    const collider = raycastClosestResult.collider;
    const distance = raycastClosestResult.distance;            
}
```

下列代码演示了如何检测多个物体：

```ts
const worldRay = new geometry.Ray(0, -1, 0, 0, 1, 0);
// 以下参数可选
const mask = 0xffffffff;
const maxDistance = 10000000;
const queryTrigger = true;

const bResult = PhysicsSystem.instance.raycast(worldRay, mask, maxDistance, queryTrigger);
if(bResult){
    const results = PhysicsSystem.instance.raycastResults;

    for (let i = 0; i < results.length; i++) {
        const result = results[i];
        const collider = result.collider;
        const distance = result.distance;
        const hitPoint = result.hitPoint;
        const hitNormal = result.hitNormal;
    }
}
```

#### 参数说明

- `worldRay`：世界空间下的射线
- `mask`：用于过滤的 [掩码](physics-group-mask.md)，可以传入需要检测的分组，默认为 0xffffffff
- `maxDistance`：最大检测距离，默认为 10000000，目前请勿传入 `Infinity` 或 `Number.MAX_VALUE`
- `queryTrigger`：是否检测触发器

#### 返回结果说明

射线检测的结果由 [PhysicsRayResult](%__APIDOC__%/zh/class/physics.PhysicsRayResult) 进行存储，主要有以下信息：

- `collider`：击中的碰撞器
- `distance`：击中点与射线起点的距离
- `hitPoint`：击中点（世界坐标系中）
- `hitNormal`：击中点所处面的法线（世界坐标系中）

## 线段检测

自 v3.7 起，Cocos Creator 支持线段/采样点检测。线段检测分为两个方法 `lineStripCast` 以及 `lineStripCastClosest`。

### 接口描述

该方法内部由 `raycast` 实现，通过定义 `samplePointsWorldSpace` 参数可以很方便的检测曲线是否有击中其他碰撞体。

```ts
lineStripCast (samplePointsWorldSpace: Array<Vec3>, mask = 0xffffffff, maxDistance = 10000000, queryTrigger = true): boolean;

lineStripCastClosest (samplePointsWorldSpace: Array<Vec3>, mask = 0xffffffff, maxDistance = 10000000, queryTrigger = true): boolean;
```

#### 参数说明

- `samplePointsWorldSpace`：世界空间下的采样点/直线段
- `mask`：用于过滤的 [掩码](physics-group-mask.md)，可以传入需要检测的分组，默认为 0xffffffff
- `maxDistance`：最大检测距离，默认为 10000000，目前请勿传入 `Infinity` 或 `Number.MAX_VALUE`
- `queryTrigger`：是否检测触发器

#### 返回结果说明

返回 true 时，表示曲线和碰撞体相交。结果存储在 `PhysicsSystem.Instance.lineStripCastResults` 以及
`PhysicsSystem.Instance.lineStripCastResults`，请参考下文：

### 使用方法

调用后如果方法返回 true，则可以通过 `lineStripCastClosestResult` 和 `lineStripCastResults` 获取检测结果。

```ts
if (PhysicsSystem.instance.lineStripCastClosest(sampleArray, ...)) {
    const result = PhysicsSystem.instance.lineStripCastClosestResult;
    ...    
}
```

检测的结果类型为 `PhysicsLineStripCastResult`，`PhysicsLineStripCastResult` 继承自 `PhysicsRayResult`，属性描述如下：

- `id`：发生相交时线段的索引
- `collider`：击中的碰撞器
- `distance`：击中点与射线起点的距离
- `hitPoint`：击中点（世界坐标系中）
- `hitNormal`：击中点所处面的法线（世界坐标系中）

`lineStripCast` 检测的结果是一个 `PhysicsLineStripCastResult` 类型的数组，属性描述如上所示，代码示例如下：

```ts
if (PhysicsSystem.instance.lineStripCast(sampleArray, ... )) {    
    const results = PhysicsSystem.instance.lineStripCastResults;
    for (let i = 0; i < results.length; i++) {
        const result = results[i];
        ...
    }
}
```

