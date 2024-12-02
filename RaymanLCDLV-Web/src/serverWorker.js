const CACHE_NAME = 'my-app-cache';
const urlsToCache = [
  '/',
  '/index.html',
  '/offline.html',
  '/Logo2.png',
  '/logo192.png',
  '/logo512.png'
];

// Instalar el Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

// Activar el Service Worker
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

// Interceptar solicitudes
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request)).catch(() => caches.match('/offline.html'))
  );
});

// Recibir notificaciones push
self.addEventListener('push', event => {
  const data = event.data ? event.data.json() : {};

  const options = {
    body: data.body || 'Inicia sesión para tener una experiencia más satisfactoria.',
    icon: '/Logo2.png',
    badge: '/logo192.png',
    actions: [
      { action: 'login', title: 'Iniciar sesión' },
      { action: 'dismiss', title: 'Cerrar' }
    ]
  };

  event.waitUntil(self.registration.showNotification(data.title || '¡Hola!', options));
});

// Manejar clics en las notificaciones
self.addEventListener('notificationclick', event => {
  event.notification.close();

  if (event.action === 'login') {
    event.waitUntil(clients.openWindow('/login')); // Página de inicio de sesión
  } else {
    event.waitUntil(clients.openWindow('/')); // Página principal por defecto
  }
});