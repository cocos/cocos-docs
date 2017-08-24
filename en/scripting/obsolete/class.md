> All the "Remarks" belong to advanced content. Beginners don't need to understand them.

`cc.Class` is a common API, which is used to declare categories in Cocos Creator. For the convenience of categorization, we call the class that uses the cc.Class declaration **CCClass**. Compared to other JavaScript class systems, the specialty of CCClass lies more within the metadata which has strong augmentability and can be plentifully defined.

## Summary

### Create Fire.Class


For the convenience of discussion, the `{ name: 'Sprite' }` object imported here is generally called the **original object** in this manual. This manual will mainly introduce how to define original object.

### Create an object

Because CCClass is a JavaScript construct function itself. You can use `new` to create an object:

```js
    var obj = new Sprite();
```

### Construct a function

If `constructor` is declared in the original object, then the designated construct function will be invoked in the construction process for every instance. The construct function **not permitted** of CCClass defines the **construct parameter**.

```js
    var Sprite = cc.Class({
        ctor: function () {
            console.log(this instanceof Sprite);    // true
        }
    });
    var obj = new Sprite();
```

Note: Component is special CCClass, which can't define a constructor. Its construct duty can be replaced by the `onLoad` method.

### Judge class

`instanceof` can be used to judge the class of an object:

```js
    console.log(obj instanceof Sprite);     // true
```

**Remark**

- If serialization is not needed, the class name can be omitted. class name could be an arbitrary string, but no repetition is permitted. cc.js.getClassName can be used to obtain the class name. cc.js.getClassByName can be used to look up the corresponding class.
- If professional developers do need to use construction parameters, they can obtain them from arguments in the constructor. But if this class needs serialization, developers should make sure they can still create new objects when construct parameters are defaulted.

## Member

### Instance variable

Please declare instance variables uniformly in the construct function:

```js
    var Sprite = cc.Class({
        ctor: function () {
            // Declare the instance variable and assign defaulted value
            this.url = "";
            this.id = 0;
        }
    });
    var obj = new Sprite();
    // assign value
    obj.url = 'img/fb.png';
    obj.id = 1;
```

### Instance method

Please declare the instance method in the original object:

```js
    var Sprite = cc.Class({
        ctor: function () {
            // ...
        },
        // Declare an instance method named "load"
        load: function () {
            // load this.url
        };
    });
    var obj = new Sprite();
    // Invoke the instance method
    obj.load();
```

### class variable and class method

The static class variable or class method can be directly added to the defined Class:

```js
    var Sprite = cc.Class({ ... });

    // Declare class variable
    Sprite.count = 0;
    // Declare class method
    Sprite.getBounds = function (spriteList) {
        // ...
    };
```

It can also be declared in the `statics` of the original object:

```js
    var Sprite = cc.Class({
        statics: {
            // Declare class variable
            count: 0,
            // Declare class method
            getBounds: function (spriteList) {
                // ...
            }
        }
    });
```

**the complete code is as follows:**

```js
    var Sprite = cc.Class({
        name: 'Sprite',
        ctor: function () {
            // Declare the instance variable and assign the defaulted value
            this.url = "";
            this.id = 0;
        },
        // Declare an instance method named "load"
        load: function () {
            // load this.url
        };
    });
    // Instantiation
    var obj = new Sprite();
    // visit instance variable
    obj.url = 'sprite.png';
    // Invoke instance method
    obj.load();

    // Declare class variable
    Sprite.count = 0;
    // declare class method
    Sprite.getBounds = function (spriteList) {
        // ...
    };

    // Invoke class method
    Sprite.getBounds([obj]);
```

**Remark**

- If it's a **private** member, we recommend you to add an underline `_` to the front of the name of the member for differentiation purposes.

    ```js
    var Sprite = cc.Class({
        name: 'Sprite',
        ctor: function () {
            // Privatize instance variable
            this._myData = 0;
        },
        // Privatize instance method
        _load: function () {
            // ...
        };
    });
    // privatize class variable
    Sprite._list = [];
    ```

- If it's a **private** static member, developers can also use Closure to perform the same operation.

    ```js
    // privatize static method
    var doLoad = function (sprite) {
        // Do load ...
    };
    // Privatize static variable
    var url = 'foo.png';

    var Sprite = cc.Class({
        load: function () {
            // Invoke the method in part scope
            doLoad(this, url);
        };
    });
    ```

- "Instance member" discussed here includes the "member variable" and "instance method".
- "Static member" discussed here includes the "static variable" and "static method".
- The inheriting realization method of class variables is realized by "shallow copying" the static variable of the parent class to the child class.

