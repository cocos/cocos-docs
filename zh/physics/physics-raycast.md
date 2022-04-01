# 射线检测

射线检测是对一条射线和另一个形状进行 **相交性判断**，如下图所示。

![图解](img/raycast.jpg)

## 构造射线

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

## 接口介绍

Cocos Creator 提供了一套基于物理引擎的射线检测功能。

目前接口由 [**PhysicsSystem**](__APIDOC__/zh/#/docs/3.4/zh/physics/classes/physicssystem.html) 提供，有以下两类：

- `raycast` : 检测所有的碰撞体，并记录所有被检测到的结果，通过 `PhysicsSystem.instance.raycastResults` 获取。接口返回布尔值，表示是否检测成功。
- `raycastClosest` ：检测所有的碰撞体，并记录与射线距离最短的检测结果，通过 `PhysicsSystem.instance.raycastClosestResult` 获取。同样返回布尔值，表示是否检测成功。

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
    const distance = raycastClosestResult;            
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

### 参数说明

- `worldRay`：世界空间下的射线
- `mask`：用于过滤的 [掩码](physics-group-mask.md)，可以传入需要检测的分组，默认为 0xffffffff
- `maxDistance`：最大检测距离，默认为 10000000，目前请勿传入 `Infinity` 或 `Number.MAX_VALUE`
- `queryTrigger`：是否检测触发器

### 返回结果说明

射线检测的结果由 [PhysicsRayResult](__APIDOC__/zh/#/docs/3.4/zh/physics/classes/physics.physicsrayresult.html) 进行存储，主要有以下信息：

- `collider`：击中的碰撞器
- `distance`：击中点与射线起点的距离
- `hitPoint`：击中点（世界坐标系中）
- `hitNormal`：击中点所处面的法线（世界坐标系中）
