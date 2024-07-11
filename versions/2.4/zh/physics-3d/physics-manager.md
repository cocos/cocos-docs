# 3D 物理系统管理器

物理系统（Physics3DManager）可以模拟真实的物理行为进行碰撞检测以及计算物体的受力情况，然后将模拟结果反馈给渲染层。

## 开启 3D 物理系统

3D 物理系统默认是关闭的，如果需要使用可以通过以下命令行开启，否则运行时不会产生任何效果。

```javascript
cc.director.getPhysics3DManager().enabled = true;
```

## 3D 物理系统属性与接口

| 属性        | 功能说明                           |
| ---------- | -----------                       |
| enabled    | 是否开启物理系统，默认为 false        |
| allowSleep | 是否允许物理系统自动休眠，默认为 true   |
| maxSubStep | 物理每帧模拟的最大子步数，默认为 2      |
| deltaTime  | 物理每步模拟消耗的时间，默认为 1/60 秒  |
| gravity    | 物理世界的重力值，默认为 (0, -10, 0)  |

API 接口相关可参考 [Physics3DManager](%__APIDOC__%/zh/classes/Physics3DManager.html)。

**注意**：Builtin 物理引擎不支持以上与物理模拟相关的属性。

## 射线检测

射线检测用来检测给定的线段穿过哪些碰撞体。支持以下两种类型：

- **cc.director.getPhysics3DManager().raycast**

  通过 `cc.director.getPhysics3DManager().raycast` 接口，检测射线路径上所有与射线发生碰撞的碰撞体，检测到的结果顺序不是固定的。

    - 若没有检测到任何碰撞体，则返回 `null`。
    - 若有，则返回一个包含所有碰撞结果的数组。具体的内容可参考 API 文档 [raycast](%__APIDOC__%/zh/classes/Physics3DManager.html#raycast)。

    代码示例：

    ```javascript
    onTouchStart (event) {
        let touchLoc = event.touch.getLocation();
        let ray = cc.Camera.main.getRay(touchLoc);
        let maxDistance = 1000;
        let rayColliderGroupName = "ray collider group name";
        const results = cc.director.getPhysics3DManager().raycast(ray, rayColliderGroupName, maxDistance);
        if (results) {
            console.log(results);
        }
    }
    ```

- **cc.director.getPhysics3DManager().raycastClosest**

  通过 `cc.director.getPhysics3DManager().raycastClosest` 接口，检测射线路径上所有与射线发生碰撞的距离最短的碰撞体。

    - 若没有检测到任何碰撞体，则返回 `null`。
    - 若有，则返回符合要求的碰撞体，用法与 `raycast` 接口类似。具体内容可参考 API 文档 [raycastClosest](%__APIDOC__%/zh/classes/Physics3DManager.html#raycastclosest)。

    代码示例：

    ```javascript
    onTouchStart (event) {
        let touchLoc = event.touch.getLocation();
        let ray = cc.Camera.main.getRay(touchLoc);
        let maxDistance = 1000;
        let rayColliderGroupName = "ray collider group name";
        const result = cc.director.getPhysics3DManager().raycastClosest(ray, rayColliderGroupName, maxDistance);
        if (result) {
            console.log(result);
        }
    }
    ```
