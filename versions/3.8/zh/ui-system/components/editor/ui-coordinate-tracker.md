# UICoordinateTracker 组件参考

UI 坐标跟踪映射组件是在 UI 上执行坐标转换以及模拟透视相机下 3D 物体近大远小效果。通过事件的方式将转换后的坐标以及物体在视口下的占比返回。适用于 3D 人物血条以及姓名条之类功能。

## UICoordinateTracker 属性

| 属性                 | 功能说明             |
| :--------------      | :----------        |
| Target               | 目标对象。需要转换到哪一个 UI 节点下。 |
| Camera               | 照射相机。 |
| UseScale             | 是否启用缩放。在透视相机下，根据 3D 节点坐标与相机的距离，调整映射后物体的缩放比例，实现近大远小效果。需要结合 distance 使用。 |
| Distance             | 距相机多少距离为正常显示计算大小。根据模型在相机下的照射效果调整最佳位置，以该位置为分界线计算在视口占比。 |
| SyncEvents           | 映射数据事件。回调的第一个参数是映射后的本地坐标，第二个是距相机距离比。 |

## SyncEvents 事件

可以使用 `onSyncEvents(localUIPos:Vec3,distanceScale: number,customEventData: string)` 来响应 `SyncEvents` 事件。

参数含义如下：

- `localUIPos:Vec3` 映射后的 UI 坐标
- `distanceScale: number` 距离相机的比
- `customEventData: string` 自定义数据，可在事件面板上配置

具体的使用方法可参考范例 **UI 展示 Demo**（[GitHub](https://github.com/cocos/cocos-example-ui/) | [Gitee](https://gitee.com/mirrors_cocos-creator/demo-ui/)）中的 rocker 场景。
