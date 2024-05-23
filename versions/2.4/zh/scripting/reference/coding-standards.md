# 推荐编码规范

下面是 Cocos Creator 开发团队使用的编码规范，收录在手册里以供游戏开发者和工具开发者参考。

## 命名规范

 - 当我们为变量，函数和实例命名时, 使用 camelCase 命名法。

    ```javascript
    // bad
    var FOOBar = {};
    var foo_bar = {};
    function FOOBar () {}

    // good
    var fooBar = {};
    function fooBar () {}
    ```

 - 当我们为类或者模块命名时，使用 PascalCase 命名法。

    ```javascript
    // bad
    var foobar = cc.Class({
        foo: 'foo',
        bar: 'bar',
    });
    var foobar = require('foo-bar');

    // good
    var FooBar = cc.Class({
        foo: 'foo',
        bar: 'bar',
    });
    var FooBar = require('foo-bar');
    ```

 - 推荐使用全大写加下划线来命名“常量”。

    ```javascript
    // bad
    const PRIVATE_VARIABLE = 'should not be unnecessarily uppercased within a file';

    // bad
    var THING_TO_BE_CHANGED = 'should obviously not be uppercased';

    // bad
    let REASSIGNABLE_VARIABLE = 'do not use let with uppercase variables';

    // ---

    // allowed but does not supply semantic value
    export const apiKey = 'SOMEKEY';

    // better in most cases
    export const API_KEY = 'SOMEKEY';

    // ---

    // bad - unnecessarily uppercases key while adding no semantic value
    export const MAPPING = {
        KEY: 'value'
    };

    // good
    export const Type = {
        SIMPLE: 'value'
    };
    ```

 - 使用前置下划线 `_` 当我们为私有属性命名

    ```javascript
    // bad
    this.__firstName__ = 'foobar';
    this.firstName_ = 'foobar';

    // good
    this._firstName = 'foobar';
    ```

 - 文件名我们采用 dash 命名法

    ```bash
    // bad
    fooBar.js
    FooBar.js

    // good
    foo-bar.js
    ```

## 语法规范

 - 使用 `Object.create(null)` 创建一个字典

    ```javascript
    // bad
    var map = new Object();

    // bad
    var map = {};

    // good
    var map = Object.create(null);
    ```

 - 使用 `[]` 创建一个数组

    ```javascript
    // bad
    var array = new Array();

    // good
    var array = [];
    ```

 - 尽可能在 js 代码中使用单引号 `''` 来定义 string

    ```javascript
    // bad
    var str = "Hello World";

    // good
    var str = 'Hello World';
    ```

 - 多行 string 定义时, 尽可能使用 `+` 定义

    ```javascript
    // bad
    const errorMessage = 'This is a super long error that was thrown because of Batman. When you stop to think about how Batman had anything to do with this, you would get nowhere fast.';

    // bad
    const errorMessage = 'This is a super long error that was thrown because \
    of Batman. When you stop to think about how Batman had anything to do \
    with this, you would get nowhere \
    fast.';

    // good
    const errorMessage = 'This is a super long error that was thrown because ' +
      'of Batman. When you stop to think about how Batman had anything to do ' +
      'with this, you would get nowhere fast.';
    ```

 - 使用 `===` 和 `!==` 而不是 `==` 和 `!=`

