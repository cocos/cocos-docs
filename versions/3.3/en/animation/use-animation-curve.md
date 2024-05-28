# Using Animation Curves

All keyframes added to an Animation Property of a node in an Animation Clip are shown as linear traces in the corresponding animation property track, which is an animation curve. That is, an Animation Curve describes the change in an Animation Property on an object over time.

The Animation Curve stores internally a series of time points, each of which corresponds to a (curve) value, called a frame (keyframe). When the animation system runs, the Animation Component calculates the (result) value that should be assigned to the object at the specified time point based on the current animation state and completes the property change, a calculation process called sampling.

The following code snippet demonstrates how to create Animation Clips programmatically:

```ts
import { AnimationClip, animation, js } from 'cc';
const animationClip = new AnimationClip();
animationClip.duration = 1.0; // The entire period of the animation clip, the frame time of any keyframe should not be greater than this property
animationClip.keys = [ [ 0.3, 0.6, 0.9 ] ]; // The frame time shared by all curves of the clip
animationClip.curves = [{ // Animation curves on the Animation component
    modifiers: [ // Address the target object from the current node object. See the "Target Objects" section below for details
        // The target object is the "Body" child of the current node.
        HierarchyPath('Body'),
        // The target object is the "MyComponent" component on the "Body" child of the current node.
        ComponentPath(js.getClassName(MyComponent)),
        // The target object is the "value" property on the "MyComponent" component of the "Body" child of the current node.
        'value',
    ],
    data: {
        // Indexed to 'animationClip.keys', i.e. [ 0.3, 0.6, 0.9 ]
        keys: 0,
        // Keyframe data
        values: [ 0.0, 0.5, 1.0 ],
    },
}];
```

The above Animation Clip contains an Animation Curve that controls the `value` property of the **MyComponent** component in the **Body** child node. The Animation Curve includes three keyframes that make the `value` property change to 0.0 at 0.3 seconds, 0.5 at 0.6 seconds, and 1.0 at 0.9 seconds.

> **Note**: the frame times of the keyframes on the animation curve are indexed by reference to the `AnimationClip.keys` array. In this way, multiple curves can share frame times, which will result in additional performance optimization.

## Target objects (`modifiers`)

The target of an animation curve can be any JavaScript object. The `modifiers` field specifies how the target object is addressed from the current node object at **runtime**.

`modifiers` is an array, each element of which expresses how to address an object from a higher level to another object, with the last element addressed as the target of the curve. This behavior is like a file system path, so each element is called a "target path".

When the target path is `string` or `number`, it addresses the property of the higher-level object, which itself specifies the property name. Otherwise, the target path must be an object that implements the interface `animation.TargetPath`.

Cocos Creator has the following built-in classes that implement the interface `animation.TargetPath`:
- `animation.HierarchyPath` treats a higher-level object as a node and addresses one of its children
- `animation.ComponentPath` treats a higher-level object as a node and addresses one of its components

The target paths can be any combination, as long as they have the correct meaning:

```ts
modifiers: [
    // The target object is the first element of the "names" property of the "BlahBlahComponent" component on the "nested_3" child node of the "nested_2" child node of the "nested_1" child node
    new animation.HierarchyPath('nested_1/nested_2/nested_3'),
    new animation.ComponentPath(js.getClassName(BlahBlahComponent)),
    'names',
    0,
]
```

Custom target paths are useful when the target object is not an property, but must be returned from a method:

```ts
class BlahBlahComponent extends Component {
    public getName(index: number) { return _names[index]; }
    private _names: string[] = [];
}

modifiers: [
    // The target object is the first "name" of the "BlahBlahComponent" component on the "nested_3" child node of the "nested_2" child node of the "nested_1" child node
    new animation.HierarchyPath('nested_1/nested_2/nested_3'),
    new animation.ComponentPath(js.getClassName(BlahBlahComponent)),
    {
        get: (target: BlahBlahComponent) => target.getName(0),
    },
]
```

For custom target paths to be serializable, declare them as classes:

