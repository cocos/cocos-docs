# Advanced Scripting

By starting this **Advanced Scripting** section it is assumed one is already familiar with the scripting system, including decorators and so on. Otherwise, please refer to the following documents to get up to speed first:

- [Basic Scripting](./modules/index.md)
- [Decorator](./decorator.md)

## Instantiation

Define a `Foo` class and a `Bar` class through a script. The `Foo` class needs to use the properties defined by the `Bar` class, to allow directly issuing `new` the `Bar` class to an object in the `Foo` class.

```ts
class Foo {
    public bar: Bar = null;;
    constructor() {
        this.bar = new Bar();
    }
}
let bar = new Foo();
```

### Instance Methods

Instance methods should be declared in the prototype object at:

```typescript
class Foo {
    public text!: string;
    constructor() {
        this.text = "this is sprite"
    }
    // Declare an instance method named "print"
    print() {
        console.log(this.text);
    }
}

let obj = new Foo();
// Call the instance method
obj.print();
```

## Type Determination

When making a type determination, use TypeScript's native `instanceof()`.

```typescript
class Sub extends Base {

}

let sub = new Sub();
console.log(sub instanceof Sub); //true
console.log(sub instanceof Base); //true

let base = new Base();
console.log(base instanceof Sub); // false
```

### Static Variables and Static Methods

Static variables or static methods can be declared with `static`:

```typescript
class Foo {
    static count = 0;
    static getBounds() {

    }
}
```

Static members are inherited by subclasses, and on inheritance the Creator gives a **shallow copy** of the parent's static variables to the subclass, so that:

```typescript
class Object {
    static count = 11;
    static range: { w: 100, h: 100 }
}

class Foo extends Object {

}

console.log(Foo.count); // The result is 11, because `count` inherits from the `Object` class

Foo.range.w = 200;
console.log(Object.range.w); // The result is 200 because `Sprite.range` and `Object.range` refer to the same object
```

Private static members can also be defined directly outside of the class if inheritance is not a concern:

```typescript
// Local methods
doLoad(sprite) {
    // ...
};
// Local variables
let url = "foo.png";

class Sprite {
    public url = '';
    load() {
        this.url = url;
        doLoad(this);
    };
};
```

## Inheritance

### Parent constructor

> **Note**: the constructor of the parent class is automatically called before the subclass is instantiated, regardless of whether the subclass has a defined constructor or not.

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
        // The parent constructor has already been called before the child constructor is called, so `this.name` has already been initialized
        console.log(this.name); // "node"
        // Reset `this.name`
        this.name = "sprite";
    }
}

let obj = new Sprite();
console.log(obj.name); // "sprite"
```

### Rewrite

All member methods are dummy methods, and subclass methods can override parent methods directly:

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
console.log(obj.getName()); // "rect"
```

## `get/set` Methods

If get/set is defined in a property, then the predefined get/set methods can be triggered when the property is accessed.

### `get`

Define the `get` method in the property:

```typescript
@property
get num() {
    return this._num;
}

@property
private _num = 0;
```

The get method can return a value of any type. <br>
Properties that have a get method defined can be displayed in the **Inspector** panel and can be accessed directly in the code.

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

> **Notes**:

> 1. Properties cannot be serialized after the `get` method is defined, i.e. the `serializable` parameter is not available.

    For example, the `width` property will neither be displayed in the editor nor serialized:

    ```typescript
    get width() {
        return this._width;
    }

    @property({ type: CCInteger, tooltip: "The width of sprite" })
    private _width = 0;
    ```

> 2. Properties that have a `get` method defined need to have `property` defined if they need to be displayed by the editor, otherwise they won't be rendered.

    For example, the width property will not be rendered on the editor if the `@property` is removed, and the `_width` property will be serialized:

    ```typescript
    @property
    get width() {
        return this._width;
    }

    @property({ type: CCInteger, tooltip: "The width of sprite" })
    private _width = 0;
    ```

> 3. The property itself that defines the `get` method is read-only, but the returned object is not read-only. The developer can still modify the properties inside the object through code, for example:

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

### `set`

Define the `set` method in the property:

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

The `set` method takes an incoming parameter, which can be of any type. The `set` method is generally used in conjunction with the `get` method:

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

> **Note**: the `set` method does not define properties.
