self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open('h2-cache-v1').then(function(cache) {
            return cache.addAll([
                './',
                './index.html',
                './manifest.json'
            ]);
        })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
        })
    );
});

self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheName !== 'h2-cache-v1') {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});