# Quick Start: Make your first game

This document is a systematic introductions of the editor panel and the functions and workflows of Cocos Creator. Completing this chapter will help you quickly learn the general flow and methods for developing games with Cocos Creator. After finishing this tutorial you have enough information to get started creating basic games. It is strongly recommended you continue reading this guide to understand the details of each functional block and the complete workflows. Now, let's begin!

Following the tutorial, we will create a game that is named **Pick Up the Stars**. Players of this game need to manipulate an **obtuse** monster that never stops jumping to touch the continuously appearing stars. The dazzling acceleration will bring great challenges to players. Play with your friends and see who can obtain the most stars!

The completed form of this game can be played here:

<http://fbdemos.leanapp.cn/star-catcher/>

## Prepare project and resources

We have prepared for you all the resources needed for creating this game. Download **Original Project** and decompress it to the location you want. Then we can start:

[Download the original project](https://github.com/cocos-creator/tutorial-first-game/releases/download/v2.0/start_project.zip)

You can also download the completed project. If there is any confusion when following the tutorial to create the game, you can open the completed project for reference:

[Download the completed project](https://github.com/cocos-creator/tutorial-first-game/releases/download/v2.0/complete_project.zip)

## Open the original project

If you still don't know how to obtain and start Cocos Creator, please read the [Install](install.md) section.

1. First, start Cocos Creator, and choose **Open other projects**
2. In the pop up input field for selecting folder, choose `start_project` that has just been downloaded and decompressed, and click the **Open** button
3. The main window of Cocos Creator editor will be opened, and you will see the project status as follows

![start project](quick-start/init_start_project.png)

## Check game resources

Our original project has included all the game resources needed, therefore you don't need to import any other resources. For details on importing resources, please read content related to [Asset Workflow](../asset-workflow/index.md).

Next, let's get to know the resources of the project. Please pay attention to the **Assets** panel, on which all the resource allocation graphs of the project are shown.

We can see that the root directory of the project resources is named as **assets**, which is in accordance with the `assets` directory in the decompressed original project. Only resources under this directory can be imported by Cocos Creator into the project and be managed.

The **Assets** panel can display the directory structure of any hierarchy. An icon like ![folder](quick-start/folder.png) represents a folder. Clicking the triangle icon on the left side of the folder, you can unfold the contents of the folder. After completely unfolding the folder, the **Assets** panel will present itself as illustrated below.

![assets overview](quick-start/assets_overview.png)

Every resource is a document, which, after being imported into the project, will be recognized as different types of resources according to the differences in extension name. Its icon will be differentiated too. Next, let's take a look at the respective types and usages of the resources in the project.

- ![audioclip](quick-start/audio-clip.png) audio document, which is an mp3 document generally. Audio documents named as `jump` and `score` will be played respectively when the character jumps and scores.
- ![bmfont](quick-start/bitmap-font.png) bitmap font, which is jointly formed by a fnt document and png document. Bitmap font is a commonly used font resource in game development. For detailed information, please read [Font](../asset-workflow/font.md)
- There are various kinds of abbreviated icons, all of which are image resources, normally a png or jpg document. After being imported into the project, the image document will be crudely processed into the resource of **texture** type. Then these resources can be dragged into scenes or component properties for use.

## Creating a game scene

In Cocos Creator, the game scene is the core of organizing the game contents when developing games, which is also the carrier for all the game contents presented to players. The game scene will normally include the following contents:

- Scene images and words (Sprite, Label)
- Characters
- Game logic scripts attached to scene nodes in the form of components

When players run the game, the game scene will be loaded. After that, the game scripts of included components will automatically run to realize various kinds of logic functions set up by developers. Therefore, apart from resources, the game scene is the foundation of all content creation. Now let's create a new scene.

1. Click the **assets** directory in the **Assets** panel, making sure the scene will be created under this directory

2. Click the plus sign on the top left corner of the **Assets** panel, and choose **Scene** in the pop up menu

    ![create scene](quick-start/create_scene.png)

3. We created a scene document named as `New Scene`. Right click it and choose **Rename** to rename it as `game`.

4. Double click `game` and the scene will be opened in the **Scene** and the **Node Tree**.

### To understand Canvas

After opening the scene, all the nodes (and their hierarchical relations) of the current scene will be shown in the the **Node Tree**. The newly created scene has only one node called `Canvas`. `Canvas` can be called the canvas node or rendering root node. Click `Canvas`, its properties will display in the **Properties** panel.

![canvas](quick-start/canvas.png)

The `Design Resolution` property here stipulates the design resolution of the game. `Fit Height` and `Fit Width` stipulate how we should zoom `Canvas` to adjust to different resolutions when running on screens of different sizes.

Being provided with the function of adjusting to different resolutions, we will normally put all the nodes in charge of image display in the scene under `Canvas`. In this way, when the `scale` property of `Canvas` changes, all the images, as its child nodes, will zoom together to adjust to the sizes of different screens.

For more detailed information, please read [Canvas](../components/canvas.md). Currently, we only need to know that the scene images added next will all be put under the `Canvas` node.

## Setting up a scene image

### Adding a background

First, find the background image resource according to the path of `assets/textures/background` in the **Assets** panel. Click and drag this resource to the `Canvas` node in **Node Tree**. Don't release the mouse until the `Canvas` node is highlighted orange, which means a subnode using `background` as the image resource will be added.

![drag to canvas](quick-start/drag_to_canvas.png)

Now you can release the mouse button, and you will see a node named `background` has been added under `Canvas`. When we use the way of dragging a resource to add a node, the node will be automatically named as the name of the image resource.

When we edit and modify the scene, we can promptly save our modifications by main menu `File -> Save Scene`. Or we can save by shortcut keys: <kbd>Ctrl+S</kbd>（Windows）or <kbd>Cmd + S</kbd>（Mac）.

### Modify background size

![background1](quick-start/background1.png)

In **Scene**, the newly added background images can be seen. Next we will modify the size of the background image to make it cover the whole screen.

Firstly, click the `background` node, and click the fourth **Rect Transform Tool** at the top left corner of the main window:

![rect gizmo](quick-start/rect_gizmo.png)

By using this tool we can conveniently modify the size of the image node. Move the mouse to rest on the left side of `background` in **Scene**, click and drag it to the left until the left side of `background` exceeds the frame that represents the design resolution. Then we can drag the right side of `background` to the right using the same method.

![resize_background](quick-start/resize_background.png)

Then we need to drag the upper and lower sides to make the size of the background image fully cover the frame of the designing resolution.

![background finish](quick-start/background_finish.png)

When using **Rect Transform Tool** to modify the size of the background image, we can see the `Size` property of **Node** in the **Properties** panel is changing accordingly. After completion, the size of the background image is approximately `(1360, 760)`. You can also directly input a numeric value into the input field of the `Size` property, which will achieve the same effect as that of using **Rect Transform Tool**. A background image of this size can cover the whole screen of all the phones on the market, with no exceptions.

### Add ground

Our main character needs a ground that it can jump on. We will add one instantly. By the same method of adding a background image, drag the `assets/textures/ground` resource in the **Assets** panel to `Canvas` in the **Node Tree**. When dragging, we can choose the order relation of newly added nodes and `background` nodes. When in the state of dragging the resource, move the mouse pointer to the bottom of the `background` node until a highlighted orange frame appears on `Canvas` and a green line representing the insert position appears below `background`, and then release the mouse. In this way, `ground` will be put under the `background` in the scene hierarchy, and it is also a child node under `Canvas`.

![drag to order](quick-start/drag_order.png)

In the **Node Tree**, the rendering order of the nodes shown below is at the back of the upper node, which means that the node below is drawn after the upper node. We can see the `ground` node at the bottom of the **Node Tree**, which appears at the front of the hierarchy in the **Scene**. In addition, the child nodes will always appear before the parent node, and we can adjust the hierarchy order and relationship of the nodes at any time to control their display order.

According to the method of modifying the `background` node, we can also use **Rect Transform Tool** to set a suitable size for the `ground` node. When using the **Rect Transform Tool**, you can change the position of the node by dragging the node's vertices and the parts outside the edges. The following figure is the ground node state we set up:

![ground finish](quick-start/ground_finish.png)

Apart from **rectangle tool**, we can also use **move tool** to change the positions of the nodes.

![translate gizmo](quick-start/translate_gizmo.png)

Try to hold down the arrow of **move tool** shown on the node and drag it, then we can change the position of the node on a single coordinate axis at one time.

When setting up the position and size of the `background` and `ground`, we don't need precise numeric values and can drag them by guessing. If you prefer whole numbers, you can directly input numeric values of `position` and `size` according to the screenshot.

### Adding a main character

Next our main character the little monster will make its debut. Drag `assets/texture/PurpleMonster` from the **Assets** panel and put it under `Canvas` in the **Node Tree**, and make sure its position is below `ground`, in this way our main character will be shown at the very front.

To highlight the aura of the main character in the scene nodes, we right click the newly added `PurpleMonster` node, choose `rename` and rename it as `Player`.

Next we will set up the properties of the main character. First, we change the position of **Anchor**. The anchor point of any node will be at the center of itself by default, which means the position of the center of the node is the position of the node. We hope to manipulate the position of the base of the main character to simulate the effect of jumping on the ground; therefore, we need to set up the anchor point of the main character under its foot now. Find **Anchor** property in the **Properties** panel and set up the value of `y` as `0`. We will see that in **Scene**, the arrow of the **move tool** that represents the position of the main character appears under the foot of the main character.

Next, drag `Player` from **Scene** and put it on the ground. The effect is as illustrated below:

![player position](quick-start/player_position.png)

In this way our scene's basic artistic content is set up. In the next section we will write code to vivify the contents of the game.

## Writing the main character's script

One of the core ideas of developing games by Cocos Creator is to let the content creation and function development undergo parallel cooperation smoothly. In the last section we focused on artistic content. Next we will write script to develop the flow of functions, and we will see that the finished program script can be used by content creators easily.

Even if you have never written a program before, there's no need to worry. We will provide all the necessary codes in the tutorial. You only need to copy and paste them to the correct position. Then in this part you can ask your programmer partners for help. Next let's start creating script that drives the main character to act.

### Create script

1. First, right click the `assets` folder in the **Assets** panel and choose `Create -> Folder`

    ![new folder](quick-start/new_folder.png)

2. Right click `New Folder`, choose `Rename` and rename it as `scripts`. And then all of our scripts will be stored here.

3. Right click the `scripts` folder, choose `Create -> JavaScript` and create a `JavaScript` script.

4. Rename the newly created script as `Player`. Double click this script and open the code editor.

### Writing component property

There are already some preset blocks of code in the open `Player` script, as follows:

```js
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

Let's take a look at the role of these codes. First we can see a global `cc.Class()` method, what is `cc`? `cc` is the abbreviation for Cocos, the main namespace of the Cocos engine. And all the classes, functions, properties, and constants in the engine code are defined in this namespace. And `Class()` is a method under the `cc` module, which is used to declare classes in the Cocos Creator. To make it easier to differentiate, we call the class declared with `cc.Class` called `CCClass`. The parameter of the `Class()` method is a prototype object, the required class can be created by setting the desired type parameter in the form of a key-value pair in the prototype object.

**Example**:

```js
    var Sprite = cc.Class({
        name: "sprite"
    });
```

The above code creates a type with the `cc.Class()` method and assigns it to the `Sprite` variable. The class name is also set to `sprite`. Class names are used for serialization, which can generally be omitted.

For `cc.Class` detailed learning can refer to [Declare class with cc.Class](../scripting/class.md).

Now we go back to the code editor and look back at the code, which is the structure needed to write a component script. Scripts of such a structure are the components in Cocos creator, which can be mounted on the nodes in the scene and provide various functions that manipulate nodes. First, we will set up some properties and see how to adjust them in the scene.

Find the `properties` section in the `Player` script, change it to the following and save:

```js
// Player.js
    //...
    properties: {
        // main character's jump height
        jumpHeight: 0,
        // main character's jump duration
        jumpDuration: 0,
        // maximal movement speed
        maxMoveSpeed: 0,
        // acceleration
        accel: 0,
    },
    //...
```

Cocos Creator stipulates that a node has attributes that need to be written in the `properties` code block, which will specify how the protagonist moves, and we don't need to care about what the values are in the code, because we'll set these values directly in the **Properties**. Later in the game production process, we can put the properties that need to be adjusted at any time in `properties`.

Now we can add the `Player` component to the node of the main character. Choose the `Player` node in the **Node Tree**, click the **Add Component** button in the **Properties** panel and choose **Custom Component -> Player** to add the `Player` component to the node of the main character.

![add player component](quick-start/add_player_component.png)

Now we can see the newly added `Player` component in the **Properties** panel of the `Player` node. Set up properties related to the jumping and movement of the main character according to the image below:

![player properties](quick-start/player_properties.png)

Only jumpDuration's unit is seconds. The unit of the other values is pixels. According to the current setting of the `Player` component: Our main character will have a jump height of 200 pixels. The time needed for jumping to the highest point is 0.3 seconds. Its maximum horizontal movement speed is 400 pixels per second. Its horizontal acceleration is 350 pixels per second.

All these numeric values are suggestions. Later when the game is running, you can modify these numeric values in the **Properties** panel at anytime according to your preference, no need to change any codes.

### Writing code for jumping and movement

Next we will add a method to make the main character jump. Add a method called `setJumpAction` and put it below the `properties: {...},` code block:

```js
// Player.js
    properties: {
        //...
    },

    setJumpAction: function () {
        // jump up
        var jumpUp = cc.moveBy(this.jumpDuration, cc.v2(0, this.jumpHeight)).easing(cc.easeCubicActionOut());
        // jump down
        var jumpDown = cc.moveBy(this.jumpDuration, cc.v2(0, -this.jumpHeight)).easing(cc.easeCubicActionIn());
        // repeat
        return cc.repeatForever(cc.sequence(jumpUp, jumpDown));
    },
```

Here you need to know about the Cocos Creator **Action system**. Because the action system is more complex, here is a simple introduction.

In simple terms, the **action** is the displacement, scaling, and rotation of a node in Cocos Creator.

For example, in the above code, the `moveBy()` method is used to move a specified distance within a given time, the first parameter is the jump time we defined in the main character properties, and the second parameter is an Vec2 (representing 2D vector and coordinate) type objects. For a better understanding, we can look at the function description of the official:

```js
/**
 * !#en
 * Moves a Node object x,y pixels by modifying its position property.                                  <br/>
 * x and y are relative to the position of the object.                                                 <br/>
 * Several MoveBy actions can be concurrently called, and the resulting.                               <br/>
 * movement will be the sum of individual movements.
 * !#zh  Move the specified distance.
 * @method moveBy
 * @param {Number} duration duration in seconds
 * @param {Vec2|Number} deltaPos
 * @param {Number} [deltaY]
 * @return {ActionInterval}
 * @example
 * // example
 * var actionTo = cc.moveBy(2, cc.v2(windowSize.width - 40, windowSize.height - 40));
 */
cc.moveBy = function (duration, deltaPos, deltaY) {
    return new cc.MoveBy(duration, deltaPos, deltaY);
};
```

As you can see, the method `moveBy` can be passed in three parameters, the first two parameters we already know, the third parameter is the `Y` coordinate of the `Number` type. We can find that the second parameter can be passed in two types, the first is `Number` type, the second is `Vec2` type, if we pass in here is `Number` type, then the default parameter is `X` coordinate, then fill in the third parameter `Y` coordinate. The second parameter in the above example `cc.moveBy(this.jumpDuration, cc.v2(0, this.jumpHeight))` is a type of `cc.v2` object constructed using the `Vec2` method, which represents a coordinate, that is, `X` coordinates also have `Y` coordinates, because you don't need to pass in the third parameter. Also pay attention to the official passage `x and y are relative to the position of the object.`, which means that the incoming `X` and `Y` coordinates are relative to the current coordinate position of the node, rather than the absolute coordinates of the entire coordinate system.

After understanding the meaning of the parameters, let's focus on the return value of the `moveBy()` method, and see the official instructions to know that this method returns an object of type `ActionInterval`, `ActionInterval` in Cocos is a class that represents a time interval action, which is done in a certain amount of time. Here we can understand the code `cc.moveBy(this.jumpDuration, cc.v2(0, this.jumpHeight)).easing(cc.easeCubicActionOut())` **Former part** meaning, it means to construct an object of `ActionInterval` type, which represents the movement of the `(0, this.jumpHeight)` coordinates relative to the current node in the `jumpDuration` time. In short, it's a jump up action.

So what is the role of the `easing(cc.easeCubicActionOut())` in the second half? `easing` is a method under the `ActionInterval` class that allows the time interval action to appear as an easing motion, and the incoming parameter is an easing object that returns an object of `ActionInterval` type. Here the incoming is the easing object built with the `easeCubicActionInOut` method. `EaseCubicInOut` is the action of three times function easing to enter and exit, the specific curve can refer to the following figure:

![](quick-start/easing.png)

For details, please refer to [API](../../../api/en/modules/cc.html#easecubicactionout).

Next invoke the newly added `setJumpAction` method in the `onLoad` method and implement `runAction` to start action:

```js
// Player.js
    onLoad: function () {
        // initialize jump action
        this.jumpAction = this.setJumpAction();
        this.node.runAction(this.jumpAction);
    },
```

The `onLoad` method will be immediately implemented after loading the scene. So we will put operations and logic concerning initialization into it. We first pass the action of the loop jump to the `jumpAction` variable, then call the `runAction` method under the node mounted by this component, and pass the action of the loop jump to let the node (main character) jump all the time. Save the script, and then we can start running the game for the first time!

Click the **preview** button ![preview](quick-start/preview_game.png) at the top of Cocos Creator editor, which looks like a "play" button. Cocos Creator will automatically open your default browser and run the game in it. Now we should see the main character --- a purple monster jumping lively and continuously in the scene.

### Manipulation of movement

A main character that can only jump foolishly up and down on the same spot is not very promising. Let us add keyboard input for the main character, using <kbd>A</kbd> and <kbd>D</kbd> to manipulate its jump direction. Add the Keyboard event response function below the `setJumpAction` method:

```js
// Player.js
    setJumpAction: function () {
        //...
    },

    onKeyDown (event) {
        // set a flag when key pressed
        switch(event.keyCode) {
            case cc.macro.KEY.a:
                this.accLeft = true;
                break;
            case cc.macro.KEY.d:
                this.accRight = true;
                break;
        }
    },

    onKeyUp (event) {
        // unset a flag when key released
        switch(event.keyCode) {
            case cc.macro.KEY.a:
                this.accLeft = false;
                break;
            case cc.macro.KEY.d:
                this.accRight = false;
                break;
        }
    },
```

Then modify the `onLoad` method, into which we add the switch of accelerating to the left/right and the current horizontal speed of the main character. Finally, call `cc.systemEvent` and start listening for keyboard input after the scene has been loaded:

```js
// Player.js
    onLoad: function () {
        // Initialize the jump action
        this.jumpAction = this.setJumpAction();
        this.node.runAction(this.jumpAction);

        // Acceleration direction switch
        this.accLeft = false;
        this.accRight = false;
        // The main character's current horizontal velocity
        this.xSpeed = 0;

        // Initialize the keyboard input listening
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    },

    onDestroy () {
        // Cancel keyboard input monitoring
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    },
```

With Android development experience, it's better to understand that the listener is essentially the same as Android's `OnClickListener`, in Cocos through `systemEvent` to listen the system **Global** events. (For details on the listening and distribution of mouse, touch and custom events, please refer to [Monitor and launch events](../scripting/events.md)). Here registered a keyboard response function to `systemEvent`, in which the switch is used to determine whether the keyboard is <kbd>A</kbd> and <kbd>D</kbd> pressed or not, and if pressed, performs the corresponding operation.

Finally, modify the content of the `update` method by adding settings for the acceleration, speed and the current position of the main character:

```js
// Player.js
    update: function (dt) {
        // update speed of each frame according to the current acceleration direction
        if (this.accLeft) {
            this.xSpeed -= this.accel * dt;
        } else if (this.accRight) {
            this.xSpeed += this.accel * dt;
        }
        // restrict the movement speed of the main character to the maximum movement speed
        if ( Math.abs(this.xSpeed) > this.maxMoveSpeed ) {
            // if speed reach limit, use max speed with current direction
            this.xSpeed = this.maxMoveSpeed * this.xSpeed / Math.abs(this.xSpeed);
        }

        // update the position of the main character according to the current speed
        this.node.x += this.xSpeed * dt;
    },
```

`update` will be invoked once for each frame after loading the scene. We normally put the logic contents that need to be frequently calculated or timely updated here. In our game, after obtaining the acceleration direction by keyboard input, we need to calculate the speed and position of the main character in `update` for each frame.

After saving the script, you can click **preview** to check the latest outcome. After opening the preview in your browser, click the game scene with the mouse (due to the restrictions of browsers, keyboard input can only be accepted after clicking the game scene), then you can press the <kbd>A</kbd> and <kbd>D</kbd> buttons to manipulate the main character to move to the left/right!

Is the movement a little bit too slow? Does the main character not jump high enough? Hope to extend jump duration? No problem! All these can be adjusted at anytime. Just set up different property values for the `Player` component, then you can adjust the game at your will. Here is a set of settings for reference:

```js
Jump Height: 150
Jump Duration: 0.3
Max Move Speed: 400
Accel: 1000
```

This set of properties will make the main character become more flexible, as to how to choose, it depends on what style of game you want to do.

## Making stars

The main character can jump freely now so we need to set up a goal for players. The stars will appear continuously in the scene and players need to manipulate the monster to touch the stars to collect points. The star touched by the main character will disappear and a new one will be immediately re-created at a random position.

### Create Prefab

As for the nodes that need to be created repeatedly, we can save it as a **Prefab** resource, which can be a template for the dynamic generation of nodes. For more information about **Prefab**, please read [Prefab](../asset-workflow/prefab.md).

Firstly, drag the `assets/textures/star` texture from the **Assets** panel into the scene. Anywhere in the **Node Tree** is fine. We only need the scene to be the operating platform for creating Prefab. After creation we will delete this node from the scene.

We don't need to modify the position of the stars or its render properties. But to make the stars disappear after being touched by the main character, we need to add a special component to the star. By the same method of adding the `Player` script, add a JavaScript script named `Star` to `assets/scripts/`.

![star script](quick-start/star_script.png)

Next, double click this script to start editing. Only one property is needed for the star component to stipulate the distance for collecting points by the main character. Modify `properties` and add the following content:

```js
// Star.js
    properties: {
        // When the distance between the star and main character is less than this value, collection of the point will be completed
        pickRadius: 0,
    },
```

After saving the script, add this script to the newly created `star` node. Select the `star` node in the **Node Tree** and click on the **Add component** button in the **Properties** and select **Custom Component -> Star**, which is added to the newly created star node. Then set up the property value of `Pick Radius` in the **Properties** as `60`:

![quick start](quick-start/star_property.png)

The settings needed by Star Prefab are now finished. Now drag the `star` node from the **Node Tree** and drop it into the `assets` folder in the **Assets**. This should generate a Prefab resource named `star`, as shown below.

![star prefab](quick-start/prefab_asset.png)

Now the `star` node can be deleted from the scene. We can double click the `star` Prefab resource directly to edit.

We can dynamically use the Prefab resource of stars in the script to generate stars.

### Adding game control script

The generation of stars is part of the game's main logic, so we need to add a script called `Game` as a game master logic script. The script will then add logic for scoring, game failure, and restarting.

Add a new `Game` script inside the `assets/scripts` folder (next to `Star` and `Player`). Double click to open the script. First, add the properties needed for generating stars:

```js
// Game.js
    properties: {
        // this property quotes the PreFab resource of stars
        starPrefab: {
            default: null,
            type: cc.Prefab
        },
        // the random scale of disappearing time for stars
        maxStarDuration: 0,
        minStarDuration: 0,
        // ground node for confirming the height of the generated star's position
        ground: {
            default: null,
            type: cc.Node
        },
        // player node for obtaining the jump height of the main character and controlling the movement switch of the main character
        player: {
            default: null,
            type: cc.Node
        }
    },
```

Beginners here may wonder why attributes like `starPrefab` are enclosed in `{}`, and there are new "attributes" in parentheses? In fact, this is a complete declaration of attributes, and our attribute declarations are incomplete before, in some cases we need to add parameters for attribute declarations that control how the property is displayed in the **Properties** and the behavior of the property during the scene serialization process. For example:

```js
properties: {
    score: {
        default: 0,
        displayName: "Score (player)",
        tooltip: "The score of player",
    }
}
```

The above code sets three parameters for the `score` property default, displayName, and tooltip. These parameters specify the default value of `score` as 0, and the property name (displayName) is displayed as `Score (player)` in the **Properties**, and the corresponding `tooltip` is displayed when the mouse is moved over the parameter.

Here are the common parameters:

`default`: Sets the default value for the property, which is only used when the component is first added to the node<br>
`type`: To qualify the data type of a property, see [CCClass Advanced Reference: type attribute](../scripting/reference/class.md#type-attribute)<br>
`visible`: Set to false to not display this property in the **Properties**<br>
`serializable`: Set to False to not serialize (save) this property<br>
`displayName`: Display in the **Properties** as the specified name<br>
`tooltip`: To add a property's tooltip to the **Properties**

So the code above is easy to understand:

```js
starPrefab: {
    default: null,
    type: cc.Prefab
},
```

First, the `starPrefab` property is declared under the Game component, the default value is `null`, and the type that can be passed in must be a prefab resource type. After that, the ground, player properties can also be understood.

After saving the script, add the `Game` component to the `Canvas` node in the **Node Tree** (after choosing the `Canvas` node, drag the script to the **Properties** or click the **Add Component** button in the **Properties** and choose `Game` in **Custom Component**).

Next, drag the `star` Prefab resource from the **Assets** into the `Star Prefab` property of the newly created `Game` component. This is the first time we've set a reference to a property, and you can drag a resource or a node onto that property (such as the `cc.Prefab` type written here) only if it is specified as a reference type when the attribute is declared.

Then, drag the `ground` and `Player` nodes from the **Node Tree** to properties of the same name in the component, to finish the node reference.

Next, select the Canvas node in the **Node Tree**, and then drag the `ground` and `Player` nodes from the **Node Tree** to the corresponding names property in the `Game` component of the **Properties** to complete the node reference.

Finally, set the values of the `Min Star Duration` and `Max Star Duration` properties as `3` and `5`. Later when generating stars, we will choose a random value between these two values, for the duration of each star.

### Generate stars at a random position

Next we continue to modify the `Game` script and add the logic to generate the star **after** the `onLoad` method:

```js
// Game.js
    onLoad: function () {
        // obtain the anchor point of ground level on the y axis
        this.groundY = this.ground.y + this.ground.height/2; // this.ground.top may also work
        // generate a new star
        this.spawnNewStar();
    },

    spawnNewStar: function() {
        // generate a new node in the scene with a preset template
        var newStar = cc.instantiate(this.starPrefab);
        // put the newly added node under the Canvas node
        this.node.addChild(newStar);
        // set up a random position for the star
        newStar.setPosition(this.getNewStarPosition());
    },

    getNewStarPosition: function () {
        var randX = 0;
        // According to the position of the ground level and the main character's jump height, randomly obtain an anchor point of the star on the y axis
        var randY = this.groundY + Math.random() * this.player.getComponent('Player').jumpHeight + 50;
        // according to the width of the screen, randomly obtain an anchor point of star on the x axis
        var maxX = this.node.width/2;
        randX = (Math.random() - 0.5) * 2 * maxX;
        // return to the anchor point of the star
        return cc.v2(randX, randY);
    },
```

Here are a few things to watch out for.

1. The `y` property under the node corresponds to the `y` coordinate of the anchor point, because the anchor point defaults to the center of the node, so the `y` coordinate of the ground needs to add half of the ground height.
2. The effect of the **instantiate** method is to clones a specified object of any type, or a new node from a prefab instance, and the return value is node or object
3. The effect of the `addChild` method under the node is to build the new node at the next level of the node, so the new node is displayed above the node
4. The `setPosition` method under the node is to set the position of the node in the parent node's coordinate system, and you can set the coordinate points in two ways. The first is to pass in two values x and Y, the second is Pass in `cc.v2(x, y)` (an object of type `cc.Vec2`)
5. The effect of the `getComponent` method under the node is to get the component references that are mounted on the node

After saving the script, click the **preview** button. Then in the browser you will see that a star is dynamically generated after the game is started! By the same method, you can dynamically generate any preset node with a `Prefab` template in the game.

![spawn star](quick-start/spawn_star.png)

### Adding the action of the main character's touching and collecting of stars

Now we will add the action logic of the main character's collecting of stars. The essential point here lies in the fact that the star needs to obtain the position of the main character's node at any time to judge if the distance between them is shorter than the collectable distance. How do we obtain the reference of the main character's node? Don't forget that we have done two things before:

1. There is a property named `player` in the `Game` component, which saved the reference of the main character's node.
2. Each star is dynamically generated in the `Game` script.

Therefore, We just need to pass the instance of the Game component to the star and save it, when the Game script generates the `Star` node instance, and then we can visit the main character node at any time through `game.player`.

Let's open the `Game` script and add a `newStar.getComponent('Star').game = this;` at the end of the `spawnNewStar` method, as follows:

```js
// Game.js
    spawnNewStar: function() {
        // ...
        // Staging a reference of Game object on a star component
        newStar.getComponent('Star').game = this;
    },
```

Open the `Star` script after saving, now we can use the `player` node referenced in the `Game` component to judge the distance. After the `onLoad` method, add a method named `getPlayerDistance` and `onPicked`:

```js
// Star.js
    getPlayerDistance: function () {
        // judge the distance according to the position of the player node
        var playerPos = this.game.player.getPosition();
        // calculate the distance between two nodes according to their positions
        var dist = this.node.position.sub(playerPos).mag();
        return dist;
    },

    onPicked: function() {
        // When the stars are being collected, invoke the interface in the Game script to generate a new star
        this.game.spawnNewStar();
        // then destroy the current star's node
        this.node.destroy();
    },
```

The `getPosition()` method under the node returns the position（x, y）of the node in the parent node's coordinate system, that is a `Vec2` type object. At the same time, note that call node under `destroy()` method can destroy the node.

Then add the judging distance for each frame in the `update` method. If the distance is less than the collection distance specified by the `pickRadius` property, the collection behavior is performed:

```js
// Star.js
    update: function (dt) {
        // judge if the distance between the star and main character is less than the collecting distance for each frame
        if (this.getPlayerDistance() < this.pickRadius) {
            // invoke collecting behavior
            this.onPicked();
            return;
        }
    },
```

Save the script, by pressing <kbd>A</kbd> and <kbd>D</kbd> key to control the main character to move around, You can see that when the main character gets close to the star, the star will disappear and a new one will be generated at a random position!

## Adding score

The little monster makes a great effort to collect the stars, does not have the reward how to line? Now, let's add the logic and display of scoring when collecting stars.

### Adding a score label (Label)

The score will start from 0 when the game is started. 1 point will be added for 1 star collected. To display the score, we should first create a **Label** node. Choose the `Canvas` node in the **Node Tree**, right click and choose `Create -> Create Renderer Nodes -> Node With Label`. A new label node will be created under `Canvas` node, and it will be located at the bottom. Next we will use the following steps to set up this label node:

1. Change the node's name to `score`.
2. Select the `score` node, and set the X,Y of the `position` property to `(0, 180)`.
3. Edit the `String` property of the **Label** component and input `Score: 0`.
4. Set the `Font Size` property of the **Label** component to `50`.
5. Drag the `assets/mikado_outline_shadow` bitmap font resource from the **Assets** panel (pay attention! the icon is ![bmfont](quick-start/bitmap-font.png)) into the `Font` property of the **Label** component, replace the font of the text with the bitmap font in our project resource

`Score: 0`'s text suggests using an English colon, because the `String` property of the `Label` component will not recognize the Chinese colon after the bitmap font is added to it.

The completed effect is as shown in the following illustration:

![score label](quick-start/score_label.png)

### Adding scoring logic to Game script

We will put the logic of scoring and updating the score display in the `Game` script. Open the `Game` script to start editing. First, add a reference property of the score display Label to the **end** of the `properties` block:

```js
// Game.js
    properties: {
        // ...
        // reference of score label
        scoreDisplay: {
            default: null,
            type: cc.Label
        }
    },
```

Next, add the initialization of the variable used for scoring in the `onLoad` method:

```js
// Game.js
    onLoad: function () {
        // ...
        // initialize scoring
        this.score = 0;
    },
```

Then add a new method named `gainScore` after the `update` method:

```js
// Game.js
    gainScore: function () {
        this.score += 1;
        // update the words of the scoreDisplay Label
        this.scoreDisplay.string = 'Score: ' + this.score;
    },
```

After saving the Game script, go back to the **Node Tree**, select the `Canvas` node, and drag the score node which add before to the `Game` component's `Score Display` attribute of the **Properties**.

### Invoke the scoring logic of the Game in Star script

Open the `Star` script after saving the `Game` script. Add the invoking of `gainScore` to the `onPicked` method:

```js
// Star.js
    onPicked: function() {
        // when the stars are being collected, invoke the interface in the Game script to generate a new star
        this.game.spawnNewStar();
        // invoke the scoring method of the Game script
        this.game.gainScore();
        // then destroy the current star's node
        this.node.destroy();
    },
```

Preview after saving. You will see that when collecting stars, the scores displayed at the top of screen will increase now!

![preview score](quick-start/preview_score.png)

## Judgement of failure and restarting

Now our game has begun to taken shape. But no matter how many scores one may get, a game without the possibility of failure won't give players any fulfillment. Now let's add the action of the star's regular disappearance. And if all the stars disappear, the game will be viewed as failed. In other words, players need to finish collecting the star before the star disappears and repeat this procedure unceasingly to finish the loop of the play method.

### Adding the logic of disappearing in a limited time to the star

Open the `Game` script, and add the variable declaration needed for counting time before invoking `spawnNewStar` of the `onLoad` method:

```js
// Game.js
    onLoad: function () {
        // ...
        // initialize timer
        this.timer = 0;
        this.starDuration = 0;
        // generate a new star
        this.spawnNewStar();
        // initialize scoring
        this.score = 0;
    },
```

Then add the logic of resetting the timer to the end of the `spawnNewStar` method, in which `this.minStarDuration` and `this.maxStarDuration` are properties of the `Game` component that was declared at the beginning. They are used to stipulate the random scale of star duration:

```js
// Game.js
    spawnNewStar: function() {
        // ...
        // reset timer, randomly choose a value according the scale of star duration
        this.starDuration = this.minStarDuration + Math.random() * (this.maxStarDuration - this.minStarDuration);
        this.timer = 0;
    },
```

Add the logic of updating the timer and judgement of exceeding the duration to the `update` method:

```js
// Game.js
    update: function (dt) {
        // update timer for each frame, when a new star is not generated after exceeding duration
        // invoke the logic of game failure
        if (this.timer > this.starDuration) {
            this.gameOver();
            return;
        }
        this.timer += dt;
    },
```

In the end, add the `gameOver` method. Reload the scene when failure occurs.

```js
// Game.js
    gameOver: function () {
        this.player.stopAllActions(); //stop the jumping action of the player node
        cc.director.loadScene('game');
    }
```

The beginner needs to know that `cc.director` is a single object that manages the logical process of your game. Since `cc.director` is a single case, you don't need to call any constructors functions or create functions, the standard way to use it is by calling `cc.director.methodName()`, for example, `cc.director.loadScene('game')` here is to reload game scene, which means the game starts again. The `stopAllActions` method under the node is obvious, and this method will invalidate all the `Action` on the node.

Modification of the `Game` script is now finished. Save the script and open the `Star` script, because we need to add a simple visual prompt effect to the star that is about to disappear. Add the following code to the end of the `update` method:

```js
// Star.js
    update: function() {
        // ...
        // update the transparency of the star according to the timer in the Game script
        var opacityRatio = 1 - this.game.timer/this.game.starDuration;
        var minOpacity = 50;
        this.node.opacity = minOpacity + Math.floor(opacityRatio * (255 - minOpacity));
    }
```

Save the `Star` script, and the logic of this game's play method will now be completely finished. Now click the **preview** button, we will see a qualified game with a core play method, incentive mechanism and failure mechanism in the browser.

## Adding sound effects

Although lots of people will ignore sound when playing smartphone games, for the completeness of the workflow presented in this tutorial, we still have to supplement the task of adding sound effects.

### Jumping sound effect

Firstly, add the jumping sound effect. Open the `Player` script and add the `jumpAudio` property that reference the sound document resource:

```js
// Player.js
    properties: {
        // ...
        // jumping sound effect resource
        jumpAudio: {
            default: null,
            type: cc.AudioClip
        },
    },
```

Then rewrite the `setJumpAction` method, insert the callback of playing the sound effect and play the sound by adding the `playJumpSound` method:

```js
// Player.js
    setJumpAction: function () {
        // jump up
        var jumpUp = cc.moveBy(this.jumpDuration, cc.v2(0, this.jumpHeight)).easing(cc.easeCubicActionOut());
        // jump down
        var jumpDown = cc.moveBy(this.jumpDuration, cc.v2(0, -this.jumpHeight)).easing(cc.easeCubicActionIn());
        // add a callback function to invoke other defined methods after the action is finished
        var callback = cc.callFunc(this.playJumpSound, this);
        // repeat unceasingly, and invoke callback to play sound after landing each time
        return cc.repeatForever(cc.sequence(jumpUp, jumpDown, callback));
    },

    playJumpSound: function () {
        // invoke sound engine to play the sound
        cc.audioEngine.playEffect(this.jumpAudio, false);
    },
```

What needs to be emphasized here is the role of the callback function, first we look at the official definition of `callFunc()` method:

```js
/**
 * !#en Creates the action with the callback.
 * !#zh Executes the callback function.
 * @method callFunc
 * @param {function} selector
 * @param {object} [selectorTarget=null]
 * @param {*} [data=null] - data for function, it accepts all data types.
 * @return {ActionInstant}
 * @example
 * // example
 * // CallFunc without data
 * var finish = cc.callFunc(this.removeSprite, this);
 *
 * // CallFunc with data
 * var finish = cc.callFunc(this.removeFromParentAndCleanup, this._grossini, true);
 */
cc.callFunc = function (selector, selectorTarget, data) {
    return new cc.CallFunc(selector, selectorTarget, data);
};
```

We can see that `callFunc` method can pass in three parameters. The first paramater is `selector` of the method, which we can understand as the method name. The second parameter is type `Object`, which is generally filled in `this`. The third parameter is the data that is brought back, which can be all data types, and may not be filled in. We then notice the return value of this method —— `ActionInstant`, which is an action class that is executed instantaneously.

Here we can understand that using `callFunc` to invoke the callback function can transform the function into the `Action` in `cc`, which is very useful in cc's action system! For example, in the above we pass the function that plays the sound to `callFunc`, and then assign a value to `callback`, so that `callback` becomes a play the sound of the action. Then we can use the `cc.sequence` to combine the action of jumping and playing the sound, and realize the function of playing the sound every time it jumps!

### Scoring sound effect

After saving the `Player` script, open the `Game` script to add the scoring sound effect. Firstly, we still add a property to `properties` to reference the sound document resource:

```js
// Game.js
    properties: {
        // ...
        // scoring sound effect resource
        scoreAudio: {
            default: null,
            type: cc.AudioClip
        }
    },
```

Then insert the code of playing the sound into the `gainScore` method:

```js
// Game.js
    gainScore: function () {
        this.score += 1;
        // update the words of the scoreDisplay Label
        this.scoreDisplay.string = 'Score: ' + this.score.toString();
        // play the scoring sound effect
        cc.audioEngine.playEffect(this.scoreAudio, false);
    },
```

Save the script. Go back to the **Node Tree**, choose the `Player` node, and drag the `assets/audio/jump` resource from the **Assets** to the `Jump Audio` property of the `Player` component.

Then choose the `Canvas` node, drag the `assets/audio/score` resource to the `Score Audio` property of the `Game` component.

Now it's done! The scene hierarchy of the completed form and properties of each key component are as follows:

![node tree complete](quick-start/hierarchy_complete.png)

![game complete](quick-start/game_complete.png)

![player complete](quick-start/player_complete.png)

Now we can fully enjoy the newly created game. How many scores can you get? Don't forget that you can modify game parameters like movement control and star duration, etc. in the `Player` and `Game` components at anytime to quickly adjust the game's degree of difficulty. The scene needs to be saved after modifications of component properties. Only the saved values can be recorded.

## Summary

Congratulations! You have finished the first game created by Cocos Creator. We hope this quick start tutorial for beginners can help you understand the basic concepts and workflows in the game development process of Cocos Creator. If you are not interested in writing and learning script programming, you can directly copy and paste the completed script from the completed project.

Next, you can continue to perfect this game. The following are some recommended improving methods:

- Add a simple start menu, display a start button when the game starts running. Only after clicking the button will the game start
- Add a simple menu interface for the failure of the game. Only after clicking the button will the game restart after failure
- Restrict the movement of the main character to the window's boundaries
- Add more exquisite animation performance to the jumping action of the main character
- Add a countdown progress bar to the state when a star disappears
- Add more gorgeous effects when collecting stars
- Add input controls for touch screen devices

For editions that have been improved in all the above aspects, you can download [evolution edition project](https://github.com/cocos-creator/tutorial-first-game/releases/download/v2.0/polished_project.zip) for reference and learning, which will not be discussed in detail here.

Moreover, if you want to release the completed game on a server to share with your friends, you can read the content of the [Preview Build](basics/preview-build.md) section.

Today's tutorial ends here. You can immediately start creating your second Cocos Creator game or continue reading this guide. For any questions on this quick start tutorial, you can send feedback on [Warehouse of this tutorial on GitHub](https://github.com/cocos-creator/tutorial-first-game).
