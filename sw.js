// Offline-first installation, online-first reading. The complete itinerary remains available offline.
const CACHE_NAME = 'japan-trip-2026-v20261024-10';
const OFFLINE_FILES = [
  './','./index.html','./styles.css?v=20261024-10','./data.js?v=20261024-10','./app.js?v=20261024-10','./media.js?v=20261024-10','./manifest.webmanifest','./version.json',
  './assets/icon.svg','./assets/icon-192.png','./assets/icon-512.png','./assets/hero.svg',
  './assets/video-poster-1.svg','./assets/video-poster-2.svg','./assets/video-poster-3.svg',
  './assets/video-poster-4.svg','./assets/video-poster-5.svg',
  './assets/photos/senkyakuPhoto.webp','./assets/photos/shonanTrain.webp','./assets/photos/enodenCoast.webp',
  './assets/photos/komachiStreet.webp','./assets/photos/worldPorters.webp','./assets/photos/gotembaOutlets.webp',
  './assets/photos/oshinoPond.webp','./assets/photos/asakusaStreet.webp','./assets/photos/naritaStreet.webp',
  './assets/og-cover.jpg','./assets/photos/meiji.webp','./assets/photos/enoshima.webp','./assets/photos/hakone.webp',
  './assets/photos/fuji.webp','./assets/photos/narita.webp','./assets/photos/yokohama.webp'
];
const isAppDocument = request => request.mode === 'navigate' ||
  /\.(?:html|js|css|json|webmanifest)$/.test(new URL(request.url).pathname);

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    // Re-fetch the newly published application files, not copies from browser HTTP cache.
    await cache.addAll(OFFLINE_FILES.map(path => new Request(path, { cache: 'reload' })));
    // Also migrate older versions that cannot correctly activate waiting workers.
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(key => key.startsWith('japan-trip-2026-') && key !== CACHE_NAME)
      .map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener('message', event => {
  if (event.data?.type === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET' || new URL(request.url).origin !== self.location.origin) return;

  if (isAppDocument(request)) {
    // Online: get new itinerary/code first. Offline: use the copy saved during installation.
    event.respondWith((async () => {
      const cache = await caches.open(CACHE_NAME);
      try {
        const response = await fetch(request, { cache: 'no-store' });
        if (!response.ok) throw new Error('Network responded ' + response.status);
        if (response.type === 'basic') await cache.put(request, response.clone());
        return response;
      } catch {
        return (await cache.match(request)) ||
          (request.mode === 'navigate' ? await cache.match('./index.html') : undefined) ||
          Response.error();
      }
    })());
    return;
  }

  // Icons and other non-changing local assets work offline without extra network requests.
  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    const cached = await cache.match(request);
    if (cached) return cached;
    try {
      const response = await fetch(request);
      if (response.ok && response.type === 'basic') await cache.put(request, response.clone());
      return response;
    } catch { return Response.error(); }
  })());
});
