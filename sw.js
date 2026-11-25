const CACHE_NAME = 'physlab-10-cache-v8';

// Otomatis mengambil root path (misal: https://github.io)
const BASE_PATH = self.location.href.replace(/sw\.js.*$/, '');

const FILES = [
  '',
  'index.html',
  'style.css',
  'lab-tools.js',
  'manifest.json',
  'hero-lab.png',
  'icon-app.png',
  'parabola.html',
  'parabola.js',
  'pegas.html',
  'pegas.js',
  'bidang-miring.html',
  'bidang-miring.js',
  'bandul.html',
  'bandul.js',
  'energi.html',
  'energi.js',
  'archimedes.html',
  'archimedes.js',
  'listrik.html',
  'listrik.js',
  'elektromagnet.html',
  'elektromagnet.js',
  'faraday.html',
  'faraday.js'
];

// 1. INSTALL: Unduh satu per satu langsung dari server
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return Promise.allSettled(
        FILES.map((file) => {
          const fullUrl = BASE_PATH + file;
          return fetch(new Request(fullUrl, { cache: 'reload' }))
            .then((res) => {
              if (res.ok) return cache.put(fullUrl, res);
            })
            .catch(() => {});
        })
      );
    })
  );
});

// 2. ACTIVATE: Hapus cache versi lama (v5/v6/v7)
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((k) => k !== CACHE_NAME)
          .map((k) => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

// 3. FETCH: Prioritaskan cache offline + simpan otomatis saat dikunjungi online
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET' || !event.request.url.startsWith('http')) return;

  event.respondWith(
    caches.match(event.request, { ignoreSearch: true }).then((cached) => {
      if (cached) return cached;

      return fetch(event.request)
        .then((res) => {
          if (res && res.status === 200) {
            const clone = res.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          }
          return res;
        })
        .catch(() => {
          if (event.request.mode === 'navigate') {
            return caches.match(BASE_PATH + 'index.html');
          }
        });
    })
  );
});
