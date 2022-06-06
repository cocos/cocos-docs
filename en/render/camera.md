# Camera

The camera is the window that the player observes the game world, the scene must have at least one camera, also can have multiple cameras at the same time. When creating a scene, Creator creates a camera named `Main Camera` by default as the main camera for this scene. Multi-camera support allows you to easily implement advanced customization effects, such as the two-player split screen effect, or the creation of a small scene map.

![](camera/camera.png)

## Camera Properties

- **cullingMask**

  `cullingMask` will determine which parts of the scene the camera is used to render. The `cullingMask` in the camera component in the **Properties** lists the currently available mask options, and you can combine them to generate `cullingMask` by selecting these options.

  For example, the `cullingMask` setting in the following figure indicates that the camera is used only to render the UI part of the game. Generally game UI does not need to be moved, but the player may move out of the screen, then you need another camera to follow the player.

  ![camera-1](camera/camera-1.png)

  You can add or change groups through **Group Manager** in the **Project Settings**, which is the corresponding mask.

  ![](camera/mask-setting.png)

- **zoomRatio**

  Specifies the zoom ratio of the camera, and the larger the value, the larger the image displayed.

- **clearFlags**

  Specifies the cleanup action that needs to be made when rendering the camera.

  ![camera-2](./camera/camera-2.png)

- **backgroundColor**

  When the camera needs to clear the color, the camera will use the background color to clear the scene.

- **depth**

  Camera depth, used to determine the order in which the camera is rendered. The larger the value, the later the camera is rendered.

- **targetTexture**

  If you set the `targetTexture`, the contents of the camera render will not be printed on the screen, but will be rendered to the `targetTexture`.

  If you need to do some of the screen's post-effects, you can first render the screen to `targetTexture`, and then for the `targetTexture` to do the overall processing, finally through a `sprite` to show the `targetTexture`.

  Please refer to the [Example](https://github.com/cocos/example-projects/blob/next/assets/cases/07_render_texture/render_to_sprite.js#L31) for details.

### Advanced attribute

These advanced attributes are not displayed in the **Assets** until the camera node becomes a [3D node](../3d/3d-node.md).

- fov

Determines the width of the camera's view angle, this attribute will take effect when the camera is in perspective projection mode.

- orthoSize

The viewport size of the Camera when set to orthographic projection.

- nearClip

The near clipping plane of the camera.

- farClip

The far clipping plane of the camera.

- ortho

Sets whether the projection mode of the camera is orthogonal (true) or perspective (false) mode.

- rect

Determines where the camera is drawn on the screen, with four values (0-1).

## Camera methods

- **cc.Camera.findCamera**

  `findCamera` gets the first matching camera by finding whether the camera `cullingMask` contains a  node's group.

  ```javascript
  cc.Camera.findCamera(node);
  ```

- **containsNode**

  Detect whether the node is affected by this camera

- **render**

  If you need to render the camera immediately, you can call this method to manually render the camera, such as when capturing a screenshot.

  ```javascript
  camera.render();
  ```

### Coordinate translation

A common problem is that when the camera is moved, rotated, or scaled, the coordinates acquired by the click event are used to test the coordinates of the node, which often results in incorrect results.

Because the click coordinates obtained at this time are the coordinates in the camera coordinate system, we need to transform this coordinate into the world coordinate system to continue the operation with the node's world coordinates.

Here are some functions of camera coordinate transformation:

```javascript
// Transform a point from camera coordinates to world coordinates
camera.getCameraToWorldPoint(point, out);
// Transform a point from world coordinates to camera coordinates
camera.getWorldToCameraPoint(point, out);

// Gets the matrix from the camera coordinate system to the world coordinate system
camera.getCameraToWorldMatrix(out);
// Gets the matrix from world coordinate system to the camera coordinate system
camera.getWorldToCameraMatrix(out);
```

## Screenshot

Screenshot is a very common demand in the game, through the camera and rendertexture we can quickly achieve a screenshot function. For the screenshot, there is a complete test example in example-case, the code example please refer to [07_capture_texture](https://github.com/cocos/example-projects/tree/master/assets/cases/07_capture_texture).

```javascript
let node = new cc.Node();
node.parent = cc.director.getScene();
let camera = node.addComponent(cc.Camera);

// Set the CullingMask of the screenshot you want
camera.cullingMask = 0xffffffff;

// Create a new RenderTexture and set this new RenderTexture to the camera's targetTexture so that the camera content will be rendered to this new RenderTexture
let texture = new cc.RenderTexture();
let gl = cc.game._renderContext;
// If the Mask component is not included in the screenshot, you don't need to pass the third parameter.
texture.initWithSize(cc.visibleRect.width, cc.visibleRect.height, gl.STENCIL_INDEX8);
camera.targetTexture = texture;

// Render the camera once, updating the content once into RenderTexture
camera.render();

// This allows the data to be obtained from the rendertexture.
let data = texture.readPixels();

// Then you can manipulate the data.
let canvas = document.createElement('canvas');
let ctx = canvas.getContext('2d');
let width = canvas.width = texture.width;
let height = canvas.height = texture.height;

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

### Save screenshot file

Creator has added the ability to save screenshot files since **v2.0.2**. First take a screenshot, and then use the following method after `readPixels`:

```js
var data = renderTexture.readPixels();
var filePath = jsb.fileUtils.getWritablePath() + 'Image.png';
jsb.saveImageData(data, imgWidth, imgHeight, filePath)
```

Please refer to [capture_to_native](https://github.com/cocos/example-projects/blob/master/assets/cases/07_capture_texture/capture_to_native.js) for details.

## The screenshot in WeChat

Because of WeChat Mini Games does not support createImageData, nor does it support creating image with data url, so the above method needs some flexibility. After using Camera to render the desired results, use WeChat's screenshot API: [canvas.toTempFilePath](https://developers.weixin.qq.com/minigame/en/dev/api/render/canvas/Canvas.toTempFilePath.html) to save and use the screenshot.

## Case

Please refer to [example-case](https://github.com/cocos/example-projects/blob/next/assets/cases/07_render_texture/render_to_canvas.js) for details, create a sample collection project from the editor to see the actual running effect.
