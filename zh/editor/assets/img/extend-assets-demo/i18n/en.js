'use strict';

module.exports = {
  title: 'Extend Assets Panel Demo',

  menu: {
    createAsset: 'Create asset in my way',

    assetCommandParent: 'My assets menu commands',
    assetCommand1: 'this is directory',
    assetCommand2: 'this is not directory',

    dbCommand1: 'My db command 1',
    dbCommand2: 'My db command 2',

    plainCommand1: 'My panel area command',
  },

  drop: {
    description: 'Drag me to assets panel, and look conosole log.',
    callback:
      'Executed your custom drag and drop behavior and fed back the data:',
  },
};
