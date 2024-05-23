# `tsconfig.json`

The **majority** of compilation options in `tsconfig.json` in the project do not affect the compilation of **TypeScript**.

Therefore, some options need to configured carefully to make the IDE's inspection function consistent with the compilation behavior in __Cocos Creator__.

The following options should **not** be modified explicitly:

- `compilerOptions.target`
- `compilerOptions.module`

For example, if `tsconfig.json` is set to:

```json
{
    "compilerOptions": {
        "target": "es5",
        "module": "cjs"
    }
}
```

Then the following script code will not cause an error in the IDE (which uses `tsc` as a checker), because `compilerOptions.module` is set to `cjs`.

```ts
const myModule = require("path-to-module");
```

However, the implied `compilerOptions.module` in Creator is `es2015`, therefore it may prompt errors such as "require undefined" at runtime.

The following script code is legal for Creator, but the IDE may report an error. This is because `compilerOptions.target` is set to `es5`, while `Set` was introduced in ES6.

```ts
const mySet = new Set();
```

----

It is also possible to freely modify options.

For example, when it is needed to prohibit the use of implicit `any` in all TypeScript scripts in your project.

Set `compilerOptions.noImplicitAny` to `true` in `tsconfig.json`, as using an IDE (such as Visual Studio Code), the corresponding error prompt will be received.

----

For most projects, some options in `tsconfig` are fixed. For example, `compilerOptions.target`, `compilerOptions.module` and __Cocos Creator__ type declarations, file location, etc.

Due to the good design of `tsc`, the `extends` option allows `tsconfig.json` to be cascadable. __Cocos Creator__ supports this, therefore, the fixed `tsconfig` option is placed under `{project path}/tmp/tsconfig.cocos.json` and managed by __Cocos Creator__.

Therefore, `tsconfig.json` under the project root path can be configured as follows to share these fixed options:

```json5
{
    extends: './tmp/tsconfig.cocos.json',
    compilerOptions: {
        /* Custom tsconfig.json options*/
    }
}
```

Fortunately, Creator will automatically generate such a `tsconfig.json` file when creating a new project.
