# 文本资源

Creator 从 1.10 开始正式支持了文本文件。常见的文本格式，如 `.txt`、`.plist`、`.xml`、`.json`、`.yaml`、`.ini`、`.csv`、`.md`，都会导入为 `cc.TextAsset`。

你可以直接为组件关联一个 TextAsset：

```js
    // 声明
    file: {
        default: null,
        type: cc.TextAsset,
    },

    // 读取
    var text = this.file.text;
```

也可以动态加载：

```js
    cc.resources.load(path, function (err, file) {
        cc.log(file.text);
    });
```
