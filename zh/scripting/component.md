# 组件

所有继承自 [Component](https://docs.cocos.com/creator3d/api/zh/classes/component.component-1.html) 的类都称为组件类，
其对象称为组件，实现了 Cocos Creator 3.0 EC 系统中的组件概念。

组件类必须是 cc 类。

```ts
import { Component } from "cc";

@ccclass("MyComponent")
class MyComponent extends Component {

}
```

## 组件的创建和销毁

组件的生命周期完全由节点操控。
与普通类对象不同，组件不能由构造函数创建：

```ts
const component = new MyComponent(); // 错误：组件无法由构造函数创建
```

相反地，组件必须由节点来创建：

```ts
const myComponent = node.addComponent(MyComponent);
```

在此之后，称组件附加到了节点上。

调用 `Node.removeComponent` 方法移除指定的组件并将其销毁。

组件总是附加在某个节点上，除了：

- 在组件类的构造函数结束之前；
- 组件从节点上移除之后。

```ts
import { Component } from "cc";

@ccclass("MyComponent")
class MyComponent extends Component {
    constructor () {
        console.log(this.node.name); // 错误：组件并未附加到节点上
    }

    public printNodeName () {
        console.log(this.node.name);
    }
}

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
const myComponent = node.addComponent(MyComponent);
myComponent.printNodeName(); // 正确
node.removeComponent();
myComponent.printNodeName(); // 错误：组件并未附加到节点上
```
