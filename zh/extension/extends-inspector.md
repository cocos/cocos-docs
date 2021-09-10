# 扩展 Inspector

Inspector 是在 **属性检查器** 里展示的组件控件面板，有时候我们需要对自己书写的 Component 定义一份 Inspector，用自定义的方式对组件属性显示样式的修改。如最经典的 Widget 组件的样式就是通过扩展 inspector 获得的。

![extend inspector](assets/extend-inspector.png)

下面让我们进行一次简单的扩展，步骤如下：

1. 在 Component 中注明自定义 Inspector 的扩展文件
2. 创建自定义 Inspector 的扩展包
3. 在扩展包中编写自定义 Inspector 的扩展文件

## 在 Component 中注明自定义 Inspector 的扩展文件

首先我们需要定义一份 Component 脚本，并且为这个脚本注明使用自定义 Inspector，方法如下：

```javascript
cc.Class({
  name: 'Foobar',
  extends: cc.Component,
  editor: {
    inspector: 'packages://foobar/inspector.js',
  },
  properties: {
    foo: 'Foo',
    bar: 'Bar'
  },
});
```

**注意1:** 这里我们定义了一个 `editor` 字段，并在该字段中定义了 `inspector` 文件。编辑器会自动根据 `inspector.js` 文件内定义的 Vue 模板在 `inspector` 面板中生成对应框架。

**注意2:** 在 `inspector` 中我们采用 `packages://` 协议定义文件路径。Cocos Creator 会将 `packages://` 协议后面的分路径名当做扩展包名字进行搜索，并根据搜索结果将整个协议替换成扩展包的路径并做后续搜索。

## 创建自定义 Inspector 的扩展包

和我们创建一份扩展包没有任何区别，你可以按照 [你的第一个扩展包](your-first-extension.md) 中的方式创建一份 `main.js` 和 `package.json` 文件。这里我们假设我们的扩展包名为 foobar。

注意，在创建完扩展包后，你需要重启一下 Cocos Creator 以便让它正确读入该扩展包。

## 在扩展包中编写自定义 Inspector 的扩展文件

接下来我们就可以在 `foobar` 包中定义 `inspector.js`：

```javascript
// target 默认指向 Componet 自定义组件
Vue.component('foobar-inspector', {
  // 修改组件在 inspector 的显示样式
  template: `
    <ui-prop v-prop="target.foo"></ui-prop>
    <ui-prop v-prop="target.bar"></ui-prop>
  `,

  props: {
    target: {
      twoWay: true,
      type: Object,
    },
  },
});
```

Cocos Creator 的 Inspector 扩展使用了 [Vue](http://vuejs.org/)。这里我们通过定义一份 Vue 的组件，并在组件中定义 `props`，使得其包含 `target` 数据来完成整个 Inspector 的数据定义。

该 `target` 就是我们的 `Foobar` Class 在 Inspector 中对应的实例。

## 关于 target

上一小节中提到的 `target` 实例是经过 Inspector 处理过的 target。其内部包含了对属性的加工处理。在使用的时候，我们不能简单的认为 `target.foo` 就代表 foo 的值。如果你去查看 `target.foo` 你会发现它是一个 Object 而不是我们在最开始定义的那样一个 'Foo' 的字符串。该份 Object 中包含了 `attrs`、`type`、`value` 等信息。其中的 `value` 才是我们真正的值。

这么做的目的是为了让 Inspector 可以更好的获得数据可视化的各方面信息。例如当你定义了 cc.Class 的属性为：

```javascript
properties: {
  foo: {
    default: 'Foo',
    readonly: true
  }
}
```

这个时候在 Inspector 中的 target 里反应出的信息为 `target.foo.value` 为 'Foo'，`target.foo.attrs.readonly` 为 `true`。这些信息有助于帮助你创建多变的界面组合。

## 关于属性绑定

由于这些信息非常繁琐，Cocos Creator 也对 Vue 的 directive 做了一定的扩展。目前我们扩展了 `v-prop`，`v-value`，`v-readonly` 和 `v-disable`。

当你还是想利用 Cocos Creator 的默认方案显示数据段时，你可以使用 `v-prop` 配合 `<ui-prop>` 控件做绑定，如：

```html
<ui-prop v-prop="target.foo"></ui-prop>
```

当你想使用 `<ui-xxx>` 的原生控件时，你可以使用 `v-value` 来做数据绑定，如：

```html
<ui-input v-value="target.foo.value"></ui-input>
```

当你想对控件应用 readonly 或者 disable 行为时，请使用 `v-readonly` 和 `v-disable`。如：

```html
<ui-button v-readonly="target.foo.attrs.readonly">Foo</ui-button>
<ui-button v-disable="target.bar.value">Bar</ui-button>
```
