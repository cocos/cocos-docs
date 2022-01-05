# Recommended Coding Standards

The following are the coding standards that the Cocos Creator development team use. They are included in the manual for game developers and tool developers reference.

## Naming standards

- When naming the variables, functions and instances, we use camelCase nomenclature:

    ```ts
    // Bad
    const FOOBar = {};
    const foo_bar = {};
    function FOOBar () {}

    // Good
    const fooBar = {};
    function fooBar () {}
    ```

- When variable, function, and instance naming involves abbreviations, the abbreviations are all lowercase at the beginning, and all uppercase in subsequent words:

    ```ts
    // Bad
    const Id = 0;
    const iD = 0;
    function requireId () {}
    
    // Good
    const id = 0;
    const uuid = '';
    function requireID () {}
    class AssetUUID {}
    ```

- When naming types or modules, use PascalCase nomenclature:

    ```ts
    // Bad
    const foobar = cc.Class({
        foo: 'foo',
        bar: 'bar',
    });
    const foobar = require('foo-bar');

    // Good
    const FooBar = cc.Class({
        foo: 'foo',
        bar: 'bar',
    });
    const FooBar = require('foo-bar');
    ```

- It is recommended to use full uppercase underline to name “constants”:

    ```ts
    // Bad
    const PRIVATE_VARIABLE = 'should not be unnecessarily uppercased within a file';

    // Bad
    var THING_TO_BE_CHANGED = 'should obviously not be uppercased';

    // Bad
    let REASSIGNABLE_VARIABLE = 'do not use let with uppercase variables';

    // ---

    // Allowed but does not supply semantic value
    export const apiKey = 'SOMEKEY';

    // Better in most cases
    export const API_KEY = 'SOMEKEY';

    // ---

    // Bad - unnecessarily uppercases key while adding no semantic value
    export const MAPPING = {
        KEY: 'value'
    };

    // Good
    export const Type = {
        SIMPLE: 'value'
    };
    ```

- Use underscores `_` when naming private attributes:

    ```ts
    // Bad
    this.__firstName__ = 'foobar';
    this.firstName_ = 'foobar';

    // Good
    this._firstName = 'foobar';
    ```

- Use dash nomenclature for files:

    ```bash
    // bad
    fooBar.js
    FooBar.js

    // good
    foo-bar.js
    ```

## Grammar standards

