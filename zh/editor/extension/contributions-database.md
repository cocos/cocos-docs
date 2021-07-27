# 扩展资源数据库

所有项目内的资源文件都是通过资源数据库进行管理，其中项目内的 assets 目录存放的是当前项目的资源，引擎仓库里 editor/assets 里存放的是引擎内置的资源。资源包括常见的图片等美术资源，也包括脚本等。
当我们希望书写一个插件，并在插件内使用资源的时候，这些资源需要随着插件一起发布，这时候就需要注册一个扩展内的文件夹到资源数据库里。
通过本文我们将学会通过 `contributions` 向 `asset-db` 注册一个资源文件夹，并在其他脚本里使用刚刚注册的文件夹里的脚本资源。

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
