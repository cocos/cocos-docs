# 骨骼动画组件参考

`骨骼动画组件` 继承自 `动画组件`，骨骼动画组件的使用方法与动画组件的使用方法没有太大区别，只是骨骼动画组件使用的剪辑只能是骨骼动画剪辑（cc.SkeletonAnimationClip），并且骨骼动画组件提供了搜索骨骼动画剪辑的快捷方法（详见[导入资源](import-model)）。

骨骼动画组件是在导入模型时自动添加到模型 Prefab 中的，使用时和使用动画组件的接口是一样的。

![skeleton-animation](img/search-skeleton-animation.png)

```js
let skeletonAnimation = node.getComponent(cc.SkeletonAnimation);

skeletonAnimation.play('idle');
```
