# UICoordinateTracker 组件参考

UI 坐标跟踪映射组件是在 UI 上执行坐标转换以及模拟透视相机下 3D 物体近大远小效果。通过事件的方式将转换后的坐标以及物体在视口下的占比返回。适用于 3D 人物血条以及姓名条之类功能。

## UICoordinateTracker 属性

| 属性                 | 功能说明             |
| :--------------      | :----------        |
| Target               | 目标对象。需要转换到哪一个 UI 节点下。 |
| Camera               | 照射相机。 |
| UseScale               | 是否是缩放映射。如果是透视相机，勾选此项，返回一个物体在视口下的占比。 |
| Distance               | 距相机多少距离为正常显示计算大小。根据模型在相机下的照射效果调整最佳位置，以该位置为分界线计算在视口占比。 |
| CoordinateDataEvents    | 映射数据事件。回调的第一个参数是映射后的本地坐标，第二个是距相机距离比。 |

具体的使用方法可参考范例 **UI 展示 Demo**（[GitHub](https://github.com/cocos-creator/demo-ui/) | [Gitee](https://gitee.com/mirrors_cocos-creator/demo-ui/)）中的 rocker 场景。
