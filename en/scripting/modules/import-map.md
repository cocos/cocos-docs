# 导入映射（实验性）

Cocos Creator 从 v3.3 开始实验性支持 [导入映射（Import maps）](https://github.com/WICG/import-maps)，包括 [Import Maps Draft Community Group Report, 12 January 2021](https://wicg.github.io/import-maps/) 中的所有功能。

导入映射控制 TypeScript/JavaScript 的导入行为，尤其是可指定对 [裸说明符](./spec.md#裸说明符) 的解析。

## 使用

通过编辑器顶部菜单栏的 **项目 -> 项目设置 -> 脚本** 中的 **导入映射** 项即可指定导入映射文件的路径。设置完成后，导入映射功能开启，使用的导入映射将从指定的文件中读取。

> **注意**：导入映射文件的路径是至关重要的，因为导入映射中的所有相对路径都是相对于导入映射文件本身路径。

### 别名映射

若有一个模块被项目中所有的模块所使用，而开发者并不希望其他模块以相对路径的方式引用它，而是为它起一个别名，那么便可以选择使用导入映射。

例如，某个模块真实的绝对路径为 `<项目>/assets/lib/foo.ts`，我们希望所有模块可以以 `import {} from 'foo';` 的方式来引用它，操作步骤如下：

首先，在项目目录下创建一个导入映射文件 `import-map.json`：

```json
// import-map.json

{
    "imports": {
        "foo": "./assets/lib/foo.ts"
    }
}
```

- `"imports"`：指定应用到所有模块的 **顶级映射**（Top level imports）。
- `"foo"`：指定我们要映射的模块名。
- `"./assets/lib/foo.ts"`：指定如何映射 `"foo"`。`"./assets/lib/foo.ts"` 是相对路径，**导入映射中的所有相对路径都是相对于导入映射文件本身的位置的**，因此 `./assets/lib/foo.ts` 将解析为绝对路径 `<项目>/assets/lib/foo.ts`。

然后在任意模块中使用以下方式引用模块时，`'foo'` 都将解析为模块 `<项目>/assets/lib/foo.ts`：

```ts
import * as foo from 'foo';
```

### 目录映射

导入映射还允许映射指定目录下的所有模块。

例如，要映射项目 `assets/lib/bar-1.2.3` 目录下的所有模块，则导入映射的 json 文件如下所示：

```json
// import-map.json

{
    "imports": {
        "bar/": "./assets/lib/bar-1.2.3/"
    }
}
```

除了 `"bar/"` 指定的是我们要映射的目录，其余的与 **别名映射** 一致。

这样项目中的模块都能以 `import {} from 'bar/...'` 的形式来引用目录 `bar-1.2.3` 中的模块。

例如：

```ts
import * as baz from 'bar/baz';
import * as quux from 'bar/qux/quux';
```

`'bar/baz'` 将解析为模块 `<项目>/assets/lib/bar-1.2.3/baz.ts`<br>`'bar/qux/quux'` 将解析为模块 `<项目>/assets/lib/bar-1.2.3/qux/quux.ts`。

### TypeScript 配置

TypeScript 并不支持导入映射。若要使用该功能，则需要通过额外的配置来告诉 TypeScript 类型检查器额外的模块解析信息。

例如上述中的两个例子，我们可以通过配置项目目录下的 `tsconfig.json` 文件中的 [paths](https://www.typescriptlang.org/tsconfig#paths) 字段（若没有该字段，可自行补上），如下所示：

```json5
// tsconfig.json
{
    "compilerOptions": {
        "paths": {
            // 注意：这里的相对路径是相对于 tsconfig.json 所在的路径
            // 由于本例中 tsconfig.json 和 import-map.json 位于同一目录，因此这里的相对路径也相似。
            "foo": ["./assets/lib/foo"],
            "bar/*": ["./assets/lib/bar-1.2.3/*"]
        }
    }
}
```

更多关于导入映射的功能，请参考 [导入映射](https://github.com/WICG/import-maps)。
