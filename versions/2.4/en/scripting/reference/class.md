# CCClass Advanced Reference

Compared to other JavaScript class implementations, the specialty of CCClass lies more within the metadata which has strong augmentability and can be plentifully defined. CCClass has a lot of details that you can get familiar developing games. This article will list these specifications. You should read [Declare class with cc.Class](../class.md) first if you haven't already.

## Glossary

 - CCClass: Class declared with `cc.Class`.
 - Prototype Object: the object literals passed in when declaring class with `cc.Class`.
 - Instance Member: including **member variable** and **instance method**.
 - Static Member: including **static variable** and **static method**.
 - Runtime: when project runs in preview or production environment, compare to scripts run in editor.
 - Serialization: Parse object in memory and output its data to a certain format of string for storage or transferring.

## Prototype Object Literals

All listed keys can be emitted, just declare the ones that needed:

```javascript
cc.Class({

    // Class name for serialization
    // value type: String
    name: "Character",

    // base class, can be any cc.Class
    // value type: Function
    extends: cc.Component,

    // constructor
    // value type: Function
    ctor: function () {},

    // property definition (method one: object)
    properties: {
        text: ""
    },

    // property definition (method two: arrow function)
    properties: () => ({
        text: ""
    }),

    // instance method
    print: function () {
        cc.log(this.text);
    },

    // static members
    // value type: Object
    statics: {
        _count: 0,
        getCount: function () {}
    },

    // this property is for Component only
    // value type: Object
    editor: {
        disallowMultiple: true
    }
});
```

### Class name

Class name can be any string, but should be identical. You can use `cc.js.getClassName` to get class name and `cc.js.getClassByName` to lookup the corresponding class. For component defined in user scripts you can omit the class name since the editor will use filename for component script for serialization. For other CCClass if you don't need to serialize class you can omit the name.

### Constructor

#### Declare by `ctor`

Use `ctor` to declare constructor of CCClass, for deserialization to work, constructor of CCClass **does NOT allow** parameter.

> If developer absolutely needs to pass parameter, `arguments` can be used to capture parameters, but do make sure you can finish instance creation process event if no parameter is passed.

#### Declare by `__ctor__`

`__ctor__` is the same as `ctor`, but it can receive constructor parameters, and will **NOT** call the constructor of parent class automatically, so you can call the constructor of parent by yourself. `__ctor__` is not the standard way to define constructor, always use the `ctor` unless you have a specific need.

## Type checks

### Check instance type

Native JavaScript's `instanceof` is enough for this:

```javascript
var Sub = cc.Class({
    extends: Base
});

var sub = new Sub();
cc.log(sub instanceof Sub);       // true
cc.log(sub instanceof Base);      // true

var base = new Base();
cc.log(base instanceof Sub);      // false
```

### Check class type

Use `cc.isChildClassOf` to check if a class inherits from another:

```javascript
var Texture = cc.Class();
var Texture2D = cc.Class({
    extends: Texture
});

cc.log(cc.isChildClassOf(Texture2D, Texture));   // true
```

The two parameters passed in should both be constructor function of the class instead of class instance. If two classes are the same, `isChildClassOf` will also return true.

## Members

### Member variable

The member variable defined inside constructor cannot be serialized and not visible in **Properties** panel.

```javascript
var Sprite = cc.Class({
    ctor: function () {
        // Declare member variable and assign default value.
        this.url = "";
        this.id = 0;
    }
});
```

> We recommend add `_` prefix to variable name for private members.

### Instance Method

Instance method please declare in the Prototype Object:

```javascript
var Sprite = cc.Class({
    ctor: function () {
        this.text = "this is sprite";
    },
    // declare an instance method called "print"
    print: function () {
        cc.log(this.text);
    }
});

var obj = new Sprite();
// call the instance method
obj.print();
```

### Static variable and static method

Static variables and static methods can be defined in `statics` property of the Prototype Object.

```javascript
var Sprite = cc.Class({
    statics: {
        // static variable
        count: 0,
        // static method
        getBounds: function (spriteList) {
            // ...
        }
    }
});
```

The above code equals:

```javascript
var Sprite = cc.Class({ ... });

// static variable
Sprite.count = 0;
// static method
Sprite.getBounds = function (spriteList) {
    // ...
};
```

Static members will be inherited by child class, it will **shallow copy** the static variable of the parent class to child class.

