# Extending the Database (DB)

There will be a lot of resources in the project, and the resources will come with a lot of data, which is managed by the resource database.
Extensions can inject resources into the resource database to provide resources like scripts, images, etc.
This article will demonstrate how to inject resources into the resource manager via `contributions` to `asset-db`.

## Registration

Register the Database as follows:

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
        //Directory of resources, relative to extension
        path: string；
        //Whether the resource is read-only,read and write by default
        readonly?: boolean;
    }
}
```

## Writing script resources in extensions

We can define the script in the `test-package\assets\` resource folder that we just registered, and we'll start by creating a script `foo.ts` that

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

> **Note**: In order to use the cc definitions, we need to copy the definition file of `{project directory}\temp\declarations` to the extension directory.

## Importing extension injected script resources

Earlier we created a new extension `test-package` that injects the resources under the `test-package\assets` path into the resource database.

In the project's script `bar.ts` we can import the `foo.ts` script in the following way.

```typescript
/// bar.ts
import { value, Foo } from 'db://test-package/foo';