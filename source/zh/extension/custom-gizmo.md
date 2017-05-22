# 自定义 Gizmo

目前 Gizmo 使用 [svg.js](http://svgjs.com/) 作为操作工具, 具体 svg.js 的 api 可以参考 http://documentup.com/wout/svg.js

## 创建自定义 Gizmo

这里演示创建一个简单的跟着节点移动并缩放的圆

```javascript
// 定义一个简单的 component, 并命名为 CustomComponent
cc.Class({
    extends: cc.Component,

    properties: {
        radius: 100
    },
});
```

```javascript
class CustomGizmo extends Editor.Gizmo {
    init () {
        // 初始化一些参数
    }

    onCreateRoot () {
        // 创建 svg 根节点的回调，可以在这里创建你的 svg 工具
        // this._root 可以获取到 Editor.Gizmo 创建的 svg 根节点

        // 实例：

        // 创建一个 svg 工具
        // group 函数文档 : http://documentup.com/wout/svg.js#groups
        this._tool = this._root.group();

        // 画一个的圆
        // circle 函数文档 : http://documentup.com/wout/svg.js#circle
        let circle = this._tool.circle();

        // 为 tool 定义一个绘画函数，可以为其他名字
        this._tool.plot = (radius, position) => {
            this._tool.move(position.x, position.y);
            circle.radius(radius);
        };
    }

    onUpdate () {
        // 在这个函数内更新 svg 工具

        // 获取 gizmo 依附的组件
        let target = this.target;

        // 获取 gizmo 依附的节点
        let node = this.node;

        // 获取组件半径
        let radius = target.radius;

        // 获取节点世界坐标
        let worldPosition = node.convertToWorldSpaceAR(cc.p(0, 0));

        // 转换世界坐标到 svg view 上
        // svg view 的坐标体系和节点坐标体系不太一样，这里使用内置函数来转换坐标
        let viewPosition = this.worldToPixel(worldPosition);

        // 对齐坐标，防止 svg 因为精度问题产生抖动
        let p = Editor.GizmosUtils.snapPixelWihVec2( viewPosition );

        // 获取世界坐标下圆半径
        let worldPosition2 = node.convertToWorldSpaceAR(cc.p(radius, 0));
        let worldRadius = worldPosition.sub(worldPosition2).mag();
        worldRadius = Editor.GizmosUtils.snapPixel(worldRadius);

        // 移动 svg 工具到坐标
        this._tool.plot(worldRadius, p);
    }

// 如果需要自定义 Gizmo 显示的时机，重写 visible 函数即可
//    visible () {
//        return this.selecting || this.editing;
//    }

// Gizmo 创建在哪个 Layer 中 : foreground, scene, background
// 默认创建在 scene Layer
//    layer () {
//        return 'scene';
//    }

// 如果 Gizmo 需要参加 点击测试，重写 rectHitTest 函数即可
//    rectHitTest (rect, testRectContains) {
//        return false;
//    }
}

module.exports = CustomGizmo;
```

## 注册自定义 Gizmo

在你的自定义 **package** 里的 **package.json** 中定义 **gizmos** 字段, 并注册上你的自定义 Gizmo

```json
"gizmos": {
    "CustomComponent": "packages://custom-gizmo/custom-gizmo.js"
}
```

**CustomComponent** ：Component 名字   
**packages://custom-gizmo/custom-gizmo.js** ：CustomGizmo 路径

这样就将 CustomGizmo 注册到 CustomComponent 上了，当添加一个 CustomComponent 到节点上并选择这个节点时，就可以看到这个 gizmo 了。

请阅读下一篇 [自定义 Gizmo 进阶](custom-gizmo-advance.md)

更多 Gizmo Api 请参考 [Gizmo Api](api/editor-framework/renderer/gizmo.md)
更多 Gizmo 实例请参考 [Gizmo 实例](https://github.com/2youyou2/gizmo-example)
