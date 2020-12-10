# JSON 资源

Creator 从 1.10 开始正式支持了 JSON 文件。项目 assets 文件夹下的所有 `.json` 文件，都会导入为 `cc.JsonAsset`。

你可以直接为组件关联一个 JSON：

```js
// 声明
npcList: {
    default: null,
    type: cc.JsonAsset,
},

// 读取
var json = this.npcList.json;
loadNpc(json);
```

也可以动态加载：

```js
cc.resources.load('configs/npc', function (err, jsonAsset) {
    loadNpc(jsonAsset.json);
});
```
