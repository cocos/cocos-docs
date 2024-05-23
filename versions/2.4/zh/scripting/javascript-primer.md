# JavaScript 快速入门

> 本文改编自 [A JavaScript Primer For Meteor](https://www.discovermeteor.com/blog/javascript-for-meteor/)

## 概述

本文以介绍 JavaScript 为主，初学者掌握本文的内容后，将能够对 JavaScript 有大体了解，并且满足 Cocos Creator 的开发需求。

JavaScript是一门充满争议的编程语言，它以 Java 命名，但实际上和 Java 毫无关系。JavaScript 的创造 [只用了 10 天时间](https://www.w3.org/community/webed/wiki/A_Short_History_of_JavaScript)，但在 20 年时间里却发展成世界上最流行的 Web 开发语言。如果为 JavaScript 今日的地位和流行程度找一个原因，那毫无疑问是容易上手的语言特性。当然，精通 JavaScript 是一项艰巨的任务，但学会足够开发 Web 应用和游戏的知识却很简单，如果你已经有了一定编程基础，熟悉 JavaScript 语言特性不会花费你多长时间。

另外，在使用 Cocos Creator 开发游戏时你大多数情况下都会重复使用一些固有的模式。根据帕雷托法则（也叫二八定律），掌握一门语言的 20% 就足够你应付 80% 以上的情况了。现在就让我们来花最短的时间学习足够的 JavaScript 知识，以便我们开始使用 Cocos Creator 开发游戏。

## 边读边尝试

如果你能看到这篇文章，那么你已经具备了全功能的 JavaScript 开发环境 —— 我说的就是你正在使用的浏览器！

在本页面中读到的所有例子，你都可以把它们输入到浏览器的控制台里并查看运行结果，如果你不清楚怎么做，可以阅读文档 [如何在不同浏览器中打开控制台的指南](http://webmasters.stackexchange.com/a/77337)。

准备好了吗？让我们开始学习 JavaScript 吧！

## 变量

在 JavaScript 中，我们像这样声明一个变量：

```js
var a;
```

保留字 `var` 之后紧跟着的，就是一个变量名，接下来我们可以为变量赋值：

```js
var a = 12;
```

在阅读其他人的 JavaScript 代码时，你也会看到下面这样的变量声明：

```js
a = 12;
```

如果你在浏览器控制台中尝试，会发现 JavaScript 在面对省略 `var` 时的变量声明并不会报错，但在 Cocos Creator 项目脚本中，声明变量时的 `var` 是不能省略的，否则编译器会报错。

## 函数

在 JavaScript 里我们像这样声明函数：

```js
var myAwesomeFunction = function (myArgument) {
    // do something
}
```

像这样调用函数：

```js
myAwesomeFunction(something);
```

我们看到函数声明也和变量声明一样遵从 `var something = somethingElse` 的模式。因为在 JavaScript 里，函数和变量本质上是一样的，我们可以像下面这样把一个函数当做参数传入另一个函数中：

```js
square = function (a) {
    return a * a;
}
applyOperation = function (f, a) {
    return f(a);
}
applyOperation (square, 10); // 100
```

## 返回值

函数的返回值是由 `return` 打头的语句定义的，我们这里要了解的是函数体内 `return` 语句之后的内容是不会被执行的。

```js
myFunction = function (a) {
    return a * 3;
    explodeComputer(); // will never get executed (hopefully!)
}
```

## `if`

JavaScript 中条件判断语句 `if` 是这样用的：

```js
if (foo) {
    return bar;
}
```

## `if`/`else`

`if` 后的值如果为 false，会执行 `else` 中的语句：

```js
if (foo) {
    function1();
}
else {
    function2();
}
```

`if` / `else` 条件判断还可以像这样写成一行：

```js
foo ? function1() : function2();
```

当 `foo` 的值为 true 时，表达式会返回 `function1()` 的执行结果，反之会返回 `function2()` 的执行结果。当我们需要根据条件来为变量赋值时，这种写法就非常方便：

```js
var n = foo ? 1 : 2;
```

上面的语句可以表述为：当 `foo` 是 true 时，将 `n` 的值赋为 1，否则赋为 2。

当然我们还可以使用 `else if` 来处理更多的判断类型：

```js
if (foo) {
    function1();
}
else if (bar) {
    function2();
}
else {
    function3();
}
```

## JavaScript 数组（Array）

JavaScript 里像这样声明数组：

```js
a = [123, 456, 789];
```

像这样访问数组中的成员：（从0开始索引）

```js
a[1]; // 456
```

## JavaScript 对象（Object）

我们像这样声明一个对象（object）：

```js
myProfile = {
    name: "Jare Guo",
    email: "blabla@gmail.com",
    'zip code': 12345,
    isInvited: true
}
```

在对象声明的语法（`myProfile = {...}`）之中，有一组用逗号相隔的键值对。每一对都包括一个 key（字符串类型，有时候会用双引号包裹）和一个 value（可以是任何类型：包括 string，number，boolean，变量名，数组，对象甚至是函数）。我们管这样的一对键值叫做对象的属性（property），key 是属性名，value 是属性值。

你可以在 value 中嵌套其他对象，或者由一组对象组成的数组：

```js
myProfile = {
    name: "Jare Guo",
    email: "blabla@gmail.com",
    city: "Xiamen",
    points: 1234,
    isInvited: true,
    friends: [
        {
            name: "Johnny",
            email: "blablabla@gmail.com"
        },
        {
            name: "Nantas",
            email: "piapiapia@gmail.com"
        }
    ]
}
```

访问对象的某个属性非常简单，我们只要使用 dot 语法就可以了，还可以和数组成员的访问结合起来：

```js
myProfile.name; // Jare Guo
myProfile.friends[1].name; // Nantas
```

JavaScript 中的对象无处不在，在函数的参数传递中也会大量使用，比如在 Cocos Creator 中，我们就可以像这样定义 FireClass 对象：

```js
var MyComponent = cc.Class({
    extends: cc.Component
});
```

`{extends: cc.Component}` 这就是一个用做函数参数的对象。在 JavaScript 中大多数情况我们使用对象时都不一定要为它命名，很可能会像这样直接使用。

## 匿名函数

我们之前试过了用变量声明的语法来定义函数：

```js
myFunction = function (myArgument) {
    // do something
}
```

再复习一下将函数作为参数传入其他函数调用中的用法：

```js
square = function (a) {
    return a * a;
}
applyOperation = function (f, a) {
    return f(a);
}
applyOperation(square, 10); // 100
```

我们还见识了 JavaScript 的语法是多么喜欢偷懒，所以我们就可以用这样的方式代替上面的多个函数声明：

```js
applyOperation = function (f, a) {
    return f(a);
}
applyOperation(
    function(a){
      return a*a;
    },
    10
) // 100
```

我们这次并没有声明 `square` 函数，并将 `square` 作为参数传递，而是在参数的位置直接写了一个新的函数体，这样的做法被称为匿名函数，在 JavaScript 中是最为广泛使用的模式。

## 链式语法

下面我们介绍一种在数组和字符串操作中常用的语法：

```js
var myArray = [123, 456];
myArray.push(789) // 123, 456, 789
var myString = "abcdef";
myString.replace("a", "z"); // "zbcdef"
```

上面代码中的点符号表示“调用 `myString` 字符串对象的 `replace` 函数，并且传递 `a` 和 `z` 作为参数，然后获得返回值。

使用点符号的表达式，最大的优点是你可以把多项任务链接在一个表达式里，当然前提是每个调用的函数必须有合适的返回值。我们不会过多介绍如何定义可链接的函数，但是使用它们是非常简单的，只要使用以下的模式：`something.function1().function2().function3()`

链条中的每个环节都会接到一个初始值，调用一个函数，然后把函数执行结果传递到下一环节：

```js
var n = 5;
n.double().square(); // 100
```

## This

`this` 可能是 JavaScript 中最难以理解和掌握的概念了。

简单地说，`this` 关键字能让你访问正在处理的对象：就像变色龙一样，`this` 也会随着执行环境的变化而变化。

解释 `this` 的原理是很复杂的，不妨让我们使用两种工具来帮助我们在实践中理解 `this` 的值：

首先是最普通又最常用的 `console.log()`，它能够将对象的信息输出到浏览器的控制台里。在每个函数体开始的地方加入一个 `console.log()`，确保我们了解当时运行环境下正在处理的对象是什么。

```js
myFunction = function (a, b) {
    console.log(this);
    // do something
}
```

另外一个方法是将 `this` 赋值给另外一个变量：

```js
myFunction = function (a, b) {
    var myObject = this;
    // do something
}
```

乍一看好像这样子并没有什么作用，实际上它允许你安全的使用 `myObject` 这个变量来指代最初执行函数的对象，而不用担心在后面的代码中 `this` 会变成其他东西。

关于 JavaScript 里 `this` 的详细原理说明，请参考这篇文章 [this 的值到底是什么？一次说清楚](http://zhuanlan.zhihu.com/p/23804247)。

## 运算符

`=` 是赋值运算符，`a = 12` 表示把 “12” 赋值给变量 `a`。

如果你需要比较两个值，可以使用 `==`，例如 `a == 12`。

JavaScript 中还有个独特的 `===` 运算符，它能够比较两边的值和类型是否全都相同。（类型是指 string, number 这些）：

```js
a = "12";
a == 12; // true
a === 12; // false
```

大多数情况下，我们都推荐使用 `===` 运算符来比较两个值，因为希望比较两个不同类型但有着相同值的情况是比较少见的。

下面是 JavaScript 判断两个值是否不相等的比较运算符：

```js
a = 12;
a !== 11; // true
```

`!` 运算符还可以单独使用，用来对一个 boolean 值取反：

```js
a = true;
!a; // false
```

`!` 运算符总会得到一个 boolean 类型的值，所以可以用来将非 boolean 类型的值转为 boolean 类型：

```js
a = 12;
!a; // false
!!a; // true
```

或者：

```js
a = 0;
!a; // true
!!a; // false
```

## 代码风格

最后，下面这些代码风格上的规则能帮助我们写出更清晰明确的代码：

- 使用驼峰命名法：定义 `myRandomVariable` 这样的变量名，而不是 `my_random_variable`
- 在每一行结束时写一个 `;`，尽管在 JavaScript 里行尾的 `;` 是可以忽略的
- 在每个关键字前后都加上空格，如 `a = b + 1`，而不是 `a = b + 1`

## 组合我们学到的知识

以上基础的 JavaScript 语法知识已经介绍完了，下面我们来看看能否理解实际的 Cocos Creator 脚本代码：

```js
var Comp = cc.Class({
    extends: cc.Component,

    properties: {
        target: {
            default: null,
            type: cc.Entity
        }
    },

    onStart: function () {
        this.target = cc.Entity.find('/Main Player/Bip/Head');
    },

    update: function () {
        this.transform.worldPosition = this.target.transform.worldPosition;
    }
});
```

这段代码向引擎定义了一个新组件，这个组件具有一个 `target` 参数，在运行时会初始化为指定的对象，并且在运行的过程中每一帧都将自己设置成和 `target` 相同的坐标。

让我们分别看下每一句的作用（我会高亮有用的语法模式）：

`var Comp = cc.Class({`：这里我们使用 `cc` 这个对象，通过 **点语法** 来调用对象的 `Class()` 方法（该方法是 `cc` 对象的一个属性），调用时传递的参数是一个匿名的 **JavaScript 对象**（`{}`）。

`target: { default: null, type: cc.Entity }`：这个键值对声明了一个名为 `target` 的属性，值是另一个 JavaScript 匿名对象。这个对象定义了 target 的默认值和值类型。

`extends: cc.Component`：这个键值对声明这个 Class 的父类是 cc.Component。cc.Component 是 Cocos Creator 的内置类型。

`onStart: function () {`：这一对键值定义了一个成员方法，叫做 `onStart`，它的值是一个匿名函数。

`this.target = cc.Entity.find('`：在这一句的上下文中，`this` 表示正在被创建的 Component 组件，这里通过 `this.target` 来访问 `target` 属性。

## 继续学习

这篇简短的教程从任何角度上说都无法代替系统的 JavaScript 学习，但这里介绍的几种语法模式已经能够帮助你理解绝大部分 Cocos Creator 文档和教程中的代码了，至少从语法上完全可以理解。

如果你像我一样喜欢通过实践学习，那么现在就可以开始跟随教程和文档学习在 Cocos Creator 中开发游戏了！

## JavaScript Resources

以下是 JavaScript 的一些入门教程:

- [JavaScript 标准参考教程](http://javascript.ruanyifeng.com/)
- [JavaScript 秘密花园](http://bonsaiden.github.io/JavaScript-Garden/zh/)
- [JavaScript 内存详解 & 分析指南](https://mp.weixin.qq.com/s/EuJzQajlU8rpZprWkXbJVg)
