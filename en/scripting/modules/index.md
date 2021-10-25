# Module Specifications and Examples

All code files can be roughly divided into [Plugin Script](../external-scripts.md) and **Module** two kinds, this section mainly introduces the module related.

Modules are a way of organizing TypeScript/JavaScript code, and code organized in modules is also informally known as **scripts** or **project scripts**. In Cocos Creator, all code except plugin scripts is organized in modules, which are roughly divided into the following kinds, depending on their source:

- Code created in the project, including component scripts and project (non-component) scripts.

- Functionality provided by the engine, please refer to the [Engine Modules](./engine.md) for details.

- Third-party modules, such as the `npm` module. Please review the [External Module Usage Case](./example.md) documentation for details.

Cocos Creator natively supports and recommends the use of the ECMAScript (ESM for short) module format. To support the use of external modules, Cocos Creator also supports the CommonJS module format to some extent. For additional information about the module format and usage in Cocos Creator, please refer to the [Module Specification](./spec.md) documentation.

## Module Loading Order

The modules are loaded in the following order:

1. First import of the [engine module](./engine.md) `"cc"` of Cocos Creator 3.x.

2. Plugin scripts: all plugin scripts will be executed in the order of the specified plugin script dependencies, there is disorder between plugin scripts that do not have dependencies. Please refer to the [Plugin Scripts](../external-scripts.md) documentation for details.

3. Common scripts: all common scripts will be imported concurrently, and the import will strictly follow the reference relationships and execution order determined by `import`.
