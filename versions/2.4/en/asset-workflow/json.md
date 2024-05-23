# JSON Asset

Creator has officially supported the JSON file since 1.10. All the `.json` files under the project's `assets` folder are imported as `cc.JsonAsset`.

You can associate a JSON directly with a component:

```js
    // Declaration
    npcList: {
        default: null,
        type: cc.JsonAsset,
    },

    // Read
    var json = this.npcList.json;
    loadNpc(json);
```

Or load dynamically:

```js
    cc.resources.load('configs/npc', function (err, jsonAsset) {
        loadNpc(jsonAsset.json);
    });
```
