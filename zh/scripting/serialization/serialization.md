# 序列化过程

序列化将运行时的值转换为可取用的格式。其后，可以通过反序列化过程还原此值。

## 值类别

### 基础类型

JavaScript 基础类型的值可被序列化，包括：

- [Boolean](https://tc39.es/ecma262/#sec-ecmascript-language-types-boolean-type)

- [Number](https://tc39.es/ecma262/#sec-ecmascript-language-types-number-type)

- [String](https://tc39.es/ecma262/#sec-ecmascript-language-types-string-type)

但以下类型的值将不会被序列化：

- [Undefined](https://tc39.es/ecma262/#sec-ecmascript-language-types-undefined-type)

- [BigInt](https://tc39.es/ecma262/#sec-ecmascript-language-types-bigint-type)

- [Symbol](https://tc39.es/ecma262/#sec-ecmascript-language-types-symbol-type)

### 函数类型

函数类型的值不会被序列化。

### Null 类型

[Null](https://tc39.es/ecma262/#sec-ecmascript-language-types-null-type) 类型的值可被序列化。

### 数组类型

数组类型的值可被序列化。对于值 `value`，Cocos Creator 通过 `Array.isArray(value)` 判定值是否为数组类型。

序列化时，数组的所有元素将被一一序列化。

反序列化时，将创建 JavaScript 数组，反序列化后的数组元素将被一一赋值回该数组。

### 对象类型

对象类型的值可被序列化。对于值 `value`，Cocos Creator 通过 `typeof value === object && value !== null && Array.isArray(false)` 判定值是否为对象类型。

由可控类创建的对象称为可控对象，其它对象称为普通对象。序列化对于这两种对象有不同的处理方式。

#### 普通对象

序列化普通对象时，对象所有自身的可枚举的属性将被序列化。对于值 `value`，Cocos Creator 通过等价于 `Object.keys(value)` 获取所有自身的可枚举的属性。

反序列化时，将创建原型链为 `Object.prototype` 的空对象，并将反序列化后的属性值一一赋值回该对象。

#### 可控对象

序列化可控对象时，所有标记为可序列化的字段将被序列化。

反序列化时，将创建该类的对象，并将反序列化后的字段一一赋值回该对象。
