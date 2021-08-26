# 属性参数

> 属性参数用来给已定义的属性附加元数据，类似于脚本语言的 Decorator 或者 C# 的 Property。

## 属性检查器相关参数

| 参数名 | 说明 | 类型 | 默认值 | 备注 |
| :--- | :--- | :-- | :--- | :--- |
| type | 限定属性的数据类型 | (Any) | undefined | 详见 [type 参数](../decorator.md#type参数) |
| visible | 在 **属性检查器** 面板中显示或隐藏 | boolean | (注1) | 详见 [visible 参数](../decorator.md#visible参数) |
| displayName | 在 **属性检查器** 面板中显示为另一个名字 | string | undefined | - |
| tooltip | 在 **属性检查器** 面板中添加属性的 Tooltip | string | undefined | - |
| multiline | 在 **属性检查器** 面板中使用多行文本框 | boolean | false | - |
| readonly | 在 **属性检查器** 面板中只读 | boolean | false | - |
| min | 限定数值在编辑器中输入的最小值 | number | undefined | - |
| max | 限定数值在编辑器中输入的最大值 | number | undefined | - |
| step | 指定数值在编辑器中调节的步长 | number | undefined | - |
| range | 一次性设置 min、max、step | [min, max, step] | undefined | step 值可选 |
| slide | 在 **属性检查器** 面板中显示为滑动条 | boolean | false | - |

## 序列化相关参数

以下参数不能用于 get 方法：

| 参数名 | 说明 | 类型 | 默认值 | 备注 |
| :--- | :--- | :--- | :--- | :--- |
| serializable | 序列化该属性 | boolean | true | 详见 [serializable 参数](../decorator.md#serializable参数) |
| formerlySerializedAs | 指定之前序列化所用的字段名 | string | undefined | 重命名属性时，声明这个参数来兼容之前序列化的数据 |
| editorOnly | 在导出项目前剔除该属性 | boolean | false | - |

## 其它参数

| 参数名 | 说明 | 类型 | 默认值 | 备注 |
| :--- | :--- | :--- | :--- | :--- |
| override | 当重写父类属性时需要定义该参数为 true | boolean | false | 详见 [override 参数](../decorator.md#override参数) |

<!-- | default | 定义属性的默认值 | (Any) | undefined | 详见 [default 参数](../decorator.md#default参数) |
| notify | 当属性被赋值时触发指定方法 | `function (oldValue) {}` | undefined | 需要定义 default 属性并且不能用于数组<br>不支持 ES6 定义方式 | -->
<!-- | animatable | 该属性是否能被动画编辑器修改 | boolean | undefined | - | -->

**注1**：visible 的默认值取决于属性名。当属性名以下划线 `_` 开头时，默认隐藏，否则默认显示。
