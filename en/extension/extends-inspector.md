# Extends Inspector

**Inspector** is a component control interface that is displayed in the **Properties** panel. Sometimes it is necessary to define an Inspector for a custom compomnent, and display it in a custom way. For example, the special form of a Widget component is designed by extending the Inspector.

![extend inspector](assets/extend-inspector.png)

The steps are as follows:

1. Include the custom Inspector entry file in the component.
2. Create an extension package for the custom Inspector.
3. Write the custom Inspector entry file in the extension package.

## Register Inspector entry

First, define a Component script, and this script should use the custom Inspector. Example:

```javascript
cc.Class ({
  name: 'Foobar',
  extends: cc.Component,
  editor: {
    inspector: 'packages: //foobar/inspector.js',
  },
  properties: {
    foo: 'Foo',
    bar: 'Bar'
  },
});
```

> **Notes**:
>
> 1. Here an `editor` field and the `inspector` entry file is defined in this field. `inspector.js` will generate the corresponding frame.
> 2. In the `inspector` entry file, use the `packages://` protocol to define the path to the entry file. In Cocos Creator the `packages://` protocol plus the package name is mapped to the extension package folder.

## Create a custom Inspector extension package

Next, create an extension package in the normal workflow. Follow the [your first expansion package](your-first-extension.md) guide.
For the same of an example, assume the extension package is called `foobar`.

> **Note**: after creating the extension package, it is necessary to restart Cocos Creator so that the Inspector in extension package can be read correctly (not required for other extension functions).

## Writing a custom Inspector entry file in the extension package

Next, define `inspector.js` in the `foobar` package:

```javascript
Vue.component ('foobar-inspector', {
  template: `
    <ui-prop v-prop = "target.foo"> </ ui-prop>
    <ui-prop v-prop = "target.bar"> </ ui-prop>
  `

  props: {
    target: {
      twoWay: true,
      type: Object,
    },
  },
});
```

Cocos Creator's Inspector extension uses [vuejs](http://vuejs.org/) for UI. A vue component was defined above and `props` was set in the component so that it contains `target` data to complete the entire Inspector data definition.

The `target` is an instance of our `Foobar` class in the Inspector.

## About target

The `target` instance mentioned in the previous section is the target that has been processed by the Inspector.

When using `target`, it is not simply enough to think that `target.foo` contains the value of `foo`. Looking in Chrome DevTools and check `target.foo`, notice that it's an object rather than a `Foo` string that was defined at the beginning. The object contains `attrs`, `type`, `value` and other information. Where `value` is the value that is necessary to obtain.

The purpose of doing so is to make Inspector better access to all aspects of data visualization information. For example, when defining the properties of `cc.Class`:

```javascript
properties: {
    //There is a Default, Get or Set value need to be assigned.
    foo: {
        default: 'Foo',
        readonly: true
    }
}
```

This time in the Inspector notice that `target.foo.value` is `Foo`, and `target.foo.attrs.readonly` is `true`. This information helps to create various interface combinations.

## About attribute binding

Because this information is very cumbersome, Cocos Creator contains some expansion for Vue directives, including `v-prop`, `v-value`, `v-readonly` and `v-disable`.

When using Cocos Creator's default scheme to display the data segment, use `v-prop` with the `<ui-prop>` control to do the binding:

```html
<ui-prop v-prop = "target.foo"> </ui-prop>
```

When using the native control of `<ui-xxx>`, use `v-value` for data binding. Example:

```html
<ui-input v-value = "target.foo.value"> </ui-input>
```

To apply readonly or disable behavior to a control, use `v-readonly` and `v-disable`. Example:

```html
<ui-button v-readonly = "target.foo.attrs.readonly"> Foo </ui-button>
<ui-button v-disable = "target.bar.value"> Bar </ui-button>
```
