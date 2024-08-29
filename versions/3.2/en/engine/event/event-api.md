# Global and Node Touch and Mouse Events API

## Mouse Event API

| Function Name | Return value type | Meaning                                                                                 |
|:--------------|:------------------|:----------------------------------------------------------------------------------------|
| __getScrollY__    | Number            | Get the scrolling distance of the mouse wheel on the y-axis, valid only when scrolling. |
| __getButton__       | Number | __EventMouse.BUTTON_LEFT__ or __EventMouse.BUTTON_RIGHT__ or __EventMouse.BUTTON_MIDDLE__.                     ｜

### Global Mouse Events API

| Function Name       | Return value type | Meaning                                                                                                                             |
|:--------------------|:------------------|:------------------------------------------------------------------------------------------------------------------------------------|
| __getLocation__         | Vec2              | Get the mouse position, which contains the x and y properties.                                                                      |
| __getLocationX__        | Number            | Get the mouse position on x-axis.                                                                                                   |
| __getLocationY__        | Number            | Get the mouse position on y-axis.                                                                                                   |
| __getPreviousLocation__ | Vec2              | Get the position of the last triggered mouse event, which contains the x and y properties.                                          |
| __getDelta__            | Vec2              | Get the distance the mouse has moved relative to the lower-left corner since the last event, which contains the x and y properties. |
| __getDeltaX__           | Number            | Get the x-axis distance the mouse has moved relative to the lower-left corner since the last event.                                 |
| __getDeltaY__           | Number            | Get the y-axis distance the mouse has moved relative to the lower-left corner since the last event.                                 |

### Node Mouse Events API

| Function Name         | Return value type | Meaning                                                                                                                                              |
|:-----------------------|:-------------------|:------------------------------------------------------------------------------------------------------------------------------------------------------|
| __getUILocation__         | Vec2              | Get the current mouse position relative to the lower-left corner of the UI window, which contains the x and y properties.                            |
| __getUILocationX__        | Number            | Get the position of the touch point on the x-axis relative to the lower-left corner of the UI window.                                                |
| __getUILocationY__        | Number            | Get the current mouse position on y-axis relative to the lower-left corner of the UI window.                                                                 |
| __getUIPreviousLocation__ | Vec2              | Get the previous mouse position relative to the lower-left corner of the UI window, which contains the x and y properties.                           |
| __getUIDelta__            | Vec2              | Get the distance the mouse has moved relative to the lower-left corner of the UI window since the last event, which contains the x and y properties. |
| __getUIDeltaX__           | Number            | Get the x-axis distance the mouse has moved relative to the lower-left corner of the UI window since the last event.                                 |
| __getUIDeltaY__           | Number            | Get the y-axis distance the mouse has moved relative to the lower-left corner of the UI window since the last event.                                 |

## Touch Events API

| API Name | Type   | Meaning                                                             |
|:----------|:--------|:---------------------------------------------------------------------|
| __touch__    | Touch  | The touch point related to the current event.                       |
| __getID__    | Number | Get the ID of the touch point, which is used for multi-touch logic. |

### Global Touch Events API

| Function Name       | Return value type | Meaning                                                                                                                             |
|:---------------------|:-------------------|:-------------------------------------------------------------------------------------------------------------------------------------|
| __getLocation__         | Vec2              | Get the mouse position, which contains the x and y properties.                                                                      |
| __getLocationX__        | Number            | Get the position of the touch point on the x-axis.                                                                                  |
| __getLocationY__        | Number            | Get the position of the touch point on the y-axis.                                                                                  |
| __getStartLocation__    | Vec2              | Get the initial position of the touch point, which contains the x and y properties.                                                     |
| __getPreviousLocation__ | Vec2              | Get the position of the last triggered touch point event, which contains the x and y properties.                                        |
| __getDelta__            | Vec2              | Get the distance the mouse has moved relative to the lower-left corner since the last event, which contains the x and y properties. |

### Node Touch Events API

| Function Name         | Return value type | Meaning                                                                                                                                              |
|:-----------------------|:-------------------|:------------------------------------------------------------------------------------------------------------------------------------------------------|
| __getUILocation__         | Vec2              | Get the current mouse position relative to the lower-left corner of the UI window, which contains the x and y properties.                            |
| __getUILocationX__        | Number            | Get the current mouse position on x-axis relative to the lower-left corner of the UI window.                                                         |
| __getUILocationY__        | Number            | Get the current mouse position on y-axis relative to the lower-left corner of the UI window.                                                         |
| __getUIStartLocation__    | Vec2              | Get the position of the initial touch point relative to the lower-left corner of the UI window, which contains the x and y properties.               |
| __getUIPreviousLocation__ | Vec2              | Get the position of the last touch point relative to the lower-left corner of the UI window, which contains the x and y properties.                  |
| __getUIDelta__            | Vec2              | Get the distance the mouse has moved relative to the lower-left corner of the UI window since the last event, which contains the x and y properties. |
