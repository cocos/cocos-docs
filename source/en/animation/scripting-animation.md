# Using scripts to control animation

## Animation component
Animation components provide some common animation control functions. If you only need simple animation control, you can do some operations by obtaining the Animation component of the Node.

### Play
```javascript
var anim = this.getComopnent(cc.Animation);

// if no animation is designated to play and defaultClip is set up, play defaultClip animation
anim.play();

// designate test animation to play
anim.play('test');

// designate test animation to play from 1 second
anim.play('test', 1);

// when use 'play' interface to play an animation, if there are other animations playing, then will first stop other animations
anim.play('test2');
```
When playing an animation, Animation will evaluate the former playing state of the animation for next step operation.
If animation is in:
 - **Stop** state, then Animation will directly re-play this animation
 - **Pause** state, then Animation will resume the playing of the animation and continue playing it from the current time
 - **Play** state, then Animation will stop this animation and re-play it

```javascript
var anim = this.getComopnent(cc.Animation);

// play the first animation
anim.playAdditive('position-anim');

// play the second animation
// when use 'playAdditive' interface to play an animation, it will not stop other animations.
// if there are other animations playing, then will play several animations at the same time.
anim.playAdditive('rotation-anim');
```
Animation supports playing multiple animations simultaneously. The playing of different animations will not influence the playing state of each other, which is helpful for the creation of some complex animations.

### Pause Resume Stop
```javascript
var anim = this.getComopnent(cc.Animation);

anim.play('test');

// designate test animation to pause
anim.pause('test');

// pause all the animations
// anim.pause();

// designate test animation to resume
anim.resume('test');

// resume all the animations
// anim.resume();

// designate test animation to stop
anim.stop('test');

// stop all the animations
// anim.stop();
```

Invoking **Pause**, **Resume** and **Stop** functions is similar.

**Pause** will temporarily stop playing the animation. **Resume**, the animation will continue playing from the current time.
However, **Stop** will stop the playing of the animation. When being played again, this animation will start playing from the beginning.

### set up the current time of animation
```javascript
var anim = this.getComopnent(cc.Animation);

anim.play('test');

// set the current playing time of test animation as 1 second
anim.setCurrentTime(1, 'test');

// set the current playing time of all animations as 1 second
// anim.setCurrentTime(1);
```

You can set the current time of animation at anytime. But, the status of the animation will not be immediately modified according to set time. Only in next **update** of the animation will the playing status be re-calculated according to this time.

## AnimationState

**Animation** only provides some simple control functions. For more animation informations and controls, **AnimationState** is needed.

### What is AnimationState?
If **AnimationClip** is the carrier of animation data, then **AnimationState** is the concrete example of running **AnimationClip**, which decodes animation data into numeric values that are convenient to be calculated by program.
When **Animation** is playing an **AnimationClip**, **AnimationClip** will be docoded into **AnimationState**.
The playing state of **Animation** is actually calculated by **AnimationState**, which includes whether animation will loop or not, how to loop, playing speed, etc..

### obtain AnimationState
```javascript
var anim = this.getComopnent(cc.Animation);
// play will return associated AnimationState
var animState = anim.play('test');

// or directly obtain
var animState = anim.getAnimationState('test');
```

### Obtain animation information
```javascript
var anim = this.getComopnent(cc.Animation);
var animState = anim.play('test');

// obtain clip associated with animation
var clip = animState.clip;

// obtain animation name
var name = animState.name;

// obtain the playing speed of animation
var speed = animState.speed;

// obtain the total duration of animation
var duration = animState.duration;

// obtain the playing time of animation
var time = animState.time;

// obtain the repeat count of animation
var repeatCount = animState.repeatCount;

// obtain the loop mode of animation
var wrapMode = animState.wrapMode

// obtain if the animation is playing
var playing = animState.isPlaying;

// obtain if the animation is paused
var paused = animState.isPaused;

// obtain the frame rate of animation
var frameRate = animState.frameRate;

```

From **AnimationState**, all the animation information can be obtained. You can use this information to see what should be done.

### Set up the playing speed of animation
```javascript
var anim = this.getComopnent(cc.Animation);
var animState = anim.play('test');

// accelerate the playing speed of animation
animState.speed = 2;

// slow down the playing speed of animation
animState.speed = 0.5;

```
The greater the **speed** value is, the faster the speed is, and vice versa

### Set up the loop mode and loop count of animation
```javascript
var anim = this.getComopnent(cc.Animation);
var animState = anim.play('test');

// set the loop mode as Normal
animState.wrapMode = cc.WrapMode.Normal;

// set the loop mode as Loop
animState.wrapMode = cc.WrapMode.Loop;

// set the loop count of animation as 2 times
animState.repeatCount = 2;

// set the loop count of animation as infinite
animState.repeatCount = Infinity;

```
**AnimationState** permits the dynamic setting up of loop mode. Currently, various loop modes are provided. These loop modes can be obtained from **cc.WrapMode**.
If the loop category of animation is **Loop** category, it should be used together with **repeatCount** to achieve this effect.
By default, when decoding animation clips, if the loop category of animation is:
 - **Loop** category, **repeatCount** will be set as **Infinity**, i.e., infinite loop
 - **Normal** category, **repeatCount** will be set as 1

## Animation event
Visually editing the frame event is supported in the animation editor (For the methods of editing, please refer to [Animation event](./animation-event.md)). Writing the callback of the animation event in the script is very simple too. The callback of the animation event is actually a normal function. The frame event added to the animation editor will map onto the component of animation root node.

### Concrete example:
Suppose a frame event is added to the end of animation, which is as illustrated below:
![animation event](scripting/animation-event.png)

Then in the script, you can write like this:
```javascript
cc.Class({
    extends: cc.Component,

    onAnimCompleted: function (num, string) {
        console.log('onAnimCompleted: param1[%s], param2[%s]', num, string);
    }
});

```

Add the above components to the **root node** of animation. When animation is about to end, animation system will automatically invoke ```onAnimCompleted``` function in the script.
Animation system will search in all the components of animation root node. If there is a function that designated to realize animation event in components, then it will be invoked and parameters written in the event will be imported.

## Dynamic Create Animation Clip

```javascript
    var animation = this.node.getComponent(cc.Animation);
    // frames is a SpriteFrame array.
    var clip = cc.AnimationClip.createWidthSpriteFrame(frames, 17);
    clip.name = "anim_run";
    clip.wrapMode = cc.WrapMode.Loop;

    // adds frame event
    clip.events.push({
        frame: 1,               // The exactly time in second. It will trigger event at 1s in this example.
        func: "frameEvent",     // Callback function name
        params: [1, "hello"]    // Callback parameters
    });

    animation.addClip(clip);
    animation.play('anim_run');
```