# 扩展资源数据库(DB)

项目中会有很多资源，资源会附带很多的数据，这部分资源和数据，就由资源数据库进行管理。
扩展可以将资源注入到资源数据库中，以提供类似脚本、图片等资源。
通过本文我们将学会通过 `contributions` 向 `asset-db` 注入资源到资源管理器。

## 注册方式

注册资源的方式如下：

```json5
/// package.json
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
        //资源是否只读,默认可读可写
        readonly?: boolean;
    }
}
```

## 在扩展中编写脚本资源

为了在扩展中编写 `ts` 脚本资源，我们需要拷贝`{项目目录}\temp\declarations` 到扩展目录下，
这样可以获得 `cc` 相关的脚本定义。

## 导入扩展注入的脚本资源

前面我们新建了一个扩展 `test-package`,该扩展将 `test-package\assets` 路径下的资源注入到了资源数据库。
我们假设 `test-package\assets` 路径下有一个脚本 `foo.ts`,

```typescript
/// test-package\assets\foo.ts
export const value = 123;
```

在项目的脚本 `bar.ts` 中我们应该使用如下方式导入该脚本，

```typescript
/// bar.ts
import { value } from "db://test-package/foo";
```
