import { defineConfig } from 'vitepress';
import { github } from './config.ts';
import { search as zhSearch } from './shared-theme-zh'

export const shared = defineConfig({
  title: 'creator-docs',

  lastUpdated: true,
  cleanUrls: true,
  metaChunk: true,

  // 为了让构建通过，正式发布需要删除
  ignoreDeadLinks: [
    (url: string) => {
      return !!url;
    }
  ],

  /* prettier-ignore */
//   head: [
//     ['link', { rel: 'icon', type: 'image/svg+xml', href: '/vitepress-logo-mini.svg' }],
//     ['link', { rel: 'icon', type: 'image/png', href: '/vitepress-logo-mini.png' }],
//     ['meta', { name: 'theme-color', content: '#5f67ee' }],
//     ['meta', { property: 'og:type', content: 'website' }],
//     ['meta', { property: 'og:locale', content: 'en' }],
//     ['meta', { property: 'og:title', content: 'VitePress | Vite & Vue Powered Static Site Generator' }],
//     ['meta', { property: 'og:site_name', content: 'VitePress' }],
//     ['meta', { property: 'og:image', content: 'https://vitepress.dev/vitepress-og.jpg' }],
//     ['meta', { property: 'og:url', content: 'https://vitepress.dev/' }],
//     ['script', { src: 'https://cdn.usefathom.com/script.js', 'data-site': 'AZBRSFGG', 'data-spa': 'auto', defer: '' }]
//   ],

  themeConfig: {
    logo: { src: '/logo.png', height: 24},

    externalLinkIcon: true,

    socialLinks: [
      { icon: 'github', link: github }
    ],

    search: {
      provider: 'local',
      options: {
        locales: { ...zhSearch }
      }
    },

  }
})


export function nav(version: string, lang: 'en' | 'zh') {
  return [ {
    text: 'Cocos Creator',
    items: [
      {
        text: {
          en: 'API Ref',
          zh: 'API 参考'
        },
        link: `https://docs.cocos.com/creator/${version}/api/${lang}/`
      }
    ].map(v => {
      return {
        link: v.link,
        text: v.text[lang]
      }
    })
  },
  {
    text: 'Cocos2d-x',
    items: [
      {
        text: {
          en: 'Manual',
          zh: '用户手册'
        },
        link: `https://docs.cocos.com/cocos2d-x/manual/${lang}/`
      },
      {
        text: {
          en: 'API Ref',
          zh: 'API 参考'
        },
        link: 'https://docs.cocos2d-x.org/api-ref/index.html'
      }
    ].map(v => {
      return {
        link: v.link,
        text: v.text[lang]
      }
    })
  }]
}

