# Workflow of script development

## Introduction

Cocos Creator's script is mainly developed by the extension component. Currently, Cocos Creator supports two script languages, Javascript and CoffeeScript. By writing the script component and putting it into the scene node, the object in the scene will be driven.

While writing the component script, you can map the variables needing adjustment onto the **Properties** panel by declaring the properties for the designer and graphic designer to adjust. Meanwhile, you can initialize, update and even destroy nodes by registering a certain call-back function.

## Contents

- [Create and use component script](use-component.md)
- [Declare class with cc.Class](class.md)
- [Access node and other component](access-node-component.md)
- [Basic node and component API](basic-node-api.md)
- [Life cycle call-back](life-cycle-callbacks.md)
- [Create and destroy node](create-destroy.md)
- [Launch and listen to events](events.md)
- [System built-in events](internal-events.md)
- [Use action system](actions.md)
- [Action list](action-list.md)
- [Use timer](scheduler.md)
- [Script execution order](execution-order.md)
- [Network interface](network.md)
- [Use object pool](pooling.md)
- [Acquire and load asset](load-assets.md)
- [Modular script](modular-script.md)
- [Third party module reference](third-party-module.md)
- [Debug script in browser](web-debug-scripts.md)
- [JavaScript quick-start](javascript-primer.md)

## Reference
- [Attribute parameter reference](reference/attributes.md)
- [Recommend coding standards](reference/coding-standards.md)
- [SizeProvider](reference/size-provider.md)


<hr>

Continue on to read about [Create and use component script](use-component.md).
