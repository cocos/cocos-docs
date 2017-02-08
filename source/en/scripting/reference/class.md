# CCClass Advanced Reference

Compared to other JavaScript class implementations, the specialty of CCClass lies more within the metadata which has strong augmentability and can be plentifully defined. CCClass has a lot of details that you can get familiar developing games in Cocos Creator. This article will list these specifications. You should read [Declare class with cc.Class](../class.md) first if you haven't already.

## Glossary

 - CCClass: Class declared with `cc.Class`.
 - Prototype Object: the object literals passed in when declaring class with `cc.Class`
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

Class name can be any string, but should be identical. You can use  `cc.js.getClassByName` to lookup the corresponding class. For component defined in user scripts you can omit the class name since the editor will use filename for component script for serialization. For other CCClass if you don't need to serialize class you can omit the name.

### Constructor

#### Declare by `ctor`

Use `ctor` to declare constructor of CCClass, for deserialization to work, constructor of CCClass **does NOT allow** parameter.

> If developer absolutely needs to pass parameter, `arguments` can be used to capture parameters, but do make sure you can finish instance creation process event if no parameter is passed.

#### <a name="__ctor__"></a>Declare by `__ctor__`

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

The two parameters passed in should both be constructor function of the class instead of class instance. If two classes are the same,
`isChildClassOf` will also return true.

## Members

### Instance variable

The instance variable defined inside constructor cannot be serialized and not visible in **Properties** panel.

```javascript
var Sprite = cc.Class({
    ctor: function () {
        // Declare instance variable and assign default value.
        this.url = "";
        this.id = 0;
    }
});
```

> We recommend add `_` prefix to variable name for private members

### Static variable and static method

Static variables and static methods can be defined in `statics` property of prototype object.

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

cc.log(Sprite.count);   // 11, for count is inherited from Object class

