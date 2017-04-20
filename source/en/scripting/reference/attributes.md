# Attribute reference

> The attribute is used to append metadata to a defined property, similar to the Decorator of the scripting language or the Attribute of C#.

### Properties panel corresponding attributes

Parameter name  | Explanation | Type | Default | Remarks
--- | --- |:---:|:---:|---
type | restrict the data type for property | (Any) | undefined | See [type attribute](class.md#type)
visible | show or hide in the **Properties** | boolean | (note 1) | See [visible attribute](class.md#visible)
displayName | show another name in the **Properties** | string | undefined |
tooltip | add Tooltip for property in the **Properties** | string | undefined |
multiline | use multiple lined text box in the **Properties** | boolean | false |
readonly | read-only in the **Properties** | boolean | false |
min | restrict the minimum value in **Properties** | number | undefined |
max | restrict the maximum value in **Properties** | number | undefined |
step | restrict the step value in **Properties** | number | undefined |
range | one-time setup for min, max, step | [min, max, step] | undefined | step is optional
slide | show a slider in the **Properties** | boolean | false |

### Serialization associated attributes

These attributes cannot be used for the get method.

Parameter name  | Explanation | Type | Default | Remarks
--- | --- |:---:|:---:|---
serializable | serialize this property | boolean | true | See [serializable attribute](class.md#serializable)
editorOnly | reject this property before exporting the project | boolean | false |

### Other attributes

Parameter name  | Explanation | Type | Default | Remark
--- | --- |:---:|:---:|---
default | define default for the property | (Any) | undefined | See [default attribute](class.md#default)
url | this property is the URL of an assigned asset | `function` <br> (constructor inherited from cc.RawAsset) | undefined | See [Acquire and load asset: Raw Asset](../load-assets.md#raw-asset)
notify | trigger a specific method when assigning the property | `function (oldValue) {}` | undefined | The default property is needed to define and is not available for array.
override | when reloading the super class property, this parameter needs to be defined as true | boolean | false | See [override attribute](class.md#override)
animatable | whether this property can be altered by animation | boolean | true |

**Note 1:** The default value of `visible` is determined by the property name. When the property name starts with an underscore `_`, then the default is set to hide, otherwise it is by default set to show.


---

Continue on to read about [Animation](../../animation/index.md) or back to [Scripting](../index.md).
