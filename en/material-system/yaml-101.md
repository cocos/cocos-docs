# YAML 101

Cocos Creator 3.0 uses a parser that conforms to the YAML 1.2 standard, which means that Creator is fully compatible with JSON, and use JSON directly without any problems.

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
      # ... hash sign for comments
    }]
  }]
```

But of course it would be cumbersome and error-prone, so what YAML provides is a much simpler representation of the same data:

- All quotation marks and commas can be omitted

  ```yaml
  key1: 1
  key2: unquoted string
  ```

  > **Note**: never omit the space after colon

- Like Python, indentation is part of the syntax, representing hierarchy of the data<sup id="a1">[1](#f1)</sup>

  ```yaml
  object1:
    key1: false
  object2:
    key2: 3.14
    key3: 0xdeadbeef
    nestedObject:
      key4: 'quoted string'
  ```

- Array elements are represented by dash+space prefix

  ```yaml
  - 42
  - "double-quoted string"
  - arrayElement3:
      key1: punctuations? sure.
      key2: you can even have {}s as long as they are not the first character
      key3: { nested1: 'but no unquoted string allowed inside brackets', nested2: 'also notice the comma is back too' }
  ```

With these in mind, the effect manifest at the beginning of this document can be re-write as follows:

```yaml
techniques:
- passes:
  - vert: skybox-vs
    frag: skybox-fs
    rasterizerState:
      cullMode: none
    # ...
```

Another YAML feature that comes in handy is referencing and inheriting between data.

- **Reference**

  ```yaml
  object1: &o1
    key1: value1
  object2:
    key2: value2
    key3: *o1
  ```

  This is its corresponding JSON:

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

- **Inheritance**

  ```yaml
  object1: &o1
    key1: value1
    key2: value2
  object2:
    <<: *o1
    key3: value3
  ```

  The corresponding JSON:

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

For our purposes, like when multiple pass has the same properties, etc. it could be really helpful:

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

Finally, before writing any YAML, wrap it in a **CCEffect** block first:

```yaml
CCEffect %{
  # YAML starts here
}%
```

You can always refer to any [online YAML JSON converter](https://codebeautify.org/yaml-to-json-xml-csv) to play around ideas.

## Reference Link

- [YAML on Wikipedia](https://en.wikipedia.org/wiki/YAML)
- [YAML.org Spec](https://yaml.org/spec/1.2/spec.html)

<b id="f1">[1]</b> The YAML standard doesn't support tabs, so the effect compiler will try to replace all the tabs in file with 2 spaces first, to avoid the trivial yet annoying trouble of accidentally inserting tabs somewhere. But overall, please try to avoid doing that completely to make sure the compilation goes smoothly. [↩](#a1)<br>
