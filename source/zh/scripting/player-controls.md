# 玩家输入事件

本篇教程，我们将介绍 Cocos Creator 的玩家输入事件。

目前支持了以下几种事件：

- 键盘事件
- 鼠标事件
- 触摸（单点与多点）事件

## 如何定义输入事件

所有的事件都是通过函数 `cc.eventManager.addListener(listener, target)` 来进行添加。

可选的 `event` 类型有:
    1. cc.EventListener.MOUSE (鼠标)
    2. cc.EventListener.KEYBOARD (键盘)
    3. cc.EventListener.TOUCH_ONE_BY_ONE (单点触摸)
    4. cc.EventListener.TOUCH_ALL_AT_ONCE (多点触摸)

### 鼠标事件

- 事件监听器类型：`cc.EventListener.MOUSE`
- 事件触发后的回调函数：
    - 鼠标按下：onMouseDown(event);
    - 鼠标释放：onMouseUp(evnet);
    - 鼠标移动：onMouseMove(evnet);
    - 鼠标滚轮：onMouseScroll(evnet);
- 回调参数：
    - Event：[API 传送门](http://cocos.com/docs/creator/api/classes/Event.html)

```js
// 添加鼠标事件监听器
var listener = {
    event: cc.EventListener.MOUSE,
    onMouseDown: function (event) {
        cc.log('Mouse Down: ' + event);
    },
    onMouseUp: function (event) {
        cc.log('Mouse Up: ' + event);
    }，
    onMouseMove: function (event) {
       cc.log('Mouse Move: ' + event);
    }
    onMouseScroll: function (event) {
       cc.log('Mouse Scroll: ' + event);
    }
}
// 绑定鼠标事件
cc.eventManager.addListener(listener, this.node);
```

### 键盘事件

- 事件监听器类型：`cc.EventListener.KEYBOARD`
- 事件触发后的回调函数：
    - 键盘按下：onKeyPressed(keyCode, event);
    - 键盘释放：onKeyReleased(keyCode, evnet);
- 回调参数：
    - KeyCode: [API 传送门](http://cocos.com/docs/creator/api/enums/KEY.html)
    - Event：[API 传送门](http://cocos.com/docs/creator/api/classes/Event.html)

```js
// 添加键盘事件监听器
var listener = {
    event: cc.EventListener.KEYBOARD,
    onKeyPressed: function (keyCode, event) {
        cc.log('keyDown: ' + keyCode);
    },
    onKeyReleased: function (keyCode, event) {
        cc.log('keyUp: ' + keyCode);
    }
}
// 绑定键盘事件
cc.eventManager.addListener(listener, this.node);
```

### 单点触摸事件

- 事件监听器类型：`cc.EventListener.TOUCH_ONE_BY_ONE`
- 事件触发后的回调函数：
    - 触摸开始：onTouchBegan(touches, event);
    - 触摸移动时：onTouchMoved(touches, event);
    - 触摸结束时：onTouchEnded(touches, event);
    - 取消触摸：onTouchCancelled(touches, event);
- 回调参数：
    - Touches: 触摸点的列表，单个Touch [API 传送门](http://cocos.com/docs/creator/api/classes/Touch.html)
    - Event：[API 传送门](http://cocos.com/docs/creator/api/classes/Event.html)

注意：`onTouchBegan` 回调事件里要 `return true`，
这样后续的 `onTouchEnded` 和 `onTouchMoved` 才会触发事件。

```js
// 添加单点触摸事件监听器
var listener = {
    event: cc.EventListener.TOUCH_ONE_BY_ONE,
    onTouchBegan: function (touches, event) {
        cc.log('Touch Began: ' + event);
        return true; //这里必须要写 return true
    },
    onTouchMoved: function (touches, event) {
        cc.log('Touch Moved: ' + event);
    }，
    onTouchEnded: function (touches, event) {
       cc.log('Touch Ended: ' + event);
    }
    onTouchCancelled: function (touches, event) {
       cc.log('Touch Cancelled: ' + event);
    }
}
// 绑定单点触摸事件
cc.eventManager.addListener(listener, this.node);
```

### 多点触摸事件

- 事件监听器类型：`cc.EventListener.TOUCH_ALL_AT_ONCE`
- 事件触发后的回调函数：
    - 触摸开始：onTouchesBegan(touches, event);
    - 触摸移动时：onTouchesMoved(touches, event);
    - 触摸结束时：onTouchesEnded(touches, event);
    - 取消触摸：onTouchesCancelled(touches, event);
- 回调参数：
    - Touches: 触摸点的列表，单个Touch [API 传送门](http://cocos.com/docs/creator/api/classes/Touch.html)
    - Event：[API 传送门](http://cocos.com/docs/creator/api/classes/Event.html)

同理：`onTouchesBegan` 回调事件里也要 `return true`，
这样后续的 `onTouchesEnded` 和 `onTouchesMoved` 才会触发事件。

```js
// 添加多点触摸事件监听器
var listener = {
    event: cc.EventListener.TOUCH_ALL_AT_ONCE,
    onTouchesBegan: function (touches, event) {
        // touches 触摸点的列表
        cc.log('Touch Began: ' + event);
        return true; //这里必须要写 return true
    },
    onTouchesMoved: function (touches, event) {
        cc.log('Touch Moved: ' + event);
    }，
    onTouchesEnded: function (touches, event) {
       cc.log('Touch Ended: ' + event);
    }
    onTouchesCancelled: function (touches, event) {
       cc.log('Touch Cancelled: ' + event);
    }
}
// 绑定多点触摸事件
cc.eventManager.addListener(listener, this.node);
```
大家可以也去看 [官方范例](https://github.com/cocos-creator/example-cases) `cases03_gameplay/01_player_control` 目录下的完整范例。
