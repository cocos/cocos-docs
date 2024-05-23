# 自定义 Gizmo 进阶

[上一篇](custom-gizmo.md) 讲了如何自定义一个跟随节点移动并缩放的 Gizmo，这篇我们将实现一个可以编辑的 Gizmo

1、在 **资源管理器**的 `CustomComponent` 脚本中定义 offset：

```js
properties: {
    //...
    offset: cc.Vec2
},
```

2、将 `custom-gizmo.js` 改为以下内容并保存：

```javascript
let ToolType = {
    None: 0,
    Side: 1,
    Center: 2
};

class CustomGizmo extends Editor.Gizmo {
    init () {
        // 初始化一些参数
    }

    onCreateMoveCallbacks () {
        // 创建 gizmo 操作回调

        // 申明一些局部变量
        let startOffset;        // 按下鼠标时记录的圆偏移量
        let startRadius;        // 按下鼠标时记录的圆半径
        let pressx, pressy;     // 按下鼠标时记录的鼠标位置

        return {
            /**
             * 在 gizmo 上按下鼠标时触发
             * @param x 按下点的 x 坐标
             * @param y 按下点的 y 坐标
             * @param event mousedown dom event
             */
            start: (x, y, event) => {
                startRadius = this.target.radius;
                startOffset = this.target.offset;
                pressx = x;
                pressy = y;
            },

            /**
             * 在 gizmo 上按下鼠标移动时触发
             * @param dx 鼠标移动的 x 位移
             * @param dy 鼠标移动的 y 位移
             * @param event mousedown dom event
             */
            update: (dx, dy, event, type) => {
                // 获取 gizmo 依附的节点
                let node = this.node;

                // 获取 gizmo 依附的组件
                let target = this.target;

                if (type === ToolType.Center) {
                    // 计算新的偏移量
                    let mat4 = cc.vmath.mat4.create();
                    node.getWorldMatrix(mat4);
                    let t = cc.vmath.mat4.invert(mat4, mat4);
                    t.m12 = t.m13 = 0;

                    let d = cc.v2(dx, dy);
                    cc.vmath.vec2.transformMat4(d, d, t);
                    d.addSelf(startOffset);
                    target.offset = d;
                    this.adjustValue(target, 'offset');
                }
                else {
                    // 转换坐标点到节点下
                    let position = node.convertToNodeSpaceAR(cc.v2(pressx + dx, pressy + dy));
                    // 计算 radius
                    target.radius = position.sub(startOffset).mag();
                    // 防止 radius 小数点位数过多
                    this.adjustValue(target, 'radius');
                }
            },

            /**
             * 在 gizmo 抬起鼠标时触发
             * @param event mousedown dom event
             */
            end: (updated, event) => {
            }
        };
    }

    onCreateRoot () {
        // 创建 svg 根节点的回调，可以在这里创建你的 svg 工具
        // this._root 可以获取到 Editor.Gizmo 创建的 svg 根节点

        // 实例：

        // 创建一个 svg 工具
        // group 函数文档：http://documentup.com/wout/svg.js#groups
        this._tool = this._root.group();

        // 创建中心拖拽区域，用于操作 offset 属性
        let dragArea = this._tool.circle()
            // 设置 fill 样式
            .fill( { color: 'rgba(0,128,255,0.2)' } )
            // 设置点击区域，这里设置的是根据 fill 模式点击
            .style( 'pointer-events', 'fill' )
            // 设置鼠标样式
            .style( 'cursor', 'move' )
            ;

        // 注册监听鼠标移动事件的 svg 元素
        // ToolType.Center 是自定义的参数，会在移动回调中按照参数的形式传递到移动回调中，方便区别当前回调是哪一个 svg 元素产生的回调。
        // {cursor: 'move'} 指定移动时的鼠标类型
        this.registerMoveSvg( dragArea, ToolType.Center, {cursor: 'move'} );

        // 创建边缘拖拽区域，用于操作 radius 属性
        let circle = this._tool.circle()
            // 设置stroke 样式
            .stroke( { color: '#7fc97a', width: 2 } )
            // 设置点击区域，这里设置的是根据 stroke 模式点击
            .style( 'pointer-events', 'stroke' )
            // 设置鼠标样式
            .style( 'cursor', 'pointer' )

        this.registerMoveSvg( circle, ToolType.Side, {cursor: 'pointer'} );

        // 为 tool 定义一个绘画函数，方便在 onUpdate 中更新 svg 的绘制。
        this._tool.plot = (radius, position) => {
            this._tool.move(position.x, position.y);
            dragArea.radius(radius);
            circle.radius(radius);
        };
    }

    onUpdate () {
        // 更新 svg 工具

        // 获取 gizmo 依附的组件
        let target = this.target;

        // 获取 gizmo 依附的节点
        let node = this.node;

        // 获取节点世界坐标
        let position = node.convertToWorldSpaceAR(target.offset);

        // 转换世界坐标到 svg view 上
        // svg view 的坐标体系和节点坐标体系不太一样，这里使用内置函数来转换坐标
        position = this.worldToPixel(position);

        // 对齐坐标，防止 svg 因为精度问题产生抖动
        position = Editor.GizmosUtils.snapPixelWihVec2( position );

        // 获取世界坐标下圆半径
        let p1 = node.convertToWorldSpaceAR(cc.v2(target.radius, 0));
        let p2 = node.convertToWorldSpaceAR(cc.v2(0, 0));
        let radius = p1.sub(p2).mag();

        // 对齐坐标，防止 svg 因为精度问题产生抖动
        radius = Editor.GizmosUtils.snapPixel(radius);

        // 移动 svg 工具到坐标
        this._tool.plot(radius, position);
    }
}

module.exports = CustomGizmo;
```

更多 Gizmo Api 请参考 [Gizmo Api](api/editor-framework/renderer/gizmo.md)
更多 Gizmo 实例请参考 [Gizmo 实例](https://github.com/2youyou2/gizmo-example)
