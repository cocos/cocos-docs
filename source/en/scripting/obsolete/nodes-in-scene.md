---
title: Nodes In Scene
category: manual
permalinks: manual/scripting/nodes-in-scene
---

What is a node in a scene-graph structure?

From [Scene-graph](https://en.wikipedia.org/wiki/Scene_graph) on wikipedia:

>A scene graph is a collection of nodes in a graph or tree structure. A tree node (in the overall tree structure of the scene graph) may have many children but often only a single parent, with the effect of a parent applied to all its child nodes; an operation performed on a group automatically propagates its effect to all of its members.

So it's the basic element with parent-child relationship to compose a tree (hierarchy) structure. Cocos2d-js has a good [visual explanation](http://www.cocos2d-x.org/programmersguide/2/index.html#scene-graph) of scene-graph and nodes. It also explains [how parent-child relationship works](http://www.cocos2d-x.org/programmersguide/2/index.html#parent-child-relationship) for nodes.

## Engine Implementation

For different game engine there are different names for nodes:

- [cc.Node](http://www.cocos2d-x.org/reference/html5-js/V3.6/symbols/cc.Node.html)  in Cocos2d-js
- [PIXI.DisplayObject](http://pixijs.github.io/docs/PIXI.DisplayObject.html) in Pixi.js
- [EaselJS.DisplayObject](http://www.createjs.com/docs/easeljs/classes/DisplayObject.html) in CreateJS

In some of the engines 'node' class is abstract and you can only create instance of child class that inherits 'node' class, for example 'sprite', 'text', 'button'. Cocos Creator will take whatever an engine has and allow users to attach script to those instances.

## Extending Nodes in Cocos Creator

In the above engines, each node extends from the basic 'node' class and has fixed functionality. You cannot combine behaviors from two different nodes together.

Cocos Creator makes it possible to attach scripts to a node with mixin. This way user can write scripts with modular behavior, and attach scripts with different behavior to a single node to grant it a combination of modular behaviors.

Continue on to read about [Attachable Script](/manual/scripting/attachable-script).
