# 碰撞系统脚本控制

Cocos Creator 中内置了一个简单易用的碰撞检测系统，它会根据添加的碰撞组件进行碰撞检测。当一个碰撞组件被启用时，这个碰撞组件会被自动添加到碰撞检测系统中，并搜索能够与它进行碰撞的其他已添加的碰撞组件来生成一个碰撞对。需要注意的是，一个节点上的碰撞组件，无论如何都是不会相互进行碰撞检测的。

## 碰撞检测系统的使用

### 碰撞系统接口

获取碰撞检测系统

```javascript
var manager = cc.director.getCollisionManager();
```

默认碰撞检测系统是禁用的，如果需要使用则需要以下方法开启碰撞检测系统

```javascript
manager.enabled = true;
```

默认碰撞检测系统的 debug 绘制是禁用的，如果需要使用则需要以下方法开启 debug 绘制：

```javascript
manager.enabledDebugDraw = true;
```

开启后在运行时可显示 **碰撞组件** 的 **碰撞检测范围**，如下图：

![](collision-manager/draw-debug.png)

如果还希望显示碰撞组件的包围盒，那么可以通过以下接口来进行设置：

```javascript
manager.enabledDrawBoundingBox = true;
```

结果如下图所示：

![](collision-manager/draw-bounding-box.png)

### 碰撞系统回调

当碰撞系统检测到有碰撞产生时，将会以回调的方式通知使用者，如果产生碰撞的碰撞组件依附的节点下挂的脚本中有实现以下函数，则会自动调用以下函数，并传入相关的参数。

```javascript
/**
 * 当碰撞产生的时候调用
 * @param  {Collider} other 产生碰撞的另一个碰撞组件
 * @param  {Collider} self  产生碰撞的自身的碰撞组件
 */
onCollisionEnter: function (other, self) {
    console.log('on collision enter');

    // 碰撞系统会计算出碰撞组件在世界坐标系下的相关的值，并放到 world 这个属性里面
    var world = self.world;

    // 碰撞组件的 aabb 碰撞框
    var aabb = world.aabb;

    // 节点碰撞前上一帧 aabb 碰撞框的位置
    var preAabb = world.preAabb;

    // 碰撞框的世界矩阵
    var t = world.transform;

    // 以下属性为圆形碰撞组件特有属性
    var r = world.radius;
    var p = world.position;

    // 以下属性为 矩形 和 多边形 碰撞组件特有属性
    var ps = world.points;
},
```

```javascript
/**
 * 当碰撞产生后，碰撞结束前的情况下，每次计算碰撞结果后调用
 * @param  {Collider} other 产生碰撞的另一个碰撞组件
 * @param  {Collider} self  产生碰撞的自身的碰撞组件
 */
onCollisionStay: function (other, self) {
    console.log('on collision stay');
},
```

```javascript
/**
 * 当碰撞结束后调用
 * @param  {Collider} other 产生碰撞的另一个碰撞组件
 * @param  {Collider} self  产生碰撞的自身的碰撞组件
 */
onCollisionExit: function (other, self) {
    console.log('on collision exit');
}
```

### 点击测试

```javascript
properties: {
    collider: cc.BoxCollider
},

start () {
    // 开启碰撞检测系统，未开启时无法检测
    cc.director.getCollisionManager().enabled = true;
    // cc.director.getCollisionManager().enabledDebugDraw = true;

    this.collider.node.on(cc.Node.EventType.TOUCH_START, function (touch, event) {
        // 返回世界坐标
        let touchLoc = touch.getLocation();
        // https://docs.cocos.com/creator/api/zh/classes/Intersection.html 检测辅助类
        if (cc.Intersection.pointInPolygon(touchLoc, this.collider.world.points)) {
            console.log("Hit!");
        }
        else {
            console.log("No hit");
        }
    }, this);
}
```

更多的范例可以到 [GitHub](https://github.com/cocos-creator/example-cases/tree/master/assets/cases/collider) | [Gitee](https://gitee.com/mirrors_cocos-creator/example-cases/tree/master/assets/cases/collider) 上查看。
