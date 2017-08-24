# Joint

The physics system contains a series of **Joint** components for linking two rigidbodies. Joint components can be used to simulate the interaction between real objects, such as hinges, pistons, ropes, wheels, pulleys, motor vehicles, chains and so on. Learning how to use joint components can effectively help create a truly interesting scene.

The following joints are available in the physics system:

- **Revolute Joint**: The joint that can rotate, can be seen as a hinge or axis, rigidbodies connected to the joint will rotate around a single point.
- **Distance Joint**: The anchors of two rigidbodes at both ends of the joint will keep a certain distance.
- **Prismatic Joint**: The angle between the positions of two rigidbodies is fixed, they can only slide along a specified axis.
- **Weld Joint**: The joint binds two points on two objects based on the initial angle of the two objects.
- **Wheel Joint**: Consist of Revolute and Prismatic joint, used to simulate motor vehicle wheels.
- **Rope Joint**: A rope joint that constrains the rigidbody at both ends of the joint within a maximum range.
- **Motor Joint**: Controls the relative movement between two rigidbodies.

## Common properties of joints

Although each joint has a different behavior, they have some common properties.

- `connectedBody`: the rigidbody connected on the other end of the joint.
- `anchor`: the anchor of the rigidbody on the same node of the joint.
- `connectedAnchor`: the anchor of the rigidbody  connected at the other end of the joint
- `collideConnected`: - whether the rigidbody at both ends of the joint can collide with each other

Each joint need to link two rigidbodies to work. The one on the same node of the joint and the one on another node, which will be assigned to `connectedBody` property.

Normally, each rigidbody will set this point around its surrounding position.
Depending on the type of joint component, this determines the axis of rotation of the object, or the coordinate point used to maintain a certain distance, and so on.

`collideConnected` property allows you to decide whether the rigidbody at both ends of the joint needs to continue to follow conventional collision rules.
For example, if you are now ready to make a ragdoll, you may want the upper and lower leg can be partially intersected, and then linked at the knee joint. You will need to set `collideConnected` property to false.
If you are making a lift, you may want the lift platform and floor to collide, then you need to set the `collideConnected` property to true.