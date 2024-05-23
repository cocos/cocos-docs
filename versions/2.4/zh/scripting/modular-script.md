# 模块化脚本

Cocos Creator 允许你将代码拆分成多个脚本文件，并且让它们相互调用。要实现这点，你需要了解如何在 Cocos Creator 中定义和使用模块，这个步骤简称为 **模块化**。

如果你还不确定模块化究竟能做什么，模块化相当于：

- Java 和 Python 中的 `import`
- C# 中的 `using`
- C/C++ 中的 `include`
- HTML 中的 `<link>`

模块化使你可以在 Cocos Creator 中引用其它脚本文件：

- 访问其它文件导出的参数
- 调用其它文件导出的方法
- 使用其它文件导出的类型
- 使用或继承其它 Component

Cocos Creator 中的 JavaScript 使用和 Node.js 几乎相同的 CommonJS 标准来实现模块化，简单来说：

- 每一个单独的脚本文件就构成一个模块
- 每个模块都是一个单独的作用域
- 以 **同步** 的 `require` 方法来引用其它模块
- 设置 `module.exports` 为导出的变量

如果你还不太明白，没关系，下面会详细讲解。

> 在本文中，“模块”和“脚本”这两个术语是等价的。所有“备注”都属于进阶内容，一开始不需要了解。<br>
> 不论模块如何定义，所有用户代码最终会由 Creator 编译为原生的 JavaScript，可直接在浏览器中运行。

## <a name="require"></a>引用模块

### require

除了 Creator 提供的接口，所有用户定义的模块都需要调用 `require` 来访问。例如我们有一个组件定义在 `Rotate.js`：

```js
// Rotate.js

cc.Class({
   extends: cc.Component,
   // ...
});
```

现在要在别的脚本里访问它，可以：

```js
var Rotate = require("Rotate");
```

`require` 返回的就是被模块导出的对象，通常我们都会将结果立即存到一个变量（`var Rotate`）。传入 `require` 的字符串就是模块的**文件名**，这个名字不包含路径也不包含后缀，而且大小写敏感。

### require 完整范例

接着我们就可以使用 Rotate 派生一个子类，新建一个脚本 `SinRotate.js`：

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

这里我们定义了一个新的组件叫 SinRotate，它继承自 Rotate，并对 `update` 方法进行了重写。

同样的这个组件也可以被其它脚本接着访问，只要用 `require("SinRotate")`。

> **注意**：
>
> 1. `require` 可以在脚本的任何地方任意时刻进行调用。
> 2. 游戏开始时会自动 require 所有脚本，这时每个模块内部定义的代码就会被执行一次，之后无论又被 require 几次，返回的始终是同一份实例。
> 3. 调试时，可以随时在 **Developer Tools** 的 **Console** 中 require 项目里的任意模块。

## 定义模块

### 定义组件

每一个单独的脚本文件就是一个模块，例如前面新建的脚本 `Rotate.js`：

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

当你在脚本中声明了一个组件，Creator 会默认把它导出，其它脚本直接 require 这个模块就能使用这个组件。

### 定义普通 JavaScript 模块

模块里不单单能定义组件，实际上你可以导出任意 JavaScript 对象。假设有个脚本 `config.js`

```js
// config.js

var cfg = {
    moveSpeed: 10,
    version: "0.15",
    showTutorial: true,

    load: function () {
        // ...
    }
};
cfg.load();
```

现在如果我们要在其它脚本中访问 `cfg` 对象：

```js
// player.js

var config = require("config");
cc.log("speed is", config.moveSpeed);
```

结果会有报错："TypeError: Cannot read property 'moveSpeed' of null"，这是因为 `cfg` 没有被导出。由于 require 实际上获取的是目标脚本内的 `module.exports` 变量，所以我们还需要在 `config.js` 的最后设置 `module.exports = config`：

```js
// config.js - v2

var cfg = {
    moveSpeed: 10,
    version: "0.15",
    showTutorial: true,

    load: function () {
        // ...
    }
};
cfg.load();

module.exports = cfg;
```

这样 `player.js` 便能正确输出："speed is 10"。

`module.exports` 的默认值：当你的 `module.exports` 没有任何定义时，Creator 会自动优先将 `exports` 设置为脚本中定义的 Component。如果脚本没定义 Component 但是定义了别的类型的 [CCClass](./class.md)，则自动把 `exports` 设为定义的 CCClass。

> **注意**：在 `module` 上增加的其它变量是不能导出的，也就是说 `exports` 不能替换成其它变量名，系统只会读取 `exports` 这个变量。

## 更多示例

### 导出变量

- `module.exports` 默认是一个空对象（`{}`），可以直接往里面增加新的字段。

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

- `module.exports` 的值可以是任意 JavaScript 类型。

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

### 封装私有变量

每个脚本都是一个单独的作用域，在脚本内使用 `var` 定义的局部变量，将无法被模块外部访问。我们可以很轻松的封装模块内的私有变量：

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

## 循环引用

请参考 [属性延迟定义](reference/class.md#deferred-definition)
