
import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import versionList from './versions-list.vue'
import feedback from './feedback.vue'
import DragLine from './drag-line.vue'
import { github, branch } from '../config'
import './custom.css'

export default function(version: string) {
  return {
    extends: DefaultTheme,
    Layout() {
      return h(DefaultTheme.Layout, null, {
        'nav-bar-content-after': () => h(versionList, {
          currentVersion: version
        }),
        'aside-ads-after': () => h(feedback, {
          repo: github,
          version: version,
          branch: branch
        }),
        'sidebar-nav-before': () => h(DragLine)
      })
    }
  }
}

