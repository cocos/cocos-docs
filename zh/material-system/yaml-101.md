# YAML 101

YAML 是一门面向数据序列化的，对人类书写十分友好的语言，但它引入了一些独特的语法来表示不同类型的数据，对于不熟悉这门语言的开发者可能会有一点门槛，我们在本篇文章中快速总结了最常用的一些语法和语言特性，有需要可以参考。

Cocos Creator 3.0 使用的是符合 YAML 1.2 标准的解析器，这意味着 Creator 是与 JSON 完全兼容的，直接使用 JSON 完全不会有问题。

```yaml
"techniques":
  [{
    "passes":
    [{
      "vert": "skybox-vs",
      "frag": "skybox-fs",
      "rasterizerState":
      {
        "cullMode": "none"
      }
      # ...
    }]
  }]
```

当然这也意味着繁琐的语法，所以 YAML 提供了一些更简洁的数据表示方式：

- 所有的引号和逗号都可以省略

  ```yaml
  key1: 1
  key2: unquoted string
  ```

  > **注意**：冒号后的空格不可省略

- 行首的空格缩进数量代表数据的层级<sup id="a1">[1](#f1)</sup>

  ```yaml
  object1:
    key1: false
  object2:
    key2: 3.14
    key3: 0xdeadbeef
    nestedObject:
      key4: 'quoted string'
  ```

- 以 **连字符** + **空格** 开头，表示数组元素

  ```yaml
  - 42
  - "double-quoted string"
  - arrayElement3:
      key1: punctuations? sure.
      key2: you can even have {}s as long as they are not the first character
      key3: { nested1: 'but no unquoted string allowed inside brackets', nested2: 'also notice the comma is back too' }
  ```

综合以上几点，文档开头的 effect 内容就可以很简洁地写成这样：

```yaml
techniques:
- passes:
  - vert: skybox-vs
    frag: skybox-fs
    rasterizerState:
      cullMode: none
    # ...
```

另一个非常有用的 YAML 特性是数据间的引用与继承。

- **引用**

  ```yaml
  object1: &o1
    key1: value1
  object2:
    key2: value2
    key3: *o1
  ```

  这个数据解析出来是这样的：

  ```json
  {
    "object1": {
      "key1": "value1"
    },
    "object2": {
      "key2": "value2",
      "key3": {
        "key1": "value1"
      }
    }
  }
  ```

- **继承**

  ```yaml
  object1: &o1
    key1: value1
    key2: value2
  object2:
    <<: *o1
    key3: value3
  ```

  这个数据解析出来是这样的：

  ```json
  {
    "object1": {
      "key1": "value1",
      "key2": "value2"
    },
    "object2": {
      "key1": "value1",
      "key2": "value2",
      "key3": "value3"
    }
  }
  ```

对应到我们的 effect 中，比如多个 pass 拥有相同的 property 内容，或很多其他情景下，都可以很方便地复用数据：

```yaml
techniques:
- passes:
  - # pass 1 specifications...
    properties: &props # declare once...
      p1: { value: [ 1, 1, 1, 1 ] }
      p2: { sampler: { mipFilter: linear } }
      p3: { inspector: { type: color } }
  - # pass 2 specifications...
    properties: *props # reference anywhere
```

若有疑问可复制代码示例到任何 [在线 YAML JSON 转换器](https://codebeautify.org/yaml-to-json-xml-csv) 观察生成的数据。

## 参考链接

- <https://en.wikipedia.org/wiki/YAML>
- <https://yaml.org/spec/1.2/spec.html>

<b id="f1">[1]</b> 标准 YAML 并不支持制表符，但在解析 effect 数据时，我们会先尝试把其中所有的制表符替换为 2 个空格，以避免偶然插入制表符带来的琐碎的麻烦。但整体上，请一定尽量避免插入制表符来确保编译无误。[↩](#a1)<br>
