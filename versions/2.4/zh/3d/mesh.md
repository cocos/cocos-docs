# Mesh（网格）资源参考

> 文：youyou

Mesh 资源是渲染网格的必要资源，网格可以由多种方式获取到：

- 在导入模型到编辑器中的时候由编辑器自动生成
- 用户从脚本中手动创建或修改网格，通过这种方式可以非常方便的定制自己的网格

Mesh 资源中包含了一组顶点和多组索引。索引指向顶点数组中的顶点，每三组索引组成一个三角形。网格则是由多个三角形组成的。

Mesh 资源支持动态修改顶点数据和索引数据，并且提供了两个非常简单易用的 API，详细请参考下面的 API 介绍。

## API 介绍

- `init(vertexFormat, vertexCount, dynamic)`

  Mesh 资源允许自定义顶点数据，用户可以按照自己的需求来设置顶点数据的属性。<br>
  `init` 函数会根据传入的顶点格式 `vertexFormat` 和顶点数量 `vertexCount` 创建内部顶点数据。如果顶点数据会被经常修改，那么 `dynamic` 应该设置为 **true**。

- `setVertices(name, values, index)`

  根据传入的顶点属性名 `name` 来修改对应的数据为 `values`。`index` 指明修改的是哪一组顶点数据，默认值为 **0**。

- `setIndices(indices, index)`

  修改指定索引数组的数据为 `indices`，`index` 指明修改的是哪一组索引数据，默认值为 **0**。

## 示例

当用户需要在代码中动态创建网格时，首先应该指明网格中顶点数据存储的格式。

```javascript
let gfx = cc.renderer.renderEngine.gfx;

// 定义顶点数据格式，只需要指明所需的属性，避免造成存储空间的浪费
var vfmtPosColor = new gfx.VertexFormat([
    // 用户需要创建一个三维的盒子，所以需要三个值来保存位置信息
    {name: gfx.ATTR_POSITION, type: gfx.ATTR_TYPE_FLOAT32, num: 3},
    {name: gfx.ATTR_UV0, type: gfx.ATTR_TYPE_FLOAT32, num: 2},
    {name: gfx.ATTR_COLOR, type: gfx.ATTR_TYPE_UINT8, num: 4, normalize: true},
]);

let mesh = new cc.Mesh();
// 初始化网格信息
mesh.init(vfmtPosColor, 8, true);
```

```javascript
// 修改 position 顶点数据
mesh.setVertices(gfx.ATTR_POSITION, [
    cc.v3(-100, 100, 100), cc.v3(-100, -100, 100), cc.v3(100, 100, 100), cc.v3(100, -100, 100),
    cc.v3(-100, 100, -100), cc.v3(-100, -100, -100), cc.v3(100, 100, -100), cc.v3(100, -100, -100)
]);

// 修改 color 顶点数据
let color1 = cc.Color.RED;
let color2 = cc.Color.BLUE;
mesh.setVertices(gfx.ATTR_COLOR, [
    color1, color1, color1, color1,
    color2, color2, color2, color2,
]);

// 修改 uv 顶点数据
mesh.setVertices(gfx.ATTR_UV0, [
    cc.v2(0,0), cc.v2(0, 1), cc.v2(1, 0), cc.v2(1, 1),
    cc.v2(1,1), cc.v2(1, 0), cc.v2(0, 1), cc.v2(0, 0),
]);

// 修改索引数据
mesh.setIndices([
    0, 1, 2, 1, 3, 2, // front
    0, 6, 4, 0, 2, 6, // top
    2, 7, 6, 2, 3, 7, // right
    0, 5, 4, 0, 1, 5, // left
    1, 7, 5, 1, 3, 7, // bottom,
    4, 5, 6, 5, 7, 6, // back
]);
```
