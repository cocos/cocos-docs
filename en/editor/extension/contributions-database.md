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

In order to write `ts` script resources in the extension, copy `{project directory}\temp\declarations` to the extension directory.
This will provide the `cc` related script definitions.

## Importing extension injected script resources

Earlier, the documentation demonstrated creating a new extension, `test-package`, which injects the resources under the `test-package\assets` path into the resource database.
Assuming that the `test-package\assets` path has a script `foo.ts`:

```typescript
/// test-package\assets\foo.ts
export const value = 123;
```

In the project's script, `bar.ts` should be imported in the following way:

```typescript
/// bar.ts
import { value } from "db://test-package/foo";
```
