

<!-- ## Effect 名称

Effect name 是基于 effect 文件名和所在路径两个信息自动生成的，路径部分固定为基于 `assets/effects` 目录的相对路径，文件名不包括扩展名。

在运行时可以通过 effect name 获取或使用 effect 资源：

```js
const effect = EffectAsset.get('builtin-unlit'); // this is the EffectAsset resource instance
const mat = new Material();
mat.initialize({ effectName: 'builtin-standard' }); // now 'mat' is a valid standard material
```

**注意**：因为编辑器内置 effect 资源全部位于 Internal DB 的 `assets/effects` 目录下，因而引用时不需要路径部分。

在 **层级管理器** 中选中材质，然后在 **属性检查器** 的 Effect 属性下拉列表中可以看到所有当前可用的 effect name。 -->