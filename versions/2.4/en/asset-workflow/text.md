# Text Asset

Creator has officially supported text files since 1.10. Common text formats such as `.txt`, `.plist`, `.xml`, `.json`, `.yaml`, `.ini`, `.csv`, `.md` will be imported as `cc.TextAsset`.

You can associate a TextAsset directly with a component:

```js
    // Declaration
    file: {
        default: null,
        type: cc.TextAsset,
    },

    // Read
    var text = this.file.text;
```

Or load dynamically:

```js
    cc.resources.load(url, function (err, file) {
        cc.log(file.text);
    });
```
