# Extending UI Kit

If perhaps the built-in interface elements of Cocos Creator still cannot meet developer needs, the elements can be customized to extend the UI Kit.

The extension of UI Kit is based on HTML5's [Custom Elements](http://www.html5rocks.com/en/tutorials/webcomponents/customelements/) standard.

Using `Editor.UI.registerElement(tagName, prototype)` custom elements can be registered. Consider the following simple example:

```javascript
Editor.UI.registerElement('foobar-label', {
  template: `
    <div class="text">Foobar</div>
  `,

  style: `
    .text {
      color: black;
      padding: 2px 5px;
      border-radius: 3px;
      background: #09f;
    }
  `
});
```

Using the above code `<foobar-label>` can be registered in the editor.

For more options for custom element definition, please review the [Custom Interface Element Definition Reference](reference/custom-element-reference.md) documentation.

## Content Distribution

Sometimes content needs to be added to the custom element. In order to allow the custom element to handle the content correctly, it needs to be described in the template through the `<content>` tag. This process is called **content distribution**.

Taking the above example, suppose `<foobar-label>` not only needs to display `Foobar`, but also display according to the content being added, for example:

```javascript
<foobar-label>Hello World</foobar-label>
```

At this time, using a custom content distribution function is neeced. Make just a small change to the previous example:

```javascript
template: `
  <div class="text">
    <content></content>
  </div>
`
```

By using the `<content>` tag tells the boilerplate to place user content in this place.

## Content distribution selector

Sometimes the content of custom elements is not just text, but some composite elements. When distributing content, some elements are under certain tags and some elements are located in other tags. At this time, consider using the content distribution selector. Consider the following example:

```javascript
<foobar-label>
  <div class="title">Hello World</div>
  <div class="body">This is Foobar</div>
</foobar-label>
```

To treat the contents of `.title` and `.body` elements differently, consider the following code:

```javascript
template: `
  <div class="text title">
    <content select=".title"></content>
  </div>
  <div class="text body">
    <content select=".body"></content>
  </div>
`
```

By adding the `select` attribute to the `<content>` tag, it is possible to use selectors to distribute content.
