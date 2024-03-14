# 屏幕事件系统

## 简介

正如之前所讨论的，EventTarget 提供了事件监听和发射的功能。Cocos Creator v3.8.0 引入了 screen 对象，它实现了 EventTarget 接口。该对象允许注册全局系统屏幕事件。

## 支持的事件

以下是当前支持的全局屏幕事件概述：

| 事件名称                 | 描述                                     | 支持平台       | 支持版本 |
|----------------------------|-------------------------------------------------|--------------------------|-------------------|
| `window-resize`            | 监听窗口大小变化                | Web, Native, MiniGame    | 3.8.0             |
| `orientation-change`       | 监听屏幕方向变化        | Web, Native, MiniGame    | 3.8.3             |
| `fullscreen-change`        | 监听全屏变化                 | Web                     | 3.8.0             |

## 事件使用示例

```typescript
import { _decorator, Component, screen, macro } from 'cc';
const { ccclass } = _decorator;

@ccclass("Example")
export class Example extends Component {
  onLoad() {
    // Register event listeners with the screen object
    screen.on('window-resize', this.onWindowResize, this);
    screen.on('orientation-change', this.onOrientationChange, this);
    screen.on('fullscreen-change', this.onFullScreenChange, this);
  }

  onDestroy() {
    // Unregister event listeners when the component is destroyed
    screen.off('window-resize', this.onWindowResize, this);
    screen.off('orientation-change', this.onOrientationChange, this);
    screen.off('fullscreen-change', this.onFullScreenChange, this);
  }

  onWindowResize(width: number, height: number) {
    console.log("Window resized:", width, height);
  }

  onOrientationChange(orientation: number) {
    if (orientation === macro.ORIENTATION_LANDSCAPE_LEFT || orientation === macro.ORIENTATION_LANDSCAPE_RIGHT) {
      console.log("Orientation changed to landscape:", orientation);
    } else {
      console.log("Orientation changed to portrait:", orientation);
    }
  }

  onFullScreenChange(width: number, height: number) {
    console.log("Fullscreen change:", width, height);
  }
}
```
