# Language Support

## TypeScript

Cocos Creator 3.0 uses [babel](https://babeljs.io/) instead of [tsc](https://www.typescriptlang.org/) to compile __TypeScript__ scripts. In particular, the [@babel/plugin-transform-typescript](https://babeljs.io/docs/en/babel-plugin-transform-typescript) plugin is used. For this reason, TypeScript support has certain limitations.

Some important considerations are listed below.
For a complete description, see [@babel/plugin-transform-typescript](https://babeljs.io/docs/en/babel-plugin-transform-typescript).

- `tsconfig.json` will not be read.
- Implied with `isolatedModules` option, which means:
  - [Const enums](https://www.typescriptlang.org/docs/handbook/enums.html#const-enums) is not supported.
  - TypeScript types and interfaces should not be exported in the export declaration.
- `Export =` and `import =` are not supported.
- Variables exported by namespace must be declared as `const` instead of `var` or `let`.
- Different declarations in the same namespace will not share the scope and require explicit use of qualifiers.

`tsconfig.json` will not be read during compilation means that the compilation options in `tsconfig.json` does not affect compilation.
However, there are exceptions, please refer to the [Module Analysis](####ModuleAnalysis) documentation.

Developers can still use `tsconfig.json` in the project to cooperate with the IDE to implement type checking and other functions.
In-order to make the IDE’s TypeScript checking function compatible with __Cocos Creator__'s behavior, pay extra attention to some things, please referto the [tsconfig](./tsconfig.md) documentation.

#### Module Analysis

__Cocos Creator__ uses the __NodeJS__ module analysis algorithm.
It is equivalent to the following `tsconfig.json`:

```json
{
  "compilerOptions": {
    "moduleResolution": "node"
  }
}
```

TypeScript's path mapping function is also supported. The following `tsconfig.json` options will be read and retain the same semantics as `tsc`:

- [compilerOptions.baseUrl](https://www.typescriptlang.org/docs/handbook/module-resolution.html#base-url)
- [compilerOptions.paths](https://www.typescriptlang.org/docs/handbook/module-resolution.html#path-mapping)
