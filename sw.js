// Guarda la app para usarla sin internet. Cambia VERSION cuando subas una versión nueva.
const VERSION='plan-gym-v1';
const FILES=["./", "index.html", "manifest.webmanifest", "lib/three.min.js", "fonts/fonts.css", "fonts/barlow-condensed-latin-800-normal.woff2", "fonts/barlow-condensed-latin-800-italic.woff2", "fonts/inter-latin-500-normal.woff2", "fonts/inter-latin-600-normal.woff2", "fonts/barlow-condensed-latin-700-normal.woff2", "fonts/barlow-condensed-latin-600-normal.woff2", "fonts/inter-latin-400-normal.woff2", "icons/icon-192.png", "icons/icon-512.png", "icons/icon-maskable-512.png"];
self.addEventListener('install',e=>{e.waitUntil(caches.open(VERSION).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==VERSION).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
// Primero intenta la red (para recibir actualizaciones); sin internet usa la copia guardada.
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;
 e.respondWith(fetch(e.request).then(r=>{const c=r.clone();caches.open(VERSION).then(x=>x.put(e.request,c));return r}).catch(()=>caches.match(e.request,{ignoreSearch:true}).then(r=>r||caches.match('index.html'))))});
