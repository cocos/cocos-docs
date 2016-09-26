# 动作列表

## 基础动作类型

- [Action](http://cocos.com/docs/creator/api/classes/Action.html)：所有动作类型的基类。
- [FiniteTimeAction](http://cocos.com/docs/creator/api/classes/FiniteTimeAction.html)：有限时间动作，这种动作拥有时长 `duration` 属性。
- [ActionInstant](http://cocos.com/docs/creator/api/classes/ActionInstant.html)：即时动作，这种动作立即就会执行，继承自 `FiniteTimeAction`。
- [ActionInterval](http://cocos.com/docs/creator/api/classes/ActionInterval.html)：时间间隔动作，这种动作在已定时间内完成，继承自 `FiniteTimeAction`。
- [ActionEase](http://cocos.com/docs/creator/api/classes/ActionEase.html)：所有缓动动作基类，用于修饰 `ActionInterval`。
- [EaseRateAction](http://cocos.com/docs/creator/api/classes/EaseRateAction.html)：拥有速率属性的缓动动作基类。
- [EaseElastic](http://cocos.com/docs/creator/api/classes/EaseElastic.html)：弹性缓动动作基类。
- [EaseBounce](http://cocos.com/docs/creator/api/classes/EaseBounce.html)：反弹缓动动作基类。

在这些动作类型的文档中，开发者可以了解到各个动作类型的基本 API。

## 容器动作

| 动作名称 | 简介 | 文档链接 |
|---------|:---:|:-------:|
| cc.sequence | 顺序执行动作 | [API 描述](http://cocos.com/docs/creator/api/modules/cc.html#method_sequence) |
| cc.spawn | 同步执行动作 | [API 描述](http://cocos.com/docs/creator/api/modules/cc.html#method_spawn) |
| cc.repeat | 重复执行动作 | [API 描述](http://cocos.com/docs/creator/api/modules/cc.html#method_repeat) |
| cc.repeatForever | 永远重复动作 | [API 描述](http://cocos.com/docs/creator/api/modules/cc.html#method_repeatForever) |
| cc.speed | 修改动作速率 | [API 描述](http://cocos.com/docs/creator/api/modules/cc.html#method_speed) |

## 即时动作

| 动作名称 | 简介 | 文档链接 |
|---------|:---:|:-------:|
| cc.show | 立即显示 | [API 描述](http://cocos.com/docs/creator/api/modules/cc.html#method_show) |
| cc.hide | 立即隐藏 | [API 描述](http://cocos.com/docs/creator/api/modules/cc.html#method_hide) |
| cc.toggleVisibility | 显隐状态切换 | [API 描述](http://cocos.com/docs/creator/api/modules/cc.html#method_toggleVisibility) |
| cc.removeSelf | 从父节点移除自身 | [API 描述](http://cocos.com/docs/creator/api/modules/cc.html#method_removeSelf) |
| cc.flipX | X轴翻转 | [API 描述](http://cocos.com/docs/creator/api/modules/cc.html#method_flipX) |
| cc.flipY | Y轴翻转 | [API 描述](http://cocos.com/docs/creator/api/modules/cc.html#method_flipY) |
| cc.place | 放置在目标位置 | [API 描述](http://cocos.com/docs/creator/api/modules/cc.html#method_place) |
| cc.callFunc | 执行回调函数 | [API 描述](http://cocos.com/docs/creator/api/modules/cc.html#method_callFunc) |
| cc.targetedAction | 用已有动作和一个新的目标节点创建动作 | [API 描述](http://cocos.com/docs/creator/api/modules/cc.html#method_targetedAction) |

## 时间间隔动作

| 动作名称 | 简介 | 文档链接 |
|---------|:---:|:-------:|
| cc.moveTo | 移动到目标位置 | [API 描述](http://cocos.com/docs/creator/api/modules/cc.html#method_moveTo) |
| cc.moveBy | 移动指定的距离 | [API 描述](http://cocos.com/docs/creator/api/modules/cc.html#method_moveBy) |
| cc.rotateTo | 旋转到目标角度 | [API 描述](http://cocos.com/docs/creator/api/modules/cc.html#method_rotateTo) |
| cc.rotateBy | 旋转指定的角度 | [API 描述](http://cocos.com/docs/creator/api/modules/cc.html#method_rotateBy) |
| cc.scaleTo | 将节点大小缩放到指定的倍数 | [API 描述](http://cocos.com/docs/creator/api/modules/cc.html#method_scaleTo) |
| cc.scaleBy | 按指定的倍数缩放节点大小 | [API 描述](http://cocos.com/docs/creator/api/modules/cc.html#method_scaleBy) |
| cc.skewTo | 偏斜到目标角度 | [API 描述](http://cocos.com/docs/creator/api/modules/cc.html#method_skewTo) |
| cc.skewBy | 偏斜指定的角度 | [API 描述](http://cocos.com/docs/creator/api/modules/cc.html#method_skewBy) |
| cc.jumpBy | 用跳跃的方式移动指定的距离 | [API 描述](http://cocos.com/docs/creator/api/modules/cc.html#method_jumpBy) |
| cc.jumpTo | 用跳跃的方式移动到目标位置 | [API 描述](http://cocos.com/docs/creator/api/modules/cc.html#method_jumpTo) |
| cc.follow | 追踪目标节点的位置 | [API 描述](http://cocos.com/docs/creator/api/modules/cc.html#method_follow) |
| cc.bezierTo | 按贝赛尔曲线轨迹移动到目标位置 | [API 描述](http://cocos.com/docs/creator/api/modules/cc.html#method_bezierTo) |
| cc.bezierBy | 按贝赛尔曲线轨迹移动指定的距离 | [API 描述](http://cocos.com/docs/creator/api/modules/cc.html#method_bezierBy) |
| cc.blink | 闪烁（基于透明度） | [API 描述](http://cocos.com/docs/creator/api/modules/cc.html#method_blink) |
| cc.fadeTo | 修改透明度到指定值 | [API 描述](http://cocos.com/docs/creator/api/modules/cc.html#method_fadeTo) |
| cc.fadeIn | 渐显 | [API 描述](http://cocos.com/docs/creator/api/modules/cc.html#method_fadeIn) |
| cc.fadeOut | 渐隐 | [API 描述](http://cocos.com/docs/creator/api/modules/cc.html#method_fadeOut) |
| cc.tintTo | 修改颜色到指定值 | [API 描述](http://cocos.com/docs/creator/api/modules/cc.html#method_tintTo) |
| cc.tintBy | 按照指定的增量修改颜色 | [API 描述](http://cocos.com/docs/creator/api/modules/cc.html#method_tintBy) |
| cc.delayTime | 延迟指定的时间量 | [API 描述](http://cocos.com/docs/creator/api/modules/cc.html#method_delayTime) |
| cc.reverseTime | 反转目标动作的时间轴 | [API 描述](http://cocos.com/docs/creator/api/modules/cc.html#method_reverseTime) |
| cc.cardinalSplineTo | 按基数样条曲线轨迹移动到目标位置 | [API 描述](http://cocos.com/docs/creator/api/modules/cc.html#method_cardinalSplineTo) |
| cc.cardinalSplineBy | 按基数样条曲线轨迹移动指定的距离 | [API 描述](http://cocos.com/docs/creator/api/modules/cc.html#method_cardinalSplineBy) |
| cc.catmullRomTo | 按 Catmull Rom 样条曲线轨迹移动到目标位置 | [API 描述](http://cocos.com/docs/creator/api/modules/cc.html#method_catmullRomTo) |
| cc.catmullRomBy | 按 Catmull Rom 样条曲线轨迹移动指定的距离 | [API 描述](http://cocos.com/docs/creator/api/modules/cc.html#method_catmullRomBy) |

## 缓动动作

| 动作名称 | 文档链接 |
|---------|:-------:|
| cc.easeIn | [API 描述](http://cocos.com/docs/creator/api/modules/cc.html#method_easeIn) |
| cc.easeOut | [API 描述](http://cocos.com/docs/creator/api/modules/cc.html#method_easeOut) |
| cc.easeInOut | [API 描述](http://cocos.com/docs/creator/api/modules/cc.html#method_easeInOut) |
| cc.easeExponentialIn | [API 描述](http://cocos.com/docs/creator/api/modules/cc.html#method_easeExponentialIn) |
| cc.easeExponentialOut | [API 描述](http://cocos.com/docs/creator/api/modules/cc.html#method_easeExponentialOut) |
| cc.easeExponentialInOut | [API 描述](http://cocos.com/docs/creator/api/modules/cc.html#method_easeExponentialInOut) |
| cc.easeSineIn | [API 描述](http://cocos.com/docs/creator/api/modules/cc.html#method_easeSineIn) |
| cc.easeSineOut | [API 描述](http://cocos.com/docs/creator/api/modules/cc.html#method_easeSineOut) |
| cc.easeSineInOut | [API 描述](http://cocos.com/docs/creator/api/modules/cc.html#method_easeSineInOut) |
| cc.easeElasticIn | [API 描述](http://cocos.com/docs/creator/api/modules/cc.html#method_easeElasticIn) |
| cc.easeElasticOut | [API 描述](http://cocos.com/docs/creator/api/modules/cc.html#method_easeElasticOut) |
| cc.easeElasticInOut | [API 描述](http://cocos.com/docs/creator/api/modules/cc.html#method_easeElasticInOut) |
| cc.easeBounceIn | [API 描述](http://cocos.com/docs/creator/api/modules/cc.html#method_easeBounceIn) |
| cc.easeBounceOut | [API 描述](http://cocos.com/docs/creator/api/modules/cc.html#method_easeBounceOut) |
| cc.easeBounceInOut | [API 描述](http://cocos.com/docs/creator/api/modules/cc.html#method_easeBounceInOut) |
| cc.easeBackIn | [API 描述](http://cocos.com/docs/creator/api/modules/cc.html#method_easeBackIn) |
| cc.easeBackOut | [API 描述](http://cocos.com/docs/creator/api/modules/cc.html#method_easeBackOut) |
| cc.easeBackInOut | [API 描述](http://cocos.com/docs/creator/api/modules/cc.html#method_easeBackInOut) |
| cc.easeBezierAction | [API 描述](http://cocos.com/docs/creator/api/modules/cc.html#method_easeBezierAction) |
| cc.easeQuadraticActionIn | [API 描述](http://cocos.com/docs/creator/api/modules/cc.html#method_easeQuadraticActionIn) |
| cc.easeQuadraticActionOut | [API 描述](http://cocos.com/docs/creator/api/modules/cc.html#method_easeQuadraticActionOut) |
| cc.easeQuadraticActionInOut | [API 描述](http://cocos.com/docs/creator/api/modules/cc.html#method_easeQuadraticActionInOut) |
| cc.easeQuarticActionIn | [API 描述](http://cocos.com/docs/creator/api/modules/cc.html#method_easeQuarticActionIn) |
| cc.easeQuarticActionOut | [API 描述](http://cocos.com/docs/creator/api/modules/cc.html#method_easeQuarticActionOut) |
| cc.easeQuarticActionInOut | [API 描述](http://cocos.com/docs/creator/api/modules/cc.html#method_easeQuarticActionInOut) |
| cc.easeQuinticActionIn | [API 描述](http://cocos.com/docs/creator/api/modules/cc.html#method_easeQuinticActionIn) |
| cc.easeQuinticActionOut | [API 描述](http://cocos.com/docs/creator/api/modules/cc.html#method_easeQuinticActionOut) |
| cc.easeQuinticActionInOut | [API 描述](http://cocos.com/docs/creator/api/modules/cc.html#method_easeQuinticActionInOut) |
| cc.easeCircleActionIn | [API 描述](http://cocos.com/docs/creator/api/modules/cc.html#method_easeCircleActionIn) |
| cc.easeCircleActionOut | [API 描述](http://cocos.com/docs/creator/api/modules/cc.html#method_easeCircleActionOut) |
| cc.easeCircleActionInOut | [API 描述](http://cocos.com/docs/creator/api/modules/cc.html#method_easeCircleActionInOut) |
| cc.easeCubicActionIn | [API 描述](http://cocos.com/docs/creator/api/modules/cc.html#method_easeCubicActionIn) |
| cc.easeCubicActionOut | [API 描述](http://cocos.com/docs/creator/api/modules/cc.html#method_easeCubicActionOut) |
| cc.easeCubicActionInOut | [API 描述](http://cocos.com/docs/creator/api/modules/cc.html#method_easeCubicActionInOut) |