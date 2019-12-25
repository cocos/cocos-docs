# Material 材质资源参考

材质资源可以用来控制渲染组件在场景中的视觉效果。简单来说材质用来指定物体的表面或数个面的特性，它决定这些平面在着色时的特性，如颜色，光亮程度，自发光度及不透明度等。


## 创建与使用材质

### 通过编辑器设置

1. 在资源面板右键选择 Create => Material 创建新的材质

![Create Material](./material/material-1.jpg)

2. 选择新建的材质，在属性面板中编辑材质的属性。

- Effect 下拉框会列出当前项目中所有的 Effect 资源，你可以选择当前材质使用的 Effect 资源。当切换了 Effect 后其他属性也会同步更新。

- Effect 中可能会存在多个 Technique，每个 Technique 会适用于不同的情况，比如效果差一点但是性能更好的 Technique 更适合用于手机平台。Technique 下拉框会列出当前 Effect 资源中的所有 Technique，你可以选择使用哪一个 Technique。当切换了 Technique 后 Pass 列表也会同步更新。

- Pass 列表会列出当前 Technique 中的所有 Pass，每个 Pass 可能会有不同的属性和定义，你可以分别设置这些属性和定义。如果属性是被定义包裹住的，需要先勾上定义才能看到对应的属性。

![Create Material](./material/material-2.jpg)

3. 将新建的材质设置到渲染组件中。

![Create Material](./material/material-3.jpg)

### 通过代码设置

材质分为共享材质和材质变体，共享材质的修改会同步影响到材质变体。

#### 代码创建材质

- 创建共享材质需要指定使用的 effect 和 technique 索引。
  - cc.Material.createWithBuiltin(effectName: string, techniqueIndex = 0)

  - cc.Material.create(effectAsset: cc.EffectAsset, techniqueIndex = 0)

- 创建材质变体需要指定使用的 **共享材质** 和 **材质变体所属的渲染组件**。
  - cc.MaterialVariant.createWithBuiltin (materialName: string, owner: cc.RenderComponent)
  
  - cc.MaterialVariant.createWithBuiltin (material: cc.Material, owner: cc.RenderComponent)

```js
// 创建一个共享材质，共享材质的修改将会同步到材质变体上
let material = cc.Material.createWithBuiltin(cc.Material.BUILTIN_EFFECT_NAME.UNLIT);
// 材质 material 的修改会影响到 variant1 和 variant2
material.setProperty('diffuseColor', cc.Color.WHITE);

let variant1 = cc.MaterialVariant.create(material);
// 材质 variant1 修改的 diffuseColor 会覆盖掉材质 material 修改的 diffuseColor
variant1.setProperty('diffuseColor', cc.Color.RED);

let variant2 = cc.MaterialVariant.create(material);
// 材质 variant2 修改的 mainTiling 只会影响到 variant2
variant2.setProperty('mainTiling', cc.v2(0.5, 0.5));
```

#### 代码设置和获取渲染组件中的材质

渲染组件中使用的材质都是**材质变体**并且会保证这个材质变体**只被自己所使用**。
如果设置给渲染组件的材质是共享材质或者这个材质变体已经被其他渲染组件使用了，那么设置的过程中渲染组件会根据传入的材质重新创建一个材质变体。

```js

let variant1 = cc.MaterialVariant.createWithBuiltin('2d-sprite');

// 设置材质到指定索引，一般来说 2d 渲染组件的 index 都是 0
// variant1 由于没有指定 owner render component，所以会直接被 renderComponent1 使用并且设置 owner 为 renderComponent1
renderComponent1.setMaterial(index, variant1);

// variant1 已经有 owner 了，所以内部会根据 variant1 创建一个新的材质变体
// 最好是自己新建一个 variant2 来进行设置
renderComponent2.setMaterial(index, variant1);

// 获取渲染组件中的材质
// material1 === variant1
// material2 !== variant1
let material1 = renderComponent1.getMaterial(index);
let material2 = renderComponent2.getMaterial(index);
```
