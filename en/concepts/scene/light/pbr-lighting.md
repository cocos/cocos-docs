# Physically Based Lighting

The light source parameters are described in Cocos Creator using photometric units. Based on the photometric units, all the relevant parameters of the light source can be translated into real-world physical values. In this way, designers can adjust the light intensity, color, range, and other information based on the industrial parameters of the relevant lights and the actual physical parameters of the real environment to make the overall lighting effect more in line with the real natural environment.

![pbr lighting](pbrlighting/pbr-lighting.jpg)

## Light Sources in the Real World

The physically based lighting matches the description of light sources in the real world. In real environments, the light products we see have their own industrial parameters, let's look at an IKEA light bulb💡

![light bulb size](pbrlighting/light-bulb.jpg)

From the product packaging, we can learn several important industrial parameters of this bulb.
- **Luminous Flux**
- **Color Temperature**
- **Size**

These three important parameters affect the performance of light sources in the real world, and we will focus on the physical meaning of these three parameters below.

## Photometric Units

**Photometric Units** are used to calculate the intensity (size) and direction of light.

- **Luminous Flux**

  The unit is **lumens (lm)**, the total light energy emitted by a light source or received by an illuminated object per unit of time. Changing the size of the light source will not affect the scene lighting effect.

- **Luminance**

  The unit is **Candela per square meter (cd/m<sup>2</sup>)**, the total luminous flux emitted by a light source per unit area in a given direction, per unit area. Changing the size of the light source affects the scene lighting effect.

- **Illuminance**

  The unit is **lux or lx**, the amount of luminous flux received per unit area. This value is affected by the distance the light travels, and for the same light source, when the light source is twice as far away, the illuminance is reduced to one-fourth of the original, in an inverse square relationship.

In the real world, because the important physical parameters describing light sources are different, we usually use **Luminous Flux** and **Luminance** to describe common household light sources with illuminated areas, and **Illuminance** to describe sunlight.

![light power](pbrlighting/light-power.jpg)

## Color Temperature

**Color Temperature** is the color of an absolute blackbody after it has been warmed from absolute zero (-273°C).

Color temperature is an important property that affects the color of a light source and is an optional property that also participates in the color component of the light source when color temperature is enabled.

The ambient color temperature also changes dynamically in real-world environments at different times of the day:

![color temp of day](pbrlighting/color-temp-of-day.jpg)

You can refer to the following table:

![kelvin](pbrlighting/kelvin.jpg)

## Size

Real-world light sources have real physical dimensions, and for the **same luminous flux**, the size of the light source affects **brightness** and **illuminance**.

![light bulb size](pbrlighting/light-bulb-size.png)
