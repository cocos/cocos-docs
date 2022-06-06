# 2D Joint Component

The physics system contains a series of __Joint__ components for linking two rigidbodies. **Joint** components can be used to simulate the interaction between real objects, such as __hinges__, __pistons__, __ropes__, __wheels__, __pulleys__, __motor vehicles__, __chains__ and so on. Learning how to use joint components can effectively help create a truly interesting scene.

> __Note__: joint components are invalid in the Builtin 2D physics module.

The following joints are available in the physics system:

- __DistanceJoint2D__: The anchors of two rigidbodies at both ends of the joint will keep a certain distance.
- __FixedJoint2D__: Hold two points on two objects together according to their initial angles of view.
- __HingeJoint2D__: Think of it as a hinge or a nail, where the rigid body rotates around a common point.
- __MouseJoint2D__: When dragging a rigid body with the mouse, the rigid body will move with the mouse.
- __RelativeJoint2D__: Control the relative motion between two rigid bodies
- __SliderJoint2D__: The angle between two rigid body positions is fixed, and they can only slide in one specified axis.
- __SpringJoint2D__: Connects objects at both ends of the joint like a spring.
- __WheelJoint2D__: Consist of Revolute and Prismatic joint, used to simulate motor vehicle wheels.

For information on using each Joint component, please refer to the [Joints example case](https://github.com/cocos/cocos-test-projects/tree/v3.3/assets/cases/dragonbones) for details.

## Common properties of joints

Although each joint has a different behavior, they have some common properties.

- __connectedBody__: the rigidbody connected on the other end of the joint.
- __anchor__: the anchor of the rigidbody on the same node of the joint.
- __connectedAnchor__: the anchor of the rigidbody connected at the other end of the joint
- __collideConnected__: whether the rigidbody at both ends of the joint can collide with each other

Each joint need to link two rigidbodies to work. The one on the same node of the joint and the one on another node, which will be assigned to **connectedBody** property. Usually, each rigid body chooses a location around itself as an anchor point. Depending on the type of joint component, the anchor point determines the center of rotation of the object, or a coordinate point to hold a certain distance, etc.

**collideConnected** property is used to determine if the rigid bodies at both ends of the joint need to continue to follow the normal collision rules. For example, when ready to make a ragdoll, you may want the upper and lower leg can be partially intersected, and then linked at the knee joint. You will need to set **collideConnected** property to false. If you are making a lift, you may want the lift platform and floor to collide, then you need to set the **collideConnected** property to true.
