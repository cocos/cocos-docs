# About Animation

## Animation components and Animation clips
Cocos Creator is a componentized structure. Animation is no exception, it is a component in the Node. 

## Animation clips

Animation clips, however, are documents for saving animation data. Animation clips need to be mounted to Animation components to enable the engine to smoothly apply animation data to the Node.

### Index of node data

path is animation component relative path. So, only one data copy of the same name node.

### clip params

**sample**： The number of frames per second data，default 60

**speed**： Animation speed，default 1

**duration**： Animation duration ( speed = 1 )

**real time**： Play continued real time

**wrap mode**： Play Mode

## Animate Editing Mode

Animation in normal mode is not allowed to edit only in movie editing mode, to be able to edit the clip.
But in edit mode, the node can not be added / deleted / renamed operation.

Open edit mode

 - Select a node that contains the Animation, and contains more than one clip file. And then click on the button in the upper left corner of the animation editor.

Close edit mode

 - Click the Edit button in the upper left corner of the animation editor. Or click the close button on the top left corner of the scene editor

## Understanding animation editor
The Animation editor can be divided into 7 parts.

![main](animation/main.png)

1. Common button field, which displays some common functional buttons, such as: (from left to right) recording status switch, back to the first frame, last frame, play/stop, next frame, create a new animation clip and insert animation event.

2. Timeline and event, which mainly displays timeline. The added user defined events will display here too.

3. Node Tree management, which includes node data that can be influenced by the current animation clip.

4. The preview field of the animation frame in nodes, which mainly displays the preview timeline of all the frames in each node.

5. Property list, which displays the property lists of the currently chosen node that has been included in the chosen animation clip.

6. Key frame. The frame corresponding to each property will display here.

7. Basic properties of animation clip. After choosing the animation clip, the basic data will display here and can be modified.

## Basic operation

### Modify the zoom proportion of timeline

 - Scroll the mouse wheel in area 2, 4, 6 of the image, and the display percentage of the timeline can be zoomed in/out.

### Modify the display area of timeline

 - Press Shift button on the keyboard, left-click area 2, 4, 6 in the image and drag it to the left/right.

 - Press down the middle mouse button in area 2, 4, 6 in the image and drag it.

### Modify the currently chosen timeline node

 - Click or drag any position in the timeline (area 2) area, you can modify the current time node.

 - Drag the marked red line in area 4.

### Open/close recording status

 - There is a red button on the left side of graph 1. Click it and you will open/close the recording status.

 - The adding and deletion of the property frame and path will automatically open the recording status.

 - The playing of the animation will automatically open the recording status.

 - When playing, operations like saving the scene, etc., will close the recording status.

### Play/stop animation

 - Click the Play button in graph 1, which will automatically turn into Stop. Click the button again and the animation will be stopped.

 - When playing, operations like saving the scene, etc. will stop playing.

## Shortcut key

 - left：previous frame
 
 - right：next frame
 
 - up：Jump to the front  key frame
 
 - down：Jump to the behind key frame
 
 - delete：Delete the selected keys
 
 - k：Forward the animation
 
 - j：Backward animation
 
 - ctrl / cmd + left：Jump to the first frame
 
 - ctrl / cmd + right：Jump to the last frame
 
---

Continue on to read about [Creating Animation component and animation clip](animation-clip.md).
