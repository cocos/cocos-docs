# 扩展已有的功能

Cocos Creator 支持各个扩展间交互。所有的数据和功能都需要定义在 `package.json` 里的 `contributions` 字段内。

## contributions 数据定义

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

现阶段只开放了对编辑器内部功能的 `contributions`，未来会为插件之间互相使用 `contributions` 提供更为便捷的使用方式。

所有已开放的 `contributions` 的功能都可以通过本章子目录查看。