Sprite.range.w = 200;
cc.log(Object.range.w);   // 200, for Sprite.range and Object.range references the same object.
```

If no inheritance is considered, private static member can also be defined outside of prototype object:

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

> In special cases, arguments of parent's constructor may not compatible with child's constructor. Then you have to call parent's constructor and pass the needed arguments into it manually. At this point you should declare the child's constructor in [`__ctor__`](#__ctor__).

### Overwrite

All member methods are virtual methods, so child class can overwrite parent method:

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

Different from constructor, overwritten method from parent class will not be called automatically, so you need to call explicitly if needed:

Method one: use `this._super` provided by CCClass:

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

Method two: use native JavaScript language feature:

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

> If the parent and child class are neither CCClass, you can use lower level API `cc.js.extend` to do inheritance.

## Property

Properties are special instance members that can be serialized and show in **Properties** panel.

### Property and constructor

No need to define property in constructor, the initialization of properties is even before the constructor is called. So you can use those properties in constructor function. If a default value of a property is not available in CCClass definition, you can also reassign default value in constructor.

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

不过要注意的是，属性被反序列化的过程紧接着发生在构造函数执行**之后**，因此构造函数中只能获得和修改属性的默认值，还无法获得和修改之前保存的值。

### 属性参数

所有属性参数都是可选的，但至少必须声明 `default`, `get`, `set` 参数中的其中一个。

#### <a name="default"></a>default 参数

`default` 用于声明属性的默认值，声明了默认值的属性会被 CCClass 实现为成员变量。默认值只有在**第一次创建**对象的时候才会用到，也就是说修改默认值时，并不会改变已添加到场景里的组件的当前值。

> 当你在编辑器中添加了一个组件以后，再回到脚本中修改一个默认值的话，**属性检查器** 里面是看不到变化的。因为属性的当前值已经序列化到了场景中，不再是第一次创建时用到的默认值了。如果要强制把所有属性设回默认值，可以在 **属性检查器** 的组件菜单中选择 Reset。

`default` 允许设置为以下几种值类型：

1. 任意 number, string 或 boolean 类型的值
2. `null` 或 `undefined`
3. 继承自 `cc.ValueType` 的子类，如 `cc.Vec2`, `cc.Color` 或 `cc.Rect` 的实例化对象：
    ```javascript
    properties: {
        pos: {
            default: new cc.Vec2(),
        }
    }
    ```
4. 空数组 `[]` 或空对象 `{}`
5. 一个允许返回任意类型值的 function，这个 function 会在每次实例化该类时重新调用，并且以返回值作为新的默认值：
    ```javascript
    properties: {
        pos: {
            default: function () {
                return [1, 2, 3];
            },
        }
    }
    ```

#### <a name="visible"></a>visible 参数

默认情况下，是否显示在 **属性检查器** 取决于属性名是否以下划线 `_` 开头。如果以下划线开头，则默认不显示在 **属性检查器**，否则默认显示。

如果要强制显示在 **属性检查器**，可以设置 `visible` 参数为 true:

```javascript
properties: {
    _id: {      // 下划线开头原本会隐藏
        default: 0,
        visible: true
    }
}
```

如果要强制隐藏，可以设置 `visible` 参数为 false:

```javascript
properties: {
    id: {       // 非下划线开头原本会显示
        default: 0,
        visible: false
    }
}
```

#### <a name="serializable"></a>serializable 参数

指定了 `default` 默认值的属性默认情况下都会被序列化，如果不想序列化，可以设置`serializable: false`。

```javascript
temp_url: {
    default: "",
    serializable: false
}
```

#### <a name="type"></a>type 参数

当 `default` 不能提供足够详细的类型信息时，为了能在 **属性检查器** 显示正确的输入控件，就要用 `type` 显式声明具体的类型：

- 当默认值为 null 时，将 type 设置为指定类型的构造函数，这样 **属性检查器** 才知道应该显示一个 Node 控件。

    ```javascript
    enemy: {
        default: null,
        type: cc.Node
    }
    ```

- 当默认值为数值（number）类型时，将 type 设置为 `cc.Integer`，用来表示这是一个整数，这样属性在 **属性检查器** 里就不能输入小数点。

    ```javascript
    score: {
        default: 0,
        type: cc.Integer
    }
    ```

- 当默认值是一个枚举（cc.Enum）时，由于枚举值本身其实也是一个数字（number），所以要将 type 设置为枚举类型，才能在 **属性检查器** 中显示为枚举下拉框。

    ```javascript
    wrap: {
        default: Texture.WrapMode.Clamp,
        type: Texture.WrapMode
    }
    ```

#### <a name="url"></a>url 参数

如果属性是用来访问 Raw Asset 资源的 url，为了能在 **属性检查器** 中选取资源，或者能正确序列化，你需要指定 `url` 参数：

```javascript
texture: {
    default: "",
    url: cc.Texture2D
},
```

可参考 [获取和加载资源: Raw Asset](../load-assets.md#raw-asset)

#### <a name="override"></a>override 参数

所有属性都将被子类继承，如果子类要覆盖父类同名属性，需要显式设置 override 参数，否则会有重名警告：

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

更多参数内容请查阅 [属性参数](attributes.md)。

### 属性延迟定义

如果两个类相互引用，脚本加载阶段就会出现循环引用，循环引用将导致脚本加载出错：

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

上面两个脚本加载时，由于它们在 require 的过程中形成了闭环，因此加载会出现循环引用的错误，循环引用时 type 就会变为 undefined。
因此我们提倡使用以下的属性定义方式：

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

这种方式就是将 properties 指定为一个 ES6 的箭头函数（lambda 表达式），箭头函数的内容在脚本加载过程中并不会同步执行，而是会被 CCClass 以异步的形式在所有脚本加载成功后才调用。因此加载过程中并不会出现循环引用，属性都可以正常初始化。

> 箭头函数的用法符合 JavaScript 的 ES6 标准，并且 Creator 会自动将 ES6 转义为 ES5，用户不用担心浏览器的兼容问题。

你可以这样来理解箭头函数：

```

// 箭头函数支持省略掉 `return` 语句，我们推荐的是这种省略后的写法：

properties: () => ({    // <- 箭头右边的括号 "(" 不可省略
    game: {
        default: null,
        type: require("Game")
    }
})

// 如果要完整写出 `return`，那么上面的写法等价于：

