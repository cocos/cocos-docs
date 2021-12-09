# JSON 资源

Creator 从 1.10 开始正式支持了 JSON 文件。项目 assets 文件夹下的所有 `.json` 文件，都会导入为 `cc.JsonAsset`。

开发者可以通过 Creator 编辑器挂载的方式获取 Json 数据：

```ts

import { _decorator, Component, JsonAsset } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ItemTemplate')
export class ItemTemplate extends Component {

// Json 文件
@property(JsonAsset)
itemGiftJson: JsonAsset = null!;

start() {

    const jsonData: object = this.itemGiftJson.json!;

}
}


```

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
