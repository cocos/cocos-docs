# Lua engine support

Author: Dualface

## Goals

So that Lua developers can use Cocos Creator to build scenes and UI, to show and interact with in games built with Cocos2d-x Lua engine.

## Main features

The currently supported features are as follows:

- Sprite: Image display
- Canvas: mainly used for automatic layout
- Widget: You can set up automatic layouts and various alignments with Canvas
- Button: Responds to player action
- EditBox: used for players to enter text
- ParticleSystem: Displays particle effects
- TileMap: Displays a map edited using Tiled
- Animation: only supports frame animation
- Label (System Font): only supports system fonts
- Component with Lifetime events: components and their life cycle management

### Some controls are temporarily not supported:

- ProgressBar
- Layout
- ScrollView


## Workflow

Starting with Cocos Creator v1.3, Lua support will be added as a plug-in to Creator. First, you will need to download the Creator-for-Lua plug-in and execute the installer:

- [Creator For Lua v1.1.3 for Windows download] (http://cocos2d-x.org/filedown/Creator-Lua-Support-1.1.3-win)
- [Creator For Lua v1.1.3 Mac version download] (http://cocos2d-x.org/filedown/Creator-Lua-Support-1.1.3-mac)

### Build the project for the first time

1. Create a new Lua project

    Create a Lua project using the command `cocos new -l lua GAME-NAME`.

2. Set up your scene in Cocos Creator, and then from the main menu, select `Project -> Lua Support -> Setup Target Project` to open the Lua project settings interface

    ! [Lua project] (build-to-lua / lua-project.jpg)

3. Click the `...` button next to Project Path to select your Lua project directory
4. Click the 'Copy Support Library` button (this step only needs to be done once for each new Lua project)
5. Click the Build button


### Automatically build

By default, the automatic build feature is not enabled. To update the scene and prefab resources to Lua format, you need to click the `Build` button again, or select from the main menu `Project -> Lua Support -> Build Now`.

An easier way to do this is to select the `Auto Build` option in the dialog box. So every time you save the scene, it will automatically update the resources to Lua project.

### Run game

After the initial build, or after each rebuild, use the `cocos run` command in your Lua project path to see the scene effect:

! [Play scene] (build-to-lua / play-scene.gif)