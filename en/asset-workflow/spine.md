# Spine

Spine skeleton animation resources are data formats that exported by [Spine](http://en.esotericsoftware.com/) (Creator 2.0.7 and below version support for Spine v2.5,Creator 2.0.8 and above version support for Spine v3.6).

# Import skeleton animation resources

Skeleton animation resource use three main resources：

- .json Skeletal animation data
- .png  Atlas
- .txt/.atlas  Atlas data

![spine](spine/import.png)

# Create a skeleton animation resources

   1. drag Spine assets directly from **assets** to **Node Tree**:

![spine](spine/create_1.png)

   2. drag Spine assets directly from **assets** to **Scene**:

![spine](spine/create_2.png)

   3. add a **Spine Skeleton** component to the existing node and give Spine assets to the component `Skeleton Data` attribute in **assets**:

![spine](spine/create_3.png)

<hr>

Continue on to read about [Content Creation Workflow](../content-workflow/index.md).
