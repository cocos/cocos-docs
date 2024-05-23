# 废弃 API

## 框架说明

为了更友好和便利的维护废弃 `API`，将通过三个函数来实现：

- `markAsWarning` 对给予对象上的属性中嵌入一个警告，给予对象需要存在该属性。

- `removeProperty` 重新定义给予对象上移除的属性，并嵌入一个报错，给予对象应不存在该属性。

- `replaceProperty` 重新定义给予对象上移除的属性，并嵌入一个警告和调用新的属性，参数不兼容的需要进行适配，给予对象应不存在该属性。

## 函数签名

```typescript
interface IRemoveItem {
    /** 废弃属性的名称 */
    name: string;
    /** 警告的次数 */
    logTimes?: number;
    /** 额外建议 */
    suggest?: string;
}

interface IMarkItem {
    /** 废弃属性的名称 */
    name: string;
    /** 警告的次数 */
    logTimes?: number;
    /** 额外建议 */
    suggest?: string;
}

interface IReplacement {
    /** 废弃属性的名称 */
    name: string;
    /** 警告的次数 */
    logTimes?: number;
    /** 替换属性的名称 */
    newName?: string;
    /** 废弃属性的所属对象 */
    target?: object;
    /** 废弃属性的所属对象的名称 */
    targetName?: string;
    /** 自定义替换属性（函数） */
    customFunction?: Function;
    /** 自定义替换属性的 setter */
    customSetter?: (v: any) => void;
    /** 自定义替换属性的 getter */
    customGetter?: () => any;
}

export let removeProperty: (owner: object, ownerName: string, properties: IRemoveItem[]) => void;

export let markAsWarning: (owner: object, ownerName: string, properties: IMarkItem[]) => void;

export let replaceProperty: (owner: object, ownerName: string, properties: IReplacement[]) => void;

/** 此函数用于设置全局默认的信息输出次数 */
export function setDefaultLogTimes (times: number): void;
```

## 使用规范

按照模块划分，每个模块维护一份废弃文件。为了便于维护，命名统一为 deprecated.ts，并且放在相应模块的目录下，并需要在相应的模块的`index.ts`文件中`import`该文件，例如`import './deprecated'`。

**注：`cocos\utils`目录下的`deprecated.ts`文件为声明和实现文件**。

## 使用示例

```typescript
// 对于替换参数不兼容的 API，通过合适的自定义功能进行适配
replaceProperty(Animation.prototype, 'Animation.prototype', [
    {
        name: 'removeClip',
        newName: 'removeState',
        customFunction: function (...args: any) {
            const arg0 = args[0] as AnimationClip;
            return Animation.prototype.removeState.call(this, arg0.name);
        }
    }
]);

replaceProperty(vmath, 'vmath', [
    {
        name: 'vec2',
        newName: 'Vec2',
        target: math,
        targetName: 'math',
        'logTimes': 1
    },
    {
        name: 'EPSILON',
        target: math,
        targetName: 'math',
        'logTimes': 2
    }
]);

removeProperty(vmath, 'vmath', [
    {
        'name': 'random',
        'suggest': 'use Math.random.'
    }
]);

markAsWarning(math, 'math', [
    {
        'name': 'toRadian'
    }
]);
```

## 使用注意

- 操作目标都是对象，如果想要修改类的成员函数，请传入**target.prototype**。

- `replaceProperty`不传入`newName`或`newTarget`，表示和`name`或`target`一致。

- 如果要控制次数，最好在使用之前调用`setDefaultLogTimes`，因为别的模块可能会把默认次数改了。