## 书写规范

 - 根据个人习惯, 和原代码作者格式, 选择 4 个空格或者 2 个空格作为缩进

    ```javascript
    // bad
    function () {
    ∙var name;
    }

    // very bad
    function () {
    ∙∙<tab>∙∙var name;
    }

    // good
    function () {
    ∙∙var name;
    }

    // good
    function () {
    ∙∙∙∙var name;
    }
    ```

 - 行尾不要留有空格，文件底部请留一个空行

    ```js
    // bad
    function () {∙
    ∙∙∙∙var name;∙
    }
    /* EOF */

    // good
    function () {
    ∙∙∙∙var name;
    }

    /* EOF */
    ```

 - 语句结尾请加 `;`

    ```js
    // bad
    proto.foo = function () {
    }

    // good
    proto.foo = function () {
    };

    // bad
    function foo () {
        return 'test'
    }

    // very bad
    //   returns `undefined` instead of the value on the next line,
    //   always happens when `return` is on a line by itself because of Automatic Semicolon Insertion!
    function foo () {
        return
            'test'
    }

    // good
    function foo () {
        return 'test';
    }

    // bad
    function foo () {
    };

    // good，这里不是语句结尾
    function foo () {
    }
    ```

 - 尽可能将 `{` 和表达式放在同一行

    ```javascript
    // bad
    if ( isFoobar )
    {
    }

    // good
    if ( isFoobar ) {
    }

    // bad
    function foobar ()
    {
    }

    // good
    function foobar () {
    }

    // bad
    var obj =
    {
        foo: 'foo',
        bar: 'bar',
    }

    // good
    var obj = {
        foo: 'foo',
        bar: 'bar',
    }
    ```

 - 在 `{` 前请空一格

    ```js
    // bad
    if (isJedi){
        fight();
    }
    else{
        escape();
    }

    // good
    if (isJedi) {
        fight();
    }
    else {
        escape();
    }

    // bad
    dog.set('attr',{
        age: '1 year',
        breed: 'Bernese Mountain Dog',
    });

    // good
    dog.set('attr', {
        age: '1 year',
        breed: 'Bernese Mountain Dog',
    });
    ```

 - 在逻辑状态表达式 ( `if`, `else`, `while`, `switch`) 后请空一格

    ```js
    // bad
    if(isJedi) {
        fight ();
    }
    else{
        escape();
    }

    // good
    if (isJedi) {
        fight();
    }
    else {
        escape();
    }
    ```

 - 二元、三元运算符的左右请空一格

    ```js
    // bad
    var x=y+5;
    var left = rotated? y: x;

    // good
    var x = y + 5;
    var left = rotated ? y : x;

    // bad
    for (let i=0; i< 10; i++) {
    }

    // good
    for (let i = 0; i < 10; i++) {
    }
    ```

 - 一些函数的声明方式

    ```js
    // bad
    var test = function () {
        console.log('test');
    };

    // good
    function test () {
        console.log('test');
    }
    
    // bad
    function test () { console.log('test'); };

    // good
    function test () {
        console.log('test');
    }

    // bad
    function divisibleFunction () {
        return DEBUG ? 'foo' : 'bar';
    }

    // best
    var divisibleFunction = DEBUG ?
        function () {
            return 'foo';
        } :
        function () {
            return 'bar';
        };

    // bad
    function test(){
    }

    // good
    function test () {
    }

    // bad
    var obj = {
        foo: function () {
        }
    };

    // good
    var obj = {
        foo () {
        }
    };

    // bad
    array.map(x=>x + 1);
    array.map(x => {
        return x + 1;
    });

    // good
    array.map(x => x + 1);
    ```

 - 在 Block 定义之间请空一行

    ```js
    // bad
    if (foo) {
        return bar;
    }
    return baz;

    // good
    if (foo) {
        return bar;
    }

    return baz;

    // bad
    const obj = {
        x: 0,
        y: 0,
        foo () {
        },
        bar () {
        },
    };
    return obj;

    // good
    const obj = {
        x: 0,
        y: 0,

        foo () {
        },

        bar () {
        },
    };

    return obj;
    ```

 - 不要使用前置逗号定义

    ```javascript
    // bad
    var story = [
          once
        , upon
        , aTime
    ];

    // good
    var story = [
        once,
        upon,
        aTime,
    ];

    // bad
    var hero = {
          firstName: 'Ada'
        , lastName: 'Lovelace'
        , birthYear: 1815
        , superPower: 'computers'
    };

    // good
    var hero = {
        firstName: 'Ada',
        lastName: 'Lovelace',
        birthYear: 1815,
        superPower: 'computers',
    };
    ```

 - 单行注释请在斜杠后面加一个空格

    ```js
    //bad
    // good
    ```

 - 多行注释写法

    ```js
    /*
     * good
     */
    ```

 - 需要导出到 API 文档的多行注释写法

    ```js
    /**
     * good
     */
    ```

 - 除了多语言 API 注释以外，代码中不允许写中文注释

    ```js
    // bad
    // 中文注释不利于非中文开发者阅读代码
    // good
    // Please write all in file comments in English
    ```

## 推荐阅读

[Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript#table-of-contents)
