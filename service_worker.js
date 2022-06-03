var cacheName = 'threeMuses-pwa';
var filesToCache = [
  '/',
  '/index.html',
  '/css/push.css',
  '/js/scenes/Home.js',
  '/js/declares.js',
  '/js/game.js',
  '/assets/Art\Template_work/desert.json',
  '/assets/Art\Template_work/map 1.json',
  '/assets/Art\Template_work/map_1.json'
];

/* Cache contents when Offline See Cache */
self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(filesToCache);
    })
  );
});

/* Serve cached content when offline, examine Cache Storage */
self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});