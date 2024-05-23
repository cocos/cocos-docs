# 扩展已有的功能

Cocos Creator 支持各个扩展间互相提供数据（`contributions`）。

我们在编写一个扩展的时候，可以查询编辑器内已有功能是否提供了对外接收 `contributions` 的功能。如果对应功能提供该功能，则能够在编写扩展的时候使用这些功能。

## contributions 数据定义

`contributions` 功能，统一在 `package.json` 里的 `contributions` 字段定义。

```json
{
    "name": "hello-world",
    "contributions": {}
}
```

contributions 定义规范:

```typescript
interface contributions {
    [name: string]: any;
}
```

`name` 是功能或者扩展的名字，`value` 则是 any 类型，由 `name` 功能（扩展）的作者自行定义。

现阶段只开放了对编辑器内部功能的 `contributions`，未来我们会为插件之间互相使用 `contributions` 提供更为便捷的使用方式。