```ts
@ccclass
class MyPath implements animation.TargetPath {
    @property
    public index = 0;
    constructor(index: number) { this.index = index; }
    get (target: BlahBlahComponent) {
        return target.getName(this.index);
    }
}

modifiers: [
    // The target object is the first "name" of the "BlahBlahComponent" component on the "nested_3" child node of the "nested_2" child node of the "nested_1" child node
    new animation.HierarchyPath('nested_1/nested_2/nested_3'),
    new animation.ComponentPath(js.getClassName(BlahBlahComponent)),
    new MyPath(0),
]
```

The addressing of the target object is done at runtime, a feature that allows animation clips to be reused on multiple objects.

## Assignment

When a value is sampled, by default the value will be set to the target object using the assignment operator `=`.

Sometimes, the assignment operator cannot be used to complete the setting. For example, when setting the Uniform of a material object, it can't be done with the assignment operator. For this case, the curve field `valueAdapter` provides a mechanism to customize the value to the target object.

Example:

```ts
class BlahBlahComponent {
    public setUniform(index: number, value: number) { /* */ }
}

{ // Curve
    valueAdapter: {
        // Called when the curve is instantiated
        forTarget(target: BlahBlahComponent) {
            // Do something useful here
            return {
                // Called each time the value of the target object is set
                set(value: number) {
                    target.setUniform(0, value);
                }
            };
        }
    },
};
```

For the **custom assignment** to be serializable, declare them as classes:

```ts
@ccclass
class MyValueProxy implements animation.
    @property
    public index: number = 0;
    constructor(index: number) { this.index = index; }
    // Called when the curve is instantiated
    public forTarget(target: BlahBlahComponent) {
        // Do something useful here
        return {
            // Called each time the value of the target object is set
            set(value: number) {
                target.setUniform(0, value);
            }
        };
    }
}
```

`UniformProxyFactory` is one such **custom assignment** class that implements setting the uniform value of a material:

```ts
{ 
    modifiers: [
        // The target object is the first material of the "sharedMaterials" property of the "MeshRenderer" component
        ComponentPath(js.getClassName(MeshRenderer)),
        'sharedMaterials',
        0,
    ],
    valueAdapter: new animation.UniformProxyFactory(
        0, // Pass index
        'albedo', // Uniform name
    ),
};
```

## Sampling

If the sampled time point is exactly equal to the time point of a keyframe, then the animation data on that keyframe is used. Otherwise, when the sampling time point is between two frames, the result value is affected by the data of both frames, and the scale of the sampling time point on the moment interval of the two keyframes (`[0, 1]`) reflects the extent of the effect.

Cocos Creator allows this scale to be mapped to another scale to achieve a different "fade" effect. These mapping methods are called **fading methods** in Creator. After the scale is determined, the final result is calculated based on the specified **interpolation method**.

> **Note**: both the fade method and the interpolation method affect the smoothness of the animation.

### Fade method

The fade method for each frame can be specified, or a uniform fade method can be used for all frames. The fade method can be the name of a built-in fade method or a Bessel control point.

The following are some of the commonly used fade methods:

- `linear`: maintains the original scale, i.e. linear gradient, which is used by default when no gradient is specified
- `constant`: always use scale 0, i.e. no gradient, similar to interpolation `Step`.
- `quadIn`: fade from slow to fast
- `quadOut`: fade from fast to slow
- `quadInOut`: fading from slow to fast to slow again
- `quadOutIn`: fade from fast to slow to fast

<!--
<script src="./easing-method-example.js"> </script>
<button onclick="onEasingMethodExampleButtonClicked()">Expand Comparison</button>
<div id="easing-method-example-panel"> </div>
-->

### Curve values and interpolation methods

Some interpolation algorithms require additional data to be stored in the curve value for each frame, so the curve value is not necessarily the same as the value type of the target property. For numeric types or value types, Cocos Creator provides several general interpolation methods. Also, it is possible to define custom interpolation methods.

