# 扩展资源数据库

所有项目内的资源文件都是通过资源数据库进行管理，其中项目内的 assets 目录存放的是当前项目的资源，引擎仓库里 editor/assets 里存放的是引擎内置的资源。资源包括常见的图片等美术资源，也包括脚本等。
当我们希望书写一个插件，并在插件内使用资源的时候，这些资源需要随着插件一起发布，这时候就需要注册一个扩展内的文件夹到资源数据库里。
通过本文我们将学会通过 `contributions` 向 `asset-db` 注册一个资源文件夹，并在其他脚本里使用刚刚注册的文件夹里的脚本资源。

## 注册方式

在 package.json 里的 contributions 注册 asset-db 数据:

```json5
{
    "name": "test-package",
    "contributions": {
        "asset-db": {
            "mount": {
                "path": "./assets",
                "readonly": true
            }
        }
    }
}
```

```typescript
interface AssetDBConfig {
    mount:{
        //资源的目录，相对于扩展
        path: string；
        //资源是否只读，默认可读可写
        readonly?: boolean;
    }
}
```

## 在扩展中编写脚本资源

我们可以在刚才注册的 `test-package\assets\` 资源文件夹中定义脚本，我们先创建一个脚本 `foo.ts`，

```typescript
/// foo.ts
import { _decorator, Component, Node } from 'cc';
export const value = 123;
const { ccclass, property } = _decorator;
 
@ccclass('Foo')
export class Foo extends Component {
    start () {
        console.log('foo');
    }
}
```

> **注意**：为了使用 cc 的定义，我们需要拷贝 `{项目目录}\temp\declarations` 的定义文件到扩展目录下。

## 导入扩展注入的脚本资源

前面我们新建了一个扩展 `test-package`，该扩展将 `test-package\assets` 路径下的资源注入到了资源数据库。

在项目的脚本 `bar.ts` 中我们可以使用如下方式导入 `foo.ts` 脚本。

```typescript
/// bar.ts
import { value, Foo } from 'db://test-package/foo';
```
