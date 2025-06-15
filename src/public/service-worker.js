
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installed');
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activated');
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener('push', (event) => {
  const data = event.data ? event.data.text() : 'Push Message';
  const options = {
    body: data,
    icon: '/src/public/favicon.png',
    badge: '/src/public/favicon.png',
  };
  event.waitUntil(self.registration.showNotification('QWERTY App', options));
});
