import { defineConfig } from 'vitepress';
import { github } from './config.ts';
import { search as zhSearch } from './shared-theme-zh'
import replaceEnvVariables from './replace-env-variables.ts';

export const shared = defineConfig({
  title: 'Cocos Creator',

  lastUpdated: true,
  cleanUrls: false,
  metaChunk: true,

  // 为了让构建通过，正式发布需要删除
  ignoreDeadLinks: [
    (url: string) => {
      return !!url;
    }
  ],

  head: [
    ['link', { rel: 'icon', type: 'image/x-ico', href: './favicon.ico' }],
    [
      'script',
      {},
      `
      function isChildOf(A, B) {
        let parent = A.parentNode;
        
        while (parent !== null) {
            if (parent === B) {
                return true;
            }
            parent = parent.parentNode;
        }
    
        return false;
    }
    
    document.addEventListener('click', e => {
        if(e.target?.tagName === 'IMG') {
            const wrap = document.querySelector('.content-container');
            if(!wrap) return;
    
            const isChildImg = isChildOf(e.target, wrap);
            if(isChildImg) {
                console.log('cccc')
                window.open(e.target.src);
            }
        } 
    }, false)
      `
    ]
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

  },

  markdown: {
    config: (md) => {
      md.use(replaceEnvVariables)
    }
  }
})


export function nav(version: string, lang: 'en' | 'zh') {
  return [ {
    text: { zh:'API 参考', en:'API Reference'},
    link: `https://docs.cocos.com/creator/${version}/api/${lang}/`
  },
  {
    text: { zh:'引擎下载', en:'Engine Download'},
    link:'https://www.cocos.com/'
  },
  {
    text: { zh:'资源商店', en:'Cocos Store'},
    link:'https://store.cocos.com'
  }].map(v => {
    return {
      link: v.link,
      text: v.text[lang]
    }
  })
}

