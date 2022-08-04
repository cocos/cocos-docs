# 示例

## 导入

导入示例：

```ts
import l10n from 'db://localization-editor/core/L10nManager'
```

- 描述：l10n以api的方式提供了在代码中翻译文本的能力

## 动态切换语言

代码示例如下：

```ts
l10n.changeLanguage('zh-Hans-CN')
```

参数类型请参考 查看 [BCP47 Language Tag](https://www.techonthenet.com/js/language_tags.php) 以获得更多信息。

> **注意**: 在调用此方法后，会自动重启游戏，请务必做好数据持久化工作。

- 接口定义： `t(key: L10nKey, options?: StandardOption): L10nValue`

## 根据键获取 L10N 的值

```ts
console.log(l10n.t('this_is_apple'))
// 这是一个苹果
```

此处可以获取到以 `this_is_apple` 为键的当前语言的值。

## 查询某个键是否存在

代码示例如下：

```ts
console.log(l10n.exists('test_key'))
```

### 获取当前的语言

代码示例如下：

```ts
console.log(l10n.currentLanguage)
// 'zh-Hans-CN'
```

返回当前语言的 [BCP47 Language Tag](https://www.techonthenet.com/js/language_tags.php)。

### 获取所有可用语言

代码示例如下：

```ts
console.log(l10n.languages)
// ['zh-Hans-CN', 'en-US']
```

返回当前可用的语言的 [BCP47 Language Tag](https://www.techonthenet.com/js/language_tags.php) 数组。

## 获取语言的方向

绝大多数语言都遵循从左到右的阅读习惯，但某些语言却例外比如阿拉伯语，此方法可以得知所传入语言的 `TextInfoDirection`

```ts
console.log(l10n.direction('ar'))
// 'rtl'
```
