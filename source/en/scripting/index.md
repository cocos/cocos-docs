# Workflow of script development

## Introduction

Cocos Creator's script is mainly developed by the extension component. Currently, Cocos Creator supports two script languages, Javascript and CoffeeScript. By writing the script component and putting it into the scene node, the object in the scene will be driven.

While writing the component script, you can map the variables needing adjustment onto the **Properties** panel by declaring the properties for the designer and graphic designer to adjust. Meanwhile, you can initialize, update and even destroy nodes by registering a certain call-back function.

## Contents

- Node and Components
  - [Create and use Component Script](use-component.md)
  - [Declare Class with cc.Class](class.md)
  - [Access Node and Other Component](access-node-component.md)
  - [Common Node and Component API](basic-node-api.md)
  - [Component Life-cycle Callback](life-cycle-callbacks.md)
  - [Create and Destroy Node](create-destroy.md)
- Asset Management
  - [Scene Management](scene-managing.md)
  - [Acquire and Load Asset](load-assets.md)
- Event
  - [Launch and Listen to Events](events.md)
  - [System Built-in Events](internal-events.md)
  - [Player Input](player-controls.md)
- [Actions](actions.md)
- [Action List](action-list.md)
- [Use the Timer](scheduler.md)
- [Script Execution Order](execution-order.md)
- [Network interface](network.md)
- [Use Object Pool](pooling.md)
- Script Structure
  - [Modular Script](modular-script.md)
  - [Plugin Scripts](plugin-scripts.md)
  - [Third Party Module](third-party-module.md)
- [JavaScript Quick-start](javascript-primer.md)
- CCClass Reference
  - [CCClass Advanced Reference](reference/class.md)
  - [Attributes Reference](reference/attributes.md)

<hr>

Continue on to read about [Create and use component script](use-component.md).
