# Layout 组件参考

Layout 是一种容器组件，容器能够开启自动布局功能，自动按照规范排列所有子物体，方便用户制作列表、翻页等功能。

- 水平布局容器

![horizontal-layout.png](./layout/horizontal-layout.png)

- 垂直布局容器

![vertical-layout.png](./layout/vertical-layout.png)


- 网格布局容器

![grid-layout.png](./layout/grid-layout.png)



点击**属性检查器**下面的`添加组件`按钮，然后从`添加 UI 组件`中选择`Layout`，即可添加 Layout 组件到节点上。

布局的脚本接口请参考[Layout API](../api/classes/Layout.html)。

## Layout 属性

| 属性                 | 功能说明                                                                                                                                           |
| --------------       | -----------                                                                                                                                        |
| Type                 | 布局类型，支持 NONE, HORIZONTAL，VERTICAL 和 GRID。                                                                                                |
| ResizeMode           | 缩放模式，支持 NONE，CHIDREN 和 CONTAINER。                                                                                                        |
| PaddingLeft          | 排版时，子物体相对于容器左边框的距离。                                                                                                            |
| PaddingRight         | 排版时，子物体相对于容器右边框的距离。                                                                                                            |
| PaddingTop           | 排版时，子物体相对于容器上边框的距离。                                                                                                            |
| PaddingBottom        | 排版时，子物体相对于容器下边框的距离。                                                                                                            |
| SpacingX             | 水平排版时，子物体与子物体在水平方向上的间距。NONE 模式无此属性。                                                                                  |
| SpacingY             | 垂直排版时，子物体与子物体在垂直方向上的间距。NONE 模式无此属性。                                                                                  |
| Horizontal Direction | 指定水平排版时，第一个子节点从容器的左边还是右边开始布局。当容器为 Grid 类型时，此属性和 Start Axis 属性一起决定 Grid 布局元素的起始水平排列方向。 |
| Vertical Direction   | 指定垂直排版时，第一个子节点从容器的上面还是下面开始布局。当容器为 Grid 类型时，此属性和 Start Axis 属性一起决定 Grid 布局元素的起始垂直排列方向。 |
| Cell Size            | 此属性只在 Grid 布局时存在，指定网格容器里面排版元素的大小。                                                                                       |
| Start Axis           | 此属性只在 Grid 布局时存在，指定网格容器里面元素排版指定的起始方向轴。                                                                             |

## 详细说明

添加 Layout 组件之后，默认的布局类型是 NONE，它表示容器不会修改子物体的大小和位置，当用户手动摆放子物体时，容器会以能够容纳所有子物体的最小矩形区域作为自身的大小。

通过修改**属性检查器**里面的`Type`可以切换布局容器的类型，可以切换成水平，垂直或者网格布局。

另外，所有的容器均支持 ResizeMode（NONE 容器只支持 NONE 和 CONTAINER）。

- 当 ResizeMode 设置为 NONE 时，子物体和容器的大小变化互不影响。

- 设置为 CHILDREN 则子物体大小会随着容器的大小而变化。

- 设置为 CONTAINER 则容器的大小会随着子物体的大小变化。
