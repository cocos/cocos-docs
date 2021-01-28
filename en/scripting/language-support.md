
# Language Support

## TypeScript

Cocos Creator supports TypeScript 4.1.0. The following restrictions have been made on this base:

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
    }，
  }
  ```

  The implicit `isolatedModules` option means that:
    - [const enums](https://www.typescriptlang.org/docs/handbook/enums.html#const-enums) is not supported.

    - You should use `export type` when re-exporting TypeScript types and interfaces. For example, use `export type { Foo } from '. /foo';` instead of `export { Foo } from '. /foo';`.

- `export =` and `import =` are not supported.

-  Variables derived from namespace must be declared as `const`, not `var` or `let`.

- Different declarations in the same namespace do not share scope and require explicit use of qualifiers.

- Type errors during compilation will be ignored.

`tsconfig.json` is not read at compile time, meaning that the compile option for `tsconfig.json` does not affect compilation.

Developers can still use `tsconfig.json` in their projects to work with the IDE to implement features such as type checking. In order to make the IDE's TypeScript checking compatible with the Creator's behavior, developers need to pay some extra attention to [tsconfig](./tsconfig.md).

## JavaScript

### Language Features

The JavaScript language specification supported by the Creator is ES6.

In addition, the following language features or proposals, updated to the ES6 specification, are still supported.

- [Class fields](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Classes/Class_elements)
- [Promise objects](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)
- [Optional chain operator `?.`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Optional_chaining)
- [Null-value merge operator `??`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_operator)
- Logical assignment operators
    - [Logical null assignment operator `??=`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Logical_nullish_assignment)
    - [Logical and assignment operator `&&=`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Logical_AND_assignment)
    - [Logical or assignment operator `||=`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Logical_OR_assignment)
- [global object `globalThis`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/globalThis)

The following language features are also supported, but require the relevant compilation options to be turned on:

- [asynchronous functions](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/async_function)

In particular, Creator currently supports **Legacy** decorator proposals, see [babel-plugin-proposal-decorators](https://babeljs.io/docs/en/babel-plugin-proposal-decorators) for their usage and meaning. Since this [proposal](https://github.com/tc39/proposal-decorators) is still in phase 2, all decorator-related functional interfaces exposed by the engine are under the `_decorator` namespace starting with an underscore.

### Compilation Options

The Creator opens some compilation options that will be applied to the entire project.

| Option | Name | Meaning |
| :-- | :--- | :-- |
| useDefineForClassFields | Conforming class fields | When turned on, class fields will be implemented using the `Define` semantics, otherwise they will be implemented using the `Set` semantics. Only works if the target does not support ES6 class fields.    |
| allowDeclareFields |Allows declaring class fields| When enabled, the `declare` keyword will be allowed in TypeScript scripts to declare class fields and, when the field is not declared with `declare` and no explicit initialization is specified, it will be initialized according to the specification to ` undefined`. |The

### Runtime Environment

From the user's perspective, Creator does not bind any JavaScript implementation, so it is recommended that developers write scripts strictly according to the JavaScript specification for better cross-platform support.

For example, when wishing to use **global objects**, the standard feature `globalThis` should be used:

```js
globalThis.blahBlah // globalThis must exist in any environment
```

instead of `window`, `global`, `self` or `this`:

```js
typeof window // may be 'undefined'
typeof global // may be 'undefined' in the browser environment
```

Again, Creator does not provide a module system for **CommonJS**, so the following code snippet would pose a problem:

```js
const blah = require('./blah-blah'); // error, require is undefined
module.exports = blah; // error module is undefined
```

Instead, the standard module syntax should be used:

```js
import blah from './blah-blah';
export default blah;
```

## Related Tutorials

- [JavaScript Standard Reference Tutorial](http://javascript.ruanyifeng.com/)
- [JavaScript Secret Garden](http://bonsaiden.github.io/JavaScript-Garden/zh/)
- [JavaScript Memory Detailing & Analysis Guide](https://mp.weixin.qq.com/s/EuJzQajlU8rpZprWkXbJVg)