- When a class has a property declaration without initialization style, `declare` should be declared, otherwise may face performance problems. Please refer to [this issue](https://github.com/cocos-creator/3d-tasks/issues/2848) for details.

    ```typescript
    // Bad
    class A {
        public a: number;
        constructor (a : number) {
            // This is equivalent to another sentence ‘this.a = void 0;’ here.
            // Be aware that may face performance problems!
            this.a = a;
        }
    }
    
    // Good
    class A {
        public a: number = 0; // Ok.
        constructor (a : number) {
            // This is equivalent to another sentence ‘this.a = 0;’ here.
            // Does not cause major performance problems.
            this.a = a;
        }
    }

    // Best
    class A {
        public declare a: number;
        public b: undefined | object; // OK: b No secondary assignment in the constructor.
        public declare c: object | null;

        constructor (a: number, c: object) {
            this.a = a;
            this.c = c;
        }
    }
    ```

- Use `Object.create(null)` to create an object:

    ```ts
    // Bad
    const obj = new Object();

    // Bad
    const obj = {};

    // Good
    const obj = Object.create(null);
    ```

- Use `[]` to create an array:

    ```ts
    // Bad
    const array = new Array();

    // Good
    const array = [];
    ```

- Try your best to use single quotation marks `''` to define a string in TypeScript code:

    ```ts
    // Bad
    const str = "Hello World";

    // Good
    const str = 'Hello World';
    ```

- When defining multi-lines string, try your best to use `+`:

    ```ts
    // Bad
    const errorMessage = 'This is a super long error that was thrown out because of Batman. When you stop to think about how Batman had anything to do with this, you would get nowhere fast.';

    // Bad
    const errorMessage = 'This is a super long error that was thrown out because \
    of Batman. When you stop to think about how Batman had anything to do \
    with this, you would get nowhere \
    fast.';

    // Good
    const errorMessage = 'This is a super long error that was thrown out because ' +
      'of Batman. When you stop to think about how Batman had anything to do ' +
      'with this, you would get nowhere fast.';
    ```

- Use `===` and `!==` rather than `==` and `!=`.

## Grammar standards

- Choose quadruple spacing or double spacing for indentation according to your own habits and the primary code writer's format:

    ```js
    // Bad
    function() {
    ∙const name;
    }

    // Very bad
    function() {
    ∙∙<tab>∙∙const name;
    }

    // Good
    function() {
    ∙∙const name;
    }

    // Good
    function() {
    ∙∙∙∙const name;
    }
    ```

- Do not leave spaces at the end of the line. Leave an empty line at the bottom of the file:

    ```js
    // Bad
    function () {∙
    ∙∙∙∙const name;∙
    }
    /* EOF */

    // Good
    function () {
    ∙∙∙∙const name;
    }

    /* EOF */
    ```

- Please add `;` at the end of the statement:

    ```js
    // Bad
    proto.foo = function () {
    }

    // Good
    proto.foo = function () {
    };

    // Bad
    function foo () {
        return 'test'
    }

    // Very bad
    //   Returns `undefined` instead of the value on the next line,
    //   Always happens when `return` is on a line by itself because of Automatic Semicolon Insertion!
    function foo () {
        return
            'test'
    }

    // Good
    function foo () {
        return 'test';
    }

    // Bad
    function foo () {
    };

    // Good, this is not the end of the statement
    function foo () {
    }
    ```

- Try to put `{` and the expression in the same line:

    ```js
    // Bad
    if ( isFoobar )
    {
    }

    // Good
    if ( isFoobar ) {
    }

    // Bad
    function foobar()
    {
    }

    // Good
    function foobar() {
    }

    // Bad
    const obj =
    {
        foo: 'foo',
        bar: 'bar',
    }

    // Good
    const obj = {
        foo: 'foo',
        bar: 'bar',
    }
    ```

- Put a space before `{`:

    ```js
    // Bad
    if (isJedi){
        fight();
    }
    else{
        escape();
    }

    // Good
    if (isJedi) {
        fight();
    } else {
        escape();
    }

    // Bad
    dog.set('attr',{
        age: '1 year',
        breed: 'Bernese Mountain Dog',
    });

    // Good
    dog.set('attr', {
        age: '1 year',
        breed: 'Bernese Mountain Dog',
    });
    ```

- Please put a space before `(` of the logic state expressions ( `if`, `else`, `while`, `switch`):

    ```js
    // Bad
    if(isJedi) {
        fight ();
    }
    else{
        escape();
    }

    // Good
    if (isJedi) {
        fight();
    } else {
        escape();
    }
    ```

- Leave one space between the binary ternary operators:

    ```js
    // Bad
    const x=y+5;
    const left = rotated? y: x;

    // Good
    const x = y + 5;
    const left = rotated ? y : x;

    // Bad
    for (let i=0; i< 10; i++) {
    }

    // Good
    for (let i = 0; i < 10; i++) {
    }
    ```

- The way some functions are declared:

    ```js
    // Bad
    const test = function () {
        console.log('test');
    };

    // Good
    function test () {
        console.log('test');
    }

    // Bad
    function divisibleFunction () {
        return DEBUG ? 'foo' : 'bar';
    }

    // Good
    const divisibleFunction = DEBUG ?
        function () {
            return 'foo';
        } :
        function () {
            return 'bar';
        };

    // Bad
    function test(){
    }

    // Good
    function test () {
    }

    // Bad
    const obj = {
        foo: function () {
        }
    };

    // Good
    const obj = {
        foo () {
        }
    };

    // Bad
    array.map(x=>x + 1);
    array.map(x => {
        return x + 1;
    });

    // Good
    array.map(x => x + 1);
    ```

- Put a space between Block definitions:

    ```js
    // Bad
    if (foo) {
        return bar;
    }
    return baz;

    // Good
    if (foo) {
        return bar;
    }

    return baz;

    // Bad
    const obj = {
        x: 0,
        y: 0,
        foo() {
        },
        bar() {
        },
    };
    return obj;

    // Good
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

- Do not use a comma to define:

    ```js
    // Bad
    const story = [
          once
        , upon
        , aTime
    ];

    // Good
    const story = [
        once,
        upon,
        aTime,
    ];

    // Bad
    const hero = {
          firstName: 'Ada'
        , lastName: 'Lovelace'
        , birthYear: 1815
        , superPower: 'computers'
    };

    // Good
    const hero = {
        firstName: 'Ada',
        lastName: 'Lovelace',
        birthYear: 1815,
        superPower: 'computers',
    };
    ```

- Single line comments, please add a space after the slash:

    ```js
    // Bad
    // Good
    ```

- Multiline comments:

    ```js
    /*
     * Good
     */
    ```

- A multiline comments that needs to be exported to the API document:

    ```js
    /**
     * Good
     */
    ```

## Recommended Reading

[Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript#table-of-contents)
