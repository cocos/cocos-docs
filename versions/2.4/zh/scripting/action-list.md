# Action 列表

## 基础动作类型

- [Action](%__APIDOC__%/zh/classes/Action.html)：所有动作类型的基类。
- [FiniteTimeAction](%__APIDOC__%/zh/classes/FiniteTimeAction.html)：有限时间动作，这种动作拥有时长 `duration` 属性。
- [ActionInstant](%__APIDOC__%/zh/classes/ActionInstant.html)：即时动作，这种动作立即就会执行，继承自 `FiniteTimeAction`。
- [ActionInterval](%__APIDOC__%/zh/classes/ActionInterval.html)：时间间隔动作，这种动作在已定时间内完成，继承自 `FiniteTimeAction`。
- [ActionEase](%__APIDOC__%/zh/classes/ActionEase.html)：所有缓动动作基类，用于修饰 `ActionInterval`。
- [EaseRateAction](%__APIDOC__%/zh/classes/EaseRateAction.html)：拥有速率属性的缓动动作基类。
- [EaseElastic](%__APIDOC__%/zh/classes/EaseElastic.html)：弹性缓动动作基类。
- [EaseBounce](%__APIDOC__%/zh/classes/EaseBounce.html)：反弹缓动动作基类。

在这些动作类型的文档中，开发者可以了解到各个动作类型的基本 API。

## 容器动作

