exports.onCreateMenu = function (assetInfo) {
  return [
    {
      label: 'i18n:extend-assets-demo.menu.createAsset',
      click() {
        if (!assetInfo) {
          console.log('get create command from header menu.');
        } else {
          console.log('get create command from an asset.');
          console.log(assetInfo);
        }
      },
    },
  ];
};

exports.onAssetMenu = function (assetInfo) {
  return [
    {
      label: 'i18n:extend-assets-demo.menu.assetCommandParent',
      submenu: [
        {
          label: 'i18n:extend-assets-demo.menu.assetCommand1',
          enabled: assetInfo.isDirectory,
          click() {
            console.log(Editor.I18n.t('extend-assets-demo.menu.assetCommand1'));
            console.log(assetInfo);
          },
        },
        {
          label: 'i18n:extend-assets-demo.menu.assetCommand2',
          enabled: !assetInfo.isDirectory,
          click() {
            console.log(Editor.I18n.t('extend-assets-demo.menu.assetCommand2'));
            console.log(assetInfo);
          },
        },
      ],
    },
  ];
};

exports.onDBMenu = function (assetInfo) {
  return [
    {
      label: 'i18n:extend-assets-demo.menu.dbCommand1',
      click() {
        console.log(`db command 1 from ${assetInfo.name}`);
      },
    },
    {
      label: 'i18n:extend-assets-demo.menu.dbCommand2',
      click() {
        console.log(`db command 2 from ${assetInfo.name}`);
      },
    },
  ];
};

exports.onPanelMenu = function (assetInfo) {
  return [
    {
      label: 'i18n:extend-assets-demo.menu.plainCommand1',
      click() {
        console.log(
          `clicked on the plain area of the panel. No asset, 'assetInfo' is ${assetInfo}`
        );
      },
    },
  ];
};
