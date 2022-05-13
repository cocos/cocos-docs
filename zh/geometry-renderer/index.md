# 几何渲染器（Geometry-Renderer）

- 几何渲染器是cocos-engine提供的一种批量渲染各种几何体的功能接口，主要用于调试（比如显示物体的包围盒）及cocos-creator的gizmo批量显示。

- 几何渲染器的效果展示如图：
  ![geometry-renderer-demo](./geometry-renderer-demo.png)

- 几何渲染器的功能特性如图：
  ![geometry-renderer-features](./geometry-renderer-features.png)

  其中：
  - solid：是否支持实心模式，如果不支持则显示线框模式
  - depth test：是否支持深度测试，如果支持则被遮挡部分半透明显示，未被遮挡部分不透明显示，如果不支持则全部不透明显示
  - lighting：是否支持简单光照，如果不支持就使用无光模式
  - transform：是否支持变换，如果支持，开发者可传入一个变换矩阵，变换矩阵会作用到几何体的顶点上，方便显示任意坐标空间的几何体

- 支持的几何体类型：
  - 虚线
  - 线段
  - 三角形
  - 四边形
  - 轴对齐包围盒
  - 交叉点
  - 视锥
  - 胶囊体
  - 圆柱
  - 圆锥
  - 圆形
  - 弧形
  - 任意多边形
  - 圆盘
  - 扇形
  - 球体
  - 环面
  - 八面体
  - 贝塞尔曲线
  - 样条曲线，包含三种模式：折线段，多段贝塞尔曲线，Catmull-Rom曲线
  - 网格线框
  - 基于索引的网格线框

- 使用方式：
  - 由于每帧渲染完这些几何体后会清空顶点缓存，所以需要在update等函数中，每帧往geometry renderer对象（位于camera中）添加几何体，除此之外不需要额外的操作，示例 `TS` 代码如下：
    ```
    let renderer = this.mainCamera.geometryRenderer;
    renderer.addBoundingBox(box, color, wireframe, depthTest, unlit, useTransform, transform);
    ```