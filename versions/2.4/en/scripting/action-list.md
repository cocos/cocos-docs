# Action list

## Basic action type

- [Action](%__APIDOC__%/en/classes/Action.html): base class of all action types.
- [FiniteTimeAction](%__APIDOC__%/en/classes/FiniteTimeAction.html): finite time action which has the property of `duration`.
- [ActionInstant](%__APIDOC__%/en/classes/ActionInstant.html): free action which will execute immediately, inherited from `FiniteTimeAction`.
- [ActionInterval](%__APIDOC__%/en/classes/ActionInterval.html): interval action which will be completed within a predetermined time period, also inherited from `FiniteTimeAction`.
- [ActionEase](%__APIDOC__%/en/classes/ActionEase.html): all slow motion base classes to modify `ActionInterval`.
- [EaseRateAction](%__APIDOC__%/en/classes/EaseRateAction.html): slow motion base class with rate attribute.
- [EaseElastic](%__APIDOC__%/en/classes/EaseElastic.html): elastic slow motion base class.
- [EaseBounce](%__APIDOC__%/en/classes/EaseBounce.html): bounce slow motion base class.

The developer can get to know the basic API for every action type in these action type files.

## Container action

| Action name      | Introduction | File link |
| :-------------- | :---------- | :------- |
| cc.sequence      | sequential execution action    | [API description](%__APIDOC__%/en/modules/cc.html#sequence)      |
| cc.spawn         | synchronized execution action  | [API description](%__APIDOC__%/en/modules/cc.html#spawn)         |
| cc.repeat        | repetitive execution action    | [API description](%__APIDOC__%/en/modules/cc.html#repeat)        |
| cc.repeatForever | forever repetitive action      | [API description](%__APIDOC__%/en/modules/cc.html#repeatForever) |
| cc.speed         | alter action rate              | [API description](%__APIDOC__%/en/modules/cc.html#speed)         |

## Free action

| Action name | Introduction | File link |
| :---------- | :----------- | :------- |
| cc.show                | show immediately                                         | [API description](%__APIDOC__%/en/modules/cc.html#show)              |
| cc.hide                | hide immediately                                         | [API description](%__APIDOC__%/en/modules/cc.html#hide)              |
| cc.toggleVisibility    | show/hide status switch                                  | [API description](%__APIDOC__%/en/modules/cc.html#toggleVisibility)  |
| cc.removeSelf          | remove self from parent node                             | [API description](%__APIDOC__%/en/modules/cc.html#removeSelf)        |
| cc.flipX               | X-axis flip                                              | [API description](%__APIDOC__%/en/modules/cc.html#flipX)             |
| cc.flipY               | Y-axis flip                                              | [API description](%__APIDOC__%/en/modules/cc.html#flipY)             |
| cc.place               | place at the target location                             | [API description](%__APIDOC__%/en/modules/cc.html#place)             |
| cc.callFunc            | execute callback function                                | [API description](%__APIDOC__%/en/modules/cc.html#callFunc)          |
| cc.targetedAction      | create action with existent action and a new target node | [API description](%__APIDOC__%/en/modules/cc.html#targetedAction)    |

## Interval action

| Action name | Introduction | File link |
| :---------- | :----------- | :-------- |
| cc.moveTo           | move to the target location                                   | [API description](%__APIDOC__%/en/modules/cc.html#moveTo)           |
| cc.moveBy           | move by assigned distance                                     | [API description](%__APIDOC__%/en/modules/cc.html#moveBy)           |
| cc.rotateTo         | rotate to the target angle                                    | [API description](%__APIDOC__%/en/modules/cc.html#rotateTo)         |
| cc.rotateBy         | rotate by assigned angle                                      | [API description](%__APIDOC__%/en/modules/cc.html#rotateBy)         |
| cc.scaleTo          | scale node to assigned multiple                               | [API description](%__APIDOC__%/en/modules/cc.html#scaleTo)          |
| cc.scaleBy          | scale node by assigned multiple                               | [API description](%__APIDOC__%/en/modules/cc.html#scaleBy)          |
| cc.skewTo           | skew to the target angle                                      | [API description](%__APIDOC__%/en/modules/cc.html#skewTo)           |
| cc.skewBy           | skew by assigned angle                                        | [API description](%__APIDOC__%/en/modules/cc.html#skewBy)           |
| cc.jumpBy           | move assigned distance by jumping                             | [API description](%__APIDOC__%/en/modules/cc.html#jumpBy)           |
| cc.jumpTo           | jump to the target location                                   | [API description](%__APIDOC__%/en/modules/cc.html#jumpTo)           |
| cc.follow           | follow the target node's location                             | [API description](%__APIDOC__%/en/modules/cc.html#follow)           |
| cc.bezierTo         | move to the target location by Bezier curve track             | [API description](%__APIDOC__%/en/modules/cc.html#bezierTo)         |
| cc.bezierBy         | move assigned distance by Bezier curve track                  | [API description](%__APIDOC__%/en/modules/cc.html#bezierBy)         |
| cc.blink            | blink(based on the transparency)                              | [API description](%__APIDOC__%/en/modules/cc.html#blink)            |
| cc.fadeTo           | alter the transparency to assigned value                      | [API description](%__APIDOC__%/en/modules/cc.html#fadeTo)           |
| cc.fadeIn           | fade in                                                       | [API description](%__APIDOC__%/en/modules/cc.html#fadeIn)           |
| cc.fadeOut          | fade out                                                      | [API description](%__APIDOC__%/en/modules/cc.html#fadeOut)          |
| cc.tintTo           | alter the color to the assigned value                         | [API description](%__APIDOC__%/en/modules/cc.html#tintTo)           |
| cc.tintBy           | alter the color by the assigned increment                     | [API description](%__APIDOC__%/en/modules/cc.html#tintBy)           |
| cc.delayTime        | delay the assigned time amount                                | [API description](%__APIDOC__%/en/modules/cc.html#delayTime)        |
| cc.reverseTime      | reverse the time axis of the target action                    | [API description](%__APIDOC__%/en/modules/cc.html#reverseTime)      |
| cc.cardinalSplineTo | move to the target location by cardinal spline curve track    | [API description](%__APIDOC__%/en/modules/cc.html#cardinalSplineTo) |
| cc.cardinalSplineBy | move assigned distance by cardinal spline curve track         | [API description](%__APIDOC__%/en/modules/cc.html#cardinalSplineBy) |
| cc.catmullRomTo     | move to the target location by Catmull Rom spline curve track | [API description](%__APIDOC__%/en/modules/cc.html#catmullRomTo)     |
| cc.catmullRomBy     | move assigned distance by by Catmull Rom spline curve track   | [API description](%__APIDOC__%/en/modules/cc.html#catmullRomBy)     |

## Slow motion

| Action name | File link |
| :---------- | :------- |
| cc.easeIn                   | [API description](%__APIDOC__%/en/modules/cc.html#easeIn)                   |
| cc.easeOut                  | [API description](%__APIDOC__%/en/modules/cc.html#easeOut)                  |
| cc.easeInOut                | [API description](%__APIDOC__%/en/modules/cc.html#easeInOut)                |
| cc.easeExponentialIn        | [API description](%__APIDOC__%/en/modules/cc.html#easeExponentialIn)        |
| cc.easeExponentialOut       | [API description](%__APIDOC__%/en/modules/cc.html#easeExponentialOut)       |
| cc.easeExponentialInOut     | [API description](%__APIDOC__%/en/modules/cc.html#easeExponentialInOut)     |
| cc.easeSineIn               | [API description](%__APIDOC__%/en/modules/cc.html#easeSineIn)               |
| cc.easeSineOut              | [API description](%__APIDOC__%/en/modules/cc.html#easeSineOut)              |
| cc.easeSineInOut            | [API description](%__APIDOC__%/en/modules/cc.html#easeSineInOut)            |
| cc.easeElasticIn            | [API description](%__APIDOC__%/en/modules/cc.html#easeElasticIn)            |
| cc.easeElasticOut           | [API description](%__APIDOC__%/en/modules/cc.html#easeElasticOut)           |
| cc.easeElasticInOut         | [API description](%__APIDOC__%/en/modules/cc.html#easeElasticInOut)         |
| cc.easeBounceIn             | [API description](%__APIDOC__%/en/modules/cc.html#easeBounceIn)             |
| cc.easeBounceOut            | [API description](%__APIDOC__%/en/modules/cc.html#easeBounceOut)            |
| cc.easeBounceInOut          | [API description](%__APIDOC__%/en/modules/cc.html#easeBounceInOut)          |
| cc.easeBackIn               | [API description](%__APIDOC__%/en/modules/cc.html#easeBackIn)               |
| cc.easeBackOut              | [API description](%__APIDOC__%/en/modules/cc.html#easeBackOut)              |
| cc.easeBackInOut            | [API description](%__APIDOC__%/en/modules/cc.html#easeBackInOut)            |
| cc.easeBezierAction         | [API description](%__APIDOC__%/en/modules/cc.html#easeBezierAction)         |
| cc.easeQuadraticActionIn    | [API description](%__APIDOC__%/en/modules/cc.html#easeQuadraticActionIn)    |
| cc.easeQuadraticActionOut   | [API description](%__APIDOC__%/en/modules/cc.html#easeQuadraticActionOut)   |
| cc.easeQuadraticActionInOut | [API description](%__APIDOC__%/en/modules/cc.html#easeQuadraticActionInOut) |
| cc.easeQuarticActionIn      | [API description](%__APIDOC__%/en/modules/cc.html#easeQuarticActionIn)      |
| cc.easeQuarticActionOut     | [API description](%__APIDOC__%/en/modules/cc.html#easeQuarticActionOut)     |
| cc.easeQuarticActionInOut   | [API description](%__APIDOC__%/en/modules/cc.html#easeQuarticActionInOut)   |
| cc.easeQuinticActionIn      | [API description](%__APIDOC__%/en/modules/cc.html#easeQuinticActionIn)      |
| cc.easeQuinticActionOut     | [API description](%__APIDOC__%/en/modules/cc.html#easeQuinticActionOut)     |
| cc.easeQuinticActionInOut   | [API description](%__APIDOC__%/en/modules/cc.html#easeQuinticActionInOut)   |
| cc.easeCircleActionIn       | [API description](%__APIDOC__%/en/modules/cc.html#easeCircleActionIn)       |
| cc.easeCircleActionOut      | [API description](%__APIDOC__%/en/modules/cc.html#easeCircleActionOut)      |
| cc.easeCircleActionInOut    | [API description](%__APIDOC__%/en/modules/cc.html#easeCircleActionInOut)    |
| cc.easeCubicActionIn        | [API description](%__APIDOC__%/en/modules/cc.html#easeCubicActionIn)        |
| cc.easeCubicActionOut       | [API description](%__APIDOC__%/en/modules/cc.html#easeCubicActionOut)       |
| cc.easeCubicActionInOut     | [API description](%__APIDOC__%/en/modules/cc.html#easeCubicActionInOut)     |
