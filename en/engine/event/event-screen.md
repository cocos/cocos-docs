# Screen Event System in Cocos Creator

## Introduction

As discussed earlier, `EventTarget` provides functionalities for event listening and emitting. Cocos Creator v3.8.0 introduces the `screen` object, which implements the `EventTarget` interface. This object allows registering global system screen events.

## Supported Events

Here's a table outlining the currently supported global screen events:

| Event Name                 | Description                                     | Supported Platforms       | Supported Version |
|----------------------------|-------------------------------------------------|--------------------------|-------------------|
| `window-resize`            | Listens for window size changes.                | Web, Native, MiniGame    | 3.8.0             |
| `orientation-change`       | Listens for screen orientation changes.        | Web, Native, MiniGame    | 3.8.3             |
| `fullscreen-change`        | Listens for full screen changes.                 | Web                     | 3.8.0             |

## Event Usage Example

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
