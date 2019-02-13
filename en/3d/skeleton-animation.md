# Skeletal Animation Component Reference

> Authors：Xunyi, youyou

**Skeletal animation component** inherits from **animation component**, the use of skeletal animation component is not much different from the use of animation component.
except that the skeletal animation component uses only the skeletal animation clip `cc.SkeletonAnimationClip`, and the skeletal animation component provides a quick way to search for skeletal animation clips. Please refer to the [Import Model](import-model.md) for details.

The skeletal animation component is automatically added to the model Prefab when the model is imported, and the skeletal animation component uses the same interface as the animation component.

![skeleton-animation](img/search-skeleton-animation.png)

```js
let skeletonAnimation = node.getComponent(cc.SkeletonAnimation);

skeletonAnimation.play('idle');
```
