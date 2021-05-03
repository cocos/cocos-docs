# CCClass 进阶参考

相比其它 JavaScript 的类型系统，CCClass 的特别之处在于功能强大，能够灵活的定义丰富的元数据。CCClass 的技术细节比较丰富，你可以在开发过程中慢慢熟悉。本文档将列举它的详细用法，阅读前需要先掌握 [使用 cc.Class 声明类型](../class.md)。

## 术语

- CCClass：使用 `cc.Class` 声明的类。
- 原型对象：调用 `cc.Class` 时传入的字面量参数。
- 实例成员：包含 **成员变量** 和 **成员方法**。
- 静态成员：包含 **静态变量** 和 **类方法**。
- 运行时：项目脱离编辑器独立运行时，或者在模拟器和浏览器里预览的时候。
- 序列化：解析内存中的对象，将它的信息编码为一个特殊的字符串，以便保存到硬盘上或传输到其它地方。

## 原型对象参数说明

所有原型对象的参数都可以省略，用户只需要声明用得到的部分即可。

```javascript
cc.Class({

    // 类名，用于序列化
    // 值类型：String
    name: "Character",
    
    // 基类，可以是任意创建好的 cc.Class
    // 值类型：Function
    extends: cc.Component,
    
    // 构造函数
    // 值类型：Function
    ctor: function () {},
    
    // 属性定义（方式一，直接定义）
    properties: {
        text: ""
    },
    
    // 属性定义（方式二，使用 ES6 的箭头函数，详见下文）
    properties: () => ({
        text: ""
    }),

    // 实例方法
    print: function () {
        cc.log(this.text);
    },

    // 静态成员定义
    // 值类型：Object
    statics: {
        _count: 0,
        getCount: function () {}
    },
    
    // 提供给 Component 的子类专用的参数字段
    // 值类型：Object
    editor: {
        disallowMultiple: true
    }
});
```

### 类名

类名可以是任意字符串，但不允许重复。可以使用 `cc.js.getClassName` 来获得类名，使用 `cc.js.getClassByName` 来查找对应的类。对在项目脚本里定义的组件来说，序列化其实并不使用类名，因此那些组件不需要指定类名。对其他类来说，类名用于序列化，如果不需要序列化，类名可以省略。

### 构造函数

#### 通过 ctor 定义

CCClass 的构造函数使用 `ctor` 定义，为了保证反序列化能始终正确运行，`ctor` **不允许** 定义 **构造参数**。

> 开发者如果确实需要使用构造参数，可以通过 `arguments` 获取，但要记得如果这个类会被序列化，必须保证构造参数都缺省的情况下仍然能 new 出对象。

#### <a name="__ctor__"></a>通过 `__ctor__` 定义

`__ctor__` 和 `ctor` 一样，但是允许定义构造参数，并且不会自动调用父构造函数，因此用户可以自行调用父构造函数。`__ctor__` 不是标准的构造函数定义方式，如果没有特殊需要请一律使用 `ctor` 定义。

## 判断类型

### 判断实例

需要做类型判断时，可以用 JavaScript 原生的 `instanceof`：

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

### 判断类

使用 `cc.isChildClassOf` 来判断两个类的继承关系：

```javascript
var Texture = cc.Class();
var Texture2D = cc.Class({
    extends: Texture
});

cc.log(cc.isChildClassOf(Texture2D, Texture));   // true
```

两个传入参数都必须是类的构造函数，而不是类的对象实例。如果传入的两个类相等，`isChildClassOf` 同样会返回 true。

## 成员

### 实例变量

在构造函数中定义的实例变量不能被序列化，也不能在 **属性检查器** 中查看。

```javascript
var Sprite = cc.Class({
    ctor: function () {
        // 声明实例变量并赋默认值
        this.url = "";
        this.id = 0;
    }
});
```

> 如果是私有的变量，建议在变量名前面添加下划线 `_` 以示区分。

### 实例方法

实例方法请在原型对象中声明：

```javascript
var Sprite = cc.Class({
    ctor: function () {
        this.text = "this is sprite";
    },

    // 声明一个名叫 "print" 的实例方法
    print: function () {
        cc.log(this.text);
    }
});

var obj = new Sprite();
// 调用实例方法
obj.print();
```

### 静态变量和静态方法

静态变量或静态方法可以在原型对象的 `statics` 中声明：

