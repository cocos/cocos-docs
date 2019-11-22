# 3D 碰撞系统管理器

碰撞系统（Collision3DManager）进行碰撞检测并触发碰撞事件。

## 碰撞系统相关设置

### 开启碰撞系统

碰撞系统默认是关闭的，如果需要使用碰撞系统，那么首先需要做的就是开启碰撞系统，否则运行时不会产生任何效果。

```javascript
cc.director.getCollision3DManager().enabled = true;
```

### 碰撞系统属性与接口

属性 | 功能说明
---|---
**enable** |  是否开启碰撞系统，默认为 false

#### 射线检测

通过 `cc.director.getCollision3DManager().raycast` 接口，检测所有与射线发生碰撞的碰撞盒，若没有检测到任何碰撞盒，则返回 null ，若有，则返回一个包含所有碰撞结果的数组，具体内容参考API文档。
```javascript
    onTouchStart (event) {
        let touchLoc = event.touch.getLocation();
        let ray = cc.Camera.main.getRay(touchLoc);
        let maxDistance = 1000;
        let rayColliderGroupName = "ray collider group name";
        const results = cc.director.getCollision3DManager().raycast(ray, rayColliderGroupName, maxDistance);
        if (results) {
            console.log(results);
        }
    }
```

通过 `cc.director.getCollision3DManager().raycastClosest` 接口，检测所有与射线发生碰撞的距离最短的碰撞盒，若没有检测到任何碰撞盒，则返回 null ，若有，则返回符合要求的碰撞盒，用法与 `raycast` 接口类似，具体内容参考API文档。