# Scheduler

__Cocos Creator__ provides a powerful, flexible and convenient timer component.

## Using the Scheduler

1. Start a timer

    ```ts
    this.schedule(function() {
        // Here this refers to component
        this.doSomething();
    }, 5);
    ```

    The above timer will be executed every 5s.

2. A more flexible timer

    ```ts
    // time interval in seconds
    let interval = 5;
    // number of times to repeat
    let repeat = 3;
    // delay starts
    let delay = 10;
    this.schedule(function() {
        // Here this refers to component
        this.doSomething();
    }, interval, repeat, delay);
    ```

    The above timer will start timing after 10 seconds, and execute a callback every 5 seconds, repeating **3 + 1** times.

3. Timer that executes only once (shortcut)

    ```ts
    this.scheduleOnce(function() {
        // Here this refers to component
        this.doSomething();
    }, 2);
    ```

    The timer above will execute the callback function once after two seconds, and then stop timing.

4. Cancel a timer

     Developers can use the callback function itself to cancel the timer:

    ```ts
    this.count = 0;
    this.callback = function () {
        if (this.count == 5) {
            // Cancel this timer when the callback is executed 
            // for the sixth time
            this.unschedule(this.callback);
        }
        this.doSomething();
        this.count++;
    }
    this.schedule(this.callback, 1);
    ```

> **Note**: when the component's timer calls the callback, the `this` of the callback is specified as the component itself, so `this` can be used directly in the callback.

Here is a list of all of the timer functions in **Component**:

  - **schedule**: start a timer
  - **scheduleOnce**: start a timer that is executed only once
  - **unschedule**: cancel a timer
  - **unscheduleAllCallbacks**: cancel all timers of this component

The detailed description of these APIs can be found in the API documentation.

In addition, if developers need to execute a function every frame, please add the `update` function directly to the Component. This function will be called every frame by default. This is described in [Lifecycle Document](life-cycle-callbacks.mdItisdescribedindetailin#update).

> **Note**: `Node` does not include timer related APIs