```javascript
var Object = cc.Class({
    statics: {
        count: 11,
        range: { w: 100, h: 100 }
    }
});

var Sprite = cc.Class({
    extends: Object
});

cc.log(Sprite.count);    // 11, for count is inherited from Object class

Sprite.range.w = 200;
cc.log(Object.range.w);  // 200, for Sprite.range and Object.range references the same object.
```

If no inheritance is considered, private static member can also be defined outside of the class:

```javascript
// local method
function doLoad (sprite) {
    // ...
};

// local variable
var url = "foo.png";

var Sprite = cc.Class({
    load: function () {
        this.url = url;
        doLoad(this);
    };
});
```

## Inheritance

### Constructor of parent class

**Notice** no matter if child class has defined its own constructor, the constructor of parent class will be called before child class instantiation.

```javascript
var Node = cc.Class({
    ctor: function () {
        this.name = "node";
    }
});

var Sprite = cc.Class({
    extends: Node,
    ctor: function () {
        // this.name is already initialized in parent class constructor
        cc.log(this.name);    // "node"
        // re-set this.name
        this.name = "sprite";
    }
});

var obj = new Sprite();
cc.log(obj.name);    // "sprite"
```

So you shouldn't call parent's constructor explicitly, or it will be called twice.

```javascript
var Node = cc.Class({
    ctor: function () {
        this.name = "node";
    }
});

var Sprite = cc.Class({
    extends: Node,
    ctor: function () {
        Node.call(this);        // Don't!
        this._super();          // Don't either!

        this.name = "sprite";
    }
});
```

> In special cases, arguments of parent's constructor may not compatible with child's constructor. Then you have to call parent's constructor and pass the needed arguments into it manually. At this point you should declare the child's constructor in `__ctor__`.

### Override

All member methods are virtual methods, so child class can override parent method:

```javascript
var Shape = cc.Class({
    getName: function () {
        return "shape";
    }
});

var Rect = cc.Class({
    extends: Shape,
    getName: function () {
        return "rect";
    }
});

var obj = new Rect();
cc.log(obj.getName());    // "rect"
```

Different from constructor, overridden method from parent class will not be called automatically, so you need to call explicitly if needed:

- Method one: use `this._super` provided by CCClass:

    ```javascript
    var Shape = cc.Class({
        getName: function () {
            return "shape";
        }
    });

    var Rect = cc.Class({
        extends: Shape,
        getName: function () {
            var baseName = this._super();
            return baseName + " (rect)";
        }
    });

    var obj = new Rect();
    cc.log(obj.getName());    // "shape (rect)"
    ```

- Method two: use native JavaScript language feature:

    ```javascript
    var Shape = cc.Class({
        getName: function () {
            return "shape";
        }
    });

    var Rect = cc.Class({
        extends: Shape,
        getName: function () {
            var baseName = Shape.prototype.getName.call(this);
            return baseName + " (rect)";
        }
    });

    var obj = new Rect();
    cc.log(obj.getName());    // "shape (rect)"
    ```

If the parent and child class are neither CCClass, you can use lower level API `cc.js.extend` to do inheritance.

## Property

Properties are special instance members that can be serialized and show in **Properties** panel.

### Property and constructor

No need to define property in constructor, the initialization of properties is even before the constructor is called. So you can use those properties in constructor function. If a default value of a property is not available in CCClass definition, you can also reassign **default** value in constructor.

```javascript
var Sprite = cc.Class({
    ctor: function () {
        this.img = LoadImage();
    },

    properties: {
        img: {
            default: null,
            type: Image
        }
    }
});
```

It should be noted that the process of the deserialization of the property occurs immediately **after** the constructor's execution, so that only the default values of the properties can be obtained and modified in the constructor, and the previously saved (serialized) values can not be obtained and modified.

### Attribute

All attributes are optional, but at least one of the `default`, `get`, `set` attributes must be declared.

#### `default` attribute

`default` is used to declare the default value of the property, and the property that declares the default value is implemented as a member variable by the CCClass. The default value is only used when the object is **created for the first time**, that is, when the default value is modified, the current value of the component that has been added to the scene is not changed.

> When you add a component in the editor, and then return to the script to modify a default value, you will not see the change in **Properties**. Because the current value of the property has been serialized to the scene, is no longer used to create the default value of the first time. If you want to force all properties back to their default values, you can select Reset in the component menu of the **Properties**.

`default` allows you to set the following types of values:

- Any value of type, string, or boolean
- `null` or `undefined`
- Object which instance of subclasses inherited from `cc.ValueType`, such as `cc.Vec2`, `cc.Color` or `cc.Rect`

    ```javascript
    properties: {
        pos: {
            default: new cc.Vec2(),
        }
    }
    ```

