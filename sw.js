const CACHE_NAME = 'physlab-10-cache-v7';

const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './style.css',
  './lab-tools.js',
  './manifest.json',
  './hero-lab.png',
  './icon-app.png',
  './parabola.html',
  './parabola.js',
  './pegas.html',
  './pegas.js',
  './bidang-miring.html',
  './bidang-miring.js',
  './bandul.html',
  './bandul.js',
  './energi.html',
  './energi.js',
  './archimedes.html',
  './archimedes.js',
  './listrik.html',
  './listrik.js',
  './elektromagnet.html',
  './elektromagnet.js',
  './faraday.html',
  './faraday.js'
];

// 1. INSTALL: Ambil versi terbaru langsung dari server (bypass HTTP cache) & simpan satu per satu
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return Promise.allSettled(
        ASSETS_TO_CACHE.map((url) => {
          const request = new Request(url, { cache: 'reload' });
          return fetch(request)
            .then((response) => {
              if (!response.ok) throw new Error(`HTTP ${response.status} pada ${url}`);
              return cache.put(url, response);
            })
            .catch((err) => {
              console.warn('[SW] Gagal cache aset:', url, err);
            });
        })
      );
    })
  );
});

// 2. ACTIVATE: Bersihkan semua cache versi lama secara menyeluruh
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    }).then(() => self.clients.claim())
  );
});

// 3. FETCH: Cache-First + Dynamic Caching + Penanganan URL GitHub Pages
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  // Abaikan request ekstensi browser atau protokol selain http/https
  if (!event.request.url.startsWith('http')) return;

  event.respondWith(
    caches.match(event.request, { ignoreSearch: true }).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(event.request)
        .then((networkResponse) => {
          // Hanya simpan jika respons sukses dan berasal dari origin yang sama
          if (
            networkResponse &&
            networkResponse.status === 200 &&
            networkResponse.type === 'basic'
          ) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseClone);
            });
          }
          return networkResponse;
        })
        .catch(() => {
          // Jika offline dan user membuka halaman HTML yang belum di-cache, arahkan ke beranda
          if (event.request.mode === 'navigate') {
            return caches.match('./index.html');
          }
        });
    })
  );
});
