# Attributes

Attributes are used to attach metadata to defined properties, similar to Decorator in scripting languages or Attribute in C#.

### Related Attributes on Inspector Panel

| Attribute Name | Description | Type | Default | Remarks |
| :--- | :--- | :--- | :--- | :--- |
| type | Restrict the data type of the property | (Any) | undefined | See [type attribute](../ccclass.md#type-parameter) |
| visible | Show or hide in the **Inspector** panel | boolean | <b id="f1">[1]</b> | See [visible attribute](../ccclass.md#visible-parameter) |
| displayName | Show as another name in the **Inspector** panel | string | undefined | - |
| tooltip | Add a Tooltip for a property in the **Inspector** panel | string | undefined | - |
| multiline | Use multi-line text boxes in the **Inspector** panel | boolean | false | - |
| readonly | Read-only in the **Inspector** panel | boolean | false | - |
| min | Restrict the minimum value in the **Inspector** panel | number | undefined | - |
| max | Restrict the maximum value in the **Inspector** panel | number | undefined | - |
| step | Restrict the step value in the **Inspector** panel | number | undefined | - |
| range | Set min, max, step | [min, max, step] | undefined | step value optional |
| slide | Show as a slider in the **Inspector** panel | boolean | false | - |

### Serialization-Related Attributes

The following attributes cannot be used with the `get` method.

| Attribute Name | Description | Type | Default | Remarks |
| :--- | :--- | :--- | :--- | :--- |
| serializable | Serialize this property | boolean | true | See [serializable attribute](../ccclass.md#serializable-parameters) |
| formerlySerializedAs | Specify the name of the field used in the previous serialization | string | undefined | Declare this attribute when renaming the property to be compatible with the previously serialized data |
| editorOnly | Exclude this property before exporting the project | boolean | false | - |

### Other Attributes

| Attribute Name | Description | Type | Default | Remarks |
| :--- | :--- | :--- | :--- | :--- |
| default | Define the default value of an attribute | (Any) | undefined | See [default attribute](../ccclass.md#default-parameter) |
| notify | Trigger the specified method when the property is assigned a value | `function (oldValue) {}` | undefined | The `default` attribute needs to be set and its value cannot be an array.<br> Not support ES6 definitions |
| override | Define this parameter as true when overriding parent properties | boolean | false | See [override parameter](../ccclass.md#override-parameters) |
| animatable | Whether this property can be modified by the **Animation** panel | boolean | undefined | - |

> <b id="f1">[1]</b>: The default value of visible depends on the property name. When the property name starts with an underscore `_`, it is hidden by default, otherwise it is shown by default.
