# 扩展 Assets 面板

## 扩展右击菜单

右击的菜单的显示机制，是在显示前去取实时的菜单数据，插件预先在自己的 `package.json` 里注册 `assets` 模块，能获取 `assets` 面板的右击菜单显示事件，并通过事件返回要显示的菜单数据，再统一显示出来。注册进来的菜单一般放在现有菜单的后面。

假设 `assets` 面板某个位置 `where` 有右击菜单事件。

目前支持扩展的位置有：

- where === 'create', 创建资源的两个入口: 一是面板头部上的 '+' 图标；二是右击菜单里的 'Create'。
- where === 'db', 资源根节点上
- where === 'asset', 资源普通节点上
- where === 'plain', 面板空白区域上

具体实现步骤：

- 在编辑器顶部菜单，插件管理器中新建一个插件
- 在插件文件 `package.json` 里 `contributions.assets.menu` 引入一个 js 文件 `./assets-menu.js`
- 插件里新建 `./assets-menu.js` 文件
- `./assets-menu.js` 里有个显示事件，是约定好名称的函数 `show(where, assetInfo){ }` ，它会被调用并返回菜单数组数据，具体代码如下：

`package.json`

```json
{
  "contributions": {
    "assets": {
      "menu": "./assets-menu.js"
    }
  }
}
```

`assets-menu.js`

```javascript
exports.show = function (where, assetInfo) {
  switch (where) {
    case 'create': {
      return [
        {
          label: 'i18n:extend-assets-demo.menu.createAsset',
          click() {
            if (!assetInfo) {
              console.log('get create command from header menu');
            } else {
              console.log(
                'get create command, the detail of diretory asset is:'
              );
              console.log(assetInfo);
            }
          },
        },
      ];
    }
    case 'asset': {
      return [
        {
          label: 'i18n:extend-assets-demo.menu.assetCommandParent',
          submenu: [
            {
              label: 'i18n:extend-assets-demo.menu.assetCommand1',
              enabled: assetInfo.isDirectory,
              click() {
                console.log('get it');
                console.log(assetInfo);
              },
            },
            {
              label: 'i18n:extend-assets-demo.menu.assetCommand2',
              enabled: !assetInfo.isDirectory,
              click() {
                console.log('yes, you clicked');
                console.log(assetInfo);
              },
            },
          ],
        },
      ];
    }
    case 'db': {
      return [
        {
          label: 'i18n:extend-assets-demo.menu.dbCommand1',
          click() {
            console.log('clicked db command 1');
          },
        },
        {
          label: 'i18n:extend-assets-demo.menu.dbCommand2',
          click() {
            console.log('clicked db command 2');
          },
        },
      ];
    }
    case 'plain': {
      return [
        {
          label: 'i18n:extend-assets-demo.menu.plainCommand1',
          message: 'create-asset',
          click() {
            console.log('clicked on the plain area in the panel.');
          },
        },
      ];
    }
  }
};
```

`参数说明`

```typescript
export interface MenuExtension {
  show: Function; // 当菜单即将要显示的时候，准备数据
}

export interface MenuItem {
  type?: string;
  label?: string;
  sublabel?: string;
  submenu?: MenuItem[];
  click?: Function;
  enable?: Boolean;
  visible?: boolean;
  accelerator?: string;
  checked?: boolean;
  /**
   * 更多参数请查阅
   * https://www.electronjs.org/docs/api/menu-item
   */
}

export interface MenuCallbackInfo extends AssetInfo {
  additional: IDragAdditional[]; // 追加可识别的拖拽类型
  fileName: string; // 文件名，不包含后缀
  fileExt: string; // 后缀，不包含点号
  isParent: boolean; // 是否是父节点
  isDB: boolean; // 是否是 DB 根节点
  isSubAsset: boolean; // 是否是 subAsset, 是的话：无右击菜单，可拖动到 scene 或 hierarchy, 但 asset 面板里面的不能移动
  depth: number; // 树形层级
  left: number; // 缩进的大小
  refreshTime: number; // 每次刷新的当前时间戳，目前用于缩略图的刷新
}

export interface AssetInfo {
  // Asset name
  // 资源名字
  name: string;
  // Asset display name
  // 资源用于显示的名字
  displayName: string;
  // URL
  source: string;
  // loader 加载的层级地址
  path: string;
  // loader 加载地址会去掉扩展名，这个参数不去掉
  url: string;
  // 绝对路径
  file: string;
  // 资源的唯一 ID
  uuid: string;
  // 使用的导入器名字
  importer: string;
  // 类型
  type: string;
  // 是否是文件夹
  isDirectory: boolean;
  // 导入资源的 map
  library: { [key: string]: string };
  // 子资源 map
  subAssets: { [key: string]: AssetInfo };
  // 是否显示
  visible: boolean;
  // 是否只读
  readonly: boolean;

  // 虚拟资源可以实例化成实体的话，会带上这个扩展名
  instantiation?: string;
  // 跳转指向资源
  redirect?: IRedirectInfo;
  // 继承类型
  extends?: string[];
  // 是否导入完成
  imported: boolean;
  // 是否导入失败
  invalid: boolean;
}
```

![extend-create-menu](img/extend-create-menu.png)

## 扩展拖入识别

自定义一个类型，注入到 assets 面板，让这个类型的元素在任意位置被拖入时，面板能识别到它，并给类型的注册方（插件）发送消息，以便注册方能执行动作，比如可完成拖入后自定义新建资源的流程。

具体实现步骤：

`package.json`

```json
{
  "contributions": {
    "drop": [
      {
        "type": "my-defined-asset-type-for-drop",
        "message": "drop-asset"
      }
    ]
  },
  "messages": {
    "drop-asset": {
      "methods": ["default.dropAsset"]
    }
  }
}
```

```typescript
exports.methods = {
  dropAsset(assetInfo: DropCallbackInfo, dragInfo: any) {
    console.log('get drop callback params: ', assetInfo, dragInfo);
  },
};
```

```html
<ui-drag-item
  type="my-defined-asset-type-for-drop"
  additional='{"value":"this additional is dragInfo data."}'
>
  <ui-label>Drag me to assets panel, and look conosole log.</ui-label>
</ui-drag-item>
```

`参数说明`

```typescript
export interface DropItem {
  type: string;
  message: string;
}

export interface DropCallbackInfo {
  uuid: string; // 拖放到哪个资源 uuid 上
  type: string; // 拖放位置上资源的类型
  isDirectory: boolean; // 拖放位置上资源的是否是文件夹
}
```

## Demo 示例

最后，两个扩展功能，附上一个 demo 源码，有问题欢迎到论坛发帖告知。<a href="img/extend-assets.zip" target="_blank">点击下载 extend-assets.zip</a>
