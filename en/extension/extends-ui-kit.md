# Extend UI Kit

If the built-in interface elements of Cocos Creator cannot meet the development needs, don’t worry too much. The elements can be customized by extending the UI Kit.

The extension of UI Kit is based on HTML5's [Custom Elements](http://www.html5rocks.com/en/tutorials/webcomponents/customelements/) standard.

Through `Editor.UI.registerElement(tagName, prototype)` custom elements can easily be registered. The following is a simple example:

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

Using the above code the element `<foobar-label>` can be used in the editor.

For more information about custom element definition options, please review the [Custom Interface Element Definition Reference](reference/custom-element-reference.md) documentation.

## Content Distribution

Content can be added to custom elements. In order to allow the custom element to handle the content correctly, it needs to be described in the template through the `<content>` tag. This process is called "content distribution".

Taking the above example, suppose that `<foobar-label>` not only needs to display `Foobar`, but to display other content, use the following example:

```javascript
<foobar-label>Hello World</foobar-label>
```

At this time, use the content distribution function. Here is a change to a small example:

```javascript
template: `
  <div class="text">
    <content></content>
  </div>
`
```

By using the `<content>` tag to tell the boilerplate to place user content in this place.

## Content distribution selector

Sometimes the content of custom elements is not just text, but some composite elements. When distributing content, the hope is that some elements are under certain tags and some elements are located in other tags. Consider using the content distribution selector. Consider the following example:

```javascript
<foobar-label>
  <div class="title">Hello World</div>
  <div class="body">This is Foobar</div>
</foobar-label>
```

To treat the contents of `.title` and `.body` elements differently, use the following code:

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

By adding the `select` attribute to the `<content>` tag, use selectors to distribute content.
