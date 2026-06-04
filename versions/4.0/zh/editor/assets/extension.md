# 增强资源管理器面板

为了能更好的理解本篇文档内容，在继续阅读本文档之前，推荐大家先阅读 Cocos Creator [扩展编辑器](../extension/readme.md) 文档，了解扩展开发相关知识。

## 自定义右击菜单

若要自定义右击菜单，请先参考 [创建并安装扩展](../extension/first.md/#%E5%88%9B%E5%BB%BA%E5%B9%B6%E5%AE%89%E8%A3%85%E6%89%A9%E5%B1%95) 新建一个扩展，在扩展的 `package.json`文件中，通过定义 `contributions.assets.menu` 字段，即可对 **资源管理器** 面板的右击菜单显示事件进行监听，可以实现菜单的追加，如下所示：

```json5
// package.json
{
  "contributions": {
    "assets": {
      "menu": {
        "methods": "./dist/assets-menu.js",
        "createMenu": "onCreateMenu",
        "assetMenu": "onAssetMenu",
        "dbMenu": "onDBMenu",
        "panelMenu": "onPanelMenu"
      }
    }
  }
}
```

各字段含义：

- `methods` - 菜单事件处理函数（示例中的 `on***Menu` 系列）所在的脚本相对路径
- `createMenu` - **创建资源** 菜单显示时触发的事件，有两个触发时机:
    - 点击资源管理器面板左上角的 **+** 按钮
    - 资源菜单中的 **新建** 菜单项被选中时
- `dbMenu` - 右击资源数据库根节点 `assets` 时触发的事件
- `assetMenu` - 右击普通资源节点或目录时触发的事件
- `panelMenu` - 右击资源管理面板空白区域时触发的事件

生成 `./dist/assets-menu.js` 文件的 `assets-menu.ts` 内容如下：

```typescript
export function onCreateMenu(assetInfo: AssetInfo) {
  return [
    {
      label: 'i18n:extend-assets-demo.menu.createAsset',
      click() {
        if (!assetInfo) {
          console.log('get create command from header menu');
        } else {
          console.log('get create command, the detail of diretory asset is:');
          console.log(assetInfo);
        }
      },
    },
  ];
};

export function onAssetMenu(assetInfo: AssetInfo) {
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
};
```

`assets-menu.ts` 中 `on****Menu(assetInfo:AssetInfo):MenuItem[]` 系列函数参数和返回值说明如下：

- 参数 `AssetInfo`：{}

    - `displayName`：string - 资源用于显示的名字
    - `extends`：string[] - 可选，继承类
    - `importer`：string - 导入器名字
    - `isDirectory`：boolean - 是否是文件夹
    - `imported`：boolean - 是否导入完成
    - `invalid`：boolean - 是否导入失败
    - `name`：string - 资源名字
    - `file`：string - 资源文件所在的磁盘绝对路径
    - `readonly`：boolean - 是否只读
    - `type`：string - 资源类型
    - `url`：string - db:// 开头的资源地址
    - `uuid`：string - 资源 ID

- 返回值 [`MenuItem`]

    - `type`：string - 可选，可选项分别为 normal、separator、submenu、checkbox 或 radio
    - `label`：string - 可选，显示的文本
    - `sublabel`：string - 可选，显示的二级文本
    - `submenu`：MenuItem[] - 可选，子项菜单
    - `click`：function - 可选，点击事件
    - `enabled`：boolean - 可选，是否可用，不可用会有置灰样式
    - `visible`：boolean - 可选，是否显示
    - `accelerator`：string - 可选，显示快捷键
    - `checked`：boolean - 可选，当 type 为 `checkbox` / `radio` 时是否选中

    更多属性可参考 [electron menu-item](https://www.electronjs.org/docs/api/menu-item) 的数据格式。

示例中以 `i18n:` 开始的字符串，需要配置多语言相关内容，请参考[多语言系统（i18n）](../extension/i18n.md)。

最终实现效果如下图所示：

![extend-create-menu](img/extend-create-menu.png)

## 拖入识别

假设我们做了一个拥有若干资源的扩展包，且有一个面板用于展示这些资源的图标。 我们希望实现将面板上的图标拖放到资源窗口时，即可将资源包中的资源拷贝到资源窗口。

在 Cocos Creator 扩展中实现这个流程并不复杂。只需要定义一个 `<ui-drag-item type="xxx">` UI 组件，自定义一个拖入类型，并注入到 **资源管理器** 面板的识别范围内。后续在编辑器其他面板将含有该自定义类型的 `<ui-drag-item>` 元素拖入 **资源管理器** 面板时，**资源管理器** 面板便能识别到它，并给自定义类型的注册方（扩展）发送消息，注册方便能执行一个自定义的动作，比如执行新建一组资源。

和 **自定义右击菜单** 一样，我们需要在 `package.json` 文件做对应的配置。

```json5
// package.json
{
  "contributions": {
    "assets": {
      "drop": [
        {
          "type": "my-defined-asset-type-for-drop", // 对应 Demo 示例中 panel.html 的用法
          "message": "drop-asset",
        },
      ],
    },
  },
  "messages": {
    "drop-asset": {
      "methods": ["default.dropAsset"], // 'default' 是指当前扩展的默认面板
    },
  },
}
```

- 在扩展的 `default` 面板中加入 `dropAsset` 方法，如下所示：

  ```typescript
  export const methods = {
    dropAsset(assetInfo: any, dragInfo: any) {
      console.log(Editor.I18n.t('extend-assets-demo.drop.callback'));
      console.log(assetInfo);
      console.log(dragInfo);
    },
  };
  ```

  `assetInfo` 参数说明：
    - `uuid`：string - 拖拽资源时，鼠标释放位置的资源 uuid
    - `type`：string - 该资源的类型
    - `isDirectory`：boolean - 该资源是否是文件夹

- 在扩展的 `defualt` 面板中加入 `ui-drag-item` UI 组件，如下所示：

  ```html
  <ui-drag-item
    type="my-defined-asset-type-for-drop"
    additional='{"value":"this additional is dragInfo data."}'
  >
    <ui-label>Drag me to assets panel, and look conosole log.</ui-label>
  </ui-drag-item>
  ```

  > **注意**：`ui-drag-item` 中的 `type` 需要与 `contributions.assets.drop.type` 一致，才能产生关联。

执行效果如下图所示：

![extend-assets-drop](./img/extend-assets-drop.png)

## Demo 示例

两个扩展功能的可执行代码可下载 <a href="img/extend-assets-demo.zip" target="_blank">范例</a> 查看
