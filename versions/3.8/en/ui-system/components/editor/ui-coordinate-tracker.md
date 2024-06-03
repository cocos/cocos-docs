# UICoordinateTracker component reference

The UICoordinateTracker component performs coordinate conversion on the UI and simulates the foreshortening effects of 3D objects in the perspective camera. Return the converted coordinates and the proportion of the object in the viewport through events. Suitable for functions such as 3D character blood bars and name bars.

Click the **Add Component** button at the bottom of the **Inspector** panel and select **UICoordinateTracker** from **UI** to add the **UICoordinateTracker** component to the node.

## UICoordinateTracker properties

| **Property** | **Function Description** |
| :-------------- | :---------- |
| **Target** | Target object. Which UI node needs to be converted to. |
| **Camera** | The 3D camera representing the original coordinate system. |
| **UseScale** | Whether to enable scaling, needs to be used in combination with the `Distance` property. If enabled, the scaling of the mapped object in the perspective camera will be adjusted according to the distance between the 3D node coordinates and the camera, resulting in a foreshortening effects. |
| **Distance** | The distance from the camera is calculated for normal display. Adjust the best position according to the illumination effect of the model under the camera, and use this position as the dividing line to calculate the proportion in the viewport. |
| **SyncEvents** | Map data events. The first parameter of the callback is the local coordinates after mapping, and the second is the distance ratio from the camera. |

## SyncEvents

You can use method likes `onSyncEvents(localUIPos:Vec3,distanceScale: number,customEventData: string)` to handle the `SyncEvents`

Parematers as following:

- `localUIPos:Vec3` ui coordinates after mapping
- `distanceScale: number` distance ratio from camera
- `customEventData: string` customize data, can be configured on the Inspector panel.

For specific usage, please refer to the **rocker** scene in the [UI display example](https://github.com/cocos/cocos-example-ui/tree/v3.0/assets/scene).