- Empty array `[]` or empty object `{}`
- A function that allows you to return any type of value, which is called again each time the class is instantiated and takes the return value as the new default:

    ```javascript
    properties: {
        pos: {
            default: function () {
                return [1, 2, 3];
            },
        }
    }
    ```

#### `visible` attribute

By default, whether or not a property is displayed in the **Properties** is depends on whether the property name begins with an underscore `_`. If you start with an underscore, the **Properties** is not displayed by default, otherwise it is displayed by default.

If you want to force the display in **Properties**, you can set the `visible` attribute to true:

```javascript
properties: {
    _id: {      // begins with an underscore would have been hidden
        default: 0,
        visible: true
    }
}
```

If you want to force the hidden, you can set the `visible` parameter to false:

```javascript
properties: {
    id: {       // not begins with an underscore would have been displayed
        default: 0,
        visible: false
    }
}
```

#### `serializable` attribute

Properties that specify the `default` value are serialized by default. After serialization, the settings in the editor will be saved to the resource file such as the scene, and automatically restore the previously set value when loading the scene. If you do not want to serialize, you can set `serializable: false`.

```javascript
temp_url: {
    default: "",
    serializable: false
}
```

#### `type` attribute

When the `default` can not provide sufficient detailed type information, in order to be able to display the correct input control in **Properties**, it is necessary to use the `type` to declare the specific type explicitly:

- When the default value is null, the type is set to the specified type of constructor, so that the **Properties** can know that a Node control should be displayed.

    ```javascript
    enemy: {
        default: null,
        type: cc.Node
    }
    ```

- When the default value is a number type, set type to `cc.Integer` to indicate that it is an integer, so that the property can not enter a decimal point in the **Properties**.

    ```javascript
    score: {
        default: 0,
        type: cc.Integer
    }
    ```

- When the default value is an enum (`cc.Enum`), since the enumeration value itself is actually a number, so set the type to enum type to display in **Properties** as an drop-down enum box.

    ```javascript
    wrap: {
        default: Texture.WrapMode.Clamp,
        type: Texture.WrapMode
    }
    ```

#### `override` attribute

All properties will be inherited by subclasses, if the subclass wants to override the parent property with the same name, you need to explicitly set the override attribute, otherwise there will be a warning:

```javascript
_id: {
    default: "",
    tooltip: "my id",
    override: true
},

name: {
    get: function () {
        return this._name;
    },

    displayName: "Name",
    override: true
}
```

For more information, please refer to [Attributes](attributes.md).

### <a name="deferred-definition"></a> Property delay definition

If two classes refer to each other, in the script load phase there will be a circular reference, the circular reference will lead to script loading error:

 - Game.js

    ```javascript
    var Item = require("Item");

    var Game = cc.Class({
        properties: {
            item: {
                default: null,
                type: Item
            }
        }
    });

    module.exports = Game;
    ```

 - Item.js

    ```javascript
    var Game = require("Game");

    var Item = cc.Class({
        properties: {
            game: {
                default: null,
                type: Game
            }
        }
    });

    module.exports = Item;
    ```

When the above two scripts are loaded, because they form a closed loop during the requiring process, so the load will appear a circular reference error, the type will become undefined when circular referenced.<br>
So we advocate the use of the following property definition:

 - Game.js

    ```javascript
    var Game = cc.Class({
        properties: () => ({
            item: {
                default: null,
                type: require("Item")
            }
        })
    });

    module.exports = Game;
    ```

 - Item.js

    ```javascript
    var Item = cc.Class({
        properties: () => ({
            game: {
                default: null,
                type: require("Game")
            }
        })
    });

    module.exports = Item;
    ```

This is done by specifying properties as an arrow function (lambda expression) of ES6. The contents of the arrow function are not executed synchronously during the script load, but are loaded by the CCClass asynchronously after all scripts have been loaded. So the cycle of reference does not occur during loading, properties can be normal initialization.

> The arrow function is used in conjunction with the ES6 standard for JavaScript, and Creator automatically compiles ES6 to ES5, and users do not have to worry about browser compatibility issues.

You can understand the arrow function like this:

