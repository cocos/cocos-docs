# Play or Sample Animation

The pose graph provides two types of nodes for reading poses from animations: play animation nodes and sample animation nodes.

In the following, "action" refers to animation clips or animation blends.

## Play Animation

The **Play animation node** node plays the specified action, updates it every frame, and gets the pose of the current frame of the animation as output.

| Input | Description |
| :-- | :-- |
| `Start Time` | When to start playing the action from whenever this node is reentered. Unit is in seconds. |
| `Speed Multiplier` | The playback rate of the action. |

| Properties | Description |
| :-- | :-- |
| `Action` | The action to sample. |

## Sampled Animation

The **Sampled Animation Node** samples the pose of the specified action at a given moment as output.

| Input | Description |
|:-- |:-- |
| `Time` | The time to sample. |

| Properties | Description |
| :-- |:-- |
| `Action` | The action to sample. |
| `Use Normalized Time` | Whether the node input `time` specifies a normalized time. The normalized time is the progress of the action in the range [0, 1]. For example, 1 means the last frame of the action, and 0.5 means 50% of the action progress. |
