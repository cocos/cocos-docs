# Layout 组件参考

Layout 是一种容器组件，容器能够开启自动布局功能，自动按照规范排列所有子物体，方便用户制作列表、翻页等功能。

![layout](layout/layout.png)

点击 **属性检查器** 下面的 **添加组件** 按钮，然后选择 **UI -> Layout** 即可添加 Layout 组件到节点上。

布局的组件接口请参考 [Layout API](%__APIDOC__%/zh/#/docs/3.4/zh/ui/Class/Layout)。

具体使用方法可参考范例 **Layout**（[GitHub](https://github.com/cocos/cocos-test-projects/tree/v3.4/assets/cases/ui/05.layout) | [Gitee](https://gitee.com/mirrors_cocos-creator/test-cases-3d/tree/v3.4/assets/cases/ui/05.layout)）。

## Layout 属性

| 属性                 | 功能说明     |
| :-----------------  | :--------- |
| **Type**                 | 布局类型，支持 **NONE**、**HORIZONTAL**、**VERTICAL** 和 **GRID**。                                                                                                 |
| **ResizeMode**         | 缩放模式，支持 **NONE**、**CHILDREN** 和 **CONTAINER**。                                                                                                        |
| **PaddingLeft**         | 排版时，子物体相对于容器左边框的距离。                                                                                                            |
| **PaddingRight**         | 排版时，子物体相对于容器右边框的距离。                                                                                                            |
| **PaddingTop**           | 排版时，子物体相对于容器上边框的距离。                                                                                                            |
| **PaddingBottom**        | 排版时，子物体相对于容器下边框的距离。                                                                                                            |
| **SpacingX**             | 水平排版时，子物体与子物体在水平方向上的间距。NONE 模式无此属性。                                                                                  |
| **SpacingY**             | 垂直排版时，子物体与子物体在垂直方向上的间距。NONE 模式无此属性。                                                                                  |
| **HorizontalDirection** | 指定水平排版时，第一个子节点从容器的左边还是右边开始布局。当容器为 `GRID` 类型时，此属性和 `Start Axis` 属性一起决定 Grid 布局元素的起始水平排列方向。 |
| **VerticalDirection**   | 指定垂直排版时，第一个子节点从容器的上面还是下面开始布局。当容器为 `GRID` 类型时，此属性和 `Start Axis` 属性一起决定 Grid 布局元素的起始垂直排列方向。 |
| **CellSize**            | 此属性只在 `GRID` 布局、`Children` 缩放模式时存在，指定网格容器里面排版元素的大小。                                                                                       |
| **StartAxis**           | 此属性只在 `GRID` 布局时存在，指定网格容器里面元素排版指定的起始方向轴。                                                                             |
| **AffectedByScale**    | 子节点的缩放是否影响布局。  |
| **AutoAlignment**    | 自动对齐，在 `Type` 类型为 **HORIZONTAL** 或 **VERTICAL** 模式下，保证另外一个轴向值始终为 0。 |
| **Constraint**    | 布局约束，可以在某个方向上约束排列数量，支持 **NONE**、**FIXED_ROW** 和 **FIXED_COL**。 |
| **ConstraintNum**    | 布局约束值，在 `Constraint` 的类型为 **FIXED_ROW** 或 **FIXED_COL** 模式下有效。 |

## 详细说明

添加 Layout 组件之后，默认的布局类型是 **NONE**，可以通过修改 **属性检查器** 里的 `Type` 切换容器排列类型。类型分为 **HORIZONTAL**（水平）、**VERTICAL**（垂直）以及 **GRID**（网格）布局。另外，除了 **NONE** 布局类型，其他都支持 `ResizeMode`。

- **ResizeMode** 模式：

    - 设置为 **NONE** 时，子物体和容器的大小变化互不影响。

    - 设置为 **CHILDREN** 时，子物体大小会随着容器的大小而变化。

    - 设置为 **CONTAINER** 时，容器的大小会随着子物体的大小变化。

    所有的排列都是根据容器大小进行计算的，如果需要固定排序，可以将 Type 设置为 **GRID**，然后设置 `Constraint` 和 `ConstraintNum` 来固定排序。

- **Constraint** 模式：

    - 设置为 **NONE** 时，自由布局。

    - 设置为 **FIXED_ROW** 时，固定行数，搭配 `ConstraintNum` 使用。

    - 设置为 **FIXED_COL** 时，固定列数，搭配 `ConstraintNum` 使用。

> **注意**：Layout 设置后的结果需要到下一帧才会更新，除非你设置完以后手动调用 `updateLayout` API。

更多布局案例，详情请参考 [自动布局](../engine/auto-layout.md)。
