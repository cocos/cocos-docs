# Recommended Coding Standards

The following are the coding standards that the Cocos Creator development team use. They are included in the manual for game developers and tool developers reference.

## Naming standards

- When naming the variables, functions and instances, we use camelCase nomenclature:

    ```ts
    // bad
    const FOOBar = {};
    const foo_bar = {};
    function FOOBar () {}

    // good
    const fooBar = {};
    function fooBar () {}
    ```

- When variable, function, and instance naming involves abbreviations, the abbreviations are all lowercase at the beginning, and all uppercase in subsequent words:

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

- When naming types or modules, use PascalCase nomenclature:

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

- It is recommended to use full uppercase underline to name “constants”:

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

- Use underscores `_` when naming private attributes:

    ```ts
    // bad
    this.__firstName__ = 'foobar';
    this.firstName_ = 'foobar';

    // good
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
    // bad
    class A {
        public a: number;
        constructor (a : number) {
            // This is equivalent to another sentence ‘this.a = void 0;’ here.
            // Be aware that may face performance problems!
            this.a = a;
        }
    }
    
    // good
    class A {
        public a: number = 0; // Ok.
        constructor (a : number) {
            // This is equivalent to another sentence ‘this.a = 0;’ here.
            // Does not cause major performance problems.
            this.a = a;
        }
    }

    // best
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
    // bad
    const obj = new Object();

    // bad
    const obj = {};

    // good
    const obj = Object.create(null);
    ```

- Use `[]` to create an array:

    ```ts
    // bad
    const array = new Array();

    // good
    const array = [];
    ```

- Try your best to use single quotation marks `''` to define a string in TypeScript code:

    ```ts
    // bad
    const str = "Hello World";

    // good
    const str = 'Hello World';
    ```

- When defining multi-lines string, try your best to use `+`:

    ```ts
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

- Choose quadruple spacing or double spacing for indentation according to your own habits and the primary code writer's format:

    ```js
    // bad
    function() {
    ∙const name;
    }

    // very bad
    function() {
    ∙∙<tab>∙∙const name;
    }

    // good
    function() {
    ∙∙const name;
    }

    // good
    function() {
    ∙∙∙∙const name;
    }
    ```

- Do not leave spaces at the end of the line. Leave an empty line at the bottom of the file:

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

- Please add `;` at the end of the statement:

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

- Try to put `{` and the expression in the same line:

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

- Put a space before `{`:

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

- Please put a space before `(` of the logic state expressions ( `if`, `else`, `while`, `switch`):

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

- Leave one space between the binary ternary operators:

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

- The way some functions are declared:

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
    function divisibleFunction () {
        return DEBUG ? 'foo' : 'bar';
    }

    // good
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

- Put a space between Block definitions:

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

- Do not use a comma to define:

    ```js
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

- Single line comments, please add a space after the slash:

    ```js
    //bad
    // good
    ```

- Multiline comments:

    ```js
    /*
     * good
     */
    ```

- A multiline comments that needs to be exported to the API document:

    ```js
    /**
     * good
     */
    ```

## Recommended Reading

[Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript#table-of-contents)