## Inheritance

### Declaration method

Please declare `extends` in the original object when inheriting:

```js
    // Define base class
    var Node = cc.Class();

    // Define sub class
    var Sprite = cc.Class({
        extends: Node
    });

    // Test
    var obj = new Sprite();
```

`instanceof` can also be used to judge if the class of an object inherits from a certain parent class:

```js
    var sub = new Sprite();
    console.log(sub instanceof Node);       // True
    var base = new Node();
    console.log(base instanceof Sprite);    // False
```

### Parent construct function

Please pay attention! Whether the construct function of the child class is provided or not, the construct function of the parent class will be automatically invoked at first before the instantiation of the child class.

```js
    var Node = cc.Class({
        ctor: function () {
            this.name = "node";
        }
    });
    var Sprite = cc.Class({
        extends: Node,
        ctor: function () {
            // Before the invoking of the child construct function, the parent construct function has already been invoked; therefore this.name has been initialized
            console.log(this.name);    // "node"
            // Reset this.name
            this.name = "sprite";
        }
    });
    var obj = new Sprite();
    console.log(obj.name);    // "sprite"
```

### Reload

All of the instance methods are virtual methods. The child class method can directly reload the parent method:

```js
    var Node = cc.Class({
        getName: function () {
            return "node";
        }
    });
    var Sprite = cc.Class({
        getName: function () {
            return "sprite";
        }
    });
    var obj = new Sprite();
    console.log(obj.getName());    // "sprite"
```

If developers want to invoke the parent class method, they should invoke it in the form of call or apply, directly by using the prototype of the parent class:

```js
    var Node = cc.Class({
        getName: function () {
            return "node";
        }
    });
    var Sprite = cc.Class({
        getName: function () {
            var baseName = Node.prototype.getName.call(this);
            return baseName + ">sprite";
        }
    });
    var obj = new Sprite();
    console.log(obj.getName());    // "node>sprite"
```

Use `cc.isChildClassOf` to judge the inheriting relation between two categories:

```js
    var Texture = cc.Class();
    var Texture2D = cc.Class({
        extends: Texture
    });
    console.log(cc.isChildClassOf(Texture2D, Texture));   // True
```

Please pay attention! Both the two imported parameters should be construct functions of the categories, but not object instances of the categories. If two imported categories are equivalent, `isChildClassOf` will return true.

**Remark**

- The parent class can be visited by the static variable `$super` of the child class.
- All the instance members and class members will be inherited by the child class.
- If you want to realize original JavaScript inheritance, i.e., your parent class and child class are not CCClass, then you can inherit it by using the cc.js.extend method.

## Property

### Property definition and visit

Property is a special instance variable, which can display in **Properties** panel and also can be deserialized. Property is not defined in the construct function, but declared in the `properties` dictionary of the original object.

**Next, define a playerName property in the Player class:**

```js
    var Player = cc.Class({
        extends: cc.Component,

        properties {
            playerName: {
                default: 'Jare'
            }
        }
    });
```

In this way, playerName will display in the **Properties** panel panel. When saving the scene that has Player, playerName will be saved.

Here `default` is used to declare the defaulted value of the property, which also defined the value class as string. The class of the defaulted value is not limited, which will be used only when creating an object for the first time.

**property itself is an instance variable, which can be directly called on:**

```js
    var Sprite = cc.Class({
        ctor: function () {
            console.log(this.width);    // Read default width
        },

        properties: {
            width: {
                default: 128
            },
        },

        getWidth: function () {
            return this.width;
        }
    });
```

Before the construct function is invoked, the property has been defined. Developers can visit it in the construct function or re-assign a value to the property.

### Property attribute

Each property can attach multiple attributes arbitrarily to designate the display method, serialization method, etc., in **Properties** panel.

```js
    properties {
        score: {
            default: 0,
            type: 'Integer',
            tooltip: 'The score of player'
        }
    }
```

The above code stipulated that the score can only input a whole number in **Properties** panel, and when the mouse rests upon a parameter, the corresponding Tooltip will display.

The following are common parameters. For detailed usage instructions, please refer to [/manual/scripting/attributes].

- type: define the data class of a property
- url: define the property as a URL of a designated class
- visible: when it's set as false, the property will not display in the **Properties** panel
- serializable: when it's set as false, the property will not be serialized
- displayName: the property will be displayed with a designated name in the **Properties** panel
- tooltip: add a property's Tooltip in the **Properties** panel