| 动作名称   | 简介   | 文档链接   |
| :-------- | :---- | :-------- |
| cc.sequence      | 顺序执行动作 | [API 描述](%__APIDOC__%/zh/modules/cc.html#sequence)      |
| cc.spawn         | 同步执行动作 | [API 描述](%__APIDOC__%/zh/modules/cc.html#spawn)         |
| cc.repeat        | 重复执行动作 | [API 描述](%__APIDOC__%/zh/modules/cc.html#repeat)        |
| cc.repeatForever | 永远重复动作 | [API 描述](%__APIDOC__%/zh/modules/cc.html#repeatForever) |
| cc.speed         | 修改动作速率 | [API 描述](%__APIDOC__%/zh/modules/cc.html#speed)         |

## 即时动作

| 动作名称   | 简介  | 文档链接    |
| :-------- | :--- | :--------- |
| cc.show             | 立即显示                        | [API 描述](%__APIDOC__%/zh/modules/cc.html#show)              |
| cc.hide             | 立即隐藏                        | [API 描述](%__APIDOC__%/zh/modules/cc.html#hide)              |
| cc.toggleVisibility | 显隐状态切换                     | [API 描述](%__APIDOC__%/zh/modules/cc.html#toggleVisibility)  |
| cc.removeSelf       | 从父节点移除自身                  | [API 描述](%__APIDOC__%/zh/modules/cc.html#removeSelf)        |
| cc.flipX            | X轴翻转                         | [API 描述](%__APIDOC__%/zh/modules/cc.html#flipX)             |
| cc.flipY            | Y轴翻转                         | [API 描述](%__APIDOC__%/zh/modules/cc.html#flipY)             |
| cc.place            | 放置在目标位置                   | [API 描述](%__APIDOC__%/zh/modules/cc.html#place)             |
| cc.callFunc         | 执行回调函数                     | [API 描述](%__APIDOC__%/zh/modules/cc.html#callFunc)          |
| cc.targetedAction   | 用已有动作和一个新的目标节点创建动作 | [API 描述](%__APIDOC__%/zh/modules/cc.html#targetedAction)    |

## 时间间隔动作

| 动作名称   | 简介  | 文档链接   |
| :-------- | :--- | :------- |
| cc.moveTo           | 移动到目标位置                         | [API 描述](%__APIDOC__%/zh/modules/cc.html#moveTo)           |
| cc.moveBy           | 移动指定的距离                         | [API 描述](%__APIDOC__%/zh/modules/cc.html#moveBy)           |
| cc.rotateTo         | 旋转到目标角度                         | [API 描述](%__APIDOC__%/zh/modules/cc.html#rotateTo)         |
| cc.rotateBy         | 旋转指定的角度                         | [API 描述](%__APIDOC__%/zh/modules/cc.html#rotateBy)         |
| cc.scaleTo          | 将节点大小缩放到指定的倍数               | [API 描述](%__APIDOC__%/zh/modules/cc.html#scaleTo)          |
| cc.scaleBy          | 按指定的倍数缩放节点大小                 | [API 描述](%__APIDOC__%/zh/modules/cc.html#scaleBy)          |
| cc.skewTo           | 偏斜到目标角度                         | [API 描述](%__APIDOC__%/zh/modules/cc.html#skewTo)           |
| cc.skewBy           | 偏斜指定的角度                         | [API 描述](%__APIDOC__%/zh/modules/cc.html#skewBy)           |
| cc.jumpBy           | 用跳跃的方式移动指定的距离               | [API 描述](%__APIDOC__%/zh/modules/cc.html#jumpBy)           |
| cc.jumpTo           | 用跳跃的方式移动到目标位置               | [API 描述](%__APIDOC__%/zh/modules/cc.html#jumpTo)           |
| cc.follow           | 追踪目标节点的位置                      | [API 描述](%__APIDOC__%/zh/modules/cc.html#follow)           |
| cc.bezierTo         | 按贝赛尔曲线轨迹移动到目标位置            | [API 描述](%__APIDOC__%/zh/modules/cc.html#bezierTo)         |
| cc.bezierBy         | 按贝赛尔曲线轨迹移动指定的距离            | [API 描述](%__APIDOC__%/zh/modules/cc.html#bezierBy)         |
| cc.blink            | 闪烁（基于透明度）                      | [API 描述](%__APIDOC__%/zh/modules/cc.html#blink)            |
| cc.fadeTo           | 修改透明度到指定值                      | [API 描述](%__APIDOC__%/zh/modules/cc.html#fadeTo)           |
| cc.fadeIn           | 渐显                                  | [API 描述](%__APIDOC__%/zh/modules/cc.html#fadeIn)           |
| cc.fadeOut          | 渐隐                                  | [API 描述](%__APIDOC__%/zh/modules/cc.html#fadeOut)          |
| cc.tintTo           | 修改颜色到指定值                        | [API 描述](%__APIDOC__%/zh/modules/cc.html#tintTo)           |
| cc.tintBy           | 按照指定的增量修改颜色                   | [API 描述](%__APIDOC__%/zh/modules/cc.html#tintBy)           |
| cc.delayTime        | 延迟指定的时间量                        | [API 描述](%__APIDOC__%/zh/modules/cc.html#delayTime)        |
| cc.reverseTime      | 反转目标动作的时间轴                     | [API 描述](%__APIDOC__%/zh/modules/cc.html#reverseTime)      |
| cc.cardinalSplineTo | 按基数样条曲线轨迹移动到目标位置           | [API 描述](%__APIDOC__%/zh/modules/cc.html#cardinalSplineTo) |
| cc.cardinalSplineBy | 按基数样条曲线轨迹移动指定的距离           | [API 描述](%__APIDOC__%/zh/modules/cc.html#cardinalSplineBy) |
| cc.catmullRomTo     | 按 Catmull Rom 样条曲线轨迹移动到目标位置 | [API 描述](%__APIDOC__%/zh/modules/cc.html#catmullRomTo)     |
| cc.catmullRomBy     | 按 Catmull Rom 样条曲线轨迹移动指定的距离 | [API 描述](%__APIDOC__%/zh/modules/cc.html#catmullRomBy)     |

## 缓动动作

| 动作名称   | 文档链接    |
| :-------- | :-------  |
| cc.easeIn                   | [API 描述](%__APIDOC__%/zh/modules/cc.html#easeIn)                   |
| cc.easeOut                  | [API 描述](%__APIDOC__%/zh/modules/cc.html#easeOut)                  |
| cc.easeInOut                | [API 描述](%__APIDOC__%/zh/modules/cc.html#easeInOut)                |
| cc.easeExponentialIn        | [API 描述](%__APIDOC__%/zh/modules/cc.html#easeExponentialIn)        |
| cc.easeExponentialOut       | [API 描述](%__APIDOC__%/zh/modules/cc.html#easeExponentialOut)       |
| cc.easeExponentialInOut     | [API 描述](%__APIDOC__%/zh/modules/cc.html#easeExponentialInOut)     |
| cc.easeSineIn               | [API 描述](%__APIDOC__%/zh/modules/cc.html#easeSineIn)               |
| cc.easeSineOut              | [API 描述](%__APIDOC__%/zh/modules/cc.html#easeSineOut)              |
| cc.easeSineInOut            | [API 描述](%__APIDOC__%/zh/modules/cc.html#easeSineInOut)            |
| cc.easeElasticIn            | [API 描述](%__APIDOC__%/zh/modules/cc.html#easeElasticIn)            |
| cc.easeElasticOut           | [API 描述](%__APIDOC__%/zh/modules/cc.html#easeElasticOut)           |
| cc.easeElasticInOut         | [API 描述](%__APIDOC__%/zh/modules/cc.html#easeElasticInOut)         |
| cc.easeBounceIn             | [API 描述](%__APIDOC__%/zh/modules/cc.html#easeBounceIn)             |
| cc.easeBounceOut            | [API 描述](%__APIDOC__%/zh/modules/cc.html#easeBounceOut)            |
| cc.easeBounceInOut          | [API 描述](%__APIDOC__%/zh/modules/cc.html#easeBounceInOut)          |
| cc.easeBackIn               | [API 描述](%__APIDOC__%/zh/modules/cc.html#easeBackIn)               |
| cc.easeBackOut              | [API 描述](%__APIDOC__%/zh/modules/cc.html#easeBackOut)              |
| cc.easeBackInOut            | [API 描述](%__APIDOC__%/zh/modules/cc.html#easeBackInOut)            |
| cc.easeBezierAction         | [API 描述](%__APIDOC__%/zh/modules/cc.html#easeBezierAction)         |
| cc.easeQuadraticActionIn    | [API 描述](%__APIDOC__%/zh/modules/cc.html#easeQuadraticActionIn)    |
| cc.easeQuadraticActionOut   | [API 描述](%__APIDOC__%/zh/modules/cc.html#easeQuadraticActionOut)   |
| cc.easeQuadraticActionInOut | [API 描述](%__APIDOC__%/zh/modules/cc.html#easeQuadraticActionInOut) |
| cc.easeQuarticActionIn      | [API 描述](%__APIDOC__%/zh/modules/cc.html#easeQuarticActionIn)      |
| cc.easeQuarticActionOut     | [API 描述](%__APIDOC__%/zh/modules/cc.html#easeQuarticActionOut)     |
| cc.easeQuarticActionInOut   | [API 描述](%__APIDOC__%/zh/modules/cc.html#easeQuarticActionInOut)   |
| cc.easeQuinticActionIn      | [API 描述](%__APIDOC__%/zh/modules/cc.html#easeQuinticActionIn)      |
| cc.easeQuinticActionOut     | [API 描述](%__APIDOC__%/zh/modules/cc.html#easeQuinticActionOut)     |
| cc.easeQuinticActionInOut   | [API 描述](%__APIDOC__%/zh/modules/cc.html#easeQuinticActionInOut)   |
| cc.easeCircleActionIn       | [API 描述](%__APIDOC__%/zh/modules/cc.html#easeCircleActionIn)       |
| cc.easeCircleActionOut      | [API 描述](%__APIDOC__%/zh/modules/cc.html#easeCircleActionOut)      |
| cc.easeCircleActionInOut    | [API 描述](%__APIDOC__%/zh/modules/cc.html#easeCircleActionInOut)    |
| cc.easeCubicActionIn        | [API 描述](%__APIDOC__%/zh/modules/cc.html#easeCubicActionIn)        |
| cc.easeCubicActionOut       | [API 描述](%__APIDOC__%/zh/modules/cc.html#easeCubicActionOut)       |
| cc.easeCubicActionInOut     | [API 描述](%__APIDOC__%/zh/modules/cc.html#easeCubicActionInOut)     |
