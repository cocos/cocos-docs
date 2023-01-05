# Sample

## Import

The code example is as follows:

```ts
import l10n from 'db://localization-editor/core/L10nManager'
```

- Description: l10n provides the ability to translate text in code as an api

## Switch Language at Runtime

The code example is as follows：

```ts
l10n.changeLanguage('zh-Hans-CN')
```

For more information, please refer to [BCP47 Language Tag](https://www.techonthenet.com/js/language_tags.php).

> **Note**: After calling this method, the game will be restarted automatically, so please make sure to do the data persistence.

- Interface definination： `t(key: L10nKey, options?: StandardOption): L10nValue`

## Get the value of L10N according to the key

```ts
console.log(l10n.t('this_is_apple'))
// This is an apple
```

Here you can get the value of the current language with `this_is_apple` as the key.

## Query

The code example is as follows:

```ts
console.log(l10n.exists('test_key'))
```

### Get the current language

The code example is as follows:

```ts
console.log(l10n.currentLanguage)
// 'zh-Hans-CN'
```

Returns the current language's [BCP47 Language Tag](https://www.techonthenet.com/js/language_tags.php)。

### Get all available languages

The code example is as follows:

```ts
console.log(l10n.languages)
// ['zh-Hans-CN', 'en-US']
```

Returns all available language's [BCP47 Language Tag](https://www.techonthenet.com/js/language_tags.php) as an array.

## Get directions to the language

Most languages follow a left-to-right reading convention, with the exception of some languages such as Arabic, where this method learns the `TextInfoDirection` of the incoming language

```ts
console.log(l10n.direction('ar'))
// 'rtl'
```
