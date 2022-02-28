# 热重载（实验性质）

## 开启

在构建面板中，勾选 `热重载支持（实验性质）` 后，Creator 将集成热更新支持到运行时。

## 接口

默认情况下，当一个模块更新后，所有递归导入它的模块都将更新。并且，如果这样的更新蔓延到了顶级模块，那么所有模块都将重新加载、执行。

### 自我接受

当一个模块声明为 **自我接受** 时，前述的递归不会蔓延至父级（依赖它的模块）。换句话说，无论是它自身还是它依赖的模块更新时，它的父级（依赖它的模块）不会被更新。但它本身仍然会被更新。

在模块中调用 `import.meta.ccHot.accept()` 声明该模块为 **自我接受**：

```ts
import.meta.ccHot?.accept();
```

同时，也可以向该方法传入一个回调，以处理当更新该模块或该模块的依赖时发生的错误：

```ts
import.meta.ccHot?.accept((err) => {
    console.error(`${import.meta.url}：我或我的某个依赖在更新时发生了错误：${err}`);
});
```

### 依赖接受

当一个模块将某个（或多个）依赖声明为 **接受** 时，当该依赖（或多个依赖中的任何一个）更新时，**此模块不会更新**。

向 `import.meta.ccHot.accept()` 传入可接受的依赖（或数组）的模块说明符来完成声明：

```ts
import './dep.js';

import.meta.ccHot?.accept('./dep.js');
```

但往往我们需要在依赖被更新时做一些事情，这时候可以传入一个回调，在依赖被更新时调用；也可以接着传入一个错误处理回调，处理依赖更新中发生的错误：

```ts
import './dep1.js';
import './dep2.js';

import.meta.ccHot?.accept(
    ['./dep1.js', './dep2.js'],
    () => {
        console.error(`${import.meta.url}：我的依赖被更新了。`);
    },
    (err: unknown) => {
        console.error(`${import.meta.url}：我的依赖在更新时发生了错误：${err}`);
    },
);
```

要注意的是，目前，Creator 要求传给 `import.meta.ccHot.accept` 的依赖说明符需要和在导入语句中保持一致。也就是说，这样是错误的：

```ts
import './dep.js'; // #1

import.meta.ccHot?.accept('./dep'); // 错误：这里必须和 #1 中一致，即，`./dep.js`
```

虽然该模块不会再次执行，但它从依赖中导入的绑定都会被正确更新。因此，在回调中访问的都是更新后的绑定。

```ts
import { Foo } './dep.js';

import.meta.ccHot?.accept('./dep.js', () => {
    // 此处，`Foo` 已经是更新后的版本；如果更新后 `./dep.js` 还导入了它的话。
});
```

### 释放

可以通过 `import.meta.ccHot.dispose(callback);` 注册一个回调函数，该回调函数 `callback` 会在模块即将被更新时调用：

```ts
import.meta.ccHot?.dispose(() => {
    console.error(`${import.meta.url}：我将被更新。`);
});
```

这个回调还可以接受一个对象参数，向它中存储数据，然后就可以在新版本中通过 `import.meta.ccHot.data` 访问。这就允许我们从模块的旧版本中向新版本传输数据：

```ts

if (import.meta.ccHot && 'time' in import.meta.ccHot.data) {
    console.log(`我上一次更新是在：${import.meta.ccHot.data.time}`);
}

// 不论更新多少次，使用同一个 `values` 对象
const values = import.meta.ccHot && 'values' in import.meta.ccHot.data
    ? import.meta.ccHot.data.values
    : new Set();

import.meta.ccHot?.dispose((data) => {
    data.time = new DateTime();
    
    data.values = values;
});
```
