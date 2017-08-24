# Particle System

## Importing a particle asset
Put the Cocos2d-s supported particle `.plist` directly under the project catalogue.

![imported](particle/imported.png)

## Adding a particle system to the scene
Method one: drag particle assets directly from **assets** to **Node Tree**:

![drag-to-hierarchy](particle/drag-to-hierarchy.png)

Method two: drag particle assets directly from **assets** to **scene editor**:

![drag-to-scene](particle/drag-to-scene.png)

Method three: add a **ParticleSystem** component to the existing node and give particle assets to the component `File` attribute in **assets**:

![drag-to-inspector](particle/drag-to-inspector.png)
Note: The import of the sourcePosition property in the `.plist` file is not supported.

## Stored in the project

In order to improve the efficiency of resource management, it is recommended that you import `plist` and` png` (if you have a map) file in a separate directory, do not mix with other resources.

## Fixing render error 

The png map file used by the particle or the built-in picture file in base64 format may have incorrect pre-multiplication information, causing the rendered particles to  display the transparent area incorrectly. If this happens, manually modify the blendFuncSource property in the particle plist file to the following value:

```xml
    <key>blendFuncSource</key>
    <integer>770</integer>
```
<hr>

Continue on to read about [Audio assets](audio-asset.md).
