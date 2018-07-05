# Camera

The camera is the window that the player observes the game world, the scene must have at least one camera, also can have multiple cameras at the same time. When creating a scene, Creator creates a camera named `Main Camera` by default as the main camera for this scene. Multi-camera support allows you to easily implement advanced customization effects, such as the two-player split screen effect, or the creation of a small scene map.

## Camera attribute

- cullingMask

`cullingMask` will determine which parts of the scene the camera is used to render. The `cullingMask` in the camera component in the **Properties** lists the mask options currently available, and you can combine them to generate `cullingMask` by selecting these options.

For example, the `cullingMask` setting in the following figure indicates that the camera is used only to render the UI part of the game, that the UI part of the game does not need to be moved, and that the game node may move out of the screen, requiring another camera to follow the game node.

![camera-1](./camera/camera-1.png)

You can add or change groupings through **Group Manager** in the **Project Settings**, which is the corresponding mask.

- zoomRatio

Specifies the zoom ratio of the camera, and the larger the value, the larger the image displayed.

- clearFlags

Specifies the cleanup action that needs to be made when rendering the camera.

![camera-2](./camera/camera-2.png)

- backgroundColor

When you specify that the camera needs to clear the color, the camera uses the set background color to clear the scene.

- depth

Camera depth, used to determine the order in which the camera is rendered. The larger the value, the later the camera is rendered.

- targetTexture

If you set the `targetTexture`, the contents of the camera render will not be printed on the screen, but will be rendered to the `targetTexture`.

If you need to do some of the screen's post-effects, you can first render the screen to `targetTexture`, and then for the `targetTexture` to do the overall processing, finally through a `sprite` to show the `targetTexture`.

Please refer to the [Example](https://github.com/cocos-creator/example-cases/blob/next/assets/cases/07_render_texture/render_to_sprite.js#L31)
for details.

## Camera methods

- cc.Camera.findCamera

`findCamera` gets the first matching camera by finding whether the `cullingMask` of all current cameras contains a node's `group`.

```javascript
cc.Camera.findCamera(node);
```

- containsNode

Detect whether the node is affected by this camera

- render

If you need to render the camera immediately, you can call this method to manually render the camera, such as when a screenshot is needed.

```javascript
camera.render();
```

### Coordinate translation

A common problem is that when the camera is moved, rotated, or scaled, the coordinates acquired by the click event are used to test the coordinates of the node, which often results in incorrect results.

Because the click coordinates obtained at this time are the coordinates in the camera coordinate system, we need to transform this coordinate into the world coordinate system to continue the operation with the node's world coordinates.

Here are some functions of camera coordinate transformation：

```javascript
// Transform a point in camera coordinates to world coordinates
camera.getCameraToWorldPoint(point, out);
// Transform a point in world coordinates to camera coordinates
camera.getWorldToCameraPoint(point, out);

// Gets the matrix from the camera coordinate system to the world coordinate system
camera.getCameraToWorldMatrix(out);
// Gets the matrix from world coordinate system to the camera coordinate system
camear.getWorldToCameraMatrix(out);
```

## Screenshot

Screenshot is a very common demand in the game, through the camera and rendertexture we can quickly achieve a screenshot function.

```javascript
let node = new cc.Node();
node.parent = cc.director.getScene();
let camera = node.addComponent(cc.Camera);

// Set the CullingMask of the screenshot you want
camera.cullingMask = 0xffffffff;

// Create a new RenderTexture and set this new RenderTexture to the camera's targetTexture so that the camera content will be rendered to this new RenderTexture
let texture = new cc.RenderTexture();
texture.initWithSize(cc.visibleRect.width, cc.visibleRect.height);
camera.targetTexture = texture;

// Render the camera once, updating the content once into RenderTexture
camera.render();

// This allows the data to be obtained from the rendertexture.
let data = texture.readPixels();

// Then you can manipulate the data.
let canvas = document.createElement('canvas');
let ctx = canvas.getContext('2d');
canvas.width = texture.width;
canvas.height = texture.height;

let rowBytes = width * 4;
for (let row = 0; row < height; row++) {
    let srow = height - 1 - row;
    let imageData = ctx.createImageData(width, 1);
    let start = srow*width*4;
    for (let i = 0; i < rowBytes; i++) {
        imageData.data[i] = data[start+i];
    }

    ctx.putImageData(imageData, 0, row);
}

let dataURL = canvas.toDataURL("image/jpeg");
let img = document.createElement("img");
img.src = dataURL;

```

Please refer to the [Case](https://github.com/cocos-creator/example-cases/blob/next/assets/cases/07_render_texture/render_to_canvas.js)