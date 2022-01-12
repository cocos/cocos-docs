# 动画控制器(Animation Controller)

动画控制器是运行时控制动画图的组件。

若要添加动画控制器，请参考： [动画图资源](animation-graph.md) 

## 变量

若要在脚本中使用变量，请参考： [在脚本中使用变量](animation-graph-panel.md) 

## 属性

| 属性  | 说明           |
| :---- | :------------- |
| graph | 运行时的动画图 |

## 方法

| 方法名                 | 说明                       |
| :--------------------- | :------------------------- |
| getVariables           | 获取所有的变量。           |
| setValue               | 设置变量的值。             |
| getValue               | 获取变量的值。             |
| getCurrentStateStatus  | 获取当前状态的信息。       |
| getCurrentClipStatuses | 获取当前的动画剪辑的状态。 |
| getCurrentTransition   | 获取当前的状态过渡。       |
| getNextStateStatus     | 获取下一个状态的信息。     |
| getNextClipStatuses    | 获取下一个动画剪辑的状态。 |

