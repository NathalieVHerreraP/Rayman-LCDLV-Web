const CACHE_NAME = 'my-app-cache';
const urlsToCache = [
  '/',
  '/index.html',
  '/offline.html',
  '/Logo2.png',
  '/logo192.png',
  '/logo512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(
        cacheNames.map(cacheName => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
      .catch(() => caches.match('/offline.html'))
  );
});

// Manejar clics en las notificaciones
self.addEventListener('notificationclick', event => {
  event.notification.close();

  if (event.action === 'login') {
    event.waitUntil(
      clients.openWindow('/AuthForm') // Abre la página de inicio de sesión
    );
  } else {
    event.waitUntil(
      clients.openWindow('/') // Página principal por defecto
    );
  }
});