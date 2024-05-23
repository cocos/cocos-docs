# Extend existing functionality

**Cocos Creator** supports contributions between extensions.

When writing an extension, it is possible to query whether the existing functions in the editor provide the ability of receiving `contributions` externally.

If there are functions that provide the ability of receiving `contributions` externally, use these functions when writing extensions.

## Contribution data definition

In `package.json` the `contribution` field can be defined.

```json
{
    "name": "hello-world",
    "contributions": {}
}
```

`contributions` definition:

```typescript
interface contributions {
    [name: string]: any;
}
```

The `name` is the name of the function or extension, and the `value` is of type `any`, which is defined by the author of the `name` function (extension).

At this stage, only `contributions` to the internal functions of the editor is opened, in the future a more convenient way of using `contributions` between extensions will be provided.
