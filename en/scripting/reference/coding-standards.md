# Recommended coding standards

The following are the coding standards that the Cocos Creator development team use. They are included in the manual for game developers and tool developers reference.

## Naming standards

 - When we name the variables, functions and living examples, we use camelCase nomenclature

    ```javascript
    // bad
    var FOOBar = {};
    var foo_bar = {};
    function FOOBar () {}

    // good
    var fooBar = {};
    function fooBar () {}
    ```

 - When we name types or modules, we use PascalCase nomenclature

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

 - It is recommended to use full uppercase underline to name “constant”.

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

 - Use underscores `_` when naming private attributes

    ```javascript
    // bad
    this.__firstName__ = 'foobar';
    this.firstName_ = 'foobar';

    // good
    this._firstName = 'foobar';
    ```

 - We use dash nomenclature for files

    ```bash
    // bad
    fooBar.js
    FooBar.js

    // good
    foo-bar.js
    ```

## Grammar standards

 - Use `Object.create(null)` to create an object

    ```javascript
    // bad
    var obj = new Object();

    // bad
    var obj = {};

    // good
    var obj = Object.create(null);
    ```

 - Use `[]` to create an array

    ```javascript
    // bad
    var array = new Array();

    // good
    var array = [];
    ```

 - Try your best to use single quotation marks `''` to define a string in js code

    ```javascript
    // bad
    var str = "Hello World";

    // good
    var str = 'Hello World';
    ```

 - When defining multi-lines string, try your best to use `+`

    ```javascript
    // bad
    const errorMessage = 'This is a super long error that was thrown out because of Batman. When you stop to think about how Batman had anything to do with this, you would get nowhere fast.';

    // bad
    const errorMessage = 'This is a super long error that was thrown out because \
    of Batman. When you stop to think about how Batman had anything to do \
    with this, you would get nowhere \
    fast.';

    // good
    const errorMessage = 'This is a super long error that was thrown out because ' +
      'of Batman. When you stop to think about how Batman had anything to do ' +
      'with this, you would get nowhere fast.';
    ```

 - Use `===` and `!==` rather than `==` and `!=`.

## Grammar standards

 - Choose quadruple spacing or double spacing for indentation according to your own habits and the primary code writer's format.

    ```js
    // bad
    function() {
    ∙var name;
    }

    // very bad
    function() {
    ∙∙<tab>∙∙var name;
    }

    // good
    function() {
    ∙∙var name;
    }

    // good
    function() {
    ∙∙∙∙var name;
    }
    ```

 - Do not leave spaces at the end of the line. Leave an empty line at the bottom of the file

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

 - Please add `;` at the end of the statement.

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

    // good, this is not the end of the statement
    function foo () {
    }
    ```

 - Try to put `{` and the expression in the same line

    ```js
    // bad
    if ( isFoobar )
    {
    }

    // good
    if ( isFoobar ) {
    }

    // bad
    function foobar()
    {
    }

    // good
    function foobar() {
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

 - Put a space before `{`

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

 - Please put a space before `(` of the logic state expressions ( `if`, `else`, `while`, `switch`)

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

 - Leave one space between the binary ternary operators

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

 - The way some functions are declared

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
    function divisibleFunction () {
        return DEBUG ? 'foo' : 'bar';
    }

    // good
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

 - Put a space between Block definitions

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
        foo() {
        },
        bar() {
        },
    };
    return obj;

    // good
    const obj = {
        x: 0,
        y: 0,

        foo() {
        },

        bar() {
        },
    };

    return obj;
    ```

 - Do not use a comma to define

    ```js
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

 - Single line comments, please add a space after the slash

    ```js
    //bad
    // good
    ```

 - Multiline comments

    ```js
    /*
     * good
     */
    ```

 - A multiline comments that needs to be exported to the API document

    ```js
    /**
     * good
     */
    ```

## Recommended Reading

[Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript#table-of-contents)
