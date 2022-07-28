### 开发注意事项

- `Readonly` 属性说明

   - 直接通过 `Readonly` 属性调用接口修改值的方式，不保证在各平台都会生效。包括但不限于以下所列的属性：`position` `rotation` `scale` `worldPosition` `worldRotation` `worldScale` `eulerAngles` `worldMatrix`。例如：
        ```typescript
        this.node.worldPosition.add(xxx);
        ```
        在某些平台，此处 `add` 的结果不保存到worldPosition上。