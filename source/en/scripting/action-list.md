# Action list

## Basic action type

- [Action](http://fireball-x.com/api/classes/Action.html)：base class of all action types
- [FiniteTimeAction](http://fireball-x.com/api/classes/FiniteTimeAction.html)：finite time action which has the property of `duration` .
- [ActionInstant](http://fireball-x.com/api/classes/ActionInstant.html)：free action which will execute immediately, inherited from `FiniteTimeAction`.
- [ActionInterval](http://fireball-x.com/api/classes/ActionInterval.html)：interval action which will be completed within a predetermined time period, also inherited from `FiniteTimeAction`.
- [ActionEase](http://fireball-x.com/api/classes/ActionEase.html)：all slow motion base classes to modify `ActionInterval`.
- [EaseRateAction](http://fireball-x.com/api/classes/EaseRateAction.html)：slow motion base class with rate attribute.
- [EaseElastic](http://fireball-x.com/api/classes/EaseElastic.html)：elastic slow motion base class.
- [EaseBounce](http://fireball-x.com/api/classes/EaseBounce.html)：bounce slow motion base class.

The developer can get to know the basic API for every action type in these action type files.

## Container action

| Action name | Introduction | File link |
|---------|:---:|:-------:|
| cc.sequence | sequential execution action | [API description](http://fireball-x.com/api/modules/cc.html#method_sequence) |
| cc.spawn | synchronized execution action  | [API description](http://fireball-x.com/api/modules/cc.html#method_spawn) |
| cc.repeat | repetitive execution action | [API description](http://fireball-x.com/api/modules/cc.html#method_repeat) |
| cc.repeatForever | forever repetitive action | [API description](http://fireball-x.com/api/modules/cc.html#method_repeatForever) |
| cc.speed | alter action rate | [API description](http://fireball-x.com/api/modules/cc.html#method_speed) |

## Free action

| Action name | Introduction | File link |
|---------|:---:|:-------:|
| cc.show | show immediately | [API description](http://fireball-x.com/api/modules/cc.html#method_show) |
| cc.hide | hide immediately | [API description](http://fireball-x.com/api/modules/cc.html#method_hide) |
| cc.toggleVisibility | show/hide status switch | [API description](http://fireball-x.com/api/modules/cc.html#method_toggleVisibility) |
| cc.removeSelf | remove self from parent node | [API description](http://fireball-x.com/api/modules/cc.html#method_removeSelf) |
| cc.flipX | X-axis flip | [API description](http://fireball-x.com/api/modules/cc.html#method_flipX) |
| cc.flipY | Y-axis flip | [API description](http://fireball-x.com/api/modules/cc.html#method_flipY) |
| cc.place | place at the target location | [API description](http://fireball-x.com/api/modules/cc.html#method_place) |
| cc.callFunc | execute callback fuction | [API description](http://fireball-x.com/api/modules/cc.html#method_callFunc) |
| cc.targetedAction | create action with existant action and a new target node | [API description](http://fireball-x.com/api/modules/cc.html#method_targetedAction) |

## Interval action

| Action name | Introduction | File link |
|---------|:---:|:-------:|
| cc.moveTo | move to the target location | [API description](http://fireball-x.com/api/modules/cc.html#method_moveTo) |
| cc.moveBy | move by assigned distance | [API description](http://fireball-x.com/api/modules/cc.html#method_moveBy) |
| cc.rotateTo | rotate to the target angle | [API description](http://fireball-x.com/api/modules/cc.html#method_rotateTo) |
| cc.rotateBy | rotate by assigned angle | [API description](http://fireball-x.com/api/modules/cc.html#method_rotateBy) |
| cc.scaleTo | scale node to assigned multiple | [API description](http://fireball-x.com/api/modules/cc.html#method_scaleTo) |
| cc.scaleBy | scale node by assigned multiple | [API description](http://fireball-x.com/api/modules/cc.html#method_scaleBy) |
| cc.skewTo | skew to the target angle | [API description](http://fireball-x.com/api/modules/cc.html#method_skewTo) |
| cc.skewBy | skew by assigned angle | [API description](http://fireball-x.com/api/modules/cc.html#method_skewBy) |
| cc.jumpBy | move assigned distance by jumping | [API description](http://fireball-x.com/api/modules/cc.html#method_jumpBy) |
| cc.jumpTo | jump to the target location | [API description](http://fireball-x.com/api/modules/cc.html#method_jumpTo) |
| cc.follow | follow the target node's location | [API description](http://fireball-x.com/api/modules/cc.html#method_follow) |
| cc.bezierTo | move to the target location by Bezier curve track | [API description](http://fireball-x.com/api/modules/cc.html#method_bezierTo) |
| cc.bezierBy | move assigned distance by Bezier curve track | [API description](http://fireball-x.com/api/modules/cc.html#method_bezierBy) |
| cc.blink | blink(based on the transparency) | [API description](http://fireball-x.com/api/modules/cc.html#method_blink) |
| cc.fadeTo | alter the transparency to assigned value | [API description](http://fireball-x.com/api/modules/cc.html#method_fadeTo) |
| cc.fadeIn | fade in | [API description](http://fireball-x.com/api/modules/cc.html#method_fadeIn) |
| cc.fadeOut | fade out | [API description](http://fireball-x.com/api/modules/cc.html#method_fadeOut) |
| cc.tintTo | alter the color to the assigned value | [API description](http://fireball-x.com/api/modules/cc.html#method_tintTo) |
| cc.tintBy | alter the color by the assigned increment | [API description](http://fireball-x.com/api/modules/cc.html#method_tintBy) |
| cc.delayTime | delay the assigned time amount | [API description](http://fireball-x.com/api/modules/cc.html#method_delayTime) |
| cc.reverseTime | reverse the time axis of the target action | [API description](http://fireball-x.com/api/modules/cc.html#method_reverseTime) |
| cc.cardinalSplineTo | move to the target location by cardinal spline curve track | [API description](http://fireball-x.com/api/modules/cc.html#method_cardinalSplineTo) |
| cc.cardinalSplineBy | move assigned distance by cardinal spline curve track | [API description](http://fireball-x.com/api/modules/cc.html#method_cardinalSplineBy) |
| cc.catmullRomTo | move to the target location by Catmull Rom spline curve track | [API description](http://fireball-x.com/api/modules/cc.html#method_catmullRomTo) |
| cc.catmullRomBy | move assigned distance by by Catmull Rom spline curve track | [API description](http://fireball-x.com/api/modules/cc.html#method_catmullRomBy) |

## Slow motion

| Action name | File link |
|---------|:-------:|
| cc.easeIn | [API description](http://fireball-x.com/api/modules/cc.html#method_easeIn) |
| cc.easeOut | [API description](http://fireball-x.com/api/modules/cc.html#method_easeOut) |
| cc.easeInOut | [API description](http://fireball-x.com/api/modules/cc.html#method_easeInOut) |
| cc.easeExponentialIn | [API description](http://fireball-x.com/api/modules/cc.html#method_easeExponentialIn) |
| cc.easeExponentialOut | [API description](http://fireball-x.com/api/modules/cc.html#method_easeExponentialOut) |
| cc.easeExponentialInOut | [API description](http://fireball-x.com/api/modules/cc.html#method_easeExponentialInOut) |
| cc.easeSineIn | [API description](http://fireball-x.com/api/modules/cc.html#method_easeSineIn) |
| cc.easeSineOut | [API description](http://fireball-x.com/api/modules/cc.html#method_easeSineOut) |
| cc.easeSineInOut | [API description](http://fireball-x.com/api/modules/cc.html#method_easeSineInOut) |
| cc.easeElasticIn | [API description](http://fireball-x.com/api/modules/cc.html#method_easeElasticIn) |
| cc.easeElasticOut | [API description](http://fireball-x.com/api/modules/cc.html#method_easeElasticOut) |
| cc.easeElasticInOut | [API description](http://fireball-x.com/api/modules/cc.html#method_easeElasticInOut) |
| cc.easeBounceIn | [API description](http://fireball-x.com/api/modules/cc.html#method_easeBounceIn) |
| cc.easeBounceOut | [API description](http://fireball-x.com/api/modules/cc.html#method_easeBounceOut) |
| cc.easeBounceInOut | [API description](http://fireball-x.com/api/modules/cc.html#method_easeBounceInOut) |
| cc.easeBackIn | [API description](http://fireball-x.com/api/modules/cc.html#method_easeBackIn) |
| cc.easeBackOut | [API description](http://fireball-x.com/api/modules/cc.html#method_easeBackOut) |
| cc.easeBackInOut | [API description](http://fireball-x.com/api/modules/cc.html#method_easeBackInOut) |
| cc.easeBezierAction | [API description](http://fireball-x.com/api/modules/cc.html#method_easeBezierAction) |
| cc.easeQuadraticActionIn | [API description](http://fireball-x.com/api/modules/cc.html#method_easeQuadraticActionIn) |
| cc.easeQuadraticActionOut | [API description](http://fireball-x.com/api/modules/cc.html#method_easeQuadraticActionOut) |
| cc.easeQuadraticActionInOut | [API description](http://fireball-x.com/api/modules/cc.html#method_easeQuadraticActionInOut) |
| cc.easeQuarticActionIn | [API description](http://fireball-x.com/api/modules/cc.html#method_easeQuarticActionIn) |
| cc.easeQuarticActionOut | [API description](http://fireball-x.com/api/modules/cc.html#method_easeQuarticActionOut) |
| cc.easeQuarticActionInOut | [API description](http://fireball-x.com/api/modules/cc.html#method_easeQuarticActionInOut) |
| cc.easeQuinticActionIn | [API description](http://fireball-x.com/api/modules/cc.html#method_easeQuinticActionIn) |
| cc.easeQuinticActionOut | [API description](http://fireball-x.com/api/modules/cc.html#method_easeQuinticActionOut) |
| cc.easeQuinticActionInOut | [API description](http://fireball-x.com/api/modules/cc.html#method_easeQuinticActionInOut) |
| cc.easeCircleActionIn | [API description](http://fireball-x.com/api/modules/cc.html#method_easeCircleActionIn) |
| cc.easeCircleActionOut | [API description](http://fireball-x.com/api/modules/cc.html#method_easeCircleActionOut) |
| cc.easeCircleActionInOut | [API description](http://fireball-x.com/api/modules/cc.html#method_easeCircleActionInOut) |
| cc.easeCubicActionIn | [API description](http://fireball-x.com/api/modules/cc.html#method_easeCubicActionIn) |
| cc.easeCubicActionOut | [API description](http://fireball-x.com/api/modules/cc.html#method_easeCubicActionOut) |
| cc.easeCubicActionInOut | [API description](http://fireball-x.com/api/modules/cc.html#method_easeCubicActionInOut) |
