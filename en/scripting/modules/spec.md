# Module Specification

In Cocos Creator, all JavaScript code is organized in the form of modules, which include:

- The code created in the project.

- Functionality provided by the engine.

- Code that is not created in the project nor provided by the engine, but is referenced by the project.

Cocos Creator natively supports and recommends the use of the ECMAScript module format (hereafter referred to as ESM module format). To support the use of external modules, Cocos Creator also supports the CommonJS module format to some extent.

## Module Format

This section describes how Cocos Creator determines the format of a module.

All the functionalities provided by the Cocos Creator engine are in the form of ESM modules, see [engine modules](./index.md).

Files in the project resources directory ending in `.ts`. For example `assets/scripts/foo.ts`.

For any other module formats, Cocos Creator chooses rules similar to Node.js to [identify](https://nodejs.org/api/packages.html#packages_determining_module_system). Specifically, the following files will be considered in ESM format:

- Files ending in `.mjs`.

- Files ending in `.js` and whose nearest parent `package.json` file contains a top-level `"type"` field with a value of `"module"`.

The rest of the files will be treated as CommonJS module format, which includes

- Files ending in `.cjs`.

- Files ending in `.js` and whose nearest `package.json` file contains a top-level `"type"` field with a value of `"commonjs"`.

- Files ending in `.js` that do not fall under the above conditions.

## Module Descriptors and Module Parsing

In an ESM module, interaction with the target module is done through standard import and export statements, e.g.

```ts
import { Foo } from '. /foo';
export { Bar } from '. /bar';
```

The string after the keyword `from` in the import/export statement is called a **module specifier**. The module specifier can also appear as a parameter in the dynamic import expression `import()`.

The module specifier is used to specify the target module, and the process of resolving the target module URL from the module specifier is called **module resolution**.

Cocos Creator supports three types of module specifiers:

- **relative specifier**: a specifier like `'./foo'`, `'../bar'` starting with `'./'` and `'../'`.

- **absolute specifier**: a specifier that specifies a URL. For example: `foo:/bar`.

- **bare specifier**: a specifier like `foo` or `foo/bar` that is neither a URL nor a relative specifier.

### Relative Specifiers

Relative specifiers take the URL of the current module as the base URL and use the relative specifier as input to resolve the URL of the target module.

For example, for the module `project path/assets/scripts/utils/foo`, `'./bar'` will be parsed as `project path/assets/scripts/utils/bar` in the same directory; `'../baz'` will be parsed as `project path/assets/scripts/baz` in the upper directory.

### Absolute Specifiers

The absolute specifier directly specifies the URL of the target module.

Cocos Creator currently only supports file protocol URLs, but since the file path specified in the file URL is an absolute path, it is rarely used.

> **Note**: in Node.js, one way to access Node.js built-in modules is through `node:` protocol URLs, e.g.: `node:fs`. Cocos Creator parses all requests for access to Node.js built-in modules as `node:` URL requests. For example, `'fs'` in `import fs from 'fs'` will resolve to `node:fs`. However, Cocos Creator does not support Node.js built-in modules, which means that it does not support the `node:` protocol. Therefore, a loading error will occur. This error may be encountered when using modules in npm.

### Bare Specifiers

For bare specifiers, Cocos Creator will apply the Node.js module parsing algorithm.

> This includes parsing of npm modules.

In general, bare specifiers have the following two forms:

- `'foo'`: parsed as the entry module for the npm package `foo`.

- `'foo/bar'`: parsed as the module under the subpath `./bar` in the npm package `'foo'`.

The specific rules for parsing bare specifiers can be found in [Node.js module parsing algorithm](https://nodejs.org/api/esm.html#esm_resolver_algorithm_specification).

> In the future, Cocos Creator may support importing maps, see [Import Maps](https://github.com/WICG/import-maps).

### Suffixes and Directory Import

Cocos Creator's requirements for module suffixes in module specifiers are more web-oriented -- suffixes must be specified and Node.js-style directory import is not supported. However, for historical reasons and some existing restrictions, TypeScript modules do not allow suffixes and support Node.js-style directory import. Specifically:

When the target module file has the suffix `.js`, `.mjs`, the suffix **must be specified** in the module specifier: `.js`, `.mjs`.

```ts
import '. /foo.mjs'; // correct
import '. /foo'; // error: the specified module cannot be found
```

Node.js-style directory import is not supported:

```ts
import '. /foo/index.mjs'; // correct
import '. /foo'; // error: module cannot be found.
```

> This suffix requirement applies to both relative and absolute specifiers along with the restriction on directory import. For requirements in bare specifiers please refer to the Node.js module parsing algorithm.

However, when the target module file has a suffix of `.ts`, the suffix is **not allowed to be specified** in the module specifier:

```ts
import '. /foo'; // correct: parsed as the `foo.ts` module in the same directory
import '. /foo.ts'; // error: the specified module cannot be found
```

On the other hand, Node.js-style directory import is supported:

```ts
import '. /foo'; // correct: parsed as the `foo/index.ts` module
```
> **Notes**:
> 1. Cocos Creator supports the Web platform. Implementing complex module parsing algorithms like Node.js on the Web platform is expensive, and the client and server cannot try different suffixes and file paths with frequent communication between them.
> 2. Even if such complex parsing could be done at the build stage with some post-processing tools, it would result in inconsistent algorithms for static import parsing (via `import` statements) and dynamic import parsing (via `import()` expressions). Therefore, specify the full file path in the code for the choice of module parsing algorithm.
> 3. However, this cannot be restricted completely, since TypeScript currently doesn't allow the suffix `.ts` to be specified in the specifier. And TypeScript does not yet support auto-completion of specific target suffixes. With these limitations, it's hard to have it both ways, but we're still watching to see if these conditions improve in the future.

### The `browser` Field is not Supported

Some npm packages have `browser` fields documented in the manifest file `package.json`, e.g.: [JSZip](https://github.com/Stuk/jszip). The `browser` field is used to specify a module parsing method specific to the package when it is in a non-Node.js environment, which allows some Node.js-specific modules in the package to be replaced with modules that can be used in the Web. Although Cocos Creator **does not support this field**, if you have the ability to edit npm packages, Cocos Creator recommends using [conditionalized export](https://nodejs.org/api/packages.html#packages_conditional_exports) and [subpath import](https://nodejs.org/api/packages.html#packages_subpath_imports) instead of the `browser` field.

Otherwise, the target library can be used in a non-npm way. For example, copying modules from the target library that are specifically made for non-Node.js environments into the project and importing them via relative paths.

## CommonJS Module Parsing

In CommonJS modules, Cocos Creator applies the [Node.js CommonJS module parsing algorithm](https://nodejs.org/api/modules.html#modules_all_together).

## Module Format Interaction

Cocos Creator allows importing CommonJS modules in ESM modules.

When importing a CommonJS module from an ESM module, the `module.exports` object of the CommonJS module will be used as the default export for the ESM module:

```ts
import { log } from 'cc';

import { default as cjs } from 'cjs';

// Another way to write the above import statement:
import cjsSugar from 'cjs';

log(cjs);
log(cjs === cjsSugar);
// Print.
// <module.exports>
// true

```

The CommonJS module's [ECMAScript module namespace](https://tc39.es/ecma262/#sec-module-namespace-objects) indicates that it is a namespace containing a `default` export, where the `default` export points to the value of `module.exports` of the CommonJS module.

This [module namespace foreign object](https://tc39.es/ecma262/#module-namespace-exotic-object) can be observed by `import * as m from 'cjs'`.

```ts
import * as m from 'cjs';
console.log(m);
// Print:
// [Module] { default: <module.exports> }
```

<!-- TODO: guess named exports -->

## Cocos Creator ESM Parsing Algorithm Public Notice

The algorithm used by Cocos Creator to parse ESM module specifiers is given by the following `CREATOR_ESM_RESOLVE` method. It returns the result of parsing the module specifier from the current URL.

The [external algorithm](https://nodejs.org/api/esm.html#esm_resolution_algorithm) is referenced in the parsing algorithm specification.

### Parsing Algorithm Specification

`CREATOR_ESM_RESOLVE(specifier, parentURL)`
  1. Let `resolved` be the result of `ESM_RESOLVE(specifier, parentURL)`.
  2. If both `parentURL` and `resolved` are under project assets directory, then
     1. Let `extensionLessResolved` be the result of `TRY_EXTENSION_LESS_RESOLVE(resolved)`.
         1. If `extensionLessResolved` is not `undefined`, return `extensionLessResolved`.
  3. Return `resolved`.

`TRY_EXTENSION_LESS_RESOLVE(url)`
  1. If the file at `url` exists, then
     1. Return `url`.
  2. Let `baseName` be the portion after the last "/" in pathname of `url`, or whole pathname if it does not contain a "/".
  3. If `baseName` is empty, then
     1. Return `undefined`.
  4. Let `resolved` be the result URL resolution of "./" concatenated with `baseName` and `.ts`, relative to parentURL.
     1. If the file at `resolved` exists, then
     2. Return `resolved`.
  5. Let `resolved` be the result URL resolution of "./" concatenated with `baseName` and `/index.ts`, relative to parentURL.
     1. If the file at `resolved` exists, then
     2. Return `resolved`.
  6. Return `undefined`.
