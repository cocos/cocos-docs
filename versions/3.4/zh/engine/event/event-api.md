# 全局与节点触摸和鼠标事件 API

## 鼠标事件 API

| 函数名                 | 返回值类型             | 意义             |
| :-------------             | :----------            |   :----------        |
| **getScrollY**      |  Number             | 获取滚轮滚动的 Y 轴距离，只有滚动时才有效。                      |
| **getButton**       | Number | **EventMouse.BUTTON_LEFT** 或 **EventMouse.BUTTON_RIGHT** 或 **EventMouse.BUTTON_MIDDLE**。                     ｜

### 全局鼠标事件 API

| 函数名                 | 返回值类型             | 意义             |
| :-------------             | :----------            |   :----------        |
| **getLocation**          | Vec2     |    获取鼠标位置对象，对象包含 x 和 y 属性。   |
| **getLocationX**         | Number   | 获取鼠标的 X 轴位置。                      |
| **getLocationY**         | Number   | 获取鼠标的 Y 轴位置。                      |
| **getPreviousLocation**  | Vec2     | 获取鼠标事件上次触发时的位置对象，对象包含 x 和 y 属性。  |
| **getDelta**             | Vec2     | 获取鼠标距离上一次事件移动相对于左下角的距离对象，对象包含 x 和 y 属性。    |
| **getDeltaX**             | Number | 获取当前鼠标距离上一次鼠标移动相对于左下角的 X 轴距离。                      |
| **getDeltaY**             | Number | 获取当前鼠标距离上一次鼠标移动相对于左下角的 Y 轴距离。    |

### 节点鼠标事件 API

| 函数名                 | 返回值类型             | 意义             |
| :-------------             | :----------            |   :----------        |
| **getUILocation**           | Vec2   | 获取当前鼠标在 UI 窗口内相对于左下角的坐标位置，对象包含 x 和 y 属性。                      |
| **getUILocationX**          | Number | 获取当前鼠标在 UI 窗口内相对于左下角的 X 轴位置。                      |
| **getUILocationY**          | Number | 获取当前鼠标在 UI 窗口内相对于左下角的 Y 轴位置。                      |
| **getUIPreviousLocation**   | Vec2   | 获取上一次鼠标在 UI 窗口内相对于左下角的坐标位置，对象包含 x 和 y 属性。                      |
| **getUIDelta**              | Vec2   | 获取鼠标距离上一次事件移动在 UI 坐标系下的距离对象，对象包含 x 和 y 属性。                      |
| **getUIDeltaX**             | Number | 获取当前鼠标距离上一次鼠标移动在 UI 窗口内相对于左下角的 X 轴距离。                      |
| **getUIDeltaY**             | Number | 获取当前鼠标距离上一次鼠标移动在 UI 窗口内相对于左下角的 Y 轴距离。    |

## 触摸事件 API

| API 名                 | 类型             | 意义             |
| :-------------             | :----------            |   :----------        |
| touch | Touch | 与当前事件关联的触点对象。                      |
| getID | Number | 获取触点的 ID，用于多点触摸的逻辑判断。                      |

### 全局触摸事件 API

| 函数名                 | 返回值类型             | 意义             |
| :-------------             | :----------            |   :----------        |
| **getLocation**          | Vec2     |    获取触点位置对象，对象包含 x 和 y 属性。   |
| **getLocationX**         | Number   | 获取触点的 X 轴位置。                      |
| **getLocationY**         | Number   | 获取触点的 Y 轴位置。                      |
| **getStartLocation** | Vec2 | 获取触点初始时的位置对象，对象包含 x 和 y 属性。                      |
| **getPreviousLocation**  | Vec2     | 获取触点事件上次触发时的位置对象，对象包含 x 和 y 属性。  |
| **getDelta**             | Vec2     | 获取触点距离上一次事件移动的距离对象，对象包含 x 和 y 属性。    |
| **getDeltaX**            | Number   | 获取触点距离上一次事件移动的 X 轴距离。          |
| **getDeltaY**            | Number   | 获取触点距离上一次事件移动的 Y 轴距离。          |

### 节点触摸事件 API

| 函数名                 | 返回值类型             | 意义             |
| :-------------             | :----------            |   :----------        |
| **getUILocation**           | Vec2   | 获取当前触点在 UI 窗口内相对于左下角的坐标位置，对象包含 x 和 y 属性。                      |
| **getUILocationX**          | Number | 获取当前触点在 UI 窗口内相对于左下角的 X 轴位置。                      |
| **getUILocationY**         | Number | 获取当前触点在 UI 窗口内相对于左下角的 Y 轴位置。                      |
| **getUIStartLocation**      | Vec2   | 获取初始触点在 UI 窗口内相对于左下角的位置对象，对象包含 x 和 y 属性。                      |
| **getUIPreviousLocation**   | Vec2   | 获取上一次触点在 UI 窗口内相对于左下角的坐标位置，对象包含 x 和 y 属性。                      |
| **getUIDelta**              | Vec2   | 获取当前触点距离上一次触点移动在 UI 窗口内相对于左下角的距离对象，对象包含 x 和 y 属性。                      |
| **getUIDeltaX**             | Number | 获取当前触点距离上一次触点移动在 UI 窗口内相对于左下角的 X 轴距离。                      |
| **getUIDeltaY**             | Number | 获取当前触点距离上一次触点移动在 UI 窗口内相对于左下角的 Y 轴距离。    |
