# Localization Editor Api

## 快速开始

### 核心功能 `l10n`

l10n 提供了核心翻译功能以及 ICU 功能，同时也提供的切换语言的功能。

我们会将切换后的目标语言存储于 `localStorage` 中，同时也会自动重启项目运行时，并在下次启动时读取 `localStorage` 配置以完成整个语言切换流程。

> **注意**：因此我们希望用户在切换语言之前务必处理好数据持久化工作。

### 导入 `l10n` 模块

localization-editor 所提供的所有 API 都将从 db://localization-editor/l10n 进行具名导入，导入示例如下：

```typescript
import { l10n } from 'db://localization-editor/l10n'
```

### 使用翻译api

```typescript
// 任意 component 组件代码中

// l10n 是 localization 的核心功能
import { l10n } from 'db://localization-editor/l10n'
import { _decorator, Label, Component } from 'cc';

@ccclass('SomeComponent')
class SomeComponent extends Component {
    // ......
    someMethod() {
        // 将返回 this_is_an_apple 所对应文案
        const text = l10n.t("this_is_an_apple")
    }
    // ......
}
```

## API详细说明

- 类:[`L10nManager`](#l10nmanager)

---

- 接口:[`ResourceList`](#resourcelist)

- 接口:[`ResourceBundle`](#resourcebundle)

- 接口:[`ResourceData`](#resourcedata)

- 接口:[`ResourceItem`](#resourceitem)

- 接口:[`FallbackLanguageObjectList`](#fallbacklanguageobjectlist)

- 接口:[`L10nOptions`](#l10noptions)

- 接口:[`StandardOption`](#standardoption)

---

- 枚举:[`L10nListenEvent`](#l10nlistenevent)

---

- 别名:[`L10nKey`](#别名)

- 别名:[`L10nValue`](#别名)

- 别名:[`TextInfoDirection`](#别名)

- 别名:[`FallbackLanguage`](#别名)

---

## `L10nManager`

导入示例：

```ts
import { L10nManager } from 'db://localization-editor/l10n'
```

描述：

通常我们不建议您自行使用或构造该类型。

而我们提供了[`l10n`](#l10n)作为全局单例以使用翻译功能。

---

### 索引

#### 构造函数

- `L10nManager` **private**

---

#### 全局变量

#### `l10n`

定义: `const l10n: L10nManager`

---

### 静态属性

#### `LOCAL_STORAGE_LANGUAGE_KEY`

定义: `static LOCAL_STORAGE_LANGUAGE_KEY: string`

描述: 当调用[`changeLanguage`](#changelanguage)切换游戏语言时，将使用`localStorage`
存储所切换的目标语言标记，并且使用[`LOCAL_STORAGE_LANGUAGE_KEY`](#localstoragelanguagekey)作为`localStorage`的key

备注：

| 默认值 | localization-editor/language |
|-----|------------------------------|
---

### 实例方法

#### `config`

定义: `config(options: L10nOptions): void`

描述: 用于配置l10n的某些设置，探索更多选项可以查看[`L10nOptions`](#l10noptions)

用例:

```ts
l10n.config({
    // 用于在默认语言没有找到相应翻译时，以该值进行补充显示
    fallbackLanguage: 'zh-Hans-CN',
    // 如果不喜欢LOCAL_STORAGE_LANGUAGE_KEY的默认值，可以在此修改，但是需要确保在changeLanguage之前
    localStorageLanguageKey: 'localization-editor/langauge'
})

```

---

##### `changeLanguage`

定义: `changeLanguage(language: Intl.BCP47LanguageTag): void`

描述: 用于动态切换语言，请查看[`BCP47 Language Tag`](https://www.techonthenet.com/js/language_tags.php)以获得更多信息

用例:

```ts
l10n.changeLanguage('zh-Hans-CN')
```

> **注意**: 在调用此方法后，会自动重启游戏，请务必做好数据持久化工作。

---

##### `t`

定义: `t(key: L10nKey, options?: StandardOption): L10nValue`

描述: 根据传入的L10nKey，返回当前语言数据中所对应的L10nValue，探索更多选项可以查看[`StandardOption`](#standardoption)

用例:

```ts
console.log(l10n.t('this_is_apple'))
// 这是一个苹果
```

> **注意**: 语言数据需要配合 Localization Editor 插件在编译后生成。
---

##### `exists`

定义: `exists(key: L10nKey): boolean`

描述: 返回是否存在key

用例:

```ts
console.log(l10n.exists('test_key'))
```

---

##### `currentLanguage`

定义: `get currentLanguage(): Intl.BCP47LanguageTag`

描述: 返回当前语言的[`BCP47 Language Tag`](https://www.techonthenet.com/js/language_tags.php)

用例:

```
console.log(l10n.currentLanguage)
// 'zh-Hans-CN'
```

---

##### `languages`

定义: `get languages(): readonly Intl.BCP47LanguageTag[]`

描述: 返回当前可用语言的[`BCP47 Language Tag`](https://www.techonthenet.com/js/language_tags.php)数组，可利用该方法作为切换语言下拉框的数据源

用例:

```ts
console.log(l10n.languages)
// ['zh-Hans-CN', 'en-US']
```

---

##### `direction`

定义: `direction(language?: Intl.BCP47LanguageTag): TextInfoDirection`

描述: 绝大多数语言都尊崇从左到右的阅读习惯，但某些语言却例外比如阿拉伯语，此方法可以得知所传入语言的[TextInfoDirection](#textinfodirection)

用例:

```ts
console.log(l10n.direction('ar'))
// 'rtl'
```

---

##### `on`

定义: `on(event: L10nListenEvent, callback: (...args: any[]) => void)`

描述: 用于注册[l10n](#l10n)的[L10nListenEvent](#l10nlistenevent)事件回调，比如`languageChanged`

用例:

```ts
l10n.on(L10nListenEvent.languageChanged, (...args: any[]) => {
    //在切换语言后的一些操作，某些数据可以放在这里持久化，之后便会重启整个游戏场景
})
```

---

##### `off`

定义: `off(event: L10nListenEvent, callback: (...args: any[]) => void)`

描述: 用于反注册[l10n](#l10n)的[L10nListenEvent](#l10nlistenevent)事件回调

> ***请务必使on与off成对出现，确保正确的销毁无用数据***

---

## 别名

| 别名                  | 原类型                                                                                                                                                       |
|---------------------|-------------------------------------|
| `L10nKey`           | `string`                                                                                                                                                  |
| `L10nValue`         | `string`                                                                                                                                                  |
| `TextInfoDirection` | `'ltr' / 'rtl'`                                                                                                                                           |
| `FallbackLanguage`  | `string / readonly string[] / FallbackLanguageObjectList / ((language: Intl.BCP47LanguageTag) => string / readonly string[] / FallbackLanguageObjectList` |
---

## 接口

### `L10nOptions`

| 函数/变量名                    | 类型                                  | 可选  |
|---------------------------|-------------------------------------|-----|
| `fallbackLanguage`        | `false` / [`FallbackLanguage`](#别名) | 是   |
| `localStorageLanguageKey` | `string`                            | 是   |
| `beforeTranslate`         | `(key: L10nKey) => L10nValue`       | 是   |
| `afterTranslate`          | `(key: L10nKey) => L10nValue`       | 是   |
| `returnNull`              | `boolean`                           | 是   |
| `returnEmptyString`       | `boolean`                           | 是   |

---

### `ResourceList`

| 函数/变量名             | 类型                        | 可选  |
|--------------------|---------------------------|-----|
| `defaultLanguage`  | `Intl.BCP47LanguageTag`   | 是   |
| `fallbackLanguage` | `Intl.BCP47LanguageTag`   | 是   |
| `languages`        | `Intl.BCP47LanguageTag[]` | 否   |

### `ResourceBundle`

| 函数/变量名                              | 类型                              | 可选  |
|-------------------------------------|---------------------------------|-----|
| `[language: Intl.BCP47LanguageTag]` | [`ResourceData`](#resourcedata) | 否   |

---

### `ResourceData`

| 函数/变量名                | 类型                              | 可选  |
|-----------------------|---------------------------------|-----|
| `[namespace: string]` | [`ResourceItem`](#resourceitem) | 否   |

---

### `ResourceItem`

| 函数/变量名          | 类型    | 可选  |
|-----------------|-------|-----|
| `[key: string]` | `any` | 否   |

---

### `FallbackLanguageObjectList`

| 函数/变量名               | 类型                  | 可选  |
|----------------------|---------------------|-----|
| `[language: string]` | `readonly string[]` | 否   |

---

### `StandardOption`

| 函数/变量名             | 类型                        | 可选  |
|--------------------|---------------------------|-----|
| `count`            | `number`                  | 是   |
| `defaultValue`     | `L10nValue`               | 是   |
| `language`         | `Intl.BCP47LanguageTag`   | 是   |
| `fallbackLanguage` | [`FallbackLanguage`](#别名) | 是   |

---

## 枚举

### `L10nListenEvent`

| 函数/变量名            | 类型                |
|-------------------|-------------------|
| `languageChanged` | `languageChanged` |
| `onMissingKey`    | `missingKey`      |
