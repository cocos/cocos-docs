# Create a list of dynamically generated content

We can build and edit static UI interfaces with __Scene__ panel easily, but in real world game project it's not enough. We'll need dynamically generated UI elements with data, such as character selection, inventory and level selection.

## Prepare data

Let's take an inventory interface as example, we need following data structure to generate an item dynamically:

- Item id
- Icon id, we can put up a icon id to spriteFrame reference dictionary or array
- Item name
- Item price

We will introduce how to define a data class and generate those data in __Inspector__ panel. If you're not familiar with component system of __Cocos Creator__, please start with [Workflow of script development](../../../scripting/index.md) documentation.

### Custom data class

For most game project, you can get inventory data from game server. For the simplicity let's define a data class for data structure and input. Let's add a new script `ItemList.js` and add the following properties:

```ts
@ccclass('Item')
export class Item {
    @property
    id = 0;
    @property
    itemName = '';
    @property
    itemPrice = 0;
    @property(SpriteFrame)
    iconSF: SpriteFrame | null = null;
}

@ccclass
export class ItemList extends Component {
    @property([Item])
    items: Item[] = [];
    @property(Prefab)
    itemPrefab: Prefab | null = null;

    onLoad () {
        for (let i = 0; i < this.items.length; ++i) {
            const item = instantiate(this.itemPrefab);
            const data = this.items[i];
            this.node.addChild(item);
            item.getComponent('ItemTemplate').init(data);
        }
    }
}
```

We defined an `Item` class at the top of the script for storing and easily updating data needed by item. Please notice this class does not extends `Component`, so it can be defined as a property type for any component. Please refer to the [Declare class](../../../scripting/decorator.md) documentation for additional details.

After the `Item` class definition, we defined a component class. Each script file can only contains one component definition and the component name will be the same as the file name. So the component we define is `ItemList`. In this component we have a list property which type is `Item`. This way we can populate the list with data input in __Inspector__ panel.

Now let's create an empty node and add `ItemList` component. We can find `Items` property in __Inspector__ panel. To populate data, let's give the list a length. Type `3` in the field and you can input data like these:

![item list](list-with-data/itemlist.png)

We have our data ready for now, you can also type in more data entries as you wish. If you're making a game with lots of data, please consider using more specialized data source like Excel and database. It's easy to convert such data sources to JSON for Cocos Creator.

## Make the view for data: Prefab as template

Now move on to the **view** to visualize data, we also need a template resource that can be used to instantiate each item at runtime. We can use [Prefab](../../../asset/prefab.md) to do this job. Let's create a prefab that looks like this:

![item template](list-with-data/item-template.png)

The child nodes `icon`, `name`, `price` will be used to display icon, item name and price from data.

### Data binding

You can freely customize the prefab as you need, the picture above only shows an example. Now we need a component script to bind the data to the components that show them. Create a new script `ItemTemplate.js` and add it to the prefab root node. The script contains:

```ts
@ccclass
export class ItemTemplate extends Component {
    @property
    public id = 0;
    @property(Sprite)
    public icon: Sprite | null = null;
    @property(Label)
    public itemName: Label | null = null;
    @property(Label)
    public itemPrice: Label | null = null;
}
```

Drag all those nodes onto the property fields of `ItemTemplate` component.

![item binding](list-with-data/item-binding.png)

> __Note__: we will assign value for `id` property through script, no data binding needed.

### Update template display with script

Modify `ItemTemplate.js` script to add function to update the renderer components with input data. Let's add the following to the end of script:

```ts
// data: { id, iconSF, itemName, itemPrice }
init(data: Item) {
    this.id = data.id;
    this.icon.spriteFrame = data.iconSF;
    this.itemName.string = data.itemName;
    this.itemPrice.string = data.itemPrice;
}
```

`init` method takes a data object and use the data to update each renderer component on bound nodes. Now we can save `Item` node as a Prefab asset and use it as the template of our item entries.

## Instantiate template with data

Go back to `ItemList.js` script, and add reference to our Prefab and then instantiate it with data.

```ts
//...
@property(Prefab)
itemPrefab: Prefab | null = null;

onLoad () {
    for (let i = 0; i < this.items.length; ++i) {
        const item = instantiate(this.itemPrefab);
        const data = this.items[i];
        this.node.addChild(item);
        item.getComponent('ItemTemplate').init(data);
    }
}
```

In the `onLoad` callback method, we traverse each data stored in `items` in turn, instantiate `itemPrefab` to generate a new node and add it to the node where `ItemList.js` is. Then call the `init` method in `ItemTemplate.js` to update its display.

Now we can add a __Layout__ component to the node that holds `ItemList.js` through __Add Component -> Add UI Component -> Layout__ under the __Inspector__ panel, and set the following properties:

- `Type`: `HORIZONTAL`
- `Resize Mode`: `CONTAINER`

Don't forget to drag and drop `item` Prefab to `itemPrefab` property field of `ItemList` component. You can also add a __Sprite__ component to the node as the background.

All steps have been completed. Now `itemList` node should look like this:

![itemlist complete](list-with-data/itemlist-complete.png)

## Preview

Running preview of the scene will get the result like this (the actual look depends on how your template was setup and your data):

![result](list-with-data/result.png)

The __Layout__ component added in previous step is not necessary. We can use it to help putting multiple items in a container in order but you can also use the script program to do that. You can also add a __ScrollView__ component together to display a large amount of content in a limited space.

For details of layout methods please read the [Auto Layout Container](auto-layout.md) and the [ScrollView Component](../editor/scrollview.md) documentation.
