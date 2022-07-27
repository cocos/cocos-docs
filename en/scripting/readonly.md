### Development Considerations

- `Readonly` Property description

   - The method of directly calling the interface to modify the value through the `Readonly` attribute does not guarantee that it will take effect on each platform. Including but not limited to the attributes listed below: `position` `rotation` `scale` `worldPosition` `worldRotation` `worldScale` `eulerAngles` `worldMatrix`. Such as
        ```typescript
        this.node.worldPosition.add(xxx);
        ```
        On some platforms, the result of `add` here is not saved to worldPosition. 