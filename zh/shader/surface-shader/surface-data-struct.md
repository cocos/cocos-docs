# 表面材质数据结构

## 什么是表面材质数据

Surface Shader 中，根据不同[光照模型](./lighting-mode.md)的需求，提供了对应的表面材质数据结构 **SurfaceMaterialData** 。

表面材质数据结构体定义了一系列用于计算物体表面最终颜色的物理参数，如 反照率、粗糙度等。

> 注意：材质数据模型与光照模型必须关联使用

## 表面材质数据类型

| 材质数据类型 | 说明                                                         |
| ------------ | ------------------------------------------------------------ |
| standard     | 粗糙度和金属性描述的标准 PBR 材质，和 SP、Blender、Maya 等软件中的材质节点类似 |
| toon         | 简单的卡通材质，有多种 shade 颜色处理 |                          |

## 如何使用

对应的表面材质数据结构存放在 **interal/chunks/data-structures/** 目录下。

只需要 include 对应的表面材质数据结构头文件，就可以使用不同类别的数据结构。

```glsl
//PBR 表面材质
#include <surfaces/data-structures/standard>
// toon 表面材质
//#include <surfaces/data-structures/toon> 
#define CC_SURFACES_FRAGMENT_MODIFY_SHARED_DATA
void SurfacesFragmentModifySharedData(inout SurfacesMaterialData surfaceData)
{
    // set user-defined data to surfaceData
}
```
