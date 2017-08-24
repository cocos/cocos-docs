# Recommended coding standards

The following are the coding standards that the Cocos Creator development team use. They are included in the manual for game developers` and tool developers' reference.


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

 - Use `{}` to create an object

   ```javascript
   // bad
   var obj = new Object();

   // good
   var obj = {};
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

   ```javascript
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

 - Try to put `{` and the expression in the same line

   ```javascript
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

   ```javascript
   // bad
   function test(){
       console.log('test');
   }

   // good
   function test() {
       console.log('test');
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

 - Please put a space before `(` of the logic state expressions ( `if`, `while` )

   ```javascript
    // bad
    if(isJedi) {
        fight ();
    }

    // good
    if (isJedi) {
        fight();
    }
    ```

 - Please put a space between operators

   ```javascript
   // bad
   var x=y+5;

   // good
   var x = y + 5;
   ```

 - Put a space between Block definitions

   ```javascript
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
       foo() {
       },
       bar() {
       },
   };
   return obj;

   // good
   const obj = {
       foo() {
       },

       bar() {
       },
   };

   return obj;

   // bad
   const arr = [
       function foo() {
       },
       function bar() {
       },
   ];
   return arr;

   // good
   const arr = [
       function foo() {
       },

       function bar() {
       },
   ];

   return arr;
   ```

 - Do not use a comma to define

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

## Reference

[airbnb/es5](https://github.com/airbnb/javascript/tree/master/es5)
