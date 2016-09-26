# 自定义 Gizmo 进阶

[上一篇](custom-gizmo.md) 讲了如何自定义一个跟随节点移动并缩放的 Gizmo，这篇我们将实现一个可以编辑的 Gizmo


```javascript
class CustomGizmo extends Editor.Gizmo {
    init () {
        // 初始化一些参数
    }

    createGizmoCallBacks () {
        // 创建 gizmo 操作回调
        
        // 申明一些局部变量
        let startRadius;        // 按下鼠标时记录的圆半径
        let pressx, pressy;     // 按下鼠标时记录的鼠标位置
        let updated;            // 记录 gizmo 是否被操作过

        return {
            /**
             * 在 gizmo 上按下鼠标时触发
             * @property x 按下点的 x 坐标
             * @property y 按下点的 y 坐标
             * @property event mousedown dom event
             */
            start: (x, y, event) => {
                startRadius = this.target.radius;
                pressx = x;
                pressy = y;
                updated = false;
            },

            /**
             * 在 gizmo 上按下鼠标移动时触发
             * @property dx 鼠标移动的 x 位移
             * @property dy 鼠标移动的 y 位移
             * @property event mousedown dom event
             */
            update: (dx, dy, event) => {
                if (dx === 0 && dy === 0) {
                    return;
                }
                updated = true;

                // 获取 gizmo 依附的节点
                let node = this.node;

                // 记录节点信息的 undo 信息，注意参数为节点的 uuid
                _Scene.Undo.recordNode( node.uuid );

                // 获取 svg view 坐标系下点
                let x = pressx + dx, y = pressy + dy;
                // 获取节点世界坐标系下点
                let pos = this._view.pixelToWorld( cc.v2(x, y) );
                // 转换坐标点到节点下
                pos = node.convertToNodeSpaceAR(pos);
                // 计算 radius
                let radius = pos.mag();
                // js 在做一些计算后会出现小数位过长的情况， Editor.Math.toPrecision 会帮助做一些小数位的截取
                let minDifference = Editor.Math.numOfDecimalsF(1.0/this._view.scale);
                this.target.radius = Editor.Math.toPrecision(radius, minDifference);

                // 更新 gizmo view 
                this._view.repaintHost();
            },

            /**
             * 在 gizmo 抬起鼠标时触发
             * @property event mousedown dom event
             */
            end: (event) => {
                // 判断是否有操作过 gizmo, 没有则跳过处理
                if (updated) {
                    // 如果 gizmo 有修改需要进入 animation 编辑的属性，需要调用此接口来更新数据
                    // _Scene.AnimUtils.recordNodeChanged(this.node);
                    
                    // 推送修改到 undo 下，结束 undo
                    _Scene.Undo.commit();
                }
            }
        };
    }

    onCreateRoot () {
        // 创建 svg 根节点的回调，可以在这里创建你的 svg 工具
        // this._root 可以获取到 Editor.Gizmo 创建的 svg 根节点

        // 实例：

        // 创建一个 svg 工具
        // group 函数文档 : http://documentup.com/wout/svg.js#groups
        this._tool = this._root.group();

        let circle = this._tool.circle()
            // 设置 circle fill 样式
            .fill( { color: 'rgba(0,128,255,0.2)' } )
            // 设置 circle stroke 样式
            .stroke( { color: 'rgba(0,128,255,0.4)', width: 1 } )
            // 设置 circle 的点击区域，这里设置的是根据 fill 模式点击
            .style( 'pointer-events', 'fill' )
            // 设置 circle 鼠标样式
            .style( 'cursor', 'pointer' )
            ;

        // 为 tool 定义一个绘画函数，可以为其他名字
        this._tool.plot =  (radius, position) => {
            this._tool.move(position.x, position.y);
            circle.radius(radius);
        };

        // 创建 gizmo 操作回调函数
        let callbacks = this.createGizmoCallBacks();

        // 为 tool 添加一个操作回调
        // 当在 tool 上按下鼠标时，会创建一个 drag mask
        // 如果不需要此辅助函数，可以自行对 tool 注册 mousedown, mousemove, mouseup 来进行操作
        Editor.GizmosUtils.addMoveHandles( this._tool, {cursor: 'pointer'}, callbacks );
    }

    onUpdate () {
        // 更新 svg 工具

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
        let viewPosition = this._view.worldToPixel(worldPosition);

        // 对齐坐标，防止 svg 因为精度问题产生抖动
        let p = Editor.GizmosUtils.snapPixelWihVec2( viewPosition );

        // 获取世界坐标下圆半径
        let worldPosition2 = node.convertToWorldSpaceAR(cc.p(radius, 0));
        let worldRadius = worldPosition.sub(worldPosition2).mag();
        worldRadius = Editor.GizmosUtils.snapPixel(worldRadius);

        // 移动 svg 工具到坐标
        this._tool.plot(worldRadius, p);
    }
}

module.exports = CustomGizmo;

```