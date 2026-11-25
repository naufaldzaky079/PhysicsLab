const CACHE_NAME = 'physlab-10-cache-v5';
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

self.addEventListener('install', function(event) {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cache) {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
