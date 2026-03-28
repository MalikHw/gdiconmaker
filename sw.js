const CACHE_NAME = 'gdiconmaker-v1';

const CORE_ASSETS = [
  './',
  './index.html',
  './style.css',
  './script.js',
  './script2.js',
  './icongen.js',
  './imgproc.js',
  './changelog.html',
  './config.json',
  './pack.json',
  './pack.png',
  './head.png',
  './privacy.html',
  // Icon templates - HD
  './player_01-hd.png',
  './player_01-uhd.png',
  './dart_01-hd.png',
  './dart_01-uhd.png',
  './player_ball_01-hd.png',
  './player_ball_01-uhd.png',
  // Plists
  './player_01-hd.plist',
  './player_01-uhd.plist',
  './dart_01-hd.plist',
  './dart_01-uhd.plist',
  './player_ball_01-hd.plist',
  './player_ball_01-uhd.plist',
];

const SKIP_DOMAINS = [
  'pagead2.googlesyndication.com',
  'googleadservices.com',
  'doubleclick.net',
  'youtube.com',
  'www.youtube.com',
  'storage.ko-fi.com',
];

// Install: cache all core assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(CORE_ASSETS);
    }).then(() => self.skipWaiting())
  );
});

// Activate: clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

// - Skip domains (ads, youtube, etc.)
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  if (SKIP_DOMAINS.some((d) => url.hostname.includes(d))) {
    event.respondWith(
      fetch(event.request).catch(() => new Response('', { status: 503 }))
    );
    return;
  }
  
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;

      return fetch(event.request).then((response) => {
        // Don't cache bad responses
        if (!response || (response.status !== 200 && response.type !== 'opaque')) {
          return response;
        }

        const toCache = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, toCache));
        return response;
      }).catch(() => {
        return new Response('Offline and not cached', { status: 503 });
      });
    })
  );
});
