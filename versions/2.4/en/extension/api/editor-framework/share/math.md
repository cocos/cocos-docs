# Editor.Math

## Properties

### Editor.Math.EPSILON

### Editor.Math.MACHINE_EPSILON

### Editor.Math.TWO_PI

### Editor.Math.HALF_PI

### Editor.Math.D2R

### Editor.Math.R2D

## Methods

### Editor.Math.deg2rad (degree)

  - `degree` number

Degree to radius.

### Editor.Math.rad2deg (radius)

  - `radius` number

Radius to degree.

### Editor.Math.rad180 (radius)

  - `radius` number

Let radius in -pi to pi.

### Editor.Math.rad360 (radius)

  - `radius` number

Let radius in 0 to 2pi.

### Editor.Math.deg180 (degree)

  - `degree` number

Let degree in -180 to 180.

### Editor.Math.deg360 (degree)

  - `degree` number

Let degree in 0 to 360.

### Editor.Math.randomRange (min, max)

  - `min` number
  - `max` number

Returns a random floating-point number between min (inclusive) and max (exclusive).

### Editor.Math.randomRangeInt (min, max)

  - `min` number
  - `max` number

Returns a random integer between min (inclusive) and max (exclusive).

### Editor.Math.clamp (val, min, max)

  - `val` number
  - `min` number
  - `max` number

Clamps a value between a minimum float and maximum float value.

### Editor.Math.clamp01 (val)

  - `val` number

Clamps a value between 0 and 1.

### Editor.Math.calculateMaxRect (out, p0, p1, p2, p3)

  - `out` rect
  - `p0` vec2
  - `p1` vec2
  - `p2` vec2
  - `p3` vec2

### Editor.Math.lerp (from, to, ratio)

  - `from` number
  - `to` number
  - `ratio` number

### Editor.Math.numOfDecimals (val)

  - `val` number

Get number of decimals for decimal part.

### Editor.Math.numOfDecimalsF (val)

  - `val` number

Get number of decimals for fractional part.

### Editor.Math.toPrecision (val, precision)

  - `val` number
  - `precision` number

### Editor.Math.bezier (c0, c1, c2, c3, t)

  - `c0` number
  - `c1` number
  - `c2` number
  - `c3` number
  - `t` number

### Editor.Math.solveCubicBezier (c0, c1, c2, c3, x)

  - `c0` number
  - `c1` number
  - `c2` number
  - `c3` number
  - `x` number
