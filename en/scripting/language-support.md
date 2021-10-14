# Programming Language Support

## TypeScript

Cocos Creator supports TypeScript 4.1.0. The following restrictions are based on TypeScript 4.1.0:

- `tsconfig.json` will not be read. The following options are implied for each project:

  ```json5
  {
    "compilerOptions": {
        "target": "ES2015",
        "module": "ES2015",
        "isolatedModules": true,
        "experimentalDecorators": true,
        "moduleResolution": /* Cocos Creator's specific module resolution algorithm */,
        "forceConsistentCasingInFileNames": true,
    },
  }
  ```

  The implicit `isolatedModules` option means that:
    - [const enums](https://www.typescriptlang.org/docs/handbook/enums.html#const-enums) is not supported.

    - Use `export type` when re-exporting TypeScript types and interfaces. For example, use `export type { Foo } from '. /foo';` instead of `export { Foo } from '. /foo';`.

- `export =` and `import =` are not supported.

- Variables derived from namespace must be declared as `const`, not `var` or `let`.

- Different declarations in the same namespace do not share scope and require explicit use of qualifiers.

- Type errors during compilation will be ignored.

`tsconfig.json` is not read at compile time, meaning that the compile option for `tsconfig.json` does not affect compilation.

Developers can still use `tsconfig.json` in their projects to work with the IDE to implement features such as type checking. In order to make the IDE's TypeScript checking compatible with the Creator's behavior, developers need to pay some extra attention to [tsconfig](./tsconfig.md).

### TypeScript Reference Tutorial

- [Tutorial: v3.0 TypeScript question answering and experience sharing](https://discuss.cocos2d-x.org/t/tutorial-3-0-typescript-question-answering-and-experience-sharing/52932)
- [TypeScript Official Website](https://www.typescriptlang.org/)
- [TypeScript - Classes](https://www.typescriptlang.org/docs/handbook/classes.html)
- [TypeScript - Decorators](https://www.typescriptlang.org/docs/handbook/decorators.html)
- [TypeScript - DefinitelyTyped](http://definitelytyped.org/)
- [Learn TypeScript in Y minutes [cn]](https://learnxinyminutes.com/docs/zh-cn/typescript-cn/)
- [TypeScript GitHub](https://github.com/Microsoft/TypeScript)
- [The Best Resources For Learning TypeScript for Game Development](https://www.cocos.com/en/the-best-resources-for-learning-typescript-for-game-development)
- [3 Excuses Developers Give To Avoid TypeScript — and the Better Reasons They Should Use It](https://betterprogramming.pub/the-bad-reasons-people-avoid-typescript-and-the-better-reasons-why-they-shouldnt-86f8d98534de)

## JavaScript

### Language Features

The JavaScript language specification supported by the Creator is ES6.

In addition, the following language features or proposals, updated to the ES6 specification, are still supported.

- [Public class fields](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Public_class_fields)
- [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
- [Optional chaining operator `?.`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining)
- [Nullish coalescing operator `??`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_operator)
- Logical assignment operators
    - [Logical nullish assignment operator `??=`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_nullish_assignment)
    - [Logical AND assignment operator `&&=`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_AND_assignment)
    - [Logical OR assignment operator `||=`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_OR_assignment)
- [Global object `globalThis`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/globalThis)

The following language features are also supported, but require the relevant compilation options to be turned on:

- [async functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)

In particular, Creator currently supports **Legacy** decorator proposals, see [babel-plugin-proposal-decorators](https://babeljs.io/docs/en/babel-plugin-proposal-decorators) for their usage and meaning. Since this [proposal](https://github.com/tc39/proposal-decorators) is still in phase 2, all decorator-related functional interfaces exposed by the engine are under the `_decorator` namespace starting with an underscore.

### Compilation Options

Creator opens some compilation options that will be applied to the entire project.

| Option | Name | Meaning |
| :-- | :--- | :-- |
| **useDefineForClassFields** | Conforming class fields | When enabled, class fields will be implemented using the `Define` semantics, otherwise they will be implemented using the `Set` semantics. Only works if the target does not support ES6 class fields.    |
| **allowDeclareFields** |Allows declaring class fields| When enabled, the `declare` keyword will be allowed in TypeScript scripts to declare class fields and, when the field is not declared with `declare` and no explicit initialization is specified, it will be initialized according to the specification to `undefined`. |The

### Runtime Environment

From the user's perspective, Creator does not bind any JavaScript implementation, so it is recommended that developers write scripts strictly according to the JavaScript specification for better cross-platform support.

For example, when wishing to use **global objects**, the standard feature `globalThis` should be used:

```js
globalThis.blahBlah // 'globalThis' must exist in any environment
```

instead of `window`, `global`, `self` or `this`:

```js
typeof window // May be 'undefined'
typeof global // May be 'undefined' in the browser environment
```

Again, Creator does not provide a module system for **CommonJS**, so the following code snippet would pose a problem:

```js
const blah = require('./blah-blah'); // Error, require is undefined
module.exports = blah; // Error, module is undefined
```

Instead, the standard module syntax should be used:

```js
import blah from './blah-blah';
export default blah;
```

### JavaScript Related Tutorials

- [JavaScript Standard Reference Tutorial [cn]](https://wangdoc.com/javascript/)
- [JavaScript Garden](https://bonsaiden.github.io/JavaScript-Garden/)
- [JavaScript Memory Detailing & Analysis Guide [cn]](https://mp.weixin.qq.com/s/EuJzQajlU8rpZprWkXbJVg)
