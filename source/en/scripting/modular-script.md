# Modularize script

Cocos Creator allows you to split the code into multiple script files and they can be called by each other. To implement this, you need to know how to define and use the module in Cocos Creator. This step is called **modularize** for short.

If you are not sure what modularization can do, you can consider it as:
- `include` in C/C++
- `using` in C#
- `import` in Java and Python
- `<link>`in HTML

Modularization enables you to reference other script files in Cocos Creator:
- Access parameters exported from other files
- Call method other files that have been exported
- Use type other files that have been exported
- Use or inherit other Components

JavaScript in Cocos Creator uses the Common JS standard that is almost the same as Node.js to realize modularization, in short:
- Each individual script file forms a module
- Each module is an individual action scope
- Reference other modules in the **synchronized** `require` method
- Set `module.exports` as an exported variable

If you still don't quite understand, don't worry, we will explain it in here.

> In this article, the two terms "module" and "script" are equivalent. All the "comment" parts belong to advanced contents that don't need to be understood at the very start.
> No matter how we define the module, all user designation codes will eventually be compiled into native JavaScript by Cocos Creator and can be operated directly in the browser.

## Reference module

### require

Other than the interface provided by Cocos Creator, all the user-defined modules will need to call `require` to be accessed. For instance, we have a component defined at `Rotate.js`:

```js
// Rotate.js

cc.Class({
   extends: cc.Component,
   // ...
});
```

Now if you want to access it in another script, you can:

```js
var Rotate = require("Rotate");
```

What `require` returned is the object exported by the module. Normally, we would save the result to a variable（`var Rotate`）immediately. The incoming `require` character string is the module's **file name**, the name contains neither route nor suffix and it is case sensitive.

### require complete example

Next, we can use Rotate to derive a subclass and create a new script `SinRotate.js`:

```js
// SinRotate.js

var Rotate = require("Rotate");

var SinRotate = cc.Class({
    extends: Rotate,
    update: function (dt) {
        this.rotation += this.speed * Math.sin(dt);
    }
});
```

Here, we define a new component named SinRotate, which is inherited from Rotate, and rewrite the `update` method.

> This component can also be accessed by other scripts as long as you use `require("SinRotate")`.

Comments：
  - `require` could be called at any place in the script at any time.
  - All of the script will be automatically required when the game is started. At this time, the defined code in each module will be executed once, so no matter how many times it is required, the same example will be returned.
  - When debugging, any module in the project can be required in the **Console** of **Developer Tools**.

## Define module

### Define component

Each individual script file is a module, such as the new script `Rotate.js` mentioned above:

```js
// Rotate.js

var Rotate = cc.Class({
    extends: cc.Component,
    properties: {
        speed: 1
    },
    update: function () {
        this.transform.rotation += this.speed;
    }
});
```

When you declare a component in the script, Cocos Creator will acquiesce to export it so other scripts can use it by requiring this module.

### Define regular JavaScript module

You can not only define a component in the module, but you can also export any JavaScript object. Let's imagine that there is a script `config.js`

```js
// config.js

var config = {
    moveSpeed: 10,
    version: "0.15",
    showTutorial: true,

    load: function () {
        // ...
    }
};
config.load();
```

Now, if we want to access the `config` object in another script:

```js
// player.js

var config = require("config");
cc.log("speed is", config.moveSpeed);
```

The result will report an error: "TypeError: Cannot read property 'moveSpeed' of null", this is because `config` has not been set as the export object. We also need to set `module.exports` as `config` at the end of `config.js`:

```js
module.exports = config;
```

The reason for doing this is because as long as there is another script that requires it, what they actually get will be the `module.exports` object in here.

> So why can we define Component without setting `exports`? 
  Because Component is a special type in Cocos Creator, if a script defines Component without declaring `exports`, Cocos Creator will set `exports` as Component automatically.

Complete code is as follows:

```js
// config.js

var config = {
    moveSpeed: 10,
    version: "0.15",
    showTutorial: true,

    load: function () {
        // ...
    }
};
config.load();

module.exports = config;
```

```js
// player.js

var config = require("config");
cc.log("speed is", config.moveSpeed);
```

In this way, it can output correctly: "speed is 10".

## More examples

### Export variable

- `module.exports` is a null object（`{}`）and can be added in a new field directly.

```js
// foobar.js:

module.exports.foo = function () {
    cc.log("foo");
};
module.exports.bar = function () {
    cc.log("bar");
};
```

```js
// test.js:

var foobar = require("foobar");
foobar.foo();    // "foo"
foobar.bar();    // "bar"
```

- `module.exports` value can be any JavaScript type.

```js
// foobar.js:

module.exports = {
    FOO: function () {
        this.type = "foo";
    },
    bar: "bar"
};
```

```js
// test.js:

var foobar = require("foobar");
var foo = new foobar.FOO();
cc.log(foo.type);      // "foo"
cc.log(foobar.bar);    // "bar"
```

### Packaging a private variable

Each script is a single action scope where the local variable defined using `var` in the script cannot be accessed by external modules. We can package the private variable in the module easily:

```js
// foobar.js:

var dirty = false;
module.exports = {
    setDirty: function () {
        dirty = true;
    },
    isDirty: function () {
        return dirty;
    },
};
```

```js
// test1.js:

var foo = require("foobar");
cc.log(typeof foo.dirty);        // "undefined"
foo.setDirty();
```

```js
// test2.js:

var foo = require("foobar");
cc.log(foo.isDirty());           // true
```

**Caution: Remember to add `var`** before the variable to be defined, otherwise it will become the global variable!

```js
// foobar.js:

dirty = false;        // Setting dirty as the global variable is not recommended! One Should add var before it!
module.exports = {
    setDirty: function () {
        dirty = true;
    },
};
```

## Circular reference

(Coming Soon...)

## Third party module reference

Please refer to [third party module reference file](./third-party-module.md)
