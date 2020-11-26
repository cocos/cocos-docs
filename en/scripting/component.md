## Components

All classes inherited from [Component]() are called __Component Classes__. The objects in a __Component Class__ are called __Components__. __Components__ are implement according to the __Cocos Creator__ __Entity Component (EC)__ system.

The component class must inherit from a `cc` class. Example:

```ts
import { Component } from "cc";

@ccclass("MyComponent")
class MyComponent extends Component {

}
```

### Component creation and destruction

The life cycle of a component is completely controlled by the node.
Unlike ordinary class objects, components cannot be created by constructors:

```ts
const component = new MyComponent(); // Error: The component cannot be created by the constructor
```

Conversely, __components__ must be created by nodes:

```ts
const myComponent = node.addComponent(MyComponent);
```

After this, the __component__ is said to be __attached__ to the node. __Components__ are always attached to a node, except for:

- Before the end of the constructor of the component class.
- After the component is removed from the node.

Call the `Node.removeComponent` method to remove the specified component and destroy it. Example"

```ts
import { Component } from "cc";

@ccclass("MyComponent")
class MyComponent extends Component {
    constructor () {
        console.log(this.node.name); // Error: The component is not attached to the node
    }

    public printNodeName () {
        console.log(this.node.name);
    }
}

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
const myComponent = node.addComponent(MyComponent);
myComponent.printNodeName(); // Correct
node.removeComponent();
myComponent.printNodeName(); // Error: The component is not attached to the node
```
