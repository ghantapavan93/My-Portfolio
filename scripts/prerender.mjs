// Writes static HTML for the hiring portfolio so its content is in the page
// source: fast first paint, and crawlers and link previews see real text.
//
//   vite build                         → dist/        (client)
//   vite build --ssr src/entry-server  → dist-ssr/    (renderer)
//   node scripts/prerender.mjs         → dist/index.html, dist/work/<slug>/index.html,
//                                        dist/sitemap.xml, dist/robots.txt
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const SITE = 'https://pavankalyan-eta.vercel.app';
const dist = path.resolve('dist');
const ssrDir = path.resolve('dist-ssr');

const escapeHtml = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
const { render, ROUTES } = await import(pathToFileURL(path.join(ssrDir, 'entry-server.js')).href);

for (const route of ROUTES) {
  const url = `${SITE}${route.path}`;
  const title = escapeHtml(route.title);
  const description = escapeHtml(route.description);
  const html = template
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${title}</title>`)
    .replace(/(<meta name="description" content=")[^"]*(")/, `$1${description}$2`)
    .replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${title}$2`)
    .replace(/(<meta property="og:description" content=")[^"]*(")/, `$1${description}$2`)
    .replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${url}$2`)
    .replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`)
    .replace('<div id="root"></div>', `<div id="root" data-prerendered="${route.path}">${render(route.path)}</div>`);

  if (!html.includes(`data-prerendered="${route.path}"`)) throw new Error(`#root placeholder not found for ${route.path}`);
  const file = route.path === '/' ? path.join(dist, 'index.html') : path.join(dist, route.path, 'index.html');
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html);
  console.log(`prerendered ${route.path} (${(html.length / 1024).toFixed(0)} KB)`);
}

const urls = [...ROUTES.map((r) => r.path), '/creative'];
fs.writeFileSync(
  path.join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
    .map((u) => `  <url><loc>${SITE}${u}</loc></url>`)
    .join('\n')}\n</urlset>\n`
);
fs.writeFileSync(path.join(dist, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${SITE}/sitemap.xml\n`);
fs.rmSync(ssrDir, { recursive: true, force: true });
console.log('sitemap.xml and robots.txt written');
