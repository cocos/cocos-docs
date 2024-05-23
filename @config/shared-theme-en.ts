import { defineConfig } from 'vitepress'
import { github, branch } from './config'

export default function(version: string) {
  return defineConfig({
    lang: 'en-US',
    description: 'Cocos Creator Docs',
  
    themeConfig: {
      
      editLink: {
        pattern: `${github}/edit/${branch}/versions/${version}/:path`,
        text: 'Edit this page on GitHub'
      },
  
      footer: {
        message: 'Released under the MIT License.',
        copyright: 'Copyright © 2019-present Cocos'
      }
    }
  })
}
