const CACHE_NAME = 'hoshizora-bunko-v1';
const ASSETS = [
    '/',
    '/index.html',
    '/login.html',
    '/register.html',
    '/styles.css',
    '/script.js',
    '/auth.js',
    '/manifest.json',
    '/img/hb200x200.png',
    '/profile.html',
    '/product1.jpg',
    '/product2.jpg'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll(ASSETS);
            })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                return response || fetch(event.request);
            })
    );
});
