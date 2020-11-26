
# 语言支持

## TypeScript

Creator 3.0 使用 [babel](https://babeljs.io/) 编译 TypeScript 脚本，而不是 [tsc](https://www.typescriptlang.org/)，特别地，使用了 [@babel/plugin-transform-typescript](https://babeljs.io/docs/en/babel-plugin-transform-typescript) 插件。基于此原因，TypeScript 的支持存在某些限制，以下列举一些重要的注意事项：

- `tsconfig.json` 不会被读取

- 隐含着 `isolatedModules` 选项，这意味着：
  - 不支持 [const enums](https://www.typescriptlang.org/docs/handbook/enums.html#const-enums)

  - 导出声明中不应该导出 TypeScript 类型和接口

- 不支持 `export =` 和 `import =`

- 命名空间导出的变量必须声明为 `const`，而不是 `var` 或 `let`

- 同一命名空间的不同声明不会共享作用域，需要显式使用限定符。

编译时不会读取 `tsconfig.json` 意味着 `tsconfig.json` 的编译选项并不会影响编译，但也存在例外，详情可见下方的 [模块解析](####模块解析)。

开发者仍然可以在项目中使用 `tsconfig.json` 以配合 IDE 实现类型检查等功能。为了让 IDE 的 TypeScript 检查功能和 Creator 行为兼容，开发者需要额外注意一些事项，详情可参考 [tsconfig](./tsconfig.md)。

关于 TypeScript 更完整的说明，可参考 [@babel/plugin-transform-typescript](https://babeljs.io/docs/en/babel-plugin-transform-typescript)。

### 模块解析

Creator 使用 NodeJS 模块解析算法。等价于如下的 `tsconfig.json`：

```json
{
  "compilerOptions": {
    "moduleResolution": "node"
  }
}
```

TypeScript 的路径映射功能也受支持。

以下 `tsconfig.json` 选项将被读取并保持和 tsc 相同的语义：

- [compilerOptions.baseUrl](https://www.typescriptlang.org/docs/handbook/module-resolution.html#base-url)
- [compilerOptions.paths](https://www.typescriptlang.org/docs/handbook/module-resolution.html#path-mapping)

## JavaScript

### 语言特性

Creator 支持的 JavaScript 语言规范为 ES6。

此外，以下几项更新于 ES6 规范的语言特性或提案仍旧在支持之列：

- [类字段](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Classes/Class_elements)
- [Promise 对象](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)
- [可选链操作符](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining)
- [空值合并操作符](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_operator)
- [全局对象 globalThis](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/globalThis)

以下语言特性同样支持，但需要开启相关的编译选项：

- [异步函数](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/async_function)

特别地，Creator 目前支持 **Legacy** 装饰器提案，其具体用法和含义请参考 [babel-plugin-proposal-decorators](https://babeljs.io/docs/en/babel-plugin-proposal-decorators)。由于该 [提案](https://github.com/tc39/proposal-decorators) 仍处于阶段 2，引擎暴露的所有装饰器相关功能接口都在以下划线开头的 [`_decorator` 命名空间](https://github.com/cocos-creator/engine/blob/3d-v1.2/cocos/core/data/class-decorator.ts#L28) 下。

### 编译选项

Creator 开放了部分编译选项，这些选项将应用到整个项目。

| 选项 | 名称 | 含义 |
| :-- | :--- | :-- |
| useDefineForClassFields | 符合规范的类字段 | 当开启时，将使用 `Define` 语义实现类字段，否则将使用 `Set` 语义实现类字段。仅当目标不支持 ES6 类字段时生效。    |
| allowDeclareFields      | 允许声明类字段   | 当开启时，在 TypeScript 脚本中将允许使用 `declare` 关键字来声明类字段，并且，当字段未以 `declare` 声明且未指定显式的初始化式时，将依照规范初始化为 `undefined`。 |

### 运行环境

从用户的角度来说，Creator 未绑定任何 JavaScript 实现，因此建议开发者严格依照 JavaScript 规范编写脚本，以获取更好的跨平台支持。

举例来说，当希望使用 **全局对象** 时，应当使用标准特性 `globalThis`：

```js
globalThis.blahBlah // 任何环境下 globalThis 一定存在
```

而非 `window`、`global`、`self` 或 `this`：

```js
typeof window // 可能是 'undefined'
typeof global // 在浏览器环境下可能是 'undefined'
```

再如，Creator 未提供 **CommonJS** 的模块系统，因此以下代码片段会带来问题：

```js
const blah = require('./blah-blah'); // 错误，require 是未定义的
module.exports = blah; // 错误 module 是未定义的
```

反之，应使用标准模块语法：

```js
import blah from './blah-blah';
export default blah;
```
