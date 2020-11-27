# Animation clip

An __Animation Clip__ is a set of __Animation Curves__ that contains all animation data.

## Animation Curve

The __Animation Curve__ describes the change of a certain attribute value on an object with time. Internally, the __Animation Curve__ stores a series of time points, and each time point corresponds to a (curve) value, called a **frame**, or **key frame**.

When the animation system is operating, the __Animation Component__ calculates the (result) value at the specified time point according to the current animation state and assigns it to the object to complete the attribute change; this calculation process is called sampling.

The following code snippet demonstrates how to create __Animation Clips__ programmatically:

```ts
import { AnimationClip, animation, js } from "cc";
const animationClip = new AnimationClip();
animationClip.duration = 1.0; // The cycle of the entire animation clip, no frame time should be greater than this attribute.
animationClip.keys = [ [ 0.3, 0.6, 0.9 ] ]; // Frame time shared by all curves of this animation clip
animationClip.curves = [{ // The property curve on the component
    modifiers: [ // The target is the current node
        //  "Body" child node
        new animation.HierarchyPath('Body'),
        // 'MyComponent'
        new animation.ComponentPath(js.getClassName(MyComponent)),
        // 'value' attribute
        'value',
    ],
    data: {
        keys: 0, // Index to 'AnimationClip.keys', ie [0.3, 0.6, 0.9]
        values: [ 0.0, 0.5, 1.0 ],
    },
}];
```

The above __Animation Clip__ contains a curve to control the `value` property of the `MyComponent` component of the **Body** sub-node. The curve has three frames, so that the `value` property becomes 0.5 at 0.3 seconds and 0.5 at 0.6 seconds and then becomes 1.0 at 0.9 seconds.

> **Note**: the frame time of the curve is indexed into the `AnimationClip.keys` array by reference. Multiple curves can share the frame time. This **will** bring additional performance optimizations.

### Target

The __target__ of the __Animation Curve__ can be any JavaScript object. The `modifiers` field specifies how _runtime_ addresses the current node object to the target object.

`modifiers` is an array, each element of it expresses how to address from the object at the upper level to another object. The object addressed by the last element is the target object of the curve. This behavior is like a file system path, so each element is called a __target path__.

When the target path is `string`/`number`, this indicates the attribute addressed to the upper-level object, which itself specifies the attribute name. Otherwise, the target path must be an object that implements the interface `animation.TargetPath`.

__Cocos Creator__ has the following built-in classes that implement the self-interface `animation.TargetPath`:
- `animation.HierarchyPath` treats the upper-level object as a node and addresses it to one of its child nodes;
- `animation.ComponentPath` treats the upper-level object as a node and addresses it to one of its components.

Target paths can be combined arbitrarily, as long as they have the correct meaning:

```typescript
// The target object is
modifiers: [
    // "nested_1" child node "nested_2" child node "nested_3" child node
    new animation.HierarchyPath('nested_1/nested_2/nested_3'),
    // 'BlahBlahComponent' component
    new animation.ComponentPath(js.getClassName(BlahBlahComponent)),
    // of the 'names' attribute
    'names',
    // The first element
    0,
]
```

When your target object is not a property, but must be returned from a method, custom target path is useful:

```ts
class BlahBlahComponent extends Component {
    public getName(index: number) { return _names[index]; }
    private _names: string[] = [];
}

// The target object is
modifiers: [
    // "nested_1" child node "nested_2" child node "nested_3" child node
    new animation.HierarchyPath('nested_1/nested_2/nested_3'),
    // 'BlahBlahComponent' component
    new animation.ComponentPath(js.getClassName(BlahBlahComponent)),
    // of the 'names' attribute
    {
        get: (target: BlahBlahComponent) => target.getName(0),
    },
]
```

If you want your custom target paths to be serializable, declare them as classes:

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

