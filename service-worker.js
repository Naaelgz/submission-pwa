// service-worker.js

self.addEventListener('push', function(event) {
  console.log('[Service Worker] Push Received.');

  let data = {};

  if (event.data) {
    try {
      data = event.data.json();
    } catch (e) {
      data = {
        title: 'Qwerty Notification',
        body: event.data.text(),
      };
    }
  }

  const title = data.title || 'Qwerty Notification';
  const options = {
    body: data.body || 'You have a new message!',
    icon: data.icon || '/src/public/favicon.png',
    badge: data.badge || '/src/public/favicon.png',
    data: data.url || '/'
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

self.addEventListener('notificationclick', function(event) {
  console.log('[Service Worker] Notification click Received.');

  event.notification.close();

  event.waitUntil(
    clients.openWindow(event.notification.data || '/')
  );
});
