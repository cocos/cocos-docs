# UICoordinateTracker component reference

The UI coordinate tracking mapping component performs coordinate conversion on the UI and simulates the effect of 3D objects close to large and small under a perspective camera. Return the converted coordinates and the proportion of the object in the viewport through events. Suitable for functions such as 3D character blood bar and name bar.

## UICoordinateTracker properties

| **Properties** | **Function Description** |
| :-------------- | :---------- |
| **Target** | Target object. Which UI node needs to be converted to. |
| **Camera** | Illuminate the camera. |
| **UseScale** | Whether it is a zoom map. If it is a perspective camera, check this option to return the proportion of an object under the viewport. |
| **Distance** | The distance from the camera is calculated for normal display. Adjust the best position according to the illumination effect of the model under the camera, and use this position as the dividing line to calculate the proportion in the viewport. |
| **CoordinateDataEvents** | Map data events. The first parameter of the callback is the local coordinates after mapping, and the second is the distance ratio from the camera. |

For specific usage, please refer to the **UI display Demo** example: ([GitHub](https://github.com/cocos-creator/demo-ui/) | [Gitee](https://gitee.com/mirrors_cocos-creator/demo-ui/)).
