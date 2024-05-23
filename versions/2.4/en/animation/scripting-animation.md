# Using scripts to control animation

## Animation Component

Animation components provide some common animation control functions. If you only need simple animation control, you can do some operations by obtaining the Animation component of the Node.

### Play Animation

```javascript
var anim = this.getComponent(cc.Animation);

// if no animation is designated to play and defaultClip is set up, play defaultClip animation
anim.play();

// designate test animation to play
anim.play('test');

// designate test animation to play from 1 second
anim.play('test', 1);

// when use 'play' interface to play an animation, if there are other animations playing, then will first stop other animations
anim.play('test2');
```

When playing an animation, Animation will evaluate the former playing state of the animation for next step operation. If animation is in:

- **Stop** state, then Animation will directly re-play this animation
- **Pause** state, then Animation will resume the playing of the animation and continue playing it from the current time
- **Play** state, then Animation will stop this animation and re-play it

```javascript
var anim = this.getComponent(cc.Animation);

// play the first animation
anim.playAdditive('position-anim');

// play the second animation
// when use 'playAdditive' interface to play an animation, it will not stop other animations.
// if there are other animations playing, then will play several animations at the same time.
anim.playAdditive('rotation-anim');
```

Animation supports playing multiple animations simultaneously. The playing of different animations will not influence the playing state of each other, which is helpful for the creation of some complex animations.

### Pause, Resume, Stop Animation

```javascript
var anim = this.getComponent(cc.Animation);

anim.play('test');

// designate test animation to pause
anim.pause('test');

// pause all the animations
anim.pause();

// designate test animation to resume
anim.resume('test');

// resume all the animations
anim.resume();

// designate test animation to stop
anim.stop('test');

// stop all the animations
anim.stop();
```

Invoking **Pause**, **Resume** and **Stop** functions is similar.

**Pause** will temporarily stop playing the animation. **Resume**, the animation will continue playing from the current time.  
However, **Stop** will stop the playing of the animation. When being played again, this animation will start playing from the beginning.

### Set up the current time of animation

```javascript
var anim = this.getComponent(cc.Animation);

anim.play('test');

// set the current playing time of test animation as 1 second
anim.setCurrentTime(1, 'test');

// set the current playing time of all animations as 1 second
anim.setCurrentTime(1);
```

You can set the current time of animation at anytime. But, the status of the animation will not be immediately modified according to set time. Only in next **update** of the animation will the playing status be re-calculated according to this time.

## AnimationState

**Animation** only provides some simple control functions. For more animation information and controls, **AnimationState** is needed.

### What is AnimationState?

If **AnimationClip** is the carrier of animation data, then **AnimationState** is the concrete example of running **AnimationClip**, which decodes animation data into numeric values that are convenient to be calculated by program.  
When **Animation** is playing an **AnimationClip**, **AnimationClip** will be decoded into **AnimationState**.  
The playing state of **Animation** is actually calculated by **AnimationState**, which includes whether animation will loop or not, how to loop, playing speed, etc..

### Obtain AnimationState

```javascript
var anim = this.getComponent(cc.Animation);
// play will return associated AnimationState
var animState = anim.play('test');

// or directly obtain
var animState = anim.getAnimationState('test');
```

### Obtain Animation Information

```javascript
var anim = this.getComponent(cc.Animation);
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
var anim = this.getComponent(cc.Animation);
var animState = anim.play('test');

// accelerate the playing speed of animation
animState.speed = 2;

// slow down the playing speed of animation
animState.speed = 0.5;
```

The greater the value is, the faster the speed is, while the smaller the value is, the slower the speed is

### Set up the loop mode and loop count of animation

```javascript
var anim = this.getComponent(cc.Animation);
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

If the **WrapMode** of animation is **Loop**, it should be used together with **repeatCount** to achieve the effect.  
By default, when decoding animation clips, if the loop category of animation is:

- In the **Loop** mode, the **repeatCount** will be set to **Infinity**, which is the infinite loop
- In the **Normal** mode, the **repeatCount** will be set to 1

## Animation Event

Visually editing the frame event is supported in the animation editor (For the methods of editing, please refer to [Animation event](./animation-event.md)). Writing the callback of the animation event in the script is very simple too. The callback of the animation event is actually a normal function. The frame event added to the animation editor will map onto the component of animation root node.

### Concrete example

Suppose a frame event is added to the end of animation, which is as illustrated below:

![animation event](scripting/animation-event.jpg)

Then in the script, you can write like this:

```javascript
cc.Class({
    extends: cc.Component,

    onAnimCompleted: function (num, string) {
        console.log('onAnimCompleted: param1[%s], param2[%s]', num, string);
    }
});
```

Add the above components to the **root node** of animation. When animation is about to end, animation system will automatically invoke `onAnimCompleted` function in the script. Animation system will search in all the components of animation root node. If there is a function that designated to realize animation event in components, then it will be invoked and parameters written in the event will be imported.

## Register Animation Callback

In addition to the callbacks provided by the frame events in the Animation panel, the animation system also provides a way to call back animation events. The currently supported callback events include:

- `play`: triggered when playback starts
- `stop`: triggered when playback is stopped
- `pause`: triggered when playback is paused
- `resume`: triggered when playback is resumed
- `lastframe`: if the animation loop is greater than 1, triggered when the animation reaches the last frame.
- `finished`: trigger when the animation is finished.

When a callback function is registered on `cc.Animation`, it will register this callback for the corresponding `cc.AnimationState` when an animation is played, and unregister this callback for `cc.AnimationState` when `cc.AnimationState` stops playing.

Actually, `cc.AnimationState` is the sender of the animation callback, so if want to register a callback for a single `cc.AnimationState`, get this `cc.AnimationState` first and register it separately.

### Concrete Example

```javascript
var animation = this.node.getComponent(cc.Animation);

// Register
animation.on('play',      this.onPlay,        this);
animation.on('stop',      this.onStop,        this);
animation.on('lastframe', this.onLastFrame,   this);
animation.on('finished',  this.onFinished,    this);
animation.on('pause',     this.onPause,       this);
animation.on('resume',    this.onResume,      this);

// Cancel Register
animation.off('play',      this.onPlay,        this);
animation.off('stop',      this.onStop,        this);
animation.off('lastframe', this.onLastFrame,   this);
animation.off('finished',  this.onFinished,    this);
animation.off('pause',     this.onPause,       this);
animation.off('resume',    this.onResume,      this);
```

## Dynamic Create Animation Clip

```javascript
var animation = this.node.getComponent(cc.Animation);
// Frames is a SpriteFrame array.
var clip = cc.AnimationClip.createWidthSpriteFrame(frames, 17);
clip.name = "anim_run";
clip.wrapMode = cc.WrapMode.Loop;

// Adds frame event
clip.events.push({
    frame: 1,               // The exactly time in second. It will trigger event at 1s in this example.
    func: "frameEvent",     // Callback function name
    params: [1, "hello"]    // Callback parameters
});

animation.addClip(clip);
animation.play('anim_run');
```
