# Third party JavaScript module reference

This article is not recommended, only for archiving, if you want to import third party scripts please use [Plugin Script](plugin-scripts.md).

Continue on to read about [JavaScript Primer](javascript-primer.md) or back to [Scripting](index.md).

<hr>

If you don't know anything about modular script, you should read the [Modular script](./modular-script.md) file first.

Currently, Cocos Creator only supports the third party npm module reference. Of course, if what the script developer has written accords with the Node.js standard, it can also be referenced. You can find further introduction to Node.js and npm on the official documentation page:

- [Node.js modules](https://nodejs.org/api/modules.html)
- [What is npm](https://docs.npmjs.com/getting-started/what-is-npm)

## How to use npm module

When you find the npm module you need, the first step you need to do is install this module (take box2dweb-commonjs for example) in your own project directory:

```
> cd /path/to/project
> npm install box2dweb-commonjs
```

Then all you have to do is to `require` the module in the component script where you need to use this module, then you are good to go:

```
var box2d = require('box2dweb-commonjs');
```

In this way, the third party module can be contained in your game automatically, even in the packaging process it can be packaged into the game script.

## Cautions

1. **Only supports pure JavaScript modules**：npm contains varied modules, many of them use the API of Node.js which can not be referenced by the component because the ultimate operating environment of the component is a browser which does not have Node.js to support.
2. **Native environments do not support DOM API**：as everyone knows, browsers contain a mass of DOM API. jQuery is one famous DOM operation library. Although modules using these API can operate in the HTML5 environment, they cannot operate in the native environment. This is because the native enviroment does not contain the web layout engine providing DOM API.

## Other probable module dependence patterns in the future

Theoretically, `require` can be used to reference any JavaScript script. Although it is not currently recommended to reference third party modules in this way, it will still provide better support in the future.

Besides, many developers are used to referencing external JavaScript script, even the off-line script in `index.html`. Cocos Creator currently hasn't released how to use `index.html`. Developers can only add references manually in the page file after packaging, but we are working on how to provide a more friendly way for developers to customize `index.html`.
