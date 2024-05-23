# 碰撞检测

> 文：youyou

Cocos Creator 提供了一套用于检测 3D 物体碰撞的 API，用户可以使用这些 API 做射线检测之类的检测。

## 射线检测

- `cc.geomUtils.intersect.raycast(rootNode, ray, handler, filter)`

    ```js
    // 根据点击的点获取一条由屏幕射向屏幕内的射线
    let ray = camera.getRay(touchPos);
    // 根据传入的根节点向下检测，并返回检测结果
    // 返回的结果包含了节点和距离
    let results = cc.geomUtils.intersect.raycast(cc.director.getScene(), ray);
    for (let i = 0; i < results.length; i++) {
        results[i].node.opacity = 100;
    }
    ```

    如果希望检测的更精确，可以传入一个 `handler` 函数进行检测。

    ```js
    let handler = function (modelRay, node, distance) {
        // modelRay 为 ray 转换到 node 本地坐标系下的射线

        let meshRenderer = node.getComponent(cc.MeshRenderer);
        if (meshRenderer && meshRenderer.mesh) {
            // 如果有 mesh renderer，则对 mesh 进行检测，虽然比较消耗性能，但是检测会更加精确
            return cc.geomUtils.intersect.rayMesh(modelRay, meshRenderer.mesh);
        }

        // 返回
        return distance;
    };

    let results = cc.geomUtils.intersect.raycast(cc.director.getScene(), ray, handler);
    ```