#### <a name="visible parameter"></a>visible parameter

By default, whether a property displays in **Properties** panel depends on whether its name begins with an underline `_`. If beginning with an underline, the property will not display in **Properties** panel by default, otherwise it will display by default.

If developers want to compulsorily display the property in **Properties** panel, they can set the `visible` parameter as true:

```js
    properties {
        _id: {      // The property whose name begins with an underline is invisible by default
            default: 0,
            visible: true
        }
    }
```

If developers want to compulsorily hide the property in **Properties** panel, they can set the `visible` parameter as false:

```js
    properties {
        id: {       // The property whose name doesn't begin with an underline is visible by default
            default: 0,
            visible: false
        }
    }
```

#### <a name="serializable"></a>serializable parameter

By default, properties will be serialized. If developers don't want them to be serialized, they can set up `serializable: false`.

```js
    temp_url: {
        default: '',
        serializable: false
    }
```

#### <a name="type"></a>type parameter

When `default` can't provide class information that is detailed enough, then to correctly edit properties in **Properties** panel, developers need to use `type` to visibly declare a concrete class:

- When the default value is null, set the type as the construct function of the designated class, then you can correctly assign a value to the properties in **Properties** panel.
    ```js
        enemy: {
            default: null,
            type: cc.Node
        }
    ```
- When the default value is the Number class, set type as `"Integer"` to indicate this is a whole number, then the property can't input decimal points into **Properties** panel.
    ```js
        score: {
            default: 0,
            type: 'Integer'
        }
    ```
- Set the type as the enumerating class, then you can choose an enumerating value in **Properties** panel.
    ```js
        wrap: {
            default: cc.Texture2D.WrapMode.Clamp,
            type: cc.Texture2D.WrapMode
        }
    ```

#### <a name="url"></a>url parameter

If the property is a URL that is used to save resources, then to be able to set up resources in **Properties** panel or correctly serialize code, developers need to provide correct URL parameters.
```js
    texture: {
        default: "",
        url: cc.Texture2D
    },
```

### Digit group definition

Digit group's default should be set as `[]`. If you want to edit it in **Properties** panel, you also need to set the type as construct function, enumeration, or `"Integer"`, `"Float"`, `"Boolean"`, `"String"`.
```js
    nameList: {
        default: [],
        type: ["String"]     // Each element of the declaring digit group is string type
    },
    enemyList: {
        default: [],
        type: [cc.Node]
    }
```

**Remark**

- All the properties can be inherited by the child class. But the properties of the child class and parent class can't share names.
- If the default value of the property can only be obtained by invoking other methods, developers can re-assign values in the construct function.

    ```js
    var Sprite = cc.Class({
        ctor: function () {
            this.img = LoadImage();
        },
        properties: {
            img: null
        }
    });
    ```

## GetSet method

After setting up get or set in properties, when visiting properties, the pre-set get or set method will be triggered.

### get

Setting up the get method in properties:

```js
    properties: {
        width: {
            get: function () {
                return this.__width;
            }
        }
    }
```

The get method can return values of any type. 
This property can also display in **Properties** panel, which can be directly visited in all the code that includes the construct function.

```js
    var Sprite = cc.Class({
        ctor: function () {
            this.__width = 128;
            console.log(this.width);    // 128
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

Attention:

- After setting up get, this property can't be serialized or designated a default value, but developers can still attach any parameter other than "default" or "serializable".

    ```js
        width: {
            get: function () {
                return this.__width;
            },
            type: 'Integer',
            tooltip: "The width of sprite"
        }
    ```

- The get property itself is read-only, but the returned object is not read-only. Users still can use code to modify properties inside the object, for example:

    ```js
    var Sprite = cc.Class({
        ...
        position: {
            get: function () {
                return this.__position;
            },
        }
        ...
    });
    var obj = new Sprite();
    obj.position = new cc.Vec2(10, 20);   // Wrong! Position is read-only!
    obj.position.x = 100;                 // YesI! The position object itself can be modified!
    ```

### set

Set up the set method in properties:

```js
    width: {
        set: function (value) {
            this.__width = value;
        }
    }
```

The set method receives an importing parameter, which can be of any type.

Set can be used together with get:

```js
    width: {
        get: function () {
            return this.__width;
        },
        set: function (value) {
            this.__width = value;
        },
        type: 'Integer',
        tooltip: "The width of sprite"
    }
```

Attention:
- If not defined together with get, set doesn't have any parameter attached to it.
- Just like get, after setting up set, this property can't be serialized or designated a default value.
