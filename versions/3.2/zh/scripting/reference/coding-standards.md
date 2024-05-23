# 推荐编码规范

下面是 Cocos Creator 开发团队使用的编码规范，收录在手册里以供游戏开发者和工具开发者参考。

## 命名规范

- 当我们为变量，函数和实例命名时, 使用 camelCase 命名法。

    ```ts
    // bad
    const FOOBar = {};
    const foo_bar = {};
    function FOOBar () {}

    // good
    const fooBar = {};
    function fooBar () {}
    ```

- 当变量、函数和实例命名涉及到缩写时，缩写在开头全部小写，在后续单词中，则全部大写。

    ```ts
    // bad
    const Id = 0;
    const iD = 0;
    function requireId () {}
    
    // good
    const id = 0;
    const uuid = '';
    function requireID () {}
    class AssetUUID {}
    ```

- 当我们为类或者模块命名时，使用 PascalCase 命名法。

    ```ts
    // bad
    const foobar = cc.Class({
        foo: 'foo',
        bar: 'bar',
    });
    const foobar = require('foo-bar');

    // good
    const FooBar = cc.Class({
        foo: 'foo',
        bar: 'bar',
    });
    const FooBar = require('foo-bar');
    ```

- 推荐使用全大写加下划线来命名“常量”。

    ```ts
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

    ```ts
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

- 当类的属性声明没有初始化式的时候，应当声明 declare，否则可能面临性能问题。详情请参考 [Issue](https://github.com/cocos-creator/3d-tasks/issues/2848)

    ```typescript
    // bad
    class A {
        public a: number;
        constructor (a : number) {
            // 相当于此处还有一句 this.a = void 0;
            // 注意可能面临性能问题！
            this.a = a;
        }
    }
    
    // good
    class A {
        public a: number = 0; // Ok.
        constructor (a : number) {
            // 相当于此处还有一句 this.a = 0;
            // 但不会引起大的性能问题
            this.a = a;
        }
    }

    // best
    class A {
        public declare a: number;
        public b: undefined | object; // OK: b 未在构造函数中二次赋值
        public declare c: object | null;

        constructor (a: number, c: object) {
            this.a = a;
            this.c = c;
        }
    }
    ```

- 使用 `Object.create(null)` 创建一个字典

    ```ts
    // bad
    const map = new Object();

    // bad
    const map = {};

    // good
    const map = Object.create(null);
    ```

- 使用 `[]` 创建一个数组

    ```ts
    // bad
    const array = new Array();

    // good
    const array = [];
    ```

- 尽可能在 TypeScript 代码中使用单引号 `''` 来定义 string

    ```ts
    // bad
    const str = "Hello World";

    // good
    const str = 'Hello World';
    ```

- 多行 string 定义时, 尽可能使用 `+` 定义

    ```ts
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

    ```ts
    // bad
    function () {
    ∙const name;
    }

    // very bad
    function () {
    ∙∙<tab>∙∙const name;
    }

    // good
    function () {
    ∙∙const name;
    }

    // good
    function () {
    ∙∙∙∙const name;
    }
    ```

- 行尾不要留有空格，文件底部请留一个空行

    ```js
    // bad
    function () {∙
    ∙∙∙∙const name;∙
    }
    /* EOF */

    // good
    function () {
    ∙∙∙∙const name;
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

    ```ts
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
    const obj =
    {
        foo: 'foo',
        bar: 'bar',
    }

    // good
    const obj = {
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
    } else {
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
    } else {
        escape();
    }
    ```

- 二元、三元运算符的左右请空一格

    ```js
    // bad
    const x=y+5;
    const left = rotated? y: x;

    // good
    const x = y + 5;
    const left = rotated ? y : x;

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
    const test = function () {
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
    const divisibleFunction = DEBUG ?
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
    const obj = {
        foo: function () {
        }
    };

    // good
    const obj = {
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

    ```ts
    // bad
    const story = [
          once
        , upon
        , aTime
    ];

    // good
    const story = [
        once,
        upon,
        aTime,
    ];

    // bad
    const hero = {
          firstName: 'Ada'
        , lastName: 'Lovelace'
        , birthYear: 1815
        , superPower: 'computers'
    };

    // good
    const hero = {
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

[Airbnb ts Style Guide](https://github.com/airbnb/ts#table-of-contents)
