# Property attributes

Attributes are used to attach metadata to defined properties, similar to `Decorator` in scripting languages or `Attribute` in `C#`.

## Related Attributes on Inspector Panel

| Attribute Name | Description | Type | Default | Remarks |
| :--- | :--- | :--- | :--- | :--- |
| type | Restrict the data type of the property | (Any) | undefined | See [type attribute](../decorator.md#type-attribute) |
| visible | Show or hide in the **Inspector** panel | boolean | <b id="f1">[1]</b> | See [visible attribute](../decorator.md#visible-attribute) |
| displayName | Show as another name in the **Inspector** panel | string | undefined | - |
| tooltip | Add a Tooltip for a property in the **Inspector** panel | string | undefined | - |
| multiline | Use multi-line text boxes in the **Inspector** panel | boolean | false | - |
| readonly | Read-only in the **Inspector** panel | boolean | false | - |
| min | Restrict the minimum value in the **Inspector** panel | number | undefined | - |
| max | Restrict the maximum value in the **Inspector** panel | number | undefined | - |
| step | Restrict the step value in the **Inspector** panel | number | undefined | - |
| range | Set min, max, step | [min, max, step] | undefined | step value optional |
| slide | Show as a slider in the **Inspector** panel | boolean | false | - |
| group | Show as a tab group in the **Inspector** panel | { name } or { id, name, displayOrder, style } | undefined | See [group attribute](../decorator.md#group) |

## Serialization-Related Attributes

The following attributes cannot be used with the `get` method.

| Attribute Name | Description | Type | Default | Remarks |
| :--- | :--- | :--- | :--- | :--- |
| serializable | Serialize this property | boolean | true | See [serializable attribute](../decorator.md#serializable-attribute) |
| formerlySerializedAs | Specify the name of the field used in the previous serialization | string | undefined | Declare this attribute when renaming the property to be compatible with the previously serialized data |
| editorOnly | Exclude this property before exporting the project | boolean | false | - |

## Other Attributes

| Attribute Name | Description | Type | Default | Remarks |
| :--- | :--- | :--- | :--- | :--- |
| override | Define this parameter as true when overriding parent properties | boolean | false | See [override attribute](../decorator.md#override-attribute) |

> <b id="f1">[1]</b>: The default value of visible depends on the property name. When the property name starts with an underscore `_`, it is hidden by default, otherwise it is shown by default.
