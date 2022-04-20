'use strict';

module.exports = {
  title: '扩展资源面板示例',

  menu: {
    createAsset: '按我的方式创建某种资源',

    assetCommandParent: '我自定义的资源右击菜单行为',
    assetCommand1: '这是文件夹',
    assetCommand2: '这不是文件夹',

    dbCommand1: '我定义的 db 菜单 1',
    dbCommand2: '我定义的 db 菜单 2',

    plainCommand1: '我定义的面板空白区菜单',
  },

  method: {
    description: '把我拖入 assets 面板，查看动作回调信息',
    callback: '识别到自定义拖拽行为，drop 释放位置的资源和拖拽的数据如下：',
  },
};
