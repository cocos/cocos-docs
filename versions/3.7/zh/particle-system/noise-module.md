# 噪声模块（NoiseModule）  

噪声模块用于增强粒子运动的效果，当 [Renderer 模块](./renderer.md) 中勾选 **UseGPU** 属性时不生效  

## 属性  

![noise_module](module/noise_module.png)

| 属性 | 说明 |
| :--- | :--- |
| **Strength X** | X 轴方向上噪声的强度 |
| **Strength Y** | Y 轴方向上噪声的强度 |
| **Strength Z** | Z 轴方向上噪声的强度 |
| **Noise Speed X** | X 轴方向上噪声贴图滚动速度  |
| **Noise Speed Y** | Y 轴方向上噪声贴图滚动速度  |
| **Noise Speed Z** | Z 轴方向上噪声贴图滚动速度  |
| **Noise Frequency** | 噪声频率 |
| **Octaves** | 指定组合多少层重叠噪声来产生最终噪声值 |
| **Octave Multiplier** | 对于每个附加的噪声层，按此比例降低强度 |
| **Octave Scale** | 对于每个附加的噪声层，按此乘数调整频率 |