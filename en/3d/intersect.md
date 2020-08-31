# Collision Detection

> Authors: Xunyi, youyou

Cocos Creator provides a set of API for detecting 3D object collision, and user can use these APIs for detection such as raycast.

## Raycast

- `cc.geomUtils.intersect.raycast(rootNode, ray, handler, filter)`

    ```js
    // Get a ray from the screen that is directed to the screen based on the point clicked
    let ray = camera.getRay(touchPos);
    // Detects downward based on the incoming root node and returns the detection results
    // The returned result contains the node and distance
    let results = cc.geomUtils.intersect.raycast(cc.director.getScene(), ray);
    for (let i = 0; i < results.length; i++) {
        results[i].node.opacity = 100;
    }
    ```

    If you want to detect more accurately, you can pass in a `handler` function to detect.

    ```js
    let handler = function (modelRay, node, distance) {
        // modelRay is the ray that ray convert to the node's local coordinate system
        let meshRenderer = node.getComponent(cc.MeshRenderer);
        if (meshRenderer && meshRenderer.mesh) {
            // If a mesh renderer is present, the mesh is detected. Although it consumes more performance, but the detection is more accurate
            return cc.geomUtils.intersect.rayMesh(modelRay, meshRenderer.mesh);
        }

        // return
        return distance;
    };

    let results = cc.geomUtils.intersect.raycast(cc.director.getScene(), ray, handler);
    ```
