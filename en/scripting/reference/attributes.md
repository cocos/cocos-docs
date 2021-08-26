# Properties

Properties are used to attach metadata to defined properties, similar to Decorator in scripting languages or Property in C#.

## Related Properties on Inspector Panel

| Property Name | Description | Type | Default | Remarks |
| :--- | :--- | :--- | :--- | :--- |
| type | Restrict the data type of the property | (Any) | undefined | See [type property](../ccclass.md#type-parameter) |
| visible | Show or hide in the **Inspector** panel | boolean | <b id="f1">[1]</b> | See [visible property](../ccclass.md#visible-parameter) |
| displayName | Show as another name in the **Inspector** panel | string | undefined | - |
| tooltip | Add a Tooltip for a property in the **Inspector** panel | string | undefined | - |
| multiline | Use multi-line text boxes in the **Inspector** panel | boolean | false | - |
| readonly | Read-only in the **Inspector** panel | boolean | false | - |
| min | Restrict the minimum value in the **Inspector** panel | number | undefined | - |
| max | Restrict the maximum value in the **Inspector** panel | number | undefined | - |
| step | Restrict the step value in the **Inspector** panel | number | undefined | - |
| range | Set min, max, step | [min, max, step] | undefined | step value optional |
| slide | Show as a slider in the **Inspector** panel | boolean | false | - |

## Serialization-Related Properties

The following properties cannot be used with the `get` method.

| Property Name | Description | Type | Default | Remarks |
| :--- | :--- | :--- | :--- | :--- |
| serializable | Serialize this property | boolean | true | See [serializable parameters](../ccclass.md#serializable-parameters) |
| formerlySerializedAs | Specify the name of the field used in the previous serialization | string | undefined | Declare this property when renaming the property to be compatible with the previously serialized data |
| editorOnly | Exclude this property before exporting the project | boolean | false | - |

## Other Properties

| Property Name | Description | Type | Default | Remarks |
| :--- | :--- | :--- | :--- | :--- |
| override | Define this parameter as true when overriding parent properties | boolean | false | See [override parameter](../ccclass.md#override-parameters) |

> <b id="f1">[1]</b>: The default value of visible depends on the property name. When the property name starts with an underscore `_`, it is hidden by default, otherwise it is shown by default.
