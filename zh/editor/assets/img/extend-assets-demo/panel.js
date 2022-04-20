'use strict';

const { join } = require('path');
const { readFileSync } = require('fs');

// 面板内的 css
exports.style = readFileSync(join(__dirname, './panel.css'), 'utf8');

// 面板 html
exports.template = readFileSync(join(__dirname, './panel.html'), 'utf8');

// messages 对应的方法
exports.methods = {
  dropAsset(assetInfo, dragInfo) {
    console.log(Editor.I18n.t('extend-assets-demo.drop.callback'));
    console.log(assetInfo);
    console.log(dragInfo);
  },
};
