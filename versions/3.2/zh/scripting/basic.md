# 运行环境

Cocos Creator 3.0 引擎的 API 都存在模块 `cc` 中，使用标准的 ES6 模块导入语法将其导入：

```ts
import {
    Component,  // 导入类 Component
    _decorator, // 导入命名空间 _decorator
    Vec3 // 导入类 Vec3
} from 'cc';
import * as modules from 'cc'; // 将整个 Cocos Creator 模块导入为命名空间 Cocos Creator

@_decorator.ccclass("MyComponent")
export class MyComponent extends Component {
    public v = new Vec3();
}
```

## 保留标识符 cc

注意，由于历史原因，`cc` 是 Cocos Creator 3.0 保留使用的标识符，其行为 **相当于** 在任何模块顶部定义了名为 cc 的对象。因此，开发者不应该将 `cc` 用作任何 **全局对象** 的名称：

```ts
/* const cc = {}; // 每个 Cocos Creator 脚本都等价于在此处含有隐式定义 */

import * as modules from 'cc'; // 错误：命名空间导入名称 cc 由 Cocos Creator 保留使用

const cc = {
    x: 0
};
console.log(cc.x); // 错误：全局对象名称 cc 由 Cocos Creator 保留使用

function f () {
    const cc = {
        x: 0
    };
    console.log(cc.x); // 正确：cc 可以用作局部对象的名称

    const o = {
        cc: 0
    };
    console.log(o.cc); // 正确：cc 可以用作属性名
}

console.log(cc, typeof cc); // 错误：行为是未定义的
```
