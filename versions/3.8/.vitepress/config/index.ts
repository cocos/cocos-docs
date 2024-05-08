import { defineConfig } from 'vitepress'
import { shared } from '../../../../@config/shared'

// 每个语言的配置
import configZhFn from '../../../../@config/shared-theme-zh'
import configEnFn from '../../../../@config/shared-theme-en'
import { nav } from '../../../../@config/shared';

// 侧边栏数据
import menusEN from '../../en/summary.json' with {type: 'json'};
import menusZH from '../../zh/summary.json' with {type: 'json'};

import { version } from './version.ts';

// 英文配置
const configEn = configEnFn(version);
const en = defineConfig({
  lang: configEn.lang,
  description: configEn.description,

  themeConfig: {
    ...configEn.themeConfig,

    nav: nav(version, 'en'),

    sidebar: {
      '/en/': { base: '/en/', items: menusEN },
    }
  }
})

// 中文配置
const configZh = configZhFn(version);
const zh = defineConfig({
  lang: configZh.lang,
  description: configZh.description,

  themeConfig: {
    ...configZh.themeConfig,
    
    nav: nav(version, 'zh'),

    sidebar: {
      '/zh/': { base: '/zh/', items: menusZH },
    }
  }
})

export default defineConfig({
  ...shared,
  base: `/${version}/`,
  locales: {
    // 我们的文档都在 /en/ /zh/ 等文件夹里面，没有在根目录的文档 所以不用配 root
    // root: { label: 'English', ...en },
    en: { label: 'English', ...en },
    zh: { label: '简体中文', ...zh }
  }
})