// Target
modifiers: [
    "nested_1" child node "nested_2" child node "nested_3" child node
    new animation.HierarchyPath('nested_1/nested_2/nested_3'),
    // 'BlahBlahComponent' component
    new animation.ComponentPath(js.getClassName(BlahBlahComponent)),
    // of the 'names' attribute
    new MyPath(0),
]
```

The addressing of the target object is done at runtime, this feature allows __Animation Clips__ to be reused on multiple objects.

### Assignment

When the value is sampled, the assignment operator `=` will be used to set the value to the target object by default.

Sometimes, however, it is not possible use the assignment operator to set values. For example, when the uniform of a `Material` object needs to be set, it cannot be performed through the assignment operator. This is because the `Material` object only provides `setUniform(uniformName, value)` method to change the uniform.

For this case, the curve field `valueAdapter` provides a mechanism for you to customize how the value to the target object is set.

Examples are as follows:

```ts
class BlahBlahComponent {
    public setUniform(index: number, value: number) { /* */ }
}

{ // Curve
    valueAdapter: {
        // Called when the curve is instantiated
        forTarget(target: BlahBlahComponent) {
            // do something useful here
            return {
                // Called every time the value of the target
                // object is set
                set(value: number) {
                    target.setUniform(0, value);
                }
            };
        }
    },
};
```

If you want your __custom assignments__ to be serializable, declare them as classes:

```ts
@ccclass
class MyValueProxy implements animation.ValueProxyFactory {
    @property
    public index: number = 0;
    constructor(index: number) { this.index = index; }
    // Called when the curve is instantiated
    public forTarget(target: BlahBlahComponent) {
        // do something useful here
        return {
            // Called every time the value of the target object
            // is set
            set(value: number) {
                target.setUniform(0, value);
            }
        };
    }
}
```

`animation.UniformProxyFactory` is one such example of a __custom assignment__ class, that implements the uniform value of setting the material:

```ts
{ // the target object
    modifiers: [
        // 'MeshRenderer' Component
        new animation.ComponentPath(js.getClassName(MeshRenderer)),
        // 'sharedMaterials' attribute
        'sharedMaterials',
        // The first material
        0,
    ],
    valueAdapter: new animation.UniformProxyFactory(
        0, // Pass index
        'albedo', // Uniform name
    ),
};
```

### Sampling

If the sampling time point is exactly equal to the time point of a key frame, the animation data on the key frame is used.

Otherwise, when the sampling time is between two frames, the resulting value should be affected by the two frames of data at the same time. The ratio of the sampling time point to the time interval of two key frames (`[0,1]`) reflects the degree of influence.

__Cocos Creator__ allows this ratio to be mapped to another ratio to achieve different __gradient__ effects. These mapping methods are called **gradient methods**. After the ratio is determined, the final result value is calculated according to the specified **interpolation method**. Both the **gradient** and **interpolation** methods affect the smoothness of the animation.

#### Gradient method

You can specify the **gradient** method for each frame, or you can specify a uniform gradient method for all frames. The **gradient** method can be the name of the built-in **gradient** method or the **Bezier control** point.

The following lists several commonly used gradient methods.
- `linear` keeps the original ratio, that is, linear gradient; this method is used by default when no gradient method is specified.
- `constant` always uses a scale of 0, i.e. no gradient; similar to the interpolation method `Step`;
- The gradient of `quadIn` changes from slow to fast.
- The gradient of `quadOut` changes from fast to slow.
- The gradient of `quadInOut` changes from slow to fast to slow again.
- The gradient of `quadOutIn` changes from fast to slow to fast.
- `IBezierControlPoints`

<script src="./easing-method-example.js"> </script>
<button onclick="onEasingMethodExampleButtonClicked()">Expand comparison</button>
<div id="easing-method-example-panel"> </div>

#### Curve value and interpolation method

Some **interpolation** algorithms require additional data to be stored in the curve value of each frame. Therefore, the value type of the curve value and the target attribute are not necessarily the same.
For numeric types or value types, **Cocos Creator** provides several general interpolation methods. Also, custom interpolation method can be defined.

When the `interpolate` property of the curve data is `true`, the curve will try to use the **interpolation** function:
- If the type of curve value is `number`, `Number`, **linear interpolation** will be applied;
- If the curve value inherits from `ValueType`, the `lerp` function of `ValueType` will be called to complete the **interpolation**. Most of the value types built into **Cocos Creator** implement its `lerp` as **linear interpolation**.
- If the curve value is [interpolable](https://docs.cocos.com/creator3d/api/en/interfaces/animation.ilerpable.html), the curve value's `lerp` function will be called to complete the **interpolation** <sup id="a2">[2](#f2)</sup>.

If the curve value does not satisfy any of the above conditions, or when the `interpolate` property of the curve data is `false`, there will be no interpolation operation. Always use the curve value of the previous frame as the result.

```ts
import { AnimationClip, color, IPropertyCurveData, SpriteFrame, v3 } from "cc";

