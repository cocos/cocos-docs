# 灯光组件参考

灯光组件定义了光源的类型，颜色，强度以及产生的阴影类型，在场景中加入灯光能使模型渲染得更加立体，更详细的介绍请看 [灯光](lighting.md)。

![light-component](img/light-component.jpg)

| 属性 |   功能说明
| -------------- | ----------- |
| Type | 目前 Cocos Creator 支持的灯光类型有 Directional（平行光）, Point（点光源）, Spot（聚光灯），不同的类型表现会有些差别，具体见 [灯光](lighting.md)
| Color | 灯光的颜色
| Intensity | 光源光照的强度，值越大光照越亮
| Range | 光照半径范围（只能给点光源和聚光灯使用）
| Spot Angle | 光照角度范围（只能给聚光灯使用）
| Spot Exp | 值越大，光照边缘约柔和
| Shadow Type | 决定光照阴影的类型，None（不产生阴影）或者 Hard（产生硬边缘阴影）
| Shadow Resolution | 阴影分辨率，值越大阴影越清晰
| Shadow Darkness | 阴影暗度，值越大阴影越暗
| Shadow Min Depth | 光源产生阴影的最小距离，如果物体距离光源的距离小于这个距离则不会产生阴影
| Shadow Max Depth | 光源产生阴影的最大距离，如果物体距离光源的距离大于这个距离则不会产生阴影
| Shadow Depth Scale | 光源深度缩放值，值越大阴影越暗
| Shadow Frustum Size | 平行光源视锥体大小，决定平行光源产生光源的范围

