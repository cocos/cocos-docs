# 脚本进阶

在阅读到此章节时，默认您已经对脚本系统较为熟悉，包括装饰器等。否则，请参阅：

- [脚本基础](./modules/index.md)
- [装饰器](./decorator.md)

## 实例化

通过脚本定义一个 Foo 类和 Bar 类，Foo 类需要使用 Bar 类定义的属性，此时可以在 Foo 类中将 Bar 类直接 new 出一个对象：

```ts
class Foo {
    public bar: Bar = null;;
    constructor() {
        this.bar = new Bar();
    }
}
let bar = new Foo();
```

### 实例方法

实例方法请在原型对象中声明：

```typescript
class Foo {
    public text!: string;
    constructor() {
        this.text = "this is sprite"
    }
    // 声明一个名叫 "print" 的实例方法
    print() {
        console.log(this.text);
    }
}

let obj = new Foo();
// 调用实例方法
obj.print();
```

## 判断类型

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

### 静态变量和静态方法

静态变量或静态方法可以用 `static` 声明：

```typescript
class Foo {
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

class Foo extends Object {

}

console.log(Foo.count);    // 结果是 11，因为 count 继承自 Object 类

Foo.range.w = 200;
console.log(Object.range.w);  // 结果是 200，因为 Foo.range 和 Object.range 指向同一个对象
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
    public url = '';
    load() {
        this.url = url;
        doLoad(this);
    };
};
```

## 继承

### 父构造函数

> **注意**：不论子类是否有定义构造函数，在子类实例化前，父类的构造函数都会被自动调用。

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
        console.log(this.name); // "node"
        // 重新设置 this.name
        this.name = "sprite";
    }
}

let obj = new Sprite();
console.log(obj.name); // "sprite"
```

### 重写

所有成员方法都是虚方法，子类方法可以直接重写父类方法：

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

## get/set 方法

如果在属性中定义了 get/set，那么在访问属性的时候，就能触发预定义的 get/set 方法。

### get

在属性中定义 get 方法：

```typescript
@property
get num() {
    return this._num;
}

@property
private _num = 0;
```

get 方法可以返回任意类型的值。<br>
定义了 get 方法的属性可以显示在 **属性检查器** 中，可以在代码中直接访问。

```typescript
class Sprite {
   
    @property
    get width() {
        return this._width;
    }

    @property
    private _width = 0;

    print(){
        console.log(this.width);
    }
};
```

**注意**：

- 属性定义了 `get` 方法之后就不能被序列化，也就是 `serializable` 参数不可用。例如下面的写法，`width` 属性既不会在编辑器上显示，也不会序列化。

    ```typescript
    get width() {
        return this._width;
    }

    @property({ type: CCInteger, tooltip: "The width of sprite" })
    private _width = 0;
    ```

- 定义了 `get` 方法的属性如果需要在编辑器中显示，需要定义 `property`。例如下面的写法，`width` 属性如果去掉 `@property` 就不会在编辑器上呈现，`_width` 属性会序列化。

    ```typescript
    @property
    get width() {
        return this._width;
    }

    @property({ type: CCInteger, tooltip: "The width of sprite" })
    private _width = 0;
    ```

- 定义了 get 方法的属性本身是只读的，但返回的对象并不是只读的。开发者依然可以通过代码修改对象内部的属性，例如：

    ```typescript
    get num() {
        return this._num;
    }

    @property
    private _num = 0;

    start() {
        console.log(this.num);
    }
    ```

### set

在属性中定义 set 方法：

```typescript

set width(value) {
    this._width = value
}

private _width = 0;

start() {
    this.width = 20;
    console.log(this.width);
}
```

set 方法接收一个传入参数，这个参数可以是任意类型。set 方法一般和 get 方法一起使用：

```typescript
@property
get width() {
    return this._width;
}

set width(value) {
    this._width = value;
}

@property
private _width = 0;
```

> **注意**：set 方法不定义属性。
