# CCClass

将装饰器 [ccclass](#ccclass) 应用在类上时，此类称为 cc 类。<br>
cc 类注入了额外的信息以控制 Cocos Creator 3.0 对该类对象的序列化、编辑器对该类对象的展示等。

## ccclass

cc 类的各种特性是通过 `ccclass(name)` 的 cc 类选项参数来指定的。

### 类名

选项 `name` 指定了 cc 类的名称，cc 类名应该是 **独一无二** 的。

当需要相应的 cc 类时，可以通过其 cc 类名来查找，例如：

- 序列化。若对象是 cc 类对象，则在序列化时将记录该对象的 cc 类名，反序列化时将根据此名称找到相应的 cc 类进行序列化。

- 当 cc 类是组件类时，`Node` 通过可以组件类的 cc 类名查找该组件。

## cc 属性

当装饰器 [property](#property) 应用在 cc 类的属性或访问器上时，此属性称为 cc 属性。

与 cc 类类似，cc 属性注入了额外的信息以控制 Cocos Creator 3.0 对该属性的序列化、编辑器对该属性的展示等。

### property

cc 属性的各种特性是通过 `property()` 的 cc 属性选项参数来指定的。

### type

选项 `type` 指定了属性的 cc 类型。可以通过以下几种形式的参数指定类型：

- 构造函数

  构造函数所指定的类型就直接作为属性的 cc 类型。<br>
  **注意**：当 Javascript 内置构造函数 `Number`、`String`、`Boolean` 用作 cc 类型时将给出警告，并且将分别视为 cc 类型中的 `CCFloat`、`CCString`、`CCBoolean`。

- Cocos Creator 3.0 内置属性类型标识

  `CCInteger`、`CCFloat`、`CCBoolean`、`CCString` 是内置属性类型标识。
  - `CCInteger` 声明类型为 **整数**；
  - `CCFloat` 声明类型为 **浮点数**；
  - `CCString` 声明类型为 **字符串**；
  - `CCBoolean` 声明类型为 **布尔值**。

- 数组

  当构造函数、内置属性类型标识或者数组作为数组元素时，属性会被指定为 **Cocos Creator 3.0 数组**。例如 `[CCInteger]` 将以整数数组的形式展示该属性。

若属性未指定 cc 类型，Cocos Creator 3.0 将从属性的默认值或初始化式的求值结果推导其 cc 类型：

- 若值的类型是 Javascript 原始类型 `number`、`string`、`boolean`，则其 cc 类型分别为 Creator 的浮点数、字符串，以及布尔值。
- 若值的类型是对象类型，则相当于使用对象的构造函数指定了 cc 类型。
- 其他的则表示属性的 cc 类型是 **未定义** 的。

一般只有在以下情况时才需要显式地声明 cc 类型：

- 当需要将属性显示为整数时；
- 当属性的实际值可能是多个类型时。

关于 cc 类型如何影响 cc 属性以及对未定义 cc 类型的属性的处理，可参考下文中的 [属性类型](#%E5%B1%9E%E6%80%A7%E5%8F%82%E6%95%B0) 和 [序列化参数](#serializable%E5%8F%82%E6%95%B0) 介绍。

为了方便，额外提供了以下装饰器以快速声明 cc 类型：

|  装饰器	| 对应的 cc 类型 	|
| :-------- | :---------------- |
| @type(t) 	| @property(t) 	|
| @integer 	| @property(CCInteger) 	|
| @float 	| @property(CCFloat) 	|
| @string 	| @property(CCString) 	|
| @boolean 	| @property(CCBoolean) 	|

下列代码演示了不同 cc 类型的 cc 属性声明：

```ts
import { _decorator, CCInteger, Node } from "cc";
const { ccclass, property, integer, float, boolean, string, type } = _decorator;
@ccclass
class MyClass {
    @integer // 声明属性 _id 的 cc 类型为 Cocos 整数
    private _id = 0;

    @type(Node) // 声明属性 _targetNode 的 cc 类型为 Node
    private _targetNode: Node | null = null;

    @type([Node]) // 声明属性 _children 的 cc 类型为 Node 数组
    private _children: Node[] = [];

    @property
    private _count = 0; // 未声明 cc 类型，从初始化式的求值结果推断为 Cocos 浮点数

    @type(String) // 警告：不应该使用构造函数 String
                      // 等价于 CCString
    private _name: string = '';

    @property
    private _children2 = []; // 未声明 cc 类型，从初始化式的求值结果推断元素为未定义的 Cocos 数组
}
```

### 默认值

选项 `default` 指定了 cc 属性的默认值。详情可参考下方的 [default 参数](#default%E5%8F%82%E6%95%B0) 介绍。

### 构造函数

#### 通过 constructor 定义

CCClass 的构造函数使用 `constructor` 定义，为了保证反序列化始终能正确运行，`constructor` **不允许** 定义 **构造参数**。

> 开发者如果确实需要使用构造参数，可以通过 `arguments` 获取，但要记得如果这个类会被序列化，必须保证构造参数都缺失的情况下仍然能 new 出对象。

## 判断类型

### 判断实例

需要做类型判断时，可以用 TypeScript 原生的 `instanceof`：

```typescript
class Sub extends Base {

}

let sub = new Sub();
console.log(sub instanceof Sub);  //true
console.log(sub instanceof Base);  //true

let base = new Base();
console.log(base instanceof Sub);  // false
```

## 成员

### 其他实例变量

在构造函数中定义的实例变量不能被序列化，也不能在 **属性检查器** 中查看。

```typescript
class Sprite {
    //声明变量
    url: string;
    id: number;
    constructor() {
        //赋值
        this.url = "";
        this.id = 0;
    }
}
```

> 如果是私有的变量，建议在变量名前面添加下划线 `_` 以示区分。

### 实例方法

实例方法请在原型对象中声明：

```typescript
class Sprite {
    text: string;
    constructor() {
        this.text = "this is sprite"
    }
    // 声明一个名叫 "print" 的实例方法
    print() {
        console.log(this.text);
    }
}

let obj = new Sprite();
// 调用实例方法
obj.print();
```

### 静态变量和静态方法

静态变量或静态方法可以用 `statics` 声明：

```typescript
class Sprite {
    static count = 0;
    static getBounds() {

    }
}
```

静态成员会被子类继承，继承时 Creator 会将父类的静态变量 **浅拷贝** 给子类，因此：

```typescript
class Object {
    static count = 11;
    static range: { w: 100, h: 100 }
}

class Sprite extends Object {

}

console.log(Sprite.count);    // 结果是 11，因为 count 继承自 Object 类

Sprite.range.w = 200;
console.log(Object.range.w);  // 结果是 200，因为 Sprite.range 和 Object.range 指向同一个对象
```

如果不需要考虑继承，私有的静态成员也可以直接定义在类的外面：

```typescript
// 局部方法
doLoad(sprite) {
    // ...
};
// 局部变量
let url = "foo.png";

class Sprite {
    load() {
        this.url = url;
        doLoad(this);
    };
};
```

## 继承

### 父构造函数

**注意**：不论子类是否有定义构造函数，在子类实例化前，父类的构造函数都会被自动调用。

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
        // 子构造函数被调用前，父构造函数已经被调用过，所以 this.name 已经被初始化过了
        console.log(this.name);    // "node"
        // 重新设置 this.name
        this.name = "sprite";
    }
}

let obj = new Sprite();
console.log(obj.name);    // "sprite"
```

### 重写

所有成员方法都是虚方法，子类方法可以直接重写父类方法：

```typescript
class Shape {
    getName() {
        return "shape";
    }
};

class Rect extends Shape{
    getName () {
        return "rect";
    }
};

let obj = new Rect();
console.log(obj.getName());    // "rect"
```

## 属性

属性是特殊的实例变量，可以显示在 **属性检查器** 中，也可以被序列化。

### 属性和构造函数

属性 **不用** 在构造函数中定义，在构造函数被调用前，属性已经被赋为默认值了，可以在构造函数内访问到。如果属性的默认值无法在定义 CCClass 时提供，只有在运行时才能获得，开发者也可以在构造函数中重新给属性赋一个 **默认** 值。

```typescript
class Sprite {
    constructor() {
        this.num = 1;
    }

    @property({ type: CCInteger })
    private num = 0;
}
```

不过需要注意的是，属性被反序列化的过程紧接着发生在构造函数执行 **之后**，因此构造函数中只能获得属性反序列化之前的默认值，无法获得属性反序列化之后的值。

### 属性参数

#### default 参数

`default` 用于声明属性的默认值，声明了默认值的属性会被 CCClass 实现为成员变量。默认值只有在 **第一次** 创建对象的时候才会使用，也就是说修改属性默认值并不会改变已经添加到场景中的组件属性的当前值。

> 当开发者在 **属性检查器** 中添加了一个组件，然后再回到脚本中修改属性默认值的话，**属性检查器** 中组件的属性值是不会发生变化的，因为组件中属性的当前值已经序列化到场景中，不再是第一次创建时用的默认值了。如果要强制把组件的所有属性设回默认值，可以在 **属性检查器** 中组件右上方的设置按钮中选择 **Reset**。

`default` 允许设置为以下几种值类型：

1. 任意 `number`、`string` 或 `boolean` 类型的值
2. `null` 或 `undefined`
3. 继承自 `ValueType` 的子类，如 `Vec3`、`Color` 或 `Rect` 的实例化对象：

    ```typescript
    @property({ type: Vec3 })
    private pos = null;
    ```

4. 空数组 `[]` 或空对象 `{}`

#### visible 参数

一般情况下，属性是否显示在 **属性检查器** 中取决于属性名是否以下划线 `_` 开头。如果是以下划线开头，则不显示。

如果要强制显示在 **属性检查器** 中，可以设置 `visible` 参数为 true：

```typescript
@property({ visible: true })
private _num = 0;
```

如果要强制隐藏，可以设置 `visible` 参数为 false：

```typescript
@property({ visible: false })
private num = 0;
```

#### serializable 参数

指定了 `default` 默认值的属性，默认情况下都会被序列化，序列化后就会将编辑器中设置好的属性值保存到场景等资源文件中，之后在加载场景时就会自动还原成设置好的属性值。如果不想序列化，可以设置 `serializable: false`。

```typescript
@property({ serializable: false })
private num = 0;
```

#### type 参数

当 `default` 不能提供足够详细的类型信息时，为了能在 **属性检查器** 中显示正确的输入控件，就要用 `type` 显式声明具体的类型：

- 当默认值为 `null` 时，将 type 设置为指定类型的构造函数，这样 **属性检查器** 中显示的就是一个 Node 控件。

    ```typescript
    @property({ type: Node })
    private enemy = null;
    ```

- 当默认值为数值（`number`）类型时，将 type 设置为 `cc.Integer`，表示这是一个整数，这样在 **属性检查器** 中属性就不能输入小数点。

    ```typescript
    @property({ type: CCInteger })
    private num = 0;
    ```

- 当默认值是一个枚举（`Enum`）时，由于枚举值本身其实也是一个数字（number），所以要将 type 设置为枚举类型，这样属性在 **属性检查器** 中才能显示为下拉框。

    ```typescript
    enum A {
        c,
        d
    }
    Enum(A);
    @ccclass("test")
    export class test extends Component {
        @property({ type: A })
        accx : A = A.c;
    }
    ```

#### override 参数

所有属性都会被子类继承，如果子类要覆盖父类同名属性，需要显式设置 override 参数，否则会有重名警告：

```typescript
@property({ type: CCString, tooltip: "my id", override: true })
private _id = "";

@property({ displayName: "Name", override: true })
private _name = null;
private get name() {
    return this._name;
}
```

更多参数内容请查阅 [属性参数](./reference/attributes.md)。

## get/set 方法

如果在属性中定义了 get/set，那么在访问属性的时候，就能触发预定义的 get/set 方法。

### get

在属性中定义 get 方法：

```typescript
@property({ type: CCInteger })
private _num = 0;
private get num() {
    return this._num;
}
```

get 方法可以返回任意类型的值。<br>
定义了 get 方法的属性可以显示在 **属性检查器** 中，并且可以在包括构造函数在内的所有代码中直接访问。

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

**注意**：

- 属性在定义了 get 方法之后就不能被序列化，也不能指定默认值。也就是说 `default` 参数和 `serializable` 参数不可用。

    ```typescript
    @property({ type: CCInteger, tooltip: "The width of sprite" })
    private _width = 0;
    private get width() {
        return this._width;
    }
    ```

- 定义了 get 方法的属性本身是只读的，但返回的对象并不是只读的。开发者依然可以通过代码修改对象内部的属性，例如：

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

在属性中定义 set 方法：

```typescript
@property({ type: CCInteger })
private _width = 0;
set(value) {
    this._width = value
}
```

set 方法接收一个传入参数，这个参数可以是任意类型。set 方法一般和 get 方法一起使用：

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

**注意**：
1. 和 get 方法一样，属性在定义了 set 方法之后，`default` 参数和 `serializable` 参数不可用
2. 如果属性中的 set 方法没有和 get 方法一起定义，那么属性的任何参数都不可用
