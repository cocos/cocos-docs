# Node Tree

**Node Tree** includes all nodes in current opened scene, no matter the node includes the visible image or not. You can choose, create and delete nodes in here and create set membership of node by dragging one node to another.

Click to choose node, and the selected node will be highlighted in blue. Current selected node will show with blue frame in **scene editor** and update contents in **Properties** panel.

![node tree panel](hierarchy/node_tree.png)

- The ![add](assets/add.png) button in the upper left corner is used to create nodes.
- ![search](hierarchy/search.png) The search button is used to filter the type of search. It is divided into three types: `Node`, `Component` and `UUID used by`.
- The search bar above can search for the desired Node or Component based on the type of search:
  - When you select a `Node` type in the search button, you can enter the node name search you want to find in the search bar.
  - When you select a `Component` type in the search button, the symbol of `t:` appears in the search bar, and you can enter the name of the component you want to find after the symbol (for example, `t:cc.Camera`).
  - When you select a `UUID used by` type in the search button, the symbol of `used:` appears in the search bar. After entering the UUID to be searched after the symbol, the node using the UUID can be searched.
- The ![switch](hierarchy/switch.png) button toggles the expanded/collapsed state of the **Node Tree**.
- The panel body is a list of nodes, where you can add, delete or modify resources using the right click menu or drag and drop.
- ![button](assets/button.png) in front of the node is used to toggle the expand/collapse state of the node tree. When the user presses the Alt/Option and clicks the button, in addition to performing the expand/collapse operation of the node itself, the expand/collapse operation is also performed on all child nodes under that node at the same time.

## Create node

There are two ways to create node in Hierarchy:

- Click `+` button on the top left corner or right click the mouse to enter the **create node** submenu in right click menu. In this submenu, you can select different node types including Sprite, Label, Button and other nodes with different functions and expressions.
- Drag assets like image, font or particle from **Assets** to **Node Tree**. Then you can create corresponding image rendering node with the selected assets.

## Delete node

After select node, you can delete the selected node by the `delete` option in the right click menu or press the hot key <kbd>Delete</kbd> (Windows) or <kbd>Cmd + Backspace</kbd> (Mac). If the selected node contains child node, then the child node will be deleted along with it.

## Create and edit node parenting relationship

Dragging node A to node B makes node A the child node of node B. Similar with [Assets](assets.md) panel, **Node Tree** panel also show nodes' hierarchical relationship in tree view. Click the triangle icon on the left of node and you can unfold or fold the child node list.

## Change node's rendering order

Other than dragging one node to another, you can also keeps dragging node up and down to change the order of node in the list. The orange square indicates the range of parent node which the node belongs to and the green line represents the position the node will be inserted.

![move node](hierarchy/move.png)

The order of nodes in the list determines the rendering order of node in the scene. the rendering order of the nodes displayed below is behind the upper nodes, that is, the lower nodes are drawn after the upper nodes. The bottom node is displayed in the top of the **scene editor**.

## Other operations

Right click the node, the popup menu also includes the following operation:

- **Copy/paste**: Copy the node to the clipboard and then paste it to other places or open another scene to paste the node just copied.
- **Copy node**: Generate node replication exactly the same with the selected node and they are at the same level.
- **Rename**: Rename the node
- **Show UUID and path of node**: In complicated scenes, we sometimes need to get the complete path in the node tree to access it when running the script. Click this option so you can see the path of the currently selected node and its UUID in the **Console**.
- **Lock node**: Move the mouse over the node and there will be a lock button on the left side. After the node is locked, it cannot be selected in the **Scene**.
