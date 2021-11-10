# 创建脚本

## 创建组件脚本

在 Cocos Creator 中，脚本也是资源的一部分。你可以在 **资源管理器** 中选中想要放置脚本文件的文件夹，然后右键点击并选择 **TypeScript** 来创建一个组件脚本，或者也可以直接点击左上角的创建按钮（**+**）。

![create-script](setup/create-script.png)

然后命名为 `say-hello`，便可以在 **层级管理器** 中看到生成了一个名为 `say-hello` 的脚本文件：

![ts](setup/ts.png)

一份简单的组件脚本如下：

```TypeScript
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('SayHello')
export class SayHello extends Component {
    /* class member could be defined like this */
    // dummy = '';

    /* use `property` decorator if your want the member to be serializable */
    // @property
    // serializableDummy = 0;

    start () {
        // Your initialization goes here.
    }

    // update (deltaTime: number) {
    //     // Your update function goes here.
    // }
}
```

> **注意**：我们更推荐用户使用 TypeScript 来编写脚本，目前 **资源管理器** 中仅支持创建 TypeScript 文件。但用户也可以在外部创建 JavaScript，然后将其以 [插件脚本](external-scripts.md) 的形式导入到 Creator 使用。

## 编辑脚本

开发者可根据自己的需求，选择自己喜爱的文本工具（如：Vim、Sublime Text、Web Storm、VSCode 等）进行脚本编辑，请在编辑器菜单栏 **偏好设置** 的 [外部程序](../editor/preferences/index.md#%E5%A4%96%E9%83%A8%E7%A8%8B%E5%BA%8F) 中设置脚本编辑器。

然后双击脚本资源，可以直接打开脚本编辑器进行编辑。编辑完脚本并保存，然后返回编辑器，Cocos Creator 会自动检测到脚本的改动，并迅速编译。

在代码编写之前，请先阅读 [脚本基础](basic.md) 了解更多关于脚本的内容。

## 添加脚本到场景节点中

将脚本添加到场景节点中，实际上就是为这个节点添加一个脚本组件。在 **层级管理器** 中选中希望添加脚本的场景节点，此时该节点的属性会显示在 **属性检查器** 中，添加脚本组件包括以下两种方式：

1. 直接将 **资源管理器** 中的脚本拖拽到 **属性检查器** 中。

    ![add script component](setup/add-script-component.png)

2. 点击 **属性检查器** 最下方的 **添加组件** 按钮，然后选择 **自定义脚本 -> SayHello** 来添加我们刚刚编写的脚本组件。或者也可以直接搜索 **SayHello** 来添加，前提是需要开启 **偏好设置 -> 实验室** 中的 **使用弹窗方式添加组件** 功能。

    ![add script component](setup/add-script-component2.png)

需要注意的是，脚本组件的组件名是以脚本中定义的类名为准的，而不是脚本文件名。创建脚本时，脚本文件会按照以下规则生成脚本类名：

- 使用大驼峰式命名法
- 头部不能有数字
- 不含特殊字符
- 以脚本文件名中的符号和空格作为间隔，每个间隔后的首字母大写。例如脚本文件名为 `say-hello`，脚本类名则为 `SayHello`。

之后如果有对脚本文件名/脚本类名进行二次修改，这两者之间并不会自动同步，如果需要的话，可以手动同步。<br>
以上面的 `say-hello.ts` 为例，若我们在 **资源管理器** 中将其重命名为 `hello`，可以看到 **属性检查器** 中的脚本组件名还是原来的 **SayHello**，只有脚本名称变成了 `hello`：

![change script name](setup/change-scriptname.png)

若我们双击打开 `say-hello.ts`，将类名改为 **Hello**：

```TypeScript
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Hello')
export class Hello extends Component {}
```

保存脚本后返回编辑器，可以看到 **属性检查器** 中的脚本组件名变成了 **Hello**，但是脚本文件名还是原来的 `say-hello`：

![change class name](setup/change-classname.png)