- When the `interpolate` property of the curve data is `true`, the curve will try to use the interpolation function.

    - If the curve value is of type `number`, `Number`, linear interpolation will be applied.
    - If the curve value inherits from `ValueType`, the `lerp` function of `ValueType` will be called to complete the interpolation. `lerp` methods for most value types built into Cocos Creator are implemented as linear interpolation, e.g.: `Vec3`, `vec4`, etc.
    - If the curve value is [interpolable](%__APIDOC__%/en/#/docs/3.3/en/animation/Interface/ILerpable), the `lerp` function for the curve value will be called to complete the interpolation[^1].

- If the curve value does not satisfy any of the above conditions, or when the `interpolate` property of the curve data is `false`, no interpolation will be performed and the curve value from the previous frame will always be used as the result.

    ```ts
    import { AnimationClip, color, IPropertyCurveData, SpriteFrame, Vec3 } from 'cc';

    const animationClip = new AnimationClip();

    const keys = [ 0, 0.5, 1.0, 2.0 ];
    animationClip.duration = keys.length === 0 ? 0 : keys[keys.length - 1];
    animationClip.keys = [ keys ]; // All curves share one column of frame time

    // Linear interpolation using values
    const numberCurve: IPropertyCurveData = {
        keys: 0,
        values: [ 0, 1, 2, 3 ],
        /* interpolate: true, */ // "interpolate" property is on by default
    };

    // Using lerp() of value type Vec3
    const vec3Curve: IPropertyCurveData = {
        keys: 0,
        values: [ new Vec3(0), new Vec3(2), new Vec3(4), new Vec3(6) ],
        interpolate: true,
    };

    // No interpolation (because interpolation is explicitly disabled)
    const colorCuve: IPropertyCurveData = {
        keys: 0,
        values: [ color(255), color(128), color(61), color(0) ],
        interpolate: false, // No interpolation
    };

    // No interpolation (because SpriteFrame cannot be interpolated)
    const spriteCurve: IPropertyCurveData = {
        keys: 0,
        values: [
            new SpriteFrame(),
            new SpriteFrame(),
            new SpriteFrame(),
            new SpriteFrame()
        ],
    };
    ```

- Custom interpolation algorithm

    The sample code is as follows:

    ```ts
    import { ILerpable, IPropertyCurveData, Quat, quat, Vec3, vmath } from 'cc';

    class MyCurveValue implements ILerpable {
        public position: Vec3;
        public rotation: Quat;

        constructor(position: Vec3, rotation: Quat) {
            this.position = position;
            this.rotation = rotation;
        }

        /** This method will be called for interpolation
         * @param this initial curve value
         * @param to target curve value
         * @param t interpolation ratio, in the range [0, 1]
         * @param dt the frame time interval between the starting curve value and the target curve value
         */
        lerp (to: MyCurveValue, t: number, dt: number) {
            return new MyCurveValue(
                // The position property is not interpolated
                this.position.clone(),
                // The rotation property uses Quat's lerp() method
                this.rotation.lerp(to.rotation, t), //
            );
        }

        /** This method is called when not interpolating
         * It is optional, if this method is not defined, then the curve value itself (i.e. this) is used as the result value
         */
        getNoLerp () {
            return this;
        }
    }

    /**
     * Creates a curve that implements a smooth rotation but abrupt position change throughout the cycle.
     */
    function createMyCurve (): IPropertyCurveData {
        const rotation1 = quat();
        const rotation2 = quat();
        const rotation3 = quat();

        vmath.quat.rotateY(rotation1, rotation1, 0);
        vmath.quat.rotateY(rotation2, rotation2, Math.PI);
        vmath.quat.rotateY(rotation3, rotation3, 0);

        return {
            keys: 0 /* frame time */,
            values: [
                new MyCurveValue(new Vec3(0), rotation1),
                new MyCurveValue(new Vec3(10), rotation2),
                new MyCurveValue(new Vec3(0), rotation3),
            ],
        };
    }
    ```

## Wrap mode

Different wrap modes can be set for Animation Clips by setting `AnimationClip.wrapMode`. The following lists several common wrap modes:

| Property | Description |
| :--- | :--- |
| Normal | Playback stops at the end |
| WrapMode.Loop | Loop
| PingPong | Play from the beginning to the end of the animation, then play back to the beginning from the end, and so on.

For more wrap modes, please refer to the [WrapMode](%__APIDOC__%/en/#/docs/3.3/en/animation/Class/AnimationState?id=wrapmode) API and the [Wrap Mode and Repeat Count](./animation-state.md#wrap-mode-and-repeat-count) documentation.

[^1]: For numeric, quaternion, and various vectors, Cocos Creator provides the appropriate interpolate classes to implement [Cubic Spline Interpolation](https://en.wikipedia.org/wiki/Spline_interpolation).
