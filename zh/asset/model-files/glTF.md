
# glTF 模型

Creator 支持 glTF 2.0 及更早的规范。

# URI 解析

Creator 支持 glTF 中指定以下形式的 URI：

- Data URI

- 相对 URI 路径

- 文件 URL

- 文件路径

# 转换关系

glTF 模型中的资源按以下关系转换为 Creator 资源：

|                                              glTF 资源                                              | Cocos Creator 资源 |
|:---------------------------------------------------------------------------------------------------:|:------------------:|
|   [glTF 场景](https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#reference-scene)   |       预制体       |
|   [glTF 网格](https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#reference-mesh)    |        网格        |
|   [glTF 蒙皮](https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#reference-skin)    |        骨骼        |
| [glTF 材质](https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#reference-material)  |        材质        |
|  [glTF 贴图](https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#reference-texture)  |        贴图        |
|   [glTF 图像](https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#reference-image)   |        图像        |
| [glTF 动画](https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#reference-animation) |      动画剪辑      |

## glTF 场景

glTF 场景将被转换为预制体资源，glTF 场景中递归包含的结点也将按相同层级关系一一转换为预制体中的结点。

### 场景根结点

预制体将使用一个不带任何空间转换信息的结点作为根结点，glTF 场景的所有 [根结点](https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#scenenodes) 将作为该结点的子结点。

此条规则的例外是：勾选了“提升单一子结点”后，若 glTF 场景仅存在一个根结点，则转换该根结点为预制体的根结点。

### 结点转换

glTF 结点按以下映射关系转换为预制体结点：

|                                        glTF 结点属性                                        |          预制体结点属性          |
|:-------------------------------------------------------------------------------------------:|:--------------------------------:|
| [层级关系](https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#nodechildren) |             层级关系             |
| [位移](https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#nodetranslation)  |               位置               |
|   [旋转](https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#noderotation)   |               旋转               |
|    [缩放](https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#nodescale)     |               缩放               |
|    [矩阵](https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#nodematrix)    | 解压，并分别设置位置、旋转、缩放 |
|   [网格引用](https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#nodemesh)   |          网格渲染器组件          |
|   [蒙皮引用](https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#nodeskin)   |        蒙皮网格渲染器组件        |
| [初始权重](https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#nodeweights)  |    （蒙皮）网格渲染器组件权重    |

### 网格渲染器

当 glTF 结点引用网格时，将为相应的预制体结点添加网格渲染器组件；若该 glTF 结点还引用了蒙皮，则转而添加蒙皮网格渲染器组件。

（蒙皮）网格渲染器的网格、骨骼和材质，都将指向对应 glTF 网格、蒙皮、材质转换后的资源。

若 glTF 结点指定了初始权重，则转换后的（蒙皮）网格渲染器也将带有此权重。

## glTF 网格

glTF 网格将被转换为 Cocos Creator 网格资源。

glTF 网格中的所有 [基元体](https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#meshprimitives-white_check_mark) 将被一一转换为 Cocos Creator 子网格。

若 glTF 网格指定了 [权重](https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#meshweights)，则相应的 Cocos Creator 网格中也将存储相应的权重。

### glTF 基元体

glTF 基元体的索引数组将映射为 Cocos Creator 子网格的索引数组。

glTF 基元模式将映射为 Cocos Creator 基元模式：

|  glTF 基元模式   |       Cocos Creator 基元模式       |
|:----------------:|:----------------------------------:|
|     `POINTS`     |   `gfx.PrimitiveMode.POINT_LIST`   |
|     `LINES`      |   `gfx.PrimitiveMode.LINE_LIST`    |
|   `LINE_LOOP`    |   `gfx.PrimitiveMode.LINE_LOOP`    |
|   `LINE_STRIP`   |   `gfx.PrimitiveMode.LINE_STRIP`   |
|   `TRIANGLES`    | `gfx.PrimitiveMode.TRIANGLE_LIST`  |
| `TRIANGLE_STRIP` | `gfx.PrimitiveMode.TRIANGLE_STRIP` |
|  `TRIANGLE_FAN`  |  `gfx.PrimitiveMode.TRIANGLE_FAN`  |

glTF 顶点属性将转换为 Cocos Creator 顶点属性。属性名称按下表进行转换：

|     glTF 顶点属性名称      |                        Cocos Creator 顶点属性名称                        |
|:--------------------------:|:------------------------------------------------------------------------:|
|         `POSITION`         |                    `gfx.AttributeName.ATTR_POSITION`                     |
|          `NORMAL`          |                     `gfx.AttributeName.ATTR_NORMAL`                      |
|         `TANGENT`          |                     `gfx.AttributeName.ATTR_TANGENT`                     |
|        `TEXCOORD_0`        |                    `gfx.AttributeName.ATTR_TEX_COORD`                    |
| `TEXCOORD_1`..`TEXCOORD_8` | `gfx.AttributeName.ATTR_TEX_COORD1`..`gfx.AttributeName.ATTR_TEX_COORD8` |
|         `COLOR_0`          |                      `gfx.AttributeName.ATTR_COLOR`                      |
|    `COLOR_1`..`COLOR_2`    |     `gfx.AttributeName.ATTR_COLOR1`..`gfx.AttributeName.ATTR_COLOR2`     |
|         `JOINTS_0`         |                     `gfx.AttributeName.ATTR_JOINTS`                      |
|        `WEIGHTS_0`         |                     `gfx.AttributeName.ATTR_WEIGHTS`                     |

特别地，若 glTF 基元体中存在其他 `JOINTS`、`WEIGHTS` 顶点属性时，例如 `JOINTS_1`、`WEIGHTS_1`，

> 注意：这意味着此 glTF 网格的顶点可能受多于 4 根骨骼的影响。

对于每个顶点，所有由 `JOINTS_{}`、`WEIGHTS_{}` 确定的权重信息将按权重值被排序，取出影响权重最大的四根骨骼作为 `gfx.AttributeName.ATTR_JOINTS` 和 `gfx.AttributeName.ATTR_WEIGHTS`。

glTF 形变目标将被转换为 Cocos Creator 子网格形变数据。

## glTF 蒙皮

glTF 蒙皮将被转换为骨骼资源。

## glTF 材质

glTF 材质将被转换为 Cocos Creator 材质资源。

## glTF 贴图

glTF 贴图将被转换为 Cocos Creator 贴图资源。

glTF 贴图引用的 glTF 图像将转换为对相应转换的 Cocos Creator 图像的引用。

glTF 贴图参数按以下关系映射：

|                                           glTF 贴图参数                                           |   Cocos Creator 贴图参数   |
|:-------------------------------------------------------------------------------------------------:|:--------------------------:|
| [放大筛选器](https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#samplermagfilter) |         放大筛选器         |
| [缩小筛选器](https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#samplerminfilter) | 缩小筛选器、Mip Map 筛选器 |
|   [S 环绕模式](https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#samplerwraps)   |         S 环绕模式         |
|   [T 环绕模式](https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#samplerwrapt)   |          环绕模式          |

glTF 贴图缩小筛选器将映射为 Cocos Creator 贴图缩小筛选器：

| glTF 贴图放大筛选器 | Cocos Creator 贴图放大筛选器 |
|:-------------------:|:----------------------------:|
|      `NEAREST`      | `TextureBase.Filter.NEAREST` |
|      `LINEAR`       | `TextureBase.Filter.LINEAR`  |

glTF 贴图缩小筛选器将映射为 Cocos Creator 贴图缩小筛选器和 Cocos Creator 贴图 Mip Map 筛选器：

|   glTF 贴图缩小筛选器    | Cocos Creator 贴图缩小筛选器 | Cocos Creator 贴图 Mip Map 筛选器 |
|:------------------------:|:----------------------------:|-----------------------------------|
|        `NEAREST`         | `TextureBase.Filter.NEAREST` | `TextureBase.Filter.NONE`         |
|  `LINEAR_MIPMAP_LINEAR`  | `TextureBase.Filter.LINEAR`  | `TextureBase.Filter.NONE`         |
| `LINEAR_MIPMAP_NEAREST`  | `TextureBase.Filter.NEAREST` | `TextureBase.Filter.NEAREST`      |
|         `LINEAR`         | `TextureBase.Filter.LINEAR`  | `TextureBase.Filter.NEAREST`      |
| `NEAREST_MIPMAP_LINEAR`  | `TextureBase.Filter.NEAREST` | `TextureBase.Filter.LINEAR`       |
| `NEAREST_MIPMAP_NEAREST` | `TextureBase.Filter.LINEAR`  | `TextureBase.Filter.LINEAR`       |

glTF 贴图环绕模式将映射为 Cocos Creator 贴图环绕模式：

| glTF 贴图环绕模式 |       Cocos Creator 贴图环绕模式       |
|:-----------------:|:--------------------------------------:|
|  `CLAMP_TO_EDGE`  |  `TextureBase.WrapMode.CLAMP_TO_EDGE`  |
|     `REPEAT`      |     `TextureBase.WrapMode.REPEAT`      |
| `MIRRORED_REPEAT` | `TextureBase.WrapMode.MIRRORED_REPEAT` |

## glTF 图像

glTF 图像将被转换为 Cocos Creator 图像资源。

当 glTF 图像的 [URI](https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#imageuri) 是 Data URI 时，图像数据将从 Data URI 中获取。否则，将依照 [Cocos Creator 图像位置解析算法](./image-location-resolution.md) 解析并引用外部图像文件，其中 `url` 就是 glTF 图像的 URI，`startDir` 为 glTF 文件所在目录。

## glTF 动画

glTF 动画将被转换为 Cocos Creator 动画资源。