```javascript
var Sprite = cc.Class({
    statics: {
        // 声明静态变量
        count: 0,
        // 声明静态方法
        getBounds: function (spriteList) {
            // ...
        }
    }
});
```

上面的代码等价于：

```javascript
var Sprite = cc.Class({ ... });

// 声明静态变量
Sprite.count = 0;
// 声明静态方法
Sprite.getBounds = function (spriteList) {
    // ...
};
```

静态成员会被子类继承，继承时会将父类的静态变量 **浅拷贝** 给子类，因此：

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

cc.log(Sprite.count);    // 结果是 11，因为 count 继承自 Object 类

Sprite.range.w = 200;
cc.log(Object.range.w);  // 结果是 200，因为 Sprite.range 和 Object.range 指向同一个对象
```

如果你不需要考虑继承，私有的静态成员也可以直接定义在类的外面：

```javascript
// 局部方法
function doLoad (sprite) {
    // ...
};
// 局部变量
var url = "foo.png";

var Sprite = cc.Class({
    load: function () {
        this.url = url;
        doLoad(this);
    };
});
```

## 继承

### 父构造函数

请注意，不论子类是否有定义构造函数，子类实例化前父类的构造函数都会被自动调用。

```javascript
var Node = cc.Class({
    ctor: function () {
        this.name = "node";
    }
});

var Sprite = cc.Class({
    extends: Node,
    ctor: function () {
        // 子构造函数被调用前，父构造函数已经被调用过，所以 this.name 已经被初始化过了
        cc.log(this.name);    // "node"
        // 重新设置 this.name
        this.name = "sprite";
    }
});

var obj = new Sprite();
cc.log(obj.name);    // "sprite"
```

因此你不需要尝试调用父类的构造函数，否则父构造函数就会重复调用。

```javascript
var Node = cc.Class({
    ctor: function () {
        this.name = "node";
    }
});

var Sprite = cc.Class({
    extends: Node,
    ctor: function () {
        Node.call(this);        // 别这么干！
        this._super();          // 也别这么干！
        
        this.name = "sprite";
    }
});
```

> 在一些很特殊的情况下，父构造函数接受的参数可能和子构造函数无法兼容。这时开发者就只能自己手动调用父构造函数并且传入需要的参数，这时应该将构造函数定义在 [`__ctor__`](#__ctor__) 中。

### 重写

所有成员方法都是虚方法，子类方法可以直接重写父类方法：

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

和构造函数不同的是，父类被重写的方法并不会被 CCClass 自动调用，如果你要调用的话：

- 方法一：使用 CCClass 封装的 `this._super`

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

- 方法二：使用 JavaScript 原生写法

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

如果你想实现继承的父类和子类都不是 CCClass，只是原生的 JavaScript 构造函数，你可以用更底层的 API `cc.js.extend` 来实现继承。

## 属性

属性是特殊的实例变量，能够显示在 **属性检查器** 中，也能被序列化。

### 属性和构造函数

属性 **不用** 在构造函数里定义，在构造函数被调用前，属性已经被赋为默认值了，可以在构造函数内访问到。如果属性的默认值无法在定义 CCClass 时提供，需要在运行时才能获得，你也可以在构造函数中重新给属性赋 **默认** 值。

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

不过要注意的是，属性被反序列化的过程紧接着发生在构造函数执行 **之后**，因此构造函数中只能获得和修改属性的默认值，还无法获得和修改之前保存（序列化）的值。

### 属性参数

所有属性参数都是可选的，但至少必须声明 `default`、`get`、`set` 参数中的其中一个。

#### default 参数

`default` 用于声明属性的默认值，声明了默认值的属性会被 CCClass 实现为成员变量。默认值只有在 **第一次创建** 对象的时候才会用到，也就是说修改默认值时，并不会改变已添加到场景里的组件的当前值。

> 当你在编辑器中添加了一个组件以后，再回到脚本中修改一个默认值的话，**属性检查器** 里面是看不到变化的。因为属性的当前值已经序列化到了场景中，不再是第一次创建时用到的默认值了。如果要强制把所有属性设回默认值，可以在 **属性检查器** 的组件菜单中选择 Reset。

`default` 允许设置为以下几种值类型：

- 任意 number, string 或 boolean 类型的值
- `null` 或 `undefined`
- 继承自 `cc.ValueType` 的子类，如 `cc.Vec2`, `cc.Color` 或 `cc.Rect` 的实例化对象：

    ```javascript
    properties: {
        pos: {
            default: new cc.Vec2(),
        }
    }
    ```

- 空数组 `[]` 或空对象 `{}`
- 一个允许返回任意类型值的 function，这个 function 会在每次实例化该类时重新调用，并且以返回值作为新的默认值：

    ```javascript
    properties: {
        pos: {
            default: function () {
                return [1, 2, 3];
            },
        }
    }
    ```

#### visible 参数

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

#### serializable 参数

指定了 `default` 默认值的属性默认情况下都会被序列化，序列化后就会将编辑器中设置好的值保存到场景等资源文件中，并且在加载场景时自动还原之前设置好的值。如果不想序列化，可以设置 `serializable: false`。

```javascript
temp_url: {
    default: "",
    serializable: false
}
```

#### type 参数

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

- 当默认值是一个枚举（`cc.Enum`）时，由于枚举值本身其实也是一个数字（number），所以要将 type 设置为枚举类型，才能在 **属性检查器** 中显示为枚举下拉框。

    ```javascript
    wrap: {
        default: Texture.WrapMode.Clamp,
        type: Texture.WrapMode
    }
    ```

#### override 参数

所有属性都将被子类继承，如果子类要覆盖父类同名属性，需要显式设置 `override` 参数，否则会有重名警告：

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

```js
// 箭头函数支持省略掉 return 语句，我们推荐的是这种省略后的写法：

