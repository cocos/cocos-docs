
# 默认值处理

序列化对象属性时，序列化过程可根据属性的值是否是默认的来优化此属性的存储。若属性启用了这一机制，在反序列化过程中，可能不会再设置此属性。

# 指定默认值

仅有类型化对象可以指定默认值。

默认情况下，Cocos Creator 通过求值类字段的初始化式表达式来获取属性的默认值：

```ts
@ccclass class Foo {
    @property numberField = 1;
    @property stringField = 'cocos';
    @property nullField = null;
}
```

类 `Foo` 中，属性 `numberField` 的默认值是 `1`；属性 `stringField` 的默认值是 `'cocos'`；属性 `nullField` 的默认值是 `null`。

Cocos Creator 会在执行至类字段定义处进行一次求值，并在整个运行期间使用该默认值。这意味着，在求值过程中可能引发难以察觉的边界效应：

```ts
let count = 0;
@ccclass class Foo {
    @property id = count++;
}
```

类 `Foo` 的属性 `id` 的默认值指定为 `0`。然而后续每次构造该类的对象时，属性 `id` 是从 `1` 开始的。

<!--
可以通过向属性应用装饰器 `@noDefault` 来禁止这个默认行为：

```ts
let count = 0;
@ccclass class Foo {
    @property @noDefault id = count++;
}
```
!-->