```js
// The arrow function supports omitting the 'return' statement, and we recommend this omission:

properties: () => ({    // <- brackets "(" on the right side of the arrows can not be omitted
    game: {
        default: null,
        type: require("Game")
    }
})

// If you want to completely write 'return', then the above wording is equivalent to:

properties: () => {
    return {
        game: {
            default: null,
            type: require("Game")
        }
    };      // <- here the contents of the return, is the original part of the brackets in the right side of the arrow
}

// We can not use the arrow function, but with ordinary anonymous function:

properties: function () {
    return {
        game: {
            default: null,
            type: require("Game")
        }
    };
}
```

## GetSet method

After the get or set is set in the property, the predefined get or set method can be triggered when the property is accessed.

### get

Set the get method in the property:

```javascript
properties: {
    width: {
        get: function () {
            return this.__width;
        }
    }
}
```

The get method can return any type of value.<br>
This property can also be displayed in the **Properties** and can be accessed directly in all the code including within the constructor.

```javascript
var Sprite = cc.Class({
    ctor: function () {
        this.__width = 128;
        cc.log(this.width);    // 128
    },

    properties: {
        width: {
            get: function () {
                return this.__width;
            }
        }
    }
});
```

Please note:

1. After setting get, this property can not be serialized, nor can it specify a default value, but it can still include most of the attributes except `default`, `serializable`.

    ```javascript
    width: {
        get: function () {
            return this.__width;
        },

        type: cc.Integer,
        tooltip: "The width of sprite"
    }
    ```

2. The get attribute itself is read-only, but the returned object is not read-only. Users can still use the code to modify the object's internal properties, such as:

    ```javascript
    var Sprite = cc.Class({
        ...
        position: {
            get: function () {
                return this._position;
            },
        }
        ...
    });

    var obj = new Sprite();
    obj.position = new cc.Vec2(10, 20);   // Failure! position is read only!
    obj.position.x = 100;                 // Allow! _position object itself returned by position can be modified!
    ```

### set

Set the set method in the property:

```javascript
width: {
    set: function (value) {
        this._width = value;
    }
}
```

The set method receives an incoming parameter, which can be of any type.

Set generally used with get:

```javascript
width: {
    get: function () {
        return this._width;
    },

    set: function (value) {
        this._width = value;
    },

    type: cc.Integer,
    tooltip: "The width of sprite"
}
```

> If there is no definition with get, then set itself can not be attached with any attributes.<br>
> As get, once set declared, this property can not be serialized, can not specify the default value.

## `editor` attribute

`editor` can only be defined in subclasses of `cc.Component`.

```javascript
cc.Class({
  extends: cc.Component,

  editor: {

    // Allows the current component to run in editor mode.
    // By default, all components are executed only at runtime, meaning that they will not have
    // their callback functions executed while the Editor is in edit mode.
    //
    // Value type: Boolean
    // Default: false
    executeInEditMode: false,

    // The requireComponent parameter is used to specify the dependencies of the current component.
    // When a component is added to a node, if the dependent component does not exist,
    // the engine will automatically add the dependency component to the same node to prevent script errors.
    // This option is also valid at run time.
    //
    // Value type: Function (must be inherited from cc.Component constructor, such as cc.Sprite)
    // Default: null
    requireComponent: null,

    // The execution order of lifecycle methods for Component.
    // Those less than 0 will execute before while those greater than 0 will execute after.
    // The order will only affect onLoad, onEnable, start, update and lateUpdate while onDisable and
    // onDestroy will not be affected.
    //
    // Value type: Number
    // Default: 0
    executionOrder: 0,

    // When the component is added to the node, prevents Component of the same type (or subtype) to be
    // added more than once to a Node.
    // Prevent the logic from conflict.
    //
    // Value type: Boolean
    // Default: false
    disallowMultiple: false,

    // menu is used to add the current component to the component menu for user search.
    //
    // Value type: String (Such as "Rendering/Camera")
    // Default: ""
    menu: "",

    // When "executeInEditMode" is set, playOnFocus can be used to set the scene refresh rate
    // of the editor when the node of the current component is selected.
    // If playOnFocus is set to true, the scene renderer will remain at 60 FPS, and if false,
    // the scene will only be redrawn when necessary.
    //
    // Value type: Boolean
    // Default: false
    playOnFocus: false,

    // Customize the page url used by the current component to render in the **Properties**.
    //
    // Value type: String
    // Default: ""
    inspector: "",

    // Customize the icon that the current component displays in the editor.
    //
    // Value type: String
    // Default: ""
    icon: "",

    // Specify the help document url for current component, after set up the **Properties** will appear a help icon.
    // The user clicks to open the specified page.
    //
    // Value type: String
    // Default: ""
    help: "",
  }
});
```
