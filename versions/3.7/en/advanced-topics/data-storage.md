# User Data Storage

We will have a lot of user data to store to the disk, such as music toggle and language preferences. If it's an offline game you will also need to store game progress locally. In Cocos Creator we use `cc.sys.localStorage` API to save and read user data.

`cc.sys.localStorage` API is quite similar to [Web Storage API](http://devdocs.io/dom/storage). When running on Web platform it will call Web Storage API directly, on native platform it will use sqlite to save and read data on disk.

There's an example project you can see data storage API work in action: [Tutorial Data Storage](https://github.com/cocos-creator/tutorial-storage).

## Save data

`cc.sys.localStorage.setItem(key, value)`

This method requires 2 parameter: 
- `key` is the key you use to index the data.
- `value` is the data itself.

If we want to store the how much gold player owns, we use `gold` as the key:

`cc.sys.localStorage.setItem('gold', 100);`

For complex data as object, we can first serialize it to JSON:

```js
userData = {
    name: 'Tracer',
    level: 1,
    gold: 100
};

cc.sys.localStorage.setItem('userData', JSON.stringify(userData));
```

## Read data

`cc.sys.localStorage.getItem(key)`

`getItem` method only needs one parameter: the key. Continue with above example:

```js
var userData = JSON.parse(cc.sys.localStorage.getItem('userData'));
```

## Clear data

Data can be cleared from storage when it is no longer needed:

`cc.sys.localStorage.clear()`

## Remove key-value pair

We can remove a key-value data from the storage when we don't need it anymore:

`cc.sys.localStorage.removeItem(key)`

## Encryption

For single player game, apply encryption to user profile data can make it harder to hack your game. You can import any third party encryption library and use it to encrypt your data before using `setItem`.

Let's take [encryptjs](https://www.npmjs.com/package/encryptjs) as example, put the library file into your project. To save data:

```js
var encrypt=require('encryptjs');
var secretkey= 'open_sesame'; // you can specify the key for encryption, beware for web game it's visible on client side!

var dataString = JSON.stringify(userData);
var encrypted = encrypt.encrypt(dataString,secretkey,256);

cc.sys.localStorage.setItem('userData', encrypted);
```

To load data:

```js
var cipherText = cc.sys.localStorage.getItem('userData');
var userData=JSON.parse(encrypt.decrypt(cipherText,secretkey,256));
```

> **Note**: data encryption cannot guarantee the safety of user profile data. If you want to make sure it's not hackable please load and save data with a secured server.
