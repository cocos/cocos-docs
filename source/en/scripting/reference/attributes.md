# Attribute reference

### Properties panel corresponding attributes

Parameter name  | Explanation | Type | Default
--- | --- |:---:|:---:
type | restrict the data type for property | (Any) | undefined
visible | show or hide in the **Properties** panel| boolean | (note 1)
displayName | show another name in the **Properties** panel | string |
tooltip | add Tooltip for property in the **Properties** panel | string |
multiline | use multiple lined text box in the **Properties** panel | boolean | false
readonly | read-only in the **Properties** panel | boolean | false
min | restrict the minimum value in slider form | number | undefined |
max | restrict the maximum value in slider form | number | undefined |
step | restrict the step value in slider form | number | undefined |
range | one-time setup for min, max, step | [min, max, step] | step is optional
slide | show a slider in the **Properties** panel | boolean | false |

### Serialization associated attributes

These attributes cannot be used for the get method.

Parameter name  | Explanation | Type | Default
--- | --- |:---:|:---:
serializable | serialize this property | boolean | true
editorOnly | reject this property before exporting the project | boolean | false

### Other attributes

Parameter name  | Explanation | Type | remark
--- | --- |:---:|:---:
default | define default for the property | (Any) | (note 2,3)
url | this property is the URL of an assigned asset | function () {} |
notify | trigger a specific method when assigning the property | function (oldValue) {} | the default property is needed to define. `notify` is not available for array.
override | when reloading the super class property, this parameter needs to be defined as true | boolean | default is false
animatable | whether this property can be altered by animation | boolean | default is true

**Note 1:** The visibility default is determined by the property name. When the property name starts with an underscore `_`, then the default is set to hide, otherwise it is by default set to show.

**Note 2:** Alterations to the serializable property default value won't influence a scene that has already been saved or opened.

**Note 3:** Default can be defined as a function, so the default initialization for `Array` and `Object` can be done safely. For example:

```javascript
  properties: {
    names: {
      default: function () {
        return ['foo', 'bar', 'foobar'];
      },
      type: [cc.String]
    },
  }
```
