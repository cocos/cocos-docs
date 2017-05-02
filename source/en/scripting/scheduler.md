# Using the timer

In Cocos Creator, we provide a convenient timer for the components. This timer originates from the `cc.Scheduler` in Cocos2d-x and we preserved it in Cocos Creator and adapted the method of usage based on the components.

Some people may think `setTimeout` and `setInterval` are enough. Developers surely can use these two functions, but we prefer using the timer more as it is quicker and more powerful and it combines better with the components!

Now, let's see its detailed using method:

1. Start a timer

    ```
    component.schedule(function() {
        // Here `this` is referring to the component
        this.doSomething();
    }, 5);
    ```

    The timer above will run once every 5s.

2. Quicker timer

    ```
    // Time interval in units of seconds
    var interval = 5;
    // Time of repetition
    var repeat = 3;
    // Start delay
    var delay = 10;
    component.schedule(function() {
        // Here `this` is referring to the component
        this.doSomething();
    }, interval, repeat, delay);
    ```

    The timer above will start counting after 10 seconds, run call-back once every 5 seconds and repeat 3 times.

3. Timer only runs once (shortcut)

    ```
    component.scheduleOnce(function() {
        // Here `this` is referring to the component
        this.doSomething();
    }, 2);
    ```

    The timer above will run the call-back function once after 2 seconds and then will stop counting.

4. Cancel the timer

    The developer can use the call-back function itself to cancel the timer:

    ```
    this.count = 0;
    this.callback = function () {
        if (this.count === 5) {
            // Cancel this timer at the sixth call-back 
            this.unschedule(this.callback);
        }
        this.doSomething();
        this.count++;
    }
    component.schedule(this.callback, 1);
    ```

Below are all the functions of the timer in the component:

- schedule：start a timer
- scheduleOnce：start a timer that runs only once
- unschedule：cancel a timer
- unscheduleAllCallbacks：cancel all the timers of this component

These detailed descriptions about API can all be found in [Component API](http://fireball-x.com/api/classes/Component.html).

Besides this, if every frame needs to run a function, please add function `update` directly in to the component, so this function will be called by every frame. A detailed description can be found in [life cycle file](file:///Users/panda/StudyWork/Cocos/fireball/docs/html/scripting/life-cycle-callbacks.html#update).

### **Caution: `cc.Node` does not contain Scheduler API**
