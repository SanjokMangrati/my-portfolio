import { defineConfig } from 'astro/config'

export default defineConfig({
  site: 'https://smangrati.com',
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto',
  },
})
