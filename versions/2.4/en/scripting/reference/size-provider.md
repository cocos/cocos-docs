# Bind node size with SizeProvider

What is SizeProvider?

For the convenience of editing, all Nodes in Cocos Creator come with a Content Size property whose behavior is not in full accord when the Nodes have different Components. Some Components need to forbid altering Size and sometimes they need to listen to the modification of Size. However sometimes they need to make Size equal to the value set by itself. So, Node provides a mechanism called SizeProvider to meet these application scenarios.

## Definition of SizeProvider

SizeProvider can be an object of any type as long as it has the following interface:

```js
function SizeProvider () {
}
SizeProvider.prototype = {
    /**
     * @return {cc.Size}
     */
    getContentSize: function () {
        return this._size.clone();
    },
    /**
     * @param {cc.Size|Number} sizeOrX
     * @param {Number} [y]
     */
    setContentSize: function (sizeOrX, y) {
        this._size = size.clone();
    },
    /**
     * @return {Number}
     */
    _getWidth: function () {
        return this._size.width;
    },
    /**
     * @return {Number}
     */
    _getHeight: function () {
        return this._size.height;
    }
};
```

The funny thing is, the original Node of Cocos2d "happens to" have this interface also, in which:

- getContentSize is used to get the current size of Component, this method will be called when getting the size of Node.

    You can return any size you need, but note that the returned object cannot be used in other places, or you will need to make a copy.

- setContentSize is used to listen to the alteration of Node size, this method will be called when getting the size of Node.

    You can do any operation you want, but as long as the incoming parameter is read-only, you cannot save its reference or alter its value.

## The implement mechanism of SizeProvider

### getContentSize

Node defines the property of `_sizeProvider` whose default is null. When getContentSize of Node is being called, if `_sizeProvider` is not null, it will call getContentSize of the provider right away.

```js
getContentSize: function (ignoreSizeProvider) {
    if (this._sizeProvider && !ignoreSizeProvider) {
        var size = this._sizeProvider.getContentSize();
        this._contentSize = size;
        return size;
    }a
    else {
        return cc.size(this._contentSize);
    }
}
```

if `_sizeProvider` is null, it will return the `_contentSize` of Node itself. What we need to note is that `_contentSize` will synchronously update to the new size of `_sizeProvider`, but this update will only happen when the getContentSize of Node is being called.

### setContentSize

When the setContentSize of Node is being called, if `_sizeProvider` is null, it will call setContentSize from the provider:

```js
setContentSize: function (sizeOrX, y) {
    this._contentSize = size;
    if (this._sizeProvider) {
        this._sizeProvider.setContentSize(locContentSize);
    }
    // ...
}
```

## Register SizeProvider

In Component, you can register SizeProvider like this.

```js
onLoad: function () {
    if ( !this.node._sizeProvider ) {
        this._mySizeProvider = new MySizeProvider(this);
        this.node._sizeProvider = this._mySizeProvider;
    }
    else {
        cc.error('...');
    }
},

onDestroy: function () {
    if ( this._mySizeProvider && this.node._sizeProvider === this._mySizeProvider ) {
        this._mySizeProvider = null;
        this.node._sizeProvider = null;
    }
},
```

## Application scenario illustration

### Make Node size completely synchronized with SGNode size of Component

Refer to the ComponentInSG type, since SGNode itself has achieved several interfaces of SizeProvider, it doesn't need to define its SizeProvider, instead, assign `_sizeProvider` as the SGNode object.

```js
onLoad: function () {
    this._sgNode = this._createSgNode();
    if ( !this.node._sizeProvider ) {
        this.node._sizeProvider = this._sgNode;
    }
},
onDestroy: function () {
    if ( this.node._sizeProvider === this._sgNode ) {
        this.node._sizeProvider = null;
    }
},
```

> **Note**: when Node size is changed, it will automatically synchronize the new size to `ComponentInSG._sgNode`.

### Make Node size equal to any size

The code below makes Node size always equal to the screen size.

```js
// Define SizeProvider, here you can define a global object without creating an object example
var screenSizeProvider = {
    getContentSize: function () {
        return cc.size(cc.visibleRect);
    },
    setContentSize: function (sizeOrX, y) {
        // do nothing
    },

    _getWidth: function () {
        return this.getContentSize().width;
    },
    _getHeight: function () {
        return this.getContentSize().height;
    },
};

// ...

// Define component
onLoad: function () {
    this._sgNode = this._createSgNode();
    if ( !this.node._sizeProvider ) {
        this.node._sizeProvider = screenSizeProvider;
    }
},
onDestroy: function () {
    if ( this.node._sizeProvider === screenSizeProvider ) {
        this.node._sizeProvider = null;
    }
},
```
