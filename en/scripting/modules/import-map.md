# 导入映射（实验性）

Cocos Creator 实验性地支持 [导入映射（Import maps）](https://github.com/WICG/import-maps)。

导入映射控制 TypeScript/JavaScript 的导入行为。尤其是可指定对 [裸说明符](./spec#裸说明符) 的解析。

## 支持情况

Cocos Creator 支持 [Import Maps Draft Community Group Report, 12 January 2021](https://wicg.github.io/import-maps/) 中的所有功能。

## 使用

可以在 [项目设置]-[脚本]-[导入映射] 中指定导入映射文件的路径。设置后，导入映射功能开启，使用的导入映射将从指定的文件中读取。

> 注意，导入映射文件的路径是至关重要的，因为导入映射中的所有相对路径都是相对于导入映射文件本身路径。

### 例：模块的别名

很常见的情况是，有一个模块是被项目所有模块所使用的。开发者并不希望其他模块以相对路径的方式引用它，而是为它起一个别名。这种情况就可以选择使用导入映射。

假设模块真实的绝对路径为 `<项目>/assets/lib/foo.ts`，我们希望所有模块可以以 `import {} from 'foo';` 的方式使用它，以下步骤阐述了如何实现此意图。

创建一个导入映射文件到 `<项目>/import-map.json`，内容为 JSON：

```json
{
    "imports": {
        "foo": "./assets/lib/foo.ts"
    }
}
```

`"imports"` 指定应用到所有模块的“顶级映射”（Top level imports）。`"foo"` 指定我们要映射的模块名；`"./assets/lib/foo.ts"` 指定如何映射 `"foo"`。

`"./assets/lib/foo.ts"` 是相对路径；**导入映射中的所有相对路径都是相对于导入映射文件本身的位置的**，因此 `./assets/lib/foo.ts` 将解析为绝对路径 `<项目>/assets/lib/foo.ts`。

于是，在任意模块中使用：

```ts
import * as foo from 'foo';
```

时，`'foo'` 都将解析为模块 `<项目>/assets/lib/foo.ts`。

#### 目录映射

导入映射还允许映射指定目录下的所有模块。

若 `<项目>/assets/lib/bar-1.2.3` 为目录，则通过设置：

```json
{
    "imports": {
        "bar/": "./assets/lib/bar-1.2.3/"
    }
}
```

使得项目中的模块都能以 `import {} from 'bar/...'` 的形式使用目录 `bar-1.2.3` 中的模块。

例如：

```ts
import * as baz from 'bar/baz';
import * as quux from 'bar/qux/quux';
```

`'bar/baz'` 将解析为模块 `<项目>/assets/lib/bar-1.2.3/baz.ts`；`'bar/qux/quux'` 将解析为模块 `<项目>/assets/lib/bar-1.2.3/qux/quux.ts`。

#### TypeScript 配置

TypeScript 并不支持导入映射。当使用 TypeScript 时，我们需要额外的配置来告诉 TypeScript 类型检查器额外的模块解析信息。

例如，对于以上的两个例子，我们可以通过配置 [TypeScript paths](https://www.typescriptlang.org/tsconfig#paths) 来完成：

```json5
// tsconfig.json
{
    "compilerOptions": {
        "paths": {
            // 注意，这里的相对路径是相对于 tsconfig.json 所在路径
            // 本例中，我们的 tsconfig.json 和 import-map.json
            // 位于同一目录，因此这里的相对路径也相似。
            "foo": ["./assets/lib/foo"],
            "bar/*": ["./assets/lib/bar-1.2.3/*"]
        }
    }
}
```

关于导入映射的更多功能，可以在 [导入映射](https://github.com/WICG/import-maps) 中找到。
