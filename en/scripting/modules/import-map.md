# Import Maps (experimental)

Cocos Creator experimentally supports [Import Maps](https://github.com/WICG/import-maps) starting from v3.3.

Import maps control the import behavior of TypeScript/JavaScript, in particular, it can specify the import behavior for [bare specifiers](./spec.md#bare-specifiers).

## Use

The import map's file path can be specified via the **Import Maps** item in **Project -> Project Settings -> Scripting** in the top menu bar of the editor. After setting, the import maps function will be enabled and the import maps used will be read from the specified file.

> **Note**: the import map's file path is crucial, because all relative paths in the import maps are relative to the import map's file path itself.

### Alias Mapping

If there is a module that is used by all modules in the project, and the developer does not want other modules to refer to it as a relative path, but rather to give it an alias, then using import maps is a good choice.

For example, if the real absolute path of a module is `<project>/assets/lib/foo.ts` and we want all modules to refer to it as `import {} from 'foo';`, we would do the following:

First, create an import-map file ``import-map.json`` in the project directory:

```json
// import-map.json

{
    "imports": {
        "foo": "./assets/lib/foo.ts"
    }
}
```

- `"imports"`: specifies the **Top Level Imports** to be applied to all modules.
- `"foo"`: specifies the name of the module we want to map.
- `"./assets/lib/foo.ts"`: specifies how to map `"foo"`. `"./assets/lib/foo.ts"` is a relative path, **all relative paths in import maps are relative to the location of the import map's file itself**, so `./assets/lib/foo.ts` will be resolved to the absolute path `<project>/assets/lib/foo.ts`.

Then `'foo'` will be resolved to the module `<project>/assets/lib/foo.ts` when referencing the module in any module using

```ts
import * as foo from 'foo';
```

### Directory Mapping

Import maps also allows mapping all modules in a given directory.

For example, to map all modules in the project `assets/lib/bar-1.2.3` directory, the json file for the import maps would look like this:

```json
// import-map.json

{
    "imports": {
        "bar/": "./assets/lib/bar-1.2.3/"
    }
}
```

This is consistent with **alias mapping** except that `"bar/"` specifies the directory we want to map to.

This way the modules in the project can all refer to the directory as `import {} from 'bar/...' ` to refer to modules in the directory `bar-1.2.3`.

For example:

```ts
import * as baz from 'bar/baz';
import * as quux from 'bar/qux/quux';
```

`'bar/baz'` will be resolved to the module `<project>/assets/lib/bar-1.2.3/baz.ts`<br>`'bar/qux/quux'` will be resolved to the module `<project>/assets/lib/bar-1.2.3/qux/quux.ts`.

### TypeScript configuration

TypeScript does not support import maps, which can lead to errors when using it, so we need additional configuration to tell the TypeScript type checker additional module resolution information.

For example, in the two examples above, you can configure the [paths](https://www.typescriptlang.org/tsconfig#paths) field in the `tsconfig.json` file in the project directory (if you don't have the field, you can add it yourself), as follows:

```json5
// tsconfig.json
{
    "compilerOptions": {
        "paths": {
            // Note: the relative path here is relative to the path where tsconfig.json is located
            // Since tsconfig.json and import-map.json are in the same directory in this example, the relative paths here are similar.
            "foo": ["./assets/lib/foo"],
            "bar/*": ["./assets/lib/bar-1.2.3/*"]
        }
    }
}
```

For more information about import maps features, please refer to [Import Maps](https://github.com/WICG/import-maps).

## Support

Cocos Creator supports all features in [Import Maps Draft Community Group Report, 12 January 2021](https://wicg.github.io/import-maps/).
