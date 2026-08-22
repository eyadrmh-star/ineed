self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('ineedyour-cache-v1').then((cache) => {
            return cache.addAll(['./']);
        })
    );
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(keys.filter(k => k !== 'ineedyour-cache-v1').map(k => caches.delete(k)));
        })
    );
    self.clients.claim();
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        fetch(event.request).catch(() => caches.match(event.request))
    );
});
