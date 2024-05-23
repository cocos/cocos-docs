# Working with Vue

If you have already mastered the interface writing method in the [writing panel interface](writing-your-panel.md) section, one might think that writing the interface is a bit cumbersome. Is it possible to use some front-end interface frameworks to improve the efficiency of interface writing? The answer is yes. Cocos Creator supports many interface frameworks such as [Vue](http://vuejs.org/), [React](https://facebook.github.io/react/), [Polymer](http://polymer-project.org/) and so on.

During testing, [Vue](http://vuejs.org/) was found to be very consistent with the overall design ideas of Cocos Creator. This section will focus on how to use [Vue](http://vuejs.org/) to write a panel interface in Cocos Creator.

## Deploy Vue

In fact, there isn't any preparation work, the panel window of Cocos Creator will load Vue by default when it is opened.

## Initialize the Vue panel

The Vue panel can be initialized in the `ready()` function. The initialization method is as follows:

```javascript
ready () {
  new window.Vue({
    el: this.shadowRoot,
  });
}
```

By passing in the shadow root element of `panel-frame`, Vue can generate a vm under the element node.

Look at a more detailed usage example:

```javascript
Editor.Panel.extend({
  style: `
    :host {
      margin: 10px;
    }
  `,

  template: `
    <h2>A Simple Vue Panel</h2>

    <input v-model="message">
    <p>Input Value = <span>{{message}}</span></p>
  `,

  ready () {
    new window.Vue({
      el: this.shadowRoot,
      data: {
        message: 'Hello World',
      },
    });
  },
});
```

## Data binding

Vue's data binding rules can be defined in the `template` keyword of the panel. Then pass the `data` keyword defined in Vue
Write binding data in to complete the entire operation.

Specific examples are as follows:

```javascript
Editor.Panel.extend({
  template: `
    <ui-button>{{txtOK}}</ui-button>
    <ui-button v-if="showCancel">{{txtCancel}}</ui-button>
    <ui-input v-for="item in items" value="{{item.message}}"></ui-input>
  `,

  ready () {
    new window.Vue({
      el: this.shadowRoot,
      data: {
        txtOK: 'OK',
        txtCancel: 'Cancel',
        showCancel: false,
        items: [
          { message: 'Foo' },
          { message: 'Bar' },
        ]
      },
    });
  },
});
```

## Event binding

In addition to using data binding, events and methods can be binded together through Vue's `@` method. It’s worth noting that the bound method must be defined in the `methods` keyword in the Vue definition.

Specific examples are as follows:

```javascript
Editor.Panel.extend({
  template: `
    <ui-button @confirm="onConfirm">Click Me</ui-button>
  `,

  ready () {
    new window.Vue({
      el: this.shadowRoot,
      methods: {
        onConfirm ( event ) {
          event.stopPropagation();
          console.log('On Confirm!');
        },
      },
    });
  },
});
```
