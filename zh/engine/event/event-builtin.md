# 节点系统事件

如上一篇文档所述，Node 有一套完整的 [事件监听和分发机制](event-emit.md)。在这套机制之上，我们提供了一些基础的节点相关的系统事件，这篇文档将介绍这些事件的使用方式。

Cocos Creator 支持的系统事件包含鼠标、触摸、键盘和重力传感四种，它们被称为 [全局事件](event-input.md)。本章节重点介绍与 UI 节点树相关联的鼠标和触摸事件，这些事件是被直接触发在 UI 相关节点上的，所以被称为节点事件。

节点事件遵守通用的注册方式，开发者既可以使用枚举类型也可以直接使用事件名来注册事件的监听器，在这里建议使用枚举的方式来注册事件，避免事件因为书写问题导致注册失败。

```ts
// 使用枚举类型来注册
node.on(Node.EventType.MOUSE_DOWN, (event) => {
  console.log('Mouse down');
}, this);

// 使用事件名来注册
node.on('mouse-down', (event) => {
  console.log('Mouse down');
}, this);
```

## 鼠标事件类型和事件对象

鼠标事件在桌面平台才会触发，系统提供的事件类型如下：

| 举对象定义性                   | 对应的事件名 | 事件触发的时机                             |
|:--------------------------------|:--------------|:-------------------------------------|
| **Node.EventType.MOUSE_DOWN**  | mouse-down   | 当鼠标在目标节点区域按下时触发一次。        |
| **Node.EventType.MOUSE_ENTER** | mouse-enter  | 当鼠标移入目标节点区域时，不论是否按下。     |
| **Node.EventType.MOUSE_MOVE**  | mouse-move   | 当鼠标在目标节点区域中移动时，不论是否按下。 |
| **Node.EventType.MOUSE_LEAVE**     |   mouse-leave     | 当鼠标移出目标节点区域时，不论是否按下。
| **Node.EventType.MOUSE_UP**        | mouse-up          | 当鼠标从按下状态松开时触发一次。     |
| **Node.EventType.MOUSE_WHEEL**     |  mouse-wheel      | 当鼠标滚轮滚动时。                |

