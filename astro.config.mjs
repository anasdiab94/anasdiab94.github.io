// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // The repository is <user>.github.io, so no `base` is needed.
  site: 'https://anasdiab94.github.io',

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [sitemap()]
});