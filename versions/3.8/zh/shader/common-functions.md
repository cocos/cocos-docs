# 公共函数库

可以在 **资源管理器/internal/chunks/common/** 文件夹下找到不同分类的函数库头文件。

公共库中的函数不依赖任何内部数据，可以当作工具函数直接使用。

## 使用示例

```ts
#include <common/color/aces>
#include <common/data/packing>
```

## 目录功能对照表

| 文件夹名 | 函数用途                               | 主要文件
| -------- | ---------------------------------------- | ----
| color    | 色彩相关功能（颜色空间、tone-mapping 等） | aces, gamma
| data     | 数据相关功能（压缩解压缩等）             | packing, unpack
| debug    | Debug View 相关功能                       |
| effect   | 场景特效相关功能（水、雾等）             | fog
| lighting | 光照相关功能（bxdf、反射、衰减、烘焙等） | brdf, bxdf, light-map
| math     | 数学库（坐标变换、数值判定和运算等）     | coordinates, transform
| mesh     | 模型相关功能（材质转换、模型动画等）     | material, vat-animation
| shadow   | 阴影相关功能（pcf、pcss 等）        | native-pcf
| texture  | 贴图相关功能（采样、mip 计算等）          | cubemap, texture-lod

> Surface Shader 内部已经自动包含了常用的公共函数头文件，不需要再 include。
