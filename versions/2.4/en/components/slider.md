# Slider component reference

Slider is a slider component, For the production of UI components such as volume adjustment.

![slider-content](./slider/slider-content.png)

![slider-inspector](./slider/slider-inspector.png)

Click the **Add Component** button at the bottom of the **Properties** panel and select **Slider** from **UI Component**. You can then add the Slider component to the node.

Please refer to the script interface of the slider [Slider API](%__APIDOC__%/en/classes/Slider.html)

## Slider properties

| Property     | Function explanation |
| -------------- | ----------- |
| handle         | Slider button parts can be adjusted through the button to adjust the size of the Slider value |
| direction      | The direction of the slider is divided into horizontal and vertical |
| progress       | Current progress value, the value of the interval is between 0-1 |
| slideEvents    | Slider component event callback function |

## Slider event

![slider-event](./slider/slider-event.png)

| Attributes      | Function explanation |
| --------------  | ----------- |
| Target          | Node with script component |
| Component       | Script component name |
| Handler         | Specifies a callback function that will be called when the Slider event occurs |
| CustomEventData | The user specifies an arbitrary string as the last argument of the event callback |

Slider event callback has two parameters, the first parameter is the Slider itself, the second parameter is CustomEventData

## Detailed explanation

The Slider is usually used to adjust the value of the UI (for example, volume adjustment), and its main component is a slider button, which is used for user interaction. You can adjust the value of the Slider through this part.

Usually a Slider node tree as shown below:

![slider-hierarchy](./slider/slider-hierarchy.png)

## Add a callback by script code

### Method one

The event callback added by this method is the same as the event callback added by the editor, all added by code. First you need to construct a `cc.Component.EventHandler` object, and then set the corresponding `target`, `component`, `handler` and `customEventData` parameters.

```js
var sliderEventHandler = new cc.Component.EventHandler();
sliderEventHandler.target = this.node; // Is the node of your event handling code component
sliderEventHandler.component = "cc.MyComponent"
sliderEventHandler.handler = "callback";
sliderEventHandler.customEventData = "foobar";

slider.slideEvents.push(sliderEventHandler);

// here is your component file
cc.Class({
    name: 'cc.MyComponent'
    extends: cc.Component,

    properties: {
    },

    callback: function(slider, customEventData) {
        // Where slider is a cc.Slider object
        // Where the customEventData parameter is equal to the "foobar"
    }
});
```

### Method two

By `slider.node.on('slide', ...)` way to add

```js
// Suppose we add event handling callbacks to the onLoad method of a component and perform event handling in the callback function:

cc.Class({
    extends: cc.Component,


    properties: {
       slider: cc.Slider
    },

    onLoad: function () {
       this.slider.node.on('slide', this.callback, this);
    },

    callback: function (Slider) {
       // The parameter of the callback is the Slider component.
       // do whatever you want with Slider
    }
});
```
