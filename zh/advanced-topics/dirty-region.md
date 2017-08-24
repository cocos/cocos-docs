# 脏矩形优化

## 脏矩形对 Canvas 渲染的优化情况

在canvas模式下，游戏的渲染需要采用大量的drawImage来实现，渲染性能较低。对于2D的游戏来说，大部分场景中的不少元素都处于静态，屏幕上只有部分区域有显示变化，只有这部分区域才需要更新渲染。

脏矩形的机制能够在canvas模式下，只渲染屏幕上变化的区域，因此能大大降低引擎的drawCall数量，提升渲染性能。

以demoUI为例，在开启脏矩形的情况下，整个渲染drawcall数据从366降低到28。

<img src="dirty-region/dirtyRegion-disabled.jpg" width = "300" height = "480" alt="图片名称" align=center />
<img src="dirty-region/dirtyRegion-enabled.jpg" width = "300" height = "480" alt="图片名称" align=center />

渲染元素能使用脏矩形的前提条件是能够让渲染器得到自己在屏幕的渲染区域，也就是包围盒AABB，它受局部坐标系下的包围盒(localBB or localBoundingBox)和坐标变换(world Tranform)的影响。默认情况下localBB通过contentSize来取得，用户也可以在canvasRenderCommand中实现getLocalBB接口，返回localBB。

## 脏矩形的开关和调试

在 Creator 中，脏矩形默认处于开启状态。开启和关闭脏矩形的API是

```
	//enable dirty region
	cc.renderer.enableDirtyRegion(true);
	//disable dirty region
	cc.renderer.enableDirtyRegion(false);
	//check dirty region enable state
	var isEnabled = cc.renderer.isDirtyRegionEnabled();
```

当屏幕上有大量的物体都在运动时，使用脏矩形的效率会更低，因此引擎提供Threshold机制, 在大量物体运动的情况下，渲染自动切换到原始渲染逻辑。默认情况下，threshold是10。

```
	//set dirty region threshold
	cc.renderer.setDirtyRegionCountThreshold(threshold);
```

脏矩形的调试: 

```
	//debug dirty region or not
	cc.renderer._debugDirtyRegion = true;	
	cc.renderer._debugDirtyRegion = false;
```
## 脏矩形的渲染组件兼容性情况

目前脏矩形对渲染组件的兼容性情况：

* 完全兼容的组件：Sprite，Label，Mask
* 部分兼容组件：Particle，TileMap，Spine
* 待兼容组件：Graphics

除此之外，如果一个自定义渲染组件没有contentSize并且没有实现getLocalBB接口，其与脏矩形也会不兼容。

## 已知脏矩形优化对浏览器的不兼容情况

UC浏览器，IE浏览器与脏矩形机制不兼容，这两个浏览器上脏矩形已经被禁用。