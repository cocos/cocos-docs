# Advance Settings

> Authors: Xunyi, youyou

Box2D provides a lot of parameters to change the physical running state. In addition to `RigidBody`, `Collider`, `Joint`, `World`, there are some parameters that belong to the Box2D internal macro. The parameters of these macros can be found at the beginning of the **box2d.js (web platform)** / **Box2D/Common/b2Settings.h (native platform)** file.

The parameters required for each physical game may be different, and different conditions may require different parameter configurations. Some macro parameters are introduced below. In some cases, adjusting these macro parameters can result in better physical simulation effects.

## Example

- `b2_velocityThreshold` (The default is **1.0f**)

> The velocity threshold for elastic collisions. If the relative velocity is less than the velocity threshold when the collision occurs, then this collision will be considered an inelastic collision.

Case 1: When a great gravity is set for the physical world, or the **gravity scale** of a rigid body is set to a large, When a rigid body lands on a platform, it is possible that the rigid body is shaking and cannot be stopped because the speed is always greater than the threshold value.<br>
**Solution**: Increase the threshold of `b2_velocityThreshold`

Case 2: Like billiard games this type of game may occur when a small ball touches and docks on the edge of the table, the ball can no longer be separated from the edge.<br>
**Solution**: Lower the threshold of `b2_velocityThreshold`
