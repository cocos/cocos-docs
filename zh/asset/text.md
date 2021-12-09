# 文本资源

Creator 从 1.10 开始正式支持了文本文件。常见的文本格式，如 `.txt`、`.plist`、`.xml`、`.json`、`.yaml`、`.ini`、`.csv`、`.md`，都会导入为 `cc.TextAsset`。

开发者可以通过 Creator 编辑器挂载的方式获取文本数据：

```ts
import { _decorator, Component, TextAsset } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ItemTemplate')
export class ItemTemplate extends Component {

    // 文本文件
    @property(TextAsset)
    itemGiftText: TextAsset = null!;

    start() {

        const data: string = this.itemGiftText.text!;

    }
}
```

![text](text/text.png)

也可以动态加载：

```ts
import { _decorator, Component, resources, error, TextAsset } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ItemTemplate')
export class ItemTemplate extends Component {

    start() {

        resources.load('itemGiftText', (err: any, res: TextAsset) => {
            if (err) {
                error(err.message || err);
                return;
            }

            // 获取到文本数据
            const textData = res.text;
        })

    }
}
```
