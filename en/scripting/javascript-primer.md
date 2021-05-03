# JavaScript quick start

> This text is adapted from [A JavaScript Primer For Meteor](https://www.discovermeteor.com/blog/javascript-for-meteor/)

## Overview

This text mainly introduces JavaScript. Beginners will have a general understanding about JavaScript and would have the right skills for Cocos Creator development after they master the contents of this text.

JavaScript is a programming language full of controversy: it is named after Java, but in fact, it has nothing to do with Java. The creation of JavaScript [only took 10 days](https://www.w3.org/community/webed/wiki/A_Short_History_of_JavaScript), but it managed to develop into the most popular Web development language in the world in 20 years. If you are looking for the reason behind the status and popularity of JavaScript nowadays, there's no doubt it is because of its easy-to-use language features. Of course, mastering JavaScript is a tough task, but learning knowledge enough to develop Web Apps and games is easy. If you have some basic programming skills, then it won't take you too long to get familiar with JavaScript's language features.

In addition, you may use some existing patterns while using Cocos Creator to develop a game under most circumstances. According to the Pareto principle (also known as the 80/20 principle), mastering  20% of one language is enough for you to handle more than 80% of situations. Now, let's learn enough JavaScript knowledge in the shortest time so that we can begin to develop a game with Cocos Creator.

## Try when you're reading

If you can see this article, then you already have a full-featured JavaScript development environment -- I am talking about the browser you are using!

All the examples on this page, you can type them into your browser's console and check their running results. If you don't know how to do this, you can read [Guidance of how to open the console in different browsers](http://webmasters.stackexchange.com/a/77337).

Are you ready? Let's start learning JavaScript!

## Variable

In JavaScript, we declare a variable like this:

```js
var a;
```

Following the reserved word `var` is a variable name. Then we can assign the variable:

```js
var a = 12;
```

When reading JavaScript code from others, you may also see variable declaration like this:

```js
a = 12;
```

If you try in the browser's console, you will find JavaScript won't report an error when the variable declaration omits `var`, but in the Cocos Creator project script, `var` of variable declaration can not be omitted, otherwise the compiler will report an error.

## Function

In JavaScript, we declare a function like this:

```js
var myAwesomeFunction = function (myArgument) {
    // does something
}
```

Call the function like this:

```js
myAwesomeFunction(something);
```

We can see that function declaration, same as variable declaration, also follows the `var something = somethingElse` pattern. Because in JavaScript, function and variable are essentially the same, we can introduce one function as a parameter into another function like this:

```js
square = function (a) {
    return a * a;
}
applyOperation = function (f, a) {
    return f(a);
}
applyOperation (square, 10); // 100
```

## Returned value

The returned value of a function is defined by a sentence beginning with `return`. Here, what we need to know is that the contents after the sentence beginning `return` in the function will not be executed.

```js
myFunction = function (a) {
    return a * 3;
    explodeComputer(); // will never get executed (hopefully!)
}
```

## If

In JavaScript, a conditional judgement statement `if` should be used like this:

```js
if (foo) {
    return bar;
}
```

## If/Else

If the value after `if` is false, the statement in `else` will be executed:

```js
if (foo) {
    function1();
}
else {
    function2();
}
```

An If/Else conditional judgement can also be wrote into one line like this:

```js
foo ? function1() : function2();
```

When the value of `foo` is true, the expression will send back the execution result of `function1()`, otherwise it will send back the execution result of `function2()`. When we need to assign variables according to the condition, writing it like this is very convenient:

```js
var n = foo ? 1 : 2;
```

The statement above can be expressed as "when `foo` is true, assign `n` as 1, otherwise assign it as 2".

Of course, we can use `else if` to handle more judgement types:

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

## JavaScript Array

In JavaScript, declare an array like this:

```js
a = [123, 456, 789];
```

Access array members like this: (Start indexing from 0)

```js
a[1]; // 456
```

## JavaScript Object

We declare an object like this:

```js
myProfile = {
    name: "Jare Guo",
    email: "blabla@gmail.com",
    'zip code': 12345,
    isInvited: true
}
```

In the grammar for object declaration (`myProfile = {...}`), there is one pair of key values separated by a comma. Each pair includes one key (character string type, sometimes quoted by double quotation marks) and a value (could be any type: including string, number, boolean, variable name, array, object, and even function). We call such pairs of key values a property of the object, key is the property name and value is the property value.

You can nest other objects or arrays composed by a set of objects in the value

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

Accessing one property of the object is very easy, all we need to do is use dot grammar. It can also combine with the array member's access:

```js
myProfile.name; // Jare Guo
myProfile.friends[1].name; // Nantas
```

Objects are being largely used in JavaScript, and so is it in the function parameter passing. For example, in Cocos Creator, we can define the FireClass object like this:

```js
var MyComponent = cc.Class({
    extends: cc.Component
});
```

`{extends: cc.Component}` is an object acting as a function parameter. In most circumstances in JavaScript, we don't have to name an object when we use it and we may probably use it directly like this.

## Anonymous function

We have tried to use the grammar of the variable declaration to define functions:

```js
myFunction = function (myArgument) {
    // do something
}
```

Now let's go over the method of introducing a function as a parameter into other functions:

```js
square = function (a) {
    return a * a;
}
applyOperation = function (f, a) {
    return f(a);
}
applyOperation(square, 10); // 100
```

We have also learnt how lazy JavaScript's grammar can be, so we can use the method below to replace multiple function declarations above:

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

This time, we don't declare the `square` function and pass `square` as a parameter. Instead, we write a new function body in the parameter spot. This is called anonymous function and is the most extensively used pattern in JavaScript.

## Chain-type grammar

Now, we will introduce a type of grammar often used in array and character string operation:

```js
var myArray = [123, 456];
myArray.push(789) // 123, 456, 789
var myString = "abcdef";
myString = myString.replace("a", "z"); // "zbcdef"
```

The point symbol in the code above means "call `replace` a function of the `myString` character string object, and pass `a` and `z` as parameters, then get the returned value".

The biggest advantage of using point symbol expression is that you can link multiple tasks into one expression, which of course is on the condition of each function being called having the proper returned value. We won't spend too much time on introducing how to define a linkable function, but it's pretty simple to use them as long as you use the following pattern: `something.function1().function2().function3()`

Each link in the chain will receive an original value, call a function and then pass the function execution result to the next step:

```js
var n = 5;
n.double().square(); //100
```

## This

`this` could be the most difficult concept to understand and master in JavaScript.

In short, `this` key word can give you access to the object being processed; like a chameleon,`this` can also change according to the execution environment.

It is very complicated to explain the principle of `this`, so let's use two kinds of tools to help us understand the value of `this` in practice:

First of all, the most common and frequently used is `console.log()`. It can output the information of an object to the browser console. Add one `console.log()` in the beginning of each function body to make sure we know what object the current operating environment is processing.

```js
myFunction = function (a, b) {
    console.log(this);
    // do something
}
```

The other method is to assign `this` to another variable:

```js
myFunction = function (a, b) {
    var myObject = this;
    // do something
}
```

At first sight, it may seem to have no effect, but it actually allows you to use the variable `myObject` to imply the initial execution function object safely without being concerned about `this` maybe turning into other stuff in the code after.

## Operator

`=` is the assigning operator, `a = 12` means to assign“12” to the variable `a`.

If you need to compare two values, you can use `==`, for example, `a == 12`.

`===` is a unique operator in JavaScript, it can tell whether the value and type in both ends are all exactly the same (type refers to string, number and so on).

```js
a = "12";
a == 12; // true
a === 12; // false
```

In most cases, we recommend you to use the operator `===` to compare the two values, because the situation that tries to compare two different types with the same value is very rare.

Following is the comparison operator where JavaScript judges whether the two values are equal or not:

```js
a = 12;
a !== 11; // true
```

Operator `!` can also be used alone to negate a boolean value:

```js
a = true;
!a; // false
```

Operator `!` will always get a boolean type value, so it can be used to transform a non-boolean type value into a boolean type:

```js
a = 12;
!a; // false
!!a; // true
```

Or:

```js
a = 0;
!a; // true
!!a; // false
```

## Code style

At last, the following rules on code style can help us write more specific code:

- Use camel-case naming: define the variable name like `myRandomVariable`, but not `my_random_variable`
- Type one `;` at each end of the line, although `;` in the end of a line can be ignored in JavaScript
- Put spacing before and after each keyword, such as `a = b + 1` rather than `a=b+1`

## Combine the knowledge we have learnt

The basic JavaScript grammar knowledge introduction has finished, now let's see whether we can understand an actual Cocos Creator script code:

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

This piece of code defines a new component to the engine. This component has a `target` parameter, and it will be initialized into a specified object during execution and set itself to the same coordinate as the `target` in every frame during the execution process.

Let's go through the function of each sentence (I will highlight useful grammar patterns):

`var Comp = cc.Class({`: Here we use the object `cc`, call object's `Class()` method (this method is one property of the `cc` object) by **dot syntax**, the parameter passing during the call is an anonymous **JavaScript object** (`{}`).

`target: { default: null, type: cc.Entity }`: This pair of key values declare a property named `target` and its value is another JavaScript anonymous object which defines the default value and value type of the target.

`extends: cc.Component`: This pair of key values declare that the parent of this Class is cc.Component. cc.Component is Cocos Creator's built-in type.

`onStart: function () {`: This pair of key value defines a member method called `onStart` whose value is an anonymous function.

`this.target = cc.Entity.find('`: In the context of this sentence, `this` stands for the component being created, here we access the `target` property by `this.target`.

## Further study

This brief course cannot replace systematic JavaScript learning from any angle, however the grammar patterns introduced in here can help you understand the vast majority of code in Cocos Creator files and courses, at least from a grammar perspective.

If you prefer learning by practice like I do, then you may start to learn how to develop a game in Cocos Creator now following the course and files!

## JavaScript Resources

Here are some JavaScript primers:

- [JavaScript Standard Reference Tutorial](http://javascript.ruanyifeng.com/)
- [JavaScript Secret Garden](http://bonsaiden.github.io/JavaScript-Garden/)
- [JavaScript Memory Explanation and Analysis Guide [cn]](https://mp.weixin.qq.com/s/EuJzQajlU8rpZprWkXbJVg)
