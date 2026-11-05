// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import keystatic from '@keystatic/astro';
import tailwindcss from '@tailwindcss/vite';

// Keystatic local mode reads and writes content on the file system, so the dev server must run on Node.
// With the Cloudflare adapter, `astro dev` runs in workerd, which has no file system. The adapter is
// therefore used for builds only. Production uses Keystatic GitHub mode, which needs no file system.
const isDevServer = process.argv.includes('dev');

// Static by default. The Keystatic admin is the only route rendered on demand.
// React is required by Keystatic only and is not shipped to public pages.
export default defineConfig({
  site: process.env.SITE_URL ?? 'http://localhost:4321',
  adapter: isDevServer ? undefined : cloudflare(),
  integrations: [react(), keystatic(), sitemap()],
  // Self-hosted at build time from Google Fonts. Tokens in src/styles/global.css read these variables.
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Instrument Serif',
      cssVariable: '--font-instrument-serif',
      weights: [400],
      styles: ['normal', 'italic'],
      fallbacks: ['Georgia', 'serif'],
    },
    {
      provider: fontProviders.google(),
      name: 'Instrument Sans',
      cssVariable: '--font-instrument-sans',
      weights: ['400 600'],
      styles: ['normal'],
      fallbacks: ['system-ui', 'sans-serif'],
    },
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
