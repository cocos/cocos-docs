# Creating and using component script

## Creating component script

In Cocos Creator, script is also a part of the assets. You can add and select JavaScript or TypeScript to create a component script by clicking the **create** button in the **Assets** panel. By this time, you will get a new script in your **Assets** panel:

![create-script](assets/create-script.png)

There are already some preset blocks of code in the open script, as follows:

```javascript
cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    // update (dt) {},
});
```

## Editing script

We recommend that a popular editor is used, such as: Vim, Sublime Text, WebStorm, VSCode, etc. Each editor has advantages and disadvantages. Please set it up in [Settings](../getting-started/basics/editor-panels/preferences.md#data-editor) first.

When you finish editing the script and saving it, then returning to the Creator editor interface again, Creator will automatically detect the alteration of the script and compile it quickly.

## Adding script into the scene node

Adding the script into the scene node is actually adding a component to this node. Let's rename the new **NewScript.js** to **say-hello.js**. Then select the scene node you would like to add, by this time the property of this node will be shown in **Properties**.

There's an **Add Component** button at the very bottom of **Properties**. Click the button and choose **Add Custom Component -> say-hello** to add a new script component.

![add-script](assets/add-script.png)

If everything goes well, you will see your script shown in **Properties** :

![script-in-inspector](assets/script-in-inspector.png)

**Note:** You can also add script by dragging script asset into **Properties**.

---

Continue on to read about [Declare class with cc.Class](class.md).