properties: () => {
    return {
        game: {
            default: null,
            type: require("Game")
        }
    };      // <- 这里 return 的内容，就是原先箭头右边括号里的部分
}

// 我们也可以不用箭头函数，而是用普通的匿名函数：

properties: function () {
    return {
        game: {
            default: null,
            type: require("Game")
        }
    };
}
```

## GetSet 方法

在属性中设置了 get 或 set 以后，访问属性的时候，就能触发预定义的 get 或 set 方法。

### get

在属性中设置 get 方法：

```javascript
properties: {
    width: {
        get: function () {
            return this.__width;
        }
    }
}
```

get 方法可以返回任意类型的值。
这个属性同样能显示在 **属性检查器** 中，并且可以在包括构造函数内的所有代码里直接访问。

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

请注意：

- 设定了 get 以后，这个属性就不能被序列化，也不能指定默认值，但仍然可附带除了 `default`, `serializable` 外的大部分参数。

    ```javascript
    width: {
        get: function () {
            return this.__width;
        },
        type: cc.Integer,
        tooltip: "The width of sprite"
    }
    ```

- get 属性本身是只读的，但返回的对象并不是只读的。用户使用代码依然可以修改对象内部的属性，例如：

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
    obj.position = new cc.Vec2(10, 20);   // 失败！position 是只读的！
    obj.position.x = 100;                 // 允许！position 返回的 _position 对象本身可以修改！
    ```

### set

在属性中设置 set 方法：

```javascript
width: {
    set: function (value) {
        this._width = value;
    }
}
```

set 方法接收一个传入参数，这个参数可以是任意类型。

set 一般和 get 一起使用：

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
    
> 如果没有和 get 一起定义，则 set 自身不能附带任何参数。
> 和 get 一样，设定了 set 以后，这个属性就不能被序列化，也不能指定默认值。

## editor 参数

`editor` 只能定义在 cc.Component 的子类。

```javascript
cc.Class({
  extends: cc.Component,
    
  editor: {
                 
    // requireComponent 参数用来指定当前组件的依赖组件。
    // 当组件添加到节点上时，如果依赖的组件不存在，引擎将会自动将依赖组件添加到同一个节点，防止脚本出错。
    // 该选项在运行时同样有效。
    // 
    // 值类型：Function （必须是继承自 cc.Component 的构造函数，如 cc.Sprite）
    // 默认值：null
    requireComponent: null,
    
    // 当本组件添加到节点上后，禁止 disallowMultiple 所指定类型（极其子类）的组件再添加到同一个节点，
    // 防止逻辑发生冲突。
    // 
    // 值类型：Function （必须是继承自 cc.Component 的构造函数，如 cc.Sprite）
    // 默认值：null
    disallowMultiple: null,
    
    // menu 用来将当前组件添加到组件菜单中，方便用户查找。
    // 
    // 值类型：String （如 "Rendering/Camera"）
    // 默认值：""
    menu: "",
    
    // 允许当前组件在编辑器模式下运行。
    // 默认情况下，所有组件都只会在运行时执行，也就是说它们的生命周期回调在编辑器模式下并不会触发。
    // 
    // 值类型：Boolean
    // 默认值：false
    executeInEditMode: false,
    
    // 当设置了 "executeInEditMode" 以后，playOnFocus 可以用来设定选中当前组件所在的节点时，
    // 编辑器的场景刷新频率。
    // playOnFocus 如果设置为 true，场景渲染将保持 60 FPS，如果为 false，场景就只会在必要的时候进行重绘。
    // 
    // 值类型：Boolean
    // 默认值：false
    playOnFocus: false,
    
    // 自定义当前组件在 **属性检查器** 中渲染时所用的网页 url。
    // 
    // 值类型：String
    // 默认值：""
    inspector: "",
    
    // 自定义当前组件在编辑器中显示的图标 url。
    // 
    // 值类型：String
    // 默认值：""
    icon: "",
    
    // 指定当前组件的帮助文档的 url，设置过后，在 **属性检查器** 中就会出现一个帮助图标，
    // 用户点击将打开指定的网页。
    // 
    // 值类型：String
    // 默认值：""
    help: "",
  }
});
```
