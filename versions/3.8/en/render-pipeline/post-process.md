# Post-processing

> **Note**：We updated the post process document since v3.8 which can be found here [Full-Screen Post Process](./post-process/index.md).

To create a new post-processing effect, create a new RenderFlow script and set its type to POSTPROCESS. The production process is the same as other RenderFlow, but RenderPipeline does not automatically perform post-processing, it is necessary to set the `flows` property in the Camera to specify which post-processing to perform.
