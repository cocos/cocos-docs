# JSON 资源

项目 assets 文件夹下的所有 `.json` 文件，都会导入为 `cc.JsonAsset`。

开发者可以将 json 文件拖拽到相对应的：

```ts

import { _decorator, Component, JsonAsset } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ItemTemplate')
export class ItemTemplate extends Component {

    // Json 文件
    @property(JsonAsset)
    itemGiftJson: JsonAsset = null!;

    start() {

        // 获取到 Json 数据
        const jsonData: object = this.itemGiftJson.json!;

    }
}


```

![itemGift](json/json.png)

也可以动态加载：

```ts
import { _decorator, Component, JsonAsset, resources, error } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ItemTemplate')
export class ItemTemplate extends Component {

    start() {

        resources.load('gameGiftJson', (err: any, res: JsonAsset) => {
            if (err) {
                error(err.message || err);
                return;
            }
            // 获取到 Json 数据
            const jsonData:object = res.json;

        })

    }
}
```