properties: () => ({    // <- 箭头右边的括号 "(" 不可省略
    game: {
        default: null,
        type: require("Game")
    }
})

// 如果要完整写出 return，那么上面的写法等价于：

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

get 方法可以返回任意类型的值。<br>
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

**注意**：

1. 设定了 get 以后，这个属性就不能被序列化，也不能指定默认值，但仍然可附带除了 `default`、`serializable` 外的大部分参数。

    ```javascript
    width: {
        get: function () {
            return this.__width;
        },

        type: cc.Integer,
        tooltip: "The width of sprite"
    }
    ```

2. get 属性本身是只读的，但返回的对象并不是只读的。用户使用代码依然可以修改对象内部的属性，例如：

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

> 如果没有和 get 一起定义，则 set 自身不能附带任何参数。<br>
> 和 get 一样，设定了 set 以后，这个属性就不能被序列化，也不能指定默认值。

使用 get/set 可以更好地封装接口，更多使用案例可参考社区教程 [CocosCreator 开发中为什么 get/set 如此重要？](https://mp.weixin.qq.com/s/gS6BTdBLTLzAtIUlHbBjtA)。

## editor 参数

`editor` 只能定义在 `cc.Component` 的子类。

```javascript
cc.Class({
  extends: cc.Component,
    
  editor: {

    // 允许当前组件在编辑器模式下运行。
    // 默认情况下，所有组件都只会在运行时执行，也就是说它们的生命周期回调在编辑器模式下并不会触发。
    //
    // 值类型：Boolean
    // 默认值：false
    executeInEditMode: false,
                 
    // requireComponent 参数用来指定当前组件的依赖组件。
    // 当组件添加到节点上时，如果依赖的组件不存在，引擎将会自动将依赖组件添加到同一个节点，防止脚本出错。
    // 该选项在运行时同样有效。
    // 
    // 值类型：Function（必须是继承自 cc.Component 的构造函数，如 cc.Sprite）
    // 默认值：null
    requireComponent: null,

    // 脚本生命周期回调的执行优先级。
    // 小于 0 的脚本将优先执行，大于 0 的脚本将最后执行。
    // 该优先级只对 onLoad, onEnable, start, update 和 lateUpdate 有效，对 onDisable 和 onDestroy 无效。
    //
    // 值类型：Number
    // 默认值：0
    executionOrder: 0,
    
    // 当本组件添加到节点上后，禁止同类型（含子类）的组件再添加到同一个节点，
    // 防止逻辑发生冲突。
    // 
    // 值类型：Boolean
    // 默认值：false
    disallowMultiple: false,
    
    // menu 用来将当前组件添加到组件菜单中，方便用户查找。
    // 
    // 值类型：String（如 "Rendering/Camera"）
    // 默认值：""
    menu: "",
    
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
