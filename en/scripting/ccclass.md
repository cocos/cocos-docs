# CCClass

When the decorator [ccclass](#ccclass) is applied to a class, the class is called `ccclass`. The `ccclass` injects additional information to control __Cocos Creator 3.0__'s serialization of this kind of object along with the editor's display for these types of objects.

## ccclass

Various characteristics of the `ccclass` are specified by the `ccclass` option parameter of `ccclass(name)`.

### ccclass name

The option `name` specifies the name of the `ccclass`. The `ccclass` name should be **unique**.

When you need the corresponding `ccclass`, you can find it by its `ccclass` name, for example:

- Serialization. If the object is a cc object, the `ccclass` name of the object will be recorded during serialization. During deserialization, the corresponding `ccclass` will be found for serialization based on this name.

- When the `ccclass` is a component class, `Node` can find the component by its `ccclass` name.

## ccattributes

When the decorator [property](#property) is applied to a property or accessor of the `ccclass`, this property is called a `ccproperty`.

Similar to the `ccclass`, the `ccattribute` injects additional information to control the serialization of the attribute in **Cocos Creator 3.0** and the display of the attribute in the editor.

### Property

Various characteristics of the `ccattribute` are specified by the `ccattribute` option parameter of `property()`.

### cctype

The option `type` specifies the `cctype` of the attribute. The type can be specified by the following parameters:

- Constructor

  The type specified by the constructor is directly used as the `cctype` of the attribute.<br>
  > **Note**: when Javascript built-in constructors `Number`, `String`, `Boolean` A warning will be given when used as a `cctype`, and they are regarded as `cctype`'s `CCFloat`, `CCString`, and `CCBoolean` respectively.

- Cocos Creator 3.0 built-in attribute type identification.

  `CCInteger`, `CCFloat`, `CCBoolean`, and `CCString` are built-in attribute type identifiers.
  - `CCInteger` declares the type as **integer**.
  - `CCFloat` declares the type as **floating point number**.
  - `CCString` declares the type as **string**.
  - `CCBoolean` declares the type as **Boolean**.

- Array

  When using the constructor, built-in property type identification or array as the array element, the properties are specified as **Cocos Creator 3.0** array. For example, `[CCInteger]` declares the type as a array whose elements are integers.

If the attribute does not specify the `cctype`, **Cocos Creator 3.0** will derive its `cctype` from the default value of the attribute or the evaluation result of the initialization formula:
- If the value type is Javascript primitive type `number`, `string`, `boolean`, the `cctype`s are Creator floating point, string, and boolean values, respectively.
- Otherwise, if the value is an object type, it is equivalent to using the object's constructor to specify the `cctype`.
- Otherwise, the `cctype` of the attribute is **undefined**.

Generally, you only need to explicitly declare the `cctype` in the following situations:

- When the attribute needs to be displayed as an integer.
- When the actual value of the attribute may be of multiple types.

For how the `cctype` affects the cc attribute and the treatment of attributes that do not define the `cctype`, see:

- [Attribute Type](#AttributeParameters)
- [Serialization parameter](#serializableparameter)

For convenience, the following decorators are additionally provided to quickly declare the `cctype`:

| Type | Equivalent to |
|---------- |---------------------- |
| @type(t) | @property(t) |
| @integer | @property(CCInteger) |
| @float | @property(CCFloat) |
| @string | @property(CCString) |
| @boolean | @property(CCBoolean) |

The following code demonstrates the declaration of `ccattributes` of different `cctype`s:

```ts
import { _decorator, CCInteger, Node } from 'cc';
const { ccclass, property, integer, float, boolean, string, type } = _decorator;
@ccclass
class MyClass {
    @integer // Declare that the cc type of the attribute _id is a Cocos integer
    private _id = 0;

    @type(Node) // Declare that the cc type of the attribute _targetNode is Node
    private _targetNode: Node | null = null;

    @type([Node]) // declare the cc type of the attribute _children as a Node array
    private _children: Node[] = [];

    @property
    private _count = 0; // the cc type is not declared, and it is inferred from the evaluation result of the initializer as a Cocos floating point number

    @type(String) // Warning: Constructor should not be used String
                // equivalent to CCString
    private _name: string = '';

    @property
    private _children2 = []; // The cc type is not declared, inferred from the evaluation result of the initializer: the element is an undefined Cocos array
}
```

### Defaults

The option `default` specifies the default value of the cc attribute.

### Constructor

#### Defined By Constructor

The constructor of `CCClass` is defined by `constructor`. To ensure that deserialization can always run correctly, `constructor` **is not allowed to define **constructor parameters**.

> **Note**: if developers really need to use construction parameters, they can get them through `arguments`, but remember that if this class will be serialized, you must ensure that the object can still be new when the construction parameters are all default.

## Judging The Type

### Judgment Example

When making type judgments, use **TypeScript** native `instanceof`:

```typescript
class Sub extends Base {

}

let sub = new Sub();
console.log(sub instanceof Sub);  // true
console.log(sub instanceof Base);  // true

let base = new Base();
console.log(base instanceof Sub);  // false
```

## Members

### Instance Variables

The instance variables defined in the constructor cannot be serialized, nor can they be viewed in the **Inspector** panel.

```typescript
class Sprite {
    // Declare variables
    url: string;
    id: number;
    constructor() {
        // assignment
        this.url = "";
        this.id = 0;
    }
}
```

> **Note**: if it is a private variable, it is recommended to add an underscore `_` in front of the variable name to distinguish it.

### Example Method

Please declare the instance method in the prototype object:

```typescript
class Sprite {
    text: string;
    constructor() {
        this.text = "this is sprite"
    }
    // Declare an instance method named "print"
    print() {
        console.log(this.text);
    }
}

let obj = new Sprite();
// call instance method
obj.print();
```

### Static Variables and Static Methods

Static variables or static methods can be declared with `static`:

```typescript
class Sprite {
    static count = 0;
    static getBounds() {

    }
}
```

Static members will be inherited by subclasses. When inheriting, the static variables of the parent class will be **shallowly copied** to the subclass. Therefore:

```typescript
class Object {
    static count = 11;
    static range: { w: 100, h: 100 }
}

class Sprite extends Object {

}

console.log(Sprite.count);    // The result is 11 because count inherits from the Object class

Sprite.range.w = 200;
console.log(Object.range.w);  // The result is 200, because Sprite.range and Object.range point to the same object
```

If you don't need to consider inheritance, private static members can also be defined directly outside the class:

```typescript
// local method
doLoad(sprite) {
    // ...
};

// local variables
let url = "foo.png";

class Sprite {
    load() {
        this.url = url;
        doLoad(this);
    };
};
```

## Inheritance

### Parent Constructor

Please note that regardless of whether the subclass has a constructor defined, the constructor of the parent class will be automatically called before the subclass is instantiated.

```typescript
class Node {
    name: string;
    constructor() {
        this.name = "node";
    }
}
class Sprite extends Node {
    constructor() {
        super();
        // Before the child constructor is called, the parent constructor has been called, so this.name has been initialized
        console.log(this.name);    // "node"
        // reset this.name
        this.name = "sprite";
    }
}

let obj = new Sprite();
console.log(obj.name);    // "sprite"
```

### Rewrite

All member methods are virtual methods, and child methods can directly override parent methods:

```typescript
class Shape {
    getName() {
        return "shape";
    }
};

class Rect extends Shape {
    getName () {
        return "rect";
    }
};

let obj = new Rect();
console.log(obj.getName());    // "rect"
```

## Attributes

Attributes are special instance variables that can be displayed in the **Inspector** panel and can also be serialized.

### Properties and Constructors

The attribute **not required** is defined in the constructor. Before the constructor is called, the attribute has been assigned a default value and can be accessed in the constructor. If the default value of the attribute cannot be provided when defining the `ccclass` and needs to be obtained at runtime, you can also re-assign the default value to the attribute in the constructor.

```typescript
class Sprite {
    constructor() {
        this.num = 1;
    }
    @property({ type: CCInteger })
    private num = 0;
}
```

However, it should be noted that the process of property deserialization occurs immediately after the execution of the **constructor**, so the default value of the property can only be obtained and modified in the **constructor**, and it cannot be obtained and saved before the modification (serialization ) value.

### Attribute Parameters

#### Default Parameter

`default` is used to declare the default value of the attribute. The attribute with the default value will be implemented as a member variable by `ccclass`. The default value is only used when the object is created for the first time, which means that when the default value is modified, the current value of the component that has been added to the scene will not be changed.

> **Note**: after you add a component to the editor, go back to the script to modify a default value, there is no change in the **Inspector** panel. Because the current value of the property has been serialized into the scene, it is no longer the default value used when it was first created. If you want to force all properties to be reset to default values, you can select Reset in the component menu of the **Inspector** panel.

`default` can be set to the following value types:

1. Any number, string or boolean type value
2. `null` or `undefined`
3. Subclasses inherited from `ValueType`, such as instantiated objects of `Vec3`, `Color` or `Rect`:

    ```typescript
    @property({ type: Vec3 })
    private pos = null;
    ```

4. Empty array `[]` or empty object `{}`

#### visible

By default, whether it is displayed in the **Inspector** panel depends on whether the attribute name starts with an underscore `_`. If it starts with an underscore, it will not be displayed in the **Inspector** panel by default, otherwise it will be displayed by default.

If you want to force it to be displayed in the **Inspector** panel, you can set the `visible` parameter to true:

```typescript
@property({ visible: true })
    private _num = 0;
```

If you want to force hiding, you can set the `visible` parameter to false:

```typescript
@property({ visible: false })
    private num = 0;
```

#### serializable

Attributes with a default value of `default` will be serialized by default. After serialization, the values set in the editor will be saved to resource files such as scenes, and the previously set values will be automatically restored when the scene is loaded. If you don't want to serialize, you can set `serializable: false`.

```typescript
@property({ serializable: false })
    private num = 0;
```

#### type

When `default` cannot provide enough detailed type information, in order to display the correct input control in the **Inspector** panel, you must use `type` to explicitly declare the specific type:

- When the default value is null, set type to the constructor of the specified type, so that the **Inspector** panel knows that a Node control should be displayed.

    ```typescript
    @property({ type: Node })
    private enemy = null;
    ```

- When the default value is a number type, set the type to `cc.Integer` to indicate that this is an integer, so that the attribute cannot be entered in the decimal point in the **Inspector** panel.

    ```typescript
    @property({ type: CCInteger })
    private num = 0;
    ```

- When the default value is an enumeration (`Enum`), since the enumeration value itself is actually a number, the type must be set to the enumeration type to be displayed in the **Inspector** panel enumerate the drop-down box.

    ```typescript
    enum A {
        c,
        d
    }
    Enum(A);
    @ccclass("test")
    export class test extends Component {
        @property({ type: A })
        accx:A=A.c;
    }
    ```

#### override

All properties will be inherited by the subclass. If the subclass wants to override the property with the same name of the parent class, you need to explicitly set the override parameter, otherwise there will be a duplicate name warning:

```typescript
@property({ type: CCString, tooltip: "my id", override: true })
private _id = "";

@property({ displayName: "Name", override: true })
private _name = null;
private get name() {
    return this._name;
}
```

### group

Group attributes and support intra-group sorting
`@property({ group: { name } })`  
Or
`@property({ group: { id, name, displayOrder, style } })`  
id is groupId, default value is 'default';
name is groupName;
displayOrder default value is Infinity, sorted at last;
style recently only one value 'tab';

```typescript
@property({ group: { name: 'bar' }, type: Node }) 
node2: Node = null!; 
@property({ group: { name: 'foo' }, type: Sprite }) 
sprite: Sprite = null!;
```
![decorator-group](decorator-group.png)

For more parameters, please refer to the [Property Parameters](./reference/attributes.md) documentation.

## get/set methods

After the `get` or `set` is set in the property, when the property is accessed, the predefined `get` or `set` method can be triggered.

### get

Set the `get` method in the properties:

```typescript
private _num = 0;
@property({ type: CCInteger })
private get num() {
    return this._num;
}
```

The get method can return any type of value.

This property can also be displayed in the **Inspector** panel and can be directly accessed in all codes including the constructor.

```typescript
class Sprite {
    _width: number;
    constructor() {
        this._width = 128;
        console.log(this.width);    // 128
    }
    @property({ type: CCInteger })
    private width = 0;
    private get width() {
        return this._width;
    }
};
```

As get accessor is used, this property cannot be serialized, nor can it be assigned a default value, but most parameters except `default` and `serializable` can still be attached.

```typescript
@property({ type: CCInteger, tooltip: "The width of sprite" })
private _width = 0;
private get width() {
    return this._width;
}
```

The `get` accessor is read-only, but the returned object is not read-only. Users can still modify the internal properties of the object using code, for example:

```typescript
@property
_num = 0;

private get num() {
    return this._num;
}

start() {
    consolo.log(this.num);
}
```

### set

Set the `set` method in the properties:

```typescript
private _width = 0;
@property({ type: CCInteger })
set (value) {
    this._width = value
}
```

The `set` method receives an incoming parameter, which can be of any type.

`set` is generally used with `get`:

```typescript
@property
_width = 0;

private get width() {
    return this._width;
}

set(value) {
    this._width = value;
}
```

> **Notes**:
> 1. If it is not defined together with `get`, the `set` itself cannot be accompanied by any parameters.
> 2. Like `get`, after `set` is set, this property cannot be serialized, nor can it be assigned a default value.
