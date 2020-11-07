# 骨骼动画资源（Spine）

Creator 中的骨骼动画资源是由 [Spine 编辑器](http://zh.esotericsoftware.com/) 导出的，目前支持 [JSON](http://zh.esotericsoftware.com/spine-export/#JSON) 和 [二进制](http://zh.esotericsoftware.com/spine-export/#%E4%BA%8C%E8%BF%9B%E5%88%B6) 两种数据格式。

各 Creator 版本对应支持的 Spine 版本如下所示：

| Creator 版本 | Spine 版本 |
| :---------- | :-------- |
| v2.0.7 及以下 | v2.5 |
| v2.0.8～v2.1 | v3.6 |
| v2.2         | v3.7 |
| v2.3 及以上   | v3.8 |

## 导入骨骼动画资源

骨骼动画所需资源有：

- `.json/.skel` 骨骼数据
- `.png` 图集纹理
- `.txt/.atlas` 图集数据

  ![spine](spine/import.png)

## 创建骨骼动画

创建骨骼动画资源有以下三种方式：

1. 从 **资源管理器** 中将骨骼动画资源拖动到 **层级管理器**:

    ![spine](spine/create_1.png)

2. 从 **资源管理器** 中将骨骼动画资源拖动到 **场景编辑器**:

    ![spine](spine/create_2.png)

3. 从 **资源管理器** 中将骨骼动画资源拖动到 **属性检查器** Spine 组件的 Skeleton Data 属性中：

    ![spine](spine/create_3.png)