鼠标事件（Event.EventMouse）的重要 API 请参考 [鼠标事件 API](event-api.md#鼠标事件-API)（Event 标准事件 API 除外）。

## 触摸事件类型和事件对象

触摸事件在移动平台和桌面平台都会触发，开发者可以更好的在桌面平台调试，只需要监听触摸事件即可同时响应移动平台的触摸事件和桌面端的鼠标事件。系统提供的触摸事件类型如下：

| 枚举对象定义                    | 对应的事件名 | 事件触发的时机                    |
|:--------------------------------|:-------------|:---------------------------|
| **Node.EventType.TOUCH_START**  | touch-start  | 当手指触点落在目标节点区域内时。   |
| **Node.EventType.TOUCH_MOVE**   | touch-move   | 当手指在屏幕上移动时。             |
| **Node.EventType.TOUCH_END**    | touch-end    | 当手指在目标节点区域内离开屏幕时。 |
| **Node.EventType.TOUCH_CANCEL** | touch-cancel | 当手指在目标节点区域外离开屏幕时。 |

触摸事件（Event.EventTouch）的重要 API 请参考 [触摸事件 API](./event-api.md#触摸事件-API)（Event 标准事件 API 除外）。

需要注意的是，触摸事件支持多点触摸，每个触点都会发送一次事件给事件监听器。

## 触摸事件的传递

### 触摸事件冒泡

触摸事件支持节点树的事件冒泡，以下图为例：

![propagation](propagation.png)

在图中的场景里，假设 A 节点拥有一个子节点 B，B 拥有一个子节点 C。开发者对 A、B、C 都监听了触摸事件（以下的举例都默认节点监听了触摸事件）。

当鼠标或手指在 C 节点区域内按下时，事件将首先在 C 节点触发，C 节点监听器接收到事件。接着 C 节点会将事件向其父节点传递这个事件，B 节点的监听器将会接收到事件。同理 B 节点会将事件传递给 A 父节点。这就是最基本的事件冒泡过程。需要强调的是，在触摸事件冒泡的过程中不会有触摸检测，这意味着即使触点不在 A B 节点区域内，A B 节点也会通过触摸事件冒泡的机制接收到这个事件。

触摸事件的冒泡过程与普通事件的冒泡过程并没有区别。所以，调用 `event.propagationStopped = true;` 可以主动停止冒泡过程。

### 同级节点间的触点归属问题

假设上图中 B、C 为同级节点，C 节点部分覆盖在 B 节点之上。这时候如果 C 节点接收到触摸事件后，就宣布了触点归属于 C 节点，这意味着同级节点的 B 就不会再接收到触摸事件了，即使触点同时也在 B 节点内。同级节点间，触点归属于处于顶层的节点。

此时如果 C 节点还存在父节点，则还可以通过事件冒泡的机制传递触摸事件给父节点。

### 不同 Canvas 的触点归属问题

不同 Canvas 之间的触点拦截是根据优先级决定的。在下图中的场景里，节点树里的 Canvas 1-5 对应图片显示的 priority 1-5。可以看出，即使 Canvas 节点 3、4、5 之间是按乱序排的，但是根据 Canvas 上的优先级（priority）关系，触点的响应先后顺序仍然是 **Canvas5 -> Canvas4 -> Canvas3 -> Canvas2 -> Canvas1**。只有在优先级相同的情况下，Canvas 之间的排序是按节点树的先后顺序进行。

![multi-canvas](multi-canvas.png)

### 将触摸或鼠标事件注册在捕获阶段

有时候我们需要父节点的触摸或鼠标事件先于它的任何子节点派发，比如 **ScrollView** 组件就是这样设计的。这时候事件冒泡已经不能满足我们的需求了，需要将父节点的事件注册在捕获阶段。

要实现这个需求，可以在给 node 注册触摸或鼠标事件时，传入第四个参数 `true`，表示 `useCapture`。例如：

```ts
this.node.on(Node.EventType.TOUCH_START, this.onTouchStartCallback, this, true);
```

当节点触发 `touch-start` 事件时，会先将 `touch-start` 事件派发给所有注册在捕获阶段的父节点监听器，然后派发给节点自身的监听器，最后才到了事件冒泡阶段。

只有触摸或鼠标事件可以注册在捕获阶段，其他事件不能注册在捕获阶段。

### 事件拦截

正常的事件是会按照以上说明的方式去派发。但是如果节点身上带有 `Button`、`Toggle` 或者 `BlockInputEvents` 这几个组件的话，是会停止事件冒泡。还是看下图。图中有两个按钮，Canvas0 下的 priority 1 和 Canvas1 下的 priority 2。如果点击两个按钮的交汇处，也就是图中蓝色区域，会出现按钮 priority 2 成功接收到了触点事件，而按钮 priority 1 则没有。那是因为按上述的事件接收规则，按钮 priority 2 优先接收到了触点事件，并且对事件进行了拦截（`event.propagationStopped = true`），防止事件穿透。如果是非按钮节点，也可以通过添加 `BlockInputEvents` 组件来对事件进行拦截，防止穿透。

![events-block](events-block.png)

## 触摸事件举例

以下图举例，总结下触摸事件的传递机制。图中有 A、B、C、D 四个节点，其中 A、B 为同级节点。具体层级关系如下：

![example](example.png)

1. 若触点在 A、B 的重叠区域内，此时 B 接收不到触摸事件，事件的传递顺序是 A -> C -> D
2. 若触点在 B 节点内（可见的绿色区域），则事件的传递顺序是 B -> C -> D
3. 若触点在 C 节点内，则事件的传递顺序是 C -> D
4. 若以第 2 种情况为前提，同时 C D 节点的触摸事件注册在捕获阶段，则事件的传递顺序是 D -> C -> B

## Node 的其它事件

所有的 node 内置事件都可以通过 `Node.EventType` 获取事件名。

### 3D 节点事件

| 枚举对象定义               | 对应的事件名             | 事件触发的时机             |
| :-------------             | :----------            |   :----------        |
| **TRANSFORM_CHANGED** | transform-changed | 当变换属性修改时，会派发一个枚举值 `TransformBit`，根据枚举值定义修改的变换。                      |

变换枚举值定义：

| 枚举值含义                | 对应的变换                 |
|:---------------------------|:-----------------------|
| **TransformBit.NONE**     | 属性无改变。                |
| **TransformBit.POSITION** | 节点位置改变。              |
| **TransformBit.ROTATION** | 节点旋转改变。              |
| **TransformBit.SCALE**    | 节点缩放改变。              |
| **TransformBit.RS**       | 节点旋转及缩放改变。        |
| **TransformBit.TRS**      | 节点平移，旋转及缩放都改变。 |

### 2D 节点事件

| 枚举对象定义       | 对应的事件名   | 事件触发的时机                                      |
|:--------------------|:----------------|:----------------------------------------------|
| **SIZE_CHANGED**   | size-changed   | 当宽高属性修改时。宽高属性位于 `UITransform` 组件上。 |
| **ANCHOR_CHANGED** | anchor-changed | 当锚点属性修改时。锚点属性位于 `UITransform` 组件上。 |
| **COLOR_CHANGED** | color-changed | 当颜色属性修改时。颜色属性位于 UI 渲染组件上。                      |

## 多点触摸事件

引擎有多点触摸事件的屏蔽开关，多点触摸事件默认为开启状态。对于不需要多点触摸的项目，可以通过以下代码关闭多点触摸。

```ts
macro.ENABLE_MULTI_TOUCH = false;
```

或者也可以通过 **项目设置/Macro Config** 进行配置。

## 暂停或恢复节点系统事件

暂停节点系统事件

```ts
// 暂停当前节点上注册的所有节点系统事件，节点系统事件包含触摸和鼠标事件。
// 如果传递参数 true，那么这个 API 将暂停本节点和它的所有子节点上的节点系统事件。
// example
this.node.pauseSystemEvents();
```

恢复节点系统事件

```ts
// 恢复当前节点上注册的所有节点系统事件，节点系统事件包含触摸和鼠标事件。
// 如果传递参数 true，那么这个 API 将恢复本节点和它的所有子节点上的节点系统事件。
// example
this.node.resumeSystemEvents();
```
