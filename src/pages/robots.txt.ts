import type { APIRoute } from 'astro';
import { isProduction } from '@/lib/site';

export const prerender = true;

export const GET: APIRoute = ({ site }) => {
  const sitemap = new URL('sitemap-index.xml', site).toString();
  const body = isProduction()
    ? `User-agent: *\nAllow: /\nDisallow: /keystatic\n\nSitemap: ${sitemap}\n`
    : 'User-agent: *\nDisallow: /\n';
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
