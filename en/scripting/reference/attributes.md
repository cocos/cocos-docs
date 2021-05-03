# Attribute reference

> The attribute is used to append metadata to a defined property, similar to the Decorator of the scripting language or the Attribute of C#.

## Properties panel corresponding attributes

| Parameter name  | Explanation | Type | Default | Remarks |
| :--- | :--- | :--- | :--- | :--- |
| type | Restrict the data type for property | (Any) | undefined | See [type attribute](class.md#type-attribute) |
| visible | Show or hide in the **Properties** | boolean | (note 1) | See [visible attribute](class.md#visible-attribute) |
| displayName | Show another name in the **Properties** | string | undefined | - |
| tooltip | Add Tooltip for property in the **Properties** | string | undefined | - |
| multiline | Use multiple lined text box in the **Properties** | boolean | false | - |
| readonly | Read-only in the **Properties** | boolean | false | - |
| min | Restrict the minimum value in **Properties** | number | undefined | - |
| max | Restrict the maximum value in **Properties** | number | undefined | - |
| step | Restrict the step value in **Properties** | number | undefined | - |
| range | One-time setup for min, max, step | [min, max, step] | undefined | step is optional |
| slide | Show a slider in the **Properties** | boolean | false | - |

## Serialization associated attributes

These attributes cannot be used for the get method.

| Parameter name  | Explanation | Type | Default | Remarks |
| :--- | :--- | :--- | :--- | :--- |
| serializable | Serialize this property | boolean | true | See [serializable attribute](class.md#serializable-attribute) |
| formerlySerializedAs | Specify the name of the field used in formerly serialization | string | undefined | Use this attribute to rename a property without losing its serialized value. |
| editorOnly | Reject this property before exporting the project | boolean | false | - |

## Other attributes

| Parameter name  | Explanation | Type | Default | Remark |
| :--- | :--- | :--- | :--- | :--- |
| default | Define default for the property | (Any) | undefined | See [default attribute](class.md#default-attribute) |
| notify | Trigger a specific method when assigning the property | `function (oldValue) {}` | undefined | The default property is needed to define and is not available for array.<br>Not support ES6 Classes. |
| override | When reloading the super class property, this parameter needs to be defined as true | boolean | false | See [override attribute](class.md#override-attribute) |
| animatable | Whether this property can be altered by the **Timeline** panel | boolean | undefined | - |

**Note 1**: The default value of `visible` is determined by the property name. When the property name starts with an underscore `_`, then the default is set to hide, otherwise it is by default set to show.
