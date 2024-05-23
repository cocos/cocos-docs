# Physics Collider Component

**Physics Collider Component** inherit from **Collider Component**. You can learn how to setup and edit **Physics Collider Component** by reading [Edit Collider Compnent](../collision/edit-collider-component.md).

## Physics Collider Properties

- `sensor`: Indicates whether the collider is a sensor type, that the collision of the collider only produces a collision callback, but no collision behavior occurs.
- `density`: the density of the collider used for the mass calculation of rigidbody.
- `friction`: the friction of the collider. The movement of the collider will be affected by the friction.
- `restitution`: The elasticity of the collider, indicating whether the collision will be affected by the impact of elastic.

### Physics Collider Internal Details

The physics collider is composed of the `b2Fixture` of Box2d. Due to some limitations within Box2d, a polygon physics collider may consist of multiple b2Fixture.

These conditions are:

1. When the vertices of the polygon physics collider assembly are of a concave shape, the physics system automatically divides the vertices into multiple convex shapes.
2. When the number of vertices of the polygon physics collider is greater than `b2.maxPolygonVertices` (typically 8), the physics system automatically divides the vertices into multiple convex shapes.

In general, these details do not need to be concerned. But when using ray detection and detection type `cc.RayCastType.All`, a collider may detect multiple collision points, because it detected multiple b2Fixture at the same time.
