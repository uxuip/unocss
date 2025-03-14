import { defineNuxtModule } from '@nuxt/kit'
import Markdown from 'vite-plugin-vue-markdown'
import LinkAttributes from 'markdown-it-link-attributes'
import Shikiji from 'markdown-it-shikiji'

export default defineNuxtModule({
  async setup(_, nuxt) {
    nuxt.hook('vite:extendConfig', async (config) => {
      config.plugins!.push(
        Markdown({
          async markdownItSetup(md) {
            md.use(LinkAttributes, {
              matcher: (link: string) => /^https?:\/\//.test(link),
              attrs: {
                target: '_blank',
                rel: 'noopener',
              },
            })
            md.use(await Shikiji({
              defaultColor: false,
              themes: {
                dark: 'vitesse-dark',
                light: 'vitesse-light',
              },
            }))
          },
        }),
      )
    })
  },
})
