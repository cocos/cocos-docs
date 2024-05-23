# Skeleton Animation Component Reference

> Authors: Xunyi, youyou

**Skeleton animation component** inherits from **animation component**, the use of skeleton animation component is not much different from the use of animation component, except that the skeleton animation component uses only the skeleton animation clip `cc.SkeletonAnimationClip`, and the skeleton animation component provides a quick way to search for skeleton animation clips. Please refer to the [Import Model](import-model.md) for details.

The skeleton animation component is automatically added to the model Prefab when the model is imported, and the skeleton animation component uses the same interface as the animation component.

![skeleton-animation](img/search-skeleton-animation.png)

```js
let skeletonAnimation = node.getComponent(cc.SkeletonAnimation);

skeletonAnimation.play('idle');
```
