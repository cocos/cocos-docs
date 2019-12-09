# 3D 物理系统管理器

物理系统（Physics3DManager）模拟真实物理行为，进行碰撞检测及计算物体的受力情况，然后将模拟结果反馈给渲染层。

## 物理系统相关设置

### 开启物理系统

物理系统默认是关闭的，如需使用物理系统，必须开启物理系统，否则运行时不会产生任何效果。

```javascript
cc.director.getPhysics3DManager().enabled = true;
```

### 物理系统属性与接口

属性 | 功能说明
---|---
**enable** |  是否开启物理系统，默认为 false
**allowSleep** |  是否允许物理系统自动休眠，默认为 true
**maxSubStep** |  物理每帧模拟的最大子步数，默认为 2
**deltaTime** |  物理每步模拟消耗的时间，注意不是每帧，默认为 1 / 60
**gravity** |  物理世界的重力值，默认为 (0, -10, 0)

#### 射线检测

通过 `cc.director.getPhysics3DManager().raycast` 接口，检测所有与射线发生碰撞的碰撞盒，若没有检测到任何碰撞盒，则返回 null ，若有，则返回一个包含所有碰撞结果的数组，具体内容参考API文档。
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

通过 `cc.director.getPhysics3DManager().raycastClosest` 接口，检测所有与射线发生碰撞的距离最短的碰撞盒，若没有检测到任何碰撞盒，则返回 null ，若有，则返回符合要求的碰撞盒，用法与 `raycast` 接口类似，具体内容参考API文档。

