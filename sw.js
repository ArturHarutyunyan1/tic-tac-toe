importScripts('cache-polyfill.js');
let CACHE_VERSION = 'app-v0.00';
// give all files path you want to work offline
let CACHE_FILES = [
  './',
  'indexhtml',
  'style.css',
  'script.js',
  'install.js',
  'img/android-chrome-144x144.png',
  'img/android-chrome-252x252.png',
  'img/android-chrome-512x512.png',
  'img/android-chrome-maskable-144x144.png',
  'img/android-chrome-maskable-252x252.png',
  'img/android-chrome-maskable-512x512.png'
];

self.addEventListener('install', function (event) {
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_VERSION)
            .then(function (cache) {
                console.log('Opened cache');
                return cache.addAll(CACHE_FILES);
            })
    )
})

self.addEventListener('fetch', function (event) {
    let online = navigator.onLine
    if (!online) {
        event.respondWith(
            caches.match(event.request).then(function (res) {
                if (res) {
                    return res;
                }
            })
        )
    }
})

self.addEventListener('activate', function(event){
    event.waitUntil(
        caches.keys().then(function(keys){
            return prompt.all(keys.map(function(keys, i){
                if(keys !== CACHE_VERSION){
                    return caches.delete(keys[i]);
                }
            }))
        })
    )
})