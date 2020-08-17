# Mesh Renderer 组件参考

> 文：youyou

Mesh Renderer 用于绘制网格资源，如果网格资源中含有多个子网格，那么 Mesh Renderer 中也需要有对应多的贴图才能正确绘制网格。

## 属性

![](img/mesh_renderer.png)

- mesh

  指定渲染所用的网格资源

- textures

  网格资源允许使用多个贴图资源，所有贴图资源都存在 `textures` 数组中。<br>
  如果网格资源中有多个子网格，那么 Mesh Renderer 会从 `textures` 数组中获取对应的贴图来渲染此子网格。

## 调试

网格的顶点数据一般都比较抽象，不太容易看出网格里面的三角形是如何分布的。这时候用户可以开启线框模式，用线段按照三角形的分布连接顶点与其他顶点，这样就比较容易看出网格顶点的数量和分布了。

```javascript
cc.macro.SHOW_MESH_WIREFRAME = true;
```