const animationClip = new AnimationClip();

const keys = [ 0, 0.5, 1.0, 2.0 ];
animationClip.duration = keys.length === 0 ? 0 : keys[keys.length - 1];
animationClip.keys = [ keys ]; // All curves share a list of frame times

// Linear interpolation using values
const numberCurve: IPropertyCurveData = {
    keys: 0,
    values: [ 0, 1, 2, 3 ],
    // The interpolate property is turned on by default
    /* interpolate: true, */
};

// Use lerp() of value type Vec3
const vec3Curve: IPropertyCurveData = {
    keys: 0,
    values: [ v3(0), v3(2), v3(4), v4(6) ],
    interpolate: true,
};

// No interpolation (because interpolation is explicitly disabled)
const colorCuve: IPropertyCurveData = {
    keys: 0,
    values: [ color(255), color(128), color(61), color(0) ],
    interpolate: false, // No interpolation
};

// No interpolation (because SpriteFrame cannot interpolate)
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

The following code shows how to customize the **interpolation** algorithm:

```ts
import { ILerpable, IPropertyCurveData, Quat, quat, Vec3, v3, vmath } from "cc";

class MyCurveValue implements ILerpable {
    public position: Vec3;
    public rotation: Quat;

    constructor(position: Vec3, rotation: Quat) {
        this.position = position;
        this.rotation = rotation;
    }

    /** this method will be called for interpolation
     * @param this starting curve value
     * @param to target curve value
     * @param t to target curve value
     * @param dt he frame time interval between the start curve value and the target curve value
     */
    lerp (to: MyCurveValue, t: number, dt: number) {
        return new MyCurveValue(
            // The position attribute is not interpolated
            this.position.clone(),
            // Rotate property uses Quat's lerp() method
            this.rotation.lerp(to.rotation, t),
        );
    }

    /** This method is called without interpolation.
       * It is optional, if this method is not defined, the curve value itself (ie `this`) is used as the result value.
    */
    getNoLerp () {
        return this;
    }
}

/**
  * A curve is created, which realizes a smooth rotation but a sudden change of position throughout the cycle.
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
            new MyCurveValue(v3(0), rotation1),
            new MyCurveValue(v3(10), rotation2),
            new MyCurveValue(v3(0), rotation3),
        ],
    };
}
```

## Loop Mode

You can set different **loop modes** for __Animation Clips__ by setting `AnimationClip.wrapMode()`.

The table below represents several commonly used **looping** modes:

| AnimationClip.wrapMode | Description |
| :--- | :--- |
| **WrapMode.Normal** | Stop after playing to the end. |
| **WrapMode.Loop** | Loop playback. |
| **WrapMode.PingPong** | After playing from the beginning to the end of the animation, play backwards from the end to the beginning, and so on |

For more **looping** modes, see [WrapMode](https://docs.cocos.com/creator3d/api/en/enums/animation.wrapmode.html).

<b id="f1">1</b>The node of the __Animation Clip__ is the node attached to the __Animation Component__ that guides the use of the __Animation State__ object of the __Animation Clip__. [↩](#a1)<br>
<b id="f2">2</b> For numerical values, quaternions, and various vectors, Cocos Creator provides corresponding interpolable classes to implement [cubic spline interpolation](https://en.wikipedia.org/wiki/Spline_interpolation). [↩](#a2)
