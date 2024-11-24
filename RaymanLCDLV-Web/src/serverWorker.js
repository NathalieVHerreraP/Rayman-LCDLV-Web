const CACHE_NAME = 'my-app-cache';
const urlsToCache = [
  '/',
  '/index.html',
  '/offline.html',
  '/Logo2.png',
  '/logo192.png',
  '/logo512.png'
];

// Install event - caching resources
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Activate event - cleaning up old caches
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch event - serving cached content
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response; // return the cached response
        }
        return fetch(event.request); // fetch from network if not cached
      }).catch(() => {
        // Fallback to offline page if both fail
        return caches.match('/offline.html');
      })
  );
});

/* eslint-enable no-restricted-globals */