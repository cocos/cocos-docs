# 推荐的 npm 工作流

有时候开发者可能希望将一些能被多个项目共用的代码以 npm 的形式发布使用。本章节提出了一些适用于 Cocos Creator 的 npm 配置与发布工作流。

## 代码

你的代码应该至少兼容 ES2015。

如果你的代码是通过 tsc 编译生成的，我们推荐将 `tsconfig.json` 的 `target` 字段设为 `ES2015` 或更高。

## 模块格式：ESM

Cocos Creator 推荐使用以 ESM 模块形式提供包中的模块。但如果包中的模块引用了 Cocos Creator 引擎模块，必须以 ESM 模块形式提供。若包中未引用引擎模块，也可以以 CommonJS 模块形式存在。本章节仅介绍 ESM 模块的情况。

你需要以下几种方式告诉 Cocos Creator 你的模块格式：

- 将 JavaScript 文件后缀设置为 `.mjs`。

- 依然使用 `.js` 后缀，但是在 `package.json` 中注明 `"type": "module"`。

### .mjs 后缀

无论何时，以 `.mjs` 为后缀的文件都会被当作 ESM 模块。

不幸的是，如果你是用 TypeScript 开发的，TypeScript 目前不支持输出为 `.mjs` 后缀，这在 [GitHub](https://github.com/microsoft/TypeScript/issues/18442) 上有比较激烈的争论。

### `package.json`

你也可以使用经典的 `.js` 后缀。只要在包的根目录中的 `package.json` 中指定顶部字段 `type` 为 `module`：

```json
{
    "type": "module"
}
```

包中**所有** `.js` 后缀的文件都会被视为 ESM 模块。

但有些情况下你可能不希望包中的所有 `.js` 文件都被影响，那么你可以将那些 ESM 模块格式的 `.js` 文件存放至单独的目录，并在该目录下新增一个**覆盖性质**的 `package.json`，里面只有简单的 `{ "type": "module" }`。

关于具体的 Cocos Creator 模块格式判别规则，见 [模块规范](./spec.md)。

如果你的代码是通过 tsc 编译生成的，我们推荐将 `tsconfig.json` 的 `module` 字段设为 `ES2015`。

## 包导出

默认情况下，外部可以导入包中的任何模块。

例如：

- `import /*...*/ from "foo"` 将导入包 `foo` 的主模块。

> 主模块由 `package.json` 的 `main` 字段指定，缺省则为 `index.js` 或 `index.mjs`。

- `import /*...*/ from "foo/bar/baz.js"` 将导入包 `foo` 中 `bar/baz.js` 路径下的模块。

这可能不利于封装。因为有时候某些模块是由你的包内部使用的，你仅希望暴露一部分模块。

Cocos Creator 支持 `package.json` 的 `exports` 字段，用于指定你允许外部使用的模块。

例如：

```json
{
    name: "foo",
    exports: "./index.js"
}
```

仅允许以 `from "foo"` 的形式导入包的主模块而不能导入其它模块。

```json
{
    name: "foo",
    exports: {
        "./bar": "./bar.js"
    }
}
```

仅公开了模块 `"foo/bar"`，并且 `"foo/bar"` 将被解析为包 `foo` 目录下的 `bar.js` 模块文件。为了让单独指定包名的时候访问到主模块，添加对 `.` 的映射：

```json
{
    name: "foo",
    exports: {
        ".": "./index.js",
        "./bar": "./bar.js"
    }
}
```

如此一来，外部既可以使用 `"foo"` 也可以使用 `"foo/bar"`。其它任何模块都无法访问。

Cocos Creator 还支持条件化导出。关于 `exports` 字段的具体用法，可参考：[Node.js](https://nodejs.org/api/packages.html#packages_package_entry_points)。
