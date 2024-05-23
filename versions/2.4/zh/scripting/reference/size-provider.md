# 通过 SizeProvider 来绑定节点尺寸

> 本文专为高级插件开发者编写，普通用户不推荐阅读。

什么是 SizeProvider？

为方便编辑，Cocos Creator 的所有 Node 自带了 Content Size 属性，在 Node 拥有不同 Component 时，这个 Size 的行为并不完全一致。有些 Component 需要禁止修改 Size，有时需要监听 Size 的修改，有时又需要让 Size 等于自己设置的值。为此，Node 提供了一个叫做 SizeProvider 的机制，来满足这些应用场景。

## SizeProvider 的定义

SizeProvider 可以是任意类型的对象，只要具备如下接口：

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

有趣的是，Cocos2d 原先的 Node "刚好"也有这些接口，其中：
- getContentSize 用于获得 Component 的当前尺寸，获取 Node 的尺寸时，这个方法会被调用。
    你可以返回你需要的任意大小的尺寸，但要注意返回的对象不能在别的地方同时用到，否则需要 clone 一份。
- setContentSize 用于监听 Node 的尺寸更改，获取 Node 的尺寸时，这个方法会被调用。
    你可以在这里做你想要的任意操作，但要传入参数是只读的，你不能保存它的引用或者更改它的值。

## SizeProvider 的实现机制

#### getContentSize

Node 定义了 _sizeProvider 这个属性，默认值是 null。当 Node 的 getContentSize 被调用时，如果 _sizeProvider 不为空，就会立刻调用 provider 的 getContentSize：

```js
getContentSize: function (ignoreSizeProvider) {
    if (this._sizeProvider && !ignoreSizeProvider) {
        var size = this._sizeProvider.getContentSize();
        this._contentSize = size;
        return size;
    }
    else {
        return cc.size(this._contentSize);
    }
}
```

如果 _sizeProvider 为空，则返回 Node 自己的 _contentSize。需要注意的是，_contentSize 会同步更新为 _sizeProvider 的新尺寸，但这个更新操作仅仅发生在 Node 的 getContentSize 被调用时。

#### setContentSize

当 Node 的 setContentSize 被调用时，如果 _sizeProvider 不为空，就会接着调用 provider 的 setContentSize：

```js
setContentSize: function (sizeOrX, y) {
    this._contentSize = size;
    if (this._sizeProvider) {
        this._sizeProvider.setContentSize(locContentSize);
    }
    // ...
}
```

## 注册 SizeProvider

在 Component 里面，你可以这样来注册 SizeProvider。
 
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

## 应用场景举例

#### 让 Node 的尺寸和 Component 的 SGNode 的尺寸完全同步

参考 cc._SGComponent 类，由于 SGNode 本身就实现了 SizeProvider 的几个接口，所以不需要定义自己的 SizeProvider，直接将 _sizeProvider 赋为 SGNode 对象即可。

```js
onLoad: function () {
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

注：Node 尺寸发生改变时，本来就会自动将新的尺寸同步到 cc._SGComponent._sgNode

#### 让 Node 的尺寸等于任意大小

下面的代码让 Node 的尺寸永远等于屏幕大小。

```js
// 定义 SizeProvider，这里定义一个全局对象即可，不需要创建对象实例
var screenSizeProvider = {
    getContentSize: function () {
        return cc.size(cc.visibleRect);
    },
    setContentSize: function (sizeOrX, y) {
        // 不做任何事情
    },

    _getWidth: function () {
        return this.getContentSize().width;
    },
    _getHeight: function () {
        return this.getContentSize().height;
    },
};

// ...

// 定义 Component
onLoad: function () {
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
